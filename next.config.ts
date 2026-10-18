import type { NextConfig } from 'next'

// The About sub-pages now live as tabs on /about-overview.
const aboutTabs: [string, string][] = [
  ['/education', 'education'],
  ['/experience', 'experience'],
  ['/expertise', 'expertise'],
  ['/skillset', 'skills'],
  ['/values', 'values'],
]

const nextConfig: NextConfig = {
  images: {
    // Cover images uploaded from the Writing admin live in Supabase Storage.
    remotePatterns: [{ protocol: 'https', hostname: '*.supabase.co', pathname: '/storage/v1/object/public/**' }],
  },
  // Share cards read their fonts from disk at request time; post cards render on demand, so trace the fonts in.
  outputFileTracingIncludes: { '/writing/**/opengraph-image*': ['./app/fonts/og/*.ttf'] },
  async redirects() {
    return [
      ...aboutTabs.map(([source, tab]) => ({ source, destination: `/about-overview?tab=${tab}`, permanent: true })),
      // The International Grants page was retired; its partnership context lives on University Support.
      { source: '/intl-grants', destination: '/university-support', permanent: true },
    ]
  },
}

export default nextConfig
