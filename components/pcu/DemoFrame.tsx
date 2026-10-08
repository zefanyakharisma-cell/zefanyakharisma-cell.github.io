'use client'

import { useEffect, useState } from 'react'
import { ExternalLink, MonitorPlay } from 'lucide-react'
import { Shape } from './Shape'

/**
 * A live web app shown in a browser-style frame. The iframe mounts only after
 * the visitor asks for it; if it has not loaded after a few seconds (for
 * example, the app forbids framing) a note points to the new-tab link.
 */
export function DemoFrame({ src, app, note }: { src: string; app: string; note?: string }) {
  const [on, setOn] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const [slow, setSlow] = useState(false)
  const host = src.replace(/^https?:\/\//, '')

  useEffect(() => {
    if (!on || loaded) return
    const t = window.setTimeout(() => setSlow(true), 8000)
    return () => window.clearTimeout(t)
  }, [on, loaded])

  return (
    <figure className="m-0 flex flex-col gap-3">
      <div className="rounded-panel overflow-hidden border border-line shadow-card bg-white">
        <div className="flex items-center gap-3 px-4 py-2.5 bg-smoke border-b border-line">
          <span aria-hidden className="flex gap-1.5 flex-none">
            <span className="w-3 h-3 rounded-pill bg-cerise/70" />
            <span className="w-3 h-3 rounded-pill bg-amber" />
            <span className="w-3 h-3 rounded-pill bg-teal" />
          </span>
          <span className="flex-1 min-w-0 truncate rounded-pill bg-white border border-line px-3 py-1 text-sm text-ink-secondary">{host}</span>
          <a href={src} target="_blank" rel="noopener noreferrer" className="pcu-btn pcu-btn--outline !min-h-[36px] !px-3 !text-sm flex-none">
            <span className="hidden sm:inline">Open in new tab</span>
            <ExternalLink aria-hidden size={16} />
            <span className="sr-only sm:hidden">Open {app} in a new tab</span>
          </a>
        </div>
        <div className="relative h-[560px] md:h-auto md:aspect-[16/10] bg-midnight">
          {on ? (
            <>
              {!loaded && (
                <div className="absolute inset-0 grid place-items-center text-smoke text-sm" aria-live="polite">
                  {slow
                    ? <p className="m-0 max-w-[40ch] text-center px-6">The demo is taking long to load, or it blocks embedding. Use <b className="text-white">Open in new tab</b> above.</p>
                    : <p className="m-0">Loading {app}…</p>}
                </div>
              )}
              <iframe
                src={src}
                title={`${app} live demo`}
                className="relative w-full h-full border-0 bg-white"
                style={{ opacity: loaded ? 1 : 0 }}
                referrerPolicy="no-referrer"
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-downloads"
                onLoad={() => setLoaded(true)}
              />
            </>
          ) : (
            <div className="absolute inset-0 overflow-hidden pcu-surface-brand grid place-items-center">
              <Shape kind="ring-u" color="amber" className="right-[-40px] top-0 w-[260px]" />
              <Shape kind="ring-n-line" color="teal" className="left-[6%] bottom-0 w-[300px]" />
              <Shape kind="circle" color="cerise" className="left-[22%] top-[14%] w-10" />
              <div className="relative flex flex-col items-center gap-4 text-center px-6">
                <span className="pcu-eyebrow text-amber">Live demo</span>
                <p className="m-0 h-sub text-white">{app}</p>
                <p className="m-0 text-smoke max-w-[44ch]">The working app, running on demo data. It loads here, inside the page.</p>
                <button type="button" onClick={() => setOn(true)} className="pcu-btn pcu-btn--accent">
                  <MonitorPlay aria-hidden size={18} /> Load live demo
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      {note && <figcaption className="text-sm text-ink-muted">{note}</figcaption>}
    </figure>
  )
}
