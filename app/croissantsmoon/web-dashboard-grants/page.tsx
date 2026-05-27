import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, DollarSign, Calendar, Search, Bell, BarChart2, FileCheck } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Grants Dashboard — CroissantsMoon · Zefanya Kharisma Nugroho',
  description: 'International grants tracking dashboard — centralizing grant applications from submission through to outcome at Petra Christian University.',
}

const features = [
  { icon: DollarSign, color: '#6FD88A', title: 'Grant Pipeline', desc: 'Track every grant application from identification through submission, review, decision, and outcome — with stage timestamps and responsible coordinator.' },
  { icon: Calendar, color: '#6FA8FF', title: 'Deadline Calendar', desc: 'Visual calendar of all grant deadlines with alert zones (30/60/90 days) — filterable by grant type, source country, and target faculty.' },
  { icon: Search, color: '#D4B15A', title: 'Grant Matching', desc: 'Algorithm matching available grants against institutional faculty profiles, research areas, and student demographics — surfacing relevant opportunities proactively.' },
  { icon: Bell, color: '#8FA8D6', title: 'Notification System', desc: 'Automated alerts for approaching deadlines, required document submissions, and decision notifications — sent via email and in-app.' },
  { icon: BarChart2, color: '#6FD88A', title: 'Outcome Analytics', desc: 'Success rate tracking by grant type, faculty, and application year — identifying patterns to improve future applications.' },
  { icon: FileCheck, color: '#6FA8FF', title: 'Document Repository', desc: 'Centralized storage for all supporting documents — institutional letters, financial statements, and past application materials — linked to specific grant records.' },
]

export default function GrantsDashboardPage() {
  return (
    <div style={{ background: '#071126', minHeight: '100vh', color: '#D9E6FF' }}>
      <div style={{ position: 'relative', padding: '60px 24px 48px', borderBottom: '1px solid rgba(111,168,255,0.1)' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <Link href="/croissantsmoon/websites" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 24, padding: '8px 16px', borderRadius: 999, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '.84rem' }}>
            <ArrowLeft style={{ width: 14, height: 14 }} /> Websites
          </Link>
          <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
            <span style={{ fontFamily: "'Outfit',sans-serif", fontSize: '.68rem', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', padding: '4px 12px', borderRadius: 999, background: 'rgba(6,78,59,0.4)', color: '#6FD88A', border: '1px solid rgba(111,216,138,0.2)' }}>Dashboard · PCU</span>
            <span style={{ fontFamily: "'Outfit',sans-serif", fontSize: '.68rem', padding: '4px 12px', borderRadius: 999, background: 'rgba(212,177,90,0.1)', border: '1px solid rgba(212,177,90,0.2)', color: '#D4B15A' }}>In Development</span>
          </div>
          <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 'clamp(2rem,5.5vw,3.2rem)', fontWeight: 400, fontStyle: 'italic', color: '#D9E6FF', lineHeight: 1.1, marginBottom: 14 }}>International Grants Dashboard</h1>
          <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: '.9rem', color: '#8FA8D6', lineHeight: 1.74, maxWidth: 560, marginBottom: 28 }}>
            Centralizing international grant tracking from application through to outcome — real-time status updates, deadline calendar, grant matching engine, and reporting tools for PCU&apos;s international office.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {['Digital Strategy', 'Systems Thinking', 'Full-Stack Development', 'Grant Management'].map(t => (
              <span key={t} style={{ fontFamily: "'Outfit',sans-serif", fontSize: '.7rem', fontWeight: 600, padding: '5px 14px', borderRadius: 999, background: 'rgba(111,216,138,0.08)', border: '1px solid rgba(111,216,138,0.16)', color: '#8FA8D6' }}>{t}</span>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 900, margin: '0 auto', padding: '48px 24px 80px' }}>
        <div style={{ background: 'rgba(11,30,58,0.55)', border: '1px solid rgba(111,216,138,0.12)', borderLeft: '3px solid #6FD88A', borderRadius: 20, padding: 32, marginBottom: 40 }}>
          <h2 style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 700, fontSize: '1.1rem', color: '#D9E6FF', marginBottom: 12 }}>The Problem</h2>
          <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: '.88rem', color: '#8FA8D6', lineHeight: 1.74 }}>
            International grant opportunities are time-sensitive and fragmented — deadlines arrive and pass without institutional awareness, applications are managed in personal spreadsheets, and outcome data is never systematically captured. PCU&apos;s international office needs a single source of truth for all grant activity: what&apos;s available, what&apos;s in progress, what&apos;s been submitted, and what&apos;s been won.
          </p>
        </div>

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
