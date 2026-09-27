import { useSyncExternalStore, type Ref } from 'react'
import './App.css'
import { Header } from './components/Header'
import { PlanSheet } from './components/PlanSheet'
import { StoryPanel } from './components/StoryPanel'
import { ExportProof } from './components/ExportProof'
import { CompareStory, StaticCompare } from './components/CompareStory'
import { Audience, FinalCta, SiteFooter } from './components/Ending'
import { APP_URL } from './data/site'
import { useStoryScroll } from './hooks/useStoryScroll'
import { useWheelDamping } from './hooks/useWheelDamping'

const reducedQuery = '(prefers-reduced-motion: reduce)'
const subscribeReduced = (onChange: () => void) => {
  const media = window.matchMedia(reducedQuery)
  media.addEventListener('change', onChange)
  return () => media.removeEventListener('change', onChange)
}
const getReduced = () => window.matchMedia(reducedQuery).matches

function HeroCopy({ copyRef }: { copyRef?: Ref<HTMLDivElement> }) {
  return (
    <div className="hero-copy" ref={copyRef}>
      <h1 className="hero-copy__title" id="hero-title">
        <span className="hero-copy__line">מתוכנית <bdi dir="ltr">PDF</bdi></span>
        <span className="hero-copy__line hero-copy__line--accent">לכמויות.</span>
      </h1>
      <div className="hero-copy__aside">
        <ol className="hero-flow" aria-label="איך זה עובד">
          <li><bdi dir="ltr">PDF</bdi></li>
          <li>כיול</li>
          <li>כמויות</li>
        </ol>
        <p className="hero-copy__lead">חישוב כמויות והשוואת גרסאות ישירות מתוכניות <bdi dir="ltr">PDF</bdi> — בלי <bdi dir="ltr">CAD</bdi>.</p>
        <a className="primary-action" href={APP_URL}>
          <span>נסו את <bdi dir="ltr">BetterCalc</bdi></span>
          <span className="primary-action__arrow" aria-hidden="true">←</span>
        </a>
      </div>
    </div>
  )
}

function MotionStory() {
  const { section, stage, heroCopy, rig, panel, register } = useStoryScroll(true)

  return (
    <section ref={section} className="story" data-stage="hero" data-reached="hero" aria-labelledby="hero-title">
      {/* Navigation lands on the calibrated plan (0.8 of a viewport into the pinned story). */}
      <span className="story-anchor" id="takeoff" aria-hidden="true" />
      <div ref={stage} className="story__stage">
        <HeroCopy copyRef={heroCopy} />
        <PlanSheet ref={rig} register={register} probe />
        <ExportProof />
        <StoryPanel panelRef={panel} />
      </div>
    </section>
  )
}

const CALIBRATED = 'hero handoff marking measured calibrated'
const QUANTITIES = `${CALIBRATED} rooms room1 room2 room3 total`
const EXPORT = `${QUANTITIES} export`

/** One settled story state, composed as a static figure: panel beside (or below) the plan. */
function StaticFigure({ stage, reached, label, id }: { stage: string; reached: string; label: string; id?: string }) {
  return (
    <section className="static-figure" id={id} data-stage={stage} data-reached={reached} aria-label={label}>
      <StoryPanel />
      <div className="static-figure__plan">
        {stage === 'export' ? <ExportProof /> : <PlanSheet />}
      </div>
    </section>
  )
}

/** Reduced motion: the same story as composed, static figures in normal document flow. */
function StaticStory() {
  return (
    <>
      <section className="static-hero" data-stage="hero" data-reached="hero" aria-labelledby="hero-title">
        <HeroCopy />
        <div className="static-hero__plan">
          <PlanSheet probe />
        </div>
      </section>
      <StaticFigure stage="calibrated" reached={CALIBRATED} label="כיול" id="takeoff" />
      <StaticFigure stage="total" reached={QUANTITIES} label="סימון חדרים וכמויות" />
      <StaticFigure stage="export" reached={EXPORT} label="ייצוא" />
    </>
  )
}

function App() {
  const reduced = useSyncExternalStore(subscribeReduced, getReduced, () => false)
  useWheelDamping()

  return (
    <div className="site-shell" dir="rtl">
      <a className="skip-link" href="#main-content">דילוג לתוכן</a>
      <Header />
      <main id="main-content">
        {reduced ? <><StaticStory /><StaticCompare /></> : <><MotionStory /><CompareStory /></>}
        <Audience />
        <FinalCta />
      </main>
      <SiteFooter />
    </div>
  )
}

export default App
