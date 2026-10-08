import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

type Tone = 'brand' | 'sunrise' | 'dusk' | 'aqua' | 'amber' | 'cerise'

/** Circular gradient badge with a white outline icon (.pcu-icon-badge). */
export function IconBadge({ icon: Icon, tone = 'brand', size = 56, className, children }: {
  icon?: LucideIcon
  tone?: Tone
  size?: number
  className?: string
  children?: React.ReactNode
}) {
  return (
    <span
      aria-hidden="true"
      className={cn('pcu-icon-badge flex-none', tone !== 'brand' && `pcu-icon-badge--${tone}`, className)}
      style={{ '--size': `${size}px` } as React.CSSProperties}
    >
      {Icon ? <Icon strokeWidth={2} /> : children}
    </span>
  )
}
