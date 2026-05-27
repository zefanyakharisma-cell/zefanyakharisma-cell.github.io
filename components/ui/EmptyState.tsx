import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

interface EmptyStateProps {
  icon?: ReactNode
  title: string
  description?: string
  action?: ReactNode
  className?: string
}

export function EmptyState({ icon, title, description, action, className }: EmptyStateProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center py-20 text-center', className)}>
      {icon && (
        <div className="w-12 h-12 rounded-2xl bg-cm-elevated border border-cm-border flex items-center justify-center text-cm-subtle mb-5">
          {icon}
        </div>
      )}
      <h3 className="text-sm font-medium text-cm-text mb-1">{title}</h3>
      {description && <p className="text-sm text-cm-subtle max-w-sm">{description}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  )
}
