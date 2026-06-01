import { motion } from 'framer-motion'
import { CaseStudyShell } from '../components/case-study/CaseStudyShell'
import { ProjectsWall } from '../components/projects/ProjectsWall'

export function ProjectsPage() {
  return (
    <CaseStudyShell>
      <section className="projects-page mx-auto max-w-6xl px-6 pb-24 md:px-10 md:pb-32">
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl"
        >
          <p className="section-label mb-4">Portfolio wall</p>
          <h1 className="section-title mb-5">All Projects</h1>
          <p className="section-copy">
            Case studies pinned to the wall — filter by discipline to find design work, research,
            and more.
          </p>
        </motion.header>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 md:mt-16"
        >
          <ProjectsWall />
        </motion.div>
      </section>
    </CaseStudyShell>
  )
}
