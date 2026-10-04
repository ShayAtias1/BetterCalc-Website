import './product-heading.css'
import './structural.css'
import type { CSSProperties } from 'react'
import { STRUCTURAL_MODES, STRUCTURAL_TRAVEL, structuralSteps, useStructuralStory } from '../hooks/useStructuralStory'
import type { DemoMode } from '../data/productDemo'
import { ProductBrowser } from './product/ProductBrowser'

const STRUCTURAL_COPY: Partial<Record<DemoMode, { title: string; description: string }>> = {
  concrete: { title: 'בטון', description: 'מעבר לתקרה שבדוגמה: אזורי ואלמנטי בטון עם גאומטריה ניתנת לעריכה וסיכומי כמויות לפי תוכנית ופרויקט.' },
  'mesh-bars': { title: 'רשתות ומוטות', description: 'לצד פריסת הרשת שבדוגמה, אפשר לכמת מוטות ישרים לפי שטח וגם מוטות בודדים — לפי פרטי העבודה.' },
  stirrups: { title: 'חישוקים', description: 'מעבר לפריסת הקו שבדוגמה: פריסת חישוקים בתוך שטח וצורות נוספות. צורת החישוק עצמה מופיעה גם בדוחות וב־Excel.' },
}

export function Structural() {
  const { track, stage, state, staticPresentation, select, replay } = useStructuralStory()
  return (
    <section className="landing-section structural" id="structural" aria-labelledby="structural-title">
      <header className="product-heading">
        <p className="product-heading__eyebrow">בטון וזיון</p>
        <h2 className="product-heading__title" id="structural-title"><span>מהאלמנט בתוכנית </span><span>לכמויות בטון וזיון.</span></h2>
        <p className="product-heading__lead">מסמנים את העבודה, מגדירים את המידות ואת פרטי הזיון ובודקים את הכמויות. מרכזים את התוצאות לפי תוכנית ופרויקט ומייצאים לדוח.</p>
      </header>
      {staticPresentation ? <div className="structural-static">
        {STRUCTURAL_MODES.map((mode) => <article key={mode}>
          <h3>{STRUCTURAL_COPY[mode]?.title}</h3>
          <p>{STRUCTURAL_COPY[mode]?.description}</p>
          <ProductBrowser modes={[mode]} initialMode={mode} deviceFrame="macbook" hideDescription omitResultFor={[mode]} />
        </article>)}
      </div> : <div className="structural-story" ref={track} style={{ '--structural-travel': `${STRUCTURAL_TRAVEL * 100}svh` } as CSSProperties}>
        <div className="structural-story__stage" ref={stage}>
          <ProductBrowser modes={STRUCTURAL_MODES} initialMode="concrete" deviceFrame="macbook"
            story={{ ...state, onSelect: select, onReplay: replay }}
            omitExplanationFor={['concrete']} omitResultFor={['mesh-bars', 'stirrups']}
            renderSelector={({ mode, phase, transition, panelId, selectMode, selectPhase }) => (
              <div className="structural-index">
                {STRUCTURAL_MODES.map((item, index) => {
                  const expanded = mode === item
                  const copy = STRUCTURAL_COPY[item]
                  const incoming = transition?.progress ?? 1
                  const openness = expanded ? incoming : transition?.fromMode === item && transition.fromMode !== mode ? 1 - incoming : 0
                  const modeEmphasis = transition?.fromMode === mode && expanded ? 1 : openness
                  return <div className="structural-index__mode" key={item}>
                    <button type="button" data-structural-mode id={`${panelId}-${item}`} aria-expanded={expanded} style={{ '--mode-emphasis': modeEmphasis } as CSSProperties} aria-controls={`${panelId}-${item}-steps`}
                      onClick={() => selectMode(item)} onKeyDown={(event) => {
                        const delta = event.key === 'ArrowDown' ? 1 : event.key === 'ArrowUp' ? -1 : 0
                        const next = event.key === 'Home' ? 0 : event.key === 'End' ? STRUCTURAL_MODES.length - 1 : delta ? (index + delta + STRUCTURAL_MODES.length) % STRUCTURAL_MODES.length : null
                        if (next === null) return
                        event.preventDefault()
                        selectMode(STRUCTURAL_MODES[next])
                        event.currentTarget.closest('.structural-index')?.querySelectorAll<HTMLButtonElement>('[data-structural-mode]')[next]?.focus()
                      }}><bdi dir="ltr">0{index + 1}</bdi><span>{copy?.title}</span></button>
                    <div className="structural-index__expanded" id={`${panelId}-${item}-steps`} aria-hidden={!expanded} style={{ '--accordion-open': transition?.fromMode === mode && expanded ? 1 : openness, '--accordion-track': `${transition?.fromMode === mode && expanded ? 1 : openness}fr` } as CSSProperties}><div className="structural-index__clip"><div className="structural-index__content">
                      <ol>{structuralSteps(item).map((label, step) => <li key={label}>
                        <button type="button" aria-pressed={expanded && phase === step} tabIndex={expanded ? 0 : -1} style={{ '--step-emphasis': transition ? (expanded && phase === step ? incoming : 0) + (transition.fromMode === item && transition.fromPhase === step ? 1 - incoming : 0) : expanded && phase === step ? 1 : 0 } as CSSProperties} onClick={() => selectPhase(step)}><bdi dir="ltr">0{step + 1}</bdi><span>{label}</span></button>
                      </li>)}</ol>
                      <div className="product-browser__mode-description"><h3>{copy?.title}</h3><p>{copy?.description}</p></div>
                    </div></div></div>
                  </div>
                })}
              </div>
            )} />
        </div>
      </div>}

    </section>
  )
}
