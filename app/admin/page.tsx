import Link from 'next/link'
import { Plus } from 'lucide-react'
import { requireAdmin } from '@/lib/supabase/server'
import { formatDate, postPath, type Lang } from '@/lib/writing/config'
import { postState, stateLabel } from '@/lib/writing/status'
import { createPost } from './actions'

export const dynamic = 'force-dynamic'

type Row = {
  id: string
  slug: string
  status: 'draft' | 'published'
  published_at: string | null
  updated_at: string
  post_translations: { lang: Lang; title: string; ready: boolean }[]
}

export default async function AdminHome() {
  const { supabase } = await requireAdmin()
  const { data, error } = await supabase
    .from('posts')
    .select('id, slug, status, published_at, updated_at, post_translations (lang, title, ready)')
    .order('updated_at', { ascending: false })
  const posts = (data ?? []) as Row[]
  const now = Date.now()

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="h-sub m-0">Posts</h1>
        <form action={createPost}>
          <button type="submit" className="pcu-btn"><Plus aria-hidden size={16} /> New post</button>
        </form>
      </div>
      {error && <p className="admin-error">{error.message}</p>}
      {posts.length === 0 ? (
        <p className="lead m-0">No posts yet. Start with “New post”.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="admin-table">
            <thead>
              <tr><th>Title</th><th>Status</th><th>Languages</th><th>Date</th><th><span className="sr-only">Actions</span></th></tr>
            </thead>
            <tbody>
              {posts.map(p => {
                const en = p.post_translations.find(t => t.lang === 'en')
                const id = p.post_translations.find(t => t.lang === 'id')
                const state = postState(p.status, p.published_at, now)
                return (
                  <tr key={p.id}>
                    <td>
                      <Link href={`/admin/posts/${p.id}`} className="font-semibold">{en?.title || id?.title || 'Untitled'}</Link>
                      <div className="text-sm muted">/{p.slug}</div>
                    </td>
                    <td><span className={`admin-status admin-status--${state}`}>{stateLabel[state]}</span></td>
                    <td className="text-sm">
                      EN {en?.ready ? 'ready' : '—'} · ID {id?.ready ? 'ready' : '—'}
                    </td>
                    <td className="text-sm">{p.published_at ? formatDate(p.published_at, 'en') : `Edited ${formatDate(p.updated_at, 'en')}`}</td>
                    <td className="text-right whitespace-nowrap">
                      <Link href={`/admin/posts/${p.id}`} className="pcu-btn pcu-btn--outline">Edit</Link>
                      {state === 'published' && (
                        <a href={postPath(p.slug, en?.ready ? 'en' : 'id')} className="ml-2" target="_blank" rel="noopener noreferrer">View</a>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
