import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { CaseStudyImpactSummary } from '../components/case-study/CaseStudyImpactSummary'
import { CaseStudyMetaGrid } from '../components/case-study/CaseStudyMetaGrid'
import { CaseStudyConclusion } from '../components/case-study/CaseStudyConclusion'
import { CaseStudyMoreProjects } from '../components/case-study/CaseStudyMoreProjects'
import { CaseStudyLogo } from '../components/case-study/CaseStudyLogo'
import { CaseStudyShell } from '../components/case-study/CaseStudyShell'
import { AlternatingDesignTimeline } from '../components/case-study/AlternatingDesignTimeline'
import { CoplanJourneyMapReveal } from '../components/case-study/CoplanJourneyMapReveal'
import { CoplanTasksDataReveal } from '../components/case-study/CoplanTasksDataReveal'
import { CoplanUserFlowReveal } from '../components/case-study/CoplanUserFlowReveal'
import { PrototypingIntro } from '../components/case-study/PrototypingIntro'
import { DesignProcessSteps } from '../components/case-study/DesignProcessSteps'
import { ZoomableImage } from '../components/case-study/ZoomableImage'
import { FeatureShowcase } from '../components/case-study/FeatureShowcase'
import { SectionBlock } from '../components/case-study/SectionBlock'
import { SplitHeroCards } from '../components/case-study/SplitHeroCards'
import { CaseStudyDemoVideo } from '../components/case-study/CaseStudyDemoVideo'
import { CaseStudyPrototypeCaption } from '../components/case-study/CaseStudyPrototypeCaption'
import {
  coplanCaseStudyMeta,
  coplanSections,
  coplanTestingTasks,
  coplanUserFlow,
  coplanUserJourney,
} from '../data/coplanCaseStudy'
import { roleBadgeClassName } from '../lib/projectRole'

