import type { Metadata } from 'next'
import {
  Bookmark, Calendar, CheckCircle, ClipboardList, GitMerge, Layers, Megaphone, PieChart, Search, UploadCloud, Users, Zap,
} from 'lucide-react'
import { Card, IconBadge, PageHero, SectionHead, Shape, Tag } from '@/components/pcu'
import { ProcessSteps } from '@/components/pcu/ProcessSteps'
import { SubNav } from '@/components/pcu/SubNav'

export const metadata: Metadata = {
  title: 'International Grants Management',
  alternates: { canonical: '/intl-grants' },
  description: 'A system to inform, maintain and execute international grants at Petra Christian University: a digital dashboard and a physical operational workflow.',
}

const principles = [
  { icon: Layers, title: 'Digital + physical', text: 'The dashboard is the backbone; briefings, printed guides and in-person advising make sure students can actually apply and succeed.' },
  { icon: Zap, title: 'Live grant status', text: 'Every grant, applicant and stage updates live, so staff see changes the moment they happen.' },
  { icon: Calendar, title: 'Deadline-first calendar', text: 'Every deadline across active programmes, sorted by urgency, so no submission window is missed.' },
  { icon: GitMerge, title: 'Stage-based pipeline', text: "Each applicant's stage across concurrent grant cycles, so bottlenecks and follow-ups are obvious." },
]

const dashboard = [
  { icon: Search, title: 'Discovery & matching', text: "Matches a student's faculty and programme against eligibility criteria and surfaces the most relevant grants." },
  { icon: Bookmark, title: 'Bookmarks', text: 'Students can save grants they are considering, and signed-in users keep them across devices.' },
  { icon: UploadCloud, title: 'Document attachments', text: 'Staff attach supporting PDFs and forms to each grant, with a full audit trail.' },
  { icon: PieChart, title: 'Outcome analytics', text: 'Acceptance rates, funding secured and placements, calculated from live data and ready for leadership reporting.' },
]

const physical = [
  { icon: Megaphone, title: 'Informing students', text: 'Grant briefing sessions, printed opportunity guides and targeted outreach to eligible faculties, before deadlines pass.' },
  { icon: ClipboardList, title: 'Maintaining records', text: 'A physical archive of grant documents, applicant records and outcome reports, kept in step with the dashboard.' },
  { icon: Users, title: 'Guiding applications', text: 'In-person advising, document checklists and application reviews, so students submit complete, competitive applications.' },
  { icon: CheckCircle, title: 'Executing placements', text: 'Post-selection coordination with partner institutions and funders, so accepted students are placed and supported.' },
]

export default function IntlGrantsPage() {
  return (
    <>
      <PageHero
        eyebrow="International Education · PCU"
        tags={['In development']}
        title="International grants management"
        lead="A system to inform, maintain and execute international grants at Petra Christian University, with a digital dashboard and a physical operational workflow."
      />
      <SubNav />

      <section className="section">
        <div className="wrap grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] items-start">
          <div>
            <SectionHead eyebrow="What's being built" title="A system for every stage of every grant" />
            <div className="flex flex-col gap-4 muted text-[1.0625rem]">
              <p className="m-0">
                International grant programmes, from government scholarships to university-funded exchanges, need coordination across awareness,
                application, selection, placement and completion. At PCU this information was spread across emails, shared drives and spreadsheets.
              </p>
              <p className="m-0">
                The system has two layers: a <strong className="text-midnight">digital dashboard</strong> that tracks every grant, applicant and deadline, and a{' '}
                <strong className="text-midnight">physical workflow</strong> that keeps students informed and supported through each cycle.
              </p>
              <p className="m-0">The goal is one source of truth that faculty, staff and students can consult without chasing updates by email.</p>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {principles.map(p => (
              <Card key={p.title} tone="smoke">
                <IconBadge icon={p.icon} size={44} />
                <h3 className="!text-lg">{p.title}</h3>
                <p className="muted m-0 text-[.9375rem]">{p.text}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="pcu-surface-brand section relative overflow-hidden">
        <Shape kind="ring-u" color="teal" className="w-[280px] right-[4%] top-0" />
        <div className="wrap relative">
          <SectionHead
            light
            eyebrow="The dashboard"
            title="International grants dashboard"
            lead="A self-built web application that tracks international grants from opportunity discovery to placement outcome."
          />
          <div className="grid-4">
            {dashboard.map(d => (
              <div key={d.title} className="border-t-2 border-amber pt-5 flex flex-col gap-2">
                <d.icon aria-hidden size={24} className="text-amber" />
                <h3 className="text-white !text-lg">{d.title}</h3>
                <p className="text-smoke m-0 text-[.9375rem]">{d.text}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-2 mt-10">
            {['Live updates', 'Role-based access', 'Analytics', 'Audit trail'].map(t => <Tag key={t} outline className="text-white">{t}</Tag>)}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <SectionHead
            eyebrow="Physical system"
            title="Beyond the dashboard: the physical workflow"
            lead="A dashboard alone doesn't move a student from interest to application. The physical layer makes sure students at PCU are informed, supported and guided through each grant cycle."
          />
          <ProcessSteps steps={physical} />
        </div>
      </section>
    </>
  )
}
