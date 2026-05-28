import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowLeft, ArrowRight, ExternalLink, Lock, Github,
  Layers, Route, Rss, Smartphone, CalendarCheck, Globe,
  MapPin, Building2, Landmark, HeartPulse, Banknote, Award, Package, Globe2, Flag,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'PCU Global — Zefanya Kharisma Nugroho',
  description: 'PCU Global — rebuilding the front door of international education at Petra Christian University.',
}

const C = {
  cream:     '#FFFBF5',
  blue:      '#003087',
  midBlue:   '#1a56a0',
  lightBlue: '#7BC8F6',
  mint:      '#6EE7B7',
  coral:     '#FF6B6B',
  yellow:    '#F5D05E',
  orange:    '#F4874B',
  lavender:  '#C4B5FD',
  peach:     '#FDBA8C',
}

const PROBLEMS = [
  { sym: '✕', color: C.coral,     tag: 'Identity Crisis',  title: 'No Value Proposition',      desc: 'The homepage has zero introductory text — visitors arrive to a menu of links with no explanation of who the International Office serves or why it matters.' },
  { sym: '∅', color: C.orange,    tag: 'Dead Links',       title: 'Incomplete Development',     desc: 'Multiple navigation links use javascript:void(0) as their href — shipped half-built and never finished. Dead links erode institutional trust immediately.' },
  { sym: '◻', color: C.yellow,    tag: 'Empty CMS',        title: 'Abandoned Content Systems',  desc: '"Recent Posts" and "Category" sections display 0 entries — a blog feature built into the CMS but never populated. The skeleton exists; the content never arrived.' },
  { sym: '≡', color: C.lavender,  tag: 'UX Overload',      title: 'Redundant Navigation',       desc: 'The same menu structure repeats identically multiple times on a single page — cognitive overload without adding hierarchy or value.' },
  { sym: '☐', color: C.lightBlue, tag: 'Not Responsive',   title: 'No Mobile-First Design',     desc: 'No evidence of responsive design patterns. International students on mobile encounter a desktop-only experience — a critical gap in 2025.' },
  { sym: '→', color: C.mint,      tag: 'No CTA',           title: 'Zero Calls to Action',       desc: 'Not a single button, form, or prompt guides visitors toward any next step. A pure directory with no conversion path whatsoever.' },
]

const SOLUTIONS = [
  { Icon: Layers,        color: C.blue,      tag: 'Architecture', title: 'Audience-First Architecture',        desc: 'Dedicated sections for Inbound, Outbound, Partnership, and Life at PCU — each with dynamic color theming so every visitor immediately knows where they are and what to explore.' },
  { Icon: Route,         color: C.lightBlue, tag: 'Navigation',   title: 'Complete Hash-Based Routing',        desc: 'Every page has a real, shareable URL via client-side hash routing — enabling deep-linking, browser back/forward, and bookmarking. No placeholder links, no dead ends.' },
  { Icon: Rss,           color: C.mint,      tag: 'Content',      title: 'Live News Management System',        desc: 'Full admin CMS with article CRUD, trending tracking by visit count, image upload via base64, and role-based access — so the IO team keeps content fresh without touching code.' },
  { Icon: Smartphone,    color: C.peach,     tag: 'Responsive',   title: 'Mobile-Responsive Design',           desc: 'Built mobile-first with a slide-in drawer navigation, responsive grid layouts, and touch-friendly interactions — accessible to prospective students on any device.' },
  { Icon: CalendarCheck, color: C.orange,    tag: 'Conversion',   title: 'Multi-Step Meeting Request Form',    desc: 'Structured multi-step form with automatic email notification to the IO team — turning passive visitors into active contacts and institutional leads.' },
  { Icon: Globe,         color: C.lavender,  tag: 'Partnership',  title: 'Partnership Directory by Continent', desc: "Interactive partnership modal organized by continent and country — replacing link-lists with a visual, explorable map of PCU's full global network." },
]

const TECH = [
  { name: 'HTML5',              tag: 'Markup',     color: C.orange    },
  { name: 'Tailwind CSS v3.4',  tag: 'Styling',    color: C.lightBlue },
  { name: 'Vanilla JavaScript', tag: 'Logic',      color: C.yellow    },
  { name: 'Flask + Python 3',   tag: 'Backend',    color: C.mint      },
  { name: 'SQLite',             tag: 'Database',   color: C.lavender  },
  { name: 'Gunicorn',           tag: 'Server',     color: C.coral     },
  { name: 'Lucide Icons',       tag: 'Icons',      color: C.peach     },
  { name: 'Playfair + DM Sans', tag: 'Typography', color: C.blue      },
]

