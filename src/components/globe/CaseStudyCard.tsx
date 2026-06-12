import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import type { Project } from '../../data/content'
import { roleBadgeClassName } from '../../lib/projectRole'
import { scrollPageToTop } from '../../lib/scrollToTop'

interface CaseStudyCardProps {
  project: Project
  onClose?: () => void
}

const caseStudyButtonClass =
  'inline-flex items-center justify-center gap-1.5 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white shadow-glow transition hover:bg-accent/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent'

const comingSoonButtonClass =
  'mt-5 inline-flex cursor-default items-center justify-center rounded-full bg-zinc-500/90 px-5 py-2.5 text-sm font-semibold text-white/95 ring-1 ring-white/10'

const heroTitleClass =
  'font-condensed text-[clamp(2rem,8vw,3rem)] uppercase leading-[0.9] tracking-[0.04em] text-white'

const heroDescriptionClass =
  'mx-auto mt-3 max-w-[340px] text-sm leading-relaxed text-zinc-200 md:text-[15px]'

const cardMotion = {
  initial: { opacity: 0, scale: 0.92, y: 12 },
  animate: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.94, y: 8 },
  transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] },
} as const

function CaseStudyCloseButton({ onClose }: { onClose: () => void }) {
  return (
    <button
      type="button"
      aria-label="Close preview"
      onClick={(event) => {
        event.stopPropagation()
        event.preventDefault()
        onClose()
      }}
      className="absolute right-3 top-3 z-50 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-black/70 text-xl leading-none text-white ring-1 ring-white/25 backdrop-blur-md transition hover:bg-black/90 hover:ring-accent/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
    >
      <span aria-hidden>×</span>
    </button>
  )
}

function ViewCaseStudyLink({ href, className = '' }: { href: string; className?: string }) {
  if (!href.startsWith('/')) return null

  return (
    <Link
      to={href}
      onClick={(event) => {
        event.stopPropagation()
        scrollPageToTop()
      }}
      className={`${caseStudyButtonClass} ${className}`.trim()}
    >
      View case study
      <span aria-hidden>→</span>
    </Link>
  )
}

function ComingSoonCaseStudyCard({ project, onClose }: CaseStudyCardProps) {
  const imageBg = project.heroImageBackground ?? '#3f3f46'
  const hasHeroImage = Boolean(project.image)

  return (
    <motion.div
      {...cardMotion}
      className="globe-case-study-hero pointer-events-auto relative flex min-h-[min(72vh,340px)] w-[min(100%,340px)] flex-col overflow-hidden rounded-2xl shadow-[0_24px_60px_rgba(0,0,0,0.55)] ring-1 ring-white/10 sm:min-h-[380px] sm:w-[min(100%,380px)] md:w-[400px]"
      onClick={(event) => event.stopPropagation()}
      onPointerDown={(event) => event.stopPropagation()}
    >
      {onClose ? <CaseStudyCloseButton onClose={onClose} /> : null}

      <div
        className="relative flex min-h-[220px] flex-1 items-center justify-center overflow-hidden"
        style={{ backgroundColor: imageBg }}
      >
        {hasHeroImage ? (
          <img
            src={project.image}
            alt={project.imageAlt}
            className="max-h-[min(72%,200px)] w-[min(88%,320px)] object-contain object-center"
          />
        ) : null}
        <span
          className={roleBadgeClassName(project.role, 'absolute left-3 top-3 z-10', true)}
        >
          {project.role}
        </span>
      </div>

      <div className="shrink-0 border-t border-white/10 bg-[#0c0c12] px-7 py-6 text-center md:px-10 md:py-7">
        <h3 className={heroTitleClass}>{project.title}</h3>
        <p className={heroDescriptionClass}>{project.description}</p>
        <span className={comingSoonButtonClass} aria-disabled="true">
          Coming soon
        </span>
      </div>
    </motion.div>
  )
}

function HeroBackgroundCaseStudyCard({ project, onClose }: CaseStudyCardProps) {
  const imageBg = project.heroImageBackground ?? '#111118'

  return (
    <motion.div
      {...cardMotion}
      className="globe-case-study-hero pointer-events-auto relative flex min-h-[min(72vh,340px)] w-[min(100%,340px)] flex-col overflow-hidden rounded-2xl shadow-[0_24px_60px_rgba(0,0,0,0.55)] ring-1 ring-white/10 sm:min-h-[380px] sm:w-[min(100%,380px)] md:w-[400px]"
      onClick={(event) => event.stopPropagation()}
      onPointerDown={(event) => event.stopPropagation()}
    >
      {onClose ? <CaseStudyCloseButton onClose={onClose} /> : null}

      <div
        className="relative min-h-[220px] flex-1 overflow-hidden"
        style={{ backgroundColor: imageBg }}
      >
        <img
          src={project.image}
          alt={project.imageAlt}
          className="absolute inset-0 h-full w-full object-fill object-center"
        />

        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-[#0c0c12]/80 to-transparent"
          aria-hidden
        />

        <span className={roleBadgeClassName(project.role, 'absolute left-3 top-3 z-10')}>
          {project.role}
        </span>
      </div>

      <div className="shrink-0 border-t border-white/10 bg-[#0c0c12] px-7 py-6 text-center md:px-10 md:py-7">
        <h3 className={heroTitleClass}>{project.title}</h3>
        <p className={heroDescriptionClass}>{project.description}</p>
        <ViewCaseStudyLink href={project.href} className="mt-5" />
      </div>
    </motion.div>
  )
}

function BlurCaseStudyCard({ project, onClose }: CaseStudyCardProps) {
  return (
    <motion.div
      {...cardMotion}
      className="globe-case-study pointer-events-auto relative block w-[min(100%,380px)] overflow-hidden rounded-2xl text-center shadow-[0_24px_60px_rgba(0,0,0,0.55)] ring-1 ring-white/10 md:w-[400px]"
      onClick={(event) => event.stopPropagation()}
      onPointerDown={(event) => event.stopPropagation()}
    >
      {onClose ? <CaseStudyCloseButton onClose={onClose} /> : null}

      <div className="absolute inset-0">
        <img
          src={project.image}
          alt=""
          className="h-full w-full scale-110 object-cover blur-lg"
          aria-hidden
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/65 to-black/85 backdrop-blur-md" />
      </div>

      <div className="relative px-7 py-8 md:px-10 md:py-9">
        <span className={roleBadgeClassName(project.role, 'shadow-glow')}>
          {project.role}
        </span>

        <h3 className="mt-5 font-condensed text-[clamp(2.75rem,10vw,3.5rem)] uppercase leading-[0.9] tracking-[0.04em] text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
          {project.title}
        </h3>

        <p className="mx-auto mt-4 max-w-[340px] text-sm font-medium leading-relaxed text-white/95 drop-shadow-[0_1px_8px_rgba(0,0,0,0.75)] md:text-[15px]">
          {project.description}
        </p>

        <ViewCaseStudyLink href={project.href} className="mt-6" />
      </div>
    </motion.div>
  )
}

export function CaseStudyCard({ project, onClose }: CaseStudyCardProps) {
  if (project.comingSoon) {
    return <ComingSoonCaseStudyCard project={project} onClose={onClose} />
  }

  if (project.heroBackgroundCard) {
    return <HeroBackgroundCaseStudyCard project={project} onClose={onClose} />
  }

  return <BlurCaseStudyCard project={project} onClose={onClose} />
}
