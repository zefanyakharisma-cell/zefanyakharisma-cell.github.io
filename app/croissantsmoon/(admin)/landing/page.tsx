import type { Metadata } from 'next'
import { getLandingContent } from '@/lib/actions/cm-landing'
import LandingEditor from '@/components/admin/LandingEditor'

export const metadata: Metadata = { title: 'Landing Page' }

export default async function LandingCmsPage() {
  const { content, seo } = await getLandingContent()
  return <LandingEditor initialContent={content} initialSeo={seo} />
}
