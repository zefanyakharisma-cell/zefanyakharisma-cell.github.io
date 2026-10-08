'use client'

import { useState } from 'react'
import { ArrowRight, Braces, Database, ListChecks } from 'lucide-react'
import type { Process } from '@/lib/data/sim'
import type { DevSystem } from '@/lib/data/simDev'
import { Erd } from './Erd'

/**
 * Walks a BPMN process step by step and shows, for each step, the functions it
 * calls, the tables it touches and the status it sets, with those tables lit up
 * in the ERD.
 */
export function ProcessToData({ process, dev }: { process: Process; dev: DevSystem }) {
  const data = dev.steps[process.key] ?? []
  const order = process.steps.map((s, i) => ({ s, i })).sort((a, b) => a.s.col - b.s.col || a.s.lane - b.s.lane)
  const [active, setActive] = useState(order[1]?.i ?? 0)
  const step = process.steps[active]
  const d = data[active] ?? {}
  const known = new Set(dev.entities.map(e => e.id))
  const lit = (d.tables ?? []).filter(t => known.has(t))
  const pos = order.findIndex(o => o.i === active)

  return (
    <div className="flex flex-col gap-6">
      <ol className="m-0 p-0 list-none flex gap-2 overflow-x-auto pb-2" aria-label={`${process.label} steps`}>
        {order.map(({ s, i }, n) => (
          <li key={i} className="flex-none">
            <button
              type="button"
              aria-pressed={i === active}
              onClick={() => setActive(i)}
              className={`flex flex-col items-start gap-1 w-[150px] min-h-[92px] text-left rounded-md border-2 px-3 py-2 cursor-pointer transition-colors ${i === active ? 'border-amber bg-midnight text-white' : 'border-line bg-white text-midnight hover:border-blue'}`}
            >
              <span className={`font-mono text-[.6875rem] ${i === active ? 'text-amber' : 'text-accent-strong'}`}>{String(n + 1).padStart(2, '0')} · {process.lanes[s.lane]}</span>
              <span className="text-[.8125rem] font-semibold leading-tight">{s.title}</span>
            </button>
          </li>
        ))}
      </ol>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] items-start">
        <div className="rounded-panel pcu-surface-brand p-6 flex flex-col gap-4 relative overflow-hidden" aria-live="polite">
          <span className="pcu-eyebrow text-amber">Step {pos + 1} of {order.length} · {process.lanes[step.lane]}</span>
          <h3 className="m-0 text-2xl font-bold text-white leading-tight">{step.title}</h3>
          {d.writes && <p className="m-0 text-smoke">{d.writes}</p>}
          {d.rpc && (
            <div className="flex flex-col gap-2">
              <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-smoke"><Braces aria-hidden size={14} /> Functions</span>
              <span className="flex flex-wrap gap-1.5">{d.rpc.map(r => <code key={r} className="font-mono text-xs bg-white/10 text-white rounded-sm px-2 py-1">{r}()</code>)}</span>
            </div>
          )}
          {d.tables && (
            <div className="flex flex-col gap-2">
              <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-smoke"><Database aria-hidden size={14} /> Tables</span>
              <span className="flex flex-wrap gap-1.5">{d.tables.map(t => <code key={t} className="font-mono text-xs bg-amber text-midnight rounded-sm px-2 py-1">{t}</code>)}</span>
            </div>
          )}
          {d.status && (
            <p className="m-0 flex items-center gap-2 font-mono text-sm text-amber"><ArrowRight aria-hidden size={16} /> {d.status}</p>
          )}
          {d.rules && (
            <p className="m-0 flex items-center gap-2 text-sm text-smoke"><ListChecks aria-hidden size={16} /> Rules: <span className="font-mono">{d.rules.join(', ')}</span></p>
          )}
          <div className="flex gap-2 pt-2">
            <button type="button" disabled={pos <= 0} onClick={() => setActive(order[pos - 1].i)} className="pcu-btn pcu-btn--inverse !min-h-[36px] !px-4 !text-sm disabled:opacity-40">Previous</button>
            <button type="button" disabled={pos >= order.length - 1} onClick={() => setActive(order[pos + 1].i)} className="pcu-btn pcu-btn--accent !min-h-[36px] !px-4 !text-sm disabled:opacity-40">Next step</button>
          </div>
        </div>
        <div className="min-w-0 flex flex-col gap-2">
          <Erd compact entities={dev.entities} relations={dev.relations} domains={dev.domains} highlight={lit} label={`Tables touched by: ${step.title}`} />
          <p className="m-0 text-xs text-ink-muted">{lit.length ? `Highlighted in amber: ${lit.join(', ')}.` : 'This step writes no table shown in the diagram.'}</p>
        </div>
      </div>
    </div>
  )
}
