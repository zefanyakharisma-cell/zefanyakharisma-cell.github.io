'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  LayoutDashboard, Smartphone, Edit3, GitBranch, Filter, Calendar, Split,
  Layers, Database, Hash, Type, Zap, Wind, Lock, Send, BarChart2, Archive,
  PieChart, Users, Moon, MapPin, Clock, AlertCircle, Search, Download,
  Shield, FileText, UploadCloud, Layout, Bookmark, Cpu, Map, ExternalLink,
  ArrowLeft, ArrowRight, Monitor, Play, Github, ImageIcon, Table, Grid,
  Workflow, GitMerge, SunMoon, TrendingUp, Radio, Inbox, Keyboard, UserCheck,
  Globe, Mail, BookOpen, Database as DbIcon, Wifi, Activity,
} from 'lucide-react'
import StarField from '@/components/cm/StarField'
import AstronautFloat from '@/components/cm/AstronautFloat'

// ── Types ─────────────────────────────────────────────────────────────────────

interface ProjectPoint {
  icon: string
  title: string
  desc: string
}

interface ProjectFeature {
  icon: string
  title: string
  desc: string
}

interface ProjectProblem {
  icon: string
  title: string
  tag: string
  desc: string
}

interface ProjectSolution {
  icon: string
  title: string
  tag: string
  desc: string
}

export interface WebProject {
  title: string
  tagline: string
  year: string
  status: string
  github: string
  live: string
  tech: string[]
  background: string
  purpose: string
  features: ProjectFeature[]
  problems: ProjectProblem[]
  solutions: ProjectSolution[]
  uiux: { desc: string; points: ProjectPoint[] }
  frontend: { desc: string; points: ProjectPoint[] }
  backend: { desc: string; points: ProjectPoint[] }
}

// ── Icon map ──────────────────────────────────────────────────────────────────

const ICONS: Record<string, React.ComponentType<{ style?: React.CSSProperties }>> = {
  'layout-dashboard': LayoutDashboard,
  'smartphone':       Smartphone,
  'edit-3':           Edit3,
  'git-branch':       GitBranch,
  'filter':           Filter,
  'calendar':         Calendar,
  'split':            Split,
  'layers':           Layers,
  'database':         Database,
  'hash':             Hash,
  'type':             Type,
  'zap':              Zap,
  'wind':             Wind,
  'lock':             Lock,
  'send':             Send,
  'bar-chart-2':      BarChart2,
  'archive':          Archive,
  'pie-chart':        PieChart,
  'users':            Users,
  'moon':             Moon,
  'map-pin':          MapPin,
  'clock':            Clock,
  'alert-circle':     AlertCircle,
  'search':           Search,
  'download':         Download,
  'shield':           Shield,
  'file-text':        FileText,
  'upload-cloud':     UploadCloud,
  'layout':           Layout,
  'bookmark':         Bookmark,
  'cpu':              Cpu,
  'map':              Map,
  'external-link':    ExternalLink,
  'arrow-left':       ArrowLeft,
  'monitor':          Monitor,
  'play':             Play,
  'github':           Github,
  'image':            ImageIcon,
  'table':            Table,
  'grid':             Grid,
  'workflow':         Workflow,
  'git-merge':        GitMerge,
  'sun-moon':         SunMoon,
  'trending-up':      TrendingUp,
  'radio':            Radio,
  'inbox':            Inbox,
  'keyboard':         Keyboard,
  'user-check':       UserCheck,
  'globe':            Globe,
  'mail':             Mail,
  'book-open':        BookOpen,
  'play-circle':      Play,
  'bar-chart':        BarChart2,
  'wi-fi':            Wifi,
  'activity':         Activity,
}

function Icon({ name, style }: { name: string; style?: React.CSSProperties }) {
  const C = ICONS[name] || Filter
  return <C style={style} />
}

// ── Sub-components ────────────────────────────────────────────────────────────

