'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { generateToken, generateSlug, defaultExpiration } from '@/lib/tokens/generator'
import type { Proposal, ProposalContent, ProposalStatus } from '@/types'

export async function createProposal(data: {
  lead_id: string
  title: string
  template_id?: string
  project_type?: string
  expiration_days?: number
  content?: ProposalContent
  custom_token?: string
}) {
  const supabase = await createClient()
  const { data: lead } = await supabase.from('leads').select('organization').eq('id', data.lead_id).single()
  const slug = generateSlug(lead?.organization ?? data.title)
  const token = data.custom_token?.trim().toUpperCase() || generateToken()
  const expires_at = defaultExpiration(data.expiration_days ?? 14)

  const defaultContent: ProposalContent = {
    sections: [],
    branding: { org_name: lead?.organization },
    ...data.content,
  }

  const { data: proposal, error } = await supabase
    .from('proposals')
    .insert({
      lead_id: data.lead_id,
      slug,
      title: data.title,
      token,
      token_status: 'active',
      status: 'draft',
      expires_at,
      content: defaultContent,
      template_id: data.template_id ?? null,
      views: 0,
      unique_visitors: 0,
      pricing_views: 0,
      cta_clicks: 0,
    })
    .select()
    .single()

  if (error) throw new Error(error.message)
  revalidatePath('/proposals')
  return proposal
}

export async function updateProposal(id: string, data: Partial<Proposal>) {
  const supabase = await createClient()

  const { data: current } = await supabase.from('proposals').select('content, versions:proposal_versions(version_number)').eq('id', id).single()
  const versionNumber = (current?.versions?.length ?? 0) + 1

  if (data.content) {
    await supabase.from('proposal_versions').insert({
      proposal_id: id,
      version_number: versionNumber,
      content: current?.content,
      note: 'Auto-saved before edit',
    })
  }

  const { data: proposal, error } = await supabase
    .from('proposals')
    .update({ ...data, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single()

  if (error) throw new Error(error.message)
  revalidatePath('/proposals')
  revalidatePath(`/proposals/${id}`)
  revalidatePath(`/proposal/${proposal.slug}`)
  return proposal
}

export async function publishProposal(id: string) {
  return updateProposal(id, { status: 'active' })
}

export async function archiveProposal(id: string) {
  return updateProposal(id, { status: 'archived', token_status: 'revoked' })
}

export async function regenerateToken(id: string) {
  const newToken = generateToken()
  return updateProposal(id, { token: newToken, token_status: 'active' })
}

export async function extendExpiration(id: string, days: number) {
  const expires_at = defaultExpiration(days)
  return updateProposal(id, { expires_at, status: 'active', token_status: 'active' })
}

export async function getProposals(filters?: { status?: ProposalStatus; search?: string }) {
  const supabase = await createClient()
  let query = supabase
    .from('proposals')
    .select('*, lead:leads(id, organization, contact_person, email, temperature)')
    .order('created_at', { ascending: false })

  if (filters?.status) query = query.eq('status', filters.status)
  if (filters?.search) query = query.ilike('title', `%${filters.search}%`)

  const { data, error } = await query
  if (error) throw new Error(error.message)
  return data ?? []
}

export async function getProposal(id: string) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('proposals')
    .select('*, lead:leads(*), versions:proposal_versions(*)')
    .eq('id', id)
    .single()
  if (error) throw new Error(error.message)
  return data
}

export async function getProposalBySlug(slug: string) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('proposals')
    .select('*, lead:leads(organization, contact_person)')
    .eq('slug', slug)
    .single()
  if (error) return null
  return data
}

export async function validateProposalToken(slug: string, token: string) {
  const supabase = await createClient()
  const { data } = await supabase
    .from('proposals')
    .select('id, token, token_status, expires_at, status')
    .eq('slug', slug)
    .single()

  if (!data) return { valid: false, reason: 'not_found' as const }
  if (data.status === 'archived') return { valid: false, reason: 'archived' as const }
  if (data.token !== token) return { valid: false, reason: 'invalid_token' as const }
  if (data.token_status !== 'active') return { valid: false, reason: 'revoked' as const }
  if (data.expires_at && new Date(data.expires_at) < new Date()) {
    await supabase.from('proposals').update({ token_status: 'expired' }).eq('id', data.id)
    return { valid: false, reason: 'expired' as const }
  }

  return { valid: true, proposalId: data.id }
}
