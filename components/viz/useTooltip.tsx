'use client'

import { useCallback, useRef, useState } from 'react'

export type Tip = { x: number; y: number; title: string; value: string } | null

/**
 * Tooltip state for charts. Coordinates are relative to the container element,
 * which must be position: relative. Works for pointer and keyboard focus.
 */
export function useTooltip() {
  const ref = useRef<HTMLDivElement>(null)
  const [tip, setTip] = useState<Tip>(null)

  const show = useCallback((e: { clientX: number; clientY: number } | DOMRect, title: string, value: string) => {
    const box = ref.current?.getBoundingClientRect()
    if (!box) return
    const x = 'clientX' in e ? e.clientX : e.left + e.width / 2
    const y = 'clientY' in e ? e.clientY : e.top
    setTip({ x: x - box.left, y: y - box.top, title, value })
  }, [])
  const hide = useCallback(() => setTip(null), [])

  return { ref, tip, show, hide }
}

export function Tooltip({ tip }: { tip: Tip }) {
  if (!tip) return null
  return (
    <div
      role="status"
      className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-[calc(100%+12px)] whitespace-nowrap rounded-md bg-midnight px-3 py-2 text-sm text-white shadow-card"
      style={{ left: tip.x, top: tip.y }}
    >
      <span className="block font-semibold">{tip.title}</span>
      <span className="block text-smoke tabular-nums">{tip.value}</span>
    </div>
  )
}
