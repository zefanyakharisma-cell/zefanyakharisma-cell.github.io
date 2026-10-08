'use client'

import { useState } from 'react'
import { RUNDOWN } from '@/lib/data/aero'
import { Segmented } from '@/components/pcu/Segmented'

/** Day-by-day event schedule with a segmented day picker. */
export default function Rundown() {
  const options = RUNDOWN.map((d, i) => ({ key: String(i), label: `${d.day} · ${d.label}` }))
  const [active, setActive] = useState('2')
  const day = RUNDOWN[Number(active)]
  return (
    <div>
      <div className="mb-6">
        <Segmented label="Choose a day" options={options} value={active} onChange={setActive} />
      </div>
      <div className="pcu-card">
        <p className="pcu-eyebrow text-accent-strong m-0">{day.date}</p>
        <h3 className="!text-xl mt-1 mb-4">{day.label}</h3>
        <ol className="m-0 p-0 list-none">
          {day.items.map((it, i) => (
            <li key={i} className="grid gap-x-6 gap-y-1 sm:grid-cols-[140px_1fr] py-3.5 border-t border-line">
              <span className="font-semibold tabular-nums text-accent-strong">{it.time}</span>
              <div>
                <p className="m-0 font-semibold">{it.activity}</p>
                {it.venue && it.venue !== '—' && <p className="m-0 text-sm muted">{it.venue}</p>}
                {it.note && <p className="m-0 text-sm muted mt-1">{it.note}</p>}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}
