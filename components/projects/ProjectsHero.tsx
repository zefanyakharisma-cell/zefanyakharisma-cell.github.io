'use client'

import { useEffect, useState } from 'react'

const slides = [
  '/assets/images/aci/aci-12.JPEG',
  '/assets/images/aero/aero-5.jpg',
  '/assets/images/aci/aci-3.jpeg',
  '/assets/images/aero/aero-10.jpg',
  '/assets/images/student-services/tailor-made/ljmu-unair-2.JPEG',
  '/assets/images/student-services/tailor-made/staffordshire-unair-2.JPEG',
]

const stats = [
  { number: '3', label: 'Flagship Programs' },
  { number: '200+', label: 'Students Supported' },
  { number: 'IDR 290M', label: 'Budget Peak' },
  { number: '50+', label: 'Stakeholders Engaged' },
]

export default function ProjectsHero() {
  const [idx, setIdx] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setIdx(i => (i + 1) % slides.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div
      style={{
        background: '#FAFAF8',
        minHeight: 'min(88vh, 720px)',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        paddingLeft: 'clamp(24px, 5vw, 80px)',
        paddingRight: 'clamp(24px, 5vw, 80px)',
        paddingTop: 'clamp(4rem, 10vh, 7rem)',
        paddingBottom: '100px',
      }}
    >
      {/* Background slides */}
      {slides.map((src, i) => (
        <div
          key={src}
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url(${src})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: i === idx ? 1 : 0,
            transition: 'opacity 1.8s ease',
            zIndex: 0,
          }}
        />
      ))}

      {/* Light overlay — heavy on left, fades right */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: [
            'linear-gradient(to bottom, rgba(242,242,247,0.6) 0%, rgba(242,242,247,0.2) 100%)',
            'linear-gradient(to right, rgba(242,242,247,0.95) 0%, rgba(242,242,247,0.72) 38%, rgba(242,242,247,0.1) 100%)',
          ].join(', '),
          backdropFilter: 'blur(2px)',
          WebkitBackdropFilter: 'blur(2px)',
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />

      {/* Radial ambient decoration */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background: [
            'radial-gradient(ellipse at 75% 25%, rgba(139,115,85,0.07), transparent 55%)',
            'radial-gradient(ellipse at 5% 90%, rgba(74,107,138,0.05), transparent 50%)',
          ].join(', '),
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />

      {/* Content */}
      <div
        className="max-w-6xl mx-auto relative w-full flex flex-col justify-center"
        style={{ zIndex: 10, minHeight: 'calc(min(88vh, 720px) - 200px)' }}
      >
        {/* Breadcrumb */}
        <div className="flex items-center gap-2.5 mb-10" style={{ animation: 'fadeUp .4s ease both' }}>
          <span style={{ fontSize: '.67rem', fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: 'rgba(28,28,30,0.38)' }}>Portfolio</span>
          <span style={{ color: 'rgba(28,28,30,0.18)', fontSize: '.65rem' }}>·</span>
          <span style={{ fontSize: '.67rem', fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: 'rgba(28,28,30,0.38)' }}>Projects</span>
        </div>

        {/* Heading */}
        <div style={{ animation: 'fadeUp .5s ease .06s both' }}>
          <h1 className="font-heading font-bold" style={{ fontSize: 'clamp(3rem,7.5vw,6rem)', lineHeight: 1.0, letterSpacing: '-.03em', color: '#1C1C1E', margin: 0 }}>
            Projects
          </h1>
          <h1 className="font-heading font-bold" style={{ fontSize: 'clamp(3rem,7.5vw,6rem)', lineHeight: 1.0, letterSpacing: '-.03em', color: '#1C1C1E', margin: 0 }}>
            <em style={{ fontStyle: 'italic', color: '#8B7355' }}>Overview</em>
          </h1>
        </div>

        {/* Gold accent bar */}
        <div style={{ width: 48, height: 2, background: '#8B7355', borderRadius: 2, margin: '28px 0', animation: 'fadeUp .5s ease .12s both' }} />

        {/* Taglines */}
        <p
          className="font-editorial"
          style={{ fontSize: 'clamp(1rem,2vw,1.2rem)', color: '#1C1C1E', lineHeight: 1.5, maxWidth: 420, marginBottom: 0, animation: 'fadeUp .5s ease .16s both' }}
        >
          Programs managed end-to-end, digital products built from scratch.
        </p>
        <p style={{ fontSize: '.875rem', color: '#4A4A4A', marginTop: 8, maxWidth: 420, animation: 'fadeUp .5s ease .2s both' }}>
          International education · Institutional design · Surabaya
        </p>
      </div>

      {/* Stats bar */}
      <div
        className="absolute bottom-0 left-0 right-0"
        style={{ background: 'rgba(250,250,248,0.9)', backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)', borderTop: '1px solid rgba(28,28,30,0.07)', zIndex: 10 }}
      >
        <div className="max-w-6xl mx-auto" style={{ paddingLeft: 'clamp(24px, 5vw, 80px)', paddingRight: 'clamp(24px, 5vw, 80px)' }}>
          <div style={{ display: 'flex', flexWrap: 'nowrap', overflowX: 'auto', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {stats.map(({ number, label }, i) => (
              <div
                key={label}
                style={{
                  flexShrink: 0,
                  padding: '18px 28px 18px 0',
                  borderRight: i < stats.length - 1 ? '1px solid rgba(28,28,30,0.07)' : 'none',
                  marginRight: i < stats.length - 1 ? 28 : 0,
                }}
              >
                <div className="font-heading font-bold" style={{ fontSize: 'clamp(1.35rem, 2vw, 1.75rem)', letterSpacing: '-.025em', color: '#1C1C1E', lineHeight: 1 }}>{number}</div>
                <div style={{ fontSize: '.62rem', fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase' as const, color: '#767676', marginTop: 4 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
