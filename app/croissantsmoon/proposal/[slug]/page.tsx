import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getProposalBySlug } from '@/lib/actions/proposals'
import { ProposalGate } from '@/components/proposal/ProposalGate'
import { ProposalPrintDocument } from '@/components/proposal/ProposalPrintDocument'
import { buildProposalTeaser } from '@/lib/proposal/teaser'
import { cookies } from 'next/headers'
import StarField from '@/components/cm/StarField'
import Image from 'next/image'

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
        teasers={{ en: buildProposalTeaser(proposal, 'en'), id: buildProposalTeaser(proposal, 'id') }}
      />
    )
  }

  return <ProposalPrintDocument proposal={proposal} showBack={false} trackViews />
}

function ExpiredScreen({ reason }: { reason: 'expired' | 'archived' | 'revoked' }) {
  return (
    <div
      className="min-h-screen relative flex items-center justify-center p-8"
      style={{ background: 'linear-gradient(160deg, #030712 0%, #071126 55%, #0a1a35 100%)' }}
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <StarField count={60} />
      </div>
      <div className="relative z-10 max-w-md text-center space-y-8">
        <Image
          src="/croissantsmoon/cm-logo-circle.png"
          alt="CroissantsMoon"
          width={64}
          height={64}
          className="w-16 h-16 rounded-2xl mx-auto"
          style={{
            border: '1px solid rgba(212,177,90,0.2)',
            boxShadow: '0 0 32px rgba(212,177,90,0.1)',
          }}
        />
        <div>
          <h1 className="font-serif font-light text-2xl mb-4" style={{ color: '#D9E6FF' }}>
            This proposal is no longer available
          </h1>
          <p className="text-sm leading-relaxed" style={{ color: 'rgba(143,168,214,0.65)' }}>
            This private proposal preview has{' '}
            {reason === 'expired' ? 'expired'
              : reason === 'revoked' ? 'had its access revoked'
              : 'been archived'}.{' '}
            Please contact CroissantsMoon to reactivate access.
          </p>
        </div>
        <a
          href="mailto:contact@croissantsmoon.studio"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm transition-colors"
          style={{
            background: 'rgba(212,177,90,0.08)',
            border: '1px solid rgba(212,177,90,0.2)',
            color: '#D4B15A',
          }}
        >
          Contact CroissantsMoon
        </a>
      </div>
    </div>
  )
}
