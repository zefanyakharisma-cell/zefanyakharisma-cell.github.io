'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import {
  ArrowRight, ArrowUpRight, Monitor, BarChart3, Palette,
  Github, ExternalLink, Send, Zap, Linkedin, Check, Quote,
} from 'lucide-react'

// ── Links ──────────────────────────────────────────────────────
const PROPOSAL = '/croissantsmoon/proposal'
const EMAIL = 'mailto:zefanya.kharisma@gmail.com'
const GITHUB = 'https://github.com/croissantsmoon'
const LINKEDIN = 'https://www.linkedin.com/in/zefanyakharisma'
const SITE = 'https://zefanyakharisma.com'

// ── Data ───────────────────────────────────────────────────────
const SERVICES = [
  { n: '01', name: 'Web Development', icon: Monitor,
    desc: 'Landing pages, institutional websites, and web applications — built with Next.js, Tailwind, and Supabase.',
    price: 'From Rp 2.5jt' },
  { n: '02', name: 'Dashboard & Data', icon: BarChart3,
    desc: 'Operational dashboards and internal platforms for organizations that need clarity in their data.',
    price: 'From Rp 8jt' },
  { n: '03', name: 'Visual Identity', icon: Palette,
    desc: 'Branding systems, institutional materials, and communication design for organizations that want to be remembered.',
    price: 'On request' },
]

const PROJECTS = [
  {
    cat: 'Institutional · Web App',
    name: 'PCU Global — International Office Platform',
    desc: 'Full international office platform with news CMS, partnership directory, inbound & outbound programs. Mobile-first.',
    stack: ['HTML/CSS', 'JavaScript', 'Tailwind', 'Supabase'],
    github: 'https://github.com/zefanyakharisma-cell/International-Office-Website',
    live: 'https://international-office-website.vercel.app/',
  },
  {
    cat: 'Data · Dashboard',
    name: 'Partnership Dashboard',
    desc: 'Interactive dashboard visualising institutional partnerships — workflow engine, analytics, archive.',
    stack: ['JavaScript', 'Chart.js', 'Tailwind'],
    github: 'https://github.com/zefanyakharisma-cell/Dashboard-Partnership',
    live: 'https://dashboard-partnership.vercel.app/',
  },
  {
    cat: 'Portfolio · SPA',
    name: 'Personal Portfolio System',
    desc: 'Premium editorial-style single-page portfolio — vanilla JS, Tailwind, Supabase, and Formspree.',
    stack: ['HTML/CSS', 'JavaScript', 'Tailwind', 'Supabase'],
    github: 'https://github.com/zefanyakharisma-cell/zefanyakharisma-cell.github.io',
    live: 'https://zefanyakharisma.com/',
  },
  {
    cat: 'Data · Dashboard',
    name: 'International Grants Dashboard',
    desc: 'Grants discovery and management platform — deadline timeline, realtime updates, admin suite.',
    stack: ['JavaScript', 'Chart.js', 'Supabase'],
    github: 'https://github.com/zefanyakharisma-cell/Dashboard-International-Grants',
    live: 'https://dashboard-international-grants.vercel.app/',
  },
]

const TESTIMONIALS = [
  {
    quote: 'The dashboard they built transformed how we manage our partnership data. What took us hours in spreadsheets now takes minutes.',
    who: 'International Office Staff, Petra Christian University',
  },
  {
    quote: 'CroissantsMoon delivered exactly what we needed — a site that looks world-class but was built for our actual audience.',
    who: 'Client, Educational Institution',
  },
]

const STATS = [
  { v: '12+', l: 'Projects Delivered' },
  { v: '5+', l: 'Institutional Clients' },
  { v: '3', l: 'Service Verticals' },
  { v: '2026', l: 'Studio Founded' },
]

const PROCESS = [
  { n: '01', name: 'Discover', text: "We audit your digital presence and identify exactly what's holding you back." },
  { n: '02', name: 'Propose', text: 'You receive a tailored prototype and a transparent proposal — before any commitment.' },
  { n: '03', name: 'Align', text: 'We agree on scope, timeline, and payment. No surprises, ever.' },
  { n: '04', name: 'Build', text: 'Design, development, QA, and deployment — handled end to end.' },
  { n: '05', name: 'Maintain', text: "Choose a retainer or handoff with full documentation. You're never left stranded." },
]

