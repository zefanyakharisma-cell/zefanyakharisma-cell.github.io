'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, Expand, X } from 'lucide-react'
import { cn } from '@/lib/utils'

type Props = {
  images: string[]
  /** Describes the set, e.g. "AMERTA exchange activity". Used for alt text. */
  alt: string
  /** Show this many tiles first; the rest open from "Show all". */
  initial?: number
  className?: string
}

/** Masonry photo wall; any photo opens a full-screen lightbox with arrows, swipe and Escape. */
export function PhotoWall({ images, alt, initial = 9, className }: Props) {
  const [open, setOpen] = useState<number | null>(null)
  const [all, setAll] = useState(false)
  const dialog = useRef<HTMLDialogElement>(null)
  const touchX = useRef<number | null>(null)

  const shown = all ? images : images.slice(0, initial)
  const label = (i: number) => `${alt}, photo ${i + 1} of ${images.length}`

  const go = useCallback((delta: number) => {
    setOpen(i => (i === null ? i : (i + delta + images.length) % images.length))
  }, [images.length])

  useEffect(() => {
    const d = dialog.current
    if (!d) return
    if (open !== null && !d.open) d.showModal()
    if (open === null && d.open) d.close()
  }, [open])

  useEffect(() => {
    if (open === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') go(1)
      if (e.key === 'ArrowLeft') go(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, go])

  return (
    <div className={className}>
      <ul className="m-0 p-0 list-none columns-2 md:columns-3 gap-2 [&>li]:mb-2">
        {shown.map((src, i) => (
          <li key={src} className="break-inside-avoid">
            <button
              type="button"
              onClick={() => setOpen(i)}
              className="group relative block w-full overflow-hidden rounded-md border-0 p-0 cursor-zoom-in bg-smoke"
              aria-label={`Open ${label(i)}`}
            >
              <Image
                src={src}
                alt=""
                width={640}
                height={i % 3 === 0 ? 800 : 480}
                sizes="(min-width: 768px) 33vw, 50vw"
                className={cn('block w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.04] motion-reduce:transition-none', i % 3 === 0 ? 'aspect-[4/5]' : 'aspect-[4/3]')}
              />
              <span aria-hidden className="absolute right-2 bottom-2 grid place-items-center w-9 h-9 rounded-pill bg-white/90 text-midnight opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity">
                <Expand size={16} />
              </span>
            </button>
          </li>
        ))}
      </ul>
      {images.length > initial && (
        <div className="text-center mt-4">
          <button type="button" className="pcu-btn pcu-btn--outline text-inherit" onClick={() => setAll(a => !a)}>
            {all ? 'Show fewer' : `Show all ${images.length} photos`}
          </button>
        </div>
      )}

      <dialog
        ref={dialog}
        onClose={() => setOpen(null)}
        onClick={e => { if (e.target === dialog.current) setOpen(null) }}
        aria-label={open !== null ? label(open) : 'Photo viewer'}
        className="m-auto w-screen h-[100dvh] max-w-none max-h-none p-0 border-0 bg-[#0b1626]/95 backdrop:bg-transparent"
        onTouchStart={e => { touchX.current = e.touches[0].clientX }}
        onTouchEnd={e => {
          if (touchX.current === null) return
          const dx = e.changedTouches[0].clientX - touchX.current
          if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1)
          touchX.current = null
        }}
      >
        {open !== null && (
          <div className="relative w-full h-full flex items-center justify-center p-4 sm:p-14">
            <div className="relative w-full h-full">
              <Image key={images[open]} src={images[open]} alt={label(open)} fill sizes="100vw" className="object-contain animate-[fadeIn_.3s_ease] motion-reduce:animate-none" />
            </div>
            <p className="absolute top-4 left-4 m-0 text-sm text-smoke tabular-nums">{open + 1} / {images.length}</p>
            <button type="button" onClick={() => setOpen(null)} aria-label="Close" className="absolute top-3 right-3 grid place-items-center w-11 h-11 rounded-pill bg-white text-midnight border-0 cursor-pointer">
              <X size={20} aria-hidden />
            </button>
            <button type="button" onClick={() => go(-1)} aria-label="Previous photo" className="absolute left-3 top-1/2 -translate-y-1/2 grid place-items-center w-11 h-11 rounded-pill bg-white/90 text-midnight border-0 cursor-pointer">
              <ChevronLeft size={22} aria-hidden />
            </button>
            <button type="button" onClick={() => go(1)} aria-label="Next photo" className="absolute right-3 top-1/2 -translate-y-1/2 grid place-items-center w-11 h-11 rounded-pill bg-white/90 text-midnight border-0 cursor-pointer">
              <ChevronRight size={22} aria-hidden />
            </button>
          </div>
        )}
      </dialog>
    </div>
  )
}
