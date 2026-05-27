'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { ArrowRight, Moon, ChevronDown } from 'lucide-react'

const slides = [
  '/assets/images/aci/aci-4.JPEG',
  '/assets/images/aero/aero-1.jpg',
  '/assets/images/student-services/tailor-made/griffith-unair-3.JPEG',
  '/assets/images/student-services/tailor-made/ljmu-unair-2.JPEG',
  '/assets/images/self-portrait/profile-15.JPG',
]

export default function HeroSection() {
  const currentRef = useRef(0)
  const slidesRef = useRef<HTMLDivElement[]>([])
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    const els = slidesRef.current
    if (!els.length) return
    // Shuffle
    for (let i = els.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [els[i], els[j]] = [els[j], els[i]]
    }
    els[0]?.classList.add('active')
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return
    timerRef.current = setInterval(() => {
      els[currentRef.current]?.classList.remove('active')
      currentRef.current = (currentRef.current + 1) % els.length
      els[currentRef.current]?.classList.add('active')
    }, 5000)
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [])

  const scrollToStats = () => {
    document.getElementById('home-stats-band')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="hero-editorial px-5" style={{ minHeight: 'min(88vh,720px)', paddingTop: 'clamp(2.5rem,7vh,5rem)', paddingBottom: 'clamp(2rem,5vh,4rem)' }}>
      {/* Slideshow background */}
      {slides.map((src, i) => (
        <div
          key={src}
          className="hero-slide"
          aria-hidden="true"
          style={{ backgroundImage: `url('${src}')` }}
          ref={el => { if (el) slidesRef.current[i] = el }}
        />
      ))}
      <div className="hero-slide-overlay" aria-hidden="true" />

      {/* Decorative gradients */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true"
        style={{ background: 'radial-gradient(ellipse at 70% 30%,rgba(139,115,85,0.09),transparent 55%),radial-gradient(ellipse at 10% 85%,rgba(74,107,138,0.05),transparent 50%)' }} />

      {/* Giant watermark Z */}
      <div className="absolute right-0 top-0 h-full hidden lg:flex items-center pointer-events-none" aria-hidden="true"
        style={{ width: '42%', overflow: 'hidden', maxWidth: 'min(42%,560px)' }}>
        <span style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 'clamp(16rem,22vw,30rem)', fontWeight: 800, fontStyle: 'italic', color: 'rgba(28,28,30,0.028)', lineHeight: 1, userSelect: 'none', transform: 'translateY(-4%)', display: 'block', overflow: 'hidden' }}>Z</span>
      </div>

      {/* Geometric ring accents */}
      <div className="absolute hidden lg:block pointer-events-none" aria-hidden="true" style={{ right: '15%', top: '15%', width: 220, height: 220, borderRadius: '50%', border: '1px solid rgba(139,115,85,0.11)' }} />
      <div className="absolute hidden lg:block pointer-events-none" aria-hidden="true" style={{ right: '18%', top: '22%', width: 110, height: 110, borderRadius: '50%', border: '1px solid rgba(139,115,85,0.07)' }} />

      <div className="max-w-6xl mx-auto relative z-10 flex flex-col md:flex-row items-center gap-12 md:gap-16">
        {/* Avatar */}
        <div className="flex-shrink-0" style={{ animation: 'springIn .6s cubic-bezier(0.34,1.56,0.64,1) both' }}>
          <div className="relative mx-auto md:mx-0" style={{ width: 148, height: 148 }}>
            <div style={{ position: 'absolute', inset: -4, borderRadius: '50%', background: 'linear-gradient(135deg,#0A84FF,#5AC8FA,#34C759)', padding: 3, zIndex: 0 }}>
              <div style={{ width: '100%', height: '100%', borderRadius: '50%', background: 'var(--color-bg,#F2F2F7)' }} />
            </div>
            <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', overflow: 'hidden', boxShadow: '0 16px 48px rgba(10,132,255,0.22)' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/assets/images/self-portrait/profile-pic-1.png" alt="Zefanya Kharisma Nugroho" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }} />
            </div>
            <div style={{ position: 'absolute', bottom: 4, right: 4, width: 14, height: 14, borderRadius: '50%', background: '#34C759', border: '2.5px solid var(--color-bg,#F2F2F7)', zIndex: 2 }} />
          </div>
        </div>

        {/* Text content */}
        <div>
          {/* Status pill */}
          <div className="flex flex-wrap items-center gap-3 mb-10" style={{ animation: 'fadeUp .5s ease both' }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full" style={{ background: 'rgba(255,255,255,0.72)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.3)', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#34C759', display: 'inline-block', boxShadow: '0 0 0 3px rgba(52,199,89,0.2)' }} />
              <span className="label-small">International Partnerships · Creative Technologist</span>
            </div>
            <span className="label-small">· Surabaya, Indonesia</span>
          </div>

          {/* Name */}
          <h1 className="hero-large-text mb-6" style={{ animation: 'springIn .6s cubic-bezier(0.34,1.56,0.64,1) .08s both' }}>
            Zefanya<br />
            <em style={{ color: '#0A84FF', fontStyle: 'normal', background: 'linear-gradient(135deg,#0A84FF,#5AC8FA)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Kharisma</em><br />
            Nugroho
          </h1>

          <div style={{ width: 40, height: 3, background: '#0A84FF', borderRadius: 3, marginBottom: 28, animation: 'fadeUp .55s ease .14s both' }} />

          <div className="max-w-md mb-10" style={{ animation: 'fadeUp .55s ease .18s both' }}>
            <p className="font-heading text-xl mb-2" style={{ color: '#1C1C1E', lineHeight: 1.4, fontWeight: 600 }}>Bridging global engagement &amp; digital creativity.</p>
            <p className="text-sm leading-relaxed" style={{ color: '#8E8E93', fontFamily: "'DM Sans',sans-serif" }}>International Education · Creative Technologist · Surabaya</p>
          </div>

          {/* CTAs */}
          <div style={{ animation: 'springIn .6s cubic-bezier(0.34,1.56,0.64,1) .22s both' }}>
            <div className="flex flex-wrap items-center gap-3">
              <Link href="/projects-overview" className="btn-primary font-medium text-sm px-7 py-3.5 rounded-full inline-flex items-center gap-2" style={{ textDecoration: 'none' }}>
                View Projects <ArrowRight style={{ width: 15, height: 15 }} />
              </Link>
              <Link href="/about-overview" className="btn-outline font-medium text-sm px-7 py-3.5 rounded-full inline-flex items-center gap-2" style={{ textDecoration: 'none' }}>
                About Me
              </Link>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <span className="label-small">Also:</span>
              <Link href="/croissantsmoon" className="inline-flex items-center gap-1.5 text-xs font-medium" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontStyle: 'italic', color: '#0A84FF', textDecoration: 'none' }}>
                CroissantsMoon <Moon style={{ width: 12, height: 12 }} />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <button
        className="absolute bottom-6 left-1/2 md:left-6 md:translate-x-0 flex flex-col items-center gap-2"
        aria-label="Scroll to next section"
        onClick={scrollToStats}
        style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, transform: 'translateX(-50%)' }}
      >
        <div className="hidden md:block" style={{ width: 1, height: 40, background: 'rgba(255,255,255,0.6)' }} />
        <span className="label-small hidden md:inline" style={{ writingMode: 'vertical-rl', letterSpacing: '.14em', color: 'rgba(255,255,255,0.7)' }}>Scroll</span>
        <ChevronDown className="md:hidden" style={{ width: 22, height: 22, color: 'rgba(255,255,255,0.75)', animation: 'cmScrollBounce 2.2s ease-in-out infinite' }} />
      </button>
    </div>
  )
}
