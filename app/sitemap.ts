import type { MetadataRoute } from 'next'
import { allRoutes } from '@/lib/nav'
import { absoluteUrl } from '@/lib/seo'
import { langs, postPath, type Lang } from '@/lib/writing/config'
import { fetchPosts } from '@/lib/writing/posts'

export const revalidate = 3600

// Static pages change only on deploy, so build time is their last change.
const builtAt = new Date()

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages: MetadataRoute.Sitemap = allRoutes.map(route => ({
    url: absoluteUrl(route),
    lastModified: builtAt,
    changeFrequency: 'monthly',
    priority: route === '/' ? 1 : 0.7,
  }))
  const posts = await fetchPosts()
  const writing: MetadataRoute.Sitemap = posts.flatMap(post => {
    const available = langs.filter(l => post.translations[l])
    // hreflang pairs only when both translations are live
    const alternates = available.length > 1
      ? { languages: Object.fromEntries(available.map(l => [l, absoluteUrl(postPath(post.slug, l))])) }
      : undefined
    return available.map((lang: Lang) => ({
      url: absoluteUrl(postPath(post.slug, lang)),
      lastModified: post.published_at,
      changeFrequency: 'yearly' as const,
      priority: 0.6,
      ...(alternates && { alternates }),
    }))
  })
  return [...pages, ...writing]
}
