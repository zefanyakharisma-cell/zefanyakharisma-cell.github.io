'use client'

import { useMemo, useState } from 'react'
import { sankey, sankeyLinkHorizontal, type SankeyLink, type SankeyNode } from 'd3-sankey'
import { SERIES } from '@/lib/chart'
import { Tooltip, useTooltip } from './useTooltip'

type N = { name: string; column: number }
type L = { source: number; target: number; value: number }

/** Flow diagram (e.g. country → university). Hover a node or band to highlight its flows. */
export function Sankey({ nodes, links, label, height = 520, unit = 'students' }: { nodes: N[]; links: L[]; label: string; height?: number; unit?: string }) {
  const { ref, tip, show, hide } = useTooltip()
  const [focus, setFocus] = useState<number | null>(null)
  const W = 900

  const graph = useMemo(() => sankey<N, L>()
    .nodeWidth(12).nodePadding(10).extent([[1, 8], [W - 1, height - 8]])
    .nodeSort(null)({ nodes: nodes.map(n => ({ ...n })), links: links.map(l => ({ ...l })) }), [nodes, links, height])

  const sourceIndex = (l: SankeyLink<N, L>) => ((l.source as SankeyNode<N, L>).index ?? 0)
  const colorOf = (l: SankeyLink<N, L>) => {
    const s = l.source as SankeyNode<N, L>
    const root = s.column === 0 ? s : ((s.targetLinks?.[0]?.source as SankeyNode<N, L>) ?? s)
    return SERIES[(root.index ?? 0) % SERIES.length]
  }
  const active = (l: SankeyLink<N, L>) =>
    focus === null || sourceIndex(l) === focus || ((l.target as SankeyNode<N, L>).index ?? -1) === focus

  return (
    <figure className="m-0">
      <div ref={ref} className="relative overflow-x-auto" role="region" tabIndex={0} aria-label={label}>
        <svg viewBox={`0 0 ${W} ${height}`} className="block w-full min-w-[640px] h-auto" role="img" aria-label={label}>
          <g fill="none">
            {graph.links.map((l, i) => (
              <path
                key={i}
                d={sankeyLinkHorizontal()(l) ?? ''}
                stroke={colorOf(l)}
                strokeWidth={Math.max(1, l.width ?? 1)}
                strokeOpacity={active(l) ? 0.45 : 0.08}
                onPointerMove={e => show(e, `${(l.source as N).name} → ${(l.target as N).name}`, `${l.value} ${unit}`)}
                onPointerLeave={hide}
              />
            ))}
          </g>
          {graph.nodes.map(n => {
            const left = (n.x0 ?? 0) < W / 2
            return (
              <g key={n.index} onPointerEnter={() => setFocus(n.index ?? null)} onPointerLeave={() => setFocus(null)}>
                <rect x={n.x0} y={n.y0} width={(n.x1 ?? 0) - (n.x0 ?? 0)} height={Math.max(1, (n.y1 ?? 0) - (n.y0 ?? 0))} fill="#19304b" rx={2} />
                <text
                  x={left ? (n.x1 ?? 0) + 8 : (n.x0 ?? 0) - 8}
                  y={((n.y0 ?? 0) + (n.y1 ?? 0)) / 2}
                  dy="0.35em"
                  textAnchor={left ? 'start' : 'end'}
                  fontSize={12}
                  fill="#19304b"
                >
                  {n.name} <tspan fill="#5f6b78">{n.value}</tspan>
                </text>
              </g>
            )
          })}
        </svg>
        <Tooltip tip={tip} />
      </div>
    </figure>
  )
}
