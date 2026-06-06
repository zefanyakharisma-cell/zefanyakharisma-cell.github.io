'use client'

import { useEffect, useRef, useState } from 'react'
import { trackEvent, trackSectionView } from '@/lib/analytics/tracker'
import type { Proposal, ProposalBlock } from '@/types'
import { Moon, ArrowUpRight, Quote, Star } from 'lucide-react'
import StarField from '@/components/cm/StarField'
import ConstellationSVG from '@/components/cm/ConstellationSVG'

// ── Helpers ───────────────────────────────────────────────────
function interpolate(text: string, vars: Record<string, string>): string {
  return text.replace(/\{\{(\w+)\}\}/g, (_, key) => vars[key] ?? `{{${key}}}`)
}

function rgba(hex: string, a: number): string {
  const h = hex.replace('#', '')
  const r = parseInt(h.slice(0, 2), 16)
  const g = parseInt(h.slice(2, 4), 16)
  const b = parseInt(h.slice(4, 6), 16)
  return `rgba(${r},${g},${b},${a})`
}

// ── Palette (breaks the monotone — one accent per section type) ─
const AURORA = '#6FA8FF'
const GOLD   = '#D4B15A'
const VIOLET = '#C9A9FF'
const SKY    = '#A0C4FF'
const MINT   = '#7DC9A0'

const SECTION_META: Record<string, { eyebrow: string; accent: string; title: string }> = {
  audit_findings:   { eyebrow: 'Analysis',       accent: AURORA, title: 'Current State Analysis' },
  website_analysis: { eyebrow: 'Analysis',       accent: AURORA, title: 'Website Analysis' },
  redesign_concept: { eyebrow: 'Concept',        accent: VIOLET, title: 'Redesign Concept' },
  features:         { eyebrow: 'Capabilities',   accent: SKY,    title: 'Proposed Features' },
  pricing:          { eyebrow: 'Investment',     accent: GOLD,   title: 'Investment' },
  timeline:         { eyebrow: 'Roadmap',        accent: MINT,   title: 'Project Timeline' },
  infrastructure:   { eyebrow: 'Infrastructure', accent: MINT,   title: 'Infrastructure Model' },
  demo_embed:       { eyebrow: 'Preview',        accent: AURORA, title: 'Live Preview' },
  gallery:          { eyebrow: 'Gallery',        accent: VIOLET, title: 'Gallery' },
}

const FEATURE_COLORS = [AURORA, VIOLET, SKY, MINT, GOLD]

// Sections that show a numbered editorial header. `pricing` is intentionally
// excluded — it renders its own centered header — so the visible numbering
// stays contiguous (no skipped number).
const NUMBERED_TYPES = new Set([
  'audit_findings', 'website_analysis', 'redesign_concept',
  'features', 'timeline', 'infrastructure', 'demo_embed', 'gallery',
])

// ── Analytics observer ────────────────────────────────────────
function SectionObserver({
  proposalId, sectionType, children,
}: { proposalId: string; sectionType: string; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    let tracked = false
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !tracked) {
          tracked = true
          trackSectionView(proposalId, sectionType)
        }
      },
      { threshold: 0.2 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [proposalId, sectionType])
  return <div ref={ref}>{children}</div>
}

// ── Glassmorphism card with colored hover glow ────────────────
function GlassCard({
  accent = AURORA, className = '', style = {}, children,
}: {
  accent?: string
  className?: string
  style?: React.CSSProperties
  children: React.ReactNode
}) {
  const [hover, setHover] = useState(false)
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={`rounded-2xl transition-all duration-300 ${className}`}
      style={{
        background: hover ? 'rgba(13,34,64,0.6)' : 'rgba(11,30,58,0.46)',
        border: `1px solid ${hover ? rgba(accent, 0.32) : 'rgba(111,168,255,0.1)'}`,
        backdropFilter: 'blur(16px) saturate(1.4)',
        WebkitBackdropFilter: 'blur(16px) saturate(1.4)',
        transform: hover ? 'translateY(-5px)' : 'translateY(0)',
        boxShadow: hover
          ? `0 28px 70px rgba(3,7,18,0.55), 0 0 48px ${rgba(accent, 0.16)}, inset 0 1px 0 ${rgba(accent, 0.1)}`
          : '0 6px 28px rgba(3,7,18,0.32)',
        ...style,
      }}
    >
      {children}
    </div>
  )
}

