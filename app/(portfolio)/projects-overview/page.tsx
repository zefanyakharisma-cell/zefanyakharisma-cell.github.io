import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import ProjectsHero from '@/components/projects/ProjectsHero'

export const metadata: Metadata = {
  title: 'Projects',
  alternates: { canonical: '/projects-overview' },
  description: 'Portfolio of flagship programs: AMERTA, ACI, AERO, PCU Global.',
}

function LivePreview({ url, displayUrl, height }: { url: string; displayUrl: string; height: number }) {
  const iframeH = Math.round(height / 0.333)
  return (
    <div style={{ position: 'relative', overflow: 'hidden', height, background: '#0a0a14', flexShrink: 0 }}>
      <iframe
        src={url}
        style={{ position: 'absolute', top: 0, left: 0, width: '300%', height: iframeH, transform: 'scale(0.333)', transformOrigin: 'top left', border: 'none', pointerEvents: 'none' }}
        loading="lazy"
        sandbox="allow-scripts allow-same-origin"
        aria-hidden="true"
        title={`${displayUrl} homepage preview`}
      />
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 2, background: 'rgba(0,0,0,0.58)', padding: '9px 14px', display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{ display: 'flex', gap: 5, flexShrink: 0 }}>
          <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#FF5F57', display: 'inline-block' }} />
          <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#FFBD2E', display: 'inline-block' }} />
          <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#28CA41', display: 'inline-block' }} />
        </div>
        <div style={{ flex: 1, background: 'rgba(255,255,255,0.07)', borderRadius: 6, padding: '3px 10px', fontSize: '.6rem', color: 'rgba(255,255,255,0.42)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {displayUrl}
        </div>
      </div>
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right,transparent 72%,rgba(255,255,255,0.04) 100%)', pointerEvents: 'none', zIndex: 1 }} />
    </div>
  )
}

