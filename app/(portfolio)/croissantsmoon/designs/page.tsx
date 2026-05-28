'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import { ArrowLeft, ArrowDown, ArrowRight, BookOpen, Presentation, Handshake, Globe, Grid2x2, ExternalLink } from 'lucide-react'
import StarField from '@/components/cm/StarField'
import AstronautFloat from '@/components/cm/AstronautFloat'

// ── Types ─────────────────────────────────────────────────────────────────────

interface DesignDecision {
  icon: string
  label: string
  text: string
}

interface GDProject {
  id: string
  title: string
  fullTitle: string
  institution: string
  year: string
  categories: string[]
  emoji: string
  accent: string
  textAccent: string
  folder: string
  imgs: number
  pages: number
  skills: string[]
  summary: string
  challenge: string
  approach: string
  reflection: string
  impact: string
  deliverables: string[]
  designDecisions: DesignDecision[]
  link: string
}

// ── Data ──────────────────────────────────────────────────────────────────────

const GD_PROJECTS: GDProject[] = [
  {
    id: 'pcu-partnership-booklet',
    title: 'PCU Partnership Booklet',
    fullTitle: 'Partnership Initiative Booklet for Petra Christian University',
    institution: 'Petra Christian University',
    year: '2024–2025',
    categories: ['institutional', 'partnership'],
    emoji: '◈',
    accent: '#C4B5FD',
    textAccent: '#C4B5FD',
    folder: 'partnership-booklet-pcu',
    imgs: 3,
    pages: 35,
    skills: ['Graphic Design', 'Branding', 'Editorial Layout', 'International Education'],
    summary: "A comprehensive booklet showcasing PCU's international partnership initiatives — designed to attract new institutional partners and communicate the depth of existing collaborations.",
    challenge: "Communicating years of partnership work across diverse global institutions in a way that feels cohesive, credible, and inviting.",
    approach: "Used PCU's brand language as a foundation, then elevated it with premium editorial layouts, rich data storytelling, and clear visual hierarchy.",
    reflection: "Good institutional design earns trust. Every page choice — from typography to white space — signals how serious and thoughtful an institution is.",
    impact: "Used by PCU International Office in partner meetings and institutional visits across Southeast Asia and beyond.",
    deliverables: ['35-page digital booklet', 'Print-ready PDF export', 'Partnership data infographics', 'Cover & chapter divider system'],
    designDecisions: [
      { icon: '◈', label: 'Typography System', text: "Paired a confident sans-serif headline with a warm body font — signaling institutional authority without losing approachability." },
      { icon: '✦', label: 'Data Storytelling', text: "Partnership statistics visualized as infographic blocks rather than tables — numbers reframed as achievements, not just data." },
      { icon: '⬡', label: 'Color Language', text: "Anchored in PCU institutional tones with a refined lavender-and-white palette — distinguished, memorable, and aligned with the institution's identity." },
    ],
    link: 'https://canva.link/partnershipbookletpetra',
  },
  {
    id: 'pcu-intl-students',
    title: 'PCU International Students Guide',
    fullTitle: 'International Students Guidebook for Petra Christian University',
    institution: 'Petra Christian University',
    year: '2024–2025',
    categories: ['guidebook', 'student'],
    emoji: '🌐',
    accent: '#F5D05E',
    textAccent: '#F5D05E',
    folder: 'international-students-guidebook-pcu',
    imgs: 3,
    pages: 30,
    skills: ['Graphic Design', 'Information Architecture', 'Communication Design', 'International Education'],
    summary: "A comprehensive guidebook helping international students navigate life at PCU — from academic processes to daily living in Surabaya.",
    challenge: "Covering a vast scope of practical information — visa, housing, healthcare, campus life — without overwhelming a reader who may already feel anxious.",
    approach: "Used a clear chapter system with visual anchors, illustrated icons, and step-by-step formats that let students find what they need quickly.",
    reflection: "Designing a guidebook is an act of empathy — every page should make a nervous international student feel a little more at home.",
    impact: "Distributed to all incoming international students at PCU as their primary orientation resource.",
    deliverables: ['30-page interactive guide', 'Chapter navigation system', 'Step-by-step registration flow', 'Campus life visual directory'],
    designDecisions: [
      { icon: '◈', label: 'Reader Journey', text: "Structured as a timeline from pre-arrival to settled campus life — mirroring the student's actual emotional journey, not the institution's org chart." },
      { icon: '✦', label: 'Icon Language', text: "Created a consistent icon set for tips, warnings, steps, and definitions — reducing cognitive load so students can scan before they read." },
      { icon: '⬡', label: 'Friendly Tone by Design', text: "Visual breathing room, warm yellow, and generous margins communicate safety — anxious first-time arrivals should feel guided, never overwhelmed." },
    ],
    link: 'https://canva.link/internationalstudentsguidebookpetra',
  },
  {
    id: 'pcu-presentation',
    title: 'PCU Presentation Template',
    fullTitle: 'General Presentation Template for Partnership Initiative — Petra Christian University',
    institution: 'Petra Christian University',
    year: '2024–2025',
    categories: ['presentation', 'partnership'],
    emoji: '◉',
    accent: '#FDA4AF',
    textAccent: '#FDA4AF',
    folder: 'general-ppt-pcu',
    imgs: 3,
    pages: 35,
    skills: ['Presentation Design', 'Branding', 'Typography', 'Communication Design'],
    summary: "A modular, reusable presentation template giving PCU's international partnership team a consistent, polished voice in every meeting, pitch, and partner visit.",
    challenge: "Creating a template flexible enough for MoU meetings, partner visits, and conferences — while keeping every slide unmistakably PCU.",
    approach: "Built a master template with clearly defined sections, slide variants, and visual rules — empowering any team member to create on-brand presentations without a designer.",
    reflection: "The best design systems disappear into the background. A great template empowers non-designers to communicate beautifully.",
    impact: "Now the standard presentation template for all PCU International Office partner meetings and official conferences.",
    deliverables: ['35-slide master template', '8 layout variant archetypes', 'Data visualization slides', 'Brand-aligned color & type system'],
    designDecisions: [
      { icon: '◈', label: 'Modular Architecture', text: "Built 8 core archetypes — title, content, data, quote, cover, divider, gallery, closing — every meeting scenario is covered by combining these." },
      { icon: '✦', label: 'White Space Strategy', text: "Generous margins and restrained content per slide ensure the speaker's voice leads — the deck should support, not compete." },
      { icon: '⬡', label: 'Reuse Flexibility', text: "Color and font variables defined systematically — any team member can rearrange slides without accidentally breaking visual consistency." },
    ],
    link: 'https://canva.link/jat6f7jcsawdmnu',
  },
  {
    id: 'aci-b2-2025',
    title: 'ACI 2025 Batch 2 Guidebook',
    fullTitle: 'Guidebook for Airlangga Cultural Immersion 2025 — Batch 2',
    institution: 'Universitas Airlangga',
    year: '2025',
    categories: ['guidebook', 'student'],
    emoji: '📖',
    accent: '#7BC8F6',
    textAccent: '#7BC8F6',
    folder: 'booklet-aci-2025-b2-unair',
    imgs: 3,
    pages: 7,
    skills: ['Graphic Design', 'Editorial Layout', 'Information Architecture', 'Communication Design'],
    summary: "A concise, high-impact guidebook for international students joining the Airlangga Cultural Immersion program — every page designed to make participants feel welcomed, informed, and genuinely excited.",
    challenge: "Communicating a full program itinerary, cultural context, and practical logistics in only 7 pages — without losing warmth or detail.",
    approach: "Applied a compressed information hierarchy — critical content large and bold, supporting detail small but accessible — within a scan-first editorial grid.",
    reflection: "Designing for cross-cultural audiences taught me that clarity is the highest form of care — making someone feel seen through design means speaking their visual language.",
    impact: "Handed to each participant on arrival day of ACI 2025 Batch 2 — the first designed touchpoint of their cultural immersion experience.",
    deliverables: ['7-page event guidebook', 'Program schedule spread', 'Welcome briefing layout', 'Participant reference sheet'],
    designDecisions: [
      { icon: '◈', label: 'Compact but Complete', text: "A full program in 7 pages — achieved through layered information density where critical info is big, supplementary info is accessible but secondary." },
      { icon: '✦', label: 'Cultural Warmth', text: "Soft blues and clean editorial whites evoke trust and calm — essential for participants arriving in an unfamiliar country for the first time." },
      { icon: '⬡', label: 'Scan-first Design', text: "Every spread was designed to be understood in under 10 seconds — headers, icons, and color blocks guide the eye before a single word is read." },
    ],
    link: 'https://canva.link/motmeousw72spno',
  },
  {
    id: 'aci-b1-2025',
    title: 'ACI 2025 Batch 1 Guidebook',
    fullTitle: 'Guidebook for Airlangga Cultural Immersion 2025 — Batch 1',
    institution: 'Universitas Airlangga',
    year: '2025',
    categories: ['guidebook', 'student'],
    emoji: '🌿',
    accent: '#6EE7B7',
    textAccent: '#6EE7B7',
    folder: 'guidebook-aci-2025-b1-unair',
    imgs: 3,
    pages: 15,
    skills: ['Graphic Design', 'Editorial Layout', 'Information Architecture', 'Communication Design'],
    summary: "The inaugural guidebook for ACI 2025's first batch — setting the visual identity and design system for the entire Airlangga Cultural Immersion series.",
    challenge: "Establishing a recurring visual identity flexible enough to feel fresh per cohort, while remaining unmistakably ACI across future editions.",
    approach: "Developed a modular design system — consistent branding with swappable color themes, flexible illustration slots, and an adaptable schedule layout.",
    reflection: "The first edition of any design system carries the weight of setting standards. I learned to design for flexibility without sacrificing identity.",
    impact: "The design system established in Batch 1 became the foundation that Batch 2's condensed edition built directly upon.",
    deliverables: ['15-page participant guidebook', 'Day-by-day itinerary spread', 'Cultural etiquette section', 'Emergency contacts page'],
    designDecisions: [
      { icon: '◈', label: 'System Foundation', text: "Color-coded chapters — each program section has its own accent color — enabling instant navigation without needing an index page." },
      { icon: '✦', label: 'Itinerary as Visual Story', text: "Transformed a text-heavy schedule into a visual timeline with icons and color blocks — making participants feel excited, not administratively processed." },
      { icon: '⬡', label: 'Bilingual Layout Awareness', text: "Grid and spacing decisions account for bilingual content — generous white space ensures the layout holds even when text expands across languages." },
    ],
    link: 'https://canva.link/6bysygp89hi879s',
  },
  {
    id: 'staffs-banyuwangi',
    title: 'Staffordshire Banyuwangi Booklet',
    fullTitle: 'Booklet for Staffordshire University Tailor-Made Program to Banyuwangi',
    institution: 'Staffordshire University × Universitas Airlangga',
    year: '2025',
    categories: ['institutional', 'partnership'],
    emoji: '✦',
    accent: '#FDBA8C',
    textAccent: '#FDBA8C',
    folder: 'guidebook-staffordshire-unair',
    imgs: 15,
    pages: 15,
    skills: ['Graphic Design', 'Editorial Layout', 'Branding', 'International Education'],
    summary: "A tailor-made program booklet for Staffordshire University students visiting Banyuwangi — blending academic immersion with cultural exploration in a visually distinctive editorial format.",
    challenge: "Designing for a brand-new partnership with no established visual identity — while making both Staffordshire and Airlangga feel equally represented and proud.",
    approach: "Created a warm, exploratory visual language drawn from East Java's natural landscape — earth tones, organic shapes, and editorial magazine-style layouts.",
    reflection: "Partnership communications are a design challenge of trust — the visual must make both institutions feel equally proud to share it.",
    impact: "Presented to the Staffordshire University delegation at the program kick-off — the first visual touchpoint of the partnership relationship.",
    deliverables: ['15-page program booklet', 'Dual-institution branding system', 'Destination visual guide', 'Program itinerary spreads'],
    designDecisions: [
      { icon: '◈', label: 'Neutral Dual-brand', text: "A visual language neither institution fully \"owns\" — warm earth tones feel Indonesian without alienating the UK partner delegation." },
      { icon: '✦', label: 'Destination Storytelling', text: "Banyuwangi's natural beauty became the visual metaphor — organic shapes and rich textures made the program feel like an adventure, not just an exchange." },
      { icon: '⬡', label: 'Premium Booklet Feel', text: "Structured like a travel magazine editorial — aspirational, airy layouts that made participants feel selected for something genuinely special." },
    ],
    link: 'https://canva.link/i1i6dbnby7ho36z',
  },
  {
    id: 'aero-2025',
    title: 'AERO 2025 Presentation',
    fullTitle: 'Presentation for AERO 2025 for Institutional Partners',
    institution: 'Universitas Airlangga',
    year: '2025',
    categories: ['presentation', 'partnership'],
    emoji: '✈',
    accent: '#FF6B6B',
    textAccent: '#FF6B6B',
    folder: 'aero-2025-unair',
    imgs: 3,
    pages: 13,
    skills: ['Presentation Design', 'Branding', 'Communication Design', 'Typography'],
    summary: "A flagship institutional presentation for AERO 2025 — communicating Universitas Airlangga's global partnerships to an international audience of institutional leaders.",
    challenge: "Translating years of complex partnership data, program milestones, and institutional highlights into a narrative that resonates across cultural contexts.",
    approach: "Used bold, confident visual language — clean data visualization, commanding typography, and strategic white space — to project institutional authority with genuine warmth.",
    reflection: "A great institutional presentation doesn't just inform — it inspires. The design needed to make partners feel proud to be part of the story.",
    impact: "Presented live at AERO 2025 to institutional partners from across Asia and Europe — representing Universitas Airlangga on an international stage.",
    deliverables: ['13-slide institutional deck', 'Partnership achievement data slides', 'Program overview spreads', 'Airlangga-branded opening & closing'],
    designDecisions: [
      { icon: '◈', label: 'Confidence First', text: "Bold full-bleed color fields and oversized typography command the room before a word is spoken — the first impression is always felt before it's heard." },
      { icon: '✦', label: 'Data as Achievement', text: "Partnership numbers presented as visual milestones — not just facts, but evidence of a growing network worth belonging to." },
      { icon: '⬡', label: 'Brand Elevation', text: "Honored Universitas Airlangga's institutional identity while modernizing its visual presence — familiar enough to be recognized, refined enough to be respected." },
    ],
    link: 'https://canva.link/odx5kh4eara7iuh',
  },
  {
    id: 'unair-accommodation',
    title: 'Airlangga Accommodation Booklet',
    fullTitle: 'Accommodation Booklet for Universitas Airlangga International Students',
    institution: 'Universitas Airlangga',
    year: '2024–2025',
    categories: ['guidebook', 'student'],
    emoji: '🏠',
    accent: '#F4874B',
    textAccent: '#F4874B',
    folder: 'accommodation-guidebook-unair',
    imgs: 3,
    pages: 28,
    skills: ['Graphic Design', 'Information Architecture', 'Communication Design', 'International Education'],
    summary: "A dedicated accommodation guide for international students at Universitas Airlangga — covering housing options, neighborhoods, costs, and practical tips for settling into Surabaya.",
    challenge: "Presenting housing options across wildly different budgets and preferences while making an unfamiliar city feel accessible and welcoming rather than overwhelming.",
    approach: "Built a map-centric layout with neighborhood profiles, visual housing comparisons, and a conversational tone that humanizes what could easily be a dry administrative document.",
    reflection: "Finding a home in a foreign city is one of the most emotionally charged moments for international students. Design can ease that anxiety — or amplify it.",
    impact: "Distributed digitally to all incoming international students at Universitas Airlangga one month before their arrival date.",
    deliverables: ['28-page accommodation guide', 'Neighborhood profile spreads', 'Housing comparison infographics', 'Cost breakdown visual tables'],
    designDecisions: [
      { icon: '◈', label: 'Map-centric Navigation', text: "Every neighborhood profile is anchored by a spatial reference — giving students a mental map of Surabaya before they land." },
      { icon: '✦', label: 'Visual Comparison', text: "Housing options side-by-side as scannable cards — enabling quick decision-making across budget, distance to campus, and available amenities." },
      { icon: '⬡', label: 'Anxiety Reduction', text: "Warm orange tones, friendly language, and generous imagery communicate that someone thought of you — turning a bureaucratic guide into a genuine welcome." },
    ],
    link: 'https://canva.link/l8pkkjs0x8f24sy',
  },
  {
    id: 'unair-intl-students',
    title: 'Airlangga International Students Guide',
    fullTitle: 'International Students Guidebook for Universitas Airlangga',
    institution: 'Universitas Airlangga',
    year: '2024–2025',
    categories: ['guidebook', 'student'],
    emoji: '⬡',
    accent: '#A78BFA',
    textAccent: '#A78BFA',
    folder: 'international-students-guidebook-unair',
    imgs: 3,
    pages: 32,
    skills: ['Graphic Design', 'Editorial Layout', 'Information Architecture', 'Communication Design'],
    summary: "The comprehensive international student handbook for Universitas Airlangga — covering everything from enrollment to campus life for students arriving from around the world.",
    challenge: "Synthesizing an entire university's international student journey — spanning academic, social, logistical, and emotional dimensions — into one navigable, engaging document.",
    approach: "Structured as a five-chapter journey narrative: Pre-Arrival → First Week → Campus Life → City Life → Support — matching the student's real emotional timeline.",
    reflection: "This was the most comprehensive communication design project in this collection. It reinforced that great information design is fundamentally about serving real people.",
    impact: "The primary onboarding resource for international students — and the most downloaded student document on Universitas Airlangga's international office portal.",
    deliverables: ['32-page comprehensive handbook', 'Five-chapter navigation system', 'Surabaya city guide section', 'Academic calendar & support directory'],
    designDecisions: [
      { icon: '◈', label: 'Journey Architecture', text: "Five chapters structured around the student's emotional timeline — not the institution's org chart. The design follows people, not bureaucracy." },
      { icon: '✦', label: 'Chapter Color System', text: "Each chapter has a distinct accent drawn from a unified palette — students navigate by color without needing to read a single chapter title." },
      { icon: '⬡', label: 'Human Voice', text: "Copywriting and design worked in tandem — tips framed as personal advice, not institutional rules — making a 32-page handbook feel like a letter from a friend." },
    ],
    link: 'https://canva.link/xehf9jz9v781sn7',
  },
]

