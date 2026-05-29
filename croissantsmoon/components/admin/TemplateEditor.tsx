'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Input, Select, Textarea } from '@/components/ui/Input'
import { updateTemplate, archiveTemplate, deleteTemplate } from '@/lib/actions/templates'
import { useRouter } from 'next/navigation'
import { Save, Plus, Trash2, Eye, EyeOff, Archive } from 'lucide-react'
import type { ProposalBlock, ProposalBlockType, ProjectType } from '@/types'
import { cn } from '@/lib/utils'

const BLOCK_TYPES: { type: ProposalBlockType; label: string }[] = [
  { type: 'hero', label: 'Hero Section' },
  { type: 'greeting', label: 'Personalized Greeting' },
  { type: 'audit_findings', label: 'Audit Findings' },
  { type: 'website_analysis', label: 'Website Analysis' },
  { type: 'redesign_concept', label: 'Redesign Concept' },
  { type: 'features', label: 'Proposed Features' },
  { type: 'pricing', label: 'Pricing Table' },
  { type: 'timeline', label: 'Timeline' },
  { type: 'infrastructure', label: 'Infrastructure Options' },
  { type: 'demo_embed', label: 'Demo Embed' },
  { type: 'cta', label: 'Call to Action' },
  { type: 'text', label: 'Text Block' },
]

const PROJECT_TYPE_OPTIONS = [
  { value: 'institutional_website', label: 'Institutional Website' },
  { value: 'landing_page', label: 'Landing Page' },
  { value: 'dashboard_system', label: 'Dashboard System' },
  { value: 'international_office', label: 'International Office' },
  { value: 'university_digitalization', label: 'University Digitalization' },
  { value: 'custom', label: 'Custom' },
]

