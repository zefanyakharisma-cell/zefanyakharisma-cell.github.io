import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, GraduationCap, Award, FileText, Star } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Education — Zefanya Kharisma Nugroho',
  description: 'Academic background in International Relations.',
}

export default function Education() {
  return (
    <div style={{ background: '#F2F2F7', minHeight: '100vh' }}>
      <div style={{ background: 'linear-gradient(135deg,#1E3A5F 0%,#2563EB 60%,#38BDF8 100%)', padding: '52px 24px 44px', position: 'relative', overflow: 'hidden' }}>
        <div className="relative z-10 mx-auto px-5" style={{ maxWidth: 480 }}>
          <Link href="/about-overview" className="inline-flex items-center gap-2 mb-7 px-3.5 py-1.5 rounded-full text-sm font-medium" style={{ background: 'rgba(255,255,255,0.14)', backdropFilter: 'blur(12px)', color: 'rgba(255,255,255,0.9)', textDecoration: 'none', border: '1px solid rgba(255,255,255,0.18)' }}>
            <ArrowLeft style={{ width: 14, height: 14 }} /> Back
          </Link>
          <span className="inline-block px-3.5 py-1 rounded-full text-xs font-semibold mb-4 uppercase tracking-wider" style={{ background: 'rgba(255,255,255,0.14)', color: 'rgba(255,255,255,0.9)', border: '1px solid rgba(255,255,255,0.12)' }}>About Me</span>
          <h1 className="font-heading font-bold mb-3 text-white" style={{ fontSize: 'clamp(1.9rem,6vw,3rem)', letterSpacing: '-.02em', lineHeight: 1.1 }}>Academic Foundation</h1>
          <p className="text-sm leading-relaxed max-w-lg" style={{ color: 'rgba(255,255,255,0.7)' }}>Education and achievements that shaped my professional expertise in international relations.</p>
        </div>
      </div>

      <div style={{ padding: '72px 24px' }}>
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Degree */}
          <div className="card p-8" style={{ borderLeft: '4px solid #1E3A5F' }}>
            <div className="flex items-start gap-5">
              <div className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(30,58,95,0.08)' }}>
                <GraduationCap style={{ width: 26, height: 26, color: '#1E3A5F' }} />
              </div>
              <div>
                <h2 className="font-heading font-bold text-xl mb-1" style={{ color: '#1C1C1E' }}>Bachelor&apos;s in International Relations</h2>
                <p className="text-sm font-semibold mb-1" style={{ color: '#1E3A5F' }}>Universitas Airlangga, Surabaya</p>
                <p className="label-small mb-4" style={{ color: '#767676' }}>July 2020 – March 2024</p>
                <p className="text-sm leading-relaxed mb-4" style={{ color: '#5C5C5C' }}>
                  Studied international relations theory, foreign policy analysis, comparative politics, and cross-cultural dynamics. Developed deep expertise in ASEAN political economy, U.S.–China relations, and Middle East diplomacy.
                </p>
                <div className="flex flex-wrap gap-2">
                  {['International Relations', 'Foreign Policy Analysis', 'ASEAN Studies', 'Political Economy', 'Cross-Cultural Dynamics'].map(t => <span key={t} className="tag">{t}</span>)}
                </div>
              </div>
            </div>
          </div>

          {/* Research & Publications */}
          <div className="card p-8" style={{ borderLeft: '4px solid #8B7355' }}>
            <div className="flex items-start gap-5">
              <div className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(139,115,85,0.08)' }}>
                <FileText style={{ width: 26, height: 26, color: '#8B7355' }} />
              </div>
              <div>
                <h2 className="font-heading font-bold text-xl mb-1" style={{ color: '#1C1C1E' }}>Academic Research &amp; Publications</h2>
                <p className="text-sm font-semibold mb-4" style={{ color: '#8B7355' }}>Universitas Airlangga · 2022–2024</p>
                <div className="space-y-4">
                  {[
                    { title: 'U.S.–ASEAN Economic Cooperation', desc: 'Research on U.S.–ASEAN economic engagement across Biden and Trump administrations — presented at the 9th ICoCSPA 2023 international conference.', year: '2023' },
                    { title: 'Korea–China THAAD Dynamics', desc: 'Analysis of security and economic implications of the THAAD deployment dispute between South Korea and China.', year: '2023' },
                    { title: 'Abraham Accords Analysis', desc: 'Peer-reviewed examination of the Abraham Accords and their implications for Middle East regional security architecture.', year: '2022' },
                  ].map(pub => (
                    <div key={pub.title} className="p-4 rounded-xl" style={{ background: '#F2ECE4' }}>
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="font-heading font-semibold text-sm" style={{ color: '#1C1C1E' }}>{pub.title}</h3>
                        <span className="label-small">{pub.year}</span>
                      </div>
                      <p className="text-xs leading-relaxed" style={{ color: '#5C5C5C' }}>{pub.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Awards */}
          <div className="card p-8" style={{ borderLeft: '4px solid #D4B15A' }}>
            <div className="flex items-start gap-5">
              <div className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(212,177,90,0.08)' }}>
                <Award style={{ width: 26, height: 26, color: '#D4B15A' }} />
              </div>
              <div>
                <h2 className="font-heading font-bold text-xl mb-1" style={{ color: '#1C1C1E' }}>Academic Honors</h2>
                <p className="text-sm font-semibold mb-4" style={{ color: '#D4B15A' }}>Recognition &amp; Awards</p>
                <div className="flex items-start gap-3 p-4 rounded-xl" style={{ background: 'rgba(212,177,90,0.06)', border: '1px solid rgba(212,177,90,0.15)' }}>
                  <Star style={{ width: 18, height: 18, color: '#D4B15A', flexShrink: 0, marginTop: 2 }} />
                  <div>
                    <p className="font-semibold text-sm" style={{ color: '#1C1C1E' }}>Gold Medalist — World Youth Invention &amp; Innovation Award 2022</p>
                    <p className="text-xs mt-1" style={{ color: '#5C5C5C' }}>International recognition for youth innovation and creative problem-solving.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