const GD_FILTER_CATEGORIES = [
  { id: 'all',           label: 'All Work'               },
  { id: 'guidebook',     label: 'Guidebooks'             },
  { id: 'presentation',  label: 'Presentations'          },
  { id: 'partnership',   label: 'Partnership Materials'  },
  { id: 'student',       label: 'Student Communication'  },
  { id: 'institutional', label: 'Institutional Branding' },
]

const GD_INSPO = [
  'Swiss typography', 'Editorial grids', 'Color theory',
  'Indonesian culture', 'Travel design', 'Institutional print',
  'Infographic systems', 'Human-centered design',
  'Educational publishing', 'Wayfinding design',
  'Museum publications', 'Global visual culture',
]

const INSPO_ACCENTS = ['#D4B15A','#6FA8FF','#8FA8D6','#D9E6FF','#A78BFA','#D4B15A','#6FA8FF','#C4B5FD','#FDA4AF','#6EE7B7','#FDBA8C','#7BC8F6']
const INSPO_DOTS    = ['✦','◈','⬡','✺','◉','✦','◈','⬡','✺','◉','✦','◈']

// ── Helpers ───────────────────────────────────────────────────────────────────

function catCount(catId: string) {
  if (catId === 'all') return GD_PROJECTS.length
  return GD_PROJECTS.filter(p => p.categories.includes(catId)).length
}

