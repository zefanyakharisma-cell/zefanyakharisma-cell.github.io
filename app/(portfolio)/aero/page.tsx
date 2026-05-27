import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, Users, Building2, Star, Globe2 } from 'lucide-react'

export const metadata: Metadata = {
  title: 'AERO — Zefanya Kharisma Nugroho',
  description: 'AERO — Annual international exhibition at Universitas Airlangga showcasing global partnerships and exchange programs.',
}

const gallery = [
  '/assets/images/aero/aero-header-1.JPEG',
  '/assets/images/aero/aero-1.jpg',
  '/assets/images/aero/aero-2.jpg',
  '/assets/images/aero/aero-3.jpg',
  '/assets/images/aero/aero-4.jpg',
  '/assets/images/aero/aero-10.jpg',
]

const highlights = [
  { title: 'Partner University Showcase', desc: 'Exhibition booths representing 50+ international partner institutions — featuring programs, scholarships, and collaboration opportunities for Airlangga students.' },
  { title: 'Exchange Program Promotion', desc: 'Live presentations and testimonials from AMERTA alumni sharing their semester exchange experiences at partner universities worldwide.' },
  { title: 'Global Scholarship Fair', desc: 'Information sessions on international scholarships, grants, and funding opportunities — LPDP, Fulbright, DAAD, and bilateral scholarships.' },
  { title: 'Cultural Performances', desc: 'Cross-cultural performances by international students currently enrolled at Airlangga — representing traditions from across Asia, Europe, and the Middle East.' },
  { title: 'Academic Achievement Recognition', desc: 'Ceremony celebrating outbound and inbound students who completed exchange programs — including awards for academic achievement and cultural contribution.' },
  { title: 'Creative Documentation', desc: 'Photo exhibition and video showcase documenting the year\'s international activities — serving as institutional memory and promotional content for future recruitment.' },
]

export default function AeroPage() {
  return (
    <div style={{ background: '#F2F2F7', minHeight: '100vh' }}>
      {/* Hero */}
      <div style={{ position: 'relative', minHeight: 440, overflow: 'hidden' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img loading="lazy" src="/assets/images/aero/aero-header-1.JPEG" alt="AERO" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(160deg,rgba(10,18,45,0.9) 0%,rgba(25,50,90,0.68) 100%)' }} />
        <div className="relative z-10 max-w-4xl mx-auto px-6" style={{ paddingTop: 64, paddingBottom: 56 }}>
          <Link href="/projects-overview" className="inline-flex items-center gap-2 mb-8 px-3.5 py-1.5 rounded-full text-sm font-medium" style={{ background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(12px)', color: 'rgba(255,255,255,0.85)', textDecoration: 'none', border: '1px solid rgba(255,255,255,0.16)' }}>
            <ArrowLeft style={{ width: 14, height: 14 }} /> All Projects
          </Link>
          <div style={{ fontSize: '.65rem', fontWeight: 700, letterSpacing: '.16em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', marginBottom: 12 }}>Annual Exhibition · Universitas Airlangga</div>
          <h1 className="font-heading font-bold text-white" style={{ fontSize: 'clamp(2.8rem,7vw,4.5rem)', letterSpacing: '-.03em', lineHeight: 1, marginBottom: 16 }}>AERO</h1>
          <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.72)', lineHeight: 1.7, maxWidth: 540, marginBottom: 28 }}>Annual international exhibition at Universitas Airlangga — showcasing global partnerships, exchange programs, and international academic achievements.</p>
          <div className="flex flex-wrap gap-2">
            {['Branding', 'Creative Direction', 'Project Management', 'Event Production'].map(t => (
              <span key={t} style={{ fontSize: '.72rem', fontWeight: 600, padding: '5px 14px', borderRadius: 999, background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.14)', color: 'rgba(255,255,255,0.78)' }}>{t}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {[
            { icon: Users, value: '500+', label: 'Annual visitors', color: '#1E3A5F' },
            { icon: Building2, value: '50+', label: 'Partner booths', color: '#8B7355' },
            { icon: Globe2, value: '30+', label: 'Countries represented', color: '#4A6B8A' },
            { icon: Star, value: 'Annual', label: 'Frequency', color: '#D4B15A' },
          ].map(s => (
            <div key={s.label} className="card p-6 text-center" style={{ borderTop: `3px solid ${s.color}` }}>
              <s.icon style={{ width: 22, height: 22, color: s.color, margin: '0 auto 10px' }} />
              <div className="font-heading font-bold" style={{ fontSize: '1.35rem', color: '#1C1C1E', letterSpacing: '-.02em' }}>{s.value}</div>
              <div style={{ fontSize: '.72rem', color: '#767676', marginTop: 4, lineHeight: 1.4 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Overview */}
        <div className="card p-8 mb-12" style={{ borderLeft: '4px solid #8B7355' }}>
          <h2 className="font-heading font-bold text-xl mb-4" style={{ color: '#1C1C1E' }}>Exhibition Overview</h2>
          <p className="text-sm leading-relaxed mb-4" style={{ color: '#5C5C5C' }}>
            AERO is Universitas Airlangga&apos;s annual international education exhibition — a full-day event that brings together partner universities, scholarship providers, exchange program alumni, and current international students under one roof. It serves as both a celebration of the year&apos;s internationalization achievements and a recruitment platform for future exchange participants.
          </p>
          <p className="text-sm leading-relaxed" style={{ color: '#5C5C5C' }}>
            My role in AERO spanned creative direction — designing visual identity, exhibition materials, and digital content — as well as coordination: managing vendor relationships, briefing student volunteers, and ensuring a seamless day-of experience for 500+ visitors.
          </p>
        </div>

        {/* Highlights */}
        <h2 className="font-heading font-bold text-xl mb-6" style={{ color: '#1C1C1E' }}>Exhibition Highlights</h2>
        <div className="grid md:grid-cols-2 gap-4 mb-16">
          {highlights.map((h, i) => (
            <div key={h.title} className="card p-6" style={{ borderLeft: `3px solid ${['#1E3A5F','#8B7355','#4A6B8A','#064E3B','#D4B15A','#2563EB'][i % 6]}` }}>
              <h3 className="font-heading font-semibold text-sm mb-2" style={{ color: '#1C1C1E' }}>{h.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: '#5C5C5C' }}>{h.desc}</p>
            </div>
          ))}
        </div>

        {/* Gallery */}
        <h2 className="font-heading font-bold text-xl mb-6" style={{ color: '#1C1C1E' }}>Gallery</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-16">
          {gallery.map((src, i) => (
            <div key={i} className="rounded-2xl overflow-hidden" style={{ aspectRatio: '4/3' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img loading="lazy" src={src} alt={`AERO ${i + 1}`} className="w-full h-full object-cover" />
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
            { href: '/amerta', title: 'AMERTA', sub: 'Semester Exchange', desc: 'The flagship inbound exchange program that AERO celebrates and promotes annually.' },
            { href: '/aci', title: 'ACI', sub: 'Cultural Immersion', desc: 'Cultural integration activities that feed into AERO\'s student performance program.' },
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
