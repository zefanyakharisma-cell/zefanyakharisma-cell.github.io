import type { Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'
import { getProposalBySlug } from '@/lib/actions/proposals'
import { createClient } from '@/lib/supabase/server'
import { ProposalPrintDocument } from '@/components/proposal/ProposalPrintDocument'

export const metadata: Metadata = {
  title: 'Proposal — PDF',
  robots: { index: false, follow: false, nosnippet: true },
}

// Renders a clean, print-optimised version of the proposal that the browser
// can "Save as PDF". This is an admin-only export surface — clients view the
// proposal through the personalized portal at /croissantsmoon/proposal/<slug>
// and never see the PDF print page. Unauthenticated requests are sent to login.
export default async function ProposalPrintPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ auto?: string; contactless?: string }>
}) {
  const { slug } = await params
  const { auto, contactless } = await searchParams
  const proposal = await getProposalBySlug(slug)
  if (!proposal) notFound()

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // Admin-only. Send unauthenticated visitors to login, returning here after.
  if (!user) {
    redirect(`/croissantsmoon/login?next=/croissantsmoon/proposal/${slug}/print`)
  }

  return <ProposalPrintDocument proposal={proposal} autoPrint={auto === '1'} contactless={contactless === '1'} />
}
