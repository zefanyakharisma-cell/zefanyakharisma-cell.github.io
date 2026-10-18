'use client'

import { useEffect, useRef, useState, useSyncExternalStore } from 'react'

const noSubscribe = () => () => {}
/** How long a server-rendered number may have been on screen before hydration and still count up. */
const SEEN_MS = 300

/**
 * Animates the number inside a value like "207", "100+" or "IDR 236M" when it
 * scrolls into view. Server HTML shows the final value; motion is skipped under
 * prefers-reduced-motion, and for a number the visitor has already been looking at
 * (a slow first load hydrates late; dropping it to 0 then would read as a glitch).
 */
export function CountUp({ value, duration = 1200 }: { value: string; duration?: number }) {
  const match = value.match(/^(\D*)(\d+(?:[.,]\d+)?)(.*)$/)
  const ref = useRef<HTMLSpanElement>(null)
  const [shown, setShown] = useState(value)
  // True only when this render hydrates server HTML (not after a client-side navigation).
  const hydrating = useSyncExternalStore(noSubscribe, () => false, () => true)
  const [fromServer] = useState(hydrating)

  useEffect(() => {
    const el = ref.current
    if (!el || !match) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const [, pre, num, post] = match
    const target = parseFloat(num.replace(',', '.'))
    const decimals = (num.split(/[.,]/)[1] ?? '').length
    const paintedAt = performance.getEntriesByName('first-contentful-paint')[0]?.startTime
    let first = true
    let frame = 0
    const obs = new IntersectionObserver(([entry]) => {
      const alreadySeen = first && fromServer && paintedAt !== undefined && performance.now() - paintedAt > SEEN_MS
      first = false
      if (!entry.isIntersecting) return
      obs.disconnect()
      if (alreadySeen) return
      const start = performance.now()
      const tick = (now: number) => {
        // The first frame's timestamp can precede `start`; a negative t would print "-0".
        const t = Math.min(Math.max((now - start) / duration, 0), 1)
        const eased = 1 - Math.pow(1 - t, 3)
        setShown(`${pre}${(target * eased).toFixed(decimals)}${post}`)
        if (t < 1) frame = requestAnimationFrame(tick)
      }
      setShown(`${pre}${(0).toFixed(decimals)}${post}`)
      frame = requestAnimationFrame(tick)
    }, { threshold: 0.4 })
    obs.observe(el)
    return () => { obs.disconnect(); cancelAnimationFrame(frame) }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, duration])

  return (
    <span ref={ref} className="tabular-nums">
      <span aria-hidden>{shown}</span>
      <span className="sr-only">{value}</span>
    </span>
  )
}
