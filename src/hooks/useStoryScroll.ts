import { useCallback, useEffect, useRef } from 'react'
import { PLAN_ASPECT, PLAN_WIDTH } from '../data/plan'
import { ROOMS } from '../data/qto'
import type { SheetRefs } from '../components/PlanSheet'
import { cameraAt, ease, fit, isStackedLayout, range, type Frame, type Rect } from './storyMath'

export { isStackedLayout }

/*
 * One native-scroll timeline for the whole QTO story: Hero → Calibration → Rooms → Quantities → Export.
 *
 * No React state is touched while scrolling. A single passive listener schedules one
 * requestAnimationFrame, reads window.scrollY (no layout), and writes only transform /
 * opacity to a handful of composited elements. Discrete story beats are published as
 * data-stage (the current beat) and data-reached (every beat passed so far), so CSS can play
 * short, time-based transitions — room marking, ledger rows, chapter changes — when a beat is crossed.
 */

const STAGES = ['hero', 'handoff', 'marking', 'measured', 'calibrated', 'rooms', 'room1', 'room2', 'room3', 'total', 'export'] as const
export type StoryStage = (typeof STAGES)[number]

type FrameName = 'hero' | 'focus' | 'work' | 'room1' | 'room2' | 'room3'

// Timeline, in viewport heights of scroll from the top of the story.
const V = {
  copyOut: [0, 0.125],
  panelIn: [0.125, 0.425],
  dim: [0.375, 0.5],
  draw: [0.475, 0.725],
  // Beat thresholds (entering each stage).
  handoff: 0.02,
  marking: 0.375,
  measured: 0.725,
  calibrated: 0.8,
  rooms: 1.0,
  room1: 1.12,
  room2: 1.34,
  room3: 1.56,
  total: 1.8,
  export: 2.06,
  end: 2.32,
} as const

// Camera keyframes: [scroll position, frame]. Desktop keeps the whole apartment in view while
// rooms are marked; stacked layouts visit each room in a focused crop, then pull back for the total.
const CAMERA_SIDE: [number, FrameName][] = [[0.04, 'hero'], [0.45, 'focus'], [0.75, 'focus'], [0.925, 'work']]
const CAMERA_STACKED: [number, FrameName][] = [
  [0.04, 'hero'], [0.45, 'focus'], [0.75, 'focus'], [0.925, 'work'],
  [1.0, 'work'], [V.room1, 'room1'], [V.room2 - 0.1, 'room1'], [V.room2, 'room2'], [V.room3 - 0.1, 'room2'], [V.room3, 'room3'],
  [V.total - 0.12, 'room3'], [V.total, 'work'],
]

// Same beats and geometry, recomposed beneath the normal-flow phone/tablet Hero.
const MOBILE_V = {
  copyOut: V.copyOut, panelIn: [0, .16], dim: [.08, .22], draw: [.22, .48],
  handoff: 0, marking: .22, measured: .48, calibrated: .6, rooms: .76,
  room1: .88, room2: 1.08, room3: 1.28, total: 1.52, export: 1.78, end: 2.06,
} as const
const MOBILE_CAMERA: [number, FrameName][] = [
  [0, 'work'], [.18, 'focus'], [.6, 'focus'], [.76, 'work'],
  [.88, 'room1'], [.98, 'room1'], [1.08, 'room2'], [1.18, 'room2'],
  [1.28, 'room3'], [1.4, 'room3'], [1.52, 'work'],
]
export const MOBILE_STORY_TRAVEL = MOBILE_V.end
export const STORY_TRAVEL = V.end

/** A room plus enough surrounding walls to stay spatially readable. */
const roomCrop = (i: number, pad = 44): Rect => {
  const { x0, y0, x1, y1 } = ROOMS[i].rect
  return { x0: x0 - pad, y0: y0 - pad, x1: x1 + pad, y1: y1 + pad }
}

