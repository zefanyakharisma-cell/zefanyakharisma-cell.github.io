'use client'

import { useRef } from 'react'
import Link from 'next/link'
import {
  ArrowRight, Send, UserCircle, Globe, LayoutDashboard,
  PlayCircle, BarChart2, Award, Receipt, Search, PenTool,
  TrendingUp, Github, ExternalLink
} from 'lucide-react'
import StarField from '@/components/cm/StarField'
import ConstellationSVG from '@/components/cm/ConstellationSVG'
import AstronautFloat from '@/components/cm/AstronautFloat'

// ── Color tokens ─────────────────────────────────────────────
const CM = {
  midnight:   '#071126',
  deepSpace:  '#0B1E3A',
  moonlight:  '#D9E6FF',
  stardust:   '#8FA8D6',
  nebulaGold: '#D4B15A',
  aurora:     '#6FA8FF',
  void:       '#030712',
}

// ── Data ─────────────────────────────────────────────────────

const CM_GRAPHIC_WORKS = [
  { title: 'PCU Partnership Booklet',                cat: 'Brand Identity',    folder: 'partnership-booklet-pcu',               year: '2024–2025', inst: 'Petra Christian University'   },
  { title: 'PCU International Students Guide',       cat: 'Print & Digital',   folder: 'international-students-guidebook-pcu',  year: '2024–2025', inst: 'Petra Christian University'   },
  { title: 'PCU Presentation Template',              cat: 'Visual Identity',   folder: 'general-ppt-pcu',                       year: '2024–2025', inst: 'Petra Christian University'   },
  { title: 'ACI 2025 Batch 2 Guidebook',             cat: 'Event Materials',   folder: 'booklet-aci-2025-b2-unair',             year: '2025',      inst: 'Universitas Airlangga'        },
  { title: 'ACI 2025 Batch 1 Guidebook',             cat: 'Event Materials',   folder: 'guidebook-aci-2025-b1-unair',           year: '2025',      inst: 'Universitas Airlangga'        },
  { title: 'Staffordshire Banyuwangi Booklet',       cat: 'Brand Identity',    folder: 'guidebook-staffordshire-unair',         year: '2025',      inst: 'Staffordshire × Airlangga'   },
  { title: 'AERO 2025 Presentation',                 cat: 'Event Materials',   folder: 'aero-2025-unair',                       year: '2025',      inst: 'Universitas Airlangga'        },
  { title: 'Airlangga Accommodation Guide',          cat: 'Print & Digital',   folder: 'accommodation-guidebook-unair',         year: '2024–2025', inst: 'Universitas Airlangga'        },
  { title: 'Airlangga International Students Guide', cat: 'Social Media Kits', folder: 'international-students-guidebook-unair',year: '2024–2025', inst: 'Universitas Airlangga'        },
]

const CM_CAT_COLORS: Record<string,string> = {
  'Brand Identity':   CM.nebulaGold,
  'Event Materials':  CM.aurora,
  'Print & Digital':  CM.stardust,
  'Visual Identity':  '#A0B8E0',
  'Social Media Kits':'#B8956A',
}

const CM_FEATURED_PROJECTS = [
  {
    page: '/croissantsmoon/web-portfolio',
    live: 'https://zefanyakharisma.com/',
    github: 'https://github.com/zefanyakharisma-cell/zefanyakharisma-cell.github.io',
    title: 'Portfolio',
    label: 'SPA · Vanilla JS',
    watermark: 'Portfolio',
    tagline: 'Premium editorial-style single-page portfolio template — vanilla JS, Tailwind, Supabase, and Formspree.',
    tech: ['HTML/CSS', 'JavaScript', 'Tailwind', 'Supabase'],
    bg: 'linear-gradient(145deg,#030712,#071126)',
    status: 'Live',
    statusBg: 'rgba(45,180,79,0.12)',
    statusColor: '#4CAF87',
    seed: 8,
  },
  {
    page: '/croissantsmoon/web-pcu-global-intl',
    live: 'https://international-office-website.vercel.app/',
    github: 'https://github.com/zefanyakharisma-cell/International-Office-Website',
    title: 'PCU Global — International Office',
    label: 'Web App · PCU Global',
    watermark: 'Intl. Office',
    tagline: 'Full international office platform — news CMS, partnership directory, inbound & outbound programs, mobile-first.',
    tech: ['HTML/CSS', 'JavaScript', 'Tailwind', 'Supabase'],
    bg: 'linear-gradient(145deg,#0B1E3A,#183B6B)',
    status: 'Live',
    statusBg: 'rgba(45,180,79,0.12)',
    statusColor: '#4CAF87',
    seed: 5,
  },
  {
    page: '/croissantsmoon/web-dashboard-partnership',
    live: 'https://dashboard-partnership.vercel.app/',
    github: 'https://github.com/zefanyakharisma-cell/Dashboard-Partnership',
    title: 'International Partnership Dashboard',
    label: 'Data Dashboard',
    watermark: 'Partnership',
    tagline: 'Interactive dashboard visualising institutional partnerships — workflow engine, analytics, archive.',
    tech: ['JavaScript', 'Chart.js', 'Tailwind'],
    bg: 'linear-gradient(145deg,#0a1f2e,#0f3545)',
    status: 'Live',
    statusBg: 'rgba(45,180,79,0.12)',
    statusColor: '#4CAF87',
    seed: 3,
  },
  {
    page: '/croissantsmoon/web-dashboard-grants',
    live: 'https://dashboard-international-grants.vercel.app/',
    github: 'https://github.com/zefanyakharisma-cell/Dashboard-International-Grants',
    title: 'International Grants Dashboard',
    label: 'Data Dashboard',
    watermark: 'Grants',
    tagline: 'Modern international grants discovery and management platform — deadline timeline, realtime updates, admin suite.',
    tech: ['JavaScript', 'Chart.js', 'Supabase'],
    bg: 'linear-gradient(145deg,#120a2e,#2a1060)',
    status: 'Live',
    statusBg: 'rgba(45,180,79,0.12)',
    statusColor: '#4CAF87',
    seed: 6,
  },
]

const CM_SERVICES = [
  {
    icon: <UserCircle style={{ width: 22, height: 22, color: CM.aurora }} />,
    accentColor: CM.aurora,
    glowColor: 'rgba(111,168,255,0.25)',
    tag: 'Personal & Creative',
    title: 'Personal Branding & Portfolio Platforms',
    positioning: 'Your identity, crafted for the world stage.',
    desc: 'Premium digital identities for professionals who need more than a résumé. We build narrative-driven platforms that position you as a thought leader in your field.',
    targets: ['Researchers & Academics', 'Scholarship Awardees', 'Creative Professionals', 'Founders & Executives'],
    features: ['Personal Brand Systems', 'Cinematic Portfolio Design', 'Professional Storytelling', 'Mobile-First Experience', 'CMS Integration'],
    pricingIDR: 'Rp5 juta',
    pricingUSD: '$300',
    pricingLabel: 'Starter Presence',
    ctaLabel: 'Build Your Platform',
  },
  {
    icon: <Globe style={{ width: 22, height: 22, color: CM.nebulaGold }} />,
    accentColor: CM.nebulaGold,
    glowColor: 'rgba(212,177,90,0.25)',
    tag: 'International & Institutional',
    title: 'International & Institutional Platforms',
    positioning: 'Global-facing design for institutions that matter.',
    desc: 'Sophisticated digital ecosystems for universities, NGOs, and international offices. Platforms that engage global audiences and communicate institutional excellence.',
    targets: ['Universities & Faculties', 'International Offices', 'NGOs & Nonprofits', 'Educational Organizations'],
    features: ['Global Engagement Systems', 'Partnership Directories', 'Student Onboarding Portals', 'Multilingual Architecture', 'Institutional Design Language'],
    pricingIDR: 'Rp25 juta',
    pricingUSD: '$1,500',
    pricingLabel: 'Institutional Systems',
    ctaLabel: 'Start a Project',
  },
  {
    icon: <LayoutDashboard style={{ width: 22, height: 22, color: '#A0C4FF' }} />,
    accentColor: '#A0C4FF',
    glowColor: 'rgba(160,196,255,0.2)',
    tag: 'Data & Operations',
    title: 'Dashboard & Internal Systems',
    positioning: 'Intelligence made visible. Operations made elegant.',
    desc: 'Modern dashboards and admin platforms that transform complex data into clear decisions. Built for teams who need both power and elegance in their internal tools.',
    targets: ['Operations Teams', 'Admin Departments', 'Data-Driven Organizations', 'Management Systems'],
    features: ['Real-Time Analytics', 'Workflow Management', 'Data Visualization', 'Admin Interfaces', 'Scalable Architecture'],
    pricingIDR: 'Rp12 juta',
    pricingUSD: '$750',
    pricingLabel: 'Professional Identity Platform',
    ctaLabel: 'Discuss Your Vision',
  },
]

