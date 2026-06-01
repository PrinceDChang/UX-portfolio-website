import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { CaseStudyConclusion } from '../components/case-study/CaseStudyConclusion'
import { CaseStudyShell } from '../components/case-study/CaseStudyShell'
import { DesignProcessSteps } from '../components/case-study/DesignProcessSteps'
import { FeatureShowcase } from '../components/case-study/FeatureShowcase'
import { SectionBlock } from '../components/case-study/SectionBlock'
import { SplitHeroCards } from '../components/case-study/SplitHeroCards'
import {
  wa211CaseStudyMeta,
  wa211MoreProjects,
  wa211Sections,
} from '../data/wa211CaseStudy'
import { roleBadgeClassName } from '../lib/projectRole'

export function Washington211CaseStudyPage() {
  useEffect(() => {
    document.title = 'Washington 211 — Case Study · Oey Chang'
    return () => {
      document.title = 'Oey Chang — UX Designer'
    }
  }, [])

  return (
    <CaseStudyShell>
      <section className="relative overflow-hidden pb-8 md:pb-12">
        <div className="relative z-10 mx-auto max-w-6xl px-6 pt-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className={roleBadgeClassName(wa211CaseStudyMeta.role, 'mb-6')}>
              {wa211CaseStudyMeta.role}
            </span>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-accent">
              {wa211CaseStudyMeta.projectLabel}
            </p>
            <h1 className="font-condensed text-5xl uppercase leading-none tracking-wide text-ink md:text-6xl">
              {wa211CaseStudyMeta.title}
            </h1>
            <p className="mt-6 w-full max-w-none text-lg leading-relaxed text-slate md:text-xl">
              {wa211CaseStudyMeta.tagline}
            </p>

            <dl className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {wa211CaseStudyMeta.details.map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl bg-elevated/80 px-5 py-4 ring-1 ring-white/8 backdrop-blur-sm"
                >
                  <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-slate">
                    {item.label}
                  </dt>
                  <dd className="mt-1 text-sm font-medium text-ink">{item.value}</dd>
                </div>
              ))}
            </dl>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="relative z-10 mx-auto mt-12 max-w-6xl px-6"
        >
          <div className="overflow-hidden rounded-[2rem] bg-[#1a1a1e] ring-1 ring-white/10 shadow-soft">
            <img
              src={wa211CaseStudyMeta.heroImage}
              alt={wa211CaseStudyMeta.heroImageAlt}
              className="block h-auto w-full object-cover object-center"
            />
          </div>
        </motion.div>
      </section>

      <div className="space-y-20 pb-20 pt-10 md:space-y-28 md:pb-28 md:pt-14">
        <SectionBlock label={wa211Sections.hook.label}>
          <p className="w-full max-w-none whitespace-pre-line text-left text-base leading-relaxed text-slate md:text-lg">
            {wa211Sections.hook.body}
          </p>
        </SectionBlock>

        <SectionBlock label={wa211Sections.challenge.label}>
          <p className="mb-8 w-full max-w-none text-left text-base leading-relaxed text-slate md:text-lg">
            {wa211Sections.challenge.body}
          </p>
          <blockquote className="case-study-quote mb-8 rounded-3xl border border-accent/25 bg-elevated/60 px-8 py-8 md:px-10 md:py-10">
            <h2 className="mb-5 font-display text-2xl leading-tight text-ink md:text-3xl">
              Problem statement
            </h2>
            <p className="font-display text-xl leading-relaxed text-ink md:text-2xl">
              &ldquo;{wa211Sections.challenge.problemStatement}&rdquo;
            </p>
          </blockquote>
          <div className="rounded-3xl bg-[#141418] px-7 py-8 ring-1 ring-white/[0.06] md:px-10 md:py-10">
            <h3 className="font-display text-lg uppercase tracking-wide text-ink md:text-xl">
              Research questions
            </h3>
            <ul className="mt-5 space-y-4 text-base leading-relaxed text-slate md:text-[17px]">
              {wa211Sections.researchQuestions.map((question) => (
                <li key={question} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                  <span>{question}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-8 rounded-3xl bg-elevated/60 px-7 py-8 ring-1 ring-white/8 md:px-10 md:py-10">
            <h3 className="font-display text-lg uppercase tracking-wide text-ink md:text-xl">
              {wa211Sections.purpose.label}
            </h3>
            <p className="mt-4 text-base leading-relaxed text-slate md:text-[17px]">
              {wa211Sections.purpose.intro}
            </p>
            <ul className="mt-5 space-y-3 text-base leading-relaxed text-slate md:text-[17px]">
              {wa211Sections.purpose.goals.map((goal) => (
                <li key={goal} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                  <span>{goal}</span>
                </li>
              ))}
            </ul>
          </div>
        </SectionBlock>

        <SectionBlock>
          <SplitHeroCards
            label={wa211Sections.solution.label}
            headline={wa211Sections.solution.subtitle}
            body={wa211Sections.solution.body}
            pillars={wa211Sections.solution.pillars}
          />
        </SectionBlock>

        <SectionBlock>
          <div className="mb-8 md:mb-10">
            <h2 className="section-title mb-0">{wa211Sections.process.title}</h2>
            <p className="mt-4 font-display text-xl uppercase tracking-wide text-ink md:text-2xl">
              {wa211Sections.process.introLabel}
            </p>
            <p className="mt-5 w-full max-w-none text-base leading-relaxed text-slate md:text-lg">
              {wa211Sections.process.intro}
            </p>
          </div>
          <DesignProcessSteps steps={wa211Sections.process.steps} />
        </SectionBlock>

        <SectionBlock label="Findings" title="What testing surfaced">
          <p className="mb-8 w-full max-w-none text-left text-base leading-relaxed text-slate md:text-lg">
            {wa211Sections.findingsIntro}
          </p>
          <FeatureShowcase
            sidebarTitle={wa211Sections.featuresSidebarTitle}
            features={wa211Sections.features}
          />
        </SectionBlock>

        <SectionBlock>
          <blockquote className="case-study-quote rounded-3xl border border-accent/25 bg-elevated/60 px-8 py-8 md:px-10 md:py-10">
            <p className="font-display text-xl leading-relaxed text-ink md:text-2xl">
              &ldquo;{wa211Sections.testimonial.quote}&rdquo;
            </p>
            <footer className="mt-6 text-sm text-slate md:text-base">
              <cite className="not-italic font-semibold text-ink">
                {wa211Sections.testimonial.name}
              </cite>
              <span className="mt-1 block">{wa211Sections.testimonial.title}</span>
            </footer>
          </blockquote>
        </SectionBlock>

        <SectionBlock label="Reflection" title="Conclusion">
          <CaseStudyConclusion content={wa211Sections.conclusion} />

          <div className="mt-10 border-t border-white/[0.06] pt-10 md:mt-12 md:pt-12">
            <h3 className="font-display text-xl uppercase tracking-wide text-ink md:text-2xl">
              Lessons learned
            </h3>
            <div className="mt-6 grid gap-6 md:grid-cols-3 md:mt-8">
              {wa211Sections.lessonsLearned.map((item) => (
                <article
                  key={item.title}
                  className="rounded-3xl bg-elevated p-8 ring-1 ring-white/8"
                >
                  <h4 className="text-lg font-semibold text-ink">{item.title}</h4>
                  <p className="mt-4 text-sm leading-relaxed text-slate">{item.body}</p>
                </article>
              ))}
            </div>
          </div>
        </SectionBlock>

        <SectionBlock label="Explore more" title="More projects">
          <div className="grid gap-4 md:grid-cols-3">
            {wa211MoreProjects.map((project) => {
              const hasImage = 'image' in project && project.image
              const imageBackground =
                'imageBackground' in project &&
                typeof project.imageBackground === 'string'
                  ? project.imageBackground
                  : '#111118'
              const imageFit =
                'imageBackground' in project ? 'object-contain' : 'object-cover'

              return (
                <Link
                  key={project.title}
                  to={project.href}
                  className={`overflow-hidden rounded-3xl bg-surface ring-1 ring-white/8 transition hover:ring-accent/40 ${
                    hasImage ? 'flex flex-col' : 'p-6'
                  }`}
                >
                  {hasImage && (
                    <div
                      className="relative aspect-[16/10] overflow-hidden"
                      style={{ backgroundColor: imageBackground }}
                    >
                      <img
                        src={project.image}
                        alt={
                          ('imageAlt' in project ? project.imageAlt : undefined) ??
                          project.title
                        }
                        className={`h-full w-full ${imageFit} object-center ${
                          'imageBackground' in project ? 'p-4' : ''
                        }`}
                        loading="lazy"
                        decoding="async"
                      />
                      <span
                        className={roleBadgeClassName(
                          project.role,
                          'absolute left-3 top-3 z-10 text-[10px]',
                        )}
                      >
                        {project.role}
                      </span>
                    </div>
                  )}
                  <div className={hasImage ? 'p-6' : 'p-6'}>
                    <h3
                      className={`font-condensed text-3xl uppercase tracking-wide text-ink ${
                        hasImage ? '' : 'mt-4'
                      }`}
                    >
                      {project.title}
                    </h3>
                    <p className="mt-2 text-sm text-slate">{project.description}</p>
                  </div>
                </Link>
              )
            })}
          </div>
        </SectionBlock>
      </div>
    </CaseStudyShell>
  )
}
