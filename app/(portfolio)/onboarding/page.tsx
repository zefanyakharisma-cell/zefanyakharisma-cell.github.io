import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Plane, Heart, Users, Calendar, MapPin, Shield } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Student Mobility & Welfare — Zefanya Kharisma Nugroho',
  description: 'International student mobility programs and comprehensive welfare support at Petra Christian University.',
}

const mobilityPhases = [
  { num: '01', title: 'Pre-Departure Preparation', icon: Calendar, color: '#1E3A5F', items: ['Visa guidance and documentation checklist', 'Housing options briefing and room booking support', 'Academic pre-registration coordination', 'Pre-departure orientation (health, safety, culture)', 'Welcome package and program handbook distribution'] },
  { num: '02', title: 'Arrival & Registration', icon: Plane, color: '#4A6B8A', items: ['Airport pick-up coordination and volunteer briefing', 'Check-in logistics and room allocation', 'Campus orientation tour', 'Administrative registration (student ID, library, etc.)', 'Local SIM card and banking guidance'] },
  { num: '03', title: 'Welfare Support', icon: Heart, color: '#064E3B', items: ['Health insurance enrollment and claims guidance', 'Healthcare facility navigation', 'Immigration reporting compliance (national police report)', 'Emergency contact management', 'Regular welfare check-ins throughout semester'] },
  { num: '04', title: 'Community Integration', icon: Users, color: '#8B7355', items: ['Buddy pairing with local student volunteers', 'ACI cultural immersion activity coordination', 'International student community events', 'Support groups and peer mentoring', 'City orientation and transportation guidance'] },
  { num: '05', title: 'Post-Program Completion', icon: Shield, color: '#D4B15A', items: ['Transcript request coordination with academic offices', 'Immigration departure reporting', 'Program evaluation survey administration', 'Partner university completion reporting', 'Alumni network introduction and follow-up'] },
]

export default function OnboardingPage() {
  return (
    <div style={{ background: '#F2F2F7', minHeight: '100vh' }}>
      <div style={{ background: 'linear-gradient(135deg,#0D2137 0%,#1E3A5F 55%,#2E5A8A 100%)', padding: '64px 24px 52px', position: 'relative', overflow: 'hidden' }}>
        <div className="relative z-10 max-w-4xl mx-auto">
          <Link href="/engagement" className="inline-flex items-center gap-2 mb-7 px-3.5 py-1.5 rounded-full text-sm font-medium" style={{ background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(12px)', color: 'rgba(255,255,255,0.85)', textDecoration: 'none', border: '1px solid rgba(255,255,255,0.16)' }}>
            <ArrowLeft style={{ width: 14, height: 14 }} /> Back
          </Link>
          <span className="inline-block px-3.5 py-1 rounded-full text-xs font-semibold mb-4 uppercase tracking-wider" style={{ background: 'rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.85)', border: '1px solid rgba(255,255,255,0.15)' }}>International Education</span>
          <h1 className="font-heading font-bold text-white mb-4" style={{ fontSize: 'clamp(1.9rem,5vw,3rem)', letterSpacing: '-.025em', lineHeight: 1.1 }}>Student Mobility &amp; Welfare</h1>
          <p style={{ fontSize: '.9rem', color: 'rgba(255,255,255,0.68)', lineHeight: 1.74, maxWidth: 520 }}>
            End-to-end international student coordination — from pre-departure to post-program completion — for 100+ international students per semester.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
          {[
            { icon: Users, value: '100+', label: 'Students / semester', color: '#1E3A5F' },
            { icon: Plane, value: '5+', label: 'Exchange programs', color: '#4A6B8A' },
            { icon: MapPin, value: '20+', label: 'Source countries', color: '#8B7355' },
          ].map(s => (
            <div key={s.label} className="card p-6 text-center" style={{ borderTop: `3px solid ${s.color}` }}>
              <s.icon style={{ width: 20, height: 20, color: s.color, margin: '0 auto 8px' }} />
              <div className="font-heading font-bold" style={{ fontSize: '1.4rem', color: '#1C1C1E' }}>{s.value}</div>
              <div style={{ fontSize: '.72rem', color: '#767676', marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div className="space-y-5">
          {mobilityPhases.map(p => (
            <div key={p.num} className="card p-7" style={{ borderLeft: `4px solid ${p.color}` }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${p.color}12` }}>
                  <p.icon style={{ width: 18, height: 18, color: p.color }} />
                </div>
                <div>
                  <span style={{ fontSize: '.62rem', fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: p.color }}>{p.num}</span>
                  <h3 className="font-heading font-bold text-base" style={{ color: '#1C1C1E' }}>{p.title}</h3>
                </div>
              </div>
              <ul className="space-y-1.5">
                {p.items.map(item => (
                  <li key={item} className="flex items-center gap-2 text-sm" style={{ color: '#5C5C5C' }}>
                    <span style={{ width: 4, height: 4, borderRadius: '50%', background: p.color, flexShrink: 0, display: 'inline-block' }} />
                    {item}
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
