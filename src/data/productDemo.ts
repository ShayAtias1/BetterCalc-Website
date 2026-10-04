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
    description: { he: 'מסמנים חדר, מגדירים ריצוף וחיפוי ומקבלים כמות לפי השטח, ההיקף והפתחים.', en: 'Mark a room, define flooring and cladding, and review quantities from area, perimeter and openings.' },
    result: { he: 'בדוגמה המצולמת: שטח 12.65 מ״ר · היקף 14.32 מ׳ · חיפוי נטו 32.47 מ״ר לאחר ניכוי פתח של 1.89 מ״ר · פחת 0%.', en: 'Captured example: area 12.65 m² · perimeter 14.32 m · net cladding 32.47 m² after a 1.89 m² opening deduction · waste 0%.' },
  },
} satisfies Record<string, DemoSpec>

export type DemoMode = keyof typeof PRODUCT_DEMOS
export const ALL_DEMO_MODES = Object.keys(PRODUCT_DEMOS) as DemoMode[]
export const productAsset = (name: string) => `/assets/product-demo/${name}.webp`
