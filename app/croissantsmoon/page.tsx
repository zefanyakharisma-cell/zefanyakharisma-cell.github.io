import type { Metadata } from 'next'
import StudioLanding from './StudioLanding'

const URL = 'https://zefanyakharisma.com/croissantsmoon'

export const metadata: Metadata = {
  title: 'CroissantsMoon — Web Development & Design Studio, Surabaya',
  description:
    'CroissantsMoon is a boutique web development and graphic design studio crafting digital presence for institutions and organizations across Indonesia. Web · Dashboard · Visual Identity.',
  applicationName: 'CroissantsMoon',
  authors: [{ name: 'Zefanya Kharisma Nugroho', url: 'https://zefanyakharisma.com' }],
  keywords: [
    'web development Surabaya',
    'jasa web design Indonesia',
    'dashboard development',
    'visual identity Indonesia',
    'CroissantsMoon',
    'boutique web studio',
    'Next.js developer Surabaya',
    'web developer universitas Indonesia',
    'Petra Christian University',
  ],
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
    title: 'CroissantsMoon — Celestial Studio',
    description:
      'Web development, dashboard systems, and visual identity for organizations that mean something. Based in Surabaya, Indonesia.',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@zefanyakharisma',
    creator: '@zefanyakharisma',
    title: 'CroissantsMoon — Celestial Studio',
    description:
      'Web development, dashboards, and visual identity crafted with intention. Based in Surabaya, Indonesia.',
  },
  manifest: '/croissantsmoon/site.webmanifest',
}

export const viewport = {
  themeColor: '#071126',
}

const JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'CroissantsMoon',
  alternateName: 'CM Studio',
  description:
    'Boutique web development and graphic design studio crafting digital presence for institutions and organizations across Indonesia.',
  url: URL,
  image: `${URL}/opengraph-image`,
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

export default function CroissantsMoonStudioPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
      />
      <StudioLanding />
    </>
  )
}
