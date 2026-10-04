import { ExportProof } from './ExportProof'
import { Preview } from './Preview'
import { Audience, FinalCta } from './Ending'

export function Reports() {
  return (
    <section className="landing-section reports" id="reports" aria-labelledby="reports-title">
      <div className="section-heading">
        <p className="section-kicker">דוחות וכמויות</p>
        <h2 id="reports-title">מהסימון לתוצר שאפשר לעבוד איתו.</h2>
        <p>דוחות <bdi dir="ltr">PDF</bdi> וכמויות ל־<bdi dir="ltr">Excel</bdi> לגמרים, בטון וזיון. דוח השוואת תוכניות ב־<bdi dir="ltr">PDF</bdi> מתעד את השינויים שסימנתם.</p>
      </div>
      <div className="report-evidence">
        <ExportProof />
        <figure className="report-compare">
          <figcaption><span className="doc__type" dir="ltr">PDF</span> השוואת תוכניות · סימונים ידניים</figcaption>
          <Preview name="compare-report-p2-table" width={1804} height={444} alt="טבלה מדוח ההשוואה האמיתי: סימון הריסה 0.75 מ״ר וסימון בנייה חדשה 0.75 מ״ר" />
          <p>קטע מהדוח: הכמויות של סימוני ההריסה והבנייה שהוגדרו בדוגמה.</p>
        </figure>
      </div>
      <Audience />
      <FinalCta />
    </section>
  )
}
