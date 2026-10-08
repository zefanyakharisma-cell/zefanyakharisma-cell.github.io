'use client'

import { SERIES } from '@/lib/chart'
import { Tooltip, useTooltip } from './useTooltip'

/** 10×10 grid of squares showing shares of a whole, with a legend that prints the values. */
export function Waffle({ parts, label }: { parts: { label: string; value: number }[]; label: string }) {
  const { ref, tip, show, hide } = useTooltip()
  const total = parts.reduce((s, p) => s + p.value, 0) || 1
  // Largest-remainder rounding so the squares always add up to 100.
  const raw = parts.map(p => (p.value / total) * 100)
  const cells = raw.map(Math.floor)
  let left = 100 - cells.reduce((s, c) => s + c, 0)
  raw.map((r, i) => [r - Math.floor(r), i] as const).sort((a, b) => b[0] - a[0]).forEach(([, i]) => { if (left-- > 0) cells[i]++ })
  const squares = cells.flatMap((n, i) => Array.from({ length: n }, () => i))

  return (
    <figure className="m-0">
      <div ref={ref} className="relative">
        <div role="img" aria-label={`${label}: ${parts.map(p => `${p.label} ${p.value} (${Math.round((p.value / total) * 100)}%)`).join(', ')}`} className="grid grid-cols-10 gap-[3px] max-w-[260px]">
          {squares.map((s, i) => (
            <span
              key={i}
              className="aspect-square rounded-[3px]"
              style={{ background: SERIES[s % SERIES.length] }}
              onPointerMove={e => show(e, parts[s].label, `${parts[s].value} · ${Math.round((parts[s].value / total) * 100)}%`)}
              onPointerLeave={hide}
            />
          ))}
        </div>
        <Tooltip tip={tip} />
      </div>
      <figcaption className="mt-4 flex flex-col gap-1.5 text-sm">
        {parts.map((p, i) => (
          <span key={p.label} className="flex items-center gap-2">
            <span className="legend-dot" style={{ background: SERIES[i % SERIES.length] }} />
            <span className="flex-1">{p.label}</span>
            <b className="tabular-nums">{p.value}</b>
            <span className="w-10 text-right tabular-nums text-ink-muted">{Math.round((p.value / total) * 100)}%</span>
          </span>
        ))}
      </figcaption>
    </figure>
  )
}
