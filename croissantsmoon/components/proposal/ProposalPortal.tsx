'use client'

import { useEffect, useRef } from 'react'
import { trackEvent, trackSectionView } from '@/lib/analytics/tracker'
import type { Proposal, ProposalBlock } from '@/types'
import { Moon } from 'lucide-react'

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

function BlockRenderer({ block, vars, proposalId }: { block: ProposalBlock; vars: Record<string, string>; proposalId: string }) {
  const data = block.data as Record<string, string>
  const interp = (s: string) => interpolate(s, vars)

  switch (block.type) {
    case 'hero':
      return (
        <SectionObserver proposalId={proposalId} sectionType="hero">
          <section className="py-24 px-8 text-center border-b border-cm-border">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-light text-cm-white mb-6 text-balance leading-tight">
              {interp(data.headline ?? 'A Strategic Proposal')}
            </h1>
            {data.subheadline && (
              <p className="text-lg text-cm-subtle max-w-2xl mx-auto text-balance">
                {interp(data.subheadline)}
              </p>
            )}
          </section>
        </SectionObserver>
      )

    case 'greeting':
      return (
        <section className="py-16 px-8 max-w-3xl mx-auto">
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
            <h2 className="text-2xl font-serif font-light text-cm-white mb-8">
              {block.type === 'audit_findings' ? 'Current State Analysis' : 'Website Analysis'}
            </h2>
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
            <h2 className="text-2xl font-serif font-light text-cm-white mb-8">Proposed Features</h2>
            <div className="grid md:grid-cols-2 gap-3">
              {(data.features ?? '').split('\n').filter(Boolean).map((feature, i) => (
                <div key={i} className="flex items-start gap-3 bg-cm-elevated border border-cm-border rounded-xl p-4">
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
            <h2 className="text-2xl font-serif font-light text-cm-white mb-8">Investment</h2>
            <div className="bg-cm-surface border border-cm-gold/20 rounded-2xl overflow-hidden">
              <div className="px-8 py-6 bg-cm-gold/5 border-b border-cm-gold/10">
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
            <h2 className="text-2xl font-serif font-light text-cm-white mb-8">Project Timeline</h2>
            <div className="space-y-3">
              {(data.timeline ?? '').split('\n').filter(Boolean).map((phase, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-7 h-7 rounded-full bg-cm-accent/10 border border-cm-accent/20 flex items-center justify-center text-xs font-mono text-cm-accent">
                      {i + 1}
                    </div>
                    {i < (data.timeline ?? '').split('\n').filter(Boolean).length - 1 && (
                      <div className="w-px flex-1 bg-cm-border mt-1 h-6" />
                    )}
                  </div>
                  <p className="text-sm text-cm-text py-1.5">{interp(phase)}</p>
                </div>
              ))}
            </div>
          </section>
        </SectionObserver>
      )

    case 'cta':
      return (
        <SectionObserver proposalId={proposalId} sectionType="cta">
          <section className="py-20 px-8 border-t border-cm-border text-center">
            <h2 className="text-3xl font-serif font-light text-cm-white mb-4">
              {interp(data.heading ?? "Ready to Begin?")}
            </h2>
            <p className="text-sm text-cm-subtle mb-8 max-w-md mx-auto">
              Let's schedule a discovery call to discuss your vision and next steps.
            </p>
            {data.email && (
              <a
                href={`mailto:${data.email}`}
                onClick={() => trackEvent(proposalId, 'cta_click', { section: 'cta' })}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-cm-gold/10 border border-cm-gold/20 text-cm-gold hover:bg-cm-gold/20 transition-all text-sm font-medium"
              >
                {interp(data.button ?? 'Get In Touch')}
              </a>
            )}
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
            <h2 className="text-2xl font-serif font-light text-cm-white mb-6">Live Preview</h2>
            {data.url && (
              <div className="rounded-2xl overflow-hidden border border-cm-border bg-cm-elevated aspect-video">
                <iframe src={data.url} className="w-full h-full" title="Demo" />
              </div>
            )}
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
    <div className="min-h-screen bg-cm-black text-cm-text">
      <nav className="sticky top-0 z-20 bg-cm-black/80 backdrop-blur-xl border-b border-cm-border">
        <div className="max-w-5xl mx-auto px-8 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Moon size={16} className="text-cm-gold" />
            <span className="text-sm font-medium text-cm-white">CroissantsMoon</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs text-cm-subtle">Private Proposal</span>
          </div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto">
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

      <footer className="border-t border-cm-border py-8 px-8 text-center mt-12">
        <p className="text-xs text-cm-muted">
          Prepared exclusively for <span className="text-cm-subtle">{lead?.organization}</span> by CroissantsMoon Studio.
          Confidential — not for distribution.
        </p>
      </footer>
    </div>
  )
}
