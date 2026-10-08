'use client'

import { useState } from 'react'
import { institutionDomain } from '@/lib/data/domains'
import { cn } from '@/lib/utils'

const STOP = new Set(['of', 'the', 'and', '&', 'for', 'de', 'in', 'pt', 'pt.', 'cv', 'tbk', 'tbk.'])

function initials(name: string) {
  const short = name.match(/\(([A-Za-z_]{2,6})\)/)?.[1]
  if (short) return short.replace('_', '').slice(0, 3).toUpperCase()
  return name
    .replace(/\(.*?\)/g, '')
    .split(/[\s\-,/]+/)
    .filter(w => w && !STOP.has(w.toLowerCase()))
    .slice(0, 2)
    .map(w => w[0])
    .join('')
    .toUpperCase()
}

/**
 * An institution's logo, taken from its website's icon. Institutions without a
 * known domain, or whose icon fails to load, get a PCU-styled initials badge.
 */
export function InstitutionLogo({ name, size = 36, className }: { name: string; size?: number; className?: string }) {
  const domain = institutionDomain(name)
  const [failed, setFailed] = useState(false)
  const box = cn('flex-none grid place-items-center rounded-md overflow-hidden', className)
  if (!domain || failed) {
    return (
      <span aria-hidden className={cn(box, 'bg-midnight text-amber font-bold tracking-tight')} style={{ width: size, height: size, fontSize: size * 0.34 }}>
        {initials(name)}
      </span>
    )
  }
  return (
    <span aria-hidden className={cn(box, 'bg-white border border-line')} style={{ width: size, height: size }}>
      {/* eslint-disable-next-line @next/next/no-img-element -- third-party favicon, sized by the service */}
      <img
        src={`https://www.google.com/s2/favicons?domain=${domain}&sz=64`}
        alt=""
        width={Math.round(size * 0.66)}
        height={Math.round(size * 0.66)}
        loading="lazy"
        decoding="async"
        referrerPolicy="no-referrer"
        onError={() => setFailed(true)}
      />
    </span>
  )
}
