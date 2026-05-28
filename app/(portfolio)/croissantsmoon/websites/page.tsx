'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import AstronautFloat from '@/components/cm/AstronautFloat'
import StarField from '@/components/cm/StarField'

// ── Data ──────────────────────────────────────────────────────────────────────

const WD_PROJECTS = [
  {
    title: 'PCU Global',
    cat: 'Web Experience',
    year: '2026',
    desc: "Full-stack rebuild of PCU's International Office — clean architecture, live CMS, mobile-first design.",
    page: 'web-pcu-global-intl',
    href: '/croissantsmoon/web-pcu-global-intl',
    emoji: '🌐',
    url: 'international-office-website.vercel.app',
    live: 'https://international-office-website.vercel.app/',
    tags: ['HTML · CSS · JS', 'Responsive Design', 'CMS'],
    pc: ['#0C4A6E', '#0369A1', '#0EA5E9', '#7BC8F6', '#F0F9FF'],
  },
  {
    title: 'This Portfolio',
    cat: 'Editorial Design',
    year: '2025',
    desc: 'Premium editorial aesthetic — typography-led, intentional. International education storytelling through design.',
    page: 'web-portfolio',
    href: '/croissantsmoon/web-portfolio',
    emoji: '✦',
    url: 'zefanyakharisma.com',
    live: 'https://zefanyakharisma.com',
    tags: ['UI/UX Design', 'Tailwind CSS', 'Supabase'],
    pc: ['#1C1C1E', '#8B7355', '#F5D05E', '#FAFAF8', '#F2ECE4'],
  },
  {
    title: 'Dashboard Partnership',
    cat: 'Data Dashboard',
    year: '2025',
    desc: 'Interactive dashboard for visualising and managing 2,289 institutional partnerships with workflow management.',
    page: 'web-dashboard-partnership',
    href: '/croissantsmoon/web-dashboard-partnership',
    emoji: '◈',
    url: 'dashboard-partnership.vercel.app',
    live: 'https://dashboard-partnership.vercel.app/',
    tags: ['Chart.js', 'Tailwind CSS', 'Supabase Auth'],
    pc: ['#0F172A', '#1E3A5F', '#3B82F6', '#93C5FD', '#EFF6FF'],
  },
  {
    title: 'International Grants',
    cat: 'Data Dashboard',
    year: '2025',
    desc: 'Grant discovery and management platform with realtime updates, deadline calendar, and admin CRUD.',
    page: 'web-dashboard-grants',
    href: '/croissantsmoon/web-dashboard-grants',
    emoji: '✺',
    url: 'dashboard-international-grants.vercel.app',
    live: 'https://dashboard-international-grants.vercel.app/',
    tags: ['Realtime', 'Supabase', 'Chart.js'],
    pc: ['#1C1C1E', '#4A1D5F', '#8B5CF6', '#C4B5FD', '#F5F3FF'],
  },
]

const WD_MARQUEE_ITEMS = [
  '✦ HTML · CSS · JavaScript', '◈ Tailwind CSS', '◉ Responsive Design',
  '⬡ UI/UX Design', '◎ Typography', '✺ CMS Integration', '✦ Mobile-First',
  '◈ Editorial Design', '◉ Web Animation', '⬡ Accessibility',
]

const WD_PROCESS = [
  { icon: '✦', label: 'Discover', desc: 'Understanding the goal, the audience, and what success looks like. Questions first. Answers second.' },
  { icon: '◈', label: 'Design',   desc: 'Wireframes, hierarchy, visual language. Establishing structure and feeling before touching code.' },
  { icon: '◉', label: 'Build',    desc: 'Clean HTML, semantic structure, responsive layouts. Code that reads like good writing.' },
  { icon: '◎', label: 'Refine',   desc: 'Testing across devices, optimizing performance, sweating the details. The work that makes it feel right.' },
  { icon: '✺', label: 'Ship',     desc: 'Launching with intention. Optimized, accessible, and ready to meet the people it was made for.' },
]

const WD_SKILLS = [
  { text: 'HTML · CSS',           color: '#6FA8FF' },
  { text: 'JavaScript',           color: '#D4B15A' },
  { text: 'Tailwind CSS',         color: '#D9E6FF' },
  { text: 'Responsive Design',    color: '#8FA8D6' },
  { text: 'UI/UX Design',         color: '#6FA8FF' },
  { text: 'Typography',           color: '#D4B15A' },
  { text: 'CMS Integration',      color: '#D9E6FF' },
  { text: 'Web Animation',        color: '#8FA8D6' },
  { text: 'Mobile-First',         color: '#6FA8FF' },
  { text: 'Editorial Design',     color: '#D4B15A' },
  { text: 'Accessibility',        color: '#D9E6FF' },
  { text: 'Performance',          color: '#8FA8D6' },
  { text: 'Git & Version Control', color: '#6FA8FF' },
  { text: 'Cross-Browser Testing', color: '#D4B15A' },
  { text: 'Design Systems',        color: '#D9E6FF' },
  { text: 'Color Theory',          color: '#8FA8D6' },
]

const TAG_ROTATIONS = ['-2deg','1deg','-1.5deg','2.5deg','0deg','-0.8deg','1.2deg','-1deg','0.5deg','-1.2deg','1.8deg','-0.5deg']
const TAG_SIZES     = ['.77rem', '.9rem', '1.05rem']
const TAG_PADDINGS  = ['5px 14px', '7px 18px', '9px 22px']

// ── ProjectCard ───────────────────────────────────────────────────────────────

interface Project {
  title: string; cat: string; year: string; desc: string
  page: string; href: string; emoji: string; url: string; live: string
  tags: string[]; pc: string[]
}

