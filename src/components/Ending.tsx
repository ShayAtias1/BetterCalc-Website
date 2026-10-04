import { APP_URL, NAV } from '../data/site'
import logo from '../assets/logo/bettercalc-logo.svg'
import '../ending.css'

export function Audience() {
  return (
    <div className="audience-compact" id="audience">
      <h3>לאנשים שעובדים עם תוכניות.</h3>
      <p>קבלנים, חשבי כמויות ואומדנים, מנהלי פרויקטים, קבלני ריצוף וחיפוי וקבלני שיפוצים — כשצריך להוציא כמויות מתוכנית או לבדוק גרסה חדשה.</p>
    </div>
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
