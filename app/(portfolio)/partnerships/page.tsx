import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Globe, Building2, BookOpen, Microscope, Users, Layers, Search, Handshake, FileCheck, TrendingUp, MapPin, FileText } from 'lucide-react'
import PartnerDirectory from '@/components/projects/PartnerDirectory'

export const metadata: Metadata = {
  title: 'Partnership Development — Zefanya Kharisma Nugroho',
  description: 'Managing 505+ institutional partnerships across 32 countries and 52 domestic cities at Petra Christian University.',
}

export default function PartnershipsPage() {
  return (
    <div style={{ background: '#FAFAF8', minHeight: '100vh' }}>

      {/* ── Hero ── */}
      <div style={{ background: 'linear-gradient(160deg,#1C1C1E 0%,#1E3A5F 55%,#2C4A72 100%)', padding: 'clamp(48px,8vh,72px) 24px 0', position: 'relative', overflow: 'hidden' }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 85% 20%,rgba(139,115,85,0.18),transparent 55%)' }} />
        <div className="absolute -right-16 -top-16 w-80 h-80 rounded-full pointer-events-none" style={{ border: '1px solid rgba(255,255,255,0.04)' }} />
        <div className="max-w-6xl mx-auto relative" style={{ zIndex: 10 }}>
          <Link href="/engagement" style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 32, color: 'rgba(255,255,255,0.45)', fontSize: '.8rem', fontWeight: 500, textDecoration: 'none' }}>
            <ArrowLeft style={{ width: 15, height: 15 }} /> Back
          </Link>
          <div className="label-small mb-3" style={{ color: 'rgba(255,255,255,0.35)', letterSpacing: '.12em' }}>Global Partnerships</div>
          <h1 className="font-heading font-bold mb-4" style={{ fontSize: 'clamp(2rem,5vw,3.5rem)', lineHeight: 1.05, color: '#fff', letterSpacing: '-.02em' }}>
            Partnership<br /><em style={{ fontStyle: 'italic', color: '#8B7355' }}>Development</em>
          </h1>
          <p className="max-w-2xl mb-8" style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1rem', lineHeight: 1.7 }}>
            Managing 30+ institutional partners and facilitating 15+ strategic meetings per month at Petra Christian University — building collaborations that drive academic excellence and global opportunity.
          </p>
          <div className="flex flex-wrap gap-8 pb-8">
            {[['505+','Total Partners'],['15+','Meetings/Month'],['32','Countries'],['52','Domestic Cities']].map(([val, label]) => (
              <div key={label}>
                <p className="font-heading font-bold text-2xl" style={{ color: '#8B7355' }}>{val}</p>
                <p className="label-small" style={{ color: 'rgba(255,255,255,0.35)' }}>{label}</p>
              </div>
            ))}
          </div>
          {/* Tab nav */}
          <div className="flex gap-0 border-t" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
            <Link href="/engagement" style={{ color: 'rgba(255,255,255,0.45)', fontSize: '.75rem', fontWeight: 500, padding: '12px 20px', borderBottom: '2px solid transparent', background: 'transparent', cursor: 'pointer', textDecoration: 'none', display: 'block' }}>Overview</Link>
            <Link href="/onboarding" style={{ color: 'rgba(255,255,255,0.45)', fontSize: '.75rem', fontWeight: 500, padding: '12px 20px', borderBottom: '2px solid transparent', background: 'transparent', cursor: 'pointer', textDecoration: 'none', display: 'block' }}>Student Support</Link>
            <span style={{ color: '#fff', fontSize: '.75rem', fontWeight: 600, padding: '12px 20px', borderBottom: '2px solid #8B7355', background: 'transparent', cursor: 'default', display: 'block' }}>Partnership Dev</span>
            <Link href="/mou" style={{ color: 'rgba(255,255,255,0.45)', fontSize: '.75rem', fontWeight: 500, padding: '12px 20px', borderBottom: '2px solid transparent', background: 'transparent', cursor: 'pointer', textDecoration: 'none', display: 'block' }}>MoU / MoA</Link>
          </div>
        </div>
      </div>

      {/* ── Institutional Reach ── */}
      <div style={{ padding: '72px 24px 48px', background: '#FAFAF8' }}>
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-6"><span className="accent-line" /><span className="label-small">Partnership Network</span></div>
          <h2 className="font-heading font-bold text-3xl mb-3" style={{ color: '#1C1C1E' }}>Institutional Reach at PCU</h2>
          <p className="text-base max-w-3xl mb-10" style={{ color: '#5C5C5C' }}>PCU&apos;s portfolio spans two distinct tracks — global academic institutions and domestic organizations across Indonesia — both of which I help coordinate, manage, and grow.</p>
          <div className="grid md:grid-cols-2 gap-8">
            {/* International card */}
            <div className="card rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(28,28,30,0.08)' }}>
              <div className="p-6 pb-5" style={{ background: 'linear-gradient(135deg,#1E3A5F 0%,#2C4A72 100%)' }}>
                <div className="flex items-center gap-2 mb-3">
                  <Globe style={{ width: 18, height: 18, color: 'rgba(255,255,255,0.6)' }} />
                  <span style={{ fontSize: '.7rem', fontWeight: 600, letterSpacing: '.1em', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase' as const }}>International</span>
                </div>
                <h3 className="font-heading font-bold text-xl mb-1" style={{ color: '#fff' }}>International Partnerships</h3>
                <p className="text-sm" style={{ color: 'rgba(255,255,255,0.55)' }}>Academic institutions spanning 4 continents</p>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {[['184','Institutions'],['32','Countries'],['4','Continents']].map(([n, l], i) => (
                    <div key={l} className="text-center" style={i > 0 ? { borderLeft: '1px solid rgba(28,28,30,0.08)' } : {}}>
                      <p className="font-heading font-bold text-3xl mb-0.5" style={{ color: '#1E3A5F' }}>{n}</p>
                      <p className="text-xs" style={{ color: '#5C5C5C' }}>{l}</p>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {['Asia','Europe','North America','Australia'].map(r => (
                    <div key={r} className="flex items-center gap-2 px-3 py-2 rounded-lg" style={{ background: 'rgba(30,58,95,0.05)' }}>
                      <MapPin style={{ width: 13, height: 13, color: '#1E3A5F', flexShrink: 0 }} />
                      <span className="text-xs font-medium" style={{ color: '#1C1C1E' }}>{r}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* Domestic card */}
            <div className="card rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(28,28,30,0.08)' }}>
              <div className="p-6 pb-5" style={{ background: 'linear-gradient(135deg,#166534 0%,#0d9488 100%)' }}>
                <div className="flex items-center gap-2 mb-3">
                  <Building2 style={{ width: 18, height: 18, color: 'rgba(255,255,255,0.6)' }} />
                  <span style={{ fontSize: '.7rem', fontWeight: 600, letterSpacing: '.1em', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase' as const }}>Domestic</span>
                </div>
                <h3 className="font-heading font-bold text-xl mb-1" style={{ color: '#fff' }}>Domestic Partnerships</h3>
                <p className="text-sm" style={{ color: 'rgba(255,255,255,0.55)' }}>Organizations across cities throughout Indonesia</p>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {[['321','Total Partners'],['52','Cities'],['5','Partner Types']].map(([n, l], i) => (
                    <div key={l} className="text-center" style={i > 0 ? { borderLeft: '1px solid rgba(28,28,30,0.08)' } : {}}>
                      <p className="font-heading font-bold text-3xl mb-0.5" style={{ color: '#166534' }}>{n}</p>
                      <p className="text-xs" style={{ color: '#5C5C5C' }}>{l}</p>
                    </div>
                  ))}
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 px-3 py-2 rounded-lg" style={{ background: 'rgba(22,101,52,0.05)' }}>
                    <Layers style={{ width: 13, height: 13, color: '#166534', flexShrink: 0 }} />
                    <span className="text-xs font-medium" style={{ color: '#1C1C1E' }}>Industry, Education, Government & Regional Organizations</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-2 rounded-lg" style={{ background: 'rgba(22,101,52,0.05)' }}>
                    <FileText style={{ width: 13, height: 13, color: '#166534', flexShrink: 0 }} />
                    <span className="text-xs font-medium" style={{ color: '#1C1C1E' }}>MoU, MoA, IA/IR & Strategic Collaboration Frameworks</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Collaboration Areas ── */}
      <div style={{ padding: '48px 24px', background: '#FAFAF8' }}>
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-6"><span className="accent-line" /><span className="label-small">Collaboration Areas</span></div>
          <h2 className="font-heading font-bold text-3xl mb-3" style={{ color: '#1C1C1E' }}>What the Partnerships Enable</h2>
          <p className="text-base max-w-3xl mb-10" style={{ color: '#5C5C5C' }}>Across both tracks, partnerships unlock a wide range of academic and institutional opportunities — each designed to create mutual value and advance internationalisation goals.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { Icon: BookOpen,   color: '#1E3A5F', title: 'Student Exchange',         desc: 'Semester abroad, dual-degree, and degree-level mobility for students' },
              { Icon: Microscope, color: '#4A6B8A', title: 'Research Collaboration',    desc: 'Joint projects and interdisciplinary initiatives advancing knowledge' },
              { Icon: Users,      color: '#8B7355', title: 'Faculty Development',       desc: 'Teaching capacity, research mentoring, and professional growth' },
              { Icon: Layers,     color: '#059669', title: 'Curriculum Design',         desc: 'Joint program design and curriculum internationalisation' },
            ].map(c => (
              <div key={c.title} className="card p-6 rounded-2xl" style={{ border: '1px solid rgba(28,28,30,0.08)' }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: `${c.color}12` }}>
                  <c.Icon style={{ width: 20, height: 20, color: c.color }} />
                </div>
                <p className="font-heading font-semibold mb-1.5" style={{ color: '#1C1C1E' }}>{c.title}</p>
                <p className="text-sm leading-relaxed" style={{ color: '#5C5C5C' }}>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── How I Build ── */}
      <div style={{ padding: '48px 24px', background: '#FAFAF8' }}>
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-6"><span className="accent-line" /><span className="label-small">My Approach</span></div>
          <h2 className="font-heading font-bold text-3xl mb-3" style={{ color: '#1C1C1E' }}>How I Build Partnerships</h2>
          <p className="text-base max-w-3xl mb-10" style={{ color: '#5C5C5C' }}>A four-phase approach I apply to identify, formalise, and sustain institutional collaborations — ensuring every partnership creates lasting value on both sides.</p>
          <div className="grid md:grid-cols-2 gap-5">
            {[
              { n:'01', Icon: Search,     color:'#1E3A5F', title:'Strategic Identification',  desc:'Identifying partner institutions aligned with PCU\'s mission and academic strengths through rigorous evaluation and due diligence' },
              { n:'02', Icon: Handshake,  color:'#4A6B8A', title:'Engagement & Negotiation',  desc:'Building relationships and negotiating terms that benefit both institutions and advance shared educational goals' },
              { n:'03', Icon: FileCheck,  color:'#8B7355', title:'Program Development',       desc:'Co-designing exchange programs, research collaborations, and joint curriculum initiatives with partner institutions' },
              { n:'04', Icon: TrendingUp, color:'#059669', title:'Activation & Growth',       desc:'Implementing programs, monitoring progress, and fostering long-term partnership growth through continuous engagement' },
            ].map(s => (
              <div key={s.n} className="card p-7 rounded-2xl flex gap-5" style={{ border: '1px solid rgba(28,28,30,0.08)' }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: `${s.color}12` }}>
                  <s.Icon style={{ width: 20, height: 20, color: s.color }} />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-xs font-bold" style={{ color: s.color, letterSpacing: '.06em' }}>{s.n}</span>
                    <h3 className="font-heading font-bold text-base" style={{ color: '#1C1C1E' }}>{s.title}</h3>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: '#5C5C5C' }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Interactive Partner Directory ── */}
      <PartnerDirectory />

      {/* ── Closing Stats ── */}
      <div style={{ padding: '0 24px 80px', background: '#FAFAF8' }}>
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-8"><span className="accent-line" /><span className="label-small">Deeper Breakdown</span></div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { val:'8',    color:'#1E3A5F', title:'ASEAN Nations',            sub:'With active partnership agreements' },
              { val:'4',    color:'#4A6B8A', title:'Continents Covered',       sub:'Asia, Europe, Americas, Oceania' },
              { val:'40+',  color:'#8B7355', title:'Active MoU/MoA Agreements',sub:'Lifecycle-managed from draft to renewal' },
              { val:'3+',   color:'#059669', title:'Years Building the Network',sub:'At Petra Christian University' },
            ].map(s => (
              <div key={s.title} className="card rounded-2xl p-6 text-center" style={{ border: '1px solid rgba(28,28,30,0.08)' }}>
                <p className="font-heading font-bold mb-1" style={{ fontSize: '2.5rem', lineHeight: 1, color: s.color }}>{s.val}</p>
                <p className="text-sm font-medium mb-1" style={{ color: '#1C1C1E' }}>{s.title}</p>
                <p className="text-xs" style={{ color: '#9CA3AF' }}>{s.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  )
}
