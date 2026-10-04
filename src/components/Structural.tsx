import type { ReactNode } from 'react'
import { ProductGroup } from './ProductGroup'

type StructuralProps = { visuals?: Partial<Record<'concrete' | 'mesh-bars' | 'stirrups', ReactNode>> }

export function Structural({ visuals = {} }: StructuralProps) {
  return (
    <section className="landing-section structural" id="structural" aria-labelledby="structural-title">
      <div className="section-heading">
        <p className="section-kicker">בטון וזיון</p>
        <h2 id="structural-title">מהאלמנט בתוכנית לכמויות בטון וזיון.</h2>
        <p>מסמנים את העבודה, מגדירים את המידות ואת פרטי הזיון ובודקים את הכמויות. מרכזים את התוצאות לפי תוכנית ופרויקט ומייצאים לדוח.</p>
      </div>
      <div className="product-groups">
        <ProductGroup id="concrete" index="01" title="בטון" summary="כמויות נפח לאזורים ולאלמנטים שסימנתם על התוכנית." steps={['מסמנים אזור או אלמנט', 'מגדירים מידות ועורכים את הגאומטריה', 'בודקים נפח וסיכומי תוכנית ופרויקט']} detail="כמויות הבטון זמינות בדוחות PDF וב־Excel." visual={visuals.concrete} />
        <ProductGroup id="mesh-bars" index="02" title="רשתות ומוטות" summary="זיון תחתון ועליון, כמויות לרכש ופריסת רשתות על התוכנית." steps={['מגדירים אזור ואת פרטי הזיון', 'בודקים את הכמויות לרכש', 'סוקרים את פריסת הרשתות וממקמים יריעות ידנית']} detail="Mesh Layout לפריסה פיזית של רשתות, מוטות ישרים לפי שטח ומוטות בודדים — לפי העבודה שאתם מכמתים." visual={visuals['mesh-bars']} />
        <ProductGroup id="stirrups" index="03" title="חישוקים" summary="מגדירים את צורת החישוק ואת הפריסה, ומקבלים כמויות לתיעוד." steps={['מגדירים צורת חישוק', 'פורסים לאורך קו או בתוך שטח', 'בודקים כמויות ומפיקים דוח']} detail="צורת החישוק עצמה מופיעה בדוחות וב־Excel, לצד הכמויות." visual={visuals.stirrups} />
      </div>
    </section>
  )
}
