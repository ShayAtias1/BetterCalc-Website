import { ProductBrowser } from './product/ProductBrowser'

export function Structural() {
  return (
    <section className="landing-section structural" id="structural" aria-labelledby="structural-title">
      <div className="section-heading">
        <p className="section-kicker">בטון וזיון</p>
        <h2 id="structural-title">מהאלמנט בתוכנית לכמויות בטון וזיון.</h2>
        <p>מסמנים את העבודה, מגדירים את המידות ואת פרטי הזיון ובודקים את הכמויות. מרכזים את התוצאות לפי תוכנית ופרויקט ומייצאים לדוח.</p>
      </div>
      <ProductBrowser modes={['concrete', 'mesh-bars', 'stirrups']} initialMode="concrete" />
      <div className="structural-capabilities">
        <article><h3>בטון</h3><p>כמויות נפח לאזורים ולאלמנטים שסימנתם. מגדירים מידות ועורכים את הגאומטריה, בודקים סיכומי תוכנית ופרויקט ומייצאים ל־<bdi dir="ltr">PDF</bdi> ול־<bdi dir="ltr">Excel</bdi>.</p></article>
        <article><h3>רשתות ומוטות</h3><p>זיון תחתון ועליון, כמויות לרכש ו־<bdi dir="ltr">Mesh Layout</bdi> לפריסה פיזית ולמיקום ידני של יריעות. מוטות ישרים לפי שטח ומוטות בודדים — לפי העבודה שאתם מכמתים.</p></article>
        <article><h3>חישוקים</h3><p>צורות אמיתיות ופריסות לאורך קו או בתוך שטח. בודקים כמויות ומפיקים דוחות ו־<bdi dir="ltr">Excel</bdi> שבהם מופיעה צורת החישוק עצמה.</p></article>
      </div>
    </section>
  )
}