function catLabel(catId: string) {
  return GD_FILTER_CATEGORIES.find(f => f.id === catId)?.label ?? catId
}

// ── RevealSection ─────────────────────────────────────────────────────────────

function RevealSection({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { el.classList.add('gd-visible'); obs.unobserve(el) }
      })
    }, { threshold: 0.08 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return <div ref={ref} className={`gd-reveal ${className}`}>{children}</div>
}

// ── CatBadge ──────────────────────────────────────────────────────────────────

function CatBadge({ catId }: { catId: string }) {
  return (
    <span style={{
      background: 'rgba(111,168,255,0.08)', color: '#8FA8D6',
      padding: '3px 11px', borderRadius: 999, fontSize: '.62rem', fontWeight: 500,
      fontFamily: "'Outfit',sans-serif", letterSpacing: '.05em', textTransform: 'uppercase',
      border: '1px solid rgba(111,168,255,0.16)',
    }}>
      {catLabel(catId)}
    </span>
  )
}

// ── LightboxModal ─────────────────────────────────────────────────────────────

function LightboxModal({ project, index, onNav, onJump, onClose }: {
  project: GDProject
  index: number
  onNav: (dir: number) => void
  onJump: (i: number) => void
  onClose: () => void
}) {
  const total = project.imgs || Math.min(project.pages, 3)
  const n = index + 1

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft')  onNav(-1)
      if (e.key === 'ArrowRight') onNav(1)
      if (e.key === 'Escape')     onClose()
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [onNav, onClose])

  return (
    <div
      style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(3,7,18,0.95)', backdropFilter: 'blur(12px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      onClick={onClose}
    >
      {/* Top bar */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, padding: '14px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', zIndex: 3, background: 'linear-gradient(to bottom,rgba(3,7,18,0.75),transparent)', pointerEvents: 'none' }}>
        <div style={{ pointerEvents: 'auto' }}>
          <div style={{ color: '#D9E6FF', fontSize: '.82rem', fontWeight: 500, fontFamily: "'Outfit',sans-serif" }}>{project.title}</div>
          <div style={{ color: '#8FA8D6', fontSize: '.66rem', marginTop: 2, fontFamily: "'Outfit',sans-serif" }}>{project.institution}</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, pointerEvents: 'auto' }}>
          <span style={{ color: 'rgba(143,168,214,0.55)', fontSize: '.73rem', fontFamily: "'Outfit',sans-serif" }}>Page {n} of {total}</span>
          <button onClick={e => { e.stopPropagation(); onClose() }} style={{ background: 'rgba(111,168,255,0.1)', border: '1px solid rgba(111,168,255,0.2)', cursor: 'pointer', color: '#D9E6FF', width: 34, height: 34, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem' }}>×</button>
        </div>
      </div>

      {/* Main image */}
      <div style={{ position: 'relative', zIndex: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', padding: '56px 80px 80px' }} onClick={e => e.stopPropagation()}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img loading="lazy" src={`/assets/images/graphic-designs/${project.folder}/${n}.png`} alt={`${project.title} — page ${n}`} style={{ maxWidth: '100%', maxHeight: '75vh', objectFit: 'contain', borderRadius: 10, boxShadow: '0 32px 100px rgba(0,0,0,0.65)', border: '1px solid rgba(111,168,255,0.12)' }} />
      </div>

      {/* Prev */}
      {index > 0 && (
        <button onClick={e => { e.stopPropagation(); onNav(-1) }} style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', zIndex: 3, background: 'rgba(111,168,255,0.1)', border: '1px solid rgba(111,168,255,0.2)', cursor: 'pointer', color: '#D9E6FF', width: 46, height: 46, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem' }}>‹</button>
      )}
      {/* Next */}
      {index < total - 1 && (
        <button onClick={e => { e.stopPropagation(); onNav(1) }} style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)', zIndex: 3, background: 'rgba(111,168,255,0.1)', border: '1px solid rgba(111,168,255,0.2)', cursor: 'pointer', color: '#D9E6FF', width: 46, height: 46, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem' }}>›</button>
      )}

      {/* Thumbnail strip */}
      <div onClick={e => e.stopPropagation()} style={{ position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 3, padding: '14px 20px', background: 'linear-gradient(to top,rgba(3,7,18,0.8),transparent)', display: 'flex', gap: 7, overflowX: 'auto', scrollbarWidth: 'none', alignItems: 'center', justifyContent: 'center' }}>
        {Array.from({ length: total }, (_, i) => (
          <div key={i} onClick={() => onJump(i)} style={{ flexShrink: 0, width: 52, height: 34, borderRadius: 5, overflow: 'hidden', cursor: 'pointer', border: `2px solid ${i === index ? '#D4B15A' : 'transparent'}`, opacity: i === index ? 1 : 0.4 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`/assets/images/graphic-designs/${project.folder}/${i + 1}.png`} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} loading="lazy" />
          </div>
        ))}
      </div>
    </div>
  )
}

// ── ProjectCard ───────────────────────────────────────────────────────────────

function ProjectCard({ project, onOpen }: { project: GDProject; onOpen: (p: GDProject) => void }) {
  return (
    <button onClick={() => onOpen(project)} className="gd-card-hover gd-overlay-card" style={{ background: '#0B1E3A', borderRadius: 18, overflow: 'hidden', border: '1px solid rgba(111,168,255,0.12)', cursor: 'pointer', textAlign: 'left', display: 'block', width: '100%', boxShadow: '0 4px 28px rgba(3,7,18,0.4)' }}>
      <div style={{ position: 'relative', overflow: 'hidden', height: 185, background: '#071126' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`/assets/images/graphic-designs/${project.folder}/1.png`} alt={project.title} className="gd-cover-img" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', transition: 'transform .45s ease', display: 'block' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom,transparent 40%,rgba(7,17,38,0.75))', pointerEvents: 'none' }} />
        <div className="gd-cover-overlay" style={{ position: 'absolute', inset: 0, opacity: 0, background: 'rgba(7,17,38,0.32)', transition: 'opacity .28s', display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
          <span style={{ fontFamily: "'Outfit',sans-serif", fontSize: '.72rem', fontWeight: 600, color: '#D9E6FF', background: 'rgba(7,17,38,0.65)', padding: '7px 20px', borderRadius: 999, backdropFilter: 'blur(8px)', border: '1px solid rgba(217,230,255,0.2)', boxShadow: '0 0 18px rgba(111,168,255,0.2)' }}>Preview</span>
        </div>
        <span style={{ position: 'absolute', top: 10, right: 10, fontFamily: "'Outfit',sans-serif", fontSize: '.58rem', fontWeight: 500, background: 'rgba(7,17,38,0.6)', backdropFilter: 'blur(6px)', color: '#8FA8D6', padding: '3px 10px', borderRadius: 999, border: '1px solid rgba(111,168,255,0.18)' }}>{project.year}</span>
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 2, background: `linear-gradient(to right,${project.accent},transparent)`, opacity: .5 }} />
      </div>
      <div style={{ padding: '16px 18px 20px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 9 }}>
          {project.categories.map(c => <CatBadge key={c} catId={c} />)}
        </div>
        <h4 style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: '1.08rem', fontWeight: 500, color: '#D9E6FF', lineHeight: 1.28, marginBottom: 4 }}>{project.title}</h4>
        <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: '.71rem', color: '#8FA8D6', opacity: .7 }}>{project.institution}</p>
      </div>
    </button>
  )
}

// ── GalleryHero ───────────────────────────────────────────────────────────────

