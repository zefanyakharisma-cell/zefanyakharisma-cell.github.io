import type { Metadata } from 'next'
import Image from 'next/image'
import { BookOpenCheck, ClipboardCheck, Mail, Mountain, PartyPopper, PlaneLanding, Presentation, Users } from 'lucide-react'
import { PageHero, PhotoWall, Reveal, SectionHead, Shape, Stat } from '@/components/pcu'
import AmertaStats from '@/components/projects/AmertaStats'
import { Lifecycle } from '@/components/viz/Lifecycle'
import { Sankey } from '@/components/viz/Sankey'
import { Treemap } from '@/components/viz/Treemap'
import { TrendLine } from '@/components/viz/TrendLine'
import { WorldMap } from '@/components/viz/WorldMap'
import { DATA } from '@/lib/data/amerta'
import { stats } from '@/lib/data/profile'
import { buildWorldMap } from '@/lib/geo'

export const metadata: Metadata = {
  title: 'AMERTA',
  alternates: { canonical: '/amerta' },
  description: 'AMERTA, Universitas Airlangga\'s semester exchange: 207 students from 14 countries across four batches, mapped and charted.',
}

const GALLERY_IMAGES = [
  '/assets/images/amerta/img-0570.jpg', '/assets/images/amerta/img-0576.jpg',
  '/assets/images/amerta/img-0578.jpg', '/assets/images/amerta/img-0589.jpg',
  '/assets/images/amerta/img-0590.jpg', '/assets/images/amerta/img-0594.jpg',
  '/assets/images/amerta/img-0629.jpg', '/assets/images/amerta/img-0637.jpg',
  '/assets/images/amerta/img-0641.jpg', '/assets/images/amerta/img-0642.jpg',
  '/assets/images/amerta/img-0980.jpg', '/assets/images/amerta/img-0993.jpg',
  '/assets/images/amerta/img-1003.jpg', '/assets/images/amerta/img-1006.jpg',
  '/assets/images/amerta/img-1007.jpg', '/assets/images/amerta/img-1008.jpg',
  '/assets/images/amerta/img-1807.jpg', '/assets/images/amerta/img-1813.jpg',
  '/assets/images/amerta/img-3529.jpg', '/assets/images/amerta/img-3534.jpg',
  '/assets/images/amerta/img-3535.jpg', '/assets/images/amerta/img-3720.jpg',
  '/assets/images/amerta/img-3723.jpg', '/assets/images/amerta/img-3867.jpg',
  '/assets/images/amerta/img-3868.jpg', '/assets/images/amerta/img-3869.jpg',
  '/assets/images/amerta/fullsizerender.jpg', '/assets/images/amerta/amerta-1.jpg',
]

const steps = [
  { icon: <Mail size={20} aria-hidden />, title: 'Outreach', text: 'Promotion, nominations and recruitment with partner universities.' },
  { icon: <Presentation size={20} aria-hidden />, title: 'Pre-departure', text: 'Academic systems, culture, immigration and housing briefings.' },
  { icon: <BookOpenCheck size={20} aria-hidden />, title: 'Credit transfer', text: 'Course mapping between Airlangga faculties and home universities.' },
  { icon: <PlaneLanding size={20} aria-hidden />, title: 'Arrival', text: 'Airport pick-up, visas, immigration and accommodation.' },
  { icon: <Users size={20} aria-hidden />, title: 'Orientation', text: 'Campus life, safety and support services in week one.' },
  { icon: <ClipboardCheck size={20} aria-hidden />, title: 'Monitoring', text: 'Academic progress and well-being, all semester.' },
  { icon: <Mountain size={20} aria-hidden />, title: 'Culture', text: 'Trips and intercultural experiences across East Java.' },
  { icon: <PartyPopper size={20} aria-hidden />, title: 'Farewell', text: 'Celebration, feedback and lasting relationships.' },
]

const BATCHES = ['21', '22', '23', '24'] as const

