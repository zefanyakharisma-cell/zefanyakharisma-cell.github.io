'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Modal } from '@/components/ui/Modal'
import { Input } from '@/components/ui/Input'
import { publishProposal, archiveProposal, regenerateToken, extendExpiration } from '@/lib/actions/proposals'
import { useRouter } from 'next/navigation'
import { MoreHorizontal, Send, Archive, RefreshCw, Clock, Copy, CheckCheck } from 'lucide-react'

export function ProposalActions({ proposal }: { proposal: { id: string; status: string; token: string; slug: string } }) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const [days, setDays] = useState('14')
  const [confirming, setConfirming] = useState<'regen' | 'archive' | null>(null)
  const router = useRouter()

  async function run(action: string, fn: () => Promise<unknown>) {
    setLoading(action)
    setConfirming(null)
    try {
      await fn()
      setOpen(false)
      router.refresh()
    } finally {
      setLoading(null)
    }
  }

  async function copyToken() {
    await navigator.clipboard.writeText(proposal.token)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <>
      <Button variant="secondary" size="sm" onClick={() => setOpen(true)}>
        <MoreHorizontal size={14} /> Actions
      </Button>
      <Modal open={open} onClose={() => { setOpen(false); setConfirming(null) }} title="Proposal Actions" size="sm">
        <div className="px-6 py-5 space-y-2">
          {proposal.status === 'draft' && (
            <Button
              variant="gold"
              className="w-full justify-start"
              loading={loading === 'publish'}
              onClick={() => run('publish', () => publishProposal(proposal.id))}
            >
              <Send size={14} /> Publish Proposal
            </Button>
          )}

          <Button
            variant="secondary"
            className="w-full justify-start"
            onClick={copyToken}
            disabled={!!loading}
          >
            {copied ? <CheckCheck size={14} /> : <Copy size={14} />}
            {copied ? 'Copied!' : 'Copy Token'}
          </Button>

          {confirming === 'regen' ? (
            <div className="rounded-lg border border-amber-400/30 bg-amber-400/5 p-3 space-y-2">
              <p className="text-xs text-amber-300">This will invalidate the current token. Any links already sent to the client will stop working.</p>
              <div className="flex gap-2">
                <Button variant="danger" size="sm" loading={loading === 'regen'} onClick={() => run('regen', () => regenerateToken(proposal.id))}>
                  Yes, regenerate
                </Button>
                <Button variant="ghost" size="sm" onClick={() => setConfirming(null)}>Cancel</Button>
              </div>
            </div>
          ) : (
            <Button
              variant="secondary"
              className="w-full justify-start"
              disabled={!!loading}
              onClick={() => setConfirming('regen')}
            >
              <RefreshCw size={14} /> Regenerate Token
            </Button>
          )}

          <div className="space-y-1.5">
            <p className="text-xs text-cm-subtle uppercase tracking-wider">Extend expiry by</p>
            <div className="flex gap-2 items-center">
              <Input
                type="number"
                label=""
                value={days}
                onChange={e => setDays(e.target.value)}
                placeholder="14"
                className="w-24"
              />
              <span className="text-sm text-cm-subtle">days</span>
              <Button
                variant="secondary"
                className="flex-1 justify-center"
                loading={loading === 'extend'}
                onClick={() => run('extend', () => extendExpiration(proposal.id, Number(days)))}
              >
                <Clock size={14} /> Extend
              </Button>
            </div>
          </div>

          {proposal.status !== 'archived' && (
            confirming === 'archive' ? (
              <div className="rounded-lg border border-red-400/30 bg-red-400/5 p-3 space-y-2">
                <p className="text-xs text-red-300">Archive this proposal? It will no longer be accessible to the client.</p>
                <div className="flex gap-2">
                  <Button variant="danger" size="sm" loading={loading === 'archive'} onClick={() => run('archive', () => archiveProposal(proposal.id))}>
                    Yes, archive
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => setConfirming(null)}>Cancel</Button>
                </div>
              </div>
            ) : (
              <Button
                variant="danger"
                className="w-full justify-start"
                disabled={!!loading}
                onClick={() => setConfirming('archive')}
              >
                <Archive size={14} /> Archive Proposal
              </Button>
            )
          )}
        </div>
      </Modal>
    </>
  )
}
