interface ConstellationSVGProps {
  w?: number
  h?: number
  seed?: number
}

function rng(seed: number, n: number): number {
  return ((Math.sin(seed * n * 9301 + 49297) * 233280) % 1 + 1) % 1
}

export default function ConstellationSVG({ w = 400, h = 200, seed = 1 }: ConstellationSVGProps) {
  const pts: [number, number][] = []
  for (let i = 0; i < 7; i++) {
    pts.push([rng(seed, i) * w, rng(seed, i + 10) * h])
  }

  const lines: [number, number][] = [[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[1,4],[2,5]]

  return (
    <svg
      width={w}
      height={h}
      viewBox={`0 0 ${w} ${h}`}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        opacity: 0.55,
      }}
    >
      {lines.map(([a, b], i) => (
        <line
          key={i}
          x1={pts[a][0]}
          y1={pts[a][1]}
          x2={pts[b][0]}
          y2={pts[b][1]}
          className="cm-constellation-line"
        />
      ))}
      {pts.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={2} fill="rgba(111,168,255,0.35)" />
      ))}
    </svg>
  )
}
