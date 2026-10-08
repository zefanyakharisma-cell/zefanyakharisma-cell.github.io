import { cn } from '@/lib/utils'

export type ShapeKind =
  | 'circle' | 'semicircle' | 'quarter' | 'quarter-tl' | 'quarter-br' | 'quarter-bl'
  | 'bar' | 'ring-u' | 'ring-n' | 'ring-u-line' | 'ring-n-line' | 'double-arch' | 'tab'

export const brand = {
  midnight: '#19304b',
  blue: '#3880d0',
  teal: '#45b8bc',
  amber: '#ffbc00',
  cerise: '#ec008c',
  white: '#ffffff',
} as const

type Props = {
  kind: ShapeKind
  color?: keyof typeof brand
  className?: string
  style?: React.CSSProperties
}

/** Decorative brand geometry (.pcu-shape--*). Always aria-hidden; never put text on it. */
export function Shape({ kind, color = 'blue', className, style }: Props) {
  return (
    <span
      aria-hidden="true"
      className={cn('pcu-shape', `pcu-shape--${kind}`, 'pointer-events-none absolute', className)}
      style={{ color: brand[color], ...style }}
    />
  )
}
