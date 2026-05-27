'use client'

import { useState } from 'react'
import { Input, Select, Textarea } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { createProposal } from '@/lib/actions/proposals'
import { useRouter } from 'next/navigation'

interface Props {
  leads: { id: string; organization: string; contact_person: string }[]
  templates: { id: string; name: string; project_type: string }[]
  preselectedLead?: string
}

export function NewProposalForm({ leads, templates, preselectedLead }: Props) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const leadOptions = [
    { value: '', label: 'Select a lead...' },
    ...leads.map(l => ({ value: l.id, label: l.organization })),
  ]
  const templateOptions = [
    { value: '', label: 'No template' },
    ...templates.map(t => ({ value: t.id, label: t.name })),
  ]
  const expirationOptions = [
    { value: '7', label: '7 days' },
    { value: '14', label: '14 days (default)' },
    { value: '30', label: '30 days' },
    { value: '60', label: '60 days' },
  ]

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')
    setLoading(true)
    const form = new FormData(e.currentTarget)
    try {
      const proposal = await createProposal({
        lead_id: form.get('lead_id') as string,
        title: form.get('title') as string,
        template_id: (form.get('template_id') as string) || undefined,
        expiration_days: Number(form.get('expiration_days') ?? 14),
      })
      router.push(`/proposals/${proposal.id}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create proposal')
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <Select label="Lead *" name="lead_id" options={leadOptions} defaultValue={preselectedLead ?? ''} required />
      <Input label="Proposal Title *" name="title" placeholder="Institutional Website Redesign Proposal" required />
      <Select label="Template" name="template_id" options={templateOptions} />
      <Select label="Expiration" name="expiration_days" options={expirationOptions} defaultValue="14" />
      {error && <p className="text-sm text-red-400">{error}</p>}
      <div className="flex gap-3 pt-2">
        <Button type="submit" variant="primary" loading={loading} size="lg">
          Create Proposal
        </Button>
        <Button type="button" variant="ghost" size="lg" onClick={() => router.back()}>
          Cancel
        </Button>
      </div>
    </form>
  )
}
