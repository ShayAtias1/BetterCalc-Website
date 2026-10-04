import { useEffect, useRef, useState, useSyncExternalStore } from 'react'
import { ease, lerp, range } from './storyMath'

const STATIC_QUERY = '(max-width: 639px), (prefers-reduced-motion: reduce)'
const subscribe = (change: () => void) => {
  const media = window.matchMedia(STATIC_QUERY)
  media.addEventListener('change', change)
  return () => media.removeEventListener('change', change)
}
const getStatic = () => window.matchMedia(STATIC_QUERY).matches

type Pose = { x: number; y: number; scale: number; opacity: number }

/** A local native-scroll chapter: 180svh travel, with three inspection holds.
 * Layout is measured on resize; scroll writes only transforms/opacity and publishes beats. */
export function useDeviceStory() {
  const track = useRef<HTMLDivElement>(null)
  const scene = useRef<HTMLDivElement>(null)
  const desktop = useRef<HTMLElement>(null)
  const tablet = useRef<HTMLElement>(null)
  const phone = useRef<HTMLElement>(null)
  const [active, setActive] = useState(0)
  const staticPresentation = useSyncExternalStore(subscribe, getStatic, () => true)

  useEffect(() => {
    if (staticPresentation) return
    const chapter = track.current
    const field = scene.current
    const devices = [desktop.current, tablet.current, phone.current]
    if (!chapter || !field || devices.some((device) => !device)) return
    const elements = devices as HTMLElement[]
    let start = 0
    let travel = 1
    let poses: Pose[][] = []
    let frame = 0
    let resizeFrame = 0
    let lastStage = -1
    let disposed = false

    const apply = () => {
      frame = 0
      const progress = Math.min(1.8, Math.max(0, (window.scrollY - start) / travel * 1.8))
      const first = ease(range(progress, [.3, .7]))
      const second = ease(range(progress, [1.1, 1.5]))
      const segment = progress < 1.1 ? 0 : 1
      const mix = segment === 0 ? first : second
      elements.forEach((device, index) => {
        const a = poses[segment][index]
        const b = poses[segment + 1][index]
        device.style.transform = `translate3d(${lerp(a.x, b.x, mix)}px, ${lerp(a.y, b.y, mix)}px, 0) scale(${lerp(a.scale, b.scale, mix)})`
        device.style.opacity = String(lerp(a.opacity, b.opacity, mix))
        device.style.visibility = index > 0 && (index === 1 ? first : second) === 0 ? 'hidden' : 'visible'
      })
      const next = progress < .5 ? 0 : progress < 1.3 ? 1 : 2
      if (next !== lastStage) { lastStage = next; setActive(next) }
    }

    const measure = () => {
      if (disposed) return
      const width = field.clientWidth
      const height = field.clientHeight
      const compact = width <= 1000
      // Widths are bounded by both axes so every screen remains wholly visible.
      const bases = [Math.min(width * .86, (height - 36) * 1.6, 1100), Math.min(width * .64, (height - 32) * 4 / 3, 850), Math.min(width * .2, (height - 20) * 390 / 844, 220)]
      elements.forEach((device, index) => { device.style.width = `${Math.max(1, bases[index])}px` })
      const desktopSecondary = Math.min(1, width * (compact ? .25 : .32) / bases[0])
      const desktopFinal = Math.min(1, width * .23 / bases[0])
      const tabletFinal = Math.min(1, width * .43 / bases[1])
      const pose = (index: number, x: number, scale: number, opacity: number): Pose => ({ x, y: Math.max(0, height - elements[index].offsetHeight * scale - 8), scale, opacity })
      poses = [
        [pose(0, (width - bases[0]) / 2, 1, 1), pose(1, width + 24, 1, 0), pose(2, width + 24, 1, 0)],
        [pose(0, width * .015, desktopSecondary, .8), pose(1, Math.max(width * (compact ? .29 : .36), width - bases[1] - width * .02), 1, 1), pose(2, width + 24, 1, 0)],
        [pose(0, width * .015, desktopFinal, .72), pose(1, width * .28, tabletFinal, .85), pose(2, width - bases[2] - width * .025, 1, 1)],
      ]
      const header = document.querySelector('.site-header')?.getBoundingClientRect().height ?? 56
      start = chapter.getBoundingClientRect().top + window.scrollY - header
      travel = Math.max(1, chapter.offsetHeight - chapter.firstElementChild!.clientHeight)
      apply()
    }
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(apply) }
    const onResize = () => { cancelAnimationFrame(resizeFrame); resizeFrame = requestAnimationFrame(measure) }
    measure()
    document.fonts.ready.then(measure)
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)
    return () => {
      disposed = true
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      cancelAnimationFrame(frame)
      cancelAnimationFrame(resizeFrame)
      elements.forEach((device) => { device.style.removeProperty('width'); device.style.removeProperty('transform'); device.style.removeProperty('opacity'); device.style.removeProperty('visibility') })
    }
  }, [staticPresentation])

  return { track, scene, deviceRefs: [desktop, tablet, phone], active, staticPresentation }
}
