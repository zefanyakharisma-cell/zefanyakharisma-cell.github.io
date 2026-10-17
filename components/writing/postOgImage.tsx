import { ogCard } from '@/components/og/OgCard'
import { postPath, postTypes, streams, type Lang } from '@/lib/writing/config'
import { getPost } from '@/lib/writing/posts'

export { ogSize } from '@/components/og/OgCard'

/** Share image for a post: the site's share card with the post title, and its cover photo when it has one. */
export async function postOgImage(slug: string, lang: Lang) {
  const post = await getPost(slug)
  const t = post?.translations[lang] ?? post?.translations[lang === 'en' ? 'id' : 'en']
  const eyebrow = post ? [postTypes[post.type][lang], ...post.streams.map(s => streams[s][lang])].join(' · ') : 'Writing'
  return ogCard({
    theme: 'midnight',
    eyebrow,
    title: t?.title ?? 'Writing',
    stat: t?.reading_minutes ? { value: String(t.reading_minutes), label: lang === 'en' ? 'min read' : 'menit baca' } : undefined,
    photo: post?.cover_image_url ?? undefined,
    path: post ? postPath(slug, lang) : '/writing',
  })
}
