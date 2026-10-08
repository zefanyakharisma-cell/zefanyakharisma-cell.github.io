import { cn } from '@/lib/utils'
import { CountUp } from './CountUp'

export function Stat({ value, label, amber, className }: { value: React.ReactNode; label: React.ReactNode; amber?: boolean; className?: string }) {
  const text = typeof value === 'number' ? String(value) : value
  const long = typeof text === 'string' && text.length > 6
  return (
    <div className={cn('stat', amber && 'stat--amber', long && 'stat--long', className)}>
      <b>{typeof text === 'string' && /\d/.test(text) ? <CountUp value={text} /> : text}</b>
      <span>{label}</span>
    </div>
  )
}
