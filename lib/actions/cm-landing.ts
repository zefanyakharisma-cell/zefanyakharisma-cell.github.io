'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { LANDING_DEFAULTS, SEO_DEFAULTS } from '@/lib/cm/landing-defaults'
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

export async function getLandingContent(): Promise<{ content: CMLandingContent; seo: CMLandingSeo }> {
  const supabase = await createClient()
  const { data } = await supabase
    .from('cm_landing')
    .select('content, seo')
    .eq('id', LANDING_ID)
    .maybeSingle()

  return {
    content: merge(LANDING_DEFAULTS, data?.content),
    seo: merge(SEO_DEFAULTS, data?.seo),
  }
}

export async function updateLandingContent(content: CMLandingContent, seo: CMLandingSeo) {
  const supabase = await createClient()
  const { error } = await supabase
    .from('cm_landing')
    .upsert({ id: LANDING_ID, content, seo, updated_at: new Date().toISOString() })

  if (error) throw new Error(error.message)

  revalidatePath('/croissantsmoon')
  revalidatePath('/croissantsmoon/landing')
  return { ok: true }
}
