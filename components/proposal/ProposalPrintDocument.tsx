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
import { Moon, Download, ArrowLeft, ExternalLink, Globe, Mail, Instagram, Clock } from 'lucide-react'
import type { Proposal, ProposalBlock } from '@/types'
import { PORTAL_SECTION_TEXT, PORTAL_UI, proposalField, type CMLocale } from '@/lib/cm/i18n'
import { LangToggle } from '@/components/cm/LangToggle'
import { trackEvent } from '@/lib/analytics/tracker'

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

// Split `total` items into [start, end) page chunks of `size`, but if the final
// chunk would hold fewer than `minLast` items, fold it back into the previous
// page (so a sparse trailing page is never created).
function chunkBounds(total: number, size: number, minLast: number): Array<[number, number]> {
  const bounds: Array<[number, number]> = []
  for (let start = 0; start < total; start += size) bounds.push([start, Math.min(start + size, total)])
  if (bounds.length > 1) {
    const last = bounds[bounds.length - 1]
    if (last[1] - last[0] < minLast) {
      bounds[bounds.length - 2][1] = last[1]
      bounds.pop()
    }
  }
  return bounds
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
    <div className="pp-keep-next" style={{ marginBottom: '22px' }}>
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

// Vertical timeline: a connecting line with a glowing dot per row (week / phase).
function Timeline({ rows, accent }: { rows: string[][]; accent: string }) {
  return (
    <div>
      {rows.map((cells, i) => {
        const last = i === rows.length - 1
        const label = cells[0] ?? ''
        const desc = cells.slice(1).filter(Boolean).join('  ·  ')
        return (
          <div
            key={i}
            className="pp-avoid-break"
            style={{ display: 'grid', gridTemplateColumns: '108px 26px 1fr', alignItems: 'stretch' }}
          >
            {/* Week / phase label */}
            <div style={{ textAlign: 'right', paddingRight: '16px', paddingTop: '11px' }}>
              <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: '11px', fontWeight: 600, color: accent, letterSpacing: '0.02em' }}>
                {label}
              </span>
            </div>
            {/* Rail: dot + connecting line */}
            <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ width: '14px', height: '14px', borderRadius: '50%', background: rgba(accent, 0.16), border: `2px solid ${accent}`, boxShadow: `0 0 0 4px ${rgba(accent, 0.08)}`, flexShrink: 0, marginTop: '10px', zIndex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: accent }} />
              </div>
              {!last && (
                <span style={{ flex: 1, width: '2px', minHeight: '20px', background: `linear-gradient(to bottom, ${rgba(accent, 0.55)}, ${rgba(accent, 0.15)})` }} />
              )}
            </div>
            {/* Content */}
            <div style={{ paddingLeft: '16px', paddingBottom: last ? 0 : '16px' }}>
              <Card accent={accent} style={{ padding: '11px 16px' }}>
                <p style={{ fontSize: '12.5px', lineHeight: 1.6, color: rgba('#D9E6FF', 0.78), margin: 0 }}>{desc || label}</p>
              </Card>
            </div>
          </div>
        )
      })}
    </div>
  )
}

// Single full-width feature row (paginated 6 per page in the document body).
function FeatureCard({ index, text }: { index: number; text: string }) {
  return (
    <Card accent={SKY} style={{ display: 'flex', alignItems: 'center', gap: '13px' }}>
      <span style={{ width: '26px', height: '26px', flexShrink: 0, borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'ui-monospace, monospace', fontSize: '10px', fontWeight: 600, background: rgba(SKY, 0.12), border: `1px solid ${rgba(SKY, 0.28)}`, color: SKY }}>
        {String(index + 1).padStart(2, '0')}
      </span>
      <p style={{ fontSize: '12.5px', lineHeight: 1.6, color: rgba('#D9E6FF', 0.74), margin: 0 }}>{text}</p>
    </Card>
  )
}

// ── Live preview: proposal access details + page screenshots ──
const SITE_BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://zefanyakharisma.com'

