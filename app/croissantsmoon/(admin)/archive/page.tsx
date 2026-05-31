import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import { ProposalStatusBadge } from '@/components/ui/Badge'
import { EmptyState } from '@/components/ui/EmptyState'
import { formatDate } from '@/lib/utils'
import Link from 'next/link'
import { Archive, Eye } from 'lucide-react'

export const metadata: Metadata = { title: 'Archive' }

async function getArchived() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('proposals')
    .select('*, lead:leads(organization)')
    .in('status', ['archived', 'expired', 'closed_won', 'closed_lost'])
    .order('updated_at', { ascending: false })
  return data ?? []
}

export default async function ArchivePage() {
  const proposals = await getArchived()

  return (
    <div className="px-8 py-8 animate-cm-fade-in">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-cm-white">Archive</h1>
        <p className="text-sm text-cm-subtle mt-1">{proposals.length} archived proposals</p>
      </div>

      {proposals.length === 0 ? (
        <EmptyState
          icon={<Archive size={20} />}
          title="Archive is empty"
          description="Archived and expired proposals will appear here."
        />
      ) : (
        <div className="bg-cm-surface border border-cm-border rounded-xl overflow-hidden">
          <div className="grid grid-cols-[2fr_1.5fr_1fr_1fr_1fr] gap-4 px-6 py-3 border-b border-cm-border">
            {['Proposal', 'Lead', 'Status', 'Views', 'Archived'].map(h => (
              <span key={h} className="text-xs font-medium text-cm-subtle uppercase tracking-wider">{h}</span>
            ))}
          </div>
          <div className="divide-y divide-cm-border">
            {proposals.map(p => (
              <Link
                key={p.id}
                href={`/croissantsmoon/proposals/${p.id}`}
                className="grid grid-cols-[2fr_1.5fr_1fr_1fr_1fr] gap-4 px-6 py-4 hover:bg-cm-elevated/50 transition-colors group items-center"
              >
                <div className="min-w-0">
                  <p className="text-sm text-cm-text group-hover:text-cm-white truncate transition-colors">{p.title}</p>
                  <p className="text-xs text-cm-subtle font-mono mt-0.5">/{p.slug}</p>
                </div>
                <p className="text-sm text-cm-subtle truncate">{(p.lead as { organization?: string })?.organization ?? '—'}</p>
                <ProposalStatusBadge status={p.status} />
                <span className="flex items-center gap-1 text-sm text-cm-subtle">
                  <Eye size={12} /> {p.views}
                </span>
                <span className="text-xs text-cm-subtle">{formatDate(p.updated_at)}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
