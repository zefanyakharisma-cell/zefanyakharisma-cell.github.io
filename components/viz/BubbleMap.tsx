'use client'

import type { BubbleMapData } from '@/lib/geo'
import { Tooltip, useTooltip } from './useTooltip'

/** City bubbles on a map, sized by count (area ∝ value). Top cities are labelled. */
export function BubbleMap({ map, unit, label, selected, onSelect, labelTop = 4 }: {
  map: BubbleMapData
  unit: string
  label: string
  selected?: string | null
  onSelect?: (city: string | null) => void
  labelTop?: number
}) {
  const { ref, tip, show, hide } = useTooltip()
  const max = map.bubbles[0]?.value ?? 1
  const r = (v: number) => 4 + Math.sqrt(v / max) * 26
  // Draw small bubbles last so they stay hoverable on top of big ones.
  const ordered = [...map.bubbles].sort((a, b) => b.value - a.value)

  return (
    <figure className="m-0">
      <div ref={ref} className="relative">
        <svg viewBox={`0 0 ${map.width} ${map.height}`} className="block w-full h-auto" role="group" aria-label={label}>
          <path d={map.base} fill="#e2e5e9" stroke="#ffffff" strokeWidth={0.6} />
          {ordered.map(b => {
            const pick = () => onSelect?.(selected === b.name ? null : b.name)
            return (
              <circle
                key={b.name}
                cx={b.cx}
                cy={b.cy}
                r={r(b.value)}
                fill="#3880d0"
                fillOpacity={selected && selected !== b.name ? 0.15 : 0.55}
                stroke="#19304b"
                strokeWidth={selected === b.name ? 2.5 : 1}
                tabIndex={0}
                role={onSelect ? 'button' : 'img'}
                aria-pressed={onSelect ? selected === b.name : undefined}
                aria-label={`${b.name}: ${b.value} ${unit}`}
                className={`outline-none focus-visible:stroke-amber focus-visible:[stroke-width:3] ${onSelect ? 'cursor-pointer' : ''}`}
                onPointerMove={e => show(e, b.name, `${b.value} ${unit}`)}
                onPointerLeave={hide}
                onFocus={e => show(e.currentTarget.getBoundingClientRect(), b.name, `${b.value} ${unit}`)}
                onBlur={hide}
                onClick={onSelect ? pick : undefined}
                onKeyDown={onSelect ? e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); pick() } } : undefined}
              />
            )
          })}
          {map.bubbles.slice(0, labelTop).map((b, i) => (
            <text key={b.name} x={b.cx + (i % 2 ? -r(b.value) - 6 : r(b.value) + 6)} y={b.cy + (i > 1 ? 18 : -4)} textAnchor={i % 2 ? 'end' : 'start'} fontSize={14} fontWeight={700} fill="#19304b" aria-hidden>
              {b.name} {b.value}
            </text>
          ))}
        </svg>
        <Tooltip tip={tip} />
      </div>
      <figcaption className="mt-3 text-sm text-ink-secondary">{map.bubbles.length} cities · bubble area shows {unit}</figcaption>
    </figure>
  )
}
