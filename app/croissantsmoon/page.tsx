import type { Metadata } from 'next'
import StudioLanding from './StudioLanding'
import { getLandingContent } from '@/lib/actions/cm-landing'

const URL = 'https://zefanyakharisma.com/croissantsmoon'

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getLandingContent()
  return {
    title: seo.title,
    description: seo.description,
    applicationName: 'CroissantsMoon',
    authors: [{ name: 'Zefanya Kharisma Nugroho', url: 'https://zefanyakharisma.com' }],
    keywords: seo.keywords,
    creator: 'Zefanya Kharisma Nugroho',
    publisher: 'CroissantsMoon',
    alternates: { canonical: URL },
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
      locale: 'id_ID',
      alternateLocale: 'en_US',
      url: URL,
      siteName: 'CroissantsMoon',
      title: seo.ogTitle,
      description: seo.ogDescription,
      images: [
        { url: seo.ogImage, width: 1200, height: 630, alt: seo.ogTitle },
      ],
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

export const viewport = {
  themeColor: '#071126',
}

function buildJsonLd(description: string) {
 return {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'CroissantsMoon',
  alternateName: 'CM Studio',
  description,
  url: URL,
  image: `${URL}/og-image.png`,
  founder: {
    '@type': 'Person',
    name: 'Zefanya Kharisma Nugroho',
    url: 'https://zefanyakharisma.com',
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
    url: `${URL}/proposal`,
  },
 }
}

export default async function CroissantsMoonStudioPage() {
  const { content, seo } = await getLandingContent()
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildJsonLd(seo.description)) }}
      />
      <StudioLanding content={content} />
    </>
  )
}
