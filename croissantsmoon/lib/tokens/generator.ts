import { v4 as uuidv4 } from 'uuid'

const PREFIXES = ['CM', 'PCU', 'INTL', 'GLOBAL', 'INST', 'PREM']
const ALPHA = 'ABCDEFGHJKLMNPQRSTUVWXYZ'
const NUMS = '0123456789'

function randChar(charset: string): string {
  return charset[Math.floor(Math.random() * charset.length)]
}

function randSegment(len: number, charset: string): string {
  return Array.from({ length: len }, () => randChar(charset)).join('')
}

export function generateToken(): string {
  const prefix = PREFIXES[Math.floor(Math.random() * PREFIXES.length)]
  const alpha = randSegment(2, ALPHA) + randSegment(2, NUMS)
  const tail = randSegment(2, ALPHA) + randSegment(2, NUMS)
  return `${prefix}-${alpha}-${tail}`
}

export function generateSlug(orgName: string): string {
  const base = orgName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
  const suffix = uuidv4().split('-')[0]
  return `${base}-${suffix}`
}

export function generateSessionId(): string {
  return uuidv4()
}

export function isTokenExpired(expiresAt: string | null): boolean {
  if (!expiresAt) return false
  return new Date(expiresAt) < new Date()
}

export function defaultExpiration(days = 14): string {
  const d = new Date()
  d.setDate(d.getDate() + days)
  return d.toISOString()
}
