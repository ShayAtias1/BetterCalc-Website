import type { ReactNode } from 'react'
import './device-frame.css'

export type DeviceKind = 'macbook' | 'desktop' | 'ipad' | 'iphone'

type Props = {
  kind: DeviceKind
  children: ReactNode
  /** Use the desktop window treatment on short laptops and small screens. */
  compactFallback?: boolean
}

/** Hardware is presentation only; the supplied product DOM stays interactive. */
export function DeviceFrame({ kind, children, compactFallback = false }: Props) {
  return (
    <div className={`device-frame device-frame--${kind}${compactFallback ? ' device-frame--adaptive' : ''}`}>
      <div className="device-frame__display">
        <span className="device-frame__camera" aria-hidden="true" />
        <div className="device-frame__screen">{children}</div>
      </div>
      {kind === 'macbook' && <div className="device-frame__base" aria-hidden="true"><span /></div>}
    </div>
  )
}
