import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { CaseStudyImpactSummary } from '../components/case-study/CaseStudyImpactSummary'
import { CaseStudyMetaGrid } from '../components/case-study/CaseStudyMetaGrid'
import { CaseStudyMoreProjects } from '../components/case-study/CaseStudyMoreProjects'
import { CaseStudyConclusion } from '../components/case-study/CaseStudyConclusion'
import { CaseStudyShell } from '../components/case-study/CaseStudyShell'
import { AgileRoadmapReveal } from '../components/case-study/AgileRoadmapReveal'
import { AlternatingDesignTimeline } from '../components/case-study/AlternatingDesignTimeline'
import { DesignProcessSteps } from '../components/case-study/DesignProcessSteps'
import { SushiTalkProcessArtifactReveal } from '../components/case-study/SushiTalkProcessArtifactReveal'
import { CaseStudyDemoVideo } from '../components/case-study/CaseStudyDemoVideo'
import { CaseStudyPrototypeCaption } from '../components/case-study/CaseStudyPrototypeCaption'
import { FeatureShowcase } from '../components/case-study/FeatureShowcase'
import { FigmaToClaudeFlow } from '../components/case-study/FigmaToClaudeFlow'
import { ProblemStatementQuote } from '../components/case-study/ProblemStatementQuote'
import { ResearchQuestionsPanel } from '../components/case-study/ResearchQuestionsPanel'
import { SectionBlock } from '../components/case-study/SectionBlock'
import { SushiTalkSolutionSection } from '../components/case-study/SushiTalkSolutionSection'
import { SushiTalkChallengeIntro } from '../components/case-study/SushiTalkChallengeIntro'
import { SushiTalkHookSection } from '../components/case-study/SushiTalkHookSection'
import {
  sushitalkCaseStudyMeta,
  sushitalkSections,
} from '../data/sushitalkCaseStudy'
import { roleBadgeClassName } from '../lib/projectRole'

