'use client'

import { useState } from 'react'
import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import { Input, Select, Textarea } from '@/components/ui/Input'
import { createLead } from '@/lib/actions/leads'
import { useRouter } from 'next/navigation'
import { Plus } from 'lucide-react'

const PROJECT_TYPE_OPTIONS = [
  { value: 'institutional_website', label: 'Institutional Website' },
  { value: 'landing_page', label: 'Landing Page' },
  { value: 'dashboard_system', label: 'Dashboard System' },
  { value: 'international_office', label: 'International Office' },
  { value: 'university_digitalization', label: 'University Digitalization' },
  { value: 'custom', label: 'Custom' },
]

export function CreateLeadModal() {
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
      await createLead({
        organization: form.get('organization') as string,
        contact_person: form.get('contact_person') as string,
        email: form.get('email') as string,
        industry: form.get('industry') as string,
        website: form.get('website') as string,
        project_type: form.get('project_type') as string,
        estimated_value: form.get('estimated_value') ? Number(form.get('estimated_value')) : undefined,
        notes: form.get('notes') as string,
      })
      setOpen(false)
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create lead')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Button variant="primary" onClick={() => setOpen(true)}>
        <Plus size={14} /> New Lead
      </Button>
      <Modal open={open} onClose={() => setOpen(false)} title="New Lead" description="Add a new prospect to your pipeline." size="lg">
        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <Input label="Organization *" name="organization" placeholder="Petra Christian University" required />
            <Input label="Contact Person *" name="contact_person" placeholder="Dr. John Smith" required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input label="Email *" name="email" type="email" placeholder="contact@example.com" required />
            <Input label="Website" name="website" type="url" placeholder="https://example.com" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input label="Industry" name="industry" placeholder="Higher Education" />
            <Select label="Project Type" name="project_type" options={PROJECT_TYPE_OPTIONS} />
          </div>
          <Input label="Estimated Value (IDR)" name="estimated_value" type="number" placeholder="50000000" />
          <Textarea label="Notes" name="notes" placeholder="Initial observations about this prospect..." />
          {error && <p className="text-sm text-red-400">{error}</p>}
          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
            <Button type="submit" variant="primary" loading={loading}>Create Lead</Button>
          </div>
        </form>
      </Modal>
    </>
  )
}
