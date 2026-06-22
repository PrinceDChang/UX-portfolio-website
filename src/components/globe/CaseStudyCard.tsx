import { motion } from 'framer-motion'
import { type HTMLAttributes, type ReactNode, SyntheticEvent, type RefObject } from 'react'
import type { Project } from '../../data/content'
import { PageLink } from '../PageLink'
import { roleBadgeClassName } from '../../lib/projectRole'
import { useProjectHoverVideo } from '../../lib/useProjectHoverVideo'

export type CaseStudyCardLayout = 'modal' | 'grid'

interface CaseStudyCardProps {
  project: Project
  onClose?: () => void
  layout?: CaseStudyCardLayout
}

function heroShellClass(layout: CaseStudyCardLayout) {
  const base =
    'globe-case-study-hero pointer-events-auto relative flex flex-col overflow-hidden rounded-2xl shadow-[0_24px_60px_rgba(0,0,0,0.55)] ring-1 ring-white/10'
  if (layout === 'grid') {
    return `${base} h-full w-full min-h-[360px]`
  }
  return `${base} min-h-[min(72vh,340px)] w-[min(100%,340px)] sm:min-h-[380px] sm:w-[min(100%,380px)] md:w-[400px]`
}

function blurShellClass(layout: CaseStudyCardLayout) {
  const base =
    'globe-case-study pointer-events-auto relative block overflow-hidden rounded-2xl text-center shadow-[0_24px_60px_rgba(0,0,0,0.55)] ring-1 ring-white/10'
  if (layout === 'grid') {
    return `${base} h-full w-full min-h-[360px]`
  }
  return `${base} w-[min(100%,380px)] md:w-[400px]`
}

function heroMediaClass(layout: CaseStudyCardLayout) {
  return layout === 'grid' ? 'h-[184px] shrink-0' : 'min-h-[220px] flex-1'
}

function heroTitleClassFor(layout: CaseStudyCardLayout) {
  if (layout === 'grid') {
    return 'font-condensed text-[clamp(1.65rem,4vw,2.25rem)] uppercase leading-[0.9] tracking-[0.04em] text-white'
  }
  return heroTitleClass
}

function blurTitleClassFor(layout: CaseStudyCardLayout) {
  if (layout === 'grid') {
    return 'mt-4 font-condensed text-[clamp(2rem,5vw,2.75rem)] uppercase leading-[0.9] tracking-[0.04em] text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]'
  }
  return 'mt-5 font-condensed text-[clamp(2.75rem,10vw,3.5rem)] uppercase leading-[0.9] tracking-[0.04em] text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]'
}

function footerClass(layout: CaseStudyCardLayout) {
  if (layout === 'grid') {
    return 'shrink-0 border-t border-white/10 bg-[#0c0c12] px-5 py-5 text-center md:px-6 md:py-6'
  }
  return 'shrink-0 border-t border-white/10 bg-[#0c0c12] px-7 py-6 text-center md:px-10 md:py-7'
}

function blurBodyClass(layout: CaseStudyCardLayout) {
  return layout === 'grid' ? 'relative px-5 py-7 md:px-6 md:py-8' : 'relative px-7 py-8 md:px-10 md:py-9'
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
    <PageLink
      to={href}
      onClick={(event) => {
        event.stopPropagation()
      }}
      className={`${caseStudyButtonClass} ${className}`.trim()}
    >
      View case study
      <span aria-hidden>→</span>
    </PageLink>
  )
}

function CardShell({
  layout = 'modal',
  className,
  children,
  interactionHandlers,
}: {
  layout?: CaseStudyCardLayout
  className: string
  children: ReactNode
  interactionHandlers?: Pick<
    HTMLAttributes<HTMLElement>,
    'onMouseEnter' | 'onMouseLeave' | 'onFocus' | 'onBlur'
  >
}) {
  const stopPropagation = (event: SyntheticEvent) => event.stopPropagation()

  if (layout === 'grid') {
    return (
      <div
        className={className}
        onClick={stopPropagation}
        onPointerDown={stopPropagation}
        {...interactionHandlers}
      >
        {children}
      </div>
    )
  }

  return (
    <motion.div
      {...cardMotion}
      className={className}
      onClick={stopPropagation}
      onPointerDown={stopPropagation}
      {...interactionHandlers}
    >
      {children}
    </motion.div>
  )
}

