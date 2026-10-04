import { forwardRef, memo, useEffect, useRef, type ReactNode } from 'react'
import { DIMENSION_CHAIN, DIMENSION_Y, ENVELOPE, PLAN_HEIGHT, PLAN_WIDTH, POINTS_PER_METER, REFERENCE, px, py } from '../data/plan'
import { PlanDrawing } from './PlanDrawing'
import { RoomLayer } from './RoomLayer'

export type SheetRefs = {
  veil: HTMLDivElement | null
  line: HTMLSpanElement | null
  endA: HTMLSpanElement | null
  endB: HTMLSpanElement | null
  tab: HTMLDivElement | null
}

type PlanSheetProps = {
  /** Registers the elements the scroll timeline writes to. Omitted for static figures. */
  register?: (refs: SheetRefs) => void
  /** Enables the hero measurement probe (pointer + one passive sweep). */
  probe?: boolean
  className?: string
  /** Product proof carried by the existing hero camera rig; later stages keep the original plan. */
  heroVisual?: ReactNode
}

const METER_COLUMNS = Array.from({ length: ENVELOPE.width / POINTS_PER_METER + 1 }, (_, i) => i)
const METER_ROWS = Array.from({ length: ENVELOPE.height / POINTS_PER_METER + 1 }, (_, i) => i)

/** The 1.00 m grid that the 5.00 m reference makes possible. Pure consequence of the verified scale. */
const MeterGrid = memo(function MeterGrid() {
  const { x, y, width, height } = ENVELOPE
  return (
    <svg className="meter-grid" viewBox={`0 0 ${PLAN_WIDTH} ${PLAN_HEIGHT}`} aria-hidden="true" focusable="false">
      <g className="meter-grid__lines">
        {METER_COLUMNS.map((i) => <line key={`c${i}`} x1={x + i * POINTS_PER_METER} x2={x + i * POINTS_PER_METER} y1={y} y2={y + height} />)}
        {METER_ROWS.map((i) => <line key={`r${i}`} x1={x} x2={x + width} y1={y + i * POINTS_PER_METER} y2={y + i * POINTS_PER_METER} />)}
      </g>
      <rect className="meter-grid__frame" x={x} y={y} width={width} height={height} />
      <g className="meter-grid__labels">
        {METER_COLUMNS.map((i) => <text key={`lc${i}`} x={x + i * POINTS_PER_METER} y={y - 36}>{i}</text>)}
        {METER_ROWS.map((i) => <text key={`lr${i}`} x={x - 54} y={y + i * POINTS_PER_METER + 3}>{i}</text>)}
      </g>
    </svg>
  )
})

