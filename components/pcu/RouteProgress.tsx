'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import { Suspense, useEffect, useState } from 'react'

/** Clear the bar anyway after this long (a download link, a cancelled or redirected-back navigation). */
const MAX_BUSY_MS = 10000

function Bar() {
  const pathname = usePathname()
  const search = useSearchParams().toString()
  const [busy, setBusy] = useState(false)

  // The URL changed: the navigation has landed.
  useEffect(() => { setBusy(false) }, [pathname, search])

  useEffect(() => {
    if (!busy) return
    const t = window.setTimeout(() => setBusy(false), MAX_BUSY_MS)
    return () => window.clearTimeout(t)
  }, [busy])

  useEffect(() => {
    // Capture phase: next/link calls preventDefault() in its own handler, so a bubbling
    // listener would only ever see defaultPrevented clicks.
    const onClick = (e: MouseEvent) => {
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
      const a = e.target instanceof Element ? e.target.closest('a[href]') : null
      if (!(a instanceof HTMLAnchorElement) || (a.target && a.target !== '_self') || a.hasAttribute('download')) return
      const url = new URL(a.href, window.location.href)
      if (url.origin !== window.location.origin) return
      // Same path and query (a hash jump or the current page): nothing will load.
      if (url.pathname === window.location.pathname && url.search === window.location.search) return
      setBusy(true)
    }
    // Back/forward cache: the page can come back frozen mid-navigation.
    const onShow = () => setBusy(false)
    document.addEventListener('click', onClick, { capture: true })
    window.addEventListener('pageshow', onShow)
    return () => {
      document.removeEventListener('click', onClick, { capture: true })
      window.removeEventListener('pageshow', onShow)
    }
  }, [])

  return <div aria-hidden className="pcu-route-progress" data-busy={busy || undefined} />
}

/** Amber bar at the top of the window while an internal link is loading. */
export function RouteProgress() {
  // useSearchParams needs a Suspense boundary on static pages; the fallback is the idle bar.
  return <Suspense fallback={<div aria-hidden className="pcu-route-progress" />}><Bar /></Suspense>
}
