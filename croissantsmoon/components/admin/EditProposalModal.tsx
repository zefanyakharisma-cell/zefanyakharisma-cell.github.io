'use client'

import { useState } from 'react'
import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { updateProposal } from '@/lib/actions/proposals'
import { useRouter } from 'next/navigation'
import { Pencil } from 'lucide-react'

interface Props {
  proposal: { id: string; title: string; expires_at: string | null }
}

export function EditProposalModal({ proposal }: Props) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const expiresDateValue = proposal.expires_at
    ? new Date(proposal.expires_at).toISOString().split('T')[0]
    : ''

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')
    setLoading(true)
    const form = new FormData(e.currentTarget)
    const expiresAt = form.get('expires_at') as string
    try {
      await updateProposal(proposal.id, {
        title: form.get('title') as string,
        expires_at: expiresAt ? new Date(expiresAt).toISOString() : null,
      })
      setOpen(false)
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update proposal')
      setLoading(false)
    }
  }

  return (
    <>
      <Button variant="ghost" size="sm" onClick={() => setOpen(true)}>
        <Pencil size={13} /> Edit
      </Button>
      <Modal open={open} onClose={() => setOpen(false)} title="Edit Proposal" size="sm">
        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
          <Input label="Title *" name="title" defaultValue={proposal.title} required />
          <Input label="Expiration Date" name="expires_at" type="date" defaultValue={expiresDateValue} />
          {error && <p className="text-sm text-red-400">{error}</p>}
          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
            <Button type="submit" variant="primary" loading={loading}>Save Changes</Button>
          </div>
        </form>
      </Modal>
    </>
  )
}
