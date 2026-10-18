'use client'

import { Suspense, useLayoutEffect } from 'react'
import { useSearchParams } from 'next/navigation'

function Reader({ name, onValue }: { name: string; onValue: (value: string | null) => void }) {
  const value = useSearchParams().get(name)
  // Layout effect: on a client-side navigation the value is applied before the first paint.
  useLayoutEffect(() => { onValue(value) }, [value, onValue])
  return null
}

/**
 * Reports a query parameter to its parent (`onValue` must be stable). Rendered in its
 * own Suspense boundary so only this empty node opts out of static prerendering, not
 * the component around it. On a client-side navigation the value applies before paint;
 * on a full page load it applies at hydration (a static page can't know the query sooner).
 */
export function SearchParam(props: { name: string; onValue: (value: string | null) => void }) {
  return <Suspense fallback={null}><Reader {...props} /></Suspense>
}
