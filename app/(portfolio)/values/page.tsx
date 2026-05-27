import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Heart, Lightbulb, Globe2, Users, Zap, Star } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Values — Zefanya Kharisma Nugroho',
  description: 'Core values and professional philosophy guiding my work in international education and digital development.',
}

const values = [
  {
    icon: Globe2,
    color: '#1E3A5F',
    title: 'Internationalism',
    quote: 'Every border crossed is a perspective gained.',
    desc: 'I believe in the transformative power of international exchange — not just as an academic program, but as a way of building the human capacity for empathy, adaptability, and global citizenship. My work is grounded in a genuine commitment to making international education more accessible and meaningful.',
  },
  {
    icon: Heart,
    color: '#8B7355',
    title: 'Care & Human-Centeredness',
    quote: 'Systems serve people. People don\'t serve systems.',
    desc: 'Whether designing a web interface or managing a student\'s arrival logistics, I start with the person on the other end. Good work makes someone\'s day easier, clearer, or more meaningful. I measure success by the experience of the people I serve — not just the metrics on a report.',
  },
  {
    icon: Lightbulb,
    color: '#4A6B8A',
    title: 'Curiosity & Continuous Learning',
    quote: 'The best practitioners are always students.',
    desc: 'From teaching myself Next.js to researching bilateral scholarship programs, I pursue learning as a professional discipline. I believe that staying genuinely curious — not just technically updated — is what separates good practitioners from great ones.',
  },
  {
    icon: Zap,
    color: '#064E3B',
    title: 'Craft & Quality',
    quote: 'Details are not the small things. Details are everything.',
    desc: 'I care about doing things properly — the right font weight, the clear clause in the MoU, the accurate program description in the welcome handbook. Quality is a choice made at every level of granularity, and it\'s one I make deliberately.',
  },
  {
    icon: Users,
    color: '#D4B15A',
    title: 'Collaboration & Trust',
    quote: 'Complex problems need clear relationships.',
    desc: 'International education runs on institutional trust. I invest in relationships — with partner universities, with student communities, with colleagues — because long-term coordination requires the kind of goodwill that only comes from consistent, reliable engagement over time.',
  },
  {
    icon: Star,
    color: '#2563EB',
    title: 'Integration & Systems Thinking',
    quote: 'The best solution connects what\'s already there.',
    desc: 'I\'m drawn to work that connects domains others treat as separate — combining international education management with digital design, or applying systems thinking from one context to solve problems in another. Integration is where the most interesting value lives.',
  },
]

export default function ValuesPage() {
  return (
    <div style={{ background: '#F2F2F7', minHeight: '100vh' }}>
      <div style={{ background: 'linear-gradient(135deg,#1E3A5F 0%,#2563EB 60%,#38BDF8 100%)', padding: '52px 24px 44px' }}>
        <div className="max-w-4xl mx-auto px-5">
          <Link href="/about-overview" className="inline-flex items-center gap-2 mb-7 px-3.5 py-1.5 rounded-full text-sm font-medium" style={{ background: 'rgba(255,255,255,0.14)', backdropFilter: 'blur(12px)', color: 'rgba(255,255,255,0.9)', textDecoration: 'none', border: '1px solid rgba(255,255,255,0.18)' }}>
            <ArrowLeft style={{ width: 14, height: 14 }} /> Back
          </Link>
          <span className="inline-block px-3.5 py-1 rounded-full text-xs font-semibold mb-4 uppercase tracking-wider" style={{ background: 'rgba(255,255,255,0.14)', color: 'rgba(255,255,255,0.9)', border: '1px solid rgba(255,255,255,0.12)' }}>About Me</span>
          <h1 className="font-heading font-bold mb-3 text-white" style={{ fontSize: 'clamp(1.9rem,6vw,3rem)', letterSpacing: '-.02em', lineHeight: 1.1 }}>Values &amp; Philosophy</h1>
          <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.7)' }}>The principles that guide how I approach work, collaboration, and professional growth.</p>
        </div>
      </div>

      <div style={{ padding: '72px 24px' }}>
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6">
            {values.map(v => (
              <div key={v.title} className="card p-8" style={{ borderLeft: `4px solid ${v.color}` }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ background: `${v.color}12` }}>
                  <v.icon style={{ width: 22, height: 22, color: v.color }} />
                </div>
                <h2 className="font-heading font-bold text-lg mb-3" style={{ color: '#1C1C1E' }}>{v.title}</h2>
                <blockquote className="text-sm italic mb-4" style={{ color: v.color, fontFamily: 'Georgia, serif', lineHeight: 1.55, borderLeft: `2px solid ${v.color}40`, paddingLeft: 12 }}>
                  &ldquo;{v.quote}&rdquo;
                </blockquote>
                <p className="text-sm leading-relaxed" style={{ color: '#5C5C5C' }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
