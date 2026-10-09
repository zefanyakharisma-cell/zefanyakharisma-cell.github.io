'use server'

import type { JSONContent } from '@tiptap/core'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { requireAdmin, sessionClient } from '@/lib/supabase/server'
import { docText, docToHtml, readingMinutes, sanitizeDoc } from '@/lib/writing/content'
import { langs, relatedPages, streamKeys, typeKeys, type Lang, type PostType, type Stream } from '@/lib/writing/config'

export async function signIn(_: { error?: string } | undefined, form: FormData): Promise<{ error?: string }> {
  const supabase = await sessionClient()
  const { error } = await supabase.auth.signInWithPassword({
    email: String(form.get('email') ?? ''),
    password: String(form.get('password') ?? ''),
  })
  if (error) return { error: 'That email and password did not match.' }
  redirect('/admin')
}

export async function signOut() {
  const supabase = await sessionClient()
  await supabase.auth.signOut()
  redirect('/admin/login')
}

export async function createPost() {
  const { supabase } = await requireAdmin()
  const slug = `draft-${Math.random().toString(36).slice(2, 8)}`
  const { data, error } = await supabase.from('posts').insert({ slug }).select('id').single()
  if (error) throw new Error(error.message)
  const { error: tErr } = await supabase.from('post_translations').insert(langs.map(lang => ({ post_id: data.id, lang })))
  if (tErr) throw new Error(tErr.message)
  redirect(`/admin/posts/${data.id}`)
}

export type TranslationInput = { title: string; excerpt: string; body_json: JSONContent; ready: boolean }
export type SaveInput = {
  id: string
  slug: string
  streams: Stream[]
  type: PostType
  status: 'draft' | 'published'
  published_at: string | null
  cover_image_url: string | null
  cover_alt: string
  related_project: string | null
  featured: boolean
  translations: Record<Lang, TranslationInput>
}
export type SaveResult = { ok: true; savedAt: string; published_at: string | null } | { ok: false; error: string }

export async function savePost(payload: string): Promise<SaveResult> {
  const { supabase } = await requireAdmin()
  const input = JSON.parse(payload) as SaveInput

  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(input.slug)) return { ok: false, error: 'The URL slug may only use lowercase letters, numbers and single dashes.' }
  if (!input.streams.every(s => streamKeys.includes(s)) || !typeKeys.includes(input.type)) return { ok: false, error: 'Unknown stream or type.' }
  if (input.related_project && !relatedPages.some(p => p.href === input.related_project)) return { ok: false, error: 'Unknown related page.' }
  if (input.cover_image_url && !/^https:\/\//.test(input.cover_image_url)) return { ok: false, error: 'The cover image must be an https URL.' }
  for (const lang of langs) {
    const t = input.translations[lang]
    if (t.ready && !t.title.trim()) return { ok: false, error: `Give the ${lang === 'en' ? 'English' : 'Indonesian'} version a title before marking it ready.` }
  }
  let published_at = input.published_at
  if (input.status === 'published') {
    if (!langs.some(l => input.translations[l].ready)) return { ok: false, error: 'Mark at least one language as ready before publishing.' }
    published_at ??= new Date().toISOString()
  }

  const { data: before } = await supabase.from('posts').select('slug, related_project').eq('id', input.id).single()

  const { error } = await supabase.from('posts').update({
    slug: input.slug,
    streams: input.streams,
    type: input.type,
    status: input.status,
    published_at,
    cover_image_url: input.cover_image_url,
    cover_alt: input.cover_alt,
    related_project: input.related_project,
    featured: input.featured,
  }).eq('id', input.id)
  if (error) {
    return { ok: false, error: error.code === '23505' ? 'Another post already uses that URL slug.' : error.message }
  }

  const rows = langs.map(lang => {
    const t = input.translations[lang]
    const doc = sanitizeDoc(t.body_json)
    return {
      post_id: input.id,
      lang,
      title: t.title.trim(),
      excerpt: t.excerpt.trim(),
      body_json: doc,
      body_html: docToHtml(doc),
      reading_minutes: readingMinutes(docText(doc)),
      ready: t.ready,
    }
  })
  const { error: tErr } = await supabase.from('post_translations').upsert(rows)
  if (tErr) return { ok: false, error: tErr.message }

  if (input.featured) {
    await supabase.from('posts').update({ featured: false }).neq('id', input.id).eq('featured', true)
  }

  revalidatePath('/writing', 'layout')
  revalidatePath('/sitemap.xml')
  for (const page of new Set([before?.related_project, input.related_project])) if (page) revalidatePath(page)

  return { ok: true, savedAt: new Date().toISOString(), published_at }
}

export async function deletePost(id: string) {
  const { supabase } = await requireAdmin()
  const { data: before } = await supabase.from('posts').select('related_project').eq('id', id).single()
  const { data: files } = await supabase.storage.from('post-images').list(id)
  if (files?.length) await supabase.storage.from('post-images').remove(files.map(f => `${id}/${f.name}`))
  await supabase.from('posts').delete().eq('id', id)
  revalidatePath('/writing', 'layout')
  revalidatePath('/sitemap.xml')
  if (before?.related_project) revalidatePath(before.related_project)
  redirect('/admin')
}
