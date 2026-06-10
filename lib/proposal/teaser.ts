import type { Proposal } from '@/types'

// Public-safe teaser of a proposal. Deliberately omits the token and any
// gated detail (full feature list, pricing numbers, analysis, etc.) so it can
// be rendered to anyone who lands on the public proposal URL without a token.
export interface TeaserHighlight {
  eyebrow: string
  title: string
}

export interface ProposalTeaser {
  orgName: string
  contactPerson?: string
  headline: string
  subheadline?: string
  greeting?: string
  highlights: TeaserHighlight[]
  features: string[]
  lockedFeatureCount: number
  hasPricing: boolean
  hasTimeline: boolean
  hasDemo: boolean
}

// Mirror of SECTION_META titles in ProposalPortal — kept minimal here so the
// teaser can advertise "what's inside" without importing the full renderer.
const SECTION_TITLES: Record<string, TeaserHighlight> = {
  audit_findings:   { eyebrow: 'Analysis',       title: 'Current State Analysis' },
  website_analysis: { eyebrow: 'Analysis',       title: 'Website Analysis' },
  redesign_concept: { eyebrow: 'Concept',        title: 'Redesign Concept' },
  features:         { eyebrow: 'Capabilities',   title: 'Proposed Features' },
  pricing:          { eyebrow: 'Investment',     title: 'Investment' },
  timeline:         { eyebrow: 'Roadmap',        title: 'Project Timeline' },
  infrastructure:   { eyebrow: 'Infrastructure', title: 'Infrastructure Model' },
  demo_embed:       { eyebrow: 'Preview',        title: 'Live Preview' },
  gallery:          { eyebrow: 'Gallery',        title: 'Gallery' },
}

function interpolate(text: string, vars: Record<string, string>): string {
  return text.replace(/\{\{(\w+)\}\}/g, (_, key) => vars[key] ?? `{{${key}}}`)
}

function truncate(text: string, max: number): string {
  const t = text.trim()
  return t.length > max ? `${t.slice(0, max).trimEnd()}…` : t
}

export function buildProposalTeaser(proposal: Proposal): ProposalTeaser {
  const lead = proposal.lead as { organization?: string; contact_person?: string } | undefined
  const orgName = lead?.organization?.trim() || 'Your Organization'
  const vars: Record<string, string> = {
    organization_name: lead?.organization ?? '',
    contact_person:    lead?.contact_person ?? '',
  }
  const interp = (s: string) => interpolate(s, vars)

  const sections = (proposal.content?.sections ?? [])
    .filter(b => b.visible !== false)
    .sort((a, b) => a.order - b.order)

  const dataOf = (type: string) =>
    (sections.find(s => s.type === type)?.data ?? {}) as Record<string, string>

  const hero = dataOf('hero')
  const greetingRaw = dataOf('greeting').message
  const featuresRaw = dataOf('features').features

  const headline = interp(hero.headline?.trim() || proposal.title || 'A Strategic Proposal')
  const subheadline = hero.subheadline ? interp(hero.subheadline) : undefined
  const greeting = greetingRaw ? truncate(interp(greetingRaw), 340) : undefined

  // Dedupe section highlights by title — keeps the "what's inside" list clean
  // when a proposal has, say, two analysis blocks.
  const seen = new Set<string>()
  const highlights = sections
    .map(s => SECTION_TITLES[s.type])
    .filter((h): h is TeaserHighlight => Boolean(h))
    .filter(h => (seen.has(h.title) ? false : (seen.add(h.title), true)))

  const allFeatures = featuresRaw
    ? interp(featuresRaw).split('\n').map(f => f.trim()).filter(Boolean)
    : []
  const features = allFeatures.slice(0, 3).map(f => truncate(f, 90))
  const lockedFeatureCount = Math.max(0, allFeatures.length - features.length)

  return {
    orgName,
    contactPerson: lead?.contact_person?.trim() || undefined,
    headline,
    subheadline,
    greeting,
    highlights,
    features,
    lockedFeatureCount,
    hasPricing: sections.some(s => s.type === 'pricing'),
    hasTimeline: sections.some(s => s.type === 'timeline'),
    hasDemo: sections.some(s => s.type === 'demo_embed'),
  }
}
