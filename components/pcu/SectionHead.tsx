import { cn } from '@/lib/utils'

/** Eyebrow + section title (+ optional lead), the system's section-title pattern. */
export function SectionHead({ eyebrow, title, lead, size = 'section', className, light }: {
  eyebrow?: string
  title: React.ReactNode
  lead?: React.ReactNode
  size?: 'section' | 'sub'
  className?: string
  light?: boolean
}) {
  return (
    <div className={cn('section-head', className)}>
      {eyebrow && <span className={cn('pcu-eyebrow', light && '!text-amber')}>{eyebrow}</span>}
      <h2 className={cn(size === 'section' ? 'h-section' : 'h-sub', light && 'text-white')}>{title}</h2>
      {lead && <p className={cn('lead', light && '!text-smoke')}>{lead}</p>}
    </div>
  )
}
