'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import type { Role } from '@/lib/data/experience'
import { Tag } from './Tag'

/** Expandable career timeline. Each role is a disclosure button with aria-expanded. */
export function Timeline({ roles, initiallyOpen }: { roles: Role[]; initiallyOpen?: string }) {
  const [open, setOpen] = useState<string | null>(initiallyOpen ?? null)
  return (
    <ol className="m-0 p-0 list-none border-t border-line">
      {roles.map(role => {
        const isOpen = open === role.id
        const panelId = `role-${role.id}`
        return (
          <li key={role.id} className="border-b border-line">
            <button
              type="button"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => setOpen(isOpen ? null : role.id)}
              className="w-full grid grid-cols-[1fr_auto] gap-x-6 gap-y-1 items-start py-6 text-left bg-transparent border-0 cursor-pointer text-midnight"
            >
              <span className="flex flex-col gap-1.5 min-w-0">
                <span className="pcu-eyebrow text-ink-muted">{role.period}</span>
                <span className="text-xl font-bold leading-snug tracking-[-0.01em]">{role.title}</span>
                <span className="muted">{role.org}</span>
              </span>
              <span className="flex items-center gap-3 pt-1">
                {role.current && <Tag>Current</Tag>}
                <ChevronDown aria-hidden size={20} className={`transition-transform motion-reduce:transition-none ${isOpen ? 'rotate-180' : ''}`} />
              </span>
            </button>
            <div id={panelId} hidden={!isOpen} className="pb-6">
              <ul className="m-0 pl-5 flex flex-col gap-2 muted marker:text-accent-strong">
                {role.bullets.map(b => <li key={b}>{b}</li>)}
              </ul>
              <div className="flex flex-wrap gap-2 mt-4">
                {role.tags.map(t => <Tag key={t} outline className="text-midnight">{t}</Tag>)}
              </div>
            </div>
          </li>
        )
      })}
    </ol>
  )
}
