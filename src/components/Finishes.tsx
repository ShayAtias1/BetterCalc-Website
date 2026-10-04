import { ProductBrowser } from './product/ProductBrowser'
import { ProductStage } from './presentation/ProductStage'
import './product-heading.css'
import './finishes.css'

export function Finishes() {
  return (
    <section className="landing-section finishes" id="finishes" aria-labelledby="finishes-title">
      <header className="product-heading">
        <p className="product-heading__eyebrow">גמרים <span aria-hidden="true">/</span> פרטי עבודה</p>
        <h2 className="product-heading__title" id="finishes-title"><span>ריצוף וחיפוי,</span><span>עד לפרטי הכמות.</span></h2>
        <p className="product-heading__lead">ריצוף לפי שטח וחיפוי קירות לפי היקף וגובה, עם פתחים וניכויים. מגדירים פחת לכל פריט עבודה ובודקים את הכמות להזמנה.</p>
      </header>
      <ProductStage>
        <ProductBrowser modes={['finishes']} initialMode="finishes" variant="focused" deviceFrame="desktop" omitExplanationFor={['finishes']} />
      </ProductStage>
    </section>
  )
}
