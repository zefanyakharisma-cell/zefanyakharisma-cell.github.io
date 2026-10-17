import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Article } from '@/components/writing/Article'
import { JsonLd } from '@/components/seo/JsonLd'
import { langs, postPath, type Lang } from '@/lib/writing/config'
import { getPost, relatedPosts, type Post } from '@/lib/writing/posts'
import { SITE_NAME } from '@/lib/og'
import { PERSON_ID, SITE_URL, absoluteUrl, breadcrumbList } from '@/lib/seo'

export type SlugProps = { params: Promise<{ slug: string }> }

const locales: Record<Lang, string> = { en: 'en_US', id: 'id_ID' }

export async function postMetadata({ params }: SlugProps, lang: Lang): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug)
  const t = post?.translations[lang]
  if (!post || !t) return {}
  const available = langs.filter(l => post.translations[l])
  const languages: Record<string, string> = Object.fromEntries(available.map(l => [l, postPath(slug, l)]))
  languages['x-default'] = postPath(slug, post.translations.en ? 'en' : 'id')
  const description = t.excerpt || undefined
  return {
    title: t.title,
    description,
    alternates: { canonical: postPath(slug, lang), languages },
    openGraph: {
      type: 'article',
      siteName: SITE_NAME,
      url: postPath(slug, lang),
      title: t.title,
      description,
      publishedTime: post.published_at,
      locale: locales[lang],
      alternateLocale: available.filter(l => l !== lang).map(l => locales[l]),
      authors: ['Zefanya Kharisma Nugroho'],
    },
    twitter: { card: 'summary_large_image', title: t.title, description },
  }
}

// BlogPosting + breadcrumb. Posts have no "updated" column yet, so no dateModified.
// The generated share image's URL carries a build hash (opengraph-image-xxxxxx), so only a cover is linked.
function postJsonLd(post: Post, lang: Lang) {
  const t = post.translations[lang]!
  const path = postPath(post.slug, lang)
  const url = absoluteUrl(path)
  const author = { '@id': PERSON_ID, '@type': 'Person', name: 'Zefanya Kharisma Nugroho', url: SITE_URL }
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: t.title,
      ...(t.excerpt && { description: t.excerpt }),
      datePublished: post.published_at,
      inLanguage: lang,
      author,
      publisher: author,
      mainEntityOfPage: { '@type': 'WebPage', '@id': url },
      url,
      ...(post.cover_image_url && { image: post.cover_image_url }),
      isPartOf: { '@type': 'Blog', '@id': absoluteUrl('/writing'), name: 'Writing', url: absoluteUrl('/writing') },
    },
    breadcrumbList(path, t.title),
  ]
}

export async function PostPage({ params }: SlugProps, lang: Lang) {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post?.translations[lang]) notFound()
  return (
    <>
      <JsonLd data={postJsonLd(post, lang)} />
      <Article post={post} lang={lang} related={await relatedPosts(post)} />
    </>
  )
}
