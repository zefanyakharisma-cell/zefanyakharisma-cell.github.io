import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, Users, Star, Calendar, Globe2 } from 'lucide-react'

export const metadata: Metadata = {
  title: 'ACI — Zefanya Kharisma Nugroho',
  description: 'Airlangga Cultural Immersion — cultural integration program for international students at Universitas Airlangga.',
}

const gallery = [
  '/assets/images/aci/aci-1.JPEG',
  '/assets/images/aci/aci-2.JPEG',
  '/assets/images/aci/aci-4.JPEG',
  '/assets/images/aci/aci-5.JPEG',
  '/assets/images/aci/aci-3.jpeg',
  '/assets/images/aci/aci-6.JPEG',
]

const activities = [
  { title: 'Traditional Arts & Crafts', desc: 'Batik-making workshops, wayang shadow puppet sessions, traditional gamelan music, and Javanese dance performances.' },
  { title: 'City Exploration', desc: 'Guided city tours of Surabaya\'s historic sites — Heroes Monument, House of Sampoerna, Ampel Mosque, and the old Dutch colonial district.' },
  { title: 'Culinary Experiences', desc: 'Local market visits, traditional food tasting sessions, and cooking classes featuring East Javanese cuisine.' },
  { title: 'Community Engagement', desc: 'Visits to local schools, volunteering opportunities, and cultural exchanges with community groups throughout Surabaya.' },
  { title: 'International Students Gathering', desc: 'Cross-cohort social events bringing together students from different exchange programs for networking and shared experiences.' },
  { title: 'Farewell Ceremony', desc: 'End-of-semester celebration with cultural performances, photo documentation, and certificate presentations.' },
]

export default function AciPage() {
  return (
    <div style={{ background: '#F2F2F7', minHeight: '100vh' }}>
      {/* Hero */}
      <div style={{ position: 'relative', minHeight: 440, overflow: 'hidden' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img loading="lazy" src="/assets/images/aci/aci-4.JPEG" alt="ACI" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(160deg,rgba(15,25,50,0.88) 0%,rgba(40,60,100,0.65) 100%)' }} />
        <div className="relative z-10 max-w-4xl mx-auto px-6" style={{ paddingTop: 64, paddingBottom: 56 }}>
          <Link href="/projects-overview" className="inline-flex items-center gap-2 mb-8 px-3.5 py-1.5 rounded-full text-sm font-medium" style={{ background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(12px)', color: 'rgba(255,255,255,0.85)', textDecoration: 'none', border: '1px solid rgba(255,255,255,0.16)' }}>
            <ArrowLeft style={{ width: 14, height: 14 }} /> All Projects
          </Link>
          <div style={{ fontSize: '.65rem', fontWeight: 700, letterSpacing: '.16em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', marginBottom: 12 }}>Cultural Immersion · Universitas Airlangga</div>
          <h1 className="font-heading font-bold text-white" style={{ fontSize: 'clamp(2.8rem,7vw,4.5rem)', letterSpacing: '-.03em', lineHeight: 1, marginBottom: 16 }}>ACI</h1>
          <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.72)', lineHeight: 1.7, maxWidth: 520, marginBottom: 28 }}>Airlangga Cultural Immersion — bridging international and local students through structured cultural engagement throughout the semester.</p>
          <div className="flex flex-wrap gap-2">
            {['Cross-Cultural', 'Project Management', 'Student Support', 'Community Engagement'].map(t => (
              <span key={t} style={{ fontSize: '.72rem', fontWeight: 600, padding: '5px 14px', borderRadius: 999, background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.14)', color: 'rgba(255,255,255,0.78)' }}>{t}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {[
            { icon: Users, value: '100+', label: 'Students per program', color: '#1E3A5F' },
            { icon: Star, value: '6+', label: 'Activity types', color: '#8B7355' },
            { icon: Globe2, value: '20+', label: 'Nationalities', color: '#4A6B8A' },
            { icon: Calendar, value: 'Each semester', label: 'Frequency', color: '#064E3B' },
          ].map(s => (
            <div key={s.label} className="card p-6 text-center" style={{ borderTop: `3px solid ${s.color}` }}>
              <s.icon style={{ width: 22, height: 22, color: s.color, margin: '0 auto 10px' }} />
              <div className="font-heading font-bold" style={{ fontSize: '1.35rem', color: '#1C1C1E', letterSpacing: '-.02em' }}>{s.value}</div>
              <div style={{ fontSize: '.72rem', color: '#767676', marginTop: 4, lineHeight: 1.4 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Overview */}
        <div className="card p-8 mb-12" style={{ borderLeft: '4px solid #1E3A5F' }}>
          <h2 className="font-heading font-bold text-xl mb-4" style={{ color: '#1C1C1E' }}>Program Overview</h2>
          <p className="text-sm leading-relaxed mb-4" style={{ color: '#5C5C5C' }}>
            ACI is a structured cultural integration program designed to help international exchange students connect deeply with Indonesian culture, the local community, and each other. Running alongside the main AMERTA exchange program, ACI provides the social and cultural scaffolding that transforms a study abroad experience into a life-changing journey.
          </p>
          <p className="text-sm leading-relaxed" style={{ color: '#5C5C5C' }}>
            As part of the AMERTA coordination team, I planned and facilitated ACI activities — managing logistics, coordinating volunteers, briefing vendors, and ensuring every international student felt welcome and culturally connected throughout their stay at Universitas Airlangga.
          </p>
        </div>

        {/* Activities */}
        <h2 className="font-heading font-bold text-xl mb-6" style={{ color: '#1C1C1E' }}>Program Activities</h2>
        <div className="grid md:grid-cols-2 gap-4 mb-16">
          {activities.map((a, i) => (
            <div key={a.title} className="card p-6" style={{ borderLeft: `3px solid ${['#1E3A5F','#8B7355','#4A6B8A','#064E3B','#D4B15A','#2563EB'][i % 6]}` }}>
              <h3 className="font-heading font-semibold text-sm mb-2" style={{ color: '#1C1C1E' }}>{a.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: '#5C5C5C' }}>{a.desc}</p>
            </div>
          ))}
        </div>

        {/* Gallery */}
        <h2 className="font-heading font-bold text-xl mb-6" style={{ color: '#1C1C1E' }}>Gallery</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-16">
          {gallery.map((src, i) => (
            <div key={i} className="rounded-2xl overflow-hidden" style={{ aspectRatio: '4/3' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img loading="lazy" src={src} alt={`ACI ${i + 1}`} className="w-full h-full object-cover" />
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
            { href: '/amerta', title: 'AMERTA', sub: 'Semester Exchange', desc: 'The flagship inbound exchange program that ACI supports and integrates with.' },
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
