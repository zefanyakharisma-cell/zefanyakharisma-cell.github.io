'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Input, Textarea } from '@/components/ui/Input'
import { updateProposal } from '@/lib/actions/proposals'
import { useRouter } from 'next/navigation'
import { Save, Plus, Trash2, Eye, EyeOff } from 'lucide-react'
import type { Proposal, ProposalContent, ProposalBlock, ProposalBlockType } from '@/types'
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

function BlockEditor({ block, onChange, onRemove }: {
  block: ProposalBlock
  onChange: (b: ProposalBlock) => void
  onRemove: () => void
}) {
  const data = (block.data ?? {}) as Record<string, string>

  function setField(key: string, val: string) {
    onChange({ ...block, data: { ...block.data, [key]: val } })
  }

  return (
    <div className={cn('bg-cm-elevated border rounded-xl p-4 space-y-3', block.visible ? 'border-cm-border' : 'border-cm-border/40 opacity-50')}>
      <div className="flex items-center justify-between">
        <span className={cn('text-xs font-medium uppercase tracking-wider', block.visible ? 'text-cm-text' : 'text-cm-muted line-through')}>
          {BLOCK_TYPES.find(b => b.type === block.type)?.label ?? block.type}
        </span>
        <div className="flex items-center gap-1">
          <button
            onClick={() => onChange({ ...block, visible: !block.visible })}
            className="text-cm-subtle hover:text-cm-text transition-colors p-1"
            title={block.visible ? 'Hide section' : 'Show section'}
          >
            {block.visible ? <Eye size={13} /> : <EyeOff size={13} className="text-cm-muted" />}
          </button>
          <button onClick={onRemove} className="text-cm-subtle hover:text-red-400 transition-colors p-1">
            <Trash2 size={13} />
          </button>
        </div>
      </div>

      {block.type === 'hero' && (
        <div className="space-y-3">
          <Input label="Headline" value={data.headline ?? ''} onChange={e => setField('headline', e.target.value)} placeholder="Transforming {{organization_name}}'s Digital Presence" />
          <Input label="Subheadline" value={data.subheadline ?? ''} onChange={e => setField('subheadline', e.target.value)} placeholder="A Strategic Digital Modernization Proposal" />
        </div>
      )}
      {block.type === 'greeting' && (
        <Textarea label="Greeting Message" value={data.message ?? ''} onChange={e => setField('message', e.target.value)} placeholder="Dear {{contact_person}}, we've prepared this proposal specifically for {{organization_name}}..." rows={3} />
      )}
      {block.type === 'audit_findings' && (
        <Textarea label="Findings" value={data.findings ?? ''} onChange={e => setField('findings', e.target.value)} placeholder="Current website audit observations..." rows={5} />
      )}
      {block.type === 'features' && (
        <Textarea label="Feature List (one per line)" value={data.features ?? ''} onChange={e => setField('features', e.target.value)} placeholder="Modern responsive design&#10;Advanced CMS integration&#10;Multi-language support" rows={5} />
      )}
      {block.type === 'pricing' && (
        <div className="space-y-3">
          <Input label="Package Name" value={data.package ?? ''} onChange={e => setField('package', e.target.value)} placeholder="Professional Institutional Package" />
          <Input label="Price" value={data.price ?? ''} onChange={e => setField('price', e.target.value)} placeholder="IDR 75,000,000" />
          <Textarea label="Inclusions (one per line)" value={data.inclusions ?? ''} onChange={e => setField('inclusions', e.target.value)} rows={4} />
        </div>
      )}
      {block.type === 'timeline' && (
        <Textarea label="Timeline (one phase per line)" value={data.timeline ?? ''} onChange={e => setField('timeline', e.target.value)} placeholder="Week 1-2: Discovery & Planning&#10;Week 3-5: Design&#10;Week 6-9: Development&#10;Week 10-11: Testing&#10;Week 12: Launch" rows={5} />
      )}
      {block.type === 'cta' && (
        <div className="space-y-3">
          <Input label="CTA Heading" value={data.heading ?? ''} onChange={e => setField('heading', e.target.value)} placeholder="Ready to Transform Your Digital Presence?" />
          <Input label="Button Label" value={data.button ?? ''} onChange={e => setField('button', e.target.value)} placeholder="Schedule a Discovery Call" />
          <Input label="Contact Email" value={data.email ?? ''} onChange={e => setField('email', e.target.value)} placeholder="contact@croissantsmoon.studio" />
        </div>
      )}
      {block.type === 'text' && (
        <Textarea label="Content" value={data.content ?? ''} onChange={e => setField('content', e.target.value)} rows={4} />
      )}
      {block.type === 'website_analysis' && (
        <div className="space-y-3">
          <Input label="Current Website URL" value={data.url ?? ''} onChange={e => setField('url', e.target.value)} placeholder="https://client-website.com" />
          <Textarea label="Analysis Notes" value={data.notes ?? ''} onChange={e => setField('notes', e.target.value)} placeholder="Performance issues, outdated design, missing features..." rows={4} />
        </div>
      )}
      {block.type === 'redesign_concept' && (
        <div className="space-y-3">
          <Input label="Concept Title" value={data.title ?? ''} onChange={e => setField('title', e.target.value)} placeholder="Modern Institutional Redesign" />
          <Textarea label="Concept Description" value={data.description ?? ''} onChange={e => setField('description', e.target.value)} placeholder="Describe the visual direction, tone, and key design decisions..." rows={4} />
          <Input label="Figma / Prototype URL (optional)" value={data.prototype_url ?? ''} onChange={e => setField('prototype_url', e.target.value)} placeholder="https://figma.com/..." />
        </div>
      )}
      {block.type === 'infrastructure' && (
        <div className="space-y-3">
          <Textarea label="Hosting & Infrastructure Options (one per line)" value={data.options ?? ''} onChange={e => setField('options', e.target.value)} placeholder="Vercel — $20/mo — Managed CDN, auto-deploy&#10;VPS (DigitalOcean) — $12/mo — Full control, manual setup" rows={4} />
          <Input label="Recommended Option" value={data.recommended ?? ''} onChange={e => setField('recommended', e.target.value)} placeholder="Vercel" />
        </div>
      )}
      {block.type === 'demo_embed' && (
        <Input label="Embed URL" value={data.url ?? ''} onChange={e => setField('url', e.target.value)} placeholder="https://..." />
      )}
    </div>
  )
}

