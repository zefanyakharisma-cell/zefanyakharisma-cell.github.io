import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Handshake, FileText, Plane, Heart, BarChart2, Languages } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Expertise',
  alternates: { canonical: '/expertise' },
  description: 'Core competencies built through hands-on experience in international higher education.',
}

const expertise = [
  {
    icon: Handshake,
    title: 'Strategic Partnerships',
    desc: 'Managing 30+ institutional partners, facilitating 15+ strategic meetings per month, and driving joint academic initiatives at PCU.',
  },
  {
    icon: FileText,
    title: 'MoU / MoA Coordination',
    desc: 'Reviewing 25+ partnership agreements monthly — ensuring compliance, alignment with institutional goals, and timely processing.',
  },
  {
    icon: Plane,
    title: 'Student Mobility Programs',
    desc: 'End-to-end management of 5 international exchange programs, including KNB & TIAS government scholarships, for 120+ students per semester.',
  },
  {
    icon: Heart,
    title: 'International Student Welfare',
    desc: 'Comprehensive non-academic support for 100+ students per semester — accommodation, healthcare, insurance, banking, and immigration coordination.',
  },
  {
    icon: BarChart2,
    title: 'Program & Budget Management',
    desc: 'Led IDR 50–100M per-program budgets, coordinating logistics, events, and vendor management across 50+ stakeholders.',
  },
  {
    icon: Languages,
    title: 'Cross-Cultural Communication',
    desc: 'English–Indonesian interpretation at conferences and company visits; bridging local and international stakeholders with cultural sensitivity.',
  },
]

export default function Expertise() {
  return (
    <div style={{ background: '#FAFAF8', minHeight: '100vh' }}>
      <div className="max-w-6xl mx-auto px-6" style={{ paddingTop: '48px', paddingBottom: '72px' }}>
        <Link href="/about-overview" className="flex items-center gap-2 mb-6" style={{ color: '#1E3A5F', textDecoration: 'none' }}>
          <ArrowLeft style={{ width: 16, height: 16 }} /> Back
        </Link>
        <h1 className="font-heading font-bold text-4xl mb-2" style={{ color: '#1C1C1E' }}>Areas of Expertise</h1>
        <p className="text-lg mb-12" style={{ color: '#5C5C5C' }}>Core competencies built through hands-on experience in international higher education</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {expertise.map(item => (
            <div key={item.title} className="card p-6">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4" style={{ background: 'rgba(30,58,95,0.08)' }}>
                <item.icon style={{ width: 24, height: 24, color: '#1E3A5F' }} />
              </div>
              <h3 className="font-heading font-semibold text-base mb-2" style={{ color: '#1C1C1E' }}>{item.title}</h3>
              <p className="text-sm" style={{ color: '#5C5C5C' }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
