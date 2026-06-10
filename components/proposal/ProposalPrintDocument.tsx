'use client'

// ─────────────────────────────────────────────────────────────────
// Print / PDF rendering of a proposal.
//
// Same content (proposal.content.sections) as the live celestial portal,
// re-laid-out as a paginated A4 *document* for the browser's native
// "Save as PDF" (window.print):
//   • the celestial theme (dark gradient + gold) is kept, full-bleed;
//   • MS-Word "Normal" margins (25.4mm) as inner padding on every page;
//   • each section starts on its own page, with a running logo header;
//   • the Current-State analysis is a row-aligned What / Why / How table.
//
// Authorisation lives in the route (cookie gate OR authenticated admin);
// this component only renders.
// ─────────────────────────────────────────────────────────────────

import { useCallback, useEffect, useState } from 'react'
import { Moon, Download, ArrowLeft, ExternalLink } from 'lucide-react'
import type { Proposal, ProposalBlock } from '@/types'
import { PORTAL_SECTION_TEXT, PORTAL_UI, type CMLocale } from '@/lib/cm/i18n'
import { LangToggle } from '@/components/cm/LangToggle'

// ── Helpers ───────────────────────────────────────────────────
function interpolate(text: string, vars: Record<string, string>): string {
  return text.replace(/\{\{(\w+)\}\}/g, (_, key) => vars[key] ?? `{{${key}}}`)
}

function rgba(hex: string, a: number): string {
  const h = hex.replace('#', '')
  return `rgba(${parseInt(h.slice(0, 2), 16)},${parseInt(h.slice(2, 4), 16)},${parseInt(h.slice(4, 6), 16)},${a})`
}

// One row per line; columns separated by " - " (space-dash-space) — matches portal.
function parseTable(text: string): string[][] {
  return text
    .split('\n').map(l => l.trim()).filter(Boolean)
    .map(line => line.split(/\s+-\s+/).map(c => c.trim()))
}

// ── Celestial palette ─────────────────────────────────────────
const TEXT = '#D9E6FF'
const MUTED = '#8FA8D6'
const FAINT = 'rgba(143,168,214,0.55)'
const GOLD = '#D4B15A'
const AURORA = '#6FA8FF'
const VIOLET = '#C9A9FF'
const SKY = '#A0C4FF'
const MINT = '#7DC9A0'

const SECTION_ACCENT: Record<string, string> = {
  audit_findings: AURORA,
  website_analysis: AURORA,
  redesign_concept: VIOLET,
  features: SKY,
  pricing: GOLD,
  timeline: MINT,
  infrastructure: MINT,
  demo_embed: AURORA,
  gallery: VIOLET,
}

// Major content sections that get a numbered editorial header (mirrors portal).
const NUMBERED_TYPES = new Set([
  'audit_findings', 'website_analysis', 'redesign_concept',
  'features', 'timeline', 'infrastructure', 'demo_embed', 'gallery',
])

// ── Small presentational pieces ───────────────────────────────
function SectionHeader({
  number, accent, eyebrow, title,
}: { number?: string | null; accent: string; eyebrow: string; title: string }) {
  return (
    <div style={{ marginBottom: '22px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
        {number && (
          <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: '13px', fontWeight: 600, color: accent }}>
            {number}
          </span>
        )}
        <span style={{ width: '30px', height: '1px', background: `linear-gradient(to right, ${accent}, transparent)` }} />
        <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.24em', textTransform: 'uppercase', color: accent }}>
          {eyebrow}
        </span>
      </div>
      <h2 className="pp-serif" style={{ fontSize: '30px', fontWeight: 300, lineHeight: 1.15, color: TEXT, margin: 0 }}>
        {title}
      </h2>
    </div>
  )
}

function SubLabel({ label, accent }: { label: string; accent: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: '0 0 14px' }}>
      <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: accent }}>
        {label}
      </span>
      <span style={{ flex: 1, height: '1px', background: rgba('#6FA8FF', 0.14) }} />
    </div>
  )
}

function Card({ accent, children, style }: { accent: string; children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div
      className="pp-avoid-break"
      style={{
        background: rgba('#0B1E3A', 0.5),
        border: `1px solid ${rgba(accent, 0.18)}`,
        borderRadius: '12px',
        padding: '15px 17px',
        ...style,
      }}
    >
      {children}
    </div>
  )
}

