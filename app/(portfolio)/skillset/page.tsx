import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Skillset',
  alternates: { canonical: '/skillset' },
  description: 'Core competencies and professional capabilities.',
}

const skillGroups = [
  {
    title: 'Partnership & Institutional Relations',
    tags: ['Strategic Partnerships', 'MoU/MoA Coordination', 'Stakeholder Management', 'Partnership Development'],
  },
  {
    title: 'Mobility & Program Management',
    tags: ['Exchange Program Management', 'KNB & TIAS Scholarships', 'Budget Management', 'Vendor Coordination'],
  },
  {
    title: 'Student Support & Welfare',
    tags: ['International Student Services', 'Immigration Coordination', 'Onboarding', 'Case Management'],
  },
  {
    title: 'Communication & Research',
    tags: ['Strategic Communications', 'English–Indonesian Interpretation', 'Academic Research', 'Cross-Cultural Communication'],
  },
]

export default function Skillset() {
  return (
    <div style={{ background: '#FAFAF8', minHeight: '100vh' }}>
      <div className="max-w-6xl mx-auto px-6" style={{ paddingTop: '48px', paddingBottom: '72px' }}>
        <Link href="/about-overview" className="flex items-center gap-2 mb-6" style={{ color: '#1E3A5F', textDecoration: 'none' }}>
          <ArrowLeft style={{ width: 16, height: 16 }} /> Back
        </Link>
        <h1 className="font-heading font-bold text-4xl mb-2" style={{ color: '#1C1C1E' }}>Skillset</h1>
        <p className="text-lg mb-12" style={{ color: '#5C5C5C' }}>Core competencies and professional capabilities</p>
        <div className="grid md:grid-cols-2 gap-6">
          {skillGroups.map(group => (
            <div key={group.title} className="card p-6">
              <h3 className="font-heading font-semibold text-lg mb-4" style={{ color: '#1C1C1E' }}>{group.title}</h3>
              <div className="flex flex-wrap gap-2">
                {group.tags.map(tag => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
