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

// Mobile modes arrive before their captured phases begin, then hold their final result.
let mobileCursor = .08
export const MOBILE_STRUCTURAL_MODES = STRUCTURAL_MODES.map((mode, index) => {
  const entry = index === 0 ? 0 : mobileCursor
  if (index > 0) mobileCursor += .24
  const start = mobileCursor
  const beats = structuralSteps(mode).map((_, phase) => {
    const start = mobileCursor
    mobileCursor += phase === structuralSteps(mode).length - 1 ? .16 : .08
    return { mode, phase, start, end: mobileCursor }
  })
  return { mode, entry, start, end: mobileCursor, beats }
})
export const MOBILE_STRUCTURAL_TRAVEL = Number(mobileCursor.toFixed(2))
const MOBILE_STRUCTURAL_BEATS = MOBILE_STRUCTURAL_MODES.flatMap((item) => item.beats)

const STATIC_QUERY = '(prefers-reduced-motion: reduce)'
const MOBILE_QUERY = '(max-width: 900px)'
const subscribeMobile = (change: () => void) => {
  const media = window.matchMedia(MOBILE_QUERY)
  media.addEventListener('change', change)
  return () => media.removeEventListener('change', change)
}
const getMobile = () => window.matchMedia(MOBILE_QUERY).matches
const subscribe = (change: () => void) => {
  const media = window.matchMedia(STATIC_QUERY)
  media.addEventListener('change', change)
  return () => media.removeEventListener('change', change)
}
const getStatic = () => window.matchMedia(STATIC_QUERY).matches
export type StructuralTransition = { fromMode: DemoMode; fromPhase: number; progress: number }
export type StructuralState = { mode: DemoMode; phase: number; playing: boolean; transition?: StructuralTransition }
const ENTRY_TRAVEL = .14
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
  const mobilePresentation = useSyncExternalStore(subscribeMobile, getMobile, () => false)
  const controller = useRef<{ select: (mode: DemoMode, phase: number) => void; replay: () => void } | null>(null)

  useEffect(() => {
    if (staticPresentation || !track.current || !stage.current) return
    const chapter = track.current
    const pinned = stage.current
    const beats = mobilePresentation ? MOBILE_STRUCTURAL_BEATS : STRUCTURAL_BEATS
    const totalTravel = mobilePresentation ? MOBILE_STRUCTURAL_TRAVEL : STRUCTURAL_TRAVEL
    let start = 0
    let travel = 1
    let frame = 0
    let resizeFrame = 0
    let disposed = false
    let target = 0
    let current: StructuralState = { mode: 'concrete', phase: 0, playing: false }
    let timers: number[] = []
    const cancelReplay = () => { timers.forEach(clearTimeout); timers = [] }
    const publish = (next: StructuralState) => {
      if (next.mode === current.mode && next.phase === current.phase && next.playing === current.playing && next.transition?.fromMode === current.transition?.fromMode && next.transition?.fromPhase === current.transition?.fromPhase && next.transition?.progress === current.transition?.progress) return
      current = next
      setState(next)
    }
    const scrollProgress = () => Math.max(0, Math.min(totalTravel, (window.scrollY - start) / travel * totalTravel))
    const apply = (progress: number) => {
      if (mobilePresentation) {
        const scene = pinned.querySelector<HTMLElement>('.structural-mobile__scene')
        if (scene) {
          const width = scene.clientWidth
          const anchor = width / 2
          scene.style.setProperty('--structural-center', `${anchor}px`)
          scene.querySelectorAll<HTMLElement>('.structural-mobile__group').forEach((group, index) => {
            const item = MOBILE_STRUCTURAL_MODES[index]
            const next = MOBILE_STRUCTURAL_MODES[index + 1]
            const incoming = index === 0 ? 1 : easeOut(clamp01((progress - item.entry) / (item.start - item.entry)))
            const outgoing = next ? easeOut(clamp01((progress - next.entry) / (next.start - next.entry))) : 0
            const center = anchor - group.offsetWidth / 2
            const x = incoming < 1 ? (width + 16) * (1 - incoming) + center * incoming : center + (-group.offsetWidth - 16 - center) * outgoing
            group.style.transform = `translate3d(${x}px, 0, 0)`
            group.style.visibility = incoming === 0 || outgoing === 1 ? 'hidden' : 'visible'
            group.style.pointerEvents = incoming === 1 && outgoing === 0 ? 'auto' : 'none'
          })
        }
      }
      // During a horizontal handoff keep the outgoing mode's completed phase.
      const found = beats.findIndex((item) => progress < item.end)
      let index = found < 0 ? beats.length - 1 : found
      if (mobilePresentation && index > 0 && progress < beats[index].start) index -= 1
      const beat = beats[index]
      const entryTravel = mobilePresentation ? .06 : ENTRY_TRAVEL
      const local = clamp01((progress - beat.start) / entryTravel)
      const previous = beats[index - 1]
      const transition = previous && local < 1 && (!mobilePresentation || previous.mode === beat.mode) ? {
        fromMode: previous.mode, fromPhase: previous.phase,
        progress: Math.round(easeOut(local) * 1000) / 1000,
      } : undefined
      publish({ mode: beat.mode, phase: beat.phase, playing: false, transition })
    }
    // Scroll is the presentation coordinate: coalesce events without delayed catch-up.
    const settle = (progress: number) => {
      cancelAnimationFrame(frame)
      frame = 0
      target = progress
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
      if (mobilePresentation) {
        // CSS grid measures the complete group, including loaded images, in normal layout.
        chapter.style.setProperty('--structural-stage-height', `${pinned.offsetHeight}px`)
      }
      start = chapter.getBoundingClientRect().top + window.scrollY - header
      travel = Math.max(1, chapter.offsetHeight - pinned.offsetHeight)
      settle(scrollProgress())
    }
    controller.current = {
      select: (mode, phase) => {
        const beat = beats.find((item) => item.mode === mode && item.phase === phase)
        if (!beat) return
        cancelReplay()
        const destination = beat.start + (mobilePresentation ? .06 : ENTRY_TRAVEL) + .01
        target = destination
        if (mobilePresentation) apply(target)
        else animateState({ mode, phase, playing: false })
        // Clicks navigate the same timeline instead of introducing independent tab state.
        window.scrollTo({ top: start + destination / totalTravel * travel, behavior: 'instant' })
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
      target = next
      if (next === 0 || next === totalTravel) { settle(next); return }
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        frame = 0
        apply(scrollProgress())
      })
    }

    const onResize = () => { cancelReplay(); cancelAnimationFrame(resizeFrame); resizeFrame = requestAnimationFrame(measure) }
    // Publish initial state even when the first scroll beat equals the local initial value.
    setState(current)
    const sizeObserver = new ResizeObserver(onResize)
    if (mobilePresentation) sizeObserver.observe(pinned)
    measure()
    document.fonts.ready.then(measure)
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)
    return () => {
      disposed = true
      sizeObserver.disconnect()
      cancelReplay()
      cancelAnimationFrame(frame)
      cancelAnimationFrame(resizeFrame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      controller.current = null
      chapter.style.removeProperty('--structural-stage-height')
    }
  }, [staticPresentation, mobilePresentation])

  return { track, stage, state, staticPresentation, mobilePresentation, select: (mode: DemoMode, phase: number) => controller.current?.select(mode, phase), replay: () => controller.current?.replay() }
}
