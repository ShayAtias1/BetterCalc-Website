import { useEffect, useRef, useState, useSyncExternalStore } from 'react'
import { ease, lerp, range } from './storyMath'

const STATIC_QUERY = '(prefers-reduced-motion: reduce)'
const subscribe = (change: () => void) => {
  const media = window.matchMedia(STATIC_QUERY)
  media.addEventListener('change', change)
  return () => media.removeEventListener('change', change)
}
const getStatic = () => window.matchMedia(STATIC_QUERY).matches

type Pose = { x: number; y: number; scale: number; opacity: number; copyOpacity: number }

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
    const captions = elements.map((group) => group.querySelector('figcaption')!)
    let start = 0
    let travel = 1
    let poses: Pose[][] = []
    let frame = 0
    let resizeFrame = 0
    let lastStage = -1
    let disposed = false
    let mobile = false

    const apply = () => {
      frame = 0
      const progress = Math.min(mobile ? 1.6 : 1.8, Math.max(0, (window.scrollY - start) / travel * (mobile ? 1.6 : 1.8)))
      const first = ease(range(progress, mobile ? [.25, .65] : [.3, .7]))
      const second = ease(range(progress, mobile ? [.95, 1.35] : [1.1, 1.5]))
      const segment = progress < (mobile ? .95 : 1.1) ? 0 : 1
      const mix = segment === 0 ? first : second
      elements.forEach((device, index) => {
        const a = poses[segment][index]
        const b = poses[segment + 1][index]
        device.style.transform = `translate3d(${lerp(a.x, b.x, mix)}px, ${lerp(a.y, b.y, mix)}px, 0) scale(${lerp(a.scale, b.scale, mix)})`
        device.style.opacity = String(lerp(a.opacity, b.opacity, mix))
        captions[index].style.opacity = String(lerp(a.copyOpacity, b.copyOpacity, mix))
        device.style.visibility = index > 0 && (index === 1 ? first : second) === 0 ? 'hidden' : 'visible'
      })
      const next = progress < (mobile ? .65 : .7) ? 0 : progress < (mobile ? 1.35 : 1.5) ? 1 : 2
      if (next !== lastStage) { lastStage = next; setActive(next) }
    }

    const measure = () => {
      if (disposed) return
      const width = field.clientWidth
      const height = field.clientHeight
      mobile = window.innerWidth <= 900
      elements.forEach(group => group.querySelector<HTMLElement>('.device-frame')?.style.removeProperty('width'))
      if (mobile) {
        const groupWidth = Math.max(1, width - 16)
        const anchor = width / 2
        const center = anchor - groupWidth / 2
        elements.forEach(group => {
          group.style.width = `${groupWidth}px`
          group.style.gridTemplateColumns = 'minmax(0, 1fr)'
          group.style.columnGap = '0px'
        })
        const hardware = elements.map(group => group.querySelector<HTMLElement>('.device-frame')!)
        const ratios = [1.6, 4 / 3, 390 / 844]
        const limits = [1100, 850, window.innerWidth <= 639 ? Math.min(150, groupWidth * .42) : 220]
        hardware.forEach((device,index) => {
          const available = Math.max(120, height - captions[index].offsetHeight - 36)
          const base = Math.min(index === 1 ? groupWidth * .85 : groupWidth, available * ratios[index], limits[index])
          device.style.width = `${base}px`
        })
        const pose = (index:number,x:number,opacity:number): Pose => ({x,y:Math.max(0,(height-elements[index].offsetHeight)/2),scale:1,opacity,copyOpacity:1})
        const left = -groupWidth - 24
        const right = width + 24
        poses = [
          [pose(0,center,1),pose(1,right,1),pose(2,right,1)],
          [pose(0,left,0),pose(1,center,1),pose(2,right,1)],
          [pose(0,left,0),pose(1,left,0),pose(2,center,1)],
        ]
        field.style.setProperty('--device-center', `${anchor}px`)
      } else {
      const copyWidth = Math.min(300, Math.max(160, width * .23))
      const gap = Math.min(28, Math.max(16, width * .016))
      const visualWidth = width - copyWidth - gap
      // All three hardware centers land at the center of this same visual column.
      const anchor = copyWidth + gap + visualWidth / 2
      const bases = [
        Math.min(visualWidth - 24, width * .68, (height - 40) * 1.6, 1100),
        Math.min(visualWidth - 24, width * .56, (height - 36) * 4 / 3, 850),
        Math.min(visualWidth - 24, (height - 24) * 390 / 844, 220),
      ].map((value) => Math.max(1, value))
      const widths = bases.map((base) => copyWidth + gap + base)
      elements.forEach((group, index) => {
        group.style.width = `${widths[index]}px`
        group.style.gridTemplateColumns = `${copyWidth}px ${bases[index]}px`
        group.style.columnGap = `${gap}px`
      })
      const centered = bases.map((base) => anchor - base / 2 - copyWidth - gap)
      const pose = (index: number, x: number, scale: number, opacity: number, copyOpacity: number): Pose => ({ x, y: Math.max(0, (height - elements[index].offsetHeight * scale) / 2), scale, opacity, copyOpacity })
      // Previous devices leave at their readable size rather than shrinking into miniature mockups.
      const desktopSecondary = 1
      const desktopFinal = 1
      const tabletFinal = 1
      const tabletHistoryEnd = Math.max(0, centered[2] - gap)
      const tabletHistoryStart = tabletHistoryEnd - widths[1] * tabletFinal
      poses = [
        [pose(0, centered[0], 1, 1, 1), pose(1, width + 24, 1, 0, 0), pose(2, width + 24, 1, 0, 0)],
        [pose(0, centered[1] - gap - widths[0] * desktopSecondary, desktopSecondary, .65, 0), pose(1, centered[1], 1, 1, 1), pose(2, width + 24, 1, 0, 0)],
        [pose(0, Math.min(width * .06, tabletHistoryStart - gap) - widths[0] * desktopFinal, desktopFinal, .5, 0), pose(1, tabletHistoryStart, tabletFinal, .65, 0), pose(2, centered[2], 1, 1, 1)],
      ]
      }
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
      elements.forEach((device) => { device.style.removeProperty('width'); device.style.removeProperty('transform'); device.style.removeProperty('opacity'); device.style.removeProperty('visibility'); device.style.removeProperty('grid-template-columns'); device.style.removeProperty('column-gap'); device.querySelector<HTMLElement>('.device-frame')?.style.removeProperty('width') })
      field.style.removeProperty('--device-center')
      captions.forEach((caption) => caption.style.removeProperty('opacity'))
    }
  }, [staticPresentation])

  return { track, scene, deviceRefs: [desktop, tablet, phone], active, staticPresentation }
}
