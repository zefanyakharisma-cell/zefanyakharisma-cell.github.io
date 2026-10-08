'use client'

import { useState } from 'react'
import { Check, Minus } from 'lucide-react'
import { Segmented } from '@/components/pcu/Segmented'

type Metric = { measure: string; before: string; after: string }

/** Toggle every measure between "before" and "with the system". */
export default function BeforeAfter({ metrics }: { metrics: Metric[] }) {
  const [mode, setMode] = useState<'before' | 'after'>('after')
  const after = mode === 'after'
  return (
    <div>
      <div className="mb-6">
        <Segmented
          label="Compare"
          options={[{ key: 'before', label: 'Before' }, { key: 'after', label: 'With the system' }]}
          value={mode}
          onChange={setMode}
        />
      </div>
      <ul className="m-0 p-0 list-none grid gap-4 [grid-template-columns:repeat(auto-fill,minmax(min(100%,240px),1fr))]" aria-live="polite">
        {metrics.map(m => (
          <li key={m.measure} className={`rounded-md p-5 flex flex-col gap-3 transition-colors duration-300 ${after ? 'bg-midnight text-white' : 'bg-white'}`}>
            <span className={`grid place-items-center w-9 h-9 rounded-pill ${after ? 'bg-amber text-midnight' : 'bg-smoke text-ink-muted'}`} aria-hidden>
              {after ? <Check size={18} /> : <Minus size={18} />}
            </span>
            <span className="text-xl font-bold leading-tight">{after ? m.after : m.before}</span>
            <span className={`text-sm ${after ? 'text-smoke' : 'text-ink-secondary'}`}>{m.measure}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
