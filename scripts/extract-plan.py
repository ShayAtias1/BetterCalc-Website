"""Convert the Apartment A source PDF (ReportLab vector) into layered SVG JSX.

The geometry is copied 1:1 from the PDF content stream (PDF points, y flipped).
Only presentation is grouped into semantic layers; printed room-area numerals
are omitted because they conflict with the verified BetterCalc demo values.

Usage:
  python3 scripts/extract-plan.py > src/components/PlanDrawing.tsx
  python3 scripts/extract-plan.py assets-source/plans/BetterCalc_Demo_Apartment_A_Revision_B.pdf RevisionDrawing \
    > src/components/RevisionDrawing.tsx
"""
import base64, re, sys, zlib
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / (sys.argv[1] if len(sys.argv) > 1 else 'assets-source/plans/BetterCalc_Demo_Apartment_A_Floor_Plan.pdf')
COMPONENT = sys.argv[2] if len(sys.argv) > 2 else 'PlanDrawing'
H = 841.8898

data = SRC.read_bytes()
stream = re.search(rb'stream\r?\n(.*?)endstream', data, re.S).group(1).strip()
stream = stream.removeprefix(b'<~').removesuffix(b'~>')
content = zlib.decompress(base64.a85decode(stream)).decode('latin1')

tokens = re.findall(r'\((?:\\.|[^\\)])*\)|[^\s()]+', content)

def mul(a, b):
    return [a[0]*b[0] + a[1]*b[2], a[0]*b[1] + a[1]*b[3], a[2]*b[0] + a[3]*b[2], a[2]*b[1] + a[3]*b[3],
            a[4]*b[0] + a[5]*b[2] + b[4], a[4]*b[1] + a[5]*b[3] + b[5]]

def pt(m, x, y):
    return (m[0]*x + m[2]*y + m[4], H - (m[1]*x + m[3]*y + m[5]))

f = lambda v: f'{v:.2f}'.rstrip('0').rstrip('.')

CHAR = (.082353, .098039, .113725)
WHITE = (1.0, 1.0, 1.0)
GREY_DARK = (.4, .439216, .470588)
GREY_LIGHT = (.666667, .694118, .713725)
RULE = (.905882, .917647, .92549)

state = dict(ctm=[1, 0, 0, 1, 0, 0], fill=(0, 0, 0), stroke=(0, 0, 0), lw=1.0, font=('F1', 12))
stack = []
path = []
text_m = None
operands = []
items = []  # (layer, jsx)

def classify_paint(kind, bbox):
    fill, stroke = state['fill'], state['stroke']
    x0, y0, x1, y1 = bbox
    y_top = min(y0, y1)
    if kind == 'fill':
        if fill == CHAR:
            return 'walls'
        if fill == WHITE:
            if y_top > H - 80:  # reference-label knockout (near sheet bottom)
                return 'reference'
            if abs(y_top - (H - 734.32)) < 1:
                return 'dims'
            return 'walls'
    if kind == 'stroke':
        if stroke == RULE:
            return 'meta'
        if stroke == CHAR:
            if y_top > H - 80 and x1 < 520:
                return 'reference'
            if x0 > 970:
                return 'meta'
            if min(y0, y1) < 110:  # north arrow sits at the top-right
                return 'meta'
            return 'walls'
        if stroke in (GREY_DARK, GREY_LIGHT):
            if (y_top > H - 740 and y_top < H - 700) or x1 < 100:
                return 'dims'
            return 'fixtures'
    if kind == 'fillstroke':
        if y_top > H - 80:
            return 'reference'
        return 'meta'
    return 'meta'

def emit_path(kind):
    global path
    if not path:
        return
    d = ''.join(path)
    nums = [float(n) for n in re.findall(r'-?\d+\.?\d*', d)]
    xs, ys = nums[0::2], nums[1::2]
    bbox = (min(xs), min(ys), max(xs), max(ys))
    layer = classify_paint(kind, bbox)
    if kind == 'fill':
        attrs = f'd="{d}" className="pd-fill-{ "ko" if state["fill"] == WHITE else "ink"}"'
    elif kind == 'stroke':
        tone = {CHAR: 'ink', GREY_DARK: 'graphite', GREY_LIGHT: 'soft', RULE: 'rule'}.get(state['stroke'], 'ink')
        attrs = f'd="{d}" className="pd-stroke-{tone}" strokeWidth={{{f(state["lw"])}}}'
    else:
        fs = 'ko' if state['fill'] == WHITE else 'ink'
        attrs = f'd="{d}" className="pd-fs-{fs}" strokeWidth={{{f(state["lw"])}}}'
    items.append((layer, f'<path {attrs} />'))
    path = []

