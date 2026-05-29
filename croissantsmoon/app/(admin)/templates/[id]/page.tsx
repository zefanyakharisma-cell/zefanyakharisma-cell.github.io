import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { TemplateEditor } from '@/components/admin/TemplateEditor'

export const metadata: Metadata = { title: 'Edit Template' }

async function getTemplate(id: string) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('proposal_templates')
    .select('*')
    .eq('id', id)
    .single()
  if (error) return null
  return data
}

export default async function TemplateDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const template = await getTemplate(id)
  if (!template) notFound()

  return (
    <div className="px-8 py-8 animate-fade-in">
      <Link href="/templates" className="flex items-center gap-2 text-sm text-cm-subtle hover:text-cm-text transition-colors mb-6">
        <ArrowLeft size={14} /> Back to Templates
      </Link>
      <TemplateEditor template={template} />
    </div>
  )
}
