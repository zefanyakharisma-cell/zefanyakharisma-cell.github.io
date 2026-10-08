'use client'

import { useId, useMemo, useState } from 'react'
import Link from 'next/link'
import { Search, X } from 'lucide-react'
import { discoveryItems, skillGroups } from '@/lib/data/discovery'
import { SectionHead } from './SectionHead'

/** Filter work by skill tags and/or a keyword; matching pages appear as cards. */
export function SkillExplorer({ eyebrow = 'Skill explorer', title = 'Find work by skill' }: { eyebrow?: string; title?: string }) {
  const [selected, setSelected] = useState<string[]>([])
  const [query, setQuery] = useState('')
  const inputId = useId()

  const toggle = (skill: string) =>
    setSelected(prev => (prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]))

  const q = query.trim().toLowerCase()
  const active = selected.length > 0 || q.length > 0

  const results = useMemo(() => {
    if (!active) return []
    return discoveryItems
      .filter(item => {
        const skillMatch = !selected.length || item.skills.some(s => selected.includes(s))
        const textMatch =
          !q ||
          [item.title, item.description, item.category, ...item.skills].some(t => t.toLowerCase().includes(q))
        return skillMatch && textMatch
      })
      .map(item => ({ item, score: item.skills.filter(s => selected.includes(s)).length }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 9)
      .map(r => r.item)
  }, [active, selected, q])

  return (
    <section className="section section--smoke">
      <div className="wrap grid gap-12 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] items-start">
        <div className="lg:sticky lg:top-24">
          <SectionHead
            eyebrow={eyebrow}
            title={title}
            lead="Pick one or more skills, or type a keyword, to see the work that used them."
            className="!mb-6"
          />
          <label htmlFor={inputId} className="sr-only">Search projects and skills</label>
          <div className="flex items-center gap-2 bg-white border border-line rounded-pill pl-5 pr-1.5 min-h-[52px] focus-within:outline focus-within:outline-[3px] focus-within:outline-amber focus-within:outline-offset-2">
            <Search aria-hidden size={18} className="text-ink-muted flex-none" />
            <input
              id={inputId}
              type="search"
              value={query}
              onChange={e => setQuery(e.target.value)}
              onKeyDown={e => e.key === 'Escape' && setQuery('')}
              placeholder="Search projects, skills…"
              className="flex-1 min-w-0 bg-transparent border-0 outline-none text-[.9375rem] text-midnight placeholder:text-ink-muted py-2"
            />
          </div>
          {active && (
            <button
              type="button"
              onClick={() => { setSelected([]); setQuery('') }}
              className="pcu-btn pcu-btn--ghost mt-3 text-midnight"
            >
              Clear all
            </button>
          )}
        </div>

        <div className="flex flex-col gap-6">
          {skillGroups.map(group => (
            <div key={group.label}>
              <p className="pcu-eyebrow text-ink-muted mb-3">{group.label}</p>
              <div className="flex flex-wrap gap-2">
                {group.skills.map(skill => {
                  const on = selected.includes(skill)
                  return (
                    <button
                      key={skill}
                      type="button"
                      aria-pressed={on}
                      onClick={() => toggle(skill)}
                      className={`inline-flex items-center gap-1.5 min-h-[40px] px-4 rounded-pill border-[1.5px] text-sm font-medium transition-colors ${
                        on ? 'bg-midnight border-midnight text-white' : 'bg-white border-line text-midnight hover:border-midnight'
                      }`}
                    >
                      {skill}
                      {on && <X aria-hidden size={14} />}
                    </button>
                  )
                })}
              </div>
            </div>
          ))}

          {active && (
            <div aria-live="polite">
              <p className="pcu-eyebrow text-accent-strong mb-4">
                {results.length} matching {results.length === 1 ? 'page' : 'pages'}
              </p>
              {results.length === 0 ? (
                <p className="muted">Nothing matches yet. Try another skill or keyword.</p>
              ) : (
                <ul className="grid gap-4 sm:grid-cols-2 m-0 p-0 list-none">
                  {results.map(item => (
                    <li key={item.id}>
                      <Link href={`/${item.page}`} className="pcu-card flex flex-col gap-2 h-full no-underline hover:-translate-y-px transition-transform motion-reduce:transition-none">
                        <span className="pcu-eyebrow text-accent-strong">{item.category}</span>
                        <span className="font-semibold text-lg leading-snug">{item.title}</span>
                        <span className="text-sm muted">{item.description}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
