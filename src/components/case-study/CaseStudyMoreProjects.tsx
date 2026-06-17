import { useMemo } from 'react'
import { PageLink } from '../PageLink'
import { featuredProjects } from '../../data/content'
import { roleBadgeClassName } from '../../lib/projectRole'
import { shuffle } from '../../lib/shuffle'

interface CaseStudyMoreProjectsProps {
  /** Project id for the current case study — excluded from the rail. */
  excludeProjectId: string
}

export function CaseStudyMoreProjects({ excludeProjectId }: CaseStudyMoreProjectsProps) {
  const projects = useMemo(() => {
    const eligible = featuredProjects.filter(
      (project) => !project.comingSoon && project.href && project.id !== excludeProjectId,
    )
    return shuffle(eligible)
  }, [excludeProjectId])

  return (
    <div
      className="-mx-6 overflow-x-auto overscroll-x-contain px-6 pb-1 scroll-smooth [scrollbar-width:thin] md:-mx-0 md:px-0"
      aria-label="More case studies"
    >
      <div className="flex w-max gap-4 snap-x snap-mandatory">
        {projects.map((project) => {
          const imageBg = project.heroImageBackground ?? '#111118'

          return (
            <PageLink
              key={project.id}
              to={project.href}
              className="flex w-[min(85vw,320px)] shrink-0 snap-start flex-col overflow-hidden rounded-3xl bg-surface ring-1 ring-accent/30 transition hover:ring-accent/50 sm:w-[300px] md:w-[320px]"
            >
              <div
                className="relative aspect-[16/10] overflow-hidden"
                style={{ backgroundColor: imageBg }}
              >
                <img
                  src={project.image}
                  alt={project.imageAlt}
                  className="h-full w-full object-contain object-center p-4"
                  loading="lazy"
                  decoding="async"
                />
                <span
                  className={roleBadgeClassName(
                    project.role,
                    'absolute left-3 top-3 z-10 text-[10px]',
                  )}
                >
                  {project.role}
                </span>
              </div>
              <div className="p-6">
                <h3 className="font-condensed text-3xl uppercase tracking-wide text-ink">
                  {project.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate">{project.description}</p>
              </div>
            </PageLink>
          )
        })}
      </div>
    </div>
  )
}
