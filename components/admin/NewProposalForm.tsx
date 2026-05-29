'use client'

import { useState } from 'react'
import { Input, Select } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { createProposal } from '@/lib/actions/proposals'
import { generateToken } from '@/lib/tokens/generator'
import { useRouter } from 'next/navigation'
import { RefreshCw } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Props {
  leads: { id: string; organization: string; contact_person: string }[]
  templates: { id: string; name: string; project_type: string }[]
  preselectedLead?: string
}

export function NewProposalForm({ leads, templates, preselectedLead }: Props) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [accessKey, setAccessKey] = useState(() => generateToken())
  const [expirationDays, setExpirationDays] = useState('14')
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
        expiration_days: Number(expirationDays),
        custom_token: accessKey,
      })
      router.push(`/croissantsmoon/proposals/${proposal.id}`)
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
      <Select
        label="Expiration"
        name="expiration_days"
        options={expirationOptions}
        value={expirationDays}
        onChange={e => setExpirationDays(e.target.value)}
      />

      <div className="w-full">
        <label className="block text-xs font-medium text-cm-subtle uppercase tracking-widest mb-2">
          Access Key
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={accessKey}
            onChange={e => setAccessKey(e.target.value.toUpperCase().replace(/[^A-Z0-9-]/g, ''))}
            maxLength={20}
            spellCheck={false}
            autoComplete="off"
            className={cn(
              'flex-1 bg-cm-elevated border border-cm-border rounded-lg px-3.5 py-2.5',
              'text-sm font-mono tracking-[0.12em] text-cm-gold placeholder:text-cm-muted',
              'focus:outline-none focus:ring-1 focus:ring-cm-gold/40 focus:border-cm-gold/40 transition-colors'
            )}
          />
          <button
            type="button"
            onClick={() => setAccessKey(generateToken())}
            title="Regenerate key"
            className="px-3 bg-cm-elevated border border-cm-border rounded-lg text-cm-subtle hover:text-cm-text hover:border-cm-border/80 transition-colors"
          >
            <RefreshCw size={13} />
          </button>
        </div>
        <p className="mt-1.5 text-xs text-cm-subtle">
          Share this key with your client to unlock the proposal. Valid for {expirationDays} days.
        </p>
      </div>

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
