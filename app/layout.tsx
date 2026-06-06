import type { Metadata } from 'next'
import { Plus_Jakarta_Sans, DM_Sans, Cormorant_Garamond, Outfit } from 'next/font/google'
import './globals.css'

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  style: ['normal', 'italic'],
  variable: '--font-plus-jakarta',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-dm-sans',
  display: 'swap',
})

const cormorantGaramond = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-outfit',
  display: 'swap',
})

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://zefanyakharisma.com'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Zefanya Kharisma Nugroho — International Education & Creative Technologist',
    template: '%s — Zefanya Kharisma Nugroho',
  },
  description:
    'International Education Professional & Creative Technologist based in Surabaya, Indonesia. Bridging global engagement, student mobility, and digital creativity.',
  applicationName: 'Zefanya Kharisma Nugroho',
  authors: [{ name: 'Zefanya Kharisma Nugroho', url: SITE_URL }],
  creator: 'Zefanya Kharisma Nugroho',
  publisher: 'Zefanya Kharisma Nugroho',
  category: 'portfolio',
  keywords: [
    'Zefanya Kharisma Nugroho',
    'international education',
    'student mobility',
    'exchange programs',
    'Surabaya',
    'Indonesia',
    'Petra Christian University',
    'global partnerships',
    'creative technologist',
    'web developer',
    'UI/UX design',
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    title: 'Zefanya Kharisma Nugroho — International Education & Creative Technologist',
    description:
      'Bridging global engagement & digital creativity. International Education Professional based in Surabaya, Indonesia.',
    url: SITE_URL,
    siteName: 'Zefanya Kharisma Nugroho',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Zefanya Kharisma Nugroho — International Education & Creative Technologist',
    description:
      'Bridging global engagement & digital creativity. International Education Professional based in Surabaya, Indonesia.',
    creator: '@zefanyakharisma',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  formatDetection: {
    email: false,
    telephone: false,
    address: false,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${plusJakartaSans.variable} ${dmSans.variable} ${cormorantGaramond.variable} ${outfit.variable} h-full`}>
      <head>
        <meta name="theme-color" content="#F2F2F7" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Zefanya Kharisma Nugroho',
              url: 'https://zefanyakharisma.com',
              jobTitle: 'International Education Professional & Creative Technologist',
              description: 'International Education Professional & Creative Technologist based in Surabaya, Indonesia.',
              email: 'mailto:zefanya.kharisma@gmail.com',
              address: { '@type': 'PostalAddress', addressLocality: 'Surabaya', addressCountry: 'ID' },
              sameAs: ['https://www.linkedin.com/in/zefanyakharisma', 'https://github.com/zefanyakharisma-cell'],
            }),
          }}
        />
      </head>
      <body style={{ fontFamily: 'var(--font-dm-sans, "DM Sans", sans-serif)' }}>
        {children}
      </body>
    </html>
  )
}