function computeFrames(W: number, H: number, copyBottom: number, header: number, panel: DOMRect): Record<FrameName, Frame> {
  const gutter = Math.min(48, Math.max(16, W * 0.025))

  if (isStackedLayout(W, H)) {
    const view = { x0: gutter * 0.5, y0: header + 12, x1: W - gutter * 0.5, y1: panel.top - 14 }
    // Hero: the sheet enlarged and cropped; the building's west wing fills the phone.
    const heroW = Math.max(W * 1.95, 640)
    const hero = { x: gutter - 92 * (heroW / PLAN_WIDTH), y: copyBottom + 30, w: heroW }
    // Focus: the 5.00 m reference, large enough to read as the subject.
    const focus = fit({ x0: 150, y0: 470, x1: 525, y1: 850 }, view)
    // Work: the whole apartment, so the calibrated grid and the marked rooms read as a whole.
    const work = fit({ x0: 40, y0: 80, x1: 975, y1: 800 }, view)
    return { hero, focus, work, room1: fit(roomCrop(0), view), room2: fit(roomCrop(1), view), room3: fit(roomCrop(2), view) }
  }

  const view = { x0: gutter, y0: header + 20, x1: panel.left - gutter * 0.75, y1: H - 20 }
  // Hero: one monumental sheet spanning the grid, cropped by the bottom of the viewport.
  const hero = { x: gutter, y: copyBottom + 56, w: W - gutter * 2 }
  // Focus: the camera travels down the sheet to the printed reference and closes in on it.
  const focus = fit({ x0: 80, y0: 540, x1: 620, y1: 870 }, view)
  // Work: the whole apartment beside the panel; the title block slips under the panel.
  const work = fit({ x0: 44, y0: 60, x1: 972, y1: 806 }, { ...view, x1: panel.left }, 'end')
  return { hero, focus, work, room1: work, room2: work, room3: work }
}

function stageAt(v: number, beats: typeof V | typeof MOBILE_V = V): StoryStage {
  let current: StoryStage = 'hero'
  for (const name of STAGES) if (name !== 'hero' && v >= beats[name]) current = name
  return current
}

