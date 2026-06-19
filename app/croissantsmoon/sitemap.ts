import type { MetadataRoute } from 'next'

// Localized sitemap for the CroissantsMoon microsite → /croissantsmoon/sitemap.xml.
// Each locale entry carries reciprocal hreflang alternates (x-default → EN).
const BASE = 'https://zefanyakharisma.com/croissantsmoon'

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = {
    en: `${BASE}/en`,
    id: `${BASE}/id`,
    'x-default': `${BASE}/en`,
  }
  const now = new Date()
  return [
    { url: `${BASE}/en`, lastModified: now, changeFrequency: 'monthly', priority: 1, alternates: { languages } },
    { url: `${BASE}/id`, lastModified: now, changeFrequency: 'monthly', priority: 1, alternates: { languages } },
  ]
}
