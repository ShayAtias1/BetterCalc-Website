import type { ReactNode } from 'react'
import { ProductGroup } from './ProductGroup'

type DevicesProps = { visuals?: Partial<Record<'desktop' | 'tablet' | 'phone', ReactNode>> }

export function Devices({ visuals = {} }: DevicesProps) {
  return (
    <section className="landing-section devices" id="field" aria-labelledby="devices-title">
      <div className="section-heading">
        <p className="section-kicker">במשרד ובשטח</p>
        <h2 id="devices-title">עבודה עם התוכנית, גם באתר.</h2>
        <p>סביבת עבודה מלאה במחשב, עריכת כמויות בטאבלט וכלים ממוקדים לבדיקה ולמדידה בטלפון.</p>
      </div>
      <div className="product-groups device-groups">
        <ProductGroup id="desktop" index="DESKTOP" title="מחשב" summary="סביבת העבודה המלאה של BetterCalc." steps={['מדידה וסימון מפורט', 'עריכת כמויות וניהול תכולת הפרויקט', 'הפקת דוחות וכמויות']} detail="לעבודת כמויות מלאה על תוכניות PDF — מהסימון ועד הדוח." visual={visuals.desktop} />
        <ProductGroup id="tablet" index="TABLET" title="טאבלט" summary="עריכה ועבודת כמויות ישירות על התוכנית בשטח." steps={['פותחים את התוכנית לעבודה באתר', 'עורכים סימונים וגאומטריה', 'בודקים את כמויות העבודה']} detail="כלי עבודה לעריכת כמויות בשטח, לצד התוכנית עצמה." visual={visuals.tablet} />
        <ProductGroup id="phone" index="PHONE" title="טלפון" summary="בדיקת התוכנית והכמויות וכלים פשוטים לעבודה באתר." steps={['סוקרים תוכניות ופריטים', 'בודקים כמויות', 'מוסיפים מדידות פשוטות והערות']} detail="לסקירה ולפעולות ממוקדות; את עבודת העריכה המלאה עושים במחשב, ועריכת שטח בטאבלט." visual={visuals.phone} />
      </div>
    </section>
  )
}
