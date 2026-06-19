import type { Metadata } from 'next'
import LandingView, { buildLandingMetadata } from '../LandingView'

export function generateMetadata(): Promise<Metadata> {
  return buildLandingMetadata('en')
}

export const viewport = { themeColor: '#071126' }

export default function CroissantsMoonEnPage() {
  return <LandingView locale="en" />
}
