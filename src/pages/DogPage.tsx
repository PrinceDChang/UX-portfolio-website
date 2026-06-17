import { motion, useReducedMotion } from 'framer-motion'
import { useEffect } from 'react'
import { PageLink } from '../components/PageLink'
import { CaseStudyShell } from '../components/case-study/CaseStudyShell'
import { DogPhotoSlideshow } from '../components/dog/DogPhotoSlideshow'
import { dogPage } from '../data/dogPage'

export function DogPage() {
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    document.title = `${dogPage.headline.accent} · Oey Chang`
    return () => {
      document.title = 'Oey Chang — UX Designer'
    }
  }, [])

  return (
    <CaseStudyShell>
      <article className="dog-page mx-auto max-w-6xl px-6 pb-28 md:px-10 md:pb-36">
        <PageLink
          to="/"
          className="inline-block text-sm text-slate transition hover:text-accent"
        >
          ← Back home
        </PageLink>

        <div className="dog-page__layout mt-10 md:mt-14">
          <motion.aside
            className="dog-page__bio"
            initial={reduceMotion ? false : { opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="dog-page__label">{dogPage.label}</p>

            <h1 className="dog-page__headline">
              <span className="dog-page__headline-primary">{dogPage.headline.primary}</span>{' '}
              <span className="dog-page__headline-accent">{dogPage.headline.accent}</span>
            </h1>

            <p className="dog-page__lead">{dogPage.bio.lead}</p>

            <div className="dog-page__body">
              {dogPage.bio.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 32)}>{paragraph}</p>
              ))}
            </div>

            <dl className="dog-page__facts">
              {dogPage.facts.map((fact) => (
                <div key={fact.label} className="dog-page__fact">
                  <dt>{fact.label}</dt>
                  <dd>{fact.value}</dd>
                </div>
              ))}
            </dl>
          </motion.aside>

          <motion.div
            className="dog-page__gallery"
            initial={reduceMotion ? false : { opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.75, delay: reduceMotion ? 0 : 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            <DogPhotoSlideshow slides={dogPage.photos} subjectName={dogPage.headline.accent} />
          </motion.div>
        </div>
      </article>
    </CaseStudyShell>
  )
}