const TIERS = [
  {
    name: 'Landing — Basic', timeline: '2–3 days',
    price: 'Rp 2.5jt', note: 'Founding Rate · Rp 5jt standard', featured: false,
    features: ['Clean, modern 1-page layout', 'Mobile + desktop responsive', 'Contact form (email submission)', 'Domain setup + SSL', 'Vercel deployment', '1 round of revisions'],
  },
  {
    name: 'Landing — Pro', timeline: '4–6 days',
    price: 'Rp 3.5jt', note: 'Founding Rate · Rp 7jt standard', featured: false,
    features: ['Multi-section landing page', 'Custom animations & interactions', 'CMS integration (blog/news)', 'SEO optimisation', 'Analytics setup', '2 rounds of revisions'],
  },
  {
    name: 'Org Website', timeline: '2–3 weeks',
    price: 'Rp 6jt', note: 'Founding Rate · Rp 12jt standard', featured: true,
    features: ['Full multi-page website', 'Admin dashboard', 'Supabase backend + auth', 'Partnership/program directory', 'Mobile-first, WCAG-aware', '3 rounds of revisions'],
  },
  {
    name: 'Dashboard System', timeline: '3–4 weeks',
    price: 'Rp 9jt', note: 'Founding Rate · Rp 18jt standard', featured: false,
    features: ['Data dashboard + analytics', 'Role-based access control', 'Real-time data (Supabase)', 'Export + reporting features', 'Admin interface', 'Ongoing maintenance option'],
  },
]

const DEMOS = [
  {
    n: '01', cat: 'Personal · Portfolio', title: 'Premium Portfolio System',
    desc: 'A narrative-driven digital identity platform for creatives and international professionals. Every element — from typography to motion — tells your story.',
    tags: ['Editorial Design', 'Portfolio CMS', 'Personal Branding', 'Motion'],
    demos: [{ label: 'View Live Demo', href: '/croissantsmoon/web-portfolio' }],
  },
  {
    n: '02', cat: 'Institutional · International', title: 'International Office Platform',
    desc: 'A sophisticated digital platform for universities. Features partnership directories, student onboarding systems, and global announcement boards.',
    tags: ['Partnership Directory', 'Student Onboarding', 'Mobility Programs'],
    demos: [{ label: 'View Live Demo', href: '/croissantsmoon/websites' }],
  },
  {
    n: '03', cat: 'Data · Operations', title: 'Modern Dashboard System',
    desc: 'A premium internal platform for organizations that need clarity in complexity. Analytics, workflow management, and admin interfaces.',
    tags: ['Analytics Dashboard', 'Workflow Engine', 'Admin Interface'],
    demos: [
      { label: 'Partnership Dashboard Demo', href: '/croissantsmoon/web-dashboard-partnership' },
      { label: 'Grants Dashboard Demo', href: '/croissantsmoon/web-dashboard-grants' },
    ],
  },
]

const DESIGNS = [
  { title: 'AERO 2025 Presentation', cat: 'Event Materials', inst: 'Universitas Airlangga', folder: 'aero-2025-unair' },
  { title: 'Airlangga Accommodation Guide', cat: 'Print & Digital', inst: 'Universitas Airlangga', folder: 'accommodation-guidebook-unair' },
  { title: 'Airlangga International Students Guide', cat: 'Social Media Kits', inst: 'Universitas Airlangga', folder: 'international-students-guidebook-unair' },
]

