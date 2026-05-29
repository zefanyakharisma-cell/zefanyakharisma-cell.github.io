import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import { LeadStatusBadge, TemperatureBadge, EngagementBadge, ProposalStatusBadge } from '@/components/ui/Badge'
import { Card, CardContent, CardHeader } from '@/components/ui/Card'
import { formatCurrency, formatDate, timeAgo } from '@/lib/utils'
import Link from 'next/link'
import { ArrowLeft, Globe, Mail, Building2, ExternalLink, Eye } from 'lucide-react'
import { LeadActions } from '@/components/admin/LeadActions'

export const metadata: Metadata = { title: 'Lead Detail' }

async function getLead(id: string) {
  const supabase = await createClient()
  const { data } = await supabase
    .from('leads')
    .select('*, proposals(id, title, slug, status, token_status, views, expires_at, created_at), followups(*)')
    .eq('id', id)
    .single()
  return data
}

export default async function LeadDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const lead = await getLead(id)
  if (!lead) notFound()

  return (
    <div className="px-8 py-8 animate-fade-in">
      <div className="mb-6">
        <Link href="/leads" className="flex items-center gap-2 text-sm text-cm-subtle hover:text-cm-text transition-colors mb-5">
          <ArrowLeft size={14} /> Back to Leads
        </Link>
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-cm-white">{lead.organization}</h1>
            <p className="text-sm text-cm-subtle mt-1">{lead.contact_person}</p>
          </div>
          <div className="flex items-center gap-3">
            <TemperatureBadge temp={lead.temperature} />
            <LeadStatusBadge status={lead.status} />
            <LeadActions lead={lead} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <h2 className="text-sm font-semibold text-cm-white">Contact Information</h2>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-cm-subtle uppercase tracking-wider mb-1">Organization</p>
                <div className="flex items-center gap-2 text-sm text-cm-text">
                  <Building2 size={13} className="text-cm-subtle" />
                  {lead.organization}
                </div>
              </div>
              <div>
                <p className="text-xs text-cm-subtle uppercase tracking-wider mb-1">Email</p>
                <a href={`mailto:${lead.email}`} className="flex items-center gap-2 text-sm text-cm-accent hover:underline">
                  <Mail size={13} />
                  {lead.email}
                </a>
              </div>
              <div>
                <p className="text-xs text-cm-subtle uppercase tracking-wider mb-1">Industry</p>
                <p className="text-sm text-cm-text">{lead.industry ?? '—'}</p>
              </div>
              <div>
                <p className="text-xs text-cm-subtle uppercase tracking-wider mb-1">Website</p>
                {lead.website ? (
                  <a href={lead.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-cm-accent hover:underline">
                    <Globe size={13} />
                    {lead.website}
                    <ExternalLink size={11} />
                  </a>
                ) : <p className="text-sm text-cm-subtle">—</p>}
              </div>
              <div>
                <p className="text-xs text-cm-subtle uppercase tracking-wider mb-1">Project Type</p>
                <p className="text-sm text-cm-text">{lead.project_type?.replace(/_/g, ' ')}</p>
              </div>
              <div>
                <p className="text-xs text-cm-subtle uppercase tracking-wider mb-1">Estimated Value</p>
                <p className="text-sm text-cm-text font-medium">{lead.estimated_value ? formatCurrency(lead.estimated_value) : '—'}</p>
              </div>
            </CardContent>
            {lead.notes && (
              <div className="px-6 py-4 border-t border-cm-border">
                <p className="text-xs text-cm-subtle uppercase tracking-wider mb-2">Notes</p>
                <p className="text-sm text-cm-text leading-relaxed">{lead.notes}</p>
              </div>
            )}
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold text-cm-white">Proposals</h2>
                <Link href={`/croissantsmoon/proposals/new?lead=${lead.id}`} className="text-xs text-cm-accent hover:underline">
                  + New Proposal
                </Link>
              </div>
            </CardHeader>
            {lead.proposals && lead.proposals.length > 0 ? (
              <div className="divide-y divide-cm-border">
                {lead.proposals.map((p: { id: string; title: string; slug: string; status: string; token_status: string; views: number; expires_at: string | null; created_at: string }) => (
                  <Link key={p.id} href={`/croissantsmoon/proposals/${p.id}`} className="flex items-center justify-between px-6 py-4 hover:bg-cm-elevated/50 transition-colors group">
                    <div>
                      <p className="text-sm font-medium text-cm-text group-hover:text-cm-white transition-colors">{p.title}</p>
                      <p className="text-xs text-cm-subtle mt-0.5">{formatDate(p.created_at)}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1 text-xs text-cm-subtle">
                        <Eye size={11} /> {p.views}
                      </span>
                      <ProposalStatusBadge status={p.status as 'draft' | 'active' | 'expired' | 'archived' | 'closed_won' | 'closed_lost'} />
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <CardContent>
                <p className="text-sm text-cm-subtle text-center py-4">No proposals yet for this lead.</p>
              </CardContent>
            )}
          </Card>
        </div>

        <div className="space-y-4">
          <Card>
            <CardContent className="space-y-4">
              <div>
                <p className="text-xs text-cm-subtle uppercase tracking-wider mb-2">Engagement</p>
                <EngagementBadge score={lead.engagement_score} />
              </div>
              <div>
                <p className="text-xs text-cm-subtle uppercase tracking-wider mb-2">Added</p>
                <p className="text-sm text-cm-text">{formatDate(lead.created_at)}</p>
              </div>
              <div>
                <p className="text-xs text-cm-subtle uppercase tracking-wider mb-2">Last Updated</p>
                <p className="text-sm text-cm-text">{timeAgo(lead.updated_at)}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