function ProjectCard({ project: w }: { project: Project }) {
  const [loaded, setLoaded] = useState(false)
  const [c1, c2, c3, c4, c5] = w.pc

  return (
    <Link
      href={w.href}
      style={{
        background: 'rgba(11,30,58,0.65)', borderRadius: 18, overflow: 'hidden',
        border: '1px solid rgba(111,168,255,0.14)', backdropFilter: 'blur(14px)',
        display: 'block', textDecoration: 'none',
        transition: 'transform .25s ease, box-shadow .25s ease',
      }}
      onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.transform = 'translateY(-6px)'; el.style.boxShadow = '0 20px 60px rgba(3,7,18,0.55),0 0 0 1px rgba(111,168,255,0.22)' }}
      onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.transform = ''; el.style.boxShadow = '' }}
    >
      {/* Browser chrome */}
      <div style={{ background: 'rgba(7,17,38,0.6)', padding: '7px 12px', borderBottom: '1px solid rgba(111,168,255,0.08)', display: 'flex', alignItems: 'center', gap: 7 }}>
        <div style={{ display: 'flex', gap: 4, flexShrink: 0 }}>
          <span style={{ width: 9, height: 9, borderRadius: '50%', background: '#FF5F5788', display: 'block' }} />
          <span style={{ width: 9, height: 9, borderRadius: '50%', background: '#FEBC2E88', display: 'block' }} />
          <span style={{ width: 9, height: 9, borderRadius: '50%', background: '#28C84088', display: 'block' }} />
        </div>
        <span style={{ flex: 1, background: 'rgba(3,7,18,0.5)', borderRadius: 4, padding: '2px 9px', fontSize: '.58rem', color: '#8FA8D6', border: '1px solid rgba(111,168,255,0.1)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontFamily: "'Outfit',sans-serif" }}>{w.url}</span>
      </div>
      {/* Preview area */}
      <div style={{ height: 148, background: c1, position: 'relative', overflow: 'hidden' }}>
        {/* Fallback */}
        <div style={{ position: 'absolute', inset: 0, background: c5, zIndex: 1, transition: 'opacity .4s ease', opacity: loaded ? 0 : 1 }}>
          <div style={{ height: 26, background: c1, display: 'flex', alignItems: 'center', padding: '0 10px', gap: 8 }}>
            <div style={{ height: 4, width: 30, background: `${c4}30`, borderRadius: 2 }} />
            <div style={{ height: 4, width: 42, background: `${c4}30`, borderRadius: 2 }} />
            <div style={{ height: 4, width: 22, background: `${c4}30`, borderRadius: 2 }} />
            <div style={{ flex: 1 }} />
            <div style={{ height: 13, width: 36, background: `${c4}40`, borderRadius: 3 }} />
          </div>
          <div style={{ padding: '10px 12px' }}>
            <div style={{ height: 9, width: '52%', background: c2, borderRadius: 4, marginBottom: 6, opacity: .75 }} />
            <div style={{ height: 5, width: '80%', background: c3, borderRadius: 3, marginBottom: 4, opacity: .45 }} />
            <div style={{ height: 5, width: '60%', background: c3, borderRadius: 3, marginBottom: 10, opacity: .35 }} />
            <div style={{ display: 'flex', gap: 6 }}>
              <div style={{ height: 20, width: 60, background: c2, borderRadius: 10, opacity: .85 }} />
              <div style={{ height: 20, width: 50, background: 'transparent', border: `1.5px solid ${c2}`, borderRadius: 10, opacity: .55 }} />
            </div>
          </div>
          <div style={{ position: 'absolute', bottom: 6, right: 12, fontSize: '1.8rem', opacity: .18 }}>{w.emoji}</div>
        </div>
        {/* Live iframe */}
        <iframe
          src={w.live}
          scrolling="no"
          tabIndex={-1}
          aria-hidden="true"
          title={`${w.title} homepage preview`}
          onLoad={() => setLoaded(true)}
          style={{ position: 'absolute', top: 0, left: 0, width: 1620, height: 800, transform: 'scale(0.185)', transformOrigin: 'top left', border: 'none', pointerEvents: 'none', zIndex: 2 }}
          loading="lazy"
        />
        {/* Gradient polish */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 3, pointerEvents: 'none', background: 'linear-gradient(to bottom,transparent 60%,rgba(7,17,38,0.35) 100%)' }} />
      </div>
      {/* Info */}
      <div style={{ padding: '15px 17px 18px' }}>
        <div style={{ fontSize: '.6rem', fontWeight: 600, letterSpacing: '.12em', textTransform: 'uppercase', color: '#D4B15A', opacity: .75, marginBottom: 5, fontFamily: "'Outfit',sans-serif" }}>{w.cat} · {w.year}</div>
        <h4 style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontWeight: 500, fontSize: '1.05rem', color: '#D9E6FF', marginBottom: 6, lineHeight: 1.25, fontStyle: 'italic' }}>{w.title}</h4>
        <p style={{ fontSize: '.76rem', lineHeight: 1.55, color: '#8FA8D6', marginBottom: 11, fontFamily: "'Outfit',sans-serif" }}>{w.desc}</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 12 }}>
          {w.tags.map(t => (
            <span key={t} style={{ background: 'rgba(212,177,90,0.1)', color: '#8FA8D6', padding: '2px 9px', borderRadius: 999, fontSize: '.6rem', fontWeight: 500, fontFamily: "'Outfit',sans-serif", border: '1px solid rgba(212,177,90,0.18)' }}>{t}</span>
          ))}
        </div>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: '.76rem', fontWeight: 600, color: '#D4B15A', fontFamily: "'Outfit',sans-serif" }}>
          View Project <ArrowRight style={{ width: 11, height: 11 }} />
        </div>
      </div>
    </Link>
  )
}

// ── HeroSection ───────────────────────────────────────────────────────────────

