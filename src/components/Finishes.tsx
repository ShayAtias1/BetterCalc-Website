import { ProductBrowser } from './product/ProductBrowser'

export function Finishes() {
  return (
    <section className="landing-section finishes" id="finishes" aria-labelledby="finishes-title">
      <div className="section-heading">
        <p className="section-kicker">גמרים</p>
        <h2 id="finishes-title">ריצוף וחיפוי, עד לפרטי הכמות.</h2>
        <p>ריצוף לפי שטח וחיפוי קירות לפי היקף וגובה, עם פתחים וניכויים. מגדירים פחת לכל פריט עבודה ובודקים את הכמות להזמנה.</p>
      </div>
      <ProductBrowser modes={['finishes']} initialMode="finishes" variant="focused" />
      <p className="finishes-edit-note">התוכנית השתנתה או הסימון צריך תיקון? עורכים את הגאומטריה ובודקים את הכמויות המעודכנות.</p>
    </section>
  )
}
