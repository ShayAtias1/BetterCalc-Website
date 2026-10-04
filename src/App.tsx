import './App.css'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Workflow } from './components/Workflow'
import { Finishes } from './components/Finishes'
import { CompareStory } from './components/CompareStory'
import { Structural } from './components/Structural'
import { Devices } from './components/Devices'
import { Reports } from './components/Reports'
import { SiteFooter } from './components/Ending'
import './landing.css'

function App() {
  return (
    <div className="site-shell" dir="rtl">
      <a className="skip-link" href="#main-content">דילוג לתוכן</a>
      <Header />
      <main id="main-content">
        <Hero />
        <Workflow />
        <Finishes />
        <Structural />
        <CompareStory />
        <Devices />
        <Reports />
      </main>
      <SiteFooter />
    </div>
  )
}

export default App
