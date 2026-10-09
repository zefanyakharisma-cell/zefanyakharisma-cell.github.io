import type { Metadata } from 'next'
import { Database, Globe2, Users } from 'lucide-react'
import { Card, IconBadge, PageHero, SectionHead } from '@/components/pcu'
import { WritingIndex } from '@/components/writing/WritingIndex'
import { streams } from '@/lib/writing/config'
import { listPosts } from '@/lib/writing/posts'

export const revalidate = 300

export const metadata: Metadata = {
  title: 'Writing',
  description: 'Essays, reflections and field notes where international relations, people in an international office and system design meet.',
  alternates: {
    canonical: '/writing',
    types: { 'application/rss+xml': [{ url: '/writing/rss.xml', title: 'Writing (English)' }, { url: '/writing/rss-id.xml', title: 'Tulisan (Bahasa Indonesia)' }] },
  },
}

const streamIcons = { global: Globe2, people: Users, systems: Database }

export default async function WritingPage() {
  const posts = await listPosts()
  return (
    <>
      <PageHero
        eyebrow="Writing"
        title="Where diplomacy, people and systems meet."
        lead="Essays, reflections and field notes from an international office: how partnerships between countries really work, how to look after the people who make them happen, and the systems and databases that keep it all running."
      />

      <section className="section">
        <div className="wrap">
          <SectionHead eyebrow="Three streams" title="What I write about" />
          <div className="grid-3">
            {(Object.keys(streams) as (keyof typeof streams)[]).map(k => (
              <Card key={k} bodyClassName="!gap-4">
                <IconBadge icon={streamIcons[k]} />
                <h3 className="m-0 text-xl text-midnight">{streams[k].en}</h3>
                <p className="m-0 muted">{streams[k].blurb}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--smoke">
        <div className="wrap">
          <SectionHead eyebrow="Latest" title="All writing" />
          {posts === null ? (
            <p className="lead m-0">The writing is not available right now. Please check back in a little while.</p>
          ) : posts.length === 0 ? (
            <p className="lead m-0">The first pieces are on their way.</p>
          ) : (
            <WritingIndex posts={posts} />
          )}
        </div>
      </section>
    </>
  )
}
