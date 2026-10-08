import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { simRealisasi as sim } from '@/lib/data/sim'

export const metadata: Metadata = {
  title: 'SIM Realisasi',
  alternates: { canonical: '/sim-realisasi' },
  description: sim.mission,
}

export default function SimRealisasiPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <p className="label-small mb-3">Information System · Petra Christian University</p>
      <h1 className="font-heading font-bold mb-4" style={{ fontSize: 'clamp(2rem,5vw,3.25rem)', letterSpacing: '-.02em', color: '#19304b' }}>SIM Realisasi</h1>
      <p className="mb-2 font-semibold" style={{ color: '#19304b' }}>{sim.tagline}</p>
      <p className="mb-14" style={{ color: '#46505c', lineHeight: 1.6, maxWidth: '68ch' }}>{sim.mission}</p>

      <div className="grid md:grid-cols-3 gap-4 mb-8">
        {sim.outcomes.map((o, i) => (
          <div key={o.title} className="card p-5">
            <span className="block text-3xl font-bold mb-2" style={{ color: '#2a64a8' }}>{i + 1}</span>
            <h2 className="font-semibold mb-1" style={{ color: '#19304b' }}>{o.title}</h2>
            <p className="text-sm" style={{ color: '#46505c', lineHeight: 1.5 }}>{o.desc}</p>
          </div>
        ))}
      </div>
      <div className="grid md:grid-cols-2 gap-4 mb-14 text-sm">
        <p className="card p-5" style={{ color: '#46505c' }}><strong style={{ color: '#135d50' }}>Included:</strong> {sim.included}</p>
        <p className="card p-5" style={{ color: '#46505c' }}><strong style={{ color: '#b34700' }}>Not included:</strong> {sim.excluded}</p>
      </div>

      <h2 className="font-heading font-bold text-2xl mb-6" style={{ color: '#19304b' }}>Reporting an activity on one page</h2>
      <ol className="flex flex-wrap gap-3 mb-6">
        {sim.formSteps.map((step, i) => (
          <li key={step} className="tag">{i + 1} · {step}</li>
        ))}
      </ol>
      <dl className="grid sm:grid-cols-2 gap-x-8 gap-y-5 mb-14">
        {sim.menus.map(menu => (
          <div key={menu.name} style={{ borderBottom: '1px solid #e2e5e9', paddingBottom: 12 }}>
            <dt className="font-semibold" style={{ color: '#19304b' }}>{menu.name}</dt>
            <dd className="text-sm" style={{ color: '#46505c' }}>{menu.desc}</dd>
          </div>
        ))}
      </dl>

      <h2 className="font-heading font-bold text-2xl mb-6" style={{ color: '#19304b' }}>Each system shows the other&apos;s data</h2>
      <div className="grid md:grid-cols-2 gap-4 mb-14">
        {([['In SIM Kerjasama', sim.integration.inKerjasama], ['In SIM Realisasi', sim.integration.inRealisasi]] as const).map(([heading, items]) => (
          <div key={heading} className="card p-6">
            <p className="label-small mb-4">{heading}</p>
            {items.map(item => (
              <div key={item.title} className="mb-4">
                <h3 className="font-semibold" style={{ color: '#19304b' }}>{item.title}</h3>
                <p className="text-sm" style={{ color: '#46505c', lineHeight: 1.5 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        ))}
      </div>

      <Link href="/sim-kerjasama" className="inline-flex items-center gap-2 font-semibold" style={{ color: '#19304b' }}>
        <ArrowLeft aria-hidden style={{ width: 16, height: 16 }} /> SIM Kerjasama
      </Link>
    </div>
  )
}
