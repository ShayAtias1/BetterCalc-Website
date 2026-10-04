import { useCallback, useRef, useState, type CSSProperties } from 'react'
import { DIFFERENCES, ORIGINAL, REVISION } from '../data/compare'
import { PLAN_HEIGHT, PLAN_WIDTH } from '../data/plan'
import { swipeValueText, useSwipeControl } from '../hooks/useSwipeControl'
import { PlanDrawing } from './PlanDrawing'
import { RevisionDrawing } from './RevisionDrawing'
import '../compare.css'

// Reuse the existing aligned apartment plans. This is a demonstration, not a live product embed.
const FOCUS = { x0: 196, y0: 236, x1: 824, y1: 690 }
const FOCUS_WIDTH = FOCUS.x1 - FOCUS.x0
const FOCUS_HEIGHT = FOCUS.y1 - FOCUS.y0
const rigStyle: CSSProperties = {
  width: `${PLAN_WIDTH / FOCUS_WIDTH * 100}%`,
  height: `${PLAN_HEIGHT / FOCUS_HEIGHT * 100}%`,
  left: `${-FOCUS.x0 / FOCUS_WIDTH * 100}%`,
  top: `${-FOCUS.y0 / FOCUS_HEIGHT * 100}%`,
}

type CompareMode = 'overlay' | 'swipe'

function CompareSheets({ mode, position, opacity }: { mode: CompareMode; position: number; opacity: number }) {
  const u = (FOCUS.x0 + position * FOCUS_WIDTH) / PLAN_WIDTH * 100
  const clip = (revision: boolean): CSSProperties => mode === 'swipe' ? { transform: `translateX(${revision ? u - 100 : u}%)` } : {}
  const inner = (revision: boolean): CSSProperties => mode === 'swipe' ? { transform: `translateX(${revision ? 100 - u : -u}%)` } : {}
  return (
    <div className="comparison-rig" style={rigStyle} dir="ltr" role="img" aria-label="דוגמה: תוכנית המקור A-101 וגרסה B של דירה A, מיושרות באותו קנה מידה">
      <div className="comparison-sheet comparison-sheet--original">
        <div className="comparison-clip" style={clip(false)}><div className="comparison-inner" style={inner(false)}><PlanDrawing /></div></div>
      </div>
      <div className="comparison-sheet comparison-sheet--revision">
        <div className="comparison-clip" style={clip(true)}><div className="comparison-inner" style={{ ...inner(true), opacity: mode === 'overlay' ? opacity : 1 }}><RevisionDrawing /></div></div>
      </div>
    </div>
  )
}

export function CompareStory() {
  const [mode, setMode] = useState<CompareMode>('overlay')
  const [opacity, setOpacity] = useState(0.75)
  const [position, setPosition] = useState(0.5)
  const positionRef = useRef(0.5)
  const view = useRef<HTMLDivElement>(null)
  const strip = useRef<HTMLDivElement>(null)
  const handle = useRef<HTMLDivElement>(null)
  const set = useCallback((next: number) => { positionRef.current = next; setPosition(next) }, [])
  const get = useCallback(() => positionRef.current, [])
  const bounds = useCallback(() => {
    const rect = view.current?.getBoundingClientRect()
    return { left: rect?.left ?? 0, right: rect?.right ?? 1 }
  }, [])
  useSwipeControl({ strip, handle, bounds, get, set, enabled: mode === 'swipe' })

  return (
    <section className="landing-section comparison" id="compare" aria-labelledby="compare-title">
      <div className="section-heading">
        <p className="section-kicker">השוואת תוכניות</p>
        <h2 id="compare-title">הגיעה גרסה חדשה? בודקים מה השתנה.</h2>
        <p>ממפים עמודים, מיישרים את התוכניות ומשווים בשכבות או בהחלקה. בודקים את ההבדלים ומוסיפים בעצמכם סימונים, מדידות והערות לשינויים שזיהיתם.</p>
      </div>
      <div className="comparison-layout">
        <figure className="comparison-example">
          <div className="comparison-controls" role="group" aria-label="מצב השוואה לדוגמה">
            <button type="button" aria-pressed={mode === 'overlay'} aria-controls="comparison-view" onClick={() => setMode('overlay')}>שכבות</button>
            <button type="button" aria-pressed={mode === 'swipe'} aria-controls="comparison-view" onClick={() => setMode('swipe')}>החלקה</button>
          </div>
          <div className="comparison-view" id="comparison-view" ref={view} style={{ aspectRatio: `${FOCUS_WIDTH} / ${FOCUS_HEIGHT}` }}>
            <CompareSheets mode={mode} opacity={opacity} position={position} />
            {mode === 'swipe' && <div className="comparison-divider" style={{ left: `${position * 100}%` }}>
              <div className="comparison-divider__strip" ref={strip}>
                <div className="comparison-divider__handle" ref={handle} role="slider" tabIndex={0} aria-label="קו ההשוואה: גרסה B משמאל, מקור מימין" aria-orientation="horizontal" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(position * 100)} aria-valuetext={swipeValueText(position)}><span aria-hidden="true">↔</span></div>
              </div>
            </div>}
          </div>
          <div className="comparison-legend"><span className="comparison-legend__original">מקור <bdi dir="ltr">{ORIGINAL.code}</bdi></span><span className="comparison-legend__revision">גרסה <bdi dir="ltr">{REVISION.code}</bdi></span></div>
          {mode === 'overlay'
            ? <label className="comparison-range"><span>שקיפות גרסה B <bdi dir="ltr">{Math.round(opacity * 100)}%</bdi></span><input type="range" min={0} max={100} step={5} value={opacity * 100} onChange={(event) => setOpacity(Number(event.currentTarget.value) / 100)} /></label>
            : <label className="comparison-range"><span>קו ההשוואה · גרסה B משמאל, מקור מימין</span><input type="range" dir="ltr" min={0} max={100} value={position * 100} aria-valuetext={swipeValueText(position)} onChange={(event) => set(Number(event.currentTarget.value) / 100)} /></label>}
          <figcaption>המחשה אינטראקטיבית עם תוכניות הדמו הקיימות. בחרו תצוגה ובדקו את ההבדלים בקצב שלכם.</figcaption>
        </figure>
        <aside className="comparison-notes" aria-label="הבדלים בדוגמת הדירה">
          <h3>מה אפשר לבדוק בדוגמה?</h3>
          <ul>{DIFFERENCES.map((difference) => <li key={difference}>{difference}</li>)}</ul>
          <p>אלה הבדלים שנבחרו להמחשה בתוכניות הדמו. ההשוואה היא חזותית; אתם מזהים את השינוי ומסמנים את העבודה.</p>
          <a className="secondary-action" href="#reports">ראו קטע מדוח הסימונים <span aria-hidden="true">↓</span></a>
        </aside>
      </div>
    </section>
  )
}
