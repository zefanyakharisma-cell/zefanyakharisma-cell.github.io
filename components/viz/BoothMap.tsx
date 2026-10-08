'use client'

import { useState } from 'react'
import { CORNERS, INSTITUTIONS, STUDENT_DELEGATIONS } from '@/lib/data/aero'

type Booth = { n: number; name: string; group: Group; country?: string }
type Group = 'corner' | 'university' | 'delegation'

const GROUPS: Record<Group, { label: string; color: string; text: string }> = {
  corner: { label: 'UNAIR corners', color: '#45b8bc', text: '#19304b' },
  university: { label: 'Partner universities', color: '#19304b', text: '#ffffff' },
  delegation: { label: 'Student delegations', color: '#ffbc00', text: '#19304b' },
}

function booths(): Booth[] {
  const list: Booth[] = [
    ...CORNERS.map(c => ({ n: c.booth, name: c.name, group: 'corner' as const })),
    ...INSTITUTIONS.flatMap(g => g.orgs.filter(o => o.booth).map(o => ({ n: o.booth as number, name: o.name, group: 'university' as const, country: g.country }))),
    ...STUDENT_DELEGATIONS.filter(d => d.booth).map(d => ({ n: d.booth as number, name: `${d.country} student delegation`, group: 'delegation' as const, country: d.country })),
  ]
  return list.sort((a, b) => a.n - b.n)
}

/** Stylised AERO floor plan: booths along the boulevard, coloured by group. Select a booth for its name. */
export function BoothMap() {
  const all = booths()
  const max = Math.max(...all.map(b => b.n))
  const byNumber = new Map(all.map(b => [b.n, b]))
  const numbers = Array.from({ length: max }, (_, i) => i + 1)
  const half = Math.ceil(max / 2)
  const [active, setActive] = useState<number>(1)
  const current = byNumber.get(active)

  const cell = (n: number) => {
    const b = byNumber.get(n)
    const g = b ? GROUPS[b.group] : null
    return (
      <li key={n}>
        <button
          type="button"
          aria-pressed={active === n}
          aria-label={b ? `Booth ${n}: ${b.name}` : `Booth ${n}`}
          onClick={() => setActive(n)}
          onPointerEnter={() => setActive(n)}
          onFocus={() => setActive(n)}
          className={`w-full aspect-square rounded-md border-2 font-bold tabular-nums cursor-pointer transition-transform ${active === n ? 'scale-110 border-amber' : 'border-transparent'}`}
          style={g ? { background: g.color, color: g.text } : { background: '#f1f1f1', color: '#5f6b78' }}
        >
          {n}
        </button>
      </li>
    )
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] items-start">
      <div className="bg-smoke rounded-panel p-5">
        <div className="rounded-md bg-midnight text-white text-center font-semibold py-3 mb-4">Main stage</div>
        <ol className="m-0 p-0 list-none grid gap-2" style={{ gridTemplateColumns: `repeat(${half}, minmax(0, 1fr))` }}>
          {numbers.slice(0, half).map(cell)}
        </ol>
        <div className="my-4 text-center text-xs font-semibold tracking-[.18em] uppercase text-ink-muted border-y border-dashed border-[#c5ccd4] py-3">Boulevard · UNAIR Library, Campus B</div>
        <ol className="m-0 p-0 list-none grid gap-2" style={{ gridTemplateColumns: `repeat(${half}, minmax(0, 1fr))` }}>
          {numbers.slice(half).map(cell)}
        </ol>
        <ul className="m-0 mt-5 p-0 list-none flex flex-wrap gap-4 text-sm">
          {(Object.keys(GROUPS) as Group[]).map(k => (
            <li key={k} className="flex items-center gap-2"><span className="legend-dot" style={{ background: GROUPS[k].color }} />{GROUPS[k].label}</li>
          ))}
        </ul>
      </div>
      <div className="pcu-card" aria-live="polite">
        <span className="pcu-eyebrow text-accent-strong">Booth {active}</span>
        <p className="m-0 mt-2 text-2xl font-bold leading-snug">{current?.name ?? 'Booth to be confirmed'}</p>
        {current && <p className="m-0 mt-2 muted">{GROUPS[current.group].label}{current.country ? ` · ${current.country}` : ''}</p>}
      </div>
    </div>
  )
}
