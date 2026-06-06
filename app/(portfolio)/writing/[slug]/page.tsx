import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  try {
    const supabase = await createClient()
    const { data } = await supabase
      .from('articles')
      .select('title,excerpt')
      .eq('slug', slug)
      .eq('published', true)
      .maybeSingle()
    if (data) {
      return {
        title: data.title,
        description: data.excerpt || undefined,
        alternates: { canonical: `/writing/${slug}` },
        openGraph: {
          type: 'article',
          title: data.title,
          description: data.excerpt || undefined,
          url: `/writing/${slug}`,
        },
      }
    }
  } catch {}
  return { title: 'Article', alternates: { canonical: `/writing/${slug}` } }
}

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })
  } catch { return '' }
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params

  let article: {
    title: string
    excerpt: string | null
    content_html: string | null
    cover_image_url: string | null
    published_at: string | null
    published: boolean
  } | null = null

  try {
    const supabase = await createClient()
    const { data } = await supabase
      .from('articles')
      .select('title,excerpt,content_html,cover_image_url,published_at,published')
      .eq('slug', slug)
      .eq('published', true)
      .maybeSingle()
    article = data
  } catch {}

  if (!article) notFound()

  const dateLabel = article.published_at ? formatDate(article.published_at) : ''
  const html = article.content_html || '<p><em>This article has no content yet.</em></p>'

  return (
    <div style={{ padding: '48px 24px 64px', background: '#FAFAF8', minHeight: '100vh' }}>
      <div className="max-w-3xl mx-auto">
        <Link
          href="/writing"
          className="inline-flex items-center gap-2 mb-8 text-sm"
          style={{ color: '#767676', textDecoration: 'none' }}
        >
          <ArrowLeft style={{ width: 16, height: 16 }} /> Back to Writing
        </Link>

        {article.cover_image_url && (
          <div style={{ aspectRatio: '16/9', borderRadius: 14, backgroundImage: `url('${article.cover_image_url}')`, backgroundSize: 'cover', backgroundPosition: 'center', marginBottom: 28 }} />
        )}

        <article>
          <h1 className="font-heading font-bold mb-3" style={{ fontSize: 'clamp(2rem,4vw,2.75rem)', lineHeight: 1.12, color: '#1C1C1E', letterSpacing: '-.01em' }}>
            {article.title || 'Untitled'}
          </h1>
          {article.excerpt && (
            <p style={{ fontSize: '1.05rem', color: '#5C5C5C', marginBottom: 18, lineHeight: 1.55 }}>{article.excerpt}</p>
          )}
          {dateLabel && (
            <p className="label-small" style={{ marginBottom: 28 }}>{dateLabel}</p>
          )}
          <div
            className="article-body"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </article>
      </div>
    </div>
  )
}
