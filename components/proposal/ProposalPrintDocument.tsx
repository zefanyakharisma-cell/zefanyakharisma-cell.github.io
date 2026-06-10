'use client'

// ─────────────────────────────────────────────────────────────────
// Print / PDF rendering of a proposal.
//
// This is the same proposal content (proposal.content.sections) as the live
// celestial portal, re-laid-out as a clean, light, A4 *document* suitable for
// the browser's native "Save as PDF" (window.print). We deliberately do NOT
// reuse the portal's dark glassmorphism — backgrounds, blur and stars print
// poorly and waste ink. Instead this is an editorial, ink-on-paper proposal.
//
// Authorisation happens in the route (cookie gate OR authenticated admin);
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

// One row per line; columns separated by " - " (space-dash-space) — matches portal.
function parseTable(text: string): string[][] {
  return text
    .split('\n').map(l => l.trim()).filter(Boolean)
    .map(line => line.split(/\s+-\s+/).map(c => c.trim()))
}

// ── Print palette (ink on paper) ──────────────────────────────
const INK = '#1a2236'
const MUTED = '#5a6478'
const FAINT = '#8a94a8'
const GOLD = '#a87a1e'
const LINE = '#e4e7ee'

const AURORA = '#2563eb'
const VIOLET = '#6d4ad8'
const SKY = '#2f6fd6'
const MINT = '#1f8f63'

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
    <div className="pp-keep-with-next" style={{ marginBottom: '18px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
        {number && (
          <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: '12px', fontWeight: 600, color: accent }}>
            {number}
          </span>
        )}
        <span style={{ width: '26px', height: '1px', background: accent }} />
        <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: accent }}>
          {eyebrow}
        </span>
      </div>
      <h2 className="pp-serif" style={{ fontSize: '26px', fontWeight: 400, lineHeight: 1.15, color: INK, margin: 0 }}>
        {title}
      </h2>
    </div>
  )
}

function SubLabel({ label, accent }: { label: string; accent: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: '0 0 12px' }}>
      <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: accent }}>
        {label}
      </span>
      <span style={{ flex: 1, height: '1px', background: LINE }} />
    </div>
  )
}

function PointList({ items, accent }: { items: string[]; accent: string }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 16px' }}>
      {items.map((line, i) => (
        <div key={i} className="pp-card pp-avoid-break" style={{ display: 'flex', gap: '10px' }}>
          <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: '11px', fontWeight: 600, color: accent, flexShrink: 0 }}>
            {String(i + 1).padStart(2, '0')}
          </span>
          <span style={{ fontSize: '12.5px', lineHeight: 1.6, color: MUTED }}>{line}</span>
        </div>
      ))}
    </div>
  )
}

