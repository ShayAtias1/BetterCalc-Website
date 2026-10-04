import type { Ref } from 'react'
import { REFERENCE } from '../data/plan'
import { ROOMS, TOTAL, WASTE, WORK_ITEM } from '../data/qto'

/**
 * The BetterCalc instrument beside the plan. One panel carries the whole QTO story:
 * chapter copy crossfades in place, and the calibration field hands over to the quantity
 * ledger, which fills row by row as rooms are marked on the plan.
 * Which chapter is visible is decided purely in CSS from the story's data-reached tokens.
 */
export function StoryPanel({ panelRef }: { panelRef?: Ref<HTMLDivElement> }) {
  return (
    <div className="story-panel" ref={panelRef}>
      <p className="story-panel__status">
        <span className="story-panel__status-mark" aria-hidden="true" />
        מכויל · <bdi dir="ltr">{REFERENCE.label}</bdi>&nbsp;מ׳ ייחוס
      </p>

      <div className="chapters">
        <div className="chapter" data-chapter="calibration">
          <p className="chapter-index" data-reveal><bdi dir="ltr" className="chapter-index__num">01</bdi><span className="chapter-index__sep">/</span>כיול</p>
          <h2 className="chapter__title" data-reveal>מתחילים ממרחק ידוע.</h2>
          <p className="chapter__body" data-reveal>מסמנים קו מידה בתוכנית ומגדירים את האורך האמיתי.</p>
        </div>
        <div className="chapter" data-chapter="rooms">
          <p className="chapter-index"><bdi dir="ltr" className="chapter-index__num">02</bdi><span className="chapter-index__sep">/</span>סימון חדרים</p>
          <h2 className="chapter__title">מסמנים את החדרים.</h2>
          <p className="chapter__body">מסמנים כל חדר ישירות על התוכנית, ו־<bdi dir="ltr">BetterCalc</bdi> מחשב את השטח לפי קנה המידה.</p>
        </div>
        <div className="chapter" data-chapter="quantities">
          <p className="chapter-index"><bdi dir="ltr" className="chapter-index__num">03</bdi><span className="chapter-index__sep">/</span>כמויות</p>
          <h2 className="chapter__title">מהתוכנית לכתב כמויות.</h2>
          <p className="chapter__body">הכמויות מרוכזות לפי חדר. הכמות להזמנה תלויה בפריטי העבודה, בניכויים ובפחת שהגדרתם.</p>
        </div>
        <div className="chapter" data-chapter="export">
          <p className="chapter-index"><bdi dir="ltr" className="chapter-index__num">04</bdi><span className="chapter-index__sep">/</span>ייצוא</p>
          <h2 className="chapter__title">מהתוכנית לדוח מסודר.</h2>
          <p className="chapter__body">מייצאים את הכמויות ל־<bdi dir="ltr">PDF</bdi> או ל־<bdi dir="ltr">Excel</bdi>.</p>
        </div>
      </div>

      <div className="panel-foot">
        <div className="calib-instrument">
          <div data-reveal>
            <div className="calib-field">
              <span className="calib-field__label">אורך אמיתי</span>
              <span className="calib-field__value">
                <span className="calib-field__empty" aria-hidden="true">—</span>
                <span className="calib-field__filled"><bdi dir="ltr">{REFERENCE.label}</bdi></span>
              </span>
              <span className="calib-field__unit">מ׳</span>
            </div>
            <p className="calib-status">
              <span className="calib-status__mark" aria-hidden="true" />
              <span className="calib-status__pending">מסמנים קו ייחוס…</span>
              <span className="calib-status__done">מכויל · <bdi dir="ltr">{REFERENCE.label}</bdi>&nbsp;מ׳ ייחוס</span>
            </p>
          </div>
          <p className="calib-legend">
            <span className="calib-legend__cell" aria-hidden="true" />
            כל משבצת&nbsp;=&nbsp;<bdi dir="ltr">1.00</bdi>&nbsp;מ׳
          </p>
        </div>

        <div className="ledger">
          <p className="ledger__caption" id="ledger-caption">
            <span>כתב כמויות</span>
            <span className="ledger__caption-item">{WORK_ITEM} · מ״ר</span>
          </p>
          <table className="ledger__table" aria-labelledby="ledger-caption">
            <thead>
              <tr>
                <th scope="col">חדר</th>
                <th scope="col" className="ledger__num ledger__opt">נטו</th>
                <th scope="col" className="ledger__num ledger__opt">פחת</th>
                <th scope="col" className="ledger__num">להזמנה</th>
              </tr>
            </thead>
            <tbody>
              {ROOMS.map((room, i) => (
                <tr key={room.id} data-row={i + 1}>
                  <th scope="row"><bdi dir="ltr" className="ledger__index">{room.index}</bdi>{room.name}</th>
                  <td className="ledger__num ledger__opt"><bdi dir="ltr">{room.area}</bdi></td>
                  <td className="ledger__num ledger__opt ledger__muted"><bdi dir="ltr">{WASTE}</bdi></td>
                  <td className="ledger__num ledger__strong"><bdi dir="ltr">{room.area}</bdi></td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="ledger__total">
                <th scope="row">סה״כ {WORK_ITEM}</th>
                <td colSpan={3} className="ledger__num">
                  <span className="ledger__total-cell">
                    <span className="ledger__total-pending" aria-hidden="true">—</span>
                    <span className="ledger__total-value"><bdi dir="ltr">{TOTAL}</bdi><span className="ledger__unit">מ״ר</span></span>
                  </span>
                </td>
              </tr>
            </tfoot>
          </table>
          <ul className="ledger__exports" aria-label="פורמטי ייצוא">
            <li className="ledger__export" data-format="pdf"><span className="ledger__export-type" dir="ltr">PDF</span>ייצוא ל־<bdi dir="ltr">PDF</bdi><span className="ledger__export-file" dir="ltr">qto-report.pdf</span></li>
            <li className="ledger__export" data-format="xlsx"><span className="ledger__export-type" dir="ltr">XLSX</span>ייצוא לאקסל<span className="ledger__export-file" dir="ltr">qto-quantities.xlsx</span></li>
          </ul>
        </div>
      </div>
    </div>
  )
}
