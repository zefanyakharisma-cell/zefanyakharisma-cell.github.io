import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Globe2, LayoutDashboard, Code2, Moon, PenLine, Network, BookOpen, Handshake, FileCheck, Plane, Heart, BarChart2, Languages, MapPin, Mail, Linkedin, Download } from 'lucide-react'
import ExperienceTimeline from '@/components/about/ExperienceTimeline'
import SkillEcosystem from '@/components/about/SkillEcosystem'

export const metadata: Metadata = {
  title: 'About — Zefanya Kharisma Nugroho',
  description: 'Profile overview: 3+ years in international higher education, global mobility, and creative digital work.',
}

const expertiseItems = [
  { icon: Handshake, title: 'Strategic Partnerships', desc: 'Managing 30+ institutional partners & 15+ strategic meetings per month', color: '#1E3A5F' },
  { icon: FileCheck, title: 'MoU / MoA Coordination', desc: 'Reviewing 25+ partnership agreements monthly for compliance & alignment', color: '#1E3A5F' },
  { icon: Plane, title: 'Student Mobility', desc: 'End-to-end management of 5 exchange programs, 120+ students per semester', color: '#4A6B8A' },
  { icon: Heart, title: 'Student Welfare & Support', desc: 'Comprehensive non-academic support for 100+ international students per semester', color: '#4A6B8A' },
  { icon: BarChart2, title: 'Program & Budget Management', desc: 'IDR 50–100M per-program budgets, 50+ stakeholders, end-to-end delivery', color: '#8B7355' },
  { icon: Languages, title: 'Cross-Cultural Communication', desc: 'English–Indonesian interpretation at international conferences & company visits', color: '#4A6B8A' },
  { icon: LayoutDashboard, title: 'UI/UX Design', desc: 'User-centered design for institutional platforms and international program portals', color: '#8B7355' },
  { icon: Code2, title: 'Full-Stack Development', desc: 'Building responsive, purpose-driven websites for institutional communications', color: '#8B7355' },
  { icon: Network, title: 'Systems Thinking', desc: 'Connecting education, digital design, and creative strategy into integrated frameworks', color: '#1C1C1E' },
]

const currentFocusCards = [
  { icon: Globe2, title: 'International Education Leadership', desc: 'Deepening institutional partnership strategies and driving internationalization frameworks at Petra Christian University.', status: 'Active', color: '#1E3A5F' },
  { icon: LayoutDashboard, title: 'Digital Systems & Experience Design', desc: 'Designing and building digital platforms that support international programs, from UI architecture to user journeys.', status: 'In Progress', color: '#8B7355' },
  { icon: Code2, title: 'Web Development', desc: 'Building purpose-driven websites for institutional communications, including the PCU Global International Office platform.', status: 'Active', color: '#4A6B8A' },
  { icon: Moon, title: 'CroissantsMoon', desc: 'Developing a creative boutique studio identity — editorial design, brand systems, and curated digital experiences.', status: 'Developing', color: '#6B4F32' },
  { icon: PenLine, title: 'Writing & Reflection', desc: 'Exploring ideas at the intersection of international education, leadership, and creative practice through essays and notes.', status: 'Ongoing', color: '#4A5235' },
  { icon: Network, title: 'Interdisciplinary Problem Solving', desc: 'Connecting international education, systems thinking, digital design, and creative strategy into integrated solutions.', status: 'Always', color: '#1C1C1E' },
]

const certifications = [
  { label: '2022 · Gold Medal', title: 'World Youth Invention & Innovation Award', desc: 'International recognition for innovation and creative problem-solving.', color: '#8B7355' },
  { label: '2022 · Bronze Medal', title: 'Your-K, Your-ASEAN Short Video Contest', desc: 'Recognition for visual storytelling and creative communication in ASEAN context.', color: '#8B7355' },
  { label: '2023 · Conference', title: '9th ICoCSPA 2023 — Research Presenter', desc: 'Presented research on U.S.–ASEAN economic cooperation at international conference.', color: '#1E3A5F' },
  { label: '2023–2024 · Publications', title: 'Academic Publications in IR', desc: 'Peer-reviewed papers on U.S. foreign policy, Korea–China THAAD, and Abraham Accords.', color: '#4A6B8A' },
  { label: '2024–2025 · Program Leadership', title: '5 Exchange Programs Led', desc: 'End-to-end delivery of AMERTA, ACI, AERO, and government scholarship programs (KNB & TIAS).', color: '#4A6B8A' },
  { label: '2026 · Platform Launch', title: 'PCU Global Digital Platform', desc: "Designed and built PCU International Office's flagship digital presence from ground up.", color: '#1E3A5F' },
]

