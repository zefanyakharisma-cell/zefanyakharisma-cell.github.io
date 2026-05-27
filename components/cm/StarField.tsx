'use client'

import { useMemo } from 'react'

interface StarFieldProps {
  count?: number
}

// Deterministic pseudo-random based on index (no hydration mismatch)
function seededRng(seed: number): number {
  return ((Math.sin(seed * 9301 + 49297) * 233280) % 1 + 1) % 1
}

export default function StarField({ count = 60 }: StarFieldProps) {
  const stars = useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      const x   = seededRng(i * 7 + 1) * 100
      const y   = seededRng(i * 7 + 2) * 100
      const sz  = seededRng(i * 7 + 3) * 2.2 + 0.6
      const dur = (seededRng(i * 7 + 4) * 3 + 1.8).toFixed(1)
      const del = (seededRng(i * 7 + 5) * 4).toFixed(1)
      const op  = (seededRng(i * 7 + 6) * 0.6 + 0.3).toFixed(2)
      return { x, y, sz, dur, del, op, key: i }
    })
  }, [count])

  return (
    <>
      {stars.map(s => (
        <span
          key={s.key}
          className="cm-star"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: `${s.sz}px`,
            height: `${s.sz}px`,
            opacity: Number(s.op),
            ['--dur' as string]: `${s.dur}s`,
            ['--delay' as string]: `${s.del}s`,
          }}
        />
      ))}
    </>
  )
}
