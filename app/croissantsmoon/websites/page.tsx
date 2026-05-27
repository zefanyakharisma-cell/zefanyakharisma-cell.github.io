import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Websites — CroissantsMoon · Zefanya Kharisma Nugroho',
  description: 'Web development projects — full-stack platforms, dashboards, and digital presences built for international education.',
}

const projects = [
  {
    href: '/pcu-global',
    title: 'PCU Global International Office',
    sub: 'Petra Christian University',
    color: '#003087',
    year: '2025',
    desc: 'Full-stack web platform for PCU\'s International Office — news CMS, partnership directory, event calendar, meeting request system, and mobile-first design. Built with Next.js 15, Supabase, and Vercel.',
    tags: ['Next.js', 'Supabase', 'TypeScript', 'Tailwind CSS', 'Figma'],
    status: 'Live',
  },
  {
    href: '/croissantsmoon/web-dashboard-partnership',
    title: 'Partnership Management Dashboard',
    sub: 'Petra Christian University',
    color: '#1E3A5F',
    year: '2025',
    desc: 'Data dashboard for visualizing and managing 2,289+ institutional partnership agreements — 8-stage workflow pipeline, analytics, geographic distribution maps, and role-based access.',
    tags: ['React', 'Data Visualization', 'Dashboard', 'Systems Design'],
    status: 'In Development',
  },
  {
    href: '/croissantsmoon/web-dashboard-grants',
    title: 'International Grants Dashboard',
    sub: 'Petra Christian University',
    color: '#064E3B',
    year: '2025',
    desc: 'Centralizing international grant tracking from application to outcome — real-time status updates, deadline calendar with alerts, grant matching engine, and reporting tools.',
    tags: ['Next.js', 'Supabase', 'Calendar UI', 'Grant Management'],
    status: 'In Development',
  },
  {
    href: '/croissantsmoon/web-portfolio',
    title: 'Personal Portfolio Website',
    sub: 'This website',
    color: '#8B7355',
    year: '2025',
    desc: 'This portfolio — a Next.js 15 application with iOS-inspired design system, animated hero sections, project showcases, and contact form. Built entirely from scratch.',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'iOS Design'],
    status: 'Live',
  },
]

export default function WebsitesPage() {
  return (
    <div style={{ background: '#071126', minHeight: '100vh' }}>
      <div style={{ background: 'linear-gradient(180deg,rgba(11,20,50,0) 0%, #071126 100%)', position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }} />

      {/* Header */}
      <div style={{ position: 'relative', zIndex: 1, padding: '60px 24px 48px', borderBottom: '1px solid rgba(111,168,255,0.1)' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <Link href="/croissantsmoon" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 24, padding: '8px 16px', borderRadius: 999, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '.84rem' }}>
            <ArrowLeft style={{ width: 14, height: 14 }} /> CroissantsMoon
          </Link>
          <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: '.62rem', fontWeight: 700, letterSpacing: '.22em', textTransform: 'uppercase', color: '#D4B15A', marginBottom: 12 }}>Web Projects</p>
          <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 'clamp(2.2rem,6vw,3.5rem)', fontWeight: 400, fontStyle: 'italic', color: '#D9E6FF', lineHeight: 1.1, marginBottom: 12 }}>Websites &amp; Platforms</h1>
          <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: '.88rem', color: '#8FA8D6', lineHeight: 1.7, maxWidth: 480 }}>Full-stack web applications and digital platforms — purpose-built for international education institutions.</p>
        </div>
      </div>

      {/* Projects */}
      <div style={{ position: 'relative', zIndex: 1, maxWidth: 900, margin: '0 auto', padding: '48px 24px 80px' }}>
        <div className="space-y-6">
          {projects.map(p => (
            <Link key={p.href} href={p.href} style={{ display: 'block', textDecoration: 'none', background: 'rgba(11,30,58,0.6)', backdropFilter: 'blur(16px)', border: `1px solid ${p.color}28`, borderRadius: 20, padding: 32, borderLeft: `3px solid ${p.color}`, transition: 'all .3s' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16, marginBottom: 12, flexWrap: 'wrap' }}>
                <div>
                  <h2 style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 700, fontSize: '1.1rem', color: '#D9E6FF', marginBottom: 4 }}>{p.title}</h2>
                  <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: '.76rem', color: '#8FA8D6' }}>{p.sub} · {p.year}</p>
                </div>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexShrink: 0 }}>
                  <span style={{ fontFamily: "'Outfit',sans-serif", fontSize: '.68rem', fontWeight: 700, padding: '4px 12px', borderRadius: 999, background: p.status === 'Live' ? 'rgba(111,216,138,0.12)' : 'rgba(212,177,90,0.1)', border: `1px solid ${p.status === 'Live' ? 'rgba(111,216,138,0.2)' : 'rgba(212,177,90,0.2)'}`, color: p.status === 'Live' ? '#6FD88A' : '#D4B15A' }}>{p.status}</span>
                  <ArrowRight style={{ width: 16, height: 16, color: '#8FA8D6' }} />
                </div>
              </div>
              <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: '.86rem', color: '#8FA8D6', lineHeight: 1.7, marginBottom: 16 }}>{p.desc}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {p.tags.map(t => (
                  <span key={t} style={{ fontFamily: "'Outfit',sans-serif", fontSize: '.68rem', fontWeight: 600, padding: '4px 12px', borderRadius: 999, background: `${p.color}14`, border: `1px solid ${p.color}28`, color: '#8FA8D6' }}>{t}</span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
