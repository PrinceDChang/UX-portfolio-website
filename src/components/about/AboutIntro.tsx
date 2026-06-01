import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { aboutIntro, aboutIntroPortrait, aboutStats } from '../../data/aboutPage'
import { SocialLinks } from './SocialLinks'

export function AboutIntro() {
  return (
    <header className="about-intro">
      <div className="about-intro__grid">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="about-intro__copy"
        >
          <p className="section-label mb-4">{aboutIntro.label}</p>
          <h1 className="about-intro__headline font-display text-ink">{aboutIntro.headline}</h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-slate md:text-lg">
            {aboutIntro.lead}
          </p>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate/90 md:text-base">
            {aboutIntro.sub}
          </p>

          <div className="mt-10 grid grid-cols-2 gap-4 sm:max-w-md">
            {aboutStats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 + i * 0.06 }}
                className="rounded-2xl bg-elevated/80 px-4 py-4 ring-1 ring-white/8"
              >
                <p className="font-display text-3xl text-accent md:text-4xl">{stat.value}</p>
                <p className="mt-1 text-xs text-slate">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <SocialLinks />
            <Link
              to="/projects"
              className="rounded-full border border-white/10 px-5 py-2.5 text-sm font-medium text-ink transition hover:border-accent/50 hover:text-accent"
            >
              View projects
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="about-intro__portrait"
        >
          <div className="about-intro__ring" aria-hidden="true" />
          <div className="about-intro__frame">
            <img
              src={aboutIntroPortrait}
              alt="Oey Chang at Chureito Pagoda with Mount Fuji and Fujiyoshida in the background"
              className="h-full w-full object-cover object-center"
            />
          </div>
          <p className="about-intro__orbit-caption font-condensed uppercase tracking-[0.2em] text-slate">
            Design · Photo · Wushu
          </p>
        </motion.div>
      </div>
    </header>
  )
}
