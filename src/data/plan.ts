// Verified Apartment A geometry, in source-PDF points (y measured from the top of the sheet).
// Every value here is read directly from BetterCalc_Demo_Apartment_A_Floor_Plan.pdf.

export const PLAN_WIDTH = 1190.551
export const PLAN_HEIGHT = 841.8898
export const PLAN_ASPECT = PLAN_WIDTH / PLAN_HEIGHT

const fromPdfY = (value: number) => PLAN_HEIGHT - value

/** The printed 5.00 m calibration reference: 320 pt, so 64 pt = 1.00 m. */
export const REFERENCE = {
  x1: 177.2,
  x2: 497.2,
  y: fromPdfY(68.12),
  meters: 5,
  label: '5.00',
}

export const POINTS_PER_METER = (REFERENCE.x2 - REFERENCE.x1) / REFERENCE.meters

/** Wall-centreline envelope of the apartment: 13.00 m × 8.00 m, matching the printed dimension chains. */
export const ENVELOPE = {
  x: 126,
  y: fromPdfY(703),
  width: 832,
  height: 512,
}

/** The printed top dimension chain (3.20 + 3.00 + 3.10 + 3.70 = 13.00 m). */
export const DIMENSION_Y = fromPdfY(727.32)

export const DIMENSION_CHAIN = [
  { x1: 126, x2: 330.8, value: '3.20' },
  { x1: 330.8, x2: 522.8, value: '3.00' },
  { x1: 522.8, x2: 721.2, value: '3.10' },
  { x1: 721.2, x2: 958, value: '3.70' },
] as const

/** Helpers for positioning HTML overlays in sheet-relative percentages. */
export const px = (x: number) => `${(x / PLAN_WIDTH) * 100}%`
export const py = (y: number) => `${(y / PLAN_HEIGHT) * 100}%`
