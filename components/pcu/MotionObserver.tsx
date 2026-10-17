'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

// Runs before paint: hidden "before" states only apply when this flag is set,
// so the page is fully visible without JavaScript or under reduced motion.
const flagScript = `try{if(!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.dataset.motion='on'}catch(e){}`

/** Elements that fade up as they scroll into view. */
const REVEAL = '.section-head, .grid-2 > *, .grid-3 > *, .grid-4 > *, .pcu-card, .photo-card, .theme-band .wrap, [data-reveal]'
/** Elements that only get `.is-in` (their own CSS decides what animates). */
const TRIGGER = '.pattern-band, .decor-ring-bl, .decor-ring-tr'

/**
 * One observer for the whole site: marks targets with `.rv` / `.mt`, staggers
 * grid children through `--i`, and adds `.is-in` once each enters the viewport.
 */
export function MotionObserver() {
  const pathname = usePathname()

  useEffect(() => {
    const root = document.documentElement
    if (root.dataset.motion !== 'on') return
    const main = document.getElementById('main-content')
    if (!main) return

    // Once the entrance has played, `.rv-done` hands transitions back to the element's own styles (hovers).
    const show = (el: Element) => {
      el.classList.add('is-in')
      window.setTimeout(() => el.classList.add('rv-done'), 1400)
    }

    const io = new IntersectionObserver(entries => {
      for (const e of entries) {
        if (!e.isIntersecting) continue
        show(e.target)
        io.unobserve(e.target)
      }
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' })

    const prepare = (el: Element, cls: 'rv' | 'mt') => {
      if (el.classList.contains(cls)) return
      // A target inside another fading target would fade twice.
      if (cls === 'rv' && el.parentElement?.closest('.rv')) return
      const parent = el.parentElement
      if (cls === 'rv' && parent && /\bgrid-[234]\b/.test(parent.className)) {
        (el as HTMLElement).style.setProperty('--i', String(Math.min(Array.prototype.indexOf.call(parent.children, el), 6)))
      }
      if (el.getBoundingClientRect().top < window.innerHeight * 0.92) {
        // Already on screen (it was painted visible): leave it be; the page fade covers it.
        el.classList.add(cls, 'is-in', 'rv-done')
      } else {
        el.classList.add(cls)
        io.observe(el)
      }
    }

    const scan = () => {
      main.querySelectorAll(REVEAL).forEach(el => prepare(el, 'rv'))
      main.querySelectorAll(TRIGGER).forEach(el => prepare(el, 'mt'))
    }
    scan()

    let queued = 0
    const mo = new MutationObserver(() => {
      if (queued) return
      queued = requestAnimationFrame(() => { queued = 0; scan() })
    })
    mo.observe(main, { childList: true, subtree: true })

    return () => { io.disconnect(); mo.disconnect(); cancelAnimationFrame(queued) }
  }, [pathname])

  return <script dangerouslySetInnerHTML={{ __html: flagScript }} />
}
