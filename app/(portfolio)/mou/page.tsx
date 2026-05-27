import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, FileCheck, Clock, CheckCircle, AlertCircle, FileText } from 'lucide-react'

export const metadata: Metadata = {
  title: 'MoU / MoA Coordination — Zefanya Kharisma Nugroho',
  description: 'MoU and MoA agreement management at Petra Christian University International Office.',
}

const workflow = [
  { step: '01', title: 'Agreement Receipt', desc: 'Receiving draft MoU/MoA documents from partner universities or internal stakeholders — logging to the agreement tracking system with metadata.', icon: FileText, color: '#1E3A5F' },
  { step: '02', title: 'Review & Analysis', desc: 'Clause-by-clause review for compliance with university standards — checking scope, duration, renewal clauses, financial obligations, and IP provisions.', icon: FileCheck, color: '#4A6B8A' },
  { step: '03', title: 'Stakeholder Coordination', desc: 'Routing documents to relevant faculties, legal counsel, and institutional leadership for review — managing feedback loops and revision requests.', icon: AlertCircle, color: '#8B7355' },
  { step: '04', title: 'Approval & Signing', desc: 'Coordinating signatory scheduling, witnessing, and notarization where required — managing both digital and physical signing processes.', icon: CheckCircle, color: '#064E3B' },
  { step: '05', title: 'Archiving & Tracking', desc: 'Maintaining the master agreement database with renewal dates, active status, and linked program activities — monitoring for approaching expiry.', icon: Clock, color: '#D4B15A' },
]

export default function MouPage() {
  return (
    <div style={{ background: '#F2F2F7', minHeight: '100vh' }}>
      <div style={{ background: 'linear-gradient(135deg,#0D2137 0%,#1E3A5F 55%,#2E5A8A 100%)', padding: '64px 24px 52px' }}>
        <div className="max-w-4xl mx-auto">
          <Link href="/engagement" className="inline-flex items-center gap-2 mb-7 px-3.5 py-1.5 rounded-full text-sm font-medium" style={{ background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(12px)', color: 'rgba(255,255,255,0.85)', textDecoration: 'none', border: '1px solid rgba(255,255,255,0.16)' }}>
            <ArrowLeft style={{ width: 14, height: 14 }} /> Back
          </Link>
          <span className="inline-block px-3.5 py-1 rounded-full text-xs font-semibold mb-4 uppercase tracking-wider" style={{ background: 'rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.85)', border: '1px solid rgba(255,255,255,0.15)' }}>International Education</span>
          <h1 className="font-heading font-bold text-white mb-4" style={{ fontSize: 'clamp(1.9rem,5vw,3rem)', letterSpacing: '-.025em', lineHeight: 1.1 }}>MoU / MoA Coordination</h1>
          <p style={{ fontSize: '.9rem', color: 'rgba(255,255,255,0.68)', lineHeight: 1.74, maxWidth: 520 }}>
            Reviewing 25+ Memorandum of Understanding and Memorandum of Agreement documents monthly — ensuring institutional compliance and managing the full agreement lifecycle.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14">
          {[
            { value: '25+', label: 'Documents reviewed / month', color: '#1E3A5F' },
            { value: '30+', label: 'Active agreements', color: '#8B7355' },
            { value: '2+ yrs', label: 'Coordination experience', color: '#4A6B8A' },
            { value: '100%', label: 'Renewal compliance rate', color: '#064E3B' },
          ].map(s => (
            <div key={s.label} className="card p-5 text-center" style={{ borderTop: `3px solid ${s.color}` }}>
              <div className="font-heading font-bold" style={{ fontSize: '1.35rem', color: '#1C1C1E' }}>{s.value}</div>
              <div style={{ fontSize: '.72rem', color: '#767676', marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div className="card p-8 mb-10" style={{ borderLeft: '4px solid #1E3A5F' }}>
          <h2 className="font-heading font-bold text-xl mb-4" style={{ color: '#1C1C1E' }}>Overview</h2>
          <p className="text-sm leading-relaxed mb-3" style={{ color: '#5C5C5C' }}>
            Institutional agreements are the legal and strategic foundation of every international partnership. At PCU International Office, managing this agreement portfolio meant handling documents in English, Indonesian, and occasionally other languages — reviewing for compliance with both university policy and Indonesian law.
          </p>
          <p className="text-sm leading-relaxed" style={{ color: '#5C5C5C' }}>
            I maintained a tracking system for all active agreements — monitoring validity periods, flagging upcoming renewals, and coordinating the internal approval chain across faculties, the rector&apos;s office, and legal counsel.
          </p>
        </div>

        <h2 className="font-heading font-bold text-xl mb-6" style={{ color: '#1C1C1E' }}>Agreement Workflow</h2>
        <div className="space-y-4">
          {workflow.map(w => (
            <div key={w.step} className="card p-6 flex gap-5" style={{ borderLeft: `3px solid ${w.color}` }}>
              <div className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${w.color}12` }}>
                <w.icon style={{ width: 18, height: 18, color: w.color }} />
              </div>
              <div>
                <div style={{ fontSize: '.6rem', fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: w.color, marginBottom: 3 }}>{w.step}</div>
                <h3 className="font-heading font-semibold text-sm mb-1" style={{ color: '#1C1C1E' }}>{w.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#5C5C5C' }}>{w.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
