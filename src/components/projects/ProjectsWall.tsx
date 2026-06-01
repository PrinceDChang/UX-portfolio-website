import { AnimatePresence, motion } from 'framer-motion'
import { useMemo, useState } from 'react'
import { featuredProjects, projectFilterTags, type ProjectTag } from '../../data/content'
import { PostcardProjectCard } from './PostcardProjectCard'
import { ProjectsWallDecor } from './ProjectsWallDecor'

type FilterValue = 'All' | ProjectTag

const filterOptions: FilterValue[] = ['All', ...projectFilterTags]

export function ProjectsWall() {
  const [activeFilter, setActiveFilter] = useState<FilterValue>('All')

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'All') return featuredProjects
    return featuredProjects.filter((project) => project.tags.includes(activeFilter))
  }, [activeFilter])

  return (
    <div>
      <div className="projects-filter" role="group" aria-label="Filter projects by tag">
        {filterOptions.map((tag) => {
          const isActive = activeFilter === tag
          return (
            <button
              key={tag}
              type="button"
              aria-pressed={isActive}
              onClick={() => setActiveFilter(tag)}
              className={`projects-filter__pill ${isActive ? 'projects-filter__pill--active' : ''}`}
            >
              {tag}
            </button>
          )
        })}
      </div>

      <motion.div layout className="projects-wall mt-10 md:mt-12">
        <ProjectsWallDecor />
        <AnimatePresence mode="popLayout">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project, index) => (
              <PostcardProjectCard key={project.id} project={project} index={index} />
            ))
          ) : (
            <motion.p
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="col-span-full py-16 text-center text-slate"
            >
              No projects match this filter yet.
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
