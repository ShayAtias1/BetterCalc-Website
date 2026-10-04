import { PRODUCT_DEMOS, productAsset, type DemoMode } from '../../data/productDemo'
import { STRUCTURAL_MODES, type StructuralTransition } from '../../hooks/useStructuralStory'
import './structural-capture.css'

type Props = { mode: DemoMode; phase: number; transition?: StructuralTransition; label: string; onError: () => void }

/** Stable application shell, with registered real captures blended only within regions.
 * The outgoing region stays opaque: identical toolbar/plan pixels never dim. */
export function StructuralCapture({ mode, phase, transition, label, onError }: Props) {
  const region = (part: 'plan' | 'inspector') => STRUCTURAL_MODES.flatMap((item) => {
    const demo = PRODUCT_DEMOS[item]
    return [0, 1, 2, ...(demo.adjustment ? [3] : [])].map((step) => {
      const incoming = item === mode && step === phase
      const outgoing = item === transition?.fromMode && step === transition.fromPhase
      return <img key={`${item}-${step}`} className="structural-capture__region" src={productAsset(`${demo.asset}-${step}-${part}`)} alt="" aria-hidden="true" onError={onError}
        style={{ opacity: incoming ? transition?.progress ?? 1 : outgoing ? 1 : 0, zIndex: incoming ? 2 : outgoing ? 1 : 0 }} />
    })
  })
  return <div className="product-browser__screen" role="img" aria-label={label}>
    <img className="product-browser__app-header" src={productAsset('application-header')} alt="" aria-hidden="true" />
    <div className="product-browser__body" dir="ltr">
      <div className="product-browser__inspector">{region('inspector')}</div>
      <div className="product-browser__plan">{region('plan')}
        {STRUCTURAL_MODES.map((item) => {
          const shape = PRODUCT_DEMOS[item].shape
          if (!shape) return null
          const opacity = item === mode ? transition?.fromMode === item ? 1 : transition?.progress ?? 1 : transition?.fromMode === item ? 1 - transition.progress : 0
          return <img key={item} className="product-browser__shape structural-capture__shape" src={productAsset(shape)} alt="" aria-hidden="true" style={{ opacity }} />
        })}
      </div>
    </div>
  </div>
}
