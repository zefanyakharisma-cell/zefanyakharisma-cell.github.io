import type { Metadata } from 'next'
import { Award, BookOpen, GraduationCap, School } from 'lucide-react'
import { Card, IconBadge, PageHero, SectionHead, Shape, Tag } from '@/components/pcu'

export const metadata: Metadata = {
  title: 'Education',
  alternates: { canonical: '/education' },
  description: 'A degree in International Relations from Universitas Airlangga, with published research and international awards.',
}

const publications = [
  'Kebijakan Luar Negeri Pro-Israel Amerika Serikat di Pemerintahan Obama',
  'Menelaah Interdependensi Korea Selatan-Tiongkok Akibat THAAD dalam Analisis Neoliberalisme',
  'Israel dan Perjanjian Abraham: Upaya Peningkatan Status Israel dalam Sistem Internasional',
]

export default function Education() {
  return (
    <>
      <PageHero
        back={{ href: '/about-overview', label: 'About' }}
        eyebrow="Education"
        title="Academic background"
        lead="International relations training that still shapes how I approach partnerships, policy and cross-cultural work."
      />

      <section className="section section--smoke">
        <div className="wrap grid-2">
          <Card shape={<Shape kind="quarter-bl" color="amber" className="w-[88px] right-0 top-0" />}>
            <IconBadge icon={GraduationCap} />
            <Tag>Jul 2020 – Mar 2024</Tag>
            <h2 className="!text-2xl">Bachelor&apos;s in International Relations and Affairs</h2>
            <p className="font-semibold m-0">Universitas Airlangga</p>
            <p className="muted m-0">
              International relations theory, foreign policy analysis and cross-cultural dynamics. Published papers on U.S.–ASEAN economic
              cooperation and Abraham Accords diplomacy, and served as Assistant Lecturer in Foreign Policy Analysis and as a Research Assistant
              presenting at the 9th ICoCSPA in 2023.
            </p>
          </Card>
          <Card>
            <IconBadge icon={School} tone="aqua" />
            <Tag>2017 – 2020</Tag>
            <h2 className="!text-2xl">High school, Mathematics and Natural Sciences</h2>
            <p className="font-semibold m-0">SMAN 15 Surabaya</p>
            <p className="muted m-0">An analytical, problem-solving foundation before studying international relations.</p>
          </Card>
        </div>
      </section>

      <section className="section">
        <div className="wrap grid-2 !gap-14 items-start">
          <div>
            <SectionHead eyebrow="Honors" title="Awards" size="sub" />
            <div className="flex flex-col gap-4">
              <Card tone="smoke" bodyClassName="!flex-row items-center !gap-4">
                <IconBadge icon={Award} tone="amber" size={48} />
                <div><b>Gold Medal</b><p className="muted m-0 text-sm">World Youth Invention and Innovation Award 2022</p></div>
              </Card>
              <Card tone="smoke" bodyClassName="!flex-row items-center !gap-4">
                <IconBadge icon={Award} size={48} />
                <div><b>Bronze Medal</b><p className="muted m-0 text-sm">Your-K, Your-ASEAN Short Video Contest</p></div>
              </Card>
            </div>
          </div>
          <div>
            <SectionHead eyebrow="Research" title="Academic publications" size="sub" />
            <ul className="m-0 p-0 list-none border-t border-line">
              {publications.map(p => (
                <li key={p} className="flex gap-3 py-4 border-b border-line">
                  <BookOpen aria-hidden size={18} className="text-accent-strong flex-none mt-1" />
                  <span lang="id">{p}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  )
}
