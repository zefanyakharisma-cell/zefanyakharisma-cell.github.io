'use client'

import { useEffect, useState } from 'react'
import { Pencil } from 'lucide-react'
import { cn } from '@/lib/utils'
import { browserClient } from '@/lib/supabase/browser'
import { supabaseConfigured } from '@/lib/supabase/config'

/** A link into the admin that only a signed-in admin sees. Checked in the browser so public pages stay static. */
export function AdminLink({ href, label, className }: { href: string; label: string; className?: string }) {
  const [admin, setAdmin] = useState(false)

  useEffect(() => {
    if (!supabaseConfigured) return
    let live = true
    const supabase = browserClient()
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (!session) return
      const { data } = await supabase.rpc('is_admin')
      if (live && data === true) setAdmin(true)
    })
    return () => { live = false }
  }, [])

  if (!admin) return null
  return (
    <a href={href} className={cn('pcu-btn', className)}>
      <Pencil aria-hidden size={16} /> {label}
    </a>
  )
}
