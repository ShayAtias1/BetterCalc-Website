import './product-heading.css'
import './devices.css'
import { productAsset } from '../data/productDemo'
import { DeviceFrame } from './presentation/DeviceFrame'
import { useDeviceStory } from '../hooks/useDeviceStory'

const WORK_MODES = [
  {
    kind: 'macbook', title: 'מחשב', subtitle: 'סביבת העבודה המלאה',
    paragraphs: ['למדידה וסימון מפורט, עריכת כמויות, ניהול תכולת הפרויקט והפקת דוחות.', 'את עבודת העריכה המלאה עושים במחשב, ועריכת שטח בטאבלט.'],
  },
  {
    kind: 'ipad', title: 'טאבלט', subtitle: 'עריכה בשטח',
    paragraphs: ['עריכת סימונים וגאומטריה ועבודת כמויות ישירות על התוכנית.'],
  },
  {
    kind: 'iphone', title: 'טלפון', subtitle: 'בדיקת כמויות',
    paragraphs: ['תוכניות, פריטים וכמויות, לצד מדידות פשוטות והערות.'],
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
      <header className="product-heading devices__intro">
        <h2 className="product-heading__title" id="devices-title">במשרד <span className="devices-title__accent">ובשטח</span></h2>
        <p className="product-heading__lead">סביבת עבודה מלאה במחשב, עריכת כמויות בטאבלט וכלים ממוקדים לבדיקה ולמדידה בטלפון.</p>
      </header>
      <div className={`field-story${staticPresentation ? ' field-story--static' : ''}`} ref={track}>
        <div className="field-story__stage">
          <header className="field-story__intro">
            <h2 className="product-heading__title">במשרד <span className="devices-title__accent">ובשטח</span></h2>
            <p>סביבת עבודה מלאה במחשב, עריכת כמויות בטאבלט וכלים ממוקדים לבדיקה ולמדידה בטלפון.</p>
          </header>
          <ol className="field-story__axis" dir="ltr" aria-label="מצבי עבודה">
            {WORK_MODES.map((mode, index) => <li key={mode.kind} aria-current={!staticPresentation && active === index ? 'step' : undefined}><bdi>0{index + 1}</bdi> <span dir="rtl">{mode.title}</span></li>)}
          </ol>
          <div className="field-story__scene" ref={scene}>
            {WORK_MODES.map((mode, index) => (
              <figure className={`field-story__device field-story__device--${mode.kind}`} key={mode.kind} ref={deviceRefs[index]}>
                <DeviceFrame kind={mode.kind}>
                  {index === 0 ? <DesktopCapture /> : <img src={productAsset(index === 1 ? 'tablet-real-ui' : 'phone-real-ui')} width={index === 1 ? 2048 : 780} height={index === 1 ? 1536 : 1688} alt={index === 1 ? 'ממשק BetterCalc בטאבלט: חדר מסומן עם ידיות עריכה ומפקח פתוח לצד התוכנית' : 'ממשק BetterCalc בטלפון: פריטי החדר, כמויות ריצוף וחיפוי והצגה בתוכנית'} loading="lazy" decoding="async" />}
                </DeviceFrame>
                <figcaption aria-hidden={!staticPresentation && active !== index ? true : undefined}><div className="field-story__headings"><h3>{mode.title}</h3><h4>{mode.subtitle}</h4></div>{mode.paragraphs.map((paragraph) => <p className="field-story__body" key={paragraph}>{paragraph}</p>)}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
