/**
 * PCU-style loader: the brand half rings drawing in amber, teal and blue around
 * the ZK monogram, with an amber progress bar. Motion stops under
 * prefers-reduced-motion (pcu.css).
 */
export function Loader({ label = 'Loading', compact }: { label?: string; compact?: boolean }) {
  return (
    <div role="status" aria-label={label} className={compact ? 'pcu-loader-mark pcu-loader-mark--compact' : 'pcu-loader-mark'}>
      <svg viewBox="0 0 200 200" width={compact ? 96 : 148} height={compact ? 96 : 148} aria-hidden>
        <path className="pcu-loader__ring pcu-loader__ring--1" d="M10 110 A90 90 0 0 0 190 110" />
        <path className="pcu-loader__ring pcu-loader__ring--2" d="M30 90 A70 70 0 0 1 170 90" />
        <path className="pcu-loader__ring pcu-loader__ring--3" d="M48 112 A52 52 0 0 0 152 112" />
        <g transform="translate(46 46) scale(1.08)" fill="#ffffff">
          <path d="M17 17 H47 V26.5 L29 50.5 H47 V60 H17 V50.5 L35 26.5 H17 Z" />
          <path d="M52 17 H62 V33 L72.5 17 H84.5 L71 37 L85.5 60 H73.5 L62 42 V60 H52 Z" />
        </g>
      </svg>
      {!compact && <span className="pcu-loader__name">Zefanya Kharisma Nugroho</span>}
      <span className="pcu-loader__bar" aria-hidden />
    </div>
  )
}
