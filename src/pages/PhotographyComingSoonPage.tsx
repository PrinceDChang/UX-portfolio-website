import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CaseStudyShell } from '../components/case-study/CaseStudyShell'
import { photographyPage } from '../data/photographyPage'

export function PhotographyComingSoonPage() {
  useEffect(() => {
    document.title = 'Photography — Coming Soon · Oey Chang'
    return () => {
      document.title = 'Oey Chang — UX Designer'
    }
  }, [])

  return (
    <CaseStudyShell>
      <article className="mx-auto max-w-6xl px-6 pb-28 md:px-10 md:pb-36">
        <Link
          to="/about"
          className="inline-block text-sm text-slate transition hover:text-[#e8a54b]"
        >
          ← Back to about
        </Link>

        <div className="mt-10 grid gap-12 md:mt-14 md:grid-cols-[1fr_1.05fr] md:items-center md:gap-16">
          <motion.header
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <p
              className="font-condensed text-sm uppercase tracking-[0.32em]"
              style={{ color: photographyPage.accent }}
            >
              {photographyPage.label}
            </p>
            <h1 className="mt-4 font-display text-4xl text-ink md:text-5xl">
              {photographyPage.headline}
            </h1>
            <p className="mt-4 font-display text-xl italic text-ink/90 md:text-2xl">
              {photographyPage.tagline}
            </p>
            <p className="mt-6 max-w-md text-base leading-relaxed text-slate md:text-[17px]">
              {photographyPage.body}
            </p>

            <ul className="mt-8 flex flex-wrap gap-2">
              {photographyPage.highlights.map((item) => (
                <li
                  key={item}
                  className="rounded-full px-3.5 py-1.5 text-xs font-medium text-ink ring-1 ring-white/10"
                  style={{ backgroundColor: photographyPage.accentMuted }}
                >
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <span
                className="inline-flex cursor-default items-center rounded-full px-5 py-2.5 text-sm font-semibold text-white ring-1 ring-white/10"
                style={{ backgroundColor: photographyPage.accent }}
                aria-disabled="true"
              >
                Coming soon
              </span>
              <Link
                to="/#contact"
                className="inline-flex rounded-full border border-white/10 px-5 py-2.5 text-sm font-medium text-ink transition hover:border-[#e8a54b]/50 hover:text-[#e8a54b]"
              >
                Get in touch
              </Link>
            </div>
          </motion.header>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto w-full max-w-md md:max-w-none"
          >
            <div className="relative overflow-hidden rounded-3xl bg-[#111118] shadow-[0_24px_80px_rgba(0,0,0,0.45)] ring-1 ring-white/[0.08]">
              <div className="aspect-[3/4]">
                <img
                  src={photographyPage.image}
                  alt={photographyPage.imageAlt}
                  className="h-full w-full object-cover object-center"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div
                className="pointer-events-none absolute inset-0"
                aria-hidden
              >
                <span className="absolute left-5 top-5 h-8 w-8 border-l-2 border-t-2 border-white/70" />
                <span className="absolute right-5 top-5 h-8 w-8 border-r-2 border-t-2 border-white/70" />
                <span className="absolute bottom-5 left-5 h-8 w-8 border-b-2 border-l-2 border-white/70" />
                <span className="absolute bottom-5 right-5 h-8 w-8 border-b-2 border-r-2 border-white/70" />
                <span className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded bg-black/45 px-2.5 py-1 font-mono text-[10px] tracking-wide text-white/85">
                  1/125 · f/2.8 · ISO 400
                </span>
              </div>
            </div>
            <div
              className="pointer-events-none absolute -inset-6 -z-10 rounded-[2rem] opacity-60 blur-3xl"
              style={{ backgroundColor: photographyPage.accentMuted }}
              aria-hidden
            />
          </motion.div>
        </div>
      </article>
    </CaseStudyShell>
  )
}