const CM_CONCEPT_DETAILS = [
  {
    num: '01', badge: 'Personal · Portfolio',
    title: 'Premium Portfolio System',
    theme: 'Cinematic Personal Branding',
    desc: 'A narrative-driven digital identity platform for creatives, researchers, and international professionals. Every element — from typography to motion — tells your story with editorial precision.',
    accentColor: CM.aurora,
    glowColor: 'rgba(111,168,255,0.2)',
    bg: 'linear-gradient(145deg,#030a1a 0%,#071126 60%,#0B1E3A 100%)',
    tags: ['Editorial Design', 'Portfolio CMS', 'Personal Branding', 'Motion & Animation', 'Multi-language'],
    previewLabel: 'Identity System',
    icon: <UserCircle style={{ width: 13, height: 13 }} />,
    originalPrice: 5000000,
    discountedPrice: 2000000,
    timeline: '2–3 weeks',
    revisions: '3 rounds included',
    demoHref: '/croissantsmoon/web-portfolio',
    demoLabel: 'View Live Demo',
    demoIcon: <PlayCircle style={{ width: 12, height: 12 }} />,
  },
  {
    num: '02', badge: 'Institutional · International',
    title: 'International Office Platform',
    theme: 'Global Engagement Ecosystem',
    desc: 'A sophisticated digital platform for universities and international offices. Features partnership directories, student onboarding systems, mobility programs, and global announcement boards.',
    accentColor: CM.nebulaGold,
    glowColor: 'rgba(212,177,90,0.2)',
    bg: 'linear-gradient(145deg,#0B1E3A 0%,#183B6B 60%,#1a3d6b 100%)',
    tags: ['Partnership Directory', 'Student Onboarding', 'Mobility Programs', 'Institutional Design', 'Global Reach'],
    previewLabel: 'Institutional Platform',
    icon: <Globe style={{ width: 13, height: 13 }} />,
    originalPrice: 25000000,
    discountedPrice: 10000000,
    timeline: '4–6 weeks',
    revisions: '4 rounds included',
    demoHref: '/croissantsmoon/websites',
    demoLabel: 'View Live Demo',
    demoIcon: <PlayCircle style={{ width: 12, height: 12 }} />,
  },
  {
    num: '03', badge: 'Data · Operations',
    title: 'Modern Dashboard System',
    theme: 'Operational Intelligence',
    desc: 'A premium internal platform built for organizations that need clarity in complexity. Analytics, workflow management, and admin interfaces — designed with the aesthetic of premium SaaS.',
    accentColor: '#A0C4FF',
    glowColor: 'rgba(160,196,255,0.2)',
    bg: 'linear-gradient(145deg,#080818 0%,#0d1a30 60%,#121f3a 100%)',
    tags: ['Analytics Dashboard', 'Workflow Engine', 'Data Visualization', 'Admin Interface', 'Modular Systems'],
    previewLabel: 'Dashboard System',
    icon: <LayoutDashboard style={{ width: 13, height: 13 }} />,
    originalPrice: 12000000,
    discountedPrice: 7000000,
    timeline: '3–5 weeks',
    revisions: '3 rounds included',
    demoHref: '/croissantsmoon/web-dashboard-partnership',
    demoHref2: '/croissantsmoon/web-dashboard-grants',
    demoLabel: 'Partnership Dashboard Demo',
    demoIcon: <BarChart2 style={{ width: 12, height: 12 }} />,
    demoLabel2: 'International Grants Demo',
    demoIcon2: <Award style={{ width: 12, height: 12 }} />,
  },
]

function formatRp(n: number) {
  return 'Rp ' + n.toLocaleString('id-ID')
}

const PROCESS_STEPS = [
  { num: '01', icon: <Search style={{ width: 22, height: 22, color: CM.aurora }} />, label: 'Discover',       desc: 'We start with your goals, audience, and brand values to define what success looks like.' },
  { num: '02', icon: <PenTool style={{ width: 22, height: 22, color: CM.aurora }} />, label: 'Design & Build', desc: 'From wireframes to final delivery — every pixel and line of code is intentional.' },
  { num: '03', icon: <TrendingUp style={{ width: 22, height: 22, color: CM.aurora }} />, label: 'Launch & Grow', desc: 'We hand off a product that your team can own, maintain, and scale.' },
]

// ── Logo SVG ──────────────────────────────────────────────────
const LogoSVG = () => (
  <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="CroissantsMoon logo">
    <path d="M44 32C44 42.49 35.49 51 25 51C14.51 51 6 42.49 6 32C6 21.51 14.51 13 25 13C22.4 17.2 21 22.2 21 27.5C21 38.27 28.3 47.3 38.2 49.8C42.2 46.2 44 39.4 44 32Z" fill={CM.nebulaGold} opacity="0.92"/>
    <path d="M40 20 L46 14 L52 20 L50 28 L52 36 L46 44 L40 36 L42 28 Z" fill={CM.nebulaGold} opacity="0.75"/>
    <ellipse cx="46" cy="20" rx="4.5" ry="4.5" fill="none" stroke={CM.nebulaGold} strokeWidth="1.5" opacity="0.6"/>
    <path d="M43.5 18.5 Q44.5 17.5 46 18" stroke="rgba(255,255,255,0.5)" strokeWidth="1" strokeLinecap="round" fill="none"/>
    <circle cx="56" cy="12" r="1.6" fill={CM.nebulaGold} opacity="0.7"/>
    <circle cx="10" cy="10" r="1.1" fill={CM.aurora} opacity="0.55"/>
    <circle cx="58" cy="42" r="0.9" fill={CM.moonlight} opacity="0.45"/>
  </svg>
)

