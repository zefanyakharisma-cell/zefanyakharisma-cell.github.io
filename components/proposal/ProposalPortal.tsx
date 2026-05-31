'use client'

import { useEffect } from 'react'
import { trackEvent, trackSectionView } from '@/lib/analytics/tracker'
import type { Proposal, ProposalBlock } from '@/types'
import { Moon } from 'lucide-react'
import StarField from '@/components/cm/StarField'
import ConstellationSVG from '@/components/cm/ConstellationSVG'

// ── Variable interpolation ────────────────────────────────────
function interpolate(text: string, vars: Record<string, string>): string {
  return text.replace(/\{\{(\w+)\}\}/g, (_, key) => vars[key] ?? `{{${key}}}`)
}

// ── Section visibility tracker (analytics) ───────────────────
import { useRef } from 'react'

function SectionObserver({
  proposalId,
  sectionType,
  children,
}: {
  proposalId: string
  sectionType: string
  children: React.ReactNode
}) {
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

// ── Shared section header ─────────────────────────────────────
function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-4 mb-10">
      <div className="w-px h-10 flex-shrink-0" style={{ background: 'linear-gradient(to bottom, transparent, rgba(212,177,90,0.6), transparent)' }} />
      <h2 className="font-serif font-light text-3xl" style={{ color: '#D9E6FF' }}>
        {children}
      </h2>
    </div>
  )
}