export const PlanSheet = forwardRef<HTMLDivElement, PlanSheetProps>(function PlanSheet({ register, probe = false, className = '', heroVisual }, rigRef) {
  const sheetRef = useRef<HTMLDivElement>(null)
  const refs = useRef<SheetRefs>({ veil: null, line: null, endA: null, endB: null, tab: null })

  useEffect(() => {
    register?.(refs.current)
  }, [register])

  // Hero probe: pointer position → one highlighted column of the printed dimension chain.
  useEffect(() => {
    const sheet = sheetRef.current
    if (!probe || !sheet) return

    let frame = 0
    let pending: PointerEvent | null = null
    let current = ''
    const timers: number[] = []
    const set = (value: string) => {
      if (value === current) return
      current = value
      if (value) sheet.dataset.probe = value
      else delete sheet.dataset.probe
    }
    const stopSweep = () => { timers.forEach(clearTimeout); timers.length = 0 }
    const isLive = () => sheet.closest('[data-stage]')?.getAttribute('data-stage') === 'hero'

    const resolve = () => {
      frame = 0
      const event = pending
      if (!event || !isLive()) return set('')
      const rect = sheet.getBoundingClientRect()
      const x = ((event.clientX - rect.left) / rect.width) * PLAN_WIDTH
      const y = ((event.clientY - rect.top) / rect.height) * PLAN_HEIGHT
      const inBand = y > DIMENSION_Y - 30 && y < ENVELOPE.y + ENVELOPE.height + 12
      const index = inBand ? DIMENSION_CHAIN.findIndex((d) => x >= d.x1 && x < d.x2) : -1
      set(index >= 0 ? String(index) : '')
    }
    const onMove = (event: PointerEvent) => {
      stopSweep()
      pending = event
      if (!frame) frame = requestAnimationFrame(resolve)
    }
    const onLeave = () => { pending = null; set('') }

    sheet.addEventListener('pointermove', onMove, { passive: true })
    sheet.addEventListener('pointerdown', onMove, { passive: true })
    sheet.addEventListener('pointerleave', onLeave)

    // One passive sweep so the drawing reads as measurable even without a pointer.
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!reduced) {
      DIMENSION_CHAIN.forEach((_, i) => timers.push(window.setTimeout(() => isLive() && set(String(i)), 900 + i * 520)))
      timers.push(window.setTimeout(() => set(''), 900 + DIMENSION_CHAIN.length * 520 + 300))
    }

    return () => {
      stopSweep()
      if (frame) cancelAnimationFrame(frame)
      sheet.removeEventListener('pointermove', onMove)
      sheet.removeEventListener('pointerdown', onMove)
      sheet.removeEventListener('pointerleave', onLeave)
    }
  }, [probe])

  return (
    <div ref={rigRef} className={`sheet-rig ${className}`.trim()} dir="ltr">
      <div className="sheet-tab" ref={(el) => { refs.current.tab = el }} aria-hidden="true">
        <span className="sheet-tab__type">PDF</span>
        <span className="sheet-tab__code">A-101</span>
        <span className="sheet-tab__name">Apartment_A_Floor_Plan.pdf</span>
        <span className="sheet-tab__meta">A3 · 1/1</span>
      </div>
      <div className="sheet" ref={sheetRef} role="img" aria-label="תוכנית קומה אדריכלית של דירה A, כפי שהיא מופיעה בקובץ ה-PDF המקורי">
        <PlanDrawing />

        {probe && DIMENSION_CHAIN.map((d, i) => (
          <div key={d.value} className="probe-band" data-index={i} style={{ left: px(d.x1), width: px(d.x2 - d.x1), top: py(DIMENSION_Y), height: py(ENVELOPE.y + ENVELOPE.height - DIMENSION_Y) }} aria-hidden="true">
            <span className="probe-band__rule" />
            <span className="probe-band__tag" dir="rtl"><bdi dir="ltr">{d.value}</bdi>&nbsp;מ׳</span>
          </div>
        ))}

        <div className="veil-state" aria-hidden="true"><div className="veil" ref={(el) => { refs.current.veil = el }} /></div>
        <MeterGrid />
        <RoomLayer />

        <div className="calibration" style={{ left: px(REFERENCE.x1), width: px(REFERENCE.x2 - REFERENCE.x1), top: py(REFERENCE.y) }} aria-hidden="true">
          <span className="calibration__line" ref={(el) => { refs.current.line = el }} />
          <span className="calibration__end calibration__end--a" ref={(el) => { refs.current.endA = el }} />
          <span className="calibration__end calibration__end--b" ref={(el) => { refs.current.endB = el }} />
          <span className="calibration__chip" dir="rtl"><bdi dir="ltr">{REFERENCE.label}</bdi>&nbsp;מ׳</span>
        </div>
      </div>
      {heroVisual && <div className="hero-product-browser">{heroVisual}</div>}
      <span className="crop crop--tl" aria-hidden="true" />
      <span className="crop crop--tr" aria-hidden="true" />
      <span className="crop crop--bl" aria-hidden="true" />
      <span className="crop crop--br" aria-hidden="true" />
    </div>
  )
})
