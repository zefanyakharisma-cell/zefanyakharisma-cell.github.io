'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Moon, Lock, AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Props {
  slug: string
  orgName: string
}

function formatToken(raw: string): string {
  const stripped = raw.replace(/[^A-Z0-9]/g, '').slice(0, 10)
  if (stripped.length <= 2) return stripped
  if (stripped.length <= 6) return `${stripped.slice(0, 2)}-${stripped.slice(2)}`
  return `${stripped.slice(0, 2)}-${stripped.slice(2, 6)}-${stripped.slice(6)}`
}

export function ProposalGate({ slug, orgName }: Props) {
  const [token, setToken] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [attempts, setAttempts] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

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
          data.reason === 'expired' ? 'This proposal has expired.'
          : data.reason === 'revoked' ? 'Access has been revoked.'
          : data.reason === 'archived' ? 'This proposal is no longer available.'
          : 'Invalid access token. Please try again.'
        )
      }
    } catch {
      setError('Connection error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-cm-black flex flex-col relative overflow-hidden">
      {/* Atmospheric celestial background */}
      <div className="absolute inset-0 pointer-events-none select-none">
        {/* Primary nebula — violet crown */}
        <div
          className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full blur-3xl"
          style={{ background: 'radial-gradient(ellipse at center, rgba(124,110,247,0.18) 0%, rgba(124,110,247,0.04) 55%, transparent 70%)' }}
        />
        {/* Secondary warm glow — lower right */}
        <div
          className="absolute bottom-0 right-[-5%] w-[450px] h-[350px] rounded-full blur-3xl"
          style={{ background: 'radial-gradient(ellipse at center, rgba(201,168,76,0.1) 0%, transparent 65%)' }}
        />
        {/* Subtle left accent */}
        <div
          className="absolute top-1/2 -left-20 w-[300px] h-[300px] rounded-full blur-3xl"
          style={{ background: 'radial-gradient(ellipse at center, rgba(124,110,247,0.07) 0%, transparent 70%)' }}
        />
        {/* Grid substrate */}
        <div className="absolute inset-0 grid-bg opacity-50" />
        {/* Scattered stars — varied sizes so they read as a starfield */}
        <div className="absolute top-[10%] left-[18%] w-1 h-1 bg-white/60 rounded-full" />
        <div className="absolute top-[7%] right-[22%] w-0.5 h-0.5 bg-white/45 rounded-full" />
        <div className="absolute top-[25%] left-[7%] w-1 h-1 bg-cm-gold/70 rounded-full" />
        <div className="absolute top-[18%] right-[38%] w-0.5 h-0.5 bg-cm-accent/60 rounded-full" />
        <div className="absolute top-[55%] right-[10%] w-1 h-1 bg-white/50 rounded-full" />
        <div className="absolute top-[70%] left-[28%] w-0.5 h-0.5 bg-white/55 rounded-full" />
        <div className="absolute top-[40%] left-[3%] w-0.5 h-0.5 bg-cm-gold/60 rounded-full" />
        <div className="absolute top-[80%] right-[30%] w-0.5 h-0.5 bg-white/40 rounded-full" />
        <div className="absolute top-[32%] right-[4%] w-1 h-1 bg-cm-accent/55 rounded-full" />
        <div className="absolute top-[88%] left-[12%] w-0.5 h-0.5 bg-white/45 rounded-full" />
        <div className="absolute top-[15%] left-[50%] w-0.5 h-0.5 bg-white/35 rounded-full" />
        <div className="absolute top-[62%] right-[48%] w-0.5 h-0.5 bg-cm-gold/50 rounded-full" />
        <div className="absolute top-[48%] left-[72%] w-0.5 h-0.5 bg-white/45 rounded-full" />
        {/* A few brighter anchor stars */}
        <div className="absolute top-[5%] left-[60%] w-1.5 h-1.5 bg-white/30 rounded-full blur-[1px]" />
        <div className="absolute top-[90%] right-[15%] w-1.5 h-1.5 bg-cm-gold/25 rounded-full blur-[1px]" />
      </div>

      <div className="flex-1 flex items-center justify-center p-8 relative z-10">
        <div className="w-full max-w-md animate-slide-up">
          <div className="text-center mb-10">
            {/* Moon icon with orbital rings */}
            <div className="relative inline-flex items-center justify-center mb-6">
              <div className="absolute w-20 h-20 rounded-full border border-cm-gold/10 animate-pulse-slow" />
              <div className="absolute w-[88px] h-[88px] rounded-full border border-cm-accent/5" />
              <div
                className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-cm-gold/10 border border-cm-gold/20"
                style={{ boxShadow: '0 0 24px rgba(201,168,76,0.12), 0 0 60px rgba(124,110,247,0.08)' }}
              >
                <Moon size={22} className="text-cm-gold" />
              </div>
            </div>
            <p className="text-xs font-medium text-cm-gold uppercase tracking-[0.2em] mb-3">CroissantsMoon</p>
            <h1 className="text-2xl font-serif font-light text-cm-white mb-3">
              Private Proposal Portal
            </h1>
            <p className="text-sm text-cm-subtle leading-relaxed">
              A confidential proposal has been prepared for{' '}
              <span className="text-cm-text font-medium">{orgName}</span>.
              Enter your access token to continue.
            </p>
          </div>

          <div
            className="bg-cm-surface/80 border border-cm-border rounded-2xl p-8 backdrop-blur-sm"
            style={{ boxShadow: '0 0 40px rgba(124,110,247,0.06), 0 1px 3px rgba(0,0,0,0.4)' }}
          >
            <div className="flex items-center gap-2 mb-6">
              <Lock size={13} className="text-cm-subtle" />
              <span className="text-xs text-cm-subtle uppercase tracking-widest">Secure Access</span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-cm-subtle uppercase tracking-widest mb-2">
                  Access Token
                </label>
                <input
                  ref={inputRef}
                  type="text"
                  value={token}
                  onChange={e => setToken(formatToken(e.target.value.toUpperCase()))}
                  placeholder="CM-XXXX-XXXX"
                  disabled={loading || attempts >= 5}
                  className={cn(
                    'w-full bg-cm-elevated border rounded-xl px-4 py-3.5 text-center text-base font-mono tracking-[0.15em] text-cm-gold placeholder:text-cm-muted',
                    'focus:outline-none focus:ring-1 transition-all duration-200',
                    error
                      ? 'border-red-500/40 focus:ring-red-500/40'
                      : 'border-cm-border focus:ring-cm-gold/40 focus:border-cm-gold/40'
                  )}
                  maxLength={12}
                  autoComplete="off"
                  spellCheck={false}
                />
              </div>

              {error && (
                <div className="flex items-center gap-2 text-sm text-red-400 bg-red-400/5 border border-red-400/10 rounded-lg px-3 py-2.5">
                  <AlertCircle size={13} className="flex-shrink-0" />
                  {error}
                </div>
              )}

              {attempts >= 2 && attempts < 5 && (
                <p className="text-xs text-amber-400/60 text-center">
                  {5 - attempts} attempt{5 - attempts !== 1 ? 's' : ''} remaining
                </p>
              )}

              {attempts >= 5 && (
                <p className="text-xs text-cm-subtle text-center">
                  Too many attempts.{' '}
                  <a
                    href="mailto:contact@croissantsmoon.studio"
                    className="text-cm-gold/70 hover:text-cm-gold underline transition-colors"
                  >
                    Contact CroissantsMoon
                  </a>{' '}
                  for assistance.
                </p>
              )}

              <button
                type="submit"
                disabled={!token.trim() || loading || attempts >= 5}
                className={cn(
                  'w-full py-3.5 rounded-xl text-sm font-medium transition-all duration-200',
                  'bg-cm-gold/10 border border-cm-gold/20 text-cm-gold',
                  'hover:bg-cm-gold/20 hover:border-cm-gold/40',
                  'disabled:opacity-40 disabled:cursor-not-allowed',
                  'focus:outline-none focus:ring-1 focus:ring-cm-gold/40'
                )}
                style={{ boxShadow: token.trim() && !loading ? '0 0 20px rgba(201,168,76,0.08)' : undefined }}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-4 h-4 border-2 border-cm-gold border-t-transparent rounded-full animate-spin" />
                    Verifying...
                  </span>
                ) : 'Access Proposal'}
              </button>
            </form>
          </div>

          <div className="flex items-center justify-center gap-3 mt-8">
            <div className="h-px w-8 bg-cm-border" />
            <span className="text-cm-gold/30 text-xs">✦</span>
            <p className="text-center text-xs text-cm-muted">
              Private &amp; confidential. Not for distribution.
            </p>
            <span className="text-cm-gold/30 text-xs">✦</span>
            <div className="h-px w-8 bg-cm-border" />
          </div>
        </div>
      </div>
    </div>
  )
}