// ── Block renderer ────────────────────────────────────────────
function BlockRenderer({
  block,
  vars,
  proposalId,
}: {
  block: ProposalBlock
  vars: Record<string, string>
  proposalId: string
}) {
  const data = block.data as Record<string, string>
  const interp = (s: string) => interpolate(s, vars)

  switch (block.type) {

    case 'hero':
      return (
        <SectionObserver proposalId={proposalId} sectionType="hero">
          <section className="relative min-h-[88vh] flex flex-col items-center justify-center px-8 py-24 text-center overflow-hidden">
            {/* Constellation overlay */}
            <div className="absolute inset-0 pointer-events-none">
              <ConstellationSVG w={900} h={500} seed={4} />
            </div>
            {/* Radial glow */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(111,168,255,0.06) 0%, transparent 65%)' }}
            />
            <div className="relative z-10 cm-reveal max-w-4xl">
              <p
                className="text-[10px] font-semibold uppercase mb-8"
                style={{ letterSpacing: '0.35em', color: 'rgba(212,177,90,0.65)' }}
              >
                Confidential Proposal
              </p>
              <h1
                className="font-serif font-light leading-[1.1] text-balance mb-8"
                style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', color: '#D9E6FF' }}
              >
                {interp(data.headline ?? 'A Strategic Proposal')}
              </h1>
              {/* Gold divider */}
              <div className="flex items-center justify-center gap-4 mb-8">
                <div style={{ width: 56, height: 1, background: 'linear-gradient(to right, transparent, rgba(212,177,90,0.5))' }} />
                <div style={{ width: 5, height: 5, borderRadius: '50%', background: 'rgba(212,177,90,0.7)' }} />
                <div style={{ width: 56, height: 1, background: 'linear-gradient(to left, transparent, rgba(212,177,90,0.5))' }} />
              </div>
              {data.subheadline && (
                <p
                  className="text-lg md:text-xl leading-relaxed max-w-2xl mx-auto text-balance"
                  style={{ color: 'rgba(143,168,214,0.75)' }}
                >
                  {interp(data.subheadline)}
                </p>
              )}
            </div>
            {/* Scroll indicator */}
            <div
              className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
              style={{ opacity: 0.35 }}
            >
              <div style={{ width: 1, height: 36, background: 'linear-gradient(to bottom, transparent, rgba(143,168,214,0.7))' }} />
              <span
                className="text-[9px] uppercase"
                style={{ letterSpacing: '0.2em', color: 'rgba(143,168,214,0.7)' }}
              >
                Scroll
              </span>
            </div>
          </section>
        </SectionObserver>
      )

    case 'greeting':
      return (
        <section className="py-20 px-8 max-w-3xl mx-auto">
          <div className="cm-reveal">
            <div
              className="font-serif select-none leading-none mb-2"
              style={{ fontSize: '5rem', color: 'rgba(212,177,90,0.12)' }}
            >
              ❝
            </div>
            <p
              className="text-base md:text-lg leading-[1.95] whitespace-pre-line"
              style={{ color: 'rgba(217,230,255,0.72)' }}
            >
              {interp(data.message ?? '')}
            </p>
          </div>
        </section>
      )

    case 'audit_findings':
    case 'website_analysis':
      return (
        <SectionObserver proposalId={proposalId} sectionType={block.type}>
          <section className="py-20 px-8 max-w-4xl mx-auto w-full">
            <div className="cm-reveal">
              <SectionHeading>
                {block.type === 'audit_findings' ? 'Current State Analysis' : 'Website Analysis'}
              </SectionHeading>
              <div
                className="rounded-2xl p-8"
                style={{
                  background: 'rgba(11,30,58,0.48)',
                  border: '1px solid rgba(111,168,255,0.1)',
                  backdropFilter: 'blur(12px)',
                }}
              >
                <div className="space-y-3.5">
                  {interp(data.findings ?? data.analysis ?? '').split('\n').filter(Boolean).map((line, i) => (
                    <div key={i} className="flex items-start gap-3.5">
                      <div
                        className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-2"
                        style={{ background: 'rgba(111,168,255,0.45)' }}
                      />
                      <p className="text-sm leading-relaxed" style={{ color: 'rgba(217,230,255,0.7)' }}>{line}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </SectionObserver>
      )

    case 'redesign_concept':
      return (
        <SectionObserver proposalId={proposalId} sectionType="redesign_concept">
          <section className="py-20 px-8 max-w-4xl mx-auto w-full">
            <div className="cm-reveal">
              <SectionHeading>Redesign Concept</SectionHeading>
              <div
                className="rounded-2xl p-8"
                style={{
                  background: 'rgba(11,30,58,0.48)',
                  border: '1px solid rgba(111,168,255,0.1)',
                  backdropFilter: 'blur(12px)',
                }}
              >
                <p className="text-sm leading-relaxed whitespace-pre-line" style={{ color: 'rgba(217,230,255,0.72)' }}>
                  {interp(data.concept ?? data.description ?? '')}
                </p>
              </div>
            </div>
          </section>
        </SectionObserver>
      )

    case 'features':
      return (
        <SectionObserver proposalId={proposalId} sectionType="features">
          <section className="py-20 px-8 max-w-5xl mx-auto w-full">
            <div className="cm-reveal">
              <SectionHeading>Proposed Features</SectionHeading>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {interp(data.features ?? '').split('\n').filter(Boolean).map((feature, i) => (
                  <div
                    key={i}
                    className="cm-card-hover rounded-xl p-5 cursor-default"
                    style={{
                      background: 'rgba(11,30,58,0.48)',
                      border: '1px solid rgba(111,168,255,0.09)',
                      backdropFilter: 'blur(8px)',
                    }}
                  >
                    <div className="flex items-center gap-2.5 mb-3.5">
                      <span
                        className="text-[10px] font-mono font-semibold"
                        style={{ color: 'rgba(212,177,90,0.6)', letterSpacing: '0.05em' }}
                      >
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <div className="flex-1 h-px" style={{ background: 'rgba(212,177,90,0.1)' }} />
                    </div>
                    <p className="text-sm leading-relaxed" style={{ color: 'rgba(217,230,255,0.72)' }}>
                      {feature}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </SectionObserver>
      )

    case 'pricing':
      return (
        <SectionObserver proposalId={proposalId} sectionType="pricing">
          <section className="py-20 px-8 max-w-2xl mx-auto w-full">
            <div className="cm-reveal">
              <SectionHeading>Investment</SectionHeading>
              <div
                className="rounded-2xl overflow-hidden"
                style={{
                  background: 'rgba(11,30,58,0.55)',
                  border: '1px solid rgba(212,177,90,0.18)',
                  backdropFilter: 'blur(16px)',
                  boxShadow: '0 0 80px rgba(212,177,90,0.07), 0 4px 32px rgba(3,7,18,0.45)',
                }}
              >
                {/* Price header */}
                <div
                  className="px-8 py-10 text-center"
                  style={{ borderBottom: '1px solid rgba(212,177,90,0.1)', background: 'rgba(212,177,90,0.03)' }}
                >
                  <p
                    className="text-[10px] font-semibold uppercase mb-5"
                    style={{ letterSpacing: '0.28em', color: 'rgba(212,177,90,0.55)' }}
                  >
                    {interp(data.package ?? 'Professional Package')}
                  </p>
                  <p className="font-serif font-light text-5xl" style={{ color: '#D4B15A' }}>
                    {interp(data.price ?? '')}
                  </p>
                </div>
                {/* Inclusions */}
                {data.inclusions && (
                  <div className="px-8 py-8 space-y-4">
                    {interp(data.inclusions).split('\n').filter(Boolean).map((item, i) => (
                      <div key={i} className="flex items-start gap-3.5">
                        <div
                          className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                          style={{
                            background: 'rgba(212,177,90,0.08)',
                            border: '1px solid rgba(212,177,90,0.2)',
                          }}
                        >
                          <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#D4B15A' }} />
                        </div>
                        <span className="text-sm leading-relaxed" style={{ color: 'rgba(217,230,255,0.72)' }}>
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </section>
        </SectionObserver>
      )

    case 'timeline': {
      const phases = interp(data.timeline ?? '').split('\n').filter(Boolean)
      return (
        <SectionObserver proposalId={proposalId} sectionType="timeline">
          <section className="py-20 px-8 max-w-3xl mx-auto w-full">
            <div className="cm-reveal">
              <SectionHeading>Project Timeline</SectionHeading>
              <div className="relative">
                {/* Vertical connector line */}
                <div
                  className="absolute top-4 bottom-4 pointer-events-none"
                  style={{ left: 18, width: 1, background: 'rgba(111,168,255,0.1)' }}
                />
                <div className="space-y-6">
                  {phases.map((phase, i) => (
                    <div key={i} className="flex gap-6">
                      <div className="flex-shrink-0 relative z-10">
                        <div
                          className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-mono font-semibold"
                          style={{
                            background: 'rgba(111,168,255,0.07)',
                            border: '1px solid rgba(111,168,255,0.18)',
                            color: '#6FA8FF',
                            boxShadow: '0 0 16px rgba(111,168,255,0.1)',
                          }}
                        >
                          {i + 1}
                        </div>
                      </div>
                      <div
                        className="flex-1 rounded-xl px-5 py-4 my-0.5"
                        style={{
                          background: 'rgba(11,30,58,0.42)',
                          border: '1px solid rgba(111,168,255,0.08)',
                        }}
                      >
                        <p className="text-sm leading-relaxed" style={{ color: 'rgba(217,230,255,0.75)' }}>
                          {phase}
                        </p>
                      </div>
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
              <SectionHeading>Infrastructure Model</SectionHeading>
              <div
                className="rounded-2xl p-8"
                style={{
                  background: 'rgba(11,30,58,0.48)',
                  border: '1px solid rgba(111,168,255,0.1)',
                  backdropFilter: 'blur(12px)',
                }}
              >
                <p className="text-sm leading-relaxed whitespace-pre-line" style={{ color: 'rgba(217,230,255,0.72)' }}>
                  {interp(data.model ?? data.content ?? '')}
                </p>
              </div>
            </div>
          </section>
        </SectionObserver>
      )

    case 'demo_embed':
      return (
        <SectionObserver proposalId={proposalId} sectionType="demo">
          <section className="py-20 px-8 max-w-5xl mx-auto w-full">
            <div className="cm-reveal">
              <SectionHeading>Live Preview</SectionHeading>
              {data.url && (
                <div
                  className="rounded-2xl overflow-hidden"
                  style={{
                    border: '1px solid rgba(111,168,255,0.13)',
                    boxShadow: '0 24px 64px rgba(3,7,18,0.55)',
                  }}
                >
                  {/* Browser chrome */}
                  <div
                    className="px-4 py-3 flex items-center gap-2.5"
                    style={{
                      background: 'rgba(11,30,58,0.85)',
                      borderBottom: '1px solid rgba(111,168,255,0.09)',
                    }}
                  >
                    <div className="flex gap-1.5">
                      {['rgba(248,113,113,0.45)', 'rgba(251,191,36,0.45)', 'rgba(74,222,128,0.45)'].map((c, i) => (
                        <div key={i} className="w-2.5 h-2.5 rounded-full" style={{ background: c }} />
                      ))}
                    </div>
                    <div
                      className="flex-1 mx-3 rounded px-3 py-1 text-xs font-mono truncate"
                      style={{
                        background: 'rgba(3,7,18,0.45)',
                        color: 'rgba(143,168,214,0.35)',
                      }}
                    >
                      {data.url}
                    </div>
                  </div>
                  <div className="aspect-video">
                    <iframe src={data.url} className="w-full h-full" title="Demo Preview" />
                  </div>
                </div>
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
              {data.title && <SectionHeading>{interp(data.title)}</SectionHeading>}
              {images.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {images.map((url, i) => (
                    <div
                      key={i}
                      className="rounded-xl overflow-hidden aspect-video cm-card-hover"
                      style={{ border: '1px solid rgba(111,168,255,0.1)' }}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={url} alt={`Gallery ${i + 1}`} className="w-full h-full object-cover" />
                    </div>
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
          <section className="py-28 px-8 text-center relative overflow-hidden">
            {/* Gold radial glow */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: 'radial-gradient(ellipse 70% 55% at 50% 50%, rgba(212,177,90,0.06) 0%, transparent 65%)' }}
            />
            <div className="relative z-10 cm-reveal">
              {/* Decorative dots */}
              <div className="flex justify-center gap-1.5 mb-10">
                {[0, 1, 2].map(i => (
                  <div key={i} className="w-1 h-1 rounded-full" style={{ background: 'rgba(212,177,90,0.4)' }} />
                ))}
              </div>
              <h2
                className="font-serif font-light leading-tight text-balance mb-6"
                style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', color: '#D9E6FF' }}
              >
                {interp(data.heading ?? 'Ready to Begin?')}
              </h2>
              <p className="text-sm mb-10 max-w-md mx-auto leading-relaxed" style={{ color: 'rgba(143,168,214,0.65)' }}>
                Let&apos;s schedule a discovery call to discuss your vision and next steps.
              </p>
              {data.email && (
                <a
                  href={`mailto:${data.email}`}
                  onClick={() => trackEvent(proposalId, 'cta_click', { section: 'cta' })}
                  className="cm-glow-btn inline-flex items-center gap-2.5 px-8 py-4 rounded-xl text-sm font-medium"
                  style={{
                    background: 'rgba(212,177,90,0.1)',
                    border: '1px solid rgba(212,177,90,0.28)',
                    color: '#D4B15A',
                  }}
                >
                  <Moon size={15} />
                  {interp(data.button ?? 'Get In Touch')}
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
            <p className="text-sm leading-relaxed whitespace-pre-line" style={{ color: 'rgba(217,230,255,0.68)' }}>
              {interp(data.content ?? '')}
            </p>
          </div>
        </section>
      )

    case 'divider':
      return (
        <div className="py-6 px-8 max-w-4xl mx-auto w-full">
          <div className="flex items-center gap-4">
            <div className="flex-1 h-px" style={{ background: 'rgba(111,168,255,0.07)' }} />
            <div className="flex gap-1.5">
              {[0, 1, 2].map(i => (
                <div key={i} className="w-1 h-1 rounded-full" style={{ background: 'rgba(111,168,255,0.18)' }} />
              ))}
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

    // Reading progress bar
    const onScroll = () => {
      const doc = document.documentElement
      const progress = (doc.scrollTop / (doc.scrollHeight - doc.clientHeight)) * 100
      const bar = document.getElementById('cm-progress-bar')
      if (bar) bar.style.width = `${Math.min(progress, 100)}%`
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    // Scroll reveal
    const reveals = document.querySelectorAll('.cm-reveal')
    const revealObs = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('cm-visible')
      }),
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

  return (
    <div
      className="min-h-screen relative"
      style={{ background: 'linear-gradient(160deg, #030712 0%, #071126 55%, #0a1a35 100%)' }}
    >
      {/* Fixed starfield */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <StarField count={110} />
      </div>

      {/* Reading progress bar */}
      <div
        className="fixed top-0 left-0 right-0 z-50 h-[2px]"
        style={{ background: 'rgba(111,168,255,0.06)' }}
      >
        <div
          id="cm-progress-bar"
          className="h-full w-0"
          style={{
            background: 'linear-gradient(to right, rgba(212,177,90,0.9), rgba(111,168,255,0.7))',
            transition: 'width 0.1s linear',
          }}
        />
      </div>

      {/* Nav */}
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
            <Moon size={15} style={{ color: '#D4B15A' }} />
            <span className="text-sm font-medium" style={{ color: '#D9E6FF' }}>CroissantsMoon</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs" style={{ color: 'rgba(143,168,214,0.55)' }}>Private Proposal</span>
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="relative z-10 max-w-5xl mx-auto">
        {sections.map(block => (
          <BlockRenderer key={block.id} block={block} vars={vars} proposalId={proposal.id} />
        ))}
      </main>

      {/* Footer */}
      <footer
        className="relative z-10 py-12 px-8 text-center mt-8"
        style={{ borderTop: '1px solid rgba(111,168,255,0.07)' }}
      >
        <Moon size={14} className="mx-auto mb-3" style={{ color: 'rgba(212,177,90,0.25)' }} />
        <p className="text-[11px] leading-relaxed" style={{ color: 'rgba(111,168,255,0.28)' }}>
          Prepared exclusively for{' '}
          <span style={{ color: 'rgba(143,168,214,0.45)' }}>{lead?.organization}</span>{' '}
          by CroissantsMoon Studio.
          {' '}Confidential — not for distribution.
        </p>
      </footer>
    </div>
  )
}
