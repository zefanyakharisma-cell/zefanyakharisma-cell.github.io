'use client'

import { useState } from 'react'
import Image from 'next/image'
import { RotateCcw } from 'lucide-react'
import { cn } from '@/lib/utils'

/** Icon + short title on the front, optionally over a photo; one line on the back. Click, Enter or Space flips it. */
export function FlipCard({ icon, title, back, badge, tone = 'white', image }: {
  /** A rendered icon, e.g. <BookOpen />. Shown inside a brand badge. */
  icon?: React.ReactNode
  title: string
  back: string
  badge?: string
  tone?: 'white' | 'midnight'
  /** A decorative photo behind the front face, under a midnight scrim. */
  image?: string
}) {
  const [flipped, setFlipped] = useState(false)
  return (
    <button
      type="button"
      aria-pressed={flipped}
      onClick={() => setFlipped(f => !f)}
      className="flip group relative block w-full min-h-[190px] text-left border-0 bg-transparent p-0 cursor-pointer [perspective:1000px]"
    >
      <span className={cn('flip-inner relative block h-full min-h-[190px] transition-transform duration-500 [transform-style:preserve-3d] motion-reduce:transition-none', flipped && '[transform:rotateY(180deg)]')}>
        <span className={cn('pcu-card !absolute inset-0 flex flex-col justify-between [backface-visibility:hidden]', (tone === 'midnight' || image) && 'pcu-card--midnight')} aria-hidden={flipped}>
          {image && <>
            <Image src={image} alt="" fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover" />
            <span aria-hidden className="absolute inset-0 bg-[linear-gradient(to_top,rgba(19,50,86,.95)_10%,rgba(19,50,86,.45)_60%,rgba(19,50,86,.2)_100%)]" />
          </>}
          {badge ? (
            <span className="pcu-icon-badge relative font-bold text-[.9375rem]" style={{ '--size': '52px' } as React.CSSProperties}>{badge}</span>
          ) : icon ? <span className="pcu-icon-badge relative" style={{ '--size': '52px' } as React.CSSProperties}>{icon}</span> : null}
          <span className="relative flex items-end justify-between gap-3">
            <span className="text-lg font-bold leading-snug">{title}</span>
            <RotateCcw aria-hidden size={16} className="flex-none opacity-50" />
          </span>
        </span>
        <span className="pcu-card pcu-card--midnight !absolute inset-0 flex items-center [backface-visibility:hidden] [transform:rotateY(180deg)]" aria-hidden={!flipped}>
          <span className="text-[1.0625rem] leading-snug text-white">{back}</span>
        </span>
      </span>
      <span className="sr-only">{flipped ? back : 'Show details'}</span>
    </button>
  )
}
