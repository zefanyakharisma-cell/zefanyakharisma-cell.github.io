import { breadcrumbList } from '@/lib/seo'

/** schema.org structured data; `<` escaped so content can't close the script. */
export function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  )
}

/** Home → section overview → this page. */
export function BreadcrumbJsonLd({ path, title }: { path: string; title?: string }) {
  return <JsonLd data={breadcrumbList(path, title)} />
}
