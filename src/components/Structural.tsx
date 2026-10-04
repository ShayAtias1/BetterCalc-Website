import './product-heading.css'
import './structural.css'
import type { DemoMode } from '../data/productDemo'
import { ProductBrowser } from './product/ProductBrowser'

const STRUCTURAL_COPY: Partial<Record<DemoMode, { title: string; description: string }>> = {
  concrete: { title: 'בטון', description: 'מעבר לתקרה שבדוגמה: אזורי ואלמנטי בטון עם גאומטריה ניתנת לעריכה וסיכומי כמויות לפי תוכנית ופרויקט.' },
  'mesh-bars': { title: 'רשתות ומוטות', description: 'לצד פריסת הרשת שבדוגמה, אפשר לכמת מוטות ישרים לפי שטח וגם מוטות בודדים — לפי פרטי העבודה.' },
  stirrups: { title: 'חישוקים', description: 'מעבר לפריסת הקו שבדוגמה: פריסת חישוקים בתוך שטח וצורות נוספות. צורת החישוק עצמה מופיעה גם בדוחות וב־Excel.' },
}

export function Structural() {
  return (
    <section className="landing-section structural" id="structural" aria-labelledby="structural-title">
      <header className="product-heading">
        <p className="product-heading__eyebrow">בטון וזיון</p>
        <h2 className="product-heading__title" id="structural-title"><span>מהאלמנט בתוכנית </span><span>לכמויות בטון וזיון.</span></h2>
        <p className="product-heading__lead">מסמנים את העבודה, מגדירים את המידות ואת פרטי הזיון ובודקים את הכמויות. מרכזים את התוצאות לפי תוכנית ופרויקט ומייצאים לדוח.</p>
      </header>
      <ProductBrowser modes={['concrete', 'mesh-bars', 'stirrups']} initialMode="concrete" omitExplanationFor={['concrete']} renderModeDescription={(mode) => {
        const copy = STRUCTURAL_COPY[mode]
        return copy ? <><h3>{copy.title}</h3><p>{copy.description}</p></> : null
      }} />

    </section>
  )
}
