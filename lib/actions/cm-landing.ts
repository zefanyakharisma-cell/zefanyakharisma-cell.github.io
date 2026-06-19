'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { LANDING_DEFAULTS, SEO_DEFAULTS } from '@/lib/cm/landing-defaults'
import { LANDING_DEFAULTS_ID } from '@/lib/cm/landing-defaults-id'
import type { CMLocale } from '@/lib/cm/i18n'
import type { CMLandingContent, CMLandingSeo } from '@/types'

const LANDING_ID = 'singleton'

// Shallow-per-section merge: stored values win, but any section/field
// missing from the DB row falls back to the hardcoded defaults. Arrays
// are taken wholesale from the stored value when present (the editor
// always writes complete arrays), otherwise from defaults.
function merge<T>(base: T, override: unknown): T {
  if (override === null || override === undefined) return base
  if (typeof base !== 'object' || base === null || Array.isArray(base) || typeof override !== 'object' || Array.isArray(override)) {
    return override as T
  }
  const out: Record<string, unknown> = { ...(base as Record<string, unknown>) }
  const ovRecord = override as Record<string, unknown>
  const baseRecord = base as Record<string, unknown>
  for (const key of Object.keys(ovRecord)) {
    const ov = ovRecord[key]
    if (ov === undefined || ov === null) continue
    if (Array.isArray(ov) || Array.isArray(baseRecord[key])) {
      out[key] = ov
    } else if (typeof ov === 'object' && typeof baseRecord[key] === 'object') {
      out[key] = merge(baseRecord[key], ov)
    } else {
      out[key] = ov
    }
  }
  return out as T
}

// Resolve the landing content for one locale.
//
// EN  =  LANDING_DEFAULTS              <- cm_landing.content        (admin EN)
// ID  =  (resolved EN, as fallback)    <- LANDING_DEFAULTS_ID       (hardcoded ID)
//                                       <- cm_landing.content_id     (admin ID)
//
// So for ID, any field with no Indonesian translation anywhere falls back to the
// resolved English value — the page is never blank. content_id is the additive
// document-per-locale column added in the redesign migration.
export async function getLandingContent(
  locale: CMLocale = 'en',
): Promise<{ content: CMLandingContent; seo: CMLandingSeo }> {
  const supabase = await createClient()
  const { data } = await supabase
    .from('cm_landing')
    .select('content, seo, content_id')
    .eq('id', LANDING_ID)
    .maybeSingle()

  const en = merge(LANDING_DEFAULTS, data?.content)
  const content =
    locale === 'id'
      ? merge(merge(en, LANDING_DEFAULTS_ID), data?.content_id)
      : en

  return { content, seo: merge(SEO_DEFAULTS, data?.seo) }
}

// Fetch both language documents as authored (no cross-locale fallback) so the
// admin can edit them side by side and surface "missing ID" gaps.
export async function getLandingContentBoth(): Promise<{
  contentEn: CMLandingContent
  contentId: CMLandingContent
  seo: CMLandingSeo
}> {
  const supabase = await createClient()
  const { data } = await supabase
    .from('cm_landing')
    .select('content, seo, content_id')
    .eq('id', LANDING_ID)
    .maybeSingle()

  return {
    contentEn: merge(LANDING_DEFAULTS, data?.content),
    contentId: merge(LANDING_DEFAULTS_ID, data?.content_id),
    seo: merge(SEO_DEFAULTS, data?.seo),
  }
}

export async function updateLandingContent(
  content: CMLandingContent,
  seo: CMLandingSeo,
  contentId?: CMLandingContent,
) {
  const supabase = await createClient()
  const row: Record<string, unknown> = {
    id: LANDING_ID,
    content,
    seo,
    updated_at: new Date().toISOString(),
  }
  if (contentId !== undefined) row.content_id = contentId

  const { error } = await supabase.from('cm_landing').upsert(row)

  if (error) throw new Error(error.message)

  revalidatePath('/croissantsmoon')
  revalidatePath('/croissantsmoon/en')
  revalidatePath('/croissantsmoon/id')
  revalidatePath('/croissantsmoon/landing')
  return { ok: true }
}
