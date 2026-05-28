import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import StarField from '@/components/cm/StarField'
import AstronautFloat from '@/components/cm/AstronautFloat'

export const metadata: Metadata = {
  title: 'Writing — CroissantsMoon · Zefanya Kharisma Nugroho',
  description: 'Academic research, institutional writing, strategic communications, and creative writing by Zefanya Kharisma Nugroho.',
}

const WRITINGS = [
  {
    category: 'Academic Research',
    overline: 'Peer-reviewed & conference work',
    color: '#6FA8FF',
    icon: '◈',
    works: [
      {
        title: 'U.S.–ASEAN Economic Cooperation under Biden and Trump',
        year: '2023',
        venue: '9th ICoCSPA International Conference',
        desc: "Comparative analysis of U.S. economic engagement strategy with ASEAN across two administrations — presented at Universitas Airlangga's international conference.",
        lang: 'English',
      },
      {
        title: 'Korea–China THAAD Dispute: Security and Economic Implications',
        year: '2023',
        venue: 'Undergraduate Research Paper',
        desc: "Analysis of the THAAD deployment's cascading effects on bilateral trade, tourism, and diplomatic relations between South Korea and China.",
        lang: 'English',
      },
      {
        title: 'The Abraham Accords and Middle East Regional Architecture',
        year: '2022',
        venue: 'Peer-Reviewed Journal Article',
        desc: "Examination of the Abraham Accords' implications for the existing Middle East security and diplomatic order — published in an Airlangga academic journal.",
        lang: 'English',
      },
    ],
  },
  {
    category: 'Institutional Writing',
    overline: 'Strategic & operational documents',
    color: '#D4B15A',
    icon: '✦',
    works: [
      {
        title: 'PCU International Office Strategic Plan (2025–2027)',
        year: '2025',
        venue: 'Internal Document — Petra Christian University',
        desc: 'Three-year internationalization roadmap — partner expansion targets, program development pipeline, grant strategy, and KPI framework for institutional review.',
        lang: 'English',
      },
      {
        title: 'Monthly Partnership Reports',
        year: '2024–Present',
        venue: 'PCU International Office',
        desc: 'Regular reporting on partnership activity, MoU status, student mobility figures, and upcoming strategic priorities for institutional leadership.',
        lang: 'English / Indonesian',
      },
      {
        title: 'Partner University Correspondence',
        year: '2024–Present',
        venue: 'PCU International Office',
        desc: 'Formal institutional correspondence with 30+ partner universities — covering program coordination, MoU renewals, exchange logistics, and strategic collaboration proposals.',
        lang: 'English',
      },
    ],
  },
  {
    category: 'Creative & Personal',
    overline: 'Narrative, content, and handbook writing',
    color: '#8FA8D6',
    icon: '⬡',
    works: [
      {
        title: 'Portfolio Writing — Project Narratives',
        year: '2025',
        venue: 'This website',
        desc: 'All project descriptions, professional summaries, and case study narratives across this portfolio — written to communicate complex program management and technical work to diverse audiences.',
        lang: 'English',
      },
      {
        title: 'Student Orientation Handbooks',
        year: '2024',
        venue: 'AMERTA Program — Universitas Airlangga',
        desc: 'Bilingual welcome handbooks for incoming exchange students — covering Surabaya life, university systems, cultural norms, emergency contacts, and semester calendar.',
        lang: 'English / Indonesian',
      },
    ],
  },
]

const STATS = [
  { n: '08', label: 'Pieces' },
  { n: '03', label: 'Formats' },
  { n: '02', label: 'Languages' },
]

