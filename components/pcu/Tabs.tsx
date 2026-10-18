'use client'

import { useCallback, useState } from 'react'
import { SearchParam } from './SearchParam'

type Tab = { key: string; label: string; panel: React.ReactNode }

/**
 * Accessible tabs (roving arrow keys). The active tab is kept in ?tab= so links
 * like /about-overview?tab=experience open the right panel.
 *
 * The bar sticks just below the site header (--header-h) and, inside a PovSwitch,
 * below its bar too (--pov-h, set on the PovSwitch subtree).
 */
export function Tabs({ tabs, label }: { tabs: Tab[]; label: string }) {
  const [active, setActive] = useState(tabs[0].key)

  // ?tab= may hold another Tabs' key (they share the param): only take our own.
  const fromUrl = useCallback((key: string | null) => {
    if (key && tabs.some(t => t.key === key)) setActive(key)
  }, [tabs])

  const select = (key: string) => {
    setActive(key)
    const url = new URL(window.location.href)
    url.searchParams.set('tab', key)
    window.history.replaceState(null, '', url)
  }

  const onKey = (e: React.KeyboardEvent, i: number) => {
    const next = e.key === 'ArrowRight' ? i + 1 : e.key === 'ArrowLeft' ? i - 1 : e.key === 'Home' ? 0 : e.key === 'End' ? tabs.length - 1 : null
    if (next === null) return
    e.preventDefault()
    const t = tabs[(next + tabs.length) % tabs.length]
    select(t.key)
    document.getElementById(`tab-${t.key}`)?.focus()
  }

  return (
    <div>
      <SearchParam name="tab" onValue={fromUrl} />
      <div role="tablist" aria-label={label} className="tabs sticky z-20 bg-white top-[calc(var(--header-h)+var(--pov-h,0px))]">
        {tabs.map((t, i) => (
          <button
            key={t.key}
            id={`tab-${t.key}`}
            type="button"
            role="tab"
            aria-selected={active === t.key}
            aria-controls={`panel-${t.key}`}
            tabIndex={active === t.key ? 0 : -1}
            onClick={() => select(t.key)}
            onKeyDown={e => onKey(e, i)}
            className={`px-4 min-h-[48px] -mb-px border-0 border-b-2 bg-transparent cursor-pointer whitespace-nowrap text-[.9375rem] ${active === t.key ? 'border-midnight text-midnight font-semibold' : 'border-transparent text-ink-secondary font-medium'}`}
          >
            {t.label}
          </button>
        ))}
      </div>
      {tabs.map(t => (
        <div key={t.key} id={`panel-${t.key}`} role="tabpanel" aria-labelledby={`tab-${t.key}`} hidden={active !== t.key} className="pt-10">
          {t.panel}
        </div>
      ))}
    </div>
  )
}
