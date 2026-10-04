import type { ReactNode } from 'react'

type ProductGroupProps = {
  id: string
  index: string
  title: string
  summary: string
  steps: readonly string[]
  detail: string
  /** Package 2 can supply real UI evidence without changing the section layout. */
  visual?: ReactNode
}

export function ProductGroup({ id, index, title, summary, steps, detail, visual }: ProductGroupProps) {
  return (
    <article className="product-group" aria-labelledby={`${id}-title`}>
      <p className="step-number" dir="ltr">{index}</p>
      <h3 id={`${id}-title`}>{title}</h3>
      <p className="product-group__summary">{summary}</p>
      <div className="product-group__evidence" data-asset-slot={id}>
        {visual ?? <ol className="product-group__steps">{steps.map((step) => <li key={step}>{step}</li>)}</ol>}
      </div>
      <p className="product-group__detail">{detail}</p>
    </article>
  )
}
