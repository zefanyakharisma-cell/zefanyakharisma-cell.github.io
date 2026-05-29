'use client'

import { useState } from 'react'
import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import { Input, Select, Textarea } from '@/components/ui/Input'
import { createTemplate } from '@/lib/actions/templates'
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

export function CreateTemplateModal() {
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
      await createTemplate({
        name: form.get('name') as string,
        description: (form.get('description') as string) || null,
        project_type: form.get('project_type') as string,
      })
      setOpen(false)
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create template')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Button variant="primary" onClick={() => setOpen(true)}>
        <Plus size={14} /> New Template
      </Button>
      <Modal open={open} onClose={() => setOpen(false)} title="New Template" size="md">
        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
          <Input label="Template Name *" name="name" placeholder="Institutional Website Proposal" required />
          <Select label="Project Type" name="project_type" options={PROJECT_TYPE_OPTIONS} />
          <Textarea label="Description" name="description" placeholder="Standard proposal for institutional websites..." />
          {error && <p className="text-sm text-red-400">{error}</p>}
          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
            <Button type="submit" variant="primary" loading={loading}>Create Template</Button>
          </div>
        </form>
      </Modal>
    </>
  )
}
