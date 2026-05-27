import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Skillset — Zefanya Kharisma Nugroho',
  description: 'Technical and professional skills — from international education coordination to full-stack web development.',
}

const skillGroups = [
  {
    label: 'International Education',
    color: '#1E3A5F',
    skills: [
      { name: 'Student Mobility Coordination', level: 95 },
      { name: 'Institutional Partnership Management', level: 90 },
      { name: 'MoU / MoA Review & Drafting', level: 85 },
      { name: 'International Student Welfare', level: 90 },
      { name: 'Program & Budget Management', level: 88 },
      { name: 'Cross-Cultural Facilitation', level: 92 },
    ],
  },
  {
    label: 'Web Development',
    color: '#4A6B8A',
    skills: [
      { name: 'Next.js / React', level: 85 },
      { name: 'TypeScript', level: 80 },
      { name: 'Tailwind CSS', level: 88 },
      { name: 'Supabase / PostgreSQL', level: 78 },
      { name: 'UI/UX Design (Figma)', level: 85 },
      { name: 'Vanilla JS / HTML / CSS', level: 90 },
    ],
  },
  {
    label: 'Languages',
    color: '#8B7355',
    skills: [
      { name: 'Indonesian (Native)', level: 100 },
      { name: 'English (Professional — C1)', level: 92 },
      { name: 'Japanese (Beginner)', level: 25 },
    ],
  },
  {
    label: 'Tools & Platforms',
    color: '#064E3B',
    skills: [
      { name: 'Microsoft Office Suite', level: 92 },
      { name: 'Google Workspace', level: 90 },
      { name: 'Figma', level: 85 },
      { name: 'Vercel / GitHub', level: 80 },
      { name: 'Canva', level: 88 },
      { name: 'Notion', level: 85 },
    ],
  },
]

export default function SkillsetPage() {
  return (
    <div style={{ background: '#F2F2F7', minHeight: '100vh' }}>
      <div style={{ background: 'linear-gradient(135deg,#1E3A5F 0%,#2563EB 60%,#38BDF8 100%)', padding: '52px 24px 44px' }}>
        <div className="max-w-4xl mx-auto px-5">
          <Link href="/about-overview" className="inline-flex items-center gap-2 mb-7 px-3.5 py-1.5 rounded-full text-sm font-medium" style={{ background: 'rgba(255,255,255,0.14)', backdropFilter: 'blur(12px)', color: 'rgba(255,255,255,0.9)', textDecoration: 'none', border: '1px solid rgba(255,255,255,0.18)' }}>
            <ArrowLeft style={{ width: 14, height: 14 }} /> Back
          </Link>
          <span className="inline-block px-3.5 py-1 rounded-full text-xs font-semibold mb-4 uppercase tracking-wider" style={{ background: 'rgba(255,255,255,0.14)', color: 'rgba(255,255,255,0.9)', border: '1px solid rgba(255,255,255,0.12)' }}>About Me</span>
          <h1 className="font-heading font-bold mb-3 text-white" style={{ fontSize: 'clamp(1.9rem,6vw,3rem)', letterSpacing: '-.02em', lineHeight: 1.1 }}>Skillset</h1>
          <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.7)' }}>Technical proficiencies and professional competencies built through real-world application.</p>
        </div>
      </div>

      <div style={{ padding: '72px 24px' }}>
        <div className="max-w-4xl mx-auto space-y-10">
          {skillGroups.map(group => (
            <div key={group.label} className="card p-8" style={{ borderLeft: `4px solid ${group.color}` }}>
              <div className="flex items-center gap-3 mb-6">
                <span className="accent-line" style={{ background: group.color }} />
                <h2 className="font-heading font-bold text-lg" style={{ color: group.color }}>{group.label}</h2>
              </div>
              <div className="space-y-5">
                {group.skills.map(skill => (
                  <div key={skill.name}>
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-sm font-medium" style={{ color: '#1C1C1E' }}>{skill.name}</span>
                      <span style={{ fontSize: '.72rem', fontWeight: 700, color: group.color }}>{skill.level}%</span>
                    </div>
                    <div style={{ height: 6, borderRadius: 999, background: 'rgba(28,28,30,0.08)', overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${skill.level}%`, borderRadius: 999, background: `linear-gradient(to right, ${group.color}, ${group.color}CC)` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
