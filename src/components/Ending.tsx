import { useEffect, useRef, type CSSProperties } from 'react'
import { APP_URL, NAV } from '../data/site'
import logo from '../assets/logo/bettercalc-logo.svg'
import '../ending.css'

const AUDIENCE = [
  { role: 'קבלני גמר', work: 'כמויות לפי חדר, מוכנות להזמנה.' },
  { role: 'ריצוף וחיפוי', work: 'מ״ר נטו ולהזמנה, עם פחת שאתם קובעים.' },
  { role: 'קבלני שיפוצים', work: 'מה הורסים ומה בונים — מסומן על התוכנית.' },
  { role: 'מנהלי פרויקטים', work: 'משווים גרסאות ומקבלים דוח PDF של השינויים.' },
  { role: 'מפקחים', work: 'השוואה חזותית בין גרסאות ותיעוד תכולת השינוי.' },
]

/** Marks a section as seen once, so CSS can play a single, subtle entrance. */
function useSeen<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      el.dataset.seen = 'true'
      observer.disconnect()
    }, { threshold: 0.25 })
    observer.observe(el)
    return () => observer.disconnect()
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
  const ref = useSeen<HTMLElement>()
  return (
    <section className="final-cta" ref={ref} aria-labelledby="final-cta-title">
      <span className="final-cta__crop final-cta__crop--tr" aria-hidden="true" />
      <span className="final-cta__crop final-cta__crop--tl" aria-hidden="true" />
      <span className="final-cta__crop final-cta__crop--br" aria-hidden="true" />
      <span className="final-cta__crop final-cta__crop--bl" aria-hidden="true" />
      <h2 className="final-cta__title" id="final-cta-title">
        <span className="final-cta__line">יש לכם תוכנית?</span>
        <span className="final-cta__line final-cta__line--accent">תנו ל־<bdi dir="ltr">BetterCalc</bdi></span>
        <span className="final-cta__line final-cta__line--accent">לעשות ממנה יותר.</span>
      </h2>
      <p className="final-cta__lead">מתחילים מקובץ <bdi dir="ltr">PDF</bdi>. בלי <bdi dir="ltr">CAD</bdi>, בלי התקנה.</p>
      {/* The story began with one dimension line; it ends on one, with the action as its value. */}
      <div className="final-cta__dimension">
        <span className="final-cta__end final-cta__end--start" aria-hidden="true" />
        <span className="final-cta__rule final-cta__rule--start" aria-hidden="true" />
        <a className="final-cta__action" href={APP_URL}>
          <span className="final-cta__action-label">פתחו את <bdi dir="ltr">BetterCalc</bdi></span>
          <span className="final-cta__action-arrow" aria-hidden="true">←</span>
        </a>
        <span className="final-cta__rule final-cta__rule--end" aria-hidden="true" />
        <span className="final-cta__end final-cta__end--end" aria-hidden="true" />
      </div>
      <p className="final-cta__note" dir="ltr">bettercalcapp.netlify.app</p>
    </section>
  )
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer__id">
        <a className="brand site-footer__brand" href="#main-content" aria-label="BetterCalc — ראש העמוד">
          <img className="brand__logo" src={logo} width={120} height={20} alt="" loading="lazy" />
        </a>
        <p className="site-footer__line">חישוב כמויות והשוואת גרסאות, ישירות מקובצי <bdi dir="ltr">PDF</bdi>.</p>
      </div>
      <nav className="site-footer__nav" aria-label="ניווט תחתון">
        {NAV.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}
      </nav>
      <a className="site-footer__app" href={APP_URL}>פתחו את <bdi dir="ltr">BetterCalc</bdi><span aria-hidden="true">←</span></a>
      <p className="site-footer__legal"><span dir="ltr">© {new Date().getFullYear()} BetterCalc</span></p>
    </footer>
  )
}
