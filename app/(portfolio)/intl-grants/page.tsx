import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, DollarSign, Search, Calendar, FileCheck, Globe2 } from 'lucide-react'

export const metadata: Metadata = {
  title: 'International Grants — Zefanya Kharisma Nugroho',
  description: 'International grant and scholarship identification, tracking, and facilitation at Petra Christian University.',
}

const grants = [
  { name: 'LPDP (Lembaga Pengelola Dana Pendidikan)', type: 'National Scholarship', country: 'Indonesia', desc: 'Indonesia\'s premier graduate scholarship fund — supporting masters and doctoral studies at leading global universities.', color: '#1E3A5F' },
  { name: 'Fulbright Program', type: 'Bilateral Grant', country: 'USA–Indonesia', desc: 'U.S. government academic exchange program — supporting Indonesian students and scholars studying or researching in the United States.', color: '#8B7355' },
  { name: 'DAAD (Germany)', type: 'Bilateral Scholarship', country: 'Germany', desc: 'German Academic Exchange Service scholarships for Indonesian students pursuing graduate degrees at German universities.', color: '#4A6B8A' },
  { name: 'Erasmus+ Program', type: 'Regional Grant', country: 'European Union', desc: 'EU-funded program supporting student and staff mobility between Indonesian and European higher education institutions.', color: '#064E3B' },
  { name: 'Australia Awards', type: 'Bilateral Scholarship', country: 'Australia', desc: 'Australian government scholarships for Indonesian students — full graduate scholarships including living allowances and return airfare.', color: '#D4B15A' },
  { name: 'Korean Government Scholarship (GKS)', type: 'Bilateral Grant', country: 'South Korea', desc: 'South Korean government scholarship program for international students pursuing undergraduate, graduate, or research programs in Korea.', color: '#2563EB' },
]

const services = [
  { icon: Search, title: 'Grant Discovery', desc: 'Continuously monitoring bilateral, multilateral, and institutional funding opportunities — matching grants to faculty, research, and student profiles.', color: '#1E3A5F' },
  { icon: Calendar, title: 'Deadline Tracking', desc: 'Maintaining a rolling calendar of grant deadlines — proactively alerting relevant staff and students to upcoming application windows.', color: '#4A6B8A' },
  { icon: FileCheck, title: 'Application Support', desc: 'Guiding applicants through documentation requirements, statement of purpose preparation, and letter of recommendation coordination.', color: '#8B7355' },
  { icon: Globe2, title: 'Partner Coordination', desc: 'Liaising with partner universities and scholarship providers to clarify requirements, submit institutional endorsements, and track outcomes.', color: '#064E3B' },
]

export default function IntlGrantsPage() {
  return (
    <div style={{ background: '#F2F2F7', minHeight: '100vh' }}>
      <div style={{ background: 'linear-gradient(135deg,#0D2137 0%,#1E3A5F 55%,#2E5A8A 100%)', padding: '64px 24px 52px' }}>
        <div className="max-w-4xl mx-auto">
          <Link href="/engagement" className="inline-flex items-center gap-2 mb-7 px-3.5 py-1.5 rounded-full text-sm font-medium" style={{ background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(12px)', color: 'rgba(255,255,255,0.85)', textDecoration: 'none', border: '1px solid rgba(255,255,255,0.16)' }}>
            <ArrowLeft style={{ width: 14, height: 14 }} /> Back
          </Link>
          <span className="inline-block px-3.5 py-1 rounded-full text-xs font-semibold mb-4 uppercase tracking-wider" style={{ background: 'rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.85)', border: '1px solid rgba(255,255,255,0.15)' }}>International Education</span>
          <h1 className="font-heading font-bold text-white mb-4" style={{ fontSize: 'clamp(1.9rem,5vw,3rem)', letterSpacing: '-.025em', lineHeight: 1.1 }}>International Grants</h1>
          <p style={{ fontSize: '.9rem', color: 'rgba(255,255,255,0.68)', lineHeight: 1.74, maxWidth: 520 }}>
            Identifying, tracking, and facilitating international scholarship and grant applications — connecting institutional priorities with available bilateral and multilateral funding.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14">
          {[
            { icon: DollarSign, value: '10+', label: 'Grant programs tracked', color: '#1E3A5F' },
            { icon: Globe2, value: '6+', label: 'Source countries', color: '#8B7355' },
            { icon: Calendar, value: 'Year-round', label: 'Monitoring cadence', color: '#4A6B8A' },
            { icon: FileCheck, value: '1+ year', label: 'Grant coordination exp.', color: '#064E3B' },
          ].map(s => (
            <div key={s.label} className="card p-5 text-center" style={{ borderTop: `3px solid ${s.color}` }}>
              <s.icon style={{ width: 20, height: 20, color: s.color, margin: '0 auto 8px' }} />
              <div className="font-heading font-bold" style={{ fontSize: '1.35rem', color: '#1C1C1E' }}>{s.value}</div>
              <div style={{ fontSize: '.72rem', color: '#767676', marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>

        <h2 className="font-heading font-bold text-xl mb-6" style={{ color: '#1C1C1E' }}>What I Do</h2>
        <div className="grid md:grid-cols-2 gap-4 mb-14">
          {services.map(s => (
            <div key={s.title} className="card p-6" style={{ borderLeft: `3px solid ${s.color}` }}>
              <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4" style={{ background: `${s.color}12` }}>
                <s.icon style={{ width: 20, height: 20, color: s.color }} />
              </div>
              <h3 className="font-heading font-semibold text-sm mb-2" style={{ color: '#1C1C1E' }}>{s.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: '#5C5C5C' }}>{s.desc}</p>
            </div>
          ))}
        </div>

        <h2 className="font-heading font-bold text-xl mb-6" style={{ color: '#1C1C1E' }}>Key Grant Programs</h2>
        <div className="space-y-4">
          {grants.map(g => (
            <div key={g.name} className="card p-6" style={{ borderLeft: `3px solid ${g.color}` }}>
              <div className="flex items-start justify-between mb-1 flex-wrap gap-2">
                <h3 className="font-heading font-semibold text-sm" style={{ color: '#1C1C1E' }}>{g.name}</h3>
                <div className="flex gap-2">
                  <span className="tag" style={{ color: g.color, borderColor: `${g.color}30`, background: `${g.color}0D` }}>{g.type}</span>
                  <span className="tag">{g.country}</span>
                </div>
              </div>
              <p className="text-sm leading-relaxed mt-2" style={{ color: '#5C5C5C' }}>{g.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
