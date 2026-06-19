'use client'

import { useState, useTransition } from 'react'
import { Input, Textarea, Select } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { saveProjects, type CMProjectInput } from '@/lib/actions/cm-projects'
import type { CMProjectRow, CMProjectType } from '@/types'
import { Plus, Trash2, ArrowUp, ArrowDown, Save, ExternalLink, Star, EyeOff } from 'lucide-react'

const TYPE_OPTIONS: { value: CMProjectType; label: string }[] = [
  { value: 'landing', label: 'Landing Page' },
  { value: 'webapp', label: 'Web App' },
  { value: 'saas', label: 'SaaS' },
]

const uid = () =>
  typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `tmp-${Date.now()}-${Math.random()}`

// Local editing shape: a stable key for React + the persisted fields. `id` is
// only set for rows that already exist in the DB (new rows omit it so the
// server assigns one).
type Draft = CMProjectInput & { key: string }

function fromRow(r: CMProjectRow): Draft {
  return {
    key: r.id,
    id: r.id,
    title_en: r.title_en,
    title_id: r.title_id ?? '',
    outcome_en: r.outcome_en,
    outcome_id: r.outcome_id ?? '',
    type: r.type,
    image_url: r.image_url ?? '',
    link_url: r.link_url ?? '',
    sort_order: r.sort_order,
    is_featured: r.is_featured,
    is_visible: r.is_visible,
  }
}

function blank(): Draft {
  return {
    key: uid(),
    title_en: '',
    title_id: '',
    outcome_en: '',
    outcome_id: '',
    type: 'webapp',
    image_url: '',
    link_url: '',
    sort_order: 0,
    is_featured: false,
    is_visible: true,
  }
}

