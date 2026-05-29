'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import type { ProposalBlock, ProjectType } from '@/types'

export async function createTemplate(data: {
  name: string
  description?: string | null
  project_type: string
}) {
  const supabase = await createClient()
  const { data: template, error } = await supabase
    .from('proposal_templates')
    .insert({ ...data, blocks: [], placeholders: {}, is_archived: false })
    .select()
    .single()
  if (error) throw new Error(error.message)
  revalidatePath('/templates')
  return template
}

export async function updateTemplate(id: string, data: {
  name?: string
  description?: string | null
  project_type?: ProjectType
  blocks?: ProposalBlock[]
}) {
  const supabase = await createClient()
  const { error } = await supabase
    .from('proposal_templates')
    .update({ ...data, updated_at: new Date().toISOString() })
    .eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/templates')
  revalidatePath(`/templates/${id}`)
}

export async function archiveTemplate(id: string) {
  const supabase = await createClient()
  const { error } = await supabase
    .from('proposal_templates')
    .update({ is_archived: true })
    .eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/templates')
}

export async function deleteTemplate(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('proposal_templates').delete().eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/templates')
}
