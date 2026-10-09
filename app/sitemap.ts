import type { MetadataRoute } from 'next'
import { allRoutes } from '@/lib/nav'
import { postPath, type Lang } from '@/lib/writing/config'
import { listPosts } from '@/lib/writing/posts'

const SITE_URL = 'https://zefanyakharisma.com'

export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages: MetadataRoute.Sitemap = allRoutes.map(route => ({
    url: `${SITE_URL}${route === '/' ? '' : route}`,
    changeFrequency: 'monthly',
    priority: route === '/' ? 1 : 0.7,
  }))
  const posts = (await listPosts()) ?? []
  const writing: MetadataRoute.Sitemap = posts.flatMap(post =>
    (Object.keys(post.translations) as Lang[]).map(lang => ({
      url: `${SITE_URL}${postPath(post.slug, lang)}`,
      lastModified: post.published_at,
      changeFrequency: 'yearly' as const,
      priority: 0.6,
    })),
  )
  return [...pages, ...writing]
}
