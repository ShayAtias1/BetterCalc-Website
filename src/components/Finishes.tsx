import { PlanSheet } from './PlanSheet'
import { ROOMS, TOTAL } from '../data/qto'

export function Finishes() {
  return (
    <section className="landing-section finishes" id="finishes" aria-labelledby="finishes-title">
      <div className="section-heading">
        <p className="section-kicker">גמרים</p>
        <h2 id="finishes-title">מהחדר בתוכנית לכמות העבודה.</h2>
        <p>מסמנים חדר או שטח ומגדירים ריצוף וחיפוי קירות. מחשבים לפי שטח והיקף, מתחשבים בפתחים ובניכויים ומוסיפים את הפחת שקובעים להזמנה.</p>
      </div>
      <div className="finishes-layout">
        <figure className="landing-plan finishes-plan" data-stage="total" data-reached="hero handoff marking measured calibrated rooms room1 room2 room3 total">
          <div className="finishes-plan__window"><PlanSheet /></div>
          <figcaption>דוגמת סימון חדרים על תוכנית הדמו. הכמויות מוצגות לצד התוכנית ומבוססות על הייצוא שלה.</figcaption>
        </figure>
        <div className="quantity-result">
          <p className="section-kicker">כמויות לפי חדר</p>
          <dl>{ROOMS.map((room) => <div key={room.id}><dt>{room.name}</dt><dd><bdi dir="ltr">{room.area}</bdi> מ״ר</dd></div>)}</dl>
          <p className="quantity-result__total"><span>סה״כ ריצוף</span><strong><bdi dir="ltr">{TOTAL}</bdi> מ״ר</strong></p>
          <p>בדוגמה זו הפחת הוא <bdi dir="ltr">0%</bdi>. כמות להזמנה תלויה בפריטי העבודה, בניכויים ובפחת שהגדרתם.</p>
          <p className="quantity-result__note">צריכים לתקן את הסימון? עורכים את הגאומטריה ובודקים את הכמויות המעודכנות.</p>
        </div>
      </div>
    </section>
  )
}
