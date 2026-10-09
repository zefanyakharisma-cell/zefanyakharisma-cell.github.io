import { notFound } from 'next/navigation'
import { Article } from '@/components/writing/Article'
import { requireAdmin } from '@/lib/supabase/server'
import type { Lang } from '@/lib/writing/config'
import type { Post, Translation } from '@/lib/writing/posts'

export const dynamic = 'force-dynamic'

/** The last saved version, as readers will see it (drafts included). */
export default async function PreviewPost({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<{ lang?: string }> }) {
  const { id } = await params
  const lang: Lang = (await searchParams).lang === 'id' ? 'id' : 'en'
  const { supabase } = await requireAdmin()
  const { data } = await supabase
    .from('posts')
    .select('id, slug, streams, type, published_at, cover_image_url, cover_alt, related_project, featured, post_translations (lang, title, excerpt, reading_minutes, body_html)')
    .eq('id', id)
    .maybeSingle()
  if (!data) notFound()
  const translations = Object.fromEntries((data.post_translations as Translation[]).map(t => [t.lang, t]))
  const post = { ...data, published_at: data.published_at ?? '', translations } as Post
  return (
    <div className="-mx-[clamp(16px,4vw,48px)] -my-10" data-theme="midnight">
      <p className="wrap py-3 m-0 text-sm muted">Preview of the last saved version. Close this tab to return to the editor.</p>
      <Article post={post} lang={lang} preview />
    </div>
  )
}
