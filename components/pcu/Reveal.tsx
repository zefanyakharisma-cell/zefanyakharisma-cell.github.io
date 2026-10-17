import type { Theme } from '@/lib/nav'

/** Marks a block to fade up when it enters the viewport (handled by MotionObserver). `delay` in ms. */
export function Reveal({ children, className, delay = 0, theme }: { children: React.ReactNode; className?: string; delay?: number; theme?: Theme }) {
  return (
    <div data-reveal data-theme={theme} className={className} style={delay ? { '--i': delay / 70 } as React.CSSProperties : undefined}>
      {children}
    </div>
  )
}
