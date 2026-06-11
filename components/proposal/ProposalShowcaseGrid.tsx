'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { Eye, Clock, ArrowUpRight, Search, X } from 'lucide-react'
import { ProposalStatusBadge } from '@/components/ui/Badge'
import { ProposalActions } from '@/components/admin/ProposalActions'
import { buildProposalTeaser } from '@/lib/proposal/teaser'
import { daysUntil } from '@/lib/utils'
import type { Proposal, ProposalStatus } from '@/types'

// ── Celestial palette (matches ProposalPortal / ProposalGate) ──
const AURORA = '#6FA8FF'
const GOLD   = '#D4B15A'
const VIOLET = '#C9A9FF'
const SKY    = '#A0C4FF'
const MINT   = '#7DC9A0'
const ACCENTS = [AURORA, VIOLET, GOLD, MINT, SKY]

function rgba(hex: string, a: number): string {
  const h = hex.replace('#', '')
  return `rgba(${parseInt(h.slice(0, 2), 16)},${parseInt(h.slice(2, 4), 16)},${parseInt(h.slice(4, 6), 16)},${a})`
}

const STATUS_LABEL: Record<ProposalStatus, string> = {
  draft: 'Draft', active: 'Active', expired: 'Expired',
  archived: 'Archived', closed_won: 'Won', closed_lost: 'Lost',
}

interface Props {
  proposals: Proposal[]
  isAdmin: boolean
}

export function ProposalShowcaseGrid({ proposals, isAdmin }: Props) {
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState<'all' | ProposalStatus>('all')

  // Precompute teaser/meta once so search + render stay cheap.
  const cards = useMemo(
    () =>
      proposals.map((p, i) => {
        const teaser = buildProposalTeaser(p)
        return {
          p,
          accent: ACCENTS[i % ACCENTS.length],
          orgName: teaser.orgName,
          headline: teaser.headline,
          snippet: teaser.subheadline || teaser.greeting || '',
          expiresIn: p.expires_at ? daysUntil(p.expires_at) : null,
          haystack: `${teaser.orgName} ${teaser.headline} ${p.title} ${p.slug}`.toLowerCase(),
        }
      }),
    [proposals],
  )

  const statuses = useMemo(() => {
    const set = new Set<ProposalStatus>(proposals.map(p => p.status))
    return Array.from(set)
  }, [proposals])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return cards.filter(c => {
      if (status !== 'all' && c.p.status !== status) return false
      if (q && !c.haystack.includes(q)) return false
      return true
    })
  }, [cards, query, status])

  return (
    <div>
      {/* Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-8">
        <div
          className="relative flex items-center gap-2.5 px-4 h-11 rounded-xl flex-1 max-w-sm"
          style={{ background: 'rgba(8,14,30,0.6)', border: `1px solid ${rgba(AURORA, 0.14)}` }}
        >
          <Search size={15} style={{ color: rgba('#8FA8D6', 0.5) }} />
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search proposals…"
            className="bg-transparent outline-none text-sm w-full placeholder:text-[#8FA8D6]/40"
            style={{ color: '#EAF1FF' }}
          />
          {query && (
            <button onClick={() => setQuery('')} className="shrink-0" aria-label="Clear search">
              <X size={14} style={{ color: rgba('#8FA8D6', 0.5) }} />
            </button>
          )}
        </div>

        {statuses.length > 1 && (
          <div className="flex items-center gap-2 flex-wrap">
            {(['all', ...statuses] as const).map(s => {
              const selected = status === s
              return (
                <button
                  key={s}
                  onClick={() => setStatus(s)}
                  className="px-3 h-8 rounded-full text-xs font-medium transition-all"
                  style={{
                    color: selected ? '#030712' : rgba('#8FA8D6', 0.7),
                    background: selected ? GOLD : 'rgba(8,14,30,0.6)',
                    border: `1px solid ${selected ? GOLD : rgba(AURORA, 0.12)}`,
                  }}
                >
                  {s === 'all' ? 'All' : STATUS_LABEL[s]}
                </button>
              )
            })}
          </div>
        )}
      </div>

      {filtered.length === 0 ? (
        <div className="py-20 text-center text-sm" style={{ color: rgba('#8FA8D6', 0.6) }}>
          No proposals match your search.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map(({ p, accent, orgName, headline, snippet, expiresIn }) => {
            const slugHref = `/croissantsmoon/proposal/${p.slug}`
            return (
              <article
                key={p.id}
                onMouseMove={e => {
                  const r = e.currentTarget.getBoundingClientRect()
                  e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
                  e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
                }}
                className="group relative rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1"
                style={{
                  background: 'rgba(8,14,30,0.55)',
                  border: `1px solid ${rgba(accent, 0.14)}`,
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                }}
              >
                {/* Mouse-follow spotlight */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{ background: `radial-gradient(280px circle at var(--mx, 50%) var(--my, 0%), ${rgba(accent, 0.14)}, transparent 70%)` }}
                />
                {/* Accent top line */}
                <div className="h-px w-full" style={{ background: `linear-gradient(90deg, transparent, ${rgba(accent, 0.55)}, transparent)` }} />

                <Link href={slugHref} className="block relative p-6 pb-4">
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <span className="text-[11px] uppercase tracking-[0.16em] font-medium truncate" style={{ color: accent }}>
                      {orgName}
                    </span>
                    <ProposalStatusBadge status={p.status} />
                  </div>

                  <h2 className="font-serif font-light text-xl leading-snug mb-2 line-clamp-2" style={{ color: '#EAF1FF' }}>
                    {headline}
                  </h2>

                  {snippet && (
                    <p className="text-sm leading-relaxed line-clamp-3" style={{ color: rgba('#8FA8D6', 0.7) }}>
                      {snippet}
                    </p>
                  )}

                  <span className="mt-5 inline-flex items-center gap-1.5 text-xs font-medium" style={{ color: rgba(accent, 0.85) }}>
                    Open preview
                    <ArrowUpRight size={13} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </Link>

                <div
                  className="relative px-6 py-3.5 flex items-center justify-between"
                  style={{ borderTop: `1px solid ${rgba(accent, 0.1)}` }}
                >
                  <div className="flex items-center gap-4 text-xs" style={{ color: rgba('#8FA8D6', 0.6) }}>
                    <span className="flex items-center gap-1.5"><Eye size={12} /> {p.views}</span>
                    {expiresIn !== null && (
                      <span className="flex items-center gap-1.5" style={{ color: expiresIn <= 3 ? '#F87171' : rgba('#8FA8D6', 0.6) }}>
                        <Clock size={12} />
                        {expiresIn <= 0 ? 'Expired' : expiresIn === 1 ? '1 day left' : `${expiresIn}d left`}
                      </span>
                    )}
                  </div>

                  {isAdmin ? (
                    <ProposalActions proposal={p} />
                  ) : (
                    <span className="text-[11px] font-mono truncate max-w-[40%]" style={{ color: rgba('#8FA8D6', 0.4) }}>
                      /{p.slug}
                    </span>
                  )}
                </div>

                {isAdmin && (
                  <Link
                    href={`/croissantsmoon/proposals/${p.id}`}
                    className="relative block px-6 py-2.5 text-[11px] uppercase tracking-wider transition-colors hover:text-cm-text"
                    style={{ borderTop: `1px solid ${rgba(accent, 0.08)}`, color: rgba('#8FA8D6', 0.55) }}
                  >
                    Manage in studio →
                  </Link>
                )}
              </article>
            )
          })}
        </div>
      )}
    </div>
  )
}
