// Revision Compare story data — the single source for every geometry and value in Phase 3C.
//
// Geometry: read from the two vector PDFs (assets-source/plans), sheet points with y from the top.
// The only architectural differences between A-101 and A-101-B (verified by diffing the content streams):
//   1. the partition between Bedroom 1 and Bedroom 2 moves 22.4 pt (0.35 m) east;
//   2. the bathroom's north wall moves 22.4 pt (0.35 m) north (its east wall is extended to meet it);
//   3. a new short screen wall (0.12 × 1.25 m) stands between the kitchen and the living room.
// Marks + values: the rectangles drawn in BetterCalc/demo/compare-demo.mjs and the resulting
// assets-source/reports/compare-report.pdf, page 2 ("טבלת שטחי הריסה ובנייה"): one demolition item
// and one new-construction item, each "שטח בפועל" 0.75 מ״ר (report total 1.5).

import { PLAN_HEIGHT } from './plan'

const fromPdfY = (value: number) => PLAN_HEIGHT - value

export type SheetRect = { x0: number; y0: number; x1: number; y1: number }

export const REVISION = {
  code: 'A-101-B',
  file: 'Apartment_A_Revision_B.pdf',
}

export const ORIGINAL = {
  code: 'A-101',
  file: 'Apartment_A_Floor_Plan.pdf',
}

/** The zone that contains every difference: the two bedrooms, the bathroom and the new screen wall. */
export const CHANGED_ZONE: SheetRect = { x0: 262, y0: 262, x1: 772, y1: 668 }

/** Where the reader is told to look, in the order the overlay reveals them. Narration, not product output. */
export const DIFFERENCES = [
  'המחיצה בין שני חדרי השינה זזה',
  'חדר הרחצה גדל',
  'נוסף קיר מחיצה בין המטבח לסלון',
]

export type ChangeMark = {
  id: 'demolition' | 'construction'
  index: string
  type: string
  method: string
  area: string
  rect: SheetRect
  /** Tag anchor on the plan (sheet points). */
  tag: { x: number; y: number }
}

export const MARKS: ChangeMark[] = [
  {
    id: 'demolition', index: '1', type: 'הריסה', method: 'שטח בפועל', area: '0.75',
    rect: { x0: 325.68, y0: fromPdfY(485.4), x1: 335.92, y1: fromPdfY(191) },
    tag: { x: 262, y: 452 },
  },
  {
    id: 'construction', index: '2', type: 'בנייה חדשה', method: 'שטח בפועל', area: '0.75',
    rect: { x0: 348.08, y0: fromPdfY(485.4), x1: 358.32, y1: fromPdfY(191) },
    tag: { x: 426, y: 540 },
  },
]

export const COMPARE_REPORT = {
  file: 'compare-report.pdf',
  pages: 2,
}
