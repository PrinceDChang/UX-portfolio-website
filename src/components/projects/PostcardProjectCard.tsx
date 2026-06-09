import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { getPostcardVisibleTags, type Project } from '../../data/content'
import { scrollPageToTop } from '../../lib/scrollToTop'

const postcardTilt: Record<string, number> = {
  cue: -2.8,
  coplan: 1.6,
  sushitalk: -1.4,
  wa211: 2.2,
  'uw-oris': -0.9,
  citbridge: 2.5,
  'competition-king': -1.8,
  arboretum: 1.2,
}

interface PostcardProjectCardProps {
  project: Project
  index: number
}

function PostcardPin() {
  return (
    <div className="postcard-pin" aria-hidden="true">
      <span className="postcard-pin__head" />
      <span className="postcard-pin__needle" />
    </div>
  )
}

function PostcardInner({ project }: { project: Project }) {
  const imageBg = project.heroImageBackground ?? '#f4f0ea'
  const visibleTags = getPostcardVisibleTags(project.tags)

  return (
    <article className="postcard-card">
      <div className="postcard-card__image" style={{ backgroundColor: imageBg }}>
        <img src={project.image} alt={project.imageAlt} className="postcard-card__photo" />
      </div>

      <div className="postcard-card__body">
        <div className="postcard-card__meta">
          <span className="postcard-card__role">{project.role}</span>
          <span className="postcard-card__location">
            {project.city}, {project.location}
          </span>
        </div>

        <h3 className="postcard-card__title">{project.title}</h3>
        <p className="postcard-card__copy">{project.description}</p>

        {visibleTags.length > 0 && (
          <ul className="postcard-card__tags" aria-label="Project tags">
            {visibleTags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        )}

        {project.comingSoon ? (
          <span className="postcard-card__cta postcard-card__cta--muted">Coming soon</span>
        ) : (
          <span className="postcard-card__cta">
            View case study
            <span aria-hidden>→</span>
          </span>
        )}
      </div>
    </article>
  )
}

export function PostcardProjectCard({ project, index }: PostcardProjectCardProps) {
  const tilt = postcardTilt[project.id] ?? 0

  const card = (
    <motion.div
      layout
      initial={{ opacity: 0, y: 28, rotate: tilt - 4 }}
      animate={{ opacity: 1, y: 0, rotate: tilt }}
      exit={{ opacity: 0, scale: 0.94, rotate: tilt + 2 }}
      whileHover={{ y: -6 }}
      transition={{
        duration: 0.45,
        delay: index * 0.06,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="postcard-slot"
      style={{ zIndex: 10 - Math.abs(Math.round(tilt)) }}
    >
      <PostcardPin />
      <PostcardInner project={project} />
    </motion.div>
  )

  if (project.comingSoon || !project.href.startsWith('/')) {
    return card
  }

  return (
    <Link
      to={project.href}
      onClick={scrollPageToTop}
      className="postcard-link block no-underline outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#121018]"
    >
      {card}
    </Link>
  )
}
