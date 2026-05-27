import { cn } from '@/lib/utils'

interface CardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
}

export function Card({ children, className, hover }: CardProps) {
  return (
    <div className={cn(
      'bg-cm-surface border border-cm-border rounded-xl shadow-card',
      hover && 'hover:border-cm-muted hover:shadow-elevated transition-all duration-200 cursor-pointer',
      className
    )}>
      {children}
    </div>
  )
}

export function CardHeader({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn('px-6 py-5 border-b border-cm-border', className)}>
      {children}
    </div>
  )
}

export function CardContent({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn('px-6 py-5', className)}>
      {children}
    </div>
  )
}

export function CardFooter({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn('px-6 py-4 border-t border-cm-border', className)}>
      {children}
    </div>
  )
}

interface StatCardProps {
  label: string
  value: string | number
  sub?: string
  icon?: React.ReactNode
  trend?: { value: number; positive: boolean }
  className?: string
}

export function StatCard({ label, value, sub, icon, trend, className }: StatCardProps) {
  return (
    <Card className={cn('p-5', className)}>
      <div className="flex items-start justify-between mb-4">
        <span className="text-xs font-medium text-cm-subtle uppercase tracking-widest">{label}</span>
        {icon && <span className="text-cm-subtle">{icon}</span>}
      </div>
      <div className="mt-1">
        <span className="text-3xl font-light text-cm-white">{value}</span>
        {sub && <span className="ml-2 text-sm text-cm-subtle">{sub}</span>}
      </div>
      {trend && (
        <div className={cn('mt-2 text-xs font-medium', trend.positive ? 'text-emerald-400' : 'text-red-400')}>
          {trend.positive ? '↑' : '↓'} {Math.abs(trend.value)}% this month
        </div>
      )}
    </Card>
  )
}
