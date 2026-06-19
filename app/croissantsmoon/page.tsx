import { cookies, headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { CM_LOCALES, type CMLocale } from '@/lib/cm/i18n'

// The bare /croissantsmoon URL no longer renders the landing directly — it
// detects the visitor's locale and forwards to /croissantsmoon/{en,id}. An
// explicit choice (cm_locale cookie, set by the nav language pill) wins;
// otherwise we sniff Accept-Language and default Indonesian visitors to ID,
// everyone else to EN. Reading cookies()/headers() keeps this per-request
// (uncacheable), and redirect() issues a temporary (non-301) hop so detection
// stays live for every visitor.
export const dynamic = 'force-dynamic'

function detectLocale(cookieValue: string | undefined, acceptLanguage: string): CMLocale {
  if (cookieValue && (CM_LOCALES as string[]).includes(cookieValue)) {
    return cookieValue as CMLocale
  }
  return /(^|,|\s)id\b/i.test(acceptLanguage) ? 'id' : 'en'
}

export default async function CroissantsMoonIndex() {
  const cookieStore = await cookies()
  const headerStore = await headers()
  const locale = detectLocale(
    cookieStore.get('cm_locale')?.value,
    headerStore.get('accept-language') ?? '',
  )
  redirect(`/croissantsmoon/${locale}`)
}
