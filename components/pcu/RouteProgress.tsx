'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

/** Amber bar at the top of the window while an internal link is loading. */
export function RouteProgress() {
  const pathname = usePathname()
  const [busy, setBusy] = useState(false)

  useEffect(() => { setBusy(false) }, [pathname])

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
      const a = (e.target as HTMLElement).closest('a')
      if (!a || a.target === '_blank' || a.hasAttribute('download')) return
      const url = new URL(a.href, window.location.href)
      if (url.origin !== window.location.origin || url.pathname === window.location.pathname) return
      setBusy(true)
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])

  return <div aria-hidden className="pcu-route-progress" data-busy={busy || undefined} />
}
