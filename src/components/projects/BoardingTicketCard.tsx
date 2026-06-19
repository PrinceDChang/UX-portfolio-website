import { PageLink } from '../PageLink'
import { getPostcardVisibleTags, type Project } from '../../data/content'
import { useProjectHoverVideo } from '../../lib/useProjectHoverVideo'
import { getProjectAirportCode, getTicketSerial } from '../../lib/projectTicket'

export type BoardingTicketVariant = 'front' | 'back'
export type TicketPeekTier = 'full' | 'medium' | 'compact'

interface BoardingTicketProps {
  project: Project
  index: number
  variant?: BoardingTicketVariant
  backDepth?: number
  peekTier?: TicketPeekTier
}

export function BoardingTicket({
  project,
  index,
  variant = 'front',
  backDepth = 0,
  peekTier = 'full',
}: BoardingTicketProps) {
  const isFront = variant === 'front'
  const airport = getProjectAirportCode(project)
  const serial = getTicketSerial(project.id, index)
  const visibleTags = getPostcardVisibleTags(project.tags)
  const gate = `${String.fromCharCode(65 + (index % 6))}${10 + (index % 8)}`
  const canNavigate = !project.comingSoon && project.href.startsWith('/')
  const { videoRef, hovered, hasHoverVideo, hoverHandlers } = useProjectHoverVideo(
    project.hoverVideo,
  )

  return (
    <article
      className={[
        'boarding-ticket',
        isFront ? 'boarding-ticket--front' : `boarding-ticket--back boarding-ticket--back-${backDepth % 3}`,
        !isFront && `boarding-ticket--peek-${peekTier}`,
        project.comingSoon ? 'boarding-ticket--standby' : '',
      ]
        .filter(Boolean)
        .join(' ')}
      {...hoverHandlers}
    >
      <div className="boarding-ticket__stub">
        <span className="boarding-ticket__brand" aria-hidden>
          OC
        </span>
        <span className="boarding-ticket__serial">{serial}</span>
        <div className="boarding-ticket__barcode" aria-hidden>
          {Array.from({ length: 14 }).map((_, i) => (
            <span key={i} style={{ height: `${40 + ((i * 7) % 55)}%` }} />
          ))}
        </div>
        <span className="boarding-ticket__class">{project.comingSoon ? 'STBY' : 'CS'}</span>
      </div>

      <div className="boarding-ticket__perf" aria-hidden />

      <div className="boarding-ticket__body">
        <div className="boarding-ticket__header">
          <div>
            <p className="boarding-ticket__label">Boarding pass</p>
            <p className="boarding-ticket__route">
              <span>{airport}</span>
              <span className="boarding-ticket__route-arrow" aria-hidden>
                →
              </span>
              <span>CASE</span>
            </p>
          </div>
          <div className="boarding-ticket__meta-block">
            <span className="boarding-ticket__meta-key">Gate</span>
            <span className="boarding-ticket__meta-val">{gate}</span>
          </div>
        </div>

        <div className="boarding-ticket__main-row">
          <div
            className={`boarding-ticket__thumb-wrap${
              hasHoverVideo ? ' boarding-ticket__thumb-wrap--hover-video' : ''
            }`}
            style={hasHoverVideo ? { backgroundColor: project.heroImageBackground } : undefined}
          >
            <img
              src={project.image}
              alt=""
              className={`boarding-ticket__thumb${
                hasHoverVideo
                  ? ` transition-opacity duration-300 ${hovered ? 'opacity-0' : 'opacity-100'}`
                  : ''
              }`}
              loading="lazy"
              decoding="async"
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
                className={`boarding-ticket__thumb boarding-ticket__thumb-video transition-opacity duration-300 ${
                  hovered ? 'opacity-100' : 'opacity-0'
                }`}
              />
            ) : null}
          </div>
          <div className="boarding-ticket__copy-block">
            <h3 className="boarding-ticket__title">{project.title}</h3>
            <p className="boarding-ticket__role">{project.role}</p>
            <p className="boarding-ticket__desc">{project.description}</p>
            {visibleTags.length > 0 && (
              <ul className="boarding-ticket__tags" aria-label="Project tags">
                {visibleTags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
            )}
          </div>
          <div className="boarding-ticket__flight-block">
            <span className="boarding-ticket__meta-key">Seat</span>
            <span className="boarding-ticket__seat">
              {String(index + 12).padStart(2, '0')}
              {String.fromCharCode(65 + (index % 4))}
            </span>
            <span className="boarding-ticket__meta-key">Zone</span>
            <span className="boarding-ticket__meta-val">{project.location}</span>
          </div>
        </div>

        <footer className="boarding-ticket__footer">
          <span>{project.city.toUpperCase()}</span>
          <span className="boarding-ticket__footer-divider" aria-hidden>
            |
          </span>
          {isFront && canNavigate ? (
            <PageLink
              to={project.href}
              className="boarding-ticket__open-link"
            >
              Open case study →
            </PageLink>
          ) : (
            <span>
              {project.comingSoon ? 'Standby — coming soon' : 'Next in stack'}
            </span>
          )}
        </footer>
      </div>
    </article>
  )
}

function peekTierForDepth(depth: number): TicketPeekTier {
  if (depth === 1) return 'full'
  if (depth === 2) return 'medium'
  return 'compact'
}

export { peekTierForDepth }
