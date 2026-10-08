import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Shape } from './Shape'
import { Tag } from './Tag'

type Props = {
  eyebrow?: string
  kicker?: string
  title: React.ReactNode
  lead?: React.ReactNode
  tags?: string[]
  back?: { href: string; label: string }
  /** Decorative <Shape>s, positioned absolutely inside the hero. */
  shapes?: React.ReactNode
  aside?: React.ReactNode
  children?: React.ReactNode
  className?: string
}

/** Page opening on the section's gradient (data-theme): back link, tags, eyebrow,
 *  kicker + h1 and lead. Without `shapes` it gets the section's half ring (--theme-ring). */
export function PageHero({ eyebrow, kicker, title, lead, tags, back, shapes, aside, children, className }: Props) {
  return (
    <section className={cn('page-hero theme-surface relative overflow-hidden py-[clamp(48px,7vw,96px)]', className)}>
      <div aria-hidden className="hero-glow" />
      {shapes ?? <Shape kind="ring-u" className="theme-ring w-[clamp(88px,18vw,260px)] -right-3 sm:right-[4%] top-0" />}
      <div aria-hidden className="pcu-pattern pattern-band absolute inset-x-0 bottom-0" />
      <div className="wrap relative flex flex-wrap items-end gap-12">
        <div className="flex flex-col gap-5 min-w-0 flex-[1_1_520px]">
          {back && (
            <Link href={back.href} className="pcu-btn pcu-btn--ghost self-start text-white">
              <ArrowLeft aria-hidden size={16} /> {back.label}
            </Link>
          )}
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.map(t => <Tag key={t} outline>{t}</Tag>)}
            </div>
          )}
          {eyebrow && <span className="pcu-eyebrow text-amber">{eyebrow}</span>}
          <h1 className="h-page text-white">
            {kicker && <span className="pcu-kicker">{kicker}</span>}
            {title}
          </h1>
          {lead && <p className="lead max-w-[60ch] !text-smoke">{lead}</p>}
          {children}
        </div>
        {aside}
      </div>
    </section>
  )
}
