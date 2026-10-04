import { forwardRef, memo, useCallback, useEffect, useMemo, useRef, type CSSProperties, type ReactNode, type Ref } from 'react'
import { COMPARE_REPORT, MARKS, ORIGINAL, REVISION } from '../data/compare'
import { PLAN_HEIGHT, PLAN_WIDTH, px, py } from '../data/plan'
import { useCompareScroll } from '../hooks/useCompareScroll'
import { swipeValueText, useSwipeControl } from '../hooks/useSwipeControl'
import { ComparePanel } from './ComparePanel'
import { Preview } from './Preview'
import { PlanDrawing } from './PlanDrawing'
import { RevisionDrawing } from './RevisionDrawing'
import '../compare.css'


function SheetTab({ code, file }: { code: string; file: string }) {
  return (
    <div className="c-tab" aria-hidden="true">
      <span className="sheet-tab__type">PDF</span>
      <span className="c-tab__code">{code}</span>
      <span className="sheet-tab__name">{file}</span>
    </div>
  )
}

/** The user's two change marks, drawn with the rectangle tool over the real wall footprints. */
const ChangeMarks = memo(function ChangeMarks() {
  return (
    <div className="marks" aria-hidden="true">
      {MARKS.map((mark) => {
        const { x0, y0, x1, y1 } = mark.rect
        const w = x1 - x0
        const h = y1 - y0
        return (
          <div key={mark.id} className={`mark mark--${mark.id}`} data-mark={mark.id} style={{ left: px(x0), top: py(y0), width: px(w), height: py(h) }}>
            <span className="mark__shape" />
            <span className="room__cursor mark__cursor" />
            <span className="mark__tag" style={{ left: `${((mark.tag.x - x0) / w) * 100}%`, top: `${((mark.tag.y - y0) / h) * 100}%` }} dir="rtl">
              <span className="mark__tag-type"><span className="mark__tag-index" dir="ltr">{mark.index}</span>{mark.type}</span>
              <span className="mark__tag-value"><bdi dir="ltr">{mark.area}</bdi>&nbsp;מ״ר</span>
            </span>
          </div>
        )
      })}
    </div>
  )
})

type SheetsRefs = {
  revSheet?: Ref<HTMLDivElement>
  origLayer?: Ref<HTMLDivElement>
  revLayer?: Ref<HTMLDivElement>
  origClip?: Ref<HTMLDivElement>
  origInner?: Ref<HTMLDivElement>
  revClip?: Ref<HTMLDivElement>
  revInner?: Ref<HTMLDivElement>
}

/** A-101 and A-101-B in one coordinate system. The revision multiplies over the original, so walls register exactly. */
export const CompareSheets = forwardRef<HTMLDivElement, SheetsRefs & { className?: string; style?: CSSProperties }>(function CompareSheets(
  { revSheet, origLayer, revLayer, origClip, origInner, revClip, revInner, className = '', style },
  rigRef,
) {
  return (
    <div className={`c-rig ${className}`.trim()} ref={rigRef} dir="ltr" style={style} role="img" aria-label="תוכנית המקור A-101 וגרסה B (A-101-B) של דירה A, באותו קנה מידה ובאותו מיקום">
      <div className="c-sheet c-sheet--orig">
        <SheetTab code={ORIGINAL.code} file={ORIGINAL.file} />
        <div className="c-paper" />
        <div className="c-clip" ref={origClip}>
          <div className="c-clip__inner" ref={origInner}>
            <div className="c-layer c-layer--orig" ref={origLayer}><PlanDrawing /></div>
          </div>
        </div>
      </div>
      <div className="c-sheet c-sheet--rev" ref={revSheet}>
        <SheetTab code={REVISION.code} file={REVISION.file} />
        <div className="c-clip" ref={revClip}>
          <div className="c-clip__inner" ref={revInner}>
            <div className="c-layer c-layer--rev" ref={revLayer}>
              <div className="c-paper" />
              <RevisionDrawing />
            </div>
          </div>
        </div>
      </div>
      <ChangeMarks />
    </div>
  )
})

