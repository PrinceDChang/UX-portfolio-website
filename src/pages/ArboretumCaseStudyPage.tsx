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
import { FigmaPrototypeEmbed } from '../components/case-study/FigmaPrototypeEmbed'
import { ImageCarousel } from '../components/case-study/ImageCarousel'
import { SectionBlock } from '../components/case-study/SectionBlock'
import { SplitHeroCards } from '../components/case-study/SplitHeroCards'
import {
  arboretumCaseStudyMeta,
  arboretumSections,
} from '../data/arboretumCaseStudy'
import { roleBadgeClassName } from '../lib/projectRole'

export function ArboretumCaseStudyPage() {
  useEffect(() => {
    document.title = 'Washington Park Arboretum — Case Study · Oey Chang'
    return () => {
      document.title = 'Oey Chang — UX Designer'
    }
  }, [])

  const { process } = arboretumSections

  return (
    <CaseStudyShell>
      <section className="relative overflow-hidden pb-8 md:pb-12">
        <div className="relative z-10 mx-auto max-w-6xl px-6 pt-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className={roleBadgeClassName(arboretumCaseStudyMeta.role, 'mb-6')}>
              {arboretumCaseStudyMeta.role}
            </span>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-accent">
              {arboretumCaseStudyMeta.projectLabel}
            </p>
            <h1 className="font-condensed text-5xl uppercase leading-none tracking-wide text-ink md:text-6xl">
              {arboretumCaseStudyMeta.title}
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate md:text-xl">
              {arboretumCaseStudyMeta.tagline}
            </p>

            <CaseStudyImpactSummary metrics={arboretumCaseStudyMeta.impactMetrics} />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="relative z-10 mx-auto mt-12 max-w-6xl px-6"
        >
          <div className="overflow-hidden rounded-[2rem] bg-[#0a0a0c] ring-1 ring-white/10 shadow-soft">
            <img
              src={arboretumCaseStudyMeta.heroImage}
              alt={arboretumCaseStudyMeta.heroImageAlt}
              className="block h-auto w-full object-cover object-center"
            />
          </div>
          <CaseStudyMetaGrid className="mt-10" details={arboretumCaseStudyMeta.details} />
        </motion.div>
      </section>

      <div className="space-y-20 pb-20 pt-10 md:space-y-28 md:pb-28 md:pt-14">
        <SectionBlock label={arboretumSections.problem.label}>
          <p className="w-full max-w-none text-left text-base leading-relaxed text-slate md:text-lg">
            {arboretumSections.problem.body}
          </p>
        </SectionBlock>

        <SectionBlock label={arboretumSections.researchQuestion.label}>
          <blockquote className="case-study-quote rounded-3xl border border-accent/25 bg-elevated/60 px-8 py-8 md:px-10 md:py-10">
            <p className="font-display text-xl leading-relaxed text-ink md:text-2xl">
              &ldquo;{arboretumSections.researchQuestion.statement}&rdquo;
            </p>
          </blockquote>
        </SectionBlock>

        <SectionBlock>
          <SplitHeroCards
            label={arboretumSections.solution.label}
            headline={arboretumSections.solution.subtitle}
            body={arboretumSections.solution.body}
            pillars={arboretumSections.solution.pillars}
          />
        </SectionBlock>

        <SectionBlock
          label={arboretumSections.finalDesign.label}
          title="Final design"
          titleClassName="section-title mb-6"
        >
          <p className="mb-8 w-full max-w-none text-left text-base leading-relaxed text-slate md:text-lg">
            {arboretumSections.finalDesign.body}
          </p>
          <figure className="overflow-hidden rounded-3xl bg-elevated ring-1 ring-white/10">
            <FigmaPrototypeEmbed
              src={arboretumSections.finalDesign.prototype.embedUrl}
              title={arboretumSections.finalDesign.prototype.title}
              frameWidth={arboretumSections.finalDesign.prototype.frame.width}
              frameHeight={arboretumSections.finalDesign.prototype.frame.height}
              layout="fit"
            />
            <figcaption className="border-t border-white/8 px-6 py-5">
              <p className="font-semibold text-ink">
                {arboretumSections.finalDesign.prototype.title}
              </p>
              <p className="mt-1 text-sm text-slate">
                Parking, trip building, trail filters, and amenity locator — interactive Figma
                prototype
              </p>
              <a
                href={arboretumSections.finalDesign.prototype.openUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-block text-sm font-medium text-accent hover:underline"
              >
                Open prototype in new tab →
              </a>
            </figcaption>
          </figure>
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

          <div className="mt-12 grid gap-6 md:grid-cols-2 md:mt-16">
            <div className="rounded-3xl bg-elevated/80 p-8 ring-1 ring-white/8">
              <h3 className="font-display text-lg uppercase tracking-wide text-ink md:text-xl">
                Initial user groups
              </h3>
              <ul className="mt-4 space-y-2 text-base leading-relaxed text-slate">
                {process.initialUserGroups.map((group) => (
                  <li key={group} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                    <span>{group}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-3xl bg-elevated/80 p-8 ring-1 ring-white/8">
              <h3 className="font-display text-lg uppercase tracking-wide text-ink md:text-xl">
                Field study observations
              </h3>
              <ul className="mt-4 space-y-2 text-base leading-relaxed text-slate">
                {process.fieldStudyPainPoints.map((point) => (
                  <li key={point} className="flex gap-3">
                    <span className="text-accent" aria-hidden>
                      ✕
                    </span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-12 md:mt-16">
            <h3 className="font-display text-lg uppercase tracking-wide text-ink md:text-xl">
              Field study gallery
            </h3>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-slate md:text-[17px]">
              Photos from our walkthrough — signage, wayfinding, and how visitors move through
              the park.
            </p>
            <FieldPhotoGallery photos={process.fieldWorkPhotos} className="mt-6" />
          </div>

          <div className="mt-6 rounded-3xl border border-accent/20 bg-accent/5 px-7 py-8 md:px-10 md:py-10">
            <h3 className="font-display text-lg uppercase tracking-wide text-ink md:text-xl">
              Redefining scope
            </h3>
            <ul className="mt-4 space-y-2 text-base leading-relaxed text-slate">
              {process.scopeFocus.map((item) => (
                <li key={item} className="flex gap-3">
                  <span aria-hidden>🐾</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6 rounded-3xl bg-[#141418] px-7 py-8 ring-1 ring-white/[0.06] md:px-10 md:py-10">
            <h3 className="font-display text-lg uppercase tracking-wide text-ink md:text-xl">
              DesignJam activities
            </h3>
            <ul className="mt-4 space-y-3 text-base leading-relaxed text-slate">
              {process.sprintActivities.map((activity) => (
                <li key={activity} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                  <span>{activity}</span>
                </li>
              ))}
            </ul>
            <ImageCarousel
              slides={process.designJamPhotos}
              className="mt-8"
              frameClassName="flex aspect-[16/10] items-center justify-center"
              imageClassName="max-h-full max-w-full object-contain p-3 md:p-5"
            />
            <p className="mt-6 text-base leading-relaxed text-slate md:text-[17px]">
              <span className="font-semibold text-ink">Mentor insight: </span>
              {process.mentorInsight}
            </p>
          </div>

          <AlternatingDesignTimeline
            className="mt-7 md:mt-10"
            steps={process.designTimeline}
          />
        </SectionBlock>

        <SectionBlock
          label="Design features"
          title={arboretumSections.featuresSidebarTitle}
          titleClassName="section-title mb-6"
        >
          <p className="mb-8 w-full max-w-none text-left text-base leading-relaxed text-slate md:text-lg">
            {arboretumSections.featuresIntro}
          </p>
          <FeatureShowcase
            sidebarTitle={arboretumSections.featuresSidebarTitle}
            features={arboretumSections.features}
          />
        </SectionBlock>

        <SectionBlock label={arboretumSections.presentation.label} title="Stakeholder presentation">
          <p className="mb-4 w-full max-w-none text-left text-base leading-relaxed text-slate md:text-lg">
            {arboretumSections.presentation.body}
          </p>
          <p className="mb-8 text-sm font-medium uppercase tracking-[0.2em] text-slate">
            {arboretumSections.presentation.date}
          </p>
          <ImageCarousel
            slides={arboretumSections.presentation.photos}
            className="mb-8"
            frameClassName="flex aspect-[16/10] items-center justify-center"
            imageClassName="max-h-full max-w-full object-contain"
          />
          <a
            href={arboretumCaseStudyMeta.presentationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white shadow-glow transition hover:bg-accent/90"
          >
            View slide deck
            <span aria-hidden>→</span>
          </a>
        </SectionBlock>

        <SectionBlock label="Reflection" title="Conclusion">
          <CaseStudyConclusion content={arboretumSections.conclusion} />
        </SectionBlock>

        <SectionBlock label="Explore more" title="More projects">
          <CaseStudyMoreProjects excludeProjectId="arboretum" />
        </SectionBlock>
      </div>
    </CaseStudyShell>
  )
}
