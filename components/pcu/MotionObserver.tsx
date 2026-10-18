'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

/** Hero images whose entrance waits for the image itself (CSS keeps their animation paused until then). */
const HERO_IMG = '.hero-photo, .arch-photo img'
/** Longest an image or the hero text waits before animating anyway. */
const IMG_WAIT_MS = 2500
const FONT_WAIT_MS = 300

// Runs before paint: hidden "before" states only apply when this flag is set,
// so the page is fully visible without JavaScript or under reduced motion.
// data-img-wait: hero image entrances start paused and are played once the image
// loads, so a slow first visit doesn't run the fade on an empty box.
// data-font-wait: the hero text waits (briefly) for the web font, so it doesn't swap mid-fade.
// Only the first family is loaded: a failing fallback in the list would reject load() at once.
const flagScript = `try{if(!matchMedia('(prefers-reduced-motion: reduce)').matches){var d=document,r=d.documentElement;r.dataset.motion='on';
if(d.getAnimations){r.dataset.imgWait='';var s=${JSON.stringify(HERO_IMG)},p=function(i){i.getAnimations().forEach(function(a){if(a.playState==='paused')a.play()})},
h=function(e){var t=e.target;if(t&&t.tagName==='IMG'&&t.matches(s))p(t)};d.addEventListener('load',h,true);d.addEventListener('error',h,true);
setTimeout(function(){d.querySelectorAll(s).forEach(p)},${IMG_WAIT_MS})}
if(d.fonts&&d.fonts.load){r.dataset.fontWait='';var f=function(){delete r.dataset.fontWait};
Promise.race([d.fonts.load('600 1em '+getComputedStyle(d.body).fontFamily.split(',')[0]),new Promise(function(o){setTimeout(o,${FONT_WAIT_MS})})]).then(f,f)}}}catch(e){}`

/** Elements that fade up as they scroll into view. */
const REVEAL = '.section-head, .grid-2 > *, .grid-3 > *, .grid-4 > *, .pcu-card, .photo-card, .theme-band .wrap, [data-reveal]'
/** Elements that only get `.is-in` (their own CSS decides what animates). */
const TRIGGER = '.pattern-band, .decor-ring-bl, .decor-ring-tr'

/** Starts an entrance CSS left paused; finished ones are left alone (play() would rewind them). */
const playPaused = (el: Element) => el.getAnimations?.().forEach(a => { if (a.playState === 'paused') a.play() })

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
    }, { threshold: 0, rootMargin: '0px 0px -40px 0px' })

    const prepare = (el: Element, cls: 'rv' | 'mt') => {
      if (el.classList.contains(cls)) return
      // A target inside another fading target would fade twice.
      if (cls === 'rv' && el.parentElement?.closest('.rv')) return
      const parent = el.parentElement
      if (cls === 'rv' && parent && /\bgrid-[234]\b/.test(parent.className)) {
        (el as HTMLElement).style.setProperty('--i', String(Math.min(Array.prototype.indexOf.call(parent.children, el), 6)))
      }
      if (el.getBoundingClientRect().top < window.innerHeight) {
        // Already on screen, even partly (it was painted visible): leave it be; the page fade covers it.
        el.classList.add(cls, 'is-in', 'rv-done')
      } else {
        el.classList.add(cls)
        io.observe(el)
      }
    }

    const scan = () => {
      main.querySelectorAll(REVEAL).forEach(el => prepare(el, 'rv'))
      main.querySelectorAll(TRIGGER).forEach(el => prepare(el, 'mt'))
      // A cached image can finish loading before React inserts it, when the document never sees its load event.
      main.querySelectorAll<HTMLImageElement>(HERO_IMG).forEach(img => { if (img.complete) playPaused(img) })
    }
    scan()

    let queued = 0
    const mo = new MutationObserver(() => {
      if (queued) return
      queued = requestAnimationFrame(() => { queued = 0; scan() })
    })
    mo.observe(main, { childList: true, subtree: true })

    // After a client-side navigation the pre-paint script's own timeout has long passed:
    // a hero image that never fires load or error still appears after the wait.
    const release = window.setTimeout(() => main.querySelectorAll(HERO_IMG).forEach(playPaused), IMG_WAIT_MS)

    return () => { io.disconnect(); mo.disconnect(); cancelAnimationFrame(queued); window.clearTimeout(release) }
  }, [pathname])

  return <script dangerouslySetInnerHTML={{ __html: flagScript }} />
}
