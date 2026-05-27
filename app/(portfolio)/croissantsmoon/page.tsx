import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Globe2, Palette, PenLine, LayoutDashboard } from 'lucide-react'

export const metadata: Metadata = {
  title: 'CroissantsMoon — Zefanya Kharisma Nugroho',
  description: 'CroissantsMoon — creative studio for web development, UI/UX design, and digital writing.',
}

const sections = [
  {
    href: '/croissantsmoon/websites',
    icon: Globe2,
    color: '#6FA8FF',
    title: 'Websites',
    desc: 'Full-stack web platforms and purpose-driven digital presences — from international office portals to institutional dashboards.',
    count: '3+ projects',
  },
  {
    href: '/croissantsmoon/designs',
    icon: Palette,
    color: '#D4B15A',
    title: 'Design Work',
    desc: 'UI/UX design systems, graphic design for institutional programs, and editorial visual identities.',
    count: '5+ projects',
  },
  {
    href: '/croissantsmoon/writing',
    icon: PenLine,
    color: '#8FA8D6',
    title: 'Writing',
    desc: 'Institutional correspondence, academic research, strategic communications, and creative writing in English and Indonesian.',
    count: 'Ongoing',
  },
  {
    href: '/croissantsmoon/web-dashboard-partnership',
    icon: LayoutDashboard,
    color: '#6FD88A',
    title: 'Partnership Dashboard',
    desc: 'Data visualization for 2,289+ institutional agreements — 8-stage workflow, analytics, and partner relationship management.',
    count: 'PCU Project',
  },
]

export default function CroissantsMoonPage() {
  return (
    <div style={{ background: '#071126', minHeight: '100vh', color: '#D9E6FF' }}>
      {/* Cosmic hero */}
      <div style={{ position: 'relative', overflow: 'hidden', padding: '100px 24px 80px', textAlign: 'center' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 0%, rgba(111,168,255,0.12) 0%, transparent 60%)' }} />
        <div className="relative z-10 max-w-3xl mx-auto">
          <div style={{ display: 'inline-block', fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 'clamp(4rem,14vw,9rem)', fontWeight: 300, fontStyle: 'italic', color: 'rgba(212,177,90,0.15)', lineHeight: 1, marginBottom: -40, userSelect: 'none' }}>✦</div>
          <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: '.62rem', fontWeight: 700, letterSpacing: '.24em', textTransform: 'uppercase', color: '#D4B15A', marginBottom: 20 }}>Creative Studio</p>
          <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 'clamp(3rem,9vw,6rem)', fontWeight: 400, fontStyle: 'italic', color: '#D9E6FF', lineHeight: 1.02, marginBottom: 20 }}>CroissantsMoon</h1>
          <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: '.95rem', color: '#8FA8D6', lineHeight: 1.76, maxWidth: 460, margin: '0 auto 40px' }}>
            Where international education meets digital craft — web development, design systems, and purposeful writing.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            {['Web Development', 'UI/UX Design', 'Digital Strategy', 'Writing'].map(t => (
              <span key={t} style={{ fontFamily: "'Outfit',sans-serif", fontSize: '.72rem', fontWeight: 600, padding: '6px 16px', borderRadius: 999, background: 'rgba(111,168,255,0.08)', border: '1px solid rgba(111,168,255,0.16)', color: '#8FA8D6' }}>{t}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Sections */}
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 24px 80px' }}>
        <div className="grid md:grid-cols-2 gap-5">
          {sections.map(s => (
            <Link key={s.href} href={s.href} style={{ display: 'block', textDecoration: 'none', background: 'rgba(11,30,58,0.55)', backdropFilter: 'blur(16px)', border: '1px solid rgba(111,168,255,0.12)', borderRadius: 20, padding: 28, transition: 'all .3s' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                <div style={{ width: 44, height: 44, borderRadius: 14, background: `${s.color}14`, border: `1px solid ${s.color}24`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <s.icon style={{ width: 20, height: 20, color: s.color }} />
                </div>
                <span style={{ fontFamily: "'Outfit',sans-serif", fontSize: '.68rem', fontWeight: 600, color: '#8FA8D6', background: 'rgba(143,168,214,0.08)', padding: '3px 10px', borderRadius: 999 }}>{s.count}</span>
              </div>
              <h2 style={{ fontFamily: "'Outfit',sans-serif", fontSize: '1.1rem', fontWeight: 700, color: '#D9E6FF', marginBottom: 8 }}>{s.title}</h2>
              <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: '.84rem', color: '#8FA8D6', lineHeight: 1.68, marginBottom: 16 }}>{s.desc}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontFamily: "'Outfit',sans-serif", fontSize: '.8rem', fontWeight: 600, color: s.color }}>
                Explore <ArrowRight style={{ width: 14, height: 14 }} />
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div style={{ marginTop: 48, padding: '32px 36px', borderRadius: 20, background: 'rgba(212,177,90,0.06)', border: '1px solid rgba(212,177,90,0.16)', textAlign: 'center' }}>
          <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: '.88rem', color: '#8FA8D6', marginBottom: 16 }}>Interested in working together?</p>
          <Link href="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: "'Outfit',sans-serif", fontSize: '.88rem', fontWeight: 700, color: '#071126', background: '#D4B15A', padding: '12px 28px', borderRadius: 999, textDecoration: 'none' }}>
            Start a Project <ArrowRight style={{ width: 15, height: 15 }} />
          </Link>
        </div>
      </div>
    </div>
  )
}
