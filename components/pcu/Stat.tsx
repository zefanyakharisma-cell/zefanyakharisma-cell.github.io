import { cn } from '@/lib/utils'

export function Stat({ value, label, amber, className }: { value: React.ReactNode; label: React.ReactNode; amber?: boolean; className?: string }) {
  const long = typeof value === 'string' && value.length > 6
  return (
    <div className={cn('stat', amber && 'stat--amber', long && 'stat--long', className)}>
      <b>{value}</b>
      <span>{label}</span>
    </div>
  )
}
