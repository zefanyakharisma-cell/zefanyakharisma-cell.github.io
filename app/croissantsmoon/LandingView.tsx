import type { Metadata } from 'next'
import StudioLanding from './StudioLanding'
import { getLandingContent } from '@/lib/actions/cm-landing'
import type { CMLocale } from '@/lib/cm/i18n'

const SITE = 'https://zefanyakharisma.com'
const BASE = `${SITE}/croissantsmoon`

const localeUrl = (l: CMLocale) => `${BASE}/${l}`

// Reciprocal hreflang map shared by both locale routes (+ x-default → EN).
const LANGUAGES: Record<string, string> = {
  en: localeUrl('en'),
  id: localeUrl('id'),
  'x-default': localeUrl('en'),
}

// Localized <head> for a locale route. Copy comes from the resolved (fallback-
// applied) content for that locale; alternates wire reciprocal hreflang.
export async function buildLandingMetadata(locale: CMLocale): Promise<Metadata> {
  const { seo } = await getLandingContent(locale)
  return {
    title: seo.title,
    description: seo.description,
    applicationName: 'CroissantsMoon',
    authors: [{ name: 'Zefanya Kharisma Nugroho', url: SITE }],
    keywords: seo.keywords,
    creator: 'Zefanya Kharisma Nugroho',
    publisher: 'CroissantsMoon',
    alternates: {
      canonical: localeUrl(locale),
      languages: LANGUAGES,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      type: 'website',
      locale: locale === 'id' ? 'id_ID' : 'en_US',
      alternateLocale: locale === 'id' ? 'en_US' : 'id_ID',
      url: localeUrl(locale),
      siteName: 'CroissantsMoon',
      title: seo.ogTitle,
      description: seo.ogDescription,
      images: [{ url: seo.ogImage, width: 1200, height: 630, alt: seo.ogTitle }],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@zefanyakharisma',
      creator: '@zefanyakharisma',
      title: seo.ogTitle,
      description: seo.ogDescription,
      images: ['/croissantsmoon/twitter-image.png'],
    },
    manifest: '/croissantsmoon/site.webmanifest',
  }
}

function buildJsonLd(description: string, locale: CMLocale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'CroissantsMoon',
    alternateName: 'CM Studio',
    description,
    url: localeUrl(locale),
    image: `${BASE}/og-image.png`,
    inLanguage: locale === 'id' ? 'id-ID' : 'en-US',
    founder: {
      '@type': 'Person',
      name: 'Zefanya Kharisma Nugroho',
      url: SITE,
      sameAs: [
        'https://www.linkedin.com/in/zefanyakharisma',
        'https://github.com/croissantsmoon',
      ],
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Surabaya',
      addressRegion: 'East Java',
      addressCountry: 'ID',
    },
    areaServed: { '@type': 'Country', name: 'Indonesia' },
    serviceType: [
      'Web Development',
      'Dashboard Development',
      'Graphic Design',
      'Visual Identity',
      'UI/UX Design',
    ],
    priceRange: 'Rp 2.5jt – Rp 18jt+',
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'sales',
      url: `${BASE}/proposal`,
    },
  }
}

// Shared server view rendered by both /croissantsmoon/en and /id.
export default async function LandingView({ locale }: { locale: CMLocale }) {
  const { content, seo } = await getLandingContent(locale)
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildJsonLd(seo.description, locale)) }}
      />
      <StudioLanding content={content} locale={locale} />
    </>
  )
}
