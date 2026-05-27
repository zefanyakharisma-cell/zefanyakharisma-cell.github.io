import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Database, BarChart2, GitBranch, Globe2, Shield, Bell } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Partnership Dashboard — CroissantsMoon · Zefanya Kharisma Nugroho',
  description: 'Data dashboard for visualizing and managing 2,289+ institutional partnership agreements at Petra Christian University.',
}

const features = [
  { icon: Database, color: '#6FA8FF', title: 'Agreement Database', desc: '2,289+ partnership records with full CRUD operations — filtering by country, faculty, agreement type, validity, and status.' },
  { icon: GitBranch, color: '#D4B15A', title: '8-Stage Workflow', desc: 'Pipeline view tracking agreements from initial proposal through signing, active status, renewal, and archival — with stage-gated transitions.' },
  { icon: BarChart2, color: '#6FD88A', title: 'Analytics Dashboard', desc: 'Visual analytics showing partner distribution by country, faculty, agreement age, activity level, and program output — exportable to PDF and CSV.' },
  { icon: Globe2, color: '#8FA8D6', title: 'Geographic Map View', desc: 'Interactive world map showing partner density by country — clicking a region filters the agreement database to that geography.' },
  { icon: Shield, color: '#D4B15A', title: 'Role-Based Access', desc: 'Multi-role access control — administrators manage all records, coordinators access their faculty\'s agreements, and external partners view limited shared data.' },
  { icon: Bell, color: '#6FA8FF', title: 'Renewal Alerts', desc: 'Automated notification system flagging agreements approaching expiry — 90, 60, and 30-day alerts with action prompts for coordinators.' },
]

export default function PartnershipDashboardPage() {
  return (
    <div style={{ background: '#071126', minHeight: '100vh', color: '#D9E6FF' }}>
      <div style={{ position: 'relative', padding: '60px 24px 48px', borderBottom: '1px solid rgba(111,168,255,0.1)' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <Link href="/croissantsmoon/websites" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 24, padding: '8px 16px', borderRadius: 999, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '.84rem' }}>
            <ArrowLeft style={{ width: 14, height: 14 }} /> Websites
          </Link>
          <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
            <span style={{ fontFamily: "'Outfit',sans-serif", fontSize: '.68rem', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', padding: '4px 12px', borderRadius: 999, background: 'rgba(30,58,95,0.5)', color: '#6FA8FF', border: '1px solid rgba(111,168,255,0.2)' }}>Dashboard · PCU</span>
            <span style={{ fontFamily: "'Outfit',sans-serif", fontSize: '.68rem', padding: '4px 12px', borderRadius: 999, background: 'rgba(212,177,90,0.1)', border: '1px solid rgba(212,177,90,0.2)', color: '#D4B15A' }}>In Development</span>
          </div>
          <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 'clamp(2rem,5.5vw,3.2rem)', fontWeight: 400, fontStyle: 'italic', color: '#D9E6FF', lineHeight: 1.1, marginBottom: 14 }}>Partnership Management Dashboard</h1>
          <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: '.9rem', color: '#8FA8D6', lineHeight: 1.74, maxWidth: 560, marginBottom: 28 }}>
            A data-driven platform for visualizing and managing Petra Christian University&apos;s 2,289+ institutional partnership agreements — complete with workflow pipeline, analytics, and role-based access.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {['Data Visualization', 'UI/UX Design', 'Systems Thinking', 'Next.js', 'Supabase'].map(t => (
              <span key={t} style={{ fontFamily: "'Outfit',sans-serif", fontSize: '.7rem', fontWeight: 600, padding: '5px 14px', borderRadius: 999, background: 'rgba(111,168,255,0.08)', border: '1px solid rgba(111,168,255,0.16)', color: '#8FA8D6' }}>{t}</span>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 900, margin: '0 auto', padding: '48px 24px 80px' }}>
        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 16, marginBottom: 48 }}>
          {[
            { value: '2,289+', label: 'Partnership records', color: '#6FA8FF' },
            { value: '8', label: 'Workflow stages', color: '#D4B15A' },
            { value: '30+', label: 'Partner countries', color: '#6FD88A' },
            { value: 'Real-time', label: 'Data updates', color: '#8FA8D6' },
          ].map(s => (
            <div key={s.label} style={{ background: 'rgba(11,30,58,0.55)', border: `1px solid ${s.color}20`, borderTop: `3px solid ${s.color}`, borderRadius: 16, padding: 20, textAlign: 'center' }}>
              <div style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 800, fontSize: '1.4rem', color: s.color, marginBottom: 4 }}>{s.value}</div>
              <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: '.7rem', color: '#8FA8D6' }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Context */}
        <div style={{ background: 'rgba(11,30,58,0.55)', border: '1px solid rgba(111,168,255,0.12)', borderLeft: '3px solid #6FA8FF', borderRadius: 20, padding: 32, marginBottom: 40 }}>
          <h2 style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 700, fontSize: '1.1rem', color: '#D9E6FF', marginBottom: 12 }}>The Problem</h2>
          <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: '.88rem', color: '#8FA8D6', lineHeight: 1.74 }}>
            PCU&apos;s International Office manages 2,289+ partnership agreements — MoUs, MoAs, and LoIs — spread across spreadsheets, shared drives, and institutional email. Coordinators spend hours each week hunting for agreement status, renewal dates, and contact information. There&apos;s no unified view of the partnership portfolio, no way to track workflow progress, and no early warning system for expiring agreements. This dashboard solves all three.
          </p>
        </div>

        {/* Features */}
        <h2 style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 700, fontSize: '1.2rem', color: '#D9E6FF', marginBottom: 24 }}>Key Features</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
          {features.map(f => (
            <div key={f.title} style={{ background: 'rgba(11,30,58,0.55)', border: '1px solid rgba(111,168,255,0.1)', borderLeft: `3px solid ${f.color}`, borderRadius: 18, padding: 24 }}>
              <div style={{ width: 40, height: 40, borderRadius: 12, background: `${f.color}14`, border: `1px solid ${f.color}24`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                <f.icon style={{ width: 18, height: 18, color: f.color }} />
              </div>
              <h3 style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 700, fontSize: '.95rem', color: '#D9E6FF', marginBottom: 8 }}>{f.title}</h3>
              <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: '.82rem', color: '#8FA8D6', lineHeight: 1.68 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
