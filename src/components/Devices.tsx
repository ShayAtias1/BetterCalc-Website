import { productAsset } from '../data/productDemo'

export function Devices() {
  return (
    <section className="landing-section devices" id="field" aria-labelledby="devices-title">
      <div className="section-heading">
        <p className="section-kicker">במשרד ובשטח</p>
        <h2 id="devices-title">עבודה עם התוכנית, גם באתר.</h2>
        <p>סביבת עבודה מלאה במחשב, עריכת כמויות בטאבלט וכלים ממוקדים לבדיקה ולמדידה בטלפון.</p>
      </div>
      <div className="device-proof">
        <figure className="device-proof__tablet">
          <div className="device-proof__frame"><img src={productAsset('tablet-real-ui')} width={2048} height={1536} alt="ממשק BetterCalc האמיתי בטאבלט: חדר מסומן עם ידיות עריכה, פרטי השטח וההיקף ומפקח פתוח לצד התוכנית" loading="lazy" decoding="async" /></div>
          <figcaption><h3>טאבלט · עריכה בשטח</h3><p>עריכת סימונים וגאומטריה ועבודת כמויות ישירות על התוכנית. בדוגמה המצולמת נבחר חדר עם ידיות עריכה, לצד פרטי השטח וההיקף.</p></figcaption>
        </figure>
        <figure className="device-proof__phone">
          <div className="device-proof__frame"><img src={productAsset('phone-real-ui')} width={780} height={1688} alt="ממשק BetterCalc האמיתי בטלפון: פריטי החדר, כמויות ריצוף וחיפוי וכפתור הצגה בתוכנית" loading="lazy" decoding="async" /></div>
          <figcaption><h3>טלפון · בדיקת כמויות</h3><p>תוכניות, פריטים וכמויות, לצד מדידות פשוטות והערות. בדוגמה: סקירת כמויות החדר והצגתו בתוכנית.</p></figcaption>
        </figure>
      </div>
      <div className="desktop-role"><p className="step-number" dir="ltr">DESKTOP</p><h3>מחשב · סביבת העבודה המלאה</h3><p>למדידה וסימון מפורט, עריכת כמויות, ניהול תכולת הפרויקט והפקת דוחות. את עבודת העריכה המלאה עושים במחשב, ועריכת שטח בטאבלט.</p></div>
    </section>
  )
}
