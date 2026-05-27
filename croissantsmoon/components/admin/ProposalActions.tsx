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
  const router = useRouter()

  async function run(action: string, fn: () => Promise<unknown>) {
    setLoading(action)
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
      <Modal open={open} onClose={() => setOpen(false)} title="Proposal Actions" size="sm">
        <div className="px-6 py-5 space-y-2">
          <Button
            variant="gold"
            className="w-full justify-start"
            onClick={copyToken}
            disabled={!!loading}
          >
            {copied ? <CheckCheck size={14} /> : <Copy size={14} />}
            {copied ? 'Copied!' : 'Copy Token'}
          </Button>

          {proposal.status === 'draft' && (
            <Button
              variant="primary"
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
            loading={loading === 'regen'}
            onClick={() => run('regen', () => regenerateToken(proposal.id))}
          >
            <RefreshCw size={14} /> Regenerate Token
          </Button>

          <div className="flex gap-2">
            <Input
              type="number"
              value={days}
              onChange={e => setDays(e.target.value)}
              placeholder="Days"
              className="w-24"
            />
            <Button
              variant="secondary"
              className="flex-1 justify-center"
              loading={loading === 'extend'}
              onClick={() => run('extend', () => extendExpiration(proposal.id, Number(days)))}
            >
              <Clock size={14} /> Extend Expiry
            </Button>
          </div>

          {proposal.status !== 'archived' && (
            <Button
              variant="danger"
              className="w-full justify-start"
              loading={loading === 'archive'}
              onClick={() => run('archive', () => archiveProposal(proposal.id))}
            >
              <Archive size={14} /> Archive Proposal
            </Button>
          )}
        </div>
      </Modal>
    </>
  )
}
