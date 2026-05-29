'use client'

import { useState } from 'react'
import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import { Input, Select, Textarea } from '@/components/ui/Input'
import { updateLead } from '@/lib/actions/leads'
import { useRouter } from 'next/navigation'
import { Pencil } from 'lucide-react'
import type { Lead, ProjectType } from '@/types'

const PROJECT_TYPE_OPTIONS = [
  { value: 'institutional_website', label: 'Institutional Website' },
  { value: 'landing_page', label: 'Landing Page' },
  { value: 'dashboard_system', label: 'Dashboard System' },
  { value: 'international_office', label: 'International Office' },
  { value: 'university_digitalization', label: 'University Digitalization' },
  { value: 'custom', label: 'Custom' },
]

export function EditLeadModal({ lead }: { lead: Lead }) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')
    setLoading(true)
    const form = new FormData(e.currentTarget)
    try {
      await updateLead(lead.id, {
        organization: form.get('organization') as string,
        contact_person: form.get('contact_person') as string,
        email: form.get('email') as string,
        industry: (form.get('industry') as string) || null,
        website: (form.get('website') as string) || null,
        project_type: form.get('project_type') as ProjectType,
        estimated_value: form.get('estimated_value') ? Number(form.get('estimated_value')) : null,
        notes: (form.get('notes') as string) || null,
      })
      setOpen(false)
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update lead')
      setLoading(false)
    }
  }

  return (
    <>
      <Button variant="secondary" size="sm" onClick={() => setOpen(true)}>
        <Pencil size={13} /> Edit Lead
      </Button>
      <Modal open={open} onClose={() => setOpen(false)} title="Edit Lead" size="lg">
        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <Input label="Organization *" name="organization" defaultValue={lead.organization} required />
            <Input label="Contact Person *" name="contact_person" defaultValue={lead.contact_person} required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input label="Email *" name="email" type="email" defaultValue={lead.email} required />
            <Input label="Website" name="website" defaultValue={lead.website ?? ''} placeholder="https://example.com" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input label="Industry" name="industry" defaultValue={lead.industry ?? ''} placeholder="Higher Education" />
            <Select label="Project Type" name="project_type" options={PROJECT_TYPE_OPTIONS} defaultValue={lead.project_type} />
          </div>
          <Input label="Estimated Value (IDR)" name="estimated_value" type="number" defaultValue={lead.estimated_value?.toString() ?? ''} placeholder="50000000" />
          <Textarea label="Notes" name="notes" defaultValue={lead.notes ?? ''} rows={3} />
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
