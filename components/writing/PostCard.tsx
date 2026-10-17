import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Card, Shape, Tag } from '@/components/pcu'
import { cn } from '@/lib/utils'
import { formatDate, pick, postPath, postTypes, streams, ui, type Lang } from '@/lib/writing/config'
import type { PostSummary } from '@/lib/writing/posts'

/** Post card for the index, related posts and "Writing about this". Shows `lang`, or the other language when that is all there is.
 *  `large` is the featured layout: cover (or the section gradient) beside the text. */
export function PostCard({ post, lang, large, className }: { post: PostSummary; lang: Lang; large?: boolean; className?: string }) {
  const shown = pick(post.translations, lang)
  if (!shown) return null
  const { t } = shown
  const both = Boolean(post.translations.en && post.translations.id)
  const meta = `${postTypes[post.type][shown.lang]} · ${formatDate(post.published_at, shown.lang)} · ${t.reading_minutes} ${ui[shown.lang].minRead}`
  const tags = (
    <div className="mt-auto pt-2 flex flex-wrap items-center gap-2">
      {post.streams.map(s => <Tag key={s}>{streams[s][shown.lang]}</Tag>)}
      <Tag outline className="text-midnight">{both ? 'EN · ID' : shown.lang.toUpperCase()}</Tag>
    </div>
  )

  if (large) {
    return (
      <Link href={postPath(post.slug, shown.lang)} className={cn('post-feature pcu-card no-underline', className)}>
        <div className="post-feature__media theme-surface">
          {post.cover_image_url ? (
            <Image src={post.cover_image_url} alt="" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
          ) : (
            <Shape kind="ring-u" color="white" className="w-1/2 left-1/4 bottom-0 opacity-90" />
          )}
        </div>
        <div className="post-feature__body">
          <span className="pcu-eyebrow">Featured</span>
          <span className="text-sm muted">{meta}</span>
          <h3 className="m-0 h-sub text-midnight" lang={shown.lang}>{t.title}</h3>
          {t.excerpt && <p className="m-0 lead" lang={shown.lang}>{t.excerpt}</p>}
          {tags}
          <span className="inline-flex items-center gap-2 font-semibold text-midnight">
            {shown.lang === 'en' ? 'Read' : 'Baca'} <ArrowRight aria-hidden size={16} />
          </span>
        </div>
      </Link>
    )
  }

  return (
    <Card href={postPath(post.slug, shown.lang)} image={post.cover_image_url ?? undefined} className={cn('h-full', className)}>
      <span className="text-sm muted">{meta}</span>
      <h3 className="m-0 text-midnight text-xl leading-snug" lang={shown.lang}>{t.title}</h3>
      {t.excerpt && <p className="m-0 muted line-clamp-3" lang={shown.lang}>{t.excerpt}</p>}
      {tags}
    </Card>
  )
}
