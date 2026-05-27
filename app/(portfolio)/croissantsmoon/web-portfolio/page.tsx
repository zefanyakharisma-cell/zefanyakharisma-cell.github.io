import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, Code2, Palette, Zap, Smartphone } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Portfolio Website — CroissantsMoon · Zefanya Kharisma Nugroho',
  description: 'This portfolio — built with Next.js 15, TypeScript, and an iOS-inspired design system.',
}

const highlights = [
  { icon: Code2, color: '#6FA8FF', title: 'Next.js 15 App Router', desc: 'Server components for static pages, client components for interactive sections — hero slideshows, accordion timelines, animated contact forms.' },
  { icon: Palette, color: '#D4B15A', title: 'iOS 26 Liquid Glass Design System', desc: 'Custom design language inspired by iOS 26 — glassmorphism cards, bottom tab bar, dynamic island top bar, spring animations, and editorial typography.' },
  { icon: Zap, color: '#6FD88A', title: 'Performance Optimized', desc: 'Lazy-loaded images, server-side rendering, font optimization via next/font, and no external CSS/JS CDN dependencies.' },
  { icon: Smartphone, color: '#8FA8D6', title: 'Mobile-First Responsive', desc: 'Mobile layout with tab bar navigation; desktop layout with horizontal nav — all transitions handled via CSS without JavaScript breakpoint hacks.' },
]

export default function WebPortfolioPage() {
  return (
    <div style={{ background: '#071126', minHeight: '100vh', color: '#D9E6FF' }}>
      <div style={{ padding: '60px 24px 48px', borderBottom: '1px solid rgba(111,168,255,0.1)' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <Link href="/croissantsmoon/websites" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 24, padding: '8px 16px', borderRadius: 999, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '.84rem' }}>
            <ArrowLeft style={{ width: 14, height: 14 }} /> Websites
          </Link>
          <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
            <span style={{ fontFamily: "'Outfit',sans-serif", fontSize: '.68rem', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', padding: '4px 12px', borderRadius: 999, background: 'rgba(139,115,85,0.3)', color: '#D4B15A', border: '1px solid rgba(212,177,90,0.2)' }}>Personal Project</span>
            <span style={{ fontFamily: "'Outfit',sans-serif", fontSize: '.68rem', padding: '4px 12px', borderRadius: 999, background: 'rgba(111,216,138,0.1)', border: '1px solid rgba(111,216,138,0.2)', color: '#6FD88A' }}>Live</span>
          </div>
          <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 'clamp(2rem,5.5vw,3.2rem)', fontWeight: 400, fontStyle: 'italic', color: '#D9E6FF', lineHeight: 1.1, marginBottom: 14 }}>Personal Portfolio Website</h1>
          <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: '.9rem', color: '#8FA8D6', lineHeight: 1.74, maxWidth: 540, marginBottom: 28 }}>
            This website — built with Next.js 15, TypeScript, Tailwind CSS, and a custom iOS-inspired design system. 25+ pages, animated components, and a dark cosmic contact form.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {['Next.js 15', 'TypeScript', 'Tailwind CSS', 'React 19', 'Lucide Icons'].map(t => (
              <span key={t} style={{ fontFamily: "'Outfit',sans-serif", fontSize: '.7rem', fontWeight: 600, padding: '5px 14px', borderRadius: 999, background: 'rgba(212,177,90,0.08)', border: '1px solid rgba(212,177,90,0.16)', color: '#8FA8D6' }}>{t}</span>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 900, margin: '0 auto', padding: '48px 24px 80px' }}>
        <h2 style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 700, fontSize: '1.1rem', color: '#D9E6FF', marginBottom: 24 }}>Technical Highlights</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16, marginBottom: 48 }}>
          {highlights.map(h => (
            <div key={h.title} style={{ background: 'rgba(11,30,58,0.55)', border: '1px solid rgba(111,168,255,0.1)', borderLeft: `3px solid ${h.color}`, borderRadius: 18, padding: 24 }}>
              <div style={{ width: 40, height: 40, borderRadius: 12, background: `${h.color}14`, border: `1px solid ${h.color}24`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                <h.icon style={{ width: 18, height: 18, color: h.color }} />
              </div>
              <h3 style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 700, fontSize: '.95rem', color: '#D9E6FF', marginBottom: 8 }}>{h.title}</h3>
              <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: '.82rem', color: '#8FA8D6', lineHeight: 1.68 }}>{h.desc}</p>
            </div>
          ))}
        </div>

        <div style={{ background: 'rgba(212,177,90,0.06)', border: '1px solid rgba(212,177,90,0.16)', borderRadius: 20, padding: 32, textAlign: 'center' }}>
          <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: '.88rem', color: '#8FA8D6', marginBottom: 16 }}>Explore the portfolio</p>
          <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: "'Outfit',sans-serif", fontSize: '.88rem', fontWeight: 700, color: '#071126', background: '#D4B15A', padding: '12px 28px', borderRadius: 999, textDecoration: 'none' }}>
            Go to Home <ArrowRight style={{ width: 15, height: 15 }} />
          </Link>
        </div>
      </div>
    </div>
  )
}
