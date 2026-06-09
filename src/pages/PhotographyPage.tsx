import { motion, useReducedMotion } from 'framer-motion'
import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { CaseStudyShell } from '../components/case-study/CaseStudyShell'
import { PhotographyFilmGallery } from '../components/photography/PhotographyFilmGallery'
import { usePhotographyTransition } from '../context/PhotographyTransitionContext'
import { photographyPage } from '../data/photographyPage'

export function PhotographyPage() {
  const location = useLocation()
  const reducedMotion = useReducedMotion()
  const { canRevealContent, isTransitionActive } = usePhotographyTransition()
  const fromTransition = Boolean(
    (location.state as { fromPhotoTransition?: boolean } | null)?.fromPhotoTransition,
  )
  const revealContent = !fromTransition || !isTransitionActive || canRevealContent

  useEffect(() => {
    document.title = 'Photography · Oey Chang'
    return () => {
      document.title = 'Oey Chang — UX Designer'
    }
  }, [])

  return (
    <CaseStudyShell>
      <article className="photography-page mx-auto max-w-6xl px-6 pb-28 md:px-10 md:pb-36">
        <Link
          to="/about#focus-photography"
          className="inline-block text-sm text-slate transition hover:text-accent"
        >
          ← Back to about
        </Link>

        <div className="photography-page__layout mt-10 md:mt-14">
          <motion.aside
            className="photography-page__bio"
            initial={reducedMotion ? false : { opacity: 0, x: -24 }}
            animate={revealContent ? { opacity: 1, x: 0 } : { opacity: 0, x: -24 }}
            transition={{
              duration: 0.75,
              delay: revealContent && fromTransition && !reducedMotion ? 0.1 : 0.05,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <p className="photography-page__label">{photographyPage.label}</p>

            <h1 className="photography-page__headline">
              <span className="photography-page__headline-primary">
                {photographyPage.headline.primary}
              </span>{' '}
              <span className="photography-page__headline-accent">{photographyPage.headline.accent}</span>
            </h1>

            <p className="photography-page__lead">{photographyPage.bio.lead}</p>

            <div className="photography-page__body">
              {photographyPage.bio.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 28)}>{paragraph}</p>
              ))}
            </div>
          </motion.aside>

          <PhotographyFilmGallery playEntry={revealContent} />
        </div>
      </article>
    </CaseStudyShell>
  )
}
