import type { Metadata } from 'next'
import { getLandingContentBoth } from '@/lib/actions/cm-landing'
import LandingEditor from '@/components/admin/LandingEditor'

export const metadata: Metadata = { title: 'Landing Page' }

export default async function LandingCmsPage() {
  const { contentEn, contentId, seoEn, seoId } = await getLandingContentBoth()
  return (
    <LandingEditor
      initialContentEn={contentEn}
      initialContentId={contentId}
      initialSeoEn={seoEn}
      initialSeoId={seoId}
    />
  )
}
