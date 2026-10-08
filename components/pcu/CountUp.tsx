'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * Animates the number inside a value like "207", "100+" or "IDR 236M" when it
 * scrolls into view. Server HTML shows the final value; motion is skipped under
 * prefers-reduced-motion.
 */
export function CountUp({ value, duration = 1200 }: { value: string; duration?: number }) {
  const match = value.match(/^(\D*)(\d+(?:[.,]\d+)?)(.*)$/)
  const ref = useRef<HTMLSpanElement>(null)
  const [shown, setShown] = useState(value)

  useEffect(() => {
    const el = ref.current
    if (!el || !match) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const [, pre, num, post] = match
    const target = parseFloat(num.replace(',', '.'))
    const decimals = (num.split(/[.,]/)[1] ?? '').length
    let frame = 0
    const obs = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      obs.disconnect()
      const start = performance.now()
      const tick = (now: number) => {
        const t = Math.min((now - start) / duration, 1)
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
