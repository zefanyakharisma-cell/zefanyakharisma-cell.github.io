'use client'

import { useState, useTransition, type ReactNode } from 'react'
import { Input, Textarea, Select } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { updateLandingContent } from '@/lib/actions/cm-landing'
import type {
  CMLandingContent, CMLandingSeo, CMIconName, CMLink,
} from '@/types'
import {
  Plus, Trash2, ArrowUp, ArrowDown, ChevronDown, Save, ExternalLink, RotateCcw,
} from 'lucide-react'
import { LANDING_DEFAULTS, SEO_DEFAULTS } from '@/lib/cm/landing-defaults'
import { LANDING_DEFAULTS_ID } from '@/lib/cm/landing-defaults-id'

// Language-neutral keys (URLs, emails, icon names, image folders, raw prices)
// are never flagged as "missing ID" — they're shared across both languages.
const NEUTRAL_KEYS = new Set([
  'href', 'github', 'live', 'logoSrc', 'email', 'githubUrl', 'linkedinUrl',
  'siteUrl', 'proposalHref', 'imageBase', 'folder', 'ogImage', 'icon', 'id', 'num', 'price',
])

// Count string leaves that look untranslated in the ID document: empty, or
// still identical to the resolved English value.
function countUntranslated(en: unknown, id: unknown, key?: string): number {
  if (key && NEUTRAL_KEYS.has(key)) return 0
  if (typeof en === 'string') {
    if (typeof id !== 'string') return 0
    const e = en.trim()
    if (e === '') return 0
    const i = id.trim()
    return i === '' || i === e ? 1 : 0
  }
  if (Array.isArray(en) && Array.isArray(id)) {
    let n = 0
    for (let k = 0; k < en.length; k++) n += countUntranslated(en[k], id[k])
    return n
  }
  if (en && id && typeof en === 'object' && typeof id === 'object') {
    let n = 0
    for (const k of Object.keys(en as Record<string, unknown>)) {
      n += countUntranslated((en as Record<string, unknown>)[k], (id as Record<string, unknown>)[k], k)
    }
    return n
  }
  return 0
}

const ICON_OPTIONS: { value: CMIconName; label: string }[] = [
  { value: 'Monitor', label: 'Monitor' },
  { value: 'BarChart3', label: 'Bar Chart' },
  { value: 'Palette', label: 'Palette' },
  { value: 'Zap', label: 'Zap' },
  { value: 'Sparkles', label: 'Sparkles' },
  { value: 'Globe', label: 'Globe' },
  { value: 'Code', label: 'Code' },
  { value: 'PenTool', label: 'Pen Tool' },
  { value: 'Rocket', label: 'Rocket' },
  { value: 'Layers', label: 'Layers' },
]

const SECTION_LABELS: Record<string, string> = {
  services: 'Services', work: 'Featured Projects', proof: 'Testimonials & Stats',
  process: 'How It Works', pricing: 'Pricing', demos: 'Demo Experiences',
  designs: 'Visual Identity', quote: 'Request a Quote', finalCta: 'Final CTA',
}

const uid = () => (typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `id-${Date.now()}-${Math.random()}`)
const toLines = (arr: string[]) => arr.join('\n')
const fromLines = (s: string) => s.split('\n').map(l => l.trim()).filter(Boolean)

// ── Layout primitives ──────────────────────────────────────────
function Section({ title, subtitle, badge, children }: { title: string; subtitle?: string; badge?: ReactNode; children: ReactNode }) {
  return (
    <details className="group bg-cm-surface border border-cm-border rounded-xl overflow-hidden" open>
      <summary className="flex items-center justify-between gap-4 px-5 py-4 cursor-pointer list-none select-none hover:bg-cm-elevated/40 transition-colors">
        <div className="flex items-center gap-3">
          <div>
            <h2 className="text-sm font-semibold text-cm-white">{title}</h2>
            {subtitle && <p className="text-xs text-cm-subtle mt-0.5">{subtitle}</p>}
          </div>
          {badge}
        </div>
        <ChevronDown size={16} className="text-cm-subtle transition-transform group-open:rotate-180 flex-shrink-0" />
      </summary>
      <div className="px-5 pb-5 pt-1 space-y-4 border-t border-cm-border">{children}</div>
    </details>
  )
}

