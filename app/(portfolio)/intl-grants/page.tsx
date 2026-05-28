import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Construction, Layers, Zap, Calendar, GitMerge, Search, Bookmark, UploadCloud, PieChart, Shield, LayoutDashboard, Megaphone, ClipboardList, Users, CheckCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'International Grants Management — Zefanya Kharisma Nugroho',
  description: 'Building a comprehensive system to inform, maintain, and execute international grants at Petra Christian University — digital dashboard and physical operational flow.',
}

export default function IntlGrantsPage() {
  return (
    <div style={{ background: '#FAFAF8', minHeight: '100vh' }}>

      {/* ── Hero ── */}
      <div style={{ background: 'linear-gradient(160deg,#1C1C1E 0%,#064E3B 45%,#065F46 100%)', padding: 'clamp(48px,8vh,72px) 24px 0', position: 'relative', overflow: 'hidden' }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 85% 20%,rgba(217,119,6,0.18),transparent 55%)' }} />
        <div className="absolute -right-16 -top-16 w-80 h-80 rounded-full pointer-events-none" style={{ border: '1px solid rgba(255,255,255,0.04)' }} />
        <div className="max-w-6xl mx-auto relative" style={{ zIndex: 10 }}>
          <Link href="/engagement" style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 32, color: 'rgba(255,255,255,0.45)', fontSize: '.8rem', fontWeight: 500, textDecoration: 'none' }}>
            <ArrowLeft style={{ width: 15, height: 15 }} /> Back
          </Link>
          <div className="flex items-center gap-3 mb-3">
            <div className="label-small" style={{ color: 'rgba(255,255,255,0.35)', letterSpacing: '.12em' }}>International Education · PCU</div>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: '.65rem', fontWeight: 700, letterSpacing: '.09em', textTransform: 'uppercase', padding: '3px 10px', borderRadius: 999, background: 'rgba(217,119,6,0.25)', color: '#FCD34D', border: '1px solid rgba(217,119,6,0.3)' }}>
              <Construction style={{ width: 10, height: 10 }} /> In Development
            </span>
          </div>
          <h1 className="font-heading font-bold mb-4" style={{ fontSize: 'clamp(2rem,5vw,3.5rem)', lineHeight: 1.05, color: '#fff', letterSpacing: '-.02em' }}>
            International Grants<br /><em style={{ fontStyle: 'italic', color: '#FCD34D' }}>Management System</em>
          </h1>
          <p className="max-w-2xl mb-8" style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1rem', lineHeight: 1.7 }}>
            Currently building a comprehensive system — both digital and physical — to inform, maintain, and execute international grants at Petra Christian University. A single place for every grant opportunity, every applicant, and every deadline.
          </p>
          <div className="flex flex-wrap gap-8 pb-8">
            {[['Digital','Dashboard System'],['Physical','Operational Flow'],['PCU','Petra Christian University']].map(([val, label]) => (
              <div key={label}>
                <p className="font-heading font-bold text-2xl" style={{ color: '#FCD34D' }}>{val}</p>
                <p className="label-small" style={{ color: 'rgba(255,255,255,0.35)' }}>{label}</p>
              </div>
            ))}
          </div>
          {/* Tab nav */}
          <div className="flex gap-0 border-t" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
            <Link href="/onboarding" style={{ color: 'rgba(255,255,255,0.45)', fontSize: '.75rem', fontWeight: 500, padding: '12px 20px', borderBottom: '2px solid transparent', background: 'transparent', textDecoration: 'none', display: 'block' }}>Student Support</Link>
            <Link href="/onboarding" style={{ color: 'rgba(255,255,255,0.45)', fontSize: '.75rem', fontWeight: 500, padding: '12px 20px', borderBottom: '2px solid transparent', background: 'transparent', textDecoration: 'none', display: 'block' }}>Student Engagement</Link>
            <Link href="/partnerships" style={{ color: 'rgba(255,255,255,0.45)', fontSize: '.75rem', fontWeight: 500, padding: '12px 20px', borderBottom: '2px solid transparent', background: 'transparent', textDecoration: 'none', display: 'block' }}>Partnerships</Link>
            <Link href="/mou" style={{ color: 'rgba(255,255,255,0.45)', fontSize: '.75rem', fontWeight: 500, padding: '12px 20px', borderBottom: '2px solid transparent', background: 'transparent', textDecoration: 'none', display: 'block' }}>MoU / MoA</Link>
            <span style={{ color: '#fff', fontSize: '.75rem', fontWeight: 600, padding: '12px 20px', borderBottom: '2px solid #FCD34D', background: 'transparent', cursor: 'default', display: 'block' }}>Intl. Grants</span>
          </div>
        </div>
      </div>

      {/* ── What's Being Built ── */}
      <div style={{ padding: '72px 24px 64px', background: '#FAFAF8' }}>
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-10"><span className="accent-line" /><span className="label-small">What&apos;s Being Built</span></div>
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="font-heading font-bold text-3xl mb-4" style={{ color: '#1C1C1E' }}>A System for Every Stage of Every Grant</h2>
              <p className="text-base mb-5" style={{ color: '#5C5C5C', lineHeight: 1.75 }}>International grant programmes — from government scholarships to university-funded exchanges — require careful coordination across multiple stages: awareness, application, selection, placement, and completion. At PCU, this information has been fragmented across emails, shared drives, and spreadsheets. I&apos;m building a system that centralises all of it.</p>
              <p className="text-base mb-5" style={{ color: '#5C5C5C', lineHeight: 1.75 }}>The system has two interdependent layers: a <strong style={{ color: '#064E3B' }}>digital dashboard</strong> that tracks every active grant, applicant, and deadline in real time — and a <strong style={{ color: '#064E3B' }}>physical operational workflow</strong> that ensures students are properly informed and supported throughout the application and placement process.</p>
              <p className="text-base mb-8" style={{ color: '#5C5C5C', lineHeight: 1.75 }}>The goal is a single source of truth for PCU&apos;s international grants — one that faculty, staff, and students can consult without chasing status updates across email chains.</p>
              <div className="flex flex-wrap gap-3">
                {['Supabase Realtime','Grant Tracking','Deadline Calendar','Pipeline Management','Physical Workflow','Student Facing'].map(t => (
                  <span key={t} className="tag">{t}</span>
                ))}
              </div>
            </div>
            <div className="grid gap-4">
              {[
                { Icon: Layers,    color: '#064E3B', title: 'Digital + Physical Integration',   desc: 'The dashboard is the digital backbone — but the physical workflow (briefing sessions, printed guides, in-person advising) ensures students are properly equipped to apply and succeed.' },
                { Icon: Zap,       color: '#D97706', title: 'Realtime Grant Status',             desc: 'Every grant, every applicant, every stage — updated live via Supabase Realtime subscriptions. No polling. No refresh required. Staff see changes the moment they happen.' },
                { Icon: Calendar,  color: '#7C3AED', title: 'Deadline-First Calendar',           desc: 'A dedicated calendar view surfaces every grant deadline across active programmes, sorted by urgency — so no submission window is ever missed by a student or staff member.' },
                { Icon: GitMerge,  color: '#059669', title: 'Stage-Based Applicant Pipeline',   desc: 'A Kanban-style pipeline tracks every applicant\'s current stage across concurrent grant cycles — making it immediately visible where bottlenecks are and who needs follow-up.' },
              ].map(c => (
                <div key={c.title} className="card p-5 rounded-2xl" style={{ border: '1px solid rgba(28,28,30,0.08)' }}>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${c.color}14` }}>
                      <c.Icon style={{ width: 18, height: 18, color: c.color }} />
                    </div>
                    <div>
                      <h4 className="font-heading font-semibold mb-1" style={{ color: '#1C1C1E' }}>{c.title}</h4>
                      <p className="text-sm leading-relaxed" style={{ color: '#5C5C5C' }}>{c.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── International Grants Dashboard ── */}
      <div style={{ padding: '64px 24px', background: '#fff', borderTop: '1px solid rgba(28,28,30,0.07)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-10"><span className="accent-line" /><span className="label-small">The Dashboard</span></div>
          <h2 className="font-heading font-bold text-3xl mb-4" style={{ color: '#1C1C1E' }}>International Grants Dashboard</h2>
          <p className="text-base max-w-3xl mb-10" style={{ color: '#5C5C5C', lineHeight: 1.75 }}>The digital centrepiece of this system — a self-built web application that centralises international grant tracking from opportunity discovery through to placement outcome. Built with Supabase (database, realtime, auth, storage, RLS) and Chart.js for analytics.</p>
          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {[
              { Icon: Search,       color: '#064E3B', title: 'Grant Discovery & Matching',    desc: 'A matching engine cross-references a student\'s faculty and programme against grant eligibility criteria — surfacing the most relevant opportunities automatically without manual searching.' },
              { Icon: Bookmark,     color: '#D97706', title: 'Local & Synced Bookmarks',       desc: 'Public users can bookmark grants locally; authenticated users get bookmarks synced across devices via Supabase — so students never lose track of opportunities they\'re considering.' },
              { Icon: UploadCloud,  color: '#7C3AED', title: 'Admin Document Attachments',    desc: 'Staff can upload supporting documents (PDFs, forms) directly to Supabase Storage from the grant form — drag-and-drop or file picker, with a full audit trail in the activity log.' },
              { Icon: PieChart,     color: '#059669', title: 'Outcome Analytics',             desc: 'Acceptance rates, total funding secured, and placement outcomes are calculated automatically from live data — charts are ready for leadership reporting without manual aggregation.' },
              { Icon: Shield,       color: '#1E3A5F', title: 'Row Level Security',            desc: 'Every table is protected by Supabase RLS — public read, admin write. The anon key is safely exposed in the client; the service_role key never touches frontend code.' },
              { Icon: Zap,          color: '#8B7355', title: 'Realtime Updates',              desc: 'Supabase Realtime subscriptions push INSERT / UPDATE / DELETE events from the grants table to every connected client instantly — no polling, no page refresh required.' },
            ].map(c => (
              <div key={c.title} className="card rounded-2xl p-6" style={{ border: '1px solid rgba(28,28,30,0.08)' }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: `${c.color}14` }}>
                  <c.Icon style={{ width: 22, height: 22, color: c.color }} />
                </div>
                <h3 className="font-heading font-semibold text-base mb-2" style={{ color: '#1C1C1E' }}>{c.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#5C5C5C' }}>{c.desc}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-4">
            <Link href="/croissantsmoon/web-dashboard-grants" className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm" style={{ background: '#064E3B', color: '#fff', textDecoration: 'none' }}>
              <LayoutDashboard style={{ width: 15, height: 15 }} /> View Dashboard Details
            </Link>
            <Link href="/engagement" className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm" style={{ background: 'transparent', color: '#064E3B', border: '1.5px solid rgba(6,78,59,0.3)', textDecoration: 'none' }}>
              <ArrowLeft style={{ width: 15, height: 15 }} /> Back to Intl. Education
            </Link>
          </div>
        </div>
      </div>

      {/* ── Physical Layer ── */}
      <div style={{ padding: '64px 24px', background: '#FAFAF8', borderTop: '1px solid rgba(28,28,30,0.07)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-10"><span className="accent-line" /><span className="label-small">Physical System</span></div>
          <h2 className="font-heading font-bold text-3xl mb-4" style={{ color: '#1C1C1E' }}>Beyond the Dashboard — The Physical Workflow</h2>
          <p className="text-base max-w-3xl mb-10" style={{ color: '#5C5C5C', lineHeight: 1.75 }}>A dashboard alone does not move a student from interest to application. The physical layer of this system ensures students at PCU are actively informed, supported, and guided through each grant cycle — not just pointed to a website.</p>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { Icon: Megaphone,     color: '#064E3B', title: 'Informing Students',    desc: 'Grant briefing sessions, printed opportunity guides, and targeted outreach to eligible faculties — ensuring students at PCU know what is available before deadlines pass.' },
              { Icon: ClipboardList, color: '#D97706', title: 'Maintaining Records',   desc: 'A physical archive of grant documentation, applicant records, and outcome reports — maintained in coordination with the digital dashboard to create a redundant, complete institutional record.' },
              { Icon: Users,         color: '#7C3AED', title: 'Guiding Applications', desc: 'In-person advising sessions, document checklist walkthroughs, and application review support — making sure students submit complete, competitive applications rather than navigating the process alone.' },
              { Icon: CheckCircle,   color: '#059669', title: 'Executing Placements', desc: 'Post-selection coordination with partner institutions and funding bodies — ensuring accepted students are placed, onboarded, and supported through the start of their grant period.' },
            ].map(c => (
              <div key={c.title} className="card rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(28,28,30,0.08)' }}>
                <div className="p-5 border-b" style={{ borderColor: 'rgba(28,28,30,0.07)', background: 'rgba(6,78,59,0.03)' }}>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${c.color}1A` }}>
                      <c.Icon style={{ width: 16, height: 16, color: c.color }} />
                    </div>
                    <h3 className="font-heading font-semibold" style={{ color: '#1C1C1E' }}>{c.title}</h3>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-sm leading-relaxed" style={{ color: '#5C5C5C' }}>{c.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  )
}
