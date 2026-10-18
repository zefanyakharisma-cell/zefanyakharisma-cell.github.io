'use client'

import { Flag } from '@/components/pcu/Flag'
import { useCallback, useLayoutEffect, useRef, useState } from 'react'

/**
 * Anchor point in the container's content coordinates (scroll included), plus the
 * part of the container currently visible, which the tooltip is kept inside.
 */
export type Tip = { x: number; y: number; title: string; value: string; left: number; right: number; top: number } | null

const GAP = 12
const EDGE = 4

/**
 * Tooltip state for charts. Coordinates are relative to the container element,
 * which must be position: relative (it may also be the overflow scroller).
 * Works for pointer and keyboard focus.
 */
export function useTooltip() {
  const ref = useRef<HTMLDivElement>(null)
  const [tip, setTip] = useState<Tip>(null)

  const show = useCallback((e: { clientX: number; clientY: number } | DOMRect, title: string, value: string) => {
    const el = ref.current
    if (!el) return
    const box = el.getBoundingClientRect()
    const cx = 'clientX' in e ? e.clientX : e.left + e.width / 2
    const cy = 'clientY' in e ? e.clientY : e.top
    // An absolutely positioned child of a scroller is placed in the scrolled content box.
    const ox = el.scrollLeft - box.left - el.clientLeft
    const oy = el.scrollTop - box.top - el.clientTop
    setTip({
      x: cx + ox,
      y: cy + oy,
      title,
      value,
      left: el.scrollLeft,
      right: el.scrollLeft + el.clientWidth,
      top: el.scrollTop,
    })
  }, [])
  const hide = useCallback(() => setTip(null), [])

  return { ref, tip, show, hide }
}

export function Tooltip({ tip }: { tip: Tip }) {
  const el = useRef<HTMLDivElement>(null)

  // Centre on the point, clamped to the visible part of the container; flip below
  // the point when there is no room above (the container would clip or scroll it).
  useLayoutEffect(() => {
    const node = el.current
    if (!node || !tip) return
    const w = node.offsetWidth
    const h = node.offsetHeight
    const min = tip.left + EDGE
    const max = tip.right - EDGE - w
    const left = Math.max(min, Math.min(tip.x - w / 2, max))
    const above = tip.y - GAP - h
    node.style.left = `${left}px`
    node.style.top = `${above >= tip.top ? above : tip.y + GAP + 8}px`
  }, [tip])

  if (!tip) return null
  return (
    <div
      ref={el}
      role="status"
      className="pointer-events-none absolute left-0 top-0 z-10 whitespace-nowrap rounded-md bg-midnight px-3 py-2 text-sm text-white shadow-card"
    >
      <span className="flex items-center gap-2 font-semibold"><Flag country={tip.title} />{tip.title}</span>
      <span className="block text-smoke tabular-nums">{tip.value}</span>
    </div>
  )
}