/** Owns the story's element refs (the component attaches them) and drives the timeline. */
export function useStoryScroll(enabled: boolean, mobile = false) {
  const sectionEl = useRef<HTMLElement>(null)
  const stageEl = useRef<HTMLDivElement>(null)
  const heroCopyEl = useRef<HTMLDivElement>(null)
  const rigEl = useRef<HTMLDivElement>(null)
  const panelEl = useRef<HTMLDivElement>(null)
  const sheet = useRef<SheetRefs | null>(null)
  const register = useCallback((r: SheetRefs) => { sheet.current = r }, [])

  useEffect(() => {
    if (!enabled) return
    const section = sectionEl.current
    const stage = stageEl.current
    const heroCopy = heroCopyEl.current
    const rig = rigEl.current
    const panel = panelEl.current
    if (!section || !stage || (!mobile && !heroCopy) || !rig || !panel) return
    const beats = mobile ? MOBILE_V : V

    let start = 0
    let H = 1
    let baseW = 1
    let frames = {} as Record<FrameName, Frame>
    let camera = CAMERA_SIDE
    let stacked = false
    let panelSize = 0
    let last = -1
    let frame = 0
    let currentStage: StoryStage | null = null
    const panelItems = Array.from(panel.querySelectorAll<HTMLElement>('[data-reveal]'))

    const setStage = (next: StoryStage) => {
      if (currentStage === next) return
      currentStage = next
      section.dataset.stage = next
      section.dataset.reached = STAGES.slice(0, STAGES.indexOf(next) + 1).join(' ')
      document.documentElement.dataset.story = next
    }

    const apply = () => {
      frame = 0
      const v = Math.min(beats.end, Math.max(0, (window.scrollY - start) / H))
      if (v === last) return
      last = v

      // Hero copy leaves immediately with the first gesture.
      const out = ease(range(v, beats.copyOut))
      if (heroCopy) {
        heroCopy.style.transform = `translate3d(0, ${-out * 120}px, 0)`
        heroCopy.style.opacity = String(1 - out)
        heroCopy.style.visibility = out >= 1 ? 'hidden' : ''
      }

      // One camera over one sheet: hero crop → reference → whole plan (→ each room, when stacked).
      const c = cameraAt(v, camera, frames)
      rig.style.transform = `translate3d(${c.x}px, ${c.y}px, 0) scale(${c.w / baseW})`

      // BetterCalc arrives: the panel slides in from the reading edge (right in desktop, bottom when stacked).
      const p = ease(range(v, beats.panelIn))
      panel.style.transform = stacked ? `translate3d(0, ${(1 - p) * (panelSize + 24)}px, 0)` : `translate3d(${(1 - p) * (panelSize + 24)}px, 0, 0)`
      panelItems.forEach((item, i) => {
        const r = ease(range(v, [beats.panelIn[0] + 0.125 + i * 0.04, beats.panelIn[1] + 0.025 + i * 0.04]))
        item.style.opacity = String(r)
        item.style.transform = `translate3d(0, ${(1 - r) * 14}px, 0)`
      })

      const s = sheet.current
      if (s) {
        if (s.tab) s.tab.style.opacity = String(1 - range(v, [0.05, 0.25]))
        // Everything except the reference recedes, then the line is drawn end to end.
        if (s.veil) s.veil.style.opacity = String(range(v, beats.dim) * 0.72)
        const d = range(v, beats.draw)
        if (s.line) s.line.style.transform = `scaleX(${d})`
        if (s.endA) s.endA.style.transform = `translate(-50%, -50%) scale(${ease(range(v, [beats.draw[0] - 0.04, beats.draw[0] + 0.01]))})`
        if (s.endB) s.endB.style.transform = `translate(-50%, -50%) scale(${ease(range(v, [beats.draw[1] - 0.025, beats.draw[1] + 0.01]))})`
      }

      setStage(stageAt(v, beats))
    }

    // Direct DOM writes are the point of this hook: layout is measured only here, on resize.
    const measure = () => {
      const W = window.innerWidth
      H = stage.clientHeight
      stacked = mobile || isStackedLayout(W, H)
      camera = mobile ? MOBILE_CAMERA : stacked ? CAMERA_STACKED : CAMERA_SIDE
      section.dataset.layout = stacked ? 'stacked' : 'side'
      // Reset transforms that affect measurement.
      panel.style.transform = 'none'
      if (heroCopy) heroCopy.style.transform = 'none'
      const panelRect = panel.getBoundingClientRect()
      const stageRect = stage.getBoundingClientRect()
      const panelLocal = new DOMRect(panelRect.left - stageRect.left, panelRect.top - stageRect.top, panelRect.width, panelRect.height)
      panelSize = stacked ? panelRect.height : panelRect.width
      section.style.setProperty('--panel-size', `${panelSize}px`)
      const header = document.querySelector('.site-header')?.getBoundingClientRect().height ?? 56
      const copyBottom = heroCopy ? heroCopy.offsetTop + heroCopy.offsetHeight : 0
      frames = computeFrames(W, H, copyBottom, header, panelLocal)
      baseW = Math.max(...Object.values(frames).map((f) => f.w))
      rig.style.width = `${baseW}px`
      rig.style.height = `${baseW / PLAN_ASPECT}px`
      // Overlays are authored in screen pixels for the state in which they are read.
      rig.style.setProperty('--hero-k', String(frames.hero.w / baseW))
      rig.style.setProperty('--focus-k', String(frames.focus.w / baseW))
      rig.style.setProperty('--work-k', String(frames.work.w / baseW))
      ;(['room1', 'room2', 'room3'] as const).forEach((name) => rig.style.setProperty(`--${name}-k`, String(frames[name].w / baseW)))
      start = section.getBoundingClientRect().top + window.scrollY
      last = -1
      apply()
    }

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(apply)
    }
    let resizeFrame = 0
    const onResize = () => {
      cancelAnimationFrame(resizeFrame)
      resizeFrame = requestAnimationFrame(measure)
    }

    measure()
    // Fonts change the hero copy height; re-measure once they are ready.
    document.fonts?.ready.then(measure)
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      cancelAnimationFrame(frame)
      cancelAnimationFrame(resizeFrame)
      delete document.documentElement.dataset.story
    }
  }, [enabled, mobile])

  return { section: sectionEl, stage: stageEl, heroCopy: heroCopyEl, rig: rigEl, panel: panelEl, register }
}
