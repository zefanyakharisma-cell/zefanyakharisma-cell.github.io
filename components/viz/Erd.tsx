'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import type { Domain, Entity, Relation } from '@/lib/data/simDev'

const W = 236
const GAP_X = 96
const PAD = 24
const HEAD = 34
const ROW = 19
const GAP_Y = 22

type Box = { e: Entity; x: number; y: number; h: number }

function layout(entities: Entity[]) {
  const cols = new Map<number, Entity[]>()
  entities.forEach(e => cols.set(e.col, [...(cols.get(e.col) ?? []), e]))
  const boxes = new Map<string, Box>()
  let height = 0
  ;[...cols.keys()].sort((a, b) => a - b).forEach(col => {
    let y = PAD
    for (const e of cols.get(col)!) {
      const h = HEAD + e.columns.length * ROW + (e.more || e.note ? 20 : 0) + 8
      boxes.set(e.id, { e, x: PAD + col * (W + GAP_X), y, h })
      y += h + GAP_Y
    }
    height = Math.max(height, y)
  })
  const width = PAD * 2 + (Math.max(...entities.map(e => e.col)) + 1) * (W + GAP_X) - GAP_X
  return { boxes, width, height: height + PAD - GAP_Y }
}

const keyStyle: Record<string, string> = {
  PK: 'text-[#b7791f] border-[#b7791f]',
  FK: 'text-accent-strong border-accent-strong',
  LFK: 'text-ink-muted border-ink-muted border-dashed',
  UQ: 'text-emerald border-emerald',
}

/**
 * Entity–relationship diagram. Crow's foot marks the many side; dashed lines
 * are logical references (to views or registries) checked by functions, not
 * foreign keys. Selecting an entity highlights its relations and lists it.
 */
