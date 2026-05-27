import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Design Work — CroissantsMoon · Zefanya Kharisma Nugroho',
  description: 'UI/UX design, graphic design for institutional programs, and editorial visual identities.',
}

const works = [
  { title: 'PCU Global Design System', type: 'UI/UX Design', year: '2025', desc: 'Complete design system for PCU\'s International Office — component library, typography scale, color system, and responsive layout patterns in Figma.', tags: ['Figma', 'Design System', 'UI/UX', 'Component Library'], color: '#003087' },
  { title: 'AERO Exhibition Branding', type: 'Graphic Design', year: '2024', desc: 'Visual identity for Universitas Airlangga\'s annual international exhibition — poster series, digital assets, banners, and motion graphics for presentations.', tags: ['Branding', 'Print Design', 'Motion', 'Event Identity'], color: '#8B7355' },
  { title: 'AMERTA Program Materials', type: 'Publication Design', year: '2024', desc: 'Welcome handbooks, orientation guides, and promotional materials for AMERTA semester exchange — bilingual design (English/Indonesian) optimized for both print and digital.', tags: ['Publication', 'Bilingual', 'Print', 'Information Design'], color: '#1E3A5F' },
  { title: 'Partnership Dashboard UI', type: 'UI/UX Design', year: '2025', desc: 'High-fidelity Figma designs for the PCU Partnership Management Dashboard — dark theme, data-dense layouts, and interactive prototype for stakeholder review.', tags: ['Figma', 'Dashboard Design', 'Dark Theme', 'Prototype'], color: '#4A6B8A' },
  { title: 'Social Media Design Templates', type: 'Graphic Design', year: '2024', desc: 'Instagram and LinkedIn template systems for PCU International Office — 20+ adaptable templates covering event announcements, program highlights, and partner spotlights.', tags: ['Social Media', 'Templates', 'Instagram', 'Canva'], color: '#D4B15A' },
]

export default function DesignsPage() {
  return (
    <div style={{ background: '#071126', minHeight: '100vh', color: '#D9E6FF' }}>
      <div style={{ padding: '60px 24px 48px', borderBottom: '1px solid rgba(111,168,255,0.1)' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <Link href="/croissantsmoon" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 24, padding: '8px 16px', borderRadius: 999, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '.84rem' }}>
            <ArrowLeft style={{ width: 14, height: 14 }} /> CroissantsMoon
          </Link>
          <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: '.62rem', fontWeight: 700, letterSpacing: '.22em', textTransform: 'uppercase', color: '#D4B15A', marginBottom: 12 }}>Design Portfolio</p>
          <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 'clamp(2.2rem,6vw,3.5rem)', fontWeight: 400, fontStyle: 'italic', color: '#D9E6FF', lineHeight: 1.1, marginBottom: 12 }}>Design Work</h1>
          <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: '.88rem', color: '#8FA8D6', lineHeight: 1.7, maxWidth: 460 }}>UI/UX systems, institutional branding, publication design, and visual identities for international education programs.</p>
        </div>
      </div>

      <div style={{ maxWidth: 900, margin: '0 auto', padding: '48px 24px 80px' }}>
        <div className="space-y-5">
          {works.map(w => (
            <div key={w.title} style={{ background: 'rgba(11,30,58,0.55)', backdropFilter: 'blur(16px)', border: '1px solid rgba(111,168,255,0.1)', borderLeft: `3px solid ${w.color}`, borderRadius: 20, padding: 28 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10, gap: 12, flexWrap: 'wrap' }}>
                <h2 style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 700, fontSize: '1.05rem', color: '#D9E6FF' }}>{w.title}</h2>
                <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
                  <span style={{ fontFamily: "'Outfit',sans-serif", fontSize: '.68rem', padding: '4px 12px', borderRadius: 999, background: `${w.color}18`, border: `1px solid ${w.color}30`, color: '#8FA8D6' }}>{w.type}</span>
                  <span style={{ fontFamily: "'Outfit',sans-serif", fontSize: '.68rem', padding: '4px 12px', borderRadius: 999, background: 'rgba(143,168,214,0.08)', color: '#8FA8D6' }}>{w.year}</span>
                </div>
              </div>
              <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: '.86rem', color: '#8FA8D6', lineHeight: 1.7, marginBottom: 16 }}>{w.desc}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {w.tags.map(t => (
                  <span key={t} style={{ fontFamily: "'Outfit',sans-serif", fontSize: '.68rem', fontWeight: 600, padding: '4px 12px', borderRadius: 999, background: `${w.color}12`, border: `1px solid ${w.color}24`, color: '#8FA8D6' }}>{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
