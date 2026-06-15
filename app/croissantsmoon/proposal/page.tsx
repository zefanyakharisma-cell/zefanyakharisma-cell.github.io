import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import { Button } from '@/components/ui/Button'
import { ProposalShowcaseGrid } from '@/components/proposal/ProposalShowcaseGrid'
import StarField from '@/components/cm/StarField'
import ConstellationSVG from '@/components/cm/ConstellationSVG'
import type { Proposal } from '@/types'
import Link from 'next/link'
import Image from 'next/image'
import { LayoutDashboard, Sparkles, FileText, Moon, Mail, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Proposals — CroissantsMoon',
  description: 'A curated collection of strategic proposals crafted by CroissantsMoon.',
  robots: { index: false, follow: false },
}

// ── Celestial palette ──
const AURORA = '#6FA8FF'
const GOLD   = '#D4B15A'

function rgba(hex: string, a: number): string {
  const h = hex.replace('#', '')
  return `rgba(${parseInt(h.slice(0, 2), 16)},${parseInt(h.slice(2, 4), 16)},${parseInt(h.slice(4, 6), 16)},${a})`
}

const CONTACT_EMAIL = 'contact@croissantsmoon.studio'

async function getProposals() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('proposals')
    .select('*, lead:leads(organization, contact_person)')
    .order('created_at', { ascending: false })
  return data ?? []
}

function isPubliclyViewable(p: Proposal): boolean {
  if (p.status !== 'active') return false
  if (p.token_status !== 'active') return false
  if (p.expires_at && new Date(p.expires_at) < new Date()) return false
  return true
}