function Row({ children, cols = 2 }: { children: ReactNode; cols?: 1 | 2 | 3 }) {
  const c = cols === 1 ? '' : cols === 3 ? 'sm:grid-cols-3' : 'sm:grid-cols-2'
  return <div className={`grid grid-cols-1 ${c} gap-4`}>{children}</div>
}

function LinkFields({ value, onChange, labelText = 'Button label' }: { value: CMLink; onChange: (v: CMLink) => void; labelText?: string }) {
  return (
    <Row>
      <Input label={labelText} value={value.label} onChange={e => onChange({ ...value, label: e.target.value })} />
      <Input label="Link / href" value={value.href} onChange={e => onChange({ ...value, href: e.target.value })} />
    </Row>
  )
}

// A bordered, removable card for one item in a repeatable list.
function ItemCard({ index, total, onRemove, onMove, children }: {
  index: number; total: number
  onRemove: () => void; onMove: (dir: -1 | 1) => void; children: ReactNode
}) {
  return (
    <div className="bg-cm-elevated/40 border border-cm-border rounded-lg p-4 space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-cm-subtle uppercase tracking-widest">#{index + 1}</span>
        <div className="flex items-center gap-1">
          <button type="button" disabled={index === 0} onClick={() => onMove(-1)} aria-label="Move up"
            className="p-1.5 rounded-md text-cm-subtle hover:text-cm-text hover:bg-cm-elevated disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
            <ArrowUp size={13} />
          </button>
          <button type="button" disabled={index === total - 1} onClick={() => onMove(1)} aria-label="Move down"
            className="p-1.5 rounded-md text-cm-subtle hover:text-cm-text hover:bg-cm-elevated disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
            <ArrowDown size={13} />
          </button>
          <button type="button" onClick={onRemove} aria-label="Remove"
            className="p-1.5 rounded-md text-cm-subtle hover:text-red-400 hover:bg-red-400/10 transition-colors">
            <Trash2 size={13} />
          </button>
        </div>
      </div>
      {children}
    </div>
  )
}

function AddButton({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <button type="button" onClick={onClick}
      className="flex items-center gap-2 text-sm text-cm-accent hover:text-cm-white transition-colors">
      <Plus size={14} /> {label}
    </button>
  )
}

