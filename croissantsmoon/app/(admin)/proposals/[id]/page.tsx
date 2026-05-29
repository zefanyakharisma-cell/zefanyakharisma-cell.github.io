import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import { ProposalStatusBadge } from '@/components/ui/Badge'
import { Card, CardContent, CardHeader } from '@/components/ui/Card'
import { formatDate, daysUntil, timeAgo } from '@/lib/utils'
import Link from 'next/link'
import { ArrowLeft, Eye, ExternalLink } from 'lucide-react'
import { ProposalActions } from '@/components/admin/ProposalActions'
import { ProposalEditor } from '@/components/admin/ProposalEditor'
import { CopyButton } from '@/components/ui/CopyButton'
import { Button } from '@/components/ui/Button'
import { SendEmailModal } from '@/components/admin/SendEmailModal'
import { EditProposalModal } from '@/components/admin/EditProposalModal'

export const metadata: Metadata = { title: 'Proposal Detail' }

async function getProposal(id: string) {
  const supabase = await createClient()
  const { data } = await supabase
    .from('proposals')
    .select('*, lead:leads(id, organization, contact_person, email, website, industry, notes, temperature), versions:proposal_versions(*)')
    .eq('id', id)
    .single()
  return data
}

export default async function ProposalDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const proposal = await getProposal(id)
  if (!proposal) notFound()

  const expiresIn = proposal.expires_at ? daysUntil(proposal.expires_at) : null
  const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://zefanyakharisma.com'
  const proposalUrl = `${BASE}/croissantsmoon/proposal/${proposal.slug}`

  return (
    <div className="px-8 py-8 animate-fade-in">
      <Link href="/proposals" className="flex items-center gap-2 text-sm text-cm-subtle hover:text-cm-text transition-colors mb-5">
        <ArrowLeft size={14} /> Back to Proposals
      </Link>

      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-cm-white">{proposal.title}</h1>
          <p className="text-sm text-cm-subtle mt-1">
            {(proposal.lead as { id?: string; organization?: string })?.id ? (
              <Link href={`/leads/${(proposal.lead as { id: string }).id}`} className="hover:text-cm-text transition-colors">
                {(proposal.lead as { organization?: string }).organization ?? '—'}
              </Link>
            ) : (
              <span>{(proposal.lead as { organization?: string })?.organization ?? '—'}</span>
            )}
            {' · '}/{proposal.slug}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <ProposalStatusBadge status={proposal.status} />
          <EditProposalModal proposal={proposal} />
          <a href={proposalUrl} target="_blank" rel="noopener noreferrer">
            <Button variant="secondary" size="sm"><Eye size={13} /> Preview Portal</Button>
          </a>
          {(proposal.lead as { email?: string })?.email && (
            <SendEmailModal
              proposal={proposal}
              lead={proposal.lead as { id: string; organization: string; contact_person: string; email: string; website: string | null; industry: string | null; notes: string | null }}
            />
          )}
          <ProposalActions proposal={proposal} />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2">
          <ProposalEditor proposal={proposal} />
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader><h3 className="text-sm font-semibold text-cm-white">Access</h3></CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-xs text-cm-subtle uppercase tracking-wider mb-2">Token</p>
                <div className="flex items-center gap-2">
                  <code className="flex-1 bg-cm-black border border-cm-border rounded-lg px-3 py-2 text-sm font-mono text-cm-gold">
                    {proposal.token}
                  </code>
                  <CopyButton text={proposal.token} />
                </div>
              </div>
              <div>
                <p className="text-xs text-cm-subtle uppercase tracking-wider mb-2">Proposal URL</p>
                <div className="flex items-center gap-2">
                  <a
                    href={proposalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-xs text-cm-accent hover:underline truncate flex items-center gap-1"
                  >
                    {proposalUrl} <ExternalLink size={10} />
                  </a>
                  <CopyButton text={proposalUrl} />
                </div>
              </div>
              <div>
                <p className="text-xs text-cm-subtle uppercase tracking-wider mb-1">Expires</p>
                {expiresIn !== null ? (
                  <p className={`text-sm font-medium ${expiresIn <= 3 ? 'text-red-400' : 'text-cm-text'}`}>
                    {expiresIn <= 0 ? 'Expired' : `${expiresIn} days`}
                    <span className="text-xs text-cm-subtle ml-2">({formatDate(proposal.expires_at!)})</span>
                  </p>
                ) : <p className="text-sm text-cm-subtle">No expiration</p>}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><h3 className="text-sm font-semibold text-cm-white">Analytics</h3></CardHeader>
            <CardContent className="space-y-3">
              {[
                { label: 'Total Views', value: proposal.views },
                { label: 'Unique Visitors', value: proposal.unique_visitors },
                { label: 'Pricing Views', value: proposal.pricing_views },
                { label: 'CTA Clicks', value: proposal.cta_clicks },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between items-center">
                  <span className="text-xs text-cm-subtle">{label}</span>
                  <span className="text-sm font-medium text-cm-text">{value}</span>
                </div>
              ))}
              {proposal.first_viewed_at && (
                <div className="pt-2 border-t border-cm-border">
                  <p className="text-xs text-cm-subtle">First viewed {timeAgo(proposal.first_viewed_at)}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {proposal.versions && proposal.versions.length > 0 && (
            <Card>
              <CardHeader><h3 className="text-sm font-semibold text-cm-white">Versions</h3></CardHeader>
              <div className="divide-y divide-cm-border">
                {(proposal.versions as { id: string; version_number: number; created_at: string; note: string | null }[]).slice(0, 5).map(v => (
                  <div key={v.id} className="px-6 py-3">
                    <div className="flex justify-between items-start">
                      <span className="text-xs text-cm-subtle">v{v.version_number}</span>
                      <span className="text-xs text-cm-subtle">{timeAgo(v.created_at)}</span>
                    </div>
                    {v.note && <p className="text-xs text-cm-text mt-0.5">{v.note}</p>}
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
