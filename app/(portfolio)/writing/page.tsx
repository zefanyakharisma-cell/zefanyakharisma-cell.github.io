import type { Metadata } from 'next'
import { Rss } from 'lucide-react'
import { PageHero } from '@/components/pcu'
import { AdminLink } from '@/components/writing/AdminLink'
import { WritingIndex } from '@/components/writing/WritingIndex'
import { listPosts } from '@/lib/writing/posts'
import { pageMeta } from '@/lib/og'

export const revalidate = 300

export const metadata: Metadata = {
  ...pageMeta('/writing', {
    title: 'Writing',
    description: 'Essays, reflections and field notes where international relations, people in an international office and system design meet.',
  }),
  alternates: {
    canonical: '/writing',
    types: { 'application/rss+xml': [{ url: '/writing/rss.xml', title: 'Writing (English)' }, { url: '/writing/rss-id.xml', title: 'Tulisan (Bahasa Indonesia)' }] },
  },
}

export default async function WritingPage() {
  const posts = await listPosts()
  return (
    <>
      <PageHero
        eyebrow="Writing"
        title="Where diplomacy, people and systems meet."
        lead="Essays, reflections and field notes from an international office: how partnerships between countries really work, how to look after the people who make them happen, and the systems and databases that keep it all running."
      >
        <div className="flex flex-wrap items-center gap-3">
          <a href="/writing/rss.xml" className="pcu-btn pcu-btn--inverse"><Rss aria-hidden size={16} /> RSS (English)</a>
          <a href="/writing/rss-id.xml" className="pcu-btn pcu-btn--outline text-white" hrefLang="id" lang="id"><Rss aria-hidden size={16} /> RSS (Bahasa Indonesia)</a>
          <AdminLink href="/admin" label="Manage posts" className="pcu-btn--accent" />
        </div>
      </PageHero>

      <section className="section">
        <div className="wrap">
          <WritingIndex posts={posts ?? []} unavailable={posts === null} />
        </div>
      </section>
    </>
  )
}
