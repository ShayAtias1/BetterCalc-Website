import symbol from '../assets/logo/bettercalc-symbol-blue.svg'
import './output-workflow.css'

function FileIcon({ spreadsheet = false }: { spreadsheet?: boolean }) {
  return <svg viewBox="0 0 24 28" aria-hidden="true"><path d="M3 1h12l6 6v20H3z M15 1v6h6" />{spreadsheet ? <path d="M6 12h12v10H6z M10 12v10 M14 12v10 M6 17h12" /> : <path d="M7 12h10 M7 17h10 M7 22h7" />}</svg>
}

/** File input and outputs, not a list of third-party integrations. */
export function OutputWorkflow() {
  return <div className="output-workflow">
    <div className="output-workflow__path" dir="ltr" aria-label="PDF → BetterCalc → Excel + PDF">
      <span><FileIcon />PDF</span><i aria-hidden="true">→</i>
      <span><img src={symbol} alt="" />BetterCalc</span><i aria-hidden="true">→</i>
      <span><FileIcon spreadsheet />Excel <b aria-hidden="true">+</b><FileIcon />PDF</span>
    </div>
    <p><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 21 12 3l9 18 M7 15h10 M9 21l3-6 3 6" /></svg>בלי צורך לפתוח <bdi>AutoCAD</bdi></p>
  </div>
}
