'use client'

import { usePathname } from 'next/navigation'
import { themeFor } from '@/lib/nav'

/** Sets data-theme for the current route so section gradients (--theme-*) cascade
 *  to the header, page and footer. Renders no box of its own. */
export function ThemeScope({ children }: { children: React.ReactNode }) {
  return <div data-theme={themeFor(usePathname())} className="contents">{children}</div>
}
