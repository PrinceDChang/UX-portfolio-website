import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { AlternatingDesignTimeline } from '../components/case-study/AlternatingDesignTimeline'
import { CaseStudyImpactSummary } from '../components/case-study/CaseStudyImpactSummary'
import { CaseStudyMetaGrid } from '../components/case-study/CaseStudyMetaGrid'
import { CaseStudyMoreProjects } from '../components/case-study/CaseStudyMoreProjects'
import { CaseStudyConclusion } from '../components/case-study/CaseStudyConclusion'
import { CaseStudyShell } from '../components/case-study/CaseStudyShell'
import { DesignProcessSteps } from '../components/case-study/DesignProcessSteps'
import { FeatureShowcase } from '../components/case-study/FeatureShowcase'
import { FieldPhotoGallery } from '../components/case-study/FieldPhotoGallery'
import { CompetitionKingUserFlowReveal } from '../components/case-study/CompetitionKingUserFlowReveal'
import { SectionBlock } from '../components/case-study/SectionBlock'
import { SplitHeroCards } from '../components/case-study/SplitHeroCards'
import {
  competitionKingCaseStudyMeta,
  competitionKingSections,
} from '../data/competitionKingCaseStudy'
import { roleBadgeClassName } from '../lib/projectRole'

export function CompetitionKingCaseStudyPage() {
  useEffect(() => {
    document.title = 'Competition King — Case Study · Oey Chang'
    return () => {
      document.title = 'Oey Chang — UX Designer'
    }
  }, [])

  const { process, realWorldTesting } = competitionKingSections

  return (
    <CaseStudyShell>
      <section className="relative overflow-hidden pb-8 md:pb-12">
        <div className="relative z-10 mx-auto max-w-6xl px-6 pt-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className={roleBadgeClassName(competitionKingCaseStudyMeta.role, 'mb-6')}>
              {competitionKingCaseStudyMeta.role}
            </span>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-accent">
              {competitionKingCaseStudyMeta.projectLabel}
            </p>
            <h1 className="font-condensed text-5xl uppercase leading-none tracking-wide text-ink md:text-6xl">
              {competitionKingCaseStudyMeta.title}
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate md:text-xl">
              {competitionKingCaseStudyMeta.tagline}
            </p>

            <CaseStudyImpactSummary metrics={competitionKingCaseStudyMeta.impactMetrics} />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="relative z-10 mx-auto mt-12 max-w-6xl px-6"
        >
          <div className="overflow-hidden rounded-[2rem] bg-[#141018] ring-1 ring-white/10 shadow-soft">
            <img
              src={competitionKingCaseStudyMeta.heroImage}
              alt={competitionKingCaseStudyMeta.heroImageAlt}
              className="block h-auto w-full object-cover object-center"
            />
          </div>
          <CaseStudyMetaGrid className="mt-10" details={competitionKingCaseStudyMeta.details} />
        </motion.div>
      </section>

      <div className="space-y-20 pb-20 pt-10 md:space-y-28 md:pb-28 md:pt-14">
        <SectionBlock label={competitionKingSections.problem.label}>
          <p className="w-full max-w-none text-left text-base leading-relaxed text-slate md:text-lg">
            {competitionKingSections.problem.body}
          </p>
        </SectionBlock>

        <SectionBlock label={competitionKingSections.researchQuestion.label}>
          <blockquote className="case-study-quote rounded-3xl border border-accent/25 bg-elevated/60 px-8 py-8 md:px-10 md:py-10">
            <p className="font-display text-xl leading-relaxed text-ink md:text-2xl">
              &ldquo;{competitionKingSections.researchQuestion.statement}&rdquo;
            </p>
          </blockquote>
        </SectionBlock>

        <SectionBlock>
          <SplitHeroCards
            label={competitionKingSections.solution.label}
            headline={competitionKingSections.solution.subtitle}
            body={competitionKingSections.solution.body}
            pillars={competitionKingSections.solution.pillars}
          />
        </SectionBlock>

        <SectionBlock label="Results" title="Impact">
          <div className="grid gap-4 sm:grid-cols-3">
            {competitionKingSections.results.map((stat) => (
              <article
                key={stat.label}
                className="rounded-3xl bg-[#141418] px-6 py-8 text-center ring-1 ring-white/[0.06] md:px-8"
              >
                <p className="font-display text-4xl leading-none text-accent md:text-5xl">
                  {stat.value}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-slate md:text-[15px]">
                  {stat.label}
                </p>
              </article>
            ))}
          </div>
        </SectionBlock>

        <SectionBlock>
          <div className="mb-8 md:mb-10">
            <h2 className="section-title mb-0">{process.title}</h2>
            <p className="mt-4 font-display text-xl uppercase tracking-wide text-ink md:text-2xl">
              {process.introLabel}
            </p>
            <p className="mt-5 w-full max-w-none text-base leading-relaxed text-slate md:text-lg">
              {process.intro}
            </p>
          </div>
          <DesignProcessSteps steps={process.steps} />

          <article className="mt-10 py-2 md:py-3">
            <h3 className="text-xl font-semibold text-ink">{process.userFlow.title}</h3>
            <p className="mt-4 w-full max-w-none whitespace-pre-line text-base leading-relaxed text-slate md:text-lg">
              {process.userFlow.body}
            </p>
            <CompetitionKingUserFlowReveal className="relative mt-8" />
          </article>

          <h3 className="mt-12 text-xl font-semibold text-ink md:mt-16 md:text-2xl">Design</h3>
          <p className="mt-4 w-full max-w-none text-base leading-relaxed text-slate md:text-lg">
            After research and ideation, we moved into wireframing and outlining each main feature
            before high-fidelity prototyping for engineering handoff.
          </p>
          <AlternatingDesignTimeline
            className="mt-10 md:mt-12"
            steps={process.designTimeline}
          />
        </SectionBlock>

        <SectionBlock label={realWorldTesting.label}>
          <div className="mb-8 flex flex-col gap-8 text-left lg:flex-row lg:items-start lg:justify-between lg:gap-10">
            <div className="min-w-0 flex-1 lg:max-w-[52%]">
              <h2 className="mb-4 font-display text-3xl leading-tight text-ink md:mb-6 md:text-4xl">
                {realWorldTesting.title}
              </h2>
              <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-slate md:mb-6">
                {realWorldTesting.date}
              </p>
              <p className="text-base leading-relaxed text-slate md:text-lg">
                {realWorldTesting.body}
              </p>
            </div>

            <figure className="w-full shrink-0 overflow-hidden rounded-3xl ring-1 ring-white/[0.08] lg:ml-auto lg:w-[min(100%,248px)] lg:-translate-x-[30%]">
              <img
                src={realWorldTesting.poster}
                alt={realWorldTesting.posterAlt}
                className="ml-auto h-auto w-full object-contain object-right lg:ml-0"
                loading="lazy"
                decoding="async"
              />
            </figure>
          </div>

          <div className="mb-8 grid gap-4 md:grid-cols-2">
            {realWorldTesting.features.map((feature) => (
              <article
                key={feature.title}
                className="rounded-3xl bg-[#141418] px-6 py-6 ring-1 ring-white/[0.06] md:px-8 md:py-7"
              >
                <h3 className="font-display text-lg uppercase tracking-wide text-ink md:text-xl">
                  {feature.title}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-slate">{feature.body}</p>
              </article>
            ))}
          </div>

          <ul className="mb-10 space-y-3 text-base leading-relaxed text-slate">
            {realWorldTesting.bullets.map((item) => (
              <li key={item} className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className="mb-10 mt-12 md:mt-16">
            <h3 className="font-display text-lg uppercase tracking-wide text-ink md:text-xl">
              {realWorldTesting.fieldGalleryTitle}
            </h3>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-slate md:text-[17px]">
              {realWorldTesting.fieldGalleryIntro}
            </p>
            <FieldPhotoGallery photos={realWorldTesting.fieldWorkPhotos} className="mt-6" />
          </div>

          <blockquote className="case-study-quote rounded-3xl border border-accent/25 bg-elevated/60 px-8 py-8 md:px-10 md:py-10">
            <p className="font-display text-xl italic leading-relaxed text-ink md:text-2xl">
              &ldquo;{realWorldTesting.quote.text}&rdquo;
            </p>
            <footer className="mt-6 text-sm text-slate">
              <cite className="not-italic font-semibold text-ink">
                {realWorldTesting.quote.attribution}
              </cite>
              <span className="block mt-1">{realWorldTesting.quote.role}</span>
            </footer>
          </blockquote>
        </SectionBlock>

        <SectionBlock label="Key features" title="What we built">
          <p className="mb-8 w-full max-w-none text-left text-base leading-relaxed text-slate md:text-lg">
            {competitionKingSections.featuresIntro}
          </p>
          <FeatureShowcase
            sidebarTitle={competitionKingSections.featuresSidebarTitle}
            features={competitionKingSections.features}
          />
        </SectionBlock>

        <SectionBlock label="Reflection" title="Conclusion">
          <CaseStudyConclusion content={competitionKingSections.conclusion} />

          <div className="mt-10 border-t border-white/[0.06] pt-10 md:mt-12 md:pt-12">
            <h3 className="font-display text-xl uppercase tracking-wide text-ink md:text-2xl">
              Lessons learned
            </h3>
            <div className="mt-6 grid gap-6 md:grid-cols-3 md:mt-8">
              {competitionKingSections.lessonsLearned.map((item) => (
                <article
                  key={item.title}
                  className="rounded-3xl bg-elevated/80 p-8 ring-1 ring-accent/35"
                >
                  <h4 className="text-lg font-semibold text-ink">{item.title}</h4>
                  <p className="mt-4 text-sm leading-relaxed text-slate">{item.body}</p>
                </article>
              ))}
            </div>
          </div>
        </SectionBlock>

        <SectionBlock label="Explore more" title="More projects">
          <CaseStudyMoreProjects excludeProjectId="competition-king" />
        </SectionBlock>
      </div>
    </CaseStudyShell>
  )
}
