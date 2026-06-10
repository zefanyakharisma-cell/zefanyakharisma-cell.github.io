'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Moon, Lock, AlertCircle, Sparkles, Quote, ArrowDown, Check } from 'lucide-react'
import StarField from '@/components/cm/StarField'
import ConstellationSVG from '@/components/cm/ConstellationSVG'
import { LangToggle } from '@/components/cm/LangToggle'
import { GATE_UI, type CMLocale } from '@/lib/cm/i18n'
import type { ProposalTeaser } from '@/lib/proposal/teaser'

interface Props {
  slug: string
  teaser: ProposalTeaser
}

// ── Palette (matches the full ProposalPortal) ─────────────────
const AURORA = '#6FA8FF'
const GOLD   = '#D4B15A'
const VIOLET = '#C9A9FF'
const SKY    = '#A0C4FF'
const MINT   = '#7DC9A0'
const HIGHLIGHT_COLORS = [AURORA, VIOLET, SKY, MINT, GOLD]

function rgba(hex: string, a: number): string {
  const h = hex.replace('#', '')
  return `rgba(${parseInt(h.slice(0, 2), 16)},${parseInt(h.slice(2, 4), 16)},${parseInt(h.slice(4, 6), 16)},${a})`
}

export function ProposalGate({ slug, teaser }: Props) {
  const [locale, setLocale] = useState<CMLocale>('en')
  const t = GATE_UI[locale]
  const [token, setToken] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [attempts, setAttempts] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  function scrollToUnlock() {
    document.getElementById('cm-unlock')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    setTimeout(() => inputRef.current?.focus(), 500)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!token.trim() || attempts >= 5) return
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`/croissantsmoon/api/tokens/validate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug, token: token.trim().toUpperCase() }),
      })
      const data = await res.json()
      if (data.valid) {
        router.refresh()
      } else {
        setAttempts(a => a + 1)
        setError(
          data.reason === 'expired'  ? t.errExpired :
          data.reason === 'revoked'  ? t.errRevoked :
          data.reason === 'archived' ? t.errArchived :
          t.errInvalid
        )
      }
    } catch {
      setError(t.errConnection)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="min-h-screen relative"
      style={{ background: 'linear-gradient(160deg, #030712 0%, #071126 55%, #0a1a35 100%)' }}
    >
      {/* Stars */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <StarField count={110} />
      </div>

      {/* Top brand bar */}
      <nav
        className="sticky top-0 z-40"
        style={{
          background: 'rgba(3,7,18,0.72)',
          backdropFilter: 'blur(24px) saturate(1.4)',
          WebkitBackdropFilter: 'blur(24px) saturate(1.4)',
          borderBottom: '1px solid rgba(111,168,255,0.07)',
        }}
      >
        <div className="max-w-5xl mx-auto px-8 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Moon size={15} style={{ color: GOLD }} />
            <span className="text-sm font-medium" style={{ color: '#D9E6FF' }}>CroissantsMoon</span>
          </div>
          <div className="flex items-center gap-4">
            <LangToggle locale={locale} onChange={setLocale} compact />
            <div className="flex items-center gap-2">
              <Lock size={11} style={{ color: rgba(GOLD, 0.5) }} />
              <span className="text-xs" style={{ color: rgba('#8FA8D6', 0.55) }}>{t.preview}</span>
            </div>
          </div>
        </div>
      </nav>

      <main className="relative z-10">

        {/* ── Hero teaser ─────────────────────────────────────── */}
        <section className="relative min-h-[88vh] flex flex-col items-center justify-center px-8 py-24 text-center overflow-hidden">
          <div className="absolute inset-0 pointer-events-none opacity-90">
            <ConstellationSVG w={900} h={520} seed={4} />
          </div>
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: `radial-gradient(ellipse 75% 55% at 50% 45%, ${rgba(AURORA, 0.07)} 0%, transparent 65%)` }}
          />
          <div className="relative z-10 max-w-4xl">
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8"
              style={{
                background: rgba(GOLD, 0.07),
                border: `1px solid ${rgba(GOLD, 0.22)}`,
                boxShadow: `0 0 40px ${rgba(GOLD, 0.1)}`,
              }}
            >
              <Sparkles size={12} style={{ color: GOLD }} />
              <span className="text-[10px] font-semibold uppercase" style={{ letterSpacing: '0.28em', color: rgba(GOLD, 0.85) }}>
                {t.confidentialProposal}
              </span>
            </div>

            <p className="text-sm mb-6" style={{ color: rgba('#8FA8D6', 0.7) }}>
              {t.preparedForPrefix}{' '}
              <span style={{ color: '#D9E6FF', fontWeight: 500 }}>{teaser.orgName}</span>
            </p>

            <h1
              className="font-serif font-light leading-[1.08] text-balance mb-8"
              style={{ fontSize: 'clamp(2.4rem, 6vw, 5rem)', color: '#D9E6FF' }}
            >
              {teaser.headline}
            </h1>

            <div className="flex items-center justify-center gap-4 mb-8">
              <div style={{ width: 60, height: 1, background: `linear-gradient(to right, transparent, ${rgba(GOLD, 0.55)})` }} />
              <div style={{ width: 5, height: 5, borderRadius: '50%', background: rgba(GOLD, 0.8) }} />
              <div style={{ width: 60, height: 1, background: `linear-gradient(to left, transparent, ${rgba(GOLD, 0.55)})` }} />
            </div>

            {teaser.subheadline && (
              <p className="text-lg md:text-xl leading-relaxed max-w-2xl mx-auto text-balance mb-12" style={{ color: rgba('#8FA8D6', 0.78) }}>
                {teaser.subheadline}
              </p>
            )}

            <button
              onClick={scrollToUnlock}
              className="cm-glow-btn inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl text-sm font-medium"
              style={{ background: rgba(GOLD, 0.1), border: `1px solid ${rgba(GOLD, 0.3)}`, color: GOLD }}
            >
              <Lock size={14} />
              {t.unlockFull}
            </button>
          </div>

          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2" style={{ opacity: 0.35 }}>
            <ArrowDown size={16} style={{ color: rgba('#8FA8D6', 0.7) }} className="animate-bounce" />
            <span className="text-[9px] uppercase" style={{ letterSpacing: '0.2em', color: rgba('#8FA8D6', 0.7) }}>{t.preview}</span>
          </div>
        </section>

        {/* ── Greeting pull-quote ─────────────────────────────── */}
        {teaser.greeting && (
          <section className="py-16 px-8 max-w-5xl mx-auto w-full">
            <div className="grid md:grid-cols-[140px_1fr] gap-8 md:gap-12 items-start">
              <div className="flex md:flex-col items-center md:items-start gap-3 md:pt-3">
                <Quote size={20} style={{ color: rgba(GOLD, 0.5) }} />
                <span className="text-[10px] font-semibold uppercase" style={{ letterSpacing: '0.24em', color: rgba(GOLD, 0.55) }}>
                  {t.aNoteForYou}
                </span>
              </div>
              <p
                className="font-serif font-light whitespace-pre-line"
                style={{ fontSize: 'clamp(1.25rem, 2.4vw, 1.75rem)', lineHeight: 1.55, color: rgba('#D9E6FF', 0.85) }}
              >
                {teaser.greeting}
              </p>
            </div>
          </section>
        )}

        {/* ── What's inside ───────────────────────────────────── */}
        {teaser.highlights.length > 0 && (
          <section className="py-16 px-8 max-w-5xl mx-auto w-full">
            <div className="text-center mb-10">
              <span className="text-[11px] font-semibold uppercase" style={{ letterSpacing: '0.28em', color: rgba(AURORA, 0.8) }}>
                {t.whatsInside}
              </span>
              <h2 className="font-serif font-light mt-4" style={{ fontSize: 'clamp(1.6rem, 3.2vw, 2.4rem)', color: '#D9E6FF' }}>
                {t.whatsInsideHeading}
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {teaser.highlights.map((h, i) => {
                const c = HIGHLIGHT_COLORS[i % HIGHLIGHT_COLORS.length]
                return (
                  <div
                    key={i}
                    className="rounded-2xl p-5 flex items-center gap-4"
                    style={{
                      background: 'rgba(11,30,58,0.46)',
                      border: '1px solid rgba(111,168,255,0.1)',
                      backdropFilter: 'blur(16px) saturate(1.4)',
                      WebkitBackdropFilter: 'blur(16px) saturate(1.4)',
                    }}
                  >
                    <span
                      className="w-9 h-9 rounded-lg flex items-center justify-center font-mono text-xs font-semibold flex-shrink-0"
                      style={{ background: rgba(c, 0.1), border: `1px solid ${rgba(c, 0.25)}`, color: c }}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div className="min-w-0">
                      <p className="text-[10px] font-semibold uppercase mb-1" style={{ letterSpacing: '0.16em', color: rgba(c, 0.8) }}>
                        {h.eyebrow}
                      </p>
                      <p className="text-sm font-medium truncate" style={{ color: rgba('#D9E6FF', 0.85) }}>{h.title}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </section>
        )}

        {/* ── Feature highlights (a taste, rest locked) ───────── */}
        {teaser.features.length > 0 && (
          <section className="py-16 px-8 max-w-5xl mx-auto w-full">
            <div className="mb-8 text-center">
              <span className="text-[11px] font-semibold uppercase" style={{ letterSpacing: '0.28em', color: rgba(SKY, 0.8) }}>
                {t.aTaste}
              </span>
            </div>
            <div className="grid md:grid-cols-3 gap-4 mb-5">
              {teaser.features.map((feature, i) => {
                const c = HIGHLIGHT_COLORS[i % HIGHLIGHT_COLORS.length]
                return (
                  <div
                    key={i}
                    className="rounded-2xl p-5"
                    style={{
                      background: 'rgba(11,30,58,0.46)',
                      border: '1px solid rgba(111,168,255,0.1)',
                      backdropFilter: 'blur(16px) saturate(1.4)',
                      WebkitBackdropFilter: 'blur(16px) saturate(1.4)',
                    }}
                  >
                    <div className="flex items-center gap-2.5 mb-4">
                      <span className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: rgba(c, 0.1), border: `1px solid ${rgba(c, 0.25)}` }}>
                        <Check size={13} style={{ color: c }} />
                      </span>
                      <div className="flex-1 h-px" style={{ background: rgba(c, 0.12) }} />
                    </div>
                    <p className="text-sm leading-relaxed" style={{ color: rgba('#D9E6FF', 0.74) }}>{feature}</p>
                  </div>
                )
              })}
            </div>
            {teaser.lockedFeatureCount > 0 && (
              <div
                className="rounded-2xl px-6 py-4 flex items-center justify-center gap-2.5 text-sm"
                style={{ background: rgba(GOLD, 0.05), border: `1px dashed ${rgba(GOLD, 0.22)}`, color: rgba(GOLD, 0.85) }}
              >
                <Lock size={13} />
                {t.moreCapabilities(teaser.lockedFeatureCount)}
              </div>
            )}
          </section>
        )}

        {/* ── Locked detail strip (pricing / timeline / demo) ─── */}
        {(teaser.hasPricing || teaser.hasTimeline || teaser.hasDemo) && (
          <section className="py-8 px-8 max-w-5xl mx-auto w-full">
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                teaser.hasPricing  && { label: t.investment, accent: GOLD },
                teaser.hasTimeline && { label: t.timeline,   accent: MINT },
                teaser.hasDemo     && { label: t.livePreview, accent: AURORA },
              ].filter(Boolean).map((item, i) => {
                const it = item as { label: string; accent: string }
                return (
                  <div
                    key={i}
                    className="relative rounded-2xl p-6 text-center overflow-hidden"
                    style={{ background: 'rgba(11,30,58,0.4)', border: '1px solid rgba(111,168,255,0.1)' }}
                  >
                    <div className="flex flex-col items-center gap-3">
                      <span className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: rgba(it.accent, 0.08), border: `1px solid ${rgba(it.accent, 0.25)}` }}>
                        <Lock size={14} style={{ color: it.accent }} />
                      </span>
                      <p className="text-[11px] font-semibold uppercase" style={{ letterSpacing: '0.2em', color: rgba(it.accent, 0.85) }}>
                        {it.label}
                      </p>
                      {/* Redacted shimmer bars */}
                      <div className="w-full space-y-1.5 mt-1" style={{ filter: 'blur(3px)', opacity: 0.5 }}>
                        <div className="h-2 rounded-full mx-auto" style={{ width: '70%', background: rgba(it.accent, 0.3) }} />
                        <div className="h-2 rounded-full mx-auto" style={{ width: '50%', background: rgba(it.accent, 0.2) }} />
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </section>
        )}

        {/* ── Unlock card (token form) ────────────────────────── */}
        <section id="cm-unlock" className="py-20 px-8 scroll-mt-20">
          <div className="relative w-full max-w-md mx-auto">
            <div className="absolute -top-16 right-0 w-[320px] h-[200px] pointer-events-none opacity-30">
              <ConstellationSVG w={320} h={200} seed={13} />
            </div>

            <div className="text-center mb-8 relative z-10">
              <div
                className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6"
                style={{
                  background: rgba(GOLD, 0.07),
                  border: `1px solid ${rgba(GOLD, 0.22)}`,
                  boxShadow: `0 0 40px ${rgba(GOLD, 0.14)}, 0 0 80px ${rgba(GOLD, 0.06)}`,
                }}
              >
                <Lock size={24} style={{ color: GOLD }} />
              </div>
              <h2 className="font-serif font-light text-[2rem] leading-tight mb-4 text-balance" style={{ color: '#D9E6FF' }}>
                {t.accessFull}
              </h2>
              <p className="text-sm leading-relaxed text-balance" style={{ color: rgba('#8FA8D6', 0.75) }}>
                {t.enterTokenPre}{' '}
                <span style={{ color: '#D9E6FF', fontWeight: 500 }}>{teaser.contactPerson ?? teaser.orgName}</span>{' '}
                {t.enterTokenPost}
              </p>
            </div>

            <div
              className="rounded-2xl p-8 relative z-10"
              style={{
                background: 'rgba(11,30,58,0.55)',
                backdropFilter: 'blur(20px) saturate(1.5)',
                WebkitBackdropFilter: 'blur(20px) saturate(1.5)',
                border: '1px solid rgba(111,168,255,0.14)',
                boxShadow: '0 24px 64px rgba(3,7,18,0.5)',
              }}
            >
              <div className="flex items-center gap-2 mb-6">
                <Lock size={11} style={{ color: rgba(GOLD, 0.45) }} />
                <span className="text-[10px] font-medium uppercase" style={{ letterSpacing: '0.2em', color: rgba(GOLD, 0.45) }}>
                  {t.secureAccess}
                </span>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label
                    htmlFor="cm-access-token"
                    className="block text-[10px] font-semibold uppercase mb-2.5"
                    style={{ letterSpacing: '0.15em', color: rgba('#8FA8D6', 0.55) }}
                  >
                    {t.accessToken}
                  </label>
                  <input
                    ref={inputRef}
                    id="cm-access-token"
                    type="text"
                    value={token}
                    onChange={e => setToken(e.target.value.toUpperCase())}
                    placeholder="CM-XXXX-XXXX"
                    disabled={loading || attempts >= 5}
                    aria-invalid={error ? true : undefined}
                    aria-describedby={error ? 'cm-token-error' : undefined}
                    className="w-full rounded-xl px-4 py-3.5 text-center text-base font-mono focus:outline-none transition-all duration-200 placeholder:opacity-25 disabled:opacity-40 disabled:cursor-not-allowed"
                    style={{
                      background: 'rgba(3,7,18,0.55)',
                      border: error ? '1px solid rgba(248,113,113,0.4)' : `1px solid ${rgba(GOLD, 0.22)}`,
                      color: GOLD,
                      letterSpacing: '0.15em',
                      boxShadow: error ? 'none' : `inset 0 1px 0 ${rgba(GOLD, 0.04)}`,
                    }}
                    maxLength={20}
                    autoComplete="off"
                    spellCheck={false}
                  />
                </div>

                {error && (
                  <div
                    id="cm-token-error"
                    role="alert"
                    className="flex items-center gap-2 text-sm rounded-lg px-3 py-2.5"
                    style={{
                      color: 'rgba(248,113,113,0.85)',
                      background: 'rgba(248,113,113,0.06)',
                      border: '1px solid rgba(248,113,113,0.12)',
                    }}
                  >
                    <AlertCircle size={13} className="flex-shrink-0" />
                    {error}
                  </div>
                )}

                {attempts >= 5 && (
                  <p className="text-xs text-center" style={{ color: rgba('#8FA8D6', 0.45) }}>
                    {t.tooManyAttempts}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={!token.trim() || loading || attempts >= 5}
                  className="w-full py-3.5 rounded-xl text-sm font-medium transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
                  style={{ background: rgba(GOLD, 0.1), border: `1px solid ${rgba(GOLD, 0.25)}`, color: GOLD }}
                  onMouseEnter={e => {
                    if (!(e.currentTarget as HTMLButtonElement).disabled) {
                      Object.assign((e.currentTarget as HTMLButtonElement).style, {
                        background: rgba(GOLD, 0.18),
                        borderColor: rgba(GOLD, 0.4),
                      })
                    }
                  }}
                  onMouseLeave={e => {
                    Object.assign((e.currentTarget as HTMLButtonElement).style, {
                      background: rgba(GOLD, 0.1),
                      borderColor: rgba(GOLD, 0.25),
                    })
                  }}
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="w-4 h-4 border-2 rounded-full animate-spin" style={{ borderColor: GOLD, borderTopColor: 'transparent' }} />
                      {t.verifying}
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <Sparkles size={14} />
                      {t.accessProposal}
                    </span>
                  )}
                </button>
              </form>
            </div>

            <p className="text-center text-[11px] mt-6 leading-relaxed relative z-10" style={{ color: 'rgba(111,168,255,0.28)' }}>
              {t.privateFootnote1}<br />
              {t.privateFootnote2}
            </p>
          </div>
        </section>
      </main>

      <footer className="relative z-10 py-12 px-8 text-center mt-4" style={{ borderTop: '1px solid rgba(111,168,255,0.07)' }}>
        <Moon size={14} className="mx-auto mb-3" style={{ color: rgba(GOLD, 0.25) }} />
        <p className="text-[11px] leading-relaxed" style={{ color: 'rgba(111,168,255,0.28)' }}>
          {t.footerPrefix}{' '}
          <span style={{ color: rgba('#8FA8D6', 0.45) }}>{teaser.orgName}</span>{' '}
          {t.footerSuffix}
        </p>
      </footer>
    </div>
  )
}