function GalleryHero({ onScrollToProjects, onFilterClick }: { onScrollToProjects: () => void; onFilterClick: (id: string) => void }) {
  return (
    <div style={{ position: 'relative', overflow: 'hidden', background: 'linear-gradient(160deg,#030712 0%,#071126 45%,#0B1E3A 100%)', padding: 'clamp(5rem,12vh,9rem) 24px clamp(4rem,8vh,7rem)' }}>
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}><StarField count={70} /></div>
      {/* Constellation */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0, opacity: .7 }}>
        <svg width="100%" height="100%" viewBox="0 0 1200 600" fill="none" preserveAspectRatio="xMidYMid slice">
          <line x1="8%" y1="15%" x2="22%" y2="28%" stroke="#6FA8FF" strokeWidth=".5" opacity=".35"/>
          <line x1="22%" y1="28%" x2="40%" y2="20%" stroke="#6FA8FF" strokeWidth=".5" opacity=".35"/>
          <line x1="40%" y1="20%" x2="58%" y2="35%" stroke="#6FA8FF" strokeWidth=".5" opacity=".35"/>
          <line x1="72%" y1="12%" x2="85%" y2="30%" stroke="#6FA8FF" strokeWidth=".5" opacity=".3"/>
          <line x1="85%" y1="30%" x2="92%" y2="18%" stroke="#6FA8FF" strokeWidth=".5" opacity=".3"/>
          <circle cx="8%"  cy="15%" r="2" fill="#6FA8FF" opacity=".45"/>
          <circle cx="22%" cy="28%" r="1.5" fill="#6FA8FF" opacity=".35"/>
          <circle cx="40%" cy="20%" r="2" fill="#D4B15A" opacity=".4"/>
          <circle cx="58%" cy="35%" r="1.5" fill="#6FA8FF" opacity=".3"/>
          <circle cx="72%" cy="12%" r="1.5" fill="#6FA8FF" opacity=".35"/>
          <circle cx="85%" cy="30%" r="2" fill="#D4B15A" opacity=".35"/>
        </svg>
      </div>
      {/* Astronauts */}
      <AstronautFloat img={3} style={{ position: 'absolute', right: '6%', top: '18%' }} size={110} dur={26} del={0} rot={12} />
      <AstronautFloat img={4} style={{ position: 'absolute', left: '3%', bottom: '20%' }} size={85} dur={32} del={-11} rot={-10} />
      {/* Nebula blobs */}
      <div style={{ position: 'absolute', left: -160, top: -80, width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle,rgba(111,168,255,0.05) 0%,transparent 65%)', pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ position: 'absolute', right: -100, bottom: -60, width: 450, height: 450, borderRadius: '50%', background: 'radial-gradient(circle,rgba(212,177,90,0.05) 0%,transparent 65%)', pointerEvents: 'none', zIndex: 0 }} />
      {/* Watermark */}
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
        <span style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', fontSize: '22vw', fontWeight: 300, color: '#D4B15A', opacity: .02, lineHeight: 1, userSelect: 'none', whiteSpace: 'nowrap' }}>GD</span>
      </div>
      {/* Content */}
      <div style={{ maxWidth: 1024, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Back + badge */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '3rem', flexWrap: 'wrap', gap: 12 }}>
          <Link href="/croissantsmoon/projects-overview" style={{ display: 'inline-flex', alignItems: 'center', gap: 7, fontFamily: "'Outfit',sans-serif", fontSize: '.82rem', color: '#8FA8D6', background: 'rgba(111,168,255,0.06)', border: '1px solid rgba(111,168,255,0.14)', padding: '8px 18px', borderRadius: 999, textDecoration: 'none' }}>
            <ArrowLeft style={{ width: 14, height: 14 }} /> Projects
          </Link>
          <span style={{ fontFamily: "'Outfit',sans-serif", fontSize: '.66rem', fontWeight: 500, letterSpacing: '.14em', background: 'rgba(212,177,90,0.1)', color: '#D4B15A', padding: '4px 14px', borderRadius: 999, border: '1px solid rgba(212,177,90,0.22)' }}>Visual Portfolio · 2024–2025</span>
        </div>
        {/* Overline */}
        <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: '.63rem', fontWeight: 600, letterSpacing: '.2em', textTransform: 'uppercase', color: '#D4B15A', marginBottom: '1rem' }}>Graphic Design</p>
        {/* Headline */}
        <h1 style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: 'clamp(3rem,9vw,6.5rem)', fontWeight: 400, fontStyle: 'italic', letterSpacing: '-.01em', lineHeight: .92, color: '#D9E6FF', marginBottom: '2rem', textShadow: '0 0 80px rgba(111,168,255,0.14)' }}>
          Visual<br />Communication<br /><span style={{ color: '#D4B15A' }}>Work.</span>
        </h1>
        {/* Body */}
        <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: 'clamp(.88rem,1.5vw,1rem)', color: '#8FA8D6', lineHeight: 1.78, maxWidth: 460, marginBottom: '2.5rem' }}>
          Guidebooks, presentations, and institutional materials — communication design for international education and global engagement.
        </p>
        {/* Stats strip */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 0, background: 'rgba(11,30,58,0.55)', borderRadius: 16, padding: '18px 24px', border: '1px solid rgba(111,168,255,0.14)', backdropFilter: 'blur(14px)', marginBottom: '2.5rem' }}>
          {[{ n: '09', label: 'Projects' }, { n: '02', label: 'Universities' }, { n: '05', label: 'Skill Areas' }].map((s, i) => (
            <div key={s.n} style={{ textAlign: 'center', padding: '0 clamp(12px,3vw,24px)', ...(i > 0 ? { borderLeft: '1px solid rgba(111,168,255,0.12)' } : {}) }}>
              <div style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: 'clamp(1.8rem,4vw,2.8rem)', fontWeight: 400, fontStyle: 'italic', color: '#D9E6FF', letterSpacing: '-.02em', lineHeight: 1 }}>{s.n}</div>
              <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: '.58rem', fontWeight: 500, letterSpacing: '.14em', textTransform: 'uppercase', color: '#8FA8D6', marginTop: 4, opacity: .7 }}>{s.label}</div>
            </div>
          ))}
        </div>
        {/* CTAs */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
          <button onClick={onScrollToProjects} style={{ fontFamily: "'Outfit',sans-serif", fontSize: '.85rem', fontWeight: 600, background: '#D4B15A', color: '#071126', padding: '14px 30px', borderRadius: 999, border: 'none', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 8, letterSpacing: '.03em', boxShadow: '0 0 22px rgba(212,177,90,0.32),0 4px 16px rgba(212,177,90,0.2)' }}>
            Browse Projects <ArrowDown style={{ width: 13, height: 13 }} />
          </button>
          <Link href="/croissantsmoon/contact" style={{ fontFamily: "'Outfit',sans-serif", fontSize: '.85rem', fontWeight: 400, border: '1px solid rgba(212,177,90,0.38)', color: '#D4B15A', padding: '14px 24px', borderRadius: 999, background: 'rgba(212,177,90,0.06)', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 7, textDecoration: 'none' }}>
            Collaborate
          </Link>
        </div>
        {/* Quick filter chips */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: '2.5rem', paddingTop: '1.75rem', borderTop: '1px solid rgba(111,168,255,0.08)' }}>
          <span style={{ fontFamily: "'Outfit',sans-serif", fontSize: '.66rem', fontWeight: 500, color: 'rgba(143,168,214,0.4)', alignSelf: 'center', marginRight: 4, letterSpacing: '.06em', textTransform: 'uppercase' }}>Browse by:</span>
          {GD_FILTER_CATEGORIES.slice(1).map(cat => (
            <button key={cat.id} onClick={() => { onScrollToProjects(); setTimeout(() => onFilterClick(cat.id), 350) }} className="gd-filter-tab">{cat.label}</button>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── ProjectsSection ───────────────────────────────────────────────────────────

function ProjectsSection({ activeFilter, onFilterChange, onOpenProject, projectsRef }: {
  activeFilter: string
  onFilterChange: (id: string) => void
  onOpenProject: (p: GDProject) => void
  projectsRef: React.RefObject<HTMLDivElement | null>
}) {
  const filtered = activeFilter === 'all' ? GD_PROJECTS : GD_PROJECTS.filter(p => p.categories.includes(activeFilter))
  const [featured, ...rest] = filtered

  return (
    <div ref={projectsRef} id="gd-projects" style={{ background: 'linear-gradient(180deg,#071126 0%,#0B1E3A 100%)', padding: 'clamp(4rem,8vh,6rem) 24px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0, opacity: .5 }}><StarField count={35} /></div>
      <AstronautFloat img={5} style={{ position: 'absolute', right: '2%', top: '15%' }} size={80} dur={30} del={-8} rot={-5} />
      <div style={{ maxWidth: 1024, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Section header */}
        <RevealSection className="" >
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '2rem', flexWrap: 'wrap', gap: 12 }}>
            <div>
              <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: '.63rem', fontWeight: 600, letterSpacing: '.2em', textTransform: 'uppercase', color: '#D4B15A', marginBottom: '.9rem' }}>Design Archive</p>
              <h2 style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: 'clamp(2rem,4.5vw,3.2rem)', fontWeight: 400, fontStyle: 'italic', color: '#D9E6FF', lineHeight: 1.05 }}>
                {activeFilter === 'all' ? 'All Design Work' : catLabel(activeFilter)}
                <span style={{ fontFamily: "'Outfit',sans-serif", fontSize: '.38em', fontWeight: 400, color: 'rgba(143,168,214,0.4)', marginLeft: 10, letterSpacing: 0, fontStyle: 'normal' }}>
                  {filtered.length} project{filtered.length !== 1 ? 's' : ''}
                </span>
              </h2>
            </div>
          </div>
        </RevealSection>
        {/* Filter tabs */}
        <RevealSection>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: '2.5rem' }}>
            {GD_FILTER_CATEGORIES.map(cat => {
              const isActive = activeFilter === cat.id
              return (
                <button key={cat.id} onClick={() => onFilterChange(cat.id)} className={`gd-filter-tab${isActive ? ' gd-active' : ''}`}>
                  {cat.label}
                  <span style={{ marginLeft: 5, background: isActive ? 'rgba(7,17,38,0.2)' : 'rgba(111,168,255,0.1)', color: isActive ? '#071126' : '#8FA8D6', padding: '1px 7px', borderRadius: 999, fontSize: '.62rem', fontWeight: 600 }}>{catCount(cat.id)}</span>
                </button>
              )
            })}
          </div>
        </RevealSection>
        {/* Content */}
        {filtered.length === 0 ? (
          <div style={{ padding: 60, textAlign: 'center', fontFamily: "'Outfit',sans-serif", fontSize: '.9rem', color: '#8FA8D6' }}>No projects in this category yet.</div>
        ) : (
          <>
            {/* Featured card */}
            <button onClick={() => onOpenProject(featured)} className="gd-card-hover" style={{ display: 'grid', gridTemplateColumns: '280px 1fr', width: '100%', borderRadius: 20, overflow: 'hidden', background: '#0B1E3A', border: '1px solid rgba(111,168,255,0.14)', boxShadow: '0 4px 28px rgba(3,7,18,0.4)', cursor: 'pointer', textAlign: 'left', marginBottom: 20 }}>
              <div style={{ position: 'relative', overflow: 'hidden', minHeight: 240, background: '#071126' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`/assets/images/graphic-designs/${featured.folder}/1.png`} alt={featured.title} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center', display: 'block', position: 'absolute', inset: 0 }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom,rgba(7,17,38,0.15) 0%,transparent 40%,rgba(7,17,38,0.1) 100%)', pointerEvents: 'none' }} />
                <span style={{ position: 'absolute', top: 14, left: 14, background: 'rgba(212,177,90,0.2)', backdropFilter: 'blur(4px)', color: '#D4B15A', fontFamily: "'Outfit',sans-serif", fontSize: '.62rem', fontWeight: 600, padding: '4px 10px', borderRadius: 999, border: '1px solid rgba(212,177,90,0.3)' }}>Featured</span>
                <span style={{ position: 'absolute', bottom: 14, left: 14, background: 'rgba(7,17,38,0.5)', backdropFilter: 'blur(4px)', color: '#8FA8D6', fontFamily: "'Outfit',sans-serif", fontSize: '.62rem', fontWeight: 500, padding: '4px 10px', borderRadius: 999, border: '1px solid rgba(111,168,255,0.18)' }}>{featured.year}</span>
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 3, background: `linear-gradient(to right,${featured.accent},transparent)`, opacity: .6 }} />
              </div>
              <div style={{ padding: '28px 32px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 14 }}>
                <div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 12 }}>
                    {featured.categories.map(c => <CatBadge key={c} catId={c} />)}
                  </div>
                  <h3 style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: 'clamp(1.2rem,2.5vw,1.6rem)', fontWeight: 500, fontStyle: 'italic', color: '#D9E6FF', marginBottom: 6, lineHeight: 1.2 }}>{featured.fullTitle}</h3>
                  <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: '.76rem', color: '#8FA8D6', fontWeight: 500, marginBottom: 12, opacity: .7 }}>{featured.institution} · {featured.year}</p>
                  <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: '.86rem', lineHeight: 1.72, color: '#8FA8D6' }}>{featured.summary}</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10 }}>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                    {featured.skills.slice(0, 3).map(s => (
                      <span key={s} style={{ background: 'rgba(111,168,255,0.07)', color: '#8FA8D6', padding: '4px 11px', borderRadius: 6, fontSize: '.65rem', fontWeight: 500, fontFamily: "'Outfit',sans-serif", border: '1px solid rgba(111,168,255,0.14)' }}>{s}</span>
                    ))}
                  </div>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: "'Outfit',sans-serif", fontSize: '.8rem', fontWeight: 600, color: '#D4B15A' }}>
                    View Case Study <ArrowRight style={{ width: 13, height: 13 }} />
                  </div>
                </div>
              </div>
            </button>
            {/* Rest grid */}
            {rest.length > 0 && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(240px,1fr))', gap: 16 }}>
                {rest.map(p => <ProjectCard key={p.id} project={p} onOpen={onOpenProject} />)}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

