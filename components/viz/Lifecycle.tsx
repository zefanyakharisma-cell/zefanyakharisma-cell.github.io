'use client'

import { useState } from 'react'
/** icon: a rendered element such as <Search size={20} />. */
type Step = { title: string; text: string; icon?: React.ReactNode }

/** Horizontal step diagram; choosing a step shows its one-line description. */
export function Lifecycle({ steps, label, dark }: { steps: Step[]; label: string; dark?: boolean }) {
  const [active, setActive] = useState(0)
  const s = steps[active]
  return (
    <div>
      <ol className="m-0 p-0 list-none flex items-start overflow-x-auto pb-2" aria-label={label}>
        {steps.map((st, i) => {
          const on = i === active
          const done = i < active
          return (
            <li key={st.title} className="flex items-start flex-1 min-w-[96px] last:flex-none">
              <button
                type="button"
                aria-pressed={on}
                onClick={() => setActive(i)}
                className="flex flex-col items-center gap-2 border-0 bg-transparent cursor-pointer p-0 w-[96px] text-center"
              >
                <span className={`grid place-items-center w-12 h-12 rounded-pill border-2 font-bold transition-colors ${on ? 'bg-amber border-amber text-midnight' : done ? (dark ? 'bg-white border-white text-midnight' : 'bg-midnight border-midnight text-white') : dark ? 'border-white/40 text-white' : 'border-[#c5ccd4] text-ink-secondary bg-white'}`}>
                  {st.icon ?? i + 1}
                </span>
                <span className={`text-sm leading-tight ${on ? 'font-bold' : ''} ${dark ? 'text-white' : 'text-midnight'}`}>{st.title}</span>
              </button>
              {i < steps.length - 1 && <span aria-hidden className={`flex-1 h-0.5 mt-6 min-w-4 ${i < active ? (dark ? 'bg-white' : 'bg-midnight') : dark ? 'bg-white/30' : 'bg-[#c5ccd4]'}`} />}
            </li>
          )
        })}
      </ol>
      <div className={`mt-6 rounded-md p-5 flex gap-4 items-baseline ${dark ? 'bg-white/10' : 'bg-smoke'}`} aria-live="polite">
        <span className={`pcu-eyebrow flex-none ${dark ? 'text-amber' : 'text-accent-strong'}`}>Step {active + 1}/{steps.length}</span>
        <p className={`m-0 ${dark ? 'text-smoke' : 'text-ink-secondary'}`}><b className={dark ? 'text-white' : 'text-midnight'}>{s.title}.</b> {s.text}</p>
      </div>
    </div>
  )
}