const MARQUEE_ITEMS = ['✦ Rebuilt from Zero', '◈ Live CMS', '◉ Hash Routing', '⬡ Mobile-First', '◎ Open Source', '✺ Flask + Python', '✦ 6 Core Features']
const MARQUEE_COLORS = [C.lightBlue, '#fff', C.mint, C.yellow, C.lavender]

const IO_REGIONS = [
  { color: C.blue,    label: 'Southeast Asia',      desc: 'Core focus region — coordinating with universities, immigration authorities, and government bodies across Indonesia and ASEAN partner nations.' },
  { color: C.midBlue, label: 'East Asia & Pacific', desc: 'Exchange programs and MoU coordination with partner institutions in Australia, Japan, South Korea, and other Indo-Pacific nations.' },
  { color: '#059669', label: 'Europe & Americas',   desc: "Institutional partnerships facilitated through PCU's global network, spanning European and North American universities." },
]

const IO_STAKEHOLDERS = [
  { Icon: Building2,  label: 'Faculties & Academic Units' },
  { Icon: Landmark,   label: 'Immigration Authorities' },
  { Icon: HeartPulse, label: 'Hospitals & Healthcare' },
  { Icon: Banknote,   label: 'Banking Institutions' },
  { Icon: Award,      label: 'Scholarship Bodies (KNB & TIAS)' },
  { Icon: Package,    label: 'Vendor & Service Networks' },
  { Icon: Globe2,     label: 'Partner Universities' },
  { Icon: Flag,       label: 'Government Bodies' },
]

const doubled = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS]

