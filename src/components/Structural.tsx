import './product-heading.css'
import { ProductBrowser } from './product/ProductBrowser'

export function Structural() {
  return (
    <section className="landing-section structural" id="structural" aria-labelledby="structural-title">
      <header className="product-heading">
        <p className="product-heading__eyebrow">בטון וזיון</p>
        <h2 className="product-heading__title" id="structural-title"><span>מהאלמנט בתוכנית </span><span>לכמויות בטון וזיון.</span></h2>
        <p className="product-heading__lead">מסמנים את העבודה, מגדירים את המידות ואת פרטי הזיון ובודקים את הכמויות. מרכזים את התוצאות לפי תוכנית ופרויקט ומייצאים לדוח.</p>
      </header>
      <ProductBrowser modes={['concrete', 'mesh-bars', 'stirrups']} initialMode="concrete" omitExplanationFor={['concrete']} />
      <div className="structural-capabilities">
        <article><h3>בטון</h3><p>מעבר לתקרה שבדוגמה: אזורי ואלמנטי בטון עם גאומטריה ניתנת לעריכה וסיכומי כמויות לפי תוכנית ופרויקט.</p></article>
        <article><h3>רשתות ומוטות</h3><p>לצד פריסת הרשת שבדוגמה, אפשר לכמת מוטות ישרים לפי שטח וגם מוטות בודדים — לפי פרטי העבודה.</p></article>
        <article><h3>חישוקים</h3><p>מעבר לפריסת הקו שבדוגמה: פריסת חישוקים בתוך שטח וצורות נוספות. צורת החישוק עצמה מופיעה גם בדוחות וב־<bdi dir="ltr">Excel</bdi>.</p></article>
      </div>
    </section>
  )
}
