import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Mail, Presentation, BookOpenCheck, PlaneLanding, Users, ClipboardCheck, Mountain, PartyPopper } from 'lucide-react'
import RotatingGallery from '@/components/projects/RotatingGallery'
import AmertaStats from '@/components/projects/AmertaStats'

export const metadata: Metadata = {
  title: 'AMERTA',
  alternates: { canonical: '/amerta' },
  description: 'Airlangga Mobility, Exchange, Research & Transfer Academic — flagship semester exchange program at Universitas Airlangga.',
}

const GALLERY_IMAGES = [
  '/assets/images/amerta/amerta/IMG_0570.JPG', '/assets/images/amerta/amerta/IMG_0576.JPG',
  '/assets/images/amerta/amerta/IMG_0578.JPG', '/assets/images/amerta/amerta/IMG_0589.JPG',
  '/assets/images/amerta/amerta/IMG_0590.JPG', '/assets/images/amerta/amerta/IMG_0594.JPG',
  '/assets/images/amerta/amerta/IMG_0629.JPG', '/assets/images/amerta/amerta/IMG_0637.JPG',
  '/assets/images/amerta/amerta/IMG_0641.JPG', '/assets/images/amerta/amerta/IMG_0642.JPG',
  '/assets/images/amerta/amerta/IMG_0980.JPG', '/assets/images/amerta/amerta/IMG_0993.JPG',
  '/assets/images/amerta/amerta/IMG_1003.JPG', '/assets/images/amerta/amerta/IMG_1006.JPG',
  '/assets/images/amerta/amerta/IMG_1007.JPG', '/assets/images/amerta/amerta/IMG_1008.JPG',
  '/assets/images/amerta/amerta/IMG_1807.JPG', '/assets/images/amerta/amerta/IMG_1813.JPG',
  '/assets/images/amerta/amerta/IMG_3529.JPG', '/assets/images/amerta/amerta/IMG_3534.JPG',
  '/assets/images/amerta/amerta/IMG_3535.JPG', '/assets/images/amerta/amerta/IMG_3720.JPG',
  '/assets/images/amerta/amerta/IMG_3723.JPG', '/assets/images/amerta/amerta/IMG_3867.JPG',
  '/assets/images/amerta/amerta/IMG_3868.JPG', '/assets/images/amerta/amerta/IMG_3869.JPG',
  '/assets/images/amerta/amerta/FullSizeRender.JPG', '/assets/images/amerta/amerta/FullSizeRender 2.JPG',
]

const steps = [
  { n: '01', Icon: Mail,          color: '#4A6B8A', title: 'Institutional Outreach & Student Recruitment',   desc: 'Coordinated with international partner universities regarding program promotion, student nominations, application processes, and recruitment timelines. Managed communication with both institutional representatives and prospective exchange students.' },
  { n: '02', Icon: Presentation,  color: '#4A6B8A', title: 'Pre-Departure Orientation',                      desc: 'Organized pre-departure orientation sessions covering academic systems, Indonesian culture, immigration procedures, accommodation guidance, and student preparedness before arrival in Indonesia.' },
  { n: '03', Icon: BookOpenCheck, color: '#4A6B8A', title: 'Academic Coordination & Credit Transfer',        desc: 'Managed course mapping and credit transfer processes between Universitas Airlangga and international partner institutions. Bridged communication between faculties, academic coordinators, and students to ensure smooth academic recognition.' },
  { n: '04', Icon: PlaneLanding,  color: '#4A6B8A', title: 'Arrival, Visa, Immigration & Accommodation',    desc: 'Managed airport pick-up services, accommodation arrangements, visa documentation, immigration coordination, and arrival logistics to ensure students experienced a smooth transition into Indonesia.' },
  { n: '05', Icon: Users,         color: '#4A6B8A', title: 'Arrival Orientation & Student Integration',      desc: 'Conducted orientation sessions introducing students to campus life, academic systems, Indonesian culture, safety information, and student support services to help them adapt quickly.' },
  { n: '06', Icon: ClipboardCheck,color: '#4A6B8A', title: 'Semester Monitoring & Student Support',          desc: 'Monitored academic progress and student well-being throughout the semester by coordinating continuously with faculties, lecturers, and students. Ensured issues were addressed efficiently and student experiences remained positive.' },
  { n: '07', Icon: Mountain,      color: '#4A6B8A', title: 'Cultural Trips & Cultural Experiences',          desc: 'Planned and managed cultural immersion activities, local trips, and intercultural experiences to help international students better understand Indonesian culture and strengthen cross-cultural engagement.' },
  { n: '08', Icon: PartyPopper,   color: '#4A6B8A', title: 'Farewell Session & Program Closure',             desc: 'Organized farewell sessions and program closure activities to celebrate student achievements, gather feedback, and maintain long-term institutional and student relationships.' },
]

