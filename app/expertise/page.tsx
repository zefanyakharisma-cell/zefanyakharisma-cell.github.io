import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Handshake, FileCheck, Plane, Heart, BarChart2, Languages, LayoutDashboard, Code2, Network, Globe2, PenLine } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Expertise — Zefanya Kharisma Nugroho',
  description: 'Core competencies in international partnerships, student mobility, project management, and digital creativity.',
}

const expertiseGroups = [
  {
    label: 'International Education',
    color: '#1E3A5F',
    items: [
      { icon: Handshake, title: 'International Partnership Management', desc: 'Managing 30+ institutional partners, reviewing 25+ MoU/MoA agreements monthly, and facilitating 15+ strategic meetings per month at Petra Christian University.', years: '3+ years' },
      { icon: FileCheck, title: 'MoU / MoA Coordination', desc: 'Formalizing academic partnerships through strategic agreements — ensuring compliance and institutional alignment across international partner portfolios.', years: '2+ years' },
      { icon: Plane, title: 'Student Mobility Programs', desc: 'End-to-end management of 5 international exchange programs — promotion, pre-departure, arrival logistics, study period, and post-program completion.', years: '2+ years' },
      { icon: Heart, title: 'International Student Welfare', desc: 'Comprehensive non-academic support for 100+ international students per semester — accommodation, healthcare, insurance, banking, and immigration.', years: '2+ years' },
      { icon: BarChart2, title: 'Program & Budget Management', desc: 'Budget management of IDR 50–100M per program across 50+ stakeholders. Full program lifecycle from planning through delivery and evaluation.', years: '2+ years' },
      { icon: Globe2, title: 'Internationalization Strategy', desc: 'Driving institutional internationalization frameworks, expanding global grant access, and developing strategic multi-year partnership roadmaps.', years: '1+ year' },
    ],
  },
  {
    label: 'Digital & Creative',
    color: '#8B7355',
    items: [
      { icon: Code2, title: 'Full-Stack Web Development', desc: 'Building responsive, purpose-driven websites — vanilla JS SPAs, Next.js apps, Supabase backends. Delivered PCU Global International Office web platform.', years: '3+ years' },
      { icon: LayoutDashboard, title: 'UI/UX Design', desc: 'User-centered design for institutional platforms and international program portals. iOS-inspired design systems, glassmorphism, and editorial layouts.', years: '3+ years' },
      { icon: Network, title: 'Systems Thinking', desc: 'Connecting international education, digital design, and creative strategy into integrated systems. Identifying patterns across complex institutional environments.', years: '3+ years' },
      { icon: PenLine, title: 'Writing & Communication', desc: 'Drafting institutional correspondence, partnership agreements, academic research papers, and strategic communications in English and Indonesian.', years: '3+ years' },
      { icon: Languages, title: 'Cross-Cultural Communication', desc: 'English–Indonesian interpretation at international conferences, company visits, and guest lectures. Bridging cultural and institutional contexts.', years: '3+ years' },
    ],
  },
]

export default function Expertise() {
  return (
    <div style={{ background: '#F2F2F7', minHeight: '100vh' }}>
      <div style={{ background: 'linear-gradient(135deg,#1E3A5F 0%,#2563EB 60%,#38BDF8 100%)', padding: '52px 24px 44px', position: 'relative', overflow: 'hidden' }}>
        <div className="absolute -right-16 -top-16 w-80 h-80 rounded-full" style={{ background: 'rgba(255,255,255,0.04)' }} />
        <div className="relative z-10 mx-auto px-5" style={{ maxWidth: 480 }}>
          <Link href="/about-overview" className="inline-flex items-center gap-2 mb-7 px-3.5 py-1.5 rounded-full text-sm font-medium" style={{ background: 'rgba(255,255,255,0.14)', backdropFilter: 'blur(12px)', color: 'rgba(255,255,255,0.9)', textDecoration: 'none', border: '1px solid rgba(255,255,255,0.18)' }}>
            <ArrowLeft style={{ width: 14, height: 14 }} /> Back
          </Link>
          <span className="inline-block px-3.5 py-1 rounded-full text-xs font-semibold mb-4 uppercase tracking-wider" style={{ background: 'rgba(255,255,255,0.14)', color: 'rgba(255,255,255,0.9)', border: '1px solid rgba(255,255,255,0.12)' }}>About Me</span>
          <h1 className="font-heading font-bold mb-3 text-white" style={{ fontSize: 'clamp(1.9rem,6vw,3rem)', letterSpacing: '-.02em', lineHeight: 1.1 }}>Areas of Expertise</h1>
          <p className="text-sm leading-relaxed max-w-lg" style={{ color: 'rgba(255,255,255,0.7)' }}>Core competencies built through hands-on experience in international higher education.</p>
        </div>
      </div>

      <div style={{ padding: '72px 24px' }}>
        <div className="max-w-6xl mx-auto">
          {expertiseGroups.map(group => (
            <div key={group.label} className="mb-16">
              <div className="flex items-center gap-3 mb-8">
                <span className="accent-line" style={{ background: group.color }} />
                <span className="label-small" style={{ color: group.color }}>{group.label}</span>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {group.items.map(item => (
                  <div key={item.title} className="card p-7" style={{ background: '#fff', borderLeft: `3px solid ${group.color}` }}>
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-5" style={{ background: `${group.color}14` }}>
                      <item.icon style={{ width: 20, height: 20, color: group.color }} />
                    </div>
                    <h3 className="font-heading font-semibold text-base mb-2" style={{ color: '#1C1C1E' }}>{item.title}</h3>
                    <p className="text-sm leading-relaxed mb-4" style={{ color: '#5C5C5C' }}>{item.desc}</p>
                    <span className="tag">{item.years}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
