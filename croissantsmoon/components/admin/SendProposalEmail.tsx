'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { CheckCircle, Mail, Sparkles, ArrowRight, RotateCcw } from 'lucide-react'
import Link from 'next/link'

interface Props {
  proposal: {
    id: string
    slug: string
    title: string
    token: string
    content: unknown
  }
  lead: {
    id: string
    organization: string
    contact_person: string
    email: string
    website: string | null
    industry: string | null
    notes: string | null
  }
}

type Stage = 'idle' | 'generating' | 'preview' | 'sending' | 'sent'

export function SendProposalEmail({ proposal, lead }: Props) {
  const [stage, setStage] = useState<Stage>('idle')
  const [subject, setSubject] = useState('')
  const [body, setBody] = useState('')
  const [error, setError] = useState('')

  async function generate() {
    setError('')
    setStage('generating')
    try {
      const res = await fetch('/croissantsmoon/api/email/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ proposal, lead }),
      })
      const data = await res.json()
      if (!res.ok || data.error) throw new Error(data.error ?? 'Generation failed')
      setSubject(data.subject)
      setBody(data.body)
      setStage('preview')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Generation failed')
      setStage('idle')
    }
  }

  async function send() {
    setError('')
    setStage('sending')
    try {
      const res = await fetch('/croissantsmoon/api/email/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ to: lead.email, subject, body, proposalId: proposal.id, leadId: lead.id }),
      })
      const data = await res.json()
      if (!res.ok || data.error) throw new Error(data.error ?? 'Send failed')
      setStage('sent')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send email')
      setStage('preview')
    }
  }

  return (
    <div className="space-y-5">
      {/* Created confirmation */}
      <div className="flex items-center gap-3 bg-green-500/5 border border-green-500/20 rounded-xl px-4 py-3">
        <CheckCircle size={15} className="text-green-400 flex-shrink-0" />
        <div className="min-w-0">
          <p className="text-sm font-medium text-cm-white">Proposal created</p>
          <p className="text-xs text-cm-subtle truncate">{proposal.title}</p>
        </div>
      </div>

      {stage === 'sent' ? (
        <div className="text-center py-6 space-y-4">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-cm-gold/10 border border-cm-gold/20 mb-1">
            <Mail size={18} className="text-cm-gold" />
          </div>
          <div>
            <p className="text-sm font-semibold text-cm-white">Email sent</p>
            <p className="text-xs text-cm-subtle mt-0.5">Delivered to {lead.email}</p>
          </div>
          <Link href={`/proposals/${proposal.id}`}>
            <Button variant="primary">View Proposal <ArrowRight size={13} /></Button>
          </Link>
        </div>
      ) : stage === 'idle' ? (
        <div className="space-y-4">
          <div>
            <h2 className="text-base font-semibold text-cm-white">Send introduction email</h2>
            <p className="text-sm text-cm-subtle mt-1">
              Claude will write a personalized email for{' '}
              <span className="text-cm-text font-medium">{lead.contact_person}</span> at {lead.organization} — including your intro, identified problems, and the proposal link.
            </p>
          </div>
          {error && <p className="text-sm text-red-400">{error}</p>}
          <div className="flex items-center gap-3">
            <Button variant="gold" onClick={generate}>
              <Sparkles size={13} /> Generate Email
            </Button>
            <Link
              href={`/proposals/${proposal.id}`}
              className="text-sm text-cm-subtle hover:text-cm-text transition-colors flex items-center gap-1"
            >
              Skip <ArrowRight size={12} />
            </Link>
          </div>
        </div>
      ) : stage === 'generating' ? (
        <div className="flex items-center gap-3 py-6">
          <div className="w-4 h-4 border-2 border-cm-accent border-t-transparent rounded-full animate-spin flex-shrink-0" />
          <p className="text-sm text-cm-subtle">Writing personalized email with Claude...</p>
        </div>
      ) : (
        /* preview | sending */
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-cm-white">Email preview</h2>
            <span className="text-xs text-cm-muted flex items-center gap-1">
              <Mail size={11} /> {lead.email}
            </span>
          </div>

          <Input
            label="Subject"
            value={subject}
            onChange={e => setSubject(e.target.value)}
          />

          <div>
            <label className="block text-xs font-medium text-cm-subtle uppercase tracking-wider mb-1.5">Body</label>
            <textarea
              value={body}
              onChange={e => setBody(e.target.value)}
              rows={18}
              className="w-full bg-cm-elevated border border-cm-border rounded-xl px-4 py-3 text-sm text-cm-text font-mono leading-relaxed resize-none focus:outline-none focus:ring-1 focus:ring-cm-accent focus:border-cm-accent transition-colors"
            />
          </div>

          {error && <p className="text-sm text-red-400">{error}</p>}

          <div className="flex items-center gap-3">
            <Button variant="gold" loading={stage === 'sending'} onClick={send}>
              <Mail size={13} /> Send Email
            </Button>
            <Button
              variant="ghost"
              onClick={generate}
              disabled={stage === 'sending'}
            >
              <RotateCcw size={13} /> Regenerate
            </Button>
            <Link
              href={`/proposals/${proposal.id}`}
              className="text-sm text-cm-subtle hover:text-cm-text transition-colors flex items-center gap-1 ml-auto"
            >
              Skip <ArrowRight size={12} />
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
