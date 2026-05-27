'use client'

import { useEffect, useState } from 'react'

const slides = [
  '/assets/images/student-services/tailor-made/griffith-unair-2.JPEG',
  '/assets/images/aci/aci-4.JPEG',
  '/assets/images/aero/aero-header-1.JPEG',
  '/assets/images/student-services/tailor-made/griffith-unair-5.JPEG',
  '/assets/images/aci/aci-2.JPEG',
]

export default function ProjectsHero() {
  const [idx, setIdx] = useState(0)
  const [fading, setFading] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setFading(true)
      setTimeout(() => {
        setIdx(i => (i + 1) % slides.length)
        setFading(false)
      }, 600)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="proj-hero-slide" style={{ position: 'relative', minHeight: 420, overflow: 'hidden' }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={slides[idx]}
        alt="Projects"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ transition: 'opacity .6s ease', opacity: fading ? 0 : 1 }}
      />
      <div className="hero-slide-overlay absolute inset-0" style={{ background: 'linear-gradient(160deg,rgba(10,20,50,0.82) 0%,rgba(28,60,110,0.6) 50%,rgba(10,20,50,0.85) 100%)' }} />

      {/* Slide dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2" style={{ zIndex: 10 }}>
        {slides.map((_, i) => (
          <button key={i} onClick={() => { setFading(true); setTimeout(() => { setIdx(i); setFading(false) }, 300) }}
            style={{ width: i === idx ? 22 : 7, height: 7, borderRadius: 999, border: 'none', cursor: 'pointer', transition: 'all .35s', background: i === idx ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.3)', padding: 0 }} />
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center text-center" style={{ minHeight: 420, padding: '80px 24px 72px' }}>
        <span style={{ fontSize: '.62rem', fontWeight: 700, letterSpacing: '.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)', marginBottom: 16, display: 'block' }}>Portfolio</span>
        <h1 className="font-heading font-bold text-white" style={{ fontSize: 'clamp(2.2rem,6vw,3.8rem)', letterSpacing: '-.025em', lineHeight: 1.05, marginBottom: 18 }}>Selected Work</h1>
        <p style={{ fontSize: '.9rem', color: 'rgba(255,255,255,0.65)', maxWidth: 480, lineHeight: 1.72, marginBottom: 32 }}>
          Programs, platforms, and creative projects — from international student exchange to full-stack web development.
        </p>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
          {['Student Mobility', 'Digital Projects', 'Creative Direction'].map(tag => (
            <span key={tag} style={{ fontSize: '.72rem', fontWeight: 600, padding: '6px 16px', borderRadius: 999, background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(8px)' }}>{tag}</span>
          ))}
        </div>
      </div>
    </div>
  )
}
