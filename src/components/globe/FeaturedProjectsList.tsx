import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { type Project } from '../../data/content'
import { CaseStudyCard } from './CaseStudyCard'

interface FeaturedProjectsListProps {
  projects: readonly Project[]
  viewToggle?: ReactNode
}

export function FeaturedProjectsList({ projects, viewToggle }: FeaturedProjectsListProps) {
  return (
    <div
      className={`featured-projects-grid${viewToggle ? ' featured-projects-grid--with-toolbar' : ''}`}
    >
      {viewToggle ? (
        <div className="featured-projects-grid__toolbar">{viewToggle}</div>
      ) : null}
      <ul className="featured-projects-grid__items">
        {projects.map((project, index) => (
          <motion.li
            key={project.id}
            className="featured-projects-grid__item"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
          >
            <CaseStudyCard project={project} layout="grid" />
          </motion.li>
        ))}
      </ul>
    </div>
  )
}
