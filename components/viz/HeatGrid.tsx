'use client'

import { Tooltip, useTooltip } from './useTooltip'

// Single-hue ramp (midnight), light → dark, for scores as a percentage of the maximum.
const RAMP = ['#e4ecf5', '#c9d8ea', '#a9c1de', '#8eadd2', '#2f5b8f', '#19304b']

function cell(pct: number) {
  // 70–100% spread over the ramp; everything below 70% uses the lightest step.
  const t = Math.max(0, Math.min(0.999, (pct - 70) / 30))
  const i = Math.floor(t * RAMP.length)
  return { bg: RAMP[i], fg: i >= 4 ? '#ffffff' : '#19304b' }
}

/** Rows × columns of scores, each cell coloured and labelled with its value. */
export function HeatGrid({ rows, cols, values, max, label }: {
  rows: string[]
  cols: string[]
  /** values[row][col], or null when missing. */
  values: (number | null)[][]
  max: number[]
  label: string
}) {
  const { ref, tip, show, hide } = useTooltip()
  return (
    <figure className="m-0">
      <div ref={ref} className="relative overflow-x-auto" role="region" tabIndex={0} aria-label={label}>
        <table className="border-separate border-spacing-1 text-sm min-w-[560px] w-full">
          <thead>
            <tr>
              <th scope="col" className="text-left font-semibold text-ink-secondary p-1">Criterion</th>
              {cols.map(c => <th key={c} scope="col" className="font-semibold text-ink-secondary p-1 text-center">{c}</th>)}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, ri) => (
              <tr key={r}>
                <th scope="row" className="text-left font-normal p-1 pr-3">{r}</th>
                {cols.map((c, ci) => {
                  const v = values[ri][ci]
                  if (v === null) return <td key={c} className="rounded-sm bg-smoke text-center text-ink-muted">–</td>
                  const pct = (v / max[ci]) * 100
                  const { bg, fg } = cell(pct)
                  return (
                    <td
                      key={c}
                      className="rounded-sm text-center font-semibold tabular-nums py-2.5"
                      style={{ background: bg, color: fg }}
                      onPointerMove={e => show(e, `${r} · ${c}`, `${v.toFixed(2)} / ${max[ci]} (${Math.round(pct)}%)`)}
                      onPointerLeave={hide}
                    >
                      {v.toFixed(2)}
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
        <Tooltip tip={tip} />
      </div>
    </figure>
  )
}
