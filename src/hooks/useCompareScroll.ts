import { useEffect, useMemo, useRef, type RefObject } from 'react'
import { PLAN_ASPECT, PLAN_WIDTH } from '../data/plan'
import { CHANGED_ZONE } from '../data/compare'
import { cameraAt, ease, fit, isStackedLayout, lerp, range, type Frame } from './storyMath'
import { swipeValueText } from './useSwipeControl'

/*
 * The Revision Compare chapter: one native-scroll timeline, same architecture as the QTO story.
 * Scroll drives the guided comparison; the overlay opacity and the swipe divider can be taken over
 * by the visitor. Nothing renders React while scrolling or dragging — only transform / opacity
 * writes, coalesced into requestAnimationFrame, plus data-stage / data-reached tokens for CSS beats.
 */

const STAGES = ['intro', 'pair', 'align', 'overlay', 'read', 'swipe', 'free', 'work', 'demolition', 'construction', 'changes', 'export'] as const
export type CompareStage = (typeof STAGES)[number]

export type CompareRefs = {
  section: RefObject<HTMLElement | null>
  stage: RefObject<HTMLDivElement | null>
  question: RefObject<HTMLDivElement | null>
  rig: RefObject<HTMLDivElement | null>
  revSheet: RefObject<HTMLDivElement | null>
  origLayer: RefObject<HTMLDivElement | null>
  revLayer: RefObject<HTMLDivElement | null>
  origClip: RefObject<HTMLDivElement | null>
  origInner: RefObject<HTMLDivElement | null>
  revClip: RefObject<HTMLDivElement | null>
  revInner: RefObject<HTMLDivElement | null>
  divider: RefObject<HTMLDivElement | null>
  handle: RefObject<HTMLDivElement | null>
  panel: RefObject<HTMLDivElement | null>
  origReadout: RefObject<HTMLSpanElement | null>
  revReadout: RefObject<HTMLSpanElement | null>
  revSlider: RefObject<HTMLInputElement | null>
}

/** Lets the swipe / overlay controls talk to the running timeline. */
export type CompareController = {
  bounds: () => { left: number; right: number }
  getSwipe: () => number
  setSwipe: (value: number) => void
  setRevision: (value: number) => void
}

type FrameName = 'intro' | 'pair' | 'overlay' | 'focus' | 'swipe' | 'mark'

// Timeline, in viewport heights of scroll from the moment the stage pins.
const V = {
  questionOut: [0.1, 0.3],
  revisionIn: [0.06, 0.3],
  alignRev: [0.34, 0.58],
  tabsOut: [0.46, 0.58],
  panelIn: [0.42, 0.64],
  // Overlay: revision lands dominant (original ghosted), then settles to a balanced pair.
  ghostOriginal: [0.46, 0.6],
  balance: [0.74, 0.9],
  swipeFull: [1.06, 1.14],
  sweep: [1.16, 1.42],
  settle: [1.42, 1.52],
  // Beat thresholds.
  pair: 0.12,
  align: 0.34,
  overlay: 0.56,
  read: 0.94,
  swipe: 1.12,
  free: 1.52,
  work: 1.72,
  demolition: 1.86,
  construction: 2.08,
  changes: 2.3,
  export: 2.52,
  end: 2.78,
} as const

export const COMPARE_TRAVEL = V.end

// Guided swipe, in sheet points: sweep across every change (screen wall → bathroom → partition), then rest
// inside the bathroom, where its moved north wall visibly steps at the divider before anyone drags.
const SWEEP_FROM = 752
const SWEEP_TO = 300
const SWEEP_REST = 600

const CAMERA_SIDE: [number, FrameName][] = [
  [0.02, 'intro'], [0.3, 'pair'], [0.36, 'pair'], [0.6, 'overlay'], [0.68, 'overlay'], [0.9, 'focus'],
  [1.62, 'focus'], [1.8, 'mark'],
]
const CAMERA_STACKED: [number, FrameName][] = [
  [0.02, 'intro'], [0.3, 'pair'], [0.36, 'pair'], [0.6, 'overlay'], [0.68, 'overlay'], [0.9, 'focus'],
  [1.06, 'focus'], [1.14, 'swipe'], [1.62, 'swipe'], [1.8, 'mark'],
]

