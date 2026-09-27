// Quantity-takeoff story data — the single source for every number shown in Phase 3B.
//
// Room rectangles are the exact rectangles drawn in the BetterCalc QTO demo
// (BetterCalc/demo/qto-demo.mjs, "ROOMS"), converted to sheet coordinates (y from the top).
// Values are the demo's exported quantities (qto-quantities.xlsx, sheet "כתב כמויות", column
// "שטח ריצוף רגיל", waste 0%). Keep this file in sync with those exports as one versioned set.

import { PLAN_HEIGHT } from './plan'
import { WORKBOOK_SHEETS } from './qtoWorkbook'

const fromPdfY = (value: number) => PLAN_HEIGHT - value

export type Room = {
  id: 'master' | 'bedroom' | 'living'
  index: string
  name: string
  /** Regular tiling, net (מ״ר). Waste is 0%, so the order quantity is identical. */
  area: string
  rect: { x0: number; y0: number; x1: number; y1: number }
  /** Where the room tag sits on the plan (sheet points), clear of the printed room name. */
  tag: { x: number; y: number }
}

export const ROOMS: Room[] = [
  {
    id: 'master', index: '01', name: 'חדר הורים', area: '25.48',
    rect: { x0: 135, y0: fromPdfY(694.04), x1: 389.68, y1: fromPdfY(490.52) },
    tag: { x: 262, y: 268 },
  },
  {
    id: 'bedroom', index: '02', name: 'חדר שינה', area: '26.21',
    rect: { x0: 135, y0: fromPdfY(480.28), x1: 325.68, y1: fromPdfY(199.96) },
    tag: { x: 230, y: 462 },
  },
  {
    id: 'living', index: '03', name: 'סלון', area: '47.22',
    rect: { x0: 658.72, y0: fromPdfY(531.48), x1: 949.04, y1: fromPdfY(199.96) },
    tag: { x: 804, y: 428 },
  },
]

export const WORK_ITEM = 'ריצוף רגיל'
export const WASTE = '0%'
export const TOTAL = '98.91'

// Guard: the ledger total must be the sum of the visible rows.
const sum = ROOMS.reduce((acc, room) => acc + Math.round(Number(room.area) * 100), 0) / 100
if (sum.toFixed(2) !== TOTAL) throw new Error(`QTO total ${TOTAL} does not equal room sum ${sum.toFixed(2)}`)

// Guard: every visible value must match the real Excel export (sheet "כתב כמויות").
const ledgerSheet = WORKBOOK_SHEETS.find((sheet) => sheet.name === 'כתב כמויות')
ROOMS.forEach((room, i) => {
  const row = i + 2
  if (ledgerSheet?.cells[`B${row}`] !== room.name || ledgerSheet?.cells[`C${row}`] !== room.area) {
    throw new Error(`Room ${room.name} ${room.area} does not match qto-quantities.xlsx row ${row}`)
  }
})
if (ledgerSheet?.cells.B8 !== TOTAL) throw new Error(`Total ${TOTAL} does not match qto-quantities.xlsx B8`)
