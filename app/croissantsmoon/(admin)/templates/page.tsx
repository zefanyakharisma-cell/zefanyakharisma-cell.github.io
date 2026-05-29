import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardHeader } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { EmptyState } from '@/components/ui/EmptyState'
import { formatDate } from '@/lib/utils'
import { LayoutTemplate, Plus } from 'lucide-react'
import { CreateTemplateModal } from '@/components/admin/CreateTemplateModal'

export const metadata: Metadata = { title: 'Templates' }

async function getTemplates() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('proposal_templates')
    .select('*')
    .eq('is_archived', false)
    .order('created_at', { ascending: false })
  return data ?? []
}

const PROJECT_TYPE_LABELS: Record<string, string> = {
  institutional_website: 'Institutional Website',
  landing_page: 'Landing Page',
  dashboard_system: 'Dashboard System',
  international_office: 'International Office',
  university_digitalization: 'University Digitalization',
  portfolio_website: 'Professional / Personal Portfolio Website',
  custom: 'Custom',
}

export default async function TemplatesPage() {
  const templates = await getTemplates()

  return (
    <div className="px-8 py-8 animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-cm-white">Templates</h1>
          <p className="text-sm text-cm-subtle mt-1">{templates.length} reusable proposal templates</p>
        </div>
        <CreateTemplateModal />
      </div>

      {templates.length === 0 ? (
        <EmptyState
          icon={<LayoutTemplate size={20} />}
          title="No templates yet"
          description="Create reusable templates to speed up your proposal workflow."
        />
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {templates.map(t => (
            <Card key={t.id} hover className="group">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="w-9 h-9 rounded-lg bg-cm-accent/10 border border-cm-accent/20 flex items-center justify-center">
                    <LayoutTemplate size={15} className="text-cm-accent" />
                  </div>
                  <span className="text-xs text-cm-subtle">{t.blocks?.length ?? 0} blocks</span>
                </div>
                <h3 className="text-sm font-semibold text-cm-white mt-3 group-hover:text-cm-accent transition-colors">{t.name}</h3>
                <span className="text-xs text-cm-subtle">{PROJECT_TYPE_LABELS[t.project_type] ?? t.project_type}</span>
              </CardHeader>
              {t.description && (
                <CardContent>
                  <p className="text-xs text-cm-subtle leading-relaxed">{t.description}</p>
                </CardContent>
              )}
              <div className="px-5 py-3 border-t border-cm-border flex items-center justify-between">
                <span className="text-xs text-cm-subtle">{formatDate(t.created_at)}</span>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