function stageAt(v: number): CompareStage {
  let current: CompareStage = 'intro'
  for (const name of STAGES) if (name !== 'intro' && v >= V[name]) current = name
  return current
}

function computeFrames(W: number, H: number, header: number, questionBottom: number, panel: DOMRect, stacked: boolean) {
  const gutter = Math.min(48, Math.max(16, W * 0.025))
  const full = { x0: 0, y0: 0, x1: PLAN_WIDTH, y1: PLAN_WIDTH / PLAN_ASPECT }
  const zone = CHANGED_ZONE

  if (stacked) {
    const view = { x0: gutter * 0.5, y0: header + 12, x1: W - gutter * 0.5, y1: panel.top - 14 }
    const intro = fit(full, { x0: gutter, y0: questionBottom + 28, x1: W - gutter, y1: H - 20 })
    // Two documents, one above the other: A-101 on top, A-101-B below.
    const pairH = (H - header - 70) / 2
    const pair = fit(full, { x0: gutter, y0: header + 34, x1: W - gutter, y1: header + 34 + pairH - 12 })
    return {
      view,
      revOffset: { x: 0, y: 1 + 44 / (pair.w / PLAN_ASPECT) },
      frames: {
        intro, pair,
        overlay: fit({ x0: 40, y0: 80, x1: 975, y1: 800 }, view),
        focus: fit(zone, view),
        swipe: fit({ x0: 286, y0: 318, x1: 760, y1: 664 }, view),
        mark: fit({ x0: 236, y0: 346, x1: 452, y1: 668 }, view),
      } satisfies Record<FrameName, Frame>,
    }
  }

  const view = { x0: gutter, y0: header + 20, x1: panel.left - gutter * 0.75, y1: H - 20 }
  // Intro echoes the hero: one monumental sheet under the headline, cropped by the viewport.
  const intro = { x: gutter, y: questionBottom + 48, w: W - gutter * 2 }
  // Pair: A-101 on the right (read first), A-101-B arriving on the left.
  const pairGap = gutter * 1.5
  const pair = fit(full, { x0: (W + pairGap) / 2, y0: header + 64, x1: W - gutter, y1: H - 28 })
  return {
    view,
    revOffset: { x: -(1 + pairGap / pair.w), y: 0 },
    frames: {
      intro, pair,
      overlay: fit({ x0: 44, y0: 60, x1: 972, y1: 806 }, { ...view, x1: panel.left }, 'end'),
      focus: fit({ x0: zone.x0 - 66, y0: zone.y0 - 26, x1: zone.x1 + 52, y1: zone.y1 + 22 }, view),
      swipe: fit({ x0: zone.x0 - 66, y0: zone.y0 - 26, x1: zone.x1 + 52, y1: zone.y1 + 22 }, view),
      mark: fit({ x0: 200, y0: 300, x1: 640, y1: 690 }, view),
    } satisfies Record<FrameName, Frame>,
  }
}

