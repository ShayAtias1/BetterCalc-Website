import { useEffect, useRef, useState, useSyncExternalStore } from 'react'
import { clamp01 } from './storyMath'
import { PRODUCT_DEMOS, type DemoMode, type DemoSpec } from '../data/productDemo'

export const STRUCTURAL_MODES = ['concrete', 'mesh-bars', 'stirrups'] as const
export const structuralSteps = (mode: DemoMode) => {
  const demo: DemoSpec = PRODUCT_DEMOS[mode]
  return [...demo.steps.he, ...(demo.adjustment ? [demo.adjustment.he] : [])]
}

// A short readable beat per captured phase, plus an extra hold on each mode's result.
let cursor = 0
export const STRUCTURAL_BEATS = STRUCTURAL_MODES.flatMap((mode) => {
  const steps = structuralSteps(mode)
  return steps.map((_, phase) => {
    const start = cursor
    cursor += .22 + (phase === steps.length - 1 ? .12 : 0)
    return { mode, phase, start, end: cursor }
  })
})
export const STRUCTURAL_TRAVEL = Number(cursor.toFixed(2))

const STATIC_QUERY = '(max-width: 639px), (prefers-reduced-motion: reduce)'
const subscribe = (change: () => void) => {
  const media = window.matchMedia(STATIC_QUERY)
  media.addEventListener('change', change)
  return () => media.removeEventListener('change', change)
}
const getStatic = () => window.matchMedia(STATIC_QUERY).matches
export type StructuralTransition = { fromMode: DemoMode; fromPhase: number; progress: number }
export type StructuralState = { mode: DemoMode; phase: number; playing: boolean; transition?: StructuralTransition }
const ENTRY_TRAVEL = .14
const SETTLE_MS = 480
// Match --ease-out: cubic-bezier(.2, .7, .2, 1), without a motion dependency.
const easeOut = (progress: number) => {
  let t = progress
  for (let i = 0; i < 6; i++) {
    const x = .6 * t - .6 * t * t + t * t * t
    t = clamp01(t - (x - progress) / (.6 - 1.2 * t + 3 * t * t))
  }
  return 2.1 * t - 1.2 * t * t + .1 * t * t * t
}

