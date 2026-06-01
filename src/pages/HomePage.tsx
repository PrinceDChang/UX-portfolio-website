import { SiteAmbient } from '../components/SiteAmbient'
import { AboutContent } from '../components/About'
import { Contact } from '../components/Contact'
import { FeaturedProjects } from '../components/FeaturedProjects'
import { Footer } from '../components/Footer'
import { PortraitScrollContainer } from '../components/hero/PortraitScrollContainer'
import { Navbar } from '../components/Navbar'
import { Services } from '../components/Services'
import { Testimonials } from '../components/Testimonials'

export function HomePage() {
  return (
    <div className="site-shell min-h-screen text-ink">
      <SiteAmbient />
      <Navbar />
      <main>
        <PortraitScrollContainer aboutSlot={<AboutContent />}>
          <Services />
        </PortraitScrollContainer>
        <FeaturedProjects />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
