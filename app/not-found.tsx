import { Button, Shape } from '@/components/pcu'
import { Footer } from '@/components/pcu/Footer'
import { Header } from '@/components/pcu/Header'

export default function NotFound() {
  return (
    <>
      <Header />
      <main id="main-content" className="relative overflow-hidden py-[clamp(72px,12vw,160px)]">
        <Shape kind="ring-n" color="amber" className="right-[6%] bottom-0 w-[260px]" />
        <Shape kind="circle" color="blue" className="right-[30%] top-16 w-14" />
        <div className="wrap relative flex flex-col gap-5">
          <span className="pcu-eyebrow text-accent-strong">Error 404</span>
          <h1 className="h-page">Page not found</h1>
          <p className="lead max-w-[48ch]">The page you&apos;re looking for doesn&apos;t exist or has moved.</p>
          <div className="flex flex-wrap gap-3">
            <Button href="/">Go home</Button>
            <Button href="/projects-overview" variant="outline" className="text-midnight">See projects</Button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
