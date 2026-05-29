'use client'

import { useState } from 'react'
import { Copy, Check } from 'lucide-react'
import { cn } from '@/lib/utils'

export function CopyButton({ text, className }: { text: string; className?: string }) {
  const [copied, setCopied] = useState(false)

  async function copy() {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      onClick={copy}
      title="Copy to clipboard"
      className={cn(
        'p-1.5 rounded-md hover:bg-cm-elevated text-cm-subtle hover:text-cm-text transition-colors flex-shrink-0',
        className
      )}
    >
      {copied
        ? <Check size={12} className="text-green-400" />
        : <Copy size={12} />
      }
    </button>
  )
}
