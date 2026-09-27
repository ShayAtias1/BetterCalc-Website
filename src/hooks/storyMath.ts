import { PLAN_WIDTH } from '../data/plan'

// Shared camera + timeline math for the pinned story chapters.

export type Frame = { x: number; y: number; w: number }
export type Rect = { x0: number; y0: number; x1: number; y1: number }

export const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v)
export const range = (t: number, [a, b]: readonly [number, number]) => clamp01((t - a) / (b - a))
export const ease = (v: number) => v * v * (3 - 2 * v)
export const lerp = (a: number, b: number, v: number) => a + (b - a) * v

/** Fit a region of the sheet (in PDF points) into a screen rectangle. */
export function fit(focus: Rect, target: Rect, align: 'center' | 'end' = 'center'): Frame {
  const scale = Math.min((target.x1 - target.x0) / (focus.x1 - focus.x0), (target.y1 - target.y0) / (focus.y1 - focus.y0))
  const fw = (focus.x1 - focus.x0) * scale
  const fh = (focus.y1 - focus.y0) * scale
  const ox = align === 'center' ? (target.x1 - target.x0 - fw) / 2 : target.x1 - target.x0 - fw
  const oy = (target.y1 - target.y0 - fh) / 2
  return { x: target.x0 + ox - focus.x0 * scale, y: target.y0 + oy - focus.y0 * scale, w: PLAN_WIDTH * scale }
}

/** Interpolate a camera along [scroll position, frame] keys with eased segments. */
export function cameraAt<K extends string>(v: number, keys: [number, K][], frames: Record<K, Frame>): Frame {
  if (v <= keys[0][0]) return frames[keys[0][1]]
  for (let i = 0; i < keys.length - 1; i++) {
    const [a, fa] = keys[i]
    const [b, fb] = keys[i + 1]
    if (v <= b) {
      const k = ease((v - a) / (b - a))
      const A = frames[fa]
      const B = frames[fb]
      return { x: lerp(A.x, B.x, k), y: lerp(A.y, B.y, k), w: lerp(A.w, B.w, k) }
    }
  }
  return frames[keys[keys.length - 1][1]]
}

export function isStackedLayout(width: number, height: number) {
  return width < 760 || width / height < 0.9
}
