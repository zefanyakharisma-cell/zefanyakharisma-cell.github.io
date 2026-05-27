import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { LeadStatus, LeadTemperature, ProposalStatus } from '@/types'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(value: number, currency = 'IDR'): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)
}

export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit', month: 'short', year: 'numeric',
  }).format(new Date(date))
}

export function timeAgo(date: string | Date): string {
  const seconds = Math.floor((Date.now() - new Date(date).getTime()) / 1000)
  if (seconds < 60) return 'just now'
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  if (days < 30) return `${days}d ago`
  return formatDate(date)
}

export function leadStatusLabel(status: LeadStatus): string {
  const map: Record<LeadStatus, string> = {
    lead_identified: 'Lead Identified',
    audit_completed: 'Audit Completed',
    proposal_drafted: 'Proposal Drafted',
    proposal_sent: 'Proposal Sent',
    opened: 'Opened',
    under_discussion: 'Under Discussion',
    negotiation: 'Negotiation',
    closed_won: 'Closed Won',
    closed_lost: 'Closed Lost',
    archived: 'Archived',
  }
  return map[status]
}

export function leadStatusColor(status: LeadStatus): string {
  const map: Record<LeadStatus, string> = {
    lead_identified: 'text-cm-subtle border-cm-border',
    audit_completed: 'text-blue-400 border-blue-400/20 bg-blue-400/5',
    proposal_drafted: 'text-purple-400 border-purple-400/20 bg-purple-400/5',
    proposal_sent: 'text-cm-accent border-cm-accent/20 bg-cm-accent/5',
    opened: 'text-yellow-400 border-yellow-400/20 bg-yellow-400/5',
    under_discussion: 'text-orange-400 border-orange-400/20 bg-orange-400/5',
    negotiation: 'text-amber-400 border-amber-400/20 bg-amber-400/5',
    closed_won: 'text-emerald-400 border-emerald-400/20 bg-emerald-400/5',
    closed_lost: 'text-red-400 border-red-400/20 bg-red-400/5',
    archived: 'text-cm-subtle border-cm-border',
  }
  return map[status]
}

export function temperatureColor(temp: LeadTemperature): string {
  const map: Record<LeadTemperature, string> = {
    cold: 'text-blue-400',
    warm: 'text-amber-400',
    hot: 'text-red-400',
  }
  return map[temp]
}

export function proposalStatusColor(status: ProposalStatus): string {
  const map: Record<ProposalStatus, string> = {
    draft: 'text-cm-subtle border-cm-border',
    active: 'text-emerald-400 border-emerald-400/20 bg-emerald-400/5',
    expired: 'text-red-400 border-red-400/20 bg-red-400/5',
    archived: 'text-cm-subtle border-cm-border',
    closed_won: 'text-cm-gold border-cm-gold/20 bg-cm-gold/5',
    closed_lost: 'text-red-400 border-red-400/20 bg-red-400/5',
  }
  return map[status]
}

export function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

export function daysUntil(date: string | Date): number {
  return Math.ceil((new Date(date).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
}
