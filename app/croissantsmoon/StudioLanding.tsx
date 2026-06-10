'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  ArrowRight, ArrowUpRight, Monitor, BarChart3, Palette,
  Github, ExternalLink, Send, Zap, Check, Quote,
  Sparkles, Globe, Code, PenTool, Rocket, Layers, Lock, type LucideIcon,
} from 'lucide-react'
import StarField from '@/components/cm/StarField'
import ConstellationSVG from '@/components/cm/ConstellationSVG'
import type { CMIconName, CMLandingContent } from '@/types'

// ── Icon registry (resolves stored icon-name strings) ──────────
const CM_ICONS: Record<CMIconName, LucideIcon> = {
  Monitor, BarChart3, Palette, Zap, Sparkles, Globe, Code, PenTool, Rocket, Layers,
}

// ── Celestial moon mark ────────────────────────────────────────
function Moon({ size = 160, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 180 180" fill="none" className={className} aria-hidden="true">
      <path d="M130 90C130 114.85 109.85 135 85 135C60.15 135 40 114.85 40 90C40 65.15 60.15 45 85 45C78.8 54.2 76 65 76 76.5C76 100.65 91.8 121.2 113.6 128.1C124 119.1 130 105.2 130 90Z" fill="#D4B15A" opacity="0.85" />
    </svg>
  )
}

// ── Decorative star/constellation layer ────────────────────────
function Deco({ stars = 40, seed = 1, constellation = true }: { stars?: number; seed?: number; constellation?: boolean }) {
  return (
    <div className="cm-deco" aria-hidden="true">
      <StarField count={stars} />
      {constellation && <ConstellationSVG w={1200} h={700} seed={seed} />}
    </div>
  )
}

