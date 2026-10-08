import type { MetadataRoute } from 'next'
import { allRoutes } from '@/lib/nav'

const SITE_URL = 'https://zefanyakharisma.com'

export default function sitemap(): MetadataRoute.Sitemap {
  return allRoutes.map(route => ({
    url: `${SITE_URL}${route === '/' ? '' : route}`,
    changeFrequency: 'monthly',
    priority: route === '/' ? 1 : 0.7,
  }))
}
