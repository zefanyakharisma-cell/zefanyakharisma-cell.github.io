import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Plane, Handshake, FileCheck, Heart, DollarSign, Globe2 } from 'lucide-react'

export const metadata: Metadata = {
  title: 'International Education — Zefanya Kharisma Nugroho',
  description: 'International education programs — student mobility, institutional partnerships, welfare support, and grants at Petra Christian University.',
}

const programs = [
  {
    icon: Plane,
    href: '/onboarding',
    color: '#1E3A5F',
    title: 'Student Mobility Programs',
    sub: 'Inbound & Outbound Exchange',
    desc: 'End-to-end coordination of 5+ international exchange programs — pre-departure preparation, arrival logistics, and post-program completion for 100+ international students per semester.',
    tags: ['Student Mobility', 'Logistics', 'Program Management'],
  },
  {
    icon: Handshake,
    href: '/partnerships',
    color: '#8B7355',
    title: 'Institutional Partnerships',
    sub: 'Global Partner Network',
    desc: 'Managing 30+ active institutional partnerships — monthly MoU/MoA reviews, strategic meeting facilitation, and partner relationship management across Asia, Europe, and the Americas.',
    tags: ['Partnership Management', 'MoU/MoA', 'Strategy'],
  },
  {
    icon: FileCheck,
    href: '/mou',
    color: '#4A6B8A',
    title: 'MoU / MoA Coordination',
    sub: 'Agreement Management',
    desc: 'Reviewing 25+ MoU and MoA documents monthly — ensuring compliance, tracking renewal deadlines, and coordinating signatory processes across institutional stakeholders.',
    tags: ['Legal Coordination', 'Compliance', 'Documentation'],
  },
  {
    icon: Heart,
    href: '/onboarding',
    color: '#064E3B',
    title: 'International Student Welfare',
    sub: 'Comprehensive Support',
    desc: 'Non-academic support for international students — accommodation facilitation, healthcare navigation, banking assistance, insurance enrollment, and immigration compliance.',
    tags: ['Student Welfare', 'Support Services', 'Community'],
  },
  {
    icon: DollarSign,
    href: '/intl-grants',
    color: '#D4B15A',
    title: 'International Grants',
    sub: 'Funding & Scholarships',
    desc: 'Identifying, tracking, and facilitating applications for international grants and scholarships — matching institutional priorities with available bilateral and multilateral funding.',
    tags: ['Grants', 'Scholarships', 'Funding Strategy'],
  },
  {
    icon: Globe2,
    href: '/expertise',
    color: '#2563EB',
    title: 'Internationalization Strategy',
    sub: 'Institutional Development',
    desc: 'Contributing to multi-year internationalization roadmaps — expanding partner networks, developing program pipelines, and aligning institutional KPIs with international benchmarks.',
    tags: ['Strategy', 'Internationalization', 'Leadership'],
  },
]

export default function EngagementPage() {
  return (
    <div style={{ background: '#F2F2F7', minHeight: '100vh' }}>
      {/* Hero */}
      <div style={{ background: 'linear-gradient(135deg,#0D2137 0%,#1E3A5F 55%,#2E5A8A 100%)', padding: '64px 24px 52px', position: 'relative', overflow: 'hidden' }}>
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 80% 20%, rgba(255,255,255,0.04) 0%, transparent 55%)' }} />
        <div className="relative z-10 max-w-4xl mx-auto">
          <span className="inline-block px-3.5 py-1 rounded-full text-xs font-semibold mb-4 uppercase tracking-wider" style={{ background: 'rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.85)', border: '1px solid rgba(255,255,255,0.15)' }}>International Education</span>
          <h1 className="font-heading font-bold text-white mb-4" style={{ fontSize: 'clamp(2rem,5.5vw,3.4rem)', letterSpacing: '-.025em', lineHeight: 1.1 }}>Global Engagement Programs</h1>
          <p style={{ fontSize: '.95rem', color: 'rgba(255,255,255,0.68)', lineHeight: 1.74, maxWidth: 560 }}>
            Student mobility, institutional partnerships, welfare support, and international grants — the full spectrum of international higher education coordination at Petra Christian University.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {[
            { value: '30+', label: 'Active partners', color: '#1E3A5F' },
            { value: '100+', label: 'Students / semester', color: '#8B7355' },
            { value: '25+', label: 'MoUs reviewed / month', color: '#4A6B8A' },
            { value: '5+', label: 'Exchange programs', color: '#064E3B' },
          ].map(s => (
            <div key={s.label} className="card p-6 text-center" style={{ borderTop: `3px solid ${s.color}` }}>
              <div className="font-heading font-bold" style={{ fontSize: '1.5rem', color: '#1C1C1E', letterSpacing: '-.02em' }}>{s.value}</div>
              <div style={{ fontSize: '.72rem', color: '#767676', marginTop: 4, lineHeight: 1.4 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Programs */}
        <div className="space-y-5">
          {programs.map(p => (
            <Link key={p.href + p.title} href={p.href} className="card p-7 flex gap-5 block group" style={{ textDecoration: 'none', display: 'flex' }}>
              <div className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: `${p.color}12` }}>
                <p.icon style={{ width: 22, height: 22, color: p.color }} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-1">
                  <div>
                    <h3 className="font-heading font-bold text-base" style={{ color: '#1C1C1E' }}>{p.title}</h3>
                    <span style={{ fontSize: '.72rem', color: p.color, fontWeight: 600 }}>{p.sub}</span>
                  </div>
                  <ArrowRight style={{ width: 16, height: 16, color: '#C0B8AE', flexShrink: 0, marginTop: 4 }} />
                </div>
                <p className="text-sm leading-relaxed mb-3 mt-2" style={{ color: '#5C5C5C' }}>{p.desc}</p>
                <div className="flex flex-wrap gap-1.5">
                  {p.tags.map(t => <span key={t} className="tag">{t}</span>)}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
