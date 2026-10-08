import { Header } from '@/components/pcu/Header'
import { Footer } from '@/components/pcu/Footer'
import { RouteProgress } from '@/components/pcu/RouteProgress'
import { Splash } from '@/components/pcu/Splash'

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Splash />
      <RouteProgress />
      <a href="#main-content" className="skip-to-content">Skip to main content</a>
      <Header />
      <main id="main-content" tabIndex={-1} className="outline-none">
        {children}
      </main>
      <Footer />
    </>
  )
}
