import type { Metadata } from 'next'
import './styles.css'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://zefanyakharisma.com'),
  title: {
    default: 'CroissantsMoon',
    template: '%s — CroissantsMoon',
  },
  description: 'Premium digital solutions studio.',
  robots: { index: false, follow: false },
  manifest: '/croissantsmoon/site.webmanifest',
  icons: {
    icon: [
      { url: '/croissantsmoon/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/croissantsmoon/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/croissantsmoon/favicon.ico', sizes: 'any' },
    ],
    apple: [{ url: '/croissantsmoon/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  openGraph: {
    type: 'website',
    siteName: 'CroissantsMoon',
    images: [
      { url: '/croissantsmoon/og-image.png', width: 1200, height: 630, alt: 'CroissantsMoon — Celestial Studio' },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/croissantsmoon/twitter-image.png'],
  },
}

export default function CroissantsMoonRootLayout({ children }: { children: React.ReactNode }) {
  return <div className="h-full antialiased">{children}</div>
}