export default function CroissantsMoonPage() {
  const webProjectsRef = useRef<HTMLDivElement>(null)
  const graphicDesignRef = useRef<HTMLDivElement>(null)

  function scrollTo(ref: React.RefObject<HTMLDivElement | null>) {
    ref.current?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div style={{ background: CM.midnight }}>

      {/* ── Hero ─────────────────────────────────────────────── */}
      <div style={{
        position: 'relative', overflow: 'hidden',
        background: `linear-gradient(160deg,${CM.void} 0%,${CM.midnight} 40%,${CM.deepSpace} 100%)`,
        minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 'clamp(6rem,14vh,10rem) 24px clamp(5rem,11vh,9rem)',
      }}>
        {/* Star field */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
          <StarField count={80} />
        </div>
        {/* Floating astronauts */}
        <AstronautFloat img={3} style={{ right: '7%', top: '16%' }} size={115} dur={24} del={0}   rot={15}  x1={10}  y1={-20} x2={-8}  y2={14} />
        <AstronautFloat img={4} style={{ left: '4%', bottom: '22%' }} size={90}  dur={31} del={-11} rot={-12} x1={-14} y1={10}  x2={10}  y2={-8} />
        {/* Constellation */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
          <ConstellationSVG w={1200} h={700} seed={3} />
        </div>
        {/* Nebula blobs */}
        <div style={{ position: 'absolute', left: -200, top: -80, width: 700, height: 700, borderRadius: '50%', background: 'radial-gradient(circle,rgba(111,168,255,0.06) 0%,transparent 65%)', pointerEvents: 'none', zIndex: 0 }} />
        <div style={{ position: 'absolute', right: -120, bottom: -100, width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle,rgba(212,177,90,0.06) 0%,transparent 65%)', pointerEvents: 'none', zIndex: 0 }} />
        {/* Crescent */}
        <div style={{ position: 'absolute', right: '5%', top: '8%', pointerEvents: 'none', zIndex: 0, filter: 'blur(0.5px) drop-shadow(0 0 28px rgba(212,177,90,0.35))', opacity: 0.18 }}>
          <svg width="180" height="180" viewBox="0 0 180 180" fill="none">
            <path d="M130 90C130 114.85 109.85 135 85 135C60.15 135 40 114.85 40 90C40 65.15 60.15 45 85 45C78.8 54.2 76 65 76 76.5C76 100.65 91.8 121.2 113.6 128.1C124 119.1 130 105.2 130 90Z" fill={CM.nebulaGold} opacity="0.8"/>
          </svg>
        </div>
        {/* CM watermark */}
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
          <span style={{ fontFamily: 'var(--font-cormorant,"Cormorant Garamond",serif)', fontStyle: 'italic', fontSize: '28vw', fontWeight: 300, color: CM.nebulaGold, opacity: 0.025, lineHeight: 1, userSelect: 'none', whiteSpace: 'nowrap' }}>CM</span>
        </div>
        {/* Aurora glow */}
        <div style={{ position: 'absolute', bottom: -60, left: '50%', transform: 'translateX(-50%)', width: 600, height: 200, borderRadius: '50%', background: 'radial-gradient(ellipse,rgba(111,168,255,0.08) 0%,transparent 70%)', pointerEvents: 'none', zIndex: 0 }} />

        {/* Hero content */}
        <div className="max-w-3xl mx-auto text-center" style={{ position: 'relative', zIndex: 1, width: '100%' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem', animation: 'cmFloat 5s ease-in-out infinite', filter: 'drop-shadow(0 0 18px rgba(212,177,90,0.4))' }}>
            <LogoSVG />
          </div>
          <h1 style={{ fontFamily: 'var(--font-cormorant,"Cormorant Garamond",Georgia,serif)', fontSize: 'clamp(3.2rem,10vw,7rem)', fontWeight: 400, fontStyle: 'italic', letterSpacing: '.01em', lineHeight: 0.9, color: CM.moonlight, marginBottom: 0, textShadow: '0 0 80px rgba(111,168,255,0.18)' }}>
            CroissantsMoon
          </h1>
          <p style={{ fontFamily: 'var(--font-outfit,"Outfit",sans-serif)', fontSize: 'clamp(.7rem,1.4vw,.8rem)', fontWeight: 500, letterSpacing: '.22em', color: CM.nebulaGold, textTransform: 'uppercase', margin: '2rem 0 3rem', opacity: 0.9 }}>
            Celestial Studio · Digital Presence Crafted with Intention
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, justifyContent: 'center' }}>
            <button
              onClick={() => scrollTo(webProjectsRef)}
              className="cm-glow-btn"
              style={{ fontFamily: 'var(--font-outfit,"Outfit",sans-serif)', fontSize: '.85rem', fontWeight: 600, background: CM.nebulaGold, color: CM.midnight, padding: '14px 30px', borderRadius: 999, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8, letterSpacing: '.03em', border: 'none', cursor: 'pointer' }}
            >
              View Web Projects <ArrowRight style={{ width: 14, height: 14 }} />
            </button>
            <button
              onClick={() => scrollTo(graphicDesignRef)}
              style={{ fontFamily: 'var(--font-outfit,"Outfit",sans-serif)', fontSize: '.85rem', fontWeight: 400, border: '1px solid rgba(212,177,90,0.38)', color: CM.nebulaGold, padding: '14px 30px', borderRadius: 999, display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(212,177,90,0.06)', cursor: 'pointer', transition: 'background .22s,border-color .22s,box-shadow .22s' }}
            >
              View Design Work <ArrowRight style={{ width: 14, height: 14 }} />
            </button>
            <Link href="/croissantsmoon/proposals" style={{ fontFamily: 'var(--font-outfit,"Outfit",sans-serif)', fontSize: '.85rem', fontWeight: 400, border: '1px solid rgba(143,168,214,0.28)', color: CM.stardust, padding: '14px 30px', borderRadius: 999, display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(143,168,214,0.05)', textDecoration: 'none', transition: 'background .22s,border-color .22s,color .22s,box-shadow .22s' }}>
              Request a Proposal <Send style={{ width: 13, height: 13 }} />
            </Link>
          </div>
          {/* Scroll indicator */}
          <div style={{ marginTop: 'clamp(4rem,8vh,7rem)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
            <span style={{ fontFamily: 'var(--font-outfit,"Outfit",sans-serif)', fontSize: '.56rem', letterSpacing: '.2em', textTransform: 'uppercase', color: CM.stardust, opacity: 0.5 }}>Explore</span>
            <div style={{ width: 1, height: 44, background: `linear-gradient(to bottom,${CM.aurora},transparent)`, animation: 'cmScrollLine 2.2s ease-in-out infinite', opacity: 0.5 }} />
          </div>
        </div>
      </div>

      {/* ── Services ─────────────────────────────────────────── */}
      <div style={{ background: `linear-gradient(180deg,${CM.midnight} 0%,${CM.deepSpace} 50%,${CM.midnight} 100%)`, padding: 'clamp(5rem,10vh,8rem) 24px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0, opacity: 0.65 }}>
          <StarField count={55} />
        </div>
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
          <ConstellationSVG w={1200} h={700} seed={5} />
        </div>
        <AstronautFloat img={4} style={{ right: '4%', top: '12%' }} size={100} dur={28} del={-3} rot={-10} />
        <div className="max-w-6xl mx-auto" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ textAlign: 'center', marginBottom: '4.5rem' }}>
            <p style={{ fontFamily: 'var(--font-outfit,"Outfit",sans-serif)', fontSize: '.62rem', fontWeight: 600, letterSpacing: '.22em', textTransform: 'uppercase', color: CM.nebulaGold, marginBottom: '1rem' }}>Services</p>
            <h2 style={{ fontFamily: 'var(--font-cormorant,"Cormorant Garamond",Georgia,serif)', fontSize: 'clamp(2.4rem,6vw,4rem)', fontWeight: 400, fontStyle: 'italic', color: CM.moonlight, lineHeight: 1.05, letterSpacing: '-.01em', marginBottom: '1.25rem' }}>Digital Identity Systems</h2>
            <p style={{ fontFamily: 'var(--font-outfit,"Outfit",sans-serif)', fontSize: '.92rem', lineHeight: 1.78, color: CM.stardust, maxWidth: 520, margin: '0 auto' }}>We don't build websites. We architect digital presences that communicate who you are before a single word is read.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 24, alignItems: 'start' }}>
            {CM_SERVICES.map((svc, i) => (
              <div key={i} className="cm-card-hover" style={{ position: 'relative', borderRadius: 24, overflow: 'hidden', background: 'rgba(11,30,58,0.55)', backdropFilter: 'blur(18px) saturate(1.4)', WebkitBackdropFilter: 'blur(18px) saturate(1.4)', border: '1px solid rgba(111,168,255,0.16)', boxShadow: '0 4px 40px rgba(3,7,18,0.5)', display: 'flex', flexDirection: 'column' }}>
                <div style={{ height: 2, background: `linear-gradient(to right,${svc.accentColor}44,${svc.accentColor},${svc.accentColor}44)` }} />
                <div style={{ padding: 'clamp(1.75rem,3.5vw,2.5rem)', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                    <div style={{ width: 50, height: 50, borderRadius: 15, background: `${svc.accentColor}12`, border: `1px solid ${svc.accentColor}28`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 0 20px ${svc.glowColor}` }}>
                      {svc.icon}
                    </div>
                    <span style={{ fontFamily: 'var(--font-outfit,"Outfit",sans-serif)', fontSize: '.6rem', fontWeight: 600, letterSpacing: '.14em', textTransform: 'uppercase', color: svc.accentColor, opacity: 0.8, padding: '4px 12px', borderRadius: 999, background: `${svc.accentColor}10`, border: `1px solid ${svc.accentColor}22` }}>{svc.tag}</span>
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-cormorant,"Cormorant Garamond",Georgia,serif)', fontSize: 'clamp(1.3rem,2.8vw,1.7rem)', fontWeight: 500, fontStyle: 'italic', color: CM.moonlight, lineHeight: 1.2, marginBottom: '.6rem' }}>{svc.title}</h3>
                  <p style={{ fontFamily: 'var(--font-outfit,"Outfit",sans-serif)', fontSize: '.78rem', fontWeight: 500, color: svc.accentColor, opacity: 0.85, marginBottom: '1rem', lineHeight: 1.4 }}>{svc.positioning}</p>
                  <p style={{ fontFamily: 'var(--font-outfit,"Outfit",sans-serif)', fontSize: '.84rem', lineHeight: 1.78, color: CM.stardust, marginBottom: '1.5rem' }}>{svc.desc}</p>
                  <div style={{ marginBottom: '1.25rem' }}>
                    <p style={{ fontFamily: 'var(--font-outfit,"Outfit",sans-serif)', fontSize: '.6rem', fontWeight: 600, letterSpacing: '.14em', textTransform: 'uppercase', color: 'rgba(143,168,214,0.5)', marginBottom: '.65rem' }}>Ideal For</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                      {svc.targets.map(t => (
                        <span key={t} style={{ fontFamily: 'var(--font-outfit,"Outfit",sans-serif)', fontSize: '.68rem', color: CM.stardust, opacity: 0.8, padding: '4px 12px', borderRadius: 999, background: 'rgba(111,168,255,0.07)', border: '1px solid rgba(111,168,255,0.15)' }}>{t}</span>
                      ))}
                    </div>
                  </div>
                  <div style={{ marginBottom: '1.75rem' }}>
                    <p style={{ fontFamily: 'var(--font-outfit,"Outfit",sans-serif)', fontSize: '.6rem', fontWeight: 600, letterSpacing: '.14em', textTransform: 'uppercase', color: 'rgba(143,168,214,0.5)', marginBottom: '.65rem' }}>Includes</p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                      {svc.features.map(f => (
                        <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <span style={{ width: 4, height: 4, borderRadius: '50%', background: svc.accentColor, flexShrink: 0, boxShadow: `0 0 6px ${svc.accentColor}88` }} />
                          <span style={{ fontFamily: 'var(--font-outfit,"Outfit",sans-serif)', fontSize: '.8rem', color: CM.stardust, opacity: 0.85 }}>{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div style={{ marginTop: 'auto', padding: '1.25rem', borderRadius: 14, background: `${svc.accentColor}08`, border: `1px solid ${svc.accentColor}18`, marginBottom: '1.25rem' }}>
                    <p style={{ fontFamily: 'var(--font-outfit,"Outfit",sans-serif)', fontSize: '.58rem', fontWeight: 600, letterSpacing: '.14em', textTransform: 'uppercase', color: 'rgba(143,168,214,0.45)', marginBottom: '.4rem' }}>{svc.pricingLabel} · Starting from</p>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, flexWrap: 'wrap' }}>
                      <span style={{ fontFamily: 'var(--font-cormorant,"Cormorant Garamond",Georgia,serif)', fontSize: '1.35rem', fontWeight: 500, color: svc.accentColor }}>{svc.pricingIDR}</span>
                      <span style={{ fontFamily: 'var(--font-outfit,"Outfit",sans-serif)', fontSize: '.72rem', color: 'rgba(143,168,214,0.5)' }}>/</span>
                      <span style={{ fontFamily: 'var(--font-cormorant,"Cormorant Garamond",Georgia,serif)', fontSize: '1.1rem', fontWeight: 400, color: CM.stardust }}>{svc.pricingUSD}</span>
                    </div>
                  </div>
                  <Link href="/contact" style={{ width: '100%', fontFamily: 'var(--font-outfit,"Outfit",sans-serif)', fontSize: '.82rem', fontWeight: 600, color: svc.accentColor, background: 'transparent', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '11px 22px', borderRadius: 999, border: `1px solid ${svc.accentColor}44`, textDecoration: 'none', transition: 'background .22s,box-shadow .22s,border-color .22s' }}>
                    {svc.ctaLabel} <ArrowRight style={{ width: 13, height: 13 }} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
          {/* CTA bar */}
          <div style={{ marginTop: '3.5rem', padding: '2.5rem', borderRadius: 22, background: 'rgba(24,59,107,0.2)', border: '1px solid rgba(111,168,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem' }}>
            <div>
              <p style={{ fontFamily: 'var(--font-cormorant,"Cormorant Garamond",Georgia,serif)', fontSize: 'clamp(1.2rem,2.5vw,1.6rem)', fontWeight: 400, fontStyle: 'italic', color: CM.moonlight, marginBottom: '.35rem' }}>Not sure which fits you?</p>
              <p style={{ fontFamily: 'var(--font-outfit,"Outfit",sans-serif)', fontSize: '.82rem', color: CM.stardust, opacity: 0.8 }}>Let's talk about your project and find the right direction together.</p>
            </div>
            <Link href="/contact" className="cm-glow-btn" style={{ fontFamily: 'var(--font-outfit,"Outfit",sans-serif)', fontSize: '.85rem', fontWeight: 600, background: CM.nebulaGold, color: CM.midnight, padding: '14px 30px', borderRadius: 999, border: 'none', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 8, letterSpacing: '.03em', whiteSpace: 'nowrap', textDecoration: 'none' }}>
              Book a Consultation <ArrowRight style={{ width: 14, height: 14 }} />
            </Link>
          </div>
        </div>
      </div>

      {/* ── Web Projects ─────────────────────────────────────── */}
      <div ref={webProjectsRef} style={{ background: `linear-gradient(180deg,${CM.deepSpace} 0%,${CM.midnight} 100%)`, padding: 'clamp(4.5rem,9vh,7rem) 24px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
          <ConstellationSVG w={1200} h={800} seed={7} />
        </div>
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0, opacity: 0.5 }}>
          <StarField count={35} />
        </div>
        <AstronautFloat img={4} style={{ left: '2%', top: '28%' }}  size={100} dur={26} del={-4}  rot={18} />
        <AstronautFloat img={5} style={{ right: '3%', top: '14%' }} size={85}  dur={32} del={-14} rot={-8} />
        <div className="max-w-5xl mx-auto" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ marginBottom: '2.75rem' }}>
            <p style={{ fontFamily: 'var(--font-outfit,"Outfit",sans-serif)', fontSize: '.63rem', fontWeight: 600, letterSpacing: '.2em', textTransform: 'uppercase', color: CM.nebulaGold, marginBottom: '.9rem' }}>Web Development</p>
            <h2 style={{ fontFamily: 'var(--font-cormorant,"Cormorant Garamond",Georgia,serif)', fontSize: 'clamp(2.2rem,5vw,3.5rem)', fontWeight: 400, fontStyle: 'italic', color: CM.moonlight, lineHeight: 1.08 }}>Featured Projects</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(270px,1fr))', gap: 20, marginBottom: '2.5rem' }}>
            {CM_FEATURED_PROJECTS.map((p, i) => (
              <div key={i} className="cm-card-hover" style={{ background: CM.deepSpace, borderRadius: 18, overflow: 'hidden', border: '1px solid rgba(111,168,255,0.14)', boxShadow: '0 4px 28px rgba(3,7,18,0.4)', position: 'relative' }}>
                {/* Thumbnail */}
                <div style={{ height: 160, position: 'relative', overflow: 'hidden', background: p.bg }}>
                  {/* Fallback */}
                  <div style={{ position: 'absolute', inset: 0, zIndex: 1, background: p.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}><StarField count={16} /></div>
                    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.45 }}><ConstellationSVG w={320} h={160} seed={p.seed} /></div>
                    <div style={{ position: 'absolute', inset: 0, opacity: 0.05, fontFamily: 'var(--font-cormorant,"Cormorant Garamond",serif)', fontSize: '5.5rem', fontWeight: 600, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', letterSpacing: '-.04em', userSelect: 'none', overflow: 'hidden' }}>{p.watermark}</div>
                    <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
                      <div style={{ fontFamily: 'var(--font-outfit,"Outfit",sans-serif)', fontSize: '.58rem', fontWeight: 600, letterSpacing: '.18em', textTransform: 'uppercase', color: 'rgba(217,230,255,0.45)', marginBottom: 8 }}>{p.label}</div>
                      <div style={{ fontFamily: 'var(--font-cormorant,"Cormorant Garamond",Georgia,serif)', fontSize: '1.55rem', fontWeight: 500, color: CM.moonlight, lineHeight: 1.15, textShadow: '0 2px 20px rgba(0,0,0,0.6)' }}>{p.title}</div>
                    </div>
                  </div>
                  {/* Live iframe */}
                  <iframe
                    src={p.live}
                    scrolling="no"
                    tabIndex={-1}
                    aria-hidden="true"
                    title={`${p.title} homepage preview`}
                    style={{ position: 'absolute', top: 0, left: 0, width: 1620, height: 800, transform: 'scale(0.2)', transformOrigin: 'top left', border: 'none', pointerEvents: 'none', zIndex: 2 }}
                    loading="lazy"
                  />
                  {/* Polish overlay */}
                  <div style={{ position: 'absolute', inset: 0, zIndex: 3, pointerEvents: 'none', background: 'linear-gradient(to bottom,transparent 55%,rgba(7,17,38,0.45) 100%)' }} />
                </div>
                <div style={{ padding: '20px 22px 22px' }}>
                  <p style={{ fontFamily: 'var(--font-outfit,"Outfit",sans-serif)', fontSize: '.79rem', lineHeight: 1.66, color: CM.stardust, marginBottom: 14 }}>{p.tagline}</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 18 }}>
                    {p.tech.map(t => (
                      <span key={t} style={{ fontFamily: 'var(--font-outfit,"Outfit",sans-serif)', fontSize: '.67rem', fontWeight: 400, padding: '3px 11px', borderRadius: 999, background: 'rgba(212,177,90,0.1)', color: CM.stardust, border: '1px solid rgba(212,177,90,0.2)' }}>{t}</span>
                    ))}
                  </div>
                  <div style={{ paddingTop: 14, borderTop: '1px solid rgba(111,168,255,0.1)' }}>
                    <div style={{ marginBottom: 10 }}>
                      <span style={{ fontFamily: 'var(--font-outfit,"Outfit",sans-serif)', fontSize: '.67rem', fontWeight: 600, letterSpacing: '.08em', textTransform: 'uppercase', padding: '3px 10px', borderRadius: 999, background: p.statusBg, color: p.statusColor }}>{p.status}</span>
                    </div>
                    <Link href={p.page} style={{ width: '100%', fontFamily: 'var(--font-outfit,"Outfit",sans-serif)', fontSize: '.78rem', fontWeight: 600, color: CM.midnight, background: CM.nebulaGold, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '9px 18px', borderRadius: 999, marginBottom: 8, border: 'none', boxShadow: '0 0 14px rgba(212,177,90,0.28)', textDecoration: 'none', transition: 'opacity .2s,transform .2s,box-shadow .2s' }}>
                      View Case Study <ArrowRight style={{ width: 12, height: 12 }} />
                    </Link>
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                      {p.github && (
                        <a href={p.github} target="_blank" rel="noopener noreferrer" style={{ fontFamily: 'var(--font-outfit,"Outfit",sans-serif)', fontSize: '.75rem', fontWeight: 600, color: CM.stardust, textDecoration: 'none', flex: 1, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 5, padding: '7px 14px', borderRadius: 999, border: '1px solid rgba(111,168,255,0.22)', background: 'transparent', transition: 'background .2s,box-shadow .2s,color .2s' }}>
                          <Github style={{ width: 12, height: 12 }} /> GitHub
                        </a>
                      )}
                      {p.live && (
                        <a href={p.live} target="_blank" rel="noopener noreferrer" style={{ fontFamily: 'var(--font-outfit,"Outfit",sans-serif)', fontSize: '.75rem', fontWeight: 600, color: CM.nebulaGold, textDecoration: 'none', flex: 1, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 5, padding: '7px 14px', borderRadius: 999, border: '1px solid rgba(212,177,90,0.28)', background: 'transparent', transition: 'background .2s,box-shadow .2s' }}>
                          <ExternalLink style={{ width: 11, height: 11 }} /> Live Preview
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* View All */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '3.5rem' }}>
            <Link href="/croissantsmoon/websites" style={{ fontFamily: 'var(--font-outfit,"Outfit",sans-serif)', fontSize: '.875rem', fontWeight: 600, background: CM.nebulaGold, color: CM.midnight, padding: '14px 32px', borderRadius: 999, border: 'none', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 9, letterSpacing: '.03em', boxShadow: '0 0 24px rgba(212,177,90,0.32),0 4px 18px rgba(212,177,90,0.2)', textDecoration: 'none', transition: 'opacity .2s,transform .2s,box-shadow .2s' }}>
              View All Web Projects <ArrowRight style={{ width: 15, height: 15 }} />
            </Link>
          </div>
          {/* Open Source divider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: '2.25rem' }}>
            <div style={{ flex: 1, height: 1, background: 'linear-gradient(to right,transparent,rgba(111,168,255,0.2))' }} />
            <span style={{ fontFamily: 'var(--font-outfit,"Outfit",sans-serif)', fontSize: '.63rem', fontWeight: 600, letterSpacing: '.18em', textTransform: 'uppercase', color: CM.stardust, opacity: 0.6 }}>Open Source</span>
            <div style={{ flex: 1, height: 1, background: 'linear-gradient(to left,transparent,rgba(111,168,255,0.2))' }} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {['All', 'HTML / CSS', 'JavaScript', 'Other'].map(label => (
                <span key={label} style={{ fontFamily: 'var(--font-outfit,"Outfit",sans-serif)', fontSize: '.76rem', fontWeight: 500, padding: '7px 18px', borderRadius: 999, border: '1px solid rgba(111,168,255,0.2)', background: 'transparent', color: CM.stardust, letterSpacing: '.02em' }}>{label}</span>
              ))}
            </div>
            <a href="https://github.com/croissantsmoon" target="_blank" rel="noopener noreferrer" style={{ fontFamily: 'var(--font-outfit,"Outfit",sans-serif)', fontSize: '.77rem', fontWeight: 400, color: CM.stardust, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6, border: '1px solid rgba(111,168,255,0.18)', padding: '8px 16px', borderRadius: 999, background: 'transparent' }}>
              <Github style={{ width: 14, height: 14 }} /> @croissantsmoon
            </a>
          </div>
          <div style={{ textAlign: 'center', padding: '32px 24px', border: '1px solid rgba(111,168,255,0.1)', borderRadius: 16, background: 'rgba(11,30,58,0.35)' }}>
            <p style={{ fontFamily: 'var(--font-outfit,"Outfit",sans-serif)', fontSize: '.84rem', color: CM.stardust, opacity: 0.7, marginBottom: 12 }}>View open source repositories on GitHub</p>
            <a href="https://github.com/croissantsmoon" target="_blank" rel="noopener noreferrer" style={{ fontFamily: 'var(--font-outfit,"Outfit",sans-serif)', fontSize: '.84rem', fontWeight: 600, color: CM.nebulaGold, textDecoration: 'none', borderBottom: `1px solid ${CM.nebulaGold}`, paddingBottom: 2 }}>@croissantsmoon ↗</a>
          </div>
        </div>
      </div>

      {/* ── Graphic Design ───────────────────────────────────── */}
      <div ref={graphicDesignRef} style={{ background: `linear-gradient(180deg,${CM.midnight} 0%,${CM.void} 100%)`, padding: 'clamp(4.5rem,9vh,7rem) 24px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', width: 800, height: 500, borderRadius: '50%', background: 'radial-gradient(ellipse,rgba(111,168,255,0.04) 0%,transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0, opacity: 0.4 }}>
          <StarField count={30} />
        </div>
        <AstronautFloat img={3} style={{ right: '3%', top: '38%' }} size={95} dur={30} del={-9} rot={5} />
        <div className="max-w-5xl mx-auto" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '3rem' }}>
            <div>
              <p style={{ fontFamily: 'var(--font-outfit,"Outfit",sans-serif)', fontSize: '.63rem', fontWeight: 600, letterSpacing: '.2em', textTransform: 'uppercase', color: CM.nebulaGold, marginBottom: '.9rem' }}>Graphic Design</p>
              <h2 style={{ fontFamily: 'var(--font-cormorant,"Cormorant Garamond",Georgia,serif)', fontSize: 'clamp(2.2rem,5vw,3.5rem)', fontWeight: 400, fontStyle: 'italic', color: CM.moonlight, lineHeight: 1.08 }}>Visual identity work</h2>
            </div>
            <p style={{ fontFamily: 'var(--font-outfit,"Outfit",sans-serif)', fontSize: '.87rem', lineHeight: 1.7, color: CM.stardust, maxWidth: 300 }}>Branding, institutional materials, and communication design — click any to preview.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(270px,1fr))', gap: 20, marginBottom: '2.5rem' }}>
            {CM_GRAPHIC_WORKS.slice(-3).map((g, i) => {
              const catColor = CM_CAT_COLORS[g.cat] || CM.stardust
              return (
                <Link key={i} href="/croissantsmoon/designs" className="cm-card-hover cm-gd-card-hover" style={{ background: CM.deepSpace, borderRadius: 18, overflow: 'hidden', border: '1px solid rgba(111,168,255,0.12)', cursor: 'pointer', textAlign: 'left', boxShadow: '0 4px 28px rgba(3,7,18,0.4)', textDecoration: 'none', display: 'block' }}>
                  <div style={{ position: 'relative', overflow: 'hidden', height: 195 }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={`/assets/images/graphic-designs/${g.folder}/1.png`} alt={g.title} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', transition: 'transform .45s ease' }} loading="lazy" />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom,transparent 45%,rgba(7,17,38,0.72))', pointerEvents: 'none' }} />
                    <div className="cm-gd-overlay" style={{ position: 'absolute', inset: 0, opacity: 0, background: 'rgba(7,17,38,0.28)', transition: 'opacity .28s', display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
                      <span style={{ fontFamily: 'var(--font-outfit,"Outfit",sans-serif)', fontSize: '.72rem', fontWeight: 600, color: CM.moonlight, background: 'rgba(7,17,38,0.6)', padding: '7px 20px', borderRadius: 999, backdropFilter: 'blur(8px)', border: '1px solid rgba(217,230,255,0.2)', boxShadow: '0 0 18px rgba(111,168,255,0.2)' }}>Preview</span>
                    </div>
                    <span style={{ position: 'absolute', top: 10, right: 10, fontFamily: 'var(--font-outfit,"Outfit",sans-serif)', fontSize: '.58rem', fontWeight: 500, background: 'rgba(7,17,38,0.6)', backdropFilter: 'blur(6px)', color: CM.stardust, padding: '3px 10px', borderRadius: 999, border: '1px solid rgba(111,168,255,0.18)' }}>{g.year}</span>
                  </div>
                  <div style={{ padding: '16px 18px 20px' }}>
                    <p style={{ fontFamily: 'var(--font-outfit,"Outfit",sans-serif)', fontSize: '.62rem', fontWeight: 600, letterSpacing: '.12em', textTransform: 'uppercase', color: catColor, marginBottom: 6 }}>{g.cat}</p>
                    <h4 style={{ fontFamily: 'var(--font-cormorant,"Cormorant Garamond",Georgia,serif)', fontSize: '1.04rem', fontWeight: 500, color: CM.moonlight, lineHeight: 1.28, marginBottom: 4 }}>{g.title}</h4>
                    <p style={{ fontFamily: 'var(--font-outfit,"Outfit",sans-serif)', fontSize: '.71rem', color: CM.stardust, opacity: 0.75 }}>{g.inst}</p>
                  </div>
                </Link>
              )
            })}
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Link href="/croissantsmoon/designs" style={{ fontFamily: 'var(--font-outfit,"Outfit",sans-serif)', fontSize: '.875rem', fontWeight: 600, background: CM.nebulaGold, color: CM.midnight, padding: '14px 32px', borderRadius: 999, border: 'none', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 9, letterSpacing: '.03em', boxShadow: '0 0 24px rgba(212,177,90,0.32),0 4px 18px rgba(212,177,90,0.2)', textDecoration: 'none', transition: 'opacity .2s,transform .2s,box-shadow .2s' }}>
              View All Graphic Design Work <ArrowRight style={{ width: 15, height: 15 }} />
            </Link>
          </div>
        </div>
      </div>

      {/* ── Process ──────────────────────────────────────────── */}
      <div style={{ background: `linear-gradient(180deg,${CM.void} 0%,${CM.midnight} 100%)`, padding: 'clamp(4.5rem,9vh,7rem) 24px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
          <ConstellationSVG w={1200} h={600} seed={11} />
        </div>
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0, opacity: 0.4 }}>
          <StarField count={28} />
        </div>
        <AstronautFloat img={4} style={{ left: '3%', bottom: '18%' }} size={85} dur={27} del={-6} rot={-15} />
        <div className="max-w-5xl mx-auto" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <p style={{ fontFamily: 'var(--font-outfit,"Outfit",sans-serif)', fontSize: '.63rem', fontWeight: 600, letterSpacing: '.2em', textTransform: 'uppercase', color: CM.nebulaGold, marginBottom: '.9rem' }}>Process</p>
            <h2 style={{ fontFamily: 'var(--font-cormorant,"Cormorant Garamond",Georgia,serif)', fontSize: 'clamp(2.2rem,5vw,3.5rem)', fontWeight: 400, fontStyle: 'italic', color: CM.moonlight, lineHeight: 1.08 }}>How We Work</h2>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'clamp(1.25rem,2.5vw,2rem)', alignItems: 'flex-start', justifyContent: 'center' }}>
            {PROCESS_STEPS.map((step, i) => (
              <div key={i} className="cm-process-card" style={{ flex: 1, minWidth: 200, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', background: 'rgba(24,59,107,0.28)', backdropFilter: 'blur(12px)', border: '1px solid rgba(111,168,255,0.15)', borderRadius: 22, padding: '2.25rem 1.5rem 2rem', boxShadow: '0 4px 28px rgba(3,7,18,0.35)' }}>
                <div style={{ position: 'relative', marginBottom: '1.5rem' }}>
                  <div style={{ width: 60, height: 60, borderRadius: 20, background: 'rgba(111,168,255,0.08)', border: '1px solid rgba(111,168,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 24px rgba(111,168,255,0.12)' }}>
                    {step.icon}
                  </div>
                  <span style={{ position: 'absolute', top: -10, right: -10, fontFamily: 'var(--font-outfit,"Outfit",sans-serif)', fontSize: '.52rem', fontWeight: 700, letterSpacing: '.1em', color: CM.nebulaGold, opacity: 0.8 }}>{step.num}</span>
                </div>
                <h3 style={{ fontFamily: 'var(--font-cormorant,"Cormorant Garamond",Georgia,serif)', fontSize: '1.32rem', fontWeight: 500, fontStyle: 'italic', color: CM.moonlight, marginBottom: '.75rem', lineHeight: 1.2 }}>{step.label}</h3>
                <p style={{ fontFamily: 'var(--font-outfit,"Outfit",sans-serif)', fontSize: '.83rem', lineHeight: 1.74, color: CM.stardust, maxWidth: 210 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Concept Platforms ─────────────────────────────────── */}
      <div style={{ background: `linear-gradient(180deg,${CM.deepSpace} 0%,${CM.void} 50%,${CM.midnight} 100%)`, padding: 'clamp(5rem,10vh,8rem) 24px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0, opacity: 0.6 }}>
          <StarField count={45} />
        </div>
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
          <ConstellationSVG w={1200} h={700} seed={9} />
        </div>
        <AstronautFloat img={5} style={{ left: '2%', bottom: '20%' }} size={90} dur={30} del={-8} rot={12} />
        <div className="max-w-6xl mx-auto" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ textAlign: 'center', marginBottom: '4.5rem' }}>
            <p style={{ fontFamily: 'var(--font-outfit,"Outfit",sans-serif)', fontSize: '.62rem', fontWeight: 600, letterSpacing: '.22em', textTransform: 'uppercase', color: CM.nebulaGold, marginBottom: '1rem' }}>Concept Platforms</p>
            <h2 style={{ fontFamily: 'var(--font-cormorant,"Cormorant Garamond",Georgia,serif)', fontSize: 'clamp(2.4rem,6vw,4rem)', fontWeight: 400, fontStyle: 'italic', color: CM.moonlight, lineHeight: 1.05, marginBottom: '1.25rem' }}>Demo Experiences</h2>
            <p style={{ fontFamily: 'var(--font-outfit,"Outfit",sans-serif)', fontSize: '.92rem', lineHeight: 1.78, color: CM.stardust, maxWidth: 520, margin: '0 auto' }}>Three premium platform directions — each with transparent pricing. Explore the visual language and see exactly what you get.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 22 }}>
            {CM_CONCEPT_DETAILS.map((c, idx) => {
              const savings = c.originalPrice - c.discountedPrice
              const discountPct = Math.round((savings / c.originalPrice) * 100)
              return (
                <div key={idx} className="cm-card-hover" style={{ background: 'rgba(11,30,58,0.45)', backdropFilter: 'blur(16px) saturate(1.3)', WebkitBackdropFilter: 'blur(16px) saturate(1.3)', border: '1px solid rgba(111,168,255,0.14)', borderRadius: 24, overflow: 'hidden', boxShadow: '0 4px 36px rgba(3,7,18,0.45)', display: 'flex', flexDirection: 'column' }}>
                  {/* Preview mock */}
                  <div style={{ padding: '16px 16px 0' }}>
                    <div style={{ background: c.bg, borderRadius: 14, overflow: 'hidden', border: `1px solid ${c.accentColor}22`, boxShadow: `0 8px 40px rgba(3,7,18,0.6),0 0 0 1px ${c.accentColor}12`, position: 'relative', height: 180 }}>
                      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}><StarField count={14} /></div>
                      <div style={{ background: 'rgba(7,17,38,0.7)', backdropFilter: 'blur(10px)', padding: '9px 14px', borderBottom: `1px solid ${c.accentColor}18`, display: 'flex', alignItems: 'center', gap: 8, position: 'relative', zIndex: 1 }}>
                        <div style={{ width: 7, height: 7, borderRadius: '50%', background: c.accentColor, opacity: 0.6 }} />
                        <div style={{ flex: 1, height: 6, background: 'rgba(255,255,255,0.05)', borderRadius: 3 }} />
                        <div style={{ width: 40, height: 6, background: `${c.accentColor}22`, borderRadius: 3 }} />
                      </div>
                      <div style={{ padding: '14px 16px', position: 'relative', zIndex: 1 }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 10 }}>
                          {[0,1].map(j => (
                            <div key={j} style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid ${c.accentColor}15`, borderRadius: 8, padding: 10 }}>
                              <div style={{ height: 5, width: '45%', background: `${c.accentColor}30`, borderRadius: 3, marginBottom: 6 }} />
                              <div style={{ height: 14, width: '70%', background: `${c.accentColor}18`, borderRadius: 4 }} />
                            </div>
                          ))}
                        </div>
                        <div style={{ background: 'rgba(255,255,255,0.02)', border: `1px solid ${c.accentColor}12`, borderRadius: 8, padding: 10, display: 'flex', gap: 8, alignItems: 'center' }}>
                          <div style={{ width: 28, height: 28, borderRadius: 7, background: `${c.accentColor}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: c.accentColor }}>
                            {c.icon}
                          </div>
                          <div style={{ flex: 1 }}>
                            <div style={{ height: 4, width: '55%', background: `${c.accentColor}25`, borderRadius: 3, marginBottom: 5 }} />
                            <div style={{ height: 4, width: '38%', background: 'rgba(255,255,255,0.06)', borderRadius: 3 }} />
                          </div>
                          <div style={{ width: 44, height: 18, background: `${c.accentColor}22`, borderRadius: 999 }} />
                        </div>
                      </div>
                      <div style={{ position: 'absolute', bottom: 10, right: 12, zIndex: 2 }}>
                        <span style={{ fontFamily: 'var(--font-outfit,"Outfit",sans-serif)', fontSize: '.55rem', fontWeight: 600, letterSpacing: '.14em', textTransform: 'uppercase', color: c.accentColor, opacity: 0.55 }}>{c.previewLabel}</span>
                      </div>
                      <div style={{ position: 'absolute', top: 10, left: 10, zIndex: 3 }}>
                        <span style={{ fontFamily: 'var(--font-outfit,"Outfit",sans-serif)', fontSize: '.55rem', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', background: c.accentColor, color: '#030712', padding: '3px 9px', borderRadius: 999 }}>{discountPct}% OFF</span>
                      </div>
                    </div>
                  </div>
                  {/* Card content */}
                  <div style={{ padding: '1.5rem clamp(1.25rem,3vw,1.75rem) clamp(1.5rem,3vw,2rem)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '.85rem' }}>
                      <span style={{ fontFamily: 'var(--font-outfit,"Outfit",sans-serif)', fontSize: '.58rem', fontWeight: 700, letterSpacing: '.18em', textTransform: 'uppercase', color: c.accentColor, opacity: 0.7 }}>{c.num}</span>
                      <span style={{ fontFamily: 'var(--font-outfit,"Outfit",sans-serif)', fontSize: '.6rem', fontWeight: 500, letterSpacing: '.12em', textTransform: 'uppercase', color: 'rgba(143,168,214,0.45)', padding: '3px 10px', borderRadius: 999, background: 'rgba(111,168,255,0.06)', border: '1px solid rgba(111,168,255,0.12)' }}>{c.badge}</span>
                    </div>
                    <h3 style={{ fontFamily: 'var(--font-cormorant,"Cormorant Garamond",Georgia,serif)', fontSize: 'clamp(1.25rem,2.5vw,1.55rem)', fontWeight: 500, fontStyle: 'italic', color: CM.moonlight, lineHeight: 1.2, marginBottom: '.4rem' }}>{c.title}</h3>
                    <p style={{ fontFamily: 'var(--font-outfit,"Outfit",sans-serif)', fontSize: '.75rem', fontWeight: 500, color: c.accentColor, opacity: 0.75, marginBottom: '.85rem' }}>{c.theme}</p>
                    <p style={{ fontFamily: 'var(--font-outfit,"Outfit",sans-serif)', fontSize: '.82rem', lineHeight: 1.74, color: CM.stardust, marginBottom: '1.25rem' }}>{c.desc}</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: '1.25rem' }}>
                      {c.tags.map(tag => (
                        <span key={tag} style={{ fontFamily: 'var(--font-outfit,"Outfit",sans-serif)', fontSize: '.66rem', color: CM.stardust, opacity: 0.75, padding: '4px 12px', borderRadius: 999, background: `${c.accentColor}0a`, border: `1px solid ${c.accentColor}20` }}>{tag}</span>
                      ))}
                    </div>
                    {/* Pricing */}
                    <div style={{ padding: '14px 16px', borderRadius: 14, marginBottom: '1.25rem', background: `${c.accentColor}07`, border: `1px solid ${c.accentColor}18` }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                        <span style={{ fontFamily: 'var(--font-outfit,"Outfit",sans-serif)', fontSize: '.55rem', fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', background: c.accentColor, color: '#030712', padding: '2px 8px', borderRadius: 999 }}>Special Price</span>
                        <span style={{ fontFamily: 'var(--font-outfit,"Outfit",sans-serif)', fontSize: '.7rem', textDecoration: 'line-through', color: 'rgba(143,168,214,0.38)' }}>{formatRp(c.originalPrice)}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                        <span style={{ fontFamily: 'var(--font-cormorant,"Cormorant Garamond",Georgia,serif)', fontSize: '1.4rem', fontWeight: 500, color: c.accentColor }}>{formatRp(c.discountedPrice)}</span>
                        <span style={{ fontFamily: 'var(--font-outfit,"Outfit",sans-serif)', fontSize: '.62rem', color: 'rgba(143,168,214,0.5)' }}>starting from</span>
                      </div>
                      <p style={{ fontFamily: 'var(--font-outfit,"Outfit",sans-serif)', fontSize: '.62rem', color: 'rgba(143,168,214,0.4)', marginTop: 4 }}>Save {formatRp(savings)} · {discountPct}% off regular price</p>
                    </div>
                    {/* CTAs */}
                    {idx === 0 && (
                      <Link href={c.demoHref} style={{ width: '100%', fontFamily: 'var(--font-outfit,"Outfit",sans-serif)', fontSize: '.8rem', fontWeight: 600, color: CM.aurora, background: `${CM.aurora}12`, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 7, padding: '10px 20px', borderRadius: 999, marginBottom: 8, border: `1px solid ${CM.aurora}45`, textDecoration: 'none', transition: 'background .2s,box-shadow .2s,border-color .2s', boxSizing: 'border-box' }}>
                        {c.demoIcon} {c.demoLabel}
                      </Link>
                    )}
                    {idx === 1 && (
                      <Link href={c.demoHref} style={{ width: '100%', fontFamily: 'var(--font-outfit,"Outfit",sans-serif)', fontSize: '.8rem', fontWeight: 600, color: CM.nebulaGold, background: 'rgba(212,177,90,0.1)', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 7, padding: '10px 20px', borderRadius: 999, marginBottom: 8, border: '1px solid rgba(212,177,90,0.38)', textDecoration: 'none', transition: 'background .2s,box-shadow .2s,border-color .2s', boxSizing: 'border-box' }}>
                        {c.demoIcon} {c.demoLabel}
                      </Link>
                    )}
                    {idx === 2 && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 7, marginBottom: 8 }}>
                        <Link href={c.demoHref} style={{ width: '100%', fontFamily: 'var(--font-outfit,"Outfit",sans-serif)', fontSize: '.77rem', fontWeight: 600, color: '#A0C4FF', background: 'rgba(160,196,255,0.1)', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 7, padding: '9px 18px', borderRadius: 999, border: '1px solid rgba(160,196,255,0.35)', textDecoration: 'none', transition: 'background .2s,box-shadow .2s,border-color .2s' }}>
                          {c.demoIcon} {c.demoLabel}
                        </Link>
                        {c.demoHref2 && (
                          <Link href={c.demoHref2} style={{ width: '100%', fontFamily: 'var(--font-outfit,"Outfit",sans-serif)', fontSize: '.77rem', fontWeight: 600, color: '#A0C4FF', background: 'rgba(160,196,255,0.07)', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 7, padding: '9px 18px', borderRadius: 999, border: '1px solid rgba(160,196,255,0.28)', textDecoration: 'none', transition: 'background .2s,box-shadow .2s,border-color .2s' }}>
                            {c.demoIcon2} {c.demoLabel2}
                          </Link>
                        )}
                      </div>
                    )}
                    <Link href="/contact" style={{ width: '100%', fontFamily: 'var(--font-outfit,"Outfit",sans-serif)', fontSize: '.8rem', fontWeight: 600, color: c.accentColor, background: 'transparent', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 7, padding: '10px 20px', borderRadius: 999, marginBottom: 8, border: `1px solid ${c.accentColor}45`, textDecoration: 'none', transition: 'background .2s,box-shadow .2s,border-color .2s', boxSizing: 'border-box' }}>
                      <Receipt style={{ width: 12, height: 12 }} /> View Pricing & Details
                    </Link>
                    <Link href="/contact" style={{ width: '100%', fontFamily: 'var(--font-outfit,"Outfit",sans-serif)', fontSize: '.76rem', fontWeight: 500, color: 'rgba(143,168,214,0.55)', background: 'transparent', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '8px 16px', borderRadius: 999, border: '1px solid rgba(111,168,255,0.12)', textDecoration: 'none', transition: 'color .2s,border-color .2s' }}>
                      Contact to Start <ArrowRight style={{ width: 11, height: 11 }} />
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
          <div style={{ marginTop: '3.5rem', textAlign: 'center' }}>
            <p style={{ fontFamily: 'var(--font-cormorant,"Cormorant Garamond",Georgia,serif)', fontSize: 'clamp(1rem,2vw,1.3rem)', fontWeight: 400, fontStyle: 'italic', color: CM.stardust, opacity: 0.7, marginBottom: '1.5rem' }}>&ldquo;I want <em>my</em> platform to feel like this.&rdquo;</p>
            <Link href="/contact" style={{ fontFamily: 'var(--font-outfit,"Outfit",sans-serif)', fontSize: '.85rem', fontWeight: 600, color: CM.nebulaGold, background: 'transparent', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 28px', borderRadius: 999, border: '1px solid rgba(212,177,90,0.35)', textDecoration: 'none', transition: 'background .2s,box-shadow .2s,border-color .2s,transform .2s' }}>
              Discuss Your Vision <ArrowRight style={{ width: 14, height: 14 }} />
            </Link>
          </div>
        </div>
      </div>

      {/* ── Contact CTA ──────────────────────────────────────── */}
      <div style={{ background: `linear-gradient(160deg,${CM.void} 0%,${CM.midnight} 60%,#0a1530 100%)`, padding: 'clamp(5.5rem,12vh,10rem) 24px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', right: '-5%', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', zIndex: 0, filter: 'blur(2px) drop-shadow(0 0 60px rgba(212,177,90,0.3))', opacity: 0.12 }}>
          <svg width="500" height="500" viewBox="0 0 500 500" fill="none">
            <path d="M340 250C340 318.5 284.5 375 216 375C147.5 375 92 318.5 92 250C92 181.5 147.5 125 216 125C202.5 142.5 196 163 196 186C196 249.5 238.5 302 296.5 318.8C322 299.5 340 276.2 340 250Z" fill={CM.nebulaGold}/>
          </svg>
        </div>
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
          <StarField count={50} />
        </div>
        <AstronautFloat img={5} style={{ left: '5%',  top: '18%' }}    size={100} dur={25} del={-13} rot={10} />
        <AstronautFloat img={3} style={{ right: '4%', bottom: '22%' }} size={90}  dur={35} del={-2}  rot={-7} />
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 600, height: 300, borderRadius: '50%', background: 'radial-gradient(ellipse,rgba(111,168,255,0.06) 0%,transparent 70%)', pointerEvents: 'none', zIndex: 0 }} />
        <div className="max-w-3xl mx-auto text-center" style={{ position: 'relative', zIndex: 1 }}>
          <p style={{ fontFamily: 'var(--font-outfit,"Outfit",sans-serif)', fontSize: '.63rem', fontWeight: 600, letterSpacing: '.22em', textTransform: 'uppercase', color: CM.nebulaGold, opacity: 0.8, marginBottom: '1.5rem' }}>Let's Work Together</p>
          <h2 style={{ fontFamily: 'var(--font-cormorant,"Cormorant Garamond",Georgia,serif)', fontSize: 'clamp(2.6rem,7.5vw,5.5rem)', fontWeight: 400, fontStyle: 'italic', color: CM.moonlight, lineHeight: 0.96, marginBottom: '1.5rem', letterSpacing: '-.01em', textShadow: '0 0 60px rgba(111,168,255,0.18)' }}>Let's build something meaningful.</h2>
          <p style={{ fontFamily: 'var(--font-outfit,"Outfit",sans-serif)', fontSize: '.94rem', lineHeight: 1.8, color: CM.stardust, maxWidth: 460, margin: '0 auto 3rem' }}>Whether you need a website, a brand identity, or both — CroissantsMoon is open for new projects.</p>
          <Link href="/contact" className="cm-glow-btn" style={{ fontFamily: 'var(--font-outfit,"Outfit",sans-serif)', fontSize: '.875rem', fontWeight: 600, background: CM.nebulaGold, color: CM.midnight, padding: '16px 38px', borderRadius: 999, border: 'none', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 9, letterSpacing: '.03em', textDecoration: 'none' }}>
            Start a Conversation <ArrowRight style={{ width: 15, height: 15 }} />
          </Link>
          <div style={{ marginTop: '3rem', paddingTop: '2.5rem', borderTop: '1px solid rgba(111,168,255,0.08)' }}>
            <a href="https://github.com/croissantsmoon" target="_blank" rel="noopener noreferrer" style={{ fontFamily: 'var(--font-outfit,"Outfit",sans-serif)', fontSize: '.77rem', fontWeight: 400, color: 'rgba(143,168,214,0.35)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6, transition: 'color .22s' }}>
              <Github style={{ width: 13, height: 13 }} /> See all open-source work on GitHub →
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
