import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import type { JSONContent } from '@tiptap/core'
import { PostEditor } from '@/components/writing/admin/PostEditor'
import { requireAdmin } from '@/lib/supabase/server'
import type { Lang } from '@/lib/writing/config'
import type { SaveInput, TranslationInput } from '../../actions'

export const dynamic = 'force-dynamic'

export default async function EditPost({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const { supabase } = await requireAdmin()
  const { data } = await supabase
    .from('posts')
    .select('id, slug, streams, type, status, published_at, cover_image_url, cover_alt, related_project, featured, post_translations (lang, title, excerpt, body_json, ready)')
    .eq('id', id)
    .maybeSingle()
  if (!data) notFound()

  const empty: TranslationInput = { title: '', excerpt: '', body_json: { type: 'doc', content: [] }, ready: false }
  const rows = data.post_translations as (TranslationInput & { lang: Lang; body_json: JSONContent })[]
  const t = (lang: Lang) => {
    const row = rows.find(r => r.lang === lang)
    return row ? { title: row.title, excerpt: row.excerpt, body_json: row.body_json, ready: row.ready } : empty
  }
  const initial: SaveInput = {
    id: data.id,
    slug: data.slug,
    streams: data.streams,
    type: data.type,
    status: data.status,
    published_at: data.published_at,
    cover_image_url: data.cover_image_url,
    cover_alt: data.cover_alt,
    related_project: data.related_project,
    featured: data.featured,
    translations: { en: t('en'), id: t('id') },
  }

  return (
    <div className="flex flex-col gap-6">
      <Link href="/admin" className="inline-flex items-center gap-2 self-start"><ArrowLeft aria-hidden size={16} /> All posts</Link>
      <PostEditor initial={initial} />
    </div>
  )
}
