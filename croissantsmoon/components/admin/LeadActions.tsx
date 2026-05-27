'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Modal } from '@/components/ui/Modal'
import { Select } from '@/components/ui/Input'
import { updateLeadStatus, deleteLead } from '@/lib/actions/leads'
import { useRouter } from 'next/navigation'
import { MoreHorizontal, Pencil, Trash2, ArrowRight } from 'lucide-react'
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
    if (!confirm('Archive this lead?')) return
    await deleteLead(lead.id)
    router.push('/leads')
  }

  return (
    <>
      <Button variant="secondary" size="sm" onClick={() => setOpen(true)}>
        <MoreHorizontal size={14} />
      </Button>
      <Modal open={open} onClose={() => setOpen(false)} title="Update Lead" size="sm">
        <div className="px-6 py-5 space-y-4">
          <Select
            label="Status"
            value={status}
            onChange={e => setStatus(e.target.value as LeadStatus)}
            options={STATUS_OPTIONS}
          />
          <div className="flex flex-col gap-2 pt-2">
            <Button variant="primary" loading={loading} onClick={handleStatusChange} className="w-full">
              <ArrowRight size={14} /> Update Status
            </Button>
            <Button variant="danger" onClick={handleArchive} className="w-full">
              <Trash2 size={14} /> Archive Lead
            </Button>
          </div>
        </div>
      </Modal>
    </>
  )
}
