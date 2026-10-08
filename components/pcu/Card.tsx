import Link from 'next/link'
import { cn } from '@/lib/utils'

type Tone = 'white' | 'midnight' | 'smoke'

type Props = {
  tone?: Tone
  href?: string
  className?: string
  /** A decorative <Shape> placed in a corner; it is clipped by the card. */
  shape?: React.ReactNode
  /** Classes for the inner content wrapper (default: a vertical stack). */
  bodyClassName?: string
  children: React.ReactNode
}

/** Brand card (.pcu-card): 8px radius, space-6 padding, shadow-card. */
export function Card({ tone = 'white', href, className, shape, bodyClassName, children }: Props) {
  const cls = cn(
    'pcu-card flex flex-col',
    tone === 'midnight' && 'pcu-card--midnight',
    tone === 'smoke' && 'bg-smoke shadow-none',
    href && 'no-underline transition-transform hover:-translate-y-px motion-reduce:transition-none',
    className,
  )
  const body = (
    <>
      {shape}
      <div className={cn('relative flex flex-1 flex-col gap-3', bodyClassName)}>{children}</div>
    </>
  )
  if (href) {
    if (/^https?:/.test(href)) return <a href={href} className={cls} target="_blank" rel="noopener noreferrer">{body}</a>
    if (href.startsWith('mailto:')) return <a href={href} className={cls}>{body}</a>
    return <Link href={href} className={cls}>{body}</Link>
  }
  return <div className={cls}>{body}</div>
}
