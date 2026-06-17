import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { BriefPivotReveal } from '../components/case-study/BriefPivotReveal'
import { CaseStudyDemoVideo } from '../components/case-study/CaseStudyDemoVideo'
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
import { SectionBlock } from '../components/case-study/SectionBlock'
import { SageIntegrationHub } from '../components/case-study/SageIntegrationHub'
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

            <CaseStudyImpactSummary metrics={uwOrisCaseStudyMeta.impactMetrics} />
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
          <p className="w-full max-w-none text-left text-base leading-relaxed text-slate whitespace-pre-line md:text-lg">
            {uwOrisSections.hook.body}
          </p>
        </SectionBlock>

        <SectionBlock label={uwOrisSections.challenge.label}>
          <p className="mb-8 w-full max-w-none text-left text-base leading-relaxed text-slate md:text-lg">
            {uwOrisSections.challenge.body}
          </p>
          <blockquote className="case-study-quote mb-8 rounded-3xl border border-accent/25 bg-elevated/60 px-8 py-8 md:px-10 md:py-10">
            <h2 className="mb-5 font-display text-2xl leading-tight text-ink md:text-3xl">
              Problem statement
            </h2>
            <p className="font-display text-xl leading-relaxed text-ink md:text-2xl">
              &ldquo;{uwOrisSections.challenge.problemStatement}&rdquo;
            </p>
          </blockquote>
          <div className="rounded-3xl bg-[#141418] px-7 py-8 ring-1 ring-white/[0.06] md:px-10 md:py-10">
            <h3 className="font-display text-lg uppercase tracking-wide text-ink md:text-xl">
              Research questions
            </h3>
            <ul className="mt-5 space-y-4 text-base leading-relaxed text-slate md:text-[17px]">
              {uwOrisSections.researchQuestions.map((question) => (
                <li key={question} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                  <span>{question}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-8 rounded-3xl bg-[#141418] px-7 py-8 ring-1 ring-white/[0.06] md:px-10 md:py-10">
            <h3 className="font-display text-lg uppercase tracking-wide text-ink md:text-xl">
              {uwOrisSections.whosThisFor.title}
            </h3>
            <div className="mt-6 grid gap-6 md:grid-cols-3 md:gap-8">
              {uwOrisSections.whosThisFor.audiences.map((audience) => (
                <div key={audience.label}>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                    {audience.label}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-slate md:text-[15px]">
                    {audience.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
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
                </figure>
                <a
                  href={uwOrisSections.solution.demoVideo.openUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex w-full items-center justify-between gap-4 rounded-3xl bg-accent px-6 py-5 text-left shadow-glow ring-2 ring-accent/80 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:bg-accent/90 hover:shadow-[0_0_40px_rgba(153,112,255,0.45)] hover:ring-white/25 active:translate-y-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  <span className="min-w-0">
                    <span className="block font-semibold text-white">
                      {uwOrisSections.solution.demoVideo.title}
                    </span>
                    <span className="mt-1 block text-sm text-white/80 transition-colors group-hover:text-white/95">
                      {uwOrisSections.solution.demoVideo.caption}
                    </span>
                  </span>
                  <span className="shrink-0 text-sm font-semibold text-white transition-transform duration-300 group-hover:translate-x-1">
                    Open prototype →
                  </span>
                </a>
                <SageIntegrationHub
                  className="mt-4"
                  data={uwOrisSections.sageIntegration}
                />
              </>
            }
          />
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
          <div className="mb-10 flex flex-wrap justify-center gap-4 md:gap-6">
            {uwOrisSections.findings.map((stat) => (
              <div
                key={stat.label}
                className="w-full max-w-[300px] flex-[1_1_240px] rounded-2xl bg-elevated px-5 py-6 text-center ring-1 ring-accent/30 md:px-6 md:py-8"
              >
                <p className="font-condensed text-4xl uppercase tracking-wide text-accent md:text-5xl">
                  {stat.value}
                </p>
                <p className="mt-2 text-sm leading-snug text-slate">{stat.label}</p>
              </div>
            ))}
          </div>
          <SmartBudgetingFlowReveal
            className="mb-10"
            data={uwOrisSections.userFlow}
          />
          <p className="mb-6 w-full max-w-none text-base leading-relaxed text-slate md:text-lg">
            {uwOrisSections.featuresIntro}
          </p>
          <FeatureShowcase
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

        <SectionBlock label="Deliverables" title="Full capstone report">
          <VideoPrototypeCard
            className="mb-8"
            embedSrc={uwOrisSections.videoPrototype.embedSrc}
            title={uwOrisSections.videoPrototype.title}
            footerLabel={uwOrisSections.videoPrototype.footerLabel}
          />
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
