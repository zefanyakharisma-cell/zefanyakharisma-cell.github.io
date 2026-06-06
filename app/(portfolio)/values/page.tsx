import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Target, Users, Lightbulb, Handshake, Globe, Zap } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Values',
  alternates: { canonical: '/values' },
  description: 'Professional values and principles guiding work in international education.',
}

const values = [
  {
    icon: Target,
    color: '#1E3A5F',
    bg: 'rgba(30,58,95,0.08)',
    title: 'Excellence & Quality',
    desc: 'Commitment to highest standards in program design, partnership development, and student support. Every initiative reflects institutional pride and global best practices.',
  },
  {
    icon: Users,
    color: '#4A6B8A',
    bg: 'rgba(74,107,138,0.08)',
    title: 'Inclusivity & Equity',
    desc: 'Belief that international education should be accessible to all students, regardless of background. Advocate for equitable access and diverse representation.',
  },
  {
    icon: Lightbulb,
    color: '#8B7355',
    bg: 'rgba(139,115,85,0.08)',
    title: 'Innovation & Adaptability',
    desc: 'Embrace change and seek new approaches to education and partnership. Continuously learn, adapt to emerging trends, and pioneer solutions.',
  },
  {
    icon: Handshake,
    color: '#8B7355',
    bg: 'rgba(139,115,85,0.08)',
    title: 'Collaboration & Integrity',
    desc: 'Build partnerships on trust, transparency, and mutual benefit. Operate with honesty and ethical commitment in all institutional relationships.',
  },
  {
    icon: Globe,
    color: '#4A6B8A',
    bg: 'rgba(74,107,138,0.08)',
    title: 'Global Citizenship',
    desc: 'Foster cross-cultural understanding and respect for diverse perspectives. Empower students to become engaged global citizens contributing to a better world.',
  },
  {
    icon: Zap,
    color: '#8B7355',
    bg: 'rgba(139,115,85,0.08)',
    title: 'Student-Centered Approach',
    desc: 'Every decision prioritizes student success, well-being, and personal growth. Listen to student voices and create supportive environments for learning.',
  },
]

export default function Values() {
  return (
    <div style={{ background: '#FAFAF8', minHeight: '100vh' }}>
      <div className="max-w-6xl mx-auto px-6" style={{ paddingTop: '48px', paddingBottom: '72px' }}>
        <Link href="/about-overview" className="flex items-center gap-2 mb-6" style={{ color: '#1E3A5F', textDecoration: 'none' }}>
          <ArrowLeft style={{ width: 16, height: 16 }} /> Back
        </Link>
        <div className="flex items-center gap-3 mb-4">
          <span className="accent-line" />
          <span className="text-sm font-semibold" style={{ color: '#1E3A5F' }}>Core Values</span>
        </div>
        <h1 className="font-heading font-bold text-4xl mb-2" style={{ color: '#1C1C1E' }}>Professional Values</h1>
        <p className="text-lg mb-12" style={{ color: '#5C5C5C' }}>Principles that guide my work and decisions in international education</p>
        <div className="grid md:grid-cols-2 gap-6">
          {values.map(v => (
            <div key={v.title} className="card p-8">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4" style={{ background: v.bg }}>
                <v.icon style={{ width: 24, height: 24, color: v.color }} />
              </div>
              <h3 className="font-heading font-bold text-lg mb-3" style={{ color: '#1C1C1E' }}>{v.title}</h3>
              <p style={{ color: '#5C5C5C' }}>{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