function SectionLabel({ text, color }: { text: string; color: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '1.5rem' }}>
      <span style={{ width: 3, height: 22, borderRadius: 2, background: color, flexShrink: 0, display: 'block' }} />
      <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: '.62rem', fontWeight: 600, letterSpacing: '.2em', textTransform: 'uppercase', color, margin: 0 }}>{text}</p>
    </div>
  )
}

function Divider() {
  return <hr style={{ border: 'none', borderTop: '1px solid rgba(111,168,255,0.08)', margin: 'clamp(2rem,5vh,3.5rem) 0' }} />
}

function PointCard({ pt, accentColor, iconBg, iconBorder }: { pt: ProjectPoint; accentColor: string; iconBg: string; iconBorder: string }) {
  return (
    <div className="wp-card" style={{ background: 'rgba(11,30,58,0.7)', borderRadius: 14, padding: 22, border: '1px solid rgba(111,168,255,0.14)', backdropFilter: 'blur(12px)', boxShadow: '0 2px 12px rgba(3,7,18,0.3)', display: 'flex', gap: 14, alignItems: 'flex-start' }}>
      <div style={{ width: 36, height: 36, borderRadius: 10, flexShrink: 0, background: iconBg, border: `1px solid ${iconBorder}`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 2 }}>
        <Icon name={pt.icon} style={{ width: 16, height: 16, color: accentColor }} />
      </div>
      <div>
        <h4 style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: '1rem', fontWeight: 600, color: '#D9E6FF', lineHeight: 1.25, marginBottom: 6 }}>{pt.title}</h4>
        <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: '.83rem', lineHeight: 1.65, color: '#8FA8D6' }}>{pt.desc}</p>
      </div>
    </div>
  )
}

function PointsGrid({ points, accentColor, iconBg, iconBorder }: { points: ProjectPoint[]; accentColor: string; iconBg: string; iconBorder: string }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(260px,1fr))', gap: 16, marginTop: '1.5rem' }}>
      {points.map(pt => <PointCard key={pt.title} pt={pt} accentColor={accentColor} iconBg={iconBg} iconBorder={iconBorder} />)}
    </div>
  )
}

// ── LivePreview (client-side iframe loader) ───────────────────────────────────

