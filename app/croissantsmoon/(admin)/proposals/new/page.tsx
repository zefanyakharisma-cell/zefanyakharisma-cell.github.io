import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import { NewProposalForm } from '@/components/admin/NewProposalForm'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export const metadata: Metadata = { title: 'New Proposal' }

async function getLeadsAndTemplates() {
  const supabase = await createClient()
  const [{ data: leads }, { data: templates }] = await Promise.all([
    supabase.from('leads').select('id, organization, contact_person').neq('status', 'archived').order('organization'),
    supabase.from('proposal_templates').select('id, name, project_type').eq('is_archived', false),
  ])
  return { leads: leads ?? [], templates: templates ?? [] }
}

export default async function NewProposalPage({ searchParams }: { searchParams: Promise<{ lead?: string }> }) {
  const { lead: preselectedLead } = await searchParams
  const { leads, templates } = await getLeadsAndTemplates()

  return (
    <div className="px-8 py-8 animate-cm-fade-in">
      <Link href="/croissantsmoon/proposals" className="flex items-center gap-2 text-sm text-cm-subtle hover:text-cm-text transition-colors mb-6">
        <ArrowLeft size={14} /> Back to Proposals
      </Link>
      <div className="max-w-2xl">
        <h1 className="text-2xl font-semibold text-cm-white mb-1">New Proposal</h1>
        <p className="text-sm text-cm-subtle mb-8">Create a personalized proposal portal for a lead.</p>
        <NewProposalForm leads={leads} templates={templates} preselectedLead={preselectedLead} />
      </div>
    </div>
  )
}
