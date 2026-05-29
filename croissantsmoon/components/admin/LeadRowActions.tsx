'use client'

import { useState } from 'react'
import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import { deleteLead, permanentlyDeleteLead } from '@/lib/actions/leads'
import { useRouter } from 'next/navigation'
import { MoreHorizontal, Eye, Archive, Trash2 } from 'lucide-react'
import Link from 'next/link'

interface Props {
  id: string
  organization: string
}

export function LeadRowActions({ id, organization }: Props) {
  const [open, setOpen] = useState(false)
  const [confirming, setConfirming] = useState<'archive' | 'delete' | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  function close() {
    setOpen(false)
    setConfirming(null)
  }

  async function archive() {
    setLoading(true)
    try {
      await deleteLead(id)
      close()
      router.refresh()
    } finally {
      setLoading(false)
    }
  }

  async function deleteForever() {
    setLoading(true)
    try {
      await permanentlyDeleteLead(id)
      close()
      router.refresh()
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <button
        onClick={e => { e.preventDefault(); e.stopPropagation(); setOpen(true) }}
        className="p-1.5 rounded-lg text-cm-muted hover:text-cm-text hover:bg-cm-elevated transition-colors opacity-0 group-hover:opacity-100"
      >
        <MoreHorizontal size={14} />
      </button>

      <Modal open={open} onClose={close} title={organization} size="sm">
        <div className="px-6 py-4 space-y-1.5">
          {confirming === 'archive' ? (
            <div className="rounded-lg border border-amber-400/30 bg-amber-400/5 p-3 space-y-2">
              <p className="text-xs text-amber-300">Archive this lead? It will be hidden from the pipeline.</p>
              <div className="flex gap-2">
                <Button variant="danger" size="sm" loading={loading} onClick={archive}>Yes, archive</Button>
                <Button variant="ghost" size="sm" onClick={() => setConfirming(null)}>Cancel</Button>
              </div>
            </div>
          ) : confirming === 'delete' ? (
            <div className="rounded-lg border border-red-400/30 bg-red-400/5 p-3 space-y-2">
              <p className="text-xs text-red-300">Permanently delete this lead and all its proposals and followups? This cannot be undone.</p>
              <div className="flex gap-2">
                <Button variant="danger" size="sm" loading={loading} onClick={deleteForever}>Yes, delete forever</Button>
                <Button variant="ghost" size="sm" onClick={() => setConfirming(null)}>Cancel</Button>
              </div>
            </div>
          ) : (
            <>
              <Link
                href={`/leads/${id}`}
                onClick={close}
                className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm text-cm-text hover:bg-cm-elevated transition-colors"
              >
                <Eye size={13} /> View Details
              </Link>
              <div className="border-t border-cm-border my-1" />
              <button
                onClick={() => setConfirming('archive')}
                className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm text-cm-subtle hover:text-cm-text hover:bg-cm-elevated transition-colors w-full text-left"
              >
                <Archive size={13} /> Archive
              </button>
              <button
                onClick={() => setConfirming('delete')}
                className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm text-red-400 hover:text-red-300 hover:bg-cm-elevated transition-colors w-full text-left"
              >
                <Trash2 size={13} /> Delete Permanently
              </button>
            </>
          )}
        </div>
      </Modal>
    </>
  )
}
