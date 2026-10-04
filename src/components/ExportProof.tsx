import { memo } from 'react'
import { WORKBOOK_FILE, WORKBOOK_SHEETS } from '../data/qtoWorkbook'
import { Preview } from './Preview'

// The two real QTO exports. Report previews are rendered from qto-report.pdf by
// scripts/render-report-previews.swift; the sheet excerpt is read from qto-quantities.xlsx.
const LEDGER_SHEET = 'כתב כמויות'
// A contiguous, unedited range of the ledger sheet: room rows and the apartment total.
const COLUMNS = ['A', 'B', 'C', 'D']
const ROWS = [1, 2, 3, 4, 5, 6, 7, 8]

const sheet = WORKBOOK_SHEETS.find((s) => s.name === LEDGER_SHEET)!

const isNumber = (value: string) => /^-?\d+(\.\d+)?$/.test(value)

export const ExportProof = memo(function ExportProof({ storytelling = false }: { storytelling?: boolean }) {
  return (
    <div className="export-proof">
      <figure className="doc doc--pdf">
        <figcaption className="doc__tab">
          <span className="doc__type" dir="ltr">PDF</span>
          <span className="doc__name" dir="ltr">qto-report.pdf</span>
          <span className="doc__meta">2 עמודים</span>
        </figcaption>
        {storytelling ? (
        <div className="doc__stack">
          <Preview name="qto-report-p1" className="doc__page doc__page--1" width={1190} height={900} alt="עמוד 1 בדוח ה־PDF: התוכנית עם שלושת החדרים המסומנים" />
          <figure className="doc__detail">
            <Preview name="qto-report-p2-detail" width={976} height={824} alt="פירוט מעמוד 2: חדר הורים 12.74, חדר שינה 13.11, סלון 23.61, ובסה״כ לדירה ריצוף רגיל 49.46 מ״ר" />
            <figcaption className="doc__detail-label">עמוד <bdi dir="ltr">2</bdi> · פרט מכתב הכמויות</figcaption>
          </figure>
        </div>
        ) : (
        <div className="doc__stack">
          <Preview name="qto-report-p2-detail" width={976} height={824} alt="קטע מעמוד 2 בדוח הכמויות: חדר הורים 12.74, חדר שינה 13.11, סלון 23.61, ובסה״כ ריצוף רגיל 49.46 מ״ר" />
          <p className="report-caption">קטע מעמוד 2 בדוח הדמו · כמויות ריצוף לפי חדר</p>
        </div>
        )}
      </figure>

      <figure className="doc doc--xlsx">
        <figcaption className="doc__tab">
          <span className="doc__type" dir="ltr">XLSX</span>
          <span className="doc__name" dir="ltr">{WORKBOOK_FILE}</span>
          <span className="doc__meta"><bdi dir="ltr">{WORKBOOK_SHEETS.length}</bdi> גיליונות</span>
        </figcaption>
        <div className="xl">
          <table className="xl__grid" aria-label={`גיליון ${LEDGER_SHEET}, תאים A1 עד D8`}>
            <thead>
              <tr>
                <td className="xl__corner" aria-hidden="true" />
                {COLUMNS.map((col) => <th key={col} scope="col" className="xl__col" dir="ltr">{col}</th>)}
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row) => (
                <tr key={row} data-header={row === 1 || row === 7 || undefined}>
                  <th scope="row" className="xl__row" dir="ltr">{row}</th>
                  {COLUMNS.map((col) => {
                    const value = sheet.cells[`${col}${row}`] ?? ''
                    return <td key={col} className={isNumber(value) ? 'xl__num' : undefined}>{value}</td>
                  })}
                </tr>
              ))}
            </tbody>
          </table>
          <div className="xl__tabs" aria-label="גיליונות">
            {WORKBOOK_SHEETS.map((s) => <span key={s.name} className="xl__tab" aria-current={s.name === LEDGER_SHEET || undefined}>{s.name}</span>)}
          </div>
        </div>
      </figure>
    </div>
  )
})