export default function AmertaPage() {
  return (
    <div style={{ background: '#FAFAF8', minHeight: '100vh' }}>

      {/* ── Hero ── */}
      <div className="relative overflow-hidden" style={{ padding: '64px 0 48px' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img loading="lazy" src="/assets/images/student-services/tailor-made/griffith-unair-2.JPEG" alt="AMERTA" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg,rgba(30,58,95,0.88) 0%,rgba(45,90,138,0.82) 60%,rgba(74,107,138,0.77) 100%)' }} />
        <div className="absolute -right-16 -top-16 w-80 h-80 rounded-full" style={{ background: 'rgba(255,255,255,0.04)' }} />
        <div className="absolute right-24 bottom-8 w-48 h-48 rounded-full" style={{ border: '2px solid rgba(255,255,255,0.06)' }} />
        <div className="absolute inset-0 flex items-center justify-end overflow-hidden pr-8 pointer-events-none select-none" aria-hidden="true">
          <span className="font-heading font-bold" style={{ fontSize: 'clamp(5rem,16vw,13rem)', color: 'rgba(255,255,255,0.05)', letterSpacing: '-.04em', lineHeight: 1 }}>AMERTA</span>
        </div>
        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <Link href="/projects-overview" className="inline-flex items-center gap-2 mb-8 px-3.5 py-1.5 rounded-full text-sm font-medium" style={{ background: 'rgba(255,255,255,0.14)', backdropFilter: 'blur(12px)', color: 'rgba(255,255,255,0.9)', textDecoration: 'none', border: '1px solid rgba(255,255,255,0.18)' }}>
            <ArrowLeft style={{ width: 14, height: 14 }} /> Back
          </Link>
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold mb-5 uppercase tracking-wider" style={{ background: 'rgba(255,255,255,0.12)', color: '#fff' }}>Project Management</span>
          <h1 className="font-heading font-bold mb-3 text-white" style={{ fontSize: 'clamp(2.5rem,6vw,4rem)', letterSpacing: '-.02em' }}>AMERTA</h1>
          <p className="text-base max-w-2xl" style={{ color: 'rgba(255,255,255,0.75)' }}>Airlangga Mobility, Exchange, Research &amp; Transfer Academic — Universitas Airlangga&apos;s flagship semester exchange, managed end-to-end across 4 batches.</p>
        </div>
      </div>

      {/* ── Stats ── */}
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-wrap gap-10 py-10" style={{ borderBottom: '1px solid rgba(28,28,30,0.08)' }}>
          {[['207', 'Students (XXI–XXIV)'], ['14', 'Countries'], ['24', 'Partner Universities'], ['IDR 50–100M', 'Budget / cohort']].map(([val, label]) => (
            <div key={label}>
              <div className="font-heading font-bold text-4xl" style={{ color: '#1C1C1E' }}>{val}</div>
              <div className="text-xs uppercase tracking-wider mt-1" style={{ color: '#767676' }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Intro + Steps ── */}
      <div className="max-w-6xl mx-auto px-6 py-14">
        <p className="text-lg max-w-3xl leading-relaxed mb-14" style={{ color: '#5C5C5C' }}>
          As Project Manager of AMERTA at Airlangga Global Engagement, I oversaw the entire student mobility journey — from institutional outreach and student recruitment to academic coordination, cultural programming, and program closure across 4 cohorts with IDR 50–100M budgets per program.
        </p>
        <div className="flex items-center gap-3 mb-3"><span className="accent-line" /><span className="text-sm font-semibold" style={{ color: '#4A6B8A' }}>Program Process</span></div>
        <h2 className="font-heading font-bold text-3xl mb-2" style={{ color: '#1C1C1E' }}>End-to-End Responsibilities</h2>
        <div className="mt-6">
          {steps.map(s => (
            <div key={s.n} className="flex gap-6 py-8" style={{ borderTop: '1px solid rgba(28,28,30,0.07)' }}>
              <div className="flex-shrink-0 w-10 pt-0.5">
                <span className="font-heading font-bold text-3xl select-none" style={{ color: 'rgba(28,28,30,0.1)', lineHeight: 1 }}>{s.n}</span>
              </div>
              <div className="flex gap-4 flex-1">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: 'rgba(74,107,138,0.1)' }}>
                  <s.Icon style={{ width: 18, height: 18, color: s.color }} />
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-lg mb-2" style={{ color: '#1C1C1E' }}>{s.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#5C5C5C' }}>{s.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Gallery ── */}
      <RotatingGallery
        images={GALLERY_IMAGES}
        title="Moments from the Exchange"
        subtitle="Four batches · 207 students · 14 countries · 2024–2027"
      />

      {/* ── Participant Statistics ── */}
      <AmertaStats />

    </div>
  )
}