// Free, keyless screenshot service (swap here if you move providers). Renders the
// given page at ~1200px wide, cropped to a 16:10-ish viewport so it fits one A4 page.
function screenshotSrc(url: string): string {
  return `https://image.thum.io/get/width/1200/crop/750/noanimate/${url}`
}

function demoText(locale: CMLocale) {
  return locale === 'id'
    ? { access: 'Akses Proposal', proposalUrl: 'URL Proposal', token: 'Token Akses', validity: 'Token akses berlaku selama 14 hari', until: 'hingga', livePreview: 'Tautan Pratinjau', preview: 'Pratinjau' }
    : { access: 'Proposal Access', proposalUrl: 'Proposal URL', token: 'Access Token', validity: 'This access token is valid for 14 days', until: 'until', livePreview: 'Live Preview Link', preview: 'Preview' }
}

function AccessCard({
  slug, token, expiresAt, urls, locale,
}: { slug: string; token: string; expiresAt: string | null; urls: string[]; locale: CMLocale }) {
  const L = demoText(locale)
  const proposalUrl = `${SITE_BASE}/croissantsmoon/proposal/${slug}`
  const untilDate = expiresAt
    ? new Date(expiresAt).toLocaleDateString(locale === 'id' ? 'id-ID' : 'en-US', { year: 'numeric', month: 'short', day: 'numeric' })
    : null

  const row = (label: string, value: React.ReactNode) => (
    <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '14px', alignItems: 'baseline', padding: '12px 0' }}>
      <span style={{ fontSize: '9.5px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: rgba('#8FA8D6', 0.6) }}>{label}</span>
      <div style={{ minWidth: 0 }}>{value}</div>
    </div>
  )

  return (
    <Card accent={AURORA} style={{ padding: '6px 22px' }}>
      {row(L.proposalUrl, (
        <a href={proposalUrl} style={{ fontSize: '12.5px', color: AURORA, wordBreak: 'break-all' }}>{proposalUrl}</a>
      ))}
      <div style={{ borderTop: `1px solid ${rgba('#6FA8FF', 0.1)}` }} />
      {row(L.token, (
        <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: '15px', fontWeight: 700, letterSpacing: '0.18em', color: GOLD }}>{token}</span>
      ))}
      <div style={{ borderTop: `1px solid ${rgba('#6FA8FF', 0.1)}` }} />
      {row('', (
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '7px', fontSize: '11px', color: rgba(GOLD, 0.85) }}>
          <Clock size={12} /> {L.validity}{untilDate ? ` — ${L.until} ${untilDate}` : ''}.
        </span>
      ))}
      {urls.length > 0 && (
        <>
          <div style={{ borderTop: `1px solid ${rgba('#6FA8FF', 0.1)}` }} />
          {row(L.livePreview, (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {urls.map((u, i) => (
                <a key={i} href={u} style={{ display: 'inline-flex', alignItems: 'center', gap: '7px', fontSize: '12px', color: AURORA, wordBreak: 'break-all' }}>
                  <ExternalLink size={12} style={{ flexShrink: 0 }} /> {u}
                </a>
              ))}
            </div>
          ))}
        </>
      )}
    </Card>
  )
}