// ── Component ──────────────────────────────────────────────────
export default function StudioLanding({ content }: { content: CMLandingContent }) {
  const { meta, hero, services, projects, proof, process, pricing, demos, designs, finalCta, footer } = content
  const PROPOSAL = meta.proposalHref

  useEffect(() => {
    const nav = document.getElementById('cm-nav')
    const onScroll = () => {
      if (!nav) return
      nav.classList.toggle('scrolled', window.scrollY > window.innerHeight * 0.6)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

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
          <a href="#top" className="cm-brand-link" aria-label="CroissantsMoon — back to top">
            <Image src={meta.logoSrc} alt="" width={36} height={36} className="cm-brand-logo" priority />
            <span className="cm-mono-link">{footer.brand}</span>
          </a>
          <Link href={hero.primaryCta.href} className="cm-btn cm-btn-ghost cm-nav-cta">
            {hero.primaryCta.label}
          </Link>
        </div>
      </nav>

      <main id="top">

        {/* ── SECTION 1 · Hero ─────────────────────────────────── */}
        <section className="cm-hero" aria-label="Introduction">
          <Deco stars={90} seed={3} />
          <div className="cm-glow cm-glow-aurora" aria-hidden="true" />
          <div className="cm-glow cm-glow-gold" aria-hidden="true" />
          <Moon size={170} className="cm-hero-moon" />
          <span className="cm-hero-wordmark" aria-hidden="true">{hero.wordmark}</span>
          <span className="cm-corner-mono" aria-hidden="true">CM</span>

          <div className="cm-hero-inner">
            <p className="cm-eyebrow reveal">{hero.eyebrow}</p>
            <h1 className="cm-hero-title reveal">
              {hero.titleLine1}<br />{hero.titleLine2}
            </h1>
            <p className="cm-hero-sub reveal">
              {hero.subtitle}
            </p>
            <div className="cm-hero-cta reveal">
              <Link href={hero.primaryCta.href} className="cm-btn cm-btn-primary">
                {hero.primaryCta.label} <ArrowRight size={16} />
              </Link>
              <a href={hero.ghostCta.href} className="cm-btn cm-btn-ghost">
                {hero.ghostCta.label} <ArrowRight size={16} />
              </a>
            </div>
            <p className="cm-hero-trust reveal">{hero.trust}</p>
          </div>

          <div className="cm-scroll-cue" aria-hidden="true">
            <span>Explore</span>
            <span className="cm-scroll-line" />
          </div>
        </section>

        {/* ── SECTION 2 · Services ─────────────────────────────── */}
        <section className="cm-section" aria-labelledby="services-h">
          <div className="cm-wrap">
            <header className="cm-section-head reveal">
              <p className="cm-label">{services.label}</p>
              <h2 id="services-h" className="cm-h2">{services.heading}</h2>
            </header>
            <div className="cm-grid-3">
              {services.items.map((s) => {
                const Icon = CM_ICONS[s.icon] ?? Monitor
                return (
                  <article key={s.id} className="cm-card cm-service reveal">
                    <span className="cm-accent-line" aria-hidden="true" />
                    <Icon className="cm-service-icon" size={26} aria-hidden="true" />
                    <p className="cm-service-num">{s.num}</p>
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
          <Deco stars={36} seed={7} />
          <div className="cm-wrap">
            <header className="cm-section-head reveal">
              <p className="cm-label">{projects.label}</p>
              <h2 id="work-h" className="cm-h2">{projects.heading}</h2>
            </header>
            <div className="cm-grid-2">
              {projects.items.map((p) => (
                <article key={p.id} className="cm-card cm-project reveal">
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
              <Link href={projects.viewAll.href} className="cm-text-link">
                {projects.viewAll.label} <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </section>

        {/* ── SECTION 4 · Social Proof ─────────────────────────── */}
        <section className="cm-section" aria-labelledby="proof-h">
          <div className="cm-wrap">
            <header className="cm-section-head reveal">
              <p className="cm-label">{proof.label}</p>
              <h2 id="proof-h" className="cm-h2">{proof.heading}</h2>
            </header>
            <div className="cm-grid-2">
              {proof.items.map((t) => (
                <figure key={t.id} className="cm-card cm-quote reveal">
                  <Quote className="cm-quote-mark" size={28} aria-hidden="true" />
                  <blockquote className="cm-quote-text">{t.quote}</blockquote>
                  <figcaption className="cm-quote-who">— {t.who}</figcaption>
                </figure>
              ))}
            </div>
            <div className="cm-statbar reveal">
              {proof.stats.map((s) => (
                <div key={s.id} className="cm-stat">
                  <span className="cm-stat-v">{s.value}</span>
                  <span className="cm-stat-l">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SECTION 5 · How It Works ─────────────────────────── */}
        <section className="cm-section cm-section-alt" aria-labelledby="how-h">
          <Deco stars={26} seed={2} constellation={false} />
          <div className="cm-wrap">
            <header className="cm-section-head reveal">
              <p className="cm-label">{process.label}</p>
              <h2 id="how-h" className="cm-h2">{process.heading}</h2>
            </header>
            <ol className="cm-steps reveal">
              {process.items.map((step) => (
                <li key={step.id} className="cm-step">
                  <span className="cm-step-num">{step.num}</span>
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
              <p className="cm-label">{pricing.label}</p>
              <h2 id="pricing-h" className="cm-h2">{pricing.heading}</h2>
            </header>

            <div className="cm-founding reveal">
              <Zap size={16} aria-hidden="true" />
              <p>
                <strong>Founding Rate</strong> — {pricing.foundingNote}
              </p>
              <Link href={pricing.foundingCta.href} className="cm-text-link cm-founding-cta">
                {pricing.foundingCta.label} <ArrowRight size={14} />
              </Link>
            </div>

            <div className="cm-pricing-scroll">
              <div className="cm-grid-4">
                {pricing.items.map((t) => (
                  <article key={t.id} className={`cm-card cm-tier reveal${t.featured ? ' cm-tier-featured' : ''}`}>
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
            <p className="cm-payment reveal">{pricing.paymentTerms}</p>
          </div>
        </section>

        {/* ── SECTION 7 · Demo Experiences ─────────────────────── */}
        <section className="cm-section cm-section-alt" aria-labelledby="demo-h">
          <Deco stars={45} seed={9} />
          <div className="cm-wrap">
            <header className="cm-section-head reveal">
              <p className="cm-label">{demos.label}</p>
              <h2 id="demo-h" className="cm-h2">{demos.heading}</h2>
            </header>
            <div className="cm-demos">
              {demos.items.map((d) => (
                <article key={d.id} className="cm-card cm-demo reveal">
                  <div className="cm-demo-body">
                    <p className="cm-demo-num">{d.num} · {d.cat}</p>
                    <h3 className="cm-h3">{d.title}</h3>
                    <p className="cm-body">{d.desc}</p>
                    <ul className="cm-stack" aria-label="Highlights">
                      {d.tags.map((t) => <li key={t} className="cm-pill">{t}</li>)}
                    </ul>
                    <div className="cm-demo-cta">
                      {d.links.map((dm) => (
                        <Link key={dm.href} href={dm.href} className="cm-btn cm-btn-aurora">
                          {dm.label} <ArrowUpRight size={14} />
                        </Link>
                      ))}
                      <Link href={PROPOSAL} className="cm-text-link">
                        {demos.discussLabel} <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                  <div className="cm-demo-art" aria-hidden="true">
                    <div className="cm-demo-mock">
                      <span className="cm-demo-dot" />
                      <span className="cm-demo-bar" />
                      <span className="cm-demo-bar cm-demo-bar-2" />
                      <span className="cm-demo-num-art">{d.num}</span>
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
              <p className="cm-label">{designs.label}</p>
              <h2 id="design-h" className="cm-h2">{designs.heading}</h2>
            </header>
            <div className="cm-grid-3">
              {designs.items.map((g) => (
                <Link key={g.id} href={g.href} className="cm-card cm-design reveal">
                  <span className="cm-design-img">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={`${designs.imageBase}/${g.folder}/1.png`} alt={g.title} loading="lazy" />
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
              <Link href={designs.viewAll.href} className="cm-text-link">
                {designs.viewAll.label} <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </section>

        {/* ── SECTION 9 · Final CTA ────────────────────────────── */}
        <section className="cm-section cm-final" aria-labelledby="final-h">
          <Deco stars={55} seed={5} />
          <div className="cm-glow cm-glow-gold cm-glow-final" aria-hidden="true" />
          <Moon size={420} className="cm-final-moon" />
          <div className="cm-wrap cm-center-block">
            <p className="cm-label reveal">{finalCta.label}</p>
            <h2 id="final-h" className="cm-final-title reveal">{finalCta.heading}</h2>
            <p className="cm-final-sub reveal">
              {finalCta.subtitle}
            </p>
            <div className="cm-hero-cta cm-center reveal">
              <Link href={finalCta.primaryCta.href} className="cm-btn cm-btn-primary">
                {finalCta.primaryCta.label} <ArrowRight size={16} />
              </Link>
              <a href={meta.email} className="cm-btn cm-btn-ghost">
                {finalCta.ghostLabel} <Send size={15} />
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* ── SECTION 10 · Footer ────────────────────────────────── */}
      <footer className="cm-footer">
        <div className="cm-wrap cm-footer-inner">
          <div className="cm-footer-row">
            <span className="cm-footer-brand">
              <Image src={meta.logoSrc} alt="" width={28} height={28} className="cm-brand-logo" />
              {footer.brand}
            </span>
            <nav className="cm-footer-links" aria-label="Footer">
              {footer.links.map((l) => (
                <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer">{l.label} <ArrowUpRight size={12} /></a>
              ))}
            </nav>
          </div>
          <div className="cm-footer-row cm-footer-fine">
            <span>{footer.copyright}</span>
            <span className="cm-footer-fine-right">
              {footer.location}
              <Link href="/croissantsmoon/login" className="cm-footer-admin">
                <Lock size={11} aria-hidden="true" /> Admin Login
              </Link>
            </span>
          </div>
        </div>
      </footer>
    </div>
  )
}

// ── Scoped styles ──────────────────────────────────────────────
const CSS = `
.cm-studio {
  --void: #030712;
  --midnight: #071126;
  --deepspace: #0B1E3A;
  --moonlight: #D9E6FF;
  --stardust: #8FA8D6;
  --gold: #D4B15A;
  --gold-dim: #8a6d2e;
  --aurora: #6FA8FF;
  --white: #F4F8FF;
  --border: rgba(111,168,255,0.14);
  --display: 'Cormorant Garamond', Georgia, serif;
  --body: 'Inter', system-ui, sans-serif;
  background: var(--void);
  color: var(--stardust);
  font-family: var(--body);
  font-weight: 300;
  line-height: 1.6;
  overflow-x: hidden;
}
.cm-studio *, .cm-studio *::before, .cm-studio *::after { box-sizing: border-box; }
.cm-studio a { color: inherit; text-decoration: none; }

/* Decoration layer */
.cm-deco { position: absolute; inset: 0; overflow: hidden; pointer-events: none; z-index: 0; }
.cm-glow { position: absolute; border-radius: 50%; pointer-events: none; z-index: 0; }
.cm-glow-aurora { left: -160px; top: -80px; width: 700px; height: 700px; background: radial-gradient(circle, rgba(111,168,255,0.10) 0%, transparent 65%); }
.cm-glow-gold { right: -120px; bottom: -120px; width: 540px; height: 540px; background: radial-gradient(circle, rgba(212,177,90,0.09) 0%, transparent 65%); }

/* Reveal animation (motion-safe only) */
@media (prefers-reduced-motion: no-preference) {
  .cm-studio .reveal { opacity: 0; transform: translateY(24px); transition: opacity .7s cubic-bezier(.16,1,.3,1), transform .7s cubic-bezier(.16,1,.3,1); }
  .cm-studio .reveal.is-visible { opacity: 1; transform: none; }
}

/* Typography */
.cm-label { font-family: var(--body); font-size: 12px; font-weight: 600; letter-spacing: .22em; text-transform: uppercase; color: var(--gold); margin: 0 0 16px; }
.cm-h2 { font-family: var(--display); font-style: italic; font-weight: 500; font-size: clamp(32px,5vw,52px); line-height: 1.05; color: var(--moonlight); margin: 0; letter-spacing: .005em; }
.cm-h3 { font-family: var(--display); font-style: italic; font-weight: 500; font-size: clamp(21px,2.6vw,27px); line-height: 1.2; color: var(--moonlight); margin: 0 0 12px; }
.cm-body { font-size: 15px; line-height: 1.75; color: var(--stardust); margin: 0; }
.cm-eyebrow-sm { font-family: var(--body); font-size: 11px; font-weight: 600; letter-spacing: .14em; text-transform: uppercase; color: var(--gold); margin: 0 0 12px; display: block; }

/* Layout */
.cm-wrap { width: 100%; max-width: 1180px; margin: 0 auto; padding: 0 24px; position: relative; z-index: 1; }
.cm-section { padding: clamp(76px,12vh,132px) 0; position: relative; overflow: hidden; }
.cm-section { background: linear-gradient(180deg, var(--void) 0%, var(--midnight) 100%); }
.cm-section-alt { background: linear-gradient(180deg, var(--midnight) 0%, var(--deepspace) 100%); }
.cm-section-head { max-width: 660px; margin: 0 0 clamp(44px,6vh,66px); }
.cm-center { display: flex; justify-content: center; margin-top: 48px; }

/* Nav */
.cm-nav { position: fixed; top: 0; left: 0; right: 0; z-index: 50; transition: background .3s ease, border-color .3s ease, backdrop-filter .3s ease; border-bottom: 1px solid transparent; }
.cm-nav.scrolled { background: rgba(7,17,38,0.82); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); border-bottom: 1px solid var(--border); }
.cm-nav-inner { max-width: 1180px; margin: 0 auto; padding: 16px 24px; display: flex; align-items: center; justify-content: space-between; }
.cm-mono-link { font-family: var(--display); font-style: italic; font-weight: 600; font-size: 22px; letter-spacing: .02em; color: var(--moonlight); }
.cm-brand-link { display: inline-flex; align-items: center; gap: 11px; }
.cm-brand-logo { border-radius: 999px; box-shadow: 0 0 18px rgba(212,177,90,0.28); flex-shrink: 0; }

/* Buttons */
.cm-btn { position: relative; display: inline-flex; align-items: center; gap: 8px; font-family: var(--body); font-size: 14px; font-weight: 600; padding: 13px 26px; border-radius: 999px; border: 1px solid transparent; cursor: pointer; white-space: nowrap; transition: color .25s ease, border-color .25s ease, transform .25s ease, box-shadow .25s ease, background .25s ease; }
.cm-btn-primary { background: var(--gold); color: var(--midnight); box-shadow: 0 0 22px rgba(212,177,90,0.28); }
.cm-btn-primary:hover { transform: translateY(-2px); box-shadow: 0 0 30px rgba(212,177,90,0.45); }
.cm-btn-ghost { border-color: rgba(212,177,90,0.38); color: var(--gold); background: rgba(212,177,90,0.06); }
.cm-btn-ghost:hover { border-color: var(--gold); background: rgba(212,177,90,0.12); box-shadow: 0 0 22px rgba(212,177,90,0.18); }
.cm-btn-aurora { background: rgba(111,168,255,0.1); border-color: rgba(111,168,255,0.35); color: var(--aurora); }
.cm-btn-aurora:hover { background: rgba(111,168,255,0.18); border-color: var(--aurora); }
@media (max-width: 560px) { .cm-nav-cta { padding: 8px 0; border: none; background: none; color: var(--gold); } }

.cm-text-link { display: inline-flex; align-items: center; gap: 7px; font-family: var(--body); font-size: 14px; font-weight: 600; color: var(--gold); transition: gap .2s ease, color .2s ease; }
.cm-text-link:hover { gap: 11px; color: var(--moonlight); }

/* Cards */
.cm-card { background: rgba(11,30,58,0.46); backdrop-filter: blur(8px); border: 1px solid var(--border); border-radius: 18px; padding: 30px; transition: transform .4s cubic-bezier(.16,1,.3,1), border-color .4s ease, box-shadow .4s ease; box-shadow: 0 4px 28px rgba(3,7,18,0.4); }
.cm-card:hover { transform: translateY(-4px); border-color: rgba(212,177,90,0.4); box-shadow: 0 10px 40px rgba(3,7,18,0.5); }

/* Hero */
.cm-hero { position: relative; min-height: 100dvh; display: flex; align-items: center; overflow: hidden; padding: 132px 0 96px; background: radial-gradient(ellipse 90% 60% at 50% 8%, var(--deepspace) 0%, var(--midnight) 45%, var(--void) 100%); }
.cm-hero-moon { position: absolute; right: 6vw; top: 14%; z-index: 0; filter: drop-shadow(0 0 36px rgba(212,177,90,0.4)); animation: cmFloat 6s ease-in-out infinite; opacity: .9; }
.cm-hero-wordmark { position: absolute; right: -3vw; top: 52%; transform: translateY(-50%); font-family: var(--display); font-style: italic; font-weight: 500; font-size: clamp(72px,16vw,200px); color: var(--gold); opacity: 0.05; white-space: nowrap; pointer-events: none; user-select: none; z-index: 0; }
.cm-corner-mono { position: absolute; left: 24px; top: 92px; font-family: var(--display); font-style: italic; font-size: 22px; color: var(--stardust); opacity: 0.3; z-index: 1; }
.cm-hero-inner { position: relative; z-index: 2; max-width: 1180px; margin: 0 auto; padding: 0 24px; width: 100%; }
.cm-eyebrow { font-family: var(--body); font-size: 12px; font-weight: 600; letter-spacing: .2em; text-transform: uppercase; color: var(--gold); margin: 0 0 26px; }
.cm-hero-title { font-family: var(--display); font-style: italic; font-weight: 500; font-size: clamp(44px,8.5vw,104px); line-height: 1.02; color: var(--moonlight); margin: 0 0 30px; text-shadow: 0 0 70px rgba(111,168,255,0.22); }
.cm-hero-sub { font-size: 18px; font-weight: 300; line-height: 1.65; color: var(--stardust); max-width: 520px; margin: 0 0 38px; }
.cm-hero-cta { display: flex; flex-wrap: wrap; gap: 14px; margin-bottom: 42px; }
.cm-hero-trust { font-family: var(--body); font-size: 12px; letter-spacing: .08em; color: var(--stardust); opacity: 0.7; margin: 0; }
.cm-scroll-cue { position: absolute; bottom: 38px; left: 50%; transform: translateX(-50%); display: flex; flex-direction: column; align-items: center; gap: 8px; z-index: 1; }
.cm-scroll-cue span:first-child { font-family: var(--body); font-size: 10px; letter-spacing: .25em; text-transform: uppercase; color: var(--stardust); opacity: 0.5; }
.cm-scroll-line { width: 1px; height: 44px; background: linear-gradient(to bottom, var(--aurora), transparent); opacity: 0.6; animation: cmScrollLine 2.2s ease-in-out infinite; }

/* Grids */
.cm-grid-3 { display: grid; grid-template-columns: repeat(3,1fr); gap: 22px; }
.cm-grid-2 { display: grid; grid-template-columns: repeat(2,1fr); gap: 22px; }
.cm-grid-4 { display: grid; grid-template-columns: repeat(4,1fr); gap: 18px; }

/* Services */
.cm-service { position: relative; overflow: hidden; }
.cm-accent-line { position: absolute; top: 0; left: 0; right: 0; height: 3px; background: linear-gradient(90deg, var(--gold), transparent 70%); }
.cm-service-icon { color: var(--gold); margin-bottom: 18px; }
.cm-service-num { font-family: var(--body); font-size: 12px; letter-spacing: .14em; color: var(--stardust); opacity: 0.55; margin: 0 0 6px; }
.cm-price-anchor { font-family: var(--body); font-size: 13px; font-weight: 500; color: var(--gold); margin: 18px 0 0; padding-top: 16px; border-top: 1px solid var(--border); }

/* Projects */
.cm-project .cm-stack { display: flex; flex-wrap: wrap; gap: 7px; list-style: none; padding: 0; margin: 18px 0; }
.cm-pill { font-family: var(--body); font-size: 11px; color: var(--stardust); padding: 4px 12px; border: 1px solid rgba(212,177,90,0.2); background: rgba(212,177,90,0.06); border-radius: 999px; }
.cm-project-links { display: flex; gap: 18px; padding-top: 16px; border-top: 1px solid var(--border); }
.cm-link-icon { display: inline-flex; align-items: center; gap: 6px; font-family: var(--body); font-size: 13px; font-weight: 600; color: var(--stardust); transition: color .2s ease; }
.cm-link-icon:hover { color: var(--moonlight); }
.cm-link-accent { color: var(--gold); }
.cm-link-accent:hover { color: var(--moonlight); }

/* Testimonials */
.cm-quote { display: flex; flex-direction: column; }
.cm-quote-mark { color: var(--gold); opacity: 0.5; margin-bottom: 16px; }
.cm-quote-text { font-family: var(--display); font-style: italic; font-weight: 500; font-size: clamp(19px,2.3vw,24px); line-height: 1.4; color: var(--moonlight); margin: 0 0 20px; }
.cm-quote-who { font-family: var(--body); font-size: 12px; letter-spacing: .04em; color: var(--stardust); opacity: 0.75; margin-top: auto; }
.cm-statbar { display: grid; grid-template-columns: repeat(4,1fr); gap: 1px; background: var(--border); border: 1px solid var(--border); border-radius: 16px; overflow: hidden; margin-top: 22px; }
.cm-stat { background: rgba(11,30,58,0.6); padding: 30px 20px; text-align: center; }
.cm-stat-v { display: block; font-family: var(--display); font-style: italic; font-weight: 600; font-size: clamp(30px,3.8vw,42px); color: var(--gold); line-height: 1; }
.cm-stat-l { display: block; font-family: var(--body); font-size: 11px; letter-spacing: .1em; text-transform: uppercase; color: var(--stardust); opacity: 0.65; margin-top: 12px; }

/* Steps */
.cm-steps { display: grid; grid-template-columns: repeat(5,1fr); gap: 0; list-style: none; padding: 0; margin: 0; position: relative; }
.cm-step { position: relative; padding: 0 18px; }
.cm-step:not(:last-child)::after { content: ''; position: absolute; top: 16px; left: 50%; right: -50%; border-top: 1px dashed rgba(111,168,255,0.3); z-index: 0; }
.cm-step-num { position: relative; z-index: 1; display: inline-flex; align-items: center; justify-content: center; width: 34px; height: 34px; font-family: var(--display); font-style: italic; font-size: 15px; color: var(--gold); background: var(--midnight); border: 1px solid rgba(212,177,90,0.4); border-radius: 999px; margin-bottom: 18px; }
.cm-step-name { font-family: var(--display); font-style: italic; font-weight: 500; font-size: 20px; color: var(--moonlight); margin: 0 0 8px; }
.cm-step-text { font-size: 14px; line-height: 1.65; color: var(--stardust); margin: 0; }

/* Pricing */
.cm-founding { display: flex; align-items: center; gap: 14px; flex-wrap: wrap; background: linear-gradient(90deg, rgba(212,177,90,0.14), rgba(111,168,255,0.06)); border: 1px solid rgba(212,177,90,0.3); border-radius: 16px; padding: 18px 26px; margin-bottom: 34px; }
.cm-founding svg { color: var(--gold); flex-shrink: 0; }
.cm-founding p { margin: 0; font-size: 14px; color: var(--moonlight); flex: 1; min-width: 220px; }
.cm-founding strong { font-family: var(--display); font-style: italic; font-weight: 600; color: var(--gold); font-size: 16px; }
.cm-founding-cta { white-space: nowrap; }
.cm-pricing-scroll { overflow-x: auto; -webkit-overflow-scrolling: touch; padding-bottom: 4px; }
.cm-tier { display: flex; flex-direction: column; position: relative; padding: 28px 24px; }
.cm-tier-featured { border-top: 3px solid var(--gold); }
.cm-tier-flag { position: absolute; top: -11px; left: 24px; font-family: var(--body); font-size: 10px; font-weight: 600; letter-spacing: .1em; text-transform: uppercase; color: var(--midnight); background: var(--gold); padding: 3px 11px; border-radius: 999px; }
.cm-tier-name { font-family: var(--display); font-style: italic; font-weight: 500; font-size: 20px; color: var(--moonlight); margin: 0 0 4px; }
.cm-tier-timeline { font-family: var(--body); font-size: 12px; letter-spacing: .04em; color: var(--stardust); opacity: 0.7; margin: 0 0 18px; }
.cm-tier-price { font-family: var(--display); font-style: italic; font-weight: 600; font-size: 32px; color: var(--gold); margin: 0; }
.cm-tier-note { font-family: var(--body); font-size: 11px; color: var(--stardust); opacity: 0.7; margin: 6px 0 20px; }
.cm-tier-features { list-style: none; padding: 18px 0 0; margin: 0; border-top: 1px solid var(--border); display: flex; flex-direction: column; gap: 11px; }
.cm-tier-features li { display: flex; align-items: flex-start; gap: 9px; font-size: 13px; line-height: 1.5; color: var(--moonlight); opacity: 0.92; }
.cm-tier-features svg { color: var(--gold); flex-shrink: 0; margin-top: 3px; }
.cm-payment { text-align: center; font-family: var(--body); font-size: 13px; letter-spacing: .04em; color: var(--stardust); opacity: 0.8; margin: 34px 0 0; }

/* Demos */
.cm-demos { display: flex; flex-direction: column; gap: 22px; }
.cm-demo { display: grid; grid-template-columns: 1.4fr 1fr; gap: 0; padding: 0; overflow: hidden; }
.cm-demo-body { padding: clamp(28px,4vw,46px); }
.cm-demo-num { font-family: var(--body); font-size: 12px; font-weight: 600; letter-spacing: .12em; text-transform: uppercase; color: var(--gold); margin: 0 0 14px; }
.cm-demo .cm-stack { display: flex; flex-wrap: wrap; gap: 7px; list-style: none; padding: 0; margin: 18px 0 26px; }
.cm-demo-cta { display: flex; flex-wrap: wrap; align-items: center; gap: 12px; }
.cm-demo-art { position: relative; background: linear-gradient(150deg, var(--deepspace), var(--void)); border-left: 1px solid var(--border); display: flex; align-items: center; justify-content: center; min-height: 220px; overflow: hidden; }
.cm-demo-mock { position: relative; width: 78%; height: 64%; background: rgba(111,168,255,0.05); border: 1px solid rgba(111,168,255,0.18); border-radius: 12px; box-shadow: 0 20px 60px rgba(0,0,0,0.45); }
.cm-demo-dot { position: absolute; top: 12px; left: 12px; width: 8px; height: 8px; border-radius: 50%; background: var(--gold); opacity: .6; }
.cm-demo-bar { position: absolute; left: 12px; right: 40%; top: 34px; height: 8px; border-radius: 4px; background: rgba(143,168,214,0.2); }
.cm-demo-bar-2 { top: 52px; right: 55%; background: rgba(111,168,255,0.24); }
.cm-demo-num-art { position: absolute; right: 16px; bottom: 6px; font-family: var(--display); font-style: italic; font-weight: 500; font-size: 60px; color: var(--gold); opacity: 0.14; }

/* Designs */
.cm-design { padding: 0; overflow: hidden; display: flex; flex-direction: column; }
.cm-design-img { display: block; height: 200px; overflow: hidden; }
.cm-design-img img { width: 100%; height: 100%; object-fit: cover; object-position: top; transition: transform .5s ease; }
.cm-design:hover .cm-design-img img { transform: scale(1.06); }
.cm-design-meta { display: block; padding: 22px 24px 26px; }
.cm-design-title { display: block; font-family: var(--display); font-style: italic; font-weight: 500; font-size: 19px; color: var(--moonlight); line-height: 1.3; margin-bottom: 6px; }
.cm-design-inst { display: block; font-size: 13px; color: var(--stardust); opacity: 0.75; }

/* Final CTA */
.cm-final { background: radial-gradient(ellipse 80% 60% at 50% 50%, var(--deepspace) 0%, var(--midnight) 45%, var(--void) 100%); text-align: center; }
.cm-final-moon { position: absolute; right: -7%; top: 50%; transform: translateY(-50%); z-index: 0; opacity: 0.12; filter: blur(1px) drop-shadow(0 0 60px rgba(212,177,90,0.3)); }
.cm-glow-final { left: 50%; top: 50%; transform: translate(-50%,-50%); width: 640px; height: 360px; border-radius: 50%; }
.cm-center-block { display: flex; flex-direction: column; align-items: center; max-width: 740px; }
.cm-final-title { font-family: var(--display); font-style: italic; font-weight: 500; font-size: clamp(36px,7vw,72px); line-height: 1.02; color: var(--moonlight); margin: 0 0 24px; text-shadow: 0 0 60px rgba(111,168,255,0.2); }
.cm-final-sub { font-size: 17px; font-weight: 300; line-height: 1.7; color: var(--stardust); max-width: 480px; margin: 0 0 40px; }

/* Footer */
.cm-footer { border-top: 1px solid var(--border); padding: 46px 0; background: var(--void); }
.cm-footer-inner { display: flex; flex-direction: column; gap: 18px; }
.cm-footer-row { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 14px; }
.cm-footer-brand { display: inline-flex; align-items: center; gap: 10px; font-family: var(--display); font-style: italic; font-weight: 500; font-size: 17px; color: var(--moonlight); }
.cm-footer-links { display: flex; gap: 22px; flex-wrap: wrap; }
.cm-footer-links a { display: inline-flex; align-items: center; gap: 4px; font-size: 13px; color: var(--stardust); transition: color .2s ease; }
.cm-footer-links a:hover { color: var(--gold); }
.cm-footer-fine { font-family: var(--body); font-size: 12px; color: var(--stardust); opacity: 0.6; }
.cm-footer-fine-right { display: inline-flex; align-items: center; gap: 18px; flex-wrap: wrap; }
.cm-footer-admin { display: inline-flex; align-items: center; gap: 5px; color: var(--stardust); opacity: 0.7; transition: color .2s ease, opacity .2s ease; }
.cm-footer-admin:hover { color: var(--gold); opacity: 1; }

/* Keyframes */
@keyframes cmFloat { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-14px); } }
@keyframes cmScrollLine { 0%,100% { transform: scaleY(0.6); opacity: .3; } 50% { transform: scaleY(1); opacity: .7; } }
@media (prefers-reduced-motion: reduce) {
  .cm-hero-moon, .cm-scroll-line { animation: none; }
}

/* Responsive */
@media (max-width: 900px) {
  .cm-grid-3 { grid-template-columns: repeat(2,1fr); }
  .cm-grid-2 { grid-template-columns: repeat(2,1fr); }
  .cm-grid-4 { grid-template-columns: repeat(2,1fr); }
  .cm-statbar { grid-template-columns: repeat(2,1fr); }
  .cm-steps { grid-template-columns: 1fr; gap: 26px; }
  .cm-step { padding: 0; }
  .cm-step:not(:last-child)::after { display: none; }
  .cm-demo { grid-template-columns: 1fr; }
  .cm-demo-art { display: none; }
  .cm-hero-moon { right: -6vw; top: 8%; opacity: 0.5; }
  .cm-hero-wordmark { display: none; }
}
@media (max-width: 560px) {
  .cm-section { padding: 68px 0; }
  .cm-grid-3 { grid-template-columns: 1fr; }
  .cm-grid-2 { grid-template-columns: 1fr; }
  .cm-grid-4 { grid-template-columns: 1fr; }
  .cm-statbar { grid-template-columns: 1fr 1fr; }
}
`
