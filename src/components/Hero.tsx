import { APP_URL } from '../data/site'
import { PlanSheet } from './PlanSheet'

export function Hero() {
  return (
    <section className="landing-hero" aria-labelledby="hero-title">
      <div className="landing-hero__copy">
        <h1 id="hero-title">מתוכנית <bdi dir="ltr">PDF</bdi><br /><span>לכמויות.</span></h1>
        <div className="landing-hero__aside">
          <p>מדידה וחישוב כמויות לגמרים, בטון וזיון ישירות על התוכנית. משווים גרסאות ומייצאים דוחות <bdi dir="ltr">PDF</bdi> וכמויות ל־<bdi dir="ltr">Excel</bdi> — בדפדפן, בלי <bdi dir="ltr">CAD</bdi>.</p>
          <div className="landing-actions">
            <a className="primary-action" href={APP_URL}><span>פתחו את <bdi dir="ltr">BetterCalc</bdi></span><span className="primary-action__arrow" aria-hidden="true">←</span></a>
            <a className="secondary-action" href="#takeoff">ראו איך זה עובד <span aria-hidden="true">↓</span></a>
          </div>
        </div>
      </div>
      <figure className="landing-plan landing-hero__plan" data-stage="hero" data-reached="hero">
        <PlanSheet />
        <figcaption>מתחילים בתוכנית אדריכלית. עובדים ישירות על ה־<bdi dir="ltr">PDF</bdi>.</figcaption>
      </figure>
    </section>
  )
}
