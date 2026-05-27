'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Moon, Lock, AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

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
    <div className="min-h-screen bg-cm-black grid-bg flex flex-col">
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md animate-slide-up">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-cm-gold/10 border border-cm-gold/20 mb-6">
              <Moon size={22} className="text-cm-gold" />
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

          <div className="bg-cm-surface border border-cm-border rounded-2xl p-8">
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
                  onChange={e => setToken(e.target.value.toUpperCase())}
                  placeholder="CM-XXXX-XXXX"
                  disabled={loading || attempts >= 5}
                  className={cn(
                    'w-full bg-cm-elevated border rounded-xl px-4 py-3.5 text-center text-base font-mono tracking-[0.15em] text-cm-gold placeholder:text-cm-muted',
                    'focus:outline-none focus:ring-1 transition-all duration-200',
                    error
                      ? 'border-red-500/40 focus:ring-red-500/40'
                      : 'border-cm-border focus:ring-cm-gold/40 focus:border-cm-gold/40'
                  )}
                  maxLength={20}
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

              {attempts >= 5 && (
                <p className="text-xs text-cm-subtle text-center">
                  Too many attempts. Please contact CroissantsMoon for assistance.
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

          <p className="text-center text-xs text-cm-muted mt-6">
            This is a private, confidential proposal.
            Not intended for public distribution.
          </p>
        </div>
      </div>
    </div>
  )
}
