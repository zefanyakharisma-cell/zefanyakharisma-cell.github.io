import { cn } from '@/lib/utils'

/** Category label (.pcu-tag); `outline` for quiet tags or dark grounds. */
export function Tag({ outline, className, children }: { outline?: boolean; className?: string; children: React.ReactNode }) {
  return <span className={cn('pcu-tag', outline && 'pcu-tag--outline', 'self-start', className)}>{children}</span>
}
