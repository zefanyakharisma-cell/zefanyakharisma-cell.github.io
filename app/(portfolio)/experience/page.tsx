import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Experience',
  alternates: { canonical: '/experience' },
  description: '3+ years building international partnerships and supporting student mobility across Surabaya.',
}

const experiences = [
  {
    title: 'International Partnership',
    org: 'Petra Christian University',
    period: 'March 2026–Present',
    color: '#1E3A5F',
    badge: 'Current',
    bullets: [
      'Manage communication with 30+ institutional partners monthly through formal correspondence',
      'Review 25 partnership agreements (MoU/MoA) per month for compliance and institutional alignment',
      'Facilitate 15+ strategic partnership meetings per month, delivering meeting minutes within 24 hours',
      'Initiate collaborations to strengthen PCU\'s global presence and expand international grant access',
    ],
  },
  {
    title: 'International Mobility & Global Reputation',
    org: 'Airlangga Global Engagement',
    period: 'September 2025–March 2026 (7 months)',
    color: '#4A6B8A',
    bullets: [
      'Managed 5 end-to-end international exchange programs — promotion, pre-departure, arrival, study period, and post-program completion',
      'Led program and budget management of IDR 50–100M per program across 50+ stakeholders',
      'Delivered high-quality exchange experiences for 120+ international students per semester',
    ],
  },
  {
    title: 'International Student & Mobility',
    org: 'Airlangga Global Engagement',
    period: 'January 2024–September 2025 (1 year 9 months)',
    color: '#4A6B8A',
    bullets: [
      'Provided end-to-end welfare and non-academic support for 100+ international students per semester',
      'Covered accommodation, healthcare, insurance, banking, and immigration coordination',
      'Coordinated across 10+ stakeholders including faculties, hospitals, banks, and immigration authorities',
    ],
  },
  {
    title: 'Assistant Lecturer — Foreign Policy Analysis',
    org: 'Universitas Airlangga',
    period: 'September 2023–January 2024 (5 months)',
    color: '#8B7355',
    bullets: [
      'Co-facilitated Foreign Policy Analysis discussions for undergraduate students, moderating debates',
      'Managed grading, scheduling, and administrative coordination for the lead lecturer',
    ],
  },
  {
    title: 'International Program and Inbound Coordinator',
    org: 'Koordinasi Informasi dan Kehumasan FISIP Unair',
    period: 'June 2023–January 2024 (8 months)',
    color: '#8B7355',
    bullets: [
      'Coordinated logistics and program delivery for foreign lecturers and visiting students',
      'Provided English–Indonesian interpretation at conferences, guest lectures, and company visits',
      'Served as primary point of contact for inbound guests across multiple events per semester',
    ],
  },
  {
    title: 'Research Assistant',
    org: 'Universitas Airlangga',
    period: 'May 2023–January 2024 (9 months)',
    color: '#8B7355',
    bullets: [
      'Researched U.S.–ASEAN economic cooperation across Biden and Trump administrations; contributed to paper at 9th ICoCSPA 2023',
      'Synthesized academic sources on U.S.–China economic dynamics in Southeast Asia into structured research briefs',
    ],
  },
]

export default function Experience() {
  return (
    <div style={{ background: '#FAFAF8', minHeight: '100vh' }}>
      <div className="max-w-6xl mx-auto px-6" style={{ paddingTop: '48px', paddingBottom: '72px' }}>
        <Link href="/about-overview" className="flex items-center gap-2 mb-6" style={{ color: '#1E3A5F', textDecoration: 'none' }}>
          <ArrowLeft style={{ width: 16, height: 16 }} /> Back
        </Link>
        <h1 className="font-heading font-bold text-4xl mb-2" style={{ color: '#1C1C1E' }}>Professional Experience</h1>
        <p className="text-lg mb-12" style={{ color: '#5C5C5C' }}>3+ years building international partnerships and supporting student mobility across Surabaya</p>
        <div className="space-y-6">
          {experiences.map(exp => (
            <div key={exp.title} className="card p-6">
              <div className="flex flex-col md:flex-row md:items-start gap-4">
                <div className="flex-1">
                  <h3 className="font-heading font-semibold text-lg mb-1" style={{ color: '#1C1C1E' }}>{exp.title}</h3>
                  <p className="text-sm font-medium mb-2" style={{ color: exp.color }}>{exp.org} — {exp.period}</p>
                  <ul className="text-sm space-y-1 list-none" style={{ color: '#5C5C5C' }}>
                    {exp.bullets.map((b, i) => <li key={i}>• {b}</li>)}
                  </ul>
                </div>
                {exp.badge && <span className="tag flex-shrink-0">{exp.badge}</span>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
