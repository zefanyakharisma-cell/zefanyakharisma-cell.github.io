'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Pause, Play } from 'lucide-react'

/** Endless horizontal photo strip. Pausable; static under reduced motion. */
export function PhotoStrip({ images, alt }: { images: string[]; alt: string }) {
  const [playing, setPlaying] = useState(true)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) setPlaying(false)
  }, [])
  const loop = [...images, ...images]
  return (
    <div className="relative">
      <div className="overflow-hidden" aria-label={alt} role="region">
        <ul
          className="m-0 p-0 list-none flex gap-3 w-max animate-[marquee_60s_linear_infinite]"
          style={{ animationPlayState: playing ? 'running' : 'paused' }}
        >
          {loop.map((src, i) => (
            <li key={`${src}-${i}`} aria-hidden={i >= images.length} className="relative flex-none w-[min(320px,70vw)] aspect-[4/3] rounded-md overflow-hidden bg-smoke">
              <Image src={src} alt={i < images.length ? `${alt}, photo ${i + 1}` : ''} fill sizes="320px" className="object-cover" />
            </li>
          ))}
        </ul>
      </div>
      <button
        type="button"
        onClick={() => setPlaying(p => !p)}
        aria-pressed={!playing}
        className="absolute right-4 bottom-4 inline-flex items-center gap-2 rounded-pill bg-white text-midnight border-0 px-4 min-h-[40px] text-sm font-semibold shadow-card cursor-pointer"
      >
        {playing ? <Pause size={14} aria-hidden /> : <Play size={14} aria-hidden />}
        {playing ? 'Pause' : 'Play'}
      </button>
    </div>
  )
}
