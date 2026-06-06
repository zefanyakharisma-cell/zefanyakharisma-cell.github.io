import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, GraduationCap, ShieldCheck, Heart, Globe, Award, Users, Share2, Calendar } from 'lucide-react'
import StudentActivities from '@/components/projects/StudentActivities'

export const metadata: Metadata = {
  title: 'International Student Support',
  alternates: { canonical: '/onboarding' },
  description: 'Holistic support for 480+ international students from arrival to departure — visa, welfare, scholarships, and peer mentoring at Airlangga Global Engagement.',
}

const KNB_GALLERY = [
  '/assets/images/student-services/09012025_KNB-Orientation/IMG_8467.jpeg',
  '/assets/images/student-services/09012025_KNB-Orientation/IMG_8471.jpeg',
  '/assets/images/student-services/09012025_KNB-Orientation/IMG_8478.jpeg',
  '/assets/images/student-services/09012025_KNB-Orientation/IMG_8484.jpeg',
  '/assets/images/student-services/09012025_KNB-Orientation/IMG_8504.jpeg',
  '/assets/images/student-services/09012025_KNB-Orientation/IMG_8510.jpeg',
  '/assets/images/student-services/09012025_KNB-Orientation/IMG_8513.jpeg',
]

const SUPPORT_CARDS = [
  { Icon: GraduationCap, color: '#1E3A5F', title: 'Academic Coordination', desc: 'Liaised with faculty and academic staff to ensure students\' course registrations, schedules, and academic obligations were smoothly managed throughout their program.' },
  { Icon: ShieldCheck, color: '#4A6B8A', title: 'Immigration & Visa Assistance', desc: 'Guided students through KITAS applications, extensions, and immigration reporting requirements — coordinating closely with visa staff to keep every student legally compliant.' },
  { Icon: Heart, color: '#8B7355', title: 'Student Welfare', desc: 'Provided personalized, responsive support for student wellbeing — from healthcare coordination and accommodation assistance to emotional support during difficult personal situations.' },
  { Icon: Globe, color: '#059669', title: 'Cross-Cultural Adaptation', desc: 'Helped students navigate cultural differences, language barriers, and Indonesian social norms — offering practical guidance on daily life, customs, and building meaningful local connections.' },
  { Icon: Award, color: '#7C3AED', title: 'Government Scholarship Administration', desc: 'Managed administrative obligations for KNB and TIAS scholarship holders — including progress monitoring, tax reporting support, and formal reporting to scholarship authorities.' },
  { Icon: Users, color: '#EA580C', title: 'Community & Peer Support', desc: 'Built an inclusive support community through the Best Buddies peer mentoring program — connecting international students with trained local mentors and organizing integration activities throughout the semester.' },
]

const AMERTA_NATIONS = [
  { name: 'Malaysia',     count: 87, pct: '100%' },
  { name: 'Philippines',  count: 49, pct: '56%' },
  { name: 'France',       count: 11, pct: '13%' },
  { name: 'Brunei',       count: 10, pct: '11%' },
  { name: 'Germany',      count: 9,  pct: '10%' },
  { name: 'Australia',    count: 6,  pct: '7%' },
  { name: 'Poland',       count: 6,  pct: '7%' },
  { name: 'Singapore',    count: 3,  pct: '3%' },
]

const INBOUND_NATIONS = [
  { name: 'Yemen',       count: 60, pct: '100%' },
  { name: 'Pakistan',    count: 55, pct: '92%' },
  { name: 'Timor-Leste', count: 27, pct: '45%' },
  { name: 'Myanmar',     count: 14, pct: '23%' },
  { name: 'Gambia',      count: 14, pct: '23%' },
  { name: 'Nigeria',     count: 10, pct: '17%' },
  { name: 'Sudan',       count: 9,  pct: '15%' },
  { name: 'Tanzania',    count: 9,  pct: '15%' },
]

