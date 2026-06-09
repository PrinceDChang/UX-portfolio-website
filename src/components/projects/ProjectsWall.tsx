import { AnimatePresence, motion } from 'framer-motion'
import { useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import { useProjectsTicketStackPortal } from '../../context/ProjectsTicketStackPortalContext'
import {
  featuredProjects,
  projectFilterGroups,
  projectKeywords,
  type Project,
  type ProjectKeyword,
  type ProjectTag,
} from '../../data/content'
import { PostcardProjectCard } from './PostcardProjectCard'
import { ProjectsTicketStack } from './ProjectsTicketStack'
import { ProjectsViewToggle, type ProjectsViewMode } from './ProjectsViewToggle'
import { ProjectsWallDecor } from './ProjectsWallDecor'

/** Keyword pills shown before “Show more” (short labels that fit one row). */
const COLLAPSED_KEYWORD_PREVIEW = 4

type DisciplineTag = 'Design' | 'Research'
type PlatformTag = 'Mobile' | 'Web'

interface ProjectFilters {
  discipline: DisciplineTag | null
  platform: PlatformTag | null
  context: ProjectTag[]
  keywords: ProjectKeyword[]
}

const emptyFilters: ProjectFilters = {
  discipline: null,
  platform: null,
  context: [],
  keywords: [],
}

function toggleListItem<T>(list: readonly T[], item: T): T[] {
  return list.includes(item) ? list.filter((entry) => entry !== item) : [...list, item]
}

function hasActiveFilters(filters: ProjectFilters): boolean {
  return (
    filters.discipline !== null ||
    filters.platform !== null ||
    filters.context.length > 0 ||
    filters.keywords.length > 0
  )
}

function filterProjects(projects: readonly Project[], filters: ProjectFilters): Project[] {
  if (!hasActiveFilters(filters)) return [...projects]

  return projects.filter((project) => {
    if (filters.discipline && !project.tags.includes(filters.discipline)) return false
    if (filters.platform && !project.tags.includes(filters.platform)) return false
    if (
      filters.context.length > 0 &&
      !filters.context.some((tag) => project.tags.includes(tag))
    ) {
      return false
    }
    if (
      filters.keywords.length > 0 &&
      !filters.keywords.some((keyword) => project.keywords.includes(keyword))
    ) {
      return false
    }
    return true
  })
}

function getKeywordItemsForDisplay(
  expanded: boolean,
  selectedKeywords: readonly ProjectKeyword[],
): readonly ProjectKeyword[] {
  if (expanded) return projectKeywords

  const preview = projectKeywords.slice(0, COLLAPSED_KEYWORD_PREVIEW)
  const extra = selectedKeywords.filter((keyword) => !preview.includes(keyword))
  return [...extra, ...preview.slice(0, COLLAPSED_KEYWORD_PREVIEW - extra.length)]
}

function isContextPillActive(filters: ProjectFilters, tag: ProjectTag): boolean {
  return filters.context.includes(tag)
}

function isKeywordPillActive(filters: ProjectFilters, keyword: ProjectKeyword): boolean {
  return filters.keywords.includes(keyword)
}

function isSingleTagPillActive(
  filters: ProjectFilters,
  groupId: string,
  tag: ProjectTag,
): boolean {
  if (groupId === 'discipline') return filters.discipline === tag
  if (groupId === 'platform') return filters.platform === tag
  return false
}

function describeActiveFilters(filters: ProjectFilters): string {
  const parts: string[] = []
  if (filters.discipline) parts.push(filters.discipline)
  if (filters.platform) parts.push(filters.platform)
  parts.push(...filters.context, ...filters.keywords)
  return parts.join(', ')
}

export function ProjectsWall() {
  const ticketStackPortal = useProjectsTicketStackPortal()
  const [filters, setFilters] = useState<ProjectFilters>(emptyFilters)
  const [filtersExpanded, setFiltersExpanded] = useState(false)
  const [view, setView] = useState<ProjectsViewMode>('wall')

  const filteredProjects = useMemo(() => filterProjects(featuredProjects, filters), [filters])

  const isAllActive = !hasActiveFilters(filters)
  const hiddenKeywordCount = projectKeywords.length - COLLAPSED_KEYWORD_PREVIEW
  const showMoreToggle = hiddenKeywordCount > 0

  const handleDisciplineOrPlatform = (groupId: string, tag: ProjectTag) => {
    setFilters((current) => {
      if (groupId === 'discipline') {
        const discipline = tag as DisciplineTag
        return {
          ...current,
          discipline: current.discipline === discipline ? null : discipline,
        }
      }
      if (groupId === 'platform') {
        const platform = tag as PlatformTag
        return {
          ...current,
          platform: current.platform === platform ? null : platform,
        }
      }
      return current
    })
  }

  const handleContextToggle = (tag: ProjectTag) => {
    setFilters((current) => ({
      ...current,
      context: toggleListItem(current.context, tag),
    }))
  }

  const handleKeywordToggle = (keyword: ProjectKeyword) => {
    setFilters((current) => ({
      ...current,
      keywords: toggleListItem(current.keywords, keyword),
    }))
  }

  const clearFilters = () => setFilters(emptyFilters)

  return (
    <div>
      <div
        className="projects-filter"
        role="search"
        aria-label="Filter projects by tag or keyword"
      >
        <div className="projects-filter__header">
          <div className="projects-filter__header-start">
            <button
              type="button"
              aria-pressed={isAllActive}
              onClick={clearFilters}
              className={`projects-filter__all ${isAllActive ? 'projects-filter__all--active' : ''}`}
            >
              <span className="projects-filter__all-label">All projects</span>
              <span className="projects-filter__all-count" aria-hidden>
                {featuredProjects.length}
              </span>
            </button>
            {!isAllActive && (
              <button type="button" className="projects-filter__clear" onClick={clearFilters}>
                Clear filters
                <span className="sr-only"> ({describeActiveFilters(filters)})</span>
              </button>
            )}
          </div>
          <ProjectsViewToggle view={view} onChange={setView} />
        </div>

        <div
          id="projects-filter-groups"
          className={`projects-filter__groups ${filtersExpanded ? 'projects-filter__groups--expanded' : 'projects-filter__groups--collapsed'}`}
        >
          {projectFilterGroups.map((group) => {
            const isMultiSelect = group.id === 'context' || group.kind === 'keyword'

            if (group.kind === 'keyword') {
              const items = getKeywordItemsForDisplay(filtersExpanded, filters.keywords)
              return (
                <div
                  key={group.id}
                  className={`projects-filter__group projects-filter__group--keywords projects-filter__group--multi`}
                  role="group"
                  aria-labelledby={`projects-filter-${group.id}`}
                >
                  <p id={`projects-filter-${group.id}`} className="projects-filter__group-label">
                    {group.label}
                    <span className="projects-filter__group-hint"> · multi-select</span>
                  </p>
                  <div className="projects-filter__group-pills">
                    {items.map((keyword) => {
                      const isActive = isKeywordPillActive(filters, keyword)
                      return (
                        <button
                          key={keyword}
                          type="button"
                          aria-pressed={isActive}
                          onClick={() => handleKeywordToggle(keyword)}
                          className={`projects-filter__pill ${isActive ? 'projects-filter__pill--active' : ''}`}
                        >
                          {keyword}
                        </button>
                      )
                    })}
                  </div>
                </div>
              )
            }

            const items = group.items
            return (
              <div
                key={group.id}
                className={`projects-filter__group ${group.id === 'context' ? 'projects-filter__group--multi' : ''}`}
                role="group"
                aria-labelledby={`projects-filter-${group.id}`}
              >
                <p id={`projects-filter-${group.id}`} className="projects-filter__group-label">
                  {group.label}
                  {isMultiSelect && (
                    <span className="projects-filter__group-hint"> · multi-select</span>
                  )}
                </p>
                <div className="projects-filter__group-pills">
                  {items.map((tag) => {
                    const isActive =
                      group.id === 'context'
                        ? isContextPillActive(filters, tag)
                        : isSingleTagPillActive(filters, group.id, tag)
                    return (
                      <button
                        key={tag}
                        type="button"
                        aria-pressed={isActive}
                        onClick={() => {
                          if (group.id === 'context') {
                            handleContextToggle(tag)
                          } else {
                            handleDisciplineOrPlatform(group.id, tag)
                          }
                        }}
                        className={`projects-filter__pill ${isActive ? 'projects-filter__pill--active' : ''}`}
                      >
                        {tag}
                      </button>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>

        {showMoreToggle && (
          <div className="projects-filter__footer">
            <button
              type="button"
              className="projects-filter__toggle"
              aria-expanded={filtersExpanded}
              aria-controls="projects-filter-groups"
              onClick={() => setFiltersExpanded((open) => !open)}
            >
              {filtersExpanded ? (
                <>
                  Show less
                  <span className="projects-filter__toggle-icon" aria-hidden>
                    ↑
                  </span>
                </>
              ) : (
                <>
                  Show more
                  <span className="projects-filter__toggle-hint">
                    +{hiddenKeywordCount} keywords
                  </span>
                  <span className="projects-filter__toggle-icon" aria-hidden>
                    ↓
                  </span>
                </>
              )}
            </button>
          </div>
        )}
      </div>

      {view === 'wall' ? (
        <motion.div layout className="projects-wall mt-6 md:mt-8">
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
      ) : (
        ticketStackPortal &&
          createPortal(
            <ProjectsTicketStack projects={filteredProjects} embedded />,
            ticketStackPortal,
          )
      )}
    </div>
  )
}
