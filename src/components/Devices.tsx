import './product-heading.css'
import './devices.css'
import { productAsset } from '../data/productDemo'
import { DeviceFrame } from './presentation/DeviceFrame'
import { useDeviceStory } from '../hooks/useDeviceStory'

const WORK_MODES = [
  {
    label: 'DESKTOP', kind: 'macbook',
    title: 'מחשב · סביבת העבודה המלאה',
    description: 'למדידה וסימון מפורט, עריכת כמויות, ניהול תכולת הפרויקט והפקת דוחות. את עבודת העריכה המלאה עושים במחשב, ועריכת שטח בטאבלט.',
  },
  {
    label: 'TABLET', kind: 'ipad',
    title: 'טאבלט · עריכה בשטח',
    description: 'עריכת סימונים וגאומטריה ועבודת כמויות ישירות על התוכנית. בדוגמה המצולמת נבחר חדר עם ידיות עריכה, לצד פרטי השטח וההיקף.',
  },
  {
    label: 'PHONE', kind: 'iphone',
    title: 'טלפון · בדיקת כמויות',
    description: 'תוכניות, פריטים וכמויות, לצד מדידות פשוטות והערות. בדוגמה: סקירת כמויות החדר והצגתו בתוכנית.',
  },
] as const

function DesktopCapture() {
  return (
    <div className="field-desktop-capture" role="img" aria-label="ממשק BetterCalc במחשב: תוכנית, סרגל כלים ומפקח פרטי עבודה וכמויות">
      <img src={productAsset('application-header')} alt="" aria-hidden="true" loading="lazy" decoding="async" />
      <div className="field-desktop-capture__body" dir="ltr">
        <img src={productAsset('finishes-2-inspector')} alt="" aria-hidden="true" loading="lazy" decoding="async" />
        <img src={productAsset('finishes-2-plan')} alt="" aria-hidden="true" loading="lazy" decoding="async" />
      </div>
    </div>
  )
}

export function Devices() {
  const { track, scene, deviceRefs, active, staticPresentation } = useDeviceStory()

  return (
    <section className="landing-section devices" id="field" aria-labelledby="devices-title">
      <header className="product-heading">
        <p className="product-heading__eyebrow">במשרד ובשטח</p>
        <h2 className="product-heading__title" id="devices-title">במשרד ובשטח</h2>
        <p className="product-heading__lead">סביבת עבודה מלאה במחשב, עריכת כמויות בטאבלט וכלים ממוקדים לבדיקה ולמדידה בטלפון.</p>
      </header>
      <div className={`field-story${staticPresentation ? ' field-story--static' : ''}`} ref={track}>
        <div className="field-story__stage">
          <ol className="field-story__axis" dir="ltr" aria-label="מצבי עבודה">
            {WORK_MODES.map((mode, index) => <li key={mode.label} aria-current={!staticPresentation && active === index ? 'step' : undefined}><bdi>0{index + 1}</bdi> {mode.label}</li>)}
          </ol>
          <div className="field-story__scene" ref={scene}>
            {WORK_MODES.map((mode, index) => (
              <figure className={`field-story__device field-story__device--${mode.kind}`} key={mode.label} ref={deviceRefs[index]}>
                <DeviceFrame kind={mode.kind}>
                  {index === 0 ? <DesktopCapture /> : <img src={productAsset(index === 1 ? 'tablet-real-ui' : 'phone-real-ui')} width={index === 1 ? 2048 : 780} height={index === 1 ? 1536 : 1688} alt={index === 1 ? 'ממשק BetterCalc בטאבלט: חדר מסומן עם ידיות עריכה ומפקח פתוח לצד התוכנית' : 'ממשק BetterCalc בטלפון: פריטי החדר, כמויות ריצוף וחיפוי והצגה בתוכנית'} loading="lazy" decoding="async" />}
                </DeviceFrame>
                <figcaption aria-hidden={!staticPresentation && active !== index ? true : undefined}><p className="field-story__label" dir="ltr">{mode.label}</p><h3>{mode.title}</h3><p>{mode.description}</p></figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
