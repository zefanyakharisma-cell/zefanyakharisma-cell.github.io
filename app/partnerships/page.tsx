import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Handshake, Globe2, FileCheck, BarChart2 } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Institutional Partnerships — Zefanya Kharisma Nugroho',
  description: 'Managing 30+ institutional partnerships across Asia, Europe, and the Americas at Petra Christian University.',
}

const regions = [
  { region: 'Asia Pacific', color: '#1E3A5F', partners: ['Griffith University (Australia)', 'Liverpool John Moores University (UK)', 'Staffordshire University (UK)', 'University of Applied Sciences (Germany)', 'Keio University (Japan)', 'Chulalongkorn University (Thailand)'] },
  { region: 'Europe', color: '#4A6B8A', partners: ['University of Warsaw (Poland)', 'Universidad de Salamanca (Spain)', 'Sapienza University of Rome (Italy)', 'University of Helsinki (Finland)', 'Radboud University (Netherlands)', 'Budapest Metropolitan University (Hungary)'] },
  { region: 'Americas', color: '#8B7355', partners: ['University of California system (USA)', 'Pontificia Universidad Católica (Chile)', 'Universidad de los Andes (Colombia)', 'York University (Canada)', 'Tecnológico de Monterrey (Mexico)', 'University of São Paulo (Brazil)'] },
]

const responsibilities = [
  { icon: Handshake, title: 'Relationship Management', desc: 'Maintaining active correspondence with 30+ partner universities — responding to inquiries, coordinating joint activities, and managing ongoing partnership commitments.', color: '#1E3A5F' },
  { icon: Globe2, title: 'Partnership Development', desc: 'Identifying prospective partners aligned with institutional priorities, preparing partnership proposals, and leading initial outreach and negotiation.', color: '#4A6B8A' },
  { icon: FileCheck, title: 'MoU/MoA Processing', desc: 'Reviewing 25+ MoU and MoA documents monthly — tracking renewal dates, coordinating approvals, and maintaining the partnership agreement database.', color: '#8B7355' },
  { icon: BarChart2, title: 'Partnership Analytics', desc: 'Monitoring partnership activity levels, exchange volumes, and mutual benefit metrics — reporting quarterly to institutional leadership.', color: '#064E3B' },
]

export default function PartnershipsPage() {
  return (
    <div style={{ background: '#F2F2F7', minHeight: '100vh' }}>
      <div style={{ background: 'linear-gradient(135deg,#0D2137 0%,#1E3A5F 55%,#2E5A8A 100%)', padding: '64px 24px 52px' }}>
        <div className="max-w-4xl mx-auto">
          <Link href="/engagement" className="inline-flex items-center gap-2 mb-7 px-3.5 py-1.5 rounded-full text-sm font-medium" style={{ background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(12px)', color: 'rgba(255,255,255,0.85)', textDecoration: 'none', border: '1px solid rgba(255,255,255,0.16)' }}>
            <ArrowLeft style={{ width: 14, height: 14 }} /> Back
          </Link>
          <span className="inline-block px-3.5 py-1 rounded-full text-xs font-semibold mb-4 uppercase tracking-wider" style={{ background: 'rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.85)', border: '1px solid rgba(255,255,255,0.15)' }}>International Education</span>
          <h1 className="font-heading font-bold text-white mb-4" style={{ fontSize: 'clamp(1.9rem,5vw,3rem)', letterSpacing: '-.025em', lineHeight: 1.1 }}>Institutional Partnerships</h1>
          <p style={{ fontSize: '.9rem', color: 'rgba(255,255,255,0.68)', lineHeight: 1.74, maxWidth: 520 }}>
            Managing Petra Christian University&apos;s global partner network — 30+ active institutional partnerships across Asia Pacific, Europe, and the Americas.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[
            { value: '30+', label: 'Active partners', color: '#1E3A5F' },
            { value: '25+', label: 'MoUs/month reviewed', color: '#8B7355' },
            { value: '15+', label: 'Meetings/month', color: '#4A6B8A' },
            { value: '3', label: 'Regions covered', color: '#064E3B' },
          ].map(s => (
            <div key={s.label} className="card p-5 text-center" style={{ borderTop: `3px solid ${s.color}` }}>
              <div className="font-heading font-bold" style={{ fontSize: '1.4rem', color: '#1C1C1E' }}>{s.value}</div>
              <div style={{ fontSize: '.72rem', color: '#767676', marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>

        <h2 className="font-heading font-bold text-xl mb-6" style={{ color: '#1C1C1E' }}>Responsibilities</h2>
        <div className="grid md:grid-cols-2 gap-4 mb-14">
          {responsibilities.map(r => (
            <div key={r.title} className="card p-6" style={{ borderLeft: `3px solid ${r.color}` }}>
              <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4" style={{ background: `${r.color}12` }}>
                <r.icon style={{ width: 20, height: 20, color: r.color }} />
              </div>
              <h3 className="font-heading font-semibold text-sm mb-2" style={{ color: '#1C1C1E' }}>{r.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: '#5C5C5C' }}>{r.desc}</p>
            </div>
          ))}
        </div>

        <h2 className="font-heading font-bold text-xl mb-6" style={{ color: '#1C1C1E' }}>Partner Network by Region</h2>
        <div className="grid md:grid-cols-3 gap-5">
          {regions.map(r => (
            <div key={r.region} className="card p-6" style={{ borderTop: `3px solid ${r.color}` }}>
              <h3 className="font-heading font-bold text-base mb-4" style={{ color: r.color }}>{r.region}</h3>
              <ul className="space-y-2">
                {r.partners.map(p => (
                  <li key={p} className="flex items-start gap-2 text-sm" style={{ color: '#5C5C5C' }}>
                    <span style={{ width: 5, height: 5, borderRadius: '50%', background: r.color, flexShrink: 0, marginTop: 6, display: 'inline-block' }} />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
