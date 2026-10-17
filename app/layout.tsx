import type { Metadata, Viewport } from 'next'
import localFont from 'next/font/local'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { JsonLd } from '@/components/seo/JsonLd'
import { contact } from '@/lib/data/profile'
import { PERSON_ID, SITE_URL, WEBSITE_ID, absoluteUrl } from '@/lib/seo'
import './globals.css'
import 'flag-icons/css/flag-icons.min.css'
import './styles/pcu.css'

const inter = localFont({
  src: [
    { path: './fonts/Inter-Variable.woff2', style: 'normal', weight: '100 900' },
    { path: './fonts/Inter-Italic-Variable.woff2', style: 'italic', weight: '100 900' },
  ],
  variable: '--font-inter',
  display: 'swap',
})

const TITLE = 'Zefanya Kharisma Nugroho — International Education Professional'
const DESCRIPTION =
  'International Partnership Specialist at Petra Christian University, Surabaya. Global partnerships, student mobility and the systems behind them.'

export const viewport: Viewport = {
  themeColor: '#19304b',
}

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: TITLE, template: '%s — Zefanya Kharisma Nugroho' },
  description: DESCRIPTION,
  applicationName: 'Zefanya Kharisma Nugroho',
  authors: [{ name: 'Zefanya Kharisma Nugroho', url: SITE_URL }],
  creator: 'Zefanya Kharisma Nugroho',
  category: 'portfolio',
  keywords: [
    'Zefanya Kharisma Nugroho',
    'international education',
    'student mobility',
    'exchange programs',
    'global partnerships',
    'Petra Christian University',
    'Universitas Airlangga',
    'Surabaya',
  ],
  openGraph: {
    type: 'website',
    title: TITLE,
    description: DESCRIPTION,
    siteName: 'Zefanya Kharisma Nugroho',
    locale: 'en_US',
  },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION },
  robots: { index: true, follow: true },
  formatDetection: { email: false, telephone: false, address: false },
  verification: verification(),
}

// Search Console / Bing Webmaster tokens; a key is emitted only when its env var is set.
function verification(): Metadata['verification'] {
  const google = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
  const bing = process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION
  if (!google && !bing) return undefined
  return {
    ...(google && { google }),
    ...(bing && { other: { 'msvalidate.01': bing } }),
  }
}

const siteJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': WEBSITE_ID,
      name: 'Zefanya Kharisma Nugroho',
      url: SITE_URL,
      description: DESCRIPTION,
      inLanguage: ['en', 'id'],
      publisher: { '@id': PERSON_ID },
    },
    {
      '@type': 'Person',
      '@id': PERSON_ID,
      name: 'Zefanya Kharisma Nugroho',
      alternateName: 'Zefanya Kharisma',
      url: SITE_URL,
      image: absoluteUrl('/assets/images/self-portrait/profile-pic-1.png'),
      jobTitle: 'International Partnership Specialist',
      worksFor: { '@type': 'CollegeOrUniversity', name: 'Petra Christian University', url: 'https://www.petra.ac.id' },
      alumniOf: { '@type': 'CollegeOrUniversity', name: 'Universitas Airlangga', url: 'https://unair.ac.id' },
      knowsAbout: [
        'International education',
        'Student mobility',
        'International partnerships',
        'MoU/MoA management',
        'Partnership information systems',
        'Cross-cultural communication',
      ],
      knowsLanguage: ['en', 'id'],
      address: { '@type': 'PostalAddress', addressLocality: 'Surabaya', addressRegion: 'East Java', addressCountry: 'ID' },
      email: `mailto:${contact.email}`,
      sameAs: [contact.linkedin],
    },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="pcu">
        <JsonLd data={siteJsonLd} />
        {children}
        <SpeedInsights />
      </body>
    </html>
  )
}
