'use client'

import { hierarchy, treemap, treemapSquarify } from 'd3-hierarchy'
import { SERIES } from '@/lib/chart'
import { Tooltip, useTooltip } from './useTooltip'

type Item = { label: string; value: number; display: string }

/** Budget blocks sized by amount; the largest blocks are labelled directly. */
export function Treemap({ items, label, height = 320 }: { items: Item[]; label: string; height?: number }) {
  const { ref, tip, show, hide } = useTooltip()
  const W = 600
  const total = items.reduce((s, i) => s + i.value, 0)
  const root = treemap<{ children?: Item[] } & Partial<Item>>()
    .size([W, height]).paddingInner(3).round(true).tile(treemapSquarify)(
      hierarchy<{ children?: Item[] } & Partial<Item>>({ children: items }).sum(d => d.value ?? 0).sort((a, b) => (b.value ?? 0) - (a.value ?? 0)),
    )
  const leaves = root.leaves()

  return (
    <figure className="m-0">
      <div ref={ref} className="relative">
        <svg viewBox={`0 0 ${W} ${height}`} className="block w-full h-auto" role="img" aria-label={`${label}: ${items.map(i => `${i.label} ${i.display}`).join(', ')}`}>
          {leaves.map((l, i) => {
            const d = l.data as Item
            const w = l.x1 - l.x0
            const h = l.y1 - l.y0
            const pct = Math.round((d.value / total) * 100)
            return (
              <g key={d.label} onPointerMove={e => show(e, d.label, `${d.display} · ${pct}%`)} onPointerLeave={hide}>
                <rect x={l.x0} y={l.y0} width={w} height={h} rx={6} fill={i === 0 ? '#19304b' : SERIES[(i - 1) % SERIES.length]} />
                {w > 90 && h > 44 && (
                  <text x={l.x0 + 12} y={l.y0 + 24} fill="#ffffff" fontSize={14} fontWeight={700}>
                    {d.label}
                    <tspan x={l.x0 + 12} dy={20} fontWeight={400} fontSize={13}>{d.display} · {pct}%</tspan>
                  </text>
                )}
              </g>
            )
          })}
        </svg>
        <Tooltip tip={tip} />
      </div>
    </figure>
  )
}
