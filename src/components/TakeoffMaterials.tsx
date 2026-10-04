import { useState } from 'react'
import { ProductBrowser } from './product/ProductBrowser'
import type { DemoMode } from '../data/productDemo'
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
  const active = MODES.find(item => item.mode === mode)!
  return <div className="takeoff-materials" id="structural" role="region" aria-labelledby="takeoff-materials-title">
    <header className="takeoff-materials__head">
      <h2 id="takeoff-materials-title"><span>גם בטון וזיון</span><span className="takeoff-materials__accent">ישירות על התכנית.</span></h2>
      <div className="takeoff-materials__modes" role="group" aria-label="בחירת נושא">
        {MODES.map(item => <button key={item.mode} type="button" aria-pressed={mode === item.mode} onClick={() => choose(item.mode)}>{item.title}</button>)}
      </div>
      <p>{active.description}</p>
    </header>
    <ProductBrowser modes={[mode]} initialMode={mode} hideDescription omitResultFor={[mode]}
      story={{ mode, phase, playing: false, onSelect: choose, onReplay: () => setPhase(2) }} />
  </div>
}