export function useStructuralStory() {
  const track = useRef<HTMLDivElement>(null)
  const stage = useRef<HTMLDivElement>(null)
  const [state, setState] = useState<StructuralState>({ mode: 'concrete', phase: 0, playing: false })
  const staticPresentation = useSyncExternalStore(subscribe, getStatic, () => true)
  const controller = useRef<{ select: (mode: DemoMode, phase: number) => void; replay: () => void } | null>(null)

  useEffect(() => {
    if (staticPresentation || !track.current || !stage.current) return
    const chapter = track.current
    const pinned = stage.current
    let start = 0
    let travel = 1
    let frame = 0
    let resizeFrame = 0
    let disposed = false
    let displayed = 0
    let origin = 0
    let target = 0
    let started = 0
    let current: StructuralState = { mode: 'concrete', phase: 0, playing: false }
    let timers: number[] = []
    const cancelReplay = () => { timers.forEach(clearTimeout); timers = [] }
    const publish = (next: StructuralState) => {
      if (next.mode === current.mode && next.phase === current.phase && next.playing === current.playing && next.transition?.fromMode === current.transition?.fromMode && next.transition?.fromPhase === current.transition?.fromPhase && next.transition?.progress === current.transition?.progress) return
      current = next
      setState(next)
    }
    const scrollProgress = () => Math.max(0, Math.min(STRUCTURAL_TRAVEL, (window.scrollY - start) / travel * STRUCTURAL_TRAVEL))
    const apply = (progress: number) => {
      const found = STRUCTURAL_BEATS.findIndex((item) => progress < item.end)
      const index = found < 0 ? STRUCTURAL_BEATS.length - 1 : found
      const beat = STRUCTURAL_BEATS[index]
      const local = clamp01((progress - beat.start) / ENTRY_TRAVEL)
      const previous = STRUCTURAL_BEATS[index - 1]
      const transition = previous && local < 1 ? {
        fromMode: previous.mode, fromPhase: previous.phase,
        progress: Math.round(easeOut(local) * 1000) / 1000,
      } : undefined
      publish({ mode: beat.mode, phase: beat.phase, playing: false, transition })
    }
    // Smooth the presentation coordinate only; native scrolling and chapter travel stay intact.
    // One wheel notch can otherwise skip a whole entry window between two paints.
    const tick = (now: number) => {
      const elapsed = clamp01((now - started) / SETTLE_MS)
      displayed = origin + (target - origin) * easeOut(elapsed)
      apply(displayed)
      frame = elapsed < 1 ? requestAnimationFrame(tick) : 0
    }
    const settle = (progress: number) => {
      cancelAnimationFrame(frame)
      frame = 0
      displayed = origin = target = progress
      apply(progress)
    }
    const animateState = (next: StructuralState) => {
      cancelAnimationFrame(frame)
      const from = current
      if (from.mode === next.mode && from.phase === next.phase) { frame = 0; publish(next); return }
      const began = performance.now()
      const advance = (now: number) => {
        const progress = clamp01((now - began) / 380)
        publish({ ...next, transition: progress < 1 ? { fromMode: from.mode, fromPhase: from.phase, progress: easeOut(progress) } : undefined })
        frame = progress < 1 ? requestAnimationFrame(advance) : 0
      }
      frame = requestAnimationFrame(advance)
    }
    const measure = () => {
      if (disposed) return
      const header = document.querySelector('.site-header')?.getBoundingClientRect().height ?? 56
      start = chapter.getBoundingClientRect().top + window.scrollY - header
      travel = Math.max(1, chapter.offsetHeight - pinned.offsetHeight)
      settle(scrollProgress())
    }
    controller.current = {
      select: (mode, phase) => {
        const beat = STRUCTURAL_BEATS.find((item) => item.mode === mode && item.phase === phase)
        if (!beat) return
        cancelReplay()
        displayed = origin = target = beat.start + ENTRY_TRAVEL + .01
        animateState({ mode, phase, playing: false })
        // Clicks navigate the same timeline instead of introducing independent tab state.
        window.scrollTo({ top: start + (beat.start + ENTRY_TRAVEL + .01) / STRUCTURAL_TRAVEL * travel, behavior: 'instant' })
      },
      replay: () => {
        cancelReplay()
        cancelAnimationFrame(frame)
        frame = 0
        const mode = current.mode
        publish({ mode, phase: 0, playing: true })
        timers = [
          window.setTimeout(() => animateState({ mode, phase: 1, playing: true }), 100),
          window.setTimeout(() => animateState({ mode, phase: 2, playing: false }), 650),
        ]
      },
    }
    const onScroll = () => {
      cancelReplay()
      const next = scrollProgress()
      if (Math.abs(next - target) < .0001) return
      // Navigation outside this chapter settles immediately, rather than replaying unseen beats.
      if (next === 0 || next === STRUCTURAL_TRAVEL) { settle(next); return }
      origin = displayed
      target = next
      started = performance.now()
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(tick)
    }
    const onResize = () => { cancelReplay(); cancelAnimationFrame(resizeFrame); resizeFrame = requestAnimationFrame(measure) }
    // Publish initial state even when the first scroll beat equals the local initial value.
    setState(current)
    measure()
    document.fonts.ready.then(measure)
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)
    return () => {
      disposed = true
      cancelReplay()
      cancelAnimationFrame(frame)
      cancelAnimationFrame(resizeFrame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      controller.current = null
    }
  }, [staticPresentation])

  return { track, stage, state, staticPresentation, select: (mode: DemoMode, phase: number) => controller.current?.select(mode, phase), replay: () => controller.current?.replay() }
}
