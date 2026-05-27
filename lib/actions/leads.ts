'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { generateToken, defaultExpiration } from '@/lib/tokens/generator'
import type { Lead, LeadStatus } from '@/types'
import { z } from 'zod'

const LeadSchema = z.object({
  organization: z.string().min(1),
  contact_person: z.string().min(1),
  email: z.string().email(),
  industry: z.string().optional(),
  website: z.string().url().optional().or(z.literal('')),
  project_type: z.string(),
  estimated_value: z.number().optional(),
  notes: z.string().optional(),
  status: z.string().optional(),
})

export async function createLead(data: z.infer<typeof LeadSchema>) {
  const supabase = await createClient()
  const parsed = LeadSchema.parse(data)

  const { data: lead, error } = await supabase
    .from('leads')
    .insert({ ...parsed, status: 'lead_identified', temperature: 'cold', engagement_score: 0 })
    .select()
    .single()

  if (error) throw new Error(error.message)
  revalidatePath('/leads')
  return lead
}

export async function updateLead(id: string, data: Partial<Lead>) {
  const supabase = await createClient()
  const { data: lead, error } = await supabase
    .from('leads')
    .update({ ...data, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single()

  if (error) throw new Error(error.message)
  revalidatePath('/leads')
  revalidatePath(`/leads/${id}`)
  return lead
}

export async function updateLeadStatus(id: string, status: LeadStatus) {
  return updateLead(id, { status })
}

export async function deleteLead(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('leads').update({ status: 'archived' }).eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/leads')
}

export async function getLeads(filters?: { status?: LeadStatus; search?: string }) {
  const supabase = await createClient()
  let query = supabase
    .from('leads')
    .select('*, proposals(id, slug, status, token_status, views, expires_at)')
    .order('created_at', { ascending: false })

  if (filters?.status) query = query.eq('status', filters.status)
  if (filters?.search) query = query.ilike('organization', `%${filters.search}%`)

  const { data, error } = await query
  if (error) throw new Error(error.message)
  return data ?? []
}

export async function getLead(id: string) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('leads')
    .select('*, proposals(*), followups(*)')
    .eq('id', id)
    .single()

  if (error) throw new Error(error.message)
  return data
}

export async function recalculateEngagementScore(leadId: string) {
  const supabase = await createClient()
  const { data: proposals } = await supabase
    .from('proposals')
    .select('views, pricing_views, unique_visitors, cta_clicks')
    .eq('lead_id', leadId)

  let score = 0
  if (proposals && proposals.length > 0) {
    const p = proposals[0]
    if (p.views > 0) score += 10
    if (p.views > 2) score += 20
    if (p.pricing_views > 0) score += 30
    if (p.unique_visitors > 1) score += 20
    if (p.cta_clicks > 0) score += 50
  }

  const temperature = score >= 80 ? 'hot' : score >= 30 ? 'warm' : 'cold'

  await supabase
    .from('leads')
    .update({ engagement_score: score, temperature })
    .eq('id', leadId)
}