// ── CreativeDirectionsSection ─────────────────────────────────────────────────

const DIRECTIONS = [
  { accent: '#7BC8F6', Icon: BookOpen,     cat: 'Guidebook Design',       headline: 'Making information feel like a welcome.',    body: 'Dense itineraries, cultural context, practical logistics — redesigned as visual journeys that participants want to read.' },
  { accent: '#FF6B6B', Icon: Presentation, cat: 'Presentation Design',    headline: 'Data with emotional resonance.',             body: 'Partnership statistics and program highlights told through bold type, clean visuals, and strategic narrative flow.' },
  { accent: '#C4B5FD', Icon: Handshake,    cat: 'Partnership Materials',  headline: 'Design as institutional trust.',             body: 'Booklets and branding materials that make both sides of a partnership feel equally proud to put their name on.' },
  { accent: '#6EE7B7', Icon: Globe,        cat: 'Student Communication',  headline: 'Home away from home.',                       body: 'Guides and handbooks designed from empathy first — helping students navigate the unfamiliar with confidence.' },
]

function CreativeDirectionsSection() {
  return (
    <div style={{ background: 'linear-gradient(180deg,#0B1E3A 0%,#071126 100%)', padding: 'clamp(4rem,8vh,6rem) 24px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0, opacity: .45 }}><StarField count={30} /></div>
      <AstronautFloat img={4} style={{ position: 'absolute', left: '3%', top: '30%' }} size={80} dur={28} del={-5} rot={6} />
      <div style={{ maxWidth: 1024, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <RevealSection>
          <div style={{ marginBottom: '2.5rem' }}>
            <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: '.63rem', fontWeight: 600, letterSpacing: '.2em', textTransform: 'uppercase', color: '#D4B15A', marginBottom: '.9rem' }}>Creative Directions</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', alignItems: 'end' }}>
              <h2 style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: 'clamp(2rem,4.5vw,3.2rem)', fontWeight: 400, fontStyle: 'italic', color: '#D9E6FF', lineHeight: 1.05 }}>
                How I design<br />for <span style={{ color: '#D4B15A' }}>communication.</span>
              </h2>
              <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: '.9rem', lineHeight: 1.76, color: '#8FA8D6' }}>
                Every project starts with a real person who needs to understand something. The design serves them — not the institution.
              </p>
            </div>
          </div>
        </RevealSection>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(250px,1fr))', gap: 16 }}>
          {DIRECTIONS.map(d => (
            <div key={d.cat} className="gd-card-hover" style={{ background: 'rgba(24,59,107,0.3)', borderRadius: 22, overflow: 'hidden', border: '1px solid rgba(111,168,255,0.14)', boxShadow: '0 4px 24px rgba(3,7,18,0.4)', backdropFilter: 'blur(12px)' }}>
              <div style={{ height: 4, background: `linear-gradient(to right,${d.accent},transparent)`, opacity: .6 }} />
              <div style={{ padding: '26px 24px' }}>
                <div style={{ width: 46, height: 46, borderRadius: 14, background: 'rgba(111,168,255,0.07)', border: '1px solid rgba(111,168,255,0.16)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14, boxShadow: '0 0 14px rgba(111,168,255,0.1)' }}>
                  <d.Icon style={{ width: 20, height: 20, color: d.accent }} />
                </div>
                <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: '.6rem', fontWeight: 600, letterSpacing: '.14em', textTransform: 'uppercase', color: d.accent, marginBottom: 9, opacity: .85 }}>{d.cat}</div>
                <h4 style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: '1.1rem', fontWeight: 500, fontStyle: 'italic', color: '#D9E6FF', marginBottom: 10, lineHeight: 1.28 }}>{d.headline}</h4>
                <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: '.82rem', lineHeight: 1.7, color: '#8FA8D6' }}>{d.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── InspirationsSection ───────────────────────────────────────────────────────

function InspirationsSection() {
  const row1 = GD_INSPO
  const row2 = [...GD_INSPO].reverse()
  const doubled1 = [...row1, ...row1]
  const doubled2 = [...row2, ...row2]

  return (
    <div style={{ background: 'linear-gradient(180deg,#071126 0%,#030712 100%)', padding: 'clamp(4rem,8vh,6rem) 0', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0, opacity: .5 }}><StarField count={28} /></div>
      {/* Fade edges */}
      <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, width: 80, zIndex: 2, pointerEvents: 'none', background: 'linear-gradient(to right,#071126,transparent)' }} />
      <div style={{ position: 'absolute', top: 0, bottom: 0, right: 0, width: 80, zIndex: 2, pointerEvents: 'none', background: 'linear-gradient(to left,#071126,transparent)' }} />
      {/* Header */}
      <div style={{ maxWidth: 1024, margin: '0 auto', position: 'relative', zIndex: 1, padding: '0 24px', marginBottom: '2.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: '.63rem', fontWeight: 600, letterSpacing: '.2em', textTransform: 'uppercase', color: '#D4B15A', marginBottom: '.9rem' }}>Influences &amp; Inspirations</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: 'clamp(1.8rem,3.5vw,2.6rem)', fontWeight: 400, fontStyle: 'italic', color: '#D9E6FF', lineHeight: 1.05 }}>What shapes my visual thinking.</h2>
        </div>
        <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: '.82rem', color: '#8FA8D6', maxWidth: 260, lineHeight: 1.64, opacity: .75 }}>Design traditions and ideas that shape how I see and communicate visually.</p>
      </div>
      {/* Marquee rows */}
      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div className="gd-marquee-wrap" style={{ overflow: 'hidden' }}>
          <div className="gd-marquee-track">
            {doubled1.map((text, i) => (
              <span key={i} className="gd-marquee-pill" style={{ color: INSPO_ACCENTS[i % INSPO_ACCENTS.length], fontSize: '.82rem' }}>
                <span style={{ opacity: .55, fontSize: '.72rem' }}>{INSPO_DOTS[i % INSPO_DOTS.length]}</span>{text}
              </span>
            ))}
          </div>
        </div>
        <div className="gd-marquee-wrap" style={{ overflow: 'hidden' }}>
          <div className="gd-marquee-track rev">
            {doubled2.map((text, i) => (
              <span key={i} className="gd-marquee-pill" style={{ color: INSPO_ACCENTS[i % INSPO_ACCENTS.length], fontSize: '.82rem' }}>
                <span style={{ opacity: .55, fontSize: '.72rem' }}>{INSPO_DOTS[i % INSPO_DOTS.length]}</span>{text}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// ── CTASection ────────────────────────────────────────────────────────────────

function CTASection() {
  return (
    <div style={{ background: 'linear-gradient(160deg,#030712 0%,#071126 60%,#0a1530 100%)', padding: 'clamp(5rem,11vh,9rem) 24px', position: 'relative', overflow: 'hidden' }}>
      {/* Glowing crescent */}
      <div style={{ position: 'absolute', right: '-5%', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', zIndex: 0, filter: 'blur(2px) drop-shadow(0 0 60px rgba(212,177,90,0.3))', opacity: .12 }}>
        <svg width="500" height="500" viewBox="0 0 500 500" fill="none">
          <path d="M340 250C340 318.5 284.5 375 216 375C147.5 375 92 318.5 92 250C92 181.5 147.5 125 216 125C202.5 142.5 196 163 196 186C196 249.5 238.5 302 296.5 318.8C322 299.5 340 276.2 340 250Z" fill="#D4B15A"/>
        </svg>
      </div>
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}><StarField count={50} /></div>
      <AstronautFloat img={5} style={{ position: 'absolute', left: '5%',   top: '18%'    }} size={100} dur={25} del={-13} rot={10}  />
      <AstronautFloat img={3} style={{ position: 'absolute', right: '4%',  bottom: '22%' }} size={90}  dur={35} del={-2}  rot={-7}  />
      <AstronautFloat img={4} style={{ position: 'absolute', left: '15%',  top: '12%'    }} size={70}  dur={38} del={-9}  rot={5}   />
      <AstronautFloat img={5} style={{ position: 'absolute', right: '15%', bottom: '12%' }} size={65}  dur={22} del={-16} rot={-3}  />
      {/* Aurora glow */}
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 600, height: 300, borderRadius: '50%', background: 'radial-gradient(ellipse,rgba(111,168,255,0.06) 0%,transparent 70%)', pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ maxWidth: 768, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <RevealSection>
          <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: '.63rem', fontWeight: 600, letterSpacing: '.22em', textTransform: 'uppercase', color: '#D4B15A', opacity: .8, marginBottom: '1.5rem' }}>Let&apos;s Work Together</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: 'clamp(2.6rem,7.5vw,5.5rem)', fontWeight: 400, fontStyle: 'italic', color: '#D9E6FF', lineHeight: .96, marginBottom: '1.5rem', letterSpacing: '-.01em', textShadow: '0 0 60px rgba(111,168,255,0.18)' }}>
            Need visual communication<br /><span style={{ color: '#D4B15A' }}>that actually connects?</span>
          </h2>
          <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: '.94rem', lineHeight: 1.8, color: '#8FA8D6', maxWidth: 420, margin: '0 auto 3rem' }}>
            Guidebooks, presentations, or institutional branding — let&apos;s design communication experiences that feel human.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, justifyContent: 'center', alignItems: 'center' }}>
            <Link href="/croissantsmoon/contact" style={{ fontFamily: "'Outfit',sans-serif", fontSize: '.875rem', fontWeight: 600, background: '#D4B15A', color: '#071126', padding: '16px 38px', borderRadius: 999, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 9, letterSpacing: '.03em', boxShadow: '0 0 24px rgba(212,177,90,0.32),0 4px 18px rgba(212,177,90,0.2)' }}>
              Start a Conversation <ArrowRight style={{ width: 15, height: 15 }} />
            </Link>
            <a href="mailto:zefanya.kharisma@croissantsmoon.com" style={{ fontFamily: "'Outfit',sans-serif", border: '1px solid rgba(212,177,90,0.38)', color: '#D4B15A', padding: '16px 24px', borderRadius: 999, background: 'rgba(212,177,90,0.06)', cursor: 'pointer', textDecoration: 'none', fontSize: '.85rem', fontWeight: 500, display: 'inline-flex', alignItems: 'center', gap: 7 }}>
              zefanya.kharisma@croissantsmoon.com
            </a>
          </div>
          <div style={{ marginTop: '2.5rem' }}>
            <Link href="/croissantsmoon/projects-overview" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: "'Outfit',sans-serif", fontSize: '.78rem', color: 'rgba(143,168,214,0.32)', padding: '8px 12px', borderRadius: 8, textDecoration: 'none' }}>
              <ArrowLeft style={{ width: 13, height: 13 }} /> Back to Projects
            </Link>
          </div>
        </RevealSection>
      </div>
    </div>
  )
}

