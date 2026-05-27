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

export const metadata: Metadata = {
  title: 'Zefanya Kharisma Nugroho',
  description: 'International Education Professional & Creative Technologist based in Surabaya.',
  openGraph: {
    title: 'Zefanya Kharisma Nugroho — International Education & Creative Digital',
    description: 'Bridging global engagement & digital creativity. International Education Professional based in Surabaya.',
    url: 'https://zefanyakharisma.com',
    siteName: 'Zefanya Kharisma Nugroho',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@zefanyakharisma',
  },
  robots: { index: true, follow: true },
  authors: [{ name: 'Zefanya Kharisma Nugroho' }],
  keywords: ['international education', 'student mobility', 'exchange programs', 'Surabaya', 'Indonesia', 'Petra Christian University', 'global partnerships', 'creative technologist', 'web developer'],
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
