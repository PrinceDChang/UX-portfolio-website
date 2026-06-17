import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { PageLink } from './PageLink'
import { globeFeaturedProjects } from '../data/content'
import { DottedGlobe } from './globe/DottedGlobe'
import { FeaturedProjectsList } from './globe/FeaturedProjectsList'
import {
  FeaturedProjectsViewToggle,
  type FeaturedProjectsViewMode,
} from './globe/FeaturedProjectsViewToggle'

const VIEW_STORAGE_KEY = 'featured-projects-view'

function getInitialView(): FeaturedProjectsViewMode {
  if (typeof window === 'undefined') return 'list'
  const stored = sessionStorage.getItem(VIEW_STORAGE_KEY)
  return stored === 'globe' ? 'globe' : 'list'
}

interface FeaturedProjectsProps {
  /** Tighter top spacing when placed directly under the hero. */
  embedded?: boolean
}

export function FeaturedProjects({ embedded = false }: FeaturedProjectsProps) {
  const [view, setView] = useState<FeaturedProjectsViewMode>(getInitialView)

  const handleViewChange = (next: FeaturedProjectsViewMode) => {
    setView(next)
    sessionStorage.setItem(VIEW_STORAGE_KEY, next)
  }

  return (
    <section
      id="projects"
      className={`section-ambient ${embedded ? 'pb-20 pt-10 md:pb-28 md:pt-14' : 'py-20 md:py-28'}`}
    >
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="mb-10 max-w-3xl"
        >
          <h2 className="section-title mb-5">Featured Projects</h2>
          <p className="section-copy">
            These selected projects reflect my passion for blending strategy with creativity —
            solving real problems through thoughtful design and impactful storytelling.
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {view === 'globe' ? (
            <motion.div
              key="globe"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="featured-projects-view-shell"
            >
              <div className="featured-projects-view-shell__toggle">
                <FeaturedProjectsViewToggle view={view} onChange={handleViewChange} />
              </div>
              <DottedGlobe />
            </motion.div>
          ) : (
            <motion.div
              key="list"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <FeaturedProjectsList
                projects={globeFeaturedProjects}
                viewToggle={
                  <FeaturedProjectsViewToggle view={view} onChange={handleViewChange} />
                }
              />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-10 flex justify-center">
          <PageLink
            to="/projects"
            className="rounded-full border border-theme-border px-6 py-3 text-sm font-medium text-ink ring-1 ring-accent/20 transition hover:border-accent/50 hover:text-accent hover:shadow-glow"
          >
            Browse All Projects
          </PageLink>
        </div>
      </div>
    </section>
  )
}
