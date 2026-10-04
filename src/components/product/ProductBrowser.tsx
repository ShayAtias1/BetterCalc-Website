import { useEffect, useId, useState, type ReactNode } from 'react'
import { ALL_DEMO_MODES, PRODUCT_DEMOS, productAsset, type DemoLocale, type DemoMode, type DemoSpec } from '../../data/productDemo'
import { ProductDemoTabs } from './ProductDemoTabs'
import { DeviceFrame, type DeviceKind } from '../presentation/DeviceFrame'
import './product-browser.css'

type Props = {
  modes?: readonly DemoMode[]
  initialMode?: DemoMode
  locale?: DemoLocale
  variant?: 'workspace' | 'hero' | 'focused'
  /** Presentation only: omit the text footer for these demo modes. */
  omitExplanationFor?: readonly DemoMode[]
  /** Omit captured-result copy/disclaimer while retaining adjustment controls. */
  omitResultFor?: readonly DemoMode[]
  hideDescription?: boolean
  /** Place the existing mode selector and active copy in a technical side rail. */
  renderModeDescription?: (mode: DemoMode) => ReactNode
  /** Optional owner for a scroll story; all visuals and controls use its single state. */
  story?: { mode: DemoMode; phase: number; playing: boolean; transition?: { fromMode: DemoMode; fromPhase: number; progress: number }; onSelect: (mode: DemoMode, phase: number) => void; onReplay: () => void }
  renderSelector?: (context: { mode: DemoMode; phase: number; transition?: { fromMode: DemoMode; fromPhase: number; progress: number }; panelId: string; adjustmentControl: ReactNode; selectMode: (mode: DemoMode) => void; selectPhase: (phase: number) => void }) => ReactNode
  deviceFrame?: DeviceKind
}

/** A visual demonstration using separately captured real plan and inspector states.
 * Modes and steps select fixed assets; this component is not a takeoff engine. */
