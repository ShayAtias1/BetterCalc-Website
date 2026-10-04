import { useEffect, useRef, useState, useSyncExternalStore } from 'react'
import { clamp01, ease } from './storyMath'

const QUERY = '(max-width: 639px) and (prefers-reduced-motion: no-preference)'
const subscribe = (change: () => void) => {
  const media = window.matchMedia(QUERY)
  media.addEventListener('change', change)
  return () => media.removeEventListener('change', change)
}

export function useMaterialsStory() {
  const mobile = useSyncExternalStore(subscribe, () => window.matchMedia(QUERY).matches, () => false)
  const track = useRef<HTMLDivElement>(null)
  const stage = useRef<HTMLDivElement>(null)
  const scene = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)

  useEffect(() => {
    if (!mobile || !track.current || !stage.current || !scene.current) return
    const chapter = track.current
    const pinned = stage.current
    const field = scene.current
    const groups = Array.from(field.querySelectorAll<HTMLElement>('.materials-story__group'))
    let start = 0
    let travel = 1
    let frame = 0
    let disposed = false
    const apply = () => {
      frame = 0
      const progress = clamp01((window.scrollY - start) / travel)
      const first = ease(clamp01((progress - .2) / .2))
      const second = ease(clamp01((progress - .6) / .2))
      groups.forEach((group, index) => {
        const incoming = index === 0 ? 1 : index === 1 ? first : second
        const outgoing = index === 0 ? first : index === 1 ? second : 0
        const center = field.clientWidth / 2 - group.offsetWidth / 2
        const x = center + (1 - incoming) * (field.clientWidth + 16) - outgoing * (group.offsetWidth + 16)
        group.style.transform = `translate3d(${x}px, 0, 0)`
        group.style.visibility = incoming === 0 || outgoing === 1 ? 'hidden' : 'visible'
      })
      setActive(progress < .4 ? 0 : progress < .8 ? 1 : 2)
    }
    const measure = () => {
      if (disposed) return
      const header = document.querySelector('.site-header')?.getBoundingClientRect().height ?? 56
      chapter.style.setProperty('--materials-stage-height', `${pinned.offsetHeight}px`)
      start = chapter.getBoundingClientRect().top + window.scrollY - header
      // Complete the third mode before the following section enters the free viewport space.
      travel = Math.max(1, chapter.offsetHeight - Math.max(pinned.offsetHeight, window.innerHeight - header))
      apply()
    }
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(apply) }
    const observer = new ResizeObserver(measure)
    observer.observe(pinned)
    measure()
    document.fonts.ready.then(measure)
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', measure)
    return () => {
      disposed = true
      observer.disconnect()
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', measure)
      chapter.style.removeProperty('--materials-stage-height')
    }
  }, [mobile])

  return { mobile, track, stage, scene, active }
}
