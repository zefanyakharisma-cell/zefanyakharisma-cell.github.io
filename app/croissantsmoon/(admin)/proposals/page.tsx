import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import { ProposalStatusBadge } from '@/components/ui/Badge'
import { EmptyState } from '@/components/ui/EmptyState'
import { Button } from '@/components/ui/Button'
import { formatDate, daysUntil } from '@/lib/utils'
import Link from 'next/link'
import { FileText, Plus, Eye } from 'lucide-react'

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
    <div className="px-4 md:px-8 py-8 animate-cm-fade-in">
      <div className="flex items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-cm-white">Proposals</h1>
          <p className="text-sm text-cm-subtle mt-1">{proposals.length} proposals</p>
        </div>
        <Link href="/croissantsmoon/proposals/new">
          <Button variant="primary"><Plus size={14} /> New Proposal</Button>
        </Link>
      </div>

      {proposals.length === 0 ? (
        <EmptyState
          icon={<FileText size={20} />}
          title="No proposals yet"
          description="Create your first proposal to share with a lead."
          action={<Link href="/croissantsmoon/proposals/new"><Button variant="primary"><Plus size={14} /> New Proposal</Button></Link>}
        />
      ) : (
        <div className="bg-cm-surface border border-cm-border rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
          <div className="min-w-[760px]">
          <div className="grid grid-cols-[2fr_1.5fr_1fr_1fr_1fr_1fr] gap-4 px-6 py-3 border-b border-cm-border">
            {['Proposal', 'Lead', 'Status', 'Views', 'Expires', 'Created'].map(h => (
              <span key={h} className="text-xs font-medium text-cm-subtle uppercase tracking-wider">{h}</span>
            ))}
          </div>
          <div className="divide-y divide-cm-border">
            {proposals.map(p => {
              const expiresIn = p.expires_at ? daysUntil(p.expires_at) : null
              return (
                <Link
                  key={p.id}
                  href={`/croissantsmoon/proposals/${p.id}`}
                  className="grid grid-cols-[2fr_1.5fr_1fr_1fr_1fr_1fr] gap-4 px-6 py-4 hover:bg-cm-elevated/50 transition-colors group items-center"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-cm-text group-hover:text-cm-white truncate transition-colors">{p.title}</p>
                    <p className="text-xs text-cm-subtle mt-0.5 font-mono">/{p.slug}</p>
                  </div>
                  <p className="text-sm text-cm-subtle truncate">{(p.lead as { organization?: string })?.organization ?? '—'}</p>
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
                </Link>
              )
            })}
          </div>
          </div>
          </div>
        </div>
      )}
    </div>
  )
}
