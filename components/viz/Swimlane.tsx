import { Cog, Flag, Play } from 'lucide-react'
import type { LaneStep } from '@/lib/data/sim'

const COL = 168
const LANE = 148
const HEAD = 132
const BOX_W = 136
const BOX_H = 64

/**
 * A BPMN-style swimlane drawn on a fixed grid: one band per actor, steps placed
 * by column. Every step connects to the step(s) in the next occupied column, so
 * steps sharing a column read as parallel work. Scrolls sideways on its own.
 */
export function Swimlane({ lanes, steps, label }: { lanes: string[]; steps: LaneStep[]; label: string }) {
  const marker = `arr-${label.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`
  const cols = Math.max(...steps.map(s => s.col)) + 1
  const width = HEAD + cols * COL
  const height = lanes.length * LANE
  const cx = (s: LaneStep) => HEAD + s.col * COL + COL / 2
  const cy = (s: LaneStep) => s.lane * LANE + 50
  // Half the height of the step's shape, so the shape (not its labels) sits on the line.
  const shapeHalf = (s: LaneStep) => (s.kind === 'start' || s.kind === 'end' || s.kind === 'gateway' ? 18 : BOX_H / 2)
  const half = (s: LaneStep) => (s.kind === 'start' || s.kind === 'end' ? 18 : s.kind === 'gateway' ? 24 : BOX_W / 2)

  const usedCols = [...new Set(steps.map(s => s.col))].sort((a, b) => a - b)
  const edges = usedCols.slice(0, -1).flatMap((c, i) => {
    const from = steps.filter(s => s.col === c)
    const to = steps.filter(s => s.col === usedCols[i + 1])
    return from.flatMap(a => to.map(b => [a, b] as const))
  })

  return (
    <figure className="m-0 flex flex-col gap-3">
      <div className="overflow-x-auto rounded-panel border border-line bg-white" role="region" tabIndex={0} aria-label={`${label} (scrolls sideways)`}>
        <div className="relative" style={{ width, height }}>
          {lanes.map((lane, i) => (
            <div key={lane} className={`absolute left-0 right-0 border-b border-line last:border-b-0 ${i % 2 ? 'bg-[#f8f9fa]' : 'bg-white'}`} style={{ top: i * LANE, height: LANE }}>
              <div className="sticky left-0 z-10 h-full flex items-center px-4 bg-smoke border-r border-line text-sm font-semibold text-midnight leading-snug" style={{ width: HEAD }}>
                {lane}
              </div>
            </div>
          ))}

          <svg className="absolute inset-0 pointer-events-none" width={width} height={height} aria-hidden>
            <defs>
              <marker id={marker} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
                <path d="M0 1 L10 5 L0 9 Z" fill="#46505c" />
              </marker>
            </defs>
            {edges.map(([a, b], i) => {
              const x1 = cx(a) + half(a)
              const x2 = cx(b) - half(b)
              const y1 = cy(a)
              const y2 = cy(b)
              const mid = (x1 + x2) / 2
              const d = y1 === y2 ? `M${x1} ${y1} H${x2}` : `M${x1} ${y1} H${mid} V${y2} H${x2}`
              return <path key={i} d={d} fill="none" stroke="#46505c" strokeWidth={1.4} strokeLinejoin="round" markerEnd={`url(#${marker})`} />
            })}
          </svg>

          {steps.map((s, i) => {
            const left = cx(s)
            const top = cy(s)
            return (
              <div key={i} className="absolute flex flex-col items-center gap-1.5" style={{ left, top: top - shapeHalf(s), transform: 'translateX(-50%)', width: COL - 12 }}>
                {s.kind === 'start' || s.kind === 'end' ? (
                  <span className={`grid place-items-center w-9 h-9 rounded-pill ${s.kind === 'start' ? 'border-2 border-emerald bg-[#e6f2ef] text-emerald' : 'border-[4px] border-midnight bg-amber text-midnight'}`}>
                    {s.kind === 'start' ? <Play aria-hidden size={14} /> : <Flag aria-hidden size={14} />}
                  </span>
                ) : s.kind === 'gateway' ? (
                  <span className="grid place-items-center w-9 h-9 rotate-45 bg-amber border-2 border-midnight rounded-sm">
                    <span className="-rotate-45 font-bold text-midnight text-lg leading-none">×</span>
                  </span>
                ) : (
                  <span
                    className={`relative grid place-items-center text-center px-3 rounded-md border text-[.8125rem] leading-tight font-medium ${s.kind === 'system' ? 'bg-midnight border-midnight text-white !pl-5' : 'bg-white border-blue text-midnight shadow-card'}`}
                    style={{ width: BOX_W, height: BOX_H }}
                  >
                    {s.kind === 'system' && <Cog aria-hidden size={12} className="absolute top-1.5 left-1.5 text-amber" />}
                    {s.title}
                  </span>
                )}
                {(s.kind === 'start' || s.kind === 'end' || s.kind === 'gateway') && (
                  <span className="text-xs font-semibold text-midnight text-center leading-tight">{s.title}</span>
                )}
                {s.branches && (
                  <span className="flex flex-wrap justify-center gap-1">
                    {s.branches.map(b => <span key={b} className="text-[.6875rem] leading-tight text-ink-secondary bg-smoke rounded-sm px-1.5 py-0.5">{b}</span>)}
                  </span>
                )}
                {s.status && <span className="font-mono text-[.6875rem] text-accent-strong bg-[#e8f0fa] rounded-sm px-1.5 py-0.5">{s.status}</span>}
              </div>
            )
          })}
        </div>
      </div>
      <ol className="sr-only">
        {[...steps].sort((a, b) => a.col - b.col).map((s, i) => (
          <li key={i}>{lanes[s.lane]}: {s.title}{s.branches ? ` (${s.branches.join(', ')})` : ''}{s.status ? `, status ${s.status}` : ''}</li>
        ))}
      </ol>
      <figcaption className="text-sm text-ink-muted">
        Scroll sideways to follow the flow. Dark boxes with a cog are steps the system runs on its own; blue mono labels are the status a step sets.
      </figcaption>
    </figure>
  )
}
