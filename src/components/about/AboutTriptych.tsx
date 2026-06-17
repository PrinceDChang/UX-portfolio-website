import { motion } from 'framer-motion'
import { useCallback, useEffect, useState } from 'react'
import { PageLink } from '../PageLink'
import {
  aboutFocuses,
  type AboutFocus,
  type AboutFocusId,
} from '../../data/aboutPage'
import { useWushuTransition } from '../../context/WushuTransitionContext'
import { usePhotographyTransition } from '../../context/PhotographyTransitionContext'

function FocusCta({ focus }: { focus: AboutFocus }) {
  const { startWushuTransition } = useWushuTransition()
  const { startPhotographyTransition } = usePhotographyTransition()

  if (!focus.cta) return null

  const className =
    'about-focus-panel__cta mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90 hover:shadow-glow'

  if (focus.cta.comingSoon) {
    return (
      <span
        className={`${className} cursor-default opacity-80 hover:opacity-80 hover:shadow-none`}
        aria-disabled="true"
      >
        {focus.cta.label}
      </span>
    )
  }

  const content = (
    <>
      {focus.cta.label}
      <span aria-hidden>→</span>
    </>
  )

  if (focus.cta.wushuTransition) {
    return (
      <button
        type="button"
        onClick={startWushuTransition}
        className={className}
      >
        {content}
      </button>
    )
  }

  if (focus.cta.photographyTransition) {
    return (
      <button
        type="button"
        onClick={startPhotographyTransition}
        className={className}
      >
        {content}
      </button>
    )
  }

  if (!focus.cta.href) return null

  if (focus.cta.external || !focus.cta.href.startsWith('/')) {
    return (
      <a
        href={focus.cta.href}
        className={className}
        target={focus.cta.external ? '_blank' : undefined}
        rel={focus.cta.external ? 'noopener noreferrer' : undefined}
      >
        {content}
      </a>
    )
  }

  return (
    <PageLink to={focus.cta.href} className={className}>
      {content}
    </PageLink>
  )
}

function FocusPanel({ focus }: { focus: AboutFocus }) {
  const isPhoto = focus.id === 'photography'

  return (
    <section id={`focus-${focus.id}`} className="about-focus-panel scroll-mt-32">
      <div className="about-focus-panel__inner">
        <div className="about-focus-panel__visual">
          <div className="about-focus-panel__lens" aria-hidden="true">
            <div className="about-focus-panel__lens-ring" />
          </div>
          <div className={`about-focus-panel__image-wrap ${isPhoto ? 'about-focus-panel__image-wrap--photo' : ''}`}>
            <img src={focus.image} alt={focus.imageAlt} className="about-focus-panel__image" />
            {isPhoto ? (
              <div className="about-focus-panel__viewfinder" aria-hidden="true">
                <span className="about-focus-panel__vf-corner about-focus-panel__vf-corner--tl" />
                <span className="about-focus-panel__vf-corner about-focus-panel__vf-corner--tr" />
                <span className="about-focus-panel__vf-corner about-focus-panel__vf-corner--bl" />
                <span className="about-focus-panel__vf-corner about-focus-panel__vf-corner--br" />
                <span className="about-focus-panel__vf-label">1/125 · f/2.8 · ISO 400</span>
              </div>
            ) : null}
            {focus.id === 'wushu' ? (
              <svg className="about-focus-panel__motion-lines" viewBox="0 0 200 80" aria-hidden="true">
                <path d="M10 40 Q60 10 110 40 T190 40" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.35" />
                <path d="M20 55 Q70 25 120 55 T200 55" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.2" />
              </svg>
            ) : null}
          </div>
        </div>

        <div className="about-focus-panel__content">
          <span className="about-focus-panel__index font-condensed">{focus.index}</span>
          <h2 className="about-focus-panel__title font-condensed">{focus.title}</h2>
          <p className="about-focus-panel__tagline font-display italic text-ink/90">{focus.tagline}</p>

          {focus.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 24)} className="about-focus-panel__copy">
              {paragraph}
            </p>
          ))}

          <ul className="about-focus-panel__highlights">
            {focus.highlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <FocusCta focus={focus} />
        </div>
      </div>
    </section>
  )
}

export function AboutTriptych() {
  const [activeId, setActiveId] = useState<AboutFocusId>('design')
  const scrollToFocus = useCallback((id: AboutFocusId) => {
    document.getElementById(`focus-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setActiveId(id)
  }, [])

  useEffect(() => {
    const sections = aboutFocuses
      .map((f) => document.getElementById(`focus-${f.id}`))
      .filter(Boolean) as HTMLElement[]

    if (sections.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible?.target.id) {
          const id = visible.target.id.replace('focus-', '') as AboutFocusId
          setActiveId(id)
        }
      },
      { rootMargin: '-35% 0px -45% 0px', threshold: [0.2, 0.45, 0.7] },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  return (
    <div className="about-triptych">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="about-triptych__header"
      >
        <p className="section-label">Three lenses</p>
        <h2 className="mt-3 font-display text-3xl text-ink md:text-4xl">What shapes my work</h2>
      </motion.div>

      <div className="about-triptych__layout">
        <nav className="about-triptych__nav" aria-label="Focus areas">
          <ul className="about-triptych__nav-list">
            {aboutFocuses.map((focus) => {
              const isActive = activeId === focus.id
              return (
                <li key={focus.id} className="relative">
                  {isActive ? (
                    <motion.span
                      layoutId="about-nav-active"
                      className="about-triptych__nav-indicator"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  ) : null}
                  <button
                    type="button"
                    onClick={() => scrollToFocus(focus.id)}
                    aria-current={isActive ? 'true' : undefined}
                    className={`about-triptych__nav-btn ${isActive ? 'about-triptych__nav-btn--active' : ''}`}
                  >
                    <span className="about-triptych__nav-index">{focus.index}</span>
                    <span className="about-triptych__nav-title">{focus.title}</span>
                  </button>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="about-triptych__panels">
          <div className="about-triptych__tabs md:hidden" role="tablist" aria-label="Focus areas">
            {aboutFocuses.map((focus) => (
              <button
                key={focus.id}
                type="button"
                role="tab"
                aria-selected={activeId === focus.id}
                onClick={() => scrollToFocus(focus.id)}
                className={`about-triptych__tab ${activeId === focus.id ? 'about-triptych__tab--active' : ''}`}
              >
                {focus.title}
              </button>
            ))}
          </div>

          {aboutFocuses.map((focus) => (
            <FocusPanel key={focus.id} focus={focus} />
          ))}
        </div>
      </div>
    </div>
  )
}
