import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Linkedin, Mail, MessageCircle } from 'lucide-react'
import { Card, PageHero, SectionHead } from '@/components/pcu'
import { withHeadingIds } from '@/lib/writing/headings'
import { formatDate, postPath, postTypes, relatedPageLabel, streams, ui, type Lang } from '@/lib/writing/config'
import type { Post, PostSummary } from '@/lib/writing/posts'
import { PostCard } from './PostCard'

const SITE_URL = 'https://zefanyakharisma.com'

/** One post in one language. Used by the public pages and the admin preview. */
export function Article({ post, lang, related = [], preview }: { post: Post; lang: Lang; related?: PostSummary[]; preview?: boolean }) {
  const t = post.translations[lang]
  if (!t) return null
  const other: Lang = lang === 'en' ? 'id' : 'en'
  const hasOther = Boolean(post.translations[other])
  const { html, toc } = withHeadingIds(t.body_html)
  const url = `${SITE_URL}${postPath(post.slug, lang)}`
  const relatedLabel = relatedPageLabel(post.related_project)
  const copy = ui[lang]

  return (
    <article lang={lang}>
      <PageHero
        back={preview ? undefined : { href: '/writing', label: copy.back }}
        tags={[postTypes[post.type][lang], ...post.streams.map(s => streams[s][lang])]}
        title={t.title}
        lead={t.excerpt || undefined}
      >
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-smoke">
          <span>{post.published_at ? formatDate(post.published_at, lang) : 'Not scheduled'} · {t.reading_minutes} {copy.minRead}</span>
          {hasOther && !preview ? (
            <Link href={postPath(post.slug, other)} className="pcu-btn pcu-btn--inverse" hrefLang={other} lang={other}>{copy.readIn}</Link>
          ) : !hasOther ? (
            <span className="text-sm" lang={other}>{copy.translationPending}</span>
          ) : null}
        </div>
      </PageHero>

      <section className="section">
        <div className="wrap">
          {post.cover_image_url && (
            <div className="relative aspect-[16/9] max-w-[960px] mx-auto mb-12 overflow-hidden rounded-md bg-smoke">
              <Image src={post.cover_image_url} alt={post.cover_alt} fill priority sizes="(min-width: 1024px) 960px, 100vw" className="object-cover" />
            </div>
          )}
          <div className="article-layout">
            {toc.length >= 3 && (
              <nav className="article-toc" aria-label={copy.contents}>
                <span className="pcu-eyebrow">{copy.contents}</span>
                <ol>
                  {toc.map(h => (
                    <li key={h.id} className={h.level === 3 ? 'pl-4' : undefined}><a href={`#${h.id}`}>{h.text}</a></li>
                  ))}
                </ol>
              </nav>
            )}
            <div className="article-body" dangerouslySetInnerHTML={{ __html: html }} />
          </div>

          {!preview && (
            <div className="article-share">
              <span className="pcu-eyebrow">{copy.share}</span>
              <div className="flex flex-wrap gap-2">
                <a className="pcu-btn pcu-btn--outline" target="_blank" rel="noopener noreferrer" href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`}>
                  <Linkedin aria-hidden size={16} /> LinkedIn
                </a>
                <a className="pcu-btn pcu-btn--outline" target="_blank" rel="noopener noreferrer" href={`https://wa.me/?text=${encodeURIComponent(`${t.title} ${url}`)}`}>
                  <MessageCircle aria-hidden size={16} /> WhatsApp
                </a>
                <a className="pcu-btn pcu-btn--outline" href={`mailto:?subject=${encodeURIComponent(t.title)}&body=${encodeURIComponent(url)}`}>
                  <Mail aria-hidden size={16} /> Email
                </a>
              </div>
            </div>
          )}
        </div>
      </section>

      {(relatedLabel || related.length > 0) && (
        <section className="section section--smoke">
          <div className="wrap flex flex-col gap-12">
            {relatedLabel && post.related_project && (
              <Card tone="theme" href={post.related_project} bodyClassName="!flex-row flex-wrap justify-between items-center !gap-6">
                <div className="flex flex-col gap-2">
                  <span className="pcu-eyebrow text-amber">{copy.about}</span>
                  <h2 className="h-sub text-white m-0">{relatedLabel}</h2>
                </div>
                <span className="pcu-btn pcu-btn--accent">{relatedLabel} <ArrowRight aria-hidden size={16} /></span>
              </Card>
            )}
            {related.length > 0 && (
              <div>
                <SectionHead title={copy.related} size="sub" />
                <div className="grid-3">
                  {related.map(p => <PostCard key={p.id} post={p} lang={lang} />)}
                </div>
              </div>
            )}
          </div>
        </section>
      )}
    </article>
  )
}