export default function ProjectsOverview() {
  return (
    <>
      <ProjectsHero />

      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* ── Featured Programs ── */}
        <div className="flex items-center gap-4 mb-10">
          <span style={{ fontSize: '.68rem', fontWeight: 700, letterSpacing: '.13em', textTransform: 'uppercase' as const, color: '#8B7355' }}>Featured Programs</span>
          <div style={{ flex: 1, height: 1, background: 'rgba(28,28,30,0.08)' }} />
          <span style={{ fontSize: '.68rem', fontWeight: 600, letterSpacing: '.08em', textTransform: 'uppercase' as const, color: '#C0B8AE' }}>Airlangga Global Engagement</span>
        </div>

        {/* AMERTA */}
        <Link href="/amerta" className="block group mb-5" style={{ background: '#fff', border: '1px solid rgba(28,28,30,0.08)', borderRadius: 20, overflow: 'hidden', textDecoration: 'none', transition: 'all .3s', boxShadow: '0 1px 3px rgba(28,28,30,0.04)' }}>
          <div className="grid md:grid-cols-5" style={{ minHeight: 300 }}>
            <div className="md:col-span-2 relative overflow-hidden" style={{ minHeight: 220 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img loading="lazy" src="/assets/images/student-services/tailor-made/griffith-unair-2.JPEG" alt="AMERTA" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(160deg,rgba(10,30,65,0.78) 0%,rgba(30,80,140,0.52) 100%)' }} />
              <div className="absolute top-5 left-5" style={{ fontFamily: 'serif', fontSize: '4.5rem', fontWeight: 700, color: 'rgba(255,255,255,0.08)', lineHeight: 1, userSelect: 'none' }}>01</div>
              <div className="relative z-10 flex flex-col justify-end h-full px-8 pb-8" style={{ minHeight: 220 }}>
                <div style={{ fontSize: '.65rem', fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', marginBottom: 8 }}>Semester Exchange · Since 2024</div>
                <div className="font-heading font-bold" style={{ fontSize: '2.4rem', color: '#fff', letterSpacing: '-.025em', lineHeight: 1 }}>AMERTA</div>
              </div>
            </div>
            <div className="md:col-span-3 p-9 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <span style={{ fontSize: '.68rem', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', padding: '4px 12px', borderRadius: 999, background: 'rgba(74,107,138,0.1)', color: '#4A6B8A' }}>Student Mobility</span>
                  <span style={{ fontSize: '.68rem', color: '#C0B8AE', letterSpacing: '.04em' }}>Flagship program</span>
                </div>
                <h3 className="font-heading font-bold" style={{ fontSize: '1.45rem', color: '#1C1C1E', letterSpacing: '-.015em', lineHeight: 1.25, marginBottom: 14 }}>Airlangga Mobility, Exchange, Research &amp; Transfer Academic</h3>
                <p style={{ fontSize: '.875rem', color: '#5C5C5C', lineHeight: 1.7, marginBottom: 20 }}>Universitas Airlangga&apos;s flagship semester exchange — I managed end-to-end coordination: promotion, pre-departure preparation, arrival logistics, and post-program completion for 120+ inbound students per cohort with a budget of IDR 50–100M.</p>
                <div className="flex flex-wrap gap-1.5"><span className="tag">Student Mobility</span><span className="tag">Project Management</span><span className="tag">Leadership</span></div>
              </div>
              <div className="flex flex-wrap items-center gap-8 pt-6 mt-6" style={{ borderTop: '1px solid rgba(28,28,30,0.07)' }}>
                {[['120+', 'Students / cohort'], ['IDR 50–100M', 'Budget / program'], ['10+', 'Stakeholders']].map(([n, l]) => (
                  <div key={l}><div className="font-heading font-bold" style={{ fontSize: '1.25rem', color: '#1C1C1E', letterSpacing: '-.015em' }}>{n}</div><div style={{ fontSize: '.7rem', color: '#767676', marginTop: 2 }}>{l}</div></div>
                ))}
                <div className="ml-auto flex items-center gap-2 font-medium text-sm" style={{ color: '#8B7355' }}>View Details <ArrowRight style={{ width: 15, height: 15 }} /></div>
              </div>
            </div>
          </div>
        </Link>

        {/* ACI + AERO */}
        <div className="grid md:grid-cols-2 gap-5 mb-20">
          {[
            { href: '/aci', img: '/assets/images/aci/aci-4.JPEG', num: '02', cat: 'Cultural Immersion', title: 'ACI', badge: 'Student Support', desc: 'Bringing together international and local students through collaborative activities, site visits, and structured engagement throughout the semester.', tags: ['Cross-Cultural', 'Project Management'], stat: '100+', statLabel: 'students / program' },
            { href: '/aero', img: '/assets/images/aero/aero-header-1.JPEG', num: '03', cat: 'Annual Exhibition', title: 'AERO', badge: "Int'l Partnership", desc: 'Annual exhibition at Universitas Airlangga showcasing global partnerships — coordinated logistics, vendor management, and event planning across 50+ stakeholders.', tags: ['Branding', 'Creative Direction'], stat: '50+', statLabel: 'stakeholders coordinated' },
          ].map(card => (
            <Link key={card.href} href={card.href} className="block group" style={{ background: '#fff', border: '1px solid rgba(28,28,30,0.08)', borderRadius: 18, overflow: 'hidden', textDecoration: 'none', transition: 'all .3s', boxShadow: '0 1px 3px rgba(28,28,30,0.04)' }}>
              <div className="relative overflow-hidden" style={{ height: 170 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img loading="lazy" src={card.img} alt={card.title} className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top,rgba(20,20,22,0.9) 0%,rgba(20,20,22,0.25) 65%,transparent 100%)' }} />
                <div className="absolute top-4 left-5" style={{ fontFamily: 'serif', fontSize: '3.2rem', fontWeight: 700, color: 'rgba(255,255,255,0.07)', lineHeight: 1, userSelect: 'none' }}>{card.num}</div>
                <div className="absolute bottom-5 left-6 right-6 flex items-end justify-between">
                  <div>
                    <div style={{ fontSize: '.62rem', fontWeight: 700, letterSpacing: '.13em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', marginBottom: 4 }}>{card.cat}</div>
                    <div className="font-heading font-bold text-3xl" style={{ color: '#fff', letterSpacing: '-.02em' }}>{card.title}</div>
                  </div>
                  <span style={{ fontSize: '.68rem', fontWeight: 700, padding: '3px 10px', borderRadius: 999, background: 'rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.7)', border: '1px solid rgba(255,255,255,0.12)' }}>{card.badge}</span>
                </div>
              </div>
              <div className="p-6">
                <p style={{ fontSize: '.875rem', color: '#5C5C5C', lineHeight: 1.68, marginBottom: 16 }}>{card.desc}</p>
                <div className="flex flex-wrap gap-1.5 mb-5">{card.tags.map(t => <span key={t} className="tag">{t}</span>)}</div>
                <div className="flex items-center justify-between pt-4" style={{ borderTop: '1px solid rgba(28,28,30,0.07)' }}>
                  <div><span className="font-heading font-semibold" style={{ fontSize: '1rem', color: '#1C1C1E' }}>{card.stat}</span><span style={{ fontSize: '.75rem', color: '#767676', marginLeft: 4 }}>{card.statLabel}</span></div>
                  <span className="flex items-center gap-1.5 text-sm font-medium" style={{ color: '#8B7355' }}>View <ArrowRight style={{ width: 14, height: 14 }} /></span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* ── Graphic Design compact horizontal card ── */}
        <Link href="/croissantsmoon/designs" className="block mb-5" style={{ background: '#fff', border: '1px solid rgba(28,28,30,0.08)', borderRadius: 18, overflow: 'hidden', transition: 'all .3s', boxShadow: '0 1px 3px rgba(28,28,30,0.04)', textDecoration: 'none' }}>
          <div className="grid md:grid-cols-5" style={{ minHeight: 160 }}>
            <div className="md:col-span-3 p-7 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-3">
                <span style={{ fontSize: '.68rem', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', padding: '4px 12px', borderRadius: 999, background: 'rgba(139,115,85,0.08)', color: '#8B7355' }}>Editorial Design</span>
                <span style={{ fontSize: '.68rem', color: '#C0B8AE', letterSpacing: '.04em' }}>2024–2025</span>
              </div>
              <h3 className="font-heading font-bold" style={{ fontSize: '1.2rem', color: '#1C1C1E', letterSpacing: '-.015em', lineHeight: 1.25, marginBottom: 8 }}>Guidebooks, Booklets &amp; Event Collateral</h3>
              <p style={{ fontSize: '.84rem', color: '#5C5C5C', lineHeight: 1.6, marginBottom: 14, maxWidth: 480 }}>Print and digital design for institutional programs — student guidebooks, orientation booklets, exhibition collateral, and partnership materials.</p>
              <div className="flex flex-wrap gap-1.5">
                <span className="tag">Print Design</span>
                <span className="tag">Branding</span>
                <span className="tag">Editorial Layout</span>
              </div>
            </div>
            <div className="md:col-span-2 relative overflow-hidden" style={{ minHeight: 160, background: '#1C1C1E' }}>
              <div className="absolute inset-0 grid grid-cols-3" aria-hidden="true" style={{ gap: 2, opacity: 0.84 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/assets/images/graphic-designs/aero-2025-unair/1.png" alt="" loading="lazy" className="w-full h-full object-cover" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/assets/images/graphic-designs/booklet-aci-2025-b2-unair/1.png" alt="" loading="lazy" className="w-full h-full object-cover" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/assets/images/graphic-designs/partnership-booklet-pcu/1.png" alt="" loading="lazy" className="w-full h-full object-cover" />
              </div>
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to right,rgba(255,255,255,0.03) 0%,transparent 40%)' }} />
              <div className="absolute bottom-4 right-5 flex items-center gap-2 font-medium text-sm" style={{ color: 'rgba(255,255,255,0.7)' }}>Browse Design Work <ArrowRight style={{ width: 14, height: 14 }} /></div>
            </div>
          </div>
        </Link>

        {/* ── Web Development ── */}
        <div style={{ height: 1, background: 'rgba(28,28,30,0.07)', margin: '28px 0 48px' }} />

        <div className="flex items-center gap-4 mb-10">
          <span style={{ fontSize: '.68rem', fontWeight: 700, letterSpacing: '.13em', textTransform: 'uppercase' as const, color: '#8B7355' }}>Web Development</span>
          <div style={{ flex: 1, height: 1, background: 'rgba(28,28,30,0.08)' }} />
          <span style={{ fontSize: '.68rem', fontWeight: 600, letterSpacing: '.08em', textTransform: 'uppercase' as const, color: '#C0B8AE' }}>CroissantsMoon Studio</span>
        </div>

        <div className="mb-10">
          <h2 className="font-heading font-bold" style={{ fontSize: 'clamp(1.6rem,3.5vw,2.4rem)', letterSpacing: '-.02em', color: '#1C1C1E', marginBottom: 10 }}>Web Projects</h2>
          <p style={{ fontSize: '.9375rem', color: '#5C5C5C', lineHeight: 1.65, maxWidth: 560 }}>Responsive web applications and dashboards — from personal portfolio SPAs to institutional data tools.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-5 mb-5">
          {/* PCU Global International Office */}
          <Link href="/croissantsmoon/websites" className="block group" style={{ background: '#fff', border: '1px solid rgba(28,28,30,0.08)', borderRadius: 20, overflow: 'hidden', transition: 'all .3s', boxShadow: '0 1px 3px rgba(28,28,30,0.04)', textDecoration: 'none' }}>
            <LivePreview url="https://international-office-website.vercel.app/" displayUrl="international-office-website.vercel.app" height={200} />
            <div className="p-7 flex flex-col justify-between" style={{ minHeight: 180 }}>
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span style={{ fontSize: '.68rem', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', padding: '4px 12px', borderRadius: 999, background: 'rgba(0,48,135,0.08)', color: '#003087' }}>Full-Stack</span>
                  <span style={{ fontSize: '.68rem', color: '#C0B8AE', letterSpacing: '.04em' }}>In Progress</span>
                </div>
                <h3 className="font-heading font-bold" style={{ fontSize: '1.2rem', color: '#1C1C1E', letterSpacing: '-.015em', lineHeight: 1.25, marginBottom: 10 }}>PCU Global — International Office Website</h3>
                <p style={{ fontSize: '.84rem', color: '#5C5C5C', lineHeight: 1.65, marginBottom: 16 }}>Rebuilding PCU&apos;s International Office website — news CMS, partnership directory, audience-first information architecture, and mobile-first design.</p>
                <div className="flex flex-wrap gap-1.5"><span className="tag">HTML / CSS</span><span className="tag">JavaScript</span><span className="tag">Flask</span><span className="tag">SQLite</span></div>
              </div>
              <div className="flex items-center justify-end pt-5 mt-5" style={{ borderTop: '1px solid rgba(28,28,30,0.07)' }}>
                <span className="flex items-center gap-2 text-sm font-medium" style={{ color: '#003087' }}>View Web Case Study <ArrowRight style={{ width: 15, height: 15 }} /></span>
              </div>
            </div>
          </Link>

          {/* Portfolio Site */}
          <Link href="/croissantsmoon/web-portfolio" className="block group" style={{ background: '#fff', border: '1px solid rgba(28,28,30,0.08)', borderRadius: 20, overflow: 'hidden', transition: 'all .3s', boxShadow: '0 1px 3px rgba(28,28,30,0.04)', textDecoration: 'none' }}>
            <LivePreview url="https://website-portfolio-liard-alpha.vercel.app/" displayUrl="website-portfolio-liard-alpha.vercel.app" height={200} />
            <div className="p-7 flex flex-col justify-between" style={{ minHeight: 180 }}>
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span style={{ fontSize: '.68rem', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', padding: '4px 12px', borderRadius: 999, background: 'rgba(201,168,76,0.08)', color: '#8B7355' }}>Full-Stack</span>
                  <span style={{ fontSize: '.68rem', color: '#C0B8AE', letterSpacing: '.04em' }}>Live</span>
                </div>
                <h3 className="font-heading font-bold" style={{ fontSize: '1.2rem', color: '#1C1C1E', letterSpacing: '-.015em', lineHeight: 1.25, marginBottom: 10 }}>This Portfolio Site</h3>
                <p style={{ fontSize: '.84rem', color: '#5C5C5C', lineHeight: 1.65, marginBottom: 16 }}>Dual-identity SPA with hash-based routing, iOS-style navigation shell, Supabase inline editing, and 20+ pages — no framework.</p>
                <div className="flex flex-wrap gap-1.5"><span className="tag">HTML / CSS</span><span className="tag">JavaScript</span><span className="tag">Tailwind CSS</span><span className="tag">Supabase</span></div>
              </div>
              <div className="flex items-center justify-end pt-5 mt-5" style={{ borderTop: '1px solid rgba(28,28,30,0.07)' }}>
                <span className="flex items-center gap-2 text-sm font-medium" style={{ color: '#8B7355' }}>View Details <ArrowRight style={{ width: 15, height: 15 }} /></span>
              </div>
            </div>
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-5 mb-16">
          {/* Dashboard Partnership */}
          <Link href="/croissantsmoon/web-dashboard-partnership" className="block group" style={{ background: '#fff', border: '1px solid rgba(28,28,30,0.08)', borderRadius: 20, overflow: 'hidden', transition: 'all .3s', boxShadow: '0 1px 3px rgba(28,28,30,0.04)', textDecoration: 'none' }}>
            <LivePreview url="https://dashboard-partnership.vercel.app/" displayUrl="dashboard-partnership.vercel.app" height={160} />
            <div className="p-7 flex flex-col justify-between" style={{ minHeight: 160 }}>
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span style={{ fontSize: '.68rem', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', padding: '4px 12px', borderRadius: 999, background: 'rgba(45,107,80,0.08)', color: '#2D6B50' }}>Data Viz</span>
                  <span style={{ fontSize: '.68rem', color: '#C0B8AE', letterSpacing: '.04em' }}>Live · 2025</span>
                </div>
                <h3 className="font-heading font-bold" style={{ fontSize: '1.2rem', color: '#1C1C1E', letterSpacing: '-.015em', lineHeight: 1.25, marginBottom: 10 }}>Dashboard Partnership</h3>
                <p style={{ fontSize: '.84rem', color: '#5C5C5C', lineHeight: 1.65, marginBottom: 16 }}>Interactive dashboard for international partnership networks — geographic breakdown, agreement status tracking, and compound filters across 30+ partners.</p>
                <div className="flex flex-wrap gap-1.5"><span className="tag">JavaScript</span><span className="tag">Chart.js</span><span className="tag">Tailwind CSS</span></div>
              </div>
              <div className="flex items-center justify-end pt-5 mt-5" style={{ borderTop: '1px solid rgba(28,28,30,0.07)' }}>
                <span className="flex items-center gap-2 text-sm font-medium" style={{ color: '#2D6B50' }}>View Details <ArrowRight style={{ width: 15, height: 15 }} /></span>
              </div>
            </div>
          </Link>

          {/* Dashboard International Grants */}
          <Link href="/croissantsmoon/web-dashboard-grants" className="block group" style={{ background: '#fff', border: '1px solid rgba(28,28,30,0.08)', borderRadius: 20, overflow: 'hidden', transition: 'all .3s', boxShadow: '0 1px 3px rgba(28,28,30,0.04)', textDecoration: 'none' }}>
            <LivePreview url="https://dashboard-international-grants.vercel.app/" displayUrl="dashboard-international-grants.vercel.app" height={160} />
            <div className="p-7 flex flex-col justify-between" style={{ minHeight: 160 }}>
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span style={{ fontSize: '.68rem', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', padding: '4px 12px', borderRadius: 999, background: 'rgba(92,58,138,0.08)', color: '#5C3A8A' }}>Data Viz</span>
                  <span style={{ fontSize: '.68rem', color: '#C0B8AE', letterSpacing: '.04em' }}>Live · 2025</span>
                </div>
                <h3 className="font-heading font-bold" style={{ fontSize: '1.2rem', color: '#1C1C1E', letterSpacing: '-.015em', lineHeight: 1.25, marginBottom: 10 }}>Dashboard International Grants</h3>
                <p style={{ fontSize: '.84rem', color: '#5C5C5C', lineHeight: 1.65, marginBottom: 16 }}>Centralised grant tracking from application through to outcome — deadline timeline, stage-based pipeline view, and outcome analytics for leadership reporting.</p>
                <div className="flex flex-wrap gap-1.5"><span className="tag">JavaScript</span><span className="tag">Chart.js</span><span className="tag">Tailwind CSS</span></div>
              </div>
              <div className="flex items-center justify-end pt-5 mt-5" style={{ borderTop: '1px solid rgba(28,28,30,0.07)' }}>
                <span className="flex items-center gap-2 text-sm font-medium" style={{ color: '#5C3A8A' }}>View Details <ArrowRight style={{ width: 15, height: 15 }} /></span>
              </div>
            </div>
          </Link>
        </div>

      </div>
    </>
  )
}
