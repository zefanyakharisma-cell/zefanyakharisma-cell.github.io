import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, PenLine } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Writing — CroissantsMoon · Zefanya Kharisma Nugroho',
  description: 'Academic research, institutional writing, strategic communications, and creative writing by Zefanya Kharisma Nugroho.',
}

const writings = [
  {
    category: 'Academic Research',
    color: '#6FA8FF',
    works: [
      { title: 'U.S.–ASEAN Economic Cooperation under Biden and Trump', year: '2023', venue: '9th ICoCSPA International Conference', desc: 'Comparative analysis of U.S. economic engagement strategy with ASEAN across two administrations — presented at Universitas Airlangga\'s international conference.', lang: 'English' },
      { title: 'Korea–China THAAD Dispute: Security and Economic Implications', year: '2023', venue: 'Undergraduate Research Paper', desc: 'Analysis of the THAAD deployment\'s cascading effects on bilateral trade, tourism, and diplomatic relations between South Korea and China.', lang: 'English' },
      { title: 'The Abraham Accords and Middle East Regional Architecture', year: '2022', venue: 'Peer-Reviewed Journal Article', desc: 'Examination of the Abraham Accords\' implications for the existing Middle East security and diplomatic order — published in an Airlangga academic journal.', lang: 'English' },
    ],
  },
  {
    category: 'Institutional Writing',
    color: '#D4B15A',
    works: [
      { title: 'PCU International Office Strategic Plan (2025–2027)', year: '2025', venue: 'Internal Document — Petra Christian University', desc: 'Three-year internationalization roadmap — partner expansion targets, program development pipeline, grant strategy, and KPI framework for institutional review.', lang: 'English' },
      { title: 'Monthly Partnership Reports', year: '2024–Present', venue: 'PCU International Office', desc: 'Regular reporting on partnership activity, MoU status, student mobility figures, and upcoming strategic priorities for institutional leadership.', lang: 'English / Indonesian' },
      { title: 'Partner University Correspondence', year: '2024–Present', venue: 'PCU International Office', desc: 'Formal institutional correspondence with 30+ partner universities — covering program coordination, MoU renewals, exchange logistics, and strategic collaboration proposals.', lang: 'English' },
    ],
  },
  {
    category: 'Creative & Personal',
    color: '#8FA8D6',
    works: [
      { title: 'Portfolio Writing — Project Narratives', year: '2025', venue: 'This website', desc: 'All project descriptions, professional summaries, and case study narratives across this portfolio — written to communicate complex program management and technical work to diverse audiences.', lang: 'English' },
      { title: 'Student Orientation Handbooks', year: '2024', venue: 'AMERTA Program — Universitas Airlangga', desc: 'Bilingual welcome handbooks for incoming exchange students — covering Surabaya life, university systems, cultural norms, emergency contacts, and semester calendar.', lang: 'English / Indonesian' },
    ],
  },
]

export default function WritingPage() {
  return (
    <div style={{ background: '#071126', minHeight: '100vh', color: '#D9E6FF' }}>
      <div style={{ padding: '60px 24px 48px', borderBottom: '1px solid rgba(111,168,255,0.1)' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <Link href="/croissantsmoon" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 24, padding: '8px 16px', borderRadius: 999, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '.84rem' }}>
            <ArrowLeft style={{ width: 14, height: 14 }} /> CroissantsMoon
          </Link>
          <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: '.62rem', fontWeight: 700, letterSpacing: '.22em', textTransform: 'uppercase', color: '#D4B15A', marginBottom: 12 }}>Written Work</p>
          <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 'clamp(2.2rem,6vw,3.5rem)', fontWeight: 400, fontStyle: 'italic', color: '#D9E6FF', lineHeight: 1.1, marginBottom: 12 }}>Writing</h1>
          <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: '.88rem', color: '#8FA8D6', lineHeight: 1.7, maxWidth: 480 }}>Academic research, institutional communications, and creative writing — in English and Indonesian.</p>
        </div>
      </div>

      <div style={{ maxWidth: 900, margin: '0 auto', padding: '48px 24px 80px' }}>
        {writings.map(group => (
          <div key={group.category} style={{ marginBottom: 48 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
              <div style={{ width: 3, height: 18, borderRadius: 999, background: group.color }} />
              <PenLine style={{ width: 16, height: 16, color: group.color }} />
              <span style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 700, fontSize: '.78rem', letterSpacing: '.12em', textTransform: 'uppercase', color: group.color }}>{group.category}</span>
            </div>
            <div className="space-y-4">
              {group.works.map(w => (
                <div key={w.title} style={{ background: 'rgba(11,30,58,0.55)', border: '1px solid rgba(111,168,255,0.1)', borderLeft: `3px solid ${group.color}`, borderRadius: 18, padding: 24 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12, marginBottom: 8, flexWrap: 'wrap' }}>
                    <h2 style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 700, fontSize: '.98rem', color: '#D9E6FF', flex: 1 }}>{w.title}</h2>
                    <span style={{ fontFamily: "'Outfit',sans-serif", fontSize: '.68rem', color: '#8FA8D6', flexShrink: 0 }}>{w.year}</span>
                  </div>
                  <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: '.76rem', fontWeight: 600, color: group.color, marginBottom: 10 }}>{w.venue}</p>
                  <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: '.84rem', color: '#8FA8D6', lineHeight: 1.7, marginBottom: 12 }}>{w.desc}</p>
                  <span style={{ fontFamily: "'Outfit',sans-serif", fontSize: '.68rem', fontWeight: 600, padding: '3px 10px', borderRadius: 999, background: `${group.color}12`, border: `1px solid ${group.color}24`, color: group.color }}>{w.lang}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