function LivePreview({ project }: { project: WebProject }) {
  const [loaded, setLoaded] = useState(false)
  const [loading, setLoading] = useState(false)

  return (
    <div style={{ borderRadius: 16, overflow: 'hidden', border: '1px solid rgba(111,168,255,0.14)', boxShadow: '0 8px 40px rgba(3,7,18,0.4)' }}>
      {/* Browser chrome */}
      <div style={{ background: 'rgba(11,30,58,0.8)', padding: '9px 14px', borderBottom: '1px solid rgba(111,168,255,0.12)', display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{ display: 'flex', gap: 5, flexShrink: 0 }}>
          <span style={{ width: 9, height: 9, borderRadius: '50%', background: '#FF5F57', display: 'block' }} />
          <span style={{ width: 9, height: 9, borderRadius: '50%', background: '#FEBC2E', display: 'block' }} />
          <span style={{ width: 9, height: 9, borderRadius: '50%', background: '#28C840', display: 'block' }} />
        </div>
        <div style={{ flex: 1, background: 'rgba(7,17,38,0.6)', borderRadius: 5, padding: '4px 10px', fontFamily: "'Outfit',sans-serif", fontSize: '.66rem', color: '#8FA8D6', border: '1px solid rgba(111,168,255,0.1)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{project.live}</div>
        <a href={project.live} target="_blank" rel="noopener noreferrer" style={{ flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', width: 26, height: 26, borderRadius: 6, background: 'rgba(212,177,90,0.12)', color: '#D4B15A', textDecoration: 'none' }} title="Open in new tab">
          <ExternalLink style={{ width: 12, height: 12 }} />
        </a>
      </div>
      {/* Preview area */}
      <div style={{ position: 'relative', height: 520, background: '#0B1E3A' }}>
        {!loaded && (
          <div style={{ position: 'absolute', inset: 0, zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 18, background: '#071126', fontFamily: "'Outfit',sans-serif", textAlign: 'center', padding: 32 }}>
            <Monitor style={{ width: 32, height: 32, color: '#8FA8D6', opacity: .4 }} />
            <p style={{ fontSize: '.875rem', color: '#8FA8D6', lineHeight: 1.6, maxWidth: 300, margin: 0 }}>
              Preview of <strong style={{ color: '#D9E6FF' }}>{project.title}</strong>
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center' }}>
              <button
                onClick={() => setLoading(true)}
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: "'Outfit',sans-serif", fontSize: '.85rem', fontWeight: 600, padding: '11px 24px', borderRadius: 999, background: '#D4B15A', color: '#071126', border: 'none', cursor: 'pointer' }}
              >
                <Play style={{ width: 14, height: 14 }} /> {loading ? 'Loading…' : 'Load Preview'}
              </button>
              <a href={project.live} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: "'Outfit',sans-serif", fontSize: '.85rem', fontWeight: 600, padding: '10px 22px', borderRadius: 999, background: 'transparent', color: '#D9E6FF', textDecoration: 'none', border: '1px solid rgba(217,230,255,0.2)' }}>
                <ExternalLink style={{ width: 14, height: 14 }} /> Open Live Site
              </a>
            </div>
          </div>
        )}
        {loading && (
          <iframe
            src={project.live}
            title={`${project.title} — live preview`}
            style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
            onLoad={() => { setLoaded(true) }}
          />
        )}
      </div>
    </div>
  )
}

// ── Main component ────────────────────────────────────────────────────────────

export default function WebProjectDetail({ project, backHref = '/croissantsmoon' }: { project: WebProject; backHref?: string }) {
  const statusColor  = project.status === 'Live' ? '#4CAF87' : '#D4B15A'
  const statusBg     = project.status === 'Live' ? 'rgba(45,180,79,0.15)' : 'rgba(212,177,90,0.15)'
  const statusBorder = project.status === 'Live' ? 'rgba(45,180,79,0.25)' : 'rgba(212,177,90,0.25)'

  return (
    <div style={{ background: '#071126', minHeight: '100vh' }}>
      {/* Hero */}
      <div style={{ background: 'linear-gradient(160deg,#030712 0%,#071126 50%,#0B1E3A 100%)', padding: 'clamp(5rem,10vh,7rem) 0 0', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}><StarField count={90} /></div>
        <AstronautFloat img={3} style={{ position: 'absolute', right: '8%',  top: '12%'    }} size={130} dur={26} del={0}   rot={14}  x1={12}  y1={-20} x2={-10} y2={16}  />
        <AstronautFloat img={5} style={{ position: 'absolute', left: '3%',   top: '25%'    }} size={105} dur={33} del={-10} rot={-10} x1={-12} y1={14}  x2={10}  y2={-10} />
        <AstronautFloat img={4} style={{ position: 'absolute', left: '6%',   bottom: '12%' }} size={88}  dur={28} del={-18} rot={8}   x1={10}  y1={-12} x2={-8}  y2={10}  />
        <AstronautFloat img={3} style={{ position: 'absolute', right: '5%',  bottom: '15%' }} size={95}  dur={38} del={-6}  rot={-16} x1={-10} y1={16}  x2={8}   y2={-12} />
        <AstronautFloat img={5} style={{ position: 'absolute', right: '18%', top: '8%'     }} size={72}  dur={22} del={-14} rot={5}   x1={8}   y1={-10} x2={-6}  y2={8}   />
        {/* Gradient overlay */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(ellipse at 80% 20%,rgba(212,177,90,0.07),transparent 55%),radial-gradient(ellipse at 5% 80%,rgba(111,168,255,0.06),transparent 50%)' }} />
        {/* Crescent watermark */}
        <div style={{ position: 'absolute', right: 'clamp(1rem,6vw,5rem)', top: 'clamp(2rem,8vh,5rem)', opacity: .13, pointerEvents: 'none' }}>
          <svg width="140" height="140" viewBox="0 0 140 140" fill="none">
            <circle cx="70" cy="70" r="60" fill="#D9E6FF"/>
            <circle cx="95" cy="50" r="55" fill="#071126"/>
          </svg>
        </div>
        {/* Content */}
        <div style={{ maxWidth: 760, margin: '0 auto', padding: '0 clamp(1.25rem,5vw,3rem)', position: 'relative', zIndex: 1 }}>
          <Link href={backHref} style={{ display: 'inline-flex', alignItems: 'center', gap: 7, fontFamily: "'Outfit',sans-serif", fontSize: '.78rem', fontWeight: 500, color: 'rgba(143,168,214,0.5)', textDecoration: 'none', marginBottom: 'clamp(1.5rem,4vh,2.5rem)' }}>
            <ArrowLeft style={{ width: 14, height: 14 }} /> CroissantsMoon
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
            <span style={{ fontFamily: "'Outfit',sans-serif", fontSize: '.68rem', fontWeight: 600, letterSpacing: '.1em', textTransform: 'uppercase', padding: '3px 11px', borderRadius: 999, background: statusBg, color: statusColor, border: `1px solid ${statusBorder}` }}>{project.status}</span>
            <span style={{ fontFamily: "'Outfit',sans-serif", fontSize: '.68rem', color: 'rgba(217,230,255,0.35)', letterSpacing: '.06em' }}>{project.year}</span>
          </div>
          <h1 style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: 'clamp(2.2rem,5.5vw,3.5rem)', fontWeight: 600, color: '#D9E6FF', letterSpacing: '-.02em', lineHeight: 1.1, marginBottom: 16, textShadow: '0 0 60px rgba(111,168,255,0.18)' }}>{project.title}</h1>
          <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: 'clamp(.9rem,2vw,1.05rem)', color: 'rgba(217,230,255,0.6)', lineHeight: 1.6, marginBottom: 'clamp(1.5rem,4vh,2.5rem)', maxWidth: 520 }}>{project.tagline}</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 'clamp(1.75rem,4vh,2.75rem)' }}>
            {project.tech.map(t => (
              <span key={t} style={{ fontFamily: "'Outfit',sans-serif", fontSize: '.72rem', fontWeight: 500, padding: '4px 12px', borderRadius: 999, background: 'rgba(212,177,90,0.1)', color: '#8FA8D6', border: '1px solid rgba(212,177,90,0.2)' }}>{t}</span>
            ))}
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, paddingBottom: 'clamp(2rem,6vh,4rem)' }}>
            <a href={project.live} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: "'Outfit',sans-serif", fontSize: '.85rem', fontWeight: 600, padding: '11px 24px', borderRadius: 999, background: '#D4B15A', color: '#071126', textDecoration: 'none', boxShadow: '0 0 18px rgba(212,177,90,0.3)' }}>
              <ExternalLink style={{ width: 14, height: 14 }} /> Open Live Site
            </a>
            <a href={project.github} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: "'Outfit',sans-serif", fontSize: '.85rem', fontWeight: 600, padding: '10px 22px', borderRadius: 999, background: 'transparent', color: '#D9E6FF', textDecoration: 'none', border: '1px solid rgba(217,230,255,0.2)' }}>
              <Github style={{ width: 14, height: 14 }} /> View on GitHub
            </a>
          </div>
        </div>
      </div>

      {/* Body */}
      <div style={{ background: '#071126' }}>
        <div style={{ maxWidth: 760, margin: '0 auto', padding: '0 clamp(1.25rem,5vw,3rem)' }}>

          {/* Background */}
          <section style={{ padding: 'clamp(2.5rem,6vh,4rem) 0 0' }}>
            <SectionLabel text="Background" color="#D4B15A" />
            <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: '.9375rem', lineHeight: 1.75, color: '#8FA8D6' }}>{project.background}</p>
          </section>

          <Divider />

          {/* Purpose */}
          <section>
            <SectionLabel text="Purpose" color="#6FA8FF" />
            <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: '.9375rem', lineHeight: 1.75, color: '#8FA8D6' }}>{project.purpose}</p>
          </section>

          <Divider />

          {/* Problems */}
          <section>
            <SectionLabel text="Problems It Solves" color="#FF6B6B" />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: 16 }}>
              {project.problems.map(pr => (
                <div key={pr.title} className="wp-card" style={{ background: 'rgba(11,30,58,0.7)', borderRadius: 14, padding: 24, border: '1px solid rgba(111,168,255,0.14)', backdropFilter: 'blur(12px)', boxShadow: '0 2px 12px rgba(3,7,18,0.3)' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, marginBottom: 12 }}>
                    <div style={{ width: 36, height: 36, borderRadius: 10, flexShrink: 0, background: 'rgba(255,80,60,0.1)', border: '1px solid rgba(255,80,60,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Icon name={pr.icon} style={{ width: 16, height: 16, color: '#FF6B6B' }} />
                    </div>
                    <div>
                      <span style={{ fontFamily: "'Outfit',sans-serif", fontSize: '.67rem', fontWeight: 600, letterSpacing: '.08em', textTransform: 'uppercase', color: '#FF6B6B', display: 'block', marginBottom: 4 }}>{pr.tag}</span>
                      <h4 style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: '1.05rem', fontWeight: 600, color: '#D9E6FF', lineHeight: 1.25 }}>{pr.title}</h4>
                    </div>
                  </div>
                  <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: '.84rem', lineHeight: 1.65, color: '#8FA8D6' }}>{pr.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <Divider />

          {/* Features */}
          <section>
            <SectionLabel text="Features Available" color="#6FA8FF" />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: 16 }}>
              {project.features.map(f => (
                <div key={f.title} className="wp-card" style={{ background: 'rgba(11,30,58,0.7)', borderRadius: 14, padding: 22, border: '1px solid rgba(111,168,255,0.14)', backdropFilter: 'blur(12px)', boxShadow: '0 2px 12px rgba(3,7,18,0.3)', display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, flexShrink: 0, background: 'rgba(111,168,255,0.1)', border: '1px solid rgba(111,168,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 2 }}>
                    <Icon name={f.icon} style={{ width: 16, height: 16, color: '#6FA8FF' }} />
                  </div>
                  <div>
                    <h4 style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: '1rem', fontWeight: 600, color: '#D9E6FF', lineHeight: 1.25, marginBottom: 6 }}>{f.title}</h4>
                    <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: '.83rem', lineHeight: 1.65, color: '#8FA8D6' }}>{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <Divider />

          {/* Solutions */}
          <section>
            <SectionLabel text="How It Was Handled" color="#D4B15A" />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: 16 }}>
              {project.solutions.map(s => (
                <div key={s.title} className="wp-card" style={{ background: 'rgba(11,30,58,0.7)', borderRadius: 14, padding: 24, border: '1px solid rgba(111,168,255,0.14)', backdropFilter: 'blur(12px)', boxShadow: '0 2px 12px rgba(3,7,18,0.3)' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, marginBottom: 12 }}>
                    <div style={{ width: 36, height: 36, borderRadius: 10, flexShrink: 0, background: 'rgba(212,177,90,0.1)', border: '1px solid rgba(212,177,90,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Icon name={s.icon} style={{ width: 16, height: 16, color: '#D4B15A' }} />
                    </div>
                    <div>
                      <span style={{ fontFamily: "'Outfit',sans-serif", fontSize: '.67rem', fontWeight: 600, letterSpacing: '.08em', textTransform: 'uppercase', color: '#D4B15A', display: 'block', marginBottom: 4 }}>{s.tag}</span>
                      <h4 style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: '1.05rem', fontWeight: 600, color: '#D9E6FF', lineHeight: 1.25 }}>{s.title}</h4>
                    </div>
                  </div>
                  <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: '.84rem', lineHeight: 1.65, color: '#8FA8D6' }}>{s.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <Divider />

          {/* UI/UX */}
          <section>
            <SectionLabel text="UI / UX Design" color="#A0C4FF" />
            <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: '.9375rem', lineHeight: 1.75, color: '#8FA8D6', marginBottom: 0 }}>{project.uiux.desc}</p>
            <PointsGrid points={project.uiux.points} accentColor="#A0C4FF" iconBg="rgba(160,196,255,0.1)" iconBorder="rgba(160,196,255,0.2)" />
          </section>

          <Divider />

          {/* Frontend */}
          <section>
            <SectionLabel text="Frontend" color="#6FA8FF" />
            <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: '.9375rem', lineHeight: 1.75, color: '#8FA8D6', marginBottom: 0 }}>{project.frontend.desc}</p>
            <PointsGrid points={project.frontend.points} accentColor="#6FA8FF" iconBg="rgba(111,168,255,0.1)" iconBorder="rgba(111,168,255,0.2)" />
          </section>

          <Divider />

          {/* Backend */}
          <section>
            <SectionLabel text="Backend & Database" color="#4CAF87" />
            <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: '.9375rem', lineHeight: 1.75, color: '#8FA8D6', marginBottom: 0 }}>{project.backend.desc}</p>
            <PointsGrid points={project.backend.points} accentColor="#4CAF87" iconBg="rgba(76,175,135,0.1)" iconBorder="rgba(76,175,135,0.2)" />
          </section>

          <Divider />

          {/* Live Preview */}
          <section>
            <SectionLabel text="Live Preview" color="#8FA8D6" />
            <LivePreview project={project} />
          </section>

        </div>
      </div>

      {/* CTA */}
      <div style={{ background: 'linear-gradient(160deg,#071126 0%,#0B1E3A 60%,#071126 100%)', padding: 'clamp(4rem,8vh,6rem) 24px', position: 'relative', overflow: 'hidden', marginTop: 'clamp(3rem,6vh,5rem)' }}>
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}><StarField count={35} /></div>
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(ellipse at 50% 50%,rgba(212,177,90,0.06),transparent 60%)' }} />
        <div style={{ maxWidth: 520, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: '.62rem', fontWeight: 600, letterSpacing: '.22em', textTransform: 'uppercase', color: '#D4B15A', marginBottom: '1rem' }}>Work Together</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: 'clamp(1.8rem,4.5vw,2.8rem)', fontWeight: 400, fontStyle: 'italic', color: '#D9E6FF', lineHeight: 1.1, marginBottom: '1rem' }}>Want something like this built?</h2>
          <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: '.9rem', lineHeight: 1.72, color: '#8FA8D6', marginBottom: '2rem' }}>
            CroissantsMoon builds premium digital presences — portfolios, institutional platforms, and dashboards — with the same level of craft you see here.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
            <Link href="/croissantsmoon/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: "'Outfit',sans-serif", fontSize: '.875rem', fontWeight: 600, padding: '13px 28px', borderRadius: 999, background: '#D4B15A', color: '#071126', textDecoration: 'none', boxShadow: '0 0 22px rgba(212,177,90,0.35)' }}>
              Start a Project <ArrowRight style={{ width: 14, height: 14 }} />
            </Link>
            <Link href="/croissantsmoon" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: "'Outfit',sans-serif", fontSize: '.875rem', fontWeight: 600, padding: '12px 26px', borderRadius: 999, background: 'transparent', color: '#D9E6FF', textDecoration: 'none', border: '1px solid rgba(217,230,255,0.2)' }}>
              <ArrowLeft style={{ width: 14, height: 14 }} /> Back to CroissantsMoon
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
