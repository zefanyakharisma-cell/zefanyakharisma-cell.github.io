'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import {
  ArrowRight, Send, UserCircle, Globe, LayoutDashboard,
  PlayCircle, BarChart2, Award, Github, ExternalLink,
  Star, GitFork, Search, FileText, TrendingUp, Code2, Settings,
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

// ── Types ─────────────────────────────────────────────────────
interface GithubRepo {
  id: number
  name: string
  description: string | null
  html_url: string
  homepage: string | null
  language: string | null
  stargazers_count: number
  forks_count: number
  updated_at: string
  topics: string[]
  fork: boolean
}

// ── Data ─────────────────────────────────────────────────────

const BP_PHASES = [
  {
    num: '01', label: 'Discover', sublabel: 'Lead & Audit', color: CM.aurora,
    icon: <Search style={{ width: 18, height: 18, color: CM.aurora }} />,
    points: ['Identify qualified leads', 'Website & UX audit', 'Scope & opportunity mapping'],
  },
  {
    num: '02', label: 'Propose', sublabel: 'Custom Demo', color: CM.nebulaGold,
    icon: <FileText style={{ width: 18, height: 18, color: CM.nebulaGold }} />,
    points: ['Build tailored prototype', 'Token-gated proposal page', 'Personalized outreach email'],
  },
  {
    num: '03', label: 'Convert', sublabel: 'Analytics & Follow-up', color: '#A0C4FF',
    icon: <TrendingUp style={{ width: 18, height: 18, color: '#A0C4FF' }} />,
    points: ['Track proposal engagement', 'Score-based follow-up system', '14-day token access window'],
  },
  {
    num: '04', label: 'Build', sublabel: 'Dev & Deploy', color: '#C9A9FF',
    icon: <Code2 style={{ width: 18, height: 18, color: '#C9A9FF' }} />,
    points: ['UI/UX → Development → QA', 'Responsive testing & polish', 'Production deployment'],
  },
  {
    num: '05', label: 'Maintain', sublabel: 'Infrastructure', color: '#7DC9A0',
    icon: <Settings style={{ width: 18, height: 18, color: '#7DC9A0' }} />,
    points: ['3 infrastructure models', 'Monthly retainer options', 'Long-term growth strategy'],
  },
]

const BP_METRICS = [
  { val: '16', label: 'Process Stages' },
  { val: '14d', label: 'Proposal Window' },
  { val: '3', label: 'Infra Models' },
  { val: '50/25/25', label: 'Payment Split' },
]

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
    page: '/croissantsmoon/websites',
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
    demoHref: '/croissantsmoon/web-dashboard-partnership',
    demoHref2: '/croissantsmoon/web-dashboard-grants',
    demoLabel: 'Partnership Dashboard Demo',
    demoIcon: <BarChart2 style={{ width: 12, height: 12 }} />,
    demoLabel2: 'International Grants Demo',
    demoIcon2: <Award style={{ width: 12, height: 12 }} />,
  },
]

