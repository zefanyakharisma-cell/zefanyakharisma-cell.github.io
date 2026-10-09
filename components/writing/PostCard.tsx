import { Card, Tag } from '@/components/pcu'
import { cn } from '@/lib/utils'
import { formatDate, pick, postPath, postTypes, streams, ui, type Lang } from '@/lib/writing/config'
import type { PostSummary } from '@/lib/writing/posts'

/** Post card for the index, related posts and "Writing about this". Shows `lang`, or the other language when that is all there is. */
export function PostCard({ post, lang, large, className }: { post: PostSummary; lang: Lang; large?: boolean; className?: string }) {
  const shown = pick(post.translations, lang)
  if (!shown) return null
  const { t } = shown
  const both = Boolean(post.translations.en && post.translations.id)
  return (
    <Card href={postPath(post.slug, shown.lang)} image={post.cover_image_url ?? undefined} className={cn('h-full', className)}>
      <span className="text-sm muted">
        {postTypes[post.type][shown.lang]} · {formatDate(post.published_at, shown.lang)} · {t.reading_minutes} {ui[shown.lang].minRead}
      </span>
      <h3 className={cn('m-0 text-midnight', large ? 'h-sub' : 'text-xl leading-snug')} lang={shown.lang}>{t.title}</h3>
      {t.excerpt && <p className={cn('m-0 muted', large && 'lead')} lang={shown.lang}>{t.excerpt}</p>}
      <div className="mt-auto pt-2 flex flex-wrap items-center gap-2">
        {post.streams.map(s => <Tag key={s}>{streams[s][shown.lang]}</Tag>)}
        <Tag outline className="text-midnight">{both ? 'EN · ID' : shown.lang.toUpperCase()}</Tag>
      </div>
    </Card>
  )
}
