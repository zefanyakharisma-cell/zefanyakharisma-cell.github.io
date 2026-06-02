'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Input, Textarea } from '@/components/ui/Input'
import { updateProposal } from '@/lib/actions/proposals'
import { useRouter } from 'next/navigation'
import { Save, Plus, Trash2, GripVertical } from 'lucide-react'
import type { Proposal, ProposalContent, ProposalBlock, ProposalBlockType } from '@/types'
import { cn } from '@/lib/utils'

type PricingTier = { name?: string; price?: string; inclusions?: string }

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
  const data = block.data as Record<string, string>

  function setField(key: string, val: string) {
    onChange({ ...block, data: { ...block.data, [key]: val } })
  }

  return (
    <div className="bg-cm-elevated border border-cm-border rounded-xl p-4 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <GripVertical size={14} className="text-cm-muted cursor-grab" />
          <span className="text-xs font-medium text-cm-text uppercase tracking-wider">
            {BLOCK_TYPES.find(b => b.type === block.type)?.label ?? block.type}
          </span>
        </div>
        <button onClick={onRemove} className="text-cm-subtle hover:text-red-400 transition-colors p-1">
          <Trash2 size={13} />
        </button>
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
      {block.type === 'pricing' && (() => {
        const existing = (block.data as { tiers?: PricingTier[] }).tiers
        const tiers: PricingTier[] = existing && existing.length
          ? existing
          : [{ name: data.package ?? '', price: data.price ?? '', inclusions: data.inclusions ?? '' }]
        const writeTiers = (next: PricingTier[]) => onChange({ ...block, data: { ...block.data, tiers: next } })
        const updateTier = (i: number, key: keyof PricingTier, val: string) =>
          writeTiers(tiers.map((t, x) => (x === i ? { ...t, [key]: val } : t)))
        const addTier = () => { if (tiers.length < 4) writeTiers([...tiers, { name: '', price: '', inclusions: '' }]) }
        const removeTier = (i: number) => writeTiers(tiers.filter((_, x) => x !== i))
        return (
          <div className="space-y-3">
            <p className="text-[11px] text-cm-subtle leading-relaxed">
              Up to 4 tiers (render side-by-side). The highest price is auto-highlighted as{' '}
              <span className="text-cm-gold">Recommended</span>.
            </p>
            {tiers.map((t, i) => (
              <div key={i} className="rounded-lg border border-cm-border bg-cm-surface/40 p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-medium uppercase tracking-wider text-cm-subtle">Tier {i + 1}</span>
                  {tiers.length > 1 && (
                    <button onClick={() => removeTier(i)} className="text-cm-subtle hover:text-red-400 transition-colors p-0.5">
                      <Trash2 size={12} />
                    </button>
                  )}
                </div>
                <Input label="Package Name" value={t.name ?? ''} onChange={e => updateTier(i, 'name', e.target.value)} placeholder="Professional Package" />
                <Input label="Price" value={t.price ?? ''} onChange={e => updateTier(i, 'price', e.target.value)} placeholder="IDR 75,000,000" />
                <Textarea label="Inclusions (one per line)" value={t.inclusions ?? ''} onChange={e => updateTier(i, 'inclusions', e.target.value)} rows={3} />
              </div>
            ))}
            {tiers.length < 4 && (
              <button onClick={addTier} className="w-full flex items-center justify-center gap-2 py-2 rounded-lg border border-dashed border-cm-border text-cm-subtle hover:text-cm-text hover:border-cm-muted transition-all text-xs">
                <Plus size={12} /> Add Tier ({tiers.length}/4)
              </button>
            )}
          </div>
        )
      })()}
      {block.type === 'timeline' && (
        <Textarea
          label="Timeline table — one row per line, columns separated by  -  (space-dash-space)"
          value={data.timeline ?? ''}
          onChange={e => setField('timeline', e.target.value)}
          placeholder="Phase 1 - Discovery & Planning - Week 1-2&#10;Phase 2 - Design - Week 3-5&#10;Phase 3 - Development - Week 6-9&#10;Phase 4 - Testing & Launch - Week 10-12"
          rows={5}
        />
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
        <div className="grid grid-cols-2 gap-3">
          <Input
            label="Greeting"
            value={content.greeting ?? ''}
            onChange={e => setContent({ ...content, greeting: e.target.value })}
            placeholder="Dear {{contact_person}}"
          />
          <Input
            label="Organization (branding)"
            value={content.branding?.org_name ?? ''}
            onChange={e => setContent({ ...content, branding: { ...content.branding, org_name: e.target.value } })}
            placeholder="Organization name"
          />
        </div>

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