function BlockEditor({ block, onChange, onRemove }: {
  block: ProposalBlock
  onChange: (b: ProposalBlock) => void
  onRemove: () => void
}) {
  const data = block.data as Record<string, string>
  function set(key: string, val: string) {
    onChange({ ...block, data: { ...block.data, [key]: val } })
  }

  return (
    <div className={cn('bg-cm-elevated border rounded-xl p-4 space-y-3', block.visible ? 'border-cm-border' : 'border-cm-border/40 opacity-50')}>
      <div className="flex items-center justify-between">
        <span className={cn('text-xs font-medium uppercase tracking-wider', block.visible ? 'text-cm-text' : 'text-cm-muted line-through')}>
          {BLOCK_TYPES.find(b => b.type === block.type)?.label ?? block.type}
        </span>
        <div className="flex items-center gap-1">
          <button onClick={() => onChange({ ...block, visible: !block.visible })} className="text-cm-subtle hover:text-cm-text transition-colors p-1" title={block.visible ? 'Hide' : 'Show'}>
            {block.visible ? <Eye size={13} /> : <EyeOff size={13} className="text-cm-muted" />}
          </button>
          <button onClick={onRemove} className="text-cm-subtle hover:text-red-400 transition-colors p-1">
            <Trash2 size={13} />
          </button>
        </div>
      </div>

      {block.type === 'hero' && (
        <div className="space-y-3">
          <Input label="Headline" value={data.headline ?? ''} onChange={e => set('headline', e.target.value)} placeholder="Transforming {{organization_name}}'s Digital Presence" />
          <Input label="Subheadline" value={data.subheadline ?? ''} onChange={e => set('subheadline', e.target.value)} placeholder="A Strategic Digital Modernization Proposal" />
        </div>
      )}
      {block.type === 'greeting' && (
        <Textarea label="Greeting Message" value={data.message ?? ''} onChange={e => set('message', e.target.value)} placeholder="Dear {{contact_person}}, we've prepared this proposal for {{organization_name}}..." rows={3} />
      )}
      {block.type === 'audit_findings' && (
        <Textarea label="Findings" value={data.findings ?? ''} onChange={e => set('findings', e.target.value)} placeholder="Current website audit observations..." rows={4} />
      )}
      {block.type === 'website_analysis' && (
        <div className="space-y-3">
          <Input label="Current Website URL" value={data.url ?? ''} onChange={e => set('url', e.target.value)} placeholder="https://client-website.com" />
          <Textarea label="Analysis Notes" value={data.notes ?? ''} onChange={e => set('notes', e.target.value)} rows={3} />
        </div>
      )}
      {block.type === 'redesign_concept' && (
        <div className="space-y-3">
          <Input label="Concept Title" value={data.title ?? ''} onChange={e => set('title', e.target.value)} placeholder="Modern Institutional Redesign" />
          <Textarea label="Description" value={data.description ?? ''} onChange={e => set('description', e.target.value)} rows={3} />
          <Input label="Prototype URL (optional)" value={data.prototype_url ?? ''} onChange={e => set('prototype_url', e.target.value)} placeholder="https://figma.com/..." />
        </div>
      )}
      {block.type === 'features' && (
        <Textarea label="Feature List (one per line)" value={data.features ?? ''} onChange={e => set('features', e.target.value)} placeholder="Modern responsive design&#10;Advanced CMS integration" rows={4} />
      )}
      {block.type === 'pricing' && (
        <div className="space-y-3">
          <Input label="Package Name" value={data.package ?? ''} onChange={e => set('package', e.target.value)} placeholder="Professional Institutional Package" />
          <Input label="Price" value={data.price ?? ''} onChange={e => set('price', e.target.value)} placeholder="IDR 75,000,000" />
          <Textarea label="Inclusions (one per line)" value={data.inclusions ?? ''} onChange={e => set('inclusions', e.target.value)} rows={4} />
        </div>
      )}
      {block.type === 'timeline' && (
        <Textarea label="Phases (one per line)" value={data.timeline ?? ''} onChange={e => set('timeline', e.target.value)} placeholder="Week 1-2: Discovery&#10;Week 3-5: Design&#10;Week 6-9: Development" rows={4} />
      )}
      {block.type === 'infrastructure' && (
        <div className="space-y-3">
          <Textarea label="Options (one per line)" value={data.options ?? ''} onChange={e => set('options', e.target.value)} rows={3} />
          <Input label="Recommended Option" value={data.recommended ?? ''} onChange={e => set('recommended', e.target.value)} />
        </div>
      )}
      {block.type === 'cta' && (
        <div className="space-y-3">
          <Input label="Heading" value={data.heading ?? ''} onChange={e => set('heading', e.target.value)} placeholder="Ready to Transform Your Digital Presence?" />
          <Input label="Button Label" value={data.button ?? ''} onChange={e => set('button', e.target.value)} placeholder="Schedule a Discovery Call" />
          <Input label="Contact Email" value={data.email ?? ''} onChange={e => set('email', e.target.value)} placeholder="contact@croissantsmoon.studio" />
        </div>
      )}
      {block.type === 'text' && (
        <Textarea label="Content" value={data.content ?? ''} onChange={e => set('content', e.target.value)} rows={4} />
      )}
      {block.type === 'demo_embed' && (
        <Input label="Embed URL" value={data.url ?? ''} onChange={e => set('url', e.target.value)} placeholder="https://..." />
      )}
    </div>
  )
}

interface TemplateData {
  id: string
  name: string
  description: string | null
  project_type: string
  blocks: ProposalBlock[]
}

