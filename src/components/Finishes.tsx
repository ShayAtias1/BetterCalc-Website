import { ProductBrowser } from './product/ProductBrowser'
import { ProductStage } from './presentation/ProductStage'
import './finishes.css'

// Reference values from the existing captured final state, not live website calculations.
const CAPTURED_METRICS = [
  { label: 'שטח ריצוף', value: '12.65', unit: 'מ״ר' },
  { label: 'היקף החדר', value: '14.32', unit: 'מ׳' },
  { label: 'חיפוי נטו לאחר ניכוי פתח', value: '32.47', unit: 'מ״ר' },
  { label: 'פתח לניכוי', value: '1.89', unit: 'מ״ר' },
]

export function Finishes() {
  return (
    <section className="landing-section finishes" id="finishes" aria-labelledby="finishes-title">
      <div className="section-heading">
        <p className="section-kicker">גמרים</p>
        <h2 id="finishes-title"><span>ריצוף וחיפוי,</span><span>עד לפרטי הכמות.</span></h2>
        <p>ריצוף לפי שטח וחיפוי קירות לפי היקף וגובה, עם פתחים וניכויים. מגדירים פחת לכל פריט עבודה ובודקים את הכמות להזמנה.</p>
      </div>
      <ProductStage
        annotations={<>
          <p className="product-stage__rail-label">ערכים ממצב הדמו הסופי</p>
          <dl>{CAPTURED_METRICS.map((metric) => (
            <div className="product-stage__metric" key={metric.label}>
              <dt>{metric.label}</dt>
              <dd><bdi dir="ltr">{metric.value}</bdi><span>{metric.unit}</span></dd>
            </div>
          ))}</dl>
        </>}
        caption={<p>התוכנית השתנתה או הסימון צריך תיקון? עורכים את הגאומטריה ובודקים את הכמויות המעודכנות.</p>}
      >
        <ProductBrowser modes={['finishes']} initialMode="finishes" variant="focused" deviceFrame="macbook" />
      </ProductStage>
    </section>
  )
}
