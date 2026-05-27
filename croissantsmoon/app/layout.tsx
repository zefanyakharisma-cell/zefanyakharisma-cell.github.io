import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://zefanyakharisma.com'),
  title: {
    default: 'CroissantsMoon',
    template: '%s — CroissantsMoon',
  },
  description: 'Premium digital solutions studio.',
  robots: { index: false, follow: false },
  openGraph: {
    type: 'website',
    siteName: 'CroissantsMoon',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full antialiased">{children}</body>
    </html>
  )
}
