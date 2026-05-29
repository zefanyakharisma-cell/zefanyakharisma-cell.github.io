'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Modal } from '@/components/ui/Modal'
import { Select } from '@/components/ui/Input'
import { updateLeadStatus, deleteLead, permanentlyDeleteLead } from '@/lib/actions/leads'
import { useRouter } from 'next/navigation'
import { MoreHorizontal, Trash2, ArrowRight } from 'lucide-react'
import type { Lead, LeadStatus } from '@/types'

const STATUS_OPTIONS: { value: LeadStatus; label: string }[] = [
  { value: 'lead_identified', label: 'Lead Identified' },
  { value: 'audit_completed', label: 'Audit Completed' },
  { value: 'proposal_drafted', label: 'Proposal Drafted' },
  { value: 'proposal_sent', label: 'Proposal Sent' },
  { value: 'opened', label: 'Opened' },
  { value: 'under_discussion', label: 'Under Discussion' },
  { value: 'negotiation', label: 'Negotiation' },
  { value: 'closed_won', label: 'Closed Won' },
  { value: 'closed_lost', label: 'Closed Lost' },
]

export function LeadActions({ lead }: { lead: Pick<Lead, 'id' | 'status'> }) {
  const [open, setOpen] = useState(false)
  const [status, setStatus] = useState<LeadStatus>(lead.status)
  const [loading, setLoading] = useState(false)
  const [confirming, setConfirming] = useState<'archive' | 'delete' | null>(null)
  const router = useRouter()

  async function handleStatusChange() {
    setLoading(true)
    try {
      await updateLeadStatus(lead.id, status)
      setOpen(false)
      router.refresh()
    } finally {
      setLoading(false)
    }
  }

  async function handleArchive() {
    setLoading(true)
    try {
      await deleteLead(lead.id)
      router.push('/leads')
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete() {
    setLoading(true)
    try {
      await permanentlyDeleteLead(lead.id)
      router.push('/leads')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Button variant="secondary" size="sm" onClick={() => setOpen(true)}>
        <MoreHorizontal size={14} />
      </Button>
      <Modal open={open} onClose={() => { setOpen(false); setConfirming(null) }} title="Lead Actions" size="sm">
        <div className="px-6 py-5 space-y-2">
          <Select
            label="Status"
            value={status}
            onChange={e => setStatus(e.target.value as LeadStatus)}
            options={STATUS_OPTIONS}
          />
          <Button variant="primary" loading={loading === true && confirming === null} onClick={handleStatusChange} className="w-full justify-start">
            <ArrowRight size={14} /> Update Status
          </Button>

          <div className="pt-2 border-t border-cm-border space-y-2">
            {confirming === 'archive' ? (
              <div className="rounded-lg border border-amber-400/30 bg-amber-400/5 p-3 space-y-2">
                <p className="text-xs text-amber-300">Archive this lead? It will be hidden from the pipeline.</p>
                <div className="flex gap-2">
                  <Button variant="danger" size="sm" loading={loading} onClick={handleArchive}>Yes, archive</Button>
                  <Button variant="ghost" size="sm" onClick={() => setConfirming(null)}>Cancel</Button>
                </div>
              </div>
            ) : (
              <Button variant="secondary" className="w-full justify-start" disabled={!!loading} onClick={() => setConfirming('archive')}>
                <Trash2 size={14} /> Archive Lead
              </Button>
            )}

            {confirming === 'delete' ? (
              <div className="rounded-lg border border-red-400/30 bg-red-400/5 p-3 space-y-2">
                <p className="text-xs text-red-300">Permanently delete this lead and all its proposals and followups? This cannot be undone.</p>
                <div className="flex gap-2">
                  <Button variant="danger" size="sm" loading={loading} onClick={handleDelete}>Yes, delete forever</Button>
                  <Button variant="ghost" size="sm" onClick={() => setConfirming(null)}>Cancel</Button>
                </div>
              </div>
            ) : (
              <Button variant="danger" className="w-full justify-start" disabled={!!loading} onClick={() => setConfirming('delete')}>
                <Trash2 size={14} /> Delete Permanently
              </Button>
            )}
          </div>
        </div>
      </Modal>
    </>
  )
}