export function Erd({ entities, relations, domains, label, highlight, compact }: {
  entities: Entity[]
  relations: Relation[]
  domains: Domain[]
  label: string
  /** Entity ids to emphasise (e.g. the tables a process step touches). */
  highlight?: string[]
  compact?: boolean
}) {
  const [picked, setPicked] = useState<string | null>(null)
  const { boxes, width, height } = useMemo(() => layout(entities), [entities])
  const scroller = useRef<HTMLDivElement>(null)
  const firstLit = highlight?.find(id => boxes.has(id))

  // Bring the first highlighted table into view inside the diagram.
  useEffect(() => {
    const el = scroller.current
    const box = firstLit ? boxes.get(firstLit) : null
    if (!el || !box) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    el.scrollTo({ left: Math.max(0, box.x - 24), top: Math.max(0, box.y - 24), behavior: reduce ? 'auto' : 'smooth' })
  }, [firstLit, boxes])
  const color = (d: string) => domains.find(x => x.key === d)?.color ?? '#46505c'
  const focus = picked ? [picked] : highlight ?? []
  const related = new Set(focus)
  relations.forEach(r => { if (focus.includes(r.from) || focus.includes(r.to)) { related.add(r.from); related.add(r.to) } })
  const hot = (r: Relation) => focus.includes(r.from) || focus.includes(r.to)
  const active = focus.length > 0
  const sel = picked ? boxes.get(picked)?.e : null

  return (
    <div className="flex flex-col gap-4">
      {!compact && (
        <ul className="m-0 p-0 list-none flex flex-wrap gap-x-5 gap-y-2 text-sm">
          {domains.map(d => (
            <li key={d.key} className="flex items-center gap-2"><span aria-hidden className="w-3 h-3 rounded-sm" style={{ background: d.color }} />{d.label}</li>
          ))}
          <li className="flex items-center gap-2"><svg aria-hidden width="36" height="10"><path d="M2 5H34" stroke="#46505c" strokeWidth="1.4" /></svg>foreign key</li>
          <li className="flex items-center gap-2"><svg aria-hidden width="36" height="10"><path d="M2 5H34" stroke="#46505c" strokeWidth="1.4" strokeDasharray="5 4" /></svg>logical reference</li>
        </ul>
      )}
      <div
        ref={scroller}
        className="relative overflow-auto rounded-panel border border-line bg-[#fbfcfd] decor-grid"
        style={{ maxHeight: compact ? 520 : 760 }}
        role="region"
        tabIndex={0}
        aria-label={`${label} (scrolls)`}
      >
        <svg width={width} height={height} className="block" role="img" aria-label={label}>
          <g fill="none">
            {relations.map((r, i) => {
              const a = boxes.get(r.from)
              const b = boxes.get(r.to)
              if (!a || !b) return null
              const ay = a.y + HEAD / 2 + 2
              const by = b.y + HEAD / 2 + 2
              const lane = (i % 6) * 6
              let d: string
              let foot: string
              let bar: string
              if (a.e.col === b.e.col) {
                const x = a.x + W
                const out = x + 16 + lane
                d = `M${x} ${ay} H${out} V${by} H${x}`
                foot = `M${x + 10} ${ay} L${x} ${ay - 5} M${x + 10} ${ay} L${x} ${ay + 5}`
                bar = `M${x + 6} ${by - 5} V${by + 5}`
              } else {
                const right = a.e.col < b.e.col
                const x1 = right ? a.x + W : a.x
                const x2 = right ? b.x : b.x + W
                const mid = (x1 + x2) / 2 + (right ? lane - 15 : 15 - lane)
                const s = right ? 1 : -1
                d = `M${x1} ${ay} H${mid} V${by} H${x2}`
                foot = `M${x1 + 10 * s} ${ay} L${x1} ${ay - 5} M${x1 + 10 * s} ${ay} L${x1} ${ay + 5}`
                bar = `M${x2 - 6 * s} ${by - 5} V${by + 5}`
              }
              const on = hot(r)
              const stroke = on ? '#2a64a8' : '#8b96a3'
              return (
                <g key={i} opacity={active && !on ? 0.15 : 1}>
                  <path d={d} stroke={stroke} strokeWidth={on ? 2.2 : 1.2} strokeDasharray={r.logical ? '5 4' : undefined} strokeLinejoin="round" />
                  <path d={foot} stroke={stroke} strokeWidth={1.3} />
                  <path d={bar} stroke={stroke} strokeWidth={1.3} />
                </g>
              )
            })}
          </g>
        </svg>
        {[...boxes.values()].map(({ e, x, y, h }) => {
          const dim = active && !related.has(e.id)
          const on = focus.includes(e.id)
          return (
            <button
              key={e.id}
              type="button"
              onClick={() => setPicked(p => (p === e.id ? null : e.id))}
              aria-pressed={picked === e.id}
              className={`absolute text-left bg-white rounded-md border-2 overflow-hidden transition-opacity cursor-pointer p-0 ${on ? 'shadow-card' : ''}`}
              style={{ left: x, top: y, width: W, height: h, borderColor: on ? '#ffbc00' : color(e.domain), opacity: dim ? 0.35 : 1 }}
            >
              <span className="flex items-baseline justify-between gap-2 px-3 font-mono text-[.8125rem] font-semibold text-white" style={{ background: color(e.domain), height: HEAD, lineHeight: `${HEAD}px` }}>
                <span className="truncate">{e.id}</span>
                <span className="text-[.625rem] font-normal opacity-80">{e.schema ?? ''}{e.note === 'view' ? ' · view' : ''}</span>
              </span>
              <span className="block px-2 pt-1">
                {e.columns.map(col => (
                  <span key={col.name} className="flex items-center gap-1.5 font-mono text-[.6875rem]" style={{ height: ROW }}>
                    <span className={`w-7 text-center text-[.5625rem] font-bold rounded-[3px] ${col.key ? `border ${keyStyle[col.key]}` : ''}`}>{col.key === 'LFK' ? 'FK' : col.key ?? ''}</span>
                    <span className={`truncate flex-1 ${col.key === 'PK' ? 'font-bold' : ''} text-midnight`}>{col.name}</span>
                    <span className="text-ink-muted truncate max-w-[84px]">{col.type}</span>
                  </span>
                ))}
                {(e.more || (e.note && e.note !== 'view')) && (
                  <span className="block text-[.625rem] text-ink-muted italic leading-5 truncate">
                    {e.more ? `+${e.more} more columns` : ''}{e.more && e.note && e.note !== 'view' ? ' · ' : ''}{e.note && e.note !== 'view' ? e.note : ''}
                  </span>
                )}
              </span>
            </button>
          )
        })}
      </div>
      {!compact && (
        <div aria-live="polite" className="rounded-md bg-smoke p-5 min-h-[72px]">
          {sel ? (
            <div className="flex flex-col gap-3">
              <p className="m-0 font-mono font-bold text-midnight">{sel.schema ? `${sel.schema}.` : ''}{sel.id}</p>
              <p className="m-0 text-sm text-ink-secondary">
                References: {relations.filter(r => r.from === sel.id).map(r => r.to).join(', ') || 'none'} · Referenced by: {relations.filter(r => r.to === sel.id).map(r => r.from).join(', ') || 'none'}
              </p>
            </div>
          ) : (
            <p className="m-0 text-sm text-ink-secondary">Select a table to highlight its relationships. Scroll the diagram in both directions.</p>
          )}
        </div>
      )}
    </div>
  )
}
