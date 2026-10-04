import { Audience, FinalCta } from './Ending'

export function Reports() {
  return (
    <>
      <section className="landing-section reports" id="reports" aria-labelledby="reports-title">
        <div className="section-heading">
          <p className="section-kicker">דוחות וכמויות</p>
          <h2 id="reports-title">מהסימון לתוצר שאפשר לעבוד איתו.</h2>
          <p>דוחות כמויות ב־<bdi dir="ltr">PDF</bdi> וכמויות ל־<bdi dir="ltr">Excel</bdi>: גמרים, נפחי בטון וכמויות זיון לרכש, כולל צורות החישוקים.</p>
        </div>
      </section>
      <Audience />
      <div className="reports-final-cta">
        <FinalCta />
      </div>
    </>
  )
}
