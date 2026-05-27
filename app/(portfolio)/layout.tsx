import TopBar from '@/components/layout/TopBar'
import TabBar from '@/components/layout/TabBar'
import Footer from '@/components/layout/Footer'

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a href="#main-content" className="skip-to-content">Skip to main content</a>
      <TopBar />
      <div id="app" className="w-full">
        <main id="main-content" tabIndex={-1}>
          {children}
        </main>
        <Footer />
      </div>
      <TabBar />
    </>
  )
}
