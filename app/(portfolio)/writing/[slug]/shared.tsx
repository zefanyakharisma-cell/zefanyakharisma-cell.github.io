import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Article } from '@/components/writing/Article'
import { postPath, type Lang } from '@/lib/writing/config'
import { getPost, relatedPosts } from '@/lib/writing/posts'

export type SlugProps = { params: Promise<{ slug: string }> }

export async function postMetadata({ params }: SlugProps, lang: Lang): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug)
  const t = post?.translations[lang]
  if (!post || !t) return {}
  const languages = Object.fromEntries(
    (Object.keys(post.translations) as Lang[]).map(l => [l, postPath(slug, l)]),
  )
  return {
    title: t.title,
    description: t.excerpt || undefined,
    alternates: { canonical: postPath(slug, lang), languages },
    openGraph: {
      type: 'article',
      title: t.title,
      description: t.excerpt || undefined,
      publishedTime: post.published_at,
      locale: lang === 'en' ? 'en_US' : 'id_ID',
      authors: ['Zefanya Kharisma Nugroho'],
    },
  }
}

export async function PostPage({ params }: SlugProps, lang: Lang) {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post?.translations[lang]) notFound()
  return <Article post={post} lang={lang} related={await relatedPosts(post)} />
}