// ── ProjectDetailView ─────────────────────────────────────────────────────────

function ProjectDetailView({ project, onBack, onOpenProject, onOpenLightbox }: {
  project: GDProject
  onBack: () => void
  onOpenProject: (p: GDProject) => void
  onOpenLightbox: (projectId: string, index: number) => void
}) {
  const related = GD_PROJECTS.filter(p => p.id !== project.id && p.categories.some(c => project.categories.includes(c))).slice(0, 3)
  const catLabelStr = project.categories.map(c => catLabel(c)).join(' · ')
  const previewCount = project.imgs || Math.min(project.pages, 3)

  const storySteps = [
    { num: '01', label: 'The Brief',   heading: 'Why this project existed',    text: project.challenge },
    { num: '02', label: 'The Making',  heading: 'How the design came together', text: project.approach  },
    { num: '03', label: 'The Outcome', heading: 'What it ultimately achieved',  text: project.impact    },
  ]

  return (
    <div style={{ background: '#071126', minHeight: '100vh' }}>
      {/* Hero header */}
      <div style={{ background: 'linear-gradient(160deg,#030712 0%,#071126 50%,#0B1E3A 100%)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0, opacity: .7 }}><StarField count={40} /></div>
        <div style={{ position: 'absolute', right: -80, top: -80, width: 380, height: 380, borderRadius: '50%', background: `radial-gradient(circle,${project.accent}18 0%,transparent 65%)`, pointerEvents: 'none', zIndex: 0 }} />
        <div style={{ maxWidth: 1024, margin: '0 auto', position: 'relative', zIndex: 1, padding: 'clamp(3.5rem,8vh,6rem) 24px 0' }}>
          <button onClick={onBack} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: '2.5rem', fontFamily: "'Outfit',sans-serif", fontSize: '.82rem', color: '#8FA8D6', background: 'rgba(111,168,255,0.06)', border: '1px solid rgba(111,168,255,0.14)', cursor: 'pointer', padding: '8px 18px', borderRadius: 999 }}>
            <ArrowLeft style={{ width: 14, height: 14 }} /> Back to Gallery
          </button>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 10, marginBottom: '1.1rem' }}>
            <span style={{ fontFamily: "'Outfit',sans-serif", fontSize: '.62rem', fontWeight: 500, letterSpacing: '.16em', textTransform: 'uppercase', color: '#8FA8D6', opacity: .6 }}>{project.institution}</span>
            <span style={{ width: 3, height: 3, borderRadius: '50%', background: 'rgba(143,168,214,0.3)', display: 'inline-block' }} />
            <span style={{ fontFamily: "'Outfit',sans-serif", fontSize: '.62rem', fontWeight: 500, letterSpacing: '.12em', textTransform: 'uppercase', color: '#8FA8D6', opacity: .45 }}>{catLabelStr}</span>
          </div>
          <h1 style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: 'clamp(2rem,5vw,4rem)', fontWeight: 400, fontStyle: 'italic', lineHeight: 1.0, letterSpacing: '-.01em', color: '#D9E6FF', marginBottom: '1.5rem', maxWidth: 680, textShadow: '0 0 60px rgba(111,168,255,0.12)' }}>{project.fullTitle}</h1>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: '1.75rem' }}>
            <span style={{ background: 'rgba(212,177,90,0.12)', color: '#D4B15A', padding: '5px 13px', borderRadius: 999, fontFamily: "'Outfit',sans-serif", fontSize: '.7rem', fontWeight: 500, border: '1px solid rgba(212,177,90,0.22)' }}>{project.year}</span>
            {project.skills.map(s => <span key={s} style={{ background: 'rgba(111,168,255,0.08)', color: '#8FA8D6', padding: '5px 14px', borderRadius: 999, fontFamily: "'Outfit',sans-serif", fontSize: '.72rem', fontWeight: 400, border: '1px solid rgba(111,168,255,0.18)' }}>{s}</span>)}
          </div>
          <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: '1rem', lineHeight: 1.78, color: '#8FA8D6', maxWidth: 580, marginBottom: '3rem' }}>{project.summary}</p>
        </div>
      </div>

      {/* Stats bar */}
      <div style={{ background: 'rgba(11,30,58,0.85)', backdropFilter: 'blur(14px)', borderBottom: '1px solid rgba(111,168,255,0.1)', position: 'sticky', top: 0, zIndex: 10 }}>
        <div style={{ maxWidth: 1024, margin: '0 auto', padding: '0 24px', display: 'flex', gap: 0, overflowX: 'auto', scrollbarWidth: 'none' }}>
          {[
            { label: 'Type',   value: catLabelStr.split(' · ')[0] },
            { label: 'Pages',  value: `${project.pages} pages`    },
            { label: 'Year',   value: project.year                 },
            { label: 'Tool',   value: 'Canva'                      },
            { label: 'Client', value: project.institution.split(' × ')[0] },
          ].map((s, i) => (
            <div key={s.label} style={{ flexShrink: 0, padding: '14px 22px', borderRight: '1px solid rgba(111,168,255,0.08)', ...(i === 0 ? { paddingLeft: 0 } : {}) }}>
              <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: '.56rem', fontWeight: 600, letterSpacing: '.14em', textTransform: 'uppercase', color: 'rgba(143,168,214,0.4)', marginBottom: 3 }}>{s.label}</div>
              <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: '.82rem', fontWeight: 500, color: '#D9E6FF', whiteSpace: 'nowrap' }}>{s.value}</div>
            </div>
          ))}
          <div style={{ flex: 1, minWidth: 0 }} />
          <div style={{ padding: '14px 0 14px 22px', display: 'flex', alignItems: 'center' }}>
            <a href={project.link} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: '#D4B15A', color: '#071126', padding: '7px 16px', borderRadius: 999, fontFamily: "'Outfit',sans-serif", fontSize: '.72rem', fontWeight: 600, textDecoration: 'none', whiteSpace: 'nowrap', boxShadow: '0 0 14px rgba(212,177,90,0.25)' }}>
              Open on Canva <ExternalLink style={{ width: 11, height: 11 }} />
            </a>
          </div>
        </div>
      </div>

      {/* Body */}
      <div style={{ maxWidth: 1024, margin: '0 auto', padding: 'clamp(3rem,6vh,5rem) 24px' }}>
        {/* The Story */}
        <div style={{ marginBottom: '3.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '2rem' }}>
            <div style={{ width: 22, height: 2, background: project.accent, borderRadius: 2, opacity: .7 }} />
            <span style={{ fontFamily: "'Outfit',sans-serif", fontSize: '.63rem', fontWeight: 600, letterSpacing: '.18em', textTransform: 'uppercase', color: project.textAccent }}>The Story</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2.5rem', alignItems: 'start' }}>
            <div style={{ position: 'sticky', top: 80 }}>
              <h2 style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 400, fontStyle: 'italic', letterSpacing: '-.01em', lineHeight: 1.05, color: '#D9E6FF', marginBottom: '1rem' }}>
                Behind<br />the <span style={{ color: project.textAccent }}>design.</span>
              </h2>
              <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: '.86rem', lineHeight: 1.7, color: '#8FA8D6', maxWidth: 260, opacity: .75 }}>Every page was a deliberate decision — here&apos;s the thinking that shaped it.</p>
            </div>
            <div>
              {storySteps.map((s, i) => (
                <div key={s.num} style={{ display: 'flex', gap: 20, alignItems: 'flex-start', ...(i < 2 ? { marginBottom: '2rem', paddingBottom: '2rem', borderBottom: '1px solid rgba(111,168,255,0.08)' } : {}) }}>
                  <div style={{ flexShrink: 0, width: 52, height: 52, borderRadius: 14, background: 'rgba(111,168,255,0.06)', border: '1px solid rgba(111,168,255,0.16)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontFamily: "'Outfit',sans-serif", fontSize: '.68rem', fontWeight: 700, color: project.textAccent, letterSpacing: '.08em' }}>{s.num}</span>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: '.58rem', fontWeight: 600, letterSpacing: '.16em', textTransform: 'uppercase', color: project.textAccent, marginBottom: 5, opacity: .7 }}>{s.label}</div>
                    <h4 style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: '1.1rem', fontWeight: 500, fontStyle: 'italic', color: '#D9E6FF', marginBottom: 8, lineHeight: 1.3 }}>{s.heading}</h4>
                    <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: '.88rem', lineHeight: 1.76, color: '#8FA8D6' }}>{s.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Design Preview */}
        <div style={{ marginBottom: '3.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: 8 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 22, height: 2, background: project.accent, borderRadius: 2, opacity: .7 }} />
              <span style={{ fontFamily: "'Outfit',sans-serif", fontSize: '.63rem', fontWeight: 600, letterSpacing: '.18em', textTransform: 'uppercase', color: project.textAccent }}>Design Preview</span>
            </div>
            <span style={{ fontFamily: "'Outfit',sans-serif", fontSize: '.72rem', color: '#8FA8D6', opacity: .65 }}>{project.pages} pages · click to expand</span>
          </div>
          <div style={{ display: 'flex', gap: 12, overflowX: 'auto', paddingBottom: 14, scrollbarWidth: 'thin', scrollbarColor: 'rgba(111,168,255,0.2) transparent' }}>
            {Array.from({ length: previewCount }, (_, i) => i + 1).map(n => (
              <div key={n} onClick={() => onOpenLightbox(project.id, n - 1)} style={{ flexShrink: 0, width: 200, borderRadius: 14, overflow: 'hidden', boxShadow: '0 4px 24px rgba(3,7,18,0.5)', background: '#071126', border: '1px solid rgba(111,168,255,0.12)', cursor: 'zoom-in', position: 'relative' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`/assets/images/graphic-designs/${project.folder}/${n}.png`} alt={`${project.title} — page ${n}`} style={{ width: '100%', display: 'block', objectFit: 'cover', aspectRatio: '3/2', objectPosition: 'top center' }} />
                <span style={{ position: 'absolute', bottom: 8, right: 10, background: 'rgba(7,17,38,0.55)', color: '#8FA8D6', fontFamily: "'Outfit',sans-serif", fontSize: '.58rem', fontWeight: 500, padding: '2px 7px', borderRadius: 999, border: '1px solid rgba(111,168,255,0.16)' }}>{n}</span>
              </div>
            ))}
            {project.pages > previewCount && (
              <a href={project.link} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} style={{ flexShrink: 0, width: 140, borderRadius: 14, background: 'rgba(111,168,255,0.05)', border: '1px dashed rgba(111,168,255,0.18)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', aspectRatio: '3/2', gap: 10, cursor: 'zoom-in', textDecoration: 'none' }}>
                <span style={{ fontSize: '1.5rem' }}>{project.emoji}</span>
                <span style={{ fontFamily: "'Outfit',sans-serif", fontSize: '.68rem', fontWeight: 500, color: '#8FA8D6', textAlign: 'center', lineHeight: 1.4 }}>+{project.pages - previewCount} more on Canva</span>
              </a>
            )}
          </div>
        </div>

        {/* Design DNA */}
        <div style={{ marginBottom: '3.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '.75rem' }}>
            <div style={{ width: 22, height: 2, background: project.accent, borderRadius: 2, opacity: .7 }} />
            <span style={{ fontFamily: "'Outfit',sans-serif", fontSize: '.63rem', fontWeight: 600, letterSpacing: '.18em', textTransform: 'uppercase', color: project.textAccent }}>Design DNA</span>
          </div>
          <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: '.86rem', color: '#8FA8D6', marginBottom: '1.5rem', maxWidth: 420, lineHeight: 1.64, opacity: .7 }}>Three intentional visual decisions that make this project what it is.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 14 }}>
            {project.designDecisions.map(d => (
              <div key={d.label} className="gd-card-hover" style={{ background: 'rgba(24,59,107,0.3)', borderRadius: 18, padding: '22px 20px', border: '1px solid rgba(111,168,255,0.14)', backdropFilter: 'blur(12px)' }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(111,168,255,0.06)', border: '1px solid rgba(111,168,255,0.16)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14, fontSize: '1rem', color: project.textAccent }}>{d.icon}</div>
                <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: '.58rem', fontWeight: 600, letterSpacing: '.14em', textTransform: 'uppercase', color: project.textAccent, marginBottom: 6, opacity: .75 }}>{d.label}</div>
                <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: '.84rem', lineHeight: 1.72, color: '#8FA8D6' }}>{d.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Deliverables */}
        <div style={{ background: 'rgba(11,30,58,0.5)', borderRadius: 20, padding: '28px 30px', border: '1px solid rgba(111,168,255,0.12)', backdropFilter: 'blur(12px)', marginBottom: '3.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '1.25rem' }}>
            <div style={{ width: 18, height: 2, background: project.accent, borderRadius: 2, opacity: .7 }} />
            <span style={{ fontFamily: "'Outfit',sans-serif", fontSize: '.6rem', fontWeight: 600, letterSpacing: '.18em', textTransform: 'uppercase', color: project.textAccent }}>What Was Made</span>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {project.deliverables.map(d => (
              <span key={d} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(11,30,58,0.55)', border: '1px solid rgba(111,168,255,0.14)', padding: '7px 14px', borderRadius: 999, fontFamily: "'Outfit',sans-serif", fontSize: '.75rem', fontWeight: 400, color: '#D9E6FF' }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: project.accent, display: 'inline-block', flexShrink: 0, opacity: .7 }} />{d}
              </span>
            ))}
          </div>
        </div>

        {/* View on Canva */}
        <div style={{ borderRadius: 24, overflow: 'hidden', marginBottom: '3.5rem', border: '1px solid rgba(111,168,255,0.12)' }}>
          <div onClick={() => onOpenLightbox(project.id, 0)} style={{ height: 220, overflow: 'hidden', position: 'relative', cursor: 'zoom-in' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`/assets/images/graphic-designs/${project.folder}/1.png`} alt={`${project.title} — cover preview`} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center', display: 'block' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom,rgba(7,17,38,0.08),rgba(7,17,38,0.58))' }} />
            <div style={{ position: 'absolute', bottom: 16, left: 22, fontFamily: "'Outfit',sans-serif", color: 'rgba(217,230,255,0.55)', fontSize: '.68rem', fontWeight: 500, letterSpacing: '.08em' }}>
              Click to preview · {previewCount} preview pages · {project.pages} pages total
            </div>
          </div>
          <div style={{ background: '#071126', padding: '24px 30px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, borderTop: '1px solid rgba(111,168,255,0.1)' }}>
            <div>
              <div style={{ fontFamily: "'Outfit',sans-serif", color: '#8FA8D6', fontSize: '.6rem', fontWeight: 600, letterSpacing: '.14em', textTransform: 'uppercase', marginBottom: 5, opacity: .55 }}>Full design on Canva</div>
              <div style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", color: '#D9E6FF', fontSize: '1.1rem', fontWeight: 500, fontStyle: 'italic' }}>Explore every spread, layout &amp; visual system.</div>
            </div>
            <a href={project.link} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 9, background: '#D4B15A', color: '#071126', padding: '13px 26px', borderRadius: 999, fontFamily: "'Outfit',sans-serif", fontSize: '.87rem', fontWeight: 600, textDecoration: 'none', flexShrink: 0, boxShadow: '0 0 22px rgba(212,177,90,0.3)' }}>
              Open on Canva <ExternalLink style={{ width: 14, height: 14 }} />
            </a>
          </div>
        </div>

        {/* Reflection */}
        <div style={{ background: 'linear-gradient(135deg,rgba(24,59,107,0.4),rgba(11,30,58,0.6))', borderRadius: 24, padding: 'clamp(2.5rem,5vh,4.5rem) clamp(2rem,5vw,4rem)', marginBottom: '3.5rem', position: 'relative', overflow: 'hidden', border: '1px solid rgba(111,168,255,0.14)' }}>
          <div style={{ position: 'absolute', right: -40, top: -40, width: 220, height: 220, borderRadius: '50%', background: `radial-gradient(circle,${project.accent}12 0%,transparent 65%)`, pointerEvents: 'none' }} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '5rem', lineHeight: .8, color: project.accent, opacity: .15, marginBottom: '-1rem', userSelect: 'none' }}>&ldquo;</div>
            <p style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: 'clamp(1.35rem,2.6vw,1.9rem)', fontWeight: 400, fontStyle: 'italic', lineHeight: 1.52, color: '#D9E6FF', position: 'relative', zIndex: 1, maxWidth: 620 }}>{project.reflection}</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: '1.5rem' }}>
              <div style={{ width: 18, height: 1, background: 'rgba(143,168,214,0.3)', borderRadius: 2 }} />
              <span style={{ fontFamily: "'Outfit',sans-serif", fontSize: '.6rem', fontWeight: 600, letterSpacing: '.16em', textTransform: 'uppercase', color: 'rgba(143,168,214,0.45)' }}>Reflection</span>
            </div>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div style={{ marginBottom: '3rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '1.5rem' }}>
              <div style={{ width: 20, height: 2, background: '#D4B15A', borderRadius: 2, opacity: .6 }} />
              <span style={{ fontFamily: "'Outfit',sans-serif", fontSize: '.63rem', fontWeight: 600, letterSpacing: '.18em', textTransform: 'uppercase', color: '#D4B15A' }}>You Might Also Like</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(210px,1fr))', gap: 14 }}>
              {related.map(p => (
                <button key={p.id} onClick={() => onOpenProject(p)} className="gd-card-hover" style={{ background: '#0B1E3A', borderRadius: 16, overflow: 'hidden', border: '1px solid rgba(111,168,255,0.12)', cursor: 'pointer', textAlign: 'left', boxShadow: '0 2px 18px rgba(3,7,18,0.4)', display: 'block', width: '100%' }}>
                  <div style={{ height: 80, background: '#071126', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', position: 'relative', overflow: 'hidden' }}>
                    <StarField count={8} />
                    <span style={{ position: 'relative', zIndex: 1 }}>{p.emoji}</span>
                    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 2, background: `linear-gradient(to right,${p.accent},transparent)`, opacity: .5 }} />
                  </div>
                  <div style={{ padding: '13px 15px 15px' }}>
                    <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: '.58rem', fontWeight: 500, letterSpacing: '.1em', textTransform: 'uppercase', color: 'rgba(143,168,214,0.45)', marginBottom: 4 }}>{p.institution}</div>
                    <h4 style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: '.95rem', fontWeight: 500, fontStyle: 'italic', color: '#D9E6FF', lineHeight: 1.3 }}>{p.title}</h4>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Back button */}
        <div style={{ display: 'flex', justifyContent: 'center', padding: '1rem 0 2rem' }}>
          <button onClick={onBack} style={{ display: 'inline-flex', alignItems: 'center', gap: 7, border: '1px solid rgba(111,168,255,0.18)', background: 'none', cursor: 'pointer', fontFamily: "'Outfit',sans-serif", fontSize: '.82rem', fontWeight: 400, color: '#8FA8D6', padding: '11px 22px', borderRadius: 999 }}>
            <Grid2x2 style={{ width: 13, height: 13 }} /> Back to All Projects
          </button>
        </div>
      </div>
    </div>
  )
}

