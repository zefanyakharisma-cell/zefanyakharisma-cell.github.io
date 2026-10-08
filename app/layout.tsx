import type { Metadata, Viewport } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import './styles/pcu.css'

const inter = localFont({
  src: [
    { path: './fonts/Inter-Variable.woff2', style: 'normal', weight: '100 900' },
    { path: './fonts/Inter-Italic-Variable.woff2', style: 'italic', weight: '100 900' },
  ],
  variable: '--font-inter',
  display: 'swap',
})

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://zefanyakharisma.com'
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
}

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Zefanya Kharisma Nugroho',
  url: SITE_URL,
  jobTitle: 'International Partnership Specialist',
  worksFor: { '@type': 'CollegeOrUniversity', name: 'Petra Christian University' },
  email: 'mailto:zefanya.kharisma@gmail.com',
  address: { '@type': 'PostalAddress', addressLocality: 'Surabaya', addressCountry: 'ID' },
  sameAs: ['https://www.linkedin.com/in/zefanyakharisma'],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="pcu">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd).replace(/</g, '\\u003c') }}
        />
        {children}
      </body>
    </html>
  )
}
