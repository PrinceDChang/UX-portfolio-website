import { SiteAmbient } from '../SiteAmbient'
import { Navbar } from '../Navbar'
import { Footer } from '../Footer'
import { CaseStudyScrollProgress } from './CaseStudyScrollProgress'

interface CaseStudyShellProps {
  children: React.ReactNode
  beforeMain?: React.ReactNode
}

export function CaseStudyShell({ children, beforeMain }: CaseStudyShellProps) {
  return (
    <div className="site-shell min-h-screen text-ink">
      <CaseStudyScrollProgress />
      <SiteAmbient />
      <Navbar />
      {beforeMain}
      <main className="relative pt-24 md:pt-28">{children}</main>
      <Footer />
    </div>
  )
}