export function ProposalEditor({ proposal }: { proposal: Proposal }) {
  const [content, setContent] = useState<ProposalContent>(proposal.content ?? { sections: [] })
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [showBlockPicker, setShowBlockPicker] = useState(false)
  const router = useRouter()

  function updateBlock(index: number, block: ProposalBlock) {
    const sections = [...content.sections]
    sections[index] = block
    setContent({ ...content, sections })
  }

  function removeBlock(index: number) {
    setContent({ ...content, sections: content.sections.filter((_, i) => i !== index) })
  }

  function addBlock(type: ProposalBlockType) {
    const block: ProposalBlock = {
      id: crypto.randomUUID(),
      type,
      order: content.sections.length,
      visible: true,
      data: {},
    }
    setContent({ ...content, sections: [...content.sections, block] })
    setShowBlockPicker(false)
  }

  async function save() {
    setSaving(true)
    try {
      await updateProposal(proposal.id, { content })
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
      router.refresh()
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="bg-cm-surface border border-cm-border rounded-xl overflow-hidden">
      <div className="flex items-center justify-between px-6 py-4 border-b border-cm-border">
        <h3 className="text-sm font-semibold text-cm-white">Proposal Content</h3>
        <Button variant={saved ? 'gold' : 'primary'} size="sm" onClick={save} loading={saving}>
          <Save size={13} /> {saved ? 'Saved' : 'Save'}
        </Button>
      </div>

      <div className="p-5 space-y-4">
        <p className="text-xs text-cm-subtle">Use a <span className="text-cm-text font-medium">Personalized Greeting</span> block below to add an opening message. Use <span className="text-cm-text font-medium">{'{{contact_person}}'}</span> and <span className="text-cm-text font-medium">{'{{organization_name}}'}</span> as placeholders.</p>

        <div className="space-y-3 mt-2">
          {content.sections.map((block, i) => (
            <BlockEditor
              key={block.id}
              block={block}
              onChange={b => updateBlock(i, b)}
              onRemove={() => removeBlock(i)}
            />
          ))}
        </div>

        {showBlockPicker ? (
          <div className="bg-cm-elevated border border-cm-border rounded-xl p-4">
            <p className="text-xs text-cm-subtle uppercase tracking-wider mb-3">Add Section</p>
            <div className="grid grid-cols-2 gap-2">
              {BLOCK_TYPES.map(({ type, label }) => (
                <button
                  key={type}
                  onClick={() => addBlock(type)}
                  className="text-left px-3 py-2 rounded-lg text-sm text-cm-text hover:bg-cm-border hover:text-cm-white transition-colors"
                >
                  {label}
                </button>
              ))}
            </div>
            <button
              onClick={() => setShowBlockPicker(false)}
              className="mt-3 text-xs text-cm-subtle hover:text-cm-text transition-colors"
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            onClick={() => setShowBlockPicker(true)}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-dashed border-cm-border text-cm-subtle hover:text-cm-text hover:border-cm-muted transition-all text-sm"
          >
            <Plus size={14} /> Add Section
          </button>
        )}
      </div>
    </div>
  )
}
