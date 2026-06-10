import type { Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { getProposalBySlug } from '@/lib/actions/proposals'
import { createClient } from '@/lib/supabase/server'
import { ProposalPrintDocument } from '@/components/proposal/ProposalPrintDocument'

export const metadata: Metadata = {
  title: 'Proposal — PDF',
  robots: { index: false, follow: false, nosnippet: true },
}

// Renders a clean, print-optimised version of the proposal that the browser
// can "Save as PDF". Access is granted to either:
//   • a client who already unlocked the proposal (cm_access_<slug> cookie), or
//   • an authenticated admin (so the studio can export any proposal).
export default async function ProposalPrintPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ auto?: string }>
}) {
  const { slug } = await params
  const { auto } = await searchParams
  const proposal = await getProposalBySlug(slug)
  if (!proposal) notFound()

  const cookieStore = await cookies()
  const hasClientAccess = cookieStore.get(`cm_access_${slug}`)?.value === 'granted'

  let authorized = hasClientAccess
  if (!authorized) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    authorized = !!user
  }

  // No access → send back to the token gate (the slug page handles the wall).
  if (!authorized) {
    redirect(`/croissantsmoon/proposal/${slug}`)
  }

  return <ProposalPrintDocument proposal={proposal} autoPrint={auto === '1'} />
}
