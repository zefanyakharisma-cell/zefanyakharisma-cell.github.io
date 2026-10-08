'use client'

import { useState } from 'react'
import { Card, PhotoCard, Shape, Tag } from '@/components/pcu'
import { FilterChips } from '@/components/pcu/FilterChips'

type Kind = 'Programs' | 'Systems'

const PROJECTS: { kind: Kind; href: string; title: string; tag: string; number: string; unit: string; src?: string; alt?: string; position?: string }[] = [
  { kind: 'Programs', href: '/amerta', title: 'AMERTA', tag: 'Exchange · UNAIR', number: '207', unit: 'students', src: '/assets/images/amerta/amerta-1.jpg', alt: 'AMERTA exchange students' },
  { kind: 'Programs', href: '/aci', title: 'ACI', tag: 'Cultural immersion · UNAIR', number: '191', unit: 'participants', src: '/assets/images/aci/aci-4.jpg', alt: 'ACI participants' },
  { kind: 'Programs', href: '/aero', title: 'AERO', tag: 'Exhibition · UNAIR', number: '19', unit: 'booths', src: '/assets/images/aero/aero-header-1.jpg', alt: 'AERO exhibition', position: 'center 30%' },
  { kind: 'Systems', href: '/sim-kerjasama', title: 'SIM Kerjasama', tag: 'MoU · MoA · PCU', number: '9', unit: 'goals, one agreement lifecycle' },
  { kind: 'Systems', href: '/sim-realisasi', title: 'SIM Realisasi', tag: 'RENSTRA · PCU', number: '4', unit: 'steps to report an activity' },
]

/** Project cards, each led by one number, filterable by kind. */
export default function ProjectGrid() {
  const [kinds, setKinds] = useState<string[]>([])
  const shown = PROJECTS.filter(p => kinds.length === 0 || kinds.includes(p.kind))

  return (
    <div>
      <div className="mb-8">
        <FilterChips label="Filter projects" options={['Programs', 'Systems']} value={kinds} onChange={setKinds} />
      </div>
      <ul className="m-0 p-0 list-none grid gap-6 [grid-template-columns:repeat(auto-fill,minmax(min(100%,300px),1fr))]" aria-live="polite">
        {shown.map((p, i) => (
          <li key={p.href} className="animate-[fadeIn_.4s_ease] motion-reduce:animate-none">
            {p.src ? (
              <PhotoCard
                href={p.href}
                src={p.src}
                alt={p.alt ?? p.title}
                tag={`${p.number} ${p.unit}`}
                title={p.title}
                text={p.tag}
                className="!min-h-[420px] h-full"
                imagePosition={p.position}
                sizes="(min-width: 1024px) 33vw, 100vw"
              />
            ) : (
              <Card
                tone={i % 2 ? undefined : 'midnight'}
                href={p.href}
                className="!min-h-[420px] h-full"
                shape={i % 2
                  ? <Shape kind="quarter-bl" color="teal" className="w-[120px] right-0 top-0" />
                  : <Shape kind="ring-u" color="blue" className="w-[180px] right-6 top-0" />}
              >
                <div className="mt-auto flex flex-col gap-2">
                  <span className={`text-[4rem] leading-none font-bold tracking-[-0.03em] ${i % 2 ? 'text-midnight' : 'text-white'}`}>{p.number}</span>
                  <span className={i % 2 ? 'muted' : 'text-smoke'}>{p.unit}</span>
                  <Tag outline className={`self-start mt-3 ${i % 2 ? 'text-midnight' : 'text-white'}`}>{p.tag}</Tag>
                  <h3 className={`!text-2xl ${i % 2 ? '' : 'text-white'}`}>{p.title}</h3>
                </div>
              </Card>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
