import { motion, useReducedMotion } from 'framer-motion'
import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { CaseStudyShell } from '../components/case-study/CaseStudyShell'
import { WushuScrollGallery } from '../components/wushu/WushuScrollGallery'
import { wushuPage } from '../data/wushuPage'

export function WushuPage() {
  const location = useLocation()
  const reducedMotion = useReducedMotion()
  const fromTransition = Boolean(
    (location.state as { fromWushuTransition?: boolean } | null)?.fromWushuTransition,
  )

  useEffect(() => {
    document.title = 'Wushu · Oey Chang'
    return () => {
      document.title = 'Oey Chang — UX Designer'
    }
  }, [])

  return (
    <CaseStudyShell>
      <article className="wushu-page mx-auto max-w-6xl px-6 pb-28 md:px-10 md:pb-36">
        <Link
          to="/about#focus-wushu"
          className="inline-block text-sm text-slate transition hover:text-accent"
        >
          ← Back to about
        </Link>

        <div className="wushu-page__layout mt-10 md:mt-14">
          <motion.aside
            className="wushu-page__bio"
            initial={reducedMotion ? false : { opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.75,
              delay: fromTransition && !reducedMotion ? 0.35 : 0.05,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <p className="wushu-page__label">{wushuPage.label}</p>

            <h1 className="wushu-page__headline">
              <span className="wushu-page__headline-primary">{wushuPage.headline.primary}</span>{' '}
              <span className="wushu-page__headline-accent">{wushuPage.headline.accent}</span>
            </h1>

            <p className="wushu-page__lead">{wushuPage.bio.lead}</p>

            <div className="wushu-page__body">
              {wushuPage.bio.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 28)}>{paragraph}</p>
              ))}
            </div>
          </motion.aside>

          <WushuScrollGallery playEntry />
        </div>
      </article>
    </CaseStudyShell>
  )
}
