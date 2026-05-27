import type { Metadata } from 'next'
import Link from 'next/link'
import HeroSection from '@/components/home/HeroSection'
import { ArrowRight, Moon } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Zefanya Kharisma Nugroho',
  description: 'International Education Professional & Creative Technologist based in Surabaya.',
}

const stats = [
  { number: '480+', label: 'Students Supported' },
  { number: '30+', label: 'Global Partners' },
  { number: 'IDR 290M', label: 'Budget Managed' },
  { number: '5', label: 'Programs Led' },
]

const workCards = [
  {
    href: '/projects-overview',
    category: 'Student Mobility',
    title: 'AMERTA Exchange',
    desc: "Universitas Airlangga's flagship semester exchange — 120+ students, IDR 50–100M budget per cohort.",
    tags: ['Project Management', 'Leadership'],
    accent: '#4A6B8A',
  },
  {
    href: '/partnerships',
    category: 'Global Partnerships',
    title: 'Partnership Development',
    desc: 'Managing 30+ institutional partners and facilitating 15+ strategic meetings per month at PCU.',
    tags: ['International Partnership', 'MoU/MoA'],
    accent: '#1E3A5F',
  },
  {
    href: '/pcu-global',
    category: 'Web Platform',
    title: 'PCU Global Website',
    desc: "Rebuilding PCU's International Office digital presence — full-stack web app, news CMS, and mobile-first design.",
    tags: ['Web Development', 'UI/UX Design'],
    accent: '#003087',
  },
]

