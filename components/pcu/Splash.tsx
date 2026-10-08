'use client'

import { useEffect, useState } from 'react'
import { Loader } from './Loader'

const KEY = 'zk-splash-seen'
// Runs before paint: a visitor who has seen the splash this session skips it.
const skipScript = `try{if(sessionStorage.getItem('${KEY}'))document.documentElement.dataset.splash='seen'}catch(e){}`

/**
 * First-visit splash. It is in the server HTML so it covers the first paint;
 * it hides once the page has loaded (at least 700ms, at most 2.5s). Without
 * JavaScript a CSS animation hides it after 3s.
 */
export function Splash() {
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (document.documentElement.dataset.splash === 'seen') return
    const start = performance.now()
    let t = 0
    const finish = () => {
      t = window.setTimeout(() => {
        setDone(true)
        try { sessionStorage.setItem(KEY, '1') } catch { /* storage may be blocked */ }
        window.setTimeout(() => { document.documentElement.dataset.splash = 'seen' }, 500)
      }, Math.max(0, 700 - (performance.now() - start)))
    }
    const cap = window.setTimeout(finish, 2500)
    if (document.readyState === 'complete') finish()
    else window.addEventListener('load', finish, { once: true })
    return () => { window.clearTimeout(t); window.clearTimeout(cap); window.removeEventListener('load', finish) }
  }, [])

  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: skipScript }} />
      <div id="pcu-splash" className="pcu-splash" data-done={done || undefined} aria-hidden={done || undefined}>
        <span aria-hidden className="pcu-shape pcu-shape--ring-u pcu-splash__deco pcu-splash__deco--a" />
        <span aria-hidden className="pcu-shape pcu-shape--ring-n-line pcu-splash__deco pcu-splash__deco--b" />
        <span aria-hidden className="pcu-shape pcu-shape--double-arch pcu-splash__deco pcu-splash__deco--c" />
        <Loader label="Loading the site" />
      </div>
    </>
  )
}
