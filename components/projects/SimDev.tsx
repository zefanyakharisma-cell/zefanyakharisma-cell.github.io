import { ArrowRight, Clock, ExternalLink, FlaskConical, Github, Lock, Server } from 'lucide-react'
import { Details, IconBadge, SectionHead, Shape, Stat } from '@/components/pcu'
import { StatusFlow } from '@/components/pcu/StatusFlow'
import { Tabs } from '@/components/pcu/Tabs'
import { Erd } from '@/components/viz/Erd'
import { ProcessToData } from '@/components/viz/ProcessToData'
import type { Process } from '@/lib/data/sim'
import type { DevSystem } from '@/lib/data/simDev'

const STICKY = 138

/** The Programmer point of view of a SIM page: architecture, process → data, ERD, rules. */
export function SimDev({ dev, processes, name, integration }: {
  dev: DevSystem
  processes: Process[]
  name: string
  integration: { title: string; items: { label: string; text: string }[] }
}) {
  return (
    <>
      <section className="section relative overflow-hidden decor-grid">
        <div aria-hidden className="pcu-glow pcu-glow--aqua w-[420px] h-[420px] -right-24 -top-24" />
        <div className="wrap relative flex flex-col gap-10">
          <SectionHead eyebrow="Programmer POV" title={`How ${name} is built`} lead="Transcribed from the source repository: migrations, functions, README and rules. The database owns the business rules; the app calls into it." />
          <div className="grid-4 !gap-8">
            {dev.counts.map((c, i) => <Stat key={c.label} value={c.value} label={c.label} amber={i === 0} />)}
          </div>
          <div className="grid-2 !gap-4">
            {dev.principles.map(p => (
              <div key={p.title} className="rounded-md border border-line bg-white p-5 flex flex-col gap-2">
                <h3 className="m-0 text-base font-bold text-midnight">{p.title}</h3>
                <p className="m-0 text-sm text-ink-secondary">{p.text}</p>
              </div>
            ))}
          </div>
          <a href={dev.repo} target="_blank" rel="noopener noreferrer" className="pcu-btn pcu-btn--outline self-start">
            <Github aria-hidden size={18} /> View the repository <ExternalLink aria-hidden size={14} />
          </a>
        </div>
      </section>

      <section className="section section--smoke">
        <div className="wrap flex flex-col gap-8">
          <SectionHead eyebrow="Architecture" title="Stack and moving parts" />
          <div className="grid gap-4 lg:grid-cols-[1fr_auto_1fr_auto_1fr] items-stretch">
            {dev.arch.map((a, i) => (
              <div key={a.title} className="contents">
                <div className={`relative overflow-hidden rounded-panel p-6 flex flex-col gap-3 ${i === 1 ? 'pcu-surface-brand' : 'bg-white border border-line'}`}>
                  {i === 1 && <Shape kind="ring-u" color="amber" className="w-[140px] -right-6 top-0 opacity-90" />}
                  <span className={`relative flex items-center gap-2 font-bold ${i === 1 ? 'text-white' : 'text-midnight'}`}><Server aria-hidden size={18} className={i === 1 ? 'text-amber' : 'text-accent-strong'} />{a.title}</span>
                  <ul className={`relative m-0 pl-5 flex flex-col gap-1.5 text-sm ${i === 1 ? 'text-smoke' : 'text-ink-secondary'}`}>
                    {a.items.map(it => <li key={it}>{it}</li>)}
                  </ul>
                </div>
                {i < dev.arch.length - 1 && <ArrowRight aria-hidden size={26} className="self-center justify-self-center text-amber rotate-90 lg:rotate-0" />}
              </div>
            ))}
          </div>
          <div className="relative overflow-x-auto rounded-panel bg-white border border-line">
            <table className="w-full min-w-[560px] border-collapse text-left text-sm">
              <thead><tr className="bg-midnight text-white"><th scope="col" className="p-3 w-40">Layer</th><th scope="col" className="p-3">Choice</th></tr></thead>
              <tbody>{dev.stack.map(s => <tr key={s.layer} className="border-t border-line"><th scope="row" className="p-3 font-semibold text-midnight">{s.layer}</th><td className="p-3 text-ink-secondary">{s.choice}</td></tr>)}</tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <SectionHead eyebrow="Business process → data" title="What each step does to the database" lead="Pick a step: the functions it calls, the tables it writes, the status it sets and the rules that guard it. The touched tables light up in the ERD." />
          <Tabs
            label={`${name} process to data`}
            stickyTop={STICKY}
            tabs={processes.map(p => ({ key: `dev-${p.key}`, label: p.label, panel: <ProcessToData process={p} dev={dev} /> }))}
          />
        </div>
      </section>

      <section className="section section--smoke relative overflow-hidden">
        <Shape kind="ring-n-line" color="blue" className="w-[360px] -left-24 bottom-0" />
        <div className="wrap relative">
          <SectionHead eyebrow="Entity relationship diagram" title="Entities and attributes" lead={`The core of the ${name} schema, grouped by domain. Select a table to trace its relationships.`} />
          <Erd entities={dev.entities} relations={dev.relations} domains={dev.domains} label={`${name} entity relationship diagram`} />
        </div>
      </section>

      <section className="section">
        <div className="wrap flex flex-col gap-8">
          <SectionHead eyebrow="Data dictionary" title="Every table shown, column by column" size="sub" />
          <div className="grid-3 !gap-4">
            {dev.domains.map(d => (
              <Details key={d.key} summary={`${d.label} (${dev.entities.filter(e => e.domain === d.key).length})`} className="rounded-md border border-line p-4 bg-white">
                <div className="flex flex-col gap-4">
                  {dev.entities.filter(e => e.domain === d.key).map(e => (
                    <div key={e.id}>
                      <p className="m-0 font-mono font-bold text-midnight text-sm">{e.schema ? `${e.schema}.` : ''}{e.id}</p>
                      <p className="m-0 font-mono text-xs leading-relaxed">{e.columns.map(c => `${c.name}${c.key ? ` (${c.key === 'LFK' ? 'FK*' : c.key})` : ''}`).join(', ')}{e.more ? `, +${e.more}` : ''}</p>
                    </div>
                  ))}
                </div>
              </Details>
            ))}
          </div>
          <p className="m-0 text-xs text-ink-muted">FK* = logical reference to a view or registry, checked by a function because views cannot be foreign-key targets.</p>
        </div>
      </section>

      <section className="section section--smoke">
        <div className="wrap">
          <SectionHead eyebrow="Business rules" title="Where each rule is enforced" />
          <div className="relative overflow-x-auto rounded-panel bg-white border border-line">
            <table className="w-full min-w-[720px] border-collapse text-left text-sm">
              <thead><tr className="bg-midnight text-white"><th scope="col" className="p-3 w-20">ID</th><th scope="col" className="p-3">Rule</th><th scope="col" className="p-3 w-56">Enforced by</th></tr></thead>
              <tbody>
                {dev.rules.map(r => (
                  <tr key={r.id} className="border-t border-line align-top">
                    <th scope="row" className="p-3 font-mono text-accent-strong">{r.id}</th>
                    <td className="p-3 text-ink-secondary">{r.text}</td>
                    <td className="p-3"><code className="font-mono text-xs bg-smoke rounded-sm px-2 py-1 text-midnight">{r.where}</code></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap flex flex-col gap-6">
          <SectionHead eyebrow="Enums & state machines" title="The values the database allows" size="sub" />
          {dev.enums.map(e => (
            <div key={e.name} className="flex flex-col gap-2">
              <code className="font-mono text-sm font-bold text-midnight">{e.name}</code>
              <StatusFlow label={e.name} main={e.values} />
            </div>
          ))}
        </div>
      </section>

      <section className="section section--smoke relative overflow-hidden">
        <div aria-hidden className="pcu-glow pcu-glow--amber w-[360px] h-[360px] -left-24 -bottom-24" />
        <div className="wrap relative grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHead eyebrow="Scheduled jobs" title="What runs on its own" size="sub" />
            <ul className="m-0 p-0 list-none flex flex-col gap-3">
              {dev.jobs.map(j => (
                <li key={j.name} className="rounded-md bg-white border border-line p-4 flex gap-3">
                  <Clock aria-hidden size={18} className="text-amber flex-none mt-0.5" />
                  <span><code className="font-mono text-sm font-bold text-midnight">{j.name}</code><span className="block text-xs text-accent-strong">{j.schedule}</span><span className="block text-sm text-ink-secondary">{j.does}</span></span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <SectionHead eyebrow="Security" title="Access is the database's job" size="sub" />
            <ul className="m-0 p-0 list-none flex flex-col gap-3">
              {dev.security.map(s => (
                <li key={s.title} className="rounded-md bg-white border border-line p-4 flex gap-3">
                  <Lock aria-hidden size={18} className="text-accent-strong flex-none mt-0.5" />
                  <span><b className="block text-midnight">{s.title}</b><span className="text-sm text-ink-secondary">{s.text}</span></span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHead eyebrow="Integration contract" title={integration.title} size="sub" />
            <ul className="m-0 p-0 list-none flex flex-col gap-3">
              {integration.items.map(it => (
                <li key={it.label} className="flex gap-3 items-start">
                  <IconBadge size={36} tone="aqua"><ArrowRight size={16} /></IconBadge>
                  <span><b className="block text-midnight">{it.label}</b><span className="text-sm text-ink-secondary">{it.text}</span></span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <SectionHead eyebrow="Testing" title="What the test suite covers" size="sub" />
            <ul className="m-0 p-0 list-none grid gap-2 sm:grid-cols-2">
              {dev.tests.map(t => (
                <li key={t} className="flex gap-2 items-start text-sm text-ink-secondary"><FlaskConical aria-hidden size={16} className="text-emerald flex-none mt-0.5" />{t}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  )
}
