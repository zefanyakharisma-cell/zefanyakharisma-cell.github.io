import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getProposalBySlug } from '@/lib/actions/proposals'
import { ProposalGate } from '@/components/proposal/ProposalGate'
import { ProposalPortal } from '@/components/proposal/ProposalPortal'
import { cookies } from 'next/headers'

export const metadata: Metadata = {
  title: 'Private Proposal',
  robots: { index: false, follow: false, nosnippet: true },
}

export default async function ProposalPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const proposal = await getProposalBySlug(slug)

  if (!proposal) notFound()

  if (proposal.status === 'archived') {
    return <ExpiredScreen reason="archived" />
  }

  const cookieStore = await cookies()
  const accessKey = `cm_access_${slug}`
  const hasAccess = cookieStore.get(accessKey)?.value === 'granted'

  if (proposal.expires_at && new Date(proposal.expires_at) < new Date()) {
    return <ExpiredScreen reason="expired" />
  }

  if (proposal.token_status !== 'active') {
    return <ExpiredScreen reason="revoked" />
  }

  if (!hasAccess) {
    return (
      <ProposalGate
        slug={slug}
        orgName={(proposal.lead as { organization?: string })?.organization ?? 'Your Organization'}
      />
    )
  }

  return <ProposalPortal proposal={proposal} />
}

function ExpiredScreen({ reason }: { reason: 'expired' | 'archived' | 'revoked' }) {
  return (
    <div className="min-h-screen bg-cm-black flex items-center justify-center p-8">
      <div className="max-w-md text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-cm-elevated border border-cm-border flex items-center justify-center mx-auto">
          <span className="text-2xl font-serif text-cm-gold">M</span>
        </div>
        <div>
          <h1 className="text-xl font-semibold text-cm-white mb-3 font-serif">
            This proposal is no longer available
          </h1>
          <p className="text-sm text-cm-subtle leading-relaxed">
            This private proposal preview has{' '}
            {reason === 'expired' ? 'expired' : 'been archived'}.
            Please contact CroissantsMoon to reactivate access.
          </p>
        </div>
        <a
          href="mailto:contact@croissantsmoon.studio"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-cm-gold/10 border border-cm-gold/20 text-cm-gold text-sm hover:bg-cm-gold/20 transition-colors"
        >
          Contact CroissantsMoon
        </a>
      </div>
    </div>
  )
}