export default function WritingPage() {
  return (
    <div style={{ background: '#071126', minHeight: '100vh', color: '#D9E6FF' }}>

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <div style={{ position: 'relative', overflow: 'hidden', background: 'linear-gradient(160deg,#030712 0%,#071126 45%,#0B1E3A 100%)', padding: 'clamp(5rem,12vh,9rem) 24px clamp(4rem,8vh,7rem)' }}>
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
          <StarField count={65} />
        </div>
        {/* Constellation */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0, opacity: .65 }}>
          <svg width="100%" height="100%" viewBox="0 0 1200 600" fill="none" preserveAspectRatio="xMidYMid slice">
            <line x1="10%" y1="20%" x2="28%" y2="35%" stroke="#6FA8FF" strokeWidth=".5" opacity=".35"/>
            <line x1="28%" y1="35%" x2="45%" y2="22%" stroke="#6FA8FF" strokeWidth=".5" opacity=".35"/>
            <line x1="65%" y1="15%" x2="80%" y2="32%" stroke="#6FA8FF" strokeWidth=".5" opacity=".3"/>
            <line x1="80%" y1="32%" x2="90%" y2="18%" stroke="#6FA8FF" strokeWidth=".5" opacity=".3"/>
            <circle cx="10%" cy="20%" r="2"   fill="#6FA8FF" opacity=".45"/>
            <circle cx="28%" cy="35%" r="1.5" fill="#D4B15A" opacity=".4"/>
            <circle cx="45%" cy="22%" r="2"   fill="#6FA8FF" opacity=".35"/>
            <circle cx="65%" cy="15%" r="1.5" fill="#6FA8FF" opacity=".35"/>
            <circle cx="80%" cy="32%" r="2"   fill="#D4B15A" opacity=".38"/>
            <circle cx="90%" cy="18%" r="1.5" fill="#6FA8FF" opacity=".3"/>
          </svg>
        </div>
        {/* Astronauts */}
        <AstronautFloat img={3} style={{ position: 'absolute', right: '7%',  top: '16%'    }} size={110} dur={26} del={0}   rot={12}  />
        <AstronautFloat img={4} style={{ position: 'absolute', left: '3%',   bottom: '22%' }} size={80}  dur={30} del={-9}  rot={-8}  />
        <AstronautFloat img={5} style={{ position: 'absolute', right: '20%', top: '10%'    }} size={65}  dur={24} del={-14} rot={6}   />
        {/* Nebula blobs */}
        <div style={{ position: 'absolute', left: -120, top: -60, width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle,rgba(111,168,255,0.05) 0%,transparent 65%)', pointerEvents: 'none', zIndex: 0 }} />
        <div style={{ position: 'absolute', right: -80, bottom: -40, width: 380, height: 380, borderRadius: '50%', background: 'radial-gradient(circle,rgba(212,177,90,0.05) 0%,transparent 65%)', pointerEvents: 'none', zIndex: 0 }} />
        {/* Watermark */}
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
          <span style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', fontSize: '26vw', fontWeight: 300, color: '#D4B15A', opacity: .018, lineHeight: 1, userSelect: 'none', whiteSpace: 'nowrap' }}>W</span>
        </div>

        {/* Content */}
        <div style={{ maxWidth: 1024, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          {/* Back + badge */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '3rem', flexWrap: 'wrap', gap: 12 }}>
            <Link href="/croissantsmoon" style={{ display: 'inline-flex', alignItems: 'center', gap: 7, fontFamily: "'Outfit',sans-serif", fontSize: '.82rem', color: '#8FA8D6', background: 'rgba(111,168,255,0.06)', border: '1px solid rgba(111,168,255,0.14)', padding: '8px 18px', borderRadius: 999, textDecoration: 'none' }}>
              <ArrowLeft style={{ width: 14, height: 14 }} /> CroissantsMoon
            </Link>
            <span style={{ fontFamily: "'Outfit',sans-serif", fontSize: '.66rem', fontWeight: 500, letterSpacing: '.14em', background: 'rgba(212,177,90,0.1)', color: '#D4B15A', padding: '4px 14px', borderRadius: 999, border: '1px solid rgba(212,177,90,0.22)' }}>
              Academic · Institutional · Creative
            </span>
          </div>

          {/* Overline */}
          <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: '.63rem', fontWeight: 600, letterSpacing: '.2em', textTransform: 'uppercase', color: '#D4B15A', marginBottom: '1rem' }}>Written Work</p>

          {/* Headline */}
          <h1 style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: 'clamp(3rem,9vw,6.5rem)', fontWeight: 400, fontStyle: 'italic', letterSpacing: '-.01em', lineHeight: .92, color: '#D9E6FF', marginBottom: '2rem', textShadow: '0 0 80px rgba(111,168,255,0.14)' }}>
            Words that<br />carry <span style={{ color: '#D4B15A' }}>weight.</span>
          </h1>

          {/* Body */}
          <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: 'clamp(.88rem,1.5vw,1rem)', color: '#8FA8D6', lineHeight: 1.78, maxWidth: 480, marginBottom: '2.5rem' }}>
            Academic research, institutional communications, and creative writing — in English and Indonesian.
          </p>

          {/* Stats strip */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 0, background: 'rgba(11,30,58,0.55)', borderRadius: 16, padding: '18px 24px', border: '1px solid rgba(111,168,255,0.14)', backdropFilter: 'blur(14px)', marginBottom: '2.5rem' }}>
            {STATS.map((s, i) => (
              <div key={s.n} style={{ textAlign: 'center', padding: '0 clamp(12px,3vw,24px)', ...(i > 0 ? { borderLeft: '1px solid rgba(111,168,255,0.12)' } : {}) }}>
                <div style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: 'clamp(1.8rem,4vw,2.8rem)', fontWeight: 400, fontStyle: 'italic', color: '#D9E6FF', letterSpacing: '-.02em', lineHeight: 1 }}>{s.n}</div>
                <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: '.58rem', fontWeight: 500, letterSpacing: '.14em', textTransform: 'uppercase', color: '#8FA8D6', marginTop: 4, opacity: .7 }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
            <a href="#writing-sections" style={{ fontFamily: "'Outfit',sans-serif", fontSize: '.85rem', fontWeight: 600, background: '#D4B15A', color: '#071126', padding: '14px 30px', borderRadius: 999, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8, letterSpacing: '.03em', boxShadow: '0 0 22px rgba(212,177,90,0.32),0 4px 16px rgba(212,177,90,0.2)' }}>
              Browse Writing <ArrowRight style={{ width: 13, height: 13 }} />
            </a>
            <Link href="/croissantsmoon/contact" style={{ fontFamily: "'Outfit',sans-serif", fontSize: '.85rem', fontWeight: 400, border: '1px solid rgba(212,177,90,0.38)', color: '#D4B15A', padding: '14px 24px', borderRadius: 999, background: 'rgba(212,177,90,0.06)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 7 }}>
              Commission Writing
            </Link>
          </div>
        </div>
      </div>

      {/* ── Writing sections ─────────────────────────────────────────────── */}
      <div id="writing-sections" style={{ background: 'linear-gradient(180deg,#071126 0%,#0B1E3A 100%)', padding: 'clamp(4rem,8vh,6rem) 24px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0, opacity: .4 }}>
          <StarField count={30} />
        </div>
        <AstronautFloat img={5} style={{ position: 'absolute', right: '2%', top: '10%' }} size={75} dur={32} del={-7} rot={-6} />

        <div style={{ maxWidth: 900, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          {WRITINGS.map((group) => (
            <div key={group.category} style={{ marginBottom: 'clamp(3rem,7vh,5rem)' }}>
              {/* Category header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: '1.75rem', paddingBottom: '1rem', borderBottom: '1px solid rgba(111,168,255,0.08)' }}>
                <span style={{ fontSize: '1.1rem', color: group.color, opacity: .8 }}>{group.icon}</span>
                <div>
                  <p style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 700, fontSize: '.72rem', letterSpacing: '.16em', textTransform: 'uppercase', color: group.color, margin: 0 }}>{group.category}</p>
                  <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: '.68rem', color: 'rgba(143,168,214,0.45)', margin: 0, marginTop: 2 }}>{group.overline}</p>
                </div>
              </div>

              {/* Works */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {group.works.map(w => (
                  <div key={w.title} style={{ background: 'rgba(11,30,58,0.55)', border: '1px solid rgba(111,168,255,0.1)', borderLeft: `3px solid ${group.color}`, borderRadius: 18, padding: 24, backdropFilter: 'blur(12px)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12, marginBottom: 8, flexWrap: 'wrap' }}>
                      <h2 style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontWeight: 500, fontStyle: 'italic', fontSize: 'clamp(1rem,2vw,1.15rem)', color: '#D9E6FF', flex: 1, lineHeight: 1.3 }}>{w.title}</h2>
                      <span style={{ fontFamily: "'Outfit',sans-serif", fontSize: '.68rem', color: 'rgba(143,168,214,0.5)', flexShrink: 0, paddingTop: 2 }}>{w.year}</span>
                    </div>
                    <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: '.74rem', fontWeight: 600, color: group.color, marginBottom: 10, letterSpacing: '.02em' }}>{w.venue}</p>
                    <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: '.86rem', color: '#8FA8D6', lineHeight: 1.7, marginBottom: 14 }}>{w.desc}</p>
                    <span style={{ fontFamily: "'Outfit',sans-serif", fontSize: '.67rem', fontWeight: 600, padding: '3px 11px', borderRadius: 999, background: `${group.color}12`, border: `1px solid ${group.color}24`, color: group.color }}>{w.lang}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <div style={{ background: 'linear-gradient(160deg,#030712 0%,#071126 60%,#0a1530 100%)', padding: 'clamp(5rem,11vh,8rem) 24px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
          <StarField count={40} />
        </div>
        {/* Glowing crescent */}
        <div style={{ position: 'absolute', right: '-5%', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', zIndex: 0, filter: 'blur(2px) drop-shadow(0 0 60px rgba(212,177,90,0.3))', opacity: .1 }}>
          <svg width="400" height="400" viewBox="0 0 500 500" fill="none">
            <path d="M340 250C340 318.5 284.5 375 216 375C147.5 375 92 318.5 92 250C92 181.5 147.5 125 216 125C202.5 142.5 196 163 196 186C196 249.5 238.5 302 296.5 318.8C322 299.5 340 276.2 340 250Z" fill="#D4B15A"/>
          </svg>
        </div>
        <AstronautFloat img={5} style={{ position: 'absolute', left: '5%',   top: '20%'    }} size={90}  dur={25} del={-13} rot={10}  />
        <AstronautFloat img={3} style={{ position: 'absolute', right: '4%',  bottom: '20%' }} size={80}  dur={35} del={-2}  rot={-7}  />
        <AstronautFloat img={4} style={{ position: 'absolute', left: '18%',  top: '12%'    }} size={60}  dur={38} del={-9}  rot={5}   />

        <div style={{ maxWidth: 680, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: '.63rem', fontWeight: 600, letterSpacing: '.22em', textTransform: 'uppercase', color: '#D4B15A', opacity: .8, marginBottom: '1.5rem' }}>Let&apos;s Work Together</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: 'clamp(2.4rem,7vw,5rem)', fontWeight: 400, fontStyle: 'italic', color: '#D9E6FF', lineHeight: .96, marginBottom: '1.5rem', letterSpacing: '-.01em', textShadow: '0 0 60px rgba(111,168,255,0.18)' }}>
            Need writing that<br /><span style={{ color: '#D4B15A' }}>actually resonates?</span>
          </h2>
          <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: '.92rem', lineHeight: 1.8, color: '#8FA8D6', maxWidth: 400, margin: '0 auto 3rem' }}>
            Research reports, institutional communications, portfolio copy — writing that serves both the reader and the purpose.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, justifyContent: 'center', alignItems: 'center' }}>
            <Link href="/croissantsmoon/contact" style={{ fontFamily: "'Outfit',sans-serif", fontSize: '.875rem', fontWeight: 600, background: '#D4B15A', color: '#071126', padding: '16px 38px', borderRadius: 999, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 9, letterSpacing: '.03em', boxShadow: '0 0 24px rgba(212,177,90,0.32),0 4px 18px rgba(212,177,90,0.2)' }}>
              Start a Conversation <ArrowRight style={{ width: 15, height: 15 }} />
            </Link>
            <a href="mailto:zefanya.kharisma@croissantsmoon.com" style={{ fontFamily: "'Outfit',sans-serif", border: '1px solid rgba(212,177,90,0.38)', color: '#D4B15A', padding: '16px 24px', borderRadius: 999, background: 'rgba(212,177,90,0.06)', textDecoration: 'none', fontSize: '.85rem', fontWeight: 500, display: 'inline-flex', alignItems: 'center', gap: 7 }}>
              zefanya.kharisma@croissantsmoon.com
            </a>
          </div>
          <div style={{ marginTop: '2.5rem' }}>
            <Link href="/croissantsmoon" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: "'Outfit',sans-serif", fontSize: '.78rem', color: 'rgba(143,168,214,0.32)', padding: '8px 12px', borderRadius: 8, textDecoration: 'none' }}>
              <ArrowLeft style={{ width: 13, height: 13 }} /> Back to CroissantsMoon
            </Link>
          </div>
        </div>
      </div>

    </div>
  )
}
