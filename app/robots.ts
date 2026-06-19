import type { MetadataRoute } from 'next'

// Site-wide robots.txt. Public pages are crawlable; the CroissantsMoon admin,
// auth, API and token-gated proposal routes are kept out of the index.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/croissantsmoon/dashboard',
          '/croissantsmoon/leads',
          '/croissantsmoon/proposals',
          '/croissantsmoon/templates',
          '/croissantsmoon/archive',
          '/croissantsmoon/landing',
          '/croissantsmoon/projects',
          '/croissantsmoon/login',
          '/croissantsmoon/proposal',
          '/croissantsmoon/api/',
        ],
      },
    ],
    sitemap: 'https://zefanyakharisma.com/croissantsmoon/sitemap.xml',
    host: 'https://zefanyakharisma.com',
  }
}
