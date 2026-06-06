import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, FileCheck, CheckSquare, RefreshCw, BarChart2, Workflow, Archive, Bell, PieChart, LayoutDashboard } from 'lucide-react'

export const metadata: Metadata = {
  title: 'MoU / MoA Coordination',
  alternates: { canonical: '/mou' },
  description: 'Reviewing 25+ partnership agreements per month at PCU — ensuring compliance, institutional alignment, and timely processing.',
}

export default function MouPage() {
  return (
    <div style={{ background: '#FAFAF8', minHeight: '100vh' }}>

      {/* ── Hero ── */}
      <div style={{ background: 'linear-gradient(160deg,#1C1C1E 0%,#1E3A5F 55%,#2C4A72 100%)', padding: 'clamp(48px,8vh,72px) 24px 0', position: 'relative', overflow: 'hidden' }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 85% 20%,rgba(139,115,85,0.18),transparent 55%)' }} />
        <div className="absolute -right-16 -top-16 w-80 h-80 rounded-full pointer-events-none" style={{ border: '1px solid rgba(255,255,255,0.04)' }} />
        <div className="max-w-6xl mx-auto relative" style={{ zIndex: 10 }}>
          <Link href="/engagement" style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 32, color: 'rgba(255,255,255,0.45)', fontSize: '.8rem', fontWeight: 500, textDecoration: 'none' }}>
            <ArrowLeft style={{ width: 15, height: 15 }} /> Back
          </Link>
          <div className="label-small mb-3" style={{ color: 'rgba(255,255,255,0.35)', letterSpacing: '.12em' }}>Agreement Management</div>
          <h1 className="font-heading font-bold mb-4" style={{ fontSize: 'clamp(2rem,5vw,3.5rem)', lineHeight: 1.05, color: '#fff', letterSpacing: '-.02em' }}>
            MoU / MoA<br /><em style={{ fontStyle: 'italic', color: '#8B7355' }}>Coordination</em>
          </h1>
          <p className="max-w-2xl mb-8" style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1rem', lineHeight: 1.7 }}>
            Reviewing 25+ partnership agreements per month at PCU — ensuring compliance, institutional alignment, and timely processing across a diverse global network.
          </p>
          <div className="flex flex-wrap gap-8 pb-8">
            {[['25+','Monthly Reviews'],['30+','Partners'],['40+','Total Agreements'],['24h','Meeting Minutes']].map(([val, label]) => (
              <div key={label}>
                <p className="font-heading font-bold text-2xl" style={{ color: '#8B7355' }}>{val}</p>
                <p className="label-small" style={{ color: 'rgba(255,255,255,0.35)' }}>{label}</p>
              </div>
            ))}
          </div>
          {/* Tab nav */}
          <div className="flex gap-0 border-t" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
            <Link href="/engagement" style={{ color: 'rgba(255,255,255,0.45)', fontSize: '.75rem', fontWeight: 500, padding: '12px 20px', borderBottom: '2px solid transparent', background: 'transparent', textDecoration: 'none', display: 'block' }}>Overview</Link>
            <Link href="/partnerships" style={{ color: 'rgba(255,255,255,0.45)', fontSize: '.75rem', fontWeight: 500, padding: '12px 20px', borderBottom: '2px solid transparent', background: 'transparent', textDecoration: 'none', display: 'block' }}>Partnership Dev</Link>
            <span style={{ color: '#fff', fontSize: '.75rem', fontWeight: 600, padding: '12px 20px', borderBottom: '2px solid #8B7355', background: 'transparent', cursor: 'default', display: 'block' }}>MoU / MoA</span>
          </div>
        </div>
      </div>

      {/* ── Coordination Framework ── */}
      <div style={{ padding: '72px 24px 64px', background: '#FAFAF8' }}>
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-10"><span className="accent-line" /><span className="label-small">Coordination Framework</span></div>
          <h2 className="font-heading font-bold text-3xl mb-4" style={{ color: '#1C1C1E' }}>How Agreements Are Managed</h2>
          <p className="text-base max-w-3xl mb-10" style={{ color: '#5C5C5C' }}>A rigorous end-to-end process ensures every MoU and MoA is handled with precision — from initial drafting through to activation and ongoing monitoring.</p>
          <div className="card rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(28,28,30,0.08)' }}>
            {[
              { n:'01', Icon: FileCheck,   color:'#1E3A5F', title:'Drafting & Negotiation',    desc:'Collaboratively developing MoU/MoA documents that clearly define partnership scope, objectives, and mutual commitments', border: true },
              { n:'02', Icon: CheckSquare, color:'#4A6B8A', title:'Compliance & Approval',     desc:'Ensuring all agreements comply with institutional policies and securing necessary approvals from relevant authorities', border: true },
              { n:'03', Icon: RefreshCw,   color:'#8B7355', title:'Renewal & Updates',         desc:'Managing agreement lifecycle including renewals, amendments, and updates to reflect evolving partnership priorities', border: true },
              { n:'04', Icon: BarChart2,   color:'#059669', title:'Monitoring & Activation',   desc:'Tracking implementation progress and ensuring both parties meet agreed commitments and leverage opportunities', border: false },
            ].map(s => (
              <div key={s.n} className="flex gap-4 p-6" style={s.border ? { borderBottom: '1px solid rgba(28,28,30,0.1)' } : {}}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${s.color}14` }}>
                  <s.Icon style={{ width: 24, height: 24, color: s.color }} />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold" style={{ color: s.color, letterSpacing: '.06em' }}>{s.n}</span>
                    <h3 className="font-heading font-semibold" style={{ color: '#1C1C1E' }}>{s.title}</h3>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: '#5C5C5C' }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Partnership Dashboard Integration ── */}
      <div style={{ padding: '64px 24px', background: '#fff', borderTop: '1px solid rgba(28,28,30,0.07)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-10"><span className="accent-line" /><span className="label-small">System Integration</span></div>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-heading font-bold text-3xl mb-4" style={{ color: '#1C1C1E' }}>Managed Through the Partnership Dashboard</h2>
              <p className="text-base mb-6" style={{ color: '#5C5C5C', lineHeight: 1.75 }}>
                Every agreement — from first draft to final signature — is tracked and executed through an integrated, self-built Partnership Dashboard. Rather than managing documents across disconnected spreadsheets and email threads, the entire lifecycle is centralised in one system I designed and built specifically for PCU&apos;s international office workflow.
              </p>
              <p className="text-base mb-8" style={{ color: '#5C5C5C', lineHeight: 1.75 }}>
                The dashboard covers the full 8-stage agreement workflow: <strong style={{ color: '#1C1C1E' }}>Drafting → Internal Review → Legal Review → Partner Review → Waiting Signature → Signed → Completed → Archived</strong>. Each stage is tracked with progress indicators and status history, so nothing slips through the cracks.
              </p>
              <div className="flex flex-wrap gap-3 mb-8">
                {['Drafting Tracking','8-Stage Workflow','Expiry Alerts','Public Archive','Role-Based Access','Executive Analytics'].map(t => (
                  <span key={t} className="tag">{t}</span>
                ))}
              </div>
              <Link href="/croissantsmoon/web-dashboard-partnership" className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm" style={{ background: '#1E3A5F', color: '#fff', textDecoration: 'none' }}>
                <LayoutDashboard style={{ width: 15, height: 15 }} /> View Partnership Dashboard
              </Link>
            </div>
            <div className="flex flex-col gap-4">
              {[
                { Icon: Workflow,  color:'#1E3A5F', title:'End-to-End Document Pipeline',   desc:'From first draft to archived signed copy — every document stage is logged, timestamped, and visible to authorised staff across all four admin roles.' },
                { Icon: Archive,   color:'#059669', title:'Public Agreement Archive',        desc:'Signed and active agreements are auto-archived into a searchable public library — with advanced filter and CSV export, no sign-in required for read access.' },
                { Icon: Bell,      color:'#8B7355', title:'Expiry & Renewal Tracking',      desc:'Colour-coded status badges surface agreements nearing expiry before they lapse — ensuring renewals are initiated on time, every time.' },
                { Icon: PieChart,  color:'#7C3AED', title:'Executive Analytics',            desc:'Status distribution, agreements by department, monthly activity trends, and expiration timelines — all rendered live and filterable for leadership reporting.' },
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

    </div>
  )
}