export function SushiTalkCaseStudyPage() {
  useEffect(() => {
    document.title = 'SushiTalk — Case Study · Oey Chang'
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
            <span className={roleBadgeClassName(sushitalkCaseStudyMeta.role, 'mb-6')}>
              {sushitalkCaseStudyMeta.role}
            </span>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-accent">
              {sushitalkCaseStudyMeta.projectLabel}
            </p>
            <h1 className="sr-only">{sushitalkCaseStudyMeta.title}</h1>
            <img
              src={sushitalkCaseStudyMeta.logo}
              alt={sushitalkCaseStudyMeta.logoAlt}
              width={sushitalkCaseStudyMeta.logoWidth}
              height={sushitalkCaseStudyMeta.logoHeight}
              className="h-[clamp(2.25rem,7vw,3.5rem)] w-auto max-w-full object-contain object-left"
              decoding="sync"
              fetchPriority="high"
              draggable={false}
            />
            <p className="mt-6 w-full max-w-none text-lg leading-relaxed text-slate md:text-xl">
              {sushitalkCaseStudyMeta.tagline}
            </p>

            <CaseStudyImpactSummary summary={sushitalkCaseStudyMeta.impactSummary} />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="relative z-10 mx-auto mt-12 max-w-6xl px-6"
        >
          <div className="overflow-hidden rounded-[2rem] bg-[#f5f0e8] ring-1 ring-white/10 shadow-soft">
            <img
              src={sushitalkCaseStudyMeta.heroImage}
              alt={sushitalkCaseStudyMeta.heroImageAlt}
              className="block h-auto w-full object-contain object-center p-6 md:p-10"
            />
          </div>
          <CaseStudyMetaGrid className="mt-10" details={sushitalkCaseStudyMeta.details} />
        </motion.div>
      </section>

      <div className="space-y-20 pb-20 pt-10 md:space-y-28 md:pb-28 md:pt-14">
        <SectionBlock label={sushitalkSections.hook.label}>
          <SushiTalkHookSection data={sushitalkSections.hook} />
        </SectionBlock>

        <SectionBlock label={sushitalkSections.challenge.label}>
          <SushiTalkChallengeIntro data={sushitalkSections.challenge} />
          <ProblemStatementQuote className="mt-8">
            <h2 className="mb-5 font-display text-2xl leading-tight text-ink md:text-3xl">
              Problem statement
            </h2>
            <p className="font-display text-xl leading-relaxed text-ink md:text-2xl">
              &ldquo;{sushitalkSections.challenge.problemStatement}&rdquo;
            </p>
          </ProblemStatementQuote>
          <ResearchQuestionsPanel questions={sushitalkSections.researchQuestions} />
          <ResearchQuestionsPanel
            questions={sushitalkSections.goals}
            title="Goals"
            compact
            elevated
            className="mt-8"
          />
        </SectionBlock>

        <SectionBlock>
          <SushiTalkSolutionSection data={sushitalkSections.solution} />
        </SectionBlock>

        <SectionBlock
          id="sushitalk-final-design"
          label={sushitalkSections.finalDesign.label}
          title="Final design"
        >
          <p className="mb-8 w-full max-w-none text-left text-base leading-relaxed text-slate md:text-lg">
            {sushitalkSections.finalDesign.body}
          </p>
          <figure className="overflow-hidden rounded-3xl bg-[#0d0d0d] ring-1 ring-white/10">
            <CaseStudyDemoVideo
              src={sushitalkSections.finalDesign.demoVideo.src}
              title={sushitalkSections.finalDesign.demoVideo.title}
            />
            <CaseStudyPrototypeCaption
              title={sushitalkSections.finalDesign.demoVideo.title}
              caption={sushitalkSections.finalDesign.demoVideo.caption}
              openUrl={sushitalkSections.finalDesign.demoVideo.openUrl}
              ctaLabel={sushitalkSections.finalDesign.demoVideo.ctaLabel}
            />
          </figure>
        </SectionBlock>

        <SectionBlock>
          <div className="mb-8 md:mb-10">
            <h2 className="section-title mb-0">{sushitalkSections.process.title}</h2>
            <p className="mt-4 font-display text-xl uppercase tracking-wide text-ink md:text-2xl">
              {sushitalkSections.process.introLabel}
            </p>
            <p className="mt-5 w-full max-w-none text-base leading-relaxed text-slate md:text-lg">
              {sushitalkSections.process.intro}
            </p>
          </div>
          <AgileRoadmapReveal data={sushitalkSections.process.roadmap} />
          <DesignProcessSteps
            steps={sushitalkSections.process.steps}
            renderBelowTrack={(ctx) => <SushiTalkProcessArtifactReveal {...ctx} />}
          />
          <AlternatingDesignTimeline
            className="mt-12 md:mt-16"
            steps={sushitalkSections.process.designPhases}
          />
        </SectionBlock>

        <SectionBlock label="Key features" title="What we built">
          <p className="mb-8 w-full max-w-none text-left text-base leading-relaxed text-slate md:text-lg">
            {sushitalkSections.featuresIntro}
          </p>
          <FeatureShowcase
            sidebarTitle={sushitalkSections.featuresSidebarTitle}
            features={sushitalkSections.features}
          />

          <blockquote className="case-study-quote mt-20 rounded-3xl border border-accent/25 bg-elevated/60 px-8 py-8 md:mt-28 md:px-10 md:py-10">
            <p className="font-display text-xl leading-relaxed text-ink md:text-2xl">
              &ldquo;{sushitalkSections.testimonial.quote}&rdquo;
            </p>
            <footer className="mt-6 text-sm text-slate md:text-base">
              <cite className="not-italic font-semibold text-ink">
                {sushitalkSections.testimonial.name}
              </cite>
              <span className="mt-1 block">{sushitalkSections.testimonial.title}</span>
            </footer>
          </blockquote>

          <div className="mb-8 mt-20 border-t border-white/[0.06] pt-20 md:mb-10 md:mt-28 md:pt-28">
            <h2 className="section-title mb-0">{sushitalkSections.phaseTwo.title}</h2>
            <p className="mt-4 font-display text-xl uppercase tracking-wide text-ink md:text-2xl">
              {sushitalkSections.phaseTwo.introLabel}
            </p>
            <p className="mt-5 w-full max-w-none text-base leading-relaxed text-slate md:text-lg">
              {sushitalkSections.phaseTwo.intro}
            </p>
            <FigmaToClaudeFlow
              caption={sushitalkSections.phaseTwo.flowCaption}
              cta={sushitalkSections.phaseTwo.flowCta}
            />
          </div>
        </SectionBlock>

        <SectionBlock>
          <p className="rounded-2xl border border-accent/20 bg-accent/10 px-5 py-4 text-sm font-medium text-ink md:text-base">
            {sushitalkSections.finalDesign.ongoingNote}
          </p>
        </SectionBlock>

        <SectionBlock label="Reflection" title="Conclusion">
          <CaseStudyConclusion content={sushitalkSections.conclusion} />

          <div className="mt-10 border-t border-white/[0.06] pt-10 md:mt-12 md:pt-12">
            <h3 className="font-display text-xl uppercase tracking-wide text-ink md:text-2xl">
              Lessons learned
            </h3>
            <div className="mt-6 grid gap-6 md:grid-cols-2 md:mt-8 lg:grid-cols-4">
              {sushitalkSections.lessonsLearned.map((item) => (
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
          <CaseStudyMoreProjects excludeProjectId="sushitalk" />
        </SectionBlock>
      </div>
    </CaseStudyShell>
  )
}
