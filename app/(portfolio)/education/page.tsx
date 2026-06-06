import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, GraduationCap, School, Trophy, Medal, BookOpen, FileText } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Education',
  alternates: { canonical: '/education' },
  description: 'Academic background in International Relations and achievements that shaped professional expertise.',
}

export default function Education() {
  return (
    <div style={{ background: '#FAFAF8', minHeight: '100vh' }}>

      {/* Dark hero */}
      <div style={{ background: 'linear-gradient(160deg,#1C1C1E 0%,#1E3A5F 55%,#2C4A72 100%)', padding: 'clamp(48px,8vh,72px) 24px 48px', position: 'relative', overflow: 'hidden' }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 85% 20%,rgba(139,115,85,0.18),transparent 55%)' }} />
        <div className="absolute -right-16 -top-16 w-80 h-80 rounded-full pointer-events-none" style={{ border: '1px solid rgba(255,255,255,0.04)' }} />
        <div className="max-w-6xl mx-auto relative z-10">
          <Link href="/about-overview" className="flex items-center gap-2 mb-8" style={{ color: 'rgba(255,255,255,0.45)', fontSize: '.8rem', fontWeight: 500, textDecoration: 'none' }}>
            <ArrowLeft style={{ width: 15, height: 15 }} /> Back
          </Link>
          <div className="label-small mb-3" style={{ color: 'rgba(255,255,255,0.35)', letterSpacing: '.12em' }}>Educational Background</div>
          <h1 className="font-heading font-bold mb-4" style={{ fontSize: 'clamp(2rem,5vw,3.5rem)', lineHeight: 1.05, color: '#fff', letterSpacing: '-.02em' }}>
            Academic<br /><em style={{ fontStyle: 'italic', color: '#8B7355' }}>Foundation</em>
          </h1>
          <p className="max-w-2xl" style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1rem', lineHeight: 1.7 }}>
            Education and achievements that shaped my professional expertise in international relations and global engagement.
          </p>
        </div>
      </div>

      {/* Degrees */}
      <div style={{ padding: '72px 24px 48px', background: '#FAFAF8' }}>
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <span className="accent-line" />
            <span className="label-small">Academic Degrees</span>
          </div>
          <div className="space-y-6">

            {/* Bachelor's */}
            <div className="card rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(28,28,30,0.08)' }}>
              <div className="p-5 pb-4" style={{ background: 'linear-gradient(135deg,#1E3A5F 0%,#2C4A72 100%)' }}>
                <div className="flex items-center gap-2 mb-2">
                  <GraduationCap style={{ width: 17, height: 17, color: 'rgba(255,255,255,0.6)' }} />
                  <span style={{ fontSize: '.7rem', fontWeight: 600, letterSpacing: '.1em', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase' }}>Bachelor&apos;s Degree</span>
                </div>
                <h3 className="font-heading font-bold text-xl" style={{ color: '#fff' }}>International Relations and Affairs</h3>
              </div>
              <div className="p-6">
                <p className="text-sm font-medium mb-3" style={{ color: '#1E3A5F' }}>Universitas Airlangga &nbsp;·&nbsp; July 2020 – March 2024</p>
                <p style={{ color: '#5C5C5C', lineHeight: 1.7 }}>Focused on international relations theory, foreign policy analysis, and cross-cultural dynamics. Developed research skills through published papers on U.S.–ASEAN economic cooperation and Israel–Abraham Accords diplomacy. Served as Assistant Lecturer in Foreign Policy Analysis and Research Assistant presenting at the 9th ICoCSPA 2023.</p>
              </div>
            </div>

            {/* High School */}
            <div className="card rounded-2xl p-6" style={{ border: '1px solid rgba(28,28,30,0.08)', borderLeft: '4px solid #4A6B8A' }}>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(74,107,138,0.08)' }}>
                  <School style={{ width: 20, height: 20, color: '#4A6B8A' }} />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-xl mb-1" style={{ color: '#1C1C1E' }}>High School — Mathematics and Natural Sciences</h3>
                  <p className="text-sm font-medium mb-3" style={{ color: '#4A6B8A' }}>SMAN 15 Surabaya &nbsp;·&nbsp; 2017 – 2020</p>
                  <p style={{ color: '#5C5C5C' }}>Mathematics and Natural Sciences stream, providing a strong analytical and problem-solving foundation before pursuing international relations at university level.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Honors */}
      <div style={{ padding: '0 24px 48px', background: '#FAFAF8' }}>
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <span className="accent-line" />
            <span className="label-small">Honors &amp; Awards</span>
          </div>
          <div className="card rounded-2xl p-6" style={{ border: '1px solid rgba(28,28,30,0.08)', borderLeft: '4px solid #8B7355' }}>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(139,115,85,0.08)' }}>
                <Trophy style={{ width: 20, height: 20, color: '#8B7355' }} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium mb-4" style={{ color: '#8B7355' }}>Recognition for innovation and creative communication</p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(139,115,85,0.12)' }}>
                      <Medal style={{ width: 12, height: 12, color: '#8B7355' }} />
                    </div>
                    <p style={{ color: '#1C1C1E' }}><span className="font-semibold">Gold Medal</span> <span style={{ color: '#5C5C5C' }}>— World Youth Invention and Innovation Award 2022</span></p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(139,115,85,0.12)' }}>
                      <Medal style={{ width: 12, height: 12, color: '#8B7355' }} />
                    </div>
                    <p style={{ color: '#1C1C1E' }}><span className="font-semibold">Bronze Medal</span> <span style={{ color: '#5C5C5C' }}>— Your-K, Your-ASEAN Short Video Contest</span></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Publications */}
      <div style={{ padding: '0 24px 72px', background: '#FAFAF8' }}>
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <span className="accent-line" />
            <span className="label-small">Academic Publications</span>
          </div>
          <div className="card rounded-2xl p-6" style={{ border: '1px solid rgba(28,28,30,0.08)', borderLeft: '4px solid #059669' }}>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(5,150,105,0.08)' }}>
                <BookOpen style={{ width: 20, height: 20, color: '#059669' }} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium mb-4" style={{ color: '#059669' }}>Peer-reviewed research in International Relations</p>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 pb-3 border-b" style={{ borderColor: 'rgba(28,28,30,0.08)' }}>
                    <FileText style={{ width: 14, height: 14, color: '#9CA3AF', flexShrink: 0, marginTop: 3 }} />
                    <p className="text-sm leading-relaxed" style={{ color: '#1C1C1E' }}>Kebijakan Luar Negeri Pro-Israel Amerika Serikat di Pemerintahan Obama</p>
                  </div>
                  <div className="flex items-start gap-3 pb-3 border-b" style={{ borderColor: 'rgba(28,28,30,0.08)' }}>
                    <FileText style={{ width: 14, height: 14, color: '#9CA3AF', flexShrink: 0, marginTop: 3 }} />
                    <p className="text-sm leading-relaxed" style={{ color: '#1C1C1E' }}>Menelaah Interdependensi Korea Selatan-Tiongkok Akibat THAAD dalam Analisis Neoliberalisme</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <FileText style={{ width: 14, height: 14, color: '#9CA3AF', flexShrink: 0, marginTop: 3 }} />
                    <p className="text-sm leading-relaxed" style={{ color: '#1C1C1E' }}>Israel dan Perjanjian Abraham: Upaya Peningkatan Status Israel dalam Sistem Internasional</p>
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