function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const glowRef   = useRef<HTMLDivElement>(null)
  const heroRef   = useRef<HTMLDivElement>(null)
  const rafRef    = useRef<number>(0)
  const [typeText,   setTypeText]   = useState('')
  const [showCursor, setShowCursor] = useState(true)

  // Particle canvas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    const colors = ['#D4B15A', '#6FA8FF', '#D9E6FF', '#8FA8D6']
    const syms   = ['✦', '·', '★', '◦', '•']

    type Particle = { x:number; y:number; size:number; color:string; sym:string; vx:number; vy:number; opacity:number; rot:number; rotV:number }
    let W = 0, H = 0, cancelled = false, particles: Particle[] = []

    const resize = () => {
      const hero = canvas.parentElement
      if (!hero) return
      W = canvas.width  = hero.offsetWidth
      H = canvas.height = hero.offsetHeight
    }

    const makeParticle = (): Particle => ({
      x: Math.random() * (W || 800), y: Math.random() * (H || 600),
      size:    9 + Math.random() * 13,
      color:   colors[Math.floor(Math.random() * colors.length)],
      sym:     syms[Math.floor(Math.random() * syms.length)],
      vx:      (Math.random() - 0.5) * 0.32,
      vy:      (Math.random() - 0.5) * 0.22,
      opacity: 0.07 + Math.random() * 0.16,
      rot:     Math.random() * Math.PI * 2,
      rotV:    (Math.random() - 0.5) * 0.007,
    })

    resize()
    window.addEventListener('resize', resize)
    particles = Array.from({ length: 42 }, makeParticle)

    const draw = () => {
      if (cancelled) return
      ctx.clearRect(0, 0, W, H)
      for (const p of particles) {
        ctx.save()
        ctx.translate(p.x, p.y); ctx.rotate(p.rot)
        ctx.globalAlpha = p.opacity
        ctx.font = `${p.size}px serif`
        ctx.fillStyle = p.color
        ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
        ctx.fillText(p.sym, 0, 0)
        ctx.restore()
        p.x += p.vx; p.y += p.vy; p.rot += p.rotV
        if (p.x < -20) p.x = W + 20; else if (p.x > W + 20) p.x = -20
        if (p.y < -20) p.y = H + 20; else if (p.y > H + 20) p.y = -20
      }
      rafRef.current = requestAnimationFrame(draw)
    }
    rafRef.current = requestAnimationFrame(draw)

    return () => { cancelled = true; cancelAnimationFrame(rafRef.current); window.removeEventListener('resize', resize) }
  }, [])

  // Cursor glow on mousemove
  useEffect(() => {
    const hero = heroRef.current; const glow = glowRef.current
    if (!hero || !glow) return
    const onMove = (e: MouseEvent) => {
      const r = hero.getBoundingClientRect()
      glow.style.left = (e.clientX - r.left) + 'px'
      glow.style.top  = (e.clientY - r.top)  + 'px'
    }
    hero.addEventListener('mousemove', onMove)
    return () => hero.removeEventListener('mousemove', onMove)
  }, [])

  // Typewriter
  useEffect(() => {
    const text = 'Responsive websites, editorial design,\nand digital experiences built with craft.'
    let i = 0, tid: ReturnType<typeof setTimeout>
    const tick = () => {
      if (i <= text.length) {
        setTypeText(text.slice(0, i)); i++
        tid = setTimeout(tick, i < 2 ? 300 : i < 20 ? 52 : 36)
      } else {
        setShowCursor(false)
      }
    }
    tid = setTimeout(tick, 700)
    return () => clearTimeout(tid)
  }, [])

  const heroTags = ['HTML · CSS · JS', 'UI/UX Design', 'Responsive Design', 'Editorial Websites', 'CMS & Web Apps']

  return (
    <div
      ref={heroRef}
      style={{
        position: 'relative', overflow: 'hidden',
        padding: 'clamp(5rem,12vh,9rem) 24px clamp(4rem,8vh,7rem)',
        background: 'linear-gradient(160deg,#030712 0%,#071126 40%,#0B1E3A 100%)',
        minHeight: '92vh', display: 'flex', alignItems: 'center',
      }}
    >
      {/* Cursor glow */}
      <div ref={glowRef} style={{ position: 'absolute', pointerEvents: 'none', zIndex: 1, width: 520, height: 520, borderRadius: '50%', transform: 'translate(-50%,-50%)', background: 'radial-gradient(circle,rgba(111,168,255,0.12) 0%,transparent 60%)', transition: 'left .1s ease, top .1s ease' }} />
      {/* Particle canvas */}
      <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }} />
      {/* Stars */}
      <StarField count={70} />
      {/* Constellation */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0, opacity: .18 }} xmlns="http://www.w3.org/2000/svg">
        <line x1="12%" y1="18%" x2="28%" y2="32%" stroke="#6FA8FF" strokeWidth=".6"/>
        <line x1="28%" y1="32%" x2="44%" y2="22%" stroke="#6FA8FF" strokeWidth=".6"/>
        <line x1="44%" y1="22%" x2="62%" y2="38%" stroke="#8FA8D6" strokeWidth=".6"/>
        <line x1="62%" y1="38%" x2="78%" y2="20%" stroke="#8FA8D6" strokeWidth=".6"/>
        <line x1="78%" y1="20%" x2="88%" y2="44%" stroke="#6FA8FF" strokeWidth=".6"/>
        <circle cx="12%" cy="18%" r="2" fill="#6FA8FF" opacity=".7"/>
        <circle cx="28%" cy="32%" r="1.5" fill="#6FA8FF" opacity=".6"/>
        <circle cx="44%" cy="22%" r="2.5" fill="#D9E6FF" opacity=".6"/>
        <circle cx="62%" cy="38%" r="1.5" fill="#8FA8D6" opacity=".5"/>
        <circle cx="78%" cy="20%" r="2" fill="#6FA8FF" opacity=".65"/>
        <circle cx="88%" cy="44%" r="1.5" fill="#8FA8D6" opacity=".55"/>
      </svg>
      {/* Crescent moon */}
      <svg style={{ position: 'absolute', right: '6%', top: '8%', width: 80, height: 80, pointerEvents: 'none', zIndex: 0, opacity: .13 }} viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
        <path d="M50 10 A30 30 0 1 0 50 70 A20 20 0 1 1 50 10Z" fill="#D9E6FF"/>
      </svg>
      {/* Aurora glow */}
      <div style={{ position: 'absolute', left: '55%', top: '10%', width: 480, height: 380, background: 'radial-gradient(ellipse at center,rgba(111,168,255,0.09) 0%,rgba(143,168,214,0.04) 45%,transparent 70%)', pointerEvents: 'none', zIndex: 0, transform: 'translateX(-30%)' }} />
      {/* Astronauts */}
      <AstronautFloat img={3} style={{ position: 'absolute', right: '12%', top: '14%' }}    size={130} dur={26} del={0}   rot={12}  x1={12}  y1={-22} x2={-10} y2={16}  />
      <AstronautFloat img={4} style={{ position: 'absolute', left: '3%',  top: '30%' }}    size={100} dur={32} del={-10} rot={-14} x1={-12} y1={14}  x2={10}  y2={-10} />
      <AstronautFloat img={5} style={{ position: 'absolute', left: '10%', bottom: '14%' }} size={85}  dur={38} del={-18} rot={6}   x1={10}  y1={-14} x2={-8}  y2={12}  />
      <AstronautFloat img={4} style={{ position: 'absolute', right: '4%', bottom: '18%' }} size={90}  dur={24} del={-7}  rot={-8}  x1={-8}  y1={16}  x2={10}  y2={-12} />
      {/* Content */}
      <div style={{ maxWidth: 1024, margin: '0 auto', position: 'relative', zIndex: 10, width: '100%' }}>
        <Link
          href="/croissantsmoon"
          style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: '3rem', fontSize: '.875rem', color: 'rgba(143,168,214,0.5)', textDecoration: 'none', fontFamily: "'Outfit',sans-serif", transition: 'color .18s' }}
          onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'rgba(143,168,214,0.8)'}
          onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'rgba(143,168,214,0.5)'}
        >
          <ArrowLeft style={{ width: 16, height: 16 }} /> Back
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: '1.5rem' }}>
          <span style={{ display: 'inline-block', width: 28, height: 2, background: '#D4B15A', borderRadius: 2 }} />
          <span style={{ fontSize: '.68rem', fontWeight: 600, letterSpacing: '.18em', textTransform: 'uppercase', fontFamily: "'Outfit',sans-serif", background: 'rgba(212,177,90,0.12)', color: '#D4B15A', padding: '4px 12px', borderRadius: 999 }}>Creative Services</span>
        </div>
        <h1 style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: 'clamp(3rem,9vw,7rem)', fontWeight: 500, lineHeight: .95, letterSpacing: '-.02em', fontStyle: 'italic', color: '#D9E6FF', marginBottom: '1.5rem' }}>
          Web Development<br />&amp; Design
        </h1>
        <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: 'clamp(1.1rem,2.5vw,1.4rem)', fontWeight: 300, color: 'rgba(143,168,214,0.75)', maxWidth: 540, lineHeight: 1.45, marginBottom: '1.25rem', minHeight: '2.4em' }}>
          {typeText.split('\n').map((line, i, arr) => (
            <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
          ))}
          {showCursor && <span style={{ borderRight: '2px solid rgba(143,168,214,0.7)', marginLeft: 1 }}>&nbsp;</span>}
        </p>
        <p style={{ maxWidth: 490, fontSize: '.95rem', lineHeight: 1.7, color: 'rgba(143,168,214,0.6)', marginBottom: '2.75rem', fontFamily: "'Outfit',sans-serif" }}>
          Purposeful digital experiences built with craft, care, and a clear sense of what they&apos;re trying to say. From institutional portals to editorial portfolios.
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center', marginBottom: '2.5rem' }}>
          <a
            href="#wd-projects"
            style={{ background: '#D4B15A', color: '#071126', padding: '14px 28px', borderRadius: 999, fontSize: '.875rem', fontWeight: 600, fontFamily: "'Outfit',sans-serif", border: 'none', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 8, animation: 'cmGlowPulse 2.6s ease-in-out infinite', textDecoration: 'none' }}
          >
            View Projects <ArrowRight style={{ width: 15, height: 15 }} />
          </a>
          <Link
            href="/contact"
            style={{ border: '1px solid rgba(212,177,90,0.32)', color: '#D4B15A', background: 'rgba(212,177,90,0.06)', padding: '14px 28px', borderRadius: 999, fontSize: '.875rem', fontWeight: 500, fontFamily: "'Outfit',sans-serif", cursor: 'pointer', textDecoration: 'none', transition: 'all .2s' }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'rgba(212,177,90,0.12)'}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'rgba(212,177,90,0.06)'}
          >
            Work Together
          </Link>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
          {heroTags.map(tag => (
            <span key={tag} style={{ background: 'rgba(111,168,255,0.08)', color: '#8FA8D6', padding: '6px 16px', borderRadius: 999, fontSize: '.72rem', fontWeight: 500, letterSpacing: '.04em', fontFamily: "'Outfit',sans-serif", border: '1px solid rgba(111,168,255,0.18)' }}>{tag}</span>
          ))}
        </div>
      </div>
      {/* Scroll indicator */}
      <div style={{ position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, zIndex: 10 }}>
        <span style={{ fontSize: '.65rem', fontWeight: 500, letterSpacing: '.12em', textTransform: 'uppercase', color: 'rgba(143,168,214,0.35)', fontFamily: "'Outfit',sans-serif" }}>Scroll</span>
        <svg width="16" height="24" viewBox="0 0 16 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="1" y="1" width="14" height="22" rx="7" stroke="rgba(111,168,255,0.25)" strokeWidth="1.5"/>
          <rect x="7" y="5" width="2" height="5" rx="1" fill="rgba(111,168,255,0.3)"/>
        </svg>
      </div>
    </div>
  )
}

