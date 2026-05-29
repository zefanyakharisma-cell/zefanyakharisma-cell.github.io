'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Modal } from '@/components/ui/Modal'
import { SendProposalEmail } from '@/components/admin/SendProposalEmail'
import { Mail } from 'lucide-react'

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

export function SendEmailModal({ proposal, lead }: Props) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button variant="secondary" size="sm" onClick={() => setOpen(true)}>
        <Mail size={13} /> Send Email
      </Button>
      <Modal open={open} onClose={() => setOpen(false)} title="Send Introduction Email" size="md">
        <div className="px-6 py-5">
          <SendProposalEmail
            proposal={proposal}
            lead={lead}
            hideCreatedBanner
          />
        </div>
      </Modal>
    </>
  )
}
