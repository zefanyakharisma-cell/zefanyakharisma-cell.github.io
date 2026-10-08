import { ArrowRight } from 'lucide-react'
import { Button } from './Button'
import { Shape } from './Shape'

type Props = {
  eyebrow: string
  /** The headline figure, e.g. "100+". Printed as large white text. */
  value: string
  label: React.ReactNode
  cta?: { href: string; label: string }
}

/** Closing band on the section gradient (data-theme): one key number and the next step. */
export function ThemeBand({ eyebrow, value, label, cta }: Props) {
  return (
    <section className="theme-surface theme-band footer-overlap relative overflow-hidden">
      <div aria-hidden className="pcu-pattern pattern-band absolute inset-x-0 top-0" />
      <Shape kind="ring-n" className="theme-ring w-[clamp(200px,26vw,360px)] right-[4%] bottom-0 hidden md:block" />
      <div className="wrap relative">
        <div className="flex flex-col items-start gap-3 min-w-0 max-w-[560px]">
          <span className="pcu-eyebrow text-amber">{eyebrow}</span>
          <b className="theme-band__value">{value}</b>
          <p className="m-0 text-xl text-white">{label}</p>
          {cta && (
            <Button href={cta.href} variant="inverse" className="mt-4">
              {cta.label} <ArrowRight aria-hidden size={16} />
            </Button>
          )}
        </div>
      </div>
    </section>
  )
}
