import React from 'react'

interface AstronautFloatProps {
  img: number
  style: React.CSSProperties
  size?: number
  dur?: number
  del?: number
  rot?: number
  x1?: number
  y1?: number
  x2?: number
  y2?: number
}

export default function AstronautFloat({
  img,
  style,
  size = 100,
  dur = 26,
  del = 0,
  rot = -8,
  x1 = 14,
  y1 = -18,
  x2 = -10,
  y2 = 12,
}: AstronautFloatProps) {
  const cssVars = {
    '--ad': `${dur}s`,
    '--adl': `${del}s`,
    '--ar0': `${rot}deg`,
    '--ar1': `${rot + 10}deg`,
    '--ar2': `${rot - 6}deg`,
    '--ax1': `${x1}px`,
    '--ay1': `${y1}px`,
    '--ax2': `${x2}px`,
    '--ay2': `${y2}px`,
  } as React.CSSProperties

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`/assets/graphics/croissants-moon/${img}.png`}
      alt=""
      aria-hidden="true"
      className="cm-astro"
      loading="lazy"
      style={{
        ...style,
        width: `${size}px`,
        ...cssVars,
      }}
    />
  )
}