// ── Pricing tier card (solo / recommended / normal) ───────────
function PriceTier({
  name, price, inclusions, variant, count,
}: {
  name: string
  price: string
  inclusions: string[]
  variant: 'recommended' | 'solo' | 'normal'
  count: number
}) {
  const [hover, setHover] = useState(false)
  const gold = variant === 'recommended' || variant === 'solo'
  const recommended = variant === 'recommended'
  const accent = gold ? GOLD : AURORA

  // Scale type & padding to how many tiers share the row so long names and
  // prices (e.g. "IDR 75,000,000") fit inside the card instead of overflowing.
  const padX = count >= 4 ? 'px-5' : count === 3 ? 'px-6' : 'px-7'
  const priceSize =
    count >= 4 ? 'clamp(1.55rem, 2.2vw, 2rem)'
    : count === 3 ? 'clamp(1.75rem, 2.8vw, 2.4rem)'
    : count === 2 ? 'clamp(2rem, 3.4vw, 2.9rem)'
    : 'clamp(2.4rem, 5vw, 3.4rem)'
  const nameTracking = count >= 3 ? '0.16em' : '0.24em'

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="relative rounded-2xl overflow-hidden flex flex-col h-full transition-all duration-300"
      style={{
        background: gold ? 'rgba(18,27,46,0.66)' : hover ? 'rgba(13,34,64,0.6)' : 'rgba(11,30,58,0.46)',
        border: `1px solid ${
          recommended ? rgba(GOLD, 0.5) : gold ? rgba(GOLD, 0.28) : hover ? rgba(AURORA, 0.32) : 'rgba(111,168,255,0.1)'
        }`,
        backdropFilter: 'blur(16px) saturate(1.4)',
        WebkitBackdropFilter: 'blur(16px) saturate(1.4)',
        transform: recommended ? 'translateY(-4px)' : hover ? 'translateY(-5px)' : 'translateY(0)',
        boxShadow: recommended
          ? undefined
          : hover
          ? `0 28px 70px rgba(3,7,18,0.55), 0 0 48px ${rgba(accent, 0.16)}`
          : '0 6px 28px rgba(3,7,18,0.32)',
        animation: recommended ? 'cmGlowPulse 2.8s ease-in-out infinite' : undefined,
      }}
    >
      {recommended && (
        <div
          className="py-2.5 text-center"
          style={{ background: rgba(GOLD, 0.14), borderBottom: `1px solid ${rgba(GOLD, 0.22)}` }}
        >
          <span
            className="text-[10px] font-semibold uppercase inline-flex items-center gap-1.5"
            style={{ letterSpacing: '0.24em', color: GOLD }}
          >
            <Star size={10} fill={GOLD} strokeWidth={0} /> Recommended
          </span>
        </div>
      )}

      <div
        className={`${padX} py-9 text-center`}
        style={{ borderBottom: `1px solid ${rgba(accent, 0.1)}`, background: gold ? rgba(GOLD, 0.03) : 'transparent' }}
      >
        <p
          className="text-[11px] font-semibold uppercase mb-5 break-words"
          style={{ letterSpacing: nameTracking, color: rgba(accent, 0.88) }}
        >
          {name || 'Package'}
        </p>
        <p
          className="font-serif font-light break-words"
          style={{ fontSize: priceSize, lineHeight: 1.05, color: accent, overflowWrap: 'anywhere' }}
        >
          {price}
        </p>
      </div>

      {inclusions.length > 0 && (
        <div className={`${padX} py-7 flex-1 ${variant === 'solo' ? 'grid sm:grid-cols-2 gap-x-8 gap-y-3.5' : 'space-y-3.5'}`}>
          {inclusions.map((item, i) => (
            <div key={i} className="flex items-start gap-3">
              <div
                className="rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{ width: 18, height: 18, background: rgba(accent, 0.08), border: `1px solid ${rgba(accent, 0.22)}` }}
              >
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: accent }} />
              </div>
              <span className="text-sm leading-relaxed break-words min-w-0" style={{ color: rgba('#D9E6FF', 0.74) }}>{item}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ── Editorial numbered header ─────────────────────────────────
function EditorialHeader({
  number, accent, eyebrow, title,
}: { number?: string; accent: string; eyebrow: string; title: string }) {
  return (
    <div className="mb-9">
      <div className="flex items-center gap-3 mb-5">
        {number && (
          <span className="font-mono text-sm font-semibold" style={{ color: accent }}>{number}</span>
        )}
        <span
          className="w-8 h-px"
          style={{ background: `linear-gradient(to right, ${accent}, transparent)` }}
        />
        <span
          className="text-[11px] font-semibold uppercase"
          style={{ letterSpacing: '0.24em', color: rgba(accent, 0.92) }}
        >
          {eyebrow}
        </span>
      </div>
      <h2
        className="font-serif font-light leading-tight"
        style={{ fontSize: 'clamp(1.85rem, 3.6vw, 2.85rem)', color: '#D9E6FF' }}
      >
        {title}
      </h2>
    </div>
  )
}

// ── Sub-section label (used inside multi-part sections) ───────
function SubLabel({ label, accent }: { label: string; accent: string }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <span
        className="text-[11px] font-semibold uppercase"
        style={{ letterSpacing: '0.2em', color: rgba(accent, 0.92) }}
      >
        {label}
      </span>
      <span className="flex-1 h-px" style={{ background: rgba(accent, 0.14) }} />
    </div>
  )
}

// ── Editorial table (shared by Timeline, Tone & Infrastructure) ─
// One row per line; columns separated by " - " (space-dash-space).
function parseTable(text: string): string[][] {
  return text
    .split('\n').map(l => l.trim()).filter(Boolean)
    .map(line => line.split(/\s+-\s+/).map(c => c.trim()))
}

function DataTable({ rows, accent }: { rows: string[][]; accent: string }) {
  if (rows.length === 0) return null
  const maxCols = Math.max(...rows.map(r => r.length))
  return (
    <GlassCard accent={accent} className="overflow-hidden">
      {rows.map((cells, i) => (
        <div
          key={i}
          className="grid grid-cols-1 sm:grid-cols-[var(--tl-cols)] items-start sm:items-center gap-x-5 gap-y-0.5 px-6 py-4 transition-colors"
          style={{
            ['--tl-cols' as string]: maxCols > 1 ? `minmax(110px, 0.7fr) repeat(${maxCols - 1}, 1fr)` : '1fr',
            borderTop: i > 0 ? `1px solid ${rgba(accent, 0.1)}` : 'none',
            background: i % 2 === 1 ? 'rgba(111,168,255,0.018)' : 'transparent',
          } as React.CSSProperties}
        >
          {Array.from({ length: maxCols }).map((_, c) => {
            const cell = cells[c] ?? ''
            if (!cell) return <span key={c} className="hidden sm:block" />
            return (
              <span
                key={c}
                className="text-sm leading-relaxed"
                style={{
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
    </GlassCard>
  )
}

// ── Interactive point card (numbered, hover-lit) ──────────────
function PointCard({ index, accent, children }: { index: number; accent: string; children: React.ReactNode }) {
  return (
    <GlassCard accent={accent} className="p-5">
      <div className="flex items-start gap-3.5">
        <span
          className="font-mono text-xs font-semibold mt-0.5 flex-shrink-0"
          style={{ color: rgba(accent, 0.7) }}
        >
          {String(index + 1).padStart(2, '0')}
        </span>
        <p className="text-sm leading-relaxed" style={{ color: rgba('#D9E6FF', 0.72) }}>{children}</p>
      </div>
    </GlassCard>
  )
}

// ── Block renderer ────────────────────────────────────────────
function BlockRenderer({
  block, vars, proposalId, sectionNumber,
}: {
  block: ProposalBlock
  vars: Record<string, string>
  proposalId: string
  sectionNumber: string | null
}) {
  const data = block.data as Record<string, string>
  const interp = (s: string) => interpolate(s, vars)
  const meta = SECTION_META[block.type]
  const accent = meta?.accent ?? AURORA

  switch (block.type) {

    case 'hero':
      return (
        <SectionObserver proposalId={proposalId} sectionType="hero">
          <section className="relative min-h-[90vh] flex flex-col items-center justify-center px-8 py-24 text-center overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
              <ConstellationSVG w={900} h={520} seed={4} />
            </div>
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: `radial-gradient(ellipse 75% 55% at 50% 45%, ${rgba(AURORA, 0.07)} 0%, transparent 65%)` }}
            />
            <div className="relative z-10 cm-reveal max-w-4xl">
              <p className="text-[10px] font-semibold uppercase mb-8" style={{ letterSpacing: '0.38em', color: rgba(GOLD, 0.7) }}>
                Confidential Proposal
              </p>
              <h1
                className="font-serif font-light leading-[1.08] text-balance mb-8"
                style={{ fontSize: 'clamp(2.6rem, 6.2vw, 5.25rem)', color: '#D9E6FF' }}
              >
                {interp(data.headline ?? 'A Strategic Proposal')}
              </h1>
              <div className="flex items-center justify-center gap-4 mb-8">
                <div style={{ width: 60, height: 1, background: `linear-gradient(to right, transparent, ${rgba(GOLD, 0.55)})` }} />
                <div style={{ width: 5, height: 5, borderRadius: '50%', background: rgba(GOLD, 0.8) }} />
                <div style={{ width: 60, height: 1, background: `linear-gradient(to left, transparent, ${rgba(GOLD, 0.55)})` }} />
              </div>
              {data.subheadline && (
                <p className="text-lg md:text-xl leading-relaxed max-w-2xl mx-auto text-balance" style={{ color: rgba('#8FA8D6', 0.78) }}>
                  {interp(data.subheadline)}
                </p>
              )}
            </div>
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2" style={{ opacity: 0.35 }}>
              <div style={{ width: 1, height: 38, background: `linear-gradient(to bottom, transparent, ${rgba('#8FA8D6', 0.7)})` }} />
              <span className="text-[9px] uppercase" style={{ letterSpacing: '0.2em', color: rgba('#8FA8D6', 0.7) }}>Scroll</span>
            </div>
          </section>
        </SectionObserver>
      )

    case 'greeting':
      // Editorial: narrow vertical label column + large pull-quote body
      return (
        <section className="py-24 px-8 max-w-5xl mx-auto w-full">
          <div className="cm-reveal grid md:grid-cols-[140px_1fr] gap-8 md:gap-12 items-start">
            <div className="flex md:flex-col items-center md:items-start gap-3 md:pt-3">
              <Quote size={20} style={{ color: rgba(GOLD, 0.5) }} />
              <span className="text-[10px] font-semibold uppercase" style={{ letterSpacing: '0.24em', color: rgba(GOLD, 0.55) }}>
                A Note For You
              </span>
            </div>
            <p
              className="font-serif font-light whitespace-pre-line"
              style={{ fontSize: 'clamp(1.35rem, 2.6vw, 1.9rem)', lineHeight: 1.55, color: rgba('#D9E6FF', 0.85) }}
            >
              {interp(data.message ?? '')}
            </p>
          </div>
        </section>
      )

    case 'audit_findings':
    case 'website_analysis': {
      // Three editorial movements: What we found · Why it matters · How we solve it.
      // Each gets its own accent to break the monotone; falls back to the legacy
      // single "findings" list when the structured fields are empty.
      const groups = [
        { key: 'what', label: 'What We Found',   accent: AURORA },
        { key: 'why',  label: 'Why It Matters',  accent: GOLD },
        { key: 'how',  label: 'How We Solve It', accent: MINT },
      ].map(g => ({ ...g, items: interp(data[g.key] ?? '').split('\n').filter(Boolean) }))
      const hasStructured = groups.some(g => g.items.length)
      const legacy = interp(data.findings ?? data.analysis ?? '').split('\n').filter(Boolean)
      return (
        <SectionObserver proposalId={proposalId} sectionType={block.type}>
          <section className="py-20 px-8 max-w-4xl mx-auto w-full">
            <div className="cm-reveal">
              <EditorialHeader number={sectionNumber ?? undefined} accent={accent} eyebrow={meta.eyebrow} title={meta.title} />
              {hasStructured ? (
                <div className="space-y-12">
                  {groups.filter(g => g.items.length).map(g => (
                    <div key={g.key}>
                      <SubLabel label={g.label} accent={g.accent} />
                      <div className="grid sm:grid-cols-2 gap-4">
                        {g.items.map((line, i) => (
                          <PointCard key={i} index={i} accent={g.accent}>{line}</PointCard>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 gap-4">
                  {legacy.map((line, i) => (
                    <PointCard key={i} index={i} accent={accent}>{line}</PointCard>
                  ))}
                </div>
              )}
            </div>
          </section>
        </SectionObserver>
      )
    }

    case 'redesign_concept': {
      // Three parts: Direction (paragraph) · Tone (timeline-style table) · Key Ideas (interactive points).
      // Legacy single "concept"/"description" text maps to Direction.
      const direction = interp(data.direction ?? data.concept ?? data.description ?? '')
      const toneRows = parseTable(interp(data.tone ?? ''))
      const ideas = interp(data.key_ideas ?? '').split('\n').filter(Boolean)
      if (!direction && toneRows.length === 0 && ideas.length === 0) return null
      return (
        <SectionObserver proposalId={proposalId} sectionType="redesign_concept">
          <section className="py-20 px-8 max-w-4xl mx-auto w-full">
            <div className="cm-reveal">
              <EditorialHeader number={sectionNumber ?? undefined} accent={accent} eyebrow={meta.eyebrow} title={meta.title} />
              <div className="space-y-12">
                {direction && (
                  <div>
                    <SubLabel label="Direction" accent={accent} />
                    <GlassCard accent={accent} className="p-8 md:p-10">
                      <p className="text-[15px] leading-[1.85] whitespace-pre-line" style={{ color: rgba('#D9E6FF', 0.76) }}>
                        {direction}
                      </p>
                    </GlassCard>
                  </div>
                )}
                {toneRows.length > 0 && (
                  <div>
                    <SubLabel label="Tone" accent={accent} />
                    <DataTable rows={toneRows} accent={accent} />
                  </div>
                )}
                {ideas.length > 0 && (
                  <div>
                    <SubLabel label="Key Ideas" accent={accent} />
                    <div className="grid sm:grid-cols-2 gap-4">
                      {ideas.map((idea, i) => (
                        <PointCard key={i} index={i} accent={accent}>{idea}</PointCard>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
        </SectionObserver>
      )
    }

    case 'features': {
      const features = interp(data.features ?? '').split('\n').filter(Boolean)
      return (
        <SectionObserver proposalId={proposalId} sectionType="features">
          <section className="py-20 px-8 max-w-5xl mx-auto w-full">
            <div className="cm-reveal">
              <EditorialHeader number={sectionNumber ?? undefined} accent={accent} eyebrow={meta.eyebrow} title={meta.title} />
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {features.map((feature, i) => {
                  const c = FEATURE_COLORS[i % FEATURE_COLORS.length]
                  return (
                    <GlassCard key={i} accent={c} className="p-5">
                      <div className="flex items-center gap-2.5 mb-4">
                        <span
                          className="w-7 h-7 rounded-lg flex items-center justify-center font-mono text-[11px] font-semibold"
                          style={{ background: rgba(c, 0.1), border: `1px solid ${rgba(c, 0.25)}`, color: c }}
                        >
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <div className="flex-1 h-px" style={{ background: rgba(c, 0.12) }} />
                      </div>
                      <p className="text-sm leading-relaxed" style={{ color: rgba('#D9E6FF', 0.74) }}>{feature}</p>
                    </GlassCard>
                  )
                })}
              </div>
            </div>
          </section>
        </SectionObserver>
      )
    }

    case 'pricing': {
      // New: up to 4 structured tiers. Fall back to legacy single package/price/inclusions.
      const rawTiers = Array.isArray((block.data as { tiers?: Array<{ name?: string; price?: string; inclusions?: string }> }).tiers)
        ? ((block.data as { tiers?: Array<{ name?: string; price?: string; inclusions?: string }> }).tiers ?? [])
        : []
      let tiers = rawTiers
        .map(t => ({
          name: interp(t.name ?? ''),
          price: interp(t.price ?? ''),
          inclusions: interp(t.inclusions ?? '').split('\n').filter(Boolean),
        }))
        .filter(t => t.price || t.name || t.inclusions.length)
      if (tiers.length === 0 && (data.price || data.package || data.inclusions)) {
        tiers = [{
          name: interp(data.package ?? 'Package'),
          price: interp(data.price ?? ''),
          inclusions: interp(data.inclusions ?? '').split('\n').filter(Boolean),
        }]
      }
      if (tiers.length === 0) return null
      tiers = tiers.slice(0, 4)
      const n = tiers.length

      // Highest price → "Recommended". Only highlight when more than one tier
      // AND at least one price parses to a real positive number — otherwise
      // (e.g. "Custom" / "Contact us") leave every tier un-highlighted.
      const parsePrice = (p: string) => {
        const v = parseFloat(p.replace(/[^0-9.]/g, ''))
        return isNaN(v) ? 0 : v
      }
      let recIdx = -1
      if (n > 1) {
        let max = 0
        tiers.forEach((t, i) => { const v = parsePrice(t.price); if (v > max) { max = v; recIdx = i } })
      }

      // Give 3–4 tiers more room; keep editorial body width for 1–2.
      const containerMax = n >= 3 ? 'max-w-6xl' : 'max-w-4xl'
      const gridClass =
        n === 1 ? 'grid grid-cols-1'
        : n === 3 ? 'grid grid-cols-1 md:grid-cols-3 gap-5'
        : n === 4 ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5'
        : 'grid grid-cols-1 md:grid-cols-2 gap-5'

      return (
        <SectionObserver proposalId={proposalId} sectionType="pricing">
          <section className={`py-24 px-8 ${containerMax} mx-auto w-full`}>
            <div className="cm-reveal">
              <div className="text-center mb-10">
                <span className="text-[11px] font-semibold uppercase" style={{ letterSpacing: '0.28em', color: rgba(GOLD, 0.85) }}>
                  Investment
                </span>
              </div>
              <div className={gridClass}>
                {tiers.map((t, i) => (
                  <PriceTier
                    key={i}
                    name={t.name}
                    price={t.price}
                    inclusions={t.inclusions}
                    variant={n === 1 ? 'solo' : i === recIdx ? 'recommended' : 'normal'}
                    count={n}
                  />
                ))}
              </div>
            </div>
          </section>
        </SectionObserver>
      )
    }

    case 'timeline': {
      const rows = parseTable(interp(data.timeline ?? ''))
      if (rows.length === 0) return null
      return (
        <SectionObserver proposalId={proposalId} sectionType="timeline">
          <section className="py-20 px-8 max-w-4xl mx-auto w-full">
            <div className="cm-reveal">
              <EditorialHeader number={sectionNumber ?? undefined} accent={accent} eyebrow={meta.eyebrow} title={meta.title} />
              <DataTable rows={rows} accent={accent} />
            </div>
          </section>
        </SectionObserver>
      )
    }

    case 'infrastructure': {
      const rows = parseTable(interp(data.model ?? data.content ?? ''))
      if (rows.length === 0) return null
      return (
        <SectionObserver proposalId={proposalId} sectionType="infrastructure">
          <section className="py-20 px-8 max-w-4xl mx-auto w-full">
            <div className="cm-reveal">
              <EditorialHeader number={sectionNumber ?? undefined} accent={accent} eyebrow={meta.eyebrow} title={meta.title} />
              <DataTable rows={rows} accent={accent} />
            </div>
          </section>
        </SectionObserver>
      )
    }

    case 'demo_embed':
      return (
        <SectionObserver proposalId={proposalId} sectionType="demo">
          <section className="py-20 px-8 max-w-5xl mx-auto w-full">
            <div className="cm-reveal">
              <EditorialHeader number={sectionNumber ?? undefined} accent={accent} eyebrow={meta.eyebrow} title={meta.title} />
              {data.url && (
                <GlassCard accent={accent} className="overflow-hidden" style={{ boxShadow: `0 24px 64px rgba(3,7,18,0.55)` }}>
                  <div className="px-4 py-3 flex items-center gap-2.5" style={{ borderBottom: `1px solid ${rgba(accent, 0.1)}`, background: 'rgba(3,7,18,0.4)' }}>
                    <div className="flex gap-1.5">
                      {['rgba(248,113,113,0.45)', 'rgba(251,191,36,0.45)', 'rgba(74,222,128,0.45)'].map((c, i) => (
                        <div key={i} className="w-2.5 h-2.5 rounded-full" style={{ background: c }} />
                      ))}
                    </div>
                    <a
                      href={data.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Open in a new tab"
                      className="flex-1 mx-3 rounded px-3 py-1 text-xs font-mono truncate flex items-center gap-1.5 hover:underline transition-colors"
                      style={{ background: 'rgba(3,7,18,0.45)', color: rgba('#8FA8D6', 0.4) }}
                    >
                      <span className="truncate">{data.url}</span>
                      <ArrowUpRight size={11} className="flex-shrink-0" />
                    </a>
                  </div>
                  <div className="relative aspect-video">
                    {/* Fallback shown if the embedded site refuses framing or loads blank */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-center px-6 pointer-events-none">
                      <ArrowUpRight size={22} style={{ color: rgba(accent, 0.4) }} />
                      <p className="text-xs leading-relaxed max-w-xs" style={{ color: rgba('#8FA8D6', 0.5) }}>
                        Loading preview… if it doesn&apos;t appear, the site can&apos;t be embedded — open it in a new tab below.
                      </p>
                    </div>
                    <iframe src={data.url} loading="lazy" className="relative z-10 w-full h-full" title="Demo Preview" />
                  </div>
                  <a
                    href={data.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs hover:underline transition-colors"
                    style={{ borderTop: `1px solid ${rgba(accent, 0.1)}`, background: 'rgba(3,7,18,0.4)', color: rgba('#8FA8D6', 0.6) }}
                  >
                    Open the live preview in a new tab
                    <ArrowUpRight size={12} className="flex-shrink-0" />
                  </a>
                </GlassCard>
              )}
            </div>
          </section>
        </SectionObserver>
      )

    case 'gallery': {
      const images = interp(data.images ?? '').split('\n').filter(Boolean)
      return (
        <SectionObserver proposalId={proposalId} sectionType="gallery">
          <section className="py-20 px-8 max-w-5xl mx-auto w-full">
            <div className="cm-reveal">
              <EditorialHeader number={sectionNumber ?? undefined} accent={accent} eyebrow={meta.eyebrow} title={data.title ? interp(data.title) : meta.title} />
              {images.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {images.map((url, i) => (
                    <GlassCard key={i} accent={accent} className="overflow-hidden aspect-video p-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={url} alt={`Gallery ${i + 1}`} loading="lazy" className="w-full h-full object-cover" />
                    </GlassCard>
                  ))}
                </div>
              )}
            </div>
          </section>
        </SectionObserver>
      )
    }

    case 'cta':
      return (
        <SectionObserver proposalId={proposalId} sectionType="cta">
          <section className="py-32 px-8 text-center relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(ellipse 70% 55% at 50% 50%, ${rgba(GOLD, 0.07)} 0%, transparent 65%)` }} />
            <div className="relative z-10 cm-reveal">
              <div className="flex justify-center gap-1.5 mb-10">
                {[0, 1, 2].map(i => <div key={i} className="w-1 h-1 rounded-full" style={{ background: rgba(GOLD, 0.45) }} />)}
              </div>
              <h2 className="font-serif font-light leading-tight text-balance mb-6" style={{ fontSize: 'clamp(2.1rem, 4.2vw, 3.6rem)', color: '#D9E6FF' }}>
                {interp(data.heading ?? 'Ready to Begin?')}
              </h2>
              <p className="text-sm mb-10 max-w-md mx-auto leading-relaxed" style={{ color: rgba('#8FA8D6', 0.68) }}>
                Let&apos;s schedule a discovery call to discuss your vision and next steps.
              </p>
              {data.email && (
                <a
                  href={`mailto:${data.email}`}
                  onClick={() => trackEvent(proposalId, 'cta_click', { section: 'cta' })}
                  className="cm-glow-btn inline-flex items-center gap-2.5 px-8 py-4 rounded-xl text-sm font-medium"
                  style={{ background: rgba(GOLD, 0.1), border: `1px solid ${rgba(GOLD, 0.3)}`, color: GOLD }}
                >
                  <Moon size={15} />
                  {interp(data.button ?? 'Get In Touch')}
                  <ArrowUpRight size={15} />
                </a>
              )}
            </div>
          </section>
        </SectionObserver>
      )

    case 'text':
      return (
        <section className="py-14 px-8 max-w-3xl mx-auto w-full">
          <div className="cm-reveal">
            <p className="text-[15px] leading-[1.85] whitespace-pre-line" style={{ color: rgba('#D9E6FF', 0.7) }}>
              {interp(data.content ?? '')}
            </p>
          </div>
        </section>
      )

    case 'divider':
      return (
        <div className="py-4 px-8 max-w-4xl mx-auto w-full">
          <div className="flex items-center gap-4">
            <div className="flex-1 h-px" style={{ background: 'rgba(111,168,255,0.07)' }} />
            <div className="flex gap-1.5">
              {[0, 1, 2].map(i => <div key={i} className="w-1 h-1 rounded-full" style={{ background: 'rgba(111,168,255,0.18)' }} />)}
            </div>
            <div className="flex-1 h-px" style={{ background: 'rgba(111,168,255,0.07)' }} />
          </div>
        </div>
      )

    default:
      return null
  }
}

// ── Main portal ───────────────────────────────────────────────
export function ProposalPortal({ proposal }: { proposal: Proposal }) {
  const lead = proposal.lead as { organization?: string; contact_person?: string } | undefined
  const vars: Record<string, string> = {
    organization_name: lead?.organization ?? '',
    contact_person:    lead?.contact_person ?? '',
    project_type:      proposal.content?.branding?.org_name ?? '',
  }

  useEffect(() => {
    trackEvent(proposal.id, 'view')

    const onScroll = () => {
      const doc = document.documentElement
      const progress = (doc.scrollTop / (doc.scrollHeight - doc.clientHeight)) * 100
      const bar = document.getElementById('cm-progress-bar')
      if (bar) bar.style.width = `${Math.min(progress, 100)}%`
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    const reveals = document.querySelectorAll('.cm-reveal')
    const revealObs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('cm-visible') }),
      { threshold: 0.08 }
    )
    reveals.forEach(el => revealObs.observe(el))

    return () => {
      window.removeEventListener('scroll', onScroll)
      revealObs.disconnect()
    }
  }, [proposal.id])

  const sections = proposal.content?.sections
    ?.filter(b => b.visible !== false)
    ?.sort((a, b) => a.order - b.order) ?? []

  // Number only the major editorial content sections
  let counter = 0

  return (
    <div className="min-h-screen relative" style={{ background: 'linear-gradient(160deg, #030712 0%, #071126 55%, #0a1a35 100%)' }}>
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <StarField count={110} />
      </div>

      <div className="fixed top-0 left-0 right-0 z-50 h-[2px]" style={{ background: 'rgba(111,168,255,0.06)' }}>
        <div id="cm-progress-bar" className="h-full w-0" style={{ background: 'linear-gradient(to right, rgba(212,177,90,0.9), rgba(111,168,255,0.7))', transition: 'width 0.1s linear' }} />
      </div>

      <nav
        className="sticky top-0 z-40"
        style={{
          background: 'rgba(3,7,18,0.72)',
          backdropFilter: 'blur(24px) saturate(1.4)',
          WebkitBackdropFilter: 'blur(24px) saturate(1.4)',
          borderBottom: '1px solid rgba(111,168,255,0.07)',
        }}
      >
        <div className="max-w-5xl mx-auto px-8 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Moon size={15} style={{ color: GOLD }} />
            <span className="text-sm font-medium" style={{ color: '#D9E6FF' }}>CroissantsMoon</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs" style={{ color: rgba('#8FA8D6', 0.55) }}>Private Proposal</span>
          </div>
        </div>
      </nav>

      <main className="relative z-10 max-w-5xl mx-auto">
        {sections.map(block => {
          const numbered = NUMBERED_TYPES.has(block.type)
          const sectionNumber = numbered ? String(++counter).padStart(2, '0') : null
          return (
            <BlockRenderer
              key={block.id}
              block={block}
              vars={vars}
              proposalId={proposal.id}
              sectionNumber={sectionNumber}
            />
          )
        })}
      </main>

      <footer className="relative z-10 py-12 px-8 text-center mt-8" style={{ borderTop: '1px solid rgba(111,168,255,0.07)' }}>
        <Moon size={14} className="mx-auto mb-3" style={{ color: rgba(GOLD, 0.25) }} />
        <p className="text-[11px] leading-relaxed" style={{ color: 'rgba(111,168,255,0.28)' }}>
          Prepared exclusively for{' '}
          <span style={{ color: rgba('#8FA8D6', 0.45) }}>{lead?.organization}</span>{' '}
          by CroissantsMoon Studio. Confidential — not for distribution.
        </p>
      </footer>
    </div>
  )
}
