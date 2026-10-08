'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Pause, Play } from 'lucide-react'
import { SectionHead } from '@/components/pcu'

type Props = {
  images: string[]
  title: string
  subtitle: string
  /** Describes the photos for screen readers, e.g. "AMERTA exchange activity". */
  alt: string
}

const SLOTS = 3

/**
 * Photo diary: three frames that swap to the next photo in turn every few seconds.
 * The first frames render on the server; rotation pauses on request and under
 * prefers-reduced-motion.
 */
export default function RotatingGallery({ images, title, subtitle, alt }: Props) {
  const [shown, setShown] = useState(() => images.slice(0, SLOTS))
  const [playing, setPlaying] = useState(true)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) setPlaying(false)
  }, [])

  useEffect(() => {
    if (!playing || images.length <= SLOTS) return
    let next = SLOTS
    let slot = 0
    const timer = setInterval(() => {
      const src = images[next % images.length]
      const target = slot % SLOTS
      setShown(prev => prev.map((s, i) => (i === target ? src : s)))
      next++
      slot++
    }, 3500)
    return () => clearInterval(timer)
  }, [playing, images])

  return (
    <section className="section bg-midnight">
      <div className="wrap">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-10">
          <SectionHead light eyebrow="Photo diary" title={title} lead={subtitle} className="!mb-0" />
          {images.length > SLOTS && (
            <button
              type="button"
              onClick={() => setPlaying(p => !p)}
              className="pcu-btn pcu-btn--outline text-white"
              aria-pressed={!playing}
            >
              {playing ? <Pause aria-hidden size={16} /> : <Play aria-hidden size={16} />}
              {playing ? 'Pause slideshow' : 'Play slideshow'}
            </button>
          )}
        </div>
        <div className="grid gap-1 md:grid-cols-[3fr_2fr] md:grid-rows-2 md:h-[min(75vh,640px)]" aria-live="off">
          {shown.map((src, i) => (
            <div
              key={i}
              className={`relative overflow-hidden rounded-md bg-[#133256] aspect-[4/3] md:aspect-auto ${i === 0 ? 'md:row-span-2' : ''}`}
            >
              <Image
                key={src}
                src={src}
                alt={`${alt}, photo ${images.indexOf(src) + 1} of ${images.length}`}
                fill
                sizes={i === 0 ? '(min-width: 768px) 60vw, 100vw' : '(min-width: 768px) 40vw, 100vw'}
                className="object-cover animate-[fadeIn_.6s_ease] motion-reduce:animate-none"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
