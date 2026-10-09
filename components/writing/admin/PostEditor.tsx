'use client'

import { useCallback, useEffect, useRef, useState, useTransition } from 'react'
import Image from 'next/image'
import { ExternalLink, Trash2 } from 'lucide-react'
import { deletePost, savePost, type SaveInput, type TranslationInput } from '@/app/admin/actions'
import { langs, postTypes, relatedPages, slugify, streamKeys, streams, typeKeys, type Lang, type Stream } from '@/lib/writing/config'
import { postState, stateLabel } from '@/lib/writing/status'
import { RichEditor } from './RichEditor'
import { uploadImage } from './uploadImage'

const langName: Record<Lang, string> = { en: 'English', id: 'Bahasa Indonesia' }

/** ISO timestamp <-> value of a datetime-local input, in the browser's time zone. */
function toLocalInput(iso: string | null): string {
  if (!iso) return ''
  const d = new Date(iso)
  return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 16)
}
const fromLocalInput = (v: string) => (v ? new Date(v).toISOString() : null)

export function PostEditor({ initial }: { initial: SaveInput }) {
  const [post, setPost] = useState<SaveInput>(initial)
  const [tab, setTab] = useState<Lang>('en')
  const [dirty, setDirty] = useState(false)
  const [message, setMessage] = useState<{ kind: 'ok' | 'error'; text: string } | null>(null)
  const [saving, startSaving] = useTransition()
  const slugTouched = useRef(!initial.slug.startsWith('draft-'))
  const latest = useRef(post)
  latest.current = post

  const update = (patch: Partial<SaveInput>) => { setPost(p => ({ ...p, ...patch })); setDirty(true) }
  const updateT = (lang: Lang, patch: Partial<TranslationInput>) => {
    setPost(p => {
      const next = { ...p, translations: { ...p.translations, [lang]: { ...p.translations[lang], ...patch } } }
      if (lang === 'en' && patch.title !== undefined && !slugTouched.current) next.slug = slugify(patch.title) || p.slug
      return next
    })
    setDirty(true)
  }

  const persist = useCallback(async (override?: Partial<SaveInput>, done?: string): Promise<boolean> => {
    const res = await savePost({ ...latest.current, ...override })
    if (!res.ok) { setMessage({ kind: 'error', text: res.error }); return false }
    setPost(p => ({ ...p, ...override, published_at: res.published_at }))
    setDirty(false)
    setMessage({ kind: 'ok', text: done ?? `Saved at ${new Date(res.savedAt).toLocaleTimeString()}` })
    return true
  }, [])
  const save = useCallback((override?: Partial<SaveInput>, done?: string) => {
    startSaving(async () => { await persist(override, done) })
  }, [persist])

  // Drafts save themselves a few seconds after you stop typing; live posts only change when you press Update.
  useEffect(() => {
    if (!dirty || post.status !== 'draft') return
    const t = setTimeout(() => save(), 4000)
    return () => clearTimeout(t)
  }, [post, dirty, save])

  useEffect(() => {
    const warn = (e: BeforeUnloadEvent) => { if (dirty) e.preventDefault() }
    window.addEventListener('beforeunload', warn)
    return () => window.removeEventListener('beforeunload', warn)
  }, [dirty])

  const state = postState(post.status, post.published_at)
  const scheduleAt = post.published_at && new Date(post.published_at).getTime() > Date.now()
  const onError = (text: string) => setMessage({ kind: 'error', text })
  const upload = (file: File) => uploadImage(file, post.id)

  // Preview shows the saved version, so unsaved changes are saved first (the tab opens right away to avoid popup blockers).
  const preview = (lang: Lang) => {
    const url = `/admin/posts/${post.id}/preview?lang=${lang}`
    if (!dirty) { window.open(url, '_blank'); return }
    const tab = window.open('', '_blank')
    startSaving(async () => {
      const ok = await persist()
      if (ok && tab) tab.location.href = url
      else tab?.close()
    })
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px] items-start">
      <div className="flex flex-col gap-6 min-w-0">
        <div className="tabs" role="tablist" aria-label="Language">
          {langs.map(l => (
            <a key={l} href="#" role="tab" aria-selected={tab === l} aria-current={tab === l ? 'page' : undefined}
              onClick={e => { e.preventDefault(); setTab(l) }}>
              {langName[l]} {post.translations[l].ready ? '· ready' : ''}
            </a>
          ))}
        </div>
        {langs.map(l => (
          <div key={l} hidden={tab !== l} className="flex flex-col gap-5" lang={l}>
            <label className="admin-field">
              <span className="sr-only">Title ({langName[l]})</span>
              <input className="admin-input admin-title" placeholder={l === 'en' ? 'Title' : 'Judul'} value={post.translations[l].title}
                onChange={e => updateT(l, { title: e.target.value })} />
            </label>
            <label className="admin-field">
              {l === 'en' ? 'Excerpt' : 'Ringkasan'} <small>One or two sentences for cards, search results and LinkedIn.</small>
              <textarea className="admin-input" rows={2} value={post.translations[l].excerpt} onChange={e => updateT(l, { excerpt: e.target.value })} />
            </label>
            <RichEditor
              content={post.translations[l].body_json}
              onChange={doc => updateT(l, { body_json: doc })}
              onUploadImage={upload}
              onError={onError}
              label={`Body (${langName[l]})`}
              lang={l}
            />
            <div className="flex flex-wrap items-center justify-between gap-4">
              <label className="admin-check">
                <input type="checkbox" checked={post.translations[l].ready} onChange={e => updateT(l, { ready: e.target.checked })} />
                The {langName[l]} version is ready to be shown
              </label>
              <button type="button" className="pcu-btn pcu-btn--outline" onClick={() => preview(l)}>
                Preview {l.toUpperCase()} <ExternalLink aria-hidden size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <aside className="flex flex-col gap-6 lg:sticky lg:top-6">
        <div className="pcu-card flex flex-col gap-4">
          <div className="flex items-center justify-between gap-3">
            <span className={`admin-status admin-status--${state}`}>{stateLabel[state]}</span>
            <span className="text-sm muted" aria-live="polite">{saving ? 'Saving…' : dirty ? 'Unsaved changes' : ''}</span>
          </div>
          <label className="admin-field">
            {post.status === 'draft' ? 'Publish on' : 'Published on'} <small>Leave empty to publish now. A future date schedules it.</small>
            <input className="admin-input" type="datetime-local" value={toLocalInput(post.published_at)}
              onChange={e => update({ published_at: fromLocalInput(e.target.value) })} />
          </label>
          {post.status === 'draft' ? (
            <div className="flex flex-wrap gap-2">
              <button type="button" className="pcu-btn" disabled={saving} onClick={() => save({ status: 'published' }, scheduleAt ? 'Scheduled.' : 'Published.')}>
                {scheduleAt ? 'Schedule' : 'Publish'}
              </button>
              <button type="button" className="pcu-btn pcu-btn--outline" disabled={saving || !dirty} onClick={() => save()}>Save draft</button>
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">
              <button type="button" className="pcu-btn" disabled={saving || !dirty} onClick={() => save(undefined, 'Updated.')}>Update</button>
              <button type="button" className="pcu-btn pcu-btn--outline" disabled={saving} onClick={() => save({ status: 'draft' }, 'Moved back to drafts.')}>Unpublish</button>
            </div>
          )}
          {message && <p className={message.kind === 'error' ? 'admin-error m-0' : 'm-0 text-sm muted'} role="status">{message.text}</p>}
        </div>

        <div className="pcu-card flex flex-col gap-5">
          <label className="admin-field">
            URL slug <small>zefanyakharisma.com/writing/{post.slug}</small>
            <input className="admin-input" value={post.slug} onChange={e => { slugTouched.current = true; update({ slug: e.target.value }) }} />
          </label>

          <fieldset className="admin-field border-0 p-0 m-0">
            <legend className="mb-1">Streams</legend>
            {streamKeys.map(s => (
              <label key={s} className="admin-check !min-h-[36px]">
                <input type="checkbox" checked={post.streams.includes(s)}
                  onChange={e => update({ streams: e.target.checked ? [...post.streams, s] : post.streams.filter((x: Stream) => x !== s) })} />
                {streams[s].en}
              </label>
            ))}
          </fieldset>

          <label className="admin-field">
            Type
            <select className="admin-input" value={post.type} onChange={e => update({ type: e.target.value as SaveInput['type'] })}>
              {typeKeys.map(t => <option key={t} value={t}>{postTypes[t].en}</option>)}
            </select>
          </label>

          <label className="admin-field">
            Related page <small>Shows this post under “Writing about this” on that page.</small>
            <select className="admin-input" value={post.related_project ?? ''} onChange={e => update({ related_project: e.target.value || null })}>
              <option value="">None</option>
              {relatedPages.map(p => <option key={p.href} value={p.href}>{p.label}</option>)}
            </select>
          </label>

          <label className="admin-check">
            <input type="checkbox" checked={post.featured} onChange={e => update({ featured: e.target.checked })} />
            Feature at the top of Writing
          </label>

          <div className="admin-field">
            Cover image
            {post.cover_image_url && (
              <div className="relative aspect-[16/9] overflow-hidden rounded-md bg-smoke">
                <Image src={post.cover_image_url} alt="" fill sizes="320px" className="object-cover" />
              </div>
            )}
            <input type="file" accept="image/*" className="text-sm font-normal" onChange={async e => {
              const file = e.target.files?.[0]
              e.target.value = ''
              if (!file) return
              try { update({ cover_image_url: await upload(file) }) } catch (err) { onError(err instanceof Error ? err.message : 'Upload failed.') }
            }} />
            {post.cover_image_url && (
              <>
                <input className="admin-input" placeholder="Alt text: what the image shows" value={post.cover_alt} onChange={e => update({ cover_alt: e.target.value })} />
                <button type="button" className="self-start text-sm underline bg-transparent border-0 p-0 cursor-pointer text-midnight" onClick={() => update({ cover_image_url: null, cover_alt: '' })}>
                  Remove cover image
                </button>
              </>
            )}
          </div>
        </div>

        <form action={deletePost.bind(null, post.id)} onSubmit={e => { if (!window.confirm('Delete this post and its images? This cannot be undone.')) e.preventDefault() }}>
          <button type="submit" className="pcu-btn pcu-btn--ghost !text-[#7a0d24]"><Trash2 aria-hidden size={16} /> Delete post</button>
        </form>
      </aside>
    </div>
  )
}