/** Country → university flow; small senders and small partners are grouped so the chart stays legible. */
function flow() {
  const TOP = 5
  const unis = DATA.all.universities
  const countries = unis.map(g => ({ region: g.region, total: g.items.reduce((n, u) => n + (u.count ?? 0), 0) })).sort((a, b) => b.total - a.total)
  const topCountries = new Set(countries.slice(0, TOP).map(c => c.region))
  const nodes: { name: string; column: number }[] = []
  const index = (name: string, column: number) => {
    let i = nodes.findIndex(n => n.name === name && n.column === column)
    if (i < 0) i = nodes.push({ name, column }) - 1
    return i
  }
  const links = new Map<string, { source: number; target: number; value: number }>()
  for (const g of unis) {
    const from = index(topCountries.has(g.region) ? g.region : 'Other countries', 0)
    for (const u of g.items) {
      const big = (u.count ?? 0) >= 6
      const to = index(big ? u.name.replace(/ \(.*\)$/, '') : 'Other partners', 1)
      const key = `${from}-${to}`
      const l = links.get(key) ?? { source: from, target: to, value: 0 }
      l.value += u.count ?? 0
      links.set(key, l)
    }
  }
  // Keep the "Other" buckets at the bottom of each column so bands don't cross.
  const order = nodes.map((n, i) => ({ n, i })).sort((a, b) => a.n.column - b.n.column || Number(/^Other/.test(a.n.name)) - Number(/^Other/.test(b.n.name)) || a.i - b.i)
  const remap = new Map(order.map((o, j) => [o.i, j]))
  return {
    nodes: order.map(o => o.n),
    links: [...links.values()].map(l => ({ ...l, source: remap.get(l.source)!, target: remap.get(l.target)! })),
  }
}

export default function Amerta() {
  const map = buildWorldMap(Object.fromEntries(DATA.all.nationalities.map(n => [n.country, n.count])))
  const { nodes, links } = flow()

  return (
    <>
      <PageHero
        back={{ href: '/projects-overview', label: 'All projects' }}
        tags={['Exchange program', 'Universitas Airlangga']}
        kicker="Airlangga Mobility, Exchange, Research & Transfer Academic"
        title="AMERTA"
        lead="Airlangga's flagship semester exchange, run end to end for four batches."
      />

      <div className="wrap">
        <div className="relative h-[clamp(260px,36vw,480px)] rounded-md overflow-hidden">
          <Image
            src="/assets/images/student-services/tailor-made/griffith-unair-2.jpg"
            alt="International exchange students at Universitas Airlangga"
            fill
            priority
            sizes="(min-width: 1200px) 1100px, 100vw"
            className="object-cover"
          />
        </div>
      </div>

      <section className="section !pb-10 decor-glow-tr">
        <div className="wrap grid-4 !gap-8">
          <Stat value={stats.amertaParticipants} label="Students, XXI–XXIV" />
          <Stat value="14" label="Countries" />
          <Stat value="24" label="Partner universities" />
          <Stat value={stats.programBudget} label="Budget per cohort" />
        </div>
      </section>

      <section className="section !pt-6 decor-ring-bl">
        <div className="wrap">
          <SectionHead eyebrow="Reach" title="Where students came from" />
          <Reveal><WorldMap map={map} unit="students" label="AMERTA students by country" /></Reveal>
        </div>
      </section>

      <section className="section section--smoke decor-grid">
        <div className="wrap flex flex-col gap-12">
          <div className="grid gap-8 lg:grid-cols-2 items-start">
            <div className="pcu-card">
              <h3 className="!text-xl mb-4">Batch by batch</h3>
              <TrendLine
                label="AMERTA students and countries per batch"
                xs={BATCHES.map(b => DATA[b].label.replace('AMERTA ', ''))}
                series={[
                  { label: 'Students', values: BATCHES.map(b => DATA[b].students) },
                  { label: 'Countries', values: BATCHES.map(b => DATA[b].countries) },
                ]}
              />
            </div>
            <div className="pcu-card">
              <h3 className="!text-xl mb-4">Where they studied</h3>
              <Treemap
                label="AMERTA course registrations by Airlangga faculty"
                height={280}
                items={(DATA.all.faculties ?? []).map(f => ({ label: f.name.replace(/ \(.*\)$/, ''), value: f.count, display: String(f.count) }))}
              />
            </div>
          </div>
          <div>
            <SectionHead eyebrow="Flow" title="Country to university" />
            <div className="pcu-card">
              <Sankey nodes={nodes} links={links} label="AMERTA students from sending country to home university" height={460} />
            </div>
          </div>
        </div>
      </section>

      <section className="section relative overflow-hidden decor-glow-br">
        <Shape kind="quarter-bl" color="amber" className="w-[120px] right-0 top-0 hidden md:block" />
        <div className="wrap">
          <SectionHead eyebrow="Process" title="Eight steps, one journey" />
          <Lifecycle steps={steps} label="AMERTA program journey" />
        </div>
      </section>

      <div aria-hidden className="pcu-pattern pattern-band" />
      <section className="section !pt-0 decor-ring-tr">
        <div className="wrap">
          <SectionHead eyebrow="Gallery" title="Moments" />
          <PhotoWall images={GALLERY_IMAGES} alt="AMERTA exchange activity" />
        </div>
      </section>

      <AmertaStats />
    </>
  )
}
