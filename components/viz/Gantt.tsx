'use client'

import { useState } from 'react'
import type { Role } from '@/lib/data/experience'
import { Tag } from '@/components/pcu/Tag'

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

function parse(s: string, end: boolean): number {
  if (/now/i.test(s)) return 2026 + 9 / 12
  const [m, y] = s.trim().split(' ')
  return Number(y) + (MONTHS.indexOf(m) + (end ? 1 : 0)) / 12
}

/** Career roles as bars on a time axis; selecting a bar shows its highlights. */
export function Gantt({ roles }: { roles: Role[] }) {
  const [active, setActive] = useState(roles[0]?.id)
  const spans = roles.map(r => {
    const [a, b] = r.period.split('–').map(s => s.trim())
    return { role: r, from: parse(a, false), to: parse(b, true) }
  })
  const min = Math.floor(Math.min(...spans.map(s => s.from)))
  const max = Math.ceil(Math.max(...spans.map(s => s.to)))
  const pct = (v: number) => ((v - min) / (max - min)) * 100
  const years = Array.from({ length: max - min + 1 }, (_, i) => min + i)
  const current = roles.find(r => r.id === active)

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] items-start">
      <div>
        <div className="relative h-6 mb-2 text-xs text-ink-muted" aria-hidden>
          {years.map(y => (
            <span key={y} className="absolute -translate-x-1/2" style={{ left: `${pct(y)}%` }}>{y}</span>
          ))}
        </div>
        <ol className="m-0 p-0 list-none flex flex-col gap-2 relative">
          {spans.map(({ role, from, to }) => (
            <li key={role.id}>
              <button
                type="button"
                aria-pressed={active === role.id}
                onClick={() => setActive(role.id)}
                className="relative block w-full h-12 border-0 bg-smoke rounded-md cursor-pointer p-0 text-left"
              >
                <span
                  className={`absolute top-1 bottom-1 rounded-[6px] flex items-center px-3 text-sm font-semibold overflow-hidden whitespace-nowrap transition-colors ${active === role.id ? 'bg-midnight text-white' : 'bg-[#bccfe5] text-midnight'}`}
                  style={{ left: `${pct(from)}%`, width: `max(${pct(to) - pct(from)}%, 2.5rem)` }}
                >
                  {role.title}
                </span>
                <span className="sr-only">{role.title}, {role.org}, {role.period}</span>
              </button>
            </li>
          ))}
        </ol>
      </div>
      {current && (
        <div className="pcu-card" aria-live="polite">
          <span className="pcu-eyebrow text-accent-strong">{current.period}</span>
          <h3 className="!text-xl mt-1">{current.title}</h3>
          <p className="muted m-0 mt-1">{current.org}</p>
          <ul className="mt-4 mb-0 pl-5 flex flex-col gap-1.5 text-[.9375rem] text-ink-secondary marker:text-accent-strong">
            {current.bullets.slice(0, 3).map(b => <li key={b}>{b}</li>)}
          </ul>
          <div className="flex flex-wrap gap-1.5 mt-4">{current.tags.map(t => <Tag key={t} outline className="text-midnight">{t}</Tag>)}</div>
        </div>
      )}
    </div>
  )
}
