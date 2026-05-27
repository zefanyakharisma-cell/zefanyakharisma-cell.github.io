import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, Globe2, Users, Database, Smartphone, Code2, LayoutDashboard } from 'lucide-react'

export const metadata: Metadata = {
  title: 'PCU Global — Zefanya Kharisma Nugroho',
  description: 'PCU Global International Office Website — full-stack web platform for Petra Christian University\'s international office.',
}

const features = [
  { icon: Globe2, title: 'News & Events CMS', desc: 'Role-based content management system for publishing international news, events, and program announcements — supporting multiple editor roles.', color: '#003087' },
  { icon: Database, title: 'Partnership Directory', desc: 'Searchable directory of 30+ institutional partners with filtering by country, program type, and agreement status.', color: '#1E3A5F' },
  { icon: Users, title: 'Program Portals', desc: 'Dedicated pages for each inbound and outbound program with application information, eligibility criteria, and contact forms.', color: '#4A6B8A' },
  { icon: Smartphone, title: 'Mobile-First Design', desc: 'Fully responsive across all devices — optimized for the mobile-first behavior of international students and prospective partners.', color: '#064E3B' },
  { icon: LayoutDashboard, title: 'Meeting Request System', desc: 'Embedded form for institutional partners to request meetings — automatically routed to the appropriate coordinator.', color: '#8B7355' },
  { icon: Code2, title: 'Supabase Backend', desc: 'Real-time data layer using Supabase for content storage, user authentication, and API endpoints.', color: '#D4B15A' },
]

const techStack = [
  { label: 'Framework', value: 'Next.js 15 (App Router)' },
  { label: 'Language', value: 'TypeScript' },
  { label: 'Styling', value: 'Tailwind CSS + custom design system' },
  { label: 'Backend', value: 'Supabase (PostgreSQL + Auth)' },
  { label: 'Deployment', value: 'Vercel' },
  { label: 'Design Tool', value: 'Figma' },
]

