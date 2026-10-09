import { SectionHead } from '@/components/pcu'
import { postsForPage } from '@/lib/writing/posts'
import { PostCard } from './PostCard'

/** Posts linked to this page from the admin ("Related project"). Renders nothing when there are none. */
export async function WritingAboutThis({ page }: { page: string }) {
  const posts = await postsForPage(page)
  if (posts.length === 0) return null
  return (
    <section className="section">
      <div className="wrap">
        <SectionHead eyebrow="Writing" title="Writing about this" />
        <div className="grid-3">
          {posts.slice(0, 3).map(p => <PostCard key={p.id} post={p} lang="en" />)}
        </div>
      </div>
    </section>
  )
}