def emit_text(s):
    fname, size = state['font']
    m = mul(text_m, state['ctm'])
    x, y = pt(m, 0, 0)
    rotated = abs(m[1]) > 1e-6
    s = s.replace('\\(', '(').replace('\\)', ')')
    if re.fullmatch(r'[\d.]+ m2', s):
        return  # printed area numerals conflict with verified QTO values — suppressed
    y_pdf = H - y
    if s == 'N' or y_pdf < 140 and x > 970 or s.startswith(('BETTERCALC DEMO', 'VECTOR', 'DEMONSTRATION')):
        layer = 'meta'
    elif s.startswith('REFERENCE') or s == '5.00 m':
        layer = 'reference'
    elif re.fullmatch(r'\d\.\d\d m', s):
        layer = 'dims'
    else:
        layer = 'labels'
    weight = ' fontWeight={700}' if fname == 'F2' else ''
    tone = 'ink' if state['fill'] == CHAR else 'graphite'
    tr = f' transform="rotate(-90 {f(x)} {f(y)})"' if rotated else ''
    items.append((layer, f'<text x={{{f(x)}}} y={{{f(y)}}} fontSize={{{f(size)}}}{weight} className="pd-text-{tone}"{tr}>{s}</text>'))

for tok in tokens:
    if tok.startswith('('):
        operands.append(tok[1:-1]); continue
    if re.fullmatch(r'-?\d*\.?\d+', tok) or tok.startswith('/'):
        operands.append(tok); continue
    op, a = tok, operands
    operands = []
    if op == 'q': stack.append(dict(state, ctm=list(state['ctm'])))
    elif op == 'Q': state = stack.pop()
    elif op == 'cm': state['ctm'] = mul([float(v) for v in a], state['ctm'])
    elif op == 'w': state['lw'] = float(a[0])
    elif op == 'rg': state['fill'] = tuple(round(float(v), 6) for v in a)
    elif op == 'RG': state['stroke'] = tuple(round(float(v), 6) for v in a)
    elif op == 'm':
        x, y = pt(state['ctm'], float(a[0]), float(a[1])); path.append(f'M{f(x)} {f(y)}')
    elif op == 'l':
        x, y = pt(state['ctm'], float(a[0]), float(a[1])); path.append(f'L{f(x)} {f(y)}')
    elif op == 'c':
        p = [pt(state['ctm'], float(a[i]), float(a[i+1])) for i in (0, 2, 4)]
        path.append('C' + ' '.join(f'{f(x)} {f(y)}' for x, y in p))
    elif op == 're':
        x, y, w, h = map(float, a)
        c = [pt(state['ctm'], *q) for q in ((x, y), (x+w, y), (x+w, y+h), (x, y+h))]
        path.append('M' + 'L'.join(f'{f(px)} {f(py)}' for px, py in c) + 'Z')
    elif op == 'h': path.append('Z')
    elif op in ('f', 'f*'): emit_path('fill')
    elif op == 'S': emit_path('stroke')
    elif op in ('B', 'B*'): emit_path('fillstroke')
    elif op == 'n': path = []
    elif op == 'Tf': state['font'] = (a[0][1:], float(a[1]))
    elif op == 'Tm': text_m = [float(v) for v in a]
    elif op == 'Tj': emit_text(a[0])

ORDER = ['meta', 'fixtures', 'walls', 'labels', 'dims', 'reference']
out = [f'// Generated by scripts/extract-plan.py from {SRC.name}. Do not edit by hand.',
       '// Geometry is 1:1 with the PDF (points, y flipped). Printed area numerals are intentionally omitted.',
       "import { memo } from 'react'", '',
       f'export const {COMPONENT} = memo(function {COMPONENT}({{ className = \'\' }}: {{ className?: string }}) {{',
       '  return (',
       '    <svg className={`plan-drawing ${className}`.trim()} viewBox="0 0 1190.551 841.8898" aria-hidden="true" focusable="false">']
for layer in ORDER:
    out.append(f'      <g className="pd-layer pd-{layer}">')
    out += [f'        {jsx}' for l, jsx in items if l == layer]
    out.append('      </g>')
out += ['    </svg>', '  )', '})', '']
sys.stdout.write('\n'.join(out))
print(f'layers: ' + ', '.join(f'{l}={sum(1 for x,_ in items if x==l)}' for l in ORDER), file=sys.stderr)
