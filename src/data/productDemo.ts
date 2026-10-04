export type DemoLocale = 'he' | 'en'
export type DemoSpec = {
  asset: string
  label: Record<DemoLocale, string>
  steps: Record<DemoLocale, readonly [string, string, string]>
  description: Record<DemoLocale, string>
  result: Record<DemoLocale, string>
  adjustment?: Record<DemoLocale, string>
  shape?: string
}

// Fixed visual states captured from the real product. No calculations run on the website.
export const PRODUCT_DEMOS = {
  finishes: {
    asset: 'finishes',
    label: { he: 'גמרים', en: 'Finishes' },
    steps: { he: ['תוכנית מכוילת', 'סימון חדר', 'פרטי עבודה וכמויות'], en: ['Calibrated plan', 'Mark a room', 'Work items and quantities'] },
    description: { he: 'פרטי הריצוף והחיפוי מוצגים במפקח הפריטים לצד התוכנית.', en: 'Flooring and cladding specifications appear in the item inspector beside the plan.' },
    result: { he: 'בדוגמה המצולמת: שטח 12.65 מ״ר · היקף 14.32 מ׳ · חיפוי נטו 32.47 מ״ר לאחר ניכוי פתח של 1.89 מ״ר · פחת 0%.', en: 'Captured example: area 12.65 m² · perimeter 14.32 m · net cladding 32.47 m² after a 1.89 m² opening deduction · waste 0%.' },
  },
  concrete: {
    asset: 'concrete',
    label: { he: 'בטון', en: 'Concrete' },
    steps: { he: ['תוכנית מכוילת', 'סימון אלמנט', 'מידות ונפח'], en: ['Calibrated plan', 'Mark an element', 'Dimensions and volume'] },
    description: { he: 'מסמנים תקרה על התוכנית, מגדירים עובי ובודקים את נפח הבטון שמתקבל.', en: 'Mark a slab on the plan, define its thickness and review the resulting concrete volume.' },
    result: { he: 'בדוגמה המצולמת: שטח בסיס 12.65 מ״ר · עובי 20 ס״מ · נפח 2.53 מ״ק · B30.', en: 'Captured example: footprint 12.65 m² · thickness 20 cm · volume 2.53 m³ · B30.' },
  },
  'mesh-bars': {
    asset: 'mesh',
    label: { he: 'רשתות ומוטות', en: 'Mesh & Bars' },
    steps: { he: ['תוכנית מכוילת', 'סימון אזור רשת', 'זיון, פריסה ורכש'], en: ['Calibrated plan', 'Mark a mesh zone', 'Reinforcement, layout and procurement'] },
    description: { he: 'מגדירים זיון תחתון ועליון ובודקים את פריסת היריעות הפיזית ואת הכמויות לרכש. בחרו הזזת יריעה כדי לראות דוגמה לפריסה ידנית.', en: 'Define bottom and top reinforcement, then inspect physical sheets and procurement quantities. Select the sheet adjustment to inspect a captured manual layout.' },
    result: { he: 'בדוגמה המצולמת: Ø8 @ 20 ס״מ · 6 יריעות בכל מפלס, 12 בסך הכול · משקל נדרש 194.8 ק״ג · לרכישה 307.8 ק״ג. הזזת היריעה שומרת כאן על מספר היריעות.', en: 'Captured example: Ø8 @ 20 cm · 6 sheets per level, 12 total · required weight 194.8 kg · purchase weight 307.8 kg. This sheet move keeps the sheet count unchanged.' },
    adjustment: { he: 'הזזת יריעה לדוגמה / פריסה מקורית', en: 'Example sheet adjustment / original layout' },
  },
  stirrups: {
    asset: 'stirrups',
    label: { he: 'חישוקים', en: 'Stirrups' },
    steps: { he: ['תוכנית מכוילת', 'צורת החישוק', 'פריסת קו וכמויות'], en: ['Calibrated plan', 'Stirrup shape', 'Line distribution and quantities'] },
    description: { he: 'חישוק מלבני סגור נשאר גלוי לצד התוכנית. מגדירים פריסת קו ומרווח ובודקים כמות, אורך ומשקל.', en: 'The actual closed rectangular stirrup stays visible beside the plan. Define a line and spacing to review count, length and weight.' },
    result: { he: 'בדוגמה המצולמת: Ø8 · צורה 30 × 50 ס״מ · מרווח 20 ס״מ · 17 חישוקים · אורך כולל 27.2 מ׳ · משקל 10.7 ק״ג.', en: 'Captured example: Ø8 · 30 × 50 cm shape · spacing 20 cm · 17 stirrups · total length 27.2 m · weight 10.7 kg.' },
    shape: 'stirrups-true-shape',
  },
} satisfies Record<string, DemoSpec>

export type DemoMode = keyof typeof PRODUCT_DEMOS
export const ALL_DEMO_MODES = Object.keys(PRODUCT_DEMOS) as DemoMode[]
export const productAsset = (name: string) => `/assets/product-demo/${name}.webp`
