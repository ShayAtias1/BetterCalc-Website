import { useEffect, useRef, type CSSProperties } from 'react'
import { APP_URL, NAV } from '../data/site'
import logo from '../assets/logo/bettercalc-logo.svg'
import '../ending.css'

const AUDIENCE = [
  { role: 'קבלנים', work: 'כמויות לגמרים, בטון וזיון, ישירות על התוכנית.' },
  { role: 'ריצוף וחיפוי', work: 'מ״ר נטו ולהזמנה, עם פחת שאתם קובעים.' },
  { role: 'קבלני שיפוצים', work: 'מה הורסים ומה בונים — מסומן על התוכנית.' },
  { role: 'מנהלי פרויקטים', work: 'משווים גרסאות ומקבלים דוח PDF של השינויים.' },
  { role: 'חשבי כמויות ואומדנים', work: 'מדידה וחישוב כמויות מתוכניות, עם דוחות PDF ו־Excel.' },
]

/** Arm the existing composition only when observation and motion are available. */
function useSeen<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (motion.matches || !('IntersectionObserver' in window)) {
      el.dataset.seen = 'true'
      return
    }
    el.dataset.reveal = 'index'
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      el.dataset.seen = 'true'
      observer.disconnect()
    }, { threshold: 0.25 })
    const showImmediately = () => {
      if (!motion.matches) return
      el.dataset.seen = 'true'
      delete el.dataset.reveal
      observer.disconnect()
    }
    motion.addEventListener('change', showImmediately)
    observer.observe(el)
    return () => {
      observer.disconnect()
      motion.removeEventListener('change', showImmediately)
      delete el.dataset.reveal
    }
  }, [])
  return ref
}

export function Audience() {
  const ref = useSeen<HTMLElement>()
  return (
    <section className="audience" id="audience" ref={ref} aria-labelledby="audience-title">
      <div className="audience__head">
        <p className="audience__kicker">למי זה מתאים</p>
        <h2 className="audience__title" id="audience-title">
          <span>נבנה לאנשים</span>
          <span>שעובדים עם תוכניות.</span>
        </h2>
        <p className="audience__lead">מי שמקבל תוכנית <bdi dir="ltr">PDF</bdi> וצריך להוציא ממנה כמויות, או להבין מה השתנה בגרסה החדשה.</p>
      </div>
      <ol className="audience__index">
        {AUDIENCE.map((item, i) => (
          <li key={item.role} className="audience__row" style={{ '--i': i } as CSSProperties}>
            <span className="audience__num" dir="ltr">{String(i + 1).padStart(2, '0')}</span>
            <span className="audience__role">{item.role}</span>
            <span className="audience__work">{item.work}</span>
          </li>
        ))}
      </ol>
    </section>
  )
}

export function FinalCta() {
  return (
    <div className="final-cta final-cta--compact" aria-labelledby="final-cta-title">
      <h3 className="final-cta__title" id="final-cta-title">יש לכם תוכנית?<br /><span className="final-cta__line--accent">התחילו לחשב ממנה כמויות.</span></h3>
      <p className="final-cta__lead">פתחו <bdi dir="ltr">PDF</bdi>, כיילו וסמנו את העבודה — בדפדפן, בלי <bdi dir="ltr">CAD</bdi> ובלי התקנה.</p>
      <a className="final-cta__action" href={APP_URL}><span className="final-cta__action-label">פתחו את <bdi dir="ltr">BetterCalc</bdi></span><span className="final-cta__action-arrow" aria-hidden="true">←</span></a>
    </div>
  )
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer__id">
        <a className="brand site-footer__brand" href="#main-content" aria-label="BetterCalc — ראש העמוד"><img className="brand__logo" src={logo} width={120} height={20} alt="" loading="lazy" /></a>
        <p className="site-footer__line">כמויות לגמרים, בטון וזיון והשוואת תוכניות — ישירות מקובצי <bdi dir="ltr">PDF</bdi>.</p>
      </div>
      <nav className="site-footer__nav" aria-label="ניווט תחתון">{NAV.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}<a href="#audience">למי זה מתאים</a></nav>
      <a className="site-footer__app" href={APP_URL}>פתחו את <bdi dir="ltr">BetterCalc</bdi><span aria-hidden="true">←</span></a>
      <p className="site-footer__legal"><span dir="ltr">© {new Date().getFullYear()} BetterCalc</span></p>
    </footer>
  )
}