export default function PcuGlobalPage() {
  return (
    <div style={{ background: '#F2F2F7', minHeight: '100vh' }}>
      {/* Hero */}
      <div style={{ background: 'linear-gradient(135deg,#001A5E 0%,#003087 55%,#1E5BA8 100%)', position: 'relative', overflow: 'hidden' }}>
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 70% 30%, rgba(255,255,255,0.04) 0%, transparent 60%)' }} />
        <div className="relative z-10 max-w-4xl mx-auto px-6" style={{ paddingTop: 64, paddingBottom: 56 }}>
          <Link href="/projects-overview" className="inline-flex items-center gap-2 mb-8 px-3.5 py-1.5 rounded-full text-sm font-medium" style={{ background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(12px)', color: 'rgba(255,255,255,0.85)', textDecoration: 'none', border: '1px solid rgba(255,255,255,0.16)' }}>
            <ArrowLeft style={{ width: 14, height: 14 }} /> All Projects
          </Link>
          <div style={{ fontSize: '.65rem', fontWeight: 700, letterSpacing: '.16em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', marginBottom: 12 }}>Web Platform · Petra Christian University</div>
          <h1 className="font-heading font-bold text-white" style={{ fontSize: 'clamp(1.9rem,5vw,3.2rem)', letterSpacing: '-.025em', lineHeight: 1.1, marginBottom: 16 }}>PCU Global International Office</h1>
          <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.7, maxWidth: 560, marginBottom: 28 }}>
            Rebuilding PCU&apos;s International Office digital presence — a full-stack web application with news CMS, partnership directory, event calendar, and mobile-first design serving inbound students, outbound seekers, and institutional partners.
          </p>
          <div className="flex flex-wrap gap-2">
            {['Full-Stack Development', 'UI/UX Design', 'Digital Strategy', 'CMS Integration', 'Supabase'].map(t => (
              <span key={t} style={{ fontSize: '.72rem', fontWeight: 600, padding: '5px 14px', borderRadius: 999, background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.14)', color: 'rgba(255,255,255,0.78)' }}>{t}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Context */}
        <div className="card p-8 mb-8" style={{ borderLeft: '4px solid #003087' }}>
          <h2 className="font-heading font-bold text-xl mb-4" style={{ color: '#1C1C1E' }}>Project Context</h2>
          <p className="text-sm leading-relaxed mb-4" style={{ color: '#5C5C5C' }}>
            When I joined Petra Christian University&apos;s International Office, the digital infrastructure was fragmented — program information lived in PDFs, partnership data in spreadsheets, and incoming inquiries routed through a generic contact email. The existing website couldn&apos;t serve the institution&apos;s growing international ambitions.
          </p>
          <p className="text-sm leading-relaxed" style={{ color: '#5C5C5C' }}>
            I designed and built a comprehensive web platform from scratch — acting as both the product designer (information architecture, UI/UX, brand system) and the developer (Next.js, Supabase, Vercel deployment). The goal: a single digital home that serves every audience the international office works with.
          </p>
        </div>

        {/* Features */}
        <h2 className="font-heading font-bold text-xl mb-6" style={{ color: '#1C1C1E' }}>Key Features</h2>
        <div className="grid md:grid-cols-2 gap-4 mb-16">
          {features.map(f => (
            <div key={f.title} className="card p-6" style={{ borderLeft: `3px solid ${f.color}` }}>
              <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4" style={{ background: `${f.color}14` }}>
                <f.icon style={{ width: 20, height: 20, color: f.color }} />
              </div>
              <h3 className="font-heading font-semibold text-sm mb-2" style={{ color: '#1C1C1E' }}>{f.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: '#5C5C5C' }}>{f.desc}</p>
            </div>
          ))}
        </div>

        {/* Tech Stack */}
        <div className="card p-8 mb-16">
          <h2 className="font-heading font-bold text-xl mb-6" style={{ color: '#1C1C1E' }}>Technology Stack</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {techStack.map(t => (
              <div key={t.label} className="p-4 rounded-xl" style={{ background: '#F2ECE4' }}>
                <div style={{ fontSize: '.65rem', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: '#8B7355', marginBottom: 4 }}>{t.label}</div>
                <div className="font-heading font-semibold text-sm" style={{ color: '#1C1C1E' }}>{t.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* My Role */}
        <div className="card p-8 mb-16" style={{ background: 'rgba(0,48,135,0.03)', borderLeft: '4px solid #003087' }}>
          <h2 className="font-heading font-bold text-xl mb-4" style={{ color: '#1C1C1E' }}>My Role</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { title: 'Product Design', items: ['User research and persona mapping', 'Information architecture design', 'Figma wireframes and hi-fi prototypes', 'Design system and component library', 'Accessibility and responsive design'] },
              { title: 'Development', items: ['Next.js 15 App Router architecture', 'Supabase schema design and RLS policies', 'CMS admin interface (role-based access)', 'Public-facing UI and page routes', 'Vercel deployment and environment config'] },
            ].map(col => (
              <div key={col.title}>
                <h3 className="font-heading font-semibold text-sm mb-3" style={{ color: '#003087' }}>{col.title}</h3>
                <ul className="space-y-1.5">
                  {col.items.map(item => (
                    <li key={item} className="flex items-center gap-2 text-sm" style={{ color: '#5C5C5C' }}>
                      <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#003087', flexShrink: 0, display: 'inline-block' }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Related Digital Projects */}
        <div className="flex items-center gap-4 mb-6">
          <span className="label-small">Related Digital Projects</span>
          <div style={{ flex: 1, height: 1, background: 'rgba(28,28,30,0.08)' }} />
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            { href: '/croissantsmoon/web-dashboard-partnership', title: 'Partnership Dashboard', sub: 'PCU · Dashboard', desc: '2,289+ partnership agreements — data visualization, 8-stage workflow, and analytics.' },
            { href: '/croissantsmoon/web-dashboard-grants', title: 'Grants Dashboard', sub: 'PCU · Dashboard', desc: 'International grant tracking from application through to outcome with deadline calendar.' },
          ].map(card => (
            <Link key={card.href} href={card.href} className="card p-6 block" style={{ textDecoration: 'none' }}>
              <div className="flex items-center justify-between mb-2">
                <div>
                  <span className="font-heading font-bold" style={{ color: '#1C1C1E' }}>{card.title}</span>
                  <span style={{ fontSize: '.72rem', color: '#767676', marginLeft: 8 }}>{card.sub}</span>
                </div>
                <ArrowRight style={{ width: 16, height: 16, color: '#003087' }} />
              </div>
              <p className="text-sm" style={{ color: '#5C5C5C', lineHeight: 1.6 }}>{card.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
