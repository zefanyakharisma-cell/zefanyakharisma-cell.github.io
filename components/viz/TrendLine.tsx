'use client'

import { SERIES } from '@/lib/chart'
import { Tooltip, useTooltip } from './useTooltip'

type Series = { label: string; values: number[] }

/** Small multi-series line chart over ordered categories (e.g. batches). */
export function TrendLine({ xs, series, label, height = 240 }: { xs: string[]; series: Series[]; label: string; height?: number }) {
  const { ref, tip, show, hide } = useTooltip()
  const W = 560
  const pad = { l: 36, r: 16, t: 16, b: 32 }
  const max = Math.max(...series.flatMap(s => s.values)) * 1.15
  const x = (i: number) => pad.l + (i * (W - pad.l - pad.r)) / Math.max(xs.length - 1, 1)
  const y = (v: number) => height - pad.b - (v / max) * (height - pad.t - pad.b)
  const ticks = [0, 0.5, 1].map(t => Math.round(t * max))

  return (
    <figure className="m-0">
      <div ref={ref} className="relative">
        <svg viewBox={`0 0 ${W} ${height}`} className="block w-full h-auto" role="img" aria-label={`${label}. ${series.map(s => `${s.label}: ${s.values.map((v, i) => `${xs[i]} ${v}`).join(', ')}`).join('. ')}`}>
          {ticks.map(t => (
            <g key={t}>
              <line x1={pad.l} x2={W - pad.r} y1={y(t)} y2={y(t)} stroke="#e2e5e9" />
              <text x={pad.l - 8} y={y(t) + 4} textAnchor="end" fontSize={11} fill="#5f6b78">{t}</text>
            </g>
          ))}
          {xs.map((l, i) => <text key={l} x={x(i)} y={height - 10} textAnchor="middle" fontSize={12} fill="#46505c">{l}</text>)}
          {series.map((s, si) => (
            <g key={s.label}>
              <polyline fill="none" stroke={SERIES[si]} strokeWidth={2.5} strokeLinejoin="round" points={s.values.map((v, i) => `${x(i)},${y(v)}`).join(' ')} />
              {s.values.map((v, i) => (
                <g key={i} onPointerMove={e => show(e, `${s.label} · ${xs[i]}`, String(v))} onPointerLeave={hide}>
                  <circle cx={x(i)} cy={y(v)} r={14} fill="transparent" />
                  <circle cx={x(i)} cy={y(v)} r={5} fill="#ffffff" stroke={SERIES[si]} strokeWidth={2.5} />
                  <text x={x(i)} y={y(v) - 11} textAnchor="middle" fontSize={11} fontWeight={600} fill="#19304b">{v}</text>
                </g>
              ))}
            </g>
          ))}
        </svg>
        <Tooltip tip={tip} />
      </div>
      {series.length > 1 && (
        <figcaption className="flex flex-wrap gap-4 mt-2 text-sm">
          {series.map((s, i) => (
            <span key={s.label} className="flex items-center gap-2"><span className="inline-block w-4 h-[3px] rounded" style={{ background: SERIES[i] }} />{s.label}</span>
          ))}
        </figcaption>
      )}
    </figure>
  )
}
