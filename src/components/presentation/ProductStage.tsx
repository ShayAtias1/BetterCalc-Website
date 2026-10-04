import type { ReactNode } from 'react'
import './product-stage.css'

type Props = {
  children: ReactNode
  annotations?: ReactNode
  caption?: ReactNode
}

/** Twelve-column RTL composition: product across ten columns, technical rail on the left. */
export function ProductStage({ children, annotations, caption }: Props) {
  return (
    <div className="product-stage">
      <div className="product-stage__main">{children}</div>
      {annotations && <aside className="product-stage__rail" aria-label="ערכים ממצב הדמו הסופי">{annotations}</aside>}
      {caption && <div className="product-stage__caption">{caption}</div>}
    </div>
  )
}
