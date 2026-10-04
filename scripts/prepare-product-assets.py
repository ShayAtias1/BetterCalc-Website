"""Prepare only real captured UI: optimize WebP and create focused phone plan crops."""
from pathlib import Path
from PIL import Image
import json
root = Path(__file__).resolve().parents[1]
source = root / 'assets-source/product-demo'
out = root / 'public/assets/product-demo'
out.mkdir(parents=True, exist_ok=True)
manifest = json.loads((source / 'capture-manifest.json').read_text())
for path in source.glob('*.png'):
    image = Image.open(path).convert('RGB')
    image.save(out / (path.stem + '.webp'), 'WEBP', quality=90, method=6)
for mode in ['finishes', 'concrete', 'mesh', 'stirrups']:
    state = manifest['states'][f'{mode}-2']
    plan = state['plan']
    points = plan['rooms'][0]['points'] if mode == 'finishes' else plan['concreteElements'][0]['points'] if mode == 'concrete' else plan['rebarItems'][0]['points'] if mode == 'mesh' else [plan['rebarItems'][0]['placements'][0]['start'], plan['rebarItems'][0]['placements'][0]['end']]
    canvas, viewer = state['canvas'], state['viewer']
    xs = [(canvas['x']-viewer['x'] + p['x']/1190.551*canvas['width'])*1.5 for p in points]
    ys = [(canvas['y']-viewer['y'] + p['y']/841.8898*canvas['height'])*1.5 for p in points]
    image = Image.open(source / f'{mode}-2-plan.png').convert('RGB')
    left, top = max(0, min(xs)-100), max(0, min(ys)-110)
    right, bottom = min(image.width, max(xs)+100), min(image.height, max(ys)+110)
    image.crop((left, top, right, bottom)).save(out / f'{mode}-phone-focus.webp', 'WEBP', quality=92, method=6)
    for phase in [0, 1, 2] + ([3] if mode == 'mesh' else []):
        frame = Image.open(source / f'{mode}-{phase}-plan.png').convert('RGB')
        frame.crop((left, top, right, bottom)).save(out / f'{mode}-{phase}-focus.webp', 'WEBP', quality=92, method=6)
(out / 'provenance.json').write_text(json.dumps({
    'source': 'BetterCalc repository demo apartment PDF; freshly captured actual Hebrew UI',
    'plan': manifest['plan'], 'desktopViewport': manifest['viewport'],
    'captureMethod': 'Isolated Playwright contexts; actual product store, mutations, renderer and adaptive UI. No customer data.',
    'newDemo': {'areaM2': 12.65, 'perimeterM': 14.32, 'openingM2': 1.89, 'claddingNetM2': 32.47, 'concreteVolumeM3': 2.53, 'stirrupCount': 17, 'stirrupTotalLengthM': 27.2, 'stirrupWeightKg': 10.7},
    'legacyReport': '49.46 m² belongs to the separate existing export/demo dataset, not this freshly seeded interactive state.',
    'tablet': manifest['tablet']['viewport'], 'phone': manifest['phone']['viewport']
}, ensure_ascii=False, indent=2))