function PointList({ items, accent }: { items: string[]; accent: string }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px 14px' }}>
      {items.map((line, i) => (
        <Card key={i} accent={accent} style={{ display: 'flex', gap: '11px' }}>
          <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: '11px', fontWeight: 600, color: rgba(accent, 0.8), flexShrink: 0 }}>
            {String(i + 1).padStart(2, '0')}
          </span>
          <span style={{ fontSize: '12.5px', lineHeight: 1.65, color: rgba('#D9E6FF', 0.74) }}>{line}</span>
        </Card>
      ))}
    </div>
  )
}

function DataTable({ rows, accent }: { rows: string[][]; accent: string }) {
  if (rows.length === 0) return null
  const maxCols = Math.max(...rows.map(r => r.length))
  return (
    <div
      className="pp-avoid-break"
      style={{ border: `1px solid ${rgba(accent, 0.18)}`, borderRadius: '12px', overflow: 'hidden', background: rgba('#0B1E3A', 0.5) }}
    >
      {rows.map((cells, i) => (
        <div
          key={i}
          style={{
            display: 'grid',
            gridTemplateColumns: maxCols > 1 ? `minmax(120px, 0.7fr) repeat(${maxCols - 1}, 1fr)` : '1fr',
            gap: '0 18px',
            padding: '12px 17px',
            borderTop: i > 0 ? `1px solid ${rgba(accent, 0.12)}` : 'none',
            background: i % 2 === 1 ? rgba('#6FA8FF', 0.04) : 'transparent',
          }}
        >
          {Array.from({ length: maxCols }).map((_, c) => {
            const cell = cells[c] ?? ''
            return (
              <span
                key={c}
                style={{
                  fontSize: '12.5px',
                  lineHeight: 1.6,
                  color: c === 0 ? accent : rgba('#D9E6FF', 0.74),
                  fontWeight: c === 0 ? 600 : 400,
                }}
              >
                {cell}
              </span>
            )
          })}
        </div>
      ))}
    </div>
  )
}

// What we found · Why it matters · How we solve it — one aligned row per finding.
function WhatWhyHowTable({
  what, why, how, labels,
}: {
  what: string[]; why: string[]; how: string[]
  labels: { what: string; why: string; how: string }
}) {
  const cols = [
    { items: what, label: labels.what, accent: AURORA },
    { items: why, label: labels.why, accent: GOLD },
    { items: how, label: labels.how, accent: MINT },
  ]
  const n = Math.max(what.length, why.length, how.length)
  if (n === 0) return null

  return (
    <div
      className="pp-avoid-break"
      style={{ border: `1px solid ${rgba('#6FA8FF', 0.16)}`, borderRadius: '12px', overflow: 'hidden', background: rgba('#0B1E3A', 0.5) }}
    >
      {/* Column header */}
      <div style={{ display: 'grid', gridTemplateColumns: '26px 1fr 1fr 1fr', background: rgba('#030712', 0.4) }}>
        <span style={{ borderBottom: `1px solid ${rgba('#6FA8FF', 0.16)}` }} />
        {cols.map(col => (
          <span
            key={col.label}
            style={{
              padding: '11px 14px',
              fontSize: '9.5px', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase',
              color: col.accent,
              borderBottom: `1px solid ${rgba('#6FA8FF', 0.16)}`,
              borderLeft: `1px solid ${rgba('#6FA8FF', 0.1)}`,
            }}
          >
            {col.label}
          </span>
        ))}
      </div>
      {/* Aligned rows */}
      {Array.from({ length: n }).map((_, i) => (
        <div
          key={i}
          className="pp-avoid-break"
          style={{
            display: 'grid', gridTemplateColumns: '26px 1fr 1fr 1fr',
            borderTop: i > 0 ? `1px solid ${rgba('#6FA8FF', 0.1)}` : 'none',
            background: i % 2 === 1 ? rgba('#6FA8FF', 0.03) : 'transparent',
          }}
        >
          <span style={{ padding: '12px 0 12px 12px', fontFamily: 'ui-monospace, monospace', fontSize: '10px', fontWeight: 600, color: rgba(GOLD, 0.7) }}>
            {String(i + 1).padStart(2, '0')}
          </span>
          {cols.map(col => (
            <span
              key={col.label}
              style={{
                padding: '12px 14px',
                fontSize: '12px', lineHeight: 1.6, color: rgba('#D9E6FF', 0.74),
                borderLeft: `1px solid ${rgba('#6FA8FF', 0.08)}`,
              }}
            >
              {col.items[i] ?? ''}
            </span>
          ))}
        </div>
      ))}
    </div>
  )
}

