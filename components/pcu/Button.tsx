import Link from 'next/link'
import { cn } from '@/lib/utils'

type Variant = 'primary' | 'accent' | 'outline' | 'inverse' | 'ghost'

const variantClass: Record<Variant, string> = {
  primary: '',
  accent: 'pcu-btn--accent',
  outline: 'pcu-btn--outline',
  inverse: 'pcu-btn--inverse',
  ghost: 'pcu-btn--ghost',
}

type Props = {
  href: string
  variant?: Variant
  className?: string
  children: React.ReactNode
  download?: boolean
}

/** Brand pill button (.pcu-btn). External and download links render a plain <a>. */
export function Button({ href, variant = 'primary', className, children, download }: Props) {
  const cls = cn('pcu-btn', variantClass[variant], className)
  const external = /^(https?:|mailto:)/.test(href)
  if (external || download) {
    return (
      <a
        href={href}
        className={cls}
        download={download || undefined}
        {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {children}
      </a>
    )
  }
  return <Link href={href} className={cls}>{children}</Link>
}
