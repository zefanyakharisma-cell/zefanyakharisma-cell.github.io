import type { Metadata } from 'next'
import Link from 'next/link'
import { LogIn, HeartHandshake, Handshake, FileText, Award, ArrowRight, Users, Globe, Calendar, FileCheck } from 'lucide-react'

export const metadata: Metadata = {
  title: 'International Education',
  alternates: { canonical: '/engagement' },
  description: 'Supporting 480+ international students across welfare, mobility, engagement, and partnership programs at Airlangga Global Engagement and Petra Christian University.',
}

const AREA_CARDS = [
  {
    href: '/onboarding',
    gradient: 'linear-gradient(135deg,#1E3A5F,#2C4A72)',
    Icon: LogIn,
    accentColor: '#1E3A5F',
    title: 'International Student Support',
    desc: 'Holistic care for 480+ students from arrival to departure — visa, welfare, scholarships, and peer mentoring.',
    tags: ['Airport Pick-Up', 'Immigration', 'Welfare', 'Best Buddies'],
    cta: 'Explore Program',
  },
  {
    href: '/onboarding',
    gradient: 'linear-gradient(135deg,#064E3B,#059669)',
    Icon: HeartHandshake,
    accentColor: '#059669',
    title: 'Student Engagement',
    desc: 'Creating meaningful cultural experiences through immersion programs, community engagement, and experiential learning.',
    tags: ['City Tour', 'Cultural Events', 'Volunteering', 'Best Buddies'],
    cta: 'Explore Initiatives',
  },
  {
    href: '/partnerships',
    gradient: 'linear-gradient(135deg,#2D3B1F,#4A5235)',
    Icon: Handshake,
    accentColor: '#4A5235',
    title: 'Partnership Development',
    desc: 'Managing 30+ institutional partners and facilitating 15+ strategic meetings per month at PCU.',
    tags: ['Research', 'Exchange', 'Faculty Dev', 'Curriculum'],
    cta: 'Explore Partnerships',
  },
  {
    href: '/mou',
    gradient: 'linear-gradient(135deg,#3B0764,#7C3AED)',
    Icon: FileText,
    accentColor: '#7C3AED',
    title: 'MoU / MoA Coordination',
    desc: 'Reviewing 25+ partnership agreements per month — ensuring compliance, alignment, and timely processing.',
    tags: ['Drafting', 'Compliance', 'Renewals', 'Monitoring'],
    cta: 'View Portfolio',
  },
  {
    href: '/intl-grants',
    gradient: 'linear-gradient(135deg,#064E3B,#D97706)',
    Icon: Award,
    accentColor: '#D97706',
    title: 'International Grants',
    desc: 'Building a system to inform, maintain, and execute international grants at PCU — digitally and physically.',
    tags: ['In Development', 'Grant Dashboard', 'PCU', 'Digital + Physical'],
    cta: 'View System',
  },
]

