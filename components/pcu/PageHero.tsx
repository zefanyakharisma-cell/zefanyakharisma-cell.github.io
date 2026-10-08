import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Tag } from './Tag'

type Props = {
  eyebrow?: string
  kicker?: string
  title: React.ReactNode
  lead?: React.ReactNode
  tags?: string[]
  back?: { href: string; label: string }
  /** Midnight-gradient brand surface instead of white. */
  brand?: boolean
  /** Decorative <Shape>s, positioned absolutely inside the hero. */
  shapes?: React.ReactNode
  aside?: React.ReactNode
  children?: React.ReactNode
  className?: string
}

/** Page opening: back link, tags, eyebrow, kicker + h1 and lead. */
export function PageHero({ eyebrow, kicker, title, lead, tags, back, brand, shapes, aside, children, className }: Props) {
  return (
    <section
      className={cn(
        'relative overflow-hidden',
        brand ? 'pcu-surface-brand py-[clamp(48px,7vw,96px)]' : 'pt-[clamp(40px,6vw,80px)] pb-[clamp(32px,4vw,56px)]',
        className,
      )}
    >
      {shapes}
      <div className="wrap relative flex flex-wrap items-end gap-12">
        <div className="flex flex-col gap-5 min-w-0 flex-[1_1_520px]">
          {back && (
            <Link href={back.href} className={cn('pcu-btn pcu-btn--ghost self-start', brand ? 'text-white' : 'text-midnight')}>
              <ArrowLeft aria-hidden size={16} /> {back.label}
            </Link>
          )}
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.map((t, i) => <Tag key={t} outline={brand || i > 0}>{t}</Tag>)}
            </div>
          )}
          {eyebrow && <span className={cn('pcu-eyebrow', brand ? 'text-amber' : 'text-accent-strong')}>{eyebrow}</span>}
          <h1 className={cn('h-page', brand && 'text-white')}>
            {kicker && <span className="pcu-kicker">{kicker}</span>}
            {title}
          </h1>
          {lead && <p className={cn('lead max-w-[60ch]', brand && '!text-smoke')}>{lead}</p>}
          {children}
        </div>
        {aside}
      </div>
    </section>
  )
}