export default function PcuGlobalPage() {
  return (
    <>
      {/* Page-scoped animations */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes pcuBlobFloat {
          0%,100% { transform:translateY(0) scale(1); }
          50%      { transform:translateY(-14px) scale(1.025); }
        }
        @keyframes pcuMarqueeScroll {
          from { transform:translateX(0); }
          to   { transform:translateX(-50%); }
        }
        @keyframes pcuSpinCW  { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes pcuSpinCCW { from{transform:rotate(0deg)} to{transform:rotate(-360deg)} }
        .pcu-blob  { animation:pcuBlobFloat 8s ease-in-out infinite; }
        .pcu-blob2 { animation:pcuBlobFloat 9s ease-in-out infinite 2s; }
        .pcu-blob3 { animation:pcuBlobFloat 7s ease-in-out infinite 4s; }
        .pcu-blob4 { animation:pcuBlobFloat 10s ease-in-out infinite 1s; }
        .pcu-float  { animation:pcuBlobFloat 6s ease-in-out infinite; }
        .pcu-float2 { animation:pcuBlobFloat 7s ease-in-out infinite 1s; }
        .pcu-float3 { animation:pcuBlobFloat 5s ease-in-out infinite 2.5s; }
        .pcu-spin-cw  { animation:pcuSpinCW  12s linear infinite; }
        .pcu-spin-ccw { animation:pcuSpinCCW 10s linear infinite; }
        .pcu-marquee  { animation:pcuMarqueeScroll 22s linear infinite; display:flex; }
        .pcu-problem-card { transition:transform .22s cubic-bezier(.34,1.56,.64,1),box-shadow .22s; }
        .pcu-problem-card:hover { transform:translateY(-4px); box-shadow:0 16px 40px rgba(0,0,0,0.08); }
        .pcu-tech-card { transition:background .2s; }
        .pcu-tech-card:hover { background:rgba(255,255,255,0.09)!important; }
      `}} />

      <div style={{ background: C.cream, minHeight: '100vh' }}>

        {/* ── Hero ── */}
        <div style={{ position: 'relative', overflow: 'hidden', padding: 'clamp(5rem,12vh,9rem) 24px clamp(4rem,8vh,7rem)', background: C.cream, minHeight: '90vh', display: 'flex', alignItems: 'center' }}>
          {/* Blobs */}
          <div className="pcu-blob"  style={{ position: 'absolute', width: 380, height: 380, left: -80,   top: -60,  background: C.lightBlue, opacity: .45, filter: 'blur(72px)', borderRadius: '50%', pointerEvents: 'none', zIndex: 0 }} />
          <div className="pcu-blob2" style={{ position: 'absolute', width: 260, height: 260, left: '65%', top: -30,  background: C.blue,      opacity: .3,  filter: 'blur(72px)', borderRadius: '50%', pointerEvents: 'none', zIndex: 0 }} />
          <div className="pcu-blob3" style={{ position: 'absolute', width: 210, height: 210, left: '38%', top: '58%', background: C.mint,      opacity: .28, filter: 'blur(72px)', borderRadius: '50%', pointerEvents: 'none', zIndex: 0 }} />
          <div className="pcu-blob4" style={{ position: 'absolute', width: 190, height: 190, left: -30,   top: '52%', background: C.lavender,  opacity: .25, filter: 'blur(72px)', borderRadius: '50%', pointerEvents: 'none', zIndex: 0 }} />
          {/* Floating symbols */}
          <div className="pcu-float"  style={{ position: 'absolute', right: '8%',  top: '22%', fontSize: '3rem',   opacity: .4,  pointerEvents: 'none', zIndex: 1, color: C.blue,     userSelect: 'none' }}>✦</div>
          <div className="pcu-float2" style={{ position: 'absolute', right: '22%', top: '68%', fontSize: '2rem',   opacity: .32, pointerEvents: 'none', zIndex: 1, color: C.mint,     userSelect: 'none' }}>◈</div>
          <div className="pcu-float3" style={{ position: 'absolute', left: '6%',   top: '42%', fontSize: '1.5rem', opacity: .26, pointerEvents: 'none', zIndex: 1, color: C.lavender, userSelect: 'none' }}>◎</div>
          {/* Spinning rings */}
          <div className="pcu-spin-cw"  style={{ position: 'absolute', right: '14%', bottom: '22%', width: 72, height: 72, border: `2px solid ${C.lightBlue}44`, borderRadius: '50%', pointerEvents: 'none', zIndex: 1 }} />
          <div className="pcu-spin-ccw" style={{ position: 'absolute', left: '16%', top: '14%',    width: 44, height: 44, border: `2px dashed ${C.blue}44`,      borderRadius: '50%', pointerEvents: 'none', zIndex: 1 }} />
          {/* Content */}
          <div className="max-w-5xl mx-auto relative w-full" style={{ zIndex: 10 }}>
            <Link href="/projects-overview" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: '3rem', fontSize: '.875rem', color: 'rgba(28,28,30,0.4)', textDecoration: 'none' }}>
              <ArrowLeft style={{ width: 16, height: 16 }} /> Back
            </Link>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: '1.5rem' }}>
              <span style={{ display: 'inline-block', width: 28, height: 3, background: C.blue, borderRadius: 2 }} />
              <span style={{ fontSize: '.68rem', fontWeight: 700, letterSpacing: '.18em', textTransform: 'uppercase' as const, color: C.blue }}>Digital Transformation</span>
            </div>
            <h1 className="font-heading" style={{ fontSize: 'clamp(3.5rem,9vw,8rem)', fontWeight: 700, lineHeight: .95, letterSpacing: '-.04em', color: '#1C1C1E', marginBottom: '1.5rem' }}>
              PCU<span style={{ color: C.blue }}>Global</span>
            </h1>
            <p style={{ fontSize: 'clamp(1.1rem,2.5vw,1.55rem)', fontWeight: 400, color: 'rgba(28,28,30,0.52)', maxWidth: 560, lineHeight: 1.45, marginBottom: '1.25rem' }}>
              Rebuilding the front door of<br />international education.
            </p>
            <p style={{ maxWidth: 490, fontSize: '.95rem', lineHeight: 1.7, color: 'rgba(28,28,30,0.45)', marginBottom: '2.75rem' }}>
              PCU&apos;s International Office needed more than a refresh — it needed a complete rethink. PCU Global is the ground-up redesign that answers every failure of the original site, live and open source.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: 12, alignItems: 'center', marginBottom: '2.5rem' }}>
              <a href="#pcu-preview" style={{ background: '#1C1C1E', color: '#fff', padding: '14px 28px', borderRadius: 999, fontSize: '.875rem', fontWeight: 600, border: 'none', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
                See the Site <ArrowRight style={{ width: 15, height: 15 }} />
              </a>
              <a href="https://zefanyakharisma-cell.github.io/international-office-website/" target="_blank" rel="noopener" style={{ border: '1.5px solid rgba(28,28,30,0.2)', color: '#1C1C1E', background: 'transparent', padding: '14px 28px', borderRadius: 999, fontSize: '.875rem', fontWeight: 600, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                <ExternalLink style={{ width: 14, height: 14 }} /> Open Live Site
              </a>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: 10 }}>
              {[['UI/UX Design', C.lightBlue, '#0369A1'], ['Full-Stack', C.mint, '#065F46'], ['Live CMS', C.yellow, '#854D0E'], ['Mobile-First', C.lavender, '#5B21B6'], ['Open Source', C.peach, '#9A3412']].map(([tag, bg, tc]) => (
                <span key={tag} style={{ background: `${bg}28`, color: tc, padding: '6px 16px', borderRadius: 999, fontSize: '.72rem', fontWeight: 600, letterSpacing: '.04em', border: `1px solid ${bg}50` }}>{tag}</span>
              ))}
            </div>
          </div>
        </div>

        {/* ── Marquee ── */}
        <div style={{ background: '#1C1C1E', padding: '20px 0', overflow: 'hidden' }}>
          <div style={{ display: 'flex', overflow: 'hidden' }}>
            <div className="pcu-marquee" style={{ whiteSpace: 'nowrap' as const }}>
              {doubled.map((text, i) => (
                <span key={i} style={{ display: 'inline-block' }}>
                  <span style={{ display: 'inline-block', padding: '0 32px', fontSize: '1.05rem', fontWeight: 600, color: MARQUEE_COLORS[i % MARQUEE_COLORS.length], whiteSpace: 'nowrap' as const, letterSpacing: '.01em' }}>{text}</span>
                  <span style={{ color: 'rgba(255,255,255,0.18)', fontSize: '1.1rem', padding: '0 4px' }}>·</span>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ── Build Story ── */}
        <div style={{ padding: 'clamp(4rem,10vh,7rem) 24px', background: C.blue, position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', right: -60, top: -60, width: 280, height: 280, borderRadius: '50%', background: 'rgba(255,255,255,0.06)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', left: -30, bottom: -40, width: 180, height: 180, borderRadius: '50%', background: `${C.lightBlue}1A`, pointerEvents: 'none' }} />
          <div className="max-w-5xl mx-auto">
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: '2.5rem' }}>
              <span style={{ display: 'inline-block', width: 28, height: 3, background: 'rgba(255,255,255,0.35)', borderRadius: 2 }} />
              <span style={{ fontSize: '.68rem', fontWeight: 700, letterSpacing: '.18em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.5)' }}>The Build Story</span>
            </div>
            <p className="font-heading" style={{ fontSize: 'clamp(2.5rem,6vw,5rem)', fontWeight: 700, lineHeight: 1.05, letterSpacing: '-.03em', color: '#fff', marginBottom: '2.5rem' }}>
              A dead website.<br /><em style={{ fontStyle: 'italic', color: C.lightBlue }}>Made live.</em>
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: '2rem', alignItems: 'start' }}>
              <div>
                <p style={{ fontSize: '1.1rem', lineHeight: 1.7, color: 'rgba(255,255,255,0.65)', fontWeight: 400 }}>
                  io.petra.ac.id — PCU&apos;s existing International Office website — was the digital front door for one of Surabaya&apos;s leading universities. It had been shipped half-built and left to decay. PCU Global is what happens when you treat that problem seriously.
                </p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 14 }}>
                <div style={{ background: C.yellow, borderRadius: 4, padding: '14px 18px', fontSize: '1rem', color: '#1C1C1E', transform: 'rotate(-2deg)', boxShadow: '2px 4px 12px rgba(0,0,0,0.15)', display: 'inline-block', fontWeight: 500 }}>&quot;zero CTAs? not anymore.&quot; ✦</div>
                <div style={{ background: C.lightBlue, borderRadius: 4, padding: '14px 18px', fontSize: '1rem', color: '#0369A1', transform: 'rotate(1.5deg)', boxShadow: '2px 4px 12px rgba(0,0,0,0.12)', display: 'inline-block', marginTop: 6, alignSelf: 'flex-end' as const, fontWeight: 500 }}>rebuilt the whole thing ◈</div>
                <div style={{ background: '#fff', borderRadius: 4, padding: '14px 18px', fontSize: '1rem', color: '#1C1C1E', transform: 'rotate(-1deg)', boxShadow: '2px 4px 12px rgba(0,0,0,0.1)', display: 'inline-block', fontWeight: 500 }}>live &amp; open source ◉</div>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(200px,1fr))', gap: 14, marginTop: '2.5rem' }}>
              {[['✦', 'Diagnose', 'Before building anything, we mapped every failure of the existing site — six systemic problems, zero assumptions.'], ['◈', 'Design', 'Architecture for three distinct audiences. Clear visual hierarchy. Real calls to action. Mobile-first from the first commit.'], ['◉', 'Deploy', 'Not just a design file — a live, full-stack system. Flask backend, live CMS, hash routing. Shipped and working.']].map(([icon, title, desc]) => (
                <div key={title} style={{ background: 'rgba(255,255,255,0.45)', border: '1px solid rgba(255,255,255,0.6)', borderRadius: 16, padding: 24, backdropFilter: 'blur(4px)' }}>
                  <span style={{ fontSize: '1.4rem', display: 'block', marginBottom: 12 }}>{icon}</span>
                  <h4 className="font-heading" style={{ fontWeight: 700, fontSize: '1.05rem', color: '#1C1C1E', marginBottom: 8 }}>{title}</h4>
                  <p style={{ fontSize: '.83rem', lineHeight: 1.6, color: 'rgba(28,28,30,0.65)' }}>{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── International Context ── */}
        <div style={{ padding: 'clamp(4rem,8vh,6rem) 24px', background: '#FAFAF8' }}>
          <div className="max-w-5xl mx-auto">
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: '1rem' }}>
              <span style={{ display: 'inline-block', width: 28, height: 3, background: C.blue, borderRadius: 2 }} />
              <span style={{ fontSize: '.68rem', fontWeight: 700, letterSpacing: '.18em', textTransform: 'uppercase' as const, color: C.blue }}>The Organization</span>
            </div>
            <h2 className="font-heading" style={{ fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 700, color: '#1C1C1E', marginBottom: '.6rem', letterSpacing: '-.03em' }}>Who the IO Serves</h2>
            <p style={{ fontSize: '.93rem', color: 'rgba(28,28,30,0.48)', marginBottom: '2.5rem', maxWidth: 500, lineHeight: 1.65 }}>The International Office bridges institutions, students, and cultures across Southeast Asia and beyond. This is the scale of what the old site was failing to represent.</p>
            {/* Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(130px,1fr))', gap: 24, padding: 32, background: '#fff', borderRadius: 20, border: '1px solid rgba(28,28,30,0.07)', marginBottom: '2.5rem' }}>
              {[['200+', 'International Students Supported'], ['30+', 'Partner Institutions'], ['25+', 'MoU/MoA Reviews / Month'], ['10+', 'Stakeholder Types']].map(([num, label]) => (
                <div key={label} style={{ textAlign: 'center' as const }}>
                  <p className="font-heading" style={{ fontSize: '2.25rem', fontWeight: 700, color: C.blue, lineHeight: 1 }}>{num}</p>
                  <p style={{ fontSize: '.7rem', fontWeight: 600, letterSpacing: '.08em', textTransform: 'uppercase' as const, color: 'rgba(28,28,30,0.42)', marginTop: 6 }}>{label}</p>
                </div>
              ))}
            </div>
            {/* Regions */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '1rem' }}>
              <span style={{ display: 'inline-block', width: 18, height: 2, background: 'rgba(28,28,30,0.18)', borderRadius: 2 }} />
              <span style={{ fontSize: '.64rem', fontWeight: 700, letterSpacing: '.16em', textTransform: 'uppercase' as const, color: 'rgba(28,28,30,0.35)' }}>Geographic Coverage</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 12, marginBottom: '2.5rem' }}>
              {IO_REGIONS.map(r => (
                <div key={r.label} style={{ background: '#fff', borderRadius: 16, padding: 22, border: '1px solid rgba(28,28,30,0.07)', borderLeft: `4px solid ${r.color}` }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                    <div style={{ width: 38, height: 38, borderRadius: 12, background: `${r.color}12`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <MapPin style={{ width: 18, height: 18, color: r.color }} />
                    </div>
                    <div>
                      <p className="font-heading" style={{ fontWeight: 700, fontSize: '.95rem', color: '#1C1C1E', marginBottom: 6 }}>{r.label}</p>
                      <p style={{ fontSize: '.81rem', lineHeight: 1.65, color: 'rgba(28,28,30,0.52)' }}>{r.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* Stakeholders */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '1rem' }}>
              <span style={{ display: 'inline-block', width: 18, height: 2, background: 'rgba(28,28,30,0.18)', borderRadius: 2 }} />
              <span style={{ fontSize: '.64rem', fontWeight: 700, letterSpacing: '.16em', textTransform: 'uppercase' as const, color: 'rgba(28,28,30,0.35)' }}>Stakeholder Network</span>
            </div>
            <h3 className="font-heading" style={{ fontWeight: 700, fontSize: '1.35rem', color: '#1C1C1E', marginBottom: '.4rem' }}>Multi-Stakeholder Coordination</h3>
            <p style={{ fontSize: '.87rem', lineHeight: 1.65, color: 'rgba(28,28,30,0.48)', maxWidth: 500, marginBottom: '1.5rem' }}>International education requires navigating 10+ distinct institutional players — each with different protocols, priorities, and communication norms.</p>
            <div style={{ background: '#fff', borderRadius: 16, padding: 20, border: '1px solid rgba(28,28,30,0.07)' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(200px,1fr))', gap: 10 }}>
                {IO_STAKEHOLDERS.map(({ Icon, label }) => (
                  <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', borderRadius: 12, background: `${C.blue}07` }}>
                    <Icon style={{ width: 16, height: 16, color: C.blue, flexShrink: 0 }} />
                    <span style={{ fontSize: '.84rem', fontWeight: 500, color: '#1C1C1E' }}>{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Problems ── */}
        <div style={{ padding: 'clamp(4rem,8vh,6rem) 24px', background: C.cream }}>
          <div className="max-w-5xl mx-auto">
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: '1rem' }}>
              <span style={{ display: 'inline-block', width: 28, height: 3, background: C.coral, borderRadius: 2 }} />
              <span style={{ fontSize: '.68rem', fontWeight: 700, letterSpacing: '.18em', textTransform: 'uppercase' as const, color: C.coral }}>Diagnostic Audit</span>
            </div>
            <h2 className="font-heading" style={{ fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 700, color: '#1C1C1E', marginBottom: '.6rem', letterSpacing: '-.03em' }}>Six Things That Were Broken</h2>
            <p style={{ fontSize: '.93rem', color: 'rgba(28,28,30,0.48)', marginBottom: '2.5rem', maxWidth: 480, lineHeight: 1.65 }}>A diagnostic audit of io.petra.ac.id revealed six systemic failures — documented, diagnosed, then fixed one by one.</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: 18 }}>
              {PROBLEMS.map(p => (
                <div key={p.title} className="pcu-problem-card" style={{ background: '#fff', borderRadius: 16, padding: 22, position: 'relative', overflow: 'hidden', border: '1px solid rgba(28,28,30,0.07)' }}>
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: p.color }} />
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: `${p.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.15rem', fontWeight: 700, color: p.color, marginBottom: 14 }}>{p.sym}</div>
                  <div style={{ fontSize: '.6rem', fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase' as const, color: p.color, marginBottom: 8 }}>{p.tag}</div>
                  <h4 className="font-heading" style={{ fontWeight: 700, fontSize: '.98rem', color: '#1C1C1E', marginBottom: 10, lineHeight: 1.3 }}>{p.title}</h4>
                  <p style={{ fontSize: '.8rem', lineHeight: 1.6, color: 'rgba(28,28,30,0.55)' }}>{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Response ── */}
        <div style={{ padding: 'clamp(3rem,6vh,5rem) 24px', background: C.cream }}>
          <div className="max-w-4xl mx-auto" style={{ textAlign: 'center' as const }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, marginBottom: '2rem' }}>
              <span style={{ flex: 1, maxWidth: 80, height: 1, background: 'rgba(28,28,30,0.12)' }} />
              <span style={{ fontSize: '.7rem', fontWeight: 700, letterSpacing: '.15em', textTransform: 'uppercase' as const, color: C.blue }}>Our Response</span>
              <span style={{ flex: 1, maxWidth: 80, height: 1, background: 'rgba(28,28,30,0.12)' }} />
            </div>
            <h2 className="font-heading" style={{ fontWeight: 700, lineHeight: 1.05, letterSpacing: '-.03em', fontSize: 'clamp(1.8rem,4vw,2.8rem)', color: '#1C1C1E', marginBottom: '1rem' }}>So we built this.</h2>
            <p style={{ fontSize: '.95rem', maxWidth: 440, margin: '0 auto 2rem', lineHeight: 1.7, color: 'rgba(28,28,30,0.5)' }}>A ground-up redesign that answers every failure above — live, explorable, and open source.</p>
            <a href="#pcu-preview" style={{ background: C.blue, color: '#fff', padding: '12px 28px', borderRadius: 999, fontSize: '.88rem', fontWeight: 600, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              Explore the Build <ArrowRight style={{ width: 14, height: 14 }} />
            </a>
          </div>
        </div>

        {/* ── Live Preview ── */}
        <div id="pcu-preview" style={{ padding: 'clamp(4rem,8vh,6rem) 24px', background: '#1C1C1E', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: -80, right: -80, width: 360, height: 360, borderRadius: '50%', background: C.lightBlue, opacity: .04, pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: -60, left: -50, width: 300, height: 300, borderRadius: '50%', background: C.lavender, opacity: .05, pointerEvents: 'none' }} />
          <div className="max-w-5xl mx-auto" style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: '1rem' }}>
              <span style={{ display: 'inline-block', width: 28, height: 3, background: C.lightBlue, borderRadius: 2 }} />
              <span style={{ fontSize: '.68rem', fontWeight: 700, letterSpacing: '.18em', textTransform: 'uppercase' as const, color: C.lightBlue }}>Live Preview</span>
            </div>
            <h2 className="font-heading" style={{ fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 700, color: '#fff', marginBottom: '.6rem', letterSpacing: '-.03em' }}>Explore the Site</h2>
            <p style={{ fontSize: '.93rem', color: 'rgba(255,255,255,0.42)', marginBottom: '2.5rem', maxWidth: 420, lineHeight: 1.65 }}>The prototype is live — explore the full interface below or open it in a new tab.</p>
            <div style={{ borderRadius: 20, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)', boxShadow: '0 16px 64px rgba(0,0,0,0.4)' }}>
              {/* Browser chrome */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 20px', background: '#111' }}>
                <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
                  <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#FF5F57', display: 'inline-block' }} />
                  <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#FFBD2E', display: 'inline-block' }} />
                  <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#28CA41', display: 'inline-block' }} />
                </div>
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 14px', borderRadius: 999, background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.4)', fontSize: '.75rem', maxWidth: 400, width: '100%' }}>
                    <Lock style={{ width: 10, height: 10, flexShrink: 0, color: 'rgba(255,255,255,0.3)' }} />
                    <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' as const }}>zefanyakharisma-cell.github.io/international-office-website/</span>
                  </div>
                </div>
                <a href="https://zefanyakharisma-cell.github.io/international-office-website/" target="_blank" rel="noopener" style={{ color: 'rgba(255,255,255,0.35)', flexShrink: 0 }}>
                  <ExternalLink style={{ width: 14, height: 14 }} />
                </a>
              </div>
              <div style={{ position: 'relative', height: 580, background: '#1a1a1a' }}>
                <iframe
                  src="https://zefanyakharisma-cell.github.io/international-office-website/"
                  style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
                  loading="lazy"
                  title="PCU Global — International Office Website Preview"
                  sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
                />
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}>
              <a href="https://zefanyakharisma-cell.github.io/international-office-website/" target="_blank" rel="noopener" style={{ background: C.lightBlue, color: '#0369A1', padding: '12px 28px', borderRadius: 999, fontSize: '.875rem', fontWeight: 700, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                <ExternalLink style={{ width: 14, height: 14 }} /> Open Full Site
              </a>
            </div>
          </div>
        </div>

        {/* ── Solutions ── */}
        <div style={{ padding: 'clamp(4rem,8vh,6rem) 24px', background: `linear-gradient(135deg,#F2ECE4 0%,${C.cream} 100%)` }}>
          <div className="max-w-5xl mx-auto">
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: '1rem' }}>
              <span style={{ display: 'inline-block', width: 28, height: 3, background: C.blue, borderRadius: 2 }} />
              <span style={{ fontSize: '.68rem', fontWeight: 700, letterSpacing: '.18em', textTransform: 'uppercase' as const, color: C.blue }}>The Fix</span>
            </div>
            <h2 className="font-heading" style={{ fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 700, color: '#1C1C1E', marginBottom: '.6rem', letterSpacing: '-.03em' }}>Six Problems. Six Solutions.</h2>
            <p style={{ fontSize: '.93rem', color: 'rgba(28,28,30,0.48)', marginBottom: '2.5rem', maxWidth: 440, lineHeight: 1.65 }}>Every failure in the diagnostic had a direct answer in the build.</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(260px,1fr))', gap: 18 }}>
              {SOLUTIONS.map((s, i) => (
                <div key={s.title} style={{ background: '#fff', borderRadius: 16, padding: '28px 22px', border: '1px solid rgba(28,28,30,0.07)', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: s.color }} />
                  <div style={{ fontSize: '.6rem', fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase' as const, color: 'rgba(28,28,30,0.28)', marginBottom: 7 }}>Fix {String(i + 1).padStart(2, '0')} · {s.tag}</div>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: `${s.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                    <s.Icon style={{ width: 22, height: 22, color: s.color }} />
                  </div>
                  <h4 className="font-heading" style={{ fontWeight: 700, fontSize: '.98rem', color: '#1C1C1E', marginBottom: 10, lineHeight: 1.3 }}>{s.title}</h4>
                  <p style={{ fontSize: '.81rem', lineHeight: 1.6, color: 'rgba(28,28,30,0.52)' }}>{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Tech Stack ── */}
        <div style={{ padding: 'clamp(4rem,8vh,6rem) 24px', background: '#1C1C1E', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: -100, right: -100, width: 420, height: 420, borderRadius: '50%', background: C.lightBlue, opacity: .04, pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: -80, left: -60, width: 340, height: 340, borderRadius: '50%', background: C.lavender, opacity: .04, pointerEvents: 'none' }} />
          <div className="max-w-5xl mx-auto" style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: '1rem' }}>
              <span style={{ display: 'inline-block', width: 28, height: 3, background: C.mint, borderRadius: 2 }} />
              <span style={{ fontSize: '.68rem', fontWeight: 700, letterSpacing: '.18em', textTransform: 'uppercase' as const, color: C.mint }}>Tech Stack</span>
            </div>
            <h2 className="font-heading" style={{ fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 700, color: '#fff', marginBottom: '.6rem', letterSpacing: '-.03em' }}>What Powers It</h2>
            <p style={{ fontSize: '.93rem', color: 'rgba(255,255,255,0.42)', marginBottom: '2.5rem', maxWidth: 420, lineHeight: 1.65 }}>Eight technologies, zero frontend frameworks — a deliberate choice for performance and control.</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(170px,1fr))', gap: 14 }}>
              {TECH.map(t => (
                <div key={t.name} className="pcu-tech-card" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.09)', borderRadius: 14, padding: '20px 18px' }}>
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: t.color, marginBottom: 14 }} />
                  <div style={{ fontSize: '.6rem', fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase' as const, color: t.color, marginBottom: 6 }}>{t.tag}</div>
                  <h4 className="font-heading" style={{ fontWeight: 700, fontSize: '.9rem', color: '#fff', lineHeight: 1.3 }}>{t.name}</h4>
                </div>
              ))}
            </div>
            <div style={{ marginTop: '2.5rem', padding: '26px 28px', background: 'rgba(255,255,255,0.03)', border: '1px dashed rgba(255,255,255,0.12)', borderRadius: 16, display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' as const }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: C.mint, display: 'inline-block', flexShrink: 0 }} />
              <span style={{ fontSize: '.88rem', fontWeight: 600, color: 'rgba(255,255,255,0.55)', flex: 1 }}>No build steps, no bundlers. Just clear code that anyone on the IO team can read and modify.</span>
            </div>
          </div>
        </div>

        {/* ── GitHub CTA ── */}
        <div style={{ padding: 'clamp(4rem,10vh,7rem) 24px', background: C.orange, position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: -60, left: -60, width: 300, height: 300, borderRadius: '50%', background: 'rgba(255,255,255,0.1)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: -40, right: -40, width: 240, height: 240, borderRadius: '50%', background: 'rgba(0,0,0,0.06)', pointerEvents: 'none' }} />
          <div className="max-w-4xl mx-auto" style={{ textAlign: 'center' as const, position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: '2rem' }}>
              <span style={{ display: 'inline-block', width: 28, height: 3, background: 'rgba(255,255,255,0.5)', borderRadius: 2 }} />
              <span style={{ fontSize: '.68rem', fontWeight: 700, letterSpacing: '.18em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.65)' }}>Open Source</span>
              <span style={{ display: 'inline-block', width: 28, height: 3, background: 'rgba(255,255,255,0.5)', borderRadius: 2 }} />
            </div>
            <h2 className="font-heading" style={{ fontSize: 'clamp(2rem,5vw,3.8rem)', fontWeight: 700, color: '#fff', lineHeight: 1.1, letterSpacing: '-.04em', marginBottom: '1.5rem' }}>
              Built to be forked,<br />adapted, and deployed.
            </h2>
            <p style={{ fontSize: '1rem', lineHeight: 1.7, color: 'rgba(255,255,255,0.72)', maxWidth: 440, margin: '0 auto 2.5rem' }}>
              The full source code is on GitHub — for any international office team that wants to start from here instead of from zero.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: 16, justifyContent: 'center' }}>
              <a href="https://github.com/zefanyakharisma-cell/international-office-website" target="_blank" rel="noopener" style={{ background: '#fff', color: C.orange, padding: '14px 32px', borderRadius: 999, fontSize: '.9rem', fontWeight: 700, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 10, boxShadow: '0 4px 20px rgba(0,0,0,0.15)' }}>
                <Github style={{ width: 16, height: 16 }} /> Open Repository
              </a>
              <Link href="/projects-overview" style={{ border: '1.5px solid rgba(255,255,255,0.4)', color: '#fff', background: 'transparent', padding: '14px 28px', borderRadius: 999, fontSize: '.88rem', fontWeight: 600, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                <ArrowLeft style={{ width: 14, height: 14 }} /> Back to Projects
              </Link>
            </div>
          </div>
        </div>

      </div>
    </>
  )
}