function HeroCardMedia({
  project,
  layout,
  hovered,
  videoRef,
  hasHoverVideo,
}: {
  project: Project
  layout: CaseStudyCardLayout
  hovered: boolean
  videoRef: RefObject<HTMLVideoElement>
  hasHoverVideo: boolean
}) {
  const imageBg = project.heroImageBackground ?? '#111118'

  return (
    <div
      className={`relative overflow-hidden ${heroMediaClass(layout)}`}
      style={{ backgroundColor: imageBg }}
    >
      <img
        src={project.image}
        alt={project.imageAlt}
        className={`absolute inset-0 h-full w-full object-fill object-center transition-opacity duration-300 ${
          hovered ? 'opacity-0' : 'opacity-100'
        }`}
      />

      {hasHoverVideo ? (
        <video
          ref={videoRef}
          src={project.hoverVideo}
          loop
          muted
          playsInline
          preload="metadata"
          aria-hidden
          className={`absolute inset-0 h-full w-full object-fill object-center transition-opacity duration-300 ${
            hovered ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ) : null}

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-[#0c0c12]/80 to-transparent"
        aria-hidden
      />

      <span className={roleBadgeClassName(project.role, 'absolute left-3 top-3 z-10')}>
        {project.role}
      </span>
    </div>
  )
}

function ComingSoonCaseStudyCard({ project, onClose, layout = 'modal' }: CaseStudyCardProps) {
  const imageBg = project.heroImageBackground ?? '#3f3f46'
  const hasHeroImage = Boolean(project.image)

  return (
    <CardShell layout={layout} className={heroShellClass(layout)}>
      {onClose ? <CaseStudyCloseButton onClose={onClose} /> : null}

      <div
        className={`relative flex items-center justify-center overflow-hidden ${heroMediaClass(layout)}`}
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

      <div className={footerClass(layout)}>
        <h3 className={heroTitleClassFor(layout)}>{project.title}</h3>
        <p className={heroDescriptionClass}>{project.description}</p>
        <span className={comingSoonButtonClass} aria-disabled="true">
          Coming soon
        </span>
      </div>
    </CardShell>
  )
}

function HeroBackgroundCaseStudyCard({ project, onClose, layout = 'modal' }: CaseStudyCardProps) {
  const { videoRef, hovered, hasHoverVideo, hoverHandlers } = useProjectHoverVideo(
    project.hoverVideo,
    project.hoverVideoPlaybackRate ?? 1,
  )

  return (
    <CardShell
      layout={layout}
      className={heroShellClass(layout)}
      interactionHandlers={hoverHandlers}
    >
      {onClose ? <CaseStudyCloseButton onClose={onClose} /> : null}

      <HeroCardMedia
        project={project}
        layout={layout}
        hovered={hovered}
        videoRef={videoRef}
        hasHoverVideo={hasHoverVideo}
      />

      <div className={footerClass(layout)}>
        <h3 className={heroTitleClassFor(layout)}>{project.title}</h3>
        <p className={heroDescriptionClass}>{project.description}</p>
        <ViewCaseStudyLink href={project.href} className="mt-5" />
      </div>
    </CardShell>
  )
}

function BlurCaseStudyCard({ project, onClose, layout = 'modal' }: CaseStudyCardProps) {
  return (
    <CardShell layout={layout} className={blurShellClass(layout)}>
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

      <div className={blurBodyClass(layout)}>
        <span className={roleBadgeClassName(project.role, 'shadow-glow')}>
          {project.role}
        </span>

        <h3 className={blurTitleClassFor(layout)}>{project.title}</h3>

        <p className="mx-auto mt-4 max-w-[340px] text-sm font-medium leading-relaxed text-white/95 drop-shadow-[0_1px_8px_rgba(0,0,0,0.75)] md:text-[15px]">
          {project.description}
        </p>

        <ViewCaseStudyLink href={project.href} className="mt-6" />
      </div>
    </CardShell>
  )
}

export function CaseStudyCard({ project, onClose, layout = 'modal' }: CaseStudyCardProps) {
  if (project.comingSoon) {
    return <ComingSoonCaseStudyCard project={project} onClose={onClose} layout={layout} />
  }

  if (project.heroBackgroundCard) {
    return <HeroBackgroundCaseStudyCard project={project} onClose={onClose} layout={layout} />
  }

  return <BlurCaseStudyCard project={project} onClose={onClose} layout={layout} />
}
