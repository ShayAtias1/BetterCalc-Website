import { useSyncExternalStore } from 'react'
import './App.css'
import { Header } from './components/Header'
import { MotionStory, StaticStory } from './components/TakeoffStory'
import { CompareStory, StaticCompare } from './components/CompareStory'
import { Structural } from './components/Structural'
import { Devices } from './components/Devices'
import { Reports } from './components/Reports'
import { SiteFooter } from './components/Ending'
import { useWheelDamping } from './hooks/useWheelDamping'
import './landing.css'

// Preserve the original static/reduced-motion figures for small phones as well.
const staticQuery = '(prefers-reduced-motion: reduce), (max-width: 639px)'
const subscribeStatic = (onChange: () => void) => {
  const media = window.matchMedia(staticQuery)
  media.addEventListener('change', onChange)
  return () => media.removeEventListener('change', onChange)
}
const getStatic = () => window.matchMedia(staticQuery).matches

function App() {
  const staticPresentation = useSyncExternalStore(subscribeStatic, getStatic, () => false)
  useWheelDamping()

  return (
    <div className="site-shell" dir="rtl">
      <a className="skip-link" href="#main-content">דילוג לתוכן</a>
      <Header />
      <main id="main-content">
        {staticPresentation ? <StaticStory /> : <MotionStory />}
        <Structural />
        {staticPresentation ? <StaticCompare /> : <CompareStory />}
        <Devices />
        <Reports />
      </main>
      <SiteFooter />
    </div>
  )
}

export default App