function BrowserScreenshot({ url }: { url: string }) {
  return (
    <Card accent={AURORA} style={{ padding: 0, overflow: 'hidden' }}>
      {/* Browser chrome bar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '9px 13px', borderBottom: `1px solid ${rgba('#6FA8FF', 0.12)}`, background: rgba('#030712', 0.5) }}>
        <span style={{ display: 'flex', gap: '5px' }}>
          {['rgba(248,113,113,0.5)', 'rgba(251,191,36,0.5)', 'rgba(74,222,128,0.5)'].map((c, i) => (
            <span key={i} style={{ width: '8px', height: '8px', borderRadius: '50%', background: c }} />
          ))}
        </span>
        <span style={{ flex: 1, fontFamily: 'ui-monospace, monospace', fontSize: '9.5px', color: rgba('#8FA8D6', 0.55), overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{url}</span>
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={screenshotSrc(url)} alt={`Preview of ${url}`} style={{ display: 'block', width: '100%', height: 'auto' }} />
    </Card>
  )
}

// What we found · Why it matters · How we solve it — one aligned row per finding.
function WhatWhyHowTable({
  what, why, how, labels, startIndex = 0,
}: {
  what: string[]; why: string[]; how: string[]
  labels: { what: string; why: string; how: string }
  startIndex?: number
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
            {String(startIndex + i + 1).padStart(2, '0')}
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

// ── Pricing — paginated: ≤2 stacked tiers per page when 4, 3 compact on one page ──
type PricingTier = { name: string; price: string; inclusions: string[] }

function buildPricingTiers(
  block: ProposalBlock, vars: Record<string, string>, locale: CMLocale,
): { tiers: PricingTier[]; recIdx: number } {
  const data = block.data as Record<string, string>
  const interp = (s: string) => interpolate(s, vars)
  const t = PORTAL_UI[locale]
  const rawTiers = Array.isArray((block.data as { tiers?: Array<{ name?: string; price?: string; inclusions?: string }> }).tiers)
    ? ((block.data as { tiers?: Array<{ name?: string; price?: string; inclusions?: string }> }).tiers ?? [])
    : []
  let tiers: PricingTier[] = rawTiers
    .map(tr => {
      const td = tr as Record<string, string | undefined>
      return {
        name: interp(proposalField(td, 'name', locale) ?? ''),
        price: interp(td.price ?? ''),
        inclusions: interp(proposalField(td, 'inclusions', locale) ?? '').split('\n').filter(Boolean),
      }
    })
    .filter(tr => tr.price || tr.name || tr.inclusions.length)
  if (tiers.length === 0 && (data.price || proposalField(data, 'package', locale) || proposalField(data, 'inclusions', locale))) {
    tiers = [{
      name: interp(proposalField(data, 'package', locale) ?? t.packageFallback),
      price: interp(data.price ?? ''),
      inclusions: interp(proposalField(data, 'inclusions', locale) ?? '').split('\n').filter(Boolean),
    }]
  }
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
  return { tiers, recIdx }
}

function PricingCard({
  tier, recommended, compact, locale,
}: { tier: PricingTier; recommended: boolean; compact: boolean; locale: CMLocale }) {
  const t = PORTAL_UI[locale]
  const accentC = recommended ? GOLD : AURORA
  return (
    <div
      className="pp-avoid-break"
      style={{
        border: `1px solid ${recommended ? rgba(GOLD, 0.5) : rgba('#6FA8FF', 0.14)}`,
        borderRadius: '13px', overflow: 'hidden',
        background: recommended ? rgba(GOLD, 0.06) : rgba('#0B1E3A', 0.5),
        display: 'flex',
      }}
    >
      {/* Left rail: package name + price */}
      <div
        style={{
          width: compact ? '170px' : '210px', flexShrink: 0,
          padding: compact ? '15px 16px' : '22px 20px', textAlign: 'center',
          borderRight: `1px solid ${rgba('#6FA8FF', 0.1)}`,
          display: 'flex', flexDirection: 'column', justifyContent: 'center',
          background: recommended ? rgba(GOLD, 0.04) : 'transparent',
        }}
      >
        {recommended && (
          <span style={{ fontSize: '8.5px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: GOLD, marginBottom: '9px' }}>
            ★ {t.recommended}
          </span>
        )}
        <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: rgba(accentC, 0.85), margin: '0 0 10px' }}>
          {tier.name || t.packageFallback}
        </p>
        <p className="pp-serif" style={{ fontSize: compact ? '23px' : '30px', fontWeight: 300, lineHeight: 1.1, color: accentC, margin: 0, overflowWrap: 'anywhere' }}>
          {tier.price}
        </p>
      </div>
      {/* Right: inclusions */}
      {tier.inclusions.length > 0 && (
        <div
          style={{
            flex: 1, padding: compact ? '14px 18px' : '18px 22px',
            display: 'grid',
            gridTemplateColumns: tier.inclusions.length > 4 ? '1fr 1fr' : '1fr',
            gap: compact ? '7px 18px' : '10px 22px',
            alignContent: 'center',
          }}
        >
          {tier.inclusions.map((item, j) => (
            <div key={j} style={{ display: 'flex', gap: '9px', alignItems: 'flex-start' }}>
              <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: accentC, flexShrink: 0, marginTop: compact ? '5px' : '6px' }} />
              <span style={{ fontSize: compact ? '10.5px' : '11.5px', lineHeight: 1.5, color: rgba('#D9E6FF', 0.72) }}>{item}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ── Block content (returns null when a section has nothing to show) ──
function blockContent(
  block: ProposalBlock,
  vars: Record<string, string>,
  sectionNumber: string | null,
  locale: CMLocale,
  contactless?: boolean,
): React.ReactNode | null {
  const data = block.data as Record<string, string>
  const interp = (s: string) => interpolate(s, vars)
  // Locale-aware field read: Indonesian value (`${key}_id`) with EN fallback.
  const f = (key: string) => proposalField(data, key, locale)
  const t = PORTAL_UI[locale]
  const sec = PORTAL_SECTION_TEXT[locale][block.type]
  const accent = SECTION_ACCENT[block.type] ?? AURORA
  const eyebrow = sec?.eyebrow ?? ''
  const title = sec?.title ?? ''

  switch (block.type) {
    case 'hero':
      return null // rendered on the cover

    case 'greeting': {
      const message = interp(f('message') ?? '')
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
    case 'website_analysis':
      // Paginated explicitly (5 findings per page) in the document body.
      return null

    case 'redesign_concept': {
      const direction = interp(f('direction') ?? f('concept') ?? f('description') ?? '')
      const toneRows = parseTable(interp(f('tone') ?? ''))
      const ideas = interp(f('key_ideas') ?? '').split('\n').filter(Boolean)
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

    case 'features':
      // Paginated explicitly (6 per page) in the document body — see FeatureCard.
      return null

    case 'pricing':
      // Paginated explicitly in the document body (see buildPricingTiers / PricingCard).
      return null

    case 'timeline': {
      const rows = parseTable(interp(f('timeline') ?? ''))
      if (rows.length === 0) return null
      return (
        <>
          <SectionHeader number={sectionNumber} accent={accent} eyebrow={eyebrow} title={title} />
          <Timeline rows={rows} accent={accent} />
        </>
      )
    }

    case 'infrastructure': {
      const rows = parseTable(interp(f('model') ?? f('content') ?? ''))
      if (rows.length === 0) return null
      return (
        <>
          <SectionHeader number={sectionNumber} accent={accent} eyebrow={eyebrow} title={title} />
          <DataTable rows={rows} accent={accent} />
        </>
      )
    }

    case 'demo_embed':
      // Built explicitly in the document body (needs proposal slug/token + screenshots).
      return null

    case 'gallery': {
      const images = interp(data.images ?? '').split('\n').filter(Boolean)
      if (images.length === 0) return null
      return (
        <>
          <SectionHeader number={sectionNumber} accent={accent} eyebrow={eyebrow} title={f('title') ? interp(f('title') ?? '') : title} />
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
      const heading = interp(f('heading') ?? t.ctaHeadingFallback)
      return (
        <div style={{ textAlign: 'center', padding: '32px 0' }}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', marginBottom: '24px' }}>
            {[0, 1, 2].map(i => <span key={i} style={{ width: '4px', height: '4px', borderRadius: '50%', background: rgba(GOLD, 0.5) }} />)}
          </div>
          <h2 className="pp-serif" style={{ fontSize: '30px', fontWeight: 300, color: TEXT, margin: '0 0 14px' }}>{heading}</h2>
          <p style={{ fontSize: '13px', color: rgba('#8FA8D6', 0.72), margin: '0 auto 20px', maxWidth: '440px', lineHeight: 1.65 }}>{t.ctaSub}</p>
          {!contactless && data.email && (
            <a href={`mailto:${data.email}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: 600, color: GOLD, padding: '11px 22px', borderRadius: '11px', border: `1px solid ${rgba(GOLD, 0.32)}`, background: rgba(GOLD, 0.08) }}>
              <Moon size={14} /> {data.email}
            </a>
          )}
        </div>
      )
    }

    case 'text': {
      const content = interp(f('content') ?? '')
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

// ── Running footer (page number + contact, on every page but the cover) ──
// In `contactless` mode the email / website / instagram links are omitted.
function RunningFooter({ page, total, contactless }: { page: number; total: number; contactless?: boolean }) {
  const link: React.CSSProperties = {
    display: 'inline-flex', alignItems: 'center', gap: '4px',
    fontSize: '8.5px', color: rgba('#8FA8D6', 0.55), textDecoration: 'none',
  }
  return (
    <div style={{ marginTop: '24px', paddingTop: '11px', borderTop: `1px solid ${rgba('#6FA8FF', 0.1)}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap' }}>
      <span style={{ fontSize: '8.5px', fontWeight: 700, letterSpacing: '0.1em', color: rgba(GOLD, 0.65) }}>
        {String(page).padStart(2, '0')} / {String(total).padStart(2, '0')}
      </span>
      {!contactless && (
        <span style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
          <a href="https://zefanyakharisma.com/croissantsmoon" style={link}><Globe size={10} /> zefanyakharisma.com/croissantsmoon</a>
          <a href="mailto:zefanya.kharisma@croissantsmoon.com" style={link}><Mail size={10} /> zefanya.kharisma@croissantsmoon.com</a>
          <a href="https://instagram.com/croissantsmoon" style={link}><Instagram size={10} /> @croissantsmoon</a>
        </span>
      )}
    </div>
  )
}

// ── Document ──────────────────────────────────────────────────
export function ProposalPrintDocument({
  proposal, autoPrint, showBack = true, trackViews = false, contactless = false,
}: {
  proposal: Proposal
  autoPrint?: boolean
  showBack?: boolean    // hide the toolbar "Back" when this is the primary view
  trackViews?: boolean  // record a 'view' event (slug page only, not admin export)
  contactless?: boolean // omit email / website / instagram contact links
}) {
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
  const headline = interpolate(proposalField(heroData, 'headline', locale) ?? proposal.title ?? t.heroHeadlineFallback, vars)
  const heroSub = proposalField(heroData, 'subheadline', locale)
  const subheadline = heroSub ? interpolate(heroSub, vars) : ''

  const today = new Date().toLocaleDateString(locale === 'id' ? 'id-ID' : 'en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  })

  // Resolve renderable section pages up-front so empty blocks don't yield blank pages.
  type Page = { id: string; nodes: React.ReactNode[] }
  let counter = 0
  const pages: Page[] = []
  for (const block of sections) {
    if (block.type === 'hero') continue

    // Current State Analysis: 5 findings per page; a trailing chunk of <3 folds
    // back into the previous page (so a sparse last page is never created).
    if (block.type === 'audit_findings' || block.type === 'website_analysis') {
      const d = block.data as Record<string, string>
      const what = interpolate(proposalField(d, 'what', locale) ?? '', vars).split('\n').filter(Boolean)
      const why = interpolate(proposalField(d, 'why', locale) ?? '', vars).split('\n').filter(Boolean)
      const how = interpolate(proposalField(d, 'how', locale) ?? '', vars).split('\n').filter(Boolean)
      const hasStructured = what.length || why.length || how.length
      const legacy = interpolate(proposalField(d, 'findings', locale) ?? proposalField(d, 'analysis', locale) ?? '', vars).split('\n').filter(Boolean)
      if (!hasStructured && legacy.length === 0) continue
      counter++
      const number = String(counter).padStart(2, '0')
      const sec = PORTAL_SECTION_TEXT[locale][block.type]
      const title = sec?.title ?? ''
      const eyebrow = sec?.eyebrow ?? ''

      if (!hasStructured) {
        pages.push({
          id: block.id,
          nodes: [(
            <>
              <SectionHeader number={number} accent={AURORA} eyebrow={eyebrow} title={title} />
              <PointList items={legacy} accent={AURORA} />
            </>
          )],
        })
        continue
      }

      const labels = { what: t.whatWeFound, why: t.whyItMatters, how: t.howWeSolveIt }
      const n = Math.max(what.length, why.length, how.length)
      for (const [start, end] of chunkBounds(n, 5, 3)) {
        pages.push({
          id: `${block.id}-${start}`,
          nodes: [(
            <>
              <SectionHeader number={number} accent={AURORA} eyebrow={eyebrow} title={title + (start > 0 ? ' (cont.)' : '')} />
              <WhatWhyHowTable
                what={what.slice(start, end)} why={why.slice(start, end)} how={how.slice(start, end)}
                labels={labels} startIndex={start}
              />
            </>
          )],
        })
      }
      continue
    }

    // Proposed Features: 6 per page; a trailing page of <4 folds into the previous one.
    if (block.type === 'features') {
      const raw = proposalField(block.data as Record<string, string>, 'features', locale) ?? ''
      const features = interpolate(raw, vars).split('\n').filter(Boolean)
      if (features.length === 0) continue
      counter++
      const number = String(counter).padStart(2, '0')
      const sec = PORTAL_SECTION_TEXT[locale].features
      for (const [start, end] of chunkBounds(features.length, 6, 4)) {
        const chunk = features.slice(start, end)
        const node = (
          <>
            <SectionHeader
              number={number}
              accent={SKY}
              eyebrow={sec?.eyebrow ?? ''}
              title={(sec?.title ?? 'Proposed Features') + (start > 0 ? ' (cont.)' : '')}
            />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {chunk.map((feature, i) => <FeatureCard key={i} index={start + i} text={feature} />)}
            </div>
          </>
        )
        pages.push({ id: `${block.id}-${start}`, nodes: [node] })
      }
      continue
    }

    // Investment: paginate explicitly — 4 tiers → 2 stacked per page; 3 → one compact page.
    if (block.type === 'pricing') {
      const { tiers, recIdx } = buildPricingTiers(block, vars, locale)
      if (tiers.length === 0) continue
      const sec = PORTAL_SECTION_TEXT[locale].pricing
      const perPage = tiers.length === 4 ? 2 : tiers.length
      const compact = tiers.length >= 3
      for (let start = 0; start < tiers.length; start += perPage) {
        const chunk = tiers.slice(start, start + perPage)
        const node = (
          <>
            <SectionHeader
              number={null}
              accent={GOLD}
              eyebrow={sec?.eyebrow ?? ''}
              title={(sec?.title ?? 'Investment') + (start > 0 ? ' (cont.)' : '')}
            />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {chunk.map((tier, i) => (
                <PricingCard key={i} tier={tier} recommended={start + i === recIdx} compact={compact} locale={locale} />
              ))}
            </div>
          </>
        )
        pages.push({ id: `${block.id}-${start}`, nodes: [node] })
      }
      continue
    }

    // Live Preview: an access page (proposal URL + token + 14-day note) followed by
    // one full-width screenshot page per preview URL (newline-separated in the field).
    if (block.type === 'demo_embed') {
      const urls = interpolate((block.data as Record<string, string>).url ?? '', vars)
        .split('\n').map(s => s.trim()).filter(Boolean)
      counter++
      const number = String(counter).padStart(2, '0')
      const sec = PORTAL_SECTION_TEXT[locale].demo_embed
      const title = sec?.title ?? 'Live Preview'
      const eyebrow = sec?.eyebrow ?? ''
      const L = demoText(locale)

      pages.push({
        id: `${block.id}-access`,
        nodes: [(
          <>
            <SectionHeader number={number} accent={AURORA} eyebrow={eyebrow} title={title} />
            <AccessCard slug={proposal.slug} token={proposal.token} expiresAt={proposal.expires_at} urls={urls} locale={locale} />
          </>
        )],
      })

      urls.forEach((u, idx) => {
        pages.push({
          id: `${block.id}-shot-${idx}`,
          nodes: [(
            <>
              <SectionHeader number={number} accent={AURORA} eyebrow={eyebrow} title={`${title} — ${L.preview}${urls.length > 1 ? ` ${idx + 1}` : ''}`} />
              <BrowserScreenshot url={u} />
            </>
          )],
        })
      })
      continue
    }

    const number = NUMBERED_TYPES.has(block.type) ? String(counter + 1).padStart(2, '0') : null
    const node = blockContent(block, vars, number, locale, contactless)
    if (node === null) continue
    if (NUMBERED_TYPES.has(block.type)) counter++

    // Text blocks always ride on the previous section's page — never a new one.
    if (block.type === 'text' && pages.length > 0) {
      pages[pages.length - 1].nodes.push(node)
      continue
    }
    pages.push({ id: block.id, nodes: [node] })
  }

  const handlePrint = useCallback(() => window.print(), [])

  useEffect(() => {
    if (!autoPrint) return
    let cancelled = false
    // Wait for remote screenshots (preview images) to settle before printing,
    // capped so a slow/failed image never blocks the export indefinitely.
    const imgs = Array.from(document.images)
    const loaded = imgs.map(img =>
      img.complete ? Promise.resolve() : new Promise<void>(res => { img.onload = img.onerror = () => res() })
    )
    const cap = new Promise<void>(res => setTimeout(res, 9000))
    Promise.race([Promise.all(loaded).then(() => undefined), cap]).then(() => {
      if (!cancelled) window.print()
    })
    return () => { cancelled = true }
  }, [autoPrint])

  // Count a view when this is the client-facing slug page (not the admin export).
  useEffect(() => {
    if (trackViews) trackEvent(proposal.id, 'view')
  }, [trackViews, proposal.id])

  return (
    <div className="pp-root">
      <style>{printStyles}</style>

      {/* Toolbar — screen only */}
      <div className="pp-toolbar">
        {showBack && (
          <button onClick={() => window.history.back()} className="pp-tbtn" type="button">
            <ArrowLeft size={14} /> Back
          </button>
        )}
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

        {/* ── Content pages — every section vertically centred on its page ── */}
        {pages.map((page, i) => (
          <div key={page.id} className="pp-sheet">
            <RunningHeader label={t.confidentialProposal} />
            <div className="pp-center-body">
              <div className="pp-center-inner">
                {page.nodes.map((n, idx) => (
                  <div key={idx} style={{ marginTop: idx > 0 ? '30px' : 0 }}>{n}</div>
                ))}
              </div>
            </div>
            <RunningFooter page={i + 1} total={pages.length} contactless={contactless} />
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

  /* A4 page. Full-bleed celestial background, MS-Word "Narrow" 12.7mm inner margins. */
  .pp-sheet {
    width: 210mm;
    min-height: 297mm;
    box-sizing: border-box;
    margin: 0 auto 28px;
    padding: 12.7mm;
    background: ${CELESTIAL_BG};
    background-color: #050a18;
    color: #D9E6FF;
    box-shadow: 0 10px 50px rgba(0,0,0,0.5);
    display: flex;
    flex-direction: column;
  }
  .pp-sheet:not(:first-child) { break-before: page; }

  /* Body fills the page (footer settles at the bottom edge); the inner wrapper
     centres content vertically via auto margins, which collapse when a section
     is taller than the page so nothing gets clipped. */
  .pp-center-body { flex: 1; display: flex; flex-direction: column; }
  .pp-center-inner { margin: auto 0; width: 100%; }

  /* Keep atomic blocks whole when a tall section splits across two pages. */
  .pp-avoid-break { break-inside: avoid; }
  .pp-keep-next { break-after: avoid; }

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
