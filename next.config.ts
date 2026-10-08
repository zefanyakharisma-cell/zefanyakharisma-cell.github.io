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
  async redirects() {
    return aboutTabs.map(([source, tab]) => ({ source, destination: `/about-overview?tab=${tab}`, permanent: true }))
  },
}

export default nextConfig