export default function Home() {
  return (
    <>
      <HeroSection />

      {/* ── Stats Band ── */}
      <div id="home-stats-band" style={{ background: 'linear-gradient(135deg,#1C1C1E 0%,#2C2C2E 100%)', padding: '36px 20px', margin: 0 }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map(s => (
              <div key={s.label} className="text-center">
                <p className="font-heading font-bold" style={{ fontSize: '2.6rem', color: '#fff', letterSpacing: '-.02em', lineHeight: 1 }}>{s.number}</p>
                <p className="label-small mt-2" style={{ color: 'rgba(255,255,255,0.55)' }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Selected Work ── */}
      <div style={{ padding: '80px 24px', background: '#FAFAF8' }}>
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-4"><span className="accent-line" /><span className="label-small">Selected Work</span></div>
          <h2 className="font-heading font-bold mb-2" style={{ fontSize: 'clamp(1.8rem,4vw,2.8rem)', color: '#1C1C1E', letterSpacing: '-.02em' }}>What I&apos;ve Built &amp; Managed</h2>
          <p className="text-sm mb-10" style={{ color: '#5C5C5C', maxWidth: 480 }}>International education programs and digital platforms built end-to-end across Surabaya.</p>
          <div className="grid md:grid-cols-3 gap-5">
            {workCards.map(card => (
              <Link key={card.href} href={card.href} className="card p-7 home-work-card group" style={{ background: '#fff', textDecoration: 'none', display: 'block' }}>
                <div className="label-small mb-2" style={{ color: card.accent }}>{card.category}</div>
                <h3 className="font-heading font-semibold text-base mb-2" style={{ color: '#1C1C1E' }}>{card.title}</h3>
                <p className="text-sm leading-relaxed mb-4" style={{ color: '#5C5C5C' }}>{card.desc}</p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {card.tags.map(t => <span key={t} className="tag">{t}</span>)}
                </div>
                <div className="flex items-center gap-2 text-sm font-medium" style={{ color: card.accent }}>
                  View <ArrowRight style={{ width: 14, height: 14 }} />
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link href="/projects-overview" className="btn-outline font-medium text-sm px-6 py-2.5 rounded-full inline-flex items-center gap-2">
              All Projects <ArrowRight style={{ width: 14, height: 14 }} />
            </Link>
          </div>
        </div>
      </div>

      {/* ── About Teaser ── */}
      <div style={{ padding: '80px 24px', background: '#F2ECE4' }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-3 mb-4"><span className="accent-line" /><span className="label-small">About</span></div>
              <h2 className="font-heading font-bold mb-6" style={{ fontSize: 'clamp(1.8rem,3.5vw,2.6rem)', color: '#1C1C1E', letterSpacing: '-.02em', lineHeight: 1.15 }}>
                International Education<br /><em style={{ fontStyle: 'italic', color: '#8B7355' }}>& Creative Technologist</em>
              </h2>
              <p className="text-base leading-relaxed mb-6" style={{ color: '#5C5C5C' }}>
                Over 3+ years, I&apos;ve supported 200+ international students and managed end-to-end global mobility programs across universities in Indonesia and beyond. From coordinating semester exchange programs and government scholarships (KNB & TIAS) to reviewing 25+ partnership agreements monthly, I bring both operational depth and strategic vision to international education.
              </p>
              <p className="text-sm leading-relaxed mb-8" style={{ color: '#5C5C5C' }}>
                Currently at Petra Christian University, I focus on building and strengthening institutional partnerships — facilitating 15+ strategic meetings per month, expanding access to international grants, and growing PCU&apos;s global network.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/about-overview" className="btn-primary font-medium text-sm px-7 py-3.5 rounded-full inline-flex items-center gap-2">
                  About Me <ArrowRight style={{ width: 15, height: 15 }} />
                </Link>
                <Link href="/contact" className="btn-outline font-medium text-sm px-7 py-3.5 rounded-full inline-flex items-center gap-2">
                  Get in Touch
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Currently', value: 'International Partnership Specialist', sub: 'Petra Christian University', color: '#1E3A5F' },
                { label: 'Based In', value: 'Surabaya', sub: 'East Java, Indonesia', color: '#8B7355' },
                { label: 'Years Active', value: '3+', sub: 'In international education', color: '#4A6B8A' },
                { label: 'Also Building', value: 'CroissantsMoon', sub: 'Creative digital studio', color: '#D4B15A' },
              ].map(item => (
                <div key={item.label} className="card p-5" style={{ background: '#fff', borderLeft: `3px solid ${item.color}` }}>
                  <p className="label-small mb-1" style={{ color: item.color }}>{item.label}</p>
                  <p className="font-heading font-semibold text-sm" style={{ color: '#1C1C1E' }}>{item.value}</p>
                  <p className="text-xs mt-1" style={{ color: '#767676' }}>{item.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── CroissantsMoon Teaser ── */}
      <Link href="/croissantsmoon" className="block" style={{ textDecoration: 'none' }}>
        <div style={{ background: '#071126', padding: '72px 24px', cursor: 'pointer' }}>
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10">
            <div className="flex-1">
              <p className="label-small mb-3" style={{ color: 'rgba(212,177,90,0.65)', letterSpacing: '.12em' }}>Creative Identity · In Development</p>
              <h2 className="font-heading font-bold mb-4 font-editorial" style={{ fontSize: 'clamp(2rem,4vw,3rem)', color: '#D9E6FF', fontStyle: 'italic', letterSpacing: '-.01em' }}>CroissantsMoon</h2>
              <p className="text-sm leading-relaxed mb-6" style={{ color: '#8FA8D6', maxWidth: 420 }}>A boutique creative studio — editorial design, brand systems, and curated digital experiences. Where craft meets the cosmos.</p>
              <div className="flex flex-wrap gap-1.5 mb-6">
                {['Branding', 'Creative Direction', 'UI/UX', 'Web Development'].map(t => (
                  <span key={t} className="tag" style={{ color: 'rgba(217,230,255,0.45)', borderColor: 'rgba(111,168,255,0.15)' }}>{t}</span>
                ))}
              </div>
              <div className="flex items-center gap-2 text-sm font-medium" style={{ color: '#D4B15A' }}>
                Explore the studio <ArrowRight style={{ width: 14, height: 14 }} />
              </div>
            </div>
            <div className="w-40 h-40 flex-shrink-0 flex items-center justify-center relative">
              <div style={{ position: 'absolute', width: 120, height: 120, borderRadius: '50%', background: 'radial-gradient(circle at 35% 35%,#D9E6FF 0%,#8FA8D6 50%,#4A6B8A 100%)', boxShadow: '0 0 40px rgba(217,230,255,0.2),0 0 80px rgba(111,168,255,0.1)' }} />
              <div style={{ position: 'absolute', width: 120, height: 120, borderRadius: '50%', background: '#071126', transform: 'translate(38px, -5px)' }} />
              <Moon style={{ position: 'relative', zIndex: 1, width: 32, height: 32, color: '#D4B15A', opacity: 0.5 }} />
            </div>
          </div>
        </div>
      </Link>
    </>
  )
}