export function TemplateEditor({ template }: { template: TemplateData }) {
  const [name, setName] = useState(template.name)
  const [description, setDescription] = useState(template.description ?? '')
  const [projectType, setProjectType] = useState(template.project_type)
  const [blocks, setBlocks] = useState<ProposalBlock[]>(template.blocks ?? [])
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [showBlockPicker, setShowBlockPicker] = useState(false)
  const [archiving, setArchiving] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [confirming, setConfirming] = useState<'archive' | 'delete' | null>(null)
  const [error, setError] = useState('')
  const router = useRouter()

  function updateBlock(index: number, block: ProposalBlock) {
    const next = [...blocks]
    next[index] = block
    setBlocks(next)
  }

  function removeBlock(index: number) {
    setBlocks(blocks.filter((_, i) => i !== index))
  }

  function addBlock(type: ProposalBlockType) {
    setBlocks([...blocks, { id: crypto.randomUUID(), type, order: blocks.length, visible: true, data: {} }])
    setShowBlockPicker(false)
  }

  async function save() {
    setError('')
    setSaving(true)
    try {
      await updateTemplate(template.id, {
        name,
        description: description || null,
        project_type: projectType as ProjectType,
        blocks,
      })
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save')
    } finally {
      setSaving(false)
    }
  }

  async function doArchive() {
    setArchiving(true)
    try {
      await archiveTemplate(template.id)
      router.push('/templates')
    } finally {
      setArchiving(false)
    }
  }

  async function doDelete() {
    setDeleting(true)
    try {
      await deleteTemplate(template.id)
      router.push('/templates')
    } finally {
      setDeleting(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-cm-white">{template.name}</h1>
          <p className="text-sm text-cm-subtle mt-1">{PROJECT_TYPE_OPTIONS.find(o => o.value === template.project_type)?.label ?? template.project_type}</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant={saved ? 'gold' : 'primary'} onClick={save} loading={saving}>
            <Save size={13} /> {saved ? 'Saved' : 'Save'}
          </Button>
          {confirming === 'archive' ? (
            <div className="flex items-center gap-2 bg-amber-400/5 border border-amber-400/20 rounded-lg px-3 py-1.5">
              <span className="text-xs text-amber-300">Archive this template?</span>
              <Button variant="danger" size="sm" loading={archiving} onClick={doArchive}>Yes</Button>
              <Button variant="ghost" size="sm" onClick={() => setConfirming(null)}>No</Button>
            </div>
          ) : confirming === 'delete' ? (
            <div className="flex items-center gap-2 bg-red-400/5 border border-red-400/20 rounded-lg px-3 py-1.5">
              <span className="text-xs text-red-300">Delete permanently? This cannot be undone.</span>
              <Button variant="danger" size="sm" loading={deleting} onClick={doDelete}>Yes, delete</Button>
              <Button variant="ghost" size="sm" onClick={() => setConfirming(null)}>No</Button>
            </div>
          ) : (
            <>
              <Button variant="ghost" size="sm" onClick={() => setConfirming('archive')}>
                <Archive size={13} /> Archive
              </Button>
              <Button variant="danger" size="sm" onClick={() => setConfirming('delete')}>
                <Trash2 size={13} /> Delete
              </Button>
            </>
          )}
        </div>
      </div>

      {error && <p className="text-sm text-red-400">{error}</p>}

      {/* Metadata */}
      <div className="bg-cm-surface border border-cm-border rounded-xl p-5 space-y-4">
        <h3 className="text-sm font-semibold text-cm-white">Details</h3>
        <div className="grid grid-cols-2 gap-4">
          <Input label="Template Name" value={name} onChange={e => setName(e.target.value)} />
          <Select label="Project Type" options={PROJECT_TYPE_OPTIONS} value={projectType} onChange={e => setProjectType(e.target.value)} />
        </div>
        <Textarea label="Description" value={description} onChange={e => setDescription(e.target.value)} rows={2} placeholder="Short description of when to use this template..." />
      </div>

      {/* Blocks */}
      <div className="bg-cm-surface border border-cm-border rounded-xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-cm-border">
          <h3 className="text-sm font-semibold text-cm-white">Default Blocks</h3>
          <span className="text-xs text-cm-subtle">{blocks.length} block{blocks.length !== 1 ? 's' : ''}</span>
        </div>
        <div className="p-5 space-y-4">
          {blocks.length === 0 && (
            <p className="text-sm text-cm-subtle text-center py-4">No blocks yet. Add sections below to define the default proposal structure.</p>
          )}
          <div className="space-y-3">
            {blocks.map((block, i) => (
              <BlockEditor key={block.id} block={block} onChange={b => updateBlock(i, b)} onRemove={() => removeBlock(i)} />
            ))}
          </div>

          {showBlockPicker ? (
            <div className="bg-cm-elevated border border-cm-border rounded-xl p-4">
              <p className="text-xs text-cm-subtle uppercase tracking-wider mb-3">Add Section</p>
              <div className="grid grid-cols-2 gap-2">
                {BLOCK_TYPES.map(({ type, label }) => (
                  <button key={type} onClick={() => addBlock(type)} className="text-left px-3 py-2 rounded-lg text-sm text-cm-text hover:bg-cm-border hover:text-cm-white transition-colors">
                    {label}
                  </button>
                ))}
              </div>
              <button onClick={() => setShowBlockPicker(false)} className="mt-3 text-xs text-cm-subtle hover:text-cm-text transition-colors">Cancel</button>
            </div>
          ) : (
            <button onClick={() => setShowBlockPicker(true)} className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-dashed border-cm-border text-cm-subtle hover:text-cm-text hover:border-cm-muted transition-all text-sm">
              <Plus size={14} /> Add Section
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