const PRODUCT_TIERS = [
  {
    id: 'basic',
    label: 'Landing — Basic',
    features: [
      { name: 'UI design',         desc: 'clean, modern layout — 1 page',     time: '4–6 hrs' },
      { name: 'Responsive layout', desc: 'mobile + desktop breakpoints',       time: '2–3 hrs' },
      { name: 'Contact form',      desc: 'basic email submission',             time: '2 hrs'   },
      { name: 'Domain setup',      desc: 'DNS config + SSL',                   time: '1 hr'    },
      { name: 'Deployment',        desc: 'Vercel deploy + environment setup',  time: '1 hr'    },
      { name: 'Revisions',         desc: '1 round included',                   time: '2–3 hrs' },
    ],
    totalTime: '12–16 hrs', totalTimeDesc: '~2–3 days work',
    originalPrice: 'Rp 5jt', originalDesc: '~Rp 350k/hr',
    foundingPrice: 'Rp 2.5jt', foundingDesc: '50% off',
  },
  {
    id: 'pro',
    label: 'Landing — Pro',
    features: [
      { name: 'Everything in Basic',  desc: 'UI, responsive, contact, deploy',             time: '12–16 hrs' },
      { name: 'Multi-section design', desc: 'hero, about, services, testimonials, CTA',    time: '4–6 hrs'   },
      { name: 'Animations',           desc: 'scroll-triggered, entrance effects',           time: '3–4 hrs'   },
      { name: 'CMS integration',      desc: 'editable content without code',               time: '4–5 hrs'   },
      { name: 'SEO setup',            desc: 'meta tags, OG image, sitemap',                time: '2 hrs'     },
      { name: 'Revisions',            desc: '1 round included',                             time: '3–4 hrs'   },
    ],
    totalTime: '28–35 hrs', totalTimeDesc: '~5–6 days work',
    originalPrice: 'Rp 7jt', originalDesc: '~Rp 220k/hr',
    foundingPrice: 'Rp 3.5jt', foundingDesc: '50% off',
  },
  {
    id: 'org',
    label: 'Org Website',
    features: [
      { name: 'Multi-page structure',     desc: 'home, about, programs, contact, etc.',   time: '8–10 hrs' },
      { name: 'Admin panel',              desc: 'content management for staff',            time: '8–10 hrs' },
      { name: 'Announcements system',     desc: 'post, edit, publish news',                time: '4–5 hrs'  },
      { name: 'Forms',                    desc: 'registration, inquiry, submission',       time: '4–5 hrs'  },
      { name: 'International branding',   desc: 'bilingual support, EN/ID toggle',         time: '5–6 hrs'  },
      { name: 'Auth for staff',           desc: 'login system for admin access',           time: '4–5 hrs'  },
      { name: 'Deploy + domain + revisions', desc: 'full setup + 1 revision round',        time: '5–6 hrs'  },
    ],
    totalTime: '38–47 hrs', totalTimeDesc: '~7–9 days work',
    originalPrice: 'Rp 12jt', originalDesc: '~Rp 280k/hr',
    foundingPrice: 'Rp 6jt', foundingDesc: '50% off',
  },
  {
    id: 'dash',
    label: 'Dashboard',
    features: [
      { name: 'Database setup',    desc: 'Supabase schema, tables, relations',        time: '4–6 hrs'  },
      { name: 'Auth system',       desc: 'login, session, role-based access',         time: '5–6 hrs'  },
      { name: 'CRUD operations',   desc: 'create, read, update, delete records',      time: '6–8 hrs'  },
      { name: 'Permissions system',desc: 'admin vs member vs viewer roles',           time: '4–5 hrs'  },
      { name: 'Dashboard UI',      desc: 'tables, charts, filters, search',           time: '8–10 hrs' },
      { name: 'Analytics view',    desc: 'basic metrics, charts, summaries',          time: '4–5 hrs'  },
      { name: 'Realtime updates',  desc: 'Supabase realtime subscriptions',           time: '3–4 hrs'  },
      { name: 'Deploy + revisions',desc: 'Vercel deploy, env config, 1 revision',    time: '4–5 hrs'  },
    ],
    totalTime: '38–49 hrs', totalTimeDesc: '~8–10 days work',
    originalPrice: 'Rp 18jt', originalDesc: '~Rp 390k/hr',
    foundingPrice: 'Rp 9jt', foundingDesc: '50% off',
  },
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

  const [repos, setRepos] = useState<GithubRepo[]>([])
  const [reposLoading, setReposLoading] = useState(true)
  const [reposError, setReposError] = useState(false)
  const [activeLang, setActiveLang] = useState('All')
  const [activeTier, setActiveTier] = useState('basic')

  useEffect(() => {
    fetch('https://api.github.com/users/croissantsmoon/repos?sort=updated&per_page=12&type=public')
      .then(r => r.json())
      .then(data => {
        if (Array.isArray(data)) {
          setRepos(data.filter((r: GithubRepo) => !r.fork))
        } else {
          setReposError(true)
        }
        setReposLoading(false)
      })
      .catch(() => { setReposError(true); setReposLoading(false) })
  }, [])

  function scrollTo(ref: React.RefObject<HTMLDivElement | null>) {
    ref.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const repoLanguages = ['All', ...Array.from(new Set(repos.map(r => r.language).filter(Boolean) as string[]))]
  const filteredRepos = activeLang === 'All' ? repos : repos.filter(r => r.language === activeLang)

  const activeTierData = PRODUCT_TIERS.find(t => t.id === activeTier)!

  return (
    <div style={{ background: CM.midnight }}>

      {/* ── Hero ─────────────────────────────────────────────── */}
      <div style={{
        position: 'relative', overflow: 'hidden',
        background: `linear-gradient(160deg,${CM.void} 0%,${CM.midnight} 40%,${CM.deepSpace} 100%)`,
        minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 'clamp(6rem,14vh,10rem) 24px clamp(5rem,11vh,9rem)',
      }}>
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
          <StarField count={80} />
        </div>
        <AstronautFloat img={3} style={{ right: '7%', top: '16%' }} size={115} dur={24} del={0}   rot={15}  x1={10}  y1={-20} x2={-8}  y2={14} />
        <AstronautFloat img={4} style={{ left: '4%', bottom: '22%' }} size={90}  dur={31} del={-11} rot={-12} x1={-14} y1={10}  x2={10}  y2={-8} />
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
          <ConstellationSVG w={1200} h={700} seed={3} />
        </div>
        <div style={{ position: 'absolute', left: -200, top: -80, width: 700, height: 700, borderRadius: '50%', background: 'radial-gradient(circle,rgba(111,168,255,0.06) 0%,transparent 65%)', pointerEvents: 'none', zIndex: 0 }} />
        <div style={{ position: 'absolute', right: -120, bottom: -100, width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle,rgba(212,177,90,0.06) 0%,transparent 65%)', pointerEvents: 'none', zIndex: 0 }} />
        <div style={{ position: 'absolute', right: '5%', top: '8%', pointerEvents: 'none', zIndex: 0, filter: 'blur(0.5px) drop-shadow(0 0 28px rgba(212,177,90,0.35))', opacity: 0.18 }}>
          <svg width="180" height="180" viewBox="0 0 180 180" fill="none">
            <path d="M130 90C130 114.85 109.85 135 85 135C60.15 135 40 114.85 40 90C40 65.15 60.15 45 85 45C78.8 54.2 76 65 76 76.5C76 100.65 91.8 121.2 113.6 128.1C124 119.1 130 105.2 130 90Z" fill={CM.nebulaGold} opacity="0.8"/>
          </svg>
        </div>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
          <span style={{ fontFamily: 'var(--font-cormorant,"Cormorant Garamond",serif)', fontStyle: 'italic', fontSize: '28vw', fontWeight: 300, color: CM.nebulaGold, opacity: 0.025, lineHeight: 1, userSelect: 'none', whiteSpace: 'nowrap' }}>CM</span>
        </div>
        <div style={{ position: 'absolute', bottom: -60, left: '50%', transform: 'translateX(-50%)', width: 600, height: 200, borderRadius: '50%', background: 'radial-gradient(ellipse,rgba(111,168,255,0.08) 0%,transparent 70%)', pointerEvents: 'none', zIndex: 0 }} />

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
            <Link href="/croissantsmoon/proposal" style={{ fontFamily: 'var(--font-outfit,"Outfit",sans-serif)', fontSize: '.85rem', fontWeight: 400, border: '1px solid rgba(143,168,214,0.28)', color: CM.stardust, padding: '14px 30px', borderRadius: 999, display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(143,168,214,0.05)', textDecoration: 'none', transition: 'background .22s,border-color .22s,color .22s,box-shadow .22s' }}>
              Request a Proposal <Send style={{ width: 13, height: 13 }} />
            </Link>
          </div>
          <div style={{ marginTop: 'clamp(4rem,8vh,7rem)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
            <span style={{ fontFamily: 'var(--font-outfit,"Outfit",sans-serif)', fontSize: '.56rem', letterSpacing: '.2em', textTransform: 'uppercase', color: CM.stardust, opacity: 0.5 }}>Explore</span>
            <div style={{ width: 1, height: 44, background: `linear-gradient(to bottom,${CM.aurora},transparent)`, animation: 'cmScrollLine 2.2s ease-in-out infinite', opacity: 0.5 }} />
          </div>
        </div>
      </div>

      {/* ── S1: Business Process ─────────────────────────────── */}
      <div style={{ background: `linear-gradient(180deg,${CM.deepSpace} 0%,${CM.midnight} 100%)`, padding: 'clamp(4.5rem,9vh,7rem) 24px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0, opacity: 0.5 }}>
          <StarField count={30} />
        </div>
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
          <ConstellationSVG w={1200} h={600} seed={2} />
        </div>
        <div className="max-w-5xl mx-auto" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <p style={{ fontFamily: 'var(--font-outfit,"Outfit",sans-serif)', fontSize: '.62rem', fontWeight: 600, letterSpacing: '.22em', textTransform: 'uppercase', color: CM.nebulaGold, marginBottom: '1rem' }}>How We Work</p>
            <h2 style={{ fontFamily: 'var(--font-cormorant,"Cormorant Garamond",Georgia,serif)', fontSize: 'clamp(2.4rem,6vw,4rem)', fontWeight: 400, fontStyle: 'italic', color: CM.moonlight, lineHeight: 1.05, marginBottom: '1rem' }}>Business Process</h2>
            <p style={{ fontFamily: 'var(--font-outfit,"Outfit",sans-serif)', fontSize: '.9rem', lineHeight: 1.75, color: CM.stardust, maxWidth: 500, margin: '0 auto' }}>From the first lead to long-term delivery — every step is designed for clarity, quality, and trust.</p>
          </div>

          {/* Phase pipeline */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 1, background: 'rgba(111,168,255,0.08)', borderRadius: 18, overflow: 'hidden', border: '1px solid rgba(111,168,255,0.12)', marginBottom: '2.5rem' }}>
            {BP_PHASES.map((phase, i) => (
              <div key={i} style={{ background: CM.deepSpace, padding: '24px 18px 22px', borderRight: i < 4 ? '1px solid rgba(111,168,255,0.08)' : 'none', transition: 'background .2s' }} className="cm-card-hover">
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                  <div style={{ width: 34, height: 34, borderRadius: 10, background: `${phase.color}12`, border: `1px solid ${phase.color}25`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    {phase.icon}
                  </div>
                  <span style={{ fontFamily: 'var(--font-outfit,"Outfit",sans-serif)', fontSize: '.58rem', fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: phase.color, opacity: 0.6 }}>{phase.num}</span>
                </div>
                <h4 style={{ fontFamily: 'var(--font-cormorant,"Cormorant Garamond",Georgia,serif)', fontSize: '1.1rem', fontWeight: 500, color: CM.moonlight, marginBottom: 3 }}>{phase.label}</h4>
                <p style={{ fontFamily: 'var(--font-outfit,"Outfit",sans-serif)', fontSize: '.65rem', fontWeight: 500, color: phase.color, opacity: 0.7, letterSpacing: '.06em', textTransform: 'uppercase', marginBottom: 12 }}>{phase.sublabel}</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                  {phase.points.map((pt, j) => (
                    <div key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: 7 }}>
                      <span style={{ width: 4, height: 4, borderRadius: '50%', background: phase.color, opacity: 0.45, flexShrink: 0, marginTop: 5 }} />
                      <span style={{ fontFamily: 'var(--font-outfit,"Outfit",sans-serif)', fontSize: '.73rem', color: CM.stardust, lineHeight: 1.5 }}>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Key metrics bar */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 1, background: 'rgba(212,177,90,0.08)', borderRadius: 14, overflow: 'hidden', border: '1px solid rgba(212,177,90,0.12)' }}>
            {BP_METRICS.map((m, i) => (
              <div key={i} style={{ background: `${CM.midnight}cc`, padding: '18px 20px', borderRight: i < 3 ? '1px solid rgba(212,177,90,0.1)' : 'none', textAlign: 'center' }}>
                <div style={{ fontFamily: 'var(--font-cormorant,"Cormorant Garamond",Georgia,serif)', fontSize: '1.6rem', fontWeight: 600, color: CM.nebulaGold, lineHeight: 1 }}>{m.val}</div>
                <div style={{ fontFamily: 'var(--font-outfit,"Outfit",sans-serif)', fontSize: '.62rem', letterSpacing: '.12em', textTransform: 'uppercase', color: CM.stardust, opacity: 0.6, marginTop: 5 }}>{m.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── S2: Web Projects ─────────────────────────────────── */}
      <div ref={webProjectsRef} style={{ background: `linear-gradient(180deg,${CM.midnight} 0%,${CM.deepSpace} 100%)`, padding: 'clamp(4.5rem,9vh,7rem) 24px', position: 'relative', overflow: 'hidden' }}>
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
                <div style={{ height: 160, position: 'relative', overflow: 'hidden', background: p.bg }}>
                  <div style={{ position: 'absolute', inset: 0, zIndex: 1, background: p.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}><StarField count={16} /></div>
                    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.45 }}><ConstellationSVG w={320} h={160} seed={p.seed} /></div>
                    <div style={{ position: 'absolute', inset: 0, opacity: 0.05, fontFamily: 'var(--font-cormorant,"Cormorant Garamond",serif)', fontSize: '5.5rem', fontWeight: 600, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', letterSpacing: '-.04em', userSelect: 'none', overflow: 'hidden' }}>{p.watermark}</div>
                    <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
                      <div style={{ fontFamily: 'var(--font-outfit,"Outfit",sans-serif)', fontSize: '.58rem', fontWeight: 600, letterSpacing: '.18em', textTransform: 'uppercase', color: 'rgba(217,230,255,0.45)', marginBottom: 8 }}>{p.label}</div>
                      <div style={{ fontFamily: 'var(--font-cormorant,"Cormorant Garamond",Georgia,serif)', fontSize: '1.55rem', fontWeight: 500, color: CM.moonlight, lineHeight: 1.15, textShadow: '0 2px 20px rgba(0,0,0,0.6)' }}>{p.title}</div>
                    </div>
                  </div>
                  <iframe
                    src={p.live}
                    scrolling="no"
                    tabIndex={-1}
                    aria-hidden="true"
                    title={`${p.title} homepage preview`}
                    style={{ position: 'absolute', top: 0, left: 0, width: 1620, height: 800, transform: 'scale(0.2)', transformOrigin: 'top left', border: 'none', pointerEvents: 'none', zIndex: 2 }}
                    loading="lazy"
                  />
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
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Link href="/croissantsmoon/websites" style={{ fontFamily: 'var(--font-outfit,"Outfit",sans-serif)', fontSize: '.875rem', fontWeight: 600, background: CM.nebulaGold, color: CM.midnight, padding: '14px 32px', borderRadius: 999, border: 'none', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 9, letterSpacing: '.03em', boxShadow: '0 0 24px rgba(212,177,90,0.32),0 4px 18px rgba(212,177,90,0.2)', textDecoration: 'none', transition: 'opacity .2s,transform .2s,box-shadow .2s' }}>
              View All Web Projects <ArrowRight style={{ width: 15, height: 15 }} />
            </Link>
          </div>
        </div>
      </div>

      {/* ── S3: Open Source ───────────────────────────────────── */}
      <div style={{ background: CM.void, padding: 'clamp(4.5rem,9vh,7rem) 24px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0, opacity: 0.45 }}>
          <StarField count={40} />
        </div>
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
          <ConstellationSVG w={1200} h={600} seed={13} />
        </div>
        <AstronautFloat img={5} style={{ right: '3%', top: '20%' }} size={90} dur={29} del={-6} rot={-10} />
        <div className="max-w-5xl mx-auto" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '2.75rem' }}>
            <div>
              <p style={{ fontFamily: 'var(--font-outfit,"Outfit",sans-serif)', fontSize: '.63rem', fontWeight: 600, letterSpacing: '.2em', textTransform: 'uppercase', color: CM.nebulaGold, marginBottom: '.9rem' }}>Open Source</p>
              <h2 style={{ fontFamily: 'var(--font-cormorant,"Cormorant Garamond",Georgia,serif)', fontSize: 'clamp(2.2rem,5vw,3.5rem)', fontWeight: 400, fontStyle: 'italic', color: CM.moonlight, lineHeight: 1.08 }}>@croissantsmoon</h2>
            </div>
            <a href="https://github.com/croissantsmoon" target="_blank" rel="noopener noreferrer" style={{ fontFamily: 'var(--font-outfit,"Outfit",sans-serif)', fontSize: '.77rem', fontWeight: 500, color: CM.stardust, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6, border: '1px solid rgba(111,168,255,0.18)', padding: '9px 18px', borderRadius: 999, background: 'transparent', transition: 'background .2s,border-color .2s,color .2s' }}>
              <Github style={{ width: 14, height: 14 }} /> View on GitHub
            </a>
          </div>

          {/* Language filter */}
          {repoLanguages.length > 1 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: '2rem' }}>
              {repoLanguages.map(lang => (
                <button
                  key={lang}
                  onClick={() => setActiveLang(lang)}
                  style={{ fontFamily: 'var(--font-outfit,"Outfit",sans-serif)', fontSize: '.76rem', fontWeight: 500, padding: '7px 18px', borderRadius: 999, border: activeLang === lang ? `1px solid ${CM.nebulaGold}` : '1px solid rgba(111,168,255,0.2)', background: activeLang === lang ? 'rgba(212,177,90,0.12)' : 'transparent', color: activeLang === lang ? CM.nebulaGold : CM.stardust, letterSpacing: '.02em', cursor: 'pointer', transition: 'all .18s' }}
                >
                  {lang}
                </button>
              ))}
            </div>
          )}

          {/* Repo grid */}
          {reposLoading ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: 16 }}>
              {[...Array(6)].map((_, i) => (
                <div key={i} style={{ background: 'rgba(11,30,58,0.4)', borderRadius: 14, border: '1px solid rgba(111,168,255,0.1)', padding: '22px 20px', height: 130 }}>
                  <div style={{ height: 10, width: '40%', background: 'rgba(255,255,255,0.05)', borderRadius: 6, marginBottom: 10 }} />
                  <div style={{ height: 7, width: '80%', background: 'rgba(255,255,255,0.04)', borderRadius: 5, marginBottom: 6 }} />
                  <div style={{ height: 7, width: '55%', background: 'rgba(255,255,255,0.03)', borderRadius: 5 }} />
                </div>
              ))}
            </div>
          ) : reposError || filteredRepos.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '48px 24px', border: '1px solid rgba(111,168,255,0.1)', borderRadius: 16, background: 'rgba(11,30,58,0.35)' }}>
              <p style={{ fontFamily: 'var(--font-outfit,"Outfit",sans-serif)', fontSize: '.88rem', color: CM.stardust, opacity: 0.65, marginBottom: 14 }}>
                {reposError ? 'Could not load repositories.' : 'No repositories found for this filter.'}
              </p>
              <a href="https://github.com/croissantsmoon" target="_blank" rel="noopener noreferrer" style={{ fontFamily: 'var(--font-outfit,"Outfit",sans-serif)', fontSize: '.84rem', fontWeight: 600, color: CM.nebulaGold, textDecoration: 'none', borderBottom: `1px solid ${CM.nebulaGold}`, paddingBottom: 2 }}>
                @croissantsmoon on GitHub ↗
              </a>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: 16 }}>
              {filteredRepos.map(repo => (
                <a
                  key={repo.id}
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cm-card-hover"
                  style={{ background: 'rgba(11,30,58,0.5)', backdropFilter: 'blur(12px)', borderRadius: 14, border: '1px solid rgba(111,168,255,0.12)', padding: '20px', textDecoration: 'none', display: 'flex', flexDirection: 'column', gap: 10, transition: 'border-color .2s,background .2s', boxShadow: '0 2px 16px rgba(3,7,18,0.3)' }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <Github style={{ width: 15, height: 15, color: CM.stardust, opacity: 0.5, flexShrink: 0 }} />
                      <span style={{ fontFamily: 'var(--font-outfit,"Outfit",sans-serif)', fontSize: '.85rem', fontWeight: 600, color: CM.moonlight }}>{repo.name}</span>
                    </div>
                    {repo.homepage && (
                      <ExternalLink style={{ width: 13, height: 13, color: CM.stardust, opacity: 0.4, flexShrink: 0 }} />
                    )}
                  </div>
                  {repo.description && (
                    <p style={{ fontFamily: 'var(--font-outfit,"Outfit",sans-serif)', fontSize: '.78rem', color: CM.stardust, lineHeight: 1.6, opacity: 0.85 }}>{repo.description}</p>
                  )}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginTop: 'auto', flexWrap: 'wrap' }}>
                    {repo.language && (
                      <span style={{ fontFamily: 'var(--font-outfit,"Outfit",sans-serif)', fontSize: '.68rem', color: CM.nebulaGold, background: 'rgba(212,177,90,0.1)', border: '1px solid rgba(212,177,90,0.2)', padding: '2px 10px', borderRadius: 999 }}>{repo.language}</span>
                    )}
                    {repo.stargazers_count > 0 && (
                      <span style={{ fontFamily: 'var(--font-outfit,"Outfit",sans-serif)', fontSize: '.72rem', color: CM.stardust, opacity: 0.6, display: 'flex', alignItems: 'center', gap: 4 }}>
                        <Star style={{ width: 11, height: 11 }} /> {repo.stargazers_count}
                      </span>
                    )}
                    {repo.forks_count > 0 && (
                      <span style={{ fontFamily: 'var(--font-outfit,"Outfit",sans-serif)', fontSize: '.72rem', color: CM.stardust, opacity: 0.6, display: 'flex', alignItems: 'center', gap: 4 }}>
                        <GitFork style={{ width: 11, height: 11 }} /> {repo.forks_count}
                      </span>
                    )}
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── S4: Graphic Design ───────────────────────────────── */}
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

      {/* ── S5: Concept Platforms ─────────────────────────────── */}
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
            <p style={{ fontFamily: 'var(--font-outfit,"Outfit",sans-serif)', fontSize: '.92rem', lineHeight: 1.78, color: CM.stardust, maxWidth: 520, margin: '0 auto' }}>Three premium platform directions — each a fully realized concept. Explore the visual language and interact with the demos.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 22 }}>
            {CM_CONCEPT_DETAILS.map((c, idx) => (
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
                  </div>
                </div>
                {/* Card content */}
                <div style={{ padding: '1.5rem clamp(1.25rem,3vw,1.75rem) clamp(1.5rem,3vw,2rem)', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '.85rem' }}>
                    <span style={{ fontFamily: 'var(--font-outfit,"Outfit",sans-serif)', fontSize: '.58rem', fontWeight: 700, letterSpacing: '.18em', textTransform: 'uppercase', color: c.accentColor, opacity: 0.7 }}>{c.num}</span>
                    <span style={{ fontFamily: 'var(--font-outfit,"Outfit",sans-serif)', fontSize: '.6rem', fontWeight: 500, letterSpacing: '.12em', textTransform: 'uppercase', color: 'rgba(143,168,214,0.45)', padding: '3px 10px', borderRadius: 999, background: 'rgba(111,168,255,0.06)', border: '1px solid rgba(111,168,255,0.12)' }}>{c.badge}</span>
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-cormorant,"Cormorant Garamond",Georgia,serif)', fontSize: 'clamp(1.25rem,2.5vw,1.55rem)', fontWeight: 500, fontStyle: 'italic', color: CM.moonlight, lineHeight: 1.2, marginBottom: '.4rem' }}>{c.title}</h3>
                  <p style={{ fontFamily: 'var(--font-outfit,"Outfit",sans-serif)', fontSize: '.75rem', fontWeight: 500, color: c.accentColor, opacity: 0.75, marginBottom: '.85rem' }}>{c.theme}</p>
                  <p style={{ fontFamily: 'var(--font-outfit,"Outfit",sans-serif)', fontSize: '.82rem', lineHeight: 1.74, color: CM.stardust, marginBottom: '1.25rem' }}>{c.desc}</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: '1.5rem' }}>
                    {c.tags.map(tag => (
                      <span key={tag} style={{ fontFamily: 'var(--font-outfit,"Outfit",sans-serif)', fontSize: '.66rem', color: CM.stardust, opacity: 0.75, padding: '4px 12px', borderRadius: 999, background: `${c.accentColor}0a`, border: `1px solid ${c.accentColor}20` }}>{tag}</span>
                    ))}
                  </div>
                  {/* Demo buttons */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 7, marginTop: 'auto' }}>
                    {idx === 2 ? (
                      <>
                        <Link href={c.demoHref} style={{ width: '100%', fontFamily: 'var(--font-outfit,"Outfit",sans-serif)', fontSize: '.77rem', fontWeight: 600, color: '#A0C4FF', background: 'rgba(160,196,255,0.1)', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 7, padding: '9px 18px', borderRadius: 999, border: '1px solid rgba(160,196,255,0.35)', textDecoration: 'none', transition: 'background .2s,box-shadow .2s,border-color .2s', boxSizing: 'border-box' }}>
                          {c.demoIcon} {c.demoLabel}
                        </Link>
                        {c.demoHref2 && (
                          <Link href={c.demoHref2} style={{ width: '100%', fontFamily: 'var(--font-outfit,"Outfit",sans-serif)', fontSize: '.77rem', fontWeight: 600, color: '#A0C4FF', background: 'rgba(160,196,255,0.07)', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 7, padding: '9px 18px', borderRadius: 999, border: '1px solid rgba(160,196,255,0.28)', textDecoration: 'none', transition: 'background .2s,box-shadow .2s,border-color .2s', boxSizing: 'border-box' }}>
                            {c.demoIcon2} {c.demoLabel2}
                          </Link>
                        )}
                      </>
                    ) : (
                      <Link href={c.demoHref} style={{ width: '100%', fontFamily: 'var(--font-outfit,"Outfit",sans-serif)', fontSize: '.8rem', fontWeight: 600, color: c.accentColor, background: `${c.accentColor}12`, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 7, padding: '10px 20px', borderRadius: 999, border: `1px solid ${c.accentColor}45`, textDecoration: 'none', transition: 'background .2s,box-shadow .2s,border-color .2s', boxSizing: 'border-box' }}>
                        {c.demoIcon} {c.demoLabel}
                      </Link>
                    )}
                    <Link href="/contact" style={{ width: '100%', fontFamily: 'var(--font-outfit,"Outfit",sans-serif)', fontSize: '.76rem', fontWeight: 500, color: 'rgba(143,168,214,0.55)', background: 'transparent', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '8px 16px', borderRadius: 999, border: '1px solid rgba(111,168,255,0.12)', textDecoration: 'none', transition: 'color .2s,border-color .2s', boxSizing: 'border-box' }}>
                      Discuss This Project <ArrowRight style={{ width: 11, height: 11 }} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: '3.5rem', textAlign: 'center' }}>
            <p style={{ fontFamily: 'var(--font-cormorant,"Cormorant Garamond",Georgia,serif)', fontSize: 'clamp(1rem,2vw,1.3rem)', fontWeight: 400, fontStyle: 'italic', color: CM.stardust, opacity: 0.7, marginBottom: '1.5rem' }}>&ldquo;I want <em>my</em> platform to feel like this.&rdquo;</p>
            <Link href="/contact" style={{ fontFamily: 'var(--font-outfit,"Outfit",sans-serif)', fontSize: '.85rem', fontWeight: 600, color: CM.nebulaGold, background: 'transparent', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 28px', borderRadius: 999, border: '1px solid rgba(212,177,90,0.35)', textDecoration: 'none', transition: 'background .2s,box-shadow .2s,border-color .2s,transform .2s' }}>
              Discuss Your Vision <ArrowRight style={{ width: 14, height: 14 }} />
            </Link>
          </div>
        </div>
      </div>

      {/* ── S6: Product Breakdown ─────────────────────────────── */}
      <div style={{ background: `linear-gradient(180deg,${CM.void} 0%,${CM.midnight} 100%)`, padding: 'clamp(5rem,10vh,8rem) 24px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0, opacity: 0.4 }}>
          <StarField count={35} />
        </div>
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
          <ConstellationSVG w={1200} h={600} seed={17} />
        </div>
        <AstronautFloat img={4} style={{ right: '3%', top: '18%' }} size={90} dur={28} del={-5} rot={-8} />
        <div className="max-w-4xl mx-auto" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <p style={{ fontFamily: 'var(--font-outfit,"Outfit",sans-serif)', fontSize: '.62rem', fontWeight: 600, letterSpacing: '.22em', textTransform: 'uppercase', color: CM.nebulaGold, marginBottom: '1rem' }}>Pricing</p>
            <h2 style={{ fontFamily: 'var(--font-cormorant,"Cormorant Garamond",Georgia,serif)', fontSize: 'clamp(2.4rem,6vw,4rem)', fontWeight: 400, fontStyle: 'italic', color: CM.moonlight, lineHeight: 1.05, marginBottom: '1rem' }}>Product Breakdown</h2>
            <p style={{ fontFamily: 'var(--font-outfit,"Outfit",sans-serif)', fontSize: '.9rem', lineHeight: 1.75, color: CM.stardust, maxWidth: 480, margin: '0 auto' }}>Transparent scope and pricing for each service tier — know exactly what you're getting and how long it takes.</p>
          </div>

          {/* Tabs */}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: '1.75rem' }}>
            {PRODUCT_TIERS.map(tier => (
              <button
                key={tier.id}
                onClick={() => setActiveTier(tier.id)}
                style={{ fontFamily: 'var(--font-outfit,"Outfit",sans-serif)', fontSize: '.78rem', fontWeight: 500, padding: '8px 18px', borderRadius: 999, cursor: 'pointer', transition: 'all .18s', border: activeTier === tier.id ? `1px solid ${CM.nebulaGold}` : '1px solid rgba(111,168,255,0.18)', background: activeTier === tier.id ? CM.nebulaGold : 'rgba(11,30,58,0.5)', color: activeTier === tier.id ? CM.midnight : CM.stardust, letterSpacing: '.01em' }}
              >
                {tier.label}
              </button>
            ))}
          </div>

          {/* Feature list */}
          <div style={{ background: 'rgba(11,30,58,0.55)', backdropFilter: 'blur(14px)', border: '1px solid rgba(111,168,255,0.12)', borderRadius: 18, overflow: 'hidden', marginBottom: '1rem' }}>
            <div style={{ padding: '12px 24px', borderBottom: '1px solid rgba(111,168,255,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontFamily: 'var(--font-outfit,"Outfit",sans-serif)', fontSize: '.62rem', fontWeight: 600, letterSpacing: '.14em', textTransform: 'uppercase', color: CM.stardust, opacity: 0.5 }}>Feature</span>
              <span style={{ fontFamily: 'var(--font-outfit,"Outfit",sans-serif)', fontSize: '.62rem', fontWeight: 600, letterSpacing: '.14em', textTransform: 'uppercase', color: CM.stardust, opacity: 0.5 }}>Est. Time</span>
            </div>
            {activeTierData.features.map((feat, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '13px 24px', borderBottom: i < activeTierData.features.length - 1 ? '1px solid rgba(111,168,255,0.07)' : 'none', gap: 12, transition: 'background .15s' }} className="cm-card-hover">
                <div>
                  <div style={{ fontFamily: 'var(--font-outfit,"Outfit",sans-serif)', fontSize: '.84rem', fontWeight: 500, color: CM.moonlight }}>{feat.name}</div>
                  <div style={{ fontFamily: 'var(--font-outfit,"Outfit",sans-serif)', fontSize: '.72rem', color: CM.stardust, opacity: 0.6, marginTop: 2 }}>{feat.desc}</div>
                </div>
                <span style={{ fontFamily: 'var(--font-outfit,"Outfit",sans-serif)', fontSize: '.76rem', color: CM.stardust, opacity: 0.7, whiteSpace: 'nowrap' }}>{feat.time}</span>
              </div>
            ))}
          </div>

          {/* Price summary */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 1, background: 'rgba(111,168,255,0.08)', borderRadius: 14, overflow: 'hidden', border: '1px solid rgba(111,168,255,0.1)' }}>
            <div style={{ background: 'rgba(11,30,58,0.6)', padding: '20px 22px' }}>
              <div style={{ fontFamily: 'var(--font-outfit,"Outfit",sans-serif)', fontSize: '.6rem', fontWeight: 600, letterSpacing: '.14em', textTransform: 'uppercase', color: CM.stardust, opacity: 0.45, marginBottom: 6 }}>Total Time</div>
              <div style={{ fontFamily: 'var(--font-cormorant,"Cormorant Garamond",Georgia,serif)', fontSize: '1.45rem', fontWeight: 500, color: CM.moonlight }}>{activeTierData.totalTime}</div>
              <div style={{ fontFamily: 'var(--font-outfit,"Outfit",sans-serif)', fontSize: '.71rem', color: CM.stardust, opacity: 0.5, marginTop: 3 }}>{activeTierData.totalTimeDesc}</div>
            </div>
            <div style={{ background: 'rgba(11,30,58,0.6)', padding: '20px 22px', borderLeft: '1px solid rgba(111,168,255,0.08)', borderRight: '1px solid rgba(111,168,255,0.08)' }}>
              <div style={{ fontFamily: 'var(--font-outfit,"Outfit",sans-serif)', fontSize: '.6rem', fontWeight: 600, letterSpacing: '.14em', textTransform: 'uppercase', color: CM.stardust, opacity: 0.45, marginBottom: 6 }}>Standard Rate</div>
              <div style={{ fontFamily: 'var(--font-cormorant,"Cormorant Garamond",Georgia,serif)', fontSize: '1.45rem', fontWeight: 500, color: CM.moonlight }}>{activeTierData.originalPrice}</div>
              <div style={{ fontFamily: 'var(--font-outfit,"Outfit",sans-serif)', fontSize: '.71rem', color: CM.stardust, opacity: 0.5, marginTop: 3 }}>{activeTierData.originalDesc}</div>
            </div>
            <div style={{ background: 'rgba(212,177,90,0.07)', padding: '20px 22px' }}>
              <div style={{ fontFamily: 'var(--font-outfit,"Outfit",sans-serif)', fontSize: '.6rem', fontWeight: 600, letterSpacing: '.14em', textTransform: 'uppercase', color: CM.nebulaGold, opacity: 0.7, marginBottom: 6 }}>Founding Rate</div>
              <div style={{ fontFamily: 'var(--font-cormorant,"Cormorant Garamond",Georgia,serif)', fontSize: '1.45rem', fontWeight: 500, color: CM.nebulaGold }}>{activeTierData.foundingPrice}</div>
              <div style={{ fontFamily: 'var(--font-outfit,"Outfit",sans-serif)', fontSize: '.71rem', color: CM.nebulaGold, opacity: 0.55, marginTop: 3 }}>{activeTierData.foundingDesc}</div>
            </div>
          </div>

          <div style={{ marginTop: '2.5rem', textAlign: 'center' }}>
            <Link href="/contact" className="cm-glow-btn" style={{ fontFamily: 'var(--font-outfit,"Outfit",sans-serif)', fontSize: '.85rem', fontWeight: 600, background: CM.nebulaGold, color: CM.midnight, padding: '14px 32px', borderRadius: 999, border: 'none', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 9, letterSpacing: '.03em', textDecoration: 'none' }}>
              Start a Project <ArrowRight style={{ width: 14, height: 14 }} />
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
