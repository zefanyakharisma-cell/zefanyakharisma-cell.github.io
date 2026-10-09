'use client'

import { useState } from 'react'
import { FilterChips } from '@/components/pcu'
import { postTypes, streamKeys, streams, typeKeys, type Lang } from '@/lib/writing/config'
import type { PostSummary } from '@/lib/writing/posts'
import { PostCard } from './PostCard'

/** Featured post, then every post filtered by stream and type, in the reader's chosen language. */
export function WritingIndex({ posts }: { posts: PostSummary[] }) {
  const [lang, setLang] = useState<Lang>('en')
  const [streamSel, setStreamSel] = useState<string[]>([])
  const [typeSel, setTypeSel] = useState<string[]>([])

  const streamLabel = (k: string) => streams[k as keyof typeof streams].en
  const typeLabel = (k: string) => postTypes[k as keyof typeof postTypes].en
  const filtering = streamSel.length > 0 || typeSel.length > 0

  const featured = filtering ? null : posts.find(p => p.featured) ?? posts[0]
  const shown = posts.filter(p =>
    p !== featured
    && (streamSel.length === 0 || p.streams.some(s => streamSel.includes(streamLabel(s))))
    && (typeSel.length === 0 || typeSel.includes(typeLabel(p.type))),
  )

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-wrap items-start justify-between gap-6">
        <div className="flex flex-col gap-4">
          <FilterChips label="Filter by stream" options={streamKeys.map(streamLabel)} value={streamSel} onChange={setStreamSel} />
          <FilterChips label="Filter by type" options={typeKeys.map(typeLabel)} value={typeSel} onChange={setTypeSel} />
        </div>
        <div className="seg" role="group" aria-label="Language">
          <button type="button" aria-pressed={lang === 'en'} onClick={() => setLang('en')}>English</button>
          <button type="button" aria-pressed={lang === 'id'} onClick={() => setLang('id')} lang="id">Bahasa Indonesia</button>
        </div>
      </div>

      {featured && <PostCard post={featured} lang={lang} large />}

      {shown.length > 0 ? (
        <div className="grid-3">
          {shown.map(p => <PostCard key={p.id} post={p} lang={lang} />)}
        </div>
      ) : (
        filtering && <p className="lead m-0">Nothing here yet for that combination.</p>
      )}
    </div>
  )
}
