import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'

export const metadata: Metadata = {
  title: 'Writing — Zefanya Kharisma Nugroho',
  description: 'Ideas, reflections, and perspectives — essays on international education, leadership, systems thinking, and digital craft.',
}

type Article = {
  id: string
  slug: string
  title: string
  excerpt: string | null
  cover_image_url: string | null
  published_at: string | null
  updated_at: string | null
  published: boolean
}

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })
  } catch { return '' }
}

export default async function WritingPage() {
  let articles: Article[] = []
  try {
    const supabase = await createClient()
    const { data } = await supabase
      .from('articles')
      .select('id,slug,title,excerpt,cover_image_url,published_at,updated_at,published')
      .eq('published', true)
      .order('published_at', { ascending: false })
    articles = (data || []) as Article[]
  } catch {
    // Graceful fallback — show empty state
  }

  return (
    <div style={{ background: '#FAFAF8', minHeight: '100vh' }}>

      {/* ── Header ── */}
      <div style={{ padding: '64px 24px 48px', borderBottom: '1px solid rgba(28,28,30,0.07)', background: '#FAFAF8' }}>
        <div className="max-w-5xl mx-auto">
          <Link href="/" className="inline-flex items-center gap-2 mb-10 text-sm" style={{ color: '#767676', textDecoration: 'none' }}>
            <ArrowLeft style={{ width: 16, height: 16 }} /> Back
          </Link>
          <div className="flex items-center gap-3 mb-6"><span className="accent-line" /><span className="label-small">Writing</span></div>
          <h1 className="font-heading font-bold mb-4" style={{ fontSize: 'clamp(2.2rem,5vw,3.5rem)', lineHeight: 1.05, color: '#1C1C1E', letterSpacing: '-.02em' }}>
            Ideas, Reflections<br /><em style={{ fontStyle: 'italic', color: '#8B7355' }}>&amp; Perspectives</em>
          </h1>
          <p className="text-base leading-relaxed max-w-2xl" style={{ color: '#5C5C5C' }}>A digital journal — essays, reflections, and insights on international education, leadership, systems thinking, digital craft, and the intersections between them.</p>
        </div>
      </div>

      {/* ── Article Grid ── */}
      <div style={{ padding: '48px 24px 64px', background: '#FAFAF8' }}>
        <div className="max-w-5xl mx-auto">
          {articles.length === 0 ? (
            <p style={{ color: '#5C5C5C', fontSize: '.92rem' }}>No published articles yet. Check back soon.</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map(a => {
                const dateLabel = a.published_at ? formatDate(a.published_at) : (a.updated_at ? `Updated ${formatDate(a.updated_at)}` : '')
                return (
                  <Link
                    key={a.id}
                    href={`/writing/${a.slug}`}
                    className="article-card card p-7 rounded-xl flex flex-col gap-1.5"
                    style={{ background: '#fff', border: '1px solid rgba(28,28,30,0.08)', textDecoration: 'none', display: 'flex', flexDirection: 'column', gap: 6 }}
                  >
                    {a.cover_image_url && (
                      <div style={{ height: 160, borderRadius: 10, backgroundImage: `url('${a.cover_image_url}')`, backgroundSize: 'cover', backgroundPosition: 'center', marginBottom: 14 }} />
                    )}
                    <div className="flex items-center justify-between mb-2">
                      <div className="label-small" style={{ color: '#5C5C5C' }}>Article</div>
                      <span style={{ fontSize: '.62rem', fontWeight: 600, letterSpacing: '.08em', textTransform: 'uppercase', padding: '3px 8px', borderRadius: 999, background: 'rgba(46,139,87,0.12)', color: '#1F6A3C' }}>Published</span>
                    </div>
                    <h3 className="font-heading font-semibold text-lg leading-snug mb-2" style={{ color: '#1C1C1E' }}>{a.title || 'Untitled'}</h3>
                    {a.excerpt && <p className="text-sm leading-relaxed mb-3" style={{ color: '#5C5C5C' }}>{a.excerpt}</p>}
                    <div className="flex items-center justify-between mt-auto">
                      <span className="label-small">{dateLabel}</span>
                      <div className="flex items-center gap-1" style={{ color: '#8B7355' }}>
                        <span style={{ fontSize: '.7rem', fontWeight: 600 }}>Read</span>
                        <ArrowRight style={{ width: 12, height: 12 }} />
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          )}
        </div>
      </div>

    </div>
  )
}
