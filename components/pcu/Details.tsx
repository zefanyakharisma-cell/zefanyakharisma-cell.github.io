import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

/** "More" drawer for longer copy, built on native <details> (keyboard and screen-reader friendly). */
export function Details({ summary = 'More', children, className, light }: { summary?: string; children: React.ReactNode; className?: string; light?: boolean }) {
  return (
    <details className={cn('group details', className)}>
      <summary className={cn(
        'inline-flex items-center gap-1.5 cursor-pointer list-none font-semibold text-sm min-h-[32px] select-none',
        light ? 'text-amber' : 'text-accent-strong',
      )}>
        {summary}
        <ChevronDown aria-hidden size={16} className="transition-transform group-open:rotate-180 motion-reduce:transition-none" />
      </summary>
      <div className={cn('pt-2 text-[.9375rem] leading-relaxed', light ? 'text-smoke' : 'text-ink-secondary')}>{children}</div>
    </details>
  )
}