export default function EngagementPage() {
  return (
    <div style={{ background: '#FAFAF8', minHeight: '100vh' }}>

      {/* ── Hero ── */}
      <div style={{ background: 'linear-gradient(160deg,#1C1C1E 0%,#1E3A5F 55%,#2C4A72 100%)', padding: 'clamp(48px,8vh,72px) 24px 0', position: 'relative', overflow: 'hidden' }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 85% 20%,rgba(139,115,85,0.18),transparent 55%)' }} />
        <div className="absolute -right-16 -top-16 w-80 h-80 rounded-full pointer-events-none" style={{ border: '1px solid rgba(255,255,255,0.04)' }} />
        <div className="max-w-6xl mx-auto relative" style={{ zIndex: 10 }}>
          <div className="label-small mb-3" style={{ color: 'rgba(255,255,255,0.35)', letterSpacing: '.12em' }}>International Education</div>
          <h1 className="font-heading font-bold mb-4" style={{ fontSize: 'clamp(2rem,5vw,3.5rem)', lineHeight: 1.05, color: '#fff', letterSpacing: '-.02em' }}>
            Building Global Connections,<br /><em style={{ fontStyle: 'italic', color: '#8B7355' }}>One Student at a Time</em>
          </h1>
          <p className="max-w-2xl mb-8" style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1rem', lineHeight: 1.7 }}>
            A track record of supporting 480+ international students across welfare, mobility, and engagement programs — through holistic roles at Airlangga Global Engagement and Petra Christian University.
          </p>
          <div className="flex flex-wrap gap-8 pb-8">
            {[['480+','Students'],['30+','Partners'],['25+','MoUs Monthly'],['5','Programs']].map(([val, label]) => (
              <div key={label}>
                <p className="font-heading font-bold text-2xl" style={{ color: '#8B7355' }}>{val}</p>
                <p className="label-small" style={{ color: 'rgba(255,255,255,0.35)' }}>{label}</p>
              </div>
            ))}
          </div>
          {/* Tab nav */}
          <div className="flex gap-0 border-t" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
            <Link href="/onboarding" style={{ color: 'rgba(255,255,255,0.45)', fontSize: '.75rem', fontWeight: 500, padding: '12px 20px', borderBottom: '2px solid transparent', background: 'transparent', textDecoration: 'none', display: 'block' }}>Student Support</Link>
            <Link href="/onboarding" style={{ color: 'rgba(255,255,255,0.45)', fontSize: '.75rem', fontWeight: 500, padding: '12px 20px', borderBottom: '2px solid transparent', background: 'transparent', textDecoration: 'none', display: 'block' }}>Student Engagement</Link>
            <Link href="/partnerships" style={{ color: 'rgba(255,255,255,0.45)', fontSize: '.75rem', fontWeight: 500, padding: '12px 20px', borderBottom: '2px solid transparent', background: 'transparent', textDecoration: 'none', display: 'block' }}>Partnerships</Link>
            <Link href="/mou" style={{ color: 'rgba(255,255,255,0.45)', fontSize: '.75rem', fontWeight: 500, padding: '12px 20px', borderBottom: '2px solid transparent', background: 'transparent', textDecoration: 'none', display: 'block' }}>MoU / MoA</Link>
            <Link href="/intl-grants" style={{ color: 'rgba(255,255,255,0.45)', fontSize: '.75rem', fontWeight: 500, padding: '12px 20px', borderBottom: '2px solid transparent', background: 'transparent', textDecoration: 'none', display: 'block' }}>Intl. Grants</Link>
          </div>
        </div>
      </div>

      {/* ── Five Pillars Cards ── */}
      <div style={{ padding: '72px 24px', background: '#FAFAF8' }}>
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-10"><span className="accent-line" /><span className="label-small">Areas of Work</span></div>
          <h2 className="font-heading font-bold text-3xl mb-4" style={{ color: '#1C1C1E' }}>Five Pillars of International Education</h2>
          <p className="text-base max-w-3xl mb-10" style={{ color: '#5C5C5C' }}>From welcoming students at the airport to formalizing global partnerships and building grant systems — each area represents a critical dimension of international education management.</p>
          <div className="grid md:grid-cols-2 gap-6">
            {AREA_CARDS.map(c => (
              <Link key={c.title} href={c.href} className="card rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1" style={{ border: '1px solid rgba(28,28,30,0.08)', textDecoration: 'none', display: 'block' }}>
                <div className="p-6 relative overflow-hidden" style={{ background: c.gradient }}>
                  <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 80% 20%,rgba(255,255,255,0.08),transparent 60%)' }} />
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 relative" style={{ zIndex: 10, background: 'rgba(255,255,255,0.12)' }}>
                    <c.Icon style={{ width: 24, height: 24, color: '#fff' }} />
                  </div>
                  <h3 className="font-heading font-bold text-xl mb-2 relative" style={{ zIndex: 10, color: '#fff' }}>{c.title}</h3>
                  <p className="text-sm relative" style={{ zIndex: 10, color: 'rgba(255,255,255,0.7)' }}>{c.desc}</p>
                </div>
                <div className="p-6">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {c.tags.map(t => <span key={t} className="tag">{t}</span>)}
                  </div>
                  <div className="flex items-center gap-1.5" style={{ color: c.accentColor }}>
                    <span className="text-xs font-semibold">{c.cta}</span>
                    <ArrowRight style={{ width: 13, height: 13 }} />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Bottom Stats Row */}
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 mt-16 pt-12 border-t" style={{ borderColor: 'rgba(28,28,30,0.1)' }}>
            {[
              { Icon: Users,     color:'#059669', val:'480+', label:'Students Supported' },
              { Icon: Globe,     color:'#1E3A5F', val:'30+',  label:'Institutional Partners' },
              { Icon: Calendar,  color:'#8B7355', val:'15+',  label:'Meetings / Month' },
              { Icon: FileCheck, color:'#7C3AED', val:'25+',  label:'Agreements / Month' },
            ].map(s => (
              <div key={s.label} className="card p-6 rounded-2xl text-center" style={{ border: '1px solid rgba(28,28,30,0.08)' }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-3 mx-auto" style={{ background: `${s.color}14` }}>
                  <s.Icon style={{ width: 24, height: 24, color: s.color }} />
                </div>
                <p className="font-heading font-bold text-3xl mb-1" style={{ color: '#1C1C1E' }}>{s.val}</p>
                <p className="text-sm" style={{ color: '#5C5C5C' }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  )
}