function DataTable({ rows, accent }: { rows: string[][]; accent: string }) {
  if (rows.length === 0) return null
  const maxCols = Math.max(...rows.map(r => r.length))
  return (
    <div className="pp-card pp-avoid-break" style={{ padding: 0, overflow: 'hidden' }}>
      {rows.map((cells, i) => (
        <div
          key={i}
          style={{
            display: 'grid',
            gridTemplateColumns: maxCols > 1 ? `minmax(110px, 0.7fr) repeat(${maxCols - 1}, 1fr)` : '1fr',
            gap: '0 18px',
            padding: '11px 16px',
            borderTop: i > 0 ? `1px solid ${LINE}` : 'none',
            background: i % 2 === 1 ? '#f7f8fb' : 'transparent',
          }}
        >
          {Array.from({ length: maxCols }).map((_, c) => {
            const cell = cells[c] ?? ''
            return (
              <span
                key={c}
                style={{
                  fontSize: '12.5px',
                  lineHeight: 1.55,
                  color: c === 0 ? accent : MUTED,
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

// ── Block renderer ────────────────────────────────────────────
function PrintBlock({
  block, vars, sectionNumber, locale,
}: { block: ProposalBlock; vars: Record<string, string>; sectionNumber: string | null; locale: CMLocale }) {
  const data = block.data as Record<string, string>
  const interp = (s: string) => interpolate(s, vars)
  const t = PORTAL_UI[locale]
  const sec = PORTAL_SECTION_TEXT[locale][block.type]
  const accent = SECTION_ACCENT[block.type] ?? AURORA
  const eyebrow = sec?.eyebrow ?? ''
  const title = sec?.title ?? ''

  const Section = ({ children }: { children: React.ReactNode }) => (
    <section className="pp-section" style={{ marginTop: '34px' }}>{children}</section>
  )

  switch (block.type) {
    case 'hero':
      // Hero is rendered on the cover; skip in the body.
      return null

    case 'greeting': {
      const message = interp(data.message ?? '')
      if (!message) return null
      return (
        <Section>
          <SubLabel label={t.aNoteForYou} accent={GOLD} />
          <p className="pp-serif" style={{ fontSize: '17px', fontWeight: 400, lineHeight: 1.65, color: INK, whiteSpace: 'pre-line', margin: 0 }}>
            {message}
          </p>
        </Section>
      )
    }

    case 'audit_findings':
    case 'website_analysis': {
      const groups = [
        { key: 'what', label: t.whatWeFound, accent: AURORA },
        { key: 'why', label: t.whyItMatters, accent: GOLD },
        { key: 'how', label: t.howWeSolveIt, accent: MINT },
      ].map(g => ({ ...g, items: interp(data[g.key] ?? '').split('\n').filter(Boolean) }))
      const hasStructured = groups.some(g => g.items.length)
      const legacy = interp(data.findings ?? data.analysis ?? '').split('\n').filter(Boolean)
      if (!hasStructured && legacy.length === 0) return null
      return (
        <Section>
          <SectionHeader number={sectionNumber} accent={accent} eyebrow={eyebrow} title={title} />
          {hasStructured ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {groups.filter(g => g.items.length).map(g => (
                <div key={g.key}>
                  <SubLabel label={g.label} accent={g.accent} />
                  <PointList items={g.items} accent={g.accent} />
                </div>
              ))}
            </div>
          ) : (
            <PointList items={legacy} accent={accent} />
          )}
        </Section>
      )
    }

    case 'redesign_concept': {
      const direction = interp(data.direction ?? data.concept ?? data.description ?? '')
      const toneRows = parseTable(interp(data.tone ?? ''))
      const ideas = interp(data.key_ideas ?? '').split('\n').filter(Boolean)
      if (!direction && toneRows.length === 0 && ideas.length === 0) return null
      return (
        <Section>
          <SectionHeader number={sectionNumber} accent={accent} eyebrow={eyebrow} title={title} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {direction && (
              <div>
                <SubLabel label={t.direction} accent={accent} />
                <p style={{ fontSize: '13px', lineHeight: 1.8, color: MUTED, whiteSpace: 'pre-line', margin: 0 }}>{direction}</p>
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
        </Section>
      )
    }

    case 'features': {
      const features = interp(data.features ?? '').split('\n').filter(Boolean)
      if (features.length === 0) return null
      return (
        <Section>
          <SectionHeader number={sectionNumber} accent={accent} eyebrow={eyebrow} title={title} />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 16px' }}>
            {features.map((feature, i) => (
              <div key={i} className="pp-card pp-avoid-break" style={{ display: 'flex', gap: '10px' }}>
                <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: '11px', fontWeight: 600, color: accent, flexShrink: 0 }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span style={{ fontSize: '12.5px', lineHeight: 1.6, color: MUTED }}>{feature}</span>
              </div>
            ))}
          </div>
        </Section>
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
        <Section>
          <SectionHeader number={sectionNumber} accent={GOLD} eyebrow={eyebrow} title={title} />
          <div
            className="pp-avoid-break"
            style={{ display: 'grid', gridTemplateColumns: `repeat(${tiers.length}, 1fr)`, gap: '12px' }}
          >
            {tiers.map((tr, i) => {
              const recommended = i === recIdx
              return (
                <div
                  key={i}
                  className="pp-avoid-break"
                  style={{
                    border: `1px solid ${recommended ? GOLD : LINE}`,
                    borderRadius: '12px',
                    overflow: 'hidden',
                    background: recommended ? '#fbf6ea' : '#fff',
                  }}
                >
                  {recommended && (
                    <div style={{ padding: '6px', textAlign: 'center', background: '#f3e6c4', borderBottom: `1px solid ${GOLD}` }}>
                      <span style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: GOLD }}>
                        {t.recommended}
                      </span>
                    </div>
                  )}
                  <div style={{ padding: '18px 16px', textAlign: 'center', borderBottom: `1px solid ${LINE}` }}>
                    <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: MUTED, margin: '0 0 10px' }}>
                      {tr.name || t.packageFallback}
                    </p>
                    <p className="pp-serif" style={{ fontSize: tiers.length >= 3 ? '22px' : '28px', fontWeight: 400, lineHeight: 1.1, color: recommended ? GOLD : INK, margin: 0, overflowWrap: 'anywhere' }}>
                      {tr.price}
                    </p>
                  </div>
                  {tr.inclusions.length > 0 && (
                    <div style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {tr.inclusions.map((item, j) => (
                        <div key={j} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                          <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: GOLD, flexShrink: 0, marginTop: '6px' }} />
                          <span style={{ fontSize: '11.5px', lineHeight: 1.55, color: MUTED }}>{item}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </Section>
      )
    }

    case 'timeline': {
      const rows = parseTable(interp(data.timeline ?? ''))
      if (rows.length === 0) return null
      return (
        <Section>
          <SectionHeader number={sectionNumber} accent={accent} eyebrow={eyebrow} title={title} />
          <DataTable rows={rows} accent={accent} />
        </Section>
      )
    }

    case 'infrastructure': {
      const rows = parseTable(interp(data.model ?? data.content ?? ''))
      if (rows.length === 0) return null
      return (
        <Section>
          <SectionHeader number={sectionNumber} accent={accent} eyebrow={eyebrow} title={title} />
          <DataTable rows={rows} accent={accent} />
        </Section>
      )
    }

    case 'demo_embed': {
      if (!data.url) return null
      return (
        <Section>
          <SectionHeader number={sectionNumber} accent={accent} eyebrow={eyebrow} title={title} />
          <div className="pp-card pp-avoid-break" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <ExternalLink size={14} color={accent} />
            <a href={data.url} style={{ fontSize: '12.5px', color: accent, wordBreak: 'break-all' }}>{data.url}</a>
          </div>
        </Section>
      )
    }

    case 'gallery': {
      const images = interp(data.images ?? '').split('\n').filter(Boolean)
      if (images.length === 0) return null
      return (
        <Section>
          <SectionHeader number={sectionNumber} accent={accent} eyebrow={eyebrow} title={data.title ? interp(data.title) : title} />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
            {images.map((url, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={i}
                src={url}
                alt={`Gallery ${i + 1}`}
                className="pp-avoid-break"
                style={{ width: '100%', aspectRatio: '16 / 9', objectFit: 'cover', borderRadius: '8px', border: `1px solid ${LINE}` }}
              />
            ))}
          </div>
        </Section>
      )
    }

    case 'cta': {
      const heading = interp(data.heading ?? t.ctaHeadingFallback)
      return (
        <Section>
          <div className="pp-avoid-break" style={{ textAlign: 'center', padding: '28px 0', borderTop: `1px solid ${LINE}`, marginTop: '20px' }}>
            <h2 className="pp-serif" style={{ fontSize: '24px', fontWeight: 400, color: INK, margin: '0 0 10px' }}>{heading}</h2>
            <p style={{ fontSize: '12.5px', color: MUTED, margin: '0 auto 14px', maxWidth: '420px', lineHeight: 1.6 }}>{t.ctaSub}</p>
            {data.email && (
              <a href={`mailto:${data.email}`} style={{ display: 'inline-block', fontSize: '13px', fontWeight: 600, color: GOLD, borderBottom: `1px solid ${GOLD}`, paddingBottom: '2px' }}>
                {data.email}
              </a>
            )}
          </div>
        </Section>
      )
    }

    case 'text': {
      const content = interp(data.content ?? '')
      if (!content) return null
      return (
        <Section>
          <p style={{ fontSize: '13px', lineHeight: 1.8, color: MUTED, whiteSpace: 'pre-line', margin: 0 }}>{content}</p>
        </Section>
      )
    }

    case 'divider':
      return <div style={{ borderTop: `1px solid ${LINE}`, margin: '28px 0 0' }} />

    default:
      return null
  }
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

  const handlePrint = useCallback(() => window.print(), [])

  useEffect(() => {
    if (!autoPrint) return
    // Give fonts/images a beat to settle before opening the print dialog.
    const id = setTimeout(() => window.print(), 600)
    return () => clearTimeout(id)
  }, [autoPrint])

  let counter = 0

  return (
    <div className="pp-root" style={{ background: '#525659', minHeight: '100vh' }}>
      <style>{printStyles}</style>

      {/* Toolbar — screen only */}
      <div className="pp-toolbar">
        <button onClick={() => window.history.back()} className="pp-tbtn" type="button">
          <ArrowLeft size={14} /> Back
        </button>
        <div className="pp-toolbar-spacer" />
        <LangToggle locale={locale} onChange={setLocale} compact />
        <button onClick={handlePrint} className="pp-tbtn pp-tbtn-gold" type="button">
          <Download size={14} /> Download PDF
        </button>
      </div>

      {/* The printable page */}
      <div className="pp-page">
        {/* Cover */}
        <div className="pp-cover">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '64px' }}>
            <Moon size={18} color={GOLD} />
            <span style={{ fontSize: '14px', fontWeight: 600, color: INK, letterSpacing: '0.02em' }}>CroissantsMoon</span>
          </div>

          <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.34em', textTransform: 'uppercase', color: GOLD, marginBottom: '22px' }}>
            {t.confidentialProposal}
          </p>
          <h1 className="pp-serif" style={{ fontSize: '40px', fontWeight: 400, lineHeight: 1.12, color: INK, margin: '0 0 22px', maxWidth: '90%' }}>
            {headline}
          </h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '22px' }}>
            <span style={{ width: '46px', height: '1px', background: GOLD }} />
            <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: GOLD }} />
          </div>
          {subheadline && (
            <p style={{ fontSize: '14px', lineHeight: 1.7, color: MUTED, margin: 0, maxWidth: '78%' }}>{subheadline}</p>
          )}

          <div style={{ marginTop: 'auto', paddingTop: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderTop: `1px solid ${LINE}` }}>
            <div>
              <p style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: FAINT, margin: '0 0 6px' }}>
                {t.footerPrefix}
              </p>
              <p style={{ fontSize: '15px', fontWeight: 600, color: INK, margin: 0 }}>{lead?.organization ?? '—'}</p>
              {lead?.contact_person && (
                <p style={{ fontSize: '12px', color: MUTED, margin: '3px 0 0' }}>{lead.contact_person}</p>
              )}
            </div>
            <p style={{ fontSize: '11px', color: FAINT, margin: 0 }}>{today}</p>
          </div>
        </div>

        {/* Body */}
        <div className="pp-body">
          {sections.map(block => {
            const numbered = NUMBERED_TYPES.has(block.type)
            const sectionNumber = numbered ? String(++counter).padStart(2, '0') : null
            return (
              <PrintBlock key={block.id} block={block} vars={vars} sectionNumber={sectionNumber} locale={locale} />
            )
          })}

          {/* Footer */}
          <div style={{ marginTop: '40px', paddingTop: '16px', borderTop: `1px solid ${LINE}`, textAlign: 'center' }}>
            <p style={{ fontSize: '10px', color: FAINT, margin: 0, lineHeight: 1.6 }}>
              {t.footerPrefix} <span style={{ color: MUTED }}>{lead?.organization}</span> {t.footerSuffix}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Styles (page geometry + print rules) ──────────────────────
const printStyles = `
  .pp-serif { font-family: Georgia, 'Cormorant Garamond', 'Times New Roman', serif; }

  .pp-toolbar {
    position: sticky; top: 0; z-index: 50;
    display: flex; align-items: center; gap: 12px;
    padding: 12px 20px;
    background: rgba(20,24,34,0.92);
    backdrop-filter: blur(8px);
    border-bottom: 1px solid rgba(255,255,255,0.08);
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

  .pp-page {
    width: 210mm;
    min-height: 297mm;
    margin: 24px auto;
    background: #fff;
    box-shadow: 0 8px 40px rgba(0,0,0,0.4);
    color: #1a2236;
  }
  .pp-cover {
    min-height: 297mm;
    box-sizing: border-box;
    padding: 26mm 22mm;
    display: flex; flex-direction: column;
    break-after: page;
  }
  .pp-body {
    box-sizing: border-box;
    padding: 22mm 22mm 26mm;
  }
  .pp-card {
    border: 1px solid ${LINE};
    border-radius: 10px;
    padding: 14px 16px;
    background: #fff;
  }
  .pp-avoid-break { break-inside: avoid; }
  .pp-keep-with-next { break-after: avoid; }
  .pp-section { break-inside: auto; }

  @media print {
    .pp-root { background: #fff !important; }
    .pp-toolbar { display: none !important; }
    .pp-page {
      width: auto; min-height: 0; margin: 0;
      box-shadow: none;
    }
    .pp-cover { padding: 0; min-height: auto; height: 247mm; }
    .pp-body { padding: 0; }
    /* Print background colours (pricing, table stripes, recommended badge). */
    * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
  }

  @page {
    size: A4;
    margin: 16mm;
  }
`
