import { SiteAmbient } from '../SiteAmbient'
import { Navbar } from '../Navbar'
import { Footer } from '../Footer'
import { CaseStudyScrollProgress } from './CaseStudyScrollProgress'

interface CaseStudyShellProps {
  children: React.ReactNode
}

export function CaseStudyShell({ children }: CaseStudyShellProps) {
  return (
    <div className="site-shell min-h-screen text-ink">
      <CaseStudyScrollProgress />
      <SiteAmbient />
      <Navbar />
      <main className="relative pt-24 md:pt-28">{children}</main>
      <Footer />
    </div>
  )
}
