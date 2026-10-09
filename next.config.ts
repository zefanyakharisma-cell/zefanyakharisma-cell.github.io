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
  async redirects() {
    return aboutTabs.map(([source, tab]) => ({ source, destination: `/about-overview?tab=${tab}`, permanent: true }))
  },
}

export default nextConfig
