import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, Users, DollarSign, Building2, Calendar } from 'lucide-react'

export const metadata: Metadata = {
  title: 'AMERTA — Zefanya Kharisma Nugroho',
  description: 'Airlangga Mobility, Exchange, Research & Transfer Academic — flagship semester exchange program at Universitas Airlangga.',
}

const gallery = [
  '/assets/images/student-services/tailor-made/griffith-unair-2.JPEG',
  '/assets/images/student-services/tailor-made/griffith-unair-1.JPEG',
  '/assets/images/student-services/tailor-made/griffith-unair-3.JPEG',
  '/assets/images/student-services/tailor-made/griffith-unair-4.JPEG',
  '/assets/images/student-services/tailor-made/griffith-unair-5.JPEG',
  '/assets/images/student-services/tailor-made/griffith-unair-6.JPEG',
]

const phases = [
  { phase: '01', title: 'Pre-Arrival Coordination', desc: 'Visa guidance, housing arrangement, academic pre-registration, and welcome package distribution to incoming students 4–8 weeks before arrival.' },
  { phase: '02', title: 'Arrival & Orientation', desc: 'Airport pick-up logistics, orientation day facilitation, campus tours, administrative registration, and buddy-pairing with local student volunteers.' },
  { phase: '03', title: 'Study Period Support', desc: 'Ongoing welfare support — healthcare navigation, banking assistance, immigration compliance, and regular check-ins throughout the semester.' },
  { phase: '04', title: 'Cultural Integration', desc: 'Coordinating ACI activities, city tours, traditional arts participation, and local family homestay experiences for deeper cultural immersion.' },
  { phase: '05', title: 'Post-Program Completion', desc: 'Transcript processing coordination, departure logistics, program evaluation surveys, and partner university reporting.' },
]

const stats = [
  { icon: Users, value: '120+', label: 'Students per cohort', color: '#1E3A5F' },
  { icon: DollarSign, value: 'IDR 50–100M', label: 'Budget per program', color: '#8B7355' },
  { icon: Building2, value: '10+', label: 'Partner institutions', color: '#4A6B8A' },
  { icon: Calendar, value: '2024–Present', label: 'Program period', color: '#064E3B' },
]

