'use client'

import { useEffect, useRef, useState } from 'react'
import { trackEvent, trackSectionView } from '@/lib/analytics/tracker'
import type { Proposal, ProposalBlock } from '@/types'
import { Moon, ArrowUpRight, Quote } from 'lucide-react'
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
          className="text-[10px] font-semibold uppercase"
          style={{ letterSpacing: '0.26em', color: rgba(accent, 0.7) }}
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
      const lines = interp(data.findings ?? data.analysis ?? '').split('\n').filter(Boolean)
      return (
        <SectionObserver proposalId={proposalId} sectionType={block.type}>
          <section className="py-20 px-8 max-w-4xl mx-auto w-full">
            <div className="cm-reveal">
              <EditorialHeader number={sectionNumber ?? undefined} accent={accent} eyebrow={meta.eyebrow} title={meta.title} />
              <div className="grid sm:grid-cols-2 gap-4">
                {lines.map((line, i) => (
                  <GlassCard key={i} accent={accent} className="p-5">
                    <div className="flex items-start gap-3.5">
                      <span
                        className="font-mono text-xs font-semibold mt-0.5 flex-shrink-0"
                        style={{ color: rgba(accent, 0.7) }}
                      >
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <p className="text-sm leading-relaxed" style={{ color: rgba('#D9E6FF', 0.72) }}>{line}</p>
                    </div>
                  </GlassCard>
                ))}
              </div>
            </div>
          </section>
        </SectionObserver>
      )
    }

    case 'redesign_concept':
      return (
        <SectionObserver proposalId={proposalId} sectionType="redesign_concept">
          <section className="py-20 px-8 max-w-4xl mx-auto w-full">
            <div className="cm-reveal">
              <EditorialHeader number={sectionNumber ?? undefined} accent={accent} eyebrow={meta.eyebrow} title={meta.title} />
              <GlassCard accent={accent} className="p-8 md:p-10">
                <p className="text-[15px] leading-[1.85] whitespace-pre-line" style={{ color: rgba('#D9E6FF', 0.76) }}>
                  {interp(data.concept ?? data.description ?? '')}
                </p>
              </GlassCard>
            </div>
          </section>
        </SectionObserver>
      )

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
      const inclusions = data.inclusions ? interp(data.inclusions).split('\n').filter(Boolean) : []
      return (
        <SectionObserver proposalId={proposalId} sectionType="pricing">
          <section className="py-24 px-8 max-w-2xl mx-auto w-full">
            <div className="cm-reveal">
              <div className="text-center mb-9">
                <span className="text-[10px] font-semibold uppercase" style={{ letterSpacing: '0.3em', color: rgba(GOLD, 0.65) }}>
                  {meta.eyebrow}
                </span>
              </div>
              <GlassCard accent={GOLD} className="overflow-hidden" style={{ boxShadow: `0 0 80px ${rgba(GOLD, 0.08)}, 0 6px 32px rgba(3,7,18,0.45)` }}>
                <div className="px-8 py-12 text-center" style={{ borderBottom: `1px solid ${rgba(GOLD, 0.1)}`, background: rgba(GOLD, 0.03) }}>
                  <p className="text-[10px] font-semibold uppercase mb-6" style={{ letterSpacing: '0.28em', color: rgba(GOLD, 0.6) }}>
                    {interp(data.package ?? 'Professional Package')}
                  </p>
                  <p className="font-serif font-light" style={{ fontSize: 'clamp(3rem, 7vw, 4.5rem)', color: GOLD, lineHeight: 1 }}>
                    {interp(data.price ?? '')}
                  </p>
                </div>
                {inclusions.length > 0 && (
                  <div className="px-8 py-9 grid sm:grid-cols-2 gap-x-8 gap-y-4">
                    {inclusions.map((item, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div
                          className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                          style={{ background: rgba(GOLD, 0.08), border: `1px solid ${rgba(GOLD, 0.22)}` }}
                        >
                          <div className="w-1.5 h-1.5 rounded-full" style={{ background: GOLD }} />
                        </div>
                        <span className="text-sm leading-relaxed" style={{ color: rgba('#D9E6FF', 0.74) }}>{item}</span>
                      </div>
                    ))}
                  </div>
                )}
              </GlassCard>
            </div>
          </section>
        </SectionObserver>
      )
    }

    case 'timeline': {
      const phases = interp(data.timeline ?? '').split('\n').filter(Boolean)
      return (
        <SectionObserver proposalId={proposalId} sectionType="timeline">
          <section className="py-20 px-8 max-w-3xl mx-auto w-full">
            <div className="cm-reveal">
              <EditorialHeader number={sectionNumber ?? undefined} accent={accent} eyebrow={meta.eyebrow} title={meta.title} />
              <div className="relative">
                <div className="absolute top-4 bottom-4 pointer-events-none" style={{ left: 18, width: 1, background: rgba(accent, 0.16) }} />
                <div className="space-y-5">
                  {phases.map((phase, i) => (
                    <div key={i} className="flex gap-6 items-stretch">
                      <div className="flex-shrink-0 relative z-10">
                        <div
                          className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-mono font-semibold"
                          style={{ background: rgba(accent, 0.09), border: `1px solid ${rgba(accent, 0.28)}`, color: accent, boxShadow: `0 0 18px ${rgba(accent, 0.18)}` }}
                        >
                          {i + 1}
                        </div>
                      </div>
                      <GlassCard accent={accent} className="flex-1 px-5 py-4">
                        <p className="text-sm leading-relaxed" style={{ color: rgba('#D9E6FF', 0.76) }}>{phase}</p>
                      </GlassCard>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </SectionObserver>
      )
    }

    case 'infrastructure':
      return (
        <SectionObserver proposalId={proposalId} sectionType="infrastructure">
          <section className="py-20 px-8 max-w-4xl mx-auto w-full">
            <div className="cm-reveal">
              <EditorialHeader number={sectionNumber ?? undefined} accent={accent} eyebrow={meta.eyebrow} title={meta.title} />
              <GlassCard accent={accent} className="p-8 md:p-10">
                <p className="text-[15px] leading-[1.85] whitespace-pre-line" style={{ color: rgba('#D9E6FF', 0.76) }}>
                  {interp(data.model ?? data.content ?? '')}
                </p>
              </GlassCard>
            </div>
          </section>
        </SectionObserver>
      )

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
                    <div className="flex-1 mx-3 rounded px-3 py-1 text-xs font-mono truncate" style={{ background: 'rgba(3,7,18,0.45)', color: rgba('#8FA8D6', 0.4) }}>
                      {data.url}
                    </div>
                  </div>
                  <div className="aspect-video">
                    <iframe src={data.url} className="w-full h-full" title="Demo Preview" />
                  </div>
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
                      <img src={url} alt={`Gallery ${i + 1}`} className="w-full h-full object-cover" />
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
          const numbered = SECTION_META[block.type] !== undefined
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
