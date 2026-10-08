import { Check, X } from 'lucide-react'
import { Swimlane } from '@/components/viz/Swimlane'
import { StatusFlow } from '@/components/pcu/StatusFlow'
import type { Process } from '@/lib/data/sim'

/** "Before" and "with the system" lists, side by side. */
export function SimBackground({ problem, change }: { problem: string[]; change: string[] }) {
  return (
    <div className="grid-2">
      <div className="rounded-panel bg-smoke p-[clamp(20px,3vw,32px)] flex flex-col gap-4">
        <span className="pcu-eyebrow text-accent-pending">The problem</span>
        <ul className="m-0 p-0 list-none flex flex-col gap-3">
          {problem.map(p => (
            <li key={p} className="flex gap-3 items-start">
              <span aria-hidden className="grid place-items-center w-6 h-6 mt-0.5 rounded-pill bg-accent-pending text-white flex-none"><X size={14} /></span>
              <span className="text-ink-secondary">{p}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="rounded-panel pcu-surface-brand p-[clamp(20px,3vw,32px)] flex flex-col gap-4">
        <span className="pcu-eyebrow text-amber">With the system</span>
        <ul className="m-0 p-0 list-none flex flex-col gap-3">
          {change.map(p => (
            <li key={p} className="flex gap-3 items-start">
              <span aria-hidden className="grid place-items-center w-6 h-6 mt-0.5 rounded-pill bg-amber text-midnight flex-none"><Check size={14} /></span>
              <span className="text-smoke">{p}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

/** Numbered rule cards under a process diagram. */
export function RuleCards({ rules, children }: { rules: { title: string; text: string }[]; children?: React.ReactNode }) {
  return (
    <div className="grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(min(100%,240px),1fr))]">
      {children}
      {rules.map((r, i) => (
        <div key={r.title} className="rounded-md border border-line bg-white p-5 flex flex-col gap-2">
          <span className="font-mono text-xs text-accent-strong">R{i + 1}</span>
          <h3 className="m-0 text-base font-bold text-midnight">{r.title}</h3>
          <p className="m-0 text-sm text-ink-secondary">{r.text}</p>
        </div>
      ))}
    </div>
  )
}

/** One business process: summary, swimlane, status sequence and rules. */
export function ProcessPanel({ process, status, rules, extra }: {
  process: Process
  status: React.ReactNode
  rules: { title: string; text: string }[]
  extra?: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-8">
      <p className="m-0 lead max-w-[70ch]">{process.summary}</p>
      <Swimlane lanes={process.lanes} steps={process.steps} label={process.label} />
      {status}
      <RuleCards rules={rules}>{extra}</RuleCards>
    </div>
  )
}

export { StatusFlow }
