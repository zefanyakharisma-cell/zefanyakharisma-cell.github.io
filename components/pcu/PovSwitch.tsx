'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { Code2, Users } from 'lucide-react'
import { SearchParam } from './SearchParam'

type Pov = 'general' | 'dev'

/**
 * General / Programmer view switch for a project page. Both views are rendered
 * on the server; the inactive one is hidden. The choice is kept in ?pov= so a
 * link can open either view.
 *
 * The bar sticks below the site header and writes its own height to --pov-h on
 * this subtree, so sticky Tabs and anchor targets inside the views sit below it.
 */
export function PovSwitch({ general, dev }: { general: React.ReactNode; dev: React.ReactNode }) {
  const [pov, setPov] = useState<Pov>('general')
  const root = useRef<HTMLDivElement>(null)
  const bar = useRef<HTMLDivElement>(null)

  const fromUrl = useCallback((v: string | null) => setPov(v === 'dev' ? 'dev' : 'general'), [])

  useEffect(() => {
    const r = root.current
    const b = bar.current
    if (!r || !b) return
    const write = () => r.style.setProperty('--pov-h', `${b.offsetHeight}px`)
    write()
    const ro = new ResizeObserver(write)
    ro.observe(b)
    return () => ro.disconnect()
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
    // display: contents keeps the sticky bar's containing block as before; the wrapper only scopes --pov-h.
    // 73px (one row: py-3 + 48px group + border) is the pre-hydration fallback.
    <div ref={root} className="contents" style={{ '--pov-h': '73px' } as React.CSSProperties}>
      <SearchParam name="pov" onValue={fromUrl} />
      <div ref={bar} id="pov-top" className="sticky top-[var(--header-h)] z-30 scroll-mt-[var(--header-h)] bg-white/90 backdrop-blur border-b border-line">
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
    </div>
  )
}
