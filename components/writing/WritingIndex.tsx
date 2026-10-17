'use client'

import { useState } from 'react'
import { Database, Globe2, Users } from 'lucide-react'
import { FilterChips, IconBadge, SectionHead } from '@/components/pcu'
import { cn } from '@/lib/utils'
import { postTypes, streamKeys, streams, typeKeys, type Lang, type Stream } from '@/lib/writing/config'
import type { PostSummary } from '@/lib/writing/posts'
import { PostCard } from './PostCard'

const streamIcons = { global: Globe2, people: Users, systems: Database }

/** The three streams as filter tiles, a type/language toolbar, the featured post and the rest in a grid. */
export function WritingIndex({ posts, unavailable }: { posts: PostSummary[]; unavailable?: boolean }) {
  const [lang, setLang] = useState<Lang>('en')
  const [streamSel, setStreamSel] = useState<Stream[]>([])
  const [typeSel, setTypeSel] = useState<string[]>([])

  const typeLabel = (k: string) => postTypes[k as keyof typeof postTypes].en
  const filtering = streamSel.length > 0 || typeSel.length > 0
  const toggleStream = (s: Stream) => setStreamSel(sel => sel.includes(s) ? sel.filter(v => v !== s) : [...sel, s])
  const clear = () => { setStreamSel([]); setTypeSel([]) }

  const matches = posts.filter(p =>
    (streamSel.length === 0 || p.streams.some(s => streamSel.includes(s)))
    && (typeSel.length === 0 || typeSel.includes(typeLabel(p.type))),
  )
  const featured = filtering ? null : matches.find(p => p.featured) ?? matches[0]
  const rest = matches.filter(p => p !== featured)

  return (
    <div className="flex flex-col gap-12">
      <div className="flex flex-col gap-6">
        <SectionHead eyebrow="Three streams" title="What I write about" lead="Pick one or more to narrow the list." />
        <div className="grid-3" role="group" aria-label="Filter by stream">
          {streamKeys.map(k => {
            const on = streamSel.includes(k)
            const count = posts.filter(p => p.streams.includes(k)).length
            return (
              <button key={k} type="button" aria-pressed={on} onClick={() => toggleStream(k)} className={cn('stream-tile', on && 'stream-tile--on')}>
                <IconBadge icon={streamIcons[k]} size={48} />
                <span className="flex flex-col gap-1 text-left">
                  <span className="text-xl font-bold">{streams[k].en}</span>
                  <span className="stream-tile__blurb">{streams[k].blurb}</span>
                  <span className="stream-tile__count">{count} {count === 1 ? 'piece' : 'pieces'}</span>
                </span>
              </button>
            )
          })}
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-6">
        <FilterChips label="Filter by type" options={typeKeys.map(typeLabel)} value={typeSel} onChange={setTypeSel} />
        <div className="seg" role="group" aria-label="Language">
          <button type="button" aria-pressed={lang === 'en'} onClick={() => setLang('en')}>English</button>
          <button type="button" aria-pressed={lang === 'id'} onClick={() => setLang('id')} lang="id">Bahasa Indonesia</button>
        </div>
      </div>

      {unavailable ? (
        <p className="lead m-0">The writing is not available right now. Please check back in a little while.</p>
      ) : posts.length === 0 ? (
        <p className="lead m-0">The first pieces are on their way.</p>
      ) : (
        <>
          <div className="flex flex-wrap items-center gap-4" aria-live="polite">
            <span className="pcu-eyebrow">{matches.length} {matches.length === 1 ? 'piece' : 'pieces'}</span>
            {filtering && <button type="button" className="pcu-btn pcu-btn--ghost" onClick={clear}>Clear filters</button>}
          </div>

          {featured && <PostCard post={featured} lang={lang} large />}
          {featured && rest.length > 0 && <div aria-hidden className="pcu-pattern pattern-band rounded-sm" />}

          {rest.length > 0 ? (
            <div className="grid-3">
              {rest.map(p => <PostCard key={p.id} post={p} lang={lang} />)}
            </div>
          ) : (
            filtering && <p className="lead m-0">Nothing here yet for that combination.</p>
          )}
        </>
      )}
    </div>
  )
}
