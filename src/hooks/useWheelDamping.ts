import { useEffect } from 'react'

/*
 * Shorter travel per traditional mouse-wheel notch.
 *
 * The story chapters are timed in viewport heights, while a mouse notch moves a fixed ~100 px, so on
 * a desktop mouse one notch can skip most of a story beat. This scales ONLY unmistakable mouse-wheel
 * notches down to WHEEL_SCALE of their native distance and leaves every other input native:
 * trackpads and precise mice, touch, keyboard, scrollbar, browser zoom, horizontal gestures, inner
 * scrollers, form controls, coarse pointers and reduced motion.
 *
 * It is not smooth scrolling: each notch moves a fixed, shorter distance, eased over roughly the span
 * of a native wheel animation. There is no velocity, no inertia and nothing queued beyond the input
 * received, and any other scroll input takes over immediately. No React state is involved.
 */

/** Share of the native notch distance that a mouse-wheel notch travels (1 = native). */
export const WHEEL_SCALE = 0.6

// Mouse-capable desktops only; reduced-motion visitors keep native wheel scrolling.
const ENABLE_QUERY = '(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)'
// A physical notch is reported as a multiple of 120 legacy wheel units, with a large pixel delta.
const NOTCH_UNITS = 120
const MIN_NOTCH_PX = 50
// Once a fine-grained wheel event is seen (trackpad, high-resolution wheel), stay native this long.
const PRECISION_HOLD_MS = 400
// The page never owes the wheel more than this many viewport heights (bounds a fast spin).
const MAX_AHEAD = 0.6
// Share of the remaining distance covered per 60 Hz frame: a 60 px notch settles in about 150 ms.
const EASE_PER_FRAME = 0.4

type LegacyWheelEvent = WheelEvent & { wheelDeltaY?: number }

/** True only for events that look like a classic wheel notch; anything ambiguous stays native. */
function isNotch(e: LegacyWheelEvent) {
  // Line/page units (e.g. Firefox) cannot be converted to the native pixel distance reliably.
  if (e.deltaMode !== WheelEvent.DOM_DELTA_PIXEL) return false
  if (e.deltaX !== 0 || e.deltaY === 0) return false
  const units = e.wheelDeltaY
  if (typeof units !== 'number' || units === 0 || units % NOTCH_UNITS !== 0) return false
  return Math.abs(e.deltaY) >= MIN_NOTCH_PX
}

/** Whether the wheel belongs to something other than the page: a form control or an inner scroller. */
function ownedByElement(target: EventTarget | null, dy: number) {
  let el = target instanceof Element ? target : null
  if (el?.closest('input, textarea, select, [contenteditable]:not([contenteditable="false"])')) return true
  while (el && el !== document.body && el !== document.documentElement) {
    const { overflowY } = getComputedStyle(el)
    if ((overflowY === 'auto' || overflowY === 'scroll' || overflowY === 'overlay') && el.scrollHeight > el.clientHeight) {
      const canMove = dy < 0 ? el.scrollTop > 0 : el.scrollTop + el.clientHeight < el.scrollHeight - 1
      if (canMove) return true
    }
    el = el.parentElement
  }
  return false
}

export function useWheelDamping() {
  useEffect(() => {
    const media = window.matchMedia(ENABLE_QUERY)
    let enabled = media.matches
    let lastPrecise = -Infinity
    let raf = 0
    let lastTime = 0
    let pos = 0
    let target = 0
    let written = -1

    const stop = () => {
      cancelAnimationFrame(raf)
      raf = 0
      written = -1
    }

    const step = (now: number) => {
      const dt = lastTime ? Math.min(64, now - lastTime) : 1000 / 60
      lastTime = now
      pos += (target - pos) * (1 - Math.pow(1 - EASE_PER_FRAME, dt / (1000 / 60)))
      if (Math.abs(target - pos) < 0.5) pos = target
      window.scrollTo(0, pos)
      written = window.scrollY
      if (pos === target) stop()
      else raf = requestAnimationFrame(step)
    }

    const onWheel = (e: LegacyWheelEvent) => {
      if (!enabled || e.defaultPrevented || e.ctrlKey || e.metaKey || e.altKey || e.shiftKey) return
      if (!isNotch(e) || e.timeStamp - lastPrecise < PRECISION_HOLD_MS) {
        // A precise device is scrolling: hand it the page and keep treating its stream as precise.
        lastPrecise = e.timeStamp
        stop()
        return
      }
      if (ownedByElement(e.target, e.deltaY)) return

      e.preventDefault()
      const max = document.documentElement.scrollHeight - window.innerHeight
      const now = window.scrollY
      const reach = window.innerHeight * MAX_AHEAD
      const from = raf ? target : now
      target = Math.min(max, Math.max(0, Math.min(now + reach, Math.max(now - reach, from + e.deltaY * WHEEL_SCALE))))
      if (!raf) {
        pos = now
        lastTime = 0
        raf = requestAnimationFrame(step)
      }
    }

    // Any other way of moving the page takes over at once.
    const onScroll = () => {
      if (raf && written >= 0 && Math.abs(window.scrollY - written) > 2) stop()
    }
    const onChange = () => {
      enabled = media.matches
      if (!enabled) stop()
    }

    window.addEventListener('wheel', onWheel, { passive: false })
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('keydown', stop)
    window.addEventListener('pointerdown', stop)
    window.addEventListener('touchstart', stop, { passive: true })
    media.addEventListener('change', onChange)
    return () => {
      stop()
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('keydown', stop)
      window.removeEventListener('pointerdown', stop)
      window.removeEventListener('touchstart', stop)
      media.removeEventListener('change', onChange)
    }
  }, [])
}
