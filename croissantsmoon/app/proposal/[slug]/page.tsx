import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getProposalBySlug } from '@/lib/actions/proposals'
import { ProposalGate } from '@/components/proposal/ProposalGate'
import { ProposalPortal } from '@/components/proposal/ProposalPortal'
import { cookies } from 'next/headers'
import { Moon } from 'lucide-react'

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
    <div className="min-h-screen bg-cm-black flex items-center justify-center p-8 relative overflow-hidden">
      {/* Atmospheric background */}
      <div className="absolute inset-0 pointer-events-none select-none">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] blur-3xl opacity-40"
          style={{ background: 'radial-gradient(ellipse at top, rgba(124,110,247,0.14) 0%, transparent 70%)' }}
        />
        <div
          className="absolute bottom-0 right-1/4 w-[300px] h-[250px] blur-3xl opacity-25"
          style={{ background: 'radial-gradient(ellipse at center, rgba(201,168,76,0.08) 0%, transparent 70%)' }}
        />
        <div className="absolute inset-0 grid-bg opacity-40" />
        {/* Sparse stars */}
        <div className="absolute top-[15%] left-[20%] w-0.5 h-0.5 bg-white/40 rounded-full" />
        <div className="absolute top-[25%] right-[18%] w-px h-px bg-cm-gold/50 rounded-full" />
        <div className="absolute top-[70%] left-[35%] w-0.5 h-0.5 bg-white/25 rounded-full" />
        <div className="absolute top-[60%] right-[28%] w-px h-px bg-cm-accent/40 rounded-full" />
        <div className="absolute top-[85%] left-[55%] w-0.5 h-0.5 bg-white/20 rounded-full" />
      </div>

      <div className="max-w-md text-center space-y-6 relative z-10 animate-slide-up">
        <div className="relative inline-flex items-center justify-center">
          <div className="absolute w-20 h-20 rounded-full border border-cm-gold/10 animate-pulse-slow" />
          <div className="w-16 h-16 rounded-2xl bg-cm-elevated border border-cm-border flex items-center justify-center"
            style={{ boxShadow: '0 0 20px rgba(124,110,247,0.08)' }}>
            <Moon size={22} className="text-cm-gold/60" />
          </div>
        </div>
        <div>
          <p className="text-xs font-medium text-cm-gold/70 uppercase tracking-[0.2em] mb-3">CroissantsMoon</p>
          <h1 className="text-xl font-serif font-light text-cm-white mb-3">
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
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-cm-gold/10 border border-cm-gold/20 text-cm-gold text-sm hover:bg-cm-gold/20 hover:border-cm-gold/40 transition-colors"
        >
          Contact CroissantsMoon
        </a>
        <div className="flex items-center justify-center gap-3 pt-2">
          <div className="h-px w-8 bg-cm-border" />
          <span className="text-cm-gold/20 text-xs">✦</span>
          <div className="h-px w-8 bg-cm-border" />
        </div>
      </div>
    </div>
  )
}
