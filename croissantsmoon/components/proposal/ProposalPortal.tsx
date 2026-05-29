'use client'

import { useEffect, useRef, useState } from 'react'
import { trackEvent, trackSectionView } from '@/lib/analytics/tracker'
import type { Proposal, ProposalBlock } from '@/types'
import { Moon, Sparkles } from 'lucide-react'

function interpolate(text: string, vars: Record<string, string>): string {
  return text.replace(/\{\{(\w+)\}\}/g, (_, key) => vars[key] ?? `{{${key}}}`)
}

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

function CelestialDivider() {
  return (
    <div className="flex items-center gap-3 mt-3 mb-8">
      <div className="h-px flex-1 bg-gradient-to-r from-cm-gold/20 to-transparent" />
      <span className="text-cm-gold/30 text-[10px]">✦</span>
      <div className="h-px w-8 bg-cm-border/50" />
    </div>
  )
}

function DemoEmbed({ url }: { url: string }) {
  const [failed, setFailed] = useState(false)
  return (
    <div className="rounded-2xl overflow-hidden border border-cm-border bg-cm-elevated aspect-video">
      {failed ? (
        <div className="w-full h-full flex items-center justify-center gap-2 text-sm text-cm-muted">
          Preview unavailable —
          <a href={url} target="_blank" rel="noopener noreferrer" className="text-cm-gold/70 hover:text-cm-gold underline transition-colors">
            open in new tab
          </a>
        </div>
      ) : (
        <iframe src={url} className="w-full h-full" title="Demo" onError={() => setFailed(true)} />
      )}
    </div>
  )
}