// ── Editor ──────────────────────────────────────────────────────
export default function LandingEditor({ initialContentEn, initialContentId, initialSeoEn, initialSeoId }: {
  initialContentEn: CMLandingContent; initialContentId: CMLandingContent
  initialSeoEn: CMLandingSeo; initialSeoId: CMLandingSeo
}) {
  const [contentEn, setContentEn] = useState<CMLandingContent>(initialContentEn)
  const [contentId, setContentId] = useState<CMLandingContent>(initialContentId)
  const [seoEn, setSeoEn] = useState<CMLandingSeo>(initialSeoEn)
  const [seoId, setSeoId] = useState<CMLandingSeo>(initialSeoId)
  const [editLocale, setEditLocale] = useState<'en' | 'id'>('en')
  const [pending, startTransition] = useTransition()
  const [status, setStatus] = useState<'idle' | 'saved' | 'error'>('idle')
  const [error, setError] = useState<string | null>(null)

  // The form always edits the active-locale document in place; EN and ID are
  // saved together so the public page can fall back EN→ID per field.
  const content = editLocale === 'en' ? contentEn : contentId
  const setContent = editLocale === 'en' ? setContentEn : setContentId
  const seo = editLocale === 'en' ? seoEn : seoId
  const setSeo = editLocale === 'en' ? setSeoEn : setSeoId

  // Immutable editing via structuredClone of the active-locale document.
  function edit(fn: (d: CMLandingContent) => void) {
    setStatus('idle')
    setContent(prev => { const d = structuredClone(prev); fn(d); return d })
  }
  function editSeo(fn: (d: CMLandingSeo) => void) {
    setStatus('idle')
    setSeo(prev => { const d = structuredClone(prev); fn(d); return d })
  }

  function move<T>(arr: T[], i: number, dir: -1 | 1) {
    const j = i + dir
    if (j < 0 || j >= arr.length) return
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }

  function save() {
    setError(null)
    startTransition(async () => {
      try {
        await updateLandingContent(contentEn, seoEn, contentId, seoId)
        setStatus('saved')
      } catch (e) {
        setStatus('error')
        setError(e instanceof Error ? e.message : 'Failed to save')
      }
    })
  }

  function resetDefaults() {
    const isEn = editLocale === 'en'
    if (!confirm(`Reset the ${isEn ? 'English' : 'Indonesian'} fields to the built-in defaults? This only changes the editor — you still need to Save.`)) return
    if (isEn) {
      setContentEn(structuredClone(LANDING_DEFAULTS))
      setSeoEn(structuredClone(SEO_DEFAULTS))
    } else {
      setContentId(structuredClone(LANDING_DEFAULTS_ID))
      setSeoId(structuredClone(SEO_DEFAULTS))
    }
    setStatus('idle')
  }

  // Per-section "needs ID" badge — only meaningful while editing Indonesian.
  function secBadge(key: keyof CMLandingContent) {
    if (editLocale !== 'id') return undefined
    const n = countUntranslated(contentEn[key], contentId[key], key as string)
    if (n === 0) return undefined
    return (
      <span className="inline-flex items-center rounded-full bg-amber-400/15 text-amber-300 text-[10px] font-semibold px-2 py-0.5 uppercase tracking-wide whitespace-nowrap">
        {n} need ID
      </span>
    )
  }

  const totalUntranslated = countUntranslated(contentEn, contentId)

  const { meta, hero, services, projects, proof, process, pricing, demos, designs, finalCta, footer } = content

  return (
    <div className="px-4 md:px-8 py-8 animate-cm-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-cm-white">Landing Page</h1>
          <p className="text-sm text-cm-subtle mt-1">Edit every section of the public /croissantsmoon page.</p>
        </div>
        <a href={`/croissantsmoon/${editLocale}`} target="_blank" rel="noopener noreferrer"
          className="hidden sm:inline-flex items-center gap-2 text-sm text-cm-subtle hover:text-cm-text transition-colors">
          <ExternalLink size={14} /> View live ({editLocale.toUpperCase()})
        </a>
      </div>

      {/* Language being edited. EN + ID are stored separately and saved together;
          on the public page any untranslated ID field falls back to English. */}
      <div className="flex flex-wrap items-center gap-3 mb-6 max-w-3xl">
        <div className="inline-flex rounded-lg border border-cm-border bg-cm-surface p-1">
          {(['en', 'id'] as const).map(l => (
            <button key={l} type="button" onClick={() => { setEditLocale(l); setStatus('idle') }}
              aria-pressed={editLocale === l}
              className={`px-3.5 py-1.5 text-sm font-medium rounded-md transition-colors ${
                editLocale === l ? 'bg-cm-gold text-cm-black' : 'text-cm-subtle hover:text-cm-text'
              }`}>
              {l === 'en' ? 'English' : 'Bahasa Indonesia'}
            </button>
          ))}
        </div>
        {editLocale === 'id' && (
          <span className="text-xs text-cm-subtle">
            {totalUntranslated > 0
              ? `${totalUntranslated} field${totalUntranslated === 1 ? '' : 's'} still match English — translate to clear the badges.`
              : 'All fields translated ✓'}
          </span>
        )}
      </div>

      <div className="space-y-4 max-w-3xl pb-28">

        {/* PAGE SECTIONS — order + visibility (locale-neutral, edit in EN) */}
        {editLocale === 'en' && content.sections && (
          <Section title="Page Sections" subtitle="Reorder or hide sections. Order &amp; visibility apply to both languages.">
            <div className="space-y-2">
              {content.sections.map((s, i) => (
                <div key={s.key} className="flex items-center gap-3 bg-cm-elevated/40 border border-cm-border rounded-lg px-3 py-2">
                  <span className="text-xs text-cm-subtle w-5 text-center">{i + 1}</span>
                  <span className="flex-1 text-sm text-cm-text">{SECTION_LABELS[s.key] ?? s.key}</span>
                  <label className="flex items-center gap-1.5 text-xs text-cm-subtle select-none">
                    <input type="checkbox" checked={s.visible} className="accent-cm-gold"
                      onChange={(e) => edit((d) => { if (d.sections) d.sections[i].visible = e.target.checked })} />
                    Visible
                  </label>
                  <button type="button" disabled={i === 0} aria-label={`Move ${SECTION_LABELS[s.key] ?? s.key} up`}
                    onClick={() => edit((d) => { if (d.sections) move(d.sections, i, -1) })}
                    className="p-1.5 rounded-md text-cm-subtle hover:text-cm-text hover:bg-cm-elevated disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
                    <ArrowUp size={13} />
                  </button>
                  <button type="button" disabled={i === content.sections!.length - 1} aria-label={`Move ${SECTION_LABELS[s.key] ?? s.key} down`}
                    onClick={() => edit((d) => { if (d.sections) move(d.sections, i, 1) })}
                    className="p-1.5 rounded-md text-cm-subtle hover:text-cm-text hover:bg-cm-elevated disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
                    <ArrowDown size={13} />
                  </button>
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* GLOBAL LINKS */}
        <Section title="Global Links" subtitle="Shared targets used across CTAs, footer and branding.">
          <Row>
            <Input label="Proposal href" value={meta.proposalHref} onChange={e => edit(d => { d.meta.proposalHref = e.target.value })} />
            <Input label="Email (mailto:)" value={meta.email} onChange={e => edit(d => { d.meta.email = e.target.value })} />
          </Row>
          <Row>
            <Input label="GitHub URL" value={meta.githubUrl} onChange={e => edit(d => { d.meta.githubUrl = e.target.value })} />
            <Input label="LinkedIn URL" value={meta.linkedinUrl} onChange={e => edit(d => { d.meta.linkedinUrl = e.target.value })} />
          </Row>
          <Row>
            <Input label="Site URL" value={meta.siteUrl} onChange={e => edit(d => { d.meta.siteUrl = e.target.value })} />
            <Input label="Logo image src" value={meta.logoSrc} onChange={e => edit(d => { d.meta.logoSrc = e.target.value })} />
          </Row>
        </Section>

        {/* HERO */}
        <Section title="Hero" subtitle="The first thing visitors see." badge={secBadge('hero')}>
          <Input label="Eyebrow" value={hero.eyebrow} onChange={e => edit(d => { d.hero.eyebrow = e.target.value })} />
          <Row>
            <Input label="Title line 1" value={hero.titleLine1} onChange={e => edit(d => { d.hero.titleLine1 = e.target.value })} />
            <Input label="Title line 2" value={hero.titleLine2} onChange={e => edit(d => { d.hero.titleLine2 = e.target.value })} />
          </Row>
          <Textarea label="Subtitle" value={hero.subtitle} onChange={e => edit(d => { d.hero.subtitle = e.target.value })} rows={2} />
          <LinkFields value={hero.primaryCta} onChange={v => edit(d => { d.hero.primaryCta = v })} labelText="Primary CTA label" />
          <LinkFields value={hero.ghostCta} onChange={v => edit(d => { d.hero.ghostCta = v })} labelText="Secondary CTA label" />
          <Row>
            <Input label="Trust line" value={hero.trust} onChange={e => edit(d => { d.hero.trust = e.target.value })} />
            <Input label="Background wordmark" value={hero.wordmark} onChange={e => edit(d => { d.hero.wordmark = e.target.value })} />
          </Row>
        </Section>

        {/* SERVICES */}
        <Section title="Services" subtitle="The “What We Build” cards." badge={secBadge('services')}>
          <Row>
            <Input label="Section label" value={services.label} onChange={e => edit(d => { d.services.label = e.target.value })} />
            <Input label="Heading" value={services.heading} onChange={e => edit(d => { d.services.heading = e.target.value })} />
          </Row>
          {services.items.map((s, i) => (
            <ItemCard key={s.id} index={i} total={services.items.length}
              onRemove={() => edit(d => { d.services.items.splice(i, 1) })}
              onMove={dir => edit(d => move(d.services.items, i, dir))}>
              <Row cols={3}>
                <Input label="Number" value={s.num} onChange={e => edit(d => { d.services.items[i].num = e.target.value })} />
                <Input label="Name" value={s.name} onChange={e => edit(d => { d.services.items[i].name = e.target.value })} />
                <Select label="Icon" options={ICON_OPTIONS} value={s.icon}
                  onChange={e => edit(d => { d.services.items[i].icon = e.target.value as CMIconName })} />
              </Row>
              <Textarea label="Description" value={s.desc} onChange={e => edit(d => { d.services.items[i].desc = e.target.value })} rows={2} />
              <Input label="Price" value={s.price} onChange={e => edit(d => { d.services.items[i].price = e.target.value })} />
            </ItemCard>
          ))}
          <AddButton label="Add service"
            onClick={() => edit(d => { d.services.items.push({ id: uid(), num: '', name: '', icon: 'Monitor', desc: '', price: '' }) })} />
        </Section>

        {/* PROJECTS */}
        <Section title="Featured Projects" subtitle="The “Selected Work” grid." badge={secBadge('projects')}>
          <Row>
            <Input label="Section label" value={projects.label} onChange={e => edit(d => { d.projects.label = e.target.value })} />
            <Input label="Heading" value={projects.heading} onChange={e => edit(d => { d.projects.heading = e.target.value })} />
          </Row>
          <LinkFields value={projects.viewAll} onChange={v => edit(d => { d.projects.viewAll = v })} labelText="“View all” label" />
          {projects.items.map((p, i) => (
            <ItemCard key={p.id} index={i} total={projects.items.length}
              onRemove={() => edit(d => { d.projects.items.splice(i, 1) })}
              onMove={dir => edit(d => move(d.projects.items, i, dir))}>
              <Row>
                <Input label="Category" value={p.cat} onChange={e => edit(d => { d.projects.items[i].cat = e.target.value })} />
                <Input label="Name" value={p.name} onChange={e => edit(d => { d.projects.items[i].name = e.target.value })} />
              </Row>
              <Textarea label="Description" value={p.desc} onChange={e => edit(d => { d.projects.items[i].desc = e.target.value })} rows={2} />
              <Textarea label="Tech stack (one per line)" value={toLines(p.stack)}
                onChange={e => edit(d => { d.projects.items[i].stack = fromLines(e.target.value) })} rows={3} />
              <Row>
                <Input label="GitHub URL" value={p.github} onChange={e => edit(d => { d.projects.items[i].github = e.target.value })} />
                <Input label="Live URL" value={p.live} onChange={e => edit(d => { d.projects.items[i].live = e.target.value })} />
              </Row>
            </ItemCard>
          ))}
          <AddButton label="Add project"
            onClick={() => edit(d => { d.projects.items.push({ id: uid(), cat: '', name: '', desc: '', stack: [], github: '', live: '' }) })} />
        </Section>

        {/* SOCIAL PROOF */}
        <Section title="Testimonials & Stats" subtitle="Quotes plus the stat bar." badge={secBadge('proof')}>
          <Row>
            <Input label="Section label" value={proof.label} onChange={e => edit(d => { d.proof.label = e.target.value })} />
            <Input label="Heading" value={proof.heading} onChange={e => edit(d => { d.proof.heading = e.target.value })} />
          </Row>
          <p className="text-xs font-medium text-cm-subtle uppercase tracking-widest pt-2">Testimonials</p>
          {proof.items.map((t, i) => (
            <ItemCard key={t.id} index={i} total={proof.items.length}
              onRemove={() => edit(d => { d.proof.items.splice(i, 1) })}
              onMove={dir => edit(d => move(d.proof.items, i, dir))}>
              <Textarea label="Quote" value={t.quote} onChange={e => edit(d => { d.proof.items[i].quote = e.target.value })} rows={3} />
              <Input label="Attribution" value={t.who} onChange={e => edit(d => { d.proof.items[i].who = e.target.value })} />
            </ItemCard>
          ))}
          <AddButton label="Add testimonial"
            onClick={() => edit(d => { d.proof.items.push({ id: uid(), quote: '', who: '' }) })} />

          <p className="text-xs font-medium text-cm-subtle uppercase tracking-widest pt-4">Stats</p>
          {proof.stats.map((s, i) => (
            <ItemCard key={s.id} index={i} total={proof.stats.length}
              onRemove={() => edit(d => { d.proof.stats.splice(i, 1) })}
              onMove={dir => edit(d => move(d.proof.stats, i, dir))}>
              <Row>
                <Input label="Value" value={s.value} onChange={e => edit(d => { d.proof.stats[i].value = e.target.value })} />
                <Input label="Label" value={s.label} onChange={e => edit(d => { d.proof.stats[i].label = e.target.value })} />
              </Row>
            </ItemCard>
          ))}
          <AddButton label="Add stat"
            onClick={() => edit(d => { d.proof.stats.push({ id: uid(), value: '', label: '' }) })} />
        </Section>

        {/* PROCESS */}
        <Section title="How It Works" subtitle="The numbered process steps." badge={secBadge('process')}>
          <Row>
            <Input label="Section label" value={process.label} onChange={e => edit(d => { d.process.label = e.target.value })} />
            <Input label="Heading" value={process.heading} onChange={e => edit(d => { d.process.heading = e.target.value })} />
          </Row>
          {process.items.map((step, i) => (
            <ItemCard key={step.id} index={i} total={process.items.length}
              onRemove={() => edit(d => { d.process.items.splice(i, 1) })}
              onMove={dir => edit(d => move(d.process.items, i, dir))}>
              <Row>
                <Input label="Number" value={step.num} onChange={e => edit(d => { d.process.items[i].num = e.target.value })} />
                <Input label="Name" value={step.name} onChange={e => edit(d => { d.process.items[i].name = e.target.value })} />
              </Row>
              <Textarea label="Text" value={step.text} onChange={e => edit(d => { d.process.items[i].text = e.target.value })} rows={2} />
            </ItemCard>
          ))}
          <AddButton label="Add step"
            onClick={() => edit(d => { d.process.items.push({ id: uid(), num: '', name: '', text: '' }) })} />
        </Section>

        {/* PRICING */}
        <Section title="Pricing" subtitle="Founding banner and pricing tiers." badge={secBadge('pricing')}>
          <Row>
            <Input label="Section label" value={pricing.label} onChange={e => edit(d => { d.pricing.label = e.target.value })} />
            <Input label="Heading" value={pricing.heading} onChange={e => edit(d => { d.pricing.heading = e.target.value })} />
          </Row>
          <Textarea label="Founding note (follows “Founding Rate —”)" value={pricing.foundingNote}
            onChange={e => edit(d => { d.pricing.foundingNote = e.target.value })} rows={2} />
          <LinkFields value={pricing.foundingCta} onChange={v => edit(d => { d.pricing.foundingCta = v })} labelText="Founding CTA label" />
          <Input label="Payment terms line" value={pricing.paymentTerms} onChange={e => edit(d => { d.pricing.paymentTerms = e.target.value })} />
          {pricing.items.map((t, i) => (
            <ItemCard key={t.id} index={i} total={pricing.items.length}
              onRemove={() => edit(d => { d.pricing.items.splice(i, 1) })}
              onMove={dir => edit(d => move(d.pricing.items, i, dir))}>
              <Row>
                <Input label="Name" value={t.name} onChange={e => edit(d => { d.pricing.items[i].name = e.target.value })} />
                <Input label="Timeline" value={t.timeline} onChange={e => edit(d => { d.pricing.items[i].timeline = e.target.value })} />
              </Row>
              <Row>
                <Input label="Price" value={t.price} onChange={e => edit(d => { d.pricing.items[i].price = e.target.value })} />
                <Input label="Note" value={t.note} onChange={e => edit(d => { d.pricing.items[i].note = e.target.value })} />
              </Row>
              <label className="flex items-center gap-2 text-sm text-cm-text">
                <input type="checkbox" checked={t.featured}
                  onChange={e => edit(d => { d.pricing.items[i].featured = e.target.checked })}
                  className="accent-cm-accent" />
                Featured (“Most common” flag)
              </label>
              <Textarea label="Features (one per line)" value={toLines(t.features)}
                onChange={e => edit(d => { d.pricing.items[i].features = fromLines(e.target.value) })} rows={6} />
            </ItemCard>
          ))}
          <AddButton label="Add tier"
            onClick={() => edit(d => { d.pricing.items.push({ id: uid(), name: '', timeline: '', price: '', note: '', featured: false, features: [] }) })} />
        </Section>

        {/* DEMOS */}
        <Section title="Demo Experiences" subtitle="The large demo cards." badge={secBadge('demos')}>
          <Row>
            <Input label="Section label" value={demos.label} onChange={e => edit(d => { d.demos.label = e.target.value })} />
            <Input label="Heading" value={demos.heading} onChange={e => edit(d => { d.demos.heading = e.target.value })} />
          </Row>
          <Input label="“Discuss this project” label" value={demos.discussLabel} onChange={e => edit(d => { d.demos.discussLabel = e.target.value })} />
          {demos.items.map((dm, i) => (
            <ItemCard key={dm.id} index={i} total={demos.items.length}
              onRemove={() => edit(d => { d.demos.items.splice(i, 1) })}
              onMove={dir => edit(d => move(d.demos.items, i, dir))}>
              <Row cols={3}>
                <Input label="Number" value={dm.num} onChange={e => edit(d => { d.demos.items[i].num = e.target.value })} />
                <Input label="Category" value={dm.cat} onChange={e => edit(d => { d.demos.items[i].cat = e.target.value })} />
                <Input label="Title" value={dm.title} onChange={e => edit(d => { d.demos.items[i].title = e.target.value })} />
              </Row>
              <Textarea label="Description" value={dm.desc} onChange={e => edit(d => { d.demos.items[i].desc = e.target.value })} rows={3} />
              <Textarea label="Tags (one per line)" value={toLines(dm.tags)}
                onChange={e => edit(d => { d.demos.items[i].tags = fromLines(e.target.value) })} rows={3} />
              <div className="space-y-3">
                <p className="text-xs font-medium text-cm-subtle uppercase tracking-widest">Demo links</p>
                {dm.links.map((ln, j) => (
                  <div key={j} className="flex items-end gap-2">
                    <div className="flex-1"><LinkFields value={ln} onChange={v => edit(d => { d.demos.items[i].links[j] = v })} labelText="Link label" /></div>
                    <button type="button" onClick={() => edit(d => { d.demos.items[i].links.splice(j, 1) })} aria-label="Remove link"
                      className="p-2 mb-0.5 rounded-md text-cm-subtle hover:text-red-400 hover:bg-red-400/10 transition-colors">
                      <Trash2 size={13} />
                    </button>
                  </div>
                ))}
                <AddButton label="Add link" onClick={() => edit(d => { d.demos.items[i].links.push({ label: '', href: '' }) })} />
              </div>
            </ItemCard>
          ))}
          <AddButton label="Add demo"
            onClick={() => edit(d => { d.demos.items.push({ id: uid(), num: '', cat: '', title: '', desc: '', tags: [], links: [] }) })} />
        </Section>

        {/* DESIGNS */}
        <Section title="Visual Identity" subtitle="Design work cards. Images load from {base}/{folder}/1.png." badge={secBadge('designs')}>
          <Row>
            <Input label="Section label" value={designs.label} onChange={e => edit(d => { d.designs.label = e.target.value })} />
            <Input label="Heading" value={designs.heading} onChange={e => edit(d => { d.designs.heading = e.target.value })} />
          </Row>
          <Input label="Image base path" value={designs.imageBase} onChange={e => edit(d => { d.designs.imageBase = e.target.value })}
            hint="Each card shows {base}/{folder}/1.png" />
          <LinkFields value={designs.viewAll} onChange={v => edit(d => { d.designs.viewAll = v })} labelText="“View all” label" />
          {designs.items.map((g, i) => (
            <ItemCard key={g.id} index={i} total={designs.items.length}
              onRemove={() => edit(d => { d.designs.items.splice(i, 1) })}
              onMove={dir => edit(d => move(d.designs.items, i, dir))}>
              <Row>
                <Input label="Title" value={g.title} onChange={e => edit(d => { d.designs.items[i].title = e.target.value })} />
                <Input label="Category" value={g.cat} onChange={e => edit(d => { d.designs.items[i].cat = e.target.value })} />
              </Row>
              <Row>
                <Input label="Institution" value={g.inst} onChange={e => edit(d => { d.designs.items[i].inst = e.target.value })} />
                <Input label="Image folder" value={g.folder} onChange={e => edit(d => { d.designs.items[i].folder = e.target.value })} />
              </Row>
              <Input label="Link href" value={g.href} onChange={e => edit(d => { d.designs.items[i].href = e.target.value })} />
            </ItemCard>
          ))}
          <AddButton label="Add design"
            onClick={() => edit(d => { d.designs.items.push({ id: uid(), title: '', cat: '', inst: '', folder: '', href: '/croissantsmoon/designs' }) })} />
        </Section>

        {/* FINAL CTA */}
        <Section title="Final CTA" subtitle="The closing call-to-action band." badge={secBadge('finalCta')}>
          <Row>
            <Input label="Label" value={finalCta.label} onChange={e => edit(d => { d.finalCta.label = e.target.value })} />
            <Input label="Heading" value={finalCta.heading} onChange={e => edit(d => { d.finalCta.heading = e.target.value })} />
          </Row>
          <Textarea label="Subtitle" value={finalCta.subtitle} onChange={e => edit(d => { d.finalCta.subtitle = e.target.value })} rows={2} />
          <LinkFields value={finalCta.primaryCta} onChange={v => edit(d => { d.finalCta.primaryCta = v })} labelText="Primary CTA label" />
          <Input label="Email button label" value={finalCta.ghostLabel} onChange={e => edit(d => { d.finalCta.ghostLabel = e.target.value })} />
        </Section>

        {/* FOOTER */}
        <Section title="Footer" subtitle="Brand line, links and fine print." badge={secBadge('footer')}>
          <Input label="Brand name" value={footer.brand} onChange={e => edit(d => { d.footer.brand = e.target.value })} />
          <Row>
            <Input label="Copyright" value={footer.copyright} onChange={e => edit(d => { d.footer.copyright = e.target.value })} />
            <Input label="Location" value={footer.location} onChange={e => edit(d => { d.footer.location = e.target.value })} />
          </Row>
          <p className="text-xs font-medium text-cm-subtle uppercase tracking-widest pt-2">Links</p>
          {footer.links.map((l, i) => (
            <div key={i} className="flex items-end gap-2">
              <div className="flex-1"><LinkFields value={l} onChange={v => edit(d => { d.footer.links[i] = v })} labelText="Link label" /></div>
              <button type="button" onClick={() => edit(d => { d.footer.links.splice(i, 1) })} aria-label="Remove link"
                className="p-2 mb-0.5 rounded-md text-cm-subtle hover:text-red-400 hover:bg-red-400/10 transition-colors">
                <Trash2 size={13} />
              </button>
            </div>
          ))}
          <AddButton label="Add footer link" onClick={() => edit(d => { d.footer.links.push({ label: '', href: '' }) })} />
        </Section>

        {/* SEO */}
        <Section title="SEO & Social" subtitle="Page title, meta description and Open Graph.">
          <Input label="Page title" value={seo.title} onChange={e => editSeo(d => { d.title = e.target.value })} />
          <Textarea label="Meta description" value={seo.description} onChange={e => editSeo(d => { d.description = e.target.value })} rows={2} />
          <Row>
            <Input label="OG title" value={seo.ogTitle} onChange={e => editSeo(d => { d.ogTitle = e.target.value })} />
            <Input label="OG image path" value={seo.ogImage} onChange={e => editSeo(d => { d.ogImage = e.target.value })} />
          </Row>
          <Textarea label="OG description" value={seo.ogDescription} onChange={e => editSeo(d => { d.ogDescription = e.target.value })} rows={2} />
          <Textarea label="Keywords (one per line)" value={toLines(seo.keywords)}
            onChange={e => editSeo(d => { d.keywords = fromLines(e.target.value) })} rows={5} />
        </Section>
      </div>

      {/* Sticky save bar */}
      <div className="fixed bottom-0 inset-x-0 md:left-60 z-20 bg-cm-surface/95 backdrop-blur border-t border-cm-border px-4 md:px-8 py-3 flex items-center justify-between gap-4">
        <div className="text-sm min-h-[20px]">
          {status === 'saved' && <span className="text-emerald-400">Saved — live page updated.</span>}
          {status === 'error' && <span className="text-red-400">{error ?? 'Save failed.'}</span>}
          {status === 'idle' && <span className="text-cm-subtle">Unsaved changes are local until you Save.</span>}
        </div>
        <div className="flex items-center gap-2">
          <Button type="button" variant="ghost" size="md" onClick={resetDefaults} disabled={pending}>
            <RotateCcw size={14} /> <span className="hidden sm:inline">Reset to defaults</span>
          </Button>
          <Button type="button" variant="primary" size="md" loading={pending} onClick={save}>
            <Save size={14} /> Save changes
          </Button>
        </div>
      </div>
    </div>
  )
}
