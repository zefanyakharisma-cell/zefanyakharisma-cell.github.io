'use client'

import { useState } from 'react'
import { Copy, CheckCheck } from 'lucide-react'
import { cn } from '@/lib/utils'

export function CopyButton({ value, label = 'Copy', className }: { value: string; label?: string; className?: string }) {
  const [copied, setCopied] = useState(false)

  async function copy() {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      /* clipboard unavailable — no-op */
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={label}
      title={copied ? 'Copied!' : label}
      className={cn(
        'flex-shrink-0 p-2 rounded-lg border border-cm-border text-cm-subtle hover:text-cm-text hover:border-cm-muted transition-colors',
        className
      )}
    >
      {copied ? <CheckCheck size={13} className="text-emerald-400" /> : <Copy size={13} />}
    </button>
  )
}
