import { useState } from 'react'
import { ProductBrowser } from './product/ProductBrowser'
import type { DemoMode } from '../data/productDemo'
import { useMaterialsStory } from '../hooks/useMaterialsStory'
import './takeoff-materials.css'

const MODES = [
  { mode: 'concrete', title: 'בטון', description: 'אזורי ואלמנטי בטון, מידות ונפחים, עם סיכומי כמויות לפי תוכנית ופרויקט.' },
  { mode: 'mesh-bars', title: 'רשתות ומוטות', description: 'זיון תחתון ועליון, פריסת רשת וכמויות לרכש. גם מוטות ישרים לפי שטח ומוטות בודדים.' },
  { mode: 'stirrups', title: 'חישוקים', description: 'צורות חישוקים ופריסות בקו ובשטח. צורת החישוק מופיעה גם בדוחות וב־Excel.' },
] as const

/** A simple continuation of Takeoff, without a separate pinned structural timeline. */
export function TakeoffMaterials() {
  const [mode, setMode] = useState<DemoMode>('concrete')
  const [phase, setPhase] = useState(2)
  const choose = (next: DemoMode, nextPhase = 2) => { setMode(next); setPhase(nextPhase) }
  const mobileStory = useMaterialsStory()
  const active = MODES.find(item => item.mode === mode)!
  if (mobileStory.mobile) return <div className="takeoff-materials" id="structural" role="region" aria-labelledby="takeoff-materials-title">
    <div className="materials-story" ref={mobileStory.track}>
      <div className="materials-story__stage" ref={mobileStory.stage}>
        <header className="takeoff-materials__head">
          <h2 id="takeoff-materials-title"><span>גם בטון וזיון</span><span className="takeoff-materials__accent">ישירות על התכנית.</span></h2>
        </header>
        <ol className="materials-story__axis" dir="ltr" aria-label="נושאי בטון וזיון">
          {MODES.map((item, index) => <li key={item.mode} aria-current={mobileStory.active === index ? 'step' : undefined}><bdi>0{index + 1}</bdi><span dir="rtl">{item.title}</span></li>)}
        </ol>
        <div className="materials-story__scene" ref={mobileStory.scene}>
          {MODES.map((item, index) => <article className="materials-story__group" key={item.mode} aria-hidden={mobileStory.active !== index} inert={mobileStory.active !== index}>
            <p>{item.description}</p>
            <ProductBrowser modes={[item.mode]} initialMode={item.mode} hideDescription omitResultFor={[item.mode]}
              story={{ mode: item.mode, phase: 2, playing: false, onSelect: () => {}, onReplay: () => {} }} />
          </article>)}
        </div>
      </div>
    </div>
  </div>
  return <div className="takeoff-materials" id="structural" role="region" aria-labelledby="takeoff-materials-title">
    <header className="takeoff-materials__head">
      <h2 id="takeoff-materials-title"><span>גם בטון וזיון</span><span className="takeoff-materials__accent">ישירות על התכנית.</span></h2>
    </header>
    <div className="takeoff-materials__body">
      <aside className="takeoff-materials__rail">
      <div className="takeoff-materials__modes" role="group" aria-label="בחירת נושא">
        {MODES.map(item => <button key={item.mode} type="button" aria-pressed={mode === item.mode} onClick={() => choose(item.mode)}>{item.title}</button>)}
      </div>
      <p>{active.description}</p>
      </aside>
    <ProductBrowser modes={[mode]} initialMode={mode} hideDescription omitResultFor={[mode]}
      story={{ mode, phase, playing: false, onSelect: choose, onReplay: () => setPhase(2) }} />
    </div>
  </div>
}
