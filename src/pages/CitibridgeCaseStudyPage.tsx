import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { CaseStudyMoreProjects } from '../components/case-study/CaseStudyMoreProjects'
import { CaseStudyConclusion } from '../components/case-study/CaseStudyConclusion'
import { CaseStudyShell } from '../components/case-study/CaseStudyShell'
import { DesignProcessSteps } from '../components/case-study/DesignProcessSteps'
import { FeatureShowcase } from '../components/case-study/FeatureShowcase'
import { FigmaPrototypeEmbed } from '../components/case-study/FigmaPrototypeEmbed'
import { InformationArchitectureScroll } from '../components/case-study/InformationArchitectureScroll'
import { SectionBlock } from '../components/case-study/SectionBlock'
import { citibridgeCaseStudyMeta, citibridgeSections } from '../data/citibridgeCaseStudy'
import { roleBadgeClassName } from '../lib/projectRole'

export function CitibridgeCaseStudyPage() {
  useEffect(() => {
    document.title = 'Citibridge — Case Study · Oey Chang'
    return () => {
      document.title = 'Oey Chang — UX Designer'
    }
  }, [])

  const { process } = citibridgeSections

  return (
    <CaseStudyShell>
      <section className="relative overflow-hidden pb-8 md:pb-12">
        <div className="relative z-10 mx-auto max-w-6xl px-6 pt-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className={roleBadgeClassName(citibridgeCaseStudyMeta.role, 'mb-6')}>
              {citibridgeCaseStudyMeta.role}
            </span>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-accent">
              {citibridgeCaseStudyMeta.projectLabel}
            </p>
            <h1 className="font-condensed text-5xl uppercase leading-none tracking-wide text-ink md:text-6xl">
              {citibridgeCaseStudyMeta.title}
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate md:text-xl">
              {citibridgeCaseStudyMeta.tagline}
            </p>

            <dl className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {citibridgeCaseStudyMeta.details.map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl bg-elevated/80 px-5 py-4 ring-1 ring-accent/30 backdrop-blur-sm"
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
          <div className="overflow-hidden rounded-[2rem] bg-[#eef1f0] ring-1 ring-white/10 shadow-soft">
            <img
              src={citibridgeCaseStudyMeta.heroImage}
              alt={citibridgeCaseStudyMeta.heroImageAlt}
              className="block h-auto w-full object-contain object-center"
            />
          </div>
        </motion.div>
      </section>

      <div className="space-y-20 pb-20 pt-10 md:space-y-28 md:pb-28 md:pt-14">
        <SectionBlock label={citibridgeSections.problem.label}>
          <p className="w-full max-w-none text-left text-base leading-relaxed text-slate md:text-lg">
            {citibridgeSections.problem.body}
          </p>
        </SectionBlock>

        <SectionBlock label={citibridgeSections.researchQuestion.label}>
          <blockquote className="case-study-quote rounded-3xl border border-accent/25 bg-elevated/60 px-8 py-8 md:px-10 md:py-10">
            <p className="font-display text-xl leading-relaxed text-ink md:text-2xl">
              &ldquo;{citibridgeSections.researchQuestion.statement}&rdquo;
            </p>
          </blockquote>
        </SectionBlock>

        <SectionBlock label={citibridgeSections.solution.label}>
          <ol className="grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
            {citibridgeSections.solution.items.map((item, index) => (
              <li
                key={item.slice(0, 48)}
                className="flex h-full flex-col gap-4 rounded-3xl border border-white/8 bg-surface/80 p-6 md:p-8"
              >
                <span className="font-display text-3xl text-accent/80 md:text-4xl">
                  {index + 1}
                </span>
                <p className="text-base leading-relaxed text-slate md:text-[15px] md:leading-relaxed">
                  {item}
                </p>
              </li>
            ))}
          </ol>
        </SectionBlock>

        <SectionBlock
          label={citibridgeSections.finalDesign.label}
          title="Final design"
          titleClassName="section-title mb-6"
        >
          <p className="mb-8 w-full max-w-none text-left text-base leading-relaxed text-slate md:text-lg">
            {citibridgeSections.finalDesign.body}
          </p>
          <figure className="overflow-hidden rounded-3xl bg-elevated ring-1 ring-white/10">
            <FigmaPrototypeEmbed
              src={citibridgeSections.finalDesign.prototype.embedUrl}
              title={citibridgeSections.finalDesign.prototype.title}
              frameWidth={citibridgeSections.finalDesign.prototype.frame.width}
              frameHeight={citibridgeSections.finalDesign.prototype.frame.height}
              layout="fit"
            />
            <figcaption className="border-t border-white/8 px-6 py-5">
              <p className="font-semibold text-ink">
                {citibridgeSections.finalDesign.prototype.title}
              </p>
              <p className="mt-1 text-sm text-slate">
                Map, reporting, notifications, and resolution flows — interactive Figma prototype
              </p>
              <a
                href={citibridgeSections.finalDesign.prototype.openUrl}
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

          <div className="mt-16 md:mt-20">
            <h3 className="section-label mb-6">Pain points</h3>
            <div className="grid gap-6 md:grid-cols-3">
              {process.painPoints.map((point, index) => (
                <article
                  key={point.title}
                  className="rounded-3xl bg-elevated/80 p-8 ring-1 ring-white/8"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                    {index + 1}
                  </p>
                  <h4 className="mt-3 text-lg font-semibold text-ink">{point.title}</h4>
                  <p className="mt-4 text-sm leading-relaxed text-slate md:text-base">
                    {point.body}
                  </p>
                </article>
              ))}
            </div>
          </div>

          <InformationArchitectureScroll
            title={process.informationArchitecture.title}
            description={process.informationArchitecture.description}
            rootLabel={process.informationArchitecture.rootLabel}
            sections={process.informationArchitecture.sections}
          />

          <div className="mt-12 md:mt-16">
            <h3 className="font-display text-xl uppercase tracking-wide text-ink md:text-2xl">
              {process.finalFeatureSet.title}
            </h3>
            <ol className="mt-6 grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
              {process.finalFeatureSet.items.map((item, index) => (
                <li
                  key={item.slice(0, 48)}
                  className="flex h-full flex-col gap-4 rounded-3xl border border-white/8 bg-surface/80 p-6 md:p-8"
                >
                  <span className="font-display text-3xl text-accent/80 md:text-4xl">
                    {index + 1}
                  </span>
                  <p className="text-base leading-relaxed text-slate md:text-[15px] md:leading-relaxed">
                    {item}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </SectionBlock>

        <SectionBlock label={citibridgeSections.designSprint.label}>
          {citibridgeSections.designSprint.paragraphs.map((paragraph, index) => (
            <p
              key={paragraph}
              className={`w-full max-w-none text-left text-base leading-relaxed text-slate md:text-lg ${index > 0 ? 'mt-5' : ''}`}
            >
              {paragraph}
            </p>
          ))}
        </SectionBlock>

        <SectionBlock
          label="Design features"
          title={citibridgeSections.featuresSidebarTitle}
          titleClassName="section-title mb-6"
        >
          <p className="mb-8 w-full max-w-none text-left text-base leading-relaxed text-slate md:text-lg">
            {citibridgeSections.featuresIntro}
          </p>
          <FeatureShowcase
            sidebarTitle={citibridgeSections.featuresSidebarTitle}
            features={citibridgeSections.features}
          />
        </SectionBlock>

        <SectionBlock label={citibridgeSections.presentation.label} title="Prototype & slides">
          <p className="mb-8 w-full max-w-none text-base leading-relaxed text-slate md:text-lg">
            {citibridgeSections.presentation.body}
          </p>
          <a
            href={citibridgeCaseStudyMeta.presentationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white shadow-glow transition hover:bg-accent/90"
          >
            View slide deck in Figma
            <span aria-hidden>→</span>
          </a>
        </SectionBlock>

        <SectionBlock label="Reflection" title="Conclusion">
          <CaseStudyConclusion content={citibridgeSections.conclusion} />
        </SectionBlock>

        <SectionBlock label="Explore more" title="More projects">
          <CaseStudyMoreProjects excludeProjectId="citbridge" />
        </SectionBlock>
      </div>
    </CaseStudyShell>
  )
}