export default function ProjectsManager({ initial }: { initial: CMProjectRow[] }) {
  const [rows, setRows] = useState<Draft[]>(initial.map(fromRow))
  const [pending, startTransition] = useTransition()
  const [status, setStatus] = useState<'idle' | 'saved' | 'error'>('idle')
  const [error, setError] = useState<string | null>(null)

  function edit(i: number, patch: Partial<Draft>) {
    setStatus('idle')
    setRows((prev) => prev.map((r, j) => (j === i ? { ...r, ...patch } : r)))
  }
  function move(i: number, dir: -1 | 1) {
    const j = i + dir
    if (j < 0 || j >= rows.length) return
    setStatus('idle')
    setRows((prev) => {
      const next = [...prev]
      ;[next[i], next[j]] = [next[j], next[i]]
      return next
    })
  }
  function remove(i: number) {
    setStatus('idle')
    setRows((prev) => prev.filter((_, j) => j !== i))
  }
  function add() {
    setStatus('idle')
    setRows((prev) => [...prev, blank()])
  }

  function save() {
    setError(null)
    // The featured flag drives the reduced-motion hero backdrop — at most one.
    const payload: CMProjectInput[] = rows.map(({ key, ...rest }, i) => ({
      ...rest,
      title_id: rest.title_id?.trim() ? rest.title_id : null,
      outcome_id: rest.outcome_id?.trim() ? rest.outcome_id : null,
      image_url: rest.image_url?.trim() ? rest.image_url : null,
      link_url: rest.link_url?.trim() ? rest.link_url : null,
      sort_order: i,
    }))
    startTransition(async () => {
      try {
        await saveProjects(payload)
        setStatus('saved')
      } catch (e) {
        setStatus('error')
        setError(e instanceof Error ? e.message : 'Failed to save')
      }
    })
  }

  const featuredCount = rows.filter((r) => r.is_featured).length

  return (
    <div className="px-4 md:px-8 py-8 animate-cm-fade-in">
      <div className="flex items-center justify-between gap-4 mb-2">
        <div>
          <h1 className="text-2xl font-semibold text-cm-white">Projects</h1>
          <p className="text-sm text-cm-subtle mt-1">
            Single source for the hero carousel and the Selected Work grid — in both languages.
          </p>
        </div>
        <a href="/croissantsmoon/en#work" target="_blank" rel="noopener noreferrer"
          className="hidden sm:inline-flex items-center gap-2 text-sm text-cm-subtle hover:text-cm-text transition-colors">
          <ExternalLink size={14} /> View live
        </a>
      </div>

      {featuredCount > 1 && (
        <p className="text-xs text-amber-300 mb-4">
          {featuredCount} projects are marked featured — the hero uses the first as its reduced-motion backdrop.
        </p>
      )}

      <div className="space-y-4 max-w-3xl pb-28 mt-6">
        {rows.map((r, i) => (
          <div key={r.key} className="bg-cm-surface border border-cm-border rounded-xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-cm-subtle uppercase tracking-widest">
                #{i + 1}{!r.is_visible && <span className="ml-2 text-cm-muted normal-case">· hidden</span>}
              </span>
              <div className="flex items-center gap-1">
                <button type="button" disabled={i === 0} onClick={() => move(i, -1)} aria-label="Move up"
                  className="p-1.5 rounded-md text-cm-subtle hover:text-cm-text hover:bg-cm-elevated disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
                  <ArrowUp size={13} />
                </button>
                <button type="button" disabled={i === rows.length - 1} onClick={() => move(i, 1)} aria-label="Move down"
                  className="p-1.5 rounded-md text-cm-subtle hover:text-cm-text hover:bg-cm-elevated disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
                  <ArrowDown size={13} />
                </button>
                <button type="button" onClick={() => remove(i)} aria-label="Remove"
                  className="p-1.5 rounded-md text-cm-subtle hover:text-red-400 hover:bg-red-400/10 transition-colors">
                  <Trash2 size={13} />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input label="Title (EN)" value={r.title_en} onChange={(e) => edit(i, { title_en: e.target.value })} />
              <Input label="Title (ID)" value={r.title_id ?? ''} onChange={(e) => edit(i, { title_id: e.target.value })}
                hint="Leave blank to fall back to English" />
            </div>
            <Textarea label="Outcome (EN)" rows={2} value={r.outcome_en} onChange={(e) => edit(i, { outcome_en: e.target.value })} />
            <Textarea label="Outcome (ID)" rows={2} value={r.outcome_id ?? ''} onChange={(e) => edit(i, { outcome_id: e.target.value })} />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Select label="Type" options={TYPE_OPTIONS} value={r.type}
                onChange={(e) => edit(i, { type: e.target.value as CMProjectType })} />
              <Input label="Link (See the build)" value={r.link_url ?? ''} onChange={(e) => edit(i, { link_url: e.target.value })} />
            </div>
            <Input label="Image URL" value={r.image_url ?? ''} onChange={(e) => edit(i, { image_url: e.target.value })}
              hint="Full URL (e.g. Supabase Storage public URL). Optional — a gradient backdrop is used when empty." />

            <div className="flex flex-wrap items-center gap-5 pt-1">
              <label className="flex items-center gap-2 text-sm text-cm-text">
                <input type="checkbox" checked={r.is_featured} onChange={(e) => edit(i, { is_featured: e.target.checked })} className="accent-cm-gold" />
                <Star size={13} className="text-cm-gold" /> Featured
              </label>
              <label className="flex items-center gap-2 text-sm text-cm-text">
                <input type="checkbox" checked={r.is_visible} onChange={(e) => edit(i, { is_visible: e.target.checked })} className="accent-cm-gold" />
                {r.is_visible ? 'Visible' : <span className="inline-flex items-center gap-1"><EyeOff size={13} /> Hidden</span>}
              </label>
            </div>
          </div>
        ))}

        <button type="button" onClick={add}
          className="flex items-center gap-2 text-sm text-cm-accent hover:text-cm-white transition-colors">
          <Plus size={14} /> Add project
        </button>
      </div>

      <div className="fixed bottom-0 inset-x-0 md:left-60 z-20 bg-cm-surface/95 backdrop-blur border-t border-cm-border px-4 md:px-8 py-3 flex items-center justify-between gap-4">
        <div className="text-sm min-h-[20px]">
          {status === 'saved' && <span className="text-emerald-400">Saved — live page updated.</span>}
          {status === 'error' && <span className="text-red-400">{error ?? 'Save failed.'}</span>}
          {status === 'idle' && <span className="text-cm-subtle">Order here is the display order. Unsaved until you Save.</span>}
        </div>
        <Button type="button" variant="primary" size="md" loading={pending} onClick={save}>
          <Save size={14} /> Save changes
        </Button>
      </div>
    </div>
  )
}
