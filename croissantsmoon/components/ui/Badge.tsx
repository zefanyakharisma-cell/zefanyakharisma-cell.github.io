import { cn } from '@/lib/utils'
import type { LeadStatus, LeadTemperature, ProposalStatus } from '@/types'
import { leadStatusLabel, leadStatusColor, temperatureColor, proposalStatusColor } from '@/lib/utils'
import { Flame, Snowflake, Thermometer } from 'lucide-react'

interface BadgeProps {
  children: React.ReactNode
  className?: string
  variant?: 'default' | 'outline'
}

export function Badge({ children, className, variant = 'outline' }: BadgeProps) {
  return (
    <span className={cn(
      'inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-xs font-medium border',
      variant === 'outline' ? 'bg-transparent' : 'border-transparent',
      className
    )}>
      {children}
    </span>
  )
}

export function LeadStatusBadge({ status }: { status: LeadStatus }) {
  return (
    <Badge className={cn('border', leadStatusColor(status))}>
      {leadStatusLabel(status)}
    </Badge>
  )
}

export function TemperatureBadge({ temp }: { temp: LeadTemperature }) {
  const icons = { cold: Snowflake, warm: Thermometer, hot: Flame }
  const Icon = icons[temp]
  return (
    <span className={cn('inline-flex items-center gap-1 text-xs font-medium', temperatureColor(temp))}>
      <Icon size={12} />
      {temp.charAt(0).toUpperCase() + temp.slice(1)}
    </span>
  )
}

export function ProposalStatusBadge({ status }: { status: ProposalStatus }) {
  const labels: Record<ProposalStatus, string> = {
    draft: 'Draft',
    active: 'Active',
    expired: 'Expired',
    archived: 'Archived',
    closed_won: 'Won',
    closed_lost: 'Lost',
  }
  return (
    <Badge className={cn('border', proposalStatusColor(status))}>
      {labels[status]}
    </Badge>
  )
}

export function EngagementBadge({ score }: { score: number }) {
  const color = score >= 80 ? 'text-red-400 border-red-400/20 bg-red-400/5'
    : score >= 30 ? 'text-amber-400 border-amber-400/20 bg-amber-400/5'
    : 'text-cm-subtle border-cm-border'
  return <Badge className={cn('border', color)}>{score}pts</Badge>
}
