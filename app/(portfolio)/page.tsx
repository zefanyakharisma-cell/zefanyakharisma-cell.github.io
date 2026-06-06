import type { Metadata } from 'next'
import Link from 'next/link'
import HeroSection from '@/components/home/HeroSection'
import SkillDiscovery from '@/components/home/SkillDiscovery'
import { ArrowRight, ArrowUpRight, Download, Mail } from 'lucide-react'

export const metadata: Metadata = {
  title: { absolute: 'Zefanya Kharisma Nugroho — International Education & Creative Technologist' },
  alternates: { canonical: '/' },
  description: 'International Education Professional & Creative Technologist based in Surabaya.',
  openGraph: { url: '/' },
}

export default function Home() {
  return (
    <>
      <HeroSection />

      {/* ═══ STATS BAND ═══ */}
      <div id="home-stats-band" style={{ background: 'linear-gradient(135deg,#1C1C1E 0%,#2C2C2E 100%)', padding: '36px 20px', margin: 0 }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <p className="font-heading font-bold" style={{ fontSize: '2.6rem', color: '#fff', letterSpacing: '-.02em', lineHeight: 1 }}>480+</p>
              <p className="label-small mt-2" style={{ color: 'rgba(255,255,255,0.55)' }}>Students Supported</p>
            </div>
            <div className="text-center">
              <p className="font-heading font-bold" style={{ fontSize: '2.6rem', color: '#0A84FF', letterSpacing: '-.02em', lineHeight: 1 }}>505+</p>
              <p className="label-small mt-2" style={{ color: 'rgba(255,255,255,0.55)' }}>Global Partners</p>
            </div>
            <div className="text-center">
              <p className="font-heading font-bold" style={{ fontSize: '2.6rem', color: '#fff', letterSpacing: '-.02em', lineHeight: 1 }}>3+</p>
              <p className="label-small mt-2" style={{ color: 'rgba(255,255,255,0.55)' }}>Years Experience</p>
            </div>
            <div className="text-center">
              <p className="font-heading font-bold" style={{ fontSize: '2.6rem', color: '#fff', letterSpacing: '-.02em', lineHeight: 1 }}>5</p>
              <p className="label-small mt-2" style={{ color: 'rgba(255,255,255,0.55)' }}>Programs Led</p>
            </div>
          </div>
        </div>
      </div>

      {/* ═══ MARQUEE STRIP ═══ */}
      <div aria-hidden="true" style={{ background: '#F2ECE4', borderBottom: '1px solid rgba(28,28,30,0.07)', padding: '13px 0', overflow: 'hidden' }}>
        <div className="cm-marquee-track" style={{ animation: 'cmMarquee 32s linear infinite', width: 'max-content' }}>
          <div style={{ display: 'flex', alignItems: 'center', whiteSpace: 'nowrap' }}>
            {['International Partnership', 'Student Mobility', 'Creative Direction', 'Digital Strategy', 'Web Development', 'MoU / MoA', 'Surabaya, Indonesia'].map((label, i) => (
              <span key={i} style={{ display: 'contents' }}>
                <span style={{ padding: '0 28px', color: label === 'CroissantsMoon' ? '#0A84FF' : '#767676', fontSize: '.67rem', fontWeight: 600, letterSpacing: label === 'CroissantsMoon' ? '.06em' : '.11em', textTransform: 'uppercase', fontStyle: label === 'CroissantsMoon' ? 'italic' : 'normal', fontFamily: label === 'CroissantsMoon' ? "'Plus Jakarta Sans',sans-serif" : undefined }}>{label}</span>
                <span style={{ color: 'rgba(28,28,30,0.18)', fontSize: '.8rem' }}>·</span>
              </span>
            ))}
            <span style={{ padding: '0 28px', color: '#0A84FF', fontSize: '.67rem', fontWeight: 600, letterSpacing: '.06em', fontStyle: 'italic', fontFamily: "'Plus Jakarta Sans',sans-serif" }}>CroissantsMoon</span>
            <span style={{ color: 'rgba(28,28,30,0.18)', fontSize: '.8rem' }}>·</span>
          </div>
          <div aria-hidden="true" style={{ display: 'flex', alignItems: 'center', whiteSpace: 'nowrap' }}>
            {['International Partnership', 'Student Mobility', 'Creative Direction', 'Digital Strategy', 'Web Development', 'MoU / MoA', 'Surabaya, Indonesia'].map((label, i) => (
              <span key={i} style={{ display: 'contents' }}>
                <span style={{ padding: '0 28px', color: '#767676', fontSize: '.67rem', fontWeight: 600, letterSpacing: '.11em', textTransform: 'uppercase' }}>{label}</span>
                <span style={{ color: 'rgba(28,28,30,0.18)', fontSize: '.8rem' }}>·</span>
              </span>
            ))}
            <span style={{ padding: '0 28px', color: '#0A84FF', fontSize: '.67rem', fontWeight: 600, letterSpacing: '.06em', fontStyle: 'italic', fontFamily: "'Plus Jakarta Sans',sans-serif" }}>CroissantsMoon</span>
            <span style={{ color: 'rgba(28,28,30,0.18)', fontSize: '.8rem' }}>·</span>
          </div>
        </div>
      </div>

      {/* ═══ SELECTED WORK ═══ */}
      <div style={{ background: 'var(--color-bg,#F2F2F7)', padding: '72px 20px' }}>
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between gap-4 flex-wrap mb-10">
            <div>
              <div className="flex items-center gap-3 mb-3"><span className="accent-line" /><span className="label-small">Selected Work</span></div>
              <h2 className="font-heading font-bold" style={{ fontSize: 'clamp(1.7rem,5vw,2.4rem)', color: '#1C1C1E', letterSpacing: '-.02em', lineHeight: 1.1 }}>Where I Make an Impact</h2>
            </div>
            <Link href="/projects-overview" className="text-sm font-medium inline-flex items-center gap-2 transition-all hover:gap-3" style={{ color: '#0A84FF', textDecoration: 'none' }}>
              All Projects <ArrowRight style={{ width: 14, height: 14 }} />
            </Link>
          </div>

          {/* Top row: large + small */}
          <div className="grid lg:grid-cols-3 gap-4 mb-4">
            {/* AMERTA — large card */}
            <Link href="/amerta" className="home-work-card lg:col-span-2 group relative overflow-hidden rounded-2xl block" style={{ padding: 44, minHeight: 260, textDecoration: 'none', color: 'inherit' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/assets/images/student-services/tailor-made/griffith-unair-2.JPEG" alt="AMERTA exchange students at Griffith University" loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg,rgba(30,58,95,0.88),rgba(74,107,138,0.72))' }} />
              <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 90% 10%,rgba(139,115,85,0.18),transparent 50%)' }} />
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span style={{ fontSize: '.67rem', fontWeight: 600, letterSpacing: '.11em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)' }}>Exchange Program</span>
                  <span className="home-work-arrow" style={{ width: 38, height: 38, borderRadius: '50%', background: 'rgba(255,255,255,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background .2s' }}>
                    <ArrowUpRight style={{ width: 16, height: 16, color: '#fff' }} />
                  </span>
                </div>
                <div>
                  <h3 className="font-heading font-bold text-2xl mb-2" style={{ color: '#fff', letterSpacing: '-.01em', lineHeight: 1.2 }}>AMERTA Exchange<br />Program</h3>
                  <p className="text-sm" style={{ color: 'rgba(255,255,255,0.75)' }}>120+ students · IDR 50–100M per cohort · Universitas Airlangga</p>
                </div>
              </div>
            </Link>

            {/* PCU Global — browser card */}
            <Link href="/croissantsmoon/web-pcu-global-intl" className="home-work-card group relative overflow-hidden rounded-2xl block" style={{ background: 'var(--color-surface,rgba(255,255,255,0.72))', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.28)', minHeight: 260, textDecoration: 'none', color: 'inherit' }}>
              <div style={{ position: 'relative', overflow: 'hidden', height: 160, background: '#0a0a14', flexShrink: 0 }}>
                <iframe
                  src="https://international-office-website.vercel.app/"
                  style={{ position: 'absolute', top: 0, left: 0, width: '300%', height: 480, transform: 'scale(0.333)', transformOrigin: 'top left', border: 'none', pointerEvents: 'none' }}
                  loading="lazy"
                  sandbox="allow-scripts allow-same-origin"
                  aria-hidden="true"
                  title="PCU Global International Office Website preview"
                />
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 2, background: 'rgba(0,0,0,0.58)', padding: '9px 14px', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ display: 'flex', gap: 5, flexShrink: 0 }}>
                    <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#FF5F57', display: 'inline-block' }} />
                    <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#FFBD2E', display: 'inline-block' }} />
                    <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#28CA41', display: 'inline-block' }} />
                  </div>
                  <div style={{ flex: 1, background: 'rgba(255,255,255,0.07)', borderRadius: 6, padding: '3px 10px', fontSize: '.6rem', color: 'rgba(255,255,255,0.42)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>international-office-website.vercel.app</div>
                </div>
              </div>
              <div style={{ padding: '24px 28px' }} className="flex flex-col justify-between">
                <div className="flex items-center justify-between mb-4">
                  <span style={{ fontSize: '.67rem', fontWeight: 600, letterSpacing: '.11em', textTransform: 'uppercase', color: '#767676' }}>Web Project</span>
                  <span className="home-work-arrow" style={{ width: 38, height: 38, borderRadius: '50%', background: 'rgba(28,28,30,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background .2s' }}>
                    <ArrowUpRight style={{ width: 16, height: 16, color: '#5C5C5C' }} />
                  </span>
                </div>
                <div>
                  <div style={{ width: 36, height: 3, background: '#003087', borderRadius: 2, marginBottom: 16 }} />
                  <h3 className="font-heading font-bold text-xl mb-2" style={{ color: '#1C1C1E', letterSpacing: '-.01em', lineHeight: 1.2 }}>PCU Global<br />Website</h3>
                  <p className="text-sm" style={{ color: '#767676' }}>Full-stack · CMS · Mobile-first</p>
                </div>
              </div>
            </Link>
          </div>

          {/* Bottom row: three equal */}
          <div className="grid sm:grid-cols-3 gap-4">
            {/* ACI */}
            <Link href="/aci" className="home-work-card group relative overflow-hidden rounded-2xl block" style={{ minHeight: 160, textDecoration: 'none', color: 'inherit' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/assets/images/aci/aci-4.JPEG" alt="ACI cultural immersion program" loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to top,rgba(74,82,53,0.92) 0%,rgba(74,82,53,0.45) 100%)' }} />
              <div className="relative z-10 h-full flex flex-col justify-between p-7">
                <span style={{ fontSize: '.67rem', fontWeight: 600, letterSpacing: '.11em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)' }}>Cultural Program</span>
                <div>
                  <h3 className="font-heading font-semibold text-base leading-snug mb-2" style={{ color: '#fff' }}>ACI — Airlangga<br />Cultural Immersion</h3>
                  <div className="flex items-center gap-2 text-xs font-medium" style={{ color: 'rgba(255,255,255,0.85)' }}>View <ArrowRight style={{ width: 12, height: 12 }} /></div>
                </div>
              </div>
            </Link>

            {/* AERO */}
            <Link href="/aero" className="home-work-card group relative overflow-hidden rounded-2xl block" style={{ minHeight: 160, textDecoration: 'none', color: 'inherit' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/assets/images/aero/aero-header-1.JPEG" alt="AERO exhibition at Universitas Airlangga" loading="lazy" className="absolute inset-0 w-full h-full object-cover" style={{ objectPosition: 'center 30%' }} />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to top,rgba(28,28,30,0.92) 0%,rgba(28,28,30,0.45) 100%)' }} />
              <div className="relative z-10 h-full flex flex-col justify-between p-7">
                <span style={{ fontSize: '.67rem', fontWeight: 600, letterSpacing: '.11em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)' }}>Exhibition</span>
                <div>
                  <h3 className="font-heading font-semibold text-base leading-snug mb-2" style={{ color: '#fff' }}>AERO Exhibition</h3>
                  <div className="flex items-center gap-2 text-xs font-medium" style={{ color: 'rgba(255,255,255,0.85)' }}>View <ArrowRight style={{ width: 12, height: 12 }} /></div>
                </div>
              </div>
            </Link>

            {/* CroissantsMoon */}
            <Link href="/croissantsmoon" className="home-work-card group relative overflow-hidden rounded-2xl block" style={{ background: 'linear-gradient(135deg,#1C1C1E 0%,#2C2C2E 100%)', padding: 28, textDecoration: 'none', color: 'inherit', minHeight: 160 }}>
              <div style={{ width: 28, height: 3, background: '#FF6B47', borderRadius: 2, marginBottom: 18 }} />
              <span style={{ fontSize: '.67rem', fontWeight: 600, letterSpacing: '.11em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)', display: 'block', marginBottom: 10 }}>Creative Studio</span>
              <h3 className="font-heading font-semibold text-base leading-snug" style={{ color: '#fff', fontStyle: 'italic' }}>CroissantsMoon</h3>
              <div className="mt-4 flex items-center gap-2 text-xs font-medium" style={{ color: '#FF6B47' }}>Explore <ArrowRight style={{ width: 12, height: 12 }} /></div>
            </Link>
          </div>
        </div>
      </div>

      {/* ═══ INTERACTIVE SKILL DISCOVERY ═══ */}
      <SkillDiscovery />

      {/* ═══ CORE COMPETENCY LIST ═══ */}
      <div style={{ background: '#FAFAF8', padding: '80px 24px' }}>
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-12"><span className="accent-line" /><span className="label-small">Core Competencies</span></div>
          <div>
            <Link href="/partnerships" className="competency-row w-full items-start gap-6 py-7" style={{ borderTop: '1px solid rgba(28,28,30,0.1)', textDecoration: 'none', color: 'inherit' }}>
              <span className="font-heading font-bold flex-shrink-0" style={{ fontSize: '.9rem', color: '#0A84FF', minWidth: 32, marginTop: 3 }}>01</span>
              <div className="flex-1 min-w-0">
                <span className="label-small block mb-1.5" style={{ color: '#767676' }}>Global Partnerships</span>
                <h3 className="font-heading font-semibold text-lg leading-snug" style={{ color: '#1C1C1E' }}>International Partnership Management</h3>
              </div>
              <p className="hidden md:block text-sm leading-relaxed flex-1" style={{ color: '#5C5C5C', maxWidth: 340, marginTop: 20 }}>Managing 30+ institutional partners and reviewing 25+ MoU/MoA agreements monthly</p>
              <span className="competency-cta flex items-center gap-2 text-sm font-medium flex-shrink-0" style={{ color: '#0A84FF', marginTop: 22 }}>View <ArrowRight style={{ width: 14, height: 14 }} /></span>
            </Link>
            <Link href="/onboarding" className="competency-row w-full items-start gap-6 py-7" style={{ borderTop: '1px solid rgba(28,28,30,0.1)', textDecoration: 'none', color: 'inherit' }}>
              <span className="font-heading font-bold flex-shrink-0" style={{ fontSize: '.9rem', color: '#4A6B8A', minWidth: 32, marginTop: 3 }}>02</span>
              <div className="flex-1 min-w-0">
                <span className="label-small block mb-1.5" style={{ color: '#767676' }}>Student Services</span>
                <h3 className="font-heading font-semibold text-lg leading-snug" style={{ color: '#1C1C1E' }}>International Student Support</h3>
              </div>
              <p className="hidden md:block text-sm leading-relaxed flex-1" style={{ color: '#5C5C5C', maxWidth: 340, marginTop: 20 }}>End-to-end welfare, mobility, and onboarding for 200+ international students across Surabaya</p>
              <span className="competency-cta flex items-center gap-2 text-sm font-medium flex-shrink-0" style={{ color: '#4A6B8A', marginTop: 22 }}>View <ArrowRight style={{ width: 14, height: 14 }} /></span>
            </Link>
            <Link href="/projects-overview" className="competency-row w-full items-start gap-6 py-7" style={{ borderTop: '1px solid rgba(28,28,30,0.1)', textDecoration: 'none', color: 'inherit' }}>
              <span className="font-heading font-bold flex-shrink-0" style={{ fontSize: '.9rem', color: '#6B4F32', minWidth: 32, marginTop: 3 }}>03</span>
              <div className="flex-1 min-w-0">
                <span className="label-small block mb-1.5" style={{ color: '#767676' }}>Program Management</span>
                <h3 className="font-heading font-semibold text-lg leading-snug" style={{ color: '#1C1C1E' }}>Exchange Program Management</h3>
              </div>
              <p className="hidden md:block text-sm leading-relaxed flex-1" style={{ color: '#5C5C5C', maxWidth: 340, marginTop: 20 }}>5 end-to-end exchange programs — AMERTA, ACI, AERO — with IDR 50–90M per-program budgets</p>
              <span className="competency-cta flex items-center gap-2 text-sm font-medium flex-shrink-0" style={{ color: '#6B4F32', marginTop: 22 }}>View <ArrowRight style={{ width: 14, height: 14 }} /></span>
            </Link>
            <Link href="/croissantsmoon" className="competency-row w-full items-start gap-6 py-7" style={{ borderTop: '1px solid rgba(28,28,30,0.1)', borderBottom: '1px solid rgba(28,28,30,0.1)', textDecoration: 'none', color: 'inherit' }}>
              <span className="font-heading font-bold flex-shrink-0" style={{ fontSize: '.9rem', color: '#1C1C1E', minWidth: 32, marginTop: 3, fontStyle: 'italic' }}>CM</span>
              <div className="flex-1 min-w-0">
                <span className="label-small block mb-1.5" style={{ color: '#767676' }}>Creative Identity</span>
                <h3 className="font-heading font-semibold text-lg leading-snug" style={{ color: '#1C1C1E', fontStyle: 'italic', fontFamily: "'Plus Jakarta Sans',sans-serif" }}>CroissantsMoon</h3>
              </div>
              <p className="hidden md:block text-sm leading-relaxed flex-1" style={{ color: '#5C5C5C', maxWidth: 340, marginTop: 20 }}>Creative digital experiences &amp; a future studio identity in development</p>
              <span className="competency-cta flex items-center gap-2 text-sm font-medium flex-shrink-0" style={{ color: '#0A84FF', marginTop: 22 }}>Explore <ArrowRight style={{ width: 14, height: 14 }} /></span>
            </Link>
          </div>
        </div>
      </div>

      {/* ═══ CTA SECTION ═══ */}
      <div style={{ background: '#1C1C1E', padding: '100px 24px', position: 'relative', overflow: 'hidden' }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 85% 50%,rgba(139,115,85,0.11),transparent 50%),radial-gradient(ellipse at 15% 50%,rgba(74,107,138,0.06),transparent 45%)' }} />
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden" style={{ opacity: .025 }}>
          <span style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 'clamp(10rem,18vw,22rem)', fontWeight: 800, fontStyle: 'italic', color: '#fff', userSelect: 'none', whiteSpace: 'nowrap', lineHeight: 1 }}>Let&apos;s talk</span>
        </div>
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <p className="font-editorial text-base mb-5" style={{ color: '#0A84FF' }}>Let&apos;s build something meaningful</p>
          <h2 className="font-heading font-bold mb-4" style={{ fontSize: 'clamp(2.4rem,5vw,3.8rem)', color: '#fff', letterSpacing: '-.02em', lineHeight: 1.05 }}>
            Open to<br /><em style={{ fontStyle: 'italic', color: '#0A84FF' }}>Conversations</em>
          </h2>
          <p className="text-sm mb-11" style={{ color: 'rgba(255,255,255,0.38)', maxWidth: 380, marginLeft: 'auto', marginRight: 'auto', lineHeight: 1.7 }}>
            Partnerships, collaborations, education projects, or creative work — I&apos;m always open to a good conversation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/assets/data/profile.pdf" download className="btn-cv-download font-medium text-sm px-8 py-4 rounded-full justify-center gap-2">
              <Download style={{ width: 15, height: 15 }} /> Download CV
            </a>
            <Link href="/contact" className="btn-contact-outline font-medium text-sm px-8 py-4 rounded-full justify-center gap-2">
              <Mail style={{ width: 15, height: 15 }} /> Contact Me
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
