import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ScrollToTop } from './components/ScrollToTop'
import { HomePage } from './pages/HomePage'
import { AboutPage } from './pages/AboutPage'
import { PhotographyComingSoonPage } from './pages/PhotographyComingSoonPage'
import { ProjectsPage } from './pages/ProjectsPage'
import { CoplanCaseStudyPage } from './pages/CoplanCaseStudyPage'
import { CueCaseStudyPage } from './pages/CueCaseStudyPage'
import { SushiTalkCaseStudyPage } from './pages/SushiTalkCaseStudyPage'
import { Washington211CaseStudyPage } from './pages/Washington211CaseStudyPage'
import { CitibridgeCaseStudyPage } from './pages/CitibridgeCaseStudyPage'
import { ArboretumCaseStudyPage } from './pages/ArboretumCaseStudyPage'

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/photography" element={<PhotographyComingSoonPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/projects/cue" element={<CueCaseStudyPage />} />
        <Route path="/projects/coplan" element={<CoplanCaseStudyPage />} />
        <Route path="/projects/citibridge" element={<CitibridgeCaseStudyPage />} />
        <Route path="/projects/sushitalk" element={<SushiTalkCaseStudyPage />} />
        <Route path="/projects/wa211" element={<Washington211CaseStudyPage />} />
        <Route path="/projects/arboretum" element={<ArboretumCaseStudyPage />} />
      </Routes>
    </BrowserRouter>
  )
}