// ── Component ──────────────────────────────────────────────────
export default function StudioLanding() {
  useEffect(() => {
    // Sticky nav background after hero
    const nav = document.getElementById('cm-nav')
    const onScroll = () => {
      if (!nav) return
      nav.classList.toggle('scrolled', window.scrollY > window.innerHeight * 0.6)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

    // Scroll reveals
    const els = Array.from(document.querySelectorAll<HTMLElement>('.cm-studio .reveal'))
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible')
            io.unobserve(e.target)
          }
        })
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    )
    els.forEach((el) => io.observe(el))

    return () => {
      window.removeEventListener('scroll', onScroll)
      io.disconnect()
    }
  }, [])

  return (
    <div className="cm-studio">
      <style>{CSS}</style>

      {/* ── Navigation ─────────────────────────────────────────── */}
      <nav id="cm-nav" className="cm-nav" aria-label="Primary">
        <div className="cm-nav-inner">
          <a href="#top" className="cm-mono-link" aria-label="CroissantsMoon — back to top">CM</a>
          <Link href={PROPOSAL} className="cm-btn cm-btn-ghost cm-nav-cta">
            Request a Proposal
          </Link>
        </div>
      </nav>

      <main id="top">

        {/* ── SECTION 1 · Hero ─────────────────────────────────── */}
        <section className="cm-hero" aria-label="Introduction">
          <svg className="cm-grain" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
            <filter id="cm-grain-filter">
              <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="2" stitchTiles="stitch" />
            </filter>
            <rect width="100%" height="100%" filter="url(#cm-grain-filter)" />
          </svg>
          <div className="cm-hero-glow" aria-hidden="true" />
          <span className="cm-hero-wordmark" aria-hidden="true">CroissantsMoon</span>
          <span className="cm-corner-mono" aria-hidden="true">CM</span>

          <div className="cm-hero-inner">
            <p className="cm-eyebrow reveal">Celestial Studio</p>
            <h1 className="cm-hero-title reveal">
              Digital presence,<br />crafted with intention.
            </h1>
            <p className="cm-hero-sub reveal">
              Web development, dashboard systems, and visual identity for
              organizations that mean something.
            </p>
            <div className="cm-hero-cta reveal">
              <Link href={PROPOSAL} className="cm-btn cm-btn-primary">
                Request a Proposal <ArrowRight size={16} />
              </Link>
              <a href="#work" className="cm-btn cm-btn-ghost">
                View Our Work <ArrowRight size={16} />
              </a>
            </div>
            <p className="cm-hero-trust reveal">Based in Surabaya · Working across Indonesia</p>
          </div>
        </section>

        {/* ── SECTION 2 · Services ─────────────────────────────── */}
        <section className="cm-section" aria-labelledby="services-h">
          <div className="cm-wrap">
            <header className="cm-section-head reveal">
              <p className="cm-label">What We Build</p>
              <h2 id="services-h" className="cm-h2">Three ways we craft your presence.</h2>
            </header>
            <div className="cm-grid-3">
              {SERVICES.map((s) => {
                const Icon = s.icon
                return (
                  <article key={s.n} className="cm-card cm-service reveal">
                    <span className="cm-accent-line" aria-hidden="true" />
                    <Icon className="cm-service-icon" size={26} aria-hidden="true" />
                    <p className="cm-service-num">{s.n}</p>
                    <h3 className="cm-h3">{s.name}</h3>
                    <p className="cm-body">{s.desc}</p>
                    <p className="cm-price-anchor">{s.price}</p>
                  </article>
                )
              })}
            </div>
          </div>
        </section>

        {/* ── SECTION 3 · Featured Projects ────────────────────── */}
        <section id="work" className="cm-section cm-section-alt" aria-labelledby="work-h">
          <div className="cm-wrap">
            <header className="cm-section-head reveal">
              <p className="cm-label">Selected Work</p>
              <h2 id="work-h" className="cm-h2">Featured projects.</h2>
            </header>
            <div className="cm-grid-2">
              {PROJECTS.map((p) => (
                <article key={p.name} className="cm-card cm-project reveal">
                  <p className="cm-eyebrow-sm">{p.cat}</p>
                  <h3 className="cm-h3">{p.name}</h3>
                  <p className="cm-body">{p.desc}</p>
                  <ul className="cm-stack" aria-label="Tech stack">
                    {p.stack.map((t) => <li key={t} className="cm-pill">{t}</li>)}
                  </ul>
                  <div className="cm-project-links">
                    <a href={p.github} target="_blank" rel="noopener noreferrer" className="cm-link-icon">
                      <Github size={14} aria-hidden="true" /> GitHub
                    </a>
                    <a href={p.live} target="_blank" rel="noopener noreferrer" className="cm-link-icon cm-link-accent">
                      <ExternalLink size={14} aria-hidden="true" /> Live Preview
                    </a>
                  </div>
                </article>
              ))}
            </div>
            <div className="cm-center">
              <Link href="/croissantsmoon/websites" className="cm-text-link">
                View All Projects <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </section>

        {/* ── SECTION 4 · Social Proof ─────────────────────────── */}
        <section className="cm-section" aria-labelledby="proof-h">
          <div className="cm-wrap">
            <header className="cm-section-head reveal">
              <p className="cm-label">Trusted Work</p>
              <h2 id="proof-h" className="cm-h2">What clients say.</h2>
            </header>
            <div className="cm-grid-2">
              {TESTIMONIALS.map((t, i) => (
                <figure key={i} className="cm-card cm-quote reveal">
                  <Quote className="cm-quote-mark" size={28} aria-hidden="true" />
                  <blockquote className="cm-quote-text">{t.quote}</blockquote>
                  <figcaption className="cm-quote-who">— {t.who}</figcaption>
                </figure>
              ))}
            </div>
            <div className="cm-statbar reveal">
              {STATS.map((s) => (
                <div key={s.l} className="cm-stat">
                  <span className="cm-stat-v">{s.v}</span>
                  <span className="cm-stat-l">{s.l}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SECTION 5 · How It Works ─────────────────────────── */}
        <section className="cm-section cm-section-alt" aria-labelledby="how-h">
          <div className="cm-wrap">
            <header className="cm-section-head reveal">
              <p className="cm-label">How It Works</p>
              <h2 id="how-h" className="cm-h2">From first audit to long-term care.</h2>
            </header>
            <ol className="cm-steps reveal">
              {PROCESS.map((step) => (
                <li key={step.n} className="cm-step">
                  <span className="cm-step-num">{step.n}</span>
                  <h3 className="cm-step-name">{step.name}</h3>
                  <p className="cm-step-text">{step.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ── SECTION 6 · Pricing ──────────────────────────────── */}
        <section id="pricing" className="cm-section" aria-labelledby="pricing-h">
          <div className="cm-wrap">
            <header className="cm-section-head reveal">
              <p className="cm-label">Pricing</p>
              <h2 id="pricing-h" className="cm-h2">Transparent tiers. No surprises.</h2>
            </header>

            <div className="cm-founding reveal">
              <Zap size={16} aria-hidden="true" />
              <p>
                <strong>Founding Rate</strong> — available to the first 10 clients.
                Lock in 50% off the standard rate for your first project.
              </p>
              <Link href={PROPOSAL} className="cm-text-link cm-founding-cta">
                Check Availability <ArrowRight size={14} />
              </Link>
            </div>

            <div className="cm-pricing-scroll">
              <div className="cm-grid-4">
                {TIERS.map((t) => (
                  <article key={t.name} className={`cm-card cm-tier reveal${t.featured ? ' cm-tier-featured' : ''}`}>
                    {t.featured && <span className="cm-tier-flag">Most common</span>}
                    <h3 className="cm-tier-name">{t.name}</h3>
                    <p className="cm-tier-timeline">{t.timeline}</p>
                    <p className="cm-tier-price">{t.price}</p>
                    <p className="cm-tier-note">{t.note}</p>
                    <ul className="cm-tier-features">
                      {t.features.map((f) => (
                        <li key={f}><Check size={14} aria-hidden="true" /> {f}</li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </div>
            <p className="cm-payment reveal">Payment terms: 50% upfront · 25% mid-delivery · 25% on launch</p>
          </div>
        </section>

        {/* ── SECTION 7 · Demo Experiences ─────────────────────── */}
        <section className="cm-section cm-section-alt" aria-labelledby="demo-h">
          <div className="cm-wrap">
            <header className="cm-section-head reveal">
              <p className="cm-label">Demo Experiences</p>
              <h2 id="demo-h" className="cm-h2">Feel the quality before you commit.</h2>
            </header>
            <div className="cm-demos">
              {DEMOS.map((d) => (
                <article key={d.n} className="cm-card cm-demo reveal">
                  <div className="cm-demo-body">
                    <p className="cm-demo-num">{d.n} · {d.cat}</p>
                    <h3 className="cm-h3">{d.title}</h3>
                    <p className="cm-body">{d.desc}</p>
                    <ul className="cm-stack" aria-label="Highlights">
                      {d.tags.map((t) => <li key={t} className="cm-pill">{t}</li>)}
                    </ul>
                    <div className="cm-demo-cta">
                      {d.demos.map((dm) => (
                        <Link key={dm.href} href={dm.href} className="cm-btn cm-btn-sky">
                          {dm.label} <ArrowUpRight size={14} />
                        </Link>
                      ))}
                      <Link href={PROPOSAL} className="cm-text-link">
                        Discuss This Project <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                  <div className="cm-demo-art" aria-hidden="true">
                    <div className="cm-demo-mock">
                      <span className="cm-demo-dot" />
                      <span className="cm-demo-bar" />
                      <span className="cm-demo-bar cm-demo-bar-2" />
                      <span className="cm-demo-num-art">{d.n}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── SECTION 8 · Visual Identity ──────────────────────── */}
        <section className="cm-section" aria-labelledby="design-h">
          <div className="cm-wrap">
            <header className="cm-section-head reveal">
              <p className="cm-label">Visual Identity</p>
              <h2 id="design-h" className="cm-h2">Design work, beyond the screen.</h2>
            </header>
            <div className="cm-grid-3">
              {DESIGNS.map((g) => (
                <Link key={g.folder} href="/croissantsmoon/designs" className="cm-card cm-design reveal">
                  <span className="cm-design-img">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={`/assets/images/graphic-designs/${g.folder}/1.png`} alt={g.title} loading="lazy" />
                  </span>
                  <span className="cm-design-meta">
                    <span className="cm-eyebrow-sm">{g.cat}</span>
                    <span className="cm-design-title">{g.title}</span>
                    <span className="cm-design-inst">{g.inst}</span>
                  </span>
                </Link>
              ))}
            </div>
            <div className="cm-center">
              <Link href="/croissantsmoon/designs" className="cm-text-link">
                View All Design Work <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </section>

        {/* ── SECTION 9 · Final CTA ────────────────────────────── */}
        <section className="cm-section cm-final" aria-labelledby="final-h">
          <div className="cm-wrap cm-center-block">
            <h2 id="final-h" className="cm-final-title reveal">Let&apos;s build something that lasts.</h2>
            <p className="cm-final-sub reveal">
              Whether you need a website, a dashboard, or a brand identity —
              CroissantsMoon is open for new projects.
            </p>
            <div className="cm-hero-cta cm-center reveal">
              <Link href={PROPOSAL} className="cm-btn cm-btn-primary">
                Request a Proposal <ArrowRight size={16} />
              </Link>
              <a href={EMAIL} className="cm-btn cm-btn-ghost">
                Start a Conversation <Send size={15} />
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* ── SECTION 10 · Footer ────────────────────────────────── */}
      <footer className="cm-footer">
        <div className="cm-wrap cm-footer-inner">
          <div className="cm-footer-row">
            <span className="cm-footer-brand">CM · CroissantsMoon</span>
            <nav className="cm-footer-links" aria-label="Footer">
              <a href={GITHUB} target="_blank" rel="noopener noreferrer">GitHub <ArrowUpRight size={12} /></a>
              <a href={LINKEDIN} target="_blank" rel="noopener noreferrer">LinkedIn <ArrowUpRight size={12} /></a>
              <a href={SITE} target="_blank" rel="noopener noreferrer">zefanyakharisma.com <ArrowUpRight size={12} /></a>
            </nav>
          </div>
          <div className="cm-footer-row cm-footer-fine">
            <span>© 2026 Zefanya Kharisma Nugroho</span>
            <span>Surabaya, Indonesia</span>
          </div>
        </div>
      </footer>
    </div>
  )
}

// ── Scoped styles ──────────────────────────────────────────────
const CSS = `
.cm-studio {
  --navy: #0F172A;
  --royal: #2563EB;
  --sky: #38BDF8;
  --white: #FFFFFF;
  --off: #F8FAFC;
  --muted: #94A3B8;
  --surface: #1E293B;
  --border: rgba(148,163,184,0.12);
  --display: 'Syne', system-ui, sans-serif;
  --body: 'IBM Plex Sans', system-ui, sans-serif;
  --mono: 'IBM Plex Mono', ui-monospace, monospace;
  background: var(--navy);
  color: var(--off);
  font-family: var(--body);
  font-weight: 300;
  line-height: 1.6;
  overflow-x: hidden;
}
.cm-studio *, .cm-studio *::before, .cm-studio *::after { box-sizing: border-box; }
.cm-studio a { color: inherit; text-decoration: none; }

/* Reveal animation (motion-safe only) */
@media (prefers-reduced-motion: no-preference) {
  .cm-studio .reveal { opacity: 0; transform: translateY(24px); transition: opacity .6s cubic-bezier(.16,1,.3,1), transform .6s cubic-bezier(.16,1,.3,1); }
  .cm-studio .reveal.is-visible { opacity: 1; transform: none; }
}

/* Typography */
.cm-label { font-family: var(--display); font-size: 13px; font-weight: 600; letter-spacing: .15em; text-transform: uppercase; color: var(--sky); margin: 0 0 14px; }
.cm-h2 { font-family: var(--display); font-weight: 800; font-size: clamp(28px,4.5vw,46px); line-height: 1.08; color: var(--white); margin: 0; letter-spacing: -.01em; }
.cm-h3 { font-family: var(--display); font-weight: 700; font-size: clamp(19px,2.4vw,23px); line-height: 1.2; color: var(--white); margin: 0 0 12px; }
.cm-body { font-size: 15px; line-height: 1.7; color: var(--muted); margin: 0; }
.cm-eyebrow-sm { font-family: var(--mono); font-size: 11px; letter-spacing: .12em; text-transform: uppercase; color: var(--sky); margin: 0 0 12px; display: block; }

/* Layout */
.cm-wrap { width: 100%; max-width: 1180px; margin: 0 auto; padding: 0 24px; }
.cm-section { padding: clamp(72px,11vh,128px) 0; position: relative; }
.cm-section-alt { background: var(--surface); }
.cm-section-head { max-width: 640px; margin: 0 0 clamp(40px,6vh,64px); }
.cm-center { display: flex; justify-content: center; margin-top: 44px; }

/* Nav */
.cm-nav { position: fixed; top: 0; left: 0; right: 0; z-index: 50; transition: background .3s ease, border-color .3s ease, backdrop-filter .3s ease; border-bottom: 1px solid transparent; }
.cm-nav.scrolled { background: rgba(15,23,42,0.85); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); border-bottom: 1px solid var(--border); }
.cm-nav-inner { max-width: 1180px; margin: 0 auto; padding: 16px 24px; display: flex; align-items: center; justify-content: space-between; }
.cm-mono-link { font-family: var(--display); font-weight: 800; font-size: 18px; letter-spacing: .04em; color: var(--white); }

/* Buttons */
.cm-btn { position: relative; display: inline-flex; align-items: center; gap: 8px; font-family: var(--display); font-size: 14px; font-weight: 600; padding: 13px 24px; border-radius: 999px; border: 1px solid transparent; cursor: pointer; overflow: hidden; transition: color .25s ease, border-color .25s ease, transform .25s ease; z-index: 0; }
.cm-btn svg { position: relative; z-index: 1; }
.cm-btn span, .cm-btn { white-space: nowrap; }
.cm-btn::before { content: ''; position: absolute; inset: 0; transform: scaleX(0); transform-origin: left; transition: transform .35s cubic-bezier(.16,1,.3,1); z-index: -1; }
.cm-btn-primary { background: var(--royal); color: var(--white); }
.cm-btn-primary::before { background: var(--sky); }
.cm-btn-primary:hover { color: var(--navy); }
.cm-btn-primary:hover::before { transform: scaleX(1); }
.cm-btn-ghost { border-color: rgba(56,189,248,0.4); color: var(--off); }
.cm-btn-ghost::before { background: rgba(56,189,248,0.12); }
.cm-btn-ghost:hover { color: var(--white); border-color: var(--sky); }
.cm-btn-ghost:hover::before { transform: scaleX(1); }
.cm-btn-sky { background: rgba(56,189,248,0.1); border-color: rgba(56,189,248,0.35); color: var(--sky); }
.cm-btn-sky:hover { background: rgba(56,189,248,0.2); border-color: var(--sky); }
@media (max-width: 560px) { .cm-nav-cta { padding: 8px 0; border: none; background: none; color: var(--sky); } .cm-nav-cta::before { display: none; } }

.cm-text-link { display: inline-flex; align-items: center; gap: 7px; font-family: var(--display); font-size: 14px; font-weight: 600; color: var(--sky); transition: gap .2s ease, color .2s ease; }
.cm-text-link:hover { gap: 11px; color: var(--white); }

/* Cards */
.cm-card { background: var(--surface); border: 1px solid var(--border); border-radius: 16px; padding: 30px; transition: transform .35s cubic-bezier(.16,1,.3,1), border-color .35s ease; }
.cm-section-alt .cm-card { background: rgba(15,23,42,0.55); }
.cm-card:hover { transform: translateY(-4px); border-color: rgba(56,189,248,0.45); }

/* Hero */
.cm-hero { position: relative; min-height: 100dvh; display: flex; align-items: center; overflow: hidden; padding: 120px 0 80px; background: var(--navy); }
.cm-grain { position: absolute; inset: 0; width: 100%; height: 100%; opacity: 0.04; pointer-events: none; z-index: 0; mix-blend-mode: screen; }
.cm-hero-glow { position: absolute; left: 50%; top: 42%; transform: translate(-50%,-50%); width: min(900px,120vw); height: 520px; background: radial-gradient(ellipse at center, rgba(56,189,248,0.16), transparent 62%); pointer-events: none; z-index: 0; }
.cm-hero-wordmark { position: absolute; right: -4vw; top: 50%; transform: translateY(-50%); font-family: var(--display); font-weight: 800; font-size: clamp(64px,15vw,180px); color: var(--sky); opacity: 0.04; white-space: nowrap; pointer-events: none; user-select: none; z-index: 0; letter-spacing: -.03em; }
.cm-corner-mono { position: absolute; left: 24px; top: 88px; font-family: var(--display); font-weight: 700; font-size: 20px; color: var(--muted); opacity: 0.3; z-index: 1; }
.cm-hero-inner { position: relative; z-index: 2; }
.cm-eyebrow { font-family: var(--display); font-size: 13px; font-weight: 600; letter-spacing: .15em; text-transform: uppercase; color: var(--sky); margin: 0 0 22px; }
.cm-hero-title { font-family: var(--display); font-weight: 800; font-size: clamp(40px,8vw,96px); line-height: 1.05; color: var(--white); margin: 0 0 28px; letter-spacing: -.015em; }
.cm-hero-sub { font-size: 18px; font-weight: 300; line-height: 1.6; color: var(--muted); max-width: 520px; margin: 0 0 36px; }
.cm-hero-cta { display: flex; flex-wrap: wrap; gap: 14px; margin-bottom: 40px; }
.cm-hero-trust { font-family: var(--mono); font-size: 12px; color: var(--muted); margin: 0; letter-spacing: .02em; }

/* Grids */
.cm-grid-3 { display: grid; grid-template-columns: repeat(3,1fr); gap: 22px; }
.cm-grid-2 { display: grid; grid-template-columns: repeat(2,1fr); gap: 22px; }
.cm-grid-4 { display: grid; grid-template-columns: repeat(4,1fr); gap: 18px; }

/* Services */
.cm-service { position: relative; overflow: hidden; }
.cm-accent-line { position: absolute; top: 0; left: 0; right: 0; height: 3px; background: linear-gradient(90deg, var(--sky), transparent 70%); }
.cm-service-icon { color: var(--sky); margin-bottom: 18px; }
.cm-service-num { font-family: var(--mono); font-size: 12px; letter-spacing: .12em; color: var(--muted); margin: 0 0 6px; }
.cm-price-anchor { font-family: var(--mono); font-size: 13px; color: var(--off); margin: 18px 0 0; padding-top: 16px; border-top: 1px solid var(--border); }

/* Projects */
.cm-project .cm-stack { display: flex; flex-wrap: wrap; gap: 7px; list-style: none; padding: 0; margin: 18px 0; }
.cm-pill { font-family: var(--mono); font-size: 11px; color: var(--muted); padding: 4px 11px; border: 1px solid var(--border); border-radius: 999px; }
.cm-project-links { display: flex; gap: 18px; padding-top: 16px; border-top: 1px solid var(--border); }
.cm-link-icon { display: inline-flex; align-items: center; gap: 6px; font-family: var(--display); font-size: 13px; font-weight: 600; color: var(--muted); transition: color .2s ease; }
.cm-link-icon:hover { color: var(--white); }
.cm-link-accent { color: var(--sky); }
.cm-link-accent:hover { color: var(--white); }

/* Testimonials */
.cm-quote { display: flex; flex-direction: column; }
.cm-quote-mark { color: var(--sky); opacity: 0.5; margin-bottom: 16px; }
.cm-quote-text { font-family: var(--display); font-weight: 600; font-size: clamp(18px,2.2vw,22px); line-height: 1.4; color: var(--off); margin: 0 0 20px; }
.cm-quote-who { font-family: var(--mono); font-size: 12px; color: var(--muted); margin-top: auto; }
.cm-statbar { display: grid; grid-template-columns: repeat(4,1fr); gap: 1px; background: var(--border); border: 1px solid var(--border); border-radius: 16px; overflow: hidden; margin-top: 22px; }
.cm-stat { background: var(--surface); padding: 28px 20px; text-align: center; }
.cm-section-alt .cm-stat { background: rgba(15,23,42,0.6); }
.cm-stat-v { display: block; font-family: var(--display); font-weight: 800; font-size: clamp(26px,3.5vw,38px); color: var(--sky); line-height: 1; }
.cm-stat-l { display: block; font-family: var(--mono); font-size: 11px; letter-spacing: .1em; text-transform: uppercase; color: var(--muted); margin-top: 10px; }

/* Steps */
.cm-steps { display: grid; grid-template-columns: repeat(5,1fr); gap: 0; list-style: none; padding: 0; margin: 0; position: relative; }
.cm-step { position: relative; padding: 0 18px; }
.cm-step:not(:last-child)::after { content: ''; position: absolute; top: 14px; left: 50%; right: -50%; border-top: 1px dashed rgba(148,163,184,0.3); z-index: 0; }
.cm-step-num { position: relative; z-index: 1; display: inline-flex; align-items: center; justify-content: center; width: 30px; height: 30px; font-family: var(--mono); font-size: 12px; color: var(--sky); background: var(--navy); border: 1px solid rgba(56,189,248,0.4); border-radius: 999px; margin-bottom: 16px; }
.cm-section-alt .cm-step-num { background: var(--surface); }
.cm-step-name { font-family: var(--display); font-weight: 700; font-size: 18px; color: var(--white); margin: 0 0 8px; }
.cm-step-text { font-size: 14px; line-height: 1.6; color: var(--muted); margin: 0; }

/* Pricing */
.cm-founding { display: flex; align-items: center; gap: 14px; flex-wrap: wrap; background: linear-gradient(90deg, rgba(37,99,235,0.14), rgba(56,189,248,0.08)); border: 1px solid rgba(56,189,248,0.3); border-radius: 14px; padding: 18px 24px; margin-bottom: 32px; }
.cm-founding svg { color: var(--sky); flex-shrink: 0; }
.cm-founding p { margin: 0; font-size: 14px; color: var(--off); flex: 1; min-width: 220px; }
.cm-founding strong { font-family: var(--display); font-weight: 700; color: var(--white); }
.cm-founding-cta { white-space: nowrap; }
.cm-pricing-scroll { overflow-x: auto; -webkit-overflow-scrolling: touch; padding-bottom: 4px; }
.cm-tier { display: flex; flex-direction: column; position: relative; padding: 28px 24px; }
.cm-tier-featured { border-top: 3px solid var(--sky); }
.cm-tier-flag { position: absolute; top: -11px; left: 24px; font-family: var(--mono); font-size: 10px; letter-spacing: .1em; text-transform: uppercase; color: var(--navy); background: var(--sky); padding: 3px 10px; border-radius: 999px; }
.cm-tier-name { font-family: var(--display); font-weight: 700; font-size: 18px; color: var(--white); margin: 0 0 4px; }
.cm-tier-timeline { font-family: var(--mono); font-size: 12px; color: var(--muted); margin: 0 0 18px; }
.cm-tier-price { font-family: var(--display); font-weight: 800; font-size: 28px; color: var(--sky); margin: 0; }
.cm-tier-note { font-family: var(--mono); font-size: 11px; color: var(--muted); margin: 6px 0 20px; }
.cm-tier-features { list-style: none; padding: 18px 0 0; margin: 0; border-top: 1px solid var(--border); display: flex; flex-direction: column; gap: 11px; }
.cm-tier-features li { display: flex; align-items: flex-start; gap: 9px; font-size: 13px; line-height: 1.5; color: var(--off); }
.cm-tier-features svg { color: var(--sky); flex-shrink: 0; margin-top: 3px; }
.cm-payment { text-align: center; font-family: var(--mono); font-size: 13px; color: var(--muted); margin: 32px 0 0; }

/* Demos */
.cm-demos { display: flex; flex-direction: column; gap: 22px; }
.cm-demo { display: grid; grid-template-columns: 1.4fr 1fr; gap: 0; padding: 0; overflow: hidden; }
.cm-demo-body { padding: clamp(28px,4vw,44px); }
.cm-demo-num { font-family: var(--mono); font-size: 12px; letter-spacing: .1em; text-transform: uppercase; color: var(--sky); margin: 0 0 14px; }
.cm-demo .cm-stack { display: flex; flex-wrap: wrap; gap: 7px; list-style: none; padding: 0; margin: 18px 0 26px; }
.cm-demo-cta { display: flex; flex-wrap: wrap; align-items: center; gap: 12px; }
.cm-demo-art { position: relative; background: linear-gradient(150deg, #0B1220, var(--navy)); border-left: 1px solid var(--border); display: flex; align-items: center; justify-content: center; min-height: 200px; overflow: hidden; }
.cm-demo-mock { position: relative; width: 78%; height: 62%; background: rgba(56,189,248,0.05); border: 1px solid rgba(56,189,248,0.18); border-radius: 12px; box-shadow: 0 20px 60px rgba(0,0,0,0.4); }
.cm-demo-dot { position: absolute; top: 12px; left: 12px; width: 8px; height: 8px; border-radius: 50%; background: var(--sky); opacity: .6; }
.cm-demo-bar { position: absolute; left: 12px; right: 40%; top: 34px; height: 8px; border-radius: 4px; background: rgba(148,163,184,0.18); }
.cm-demo-bar-2 { top: 52px; right: 55%; background: rgba(56,189,248,0.2); }
.cm-demo-num-art { position: absolute; right: 16px; bottom: 10px; font-family: var(--display); font-weight: 800; font-size: 56px; color: var(--sky); opacity: 0.12; }

/* Designs */
.cm-design { padding: 0; overflow: hidden; display: flex; flex-direction: column; }
.cm-design-img { display: block; height: 200px; overflow: hidden; }
.cm-design-img img { width: 100%; height: 100%; object-fit: cover; object-position: top; transition: transform .45s ease; }
.cm-design:hover .cm-design-img img { transform: scale(1.05); }
.cm-design-meta { display: block; padding: 22px 24px 26px; }
.cm-design-title { display: block; font-family: var(--display); font-weight: 700; font-size: 17px; color: var(--white); line-height: 1.3; margin-bottom: 6px; }
.cm-design-inst { display: block; font-size: 13px; color: var(--muted); }

/* Final CTA */
.cm-final { background: var(--navy); text-align: center; }
.cm-center-block { display: flex; flex-direction: column; align-items: center; max-width: 720px; }
.cm-final-title { font-family: var(--display); font-weight: 800; font-size: clamp(32px,6vw,64px); line-height: 1.05; color: var(--white); margin: 0 0 22px; letter-spacing: -.02em; }
.cm-final-sub { font-size: 17px; font-weight: 300; line-height: 1.7; color: var(--muted); max-width: 480px; margin: 0 0 38px; }

/* Footer */
.cm-footer { border-top: 1px solid var(--border); padding: 44px 0; background: var(--navy); }
.cm-footer-inner { display: flex; flex-direction: column; gap: 18px; }
.cm-footer-row { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 14px; }
.cm-footer-brand { font-family: var(--display); font-weight: 700; font-size: 15px; color: var(--white); }
.cm-footer-links { display: flex; gap: 22px; flex-wrap: wrap; }
.cm-footer-links a { display: inline-flex; align-items: center; gap: 4px; font-size: 13px; color: var(--muted); transition: color .2s ease; }
.cm-footer-links a:hover { color: var(--sky); }
.cm-footer-fine { font-family: var(--mono); font-size: 12px; color: var(--muted); }

/* Responsive */
@media (max-width: 900px) {
  .cm-grid-3 { grid-template-columns: 1fr; }
  .cm-grid-2 { grid-template-columns: 1fr; }
  .cm-grid-4 { grid-template-columns: repeat(4, minmax(220px, 1fr)); }
  .cm-statbar { grid-template-columns: repeat(2,1fr); }
  .cm-steps { grid-template-columns: 1fr; gap: 24px; }
  .cm-step { padding: 0; }
  .cm-step:not(:last-child)::after { display: none; }
  .cm-demo { grid-template-columns: 1fr; }
  .cm-demo-art { display: none; }
}
@media (max-width: 560px) {
  .cm-section { padding: 64px 0; }
  .cm-statbar { grid-template-columns: 1fr 1fr; }
}
`
