import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import { StatCard } from '@/components/ui/Card'
import { LeadStatusBadge, TemperatureBadge } from '@/components/ui/Badge'
import { formatCurrency, timeAgo } from '@/lib/utils'
import Link from 'next/link'
import {
  Users, FileText, Eye, TrendingUp,
  Flame, ArrowRight, Activity
} from 'lucide-react'

export const metadata: Metadata = { title: 'Dashboard' }

async function getDashboardData() {
  const supabase = await createClient()

  const [
    { count: totalLeads },
    { count: activeProposals },
    { data: recentLeads },
    { data: topProposals },
    { data: stats },
  ] = await Promise.all([
    supabase.from('leads').select('*', { count: 'exact', head: true }).neq('status', 'archived'),
    supabase.from('proposals').select('*', { count: 'exact', head: true }).eq('status', 'active'),
    supabase.from('leads').select('id, organization, contact_person, status, temperature, engagement_score, created_at').order('created_at', { ascending: false }).limit(6),
    supabase.from('proposals').select('id, title, slug, views, status, lead:leads(organization)').order('views', { ascending: false }).limit(5),
    supabase.from('leads').select('temperature, estimated_value').neq('status', 'archived'),
  ])

  const hotLeads = stats?.filter(s => s.temperature === 'hot').length ?? 0
  const pipelineValue = stats?.reduce((sum, s) => sum + (s.estimated_value ?? 0), 0) ?? 0
  const totalViews = topProposals?.reduce((sum, p) => sum + p.views, 0) ?? 0

  return { totalLeads, activeProposals, recentLeads, topProposals, hotLeads, pipelineValue, totalViews }
}

export default async function DashboardPage() {
  const { totalLeads, activeProposals, recentLeads, topProposals, hotLeads, pipelineValue, totalViews } = await getDashboardData()

  return (
    <div className="px-8 py-8 space-y-8 animate-fade-in">
      <div>
        <h1 className="text-2xl font-semibold text-cm-white">Dashboard</h1>
        <p className="text-sm text-cm-subtle mt-1">CroissantsMoon Studio Operating System</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Total Leads"
          value={totalLeads ?? 0}
          icon={<Users size={16} />}
        />
        <StatCard
          label="Active Proposals"
          value={activeProposals ?? 0}
          icon={<FileText size={16} />}
        />
        <StatCard
          label="Proposal Views"
          value={totalViews}
          icon={<Eye size={16} />}
        />
        <StatCard
          label="Hot Leads"
          value={hotLeads}
          icon={<Flame size={16} />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-cm-surface border border-cm-border rounded-xl overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-cm-border">
            <div className="flex items-center gap-2">
              <Activity size={15} className="text-cm-subtle" />
              <span className="text-sm font-medium text-cm-text">Recent Leads</span>
            </div>
            <Link href="/leads" className="text-xs text-cm-subtle hover:text-cm-accent transition-colors flex items-center gap-1">
              View all <ArrowRight size={11} />
            </Link>
          </div>
          <div className="divide-y divide-cm-border">
            {recentLeads?.map(lead => (
              <Link key={lead.id} href={`/leads/${lead.id}`} className="flex items-center justify-between px-6 py-3.5 hover:bg-cm-elevated/50 transition-colors group">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-cm-text group-hover:text-cm-white truncate transition-colors">{lead.organization}</p>
                  <p className="text-xs text-cm-subtle mt-0.5">{lead.contact_person} · {timeAgo(lead.created_at)}</p>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0 ml-4">
                  <TemperatureBadge temp={lead.temperature} />
                  <LeadStatusBadge status={lead.status} />
                </div>
              </Link>
            ))}
            {(!recentLeads || recentLeads.length === 0) && (
              <p className="px-6 py-8 text-sm text-cm-subtle text-center">No leads yet.</p>
            )}
          </div>
        </div>

        <div className="bg-cm-surface border border-cm-border rounded-xl overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-cm-border">
            <div className="flex items-center gap-2">
              <TrendingUp size={15} className="text-cm-subtle" />
              <span className="text-sm font-medium text-cm-text">Top Proposals</span>
            </div>
            <Link href="/croissantsmoon/proposals" className="text-xs text-cm-subtle hover:text-cm-accent transition-colors flex items-center gap-1">
              View all <ArrowRight size={11} />
            </Link>
          </div>
          <div className="divide-y divide-cm-border">
            {topProposals?.map((proposal, i) => (
              <Link key={proposal.id} href={`/croissantsmoon/proposals/${proposal.id}`} className="flex items-center gap-4 px-6 py-3.5 hover:bg-cm-elevated/50 transition-colors group">
                <span className="text-xs font-mono text-cm-muted w-4 flex-shrink-0">{i + 1}</span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-cm-text group-hover:text-cm-white truncate transition-colors">{proposal.title}</p>
                  <p className="text-xs text-cm-subtle mt-0.5">{(proposal.lead as { organization?: string })?.organization}</p>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-cm-subtle flex-shrink-0">
                  <Eye size={11} />
                  {proposal.views}
                </div>
              </Link>
            ))}
            {(!topProposals || topProposals.length === 0) && (
              <p className="px-6 py-8 text-sm text-cm-subtle text-center">No proposals yet.</p>
            )}
          </div>
        </div>
      </div>

      <div className="bg-cm-surface border border-cm-border rounded-xl p-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-cm-subtle uppercase tracking-widest">Pipeline Value</span>
        </div>
        <p className="text-3xl font-light text-cm-white">{formatCurrency(pipelineValue)}</p>
        <p className="text-xs text-cm-subtle mt-1">Across all active leads</p>
      </div>
    </div>
  )
}
