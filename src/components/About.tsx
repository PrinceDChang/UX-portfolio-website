import { motion } from 'framer-motion'
import { PageLink } from './PageLink'
import { CountUpStat } from './CountUpStat'
import { SocialLinks } from './about/SocialLinks'

const stats = [
  { label: 'Years of Experience', value: '3+' },
  { label: 'Completed Projects', value: '12+' },
]

export function AboutContent() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7 }}
    >
      <h2 className="section-title mb-6">About me</h2>
      <p className="section-copy">
        Hi, I&apos;m Oey Chang — a UX designer and researcher with a background in international
        consulting, a passion for globalization, localization and fitness.
      </p>
      <p className="mt-4 section-copy">
        I graduated from the University of Washington Seattle with a Master Degree in Human-Centered
        Design & Engineering in June 2026.
      </p>

      <div className="mt-10 grid max-w-md grid-cols-2 gap-6">
        {stats.map((stat, index) => (
          <div
            key={stat.label}
            className="rounded-3xl bg-elevated p-6 shadow-card ring-2 ring-accent/60"
          >
            <CountUpStat
              value={stat.value}
              delay={index * 0.12}
              className="font-display text-5xl text-accent"
            />
            <p className="mt-2 text-sm text-slate">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-4">
        <SocialLinks />
        <PageLink
          to="/about"
          className="rounded-full border border-white/10 px-5 py-2.5 text-sm font-medium text-ink transition hover:border-accent/50 hover:text-accent"
        >
          My Story
        </PageLink>
      </div>
    </motion.div>
  )
}