const interests = [
  { title: 'CroissantsMoon', desc: 'A creative identity in development — where editorial aesthetics, brand philosophy, and digital craft converge into something singular.', editorial: true },
  { title: 'Writing & Reflection', desc: 'Essays and notes on education, systems, and creative practice — approaching complex ideas through careful language.' },
  { title: 'Visual Storytelling', desc: 'Award-winning short video work and graphic design for institutional communications and personal creative projects.' },
  { title: 'International Culture', desc: 'Deep curiosity for cross-cultural dynamics, language, and the nuanced ways global contexts shape educational experience.' },
  { title: 'Design Systems', desc: 'Fascinated by how great design systems create coherence — from institutional brand guidelines to digital component libraries.' },
  { title: 'Interdisciplinary Thinking', desc: 'The most interesting problems live at the edge of disciplines — international education, technology, and creative practice together.' },
]

export default function AboutOverview() {
  return (
    <>
      {/* ── 1. Hero Profile Header ── */}
      <div style={{ background: 'linear-gradient(160deg,#1C1C1E 0%,#1E3A5F 55%,#2C4A72 100%)', padding: '64px 24px 0', position: 'relative', overflow: 'hidden' }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 85% 20%,rgba(139,115,85,0.2),transparent 50%)' }} />
        <div className="absolute -right-24 -top-24 w-96 h-96 rounded-full pointer-events-none" style={{ border: '1px solid rgba(255,255,255,0.05)' }} />
        <div className="absolute right-32 bottom-0 w-56 h-56 rounded-full pointer-events-none" style={{ border: '1px solid rgba(255,255,255,0.05)' }} />
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row gap-10 pb-10">
            <div className="flex-shrink-0 flex flex-col items-center lg:items-start">
              <div style={{ position: 'relative', width: 120, height: 120, marginBottom: 16 }}>
                <div style={{ position: 'absolute', inset: -8, borderRadius: '50%', border: '2px solid rgba(139,115,85,0.35)', animation: 'about-pulse-ring 2.8s ease-out infinite', pointerEvents: 'none' }} />
                <div style={{ position: 'absolute', inset: -3, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.06)', pointerEvents: 'none' }} />
                <div style={{ width: 120, height: 120, borderRadius: '50%', border: '3px solid rgba(255,255,255,0.15)', overflow: 'hidden', boxShadow: '0 8px 32px rgba(0,0,0,0.35),0 0 0 1px rgba(139,115,85,0.2)' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/assets/images/self-portrait/profile-pic-2.png" alt="Zefanya Kharisma Nugroho" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }} />
                </div>
              </div>
              <div className="flex gap-2">
                <a href="mailto:zefanya.kharisma@gmail.com" className="flex items-center justify-center" style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.12)' }}>
                  <Mail style={{ width: 15, height: 15, color: 'rgba(255,255,255,0.7)' }} />
                </a>
                <a href="https://www.linkedin.com/in/zefanyakharisma" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center" style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.12)' }}>
                  <Linkedin style={{ width: 15, height: 15, color: 'rgba(255,255,255,0.7)' }} />
                </a>
              </div>
            </div>
            <div className="flex-1">
              <div className="label-small mb-3" style={{ color: 'rgba(255,255,255,0.35)', letterSpacing: '.12em' }}>International Education Professional</div>
              <h1 className="font-heading font-bold mb-2" style={{ fontSize: 'clamp(2.2rem,5vw,3.8rem)', lineHeight: 1.0, color: '#fff', letterSpacing: '-.02em' }}>
                Zefanya Kharisma<br /><em style={{ fontStyle: 'italic', color: '#8B7355' }}>Nugroho</em>
              </h1>
              <p className="mb-1" style={{ color: 'rgba(255,255,255,0.6)', fontSize: '.95rem', fontStyle: 'italic' }}>International Education Professional &amp; Creative Technologist</p>
              <p className="mb-6 flex items-center gap-2" style={{ color: 'rgba(255,255,255,0.4)', fontSize: '.8rem' }}>
                <MapPin style={{ width: 13, height: 13 }} /> Surabaya, Indonesia
              </p>
              <div className="flex flex-wrap gap-8 mb-8 pt-5" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                {[['3+', 'Years Experience', '#8B7355'], ['200+', 'Students Supported', '#fff'], ['30+', 'Global Partners', '#fff'], ['5', 'Programs Led', '#fff']].map(([n, l, c]) => (
                  <div key={l}>
                    <p className="font-heading font-bold" style={{ fontSize: '2.2rem', lineHeight: 1, letterSpacing: '-.04em', color: c as string }}>{n}</p>
                    <p className="label-small mt-1.5" style={{ color: 'rgba(255,255,255,0.35)' }}>{l}</p>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-2">
                {['International Partnership', 'Student Mobility', 'Project Management', 'Full-Stack Development'].map(tag => (
                  <span key={tag} style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.65)', padding: '5px 14px', borderRadius: 999, fontSize: '.72rem', border: '1px solid rgba(255,255,255,0.1)', fontWeight: 500 }}>{tag}</span>
                ))}
                <span style={{ background: 'rgba(139,115,85,0.2)', color: '#C4A875', padding: '5px 14px', borderRadius: 999, fontSize: '.72rem', border: '1px solid rgba(139,115,85,0.25)', fontWeight: 500 }}>Creative Direction</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── 2. Professional Summary ── */}
      <div style={{ padding: '72px 24px', background: '#FAFAF8' }}>
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-10"><span className="accent-line" /><span className="label-small">Professional Summary</span></div>
          <div className="grid lg:grid-cols-5 gap-12 items-start">
            <div className="lg:col-span-3">
              <blockquote className="font-heading leading-snug mb-8" style={{ color: '#1C1C1E', fontSize: 'clamp(1.6rem,3vw,2.4rem)', letterSpacing: '-.02em' }}>
                &ldquo;Bridging global engagement, student mobility, and digital creativity through intentional systems and thoughtful leadership.&rdquo;
              </blockquote>
              <div style={{ width: 48, height: 2, background: '#8B7355', borderRadius: 2, marginBottom: 24 }} />
              <p className="text-base leading-relaxed" style={{ color: '#5C5C5C' }}>
                Over 3+ years, I&apos;ve built a practice at the intersection of international education, institutional leadership, and digital creativity. At <strong style={{ color: '#1C1C1E' }}>Petra Christian University</strong>, I manage relationships with 30+ global partners and facilitate 15+ strategic meetings monthly. Previously at <strong style={{ color: '#1C1C1E' }}>Airlangga Global Engagement</strong>, I led end-to-end management of 5 international exchange programs serving 120+ students per semester with IDR 50–100M per-program budgets.
              </p>
            </div>
            <div className="lg:col-span-2 space-y-4">
              <div className="card p-6" style={{ borderLeft: '3px solid #1E3A5F' }}>
                <div className="flex items-center gap-2 mb-2">
                  <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#22c55e', display: 'inline-block', flexShrink: 0, animation: 'about-live-dot 2s ease-in-out infinite' }} />
                  <p className="label-small" style={{ color: '#1E3A5F' }}>Currently</p>
                </div>
                <p className="font-semibold text-sm" style={{ color: '#1C1C1E' }}>International Partnership Specialist</p>
                <p className="text-xs mt-1" style={{ color: '#767676' }}>Petra Christian University · Surabaya</p>
              </div>
              <div className="card p-6" style={{ borderLeft: '3px solid #8B7355' }}>
                <p className="label-small mb-2" style={{ color: '#8B7355' }}>Also Building</p>
                <p className="font-semibold text-sm font-editorial" style={{ color: '#1C1C1E' }}>CroissantsMoon</p>
                <p className="text-xs mt-1" style={{ color: '#767676' }}>Creative digital studio identity in development</p>
              </div>
              <div className="card p-6" style={{ borderLeft: '3px solid #4A6B8A' }}>
                <p className="label-small mb-2" style={{ color: '#4A6B8A' }}>Open To</p>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {['International Partnerships', 'Education Consulting', 'Digital Projects', 'Speaking'].map(t => <span key={t} className="tag">{t}</span>)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── 3. Current Focus ── */}
      <div style={{ padding: '72px 24px', background: '#F2ECE4' }}>
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-4"><span className="accent-line" /><span className="label-small">Current Focus</span></div>
          <h2 className="font-heading font-bold text-3xl mb-2" style={{ color: '#1C1C1E' }}>What I&apos;m Building &amp; Exploring</h2>
          <p className="text-sm mb-10" style={{ color: '#5C5C5C', maxWidth: 480 }}>The domains I&apos;m actively investing in right now — professionally, creatively, and intellectually.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {currentFocusCards.map(card => (
              <div key={card.title} className="card p-7 about-card-lift" style={{ background: '#fff' }}>
                <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-5" style={{ background: `${card.color}14` }}>
                  <card.icon style={{ width: 20, height: 20, color: card.color }} />
                </div>
                <h3 className="font-heading font-semibold text-base mb-2" style={{ color: '#1C1C1E' }}>{card.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#5C5C5C' }}>{card.desc}</p>
                <div className="mt-4 flex items-center gap-2" style={{ color: card.color }}>
                  <span style={{ width: 18, height: 2, background: 'currentColor', borderRadius: 2, display: 'inline-block' }} />
                  <span className="text-xs font-medium">{card.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── 4. Experience Timeline ── */}
      <ExperienceTimeline />

      {/* ── 5. Core Expertise ── */}
      <div style={{ padding: '72px 24px', background: '#F2ECE4' }}>
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-4"><span className="accent-line" /><span className="label-small">Areas of Expertise</span></div>
          <h2 className="font-heading font-bold text-3xl mb-2" style={{ color: '#1C1C1E' }}>Core Expertise</h2>
          <p className="text-sm mb-10" style={{ color: '#5C5C5C', maxWidth: 480 }}>Competencies built through 3+ years of hands-on international education and creative digital work.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {expertiseItems.map(item => (
              <div key={item.title} className="card p-6 about-card-lift" style={{ background: '#fff' }}>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${item.color}14` }}>
                    <item.icon style={{ width: 18, height: 18, color: item.color }} />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-sm mb-1" style={{ color: '#1C1C1E' }}>{item.title}</h3>
                    <p className="text-xs leading-relaxed" style={{ color: '#5C5C5C' }}>{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── 6. Education ── */}
      <div style={{ padding: '72px 24px', background: '#FAFAF8' }}>
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-4"><span className="accent-line" /><span className="label-small">Academic Background</span></div>
          <h2 className="font-heading font-bold text-3xl mb-10" style={{ color: '#1C1C1E' }}>Education</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="card p-8" style={{ borderLeft: '4px solid #1E3A5F' }}>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(30,58,95,0.08)' }}>
                  <BookOpen style={{ width: 22, height: 22, color: '#1E3A5F' }} />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-lg mb-1" style={{ color: '#1C1C1E' }}>Bachelor&apos;s in International Relations</h3>
                  <p className="text-sm font-medium mb-1" style={{ color: '#1E3A5F' }}>Universitas Airlangga</p>
                  <p className="label-small mb-3" style={{ color: '#767676' }}>July 2020 – March 2024</p>
                  <p className="text-sm leading-relaxed" style={{ color: '#5C5C5C' }}>International relations theory, foreign policy analysis, and cross-cultural dynamics. Published academic research on U.S.–ASEAN cooperation and Middle East diplomacy. Presented at 9th ICoCSPA 2023.</p>
                </div>
              </div>
            </div>
            <div className="card p-8" style={{ borderLeft: '4px solid #8B7355' }}>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(139,115,85,0.08)' }}>
                  <BarChart2 style={{ width: 22, height: 22, color: '#8B7355' }} />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-lg mb-1" style={{ color: '#1C1C1E' }}>Academic Honors &amp; Publications</h3>
                  <p className="text-sm font-medium mb-1" style={{ color: '#8B7355' }}>Research &amp; Recognition</p>
                  <p className="label-small mb-3" style={{ color: '#767676' }}>2022 – 2024</p>
                  <p className="text-sm leading-relaxed" style={{ color: '#5C5C5C' }}>Gold Medalist — World Youth Invention &amp; Innovation Award 2022. Published peer-reviewed papers on U.S. foreign policy, Korea–China THAAD dynamics, and the Abraham Accords.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── 7. Selected Projects ── */}
      <div style={{ padding: '72px 24px', background: '#F2ECE4' }}>
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-4"><span className="accent-line" /><span className="label-small">Featured Work</span></div>
          <h2 className="font-heading font-bold text-3xl mb-2" style={{ color: '#1C1C1E' }}>Selected Projects</h2>
          <p className="text-sm mb-10" style={{ color: '#5C5C5C', maxWidth: 480 }}>International education programs, digital platforms, and creative initiatives that define my practice.</p>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* AMERTA */}
            <Link href="/amerta" className="card text-left group overflow-hidden about-card-lift" style={{ background: '#fff', display: 'block', textDecoration: 'none' }}>
              <div className="h-40 relative overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img loading="lazy" src="/assets/images/student-services/tailor-made/griffith-unair-2.JPEG" alt="AMERTA" className="w-full h-full object-cover" />
              </div>
              <div className="p-6">
                <div className="label-small mb-2" style={{ color: '#4A6B8A' }}>Exchange Program · Airlangga</div>
                <h3 className="font-heading font-bold text-lg mb-2" style={{ color: '#1C1C1E' }}>AMERTA</h3>
                <p className="text-sm leading-relaxed mb-4" style={{ color: '#5C5C5C' }}>End-to-end semester exchange — 120+ students, IDR 50–100M budget, 5 program phases.</p>
                <div className="flex flex-wrap gap-1.5 mb-4">{['Student Mobility', 'Project Management', 'Leadership'].map(t => <span key={t} className="tag">{t}</span>)}</div>
                <div className="flex items-center gap-2 text-sm font-medium" style={{ color: '#1E3A5F' }}>View case study <ArrowRight style={{ width: 14, height: 14 }} /></div>
              </div>
            </Link>

            {/* ACI */}
            <Link href="/aci" className="card text-left group overflow-hidden about-card-lift" style={{ background: '#fff', display: 'block', textDecoration: 'none' }}>
              <div className="h-40 relative overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img loading="lazy" src="/assets/images/aci/aci-4.JPEG" alt="ACI Cultural Immersion" className="w-full h-full object-cover" style={{ objectPosition: 'center 30%' }} />
              </div>
              <div className="p-6">
                <div className="label-small mb-2" style={{ color: '#6B4F32' }}>Cultural Immersion · Airlangga</div>
                <h3 className="font-heading font-bold text-lg mb-2" style={{ color: '#1C1C1E' }}>ACI</h3>
                <p className="text-sm leading-relaxed mb-4" style={{ color: '#5C5C5C' }}>Structured engagement program connecting international and local students through cultural experience.</p>
                <div className="flex flex-wrap gap-1.5 mb-4">{['Student Support', 'Project Management', 'Cross-Cultural'].map(t => <span key={t} className="tag">{t}</span>)}</div>
                <div className="flex items-center gap-2 text-sm font-medium" style={{ color: '#6B4F32' }}>View case study <ArrowRight style={{ width: 14, height: 14 }} /></div>
              </div>
            </Link>

            {/* International Office Website */}
            <Link href="/pcu-global" className="card text-left group overflow-hidden about-card-lift" style={{ background: '#fff', display: 'block', textDecoration: 'none' }}>
              <div className="h-40 relative overflow-hidden" style={{ background: '#f0f4f8' }}>
                <iframe src="https://international-office-website.vercel.app/" style={{ position: 'absolute', top: 0, left: 0, width: '300%', height: 420, transform: 'scale(0.333)', transformOrigin: 'top left', border: 'none', pointerEvents: 'none' }} loading="lazy" sandbox="allow-scripts allow-same-origin" aria-hidden="true" title="PCU International Office Website preview" />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom,transparent 55%,rgba(255,255,255,0.92))' }} />
              </div>
              <div className="p-6">
                <div className="label-small mb-2" style={{ color: '#003087' }}>Web Platform · PCU</div>
                <h3 className="font-heading font-bold text-lg mb-2" style={{ color: '#1C1C1E' }}>International Office Website</h3>
                <p className="text-sm leading-relaxed mb-4" style={{ color: '#5C5C5C' }}>Rebuilding PCU&apos;s International Office digital presence — for inbound students, outbound programs, and partners.</p>
                <div className="flex flex-wrap gap-1.5 mb-4">{['Web Development', 'UI/UX Design', 'Digital Strategy'].map(t => <span key={t} className="tag">{t}</span>)}</div>
                <div className="flex items-center gap-2 text-sm font-medium" style={{ color: '#003087' }}>View case study <ArrowRight style={{ width: 14, height: 14 }} /></div>
              </div>
            </Link>

            {/* Partnership Dashboard */}
            <Link href="/croissantsmoon/web-dashboard-partnership" className="card text-left group overflow-hidden about-card-lift" style={{ background: '#fff', display: 'block', textDecoration: 'none' }}>
              <div className="h-40 relative overflow-hidden" style={{ background: 'linear-gradient(135deg,#1E3A5F 0%,#2C4A72 100%)' }}>
                <div className="absolute inset-0 flex flex-col justify-center px-6 gap-2.5">
                  {[78, 55, 88, 43, 66].map((w, i) => (
                    <div key={i} style={{ height: 5, background: i === 3 ? 'rgba(139,115,85,0.65)' : `rgba(255,255,255,${[0.45, 0.25, 0.35, 0, 0.2][i]})`, borderRadius: 3, width: `${w}%` }} />
                  ))}
                </div>
                <BarChart2 style={{ position: 'absolute', right: 20, bottom: 16, width: 40, height: 40, color: 'rgba(255,255,255,0.18)' }} />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom,transparent 60%,rgba(30,58,95,0.5))' }} />
              </div>
              <div className="p-6">
                <div className="label-small mb-2" style={{ color: '#1E3A5F' }}>Dashboard · PCU</div>
                <h3 className="font-heading font-bold text-lg mb-2" style={{ color: '#1C1C1E' }}>Partnership Dashboard</h3>
                <p className="text-sm leading-relaxed mb-4" style={{ color: '#5C5C5C' }}>A data dashboard for visualising and managing PCU&apos;s international partnership network and grants pipeline.</p>
                <div className="flex flex-wrap gap-1.5 mb-4">{['Data Visualization', 'UI/UX Design', 'Digital Strategy'].map(t => <span key={t} className="tag">{t}</span>)}</div>
                <div className="flex items-center gap-2 text-sm font-medium" style={{ color: '#1E3A5F' }}>View case study <ArrowRight style={{ width: 14, height: 14 }} /></div>
              </div>
            </Link>
          </div>

          {/* CroissantsMoon card */}
          <Link href="/croissantsmoon" className="card w-full text-left group overflow-hidden about-card-lift block" style={{ background: '#071126', borderColor: 'rgba(111,168,255,0.14)', textDecoration: 'none' }}>
            <div className="flex flex-col md:flex-row">
              <div className="h-56 md:h-auto md:w-72 lg:w-80 relative overflow-hidden flex-shrink-0" style={{ background: 'linear-gradient(145deg,#071126 0%,#0B1E3A 55%,#183B6B 100%)' }}>
                {[{ w:3,h:3,t:'18%',l:'22%',d:0 },{ w:2,h:2,t:'35%',l:'68%',d:.6 },{ w:2,h:2,t:'62%',l:'38%',d:1.1 },{ w:1,h:1,t:'72%',l:'78%',d:.4 },{ w:2,h:2,t:'22%',l:'58%',d:.9 },{ w:1,h:1,t:'50%',l:'15%',d:1.5 },{ w:2,h:2,t:'82%',l:'52%',d:.2 }].map((s, i) => (
                  <div key={i} style={{ position: 'absolute', width: s.w, height: s.h, borderRadius: '50%', background: i % 3 === 1 ? '#8FA8D6' : i % 3 === 2 ? '#D4B15A' : '#D9E6FF', top: s.t, left: s.l, animation: `about-twinkle ${2.2 + i * 0.3}s ease-in-out infinite ${s.d}s` }} />
                ))}
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 76, height: 76, borderRadius: '50%', background: 'radial-gradient(circle at 35% 35%,#D9E6FF 0%,#8FA8D6 50%,#4A6B8A 100%)', boxShadow: '0 0 40px rgba(217,230,255,0.2)', animation: 'about-float 4.5s ease-in-out infinite' }} />
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-32%,-50%)', width: 76, height: 76, borderRadius: '50%', background: '#071126' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 50%,rgba(212,177,90,0.06),transparent 65%)' }} />
              </div>
              <div className="p-8 flex flex-col justify-center">
                <div className="label-small mb-3" style={{ color: 'rgba(212,177,90,0.65)', letterSpacing: '.12em' }}>Creative Identity · In Development</div>
                <h3 className="font-heading font-bold mb-3 font-editorial" style={{ color: '#D9E6FF', fontStyle: 'italic', fontSize: 'clamp(1.5rem,3vw,2.2rem)', letterSpacing: '-.01em', lineHeight: 1.1 }}>CroissantsMoon</h3>
                <p className="text-sm leading-relaxed mb-6" style={{ color: '#8FA8D6', maxWidth: 420 }}>A boutique creative studio — editorial design, brand systems, and curated digital experiences. Where craft meets the cosmos.</p>
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {['Branding', 'Creative Direction', 'UI/UX', 'Web Development'].map(t => <span key={t} className="tag" style={{ color: 'rgba(217,230,255,0.45)', borderColor: 'rgba(111,168,255,0.15)' }}>{t}</span>)}
                </div>
                <div className="flex items-center gap-2 text-sm font-medium" style={{ color: '#D4B15A' }}>Explore the studio <ArrowRight style={{ width: 14, height: 14 }} /></div>
              </div>
            </div>
          </Link>

          <div className="mt-8 text-center">
            <Link href="/projects-overview" className="btn-outline text-sm px-6 py-2.5 rounded-full inline-flex items-center gap-2">
              All Projects <ArrowRight style={{ width: 14, height: 14 }} />
            </Link>
          </div>
        </div>
      </div>

      {/* ── 8. Skill Ecosystem ── */}
      <SkillEcosystem />

      {/* ── 9. Leadership & Philosophy ── */}
      <div style={{ padding: '72px 24px', background: '#1C1C1E' }}>
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-10">
            <span style={{ width: 32, height: 2, background: '#8B7355', borderRadius: 2, display: 'inline-block', flexShrink: 0 }} />
            <span className="label-small" style={{ color: 'rgba(255,255,255,0.35)' }}>Leadership &amp; Philosophy</span>
          </div>
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <blockquote className="font-heading leading-snug mb-6" style={{ color: '#fff', fontSize: 'clamp(1.5rem,3vw,2.2rem)', letterSpacing: '-.01em' }}>
                &ldquo;International education is not just about moving students across borders — it&apos;s about building the bridges they&apos;ll walk back across.&rdquo;
              </blockquote>
              <p className="text-sm leading-relaxed mb-8" style={{ color: 'rgba(255,255,255,0.45)' }}>My approach is grounded in systems thinking and human-centered practice. Whether managing partnerships, designing programs, or building digital tools, I believe great work comes from understanding the whole — not just the parts.</p>
              <div style={{ width: 40, height: 2, background: '#8B7355', borderRadius: 2 }} />
            </div>
            <div className="space-y-6">
              <div style={{ borderLeft: '2px solid #8B7355', padding: '16px 20px', background: 'rgba(139,115,85,0.07)', borderRadius: '0 8px 8px 0' }}>
                <h3 className="font-heading font-semibold text-base mb-2" style={{ color: '#fff' }}>Systems Over Silos</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>Complex problems in international education require connecting systems, not just solving individual tasks.</p>
              </div>
              <div style={{ borderLeft: '2px solid rgba(255,255,255,0.1)', paddingLeft: 20 }}>
                <h3 className="font-heading font-semibold text-base mb-2" style={{ color: '#fff' }}>Global Orientation, Local Action</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.45)' }}>Every partnership agreement and student support initiative ultimately plays out at the human, local level. I keep both in view.</p>
              </div>
              <div style={{ borderLeft: '2px solid rgba(255,255,255,0.1)', paddingLeft: 20 }}>
                <h3 className="font-heading font-semibold text-base mb-2" style={{ color: '#fff' }}>Creativity as Strategy</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.45)' }}>Digital design, branding, and systems thinking aren&apos;t separate from international education — they&apos;re force multipliers for institutional impact.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── 10. Certifications & Milestones ── */}
      <div style={{ padding: '72px 24px', background: '#FAFAF8' }}>
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-4"><span className="accent-line" /><span className="label-small">Achievements</span></div>
          <h2 className="font-heading font-bold text-3xl mb-10" style={{ color: '#1C1C1E' }}>Certifications &amp; Milestones</h2>
          <div className="grid md:grid-cols-3 gap-5">
            {certifications.map(cert => (
              <div key={cert.title} className="card p-6 about-card-lift" style={{ borderTop: `3px solid ${cert.color}` }}>
                <div className="label-small mb-3" style={{ color: cert.color }}>{cert.label}</div>
                <h3 className="font-heading font-semibold text-base mb-2" style={{ color: '#1C1C1E' }}>{cert.title}</h3>
                <p className="text-xs" style={{ color: '#5C5C5C' }}>{cert.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── 11. Interests & Creative Identity ── */}
      <div style={{ padding: '72px 24px', background: '#1C1C1E' }}>
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <span style={{ width: 32, height: 2, background: '#8B7355', borderRadius: 2, display: 'inline-block', flexShrink: 0 }} />
            <span className="label-small" style={{ color: 'rgba(255,255,255,0.35)' }}>Beyond the Resume</span>
          </div>
          <h2 className="font-heading font-bold text-3xl mb-2" style={{ color: '#fff' }}>Interests &amp; Creative Identity</h2>
          <p className="text-sm mb-10" style={{ color: 'rgba(255,255,255,0.4)', maxWidth: 480 }}>The curiosities, creative pursuits, and dimensions that make the professional work more interesting.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {interests.map(item => (
              <div key={item.title} style={{ padding: 28, border: '1px solid rgba(255,255,255,0.07)', borderRadius: 12, background: 'rgba(255,255,255,0.04)' }}>
                <p className={`text-base mb-3 ${item.editorial ? 'font-editorial' : 'font-heading font-semibold'}`} style={{ color: item.editorial ? '#8B7355' : '#fff' }}>{item.title}</p>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.45)' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── 12. Contact / Connect ── */}
      <div style={{ padding: '80px 24px', background: '#FAFAF8' }}>
        <div className="max-w-xl mx-auto text-center">
          <div className="flex justify-center mb-6"><span className="accent-line" style={{ width: 40 }} /></div>
          <p className="font-editorial text-xl mb-3" style={{ color: '#8B7355' }}>Open to meaningful conversations</p>
          <h2 className="font-heading font-bold text-3xl md:text-4xl mb-4" style={{ color: '#1C1C1E' }}>Let&apos;s Connect</h2>
          <p className="text-sm leading-relaxed mb-10" style={{ color: '#5C5C5C', maxWidth: 400, marginLeft: 'auto', marginRight: 'auto' }}>Whether you&apos;re exploring international partnerships, building something in education, or want to exchange perspectives — I&apos;m open to it.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
            <Link href="/contact" className="btn-primary font-medium text-sm px-8 py-3.5 rounded-full inline-flex items-center justify-center gap-2">
              <Mail style={{ width: 15, height: 15 }} /> Get in Touch
            </Link>
            <a href="/assets/data/profile.pdf" download className="btn-outline font-medium text-sm px-8 py-3.5 rounded-full inline-flex items-center justify-center gap-2">
              <Download style={{ width: 15, height: 15 }} /> Download CV
            </a>
          </div>
          <div className="flex justify-center gap-4">
            <a href="mailto:zefanya.kharisma@gmail.com" className="flex items-center gap-2 text-sm" style={{ color: '#5C5C5C', textDecoration: 'none' }}>
              <Mail style={{ width: 14, height: 14 }} /> zefanya.kharisma@gmail.com
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
