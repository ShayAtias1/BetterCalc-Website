import type { Ref } from 'react'
import { APP_URL } from '../data/site'

/** Original hero composition and scroll ref, with the current product message and CTAs. */
export function HeroCopy({ copyRef }: { copyRef?: Ref<HTMLDivElement> }) {
  return (
    <div className="hero-copy" ref={copyRef}>
      <h1 className="hero-copy__title" id="hero-title">
        <span className="hero-copy__line">מתוכנית <bdi dir="ltr">PDF</bdi></span>
        <span className="hero-copy__line hero-copy__line--accent">לכמויות.</span>
      </h1>
      <div className="hero-copy__aside">
        <ol className="hero-flow" aria-label="איך זה עובד">
          <li><bdi dir="ltr">PDF</bdi></li><li>כיול</li><li>כמויות</li>
        </ol>
        <p className="hero-copy__lead">מדידה וחישוב כמויות לגמרים, בטון וזיון ישירות על התוכנית. משווים גרסאות ומייצאים דוחות <bdi dir="ltr">PDF</bdi> וכמויות ל־<bdi dir="ltr">Excel</bdi> — בדפדפן, בלי <bdi dir="ltr">CAD</bdi>.</p>
        <a className="primary-action" href={APP_URL}><span>פתחו את <bdi dir="ltr">BetterCalc</bdi></span><span className="primary-action__arrow" aria-hidden="true">←</span></a>
        <a className="hero-secondary-action" href="#takeoff">ראו איך זה עובד <span aria-hidden="true">↓</span></a>
      </div>
    </div>
  )
}
