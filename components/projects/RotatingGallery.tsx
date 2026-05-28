'use client'
import { useEffect, useRef } from 'react'

type Props = {
  images: string[]
  title: string
  subtitle: string
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export default function RotatingGallery({ images, title, subtitle }: Props) {
  const img0 = useRef<HTMLImageElement>(null)
  const img1 = useRef<HTMLImageElement>(null)
  const img2 = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const imgRefs = [img0, img1, img2]
    let queue = shuffle(images)
    let qi = 3
    let slot = 0

    if (img0.current) img0.current.src = queue[0] || ''
    if (img1.current) img1.current.src = queue[1] || ''
    if (img2.current) img2.current.src = queue[2] || ''

    const timer = setInterval(() => {
      const currentSlot = slot % 3
      slot++
      const imgEl = imgRefs[currentSlot]?.current
      if (!imgEl) return

      const nextSrc = queue[qi % queue.length]
      qi++
      if (qi >= queue.length) {
        queue = shuffle(images)
        qi = 0
      }

      imgEl.style.opacity = '0'
      setTimeout(() => {
        if (!imgEl.isConnected) return
        imgEl.src = nextSrc
        const show = () => { imgEl.style.opacity = '1' }
        if (imgEl.complete && imgEl.naturalWidth) show()
        else { imgEl.onload = show; imgEl.onerror = show }
      }, 500)
    }, 3000)

    return () => clearInterval(timer)
  }, [images])

  return (
    <div style={{ background: '#0D0D0B', paddingTop: 80 }}>
      <div className="max-w-6xl mx-auto px-6" style={{ paddingBottom: 48 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
          <span style={{ display: 'block', width: 28, height: 1.5, background: 'rgba(255,255,255,0.2)' }} />
          <span style={{ color: 'rgba(255,255,255,0.38)', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase' as const }}>Photo Diary</span>
        </div>
        <h2 className="font-heading" style={{ fontWeight: 700, fontSize: 'clamp(2rem,5vw,3rem)', color: '#fff', letterSpacing: '-0.02em', margin: '0 0 10px' }}>{title}</h2>
        <p style={{ color: 'rgba(255,255,255,0.32)', fontSize: '0.875rem', margin: 0 }}>{subtitle}</p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gridTemplateRows: '1fr 1fr', height: '75vh', gap: 3 }}>
        <div style={{ gridRow: 'span 2', overflow: 'hidden', background: '#111' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img ref={img0} loading="lazy" src="" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'opacity .5s ease', display: 'block' }} />
        </div>
        <div style={{ overflow: 'hidden', background: '#111' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img ref={img1} loading="lazy" src="" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'opacity .5s ease', display: 'block' }} />
        </div>
        <div style={{ overflow: 'hidden', background: '#111' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img ref={img2} loading="lazy" src="" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'opacity .5s ease', display: 'block' }} />
        </div>
      </div>
    </div>
  )
}