export function useCompareScroll(refs: CompareRefs, enabled: boolean) {
  const controller = useRef<CompareController | null>(null)
  useEffect(() => {
    if (!enabled) return
    const r = Object.fromEntries(Object.entries(refs).map(([k, ref]) => [k, ref.current])) as { [K in keyof CompareRefs]: NonNullable<CompareRefs[K]['current']> }
    if (Object.values(r).some((el) => !el)) return
    const { section, stage, question, rig, revSheet, origLayer, revLayer, origClip, origInner, revClip, revInner, divider, handle, panel, origReadout, revReadout, revSlider } = r

    let start = 0
    let H = 1
    let baseW = 1
    let stacked = false
    let panelSize = 0
    let view = { x0: 0, y0: 0, x1: 1, y1: 1 }
    let revOffset = { x: -1.1, y: 0 }
    let frames = {} as Record<FrameName, Frame>
    let camera = CAMERA_SIDE
    let cam: Frame = { x: 0, y: 0, w: 1 }
    let last = -1
    let frame = 0
    let current: CompareStage | null = null
    // Visitor overrides; reset when they scroll back before the moment they belong to.
    let userRevision: number | null = null
    let userSwipe: number | null = null
    let swipeValue = 0.5
    let lastReadout = ''
    const panelItems = Array.from(panel.querySelectorAll<HTMLElement>('[data-reveal]'))
    const tabs = Array.from(rig.querySelectorAll<HTMLElement>('.c-tab'))

    const setStage = (next: CompareStage) => {
      if (current === next) return
      current = next
      section.dataset.stage = next
      section.dataset.reached = STAGES.slice(0, STAGES.indexOf(next) + 1).join(' ')
      revSlider.disabled = next !== 'read'
      handle.tabIndex = next === 'swipe' || next === 'free' ? 0 : -1
    }

    const setReadout = (orig: number, rev: number) => {
      const text = `${Math.round(orig * 100)}|${Math.round(rev * 100)}`
      if (text === lastReadout) return
      lastReadout = text
      origReadout.textContent = `${Math.round(orig * 100)}%`
      revReadout.textContent = `${Math.round(rev * 100)}%`
      if (userRevision === null) revSlider.value = String(Math.round(rev * 100))
    }

    const apply = (force = false) => {
      frame = 0
      const v = Math.min(V.end, Math.max(0, (window.scrollY - start) / H))
      if (v === last && !force) return
      last = v
      if (v < V.read) userRevision = null
      if (v < V.swipe) userSwipe = null

      // The question: same place the hero headline lived — a deliberate return to "a plan arrived".
      const q = ease(range(v, V.questionOut))
      question.style.transform = `translate3d(0, ${-q * 110}px, 0)`
      question.style.opacity = String(1 - q)
      question.style.visibility = q >= 1 ? 'hidden' : ''

      cam = cameraAt(v, camera, frames)
      rig.style.transform = `translate3d(${cam.x}px, ${cam.y}px, 0) scale(${cam.w / baseW})`

      // A-101-B arrives beside A-101, then slides into registration on top of it.
      const arrive = ease(range(v, V.revisionIn))
      const land = ease(range(v, V.alignRev))
      const far = stacked ? { x: 0, y: revOffset.y + 1.6 } : { x: revOffset.x - 1.4, y: 0 }
      const ox = lerp(lerp(far.x, revOffset.x, arrive), 0, land)
      const oy = lerp(lerp(far.y, revOffset.y, arrive), 0, land)
      revSheet.style.transform = `translate3d(${ox * 100}%, ${oy * 100}%, 0)`
      // Tabs keep a constant on-screen size whatever the camera scale (compositor-only counter-scale).
      const tabScale = `scale(${baseW / cam.w})`
      const tabOpacity = String(1 - range(v, V.tabsOut))
      tabs.forEach((tab) => { tab.style.transform = tabScale; tab.style.opacity = tabOpacity })

      const p = ease(range(v, V.panelIn))
      panel.style.transform = stacked ? `translate3d(0, ${(1 - p) * (panelSize + 24)}px, 0)` : `translate3d(${(1 - p) * (panelSize + 24)}px, 0, 0)`
      panelItems.forEach((item, i) => {
        const k = ease(range(v, [V.panelIn[0] + 0.1 + i * 0.04, V.panelIn[1] + 0.02 + i * 0.04]))
        item.style.opacity = String(k)
        item.style.transform = `translate3d(0, ${(1 - k) * 14}px, 0)`
      })

      // Layer opacities: dominant revision → balanced pair (75%, the product default) → full for swipe → quiet for work.
      let orig = 1 - 0.7 * ease(range(v, V.ghostOriginal)) + 0.7 * ease(range(v, V.balance))
      let rev = 1 - 0.25 * ease(range(v, V.balance))
      if (v >= V.read && userRevision !== null) rev = userRevision
      rev = lerp(rev, 1, ease(range(v, V.swipeFull)))
      if (v >= V.work) { orig = 1; rev = 0.6 }
      origLayer.style.opacity = String(orig)
      revLayer.style.opacity = String(rev)
      setReadout(orig, rev)

      // Swipe: the revision is shown left of the divider, the original to its right.
      const inSwipe = v >= V.swipe && v < V.work
      if (inSwipe) {
        const sheetX = userSwipe !== null ? null : lerp(lerp(SWEEP_FROM, SWEEP_TO, ease(range(v, V.sweep))), SWEEP_REST, ease(range(v, V.settle)))
        const screenX = sheetX === null ? view.x0 + userSwipe! * (view.x1 - view.x0) : cam.x + (sheetX / PLAN_WIDTH) * cam.w
        const clamped = Math.min(view.x1, Math.max(view.x0, screenX))
        swipeValue = (clamped - view.x0) / (view.x1 - view.x0)
        const u = ((clamped - cam.x) / cam.w) * 100
        origClip.style.transform = `translate3d(${u}%, 0, 0)`
        origInner.style.transform = `translate3d(${-u}%, 0, 0)`
        revClip.style.transform = `translate3d(${u - 100}%, 0, 0)`
        revInner.style.transform = `translate3d(${100 - u}%, 0, 0)`
        divider.style.transform = `translate3d(${clamped}px, 0, 0)`
        handle.setAttribute('aria-valuenow', String(Math.round(swipeValue * 100)))
        handle.setAttribute('aria-valuetext', swipeValueText(swipeValue))
      } else if (origClip.style.transform !== 'none') {
        origClip.style.transform = origInner.style.transform = revClip.style.transform = revInner.style.transform = 'none'
      }

      setStage(stageAt(v))
    }

    const measure = () => {
      const W = window.innerWidth
      H = stage.clientHeight
      stacked = isStackedLayout(W, H)
      camera = stacked ? CAMERA_STACKED : CAMERA_SIDE
      section.dataset.layout = stacked ? 'stacked' : 'side'
      panel.style.transform = 'none'
      question.style.transform = 'none'
      const stageRect = stage.getBoundingClientRect()
      const panelRect = panel.getBoundingClientRect()
      const panelLocal = new DOMRect(panelRect.left - stageRect.left, panelRect.top - stageRect.top, panelRect.width, panelRect.height)
      panelSize = stacked ? panelRect.height : panelRect.width
      section.style.setProperty('--panel-size', `${panelSize}px`)
      const header = document.querySelector('.site-header')?.getBoundingClientRect().height ?? 56
      const questionBottom = question.offsetTop + question.offsetHeight
      const computed = computeFrames(W, H, header, questionBottom, panelLocal, stacked)
      frames = computed.frames
      view = computed.view
      revOffset = computed.revOffset
      baseW = Math.max(...Object.values(frames).map((f) => f.w))
      rig.style.width = `${baseW}px`
      rig.style.height = `${baseW / PLAN_ASPECT}px`
      rig.style.setProperty('--mark-k', String(frames.mark.w / baseW))
      divider.style.setProperty('--view-top', `${view.y0}px`)
      divider.style.setProperty('--view-height', `${view.y1 - view.y0}px`)
      start = section.getBoundingClientRect().top + window.scrollY
      last = -1
      apply()
    }

    controller.current = {
      bounds: () => {
        const rect = stage.getBoundingClientRect()
        return { left: rect.left + view.x0, right: rect.left + view.x1 }
      },
      getSwipe: () => swipeValue,
      setSwipe: (value) => { userSwipe = value; apply(true) },
      setRevision: (value) => { userRevision = value; apply(true) },
    }

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(() => apply())
    }
    let resizeFrame = 0
    const onResize = () => {
      cancelAnimationFrame(resizeFrame)
      resizeFrame = requestAnimationFrame(measure)
    }

    measure()
    document.fonts?.ready.then(measure)
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      cancelAnimationFrame(frame)
      cancelAnimationFrame(resizeFrame)
      controller.current = null
    }
  }, [enabled, refs])

  // Stable functions for the controls; they delegate to whichever timeline is currently mounted.
  return useMemo<CompareController>(() => ({
    bounds: () => controller.current?.bounds() ?? { left: 0, right: 1 },
    getSwipe: () => controller.current?.getSwipe() ?? 0.5,
    setSwipe: (value) => controller.current?.setSwipe(value),
    setRevision: (value) => controller.current?.setRevision(value),
  }), [])
}
