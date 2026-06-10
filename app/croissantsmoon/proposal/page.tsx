import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import { ProposalStatusBadge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { ProposalActions } from '@/components/admin/ProposalActions'
import { daysUntil } from '@/lib/utils'
import Link from 'next/link'
import Image from 'next/image'
import { Plus, Eye, FileText } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Proposals — CroissantsMoon',
  robots: { index: false, follow: false },
}

async function getProposals() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('proposals')
    .select('*, lead:leads(organization)')
    .order('created_at', { ascending: false })
  return data ?? []
}

export default async function ProposalPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const isAdmin = !!user

  const proposals = await getProposals()

  return (
    <div className="min-h-screen bg-cm-black text-cm-text">
      <nav className="sticky top-0 z-20 bg-cm-black/80 backdrop-blur-xl border-b border-cm-border">
        <div className="max-w-6xl mx-auto px-8 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image
              src="/croissantsmoon/cm-logo-circle.png"
              alt="CroissantsMoon"
              width={24}
              height={24}
              className="w-6 h-6 rounded-md"
            />
            <span className="text-sm font-medium text-cm-white">CroissantsMoon</span>
          </div>
          {isAdmin ? (
            <Link href="/croissantsmoon/proposals/new">
              <Button variant="primary" size="sm"><Plus size={14} /> New Proposal</Button>
            </Link>
          ) : (
            <Link href="/croissantsmoon/login" className="text-xs text-cm-subtle hover:text-cm-text transition-colors">
              Admin
            </Link>
          )}
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-8 py-10 animate-cm-fade-in">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-cm-white">Proposals</h1>
          <p className="text-sm text-cm-subtle mt-1">{proposals.length} proposals</p>
        </div>

        {proposals.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-12 h-12 rounded-2xl bg-cm-elevated border border-cm-border flex items-center justify-center mb-4">
              <FileText size={18} className="text-cm-subtle" />
            </div>
            <p className="text-sm text-cm-subtle">No proposals yet.</p>
          </div>
        ) : (
          <div className="bg-cm-surface border border-cm-border rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
            <div className="min-w-[820px]">
            <div className={`grid gap-4 px-6 py-3 border-b border-cm-border text-xs font-medium text-cm-subtle uppercase tracking-wider ${isAdmin ? 'grid-cols-[2fr_1.5fr_1fr_1fr_1fr_auto]' : 'grid-cols-[2fr_1.5fr_1fr_1fr_1fr]'}`}>
              <span>Proposal</span>
              <span>Lead</span>
              <span>Status</span>
              <span>Views</span>
              <span>Expires</span>
              {isAdmin && <span>Actions</span>}
            </div>

            <div className="divide-y divide-cm-border">
              {proposals.map(p => {
                const expiresIn = p.expires_at ? daysUntil(p.expires_at) : null
                return (
                  <div
                    key={p.id}
                    className={`grid gap-4 px-6 py-4 items-center ${isAdmin ? 'grid-cols-[2fr_1.5fr_1fr_1fr_1fr_auto]' : 'grid-cols-[2fr_1.5fr_1fr_1fr_1fr]'}`}
                  >
                    <div className="min-w-0">
                      {isAdmin ? (
                        <Link href={`/croissantsmoon/proposals/${p.id}`} className="group">
                          <p className="text-sm font-medium text-cm-text group-hover:text-cm-white truncate transition-colors">{p.title}</p>
                          <p className="text-xs text-cm-subtle mt-0.5 font-mono">/{p.slug}</p>
                        </Link>
                      ) : (
                        <>
                          <p className="text-sm font-medium text-cm-text truncate">{p.title}</p>
                          <p className="text-xs text-cm-subtle mt-0.5 font-mono">/{p.slug}</p>
                        </>
                      )}
                    </div>

                    <p className="text-sm text-cm-subtle truncate">
                      {(p.lead as { organization?: string })?.organization ?? '—'}
                    </p>

                    <ProposalStatusBadge status={p.status} />

                    <span className="flex items-center gap-1 text-sm text-cm-subtle">
                      <Eye size={12} /> {p.views}
                    </span>

                    <span className={`text-xs ${expiresIn !== null && expiresIn <= 3 ? 'text-red-400' : 'text-cm-subtle'}`}>
                      {expiresIn !== null
                        ? expiresIn <= 0 ? 'Expired'
                          : expiresIn === 1 ? '1 day'
                          : `${expiresIn}d`
                        : '—'}
                    </span>

                    {isAdmin && <ProposalActions proposal={p} />}
                  </div>
                )
              })}
            </div>
            </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