export default async function ProposalPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const isAdmin = !!user

  const all = await getProposals()
  // Public sees only live proposals so every card leads to a working gate.
  const proposals = (isAdmin ? all : all.filter(isPubliclyViewable)) as Proposal[]

  const totalViews = proposals.reduce((s, p) => s + (p.views ?? 0), 0)
  const stats = [
    { label: 'Proposals', value: proposals.length },
    { label: 'Total Views', value: totalViews },
    { label: 'Avg. Turnaround', value: '14d' },
  ]

  return (
    <div
      className="min-h-screen relative text-cm-text"
      style={{ background: 'linear-gradient(160deg, #030712 0%, #071126 55%, #0a1a35 100%)' }}
    >
      {/* Stars + aurora */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <StarField count={90} />
      </div>
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{ background: `radial-gradient(ellipse 70% 50% at 50% 0%, ${rgba(AURORA, 0.08)} 0%, transparent 60%)` }}
      />

      {/* Brand bar */}
      <nav
        className="sticky top-0 z-40"
        style={{
          background: 'rgba(3,7,18,0.72)',
          backdropFilter: 'blur(24px) saturate(1.4)',
          WebkitBackdropFilter: 'blur(24px) saturate(1.4)',
          borderBottom: `1px solid ${rgba(AURORA, 0.07)}`,
        }}
      >
        <div className="max-w-6xl mx-auto px-6 sm:px-8 h-14 flex items-center justify-between">
          <Link href="/croissantsmoon" className="flex items-center gap-2.5">
            <Image src="/croissantsmoon/cm-logo-circle.png" alt="CroissantsMoon" width={24} height={24} className="w-6 h-6 rounded-md" />
            <span className="text-sm font-medium" style={{ color: '#D9E6FF' }}>CroissantsMoon</span>
          </Link>
          {isAdmin ? (
            <Link href="/croissantsmoon/proposals">
              <Button variant="primary" size="sm"><LayoutDashboard size={14} /> Studio</Button>
            </Link>
          ) : (
            <Link href="/croissantsmoon/login?next=/croissantsmoon/proposals" className="text-xs transition-colors hover:text-cm-text" style={{ color: rgba('#8FA8D6', 0.6) }}>
              Admin
            </Link>
          )}
        </div>
      </nav>

      <main className="relative z-10">
        {/* ── Hero ───────────────────────────────────────────── */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none opacity-70">
            <ConstellationSVG w={1100} h={520} seed={7} />
          </div>
          <div className="relative max-w-6xl mx-auto px-6 sm:px-8 pt-20 sm:pt-28 pb-12 animate-cm-fade-in">
            <div className="max-w-2xl">
              <div
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] uppercase tracking-[0.18em] mb-6"
                style={{ color: GOLD, background: rgba(GOLD, 0.07), border: `1px solid ${rgba(GOLD, 0.2)}` }}
              >
                <Sparkles size={11} /> Proposal Portal
              </div>
              <h1 className="font-serif font-light text-4xl sm:text-6xl leading-[1.05] mb-5" style={{ color: '#EAF1FF' }}>
                Strategic proposals,
                <br />
                <span className="italic" style={{ color: GOLD }}>crafted under the moon.</span>
              </h1>
              <p className="text-base sm:text-lg leading-relaxed" style={{ color: rgba('#8FA8D6', 0.8) }}>
                A curated collection by CroissantsMoon. Select a proposal to open its private
                preview — you&apos;ll need the access token shared with you.
              </p>
            </div>

            {/* Stats strip */}
            <div className="flex flex-wrap gap-8 sm:gap-12 mt-12">
              {stats.map(s => (
                <div key={s.label}>
                  <div className="font-serif font-light text-3xl sm:text-4xl" style={{ color: '#EAF1FF' }}>{s.value}</div>
                  <div className="text-[11px] uppercase tracking-[0.16em] mt-1" style={{ color: rgba('#8FA8D6', 0.55) }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Grid ───────────────────────────────────────────── */}
        <section className="max-w-6xl mx-auto px-6 sm:px-8 py-10">
          {proposals.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5" style={{ background: rgba(AURORA, 0.06), border: `1px solid ${rgba(AURORA, 0.15)}` }}>
                <FileText size={20} style={{ color: rgba('#8FA8D6', 0.7) }} />
              </div>
              <p className="text-sm" style={{ color: rgba('#8FA8D6', 0.65) }}>No proposals available right now.</p>
            </div>
          ) : (
            <ProposalShowcaseGrid proposals={proposals} isAdmin={isAdmin} />
          )}
        </section>

        {/* ── CTA band ───────────────────────────────────────── */}
        <section className="max-w-6xl mx-auto px-6 sm:px-8 py-16">
          <div
            className="relative overflow-hidden rounded-3xl px-8 sm:px-14 py-14 sm:py-20 text-center"
            style={{
              background: `linear-gradient(135deg, ${rgba(AURORA, 0.08)} 0%, ${rgba(GOLD, 0.06)} 100%), rgba(6,11,26,0.7)`,
              border: `1px solid ${rgba(GOLD, 0.18)}`,
            }}
          >
            <div className="absolute inset-0 pointer-events-none opacity-50">
              <ConstellationSVG w={900} h={420} seed={3} />
            </div>
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: `radial-gradient(ellipse 60% 50% at 50% 50%, ${rgba(GOLD, 0.1)} 0%, transparent 70%)` }}
            />
            <div className="relative max-w-xl mx-auto">
              <Moon size={26} style={{ color: GOLD }} className="mx-auto mb-6" />
              <h2 className="font-serif font-light text-3xl sm:text-4xl leading-tight mb-4" style={{ color: '#EAF1FF' }}>
                Don&apos;t have a proposal yet?
              </h2>
              <p className="text-base leading-relaxed mb-9" style={{ color: rgba('#8FA8D6', 0.78) }}>
                Tell us about your project and we&apos;ll craft a tailored proposal — strategy,
                design direction, and investment, all in one private portal.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent('New project enquiry')}`}
                  className="inline-flex items-center gap-2 px-6 h-12 rounded-xl text-sm font-medium transition-all hover:brightness-110"
                  style={{ background: GOLD, color: '#030712' }}
                >
                  <Mail size={15} /> Start a conversation
                </a>
                <Link
                  href="/croissantsmoon"
                  className="inline-flex items-center gap-2 px-6 h-12 rounded-xl text-sm font-medium transition-colors hover:bg-white/5"
                  style={{ color: '#D9E6FF', border: `1px solid ${rgba(AURORA, 0.22)}` }}
                >
                  Explore the studio <ArrowRight size={15} />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── Footer ─────────────────────────────────────────── */}
        <footer style={{ borderTop: `1px solid ${rgba(AURORA, 0.07)}` }}>
          <div className="max-w-6xl mx-auto px-6 sm:px-8 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <Image src="/croissantsmoon/cm-logo-circle.png" alt="CroissantsMoon" width={20} height={20} className="w-5 h-5 rounded" />
              <span className="text-xs" style={{ color: rgba('#8FA8D6', 0.6) }}>
                © {new Date().getFullYear()} CroissantsMoon · Crafted under the moon
              </span>
            </div>
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-xs transition-colors hover:text-cm-text" style={{ color: rgba('#8FA8D6', 0.6) }}>
              {CONTACT_EMAIL}
            </a>
          </div>
        </footer>
      </main>
    </div>
  )
}
