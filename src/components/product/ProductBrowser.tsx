import { useEffect, useId, useState } from 'react'
import { ALL_DEMO_MODES, PRODUCT_DEMOS, productAsset, type DemoLocale, type DemoMode, type DemoSpec } from '../../data/productDemo'
import { ProductDemoTabs } from './ProductDemoTabs'
import './product-browser.css'

type Props = {
  modes?: readonly DemoMode[]
  initialMode?: DemoMode
  locale?: DemoLocale
  variant?: 'workspace' | 'hero' | 'focused'
}

/** A visual demonstration using separately captured real plan and inspector states.
 * Modes and steps select fixed assets; this component is not a takeoff engine. */
export function ProductBrowser({ modes = ALL_DEMO_MODES, initialMode = 'finishes', locale = 'he', variant = 'workspace' }: Props) {
  const [mode, setMode] = useState<DemoMode>(modes.includes(initialMode) ? initialMode : modes[0])
  const [phase, setPhase] = useState(2)
  const [playing, setPlaying] = useState(false)
  const [failed, setFailed] = useState(false)
  const panelId = `product-demo-${useId()}`
  const demo: DemoSpec = PRODUCT_DEMOS[mode]
  const he = locale === 'he'
  const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce), (max-width: 639px)').matches

  useEffect(() => {
    if (!playing) return
    const media = window.matchMedia('(prefers-reduced-motion: reduce), (max-width: 639px)')
    const settle = () => { setPhase(2); setPlaying(false) }
    if (media.matches) { settle(); return }
    // One short, explicit sequence after a user action. Never cycle modes automatically.
    const select = window.setTimeout(() => setPhase(1), 100)
    const result = window.setTimeout(settle, 650)
    media.addEventListener('change', settle)
    return () => { clearTimeout(select); clearTimeout(result); media.removeEventListener('change', settle) }
  }, [playing, mode])

  useEffect(() => {
    const media = window.matchMedia('(max-width: 639px)')
    const settlePhone = () => { if (media.matches) { setPhase(2); setPlaying(false) } }
    settlePhone()
    media.addEventListener('change', settlePhone)
    return () => media.removeEventListener('change', settlePhone)
  }, [])

  const replay = () => {
    if (reduced()) { setPhase(2); return }
    setPhase(0); setPlaying(true)
  }
  const chooseMode = (next: DemoMode) => {
    setMode(next); setFailed(false)
    if (reduced()) { setPhase(2); setPlaying(false) }
    else { setPhase(0); setPlaying(true) }
  }
  const choosePhase = (next: number) => { setPlaying(false); setPhase(next) }
  const sceneLabel = `${demo.label[locale]} · ${demo.steps[locale][Math.min(phase, 2)]}${phase >= 2 ? ` · ${demo.result[locale]}` : ''}`

  return (
    <div className={`product-browser product-browser--${variant}`} dir={he ? 'rtl' : 'ltr'}>
      {modes.length > 1 && <ProductDemoTabs modes={modes} selected={mode} locale={locale} panelId={panelId} onSelect={chooseMode} />}
      <div className="product-browser__frame" id={panelId} role={modes.length > 1 ? 'tabpanel' : 'group'} aria-labelledby={modes.length > 1 ? `${panelId}-${mode}` : undefined} aria-label={modes.length === 1 ? demo.label[locale] : undefined}>
        <div className="product-browser__chrome"><span className="product-browser__dots" aria-hidden="true"><i /><i /><i /></span><span dir="ltr">BetterCalc / Apartment A</span><span className="product-browser__demo-label">{he ? 'הדגמת מוצר' : 'Product demonstration'}</span></div>
        <div className="product-browser__screen" role="img" aria-label={sceneLabel}>
          <img className="product-browser__app-header" src={productAsset('application-header')} alt="" aria-hidden="true" />
          <div className="product-browser__body" dir="ltr">
            <div className="product-browser__inspector">
              {[0, 1, 2, ...(demo.adjustment ? [3] : [])].map((step) => <img key={step} className={`product-browser__layer ${phase === step ? 'is-current' : ''}`} src={productAsset(`${demo.asset}-${step}-inspector`)} alt="" aria-hidden="true" onError={() => setFailed(true)} />)}
            </div>
            <div className="product-browser__plan">
              {[0, 1, 2, ...(demo.adjustment ? [3] : [])].map((step) => <img key={step} data-step={step} className={`product-browser__layer ${phase === step ? 'is-current' : ''}`} src={productAsset(`${demo.asset}-${step}-plan`)} alt="" aria-hidden="true" onError={() => setFailed(true)} />)}
              {demo.shape && <img className="product-browser__shape" src={productAsset(demo.shape)} alt="" aria-hidden="true" />}
            </div>
          </div>
        </div>
        <div className="product-browser__steps" role="group" aria-label={he ? 'שלבי ההדגמה' : 'Demonstration steps'}>
          {demo.steps[locale].map((step, index) => <button type="button" key={step} aria-pressed={Math.min(phase, 2) === index} onClick={() => choosePhase(index)}><bdi dir="ltr">0{index + 1}</bdi><span>{step}</span></button>)}
          <button className="product-browser__replay" type="button" onClick={replay} disabled={playing}>{he ? 'הדגמה חוזרת' : 'Replay'}</button>
        </div>
      </div>
      <div className="product-browser__explanation">
        <p>{demo.description[locale]}</p>
        {demo.adjustment && <button className="product-browser__adjust" type="button" aria-pressed={phase === 3} onClick={() => choosePhase(phase === 3 ? 2 : 3)}>{demo.adjustment[locale]}</button>}
        <p className="product-browser__result" role="status" aria-live="polite">{phase >= 2 ? demo.result[locale] : demo.steps[locale][phase]}</p>
        {failed && <p role="alert">{he ? 'לא ניתן להציג חלק מצילומי ההדגמה.' : 'Some demonstration images could not be displayed.'}</p>}
        <small>{he ? 'מצבים קבועים שצולמו ב־BetterCalc עם תוכנית דמו. סימון ופרטי העבודה מוגדרים בידי המשתמש.' : 'Fixed states captured in BetterCalc using a demo plan. Geometry and work specifications are defined by the user.'}</small>
      </div>
    </div>
  )
}