type DividerProps = { dividerRef?: Ref<HTMLDivElement>; stripRef: Ref<HTMLDivElement>; handleRef: Ref<HTMLDivElement> }

/** The swipe instrument: a full-height rule with a handle, labelled on both sides. */
export function SwipeDivider({ dividerRef, stripRef, handleRef }: DividerProps) {
  return (
    <div className="c-divider" ref={dividerRef}>
      <div className="c-divider__strip" ref={stripRef}>
        <span className="c-divider__line" aria-hidden="true" />
        <span className="c-divider__label c-divider__label--rev" aria-hidden="true">גרסה B</span>
        <span className="c-divider__label c-divider__label--orig" aria-hidden="true">מקור</span>
        <div
          className="c-divider__handle"
          ref={handleRef}
          role="slider"
          tabIndex={-1}
          aria-label="השוואת החלקה בין גרסה B לתוכנית המקור"
          aria-orientation="horizontal"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={50}
          aria-valuetext={swipeValueText(0.5)}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 6 3 12l6 6M15 6l6 6-6 6" /></svg>
        </div>
        <span className="c-divider__hint" aria-hidden="true">גררו להשוואה</span>
      </div>
    </div>
  )
}

/** The real Compare PDF: page 1 (documented comparison) with the page-2 change schedule laid across it. */
export const CompareExport = memo(function CompareExport() {
  return (
    <div className="c-export">
      <figure className="doc c-doc">
        <figcaption className="doc__tab">
          <span className="doc__type" dir="ltr">PDF</span>
          <span className="doc__name" dir="ltr">{COMPARE_REPORT.file}</span>
          <span className="doc__meta"><bdi dir="ltr">{COMPARE_REPORT.pages}</bdi> עמודים</span>
        </figcaption>
        <Preview name="compare-report-p1" className="doc__page c-doc__page" width={1428} height={1140} alt="עמוד 1 בדוח ההשוואה: תוכנית המקור והגרסה המעודכנת זו על זו, עם מקרא וסימוני הריסה (1) ובנייה חדשה (2), כל אחד 0.75 מ״ר" />
      </figure>
      <figure className="doc c-doc c-doc--table">
        <Preview name="compare-report-p2-table" className="doc__page" width={1804} height={444} alt="עמוד 2 בדוח ההשוואה: טבלת שטחי הריסה ובנייה — הריסה 0.75 מ״ר, בנייה חדשה 0.75 מ״ר, סה״כ כללי 1.5" />
        <figcaption className="doc__detail-label c-doc__label">עמוד <bdi dir="ltr">2</bdi> · טבלת שטחי הריסה ובנייה</figcaption>
      </figure>
    </div>
  )
})

export function CompareStory() {
  const section = useRef<HTMLElement>(null)
  const stage = useRef<HTMLDivElement>(null)
  const question = useRef<HTMLDivElement>(null)
  const rig = useRef<HTMLDivElement>(null)
  const revSheet = useRef<HTMLDivElement>(null)
  const origLayer = useRef<HTMLDivElement>(null)
  const revLayer = useRef<HTMLDivElement>(null)
  const origClip = useRef<HTMLDivElement>(null)
  const origInner = useRef<HTMLDivElement>(null)
  const revClip = useRef<HTMLDivElement>(null)
  const revInner = useRef<HTMLDivElement>(null)
  const divider = useRef<HTMLDivElement>(null)
  const handle = useRef<HTMLDivElement>(null)
  const panel = useRef<HTMLDivElement>(null)
  const origReadout = useRef<HTMLSpanElement>(null)
  const revReadout = useRef<HTMLSpanElement>(null)
  const revSlider = useRef<HTMLInputElement>(null)
  const strip = useRef<HTMLDivElement>(null)
  const refs = useMemo(
    () => ({ section, stage, question, rig, revSheet, origLayer, revLayer, origClip, origInner, revClip, revInner, divider, handle, panel, origReadout, revReadout, revSlider }),
    [],
  )

  const controls = useCompareScroll(refs, true)
  useSwipeControl({ strip, handle, bounds: controls.bounds, get: controls.getSwipe, set: controls.setSwipe })

  return (
    <section ref={section} className="compare" id="compare" data-stage="intro" data-reached="intro" aria-labelledby="compare-title">
      <div ref={stage} className="compare__stage">
        <div className="compare-question" ref={question}>
          <h2 className="compare-question__title" id="compare-title">
            <span className="compare-question__line">ומה קורה</span>
            <span className="compare-question__line compare-question__line--accent">כשהתוכנית משתנה?</span>
          </h2>
          <p className="compare-question__lead">הגיעה גרסה <bdi dir="ltr">B</bdi> של אותה תוכנית. משווים חזותית, ואז מודדים ומסמנים בעצמכם את השינויים שזיהיתם.</p>
        </div>
        <CompareSheets ref={rig} revSheet={revSheet} origLayer={origLayer} revLayer={revLayer} origClip={origClip} origInner={origInner} revClip={revClip} revInner={revInner} />
        <SwipeDivider dividerRef={divider} stripRef={strip} handleRef={handle} />
        <CompareExport />
        <ComparePanel panelRef={panel} origReadout={origReadout} revReadout={revReadout} revSlider={revSlider} onRevision={controls.setRevision} />
      </div>
    </section>
  )
}

