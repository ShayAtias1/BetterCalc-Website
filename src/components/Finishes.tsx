import { ProductBrowser } from './product/ProductBrowser'

export function Finishes() {
  return (
    <section className="landing-section finishes" id="finishes" aria-labelledby="finishes-title">
      <div className="section-heading">
        <p className="section-kicker">גמרים</p>
        <h2 id="finishes-title">מהחדר בתוכנית לכמות העבודה.</h2>
        <p>מסמנים חדר או שטח ומגדירים ריצוף וחיפוי קירות. מחשבים לפי שטח והיקף, מתחשבים בפתחים ובניכויים ומוסיפים את הפחת שקובעים להזמנה.</p>
      </div>
      <ProductBrowser modes={['finishes']} initialMode="finishes" variant="focused" />
      <p className="finishes-edit-note">צריכים לתקן את הסימון? עורכים את הגאומטריה ובודקים את הכמויות המעודכנות. כמות להזמנה תלויה בפריטי העבודה, בניכויים ובפחת שהגדרתם.</p>
    </section>
  )
}
