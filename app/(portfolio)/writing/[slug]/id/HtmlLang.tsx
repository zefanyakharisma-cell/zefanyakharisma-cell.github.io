'use client'

import { useEffect } from 'react'

/**
 * Sets <html lang> for a page in another language. The root layout is static
 * and says "en"; the inline script fixes it before paint on a full load, the
 * effect on client navigation, and leaving the page puts "en" back.
 */
export function HtmlLang({ lang }: { lang: string }) {
  useEffect(() => {
    const root = document.documentElement
    const before = root.lang
    root.lang = lang
    return () => { root.lang = before === lang ? 'en' : before }
  }, [lang])
  return <script dangerouslySetInnerHTML={{ __html: `document.documentElement.lang=${JSON.stringify(lang)}` }} />
}
