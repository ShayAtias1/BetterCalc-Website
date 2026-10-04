import { PlanSheet } from './PlanSheet'
import { StoryPanel } from './StoryPanel'
import { ExportProof } from './ExportProof'
import { HeroCopy } from './Hero'
import { TakeoffMaterials } from './TakeoffMaterials'
import { useStoryScroll } from '../hooks/useStoryScroll'

export function MotionStory() {
  const { section, stage, heroCopy, rig, panel, register } = useStoryScroll(true)

  return (
    <>
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
    <TakeoffMaterials />
    </>
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
export function StaticStory() {
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
      <TakeoffMaterials />
    </>
  )
}