export function ProductBrowser({ modes = ALL_DEMO_MODES, initialMode = 'finishes', locale = 'he', variant = 'workspace', deviceFrame, omitExplanationFor = [], omitResultFor = [], renderModeDescription, story, renderSelector, hideDescription = false }: Props) {
  const [localMode, setMode] = useState<DemoMode>(modes.includes(initialMode) ? initialMode : modes[0])
  const [localPhase, setPhase] = useState(2)
  const [localPlaying, setPlaying] = useState(false)
  const mode = story?.mode ?? localMode
  const phase = story?.phase ?? localPhase
  const playing = story?.playing ?? localPlaying
  const [failed, setFailed] = useState(false)
  const panelId = `product-demo-${useId()}`
  const demo: DemoSpec = PRODUCT_DEMOS[mode]
  const he = locale === 'he'
  const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce), (max-width: 639px)').matches

  useEffect(() => {
    if (story || !playing) return
    const media = window.matchMedia('(prefers-reduced-motion: reduce), (max-width: 639px)')
    const settle = () => { setPhase(2); setPlaying(false) }
    if (media.matches) { settle(); return }
    // One short, explicit sequence after a user action. Never cycle modes automatically.
    const select = window.setTimeout(() => setPhase(1), 100)
    const result = window.setTimeout(settle, 650)
    media.addEventListener('change', settle)
    return () => { clearTimeout(select); clearTimeout(result); media.removeEventListener('change', settle) }
  }, [playing, mode, story])

  useEffect(() => {
    if (story) return
    const media = window.matchMedia('(max-width: 639px)')
    const settlePhone = () => { if (media.matches) { setPhase(2); setPlaying(false) } }
    settlePhone()
    media.addEventListener('change', settlePhone)
    return () => media.removeEventListener('change', settlePhone)
  }, [story])

  const replay = () => {
    if (story) { story.onReplay(); return }
    if (reduced()) { setPhase(2); return }
    setPhase(0); setPlaying(true)
  }
  const chooseMode = (next: DemoMode) => {
    if (story) { setFailed(false); story.onSelect(next, 0); return }
    setMode(next); setFailed(false)
    if (reduced()) { setPhase(2); setPlaying(false) }
    else { setPhase(0); setPlaying(true) }
  }
  const choosePhase = (next: number) => { if (story) { story.onSelect(mode, next); return }; setPlaying(false); setPhase(next) }
  const adjustmentControl = demo.adjustment ? <button className="product-browser__adjust" type="button" aria-pressed={phase === 3} onClick={() => choosePhase(phase === 3 ? 2 : 3)}>{demo.adjustment[locale]}</button> : null
  const sceneLabel = `${demo.label[locale]} · ${demo.steps[locale][Math.min(phase, 2)]}${phase >= 2 ? ` · ${demo.result[locale]}` : ''}`

  const capture = (captureMode: DemoMode, capturePhase: number) => {
    const captured: DemoSpec = PRODUCT_DEMOS[captureMode]
    return (
    <div className="product-browser__screen" role="img" aria-label={sceneLabel}>
      <img className="product-browser__app-header" src={productAsset('application-header')} alt="" aria-hidden="true" />
      <div className="product-browser__body" dir="ltr">
        <div className="product-browser__inspector">
          {[0, 1, 2, ...(captured.adjustment ? [3] : [])].map((step) => <img key={step} className={`product-browser__layer ${capturePhase === step ? 'is-current' : ''}`} src={productAsset(`${captured.asset}-${step}-inspector`)} alt="" aria-hidden="true" onError={() => setFailed(true)} />)}
        </div>
        <div className="product-browser__plan">
          {[0, 1, 2, ...(captured.adjustment ? [3] : [])].map((step) => <img key={step} data-step={step} className={`product-browser__layer ${capturePhase === step ? 'is-current' : ''}`} src={productAsset(`${captured.asset}-${step}-plan`)} alt="" aria-hidden="true" onError={() => setFailed(true)} />)}
          <img className="product-browser__phone-focus" src={productAsset(`${captured.asset}-phone-focus`)} alt="" aria-hidden="true" />
          {captured.shape && <img className="product-browser__shape" src={productAsset(captured.shape)} alt="" aria-hidden="true" />}
        </div>
      </div>
    </div>
    )
  }

  const transition = story?.transition
  const screen = story ? (
    <div className="product-browser__blend" data-blending={transition ? 'true' : undefined}>
      {transition && <div key="outgoing" className="product-browser__blend-out" aria-hidden="true" style={{ opacity: 1 - transition.progress }}>{capture(transition.fromMode, transition.fromPhase)}</div>}
      <div key="incoming" style={{ opacity: transition?.progress ?? 1, transform: `translateX(${transition ? (1 - transition.progress) * 4 : 0}px)` }}>{capture(mode, phase)}</div>
    </div>
  ) : capture(mode, phase)

  return (
    <div className={`product-browser product-browser--${variant}${deviceFrame ? ' product-browser--device' : ''}${renderModeDescription || renderSelector ? ' product-browser--side-selector' : ''}`} dir={he ? 'rtl' : 'ltr'}>
      {modes.length > 1 && (renderSelector ? <aside className="product-browser__mode-rail">{renderSelector({ mode, phase, transition, panelId, adjustmentControl, selectMode: chooseMode, selectPhase: choosePhase })}</aside> : renderModeDescription ? (
        <aside className="product-browser__mode-rail">
          <ProductDemoTabs modes={modes} selected={mode} locale={locale} panelId={panelId} onSelect={chooseMode} orientation="vertical" numbered />
          <div className="product-browser__mode-description" aria-live="polite">{renderModeDescription(mode)}</div>
        </aside>
      ) : <ProductDemoTabs modes={modes} selected={mode} locale={locale} panelId={panelId} onSelect={chooseMode} />)}
      <div className="product-browser__frame" id={panelId} role={modes.length > 1 && !renderSelector ? 'tabpanel' : 'group'} aria-labelledby={modes.length > 1 ? `${panelId}-${mode}` : undefined} aria-label={modes.length === 1 ? demo.label[locale] : undefined}>
        {deviceFrame === 'macbook' ? <DeviceFrame kind="macbook"><div><div className="product-browser__chrome"><span className="product-browser__dots" aria-hidden="true"><i /><i /><i /></span><span dir="ltr">BetterCalc / Apartment A</span><span className="product-browser__demo-label">{he ? 'הדגמת מוצר' : 'Product demonstration'}</span></div>{screen}</div></DeviceFrame> : <>
          <div className="product-browser__chrome"><span className="product-browser__dots" aria-hidden="true"><i /><i /><i /></span><span dir="ltr">BetterCalc / Apartment A</span><span className="product-browser__demo-label">{he ? 'הדגמת מוצר' : 'Product demonstration'}</span></div>
          {deviceFrame ? <DeviceFrame kind={deviceFrame} compactFallback>{screen}</DeviceFrame> : screen}
        </>}
        <div className="product-browser__steps" role="group" aria-label={he ? 'שלבי ההדגמה' : 'Demonstration steps'}>
          {!renderSelector && demo.steps[locale].map((step, index) => <button type="button" key={step} aria-pressed={Math.min(phase, 2) === index} onClick={() => choosePhase(index)}><bdi dir="ltr">0{index + 1}</bdi><span>{step}</span></button>)}
          <button className="product-browser__replay" type="button" onClick={replay} disabled={playing}>{he ? 'הדגמה חוזרת' : 'Replay'}</button>
        </div>
      </div>
      {!omitExplanationFor.includes(mode) && (!omitResultFor.includes(mode) || (demo.adjustment && !renderSelector) || failed || (!renderModeDescription && !renderSelector && !hideDescription)) && <div className="product-browser__explanation">
        {!renderModeDescription && !renderSelector && !hideDescription && <p>{demo.description[locale]}</p>}
        {!renderSelector && adjustmentControl}
        {!omitResultFor.includes(mode) && <p className="product-browser__result" role="status" aria-live="polite">{phase >= 2 ? demo.result[locale] : demo.steps[locale][phase]}</p>}
        {failed && <p role="alert">{he ? 'לא ניתן להציג חלק מצילומי ההדגמה.' : 'Some demonstration images could not be displayed.'}</p>}
        {!omitResultFor.includes(mode) && <small>{he ? 'מצבים קבועים שצולמו ב־BetterCalc עם תוכנית דמו. סימון ופרטי העבודה מוגדרים בידי המשתמש.' : 'Fixed states captured in BetterCalc using a demo plan. Geometry and work specifications are defined by the user.'}</small>}
      </div>}
    </div>
  )
}