/* ───────────── Reduced motion: the same chapter as composed static figures ───────────── */

type Crop = { x0: number; y0: number; x1: number; y1: number }

const FOCUS: Crop = { x0: 196, y0: 236, x1: 824, y1: 690 }
const MARK: Crop = { x0: 200, y0: 300, x1: 640, y1: 690 }

/** Positions the shared rig so that `crop` fills a container of the same aspect ratio. */
const cropStyle = (crop: Crop) => {
  const w = crop.x1 - crop.x0
  const h = crop.y1 - crop.y0
  return {
    view: { aspectRatio: `${w} / ${h}` },
    rig: { width: `${(PLAN_WIDTH / w) * 100}%`, height: `${(PLAN_HEIGHT / h) * 100}%`, left: `${(-crop.x0 / w) * 100}%`, top: `${(-crop.y0 / h) * 100}%` },
  }
}

function StaticSheet({ code, file, revision = false }: { code: string; file: string; revision?: boolean }) {
  return (
    <figure className="c-static-sheet">
      <figcaption className="c-tab c-tab--static"><span className="sheet-tab__type">PDF</span><span className="c-tab__code">{code}</span><span className="sheet-tab__name">{file}</span></figcaption>
      <div className="c-static-sheet__paper" dir="ltr">{revision ? <RevisionDrawing /> : <PlanDrawing />}</div>
    </figure>
  )
}

function StaticView({ crop, children }: { crop: Crop; children: (rigStyle: CSSProperties) => ReactNode }) {
  const style = cropStyle(crop)
  return <div className="c-static-view" style={style.view}>{children(style.rig)}</div>
}

/** Overlay with a live opacity control — direct DOM write, no animation. */
function StaticOverlay() {
  const revLayer = useRef<HTMLDivElement>(null)
  const revReadout = useRef<HTMLSpanElement>(null)
  const onRevision = useCallback((value: number) => {
    if (revLayer.current) revLayer.current.style.opacity = String(value)
    if (revReadout.current) revReadout.current.textContent = `${Math.round(value * 100)}%`
  }, [])
  useEffect(() => onRevision(0.75), [onRevision])
  return (
    <section className="static-figure compare compare--static" data-stage="read" data-reached="intro pair align overlay read" aria-label="שכבות">
      <ComparePanel revReadout={revReadout} onRevision={onRevision} readouts={{ original: '100%', revision: '75%' }} />
      <div className="static-figure__plan">
        <StaticView crop={FOCUS}>{(rig) => <CompareSheets className="c-rig--static" revLayer={revLayer} style={rig} />}</StaticView>
      </div>
    </section>
  )
}