export default function OnboardingPage() {
  return (
    <div style={{ background: '#FAFAF8', minHeight: '100vh' }}>

      {/* ── Hero ── */}
      <div style={{ position: 'relative', overflow: 'hidden', padding: 'clamp(48px,8vh,72px) 24px 0' }}>
        <img
          src="/assets/images/amerta/amerta/IMG_0578.JPG"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          style={{ zIndex: 0, objectPosition: 'center top' }}
        />
        <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1, background: 'linear-gradient(160deg,rgba(28,28,30,0.88) 0%,rgba(30,58,95,0.82) 55%,rgba(44,74,114,0.78) 100%)' }} />
        <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 2, background: 'radial-gradient(ellipse at 85% 20%,rgba(139,115,85,0.18),transparent 55%)' }} />
        <div className="absolute -right-16 -top-16 w-80 h-80 rounded-full pointer-events-none" style={{ zIndex: 2, border: '1px solid rgba(255,255,255,0.04)' }} />
        <div className="max-w-6xl mx-auto relative" style={{ zIndex: 10 }}>
          <Link href="/engagement" style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 32, color: 'rgba(255,255,255,0.45)', fontSize: '.8rem', fontWeight: 500, textDecoration: 'none' }}>
            <ArrowLeft style={{ width: 15, height: 15 }} /> Back
          </Link>
          <div className="label-small mb-3" style={{ color: 'rgba(255,255,255,0.35)', letterSpacing: '.12em' }}>Student Welfare &amp; Mobility</div>
          <h1 className="font-heading font-bold mb-4" style={{ fontSize: 'clamp(2rem,5vw,3.5rem)', lineHeight: 1.05, color: '#fff', letterSpacing: '-.02em' }}>
            International<br /><em style={{ fontStyle: 'italic', color: '#8B7355' }}>Student Support</em>
          </h1>
          <p className="max-w-2xl mb-8" style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1rem', lineHeight: 1.7 }}>
            From the moment students land to the day they depart — providing holistic support for 100+ international students per semester across academic, visa, welfare, and peer ecosystems in Indonesia.
          </p>
          <div className="flex flex-wrap gap-8 pb-8">
            {[['480+','Students'],['30+','Countries'],['10+','Stakeholder Types'],['4','AMERTA Batches']].map(([val, label]) => (
              <div key={label}>
                <p className="font-heading font-bold text-2xl" style={{ color: '#8B7355' }}>{val}</p>
                <p className="label-small" style={{ color: 'rgba(255,255,255,0.35)' }}>{label}</p>
              </div>
            ))}
          </div>
          {/* Tab nav */}
          <div className="flex gap-0 border-t" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
            <Link href="/engagement" style={{ color: 'rgba(255,255,255,0.45)', fontSize: '.75rem', fontWeight: 500, padding: '12px 20px', borderBottom: '2px solid transparent', background: 'transparent', textDecoration: 'none', display: 'block' }}>Overview</Link>
            <span style={{ color: '#fff', fontSize: '.75rem', fontWeight: 600, padding: '12px 20px', borderBottom: '2px solid #8B7355', background: 'transparent', cursor: 'default', display: 'block' }}>Student Support</span>
            <Link href="/onboarding" style={{ color: 'rgba(255,255,255,0.45)', fontSize: '.75rem', fontWeight: 500, padding: '12px 20px', borderBottom: '2px solid transparent', background: 'transparent', textDecoration: 'none', display: 'block' }}>Student Engagement</Link>
            <Link href="/partnerships" style={{ color: 'rgba(255,255,255,0.45)', fontSize: '.75rem', fontWeight: 500, padding: '12px 20px', borderBottom: '2px solid transparent', background: 'transparent', textDecoration: 'none', display: 'block' }}>Partnerships</Link>
          </div>
        </div>
      </div>

      {/* ── KNB Gallery Strip ── */}
      <div style={{ background: '#1C1C1E', padding: '16px 0' }}>
        <div className="flex gap-3 overflow-x-auto" style={{ padding: '0 24px', scrollSnapType: 'x mandatory', WebkitOverflowScrolling: 'touch' }}>
          {KNB_GALLERY.map((img, i) => (
            <img
              key={i}
              loading="lazy"
              src={img}
              alt=""
              className="gallery-photo rounded-xl flex-shrink-0 object-cover"
              style={{ height: 120, width: 'auto', maxWidth: 200, scrollSnapAlign: 'start' }}
            />
          ))}
        </div>
      </div>

      {/* ── Content ── */}
      <div style={{ padding: '72px 24px 72px', background: '#FAFAF8' }}>
        <div className="max-w-6xl mx-auto">

          {/* Support Ecosystem */}
          <div className="mb-20">
            <div className="flex items-center gap-3 mb-3"><span className="accent-line" /><span className="label-small" style={{ color: '#059669' }}>Holistic Support</span></div>
            <h2 className="font-heading font-bold text-3xl mb-4" style={{ color: '#1C1C1E' }}>Support Ecosystem</h2>
            <p className="text-base max-w-3xl mb-10" style={{ color: '#5C5C5C' }}>From the moment a student accepted their offer until the day they returned home, I worked across a multi-stakeholder ecosystem — collaborating with academic staff, visa teams, inbound mobility staff, international offices, and student buddies — to ensure every dimension of their Indonesia journey was holistically supported.</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {SUPPORT_CARDS.map(c => (
                <div key={c.title} className="card p-6 rounded-2xl hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5" style={{ border: '1px solid rgba(28,28,30,0.08)' }}>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: `${c.color}14` }}>
                    <c.Icon style={{ width: 24, height: 24, color: c.color }} />
                  </div>
                  <h3 className="font-heading font-semibold text-base mb-2" style={{ color: '#1C1C1E' }}>{c.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#5C5C5C' }}>{c.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Activities & Student Services */}
          <div className="mb-20">
            <div className="flex items-center gap-3 mb-3"><span className="accent-line" /><span className="label-small" style={{ color: '#059669' }}>What I Did</span></div>
            <h2 className="font-heading font-bold text-3xl mb-4" style={{ color: '#1C1C1E' }}>Activities &amp; Student Services</h2>
            <p className="text-base max-w-3xl mb-10" style={{ color: '#5C5C5C' }}>Each activity below represents a specific service or program I coordinated for international students — from their first day of arrival to their final farewell. Click on any card to learn more about my role, responsibilities, and impact.</p>
            <StudentActivities />
          </div>

          {/* Student Overview Data */}
          <div className="mb-20">
            <div className="flex items-center gap-3 mb-3"><span className="accent-line" /><span className="label-small" style={{ color: '#059669' }}>Data Overview</span></div>
            <h2 className="font-heading font-bold text-3xl mb-4" style={{ color: '#1C1C1E' }}>Student Overview</h2>
            <p className="text-base max-w-3xl mb-10" style={{ color: '#5C5C5C' }}>A data snapshot of the international students I supported across exchange programs, government scholarships, and inbound welfare services at Airlangga Global Engagement — based on records from all program batches.</p>

            {/* Program Cards */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
              {[
                { color: '#059669', Icon: Users, val: '193', label: 'AMERTA Exchange', sub: 'Batches 21–24 (2024–2027) · 15 countries', tags: [{ t: 'Batch 21: 34', c: '#059669' }, { t: 'Batch 22: 43', c: '#059669' }, { t: 'Batch 23: 67', c: '#059669' }, { t: 'Batch 24: 49', c: '#059669' }] },
                { color: '#7C3AED', Icon: Award, val: '27',  label: 'KNB Scholarship',  sub: 'Government-funded · 10+ countries · monitored & evaluated', tags: [{ t: 'Pakistan · Yemen', c: '#7C3AED' }, { t: 'Timor-Leste', c: '#7C3AED' }] },
                { color: '#EA580C', Icon: Award, val: '9',   label: 'TIAS Scholarship', sub: 'Government-funded · 5 countries · monitored & evaluated', tags: [{ t: 'Kenya · Nigeria', c: '#EA580C' }, { t: 'Zimbabwe', c: '#EA580C' }] },
                { color: '#1E3A5F', Icon: Users, val: '251', label: 'Inbound & Welfare', sub: 'All programs · 25+ countries · arrival to departure', tags: [{ t: 'Yemen · Pakistan', c: '#1E3A5F' }, { t: 'Timor-Leste', c: '#1E3A5F' }] },
              ].map(p => (
                <div key={p.label} className="card p-5 rounded-2xl" style={{ border: '1px solid rgba(28,28,30,0.08)' }}>
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-3" style={{ background: `${p.color}1A` }}>
                    <p.Icon style={{ width: 20, height: 20, color: p.color }} />
                  </div>
                  <p className="font-heading font-bold text-3xl mb-0.5" style={{ color: '#1C1C1E' }}>{p.val}</p>
                  <p className="text-sm font-semibold mb-1" style={{ color: '#1C1C1E' }}>{p.label}</p>
                  <p className="text-xs leading-relaxed mb-3" style={{ color: '#5C5C5C' }}>{p.sub}</p>
                  <div className="flex flex-wrap gap-1">
                    {p.tags.map(tag => (
                      <span key={tag.t} className="px-1.5 py-0.5 rounded text-xs" style={{ background: `${tag.c}14`, color: tag.c }}>{tag.t}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Nationality Charts */}
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              {/* AMERTA */}
              <div className="card p-6 rounded-2xl" style={{ border: '1px solid rgba(28,28,30,0.08)' }}>
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-1 h-5 rounded-full" style={{ background: '#059669' }} />
                  <h3 className="font-heading font-semibold text-base" style={{ color: '#1C1C1E' }}>AMERTA Exchange — Top Nationalities</h3>
                </div>
                <div className="space-y-3">
                  {AMERTA_NATIONS.map(n => (
                    <div key={n.name}>
                      <div className="flex justify-between mb-1">
                        <span className="text-xs font-medium" style={{ color: '#1C1C1E' }}>{n.name}</span>
                        <span className="text-xs" style={{ color: '#5C5C5C' }}>{n.count}</span>
                      </div>
                      <div className="h-1.5 rounded-full" style={{ background: 'rgba(28,28,30,0.06)' }}>
                        <div className="h-1.5 rounded-full" style={{ width: n.pct, background: '#059669' }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {/* Inbound */}
              <div className="card p-6 rounded-2xl" style={{ border: '1px solid rgba(28,28,30,0.08)' }}>
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-1 h-5 rounded-full" style={{ background: '#1E3A5F' }} />
                  <h3 className="font-heading font-semibold text-base" style={{ color: '#1C1C1E' }}>Inbound &amp; Scholarship — Top Nationalities</h3>
                </div>
                <div className="space-y-3">
                  {INBOUND_NATIONS.map(n => (
                    <div key={n.name}>
                      <div className="flex justify-between mb-1">
                        <span className="text-xs font-medium" style={{ color: '#1C1C1E' }}>{n.name}</span>
                        <span className="text-xs" style={{ color: '#5C5C5C' }}>{n.count}</span>
                      </div>
                      <div className="h-1.5 rounded-full" style={{ background: 'rgba(28,28,30,0.06)' }}>
                        <div className="h-1.5 rounded-full" style={{ width: n.pct, background: '#1E3A5F' }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Gender + Study Level */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Gender */}
              <div className="card p-6 rounded-2xl" style={{ border: '1px solid rgba(28,28,30,0.08)' }}>
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-1 h-5 rounded-full" style={{ background: '#8B7355' }} />
                  <h3 className="font-heading font-semibold text-base" style={{ color: '#1C1C1E' }}>Gender Distribution</h3>
                </div>
                <div className="mb-6">
                  <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: '#5C5C5C' }}>AMERTA Exchange (Batches 22–24 · 158 students)</p>
                  <div className="flex h-2.5 rounded-full overflow-hidden mb-2" style={{ background: 'rgba(28,28,30,0.06)' }}>
                    <div className="h-full" style={{ width: '70%', background: '#059669' }} />
                    <div className="h-full" style={{ width: '30%', background: '#4A6B8A' }} />
                  </div>
                  <div className="flex justify-between text-xs">
                    <span style={{ color: '#059669' }}>Female — 111 (70%)</span>
                    <span style={{ color: '#4A6B8A' }}>Male — 47 (30%)</span>
                  </div>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: '#5C5C5C' }}>Inbound &amp; Welfare (ADS · 110 with data)</p>
                  <div className="flex h-2.5 rounded-full overflow-hidden mb-2" style={{ background: 'rgba(28,28,30,0.06)' }}>
                    <div className="h-full" style={{ width: '35%', background: '#8B7355' }} />
                    <div className="h-full" style={{ width: '65%', background: '#1E3A5F' }} />
                  </div>
                  <div className="flex justify-between text-xs">
                    <span style={{ color: '#8B7355' }}>Female — 38 (35%)</span>
                    <span style={{ color: '#1E3A5F' }}>Male — 72 (65%)</span>
                  </div>
                </div>
              </div>
              {/* Study Level */}
              <div className="card p-6 rounded-2xl" style={{ border: '1px solid rgba(28,28,30,0.08)' }}>
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-1 h-5 rounded-full" style={{ background: '#4A6B8A' }} />
                  <h3 className="font-heading font-semibold text-base" style={{ color: '#1C1C1E' }}>Study Program Level</h3>
                </div>
                <p className="text-xs font-semibold uppercase tracking-wider mb-4" style={{ color: '#5C5C5C' }}>AMERTA Exchange — 156 students (Batches 22–24)</p>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#4A6B8A' }} />
                        <span className="text-sm font-medium" style={{ color: '#1C1C1E' }}>Undergraduate</span>
                      </div>
                      <span className="font-heading font-bold text-lg" style={{ color: '#1C1C1E' }}>145</span>
                    </div>
                    <div className="h-2.5 rounded-full" style={{ background: 'rgba(28,28,30,0.06)' }}>
                      <div className="h-2.5 rounded-full" style={{ width: '93%', background: '#4A6B8A' }} />
                    </div>
                    <p className="text-xs mt-1" style={{ color: '#5C5C5C' }}>93% of AMERTA participants</p>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#8B7355' }} />
                        <span className="text-sm font-medium" style={{ color: '#1C1C1E' }}>Master&apos;s Program</span>
                      </div>
                      <span className="font-heading font-bold text-lg" style={{ color: '#1C1C1E' }}>11</span>
                    </div>
                    <div className="h-2.5 rounded-full" style={{ background: 'rgba(28,28,30,0.06)' }}>
                      <div className="h-2.5 rounded-full" style={{ width: '7%', background: '#8B7355' }} />
                    </div>
                    <p className="text-xs mt-1" style={{ color: '#5C5C5C' }}>7% of AMERTA participants</p>
                  </div>
                </div>
                <div className="mt-6 pt-4 border-t" style={{ borderColor: 'rgba(28,28,30,0.08)' }}>
                  <p className="text-xs" style={{ color: '#767676' }}>Data based on Batches 22–24 where study level was recorded. All KNB and TIAS students are government scholarship recipients.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Summary Stats */}
          <div className="pt-12 border-t" style={{ borderColor: 'rgba(28,28,30,0.1)' }}>
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { Icon: Users,    color: '#059669', val: '480+', label: 'Total Students Supported' },
                { Icon: Globe,    color: '#1E3A5F', val: '30+',  label: 'Countries Represented' },
                { Icon: Share2,   color: '#8B7355', val: '10+',  label: 'Stakeholder Types Coordinated' },
                { Icon: Calendar, color: '#4A6B8A', val: '4',    label: 'Programs Managed (AMERTA Batches)' },
              ].map(s => (
                <div key={s.label} className="text-center">
                  <div className="w-16 h-16 rounded-xl flex items-center justify-center mb-4 mx-auto" style={{ background: `${s.color}14` }}>
                    <s.Icon style={{ width: 32, height: 32, color: s.color }} />
                  </div>
                  <p className="font-heading font-bold text-2xl mb-1" style={{ color: '#1C1C1E' }}>{s.val}</p>
                  <p className="text-sm" style={{ color: '#5C5C5C' }}>{s.label}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

    </div>
  )
}
