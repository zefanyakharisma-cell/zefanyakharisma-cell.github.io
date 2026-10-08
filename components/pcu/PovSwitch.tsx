'use client'

import { useEffect, useState } from 'react'
import { Code2, Users } from 'lucide-react'

type Pov = 'general' | 'dev'

/**
 * General / Programmer view switch for a project page. Both views are rendered
 * on the server; the inactive one is hidden. The choice is kept in ?pov= so a
 * link can open either view.
 */
export function PovSwitch({ general, dev }: { general: React.ReactNode; dev: React.ReactNode }) {
  const [pov, setPov] = useState<Pov>('general')

  useEffect(() => {
    if (new URLSearchParams(window.location.search).get('pov') === 'dev') setPov('dev')
  }, [])

  const select = (p: Pov) => {
    setPov(p)
    const url = new URL(window.location.href)
    if (p === 'dev') url.searchParams.set('pov', 'dev')
    else url.searchParams.delete('pov')
    window.history.replaceState(null, '', url)
    document.getElementById('pov-top')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const options: { key: Pov; label: string; hint: string; Icon: typeof Users }[] = [
    { key: 'general', label: 'General', hint: 'What it does and why', Icon: Users },
    { key: 'dev', label: 'Programmer', hint: 'Process, ERD, rules, code', Icon: Code2 },
  ]

  return (
    <>
      <div id="pov-top" className="sticky top-[72px] z-30 scroll-mt-[72px] bg-white/90 backdrop-blur border-b border-line">
        <div className="wrap flex flex-wrap items-center justify-between gap-3 py-3">
          <span className="pcu-eyebrow">Point of view</span>
          <div role="radiogroup" aria-label="Point of view" className="flex gap-1 p-1 rounded-pill bg-smoke">
            {options.map(({ key, label, hint, Icon }) => (
              <button
                key={key}
                type="button"
                role="radio"
                aria-checked={pov === key}
                onClick={() => select(key)}
                className={`flex items-center gap-2 rounded-pill px-4 min-h-[40px] border-0 cursor-pointer text-sm font-semibold transition-colors ${pov === key ? 'bg-midnight text-white shadow-card' : 'bg-transparent text-midnight hover:bg-white'}`}
              >
                <Icon aria-hidden size={16} className={pov === key ? 'text-amber' : ''} />
                {label}
                <span className={`hidden md:inline font-normal ${pov === key ? 'text-smoke' : 'text-ink-muted'}`}>· {hint}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
      <div hidden={pov !== 'general'}>{general}</div>
      <div hidden={pov !== 'dev'}>{dev}</div>
    </>
  )
}