export function CoplanCaseStudyPage() {
  useEffect(() => {
    document.title = 'Co-plan — Case Study · Oey Chang'
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
            <span className={roleBadgeClassName(coplanCaseStudyMeta.role, 'mb-6')}>
              {coplanCaseStudyMeta.role}
            </span>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-accent">
              {coplanCaseStudyMeta.projectLabel}
            </p>
            <h1 className="sr-only">{coplanCaseStudyMeta.title}</h1>
            <CaseStudyLogo
              src={coplanCaseStudyMeta.logo}
              alt={coplanCaseStudyMeta.logoAlt}
              width={coplanCaseStudyMeta.logoWidth}
              height={coplanCaseStudyMeta.logoHeight}
            />
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate md:text-xl">
              {coplanCaseStudyMeta.tagline}
            </p>

            <CaseStudyImpactSummary summary={coplanCaseStudyMeta.impactSummary} />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="relative z-10 mx-auto mt-12 max-w-6xl px-6"
        >
          <div className="overflow-hidden rounded-[2rem] bg-white ring-1 ring-white/10 shadow-soft">
            <img
              src={coplanCaseStudyMeta.heroImage}
              alt={coplanCaseStudyMeta.heroImageAlt}
              className="block h-auto w-full object-contain object-center"
            />
          </div>
          <CaseStudyMetaGrid className="mt-10" details={coplanCaseStudyMeta.details} />
        </motion.div>
      </section>

      <div className="space-y-20 pb-20 pt-10 md:space-y-28 md:pb-28 md:pt-14">
        <SectionBlock label={coplanSections.hook.label}>
          <p className="w-full max-w-none text-left text-base leading-relaxed text-slate whitespace-pre-line md:text-lg">
            {coplanSections.hook.body}
          </p>
        </SectionBlock>

        <SectionBlock label={coplanSections.challenge.label}>
          <p className="mb-8 w-full max-w-none text-left text-base leading-relaxed text-slate md:text-lg">
            {coplanSections.challenge.body}
          </p>
          <blockquote className="case-study-quote mb-8 rounded-3xl border border-accent/25 bg-elevated/60 px-8 py-8 md:px-10 md:py-10">
            <h2 className="mb-5 font-display text-2xl leading-tight text-ink md:text-3xl">
              Problem statement
            </h2>
            <p className="font-display text-xl leading-relaxed text-ink md:text-2xl">
              &ldquo;{coplanSections.challenge.problemStatement}&rdquo;
            </p>
          </blockquote>
          <div className="rounded-3xl bg-[#141418] px-7 py-8 ring-1 ring-white/[0.06] md:px-10 md:py-10">
            <h3 className="font-display text-lg uppercase tracking-wide text-ink md:text-xl">
              Research questions
            </h3>
            <ul className="mt-5 space-y-4 text-base leading-relaxed text-slate md:text-[17px]">
              {coplanSections.researchQuestions.map((question) => (
                <li key={question} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                  <span>{question}</span>
                </li>
              ))}
            </ul>
          </div>
        </SectionBlock>

        <SectionBlock>
          <SplitHeroCards
            label={coplanSections.solution.label}
            headline={coplanSections.solution.subtitle}
            body={coplanSections.solution.body}
            pillars={coplanSections.solution.pillars}
          />
        </SectionBlock>

        <SectionBlock label={coplanSections.finalDesign.label} title="Final design">
          <p className="mb-8 w-full max-w-none text-left text-base leading-relaxed text-slate md:text-lg">
            {coplanSections.finalDesign.body}
          </p>
          <figure className="overflow-hidden rounded-3xl bg-elevated ring-1 ring-white/10">
            <CaseStudyDemoVideo
              src={coplanSections.finalDesign.demoVideo.src}
              title={coplanSections.finalDesign.demoVideo.title}
            />
            <CaseStudyPrototypeCaption
              title={coplanSections.finalDesign.demoVideo.title}
              caption={coplanSections.finalDesign.demoVideo.caption}
              openUrl={coplanSections.finalDesign.demoVideo.openUrl}
              ctaLabel={coplanSections.finalDesign.demoVideo.ctaLabel}
            />
          </figure>
        </SectionBlock>

        <SectionBlock>
          <div className="mb-8 md:mb-10">
            <h2 className="section-title mb-0">{coplanSections.process.title}</h2>
            <p className="mt-4 font-display text-xl uppercase tracking-wide text-ink md:text-2xl">
              {coplanSections.process.introLabel}
            </p>
            <p className="mt-5 w-full max-w-none text-base leading-relaxed text-slate md:text-lg">
              {coplanSections.process.intro}
            </p>
          </div>
          <DesignProcessSteps steps={coplanSections.process.steps} />

          <div className="mt-10 grid gap-6">
            {coplanSections.process.artifacts.map((artifact) => {
              const hasUserFlow = 'userFlow' in artifact && artifact.userFlow
              const hasUserJourney = 'userJourney' in artifact && artifact.userJourney
              const imageSrc =
                'image' in artifact && typeof artifact.image === 'string'
                  ? artifact.image
                  : null
              const imageAlt =
                'imageAlt' in artifact && typeof artifact.imageAlt === 'string'
                  ? artifact.imageAlt
                  : artifact.title

              return (
                <article
                  key={artifact.title}
                  className={
                    imageSrc || hasUserFlow || hasUserJourney
                      ? 'py-2 md:py-3'
                      : 'rounded-3xl border border-white/8 bg-surface/80 p-8 md:p-10'
                  }
                >
                  <h3 className="text-xl font-semibold text-ink">{artifact.title}</h3>
                  <p className="mt-4 w-full max-w-none whitespace-pre-line text-base leading-relaxed text-slate md:text-lg">
                    {artifact.body}
                  </p>
                  {hasUserFlow && <CoplanUserFlowReveal data={coplanUserFlow} />}
                  {hasUserJourney && <CoplanJourneyMapReveal data={coplanUserJourney} />}
                  {imageSrc && <ZoomableImage src={imageSrc} alt={imageAlt} />}
                </article>
              )
            })}
          </div>

          <h3 className="mt-12 text-xl font-semibold text-ink md:mt-16 md:text-2xl">
            Prototyping
          </h3>
          <PrototypingIntro
            className="mt-4"
            content={coplanSections.process.designTimelineIntro}
          />
          <AlternatingDesignTimeline
            className="mt-10 md:mt-12"
            steps={coplanSections.process.designTimeline}
          />
        </SectionBlock>

        <SectionBlock label="Research findings" title="What testing surfaced">
          <p className="mb-8 w-full max-w-none text-base leading-relaxed text-slate md:text-lg">
            {coplanSections.findingsIntro}
          </p>
          <CoplanTasksDataReveal data={coplanTestingTasks} />
          <div className="grid gap-4 sm:grid-cols-3">
            {coplanSections.findings.map((stat) => (
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

        <SectionBlock label="Key features" title="What we built">
          <p className="mb-8 w-full max-w-none text-left text-base leading-relaxed text-slate md:text-lg">
            {coplanSections.featuresIntro}
          </p>
          <FeatureShowcase
            sidebarTitle={coplanSections.featuresSidebarTitle}
            features={coplanSections.features}
          />
        </SectionBlock>

        <SectionBlock label="Reflection" title="Conclusion">
          <CaseStudyConclusion content={coplanSections.conclusion} />

          <div className="mt-10 border-t border-white/[0.06] pt-10 md:mt-12 md:pt-12">
            <h3 className="font-display text-xl uppercase tracking-wide text-ink md:text-2xl">
              Lessons learned
            </h3>
            <div className="mt-6 grid gap-6 md:grid-cols-3 md:mt-8">
              {coplanSections.lessonsLearned.map((item) => (
                <article
                  key={item.title}
                  className="rounded-3xl bg-elevated p-8 ring-1 ring-accent/30"
                >
                  <h4 className="text-lg font-semibold text-ink">{item.title}</h4>
                  <p className="mt-4 text-sm leading-relaxed text-slate">{item.body}</p>
                </article>
              ))}
            </div>
          </div>
        </SectionBlock>

        <SectionBlock label="Explore more" title="More projects">
          <CaseStudyMoreProjects excludeProjectId="coplan" />
        </SectionBlock>
      </div>
    </CaseStudyShell>
  )
}
