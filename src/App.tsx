import { useSyncExternalStore } from 'react'
import './App.css'
import { Header } from './components/Header'
import { MotionStory, StaticStory } from './components/TakeoffStory'
import { CompareStory, StaticCompare } from './components/CompareStory'
import { Devices } from './components/Devices'
import { Reports } from './components/Reports'
import { SiteFooter } from './components/Ending'
import { useWheelDamping } from './hooks/useWheelDamping'
import './landing.css'

// Original pre-Package-1 stories; static alternatives are for reduced motion only.
const staticQuery = '(prefers-reduced-motion: reduce)'
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
        {staticPresentation ? <StaticCompare /> : <CompareStory />}
        <Devices />
        <Reports />
      </main>
      <SiteFooter />
    </div>
  )
}

export default App
