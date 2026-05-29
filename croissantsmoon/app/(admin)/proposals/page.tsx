import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import { ProposalStatusBadge, TemperatureBadge } from '@/components/ui/Badge'
import { EmptyState } from '@/components/ui/EmptyState'
import { Button } from '@/components/ui/Button'
import { formatDate, timeAgo, daysUntil } from '@/lib/utils'
import Link from 'next/link'
import { FileText, Plus, Eye, Search } from 'lucide-react'
import { ProposalRowActions } from '@/components/admin/ProposalRowActions'

export const metadata: Metadata = { title: 'Proposals' }

async function getProposals(search?: string) {
  const supabase = await createClient()
  let query = supabase
    .from('proposals')
    .select('*, lead:leads(organization, temperature)')
    .order('created_at', { ascending: false })
  if (search) query = query.ilike('title', `%${search}%`)
  const { data } = await query
  return data ?? []
}

export default async function ProposalsPage({ searchParams }: { searchParams: Promise<{ search?: string }> }) {
  const { search } = await searchParams
  const proposals = await getProposals(search)

  return (
    <div className="px-8 py-8 animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-cm-white">Proposals</h1>
          <p className="text-sm text-cm-subtle mt-1">{proposals.length} proposals</p>
        </div>
        <Link href="/proposals/new">
          <Button variant="primary"><Plus size={14} /> New Proposal</Button>
        </Link>
      </div>

      <div className="mb-5">
        <form className="relative max-w-sm">
          <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-cm-muted pointer-events-none" />
          <input
            name="search"
            defaultValue={search}
            placeholder="Search proposals..."
            className="w-full bg-cm-elevated border border-cm-border rounded-lg pl-9 pr-4 py-2.5 text-sm text-cm-text placeholder:text-cm-muted focus:outline-none focus:ring-1 focus:ring-cm-accent focus:border-cm-accent transition-colors"
          />
        </form>
      </div>

      {proposals.length === 0 ? (
        <EmptyState
          icon={<FileText size={20} />}
          title={search ? 'No proposals match your search' : 'No proposals yet'}
          description={search ? `No results for "${search}".` : 'Create your first proposal to share with a lead.'}
          action={!search ? <Link href="/proposals/new"><Button variant="primary"><Plus size={14} /> New Proposal</Button></Link> : undefined}
        />
      ) : (
        <div className="bg-cm-surface border border-cm-border rounded-xl overflow-hidden">
          <div className="grid grid-cols-[2fr_1.5fr_1fr_1fr_1fr_1fr_32px] gap-4 px-6 py-3 border-b border-cm-border">
            {['Proposal', 'Lead', 'Status', 'Views', 'Expires', 'Created', ''].map(h => (
              <span key={h} className="text-xs font-medium text-cm-subtle uppercase tracking-wider">{h}</span>
            ))}
          </div>
          <div className="divide-y divide-cm-border">
            {proposals.map(p => {
              const expiresIn = p.expires_at ? daysUntil(p.expires_at) : null
              return (
                <div
                  key={p.id}
                  className="grid grid-cols-[2fr_1.5fr_1fr_1fr_1fr_1fr_32px] gap-4 px-6 py-4 hover:bg-cm-elevated/50 transition-colors group items-center"
                >
                  <div className="min-w-0">
                    <Link href={`/proposals/${p.id}`} className="block group/title">
                      <p className="text-sm font-medium text-cm-text group-hover/title:text-cm-white truncate transition-colors">{p.title}</p>
                    </Link>
                    <a href={`/proposal/${p.slug}`} target="_blank" rel="noopener noreferrer" className="text-xs text-cm-subtle hover:text-cm-accent mt-0.5 font-mono transition-colors">/{p.slug} ↗</a>
                  </div>
                  <div className="min-w-0 space-y-0.5">
                    <p className="text-sm text-cm-subtle truncate">{(p.lead as { organization?: string; temperature?: string })?.organization ?? '—'}</p>
                    {(p.lead as { temperature?: string })?.temperature && (
                      <TemperatureBadge temp={(p.lead as { temperature: string }).temperature as 'cold' | 'warm' | 'hot'} />
                    )}
                  </div>
                  <ProposalStatusBadge status={p.status} />
                  <span className="flex items-center gap-1 text-sm text-cm-subtle">
                    <Eye size={12} /> {p.views}
                  </span>
                  <span className={`text-xs ${expiresIn !== null && expiresIn <= 3 ? 'text-red-400' : 'text-cm-subtle'}`}>
                    {expiresIn !== null
                      ? expiresIn <= 0 ? 'Expired'
                        : expiresIn === 1 ? '1 day'
                        : `${expiresIn}d`
                      : '—'}
                  </span>
                  <span className="text-xs text-cm-subtle">{formatDate(p.created_at)}</span>
                  <ProposalRowActions id={p.id} title={p.title} status={p.status} />
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
