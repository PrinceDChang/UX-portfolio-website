import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ScrollToTop } from './components/ScrollToTop'
import { ThemeToggleLayer } from './components/ThemeToggleLayer'
import { PhotographyTransitionProvider } from './context/PhotographyTransitionContext'
import { WushuTransitionProvider } from './context/WushuTransitionContext'
import { DogPage } from './pages/DogPage'
import { HomePage } from './pages/HomePage'
import { AboutPage } from './pages/AboutPage'
import { PhotographyPage } from './pages/PhotographyPage'
import { ProjectsPage } from './pages/ProjectsPage'
import { WushuPage } from './pages/WushuPage'
import { CoplanCaseStudyPage } from './pages/CoplanCaseStudyPage'
import { CueCaseStudyPage } from './pages/CueCaseStudyPage'
import { SushiTalkCaseStudyPage } from './pages/SushiTalkCaseStudyPage'
import { Washington211CaseStudyPage } from './pages/Washington211CaseStudyPage'
import { CitibridgeCaseStudyPage } from './pages/CitibridgeCaseStudyPage'
import { ArboretumCaseStudyPage } from './pages/ArboretumCaseStudyPage'
import { CompetitionKingCaseStudyPage } from './pages/CompetitionKingCaseStudyPage'
import { UwOrisCaseStudyPage } from './pages/UwOrisCaseStudyPage'

export default function App() {
  const basename = import.meta.env.BASE_URL.replace(/\/$/, '')

  return (
    <BrowserRouter basename={basename || undefined}>
      <PhotographyTransitionProvider>
        <WushuTransitionProvider>
          <ScrollToTop />
          <ThemeToggleLayer />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/dog" element={<DogPage />} />
            <Route path="/photography" element={<PhotographyPage />} />
            <Route path="/wushu" element={<WushuPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/projects/cue" element={<CueCaseStudyPage />} />
        <Route path="/projects/coplan" element={<CoplanCaseStudyPage />} />
        <Route path="/projects/citibridge" element={<CitibridgeCaseStudyPage />} />
        <Route path="/projects/sushitalk" element={<SushiTalkCaseStudyPage />} />
        <Route path="/projects/wa211" element={<Washington211CaseStudyPage />} />
        <Route path="/projects/arboretum" element={<ArboretumCaseStudyPage />} />
        <Route path="/projects/competition-king" element={<CompetitionKingCaseStudyPage />} />
        <Route path="/projects/uw-oris" element={<UwOrisCaseStudyPage />} />
          </Routes>
        </WushuTransitionProvider>
      </PhotographyTransitionProvider>
    </BrowserRouter>
  )
}