export default function AmertaPage() {
  return (
    <div style={{ background: '#F2F2F7', minHeight: '100vh' }}>
      {/* Hero */}
      <div style={{ position: 'relative', minHeight: 480, overflow: 'hidden' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img loading="lazy" src="/assets/images/student-services/tailor-made/griffith-unair-2.JPEG" alt="AMERTA" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(160deg,rgba(10,30,65,0.88) 0%,rgba(30,80,140,0.65) 100%)' }} />
        <div className="relative z-10 max-w-4xl mx-auto px-6" style={{ paddingTop: 64, paddingBottom: 56 }}>
          <Link href="/projects-overview" className="inline-flex items-center gap-2 mb-8 px-3.5 py-1.5 rounded-full text-sm font-medium" style={{ background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(12px)', color: 'rgba(255,255,255,0.85)', textDecoration: 'none', border: '1px solid rgba(255,255,255,0.16)' }}>
            <ArrowLeft style={{ width: 14, height: 14 }} /> All Projects
          </Link>
          <div style={{ fontSize: '.65rem', fontWeight: 700, letterSpacing: '.16em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', marginBottom: 12 }}>Semester Exchange · Universitas Airlangga · Since 2024</div>
          <h1 className="font-heading font-bold text-white" style={{ fontSize: 'clamp(2.8rem,7vw,4.5rem)', letterSpacing: '-.03em', lineHeight: 1, marginBottom: 16 }}>AMERTA</h1>
          <p style={{ fontSize: '1.05rem', color: 'rgba(255,255,255,0.72)', lineHeight: 1.7, maxWidth: 560, marginBottom: 28 }}>Airlangga Mobility, Exchange, Research &amp; Transfer Academic — Universitas Airlangga&apos;s flagship inbound semester exchange program.</p>
          <div className="flex flex-wrap gap-2">
            {['Student Mobility', 'Project Management', 'Leadership', 'Cross-Cultural', 'Logistics'].map(t => (
              <span key={t} style={{ fontSize: '.72rem', fontWeight: 600, padding: '5px 14px', borderRadius: 999, background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.14)', color: 'rgba(255,255,255,0.78)' }}>{t}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {stats.map(s => (
            <div key={s.label} className="card p-6 text-center" style={{ borderTop: `3px solid ${s.color}` }}>
              <s.icon style={{ width: 22, height: 22, color: s.color, margin: '0 auto 10px' }} />
              <div className="font-heading font-bold" style={{ fontSize: '1.35rem', color: '#1C1C1E', letterSpacing: '-.02em' }}>{s.value}</div>
              <div style={{ fontSize: '.72rem', color: '#767676', marginTop: 4, lineHeight: 1.4 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Overview */}
        <div className="card p-8 mb-8" style={{ borderLeft: '4px solid #1E3A5F' }}>
          <h2 className="font-heading font-bold text-xl mb-4" style={{ color: '#1C1C1E' }}>Program Overview</h2>
          <p className="text-sm leading-relaxed mb-4" style={{ color: '#5C5C5C' }}>
            AMERTA is Universitas Airlangga&apos;s flagship inbound semester exchange program, welcoming international students from partner universities across Asia, Europe, and beyond. As Coordinator, I managed the complete student lifecycle — from initial correspondence with partner universities through to final transcript processing.
          </p>
          <p className="text-sm leading-relaxed" style={{ color: '#5C5C5C' }}>
            The program accommodates 120+ students per cohort across two semesters annually. My role spanned promotion, pre-departure preparation for outbound students, arrival logistics coordination, welfare support throughout the study period, and post-program completion administration — all within a budget of IDR 50–100M per program.
          </p>
        </div>

        {/* Program Phases */}
        <h2 className="font-heading font-bold text-xl mb-6" style={{ color: '#1C1C1E' }}>Program Management Lifecycle</h2>
        <div className="space-y-4 mb-16">
          {phases.map(p => (
            <div key={p.phase} className="card p-6 flex gap-5">
              <div className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center font-heading font-bold text-sm" style={{ background: 'rgba(30,58,95,0.08)', color: '#1E3A5F' }}>{p.phase}</div>
              <div>
                <h3 className="font-heading font-semibold text-base mb-1" style={{ color: '#1C1C1E' }}>{p.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#5C5C5C' }}>{p.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Gallery */}
        <h2 className="font-heading font-bold text-xl mb-6" style={{ color: '#1C1C1E' }}>Gallery</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-16">
          {gallery.map((src, i) => (
            <div key={i} className="rounded-2xl overflow-hidden" style={{ aspectRatio: '4/3' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img loading="lazy" src={src} alt={`AMERTA ${i + 1}`} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>

        {/* Related */}
        <div className="flex items-center gap-4 mb-6">
          <span className="label-small">Related Programs</span>
          <div style={{ flex: 1, height: 1, background: 'rgba(28,28,30,0.08)' }} />
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            { href: '/aci', title: 'ACI', sub: 'Airlangga Cultural Immersion', desc: 'Cultural integration activities for international students throughout the semester.' },
            { href: '/aero', title: 'AERO', sub: 'Annual Exhibition', desc: 'Showcasing Airlangga\'s global partnerships and international academic achievements.' },
          ].map(card => (
            <Link key={card.href} href={card.href} className="card p-6 block" style={{ textDecoration: 'none' }}>
              <div className="flex items-center justify-between mb-2">
                <div>
                  <span className="font-heading font-bold" style={{ color: '#1C1C1E' }}>{card.title}</span>
                  <span style={{ fontSize: '.72rem', color: '#767676', marginLeft: 8 }}>{card.sub}</span>
                </div>
                <ArrowRight style={{ width: 16, height: 16, color: '#8B7355' }} />
              </div>
              <p className="text-sm" style={{ color: '#5C5C5C', lineHeight: 1.6 }}>{card.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
