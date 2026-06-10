export type LeadStatus =
  | 'lead_identified'
  | 'audit_completed'
  | 'proposal_drafted'
  | 'proposal_sent'
  | 'opened'
  | 'under_discussion'
  | 'negotiation'
  | 'closed_won'
  | 'closed_lost'
  | 'archived'

export type LeadTemperature = 'cold' | 'warm' | 'hot'

export type ProjectType =
  | 'institutional_website'
  | 'landing_page'
  | 'dashboard_system'
  | 'international_office'
  | 'university_digitalization'
  | 'custom'

export type ProposalStatus = 'draft' | 'active' | 'expired' | 'archived' | 'closed_won' | 'closed_lost'

export type TokenStatus = 'active' | 'expired' | 'revoked'

export interface Lead {
  id: string
  organization: string
  contact_person: string
  email: string
  industry: string | null
  website: string | null
  project_type: ProjectType
  estimated_value: number | null
  status: LeadStatus
  temperature: LeadTemperature
  engagement_score: number
  notes: string | null
  created_at: string
  updated_at: string
  proposals?: Proposal[]
}

export interface Proposal {
  id: string
  lead_id: string
  slug: string
  title: string
  status: ProposalStatus
  token: string
  token_status: TokenStatus
  expires_at: string | null
  content: ProposalContent
  template_id: string | null
  views: number
  unique_visitors: number
  pricing_views: number
  cta_clicks: number
  last_viewed_at: string | null
  first_viewed_at: string | null
  created_at: string
  updated_at: string
  lead?: Lead
  versions?: ProposalVersion[]
}

export interface ProposalContent {
  greeting?: string
  hero?: ProposalBlock
  sections: ProposalBlock[]
  branding?: {
    primary_color?: string
    logo_url?: string
    org_name?: string
  }
}

export interface ProposalBlock {
  id: string
  type: ProposalBlockType
  order: number
  visible: boolean
  data: Record<string, unknown>
}

export type ProposalBlockType =
  | 'hero'
  | 'greeting'
  | 'audit_findings'
  | 'website_analysis'
  | 'redesign_concept'
  | 'features'
  | 'pricing'
  | 'timeline'
  | 'infrastructure'
  | 'demo_embed'
  | 'gallery'
  | 'cta'
  | 'text'
  | 'divider'

export interface ProposalTemplate {
  id: string
  name: string
  description: string | null
  project_type: ProjectType
  blocks: ProposalBlock[]
  placeholders: Record<string, string>
  is_archived: boolean
  created_at: string
  updated_at: string
}

export interface ProposalVersion {
  id: string
  proposal_id: string
  version_number: number
  content: ProposalContent
  created_by: string
  created_at: string
  note: string | null
}

export interface AnalyticsEvent {
  id: string
  proposal_id: string
  event_type: AnalyticsEventType
  session_id: string
  ip_hash: string | null
  user_agent: string | null
  metadata: Record<string, unknown>
  created_at: string
}

export type AnalyticsEventType =
  | 'view'
  | 'section_view'
  | 'pricing_view'
  | 'cta_click'
  | 'token_entry'
  | 'session_end'

export interface FollowUp {
  id: string
  lead_id: string
  proposal_id: string | null
  type: 'email' | 'call' | 'meeting' | 'note'
  content: string
  next_follow_up: string | null
  created_by: string
  created_at: string
}

export interface DashboardStats {
  total_leads: number
  active_proposals: number
  total_proposal_views: number
  hot_leads: number
  pipeline_value: number
  closed_won_value: number
  proposals_this_month: number
  avg_engagement_score: number
}

export interface EngagementScore {
  lead_id: string
  score: number
  temperature: LeadTemperature
  breakdown: {
    opened: number
    multiple_visits: number
    pricing_viewed: number
    repeat_visits: number
    contacted_back: number
  }
  updated_at: string
}

// ─── CroissantsMoon Landing CMS ──────────────────────────────────
// The entire public /croissantsmoon landing page, stored as one JSONB
// document. Icons are stored as lucide-react component name strings
// (see CM_ICONS in StudioLanding) so the shape stays serializable.

export type CMIconName =
  | 'Monitor' | 'BarChart3' | 'Palette' | 'Zap' | 'Sparkles'
  | 'Globe' | 'Code' | 'PenTool' | 'Rocket' | 'Layers'

export interface CMLink {
  label: string
  href: string
}

export interface CMService {
  id: string
  num: string
  name: string
  icon: CMIconName
  desc: string
  price: string
}

export interface CMProject {
  id: string
  cat: string
  name: string
  desc: string
  stack: string[]
  github: string
  live: string
}

export interface CMTestimonial {
  id: string
  quote: string
  who: string
}

export interface CMStat {
  id: string
  value: string
  label: string
}

export interface CMProcessStep {
  id: string
  num: string
  name: string
  text: string
}

export interface CMTier {
  id: string
  name: string
  timeline: string
  price: string
  note: string
  featured: boolean
  features: string[]
}

export interface CMDemo {
  id: string
  num: string
  cat: string
  title: string
  desc: string
  tags: string[]
  links: CMLink[]
}

export interface CMDesign {
  id: string
  title: string
  cat: string
  inst: string
  folder: string
  href: string
}

export interface CMLandingContent {
  meta: {
    proposalHref: string
    email: string
    githubUrl: string
    linkedinUrl: string
    siteUrl: string
    logoSrc: string
  }
  hero: {
    eyebrow: string
    titleLine1: string
    titleLine2: string
    subtitle: string
    primaryCta: CMLink
    ghostCta: CMLink
    trust: string
    wordmark: string
  }
  services: { label: string; heading: string; items: CMService[] }
  projects: {
    label: string
    heading: string
    items: CMProject[]
    viewAll: CMLink
  }
  proof: {
    label: string
    heading: string
    items: CMTestimonial[]
    stats: CMStat[]
  }
  process: { label: string; heading: string; items: CMProcessStep[] }
  pricing: {
    label: string
    heading: string
    foundingNote: string
    foundingCta: CMLink
    items: CMTier[]
    paymentTerms: string
  }
  demos: {
    label: string
    heading: string
    items: CMDemo[]
    discussLabel: string
  }
  designs: {
    label: string
    heading: string
    items: CMDesign[]
    imageBase: string
    viewAll: CMLink
  }
  finalCta: {
    label: string
    heading: string
    subtitle: string
    primaryCta: CMLink
    ghostLabel: string
  }
  footer: {
    brand: string
    links: CMLink[]
    copyright: string
    location: string
  }
}

export interface CMLandingSeo {
  title: string
  description: string
  ogTitle: string
  ogDescription: string
  ogImage: string
  keywords: string[]
}

export interface CMLanding {
  id: string
  content: CMLandingContent
  seo: CMLandingSeo
  updated_at: string
}
