import type { Metadata } from 'next'
import LandingView, { buildLandingMetadata } from '../LandingView'

export function generateMetadata(): Promise<Metadata> {
  return buildLandingMetadata('id')
}

export const viewport = { themeColor: '#071126' }

export default function CroissantsMoonIdPage() {
  return <LandingView locale="id" />
}