function BlockRenderer({ block, vars, proposalId }: { block: ProposalBlock; vars: Record<string, string>; proposalId: string }) {
  const data = block.data as Record<string, string>
  const interp = (s: string) => interpolate(s, vars)

  switch (block.type) {
    case 'hero':
      return (
        <SectionObserver proposalId={proposalId} sectionType="hero">
          <section className="relative py-32 px-8 text-center border-b border-cm-border overflow-hidden">
            {/* Hero atmospheric glow */}
            <div className="absolute inset-0 pointer-events-none">
              <div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] blur-3xl"
                style={{ background: 'radial-gradient(ellipse at top, rgba(201,168,76,0.28) 0%, rgba(124,110,247,0.2) 45%, transparent 70%)' }}
              />
            </div>
            <div className="relative z-10">
              <div className="flex items-center justify-center gap-2 mb-8">
                <div className="h-px w-12 bg-gradient-to-r from-transparent to-cm-gold/30" />
                <Sparkles size={12} className="text-cm-gold/60" />
                <div className="h-px w-12 bg-gradient-to-l from-transparent to-cm-gold/30" />
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-light text-cm-white mb-6 text-balance leading-tight">
                {interp(data.headline ?? 'A Strategic Proposal')}
              </h1>
              {data.subheadline && (
                <p className="text-lg text-cm-subtle max-w-2xl mx-auto text-balance">
                  {interp(data.subheadline)}
                </p>
              )}
              <div className="flex items-center justify-center gap-2 mt-10">
                <span className="text-cm-gold/20 tracking-[0.5em] text-xs">· · ·</span>
              </div>
            </div>
          </section>
        </SectionObserver>
      )

    case 'greeting':
      return (
        <section className="py-16 px-8 border-t border-cm-border max-w-3xl mx-auto w-full">
          <p className="text-base text-cm-text leading-relaxed whitespace-pre-line">
            {interp(data.message ?? '')}
          </p>
        </section>
      )

    case 'audit_findings':
    case 'website_analysis':
      return (
        <SectionObserver proposalId={proposalId} sectionType={block.type}>
          <section className="py-16 px-8 border-t border-cm-border max-w-4xl mx-auto w-full">
            <h2 className="text-2xl font-serif font-light text-cm-white">
              <span className="text-cm-gold/40 text-sm mr-2.5 font-sans">✦</span>
              {block.type === 'audit_findings' ? 'Current State Analysis' : 'Website Analysis'}
            </h2>
            <CelestialDivider />
            <div className="bg-cm-elevated border border-cm-border rounded-2xl p-8">
              <p className="text-sm text-cm-text leading-relaxed whitespace-pre-line">
                {interp(data.findings ?? data.analysis ?? '')}
              </p>
            </div>
          </section>
        </SectionObserver>
      )

    case 'features':
      return (
        <SectionObserver proposalId={proposalId} sectionType="features">
          <section className="py-16 px-8 border-t border-cm-border max-w-4xl mx-auto w-full">
            <h2 className="text-2xl font-serif font-light text-cm-white">
              <span className="text-cm-gold/40 text-sm mr-2.5 font-sans">✦</span>
              Proposed Features
            </h2>
            <CelestialDivider />
            <div className="grid md:grid-cols-2 gap-3">
              {(data.features ?? '').split('\n').filter(s => s.trim()).map((feature, i) => (
                <div key={i} className="flex items-start gap-3 bg-cm-elevated border border-cm-border rounded-xl p-4 hover:border-cm-accent/20 transition-colors">
                  <div className="w-5 h-5 rounded-full bg-cm-accent/10 border border-cm-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-cm-accent" />
                  </div>
                  <span className="text-sm text-cm-text">{interp(feature)}</span>
                </div>
              ))}
            </div>
          </section>
        </SectionObserver>
      )

    case 'pricing':
      return (
        <SectionObserver proposalId={proposalId} sectionType="pricing">
          <section className="py-16 px-8 border-t border-cm-border max-w-4xl mx-auto w-full">
            <h2 className="text-2xl font-serif font-light text-cm-white">
              <span className="text-cm-gold/40 text-sm mr-2.5 font-sans">✦</span>
              Investment
            </h2>
            <CelestialDivider />
            <div
              className="bg-cm-surface border border-cm-gold/20 rounded-2xl overflow-hidden"
              style={{ boxShadow: '0 0 40px rgba(201,168,76,0.15)' }}
            >
              <div className={`px-8 py-6 bg-cm-gold/5 ${data.inclusions ? 'border-b border-cm-gold/10' : ''}`}>
                <p className="text-xs text-cm-gold uppercase tracking-widest mb-2">
                  {interp(data.package ?? 'Professional Package')}
                </p>
                <p className="text-3xl font-light text-cm-white">{interp(data.price ?? '')}</p>
              </div>
              {data.inclusions && (
                <div className="px-8 py-6 space-y-3">
                  {data.inclusions.split('\n').filter(Boolean).map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-4 h-4 rounded-full bg-cm-gold/10 border border-cm-gold/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-cm-gold" />
                      </div>
                      <span className="text-sm text-cm-text">{interp(item)}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        </SectionObserver>
      )

    case 'timeline':
      return (
        <SectionObserver proposalId={proposalId} sectionType="timeline">
          <section className="py-16 px-8 border-t border-cm-border max-w-4xl mx-auto w-full">
            <h2 className="text-2xl font-serif font-light text-cm-white">
              <span className="text-cm-gold/40 text-sm mr-2.5 font-sans">✦</span>
              Project Timeline
            </h2>
            <CelestialDivider />
            <div className="space-y-0">
              {(data.timeline ?? '').split('\n').filter(s => s.trim()).map((phase, i, arr) => (
                <div key={i} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-7 h-7 rounded-full bg-cm-accent/10 border border-cm-accent/20 flex items-center justify-center text-xs font-mono text-cm-accent flex-shrink-0">
                      {i + 1}
                    </div>
                    {i < arr.length - 1 && (
                      <div className="w-px flex-1 bg-cm-border mt-1" />
                    )}
                  </div>
                  <p className="text-sm text-cm-text pt-1.5 pb-5">{interp(phase)}</p>
                </div>
              ))}
            </div>
          </section>
        </SectionObserver>
      )

    case 'cta':
      return (
        <SectionObserver proposalId={proposalId} sectionType="cta">
          <section className="relative py-24 px-8 border-t border-cm-border text-center overflow-hidden">
            {/* CTA warm glow */}
            <div className="absolute inset-0 pointer-events-none">
              <div
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] blur-3xl"
                style={{ background: 'radial-gradient(ellipse at bottom, rgba(201,168,76,0.22) 0%, transparent 70%)' }}
              />
            </div>
            <div className="relative z-10">
              <div className="flex items-center justify-center gap-3 mb-8">
                <div className="h-px w-16 bg-gradient-to-r from-transparent to-cm-gold/20" />
                <span className="text-cm-gold/40 text-xs">✦</span>
                <div className="h-px w-16 bg-gradient-to-l from-transparent to-cm-gold/20" />
              </div>
              <h2 className="text-3xl font-serif font-light text-cm-white mb-4">
                {interp(data.heading ?? "Ready to Begin?")}
              </h2>
              <p className="text-sm text-cm-subtle mb-8 max-w-md mx-auto">
                {interp(data.subtext ?? "Let's schedule a discovery call to discuss your vision and next steps.")}
              </p>
              {data.email && (
                <a
                  href={`mailto:${data.email}`}
                  onClick={() => trackEvent(proposalId, 'cta_click', { section: 'cta' })}
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-cm-gold/10 border border-cm-gold/20 text-cm-gold hover:bg-cm-gold/20 hover:border-cm-gold/40 transition-all text-sm font-medium"
                  style={{ boxShadow: '0 0 20px rgba(201,168,76,0.15)' }}
                >
                  {interp(data.button ?? 'Get In Touch')}
                </a>
              )}
            </div>
          </section>
        </SectionObserver>
      )

    case 'text':
      return (
        <section className="py-12 px-8 max-w-3xl mx-auto w-full">
          <p className="text-sm text-cm-text leading-relaxed whitespace-pre-line">
            {interp(data.content ?? '')}
          </p>
        </section>
      )

    case 'demo_embed':
      return (
        <SectionObserver proposalId={proposalId} sectionType="demo">
          <section className="py-16 px-8 border-t border-cm-border max-w-5xl mx-auto w-full">
            <h2 className="text-2xl font-serif font-light text-cm-white">
              <span className="text-cm-gold/40 text-sm mr-2.5 font-sans">✦</span>
              Live Preview
            </h2>
            <CelestialDivider />
            {data.url && <DemoEmbed url={data.url} />}
          </section>
        </SectionObserver>
      )

    default:
      return null
  }
}

export function ProposalPortal({ proposal }: { proposal: Proposal }) {
  const lead = proposal.lead as { organization?: string; contact_person?: string } | undefined
  const vars: Record<string, string> = {
    organization_name: lead?.organization ?? '',
    contact_person: lead?.contact_person ?? '',
    project_type: proposal.content?.branding?.org_name ?? '',
  }

  useEffect(() => {
    trackEvent(proposal.id, 'view')
  }, [proposal.id])

  return (
    <div className="min-h-screen bg-cm-black text-cm-text relative">
      {/* Fixed atmospheric layers — stay in place as content scrolls */}
      <div className="fixed inset-0 pointer-events-none select-none z-0">
        <div className="absolute inset-0 grid-bg opacity-60" />
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[55vh] blur-3xl"
          style={{ background: 'radial-gradient(ellipse 70% 100% at 50% 0%, rgba(124,110,247,0.22) 0%, transparent 70%)' }}
        />
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[30vh] blur-3xl"
          style={{ background: 'radial-gradient(ellipse 60% 100% at 50% 100%, rgba(201,168,76,0.14) 0%, transparent 70%)' }}
        />
      </div>

      <nav className="sticky top-0 z-20 bg-cm-black/90 backdrop-blur-xl border-b border-cm-border">
        <div className="max-w-5xl mx-auto px-8 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Moon size={16} className="text-cm-gold" />
            <span className="text-sm font-medium text-cm-white">CroissantsMoon</span>
            <Sparkles size={10} className="text-cm-gold/40 ml-0.5" />
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs text-cm-subtle">Private Proposal</span>
          </div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto relative z-10">
        {proposal.content?.sections
          ?.filter(b => b.visible !== false)
          ?.sort((a, b) => a.order - b.order)
          ?.map(block => (
            <BlockRenderer
              key={block.id}
              block={block}
              vars={vars}
              proposalId={proposal.id}
            />
          ))}
      </main>

      <footer className="relative z-10 border-t border-cm-border py-10 px-8 mt-12">
        <div className="max-w-5xl mx-auto flex flex-col items-center gap-3">
          <div className="flex items-center gap-2.5">
            <div className="h-px w-10 bg-gradient-to-r from-transparent to-cm-border" />
            <Moon size={12} className="text-cm-gold/50" />
            <div className="h-px w-10 bg-gradient-to-l from-transparent to-cm-border" />
          </div>
          <p className="text-xs text-cm-muted text-center">
            Prepared exclusively for <span className="text-cm-subtle">{lead?.organization}</span> by CroissantsMoon Studio.
          </p>
          <p className="text-[10px] text-cm-muted/50 tracking-widest uppercase">Confidential — not for distribution</p>
        </div>
      </footer>
    </div>
  )
}
