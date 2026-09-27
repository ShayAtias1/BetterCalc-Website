import { useEffect, type RefObject } from 'react'

/*
 * Pointer / touch / keyboard control for the swipe divider.
 * The value is the divider position as a fraction (0–1) of the visible comparison view.
 * Pointer moves are coalesced into one requestAnimationFrame; nothing here renders React.
 */

type SwipeControlOptions = {
  strip: RefObject<HTMLElement | null>
  handle: RefObject<HTMLElement | null>
  /** Screen-space bounds of the comparison view (left, right) in client pixels. */
  bounds: () => { left: number; right: number }
  /** Current value, used by the keyboard. */
  get: () => number
  set: (value: number) => void
  enabled?: boolean
}

const STEP = 0.05

export function useSwipeControl({ strip, handle, bounds, get, set, enabled = true }: SwipeControlOptions) {
  useEffect(() => {
    const stripEl = strip.current
    const handleEl = handle.current
    if (!enabled || !stripEl || !handleEl) return

    let dragging = false
    let frame = 0
    let pendingX = 0

    const commit = () => {
      frame = 0
      const { left, right } = bounds()
      set(Math.min(1, Math.max(0, (pendingX - left) / Math.max(1, right - left))))
    }
    const onDown = (event: PointerEvent) => {
      if (event.button !== 0) return
      dragging = true
      pendingX = event.clientX
      try {
        ;(event.currentTarget as HTMLElement).setPointerCapture(event.pointerId)
      } catch {
        // Capture is best-effort (e.g. a pointer that is no longer active); dragging still works.
      }
      stripEl.dataset.dragging = 'true'
      stripEl.dataset.used = 'true'
      if (!frame) frame = requestAnimationFrame(commit)
    }
    const onMove = (event: PointerEvent) => {
      if (!dragging) return
      pendingX = event.clientX
      if (!frame) frame = requestAnimationFrame(commit)
    }
    const onUp = () => {
      dragging = false
      delete stripEl.dataset.dragging
    }
    const onKey = (event: KeyboardEvent) => {
      const value = get()
      const next =
        event.key === 'ArrowLeft' || event.key === 'ArrowDown' ? value - STEP
        : event.key === 'ArrowRight' || event.key === 'ArrowUp' ? value + STEP
        : event.key === 'PageDown' ? value - STEP * 4
        : event.key === 'PageUp' ? value + STEP * 4
        : event.key === 'Home' ? 0
        : event.key === 'End' ? 1
        : null
      if (next === null) return
      event.preventDefault()
      stripEl.dataset.used = 'true'
      set(Math.min(1, Math.max(0, next)))
    }

    const targets = [stripEl, handleEl]
    targets.forEach((el) => {
      el.addEventListener('pointerdown', onDown)
      el.addEventListener('pointermove', onMove)
      el.addEventListener('pointerup', onUp)
      el.addEventListener('pointercancel', onUp)
    })
    handleEl.addEventListener('keydown', onKey)

    return () => {
      cancelAnimationFrame(frame)
      targets.forEach((el) => {
        el.removeEventListener('pointerdown', onDown)
        el.removeEventListener('pointermove', onMove)
        el.removeEventListener('pointerup', onUp)
        el.removeEventListener('pointercancel', onUp)
      })
      handleEl.removeEventListener('keydown', onKey)
    }
  }, [strip, handle, bounds, get, set, enabled])
}

/** Accessible value text for the swipe slider: revision on the left of the divider, original on the right. */
export function swipeValueText(value: number) {
  const revision = Math.round(value * 100)
  return `${revision}% גרסה B, ${100 - revision}% תוכנית מקור`
}
