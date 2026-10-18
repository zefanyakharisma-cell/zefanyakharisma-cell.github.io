import 'server-only'
import { cache } from 'react'
import { publicClient } from '@/lib/supabase/server'
import { supabaseConfigured } from '@/lib/supabase/config'
import type { Lang, PostType, Stream } from './config'

export type TranslationSummary = { lang: Lang; title: string; excerpt: string; reading_minutes: number }
export type Translation = TranslationSummary & { body_html: string }

type PostBase = {
  id: string
  slug: string
  streams: Stream[]
  type: PostType
  published_at: string
  cover_image_url: string | null
  cover_alt: string
  related_project: string | null
  featured: boolean
}
export type PostSummary = PostBase & { translations: Partial<Record<Lang, TranslationSummary>> }
export type Post = PostBase & { translations: Partial<Record<Lang, Translation>> }

const baseColumns = 'id, slug, streams, type, published_at, cover_image_url, cover_alt, related_project, featured'

type Row<T> = PostBase & { post_translations: T[] }

function byLang<T extends { lang: Lang }>(rows: T[]): Partial<Record<Lang, T>> {
  return Object.fromEntries(rows.map(r => [r.lang, r]))
}

function toSummary({ post_translations, ...rest }: Row<TranslationSummary>): PostSummary {
  return { ...rest, translations: byLang(post_translations) }
}

/** Live posts, newest first. Row-level security already hides drafts, future posts and unready translations.
 *  Empty when Supabase is not configured; throws when the database fails, so a failed revalidation keeps the last good page. */
export const fetchPosts = cache(async (): Promise<PostSummary[]> => {
  if (!supabaseConfigured) return []
  const { data, error } = await publicClient()
    .from('posts')
    .select(`${baseColumns}, post_translations (lang, title, excerpt, reading_minutes)`)
    .order('published_at', { ascending: false })
  if (error) throw new Error(`[writing] listing posts failed: ${error.message}`, { cause: error })
  return (data as Row<TranslationSummary>[]).map(toSummary).filter(p => Object.keys(p.translations).length > 0)
})

/** Like fetchPosts, but null when Supabase is not configured or the database cannot be reached,
 *  so pages can say so instead of claiming there is no writing. */
export const listPosts = cache(async (): Promise<PostSummary[] | null> => {
  if (!supabaseConfigured) return null
  try {
    return await fetchPosts()
  } catch (e) {
    console.error(e)
    return null
  }
})

/** Null when Supabase is not configured or there is no such post; throws when the database fails,
 *  so ISR keeps the cached page instead of replacing it with a 404. */
export const getPost = cache(async (slug: string): Promise<Post | null> => {
  if (!supabaseConfigured) return null
  const { data, error } = await publicClient()
    .from('posts')
    .select(`${baseColumns}, post_translations (lang, title, excerpt, reading_minutes, body_html)`)
    .eq('slug', slug)
    .maybeSingle()
  if (error) throw new Error(`[writing] loading post "${slug}" failed: ${error.message}`, { cause: error })
  if (!data) return null
  const { post_translations, ...rest } = data as Row<Translation>
  return { ...rest, translations: byLang(post_translations) }
})

export async function postsForPage(href: string): Promise<PostSummary[]> {
  return ((await listPosts()) ?? []).filter(p => p.related_project === href)
}

/** Posts sharing a stream with this one, then the latest, up to three. */
export async function relatedPosts(post: { id: string; streams: Stream[] }): Promise<PostSummary[]> {
  const others = ((await listPosts()) ?? []).filter(p => p.id !== post.id)
  const overlap = others.filter(p => p.streams.some(s => post.streams.includes(s)))
  return [...overlap, ...others.filter(p => !overlap.includes(p))].slice(0, 3)
}

