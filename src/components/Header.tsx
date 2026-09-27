import { useEffect, useRef, type RefObject } from 'react'
import { APP_URL, NAV } from '../data/site'
import logo from '../assets/logo/bettercalc-logo.svg'

/** Marks the story section currently crossing the middle of the viewport (DOM write, no re-render). */
function useCurrentSection(nav: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const links = Array.from(nav.current?.querySelectorAll<HTMLAnchorElement>('a[href^="#"]') ?? [])
    const sections = new Map<Element, HTMLAnchorElement>()
    links.forEach((link) => {
      const section = document.querySelector(link.getAttribute('href')!)?.closest('section')
      if (section) sections.set(section, link)
    })
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const link = sections.get(entry.target)
        if (!link) return
        if (entry.isIntersecting) link.setAttribute('aria-current', 'true')
        else link.removeAttribute('aria-current')
      })
    }, { rootMargin: '-50% 0px -50% 0px' })
    sections.forEach((_, section) => observer.observe(section))
    return () => observer.disconnect()
  }, [nav])
}

export function Header() {
  const nav = useRef<HTMLElement>(null)
  useCurrentSection(nav)
  return (
    <header className="site-header">
      <a className="brand" href="#main-content" aria-label="BetterCalc — ראש העמוד">
        <img className="brand__logo" src={logo} width={120} height={20} alt="" />
      </a>
      <nav className="primary-nav" aria-label="ניווט ראשי" ref={nav}>
        {NAV.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}
      </nav>
      <a className="header-action" href={APP_URL}><span>פתחו את <bdi dir="ltr">BetterCalc</bdi></span><span aria-hidden="true">←</span></a>
    </header>
  )
}
