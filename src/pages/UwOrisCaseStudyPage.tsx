import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { BriefPivotReveal } from '../components/case-study/BriefPivotReveal'
import { BeforeAfterProcessReveal } from '../components/case-study/BeforeAfterProcessReveal'
import { CaseStudyDemoVideo } from '../components/case-study/CaseStudyDemoVideo'
import { CaseStudyPrototypeCaption } from '../components/case-study/CaseStudyPrototypeCaption'
import { CaseStudyConclusion } from '../components/case-study/CaseStudyConclusion'
import { VideoPrototypeCard } from '../components/case-study/VideoPrototypeCard'
import { CaseStudyMoreProjects } from '../components/case-study/CaseStudyMoreProjects'
import { CaseStudyImpactSummary } from '../components/case-study/CaseStudyImpactSummary'
import { CaseStudyLogo } from '../components/case-study/CaseStudyLogo'
import { CaseStudyMetaGrid } from '../components/case-study/CaseStudyMetaGrid'
import { CaseStudyShell } from '../components/case-study/CaseStudyShell'
import { DesignProcessSteps } from '../components/case-study/DesignProcessSteps'
import { FeatureShowcase } from '../components/case-study/FeatureShowcase'
import { FieldPhotoGallery } from '../components/case-study/FieldPhotoGallery'
import { FindingsStatsGrid } from '../components/case-study/FindingsStatsGrid'
import { ImageCompareSlider } from '../components/case-study/ImageCompareSlider'
import { SectionBlock } from '../components/case-study/SectionBlock'
import { ProblemStatementQuote } from '../components/case-study/ProblemStatementQuote'
import { ResearchQuestionsPanel } from '../components/case-study/ResearchQuestionsPanel'
import { SageIntegrationHub } from '../components/case-study/SageIntegrationHub'
import { UwOrisHookSection } from '../components/case-study/UwOrisHookSection'
import { WhosThisForPanel } from '../components/case-study/WhosThisForPanel'
import { SmartBudgetingFlowReveal } from '../components/case-study/SmartBudgetingFlowReveal'
import { SplitHeroCards } from '../components/case-study/SplitHeroCards'
import {
  uwOrisCaseStudyMeta,
  uwOrisSections,
} from '../data/uwOrisCaseStudy'
import { roleBadgeClassName } from '../lib/projectRole'

