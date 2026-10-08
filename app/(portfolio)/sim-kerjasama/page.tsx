import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { simKerjasama as sim } from '@/lib/data/sim'

export const metadata: Metadata = {
  title: 'SIM Kerjasama',
  alternates: { canonical: '/sim-kerjasama' },
  description: sim.tagline,
}

export default function SimKerjasamaPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <p className="label-small mb-3">Information System · Petra Christian University</p>
      <h1 className="font-heading font-bold mb-4" style={{ fontSize: 'clamp(2rem,5vw,3.25rem)', letterSpacing: '-.02em', color: '#19304b' }}>SIM Kerjasama</h1>
      <p className="mb-2 font-semibold" style={{ color: '#19304b' }}>{sim.tagline}</p>
      <p className="mb-14" style={{ color: '#46505c', lineHeight: 1.6, maxWidth: '68ch' }}>{sim.summary}</p>

      <h2 className="font-heading font-bold text-2xl mb-6" style={{ color: '#19304b' }}>Nine goals</h2>
      <ol className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-14">
        {sim.goals.map((goal, i) => (
          <li key={goal} className="card p-5">
            <span className="block text-sm font-bold mb-1" style={{ color: '#2a64a8' }}>G{i + 1}</span>
            <span className="font-semibold" style={{ color: '#19304b' }}>{goal}</span>
          </li>
        ))}
      </ol>

      <h2 className="font-heading font-bold text-2xl mb-6" style={{ color: '#19304b' }}>Eight menus, one document lifecycle</h2>
      <dl className="grid sm:grid-cols-2 gap-x-8 gap-y-5 mb-14">
        {sim.menus.map(menu => (
          <div key={menu.name} style={{ borderBottom: '1px solid #e2e5e9', paddingBottom: 12 }}>
            <dt className="font-semibold" style={{ color: '#19304b' }}>{menu.name}</dt>
            <dd className="text-sm" style={{ color: '#46505c' }}>{menu.desc}</dd>
          </div>
        ))}
      </dl>

      <h2 className="font-heading font-bold text-2xl mb-6" style={{ color: '#19304b' }}>Lighter work for every user</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-14">
        {sim.stakeholders.map(s => (
          <div key={s.group} className="card p-5">
            <h3 className="font-semibold mb-2" style={{ color: '#19304b' }}>{s.group}</h3>
            <p className="text-sm" style={{ color: '#46505c', lineHeight: 1.5 }}>{s.desc}</p>
          </div>
        ))}
      </div>

      <h2 className="font-heading font-bold text-2xl mb-6" style={{ color: '#19304b' }}>What was unmeasured is now measured</h2>
      <div className="overflow-x-auto mb-14">
        <table className="w-full text-sm" style={{ borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#19304b', color: '#fff' }}>
              <th className="text-left p-3">Measure</th>
              <th className="text-left p-3">Before</th>
              <th className="text-left p-3">With the system</th>
            </tr>
          </thead>
          <tbody>
            {sim.metrics.map((m, i) => (
              <tr key={m.measure} style={{ background: i % 2 ? '#f1f1f1' : '#fff' }}>
                <td className="p-3" style={{ color: '#000' }}>{m.measure}</td>
                <td className="p-3" style={{ color: '#46505c' }}>{m.before}</td>
                <td className="p-3 font-semibold" style={{ color: '#19304b' }}>{m.after}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Link href="/sim-realisasi" className="inline-flex items-center gap-2 font-semibold" style={{ color: '#19304b' }}>
        Next: SIM Realisasi <ArrowRight aria-hidden style={{ width: 16, height: 16 }} />
      </Link>
    </div>
  )
}
