'use server'

import { createClient, createServiceClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import type { CMLocale } from '@/lib/cm/i18n'
import type { CMProjectRow, CMProjectCard, CMProjectType } from '@/types'

// Resolve a stored row for one locale: ID copy when present, else EN fallback.
function resolveCard(row: CMProjectRow, locale: CMLocale): CMProjectCard {
  const pick = (en: string, id: string | null) =>
    locale === 'id' && id && id.trim() ? id : en
  return {
    id: row.id,
    title: pick(row.title_en, row.title_id),
    outcome: pick(row.outcome_en, row.outcome_id),
    type: row.type,
    imageUrl: row.image_url,
    linkUrl: row.link_url,
    isFeatured: row.is_featured,
  }
}

// Public: visible projects in display order, resolved for the active locale.
// Feeds both the hero carousel caption and the §3 grid (single source of truth).
export async function getProjects(locale: CMLocale = 'en'): Promise<CMProjectCard[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('cm_projects')
    .select('*')
    .eq('is_visible', true)
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: true })

  if (error) {
    console.error('[cm-projects] fetch failed:', error.message)
    return []
  }
  return ((data as CMProjectRow[] | null) ?? []).map((r) => resolveCard(r, locale))
}

// Admin: every project (incl. hidden), raw rows for editing.
export async function getAllProjects(): Promise<CMProjectRow[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('cm_projects')
    .select('*')
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: true })

  if (error) throw new Error(error.message)
  return (data as CMProjectRow[] | null) ?? []
}

export interface CMProjectInput {
  id?: string
  title_en: string
  title_id: string | null
  outcome_en: string
  outcome_id: string | null
  type: CMProjectType
  image_url: string | null
  link_url: string | null
  sort_order: number
  is_featured: boolean
  is_visible: boolean
}

function revalidateProjects() {
  revalidatePath('/croissantsmoon/en')
  revalidatePath('/croissantsmoon/id')
  revalidatePath('/croissantsmoon/projects')
}

// Admin: replace the full project set in one transaction-like upsert. Writes
// go through the service client (mirrors the rest of the CM admin), so RLS
// stays admin-only. Rows absent from `projects` are deleted.
export async function saveProjects(projects: CMProjectInput[]) {
  const supabase = await createServiceClient()

  const keepIds = projects.filter((p) => p.id).map((p) => p.id as string)
  // Delete rows the editor removed.
  if (keepIds.length > 0) {
    await supabase.from('cm_projects').delete().not('id', 'in', `(${keepIds.join(',')})`)
  } else {
    await supabase.from('cm_projects').delete().neq('id', '00000000-0000-0000-0000-000000000000')
  }

  const rows = projects.map((p, i) => ({
    ...(p.id ? { id: p.id } : {}),
    title_en: p.title_en,
    title_id: p.title_id,
    outcome_en: p.outcome_en,
    outcome_id: p.outcome_id,
    type: p.type,
    image_url: p.image_url,
    link_url: p.link_url,
    sort_order: i,
    is_featured: p.is_featured,
    is_visible: p.is_visible,
  }))

  if (rows.length > 0) {
    const { error } = await supabase.from('cm_projects').upsert(rows)
    if (error) throw new Error(error.message)
  }

  revalidateProjects()
  return { ok: true }
}
