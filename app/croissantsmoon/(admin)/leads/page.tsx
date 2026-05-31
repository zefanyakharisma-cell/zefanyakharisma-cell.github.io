import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import { LeadStatusBadge, TemperatureBadge, EngagementBadge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { EmptyState } from '@/components/ui/EmptyState'
import { formatCurrency, timeAgo } from '@/lib/utils'
import Link from 'next/link'
import { Plus, Users, Search } from 'lucide-react'
import { CreateLeadModal } from '@/components/admin/CreateLeadModal'

export const metadata: Metadata = { title: 'Leads' }

async function getLeads(search?: string) {
  const supabase = await createClient()
  let query = supabase
    .from('leads')
    .select('*, proposals(id, status, views)')
    .neq('status', 'archived')
    .order('created_at', { ascending: false })

  if (search) query = query.ilike('organization', `%${search}%`)
  const { data } = await query
  return data ?? []
}

export default async function LeadsPage({ searchParams }: { searchParams: Promise<{ search?: string }> }) {
  const { search } = await searchParams
  const leads = await getLeads(search)

  return (
    <div className="px-8 py-8 animate-cm-fade-in">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-cm-white">Leads</h1>
          <p className="text-sm text-cm-subtle mt-1">{leads.length} active leads in pipeline</p>
        </div>
        <CreateLeadModal />
      </div>

      <div className="mb-5">
        <form className="relative max-w-sm">
          <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-cm-muted pointer-events-none" />
          <input
            name="search"
            defaultValue={search}
            placeholder="Search organizations..."
            className="w-full bg-cm-elevated border border-cm-border rounded-lg pl-9 pr-4 py-2.5 text-sm text-cm-text placeholder:text-cm-muted focus:outline-none focus:ring-1 focus:ring-cm-accent focus:border-cm-accent transition-colors"
          />
        </form>
      </div>

      {leads.length === 0 ? (
        <EmptyState
          icon={<Users size={20} />}
          title="No leads found"
          description="Start by creating your first lead to track prospects."
        />
      ) : (
        <div className="bg-cm-surface border border-cm-border rounded-xl overflow-hidden">
          <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr] gap-4 px-6 py-3 border-b border-cm-border">
            {['Organization', 'Status', 'Temperature', 'Engagement', 'Value', 'Last Updated'].map(h => (
              <span key={h} className="text-xs font-medium text-cm-subtle uppercase tracking-wider">{h}</span>
            ))}
          </div>
          <div className="divide-y divide-cm-border">
            {leads.map(lead => (
              <Link
                key={lead.id}
                href={`/croissantsmoon/leads/${lead.id}`}
                className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr] gap-4 px-6 py-4 hover:bg-cm-elevated/50 transition-colors group items-center"
              >
                <div className="min-w-0">
                  <p className="text-sm font-medium text-cm-text group-hover:text-cm-white truncate transition-colors">
                    {lead.organization}
                  </p>
                  <p className="text-xs text-cm-subtle mt-0.5 truncate">{lead.contact_person}</p>
                </div>
                <LeadStatusBadge status={lead.status} />
                <TemperatureBadge temp={lead.temperature} />
                <EngagementBadge score={lead.engagement_score} />
                <span className="text-sm text-cm-subtle">
                  {lead.estimated_value ? formatCurrency(lead.estimated_value) : '—'}
                </span>
                <span className="text-xs text-cm-subtle">{timeAgo(lead.updated_at)}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