// ── Main Page ─────────────────────────────────────────────────────────────────

export default function DesignsPage() {
  const [activeProject, setActiveProject] = useState<GDProject | null>(null)
  const [activeFilter, setActiveFilter] = useState('all')
  const [lightbox, setLightbox] = useState<{ project: GDProject; index: number } | null>(null)
  const projectsRef = useRef<HTMLDivElement | null>(null)

  const scrollToProjects = useCallback(() => {
    projectsRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  const openProject = useCallback((p: GDProject) => {
    setActiveProject(p)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const openLightbox = useCallback((projectId: string, index: number) => {
    const p = GD_PROJECTS.find(p => p.id === projectId)
    if (p) setLightbox({ project: p, index })
  }, [])

  const navLightbox = useCallback((dir: number) => {
    setLightbox(prev => {
      if (!prev) return null
      const total = prev.project.imgs || Math.min(prev.project.pages, 3)
      const next = Math.max(0, Math.min(total - 1, prev.index + dir))
      return { ...prev, index: next }
    })
  }, [])

  const jumpLightbox = useCallback((i: number) => {
    setLightbox(prev => prev ? { ...prev, index: i } : null)
  }, [])

  if (activeProject) {
    return (
      <>
        <ProjectDetailView
          project={activeProject}
          onBack={() => { setActiveProject(null); window.scrollTo({ top: 0 }) }}
          onOpenProject={openProject}
          onOpenLightbox={openLightbox}
        />
        {lightbox && (
          <LightboxModal
            project={lightbox.project}
            index={lightbox.index}
            onNav={navLightbox}
            onJump={jumpLightbox}
            onClose={() => setLightbox(null)}
          />
        )}
      </>
    )
  }

  return (
    <>
      <main style={{ background: '#071126', minHeight: '100vh' }}>
        <GalleryHero onScrollToProjects={scrollToProjects} onFilterClick={(id) => { setActiveFilter(id); scrollToProjects() }} />
        <ProjectsSection activeFilter={activeFilter} onFilterChange={setActiveFilter} onOpenProject={openProject} projectsRef={projectsRef} />
        <CreativeDirectionsSection />
        <InspirationsSection />
        <CTASection />
      </main>
      {lightbox && (
        <LightboxModal
          project={lightbox.project}
          index={lightbox.index}
          onNav={navLightbox}
          onJump={jumpLightbox}
          onClose={() => setLightbox(null)}
        />
      )}
    </>
  )
}