// ── RevealSection ─────────────────────────────────────────────────────────────

function RevealSection({ children, style, id }: { children: React.ReactNode; style?: React.CSSProperties; id?: string }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { el.classList.add('cm-visible'); obs.unobserve(el) }
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return <div ref={ref} id={id} className="cm-reveal" style={style}>{children}</div>
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function WebsitesPage() {
  const [techHover, setTechHover] = useState<number | null>(null)
  const doubled       = [...WD_MARQUEE_ITEMS, ...WD_MARQUEE_ITEMS]
  const marqueeColors = ['#D4B15A', '#D9E6FF', '#6FA8FF', '#8FA8D6']

  return (
    <main style={{ background: '#030712' }}>
      <HeroSection />

      {/* ── Marquee ─────────────────────────────────────────────── */}
      <RevealSection style={{ background: 'rgba(3,7,18,0.8)', borderTop: '1px solid rgba(111,168,255,0.08)', borderBottom: '1px solid rgba(111,168,255,0.08)', padding: '20px 0', overflow: 'hidden' }}>
        <div style={{ display: 'flex', overflow: 'hidden' }}>
          <div className="cm-marquee-track">
            {doubled.map((t, i) => (
              <span key={i}>
                <span style={{ display: 'inline-block', padding: '0 32px', fontFamily: "'Outfit',sans-serif", fontSize: '1.05rem', fontWeight: 500, color: marqueeColors[i % marqueeColors.length], whiteSpace: 'nowrap', letterSpacing: '.01em' }}>{t}</span>
                <span style={{ color: 'rgba(111,168,255,0.2)', fontSize: '1.1rem', padding: '0 4px' }}>·</span>
              </span>
            ))}
          </div>
        </div>
      </RevealSection>

      {/* ── Projects ────────────────────────────────────────────── */}
      <RevealSection
        id="wd-projects"
        style={{ padding: 'clamp(4rem,8vh,6rem) 24px', background: 'linear-gradient(180deg,#071126 0%,#0B1E3A 100%)', position: 'relative', overflow: 'hidden' }}
      >
        <StarField count={30} />
        <AstronautFloat img={5} style={{ position: 'absolute', left: '2%',  top: '18%' }}    size={115} dur={28} del={-5}  rot={10} />
        <AstronautFloat img={3} style={{ position: 'absolute', right: '2%', bottom: '12%' }} size={95}  dur={34} del={-16} rot={-8} />
        <AstronautFloat img={4} style={{ position: 'absolute', right: '3%', top: '12%' }}    size={80}  dur={22} del={-3}  rot={20} />
        <div style={{ maxWidth: 1024, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: '1rem' }}>
            <span style={{ display: 'inline-block', width: 28, height: 2, background: '#D4B15A', borderRadius: 2 }} />
            <span style={{ fontSize: '.68rem', fontWeight: 600, letterSpacing: '.18em', textTransform: 'uppercase', color: '#D4B15A', fontFamily: "'Outfit',sans-serif" }}>Selected Projects</span>
          </div>
          <h2 style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 500, color: '#D9E6FF', marginBottom: '.5rem', fontStyle: 'italic' }}>The Work</h2>
          <p style={{ fontSize: '.93rem', color: '#8FA8D6', marginBottom: '2.5rem', maxWidth: 480, lineHeight: 1.65, fontFamily: "'Outfit',sans-serif" }}>Four real projects — each built with a different challenge, the same level of care.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(274px,1fr))', gap: 18 }}>
            {WD_PROJECTS.map(p => <ProjectCard key={p.page} project={p} />)}
          </div>
          {/* More in CroissantsMoon */}
          <div style={{ marginTop: '2rem', padding: '20px 26px', background: 'rgba(111,168,255,0.06)', border: '1px solid rgba(111,168,255,0.14)', borderRadius: 14, display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: 220 }}>
              <p style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: '.98rem', fontWeight: 500, fontStyle: 'italic', color: '#D9E6FF', marginBottom: 3 }}>More in CroissantsMoon</p>
              <p style={{ fontSize: '.76rem', color: '#8FA8D6', lineHeight: 1.55, fontFamily: "'Outfit',sans-serif" }}>Graphic design, branding, and visual works live in the full creative universe.</p>
            </div>
            <Link
              href="/croissantsmoon"
              style={{ background: 'rgba(212,177,90,0.12)', color: '#D4B15A', border: '1px solid rgba(212,177,90,0.28)', padding: '10px 22px', borderRadius: 999, fontSize: '.78rem', fontWeight: 600, fontFamily: "'Outfit',sans-serif", display: 'inline-flex', alignItems: 'center', gap: 7, textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0, transition: 'background .2s' }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'rgba(212,177,90,0.2)'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'rgba(212,177,90,0.12)'}
            >
              Explore CroissantsMoon <ArrowRight style={{ width: 12, height: 12 }} />
            </Link>
          </div>
        </div>
      </RevealSection>

      {/* ── Process ─────────────────────────────────────────────── */}
      <RevealSection style={{ padding: 'clamp(4rem,8vh,6rem) 24px', background: 'linear-gradient(180deg,#030712 0%,#071126 100%)' }}>
        <div style={{ maxWidth: 896, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: '1rem' }}>
            <span style={{ display: 'inline-block', width: 28, height: 2, background: '#6FA8FF', borderRadius: 2 }} />
            <span style={{ fontSize: '.68rem', fontWeight: 600, letterSpacing: '.18em', textTransform: 'uppercase', color: '#6FA8FF', fontFamily: "'Outfit',sans-serif" }}>How I Build</span>
          </div>
          <h2 style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 500, color: '#D9E6FF', marginBottom: '.6rem', fontStyle: 'italic' }}>From Concept to Code</h2>
          <p style={{ fontSize: '.93rem', color: '#8FA8D6', marginBottom: '2.75rem', maxWidth: 440, lineHeight: 1.65, fontFamily: "'Outfit',sans-serif" }}>Not a checklist. A way of thinking — iterative, craft-led, and always grounded in purpose.</p>
          <div style={{ maxWidth: 640 }}>
            {WD_PROCESS.map((s, i) => (
              <div key={s.label} style={{ display: 'flex', alignItems: 'flex-start' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 56, flexShrink: 0 }}>
                  <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'rgba(111,168,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.35rem', color: '#D4B15A', border: '1px solid rgba(111,168,255,0.18)', flexShrink: 0, zIndex: 2, position: 'relative' }}>{s.icon}</div>
                  {i < WD_PROCESS.length - 1 && <div style={{ flex: 1, width: 1, minHeight: 20, background: 'linear-gradient(to bottom,rgba(111,168,255,0.2),rgba(111,168,255,0.05))', borderRadius: 1 }} />}
                </div>
                <div style={{ flex: 1, marginLeft: 22, ...(i < WD_PROCESS.length - 1 ? { paddingBottom: 28 } : {}) }}>
                  <div className="cm-process-card" style={{ background: 'rgba(24,59,107,0.28)', backdropFilter: 'blur(12px)', border: '1px solid rgba(111,168,255,0.15)', borderRadius: 16, borderLeft: '3px solid #6FA8FF', padding: '22px 24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 9 }}>
                      <span style={{ fontSize: '.58rem', fontWeight: 600, letterSpacing: '.14em', textTransform: 'uppercase', background: 'rgba(111,168,255,0.08)', color: '#D4B15A', padding: '2px 8px', borderRadius: 999, fontFamily: "'Outfit',sans-serif" }}>Step {String(i + 1).padStart(2, '0')}</span>
                      <span style={{ height: 1, flex: 1, background: 'rgba(111,168,255,0.1)' }} />
                      <span style={{ fontSize: '.68rem', fontWeight: 600, color: '#D4B15A', background: 'rgba(212,177,90,0.12)', padding: '2px 10px', borderRadius: 999, fontFamily: "'Outfit',sans-serif" }}>{s.label}</span>
                    </div>
                    <p style={{ fontSize: '.84rem', lineHeight: 1.68, color: '#8FA8D6', fontFamily: "'Outfit',sans-serif" }}>{s.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, paddingLeft: 68, marginTop: 8 }}>
            <span style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontStyle: 'italic', fontSize: '1rem', color: '#D4B15A', opacity: .45 }}>↩ and every launch teaches something new</span>
          </div>
        </div>
      </RevealSection>

      {/* ── Philosophy ──────────────────────────────────────────── */}
      <RevealSection style={{ padding: 'clamp(4rem,10vh,7rem) 24px', background: 'linear-gradient(160deg,#071126 0%,#0B1E3A 100%)', position: 'relative', overflow: 'hidden' }}>
        <AstronautFloat img={4} style={{ position: 'absolute', left: '2%',  top: '25%' }}    size={110} dur={30} del={-8}  rot={-12} />
        <AstronautFloat img={5} style={{ position: 'absolute', right: '3%', bottom: '15%' }} size={90}  dur={25} del={-20} rot={14}  />
        <AstronautFloat img={3} style={{ position: 'absolute', right: '4%', top: '10%' }}    size={75}  dur={36} del={-4}  rot={5}   />
        <div style={{ maxWidth: 1024, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: '2.5rem' }}>
            <span style={{ display: 'inline-block', width: 28, height: 2, background: '#8FA8D6', borderRadius: 2 }} />
            <span style={{ fontSize: '.68rem', fontWeight: 600, letterSpacing: '.18em', textTransform: 'uppercase', color: '#8FA8D6', fontFamily: "'Outfit',sans-serif" }}>Design Philosophy</span>
          </div>
          <p style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: 'clamp(2.5rem,6vw,5.5rem)', fontWeight: 400, lineHeight: 1.05, fontStyle: 'italic', color: '#D9E6FF', marginBottom: '2.5rem' }}>
            Websites that<br /><em style={{ color: '#D4B15A', fontStyle: 'italic' }}>actually say something.</em>
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: '2rem', alignItems: 'start' }}>
            <div>
              <p style={{ fontSize: '1.05rem', lineHeight: 1.75, color: '#8FA8D6', fontWeight: 300, fontFamily: "'Outfit',sans-serif" }}>
                The web is full of noise. A good website isn&apos;t just functional — it has a point of view. It knows who it&apos;s talking to, what it wants to say, and exactly how much is enough.
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ background: 'rgba(212,177,90,0.12)', color: '#D4B15A', border: '1px solid rgba(212,177,90,0.2)', borderRadius: 8, backdropFilter: 'blur(8px)', padding: '12px 16px', fontFamily: "'Cormorant Garamond',Georgia,serif", fontStyle: 'italic', fontSize: '.95rem', lineHeight: 1.5, transform: 'rotate(-2deg)' }}>
                &quot;Design is the space between content and reader.&quot; ✦
              </div>
              <div style={{ background: 'rgba(111,168,255,0.1)', color: '#6FA8FF', border: '1px solid rgba(111,168,255,0.2)', borderRadius: 8, backdropFilter: 'blur(8px)', padding: '12px 16px', marginTop: 6, alignSelf: 'flex-end', fontFamily: "'Cormorant Garamond',Georgia,serif", fontStyle: 'italic', fontSize: '.95rem', lineHeight: 1.5, transform: 'rotate(1.5deg)' }}>
                intentional &gt; impressive ◈
              </div>
              <div style={{ background: 'rgba(217,230,255,0.05)', color: '#D9E6FF', border: '1px solid rgba(217,230,255,0.1)', borderRadius: 8, backdropFilter: 'blur(8px)', padding: '12px 16px', fontFamily: "'Cormorant Garamond',Georgia,serif", fontStyle: 'italic', fontSize: '.95rem', lineHeight: 1.5, transform: 'rotate(-1deg)' }}>
                every pixel should earn its place ◉
              </div>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(200px,1fr))', gap: 14, marginTop: '2.5rem' }}>
            {[
              ['Clarity',  'Design that communicates before it impresses.',              '✦'],
              ['Craft',    'The spacing, the weight, the timing. Nothing is too small.', '◈'],
              ['Purpose',  'Every element earns its place. Nothing decorative for its own sake.', '◉'],
            ].map(([title, desc, icon]) => (
              <div key={title} style={{ background: 'rgba(24,59,107,0.32)', border: '1px solid rgba(111,168,255,0.15)', borderRadius: 16, padding: 24, backdropFilter: 'blur(12px)' }}>
                <span style={{ fontSize: '1.4rem', display: 'block', marginBottom: 12, color: '#D4B15A', textShadow: '0 0 12px rgba(212,177,90,0.4)' }}>{icon}</span>
                <h4 style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontWeight: 500, fontSize: '1.1rem', color: '#D9E6FF', marginBottom: 8, fontStyle: 'italic' }}>{title}</h4>
                <p style={{ fontSize: '.83rem', lineHeight: 1.6, color: '#8FA8D6', fontFamily: "'Outfit',sans-serif" }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </RevealSection>

      {/* ── Tech Stack ──────────────────────────────────────────── */}
      <RevealSection style={{ padding: 'clamp(4rem,8vh,6rem) 24px', background: '#0B1E3A' }}>
        <div style={{ maxWidth: 1024, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: '1rem' }}>
            <span style={{ display: 'inline-block', width: 28, height: 2, background: '#D4B15A', borderRadius: 2 }} />
            <span style={{ fontSize: '.68rem', fontWeight: 600, letterSpacing: '.18em', textTransform: 'uppercase', color: '#D4B15A', fontFamily: "'Outfit',sans-serif" }}>Tech Stack</span>
          </div>
          <h2 style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 500, color: '#D9E6FF', marginBottom: '.75rem', fontStyle: 'italic' }}>Tools of the Trade</h2>
          <p style={{ fontSize: '.95rem', color: '#8FA8D6', marginBottom: '2.5rem', maxWidth: 480, lineHeight: 1.72, fontFamily: "'Outfit',sans-serif" }}>The technologies and disciplines that shape every project — chosen for clarity, not credentials.</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', padding: 28, background: 'rgba(7,17,38,0.6)', borderRadius: 24, border: '1px solid rgba(111,168,255,0.12)' }}>
            {WD_SKILLS.map((skill, i) => {
              const sz        = i % 3
              const rot       = TAG_ROTATIONS[i % TAG_ROTATIONS.length]
              const isHovered = techHover === i
              return (
                <span
                  key={skill.text}
                  onMouseEnter={() => setTechHover(i)}
                  onMouseLeave={() => setTechHover(null)}
                  style={{
                    display: 'inline-block',
                    background: 'rgba(111,168,255,0.08)',
                    color: isHovered ? skill.color : '#8FA8D6',
                    padding: TAG_PADDINGS[sz],
                    borderRadius: 999,
                    fontSize: TAG_SIZES[sz],
                    fontWeight: 500,
                    fontFamily: "'Outfit',sans-serif",
                    border: `1.5px solid ${isHovered ? skill.color + '44' : 'rgba(111,168,255,0.18)'}`,
                    transform: isHovered ? 'scale(1.09) rotate(0deg)' : `rotate(${rot})`,
                    boxShadow: isHovered ? '0 8px 24px rgba(3,7,18,0.4)' : 'none',
                    transition: 'transform .22s cubic-bezier(0.34,1.56,0.64,1), box-shadow .22s, color .22s, border-color .22s',
                    cursor: 'default',
                    margin: 6,
                  }}
                >{skill.text}</span>
              )
            })}
          </div>
        </div>
      </RevealSection>

      {/* ── Stats ───────────────────────────────────────────────── */}
      <RevealSection style={{ padding: 'clamp(4rem,8vh,6rem) 24px', background: 'linear-gradient(180deg,#030712 0%,#071126 100%)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ maxWidth: 1024, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: '.5rem' }}>
            <span style={{ display: 'inline-block', width: 28, height: 2, background: '#6FA8FF', borderRadius: 2 }} />
            <span style={{ fontSize: '.68rem', fontWeight: 600, letterSpacing: '.18em', textTransform: 'uppercase', color: '#6FA8FF', fontFamily: "'Outfit',sans-serif" }}>By the Numbers</span>
          </div>
          <h2 style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 500, color: '#D9E6FF', marginBottom: '.6rem', fontStyle: 'italic' }}>Work That Ships</h2>
          <p style={{ fontSize: '.93rem', color: '#8FA8D6', marginBottom: '2.5rem', maxWidth: 440, lineHeight: 1.65, fontFamily: "'Outfit',sans-serif" }}>Real projects, real audiences, real constraints. Numbers as a reflection of work done, not ambition claimed.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: 16 }}>
            {[
              { num: '4+',   label: 'Live Projects'       },
              { num: '100%', label: 'Mobile Responsive'   },
              { num: '9',    label: 'Graphic Design Works' },
              { num: '∞',    label: 'Details Cared About' },
            ].map(s => (
              <div
                key={s.label}
                style={{ textAlign: 'center', padding: '28px 20px', background: 'rgba(217,230,255,0.03)', border: '1px solid rgba(111,168,255,0.1)', borderRadius: 18, transition: 'background .2s, transform .2s, box-shadow .2s' }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'rgba(111,168,255,0.06)'; el.style.transform = 'translateY(-4px)'; el.style.boxShadow = '0 0 32px rgba(111,168,255,0.1)' }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'rgba(217,230,255,0.03)'; el.style.transform = ''; el.style.boxShadow = '' }}
              >
                <div style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: 'clamp(2rem,5vw,3.2rem)', fontWeight: 400, fontStyle: 'italic', color: '#D4B15A', lineHeight: 1, marginBottom: 10 }}>{s.num}</div>
                <div style={{ fontSize: '.72rem', fontWeight: 500, letterSpacing: '.1em', textTransform: 'uppercase', color: 'rgba(143,168,214,0.5)', fontFamily: "'Outfit',sans-serif" }}>{s.label}</div>
              </div>
            ))}
          </div>
          {/* Currently Active */}
          <div style={{ marginTop: 28, padding: '22px 26px', background: 'rgba(217,230,255,0.03)', border: '1px solid rgba(111,168,255,0.12)', borderLeft: '3px solid #6FA8FF', borderRadius: 16, display: 'flex', alignItems: 'flex-start', gap: 20, flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: 240 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 10 }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#4CAF87', display: 'inline-block', animation: 'cmPulseDot 2s infinite' }} />
                <span style={{ fontSize: '.64rem', fontWeight: 600, letterSpacing: '.12em', textTransform: 'uppercase', color: '#4CAF87', fontFamily: "'Outfit',sans-serif" }}>Currently Active</span>
              </div>
              <h3 style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: '1.1rem', fontWeight: 500, fontStyle: 'italic', color: '#D9E6FF', marginBottom: 7 }}>This Portfolio</h3>
              <p style={{ fontSize: '.82rem', lineHeight: 1.65, color: '#8FA8D6', maxWidth: 440, fontFamily: "'Outfit',sans-serif" }}>An ongoing experiment in editorial web design — every interaction and section is being refined in public. You&apos;re inside the experiment right now.</p>
            </div>
            <Link
              href="/croissantsmoon/web-pcu-global-intl"
              style={{ background: 'rgba(111,168,255,0.1)', color: '#6FA8FF', border: '1px solid rgba(111,168,255,0.22)', padding: '10px 22px', borderRadius: 999, fontSize: '.78rem', fontWeight: 600, fontFamily: "'Outfit',sans-serif", display: 'inline-flex', alignItems: 'center', gap: 7, textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0, alignSelf: 'center', transition: 'background .2s' }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'rgba(111,168,255,0.18)'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'rgba(111,168,255,0.1)'}
            >
              See featured project <ArrowRight style={{ width: 12, height: 12 }} />
            </Link>
          </div>
        </div>
      </RevealSection>

      {/* ── CTA ─────────────────────────────────────────────────── */}
      <RevealSection style={{ padding: 'clamp(5rem,10vh,7rem) 24px', background: 'linear-gradient(160deg,#030712 0%,#071126 60%,#0a1530 100%)', position: 'relative', overflow: 'hidden' }}>
        <StarField count={40} />
        {/* Big crescent */}
        <svg style={{ position: 'absolute', right: -60, top: -40, width: 340, height: 340, pointerEvents: 'none', zIndex: 0, opacity: .045 }} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path d="M120 20 A80 80 0 1 0 120 180 A55 55 0 1 1 120 20Z" fill="#D9E6FF"/>
        </svg>
        <AstronautFloat img={5} style={{ position: 'absolute', left: '3%',  top: '20%' }}    size={120} dur={27} del={-11} rot={8}   />
        <AstronautFloat img={3} style={{ position: 'absolute', right: '4%', top: '15%' }}    size={100} dur={33} del={-2}  rot={-10} />
        <AstronautFloat img={4} style={{ position: 'absolute', left: '5%',  bottom: '18%' }} size={80}  dur={40} del={-22} rot={18}  />
        <AstronautFloat img={5} style={{ position: 'absolute', right: '5%', bottom: '20%' }} size={88}  dur={24} del={-14} rot={-5}  />
        <div style={{ maxWidth: 896, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: 'clamp(2rem,5vw,3.8rem)', fontWeight: 400, color: '#D9E6FF', lineHeight: 1.1, fontStyle: 'italic', marginBottom: '1.5rem' }}>
            Have a website in mind?<br /><span style={{ color: '#D4B15A' }}>Let&apos;s build it right.</span>
          </h2>
          <p style={{ fontSize: '1rem', lineHeight: 1.7, color: '#8FA8D6', maxWidth: 480, margin: '0 auto 2.5rem', fontFamily: "'Outfit',sans-serif" }}>
            Whether it&apos;s a portfolio, an institutional portal, or something new — every good site starts with a clear idea and the patience to do it properly.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, justifyContent: 'center', alignItems: 'center' }}>
            <Link
              href="/contact"
              style={{ background: '#D4B15A', color: '#071126', padding: '16px 36px', borderRadius: 999, fontFamily: "'Outfit',sans-serif", fontSize: '.92rem', fontWeight: 700, border: 'none', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 10, animation: 'cmGlowPulse 2.6s ease-in-out infinite', textDecoration: 'none' }}
            >
              Start a Conversation <ArrowRight style={{ width: 16, height: 16 }} />
            </Link>
            <Link
              href="/croissantsmoon"
              style={{ background: 'rgba(212,177,90,0.1)', border: '1px solid rgba(212,177,90,0.28)', color: '#D4B15A', padding: '16px 28px', borderRadius: 999, fontSize: '.86rem', fontWeight: 600, fontFamily: "'Outfit',sans-serif", cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 8, textDecoration: 'none', transition: 'background .2s' }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'rgba(212,177,90,0.18)'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'rgba(212,177,90,0.1)'}
            >
              Explore CroissantsMoon ✦
            </Link>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 48 }}>
            <Link
              href="/"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: '.8rem', color: 'rgba(143,168,214,0.3)', fontFamily: "'Outfit',sans-serif", padding: '8px 12px', borderRadius: 8, textDecoration: 'none', transition: 'color .18s' }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'rgba(143,168,214,0.6)'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'rgba(143,168,214,0.3)'}
            >
              <ArrowLeft style={{ width: 14, height: 14 }} /> Back to main portfolio
            </Link>
          </div>
        </div>
      </RevealSection>
    </main>
  )
}
