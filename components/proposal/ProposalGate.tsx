'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Moon, Lock, AlertCircle, Sparkles } from 'lucide-react'
import StarField from '@/components/cm/StarField'
import ConstellationSVG from '@/components/cm/ConstellationSVG'

interface Props {
  slug: string
  orgName: string
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
          data.reason === 'expired'  ? 'This proposal has expired.' :
          data.reason === 'revoked'  ? 'Access has been revoked.' :
          data.reason === 'archived' ? 'This proposal is no longer available.' :
          'Invalid access token. Please check and try again.'
        )
      }
    } catch {
      setError('Connection error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="min-h-screen relative flex flex-col items-center justify-center p-6"
      style={{ background: 'linear-gradient(160deg, #030712 0%, #071126 55%, #0a1a35 100%)' }}
    >
      {/* Stars */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <StarField count={90} />
      </div>

      {/* Constellation decorations */}
      <div className="absolute top-0 right-0 w-[500px] h-[300px] pointer-events-none opacity-45">
        <ConstellationSVG w={500} h={300} seed={7} />
      </div>
      <div className="absolute bottom-0 left-0 w-[380px] h-[260px] pointer-events-none opacity-25">
        <ConstellationSVG w={380} h={260} seed={13} />
      </div>

      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 40%, rgba(111,168,255,0.04) 0%, transparent 70%)' }}
      />

      {/* Content */}
      <div className="relative z-10 w-full max-w-md">

        {/* Brand mark */}
        <div className="text-center mb-10">
          <div
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6"
            style={{
              background: 'rgba(212,177,90,0.07)',
              border: '1px solid rgba(212,177,90,0.22)',
              boxShadow: '0 0 40px rgba(212,177,90,0.14), 0 0 80px rgba(212,177,90,0.06)',
            }}
          >
            <Moon size={26} style={{ color: '#D4B15A' }} />
          </div>

          <p
            className="text-[10px] font-semibold uppercase mb-4"
            style={{ letterSpacing: '0.3em', color: 'rgba(212,177,90,0.65)' }}
          >
            CroissantsMoon Studio
          </p>

          <h1
            className="font-serif font-light text-[2rem] leading-tight mb-4"
            style={{ color: '#D9E6FF' }}
          >
            Private Proposal<br />Portal
          </h1>

          <p className="text-sm leading-relaxed" style={{ color: 'rgba(143,168,214,0.75)' }}>
            A confidential proposal has been prepared<br />
            exclusively for{' '}
            <span style={{ color: '#D9E6FF', fontWeight: 500 }}>{orgName}</span>.
          </p>
        </div>

        {/* Card */}
        <div
          className="rounded-2xl p-8"
          style={{
            background: 'rgba(11,30,58,0.55)',
            backdropFilter: 'blur(20px) saturate(1.5)',
            WebkitBackdropFilter: 'blur(20px) saturate(1.5)',
            border: '1px solid rgba(111,168,255,0.14)',
            boxShadow: '0 24px 64px rgba(3,7,18,0.5)',
          }}
        >
          <div className="flex items-center gap-2 mb-6">
            <Lock size={11} style={{ color: 'rgba(212,177,90,0.45)' }} />
            <span
              className="text-[10px] font-medium uppercase"
              style={{ letterSpacing: '0.2em', color: 'rgba(212,177,90,0.45)' }}
            >
              Secure Access Required
            </span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="cm-access-token"
                className="block text-[10px] font-semibold uppercase mb-2.5"
                style={{ letterSpacing: '0.15em', color: 'rgba(143,168,214,0.55)' }}
              >
                Access Token
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
                  border: error
                    ? '1px solid rgba(248,113,113,0.4)'
                    : '1px solid rgba(212,177,90,0.22)',
                  color: '#D4B15A',
                  letterSpacing: '0.15em',
                  boxShadow: error ? 'none' : 'inset 0 1px 0 rgba(212,177,90,0.04)',
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
              <p className="text-xs text-center" style={{ color: 'rgba(143,168,214,0.45)' }}>
                Too many attempts. Please contact CroissantsMoon for assistance.
              </p>
            )}

            <button
              type="submit"
              disabled={!token.trim() || loading || attempts >= 5}
              className="w-full py-3.5 rounded-xl text-sm font-medium transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
              style={{
                background: 'rgba(212,177,90,0.1)',
                border: '1px solid rgba(212,177,90,0.25)',
                color: '#D4B15A',
              }}
              onMouseEnter={e => {
                if (!(e.currentTarget as HTMLButtonElement).disabled) {
                  Object.assign((e.currentTarget as HTMLButtonElement).style, {
                    background: 'rgba(212,177,90,0.18)',
                    borderColor: 'rgba(212,177,90,0.4)',
                  })
                }
              }}
              onMouseLeave={e => {
                Object.assign((e.currentTarget as HTMLButtonElement).style, {
                  background: 'rgba(212,177,90,0.1)',
                  borderColor: 'rgba(212,177,90,0.25)',
                })
              }}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span
                    className="w-4 h-4 border-2 rounded-full animate-spin"
                    style={{ borderColor: '#D4B15A', borderTopColor: 'transparent' }}
                  />
                  Verifying...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <Sparkles size={14} />
                  Access Proposal
                </span>
              )}
            </button>
          </form>
        </div>

        <p
          className="text-center text-[11px] mt-6 leading-relaxed"
          style={{ color: 'rgba(111,168,255,0.28)' }}
        >
          This is a private, confidential proposal.<br />
          Not intended for public distribution.
        </p>
      </div>
    </div>
  )
}
