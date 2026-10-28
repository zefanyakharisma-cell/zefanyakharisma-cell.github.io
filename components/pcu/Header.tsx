'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'
import { mainNav, sectionFor } from '@/lib/nav'

/** Writes the header's height to --header-h (sticky bars and anchor offsets use it). */
const setHeaderH = (el: HTMLElement) => document.documentElement.style.setProperty('--header-h', `${el.offsetHeight}px`)

// Runs as soon as the header is parsed, so the first paint already has the real height
// (the nav wraps to a second row on phones). The CSS fallback is 72px.
const measureScript = `try{var h=document.querySelector('.site-header');if(h)document.documentElement.style.setProperty('--header-h',h.offsetHeight+'px')}catch(e){}`

export function Header() {
  const active = sectionFor(usePathname())
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    setHeaderH(el)
    const ro = new ResizeObserver(() => setHeaderH(el))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  // Past the first few pixels the glass gets a touch more frost and a shadow.
  useEffect(() => {
    const el = ref.current
    if (!el) return
    let raf = 0
    const update = () => { raf = 0; el.toggleAttribute('data-scrolled', window.scrollY > 8) }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update) }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(raf) }
  }, [])

  return (
    <>
      <header ref={ref} className="site-header">
        <div className="wrap">
          <Link href="/" className="wordmark">Zefanya Kharisma <span>Nugroho</span></Link>
          <nav className="site-nav" aria-label="Main navigation">
            {mainNav.map(item => (
              <Link key={item.section} href={item.href} aria-current={active === item.section ? 'page' : undefined}>
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>
      <script dangerouslySetInnerHTML={{ __html: measureScript }} />
    </>
  )
}