/** Swipe stays genuinely interactive: pointer, touch and keyboard, with no automatic movement. */
function StaticSwipe() {
  const view = useRef<HTMLDivElement>(null)
  const origClip = useRef<HTMLDivElement>(null)
  const origInner = useRef<HTMLDivElement>(null)
  const revClip = useRef<HTMLDivElement>(null)
  const revInner = useRef<HTMLDivElement>(null)
  const divider = useRef<HTMLDivElement>(null)
  const strip = useRef<HTMLDivElement>(null)
  const handle = useRef<HTMLDivElement>(null)
  const value = useRef((600 - FOCUS.x0) / (FOCUS.x1 - FOCUS.x0))

  const set = useCallback((next: number) => {
    value.current = next
    const u = ((FOCUS.x0 + next * (FOCUS.x1 - FOCUS.x0)) / PLAN_WIDTH) * 100
    if (origClip.current && origInner.current && revClip.current && revInner.current && divider.current && handle.current) {
      origClip.current.style.transform = `translate3d(${u}%, 0, 0)`
      origInner.current.style.transform = `translate3d(${-u}%, 0, 0)`
      revClip.current.style.transform = `translate3d(${u - 100}%, 0, 0)`
      revInner.current.style.transform = `translate3d(${100 - u}%, 0, 0)`
      divider.current.style.left = `${next * 100}%`
      handle.current.setAttribute('aria-valuenow', String(Math.round(next * 100)))
      handle.current.setAttribute('aria-valuetext', swipeValueText(next))
    }
  }, [])
  const bounds = useCallback(() => {
    const rect = view.current?.getBoundingClientRect()
    return { left: rect?.left ?? 0, right: rect?.right ?? 1 }
  }, [])
  const get = useCallback(() => value.current, [])
  useSwipeControl({ strip, handle, bounds, get, set })
  useEffect(() => {
    set(value.current)
    if (handle.current) handle.current.tabIndex = 0
  }, [set])

  const style = cropStyle(FOCUS)
  return (
    <section className="static-figure compare compare--static" data-stage="free" data-reached="intro pair align overlay read swipe free" aria-label="החלקה">
      <ComparePanel readouts={{ original: '100%', revision: '100%' }} />
      <div className="static-figure__plan">
        <div className="c-static-view" style={style.view} ref={view}>
          <CompareSheets className="c-rig--static" style={style.rig} origClip={origClip} origInner={origInner} revClip={revClip} revInner={revInner} />
          <SwipeDivider dividerRef={divider} stripRef={strip} handleRef={handle} />
        </div>
      </div>
    </section>
  )
}

export function StaticCompare() {
  return (
    <>
      <section className="compare-static-intro" id="compare" aria-labelledby="compare-title">
        <h2 className="compare-question__title" id="compare-title">
          <span className="compare-question__line">ומה קורה</span>
          <span className="compare-question__line compare-question__line--accent">כשהתוכנית משתנה?</span>
        </h2>
        <p className="compare-question__lead">הגיעה גרסה <bdi dir="ltr">B</bdi> של אותה תוכנית. משווים חזותית, ואז מודדים ומסמנים בעצמכם את השינויים שזיהיתם.</p>
        <div className="c-static-pair">
          <StaticSheet code={ORIGINAL.code} file={ORIGINAL.file} />
          <StaticSheet code={REVISION.code} file={REVISION.file} revision />
        </div>
      </section>
      <StaticOverlay />
      <StaticSwipe />
      <section className="static-figure compare compare--static" data-stage="changes" data-reached="intro pair align overlay read swipe free work demolition construction changes" aria-label="סימון שינויים">
        <ComparePanel />
        <div className="static-figure__plan">
          <StaticView crop={MARK}>{(rig) => <CompareSheets className="c-rig--static" style={rig} />}</StaticView>
        </div>
      </section>
      <section className="static-figure compare compare--static" data-stage="export" data-reached="intro pair align overlay read swipe free work demolition construction changes export" aria-label="ייצוא השוואה">
        <ComparePanel />
        <div className="static-figure__plan"><CompareExport /></div>
      </section>
    </>
  )
}

