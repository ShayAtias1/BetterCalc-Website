import type { Ref } from 'react'
import { COMPARE_REPORT, DIFFERENCES, MARKS, ORIGINAL, REVISION } from '../data/compare'

type ComparePanelProps = {
  panelRef?: Ref<HTMLDivElement>
  origReadout?: Ref<HTMLSpanElement>
  revReadout?: Ref<HTMLSpanElement>
  revSlider?: Ref<HTMLInputElement>
  onRevision?: (value: number) => void
  /** Static (reduced-motion) figures show fixed readouts. */
  readouts?: { original: string; revision: string }
}

/**
 * The BetterCalc instrument for Revision Compare. Chapters crossfade in place (CSS, from data-reached);
 * the foot hands over from the layer control (comparison) to the change schedule (documentation).
 */
export function ComparePanel({ panelRef, origReadout, revReadout, revSlider, onRevision, readouts }: ComparePanelProps) {
  const [demolition, construction] = MARKS
  return (
    <div className="story-panel compare-panel" ref={panelRef}>
      <p className="story-panel__status compare-panel__status">
        <span className="compare-swatch compare-swatch--orig" aria-hidden="true" /><bdi dir="ltr">{ORIGINAL.code}</bdi>
        <span className="compare-panel__arrow" aria-hidden="true">←</span>
        <span className="compare-swatch compare-swatch--rev" aria-hidden="true" /><bdi dir="ltr">{REVISION.code}</bdi>
      </p>

      <div className="chapters">
        <div className="chapter" data-chapter="overlay">
          <p className="chapter-index" data-reveal><bdi dir="ltr" className="chapter-index__num">05</bdi><span className="chapter-index__sep">/</span>שכבות</p>
          <h2 className="chapter__title" data-reveal>שתי תוכניות. אחת על השנייה.</h2>
          <p className="chapter__body" data-reveal>מיישרים את הגרסאות ומשווים אותן באותו קנה מידה.</p>
          <div className="differences">
            <p className="differences__label">מה רואים בשכבות:</p>
            <ol className="differences__list">
              {DIFFERENCES.map((text) => <li key={text}>{text}</li>)}
            </ol>
          </div>
        </div>
        <div className="chapter" data-chapter="swipe">
          <p className="chapter-index"><bdi dir="ltr" className="chapter-index__num">06</bdi><span className="chapter-index__sep">/</span>החלקה</p>
          <h2 className="chapter__title">רואים מיד מה השתנה.</h2>
          <p className="chapter__body">גוררים את קו ההשוואה: משמאל גרסה B, מימין תוכנית המקור.</p>
        </div>
        <div className="chapter" data-chapter="work">
          <p className="chapter-index"><bdi dir="ltr" className="chapter-index__num">07</bdi><span className="chapter-index__sep">/</span>סימון שינויים</p>
          <h2 className="chapter__title">השינוי ברור. עכשיו מסמנים את העבודה.</h2>
          <p className="chapter__body">מסמנים בעצמכם מה הורסים ומה בונים — כל סימון נכנס לטבלת השינויים.</p>
        </div>
        <div className="chapter" data-chapter="export">
          <p className="chapter-index"><bdi dir="ltr" className="chapter-index__num">08</bdi><span className="chapter-index__sep">/</span>ייצוא</p>
          <h2 className="chapter__title">מהשינוי בתוכנית לדוח שאפשר לעבוד איתו.</h2>
          <p className="chapter__body">תוכנית מקור, גרסה מעודכנת, סימוני הריסה ובנייה חדשה — בדוח <bdi dir="ltr">PDF</bdi> אחד.</p>
        </div>
      </div>

      <div className="panel-foot">
        <div className="layers">
          <div data-reveal>
            <p className="layers__head">
              <span>תצוגת השכבות</span>
              <span className="layers__modes" aria-hidden="true">
                <span className="layers__mode layers__mode--overlay">שכבות</span>
                <span className="layers__mode layers__mode--swipe">החלקה</span>
              </span>
            </p>
            <div className="layers__row">
              <span className="compare-swatch compare-swatch--orig" aria-hidden="true" />
              <span className="layers__name">מקור <bdi dir="ltr" className="layers__code">{ORIGINAL.code}</bdi></span>
              <span className="layers__value" ref={origReadout} dir="ltr">{readouts?.original ?? '100%'}</span>
            </div>
            <div className="layers__row">
              <span className="compare-swatch compare-swatch--rev" aria-hidden="true" />
              <span className="layers__name">גרסה B <bdi dir="ltr" className="layers__code">{REVISION.code}</bdi></span>
              <span className="layers__value" ref={revReadout} dir="ltr">{readouts?.revision ?? '100%'}</span>
            </div>
            <label className="layers__slider">
              <span className="layers__slider-label">שקיפות גרסה B</span>
              <input
                ref={revSlider}
                type="range"
                min={0}
                max={100}
                step={5}
                defaultValue={75}
                disabled={!onRevision}
                onInput={onRevision ? (event) => onRevision(Number(event.currentTarget.value) / 100) : undefined}
              />
            </label>
          </div>
        </div>

        <div className="changes">
          <div className="changes__tools" aria-hidden="true">
            <span className="changes__tools-label">תיעוד שינוי</span>
            <span className="changes__tool changes__tool--demolition"><span className="mark-swatch mark-swatch--demolition" />הריסה</span>
            <span className="changes__tool changes__tool--construction"><span className="mark-swatch mark-swatch--construction" />בנייה חדשה</span>
          </div>
          <p className="ledger__caption" id="changes-caption">
            <span>שינויים</span>
            <span className="ledger__caption-item"><bdi dir="ltr">{ORIGINAL.code}</bdi> ← <bdi dir="ltr">{REVISION.code}</bdi></span>
          </p>
          <table className="ledger__table changes__table" aria-labelledby="changes-caption">
            <thead>
              <tr>
                <th scope="col" className="changes__index">#</th>
                <th scope="col">סוג</th>
                <th scope="col" className="ledger__opt">אופן חישוב</th>
                <th scope="col" className="ledger__num">שטח (מ״ר)</th>
              </tr>
            </thead>
            <tbody>
              {MARKS.map((mark) => (
                <tr key={mark.id} data-mark={mark.id}>
                  <td className="changes__index"><bdi dir="ltr">{mark.index}</bdi></td>
                  <th scope="row"><span className={`mark-swatch mark-swatch--${mark.id}`} aria-hidden="true" />{mark.type}</th>
                  <td className="ledger__opt ledger__muted">{mark.method}</td>
                  <td className="ledger__num ledger__strong"><bdi dir="ltr">{mark.area}</bdi></td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="changes__totals">
            {[demolition, construction].map((mark) => (
              <span key={mark.id} className={`changes__total changes__total--${mark.id}`}>
                <span className="changes__total-label">סה״כ {mark.type}</span>
                <span className="changes__total-value"><bdi dir="ltr">{mark.area}</bdi>&nbsp;מ״ר</span>
              </span>
            ))}
          </p>
          <p className="changes__export">
            <span className="ledger__export-type" dir="ltr">PDF</span>
            ייצוא ל־<bdi dir="ltr">PDF</bdi>
            <span className="ledger__export-file" dir="ltr">{COMPARE_REPORT.file}</span>
          </p>
        </div>
      </div>
    </div>
  )
}