export function UwOrisCaseStudyPage() {
  useEffect(() => {
    document.title = 'UW ORIS — Case Study · Oey Chang'
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
            <span className={roleBadgeClassName(uwOrisCaseStudyMeta.role, 'mb-6')}>
              {uwOrisCaseStudyMeta.role}
            </span>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-accent">
              {uwOrisCaseStudyMeta.projectLabel}
            </p>
            <h1 className="sr-only">{uwOrisCaseStudyMeta.title}</h1>
            <CaseStudyLogo
              src={uwOrisCaseStudyMeta.logo}
              alt={uwOrisCaseStudyMeta.logoAlt}
              width={uwOrisCaseStudyMeta.logoWidth}
              height={uwOrisCaseStudyMeta.logoHeight}
            />
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate md:text-xl">
              {uwOrisCaseStudyMeta.tagline}
            </p>

            <CaseStudyImpactSummary
              metrics={uwOrisCaseStudyMeta.impactMetrics}
              appearDelay={1}
            />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="relative z-10 mx-auto mt-12 max-w-6xl px-6"
        >
          <div className="overflow-hidden rounded-[2rem] bg-[#f4f4f6] ring-1 ring-white/10 shadow-soft">
            <img
              src={uwOrisCaseStudyMeta.heroImage}
              alt={uwOrisCaseStudyMeta.heroImageAlt}
              className="block h-auto w-full object-contain object-center"
            />
          </div>
          <CaseStudyMetaGrid className="mt-10" details={uwOrisCaseStudyMeta.details} />
        </motion.div>
      </section>

      <div className="space-y-20 pb-20 pt-10 md:space-y-28 md:pb-28 md:pt-14">
        <SectionBlock label={uwOrisSections.hook.label}>
          <UwOrisHookSection data={uwOrisSections.hook} />
        </SectionBlock>

        <SectionBlock label={uwOrisSections.challenge.label}>
          <p className="mb-8 w-full max-w-none text-left text-base leading-relaxed text-slate md:text-lg">
            {uwOrisSections.challenge.body}
          </p>
          <ProblemStatementQuote>
            <h2 className="mb-5 font-display text-2xl leading-tight text-ink md:text-3xl">
              Problem statement
            </h2>
            <p className="font-display text-xl leading-relaxed text-ink md:text-2xl">
              &ldquo;{uwOrisSections.challenge.problemStatement}&rdquo;
            </p>
          </ProblemStatementQuote>
          <ResearchQuestionsPanel questions={uwOrisSections.researchQuestions} />
          <WhosThisForPanel
            title={uwOrisSections.whosThisFor.title}
            audiences={uwOrisSections.whosThisFor.audiences}
          />
        </SectionBlock>

        <SectionBlock>
          <SplitHeroCards
            label={uwOrisSections.solution.label}
            headline={uwOrisSections.solution.subtitle}
            body={uwOrisSections.solution.body}
            pillars={uwOrisSections.solution.pillars}
            middleSlot={
              <>
                <figure className="overflow-hidden rounded-3xl bg-elevated ring-1 ring-white/10">
                  <CaseStudyDemoVideo
                    src={uwOrisSections.solution.demoVideo.src}
                    title={uwOrisSections.solution.demoVideo.title}
                  />
                  <CaseStudyPrototypeCaption
                    title={uwOrisSections.solution.demoVideo.title}
                    caption={uwOrisSections.solution.demoVideo.caption}
                    openUrl={uwOrisSections.solution.demoVideo.openUrl}
                    ctaLabel={uwOrisSections.solution.demoVideo.ctaLabel}
                  />
                </figure>
                <SageIntegrationHub
                  className="mt-4"
                  data={uwOrisSections.sageIntegration}
                />
              </>
            }
          />
        </SectionBlock>

        <SectionBlock>
          <BeforeAfterProcessReveal data={uwOrisSections.finalDesign.processComparison} />
        </SectionBlock>

        <SectionBlock>
          <div className="mb-8 md:mb-10">
            <h2 className="section-title mb-0">{uwOrisSections.process.title}</h2>
            <p className="mt-4 font-display text-xl uppercase tracking-wide text-ink md:text-2xl">
              {uwOrisSections.process.introLabel}
            </p>
            <p className="mt-5 w-full max-w-none text-base leading-relaxed text-slate md:text-lg">
              {uwOrisSections.process.intro}
            </p>
          </div>
          <DesignProcessSteps steps={uwOrisSections.process.steps} />
        </SectionBlock>

        <SectionBlock title="The Pivot">
          <BriefPivotReveal data={uwOrisSections.pivot} />
        </SectionBlock>

        <SectionBlock label="Findings" title="What research surfaced">
          <p className="mb-8 w-full max-w-none text-left text-base leading-relaxed text-slate md:text-lg">
            {uwOrisSections.findingsIntro}
          </p>
          <FindingsStatsGrid stats={uwOrisSections.findings} />
          <SmartBudgetingFlowReveal
            className="mb-10"
            data={uwOrisSections.userFlow}
          />
          <p className="section-label mb-4">{uwOrisSections.solutionFeaturesLabel}</p>
          <h2 className="mb-6 font-display text-3xl leading-tight text-ink md:text-4xl">
            {uwOrisSections.solutionFeaturesTitle}
          </h2>
          <ImageCompareSlider
            className="mb-8"
            beforeSrc={uwOrisSections.worksheetCompare.beforeSrc}
            afterSrc={uwOrisSections.worksheetCompare.afterSrc}
            beforeAlt={uwOrisSections.worksheetCompare.beforeAlt}
            afterAlt={uwOrisSections.worksheetCompare.afterAlt}
            beforeLabel={uwOrisSections.worksheetCompare.beforeLabel}
            afterLabel={uwOrisSections.worksheetCompare.afterLabel}
          />
          <FeatureShowcase
            title={uwOrisSections.featuresTitle}
            sidebarTitle={uwOrisSections.featuresSidebarTitle}
            features={uwOrisSections.features}
          />
        </SectionBlock>

        <SectionBlock title={uwOrisSections.process.researchGallery.title}>
          <p className="max-w-2xl text-base leading-relaxed text-slate md:text-[17px]">
            {uwOrisSections.process.researchGallery.intro}
          </p>
          <FieldPhotoGallery
            photos={uwOrisSections.process.researchGallery.photos}
            className="mt-6"
          />
        </SectionBlock>

        <SectionBlock label="Deliverables" title="Video Prototype">
          <VideoPrototypeCard
            className="mb-8"
            embedSrc={uwOrisSections.videoPrototype.embedSrc}
            title={uwOrisSections.videoPrototype.title}
          />
          <h3 className="mb-4 font-display text-lg uppercase tracking-wide text-ink md:text-xl">
            {uwOrisSections.reportLinks.label}
          </h3>
          <ul className="space-y-3">
            {uwOrisSections.reportLinks.items.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-base font-medium text-accent hover:underline md:text-lg"
                >
                  {link.label}
                  <span aria-hidden>↗</span>
                </a>
              </li>
            ))}
          </ul>
        </SectionBlock>

        <SectionBlock>
          <blockquote className="case-study-quote rounded-3xl border border-accent/25 bg-elevated/60 px-8 py-8 md:px-10 md:py-10">
            <p className="font-display text-xl leading-relaxed text-ink md:text-2xl">
              &ldquo;{uwOrisSections.testimonial.quote}&rdquo;
            </p>
            <footer className="mt-6 text-sm text-slate md:text-base">
              <cite className="not-italic font-semibold text-ink">
                {uwOrisSections.testimonial.name}
              </cite>
              <span className="mt-1 block">{uwOrisSections.testimonial.title}</span>
            </footer>
          </blockquote>
        </SectionBlock>

        <SectionBlock label="Reflection" title="Conclusion">
          <CaseStudyConclusion content={uwOrisSections.conclusion} />

          <div className="mt-10 border-t border-white/[0.06] pt-10 md:mt-12 md:pt-12">
            <h3 className="font-display text-xl uppercase tracking-wide text-ink md:text-2xl">
              Lessons learned
            </h3>
            <div className="mt-6 grid gap-6 md:grid-cols-3 md:mt-8">
              {uwOrisSections.lessonsLearned.map((item) => (
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
          <CaseStudyMoreProjects excludeProjectId="uw-oris" />
        </SectionBlock>
      </div>
    </CaseStudyShell>
  )
}
