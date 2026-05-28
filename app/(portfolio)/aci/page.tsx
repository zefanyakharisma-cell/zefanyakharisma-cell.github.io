import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, MapPin, Handshake, Users, ClipboardList, MountainSnow, Star } from 'lucide-react'
import RotatingGallery from '@/components/projects/RotatingGallery'
import AciStats from '@/components/projects/AciStats'

export const metadata: Metadata = {
  title: 'ACI — Zefanya Kharisma Nugroho',
  description: 'Airlangga Cultural Immersion — cultural integration program for international students at Universitas Airlangga.',
}

const GALLERY_IMAGES = [
  '/assets/images/aci/aci-1.JPEG',
  '/assets/images/aci/aci-2.JPEG',
  '/assets/images/aci/aci-3.jpeg',
  '/assets/images/aci/aci-4.JPEG',
  '/assets/images/aci/aci-5.JPEG',
  '/assets/images/aci/aci-6.JPEG',
  '/assets/images/aci/aci-7.jpeg',
  '/assets/images/aci/aci-8.jpeg',
  '/assets/images/aci/aci-9.jpeg',
  '/assets/images/aci/aci-10.jpeg',
  '/assets/images/aci/aci-11.jpeg',
  '/assets/images/aci/aci-12.JPEG',
  '/assets/images/aci/aci-13.JPEG',
  '/assets/images/aci/aci-14.JPG',
  '/assets/images/aci/aci-15.jpeg',
]

const steps = [
  { n: '01', Icon: MapPin,        color: '#4A5235', title: 'Destination Planning',      desc: 'Researched and selected cultural immersion destinations across Java — Malang, Solo, and Mojokerto — tailoring each batch to offer distinct cultural experiences. Coordinated with local tourism boards and cultural institutions to design meaningful itineraries.' },
  { n: '02', Icon: Handshake,     color: '#4A5235', title: 'Vendor Coordination',        desc: 'Engaged and negotiated with hotels, transportation providers, catering vendors, and cultural experience operators. Drafted vendor agreements, managed procurement timelines, and ensured service quality met program standards.' },
  { n: '03', Icon: Users,         color: '#4A5235', title: 'Participant Registration',    desc: 'Managed end-to-end participant registration for each batch — collecting dietary requirements, emergency contacts, roommate preferences, and travel documentation. Coordinated closely with faculties and AMERTA coordinators to confirm participant lists.' },
  { n: '04', Icon: ClipboardList, color: '#4A5235', title: 'Budget Planning & Control',  desc: 'Developed detailed program budgets for each batch covering accommodation, transportation, food, activities, and contingencies. Monitored expenditure in real time during program delivery and prepared post-program financial reconciliation reports.' },
  { n: '05', Icon: MountainSnow,  color: '#4A5235', title: 'On-Site Delivery',           desc: 'Led and coordinated all on-site program activities — managing schedules, briefing vendors and volunteers, troubleshooting logistics, and ensuring participant safety and wellbeing throughout each cultural immersion journey.' },
  { n: '06', Icon: Star,          color: '#4A5235', title: 'Post-Event Reporting',        desc: 'Compiled program completion reports covering attendance, budget utilisation, vendor performance, and participant satisfaction survey results. Documented lessons learned and provided recommendations to improve future batches.' },
]

export default function AciPage() {
  return (
    <div style={{ background: '#FAFAF8', minHeight: '100vh' }}>

      {/* ── Hero ── */}
      <div className="relative overflow-hidden" style={{ padding: '64px 0 48px' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img loading="lazy" src="/assets/images/aci/aci-4.JPEG" alt="ACI" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg,rgba(74,82,53,0.88) 0%,rgba(92,102,66,0.82) 60%,rgba(107,116,85,0.77) 100%)' }} />
        <div className="absolute -right-16 -top-16 w-80 h-80 rounded-full" style={{ background: 'rgba(255,255,255,0.04)' }} />
        <div className="absolute right-24 bottom-8 w-48 h-48 rounded-full" style={{ border: '2px solid rgba(255,255,255,0.06)' }} />
        <div className="absolute inset-0 flex items-center justify-end overflow-hidden pr-8 pointer-events-none select-none" aria-hidden="true">
          <span className="font-heading font-bold" style={{ fontSize: 'clamp(6rem,20vw,16rem)', color: 'rgba(255,255,255,0.05)', letterSpacing: '-.04em', lineHeight: 1 }}>ACI</span>
        </div>
        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <Link href="/projects-overview" className="inline-flex items-center gap-2 mb-8 px-3.5 py-1.5 rounded-full text-sm font-medium" style={{ background: 'rgba(255,255,255,0.14)', backdropFilter: 'blur(12px)', color: 'rgba(255,255,255,0.9)', textDecoration: 'none', border: '1px solid rgba(255,255,255,0.18)' }}>
            <ArrowLeft style={{ width: 14, height: 14 }} /> Back
          </Link>
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold mb-5 uppercase tracking-wider" style={{ background: 'rgba(255,255,255,0.12)', color: '#fff' }}>Project Management</span>
          <h1 className="font-heading font-bold mb-3 text-white" style={{ fontSize: 'clamp(2.5rem,6vw,4rem)', letterSpacing: '-.02em' }}>ACI</h1>
          <p className="text-base max-w-2xl" style={{ color: 'rgba(255,255,255,0.75)' }}>Airlangga Cultural Immersion — four batches of guided cultural trips across Java, managed end-to-end from destination planning to post-event reporting.</p>
        </div>
      </div>

      {/* ── Stats ── */}
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-wrap gap-10 py-10" style={{ borderBottom: '1px solid rgba(28,28,30,0.08)' }}>
          {[['191', 'Total Participants'], ['4', 'Batches'], ['25+', 'Nationalities'], ['IDR 236M', 'Total Budget']].map(([val, label]) => (
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
          As coordinator of ACI at Airlangga Global Engagement, I managed the full delivery of 4 cultural immersion trips across three cities in Java — Malang, Solo, and Mojokerto — serving 191 international participants from 25+ countries with a combined budget of IDR 236M.
        </p>
        <div className="flex items-center gap-3 mb-3"><span className="accent-line" /><span className="text-sm font-semibold" style={{ color: '#4A5235' }}>Program Process</span></div>
        <h2 className="font-heading font-bold text-3xl mb-2" style={{ color: '#1C1C1E' }}>End-to-End Responsibilities</h2>
        <div className="mt-6">
          {steps.map(s => (
            <div key={s.n} className="flex gap-6 py-8" style={{ borderTop: '1px solid rgba(28,28,30,0.07)' }}>
              <div className="flex-shrink-0 w-10 pt-0.5">
                <span className="font-heading font-bold text-3xl select-none" style={{ color: 'rgba(28,28,30,0.1)', lineHeight: 1 }}>{s.n}</span>
              </div>
              <div className="flex gap-4 flex-1">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: 'rgba(74,82,53,0.1)' }}>
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
        title="Moments from the Field"
        subtitle="Four batches · Three cities · 191 participants · 2024–2025"
      />

      {/* ── Participant Statistics ── */}
      <AciStats />

    </div>
  )
}