// ── Block content (returns null when a section has nothing to show) ──
function blockContent(
  block: ProposalBlock,
  vars: Record<string, string>,
  sectionNumber: string | null,
  locale: CMLocale,
): React.ReactNode | null {
  const data = block.data as Record<string, string>
  const interp = (s: string) => interpolate(s, vars)
  const t = PORTAL_UI[locale]
  const sec = PORTAL_SECTION_TEXT[locale][block.type]
  const accent = SECTION_ACCENT[block.type] ?? AURORA
  const eyebrow = sec?.eyebrow ?? ''
  const title = sec?.title ?? ''

  switch (block.type) {
    case 'hero':
      return null // rendered on the cover

    case 'greeting': {
      const message = interp(data.message ?? '')
      if (!message) return null
      return (
        <>
          <SubLabel label={t.aNoteForYou} accent={GOLD} />
          <p className="pp-serif" style={{ fontSize: '19px', fontWeight: 300, lineHeight: 1.7, color: rgba('#D9E6FF', 0.9), whiteSpace: 'pre-line', margin: 0 }}>
            {message}
          </p>
        </>
      )
    }

    case 'audit_findings':
    case 'website_analysis': {
      const what = interp(data.what ?? '').split('\n').filter(Boolean)
      const why = interp(data.why ?? '').split('\n').filter(Boolean)
      const how = interp(data.how ?? '').split('\n').filter(Boolean)
      const hasStructured = what.length || why.length || how.length
      const legacy = interp(data.findings ?? data.analysis ?? '').split('\n').filter(Boolean)
      if (!hasStructured && legacy.length === 0) return null
      return (
        <>
          <SectionHeader number={sectionNumber} accent={accent} eyebrow={eyebrow} title={title} />
          {hasStructured ? (
            <WhatWhyHowTable
              what={what} why={why} how={how}
              labels={{ what: t.whatWeFound, why: t.whyItMatters, how: t.howWeSolveIt }}
            />
          ) : (
            <PointList items={legacy} accent={accent} />
          )}
        </>
      )
    }

    case 'redesign_concept': {
      const direction = interp(data.direction ?? data.concept ?? data.description ?? '')
      const toneRows = parseTable(interp(data.tone ?? ''))
      const ideas = interp(data.key_ideas ?? '').split('\n').filter(Boolean)
      if (!direction && toneRows.length === 0 && ideas.length === 0) return null
      return (
        <>
          <SectionHeader number={sectionNumber} accent={accent} eyebrow={eyebrow} title={title} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {direction && (
              <div>
                <SubLabel label={t.direction} accent={accent} />
                <Card accent={accent} style={{ padding: '18px 20px' }}>
                  <p style={{ fontSize: '13px', lineHeight: 1.85, color: rgba('#D9E6FF', 0.76), whiteSpace: 'pre-line', margin: 0 }}>{direction}</p>
                </Card>
              </div>
            )}
            {toneRows.length > 0 && (
              <div>
                <SubLabel label={t.tone} accent={accent} />
                <DataTable rows={toneRows} accent={accent} />
              </div>
            )}
            {ideas.length > 0 && (
              <div>
                <SubLabel label={t.keyIdeas} accent={accent} />
                <PointList items={ideas} accent={accent} />
              </div>
            )}
          </div>
        </>
      )
    }

    case 'features': {
      const features = interp(data.features ?? '').split('\n').filter(Boolean)
      if (features.length === 0) return null
      return (
        <>
          <SectionHeader number={sectionNumber} accent={accent} eyebrow={eyebrow} title={title} />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px 14px' }}>
            {features.map((feature, i) => (
              <Card key={i} accent={accent}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '9px', marginBottom: '9px' }}>
                  <span style={{ width: '24px', height: '24px', borderRadius: '7px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'ui-monospace, monospace', fontSize: '10px', fontWeight: 600, background: rgba(accent, 0.12), border: `1px solid ${rgba(accent, 0.28)}`, color: accent }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span style={{ flex: 1, height: '1px', background: rgba(accent, 0.14) }} />
                </div>
                <p style={{ fontSize: '12.5px', lineHeight: 1.65, color: rgba('#D9E6FF', 0.74), margin: 0 }}>{feature}</p>
              </Card>
            ))}
          </div>
        </>
      )
    }

    case 'pricing': {
      const rawTiers = Array.isArray((block.data as { tiers?: Array<{ name?: string; price?: string; inclusions?: string }> }).tiers)
        ? ((block.data as { tiers?: Array<{ name?: string; price?: string; inclusions?: string }> }).tiers ?? [])
        : []
      let tiers = rawTiers
        .map(tr => ({
          name: interp(tr.name ?? ''),
          price: interp(tr.price ?? ''),
          inclusions: interp(tr.inclusions ?? '').split('\n').filter(Boolean),
        }))
        .filter(tr => tr.price || tr.name || tr.inclusions.length)
      if (tiers.length === 0 && (data.price || data.package || data.inclusions)) {
        tiers = [{
          name: interp(data.package ?? t.packageFallback),
          price: interp(data.price ?? ''),
          inclusions: interp(data.inclusions ?? '').split('\n').filter(Boolean),
        }]
      }
      if (tiers.length === 0) return null
      tiers = tiers.slice(0, 4)

      const parsePrice = (p: string) => {
        const v = parseFloat(p.replace(/[^0-9.]/g, ''))
        return isNaN(v) ? 0 : v
      }
      let recIdx = -1
      if (tiers.length > 1) {
        let max = 0
        tiers.forEach((tr, i) => { const v = parsePrice(tr.price); if (v > max) { max = v; recIdx = i } })
      }

      return (
        <>
          <SectionHeader number={sectionNumber} accent={GOLD} eyebrow={eyebrow} title={title} />
          <div style={{ display: 'grid', gridTemplateColumns: `repeat(${tiers.length}, 1fr)`, gap: '12px' }}>
            {tiers.map((tr, i) => {
              const recommended = i === recIdx
              return (
                <div
                  key={i}
                  className="pp-avoid-break"
                  style={{
                    border: `1px solid ${recommended ? rgba(GOLD, 0.5) : rgba('#6FA8FF', 0.14)}`,
                    borderRadius: '13px',
                    overflow: 'hidden',
                    background: recommended ? rgba(GOLD, 0.06) : rgba('#0B1E3A', 0.5),
                  }}
                >
                  {recommended && (
                    <div style={{ padding: '7px', textAlign: 'center', background: rgba(GOLD, 0.14), borderBottom: `1px solid ${rgba(GOLD, 0.22)}` }}>
                      <span style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: GOLD }}>
                        {t.recommended}
                      </span>
                    </div>
                  )}
                  <div style={{ padding: '20px 16px', textAlign: 'center', borderBottom: `1px solid ${rgba('#6FA8FF', 0.1)}` }}>
                    <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: rgba(recommended ? GOLD : AURORA, 0.85), margin: '0 0 12px' }}>
                      {tr.name || t.packageFallback}
                    </p>
                    <p className="pp-serif" style={{ fontSize: tiers.length >= 3 ? '24px' : '32px', fontWeight: 300, lineHeight: 1.1, color: recommended ? GOLD : AURORA, margin: 0, overflowWrap: 'anywhere' }}>
                      {tr.price}
                    </p>
                  </div>
                  {tr.inclusions.length > 0 && (
                    <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '9px' }}>
                      {tr.inclusions.map((item, j) => (
                        <div key={j} style={{ display: 'flex', gap: '9px', alignItems: 'flex-start' }}>
                          <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: recommended ? GOLD : AURORA, flexShrink: 0, marginTop: '6px' }} />
                          <span style={{ fontSize: '11.5px', lineHeight: 1.55, color: rgba('#D9E6FF', 0.72) }}>{item}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </>
      )
    }

    case 'timeline': {
      const rows = parseTable(interp(data.timeline ?? ''))
      if (rows.length === 0) return null
      return (
        <>
          <SectionHeader number={sectionNumber} accent={accent} eyebrow={eyebrow} title={title} />
          <DataTable rows={rows} accent={accent} />
        </>
      )
    }

    case 'infrastructure': {
      const rows = parseTable(interp(data.model ?? data.content ?? ''))
      if (rows.length === 0) return null
      return (
        <>
          <SectionHeader number={sectionNumber} accent={accent} eyebrow={eyebrow} title={title} />
          <DataTable rows={rows} accent={accent} />
        </>
      )
    }

    case 'demo_embed': {
      if (!data.url) return null
      return (
        <>
          <SectionHeader number={sectionNumber} accent={accent} eyebrow={eyebrow} title={title} />
          <Card accent={accent} style={{ display: 'flex', alignItems: 'center', gap: '11px' }}>
            <ExternalLink size={15} color={accent} />
            <a href={data.url} style={{ fontSize: '12.5px', color: accent, wordBreak: 'break-all' }}>{data.url}</a>
          </Card>
        </>
      )
    }

    case 'gallery': {
      const images = interp(data.images ?? '').split('\n').filter(Boolean)
      if (images.length === 0) return null
      return (
        <>
          <SectionHeader number={sectionNumber} accent={accent} eyebrow={eyebrow} title={data.title ? interp(data.title) : title} />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
            {images.map((url, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={i}
                src={url}
                alt={`Gallery ${i + 1}`}
                className="pp-avoid-break"
                style={{ width: '100%', aspectRatio: '16 / 9', objectFit: 'cover', borderRadius: '10px', border: `1px solid ${rgba(accent, 0.2)}` }}
              />
            ))}
          </div>
        </>
      )
    }

    case 'cta': {
      const heading = interp(data.heading ?? t.ctaHeadingFallback)
      return (
        <div style={{ textAlign: 'center', padding: '32px 0' }}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', marginBottom: '24px' }}>
            {[0, 1, 2].map(i => <span key={i} style={{ width: '4px', height: '4px', borderRadius: '50%', background: rgba(GOLD, 0.5) }} />)}
          </div>
          <h2 className="pp-serif" style={{ fontSize: '30px', fontWeight: 300, color: TEXT, margin: '0 0 14px' }}>{heading}</h2>
          <p style={{ fontSize: '13px', color: rgba('#8FA8D6', 0.72), margin: '0 auto 20px', maxWidth: '440px', lineHeight: 1.65 }}>{t.ctaSub}</p>
          {data.email && (
            <a href={`mailto:${data.email}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: 600, color: GOLD, padding: '11px 22px', borderRadius: '11px', border: `1px solid ${rgba(GOLD, 0.32)}`, background: rgba(GOLD, 0.08) }}>
              <Moon size={14} /> {interp(data.button ?? t.ctaButtonFallback)}
            </a>
          )}
        </div>
      )
    }

    case 'text': {
      const content = interp(data.content ?? '')
      if (!content) return null
      return (
        <p style={{ fontSize: '13.5px', lineHeight: 1.85, color: rgba('#D9E6FF', 0.72), whiteSpace: 'pre-line', margin: 0 }}>{content}</p>
      )
    }

    case 'divider':
      return null // page breaks already separate sections

    default:
      return null
  }
}

// ── Running header (repeats at the top of every section page) ──
function RunningHeader({ label }: { label: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '26px', paddingBottom: '14px', borderBottom: `1px solid ${rgba('#6FA8FF', 0.12)}` }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/croissantsmoon/cm-logo-circle.png" alt="CroissantsMoon" width={26} height={26} style={{ width: '26px', height: '26px', borderRadius: '8px', border: `1px solid ${rgba(GOLD, 0.25)}` }} />
        <span className="pp-serif" style={{ fontSize: '15px', fontWeight: 400, color: TEXT, letterSpacing: '0.01em' }}>CroissantsMoon</span>
      </div>
      <span style={{ fontSize: '8.5px', fontWeight: 700, letterSpacing: '0.24em', textTransform: 'uppercase', color: rgba(GOLD, 0.7) }}>{label}</span>
    </div>
  )
}

// ── Document ──────────────────────────────────────────────────
export function ProposalPrintDocument({ proposal, autoPrint }: { proposal: Proposal; autoPrint?: boolean }) {
  const [locale, setLocale] = useState<CMLocale>('en')
  const t = PORTAL_UI[locale]
  const lead = proposal.lead as { organization?: string; contact_person?: string } | undefined
  const vars: Record<string, string> = {
    organization_name: lead?.organization ?? '',
    contact_person: lead?.contact_person ?? '',
    project_type: proposal.content?.branding?.org_name ?? '',
  }

  const sections = proposal.content?.sections
    ?.filter(b => b.visible !== false)
    ?.sort((a, b) => a.order - b.order) ?? []

  const hero = sections.find(b => b.type === 'hero')
  const heroData = (hero?.data ?? {}) as Record<string, string>
  const headline = interpolate(heroData.headline ?? proposal.title ?? t.heroHeadlineFallback, vars)
  const subheadline = heroData.subheadline ? interpolate(heroData.subheadline, vars) : ''

  const today = new Date().toLocaleDateString(locale === 'id' ? 'id-ID' : 'en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  })

  // Resolve renderable section pages up-front so empty blocks don't yield blank pages.
  let counter = 0
  const pages: { id: string; node: React.ReactNode }[] = []
  for (const block of sections) {
    if (block.type === 'hero') continue
    const number = NUMBERED_TYPES.has(block.type) ? String(counter + 1).padStart(2, '0') : null
    const node = blockContent(block, vars, number, locale)
    if (node === null) continue
    if (NUMBERED_TYPES.has(block.type)) counter++
    pages.push({ id: block.id, node })
  }

  const handlePrint = useCallback(() => window.print(), [])

  useEffect(() => {
    if (!autoPrint) return
    const id = setTimeout(() => window.print(), 700)
    return () => clearTimeout(id)
  }, [autoPrint])

  return (
    <div className="pp-root">
      <style>{printStyles}</style>

      {/* Toolbar — screen only */}
      <div className="pp-toolbar">
        <button onClick={() => window.history.back()} className="pp-tbtn" type="button">
          <ArrowLeft size={14} /> Back
        </button>
        <div className="pp-toolbar-spacer" />
        <LangToggle locale={locale} onChange={setLocale} compact />
        <button onClick={handlePrint} className="pp-tbtn pp-tbtn-gold" type="button">
          <Download size={14} /> {t.downloadPdf}
        </button>
      </div>

      <div className="pp-doc">
        {/* ── Cover page ── */}
        <div className="pp-sheet pp-cover">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/croissantsmoon/cm-logo-circle.png" alt="CroissantsMoon" width={40} height={40} style={{ width: '40px', height: '40px', borderRadius: '12px', border: `1px solid ${rgba(GOLD, 0.25)}` }} />
            <span className="pp-serif" style={{ fontSize: '20px', fontWeight: 400, color: TEXT }}>CroissantsMoon</span>
          </div>

          <div style={{ marginTop: 'auto' }}>
            <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.36em', textTransform: 'uppercase', color: rgba(GOLD, 0.75), marginBottom: '24px' }}>
              {t.confidentialProposal}
            </p>
            <h1 className="pp-serif" style={{ fontSize: '46px', fontWeight: 300, lineHeight: 1.1, color: TEXT, margin: '0 0 26px' }}>
              {headline}
            </h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '26px' }}>
              <span style={{ width: '54px', height: '1px', background: `linear-gradient(to right, ${rgba(GOLD, 0.6)}, transparent)` }} />
              <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: rgba(GOLD, 0.8) }} />
            </div>
            {subheadline && (
              <p style={{ fontSize: '15px', lineHeight: 1.75, color: rgba('#8FA8D6', 0.82), margin: 0, maxWidth: '82%' }}>{subheadline}</p>
            )}
          </div>

          <div style={{ marginTop: 'auto', paddingTop: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderTop: `1px solid ${rgba('#6FA8FF', 0.12)}` }}>
            <div>
              <p style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: FAINT, margin: '0 0 7px' }}>
                {t.footerPrefix}
              </p>
              <p style={{ fontSize: '16px', fontWeight: 600, color: TEXT, margin: 0 }}>{lead?.organization ?? '—'}</p>
              {lead?.contact_person && (
                <p style={{ fontSize: '12.5px', color: MUTED, margin: '4px 0 0' }}>{lead.contact_person}</p>
              )}
            </div>
            <p style={{ fontSize: '11px', color: FAINT, margin: 0 }}>{today}</p>
          </div>
        </div>

        {/* ── One page per section ── */}
        {pages.map(page => (
          <div key={page.id} className="pp-sheet">
            <RunningHeader label={t.confidentialProposal} />
            <div className="pp-sheet-body">{page.node}</div>
            <div className="pp-sheet-footer">
              <span style={{ fontSize: '9.5px', color: FAINT }}>
                {t.footerPrefix} <span style={{ color: rgba('#8FA8D6', 0.6) }}>{lead?.organization}</span> · CroissantsMoon Studio
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Styles (page geometry + celestial theme + print rules) ────
const CELESTIAL_BG = `
  radial-gradient(1.6px 1.6px at 14% 12%, rgba(255,255,255,0.55), transparent),
  radial-gradient(1.2px 1.2px at 78% 18%, rgba(255,255,255,0.4), transparent),
  radial-gradient(1.3px 1.3px at 32% 64%, rgba(212,177,90,0.45), transparent),
  radial-gradient(1px 1px at 88% 72%, rgba(255,255,255,0.35), transparent),
  radial-gradient(1.1px 1.1px at 60% 88%, rgba(255,255,255,0.3), transparent),
  radial-gradient(1px 1px at 46% 30%, rgba(160,196,255,0.4), transparent),
  linear-gradient(160deg, #030712 0%, #071126 55%, #0a1a35 100%)
`

const printStyles = `
  .pp-serif { font-family: 'Cormorant Garamond', Georgia, 'Times New Roman', serif; }

  .pp-root { min-height: 100vh; background: #1a1f2e; }

  .pp-toolbar {
    position: sticky; top: 0; z-index: 50;
    display: flex; align-items: center; gap: 12px;
    padding: 12px 20px;
    background: rgba(3,7,18,0.85);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid rgba(111,168,255,0.1);
  }
  .pp-toolbar-spacer { flex: 1; }
  .pp-tbtn {
    display: inline-flex; align-items: center; gap: 7px;
    padding: 8px 14px; border-radius: 9px; cursor: pointer;
    font-size: 13px; font-weight: 500;
    color: #d9e6ff; background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.12);
    transition: background 0.15s;
  }
  .pp-tbtn:hover { background: rgba(255,255,255,0.12); }
  .pp-tbtn-gold {
    color: #1a2236; background: #d4b15a; border-color: #d4b15a; font-weight: 600;
  }
  .pp-tbtn-gold:hover { background: #e0c275; }

  .pp-doc { padding: 28px 0; }

  /* A4 page. Full-bleed celestial background, MS-Word "Normal" 25.4mm inner margins. */
  .pp-sheet {
    width: 210mm;
    min-height: 297mm;
    box-sizing: border-box;
    margin: 0 auto 28px;
    padding: 25.4mm;
    background: ${CELESTIAL_BG};
    background-color: #050a18;
    color: #D9E6FF;
    box-shadow: 0 10px 50px rgba(0,0,0,0.5);
    display: flex;
    flex-direction: column;
  }
  .pp-sheet:not(:first-child) { break-before: page; }

  .pp-cover { }
  .pp-sheet-body { flex: 1; }
  .pp-sheet-footer {
    margin-top: 28px; padding-top: 14px;
    border-top: 1px solid rgba(111,168,255,0.1);
    text-align: center;
  }

  .pp-avoid-break { break-inside: avoid; }

  @page {
    size: A4;
    margin: 0;
  }

  @media print {
    .pp-root { background: #050a18 !important; }
    .pp-toolbar { display: none !important; }
    .pp-doc { padding: 0; }
    .pp-sheet {
      margin: 0;
      box-shadow: none;
      min-height: 297mm;
    }
    /* Print every background colour (celestial gradient, cards, tables, badges). */
    * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
  }
`
