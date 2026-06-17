import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { CaseStudyImpactSummary } from '../components/case-study/CaseStudyImpactSummary'
import { CaseStudyMetaGrid } from '../components/case-study/CaseStudyMetaGrid'
import { CaseStudyMoreProjects } from '../components/case-study/CaseStudyMoreProjects'
import { CaseStudyShell } from '../components/case-study/CaseStudyShell'
import { SectionBlock } from '../components/case-study/SectionBlock'
import { DesignProcessSteps } from '../components/case-study/DesignProcessSteps'
import { FeatureShowcase } from '../components/case-study/FeatureShowcase'
import { VideoPrototypeCard } from '../components/case-study/VideoPrototypeCard'
import { FlipCardGallery } from '../components/case-study/FlipCardGallery'
import { SplitHeroCards } from '../components/case-study/SplitHeroCards'
import { ZoomableImage } from '../components/case-study/ZoomableImage'
import { FigmaPrototypeEmbed } from '../components/case-study/FigmaPrototypeEmbed'
import {
  cueCaseStudyMeta,
  cueSections,
} from '../data/cueCaseStudy'
import { roleBadgeClassName } from '../lib/projectRole'

export function CueCaseStudyPage() {
  useEffect(() => {
    document.title = 'Cue — Case Study · Oey Chang'
    return () => {
      document.title = 'Oey Chang — UX Designer'
    }
  }, [])

  return (
    <CaseStudyShell>
      {/* Hero */}
      <section className="relative overflow-hidden pb-8 md:pb-12">
        <div className="relative z-10 mx-auto max-w-6xl px-6 pt-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className={roleBadgeClassName(cueCaseStudyMeta.role, 'mb-6')}>
              {cueCaseStudyMeta.role}
            </span>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-accent">
              {cueCaseStudyMeta.figbuild}
            </p>
            <h1 className="sr-only">{cueCaseStudyMeta.title}</h1>
            <img
              src={cueCaseStudyMeta.logo}
              alt={cueCaseStudyMeta.logoAlt}
              className="h-[clamp(3.25rem,10vw,5.75rem)] w-auto max-w-full object-contain object-left"
            />
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate md:text-xl">
              {cueCaseStudyMeta.tagline}
            </p>

            <CaseStudyImpactSummary metrics={cueCaseStudyMeta.impactMetrics} />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="relative z-10 mx-auto mt-12 max-w-6xl px-6"
        >
          <div className="overflow-hidden rounded-[2rem] bg-[#0a0a12] ring-1 ring-accent/20 shadow-soft">
            <img
              src={cueCaseStudyMeta.heroImage}
              alt={cueCaseStudyMeta.heroImageAlt}
              className="block h-auto w-full object-contain object-center"
            />
          </div>
          <CaseStudyMetaGrid className="mt-10" details={cueCaseStudyMeta.details} />
        </motion.div>
      </section>

      <div className="space-y-20 pb-20 pt-10 md:space-y-28 md:pb-28 md:pt-14">
        <SectionBlock label={cueSections.hook.label}>
          <p className="w-full max-w-none text-left text-base leading-relaxed text-slate whitespace-pre-line md:text-lg">
            {cueSections.hook.body}
          </p>
        </SectionBlock>

        <SectionBlock label={cueSections.challenge.label}>
          <p className="mb-8 w-full max-w-none text-left text-base leading-relaxed text-slate md:text-lg">
            {cueSections.challenge.body}
          </p>
          <blockquote className="case-study-quote rounded-3xl border border-accent/25 bg-elevated/60 px-8 py-8 md:px-10 md:py-10">
            <h2 className="mb-5 font-display text-2xl leading-tight text-ink md:text-3xl">
              Problem statement
            </h2>
            <p className="font-display text-xl leading-relaxed text-ink md:text-2xl">
              &ldquo;{cueSections.challenge.problemStatement}&rdquo;
            </p>
          </blockquote>
        </SectionBlock>

        <SectionBlock>
          <SplitHeroCards
            label={cueSections.solution.label}
            headline={cueSections.solution.subtitle}
            body={cueSections.solution.body}
          />
        </SectionBlock>

        <SectionBlock label={cueSections.finalDesign.label} title="Final design">
          <p className="section-copy mb-10">{cueSections.finalDesign.body}</p>
          <div className="grid gap-6 md:grid-cols-2 md:items-center">
            {cueSections.finalDesign.deliverables.map((item) => (
              <figure
                key={item.title}
                className="flex flex-col overflow-hidden rounded-3xl bg-elevated ring-1 ring-white/10"
              >
                {'embedUrl' in item && item.embedUrl && 'embedFrame' in item && (
                  <FigmaPrototypeEmbed
                    src={item.embedUrl}
                    title={item.title}
                    frameWidth={item.embedFrame.width}
                    frameHeight={item.embedFrame.height}
                    layout={
                      'embedLayout' in item && item.embedLayout === 'phone'
                        ? 'phone'
                        : 'fit'
                    }
                    scale={
                      'embedScale' in item &&
                      typeof item.embedScale === 'number'
                        ? item.embedScale
                        : 1
                    }
                  />
                )}
                <figcaption className="shrink-0 border-t border-white/8 px-6 py-5">
                  <p className="font-semibold text-ink">{item.title}</p>
                  <p className="mt-1 text-sm text-slate">{item.caption}</p>
                  {'embedUrl' in item && item.embedUrl && (
                    <a
                      href={item.embedUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-block text-sm font-medium text-accent hover:underline"
                    >
                      Open prototype in new tab →
                    </a>
                  )}
                </figcaption>
              </figure>
            ))}
          </div>
        </SectionBlock>

        <SectionBlock
          title={cueSections.process.label}
          titleClassName="section-title mb-8 md:mb-10"
        >
          <DesignProcessSteps steps={cueSections.process.steps} />

          <div className="mt-10 grid gap-6">
            {cueSections.process.artifacts.map((artifact) => {
              const hasImage = 'image' in artifact && artifact.image
              const hasCards = 'cards' in artifact && artifact.cards?.length

              return (
                <article
                  key={artifact.title}
                  className={
                    hasImage || hasCards
                      ? 'py-2 md:py-3'
                      : 'rounded-3xl border border-white/8 bg-surface/80 p-8 md:p-10'
                  }
                >
                  <h3 className="text-xl font-semibold text-ink">{artifact.title}</h3>
                  <p
                    className={
                      hasImage || hasCards
                        ? 'mt-4 w-full max-w-none text-left text-base leading-relaxed text-slate md:text-lg'
                        : 'mt-4 section-copy'
                    }
                  >
                    {artifact.body}
                  </p>
                  {hasImage && (
                    <ZoomableImage
                      src={artifact.image}
                      alt={
                        'imageAlt' in artifact && artifact.imageAlt
                          ? artifact.imageAlt
                          : artifact.title
                      }
                    />
                  )}
                  {hasCards && <FlipCardGallery cards={artifact.cards} />}
                </article>
              )
            })}
          </div>
        </SectionBlock>

        <SectionBlock label="Key features" title="What we built">
          <p className="mb-8 w-full max-w-none text-left text-base leading-relaxed text-slate md:text-lg">
            {cueSections.featuresIntro}
          </p>
          <FeatureShowcase
            sidebarTitle={cueSections.featuresSidebarTitle}
            features={cueSections.features}
          />
        </SectionBlock>

        <SectionBlock label="See it in action" title="Prototypes & deliverables">
          <VideoPrototypeCard
            className="mb-6"
            youtubeId={cueSections.videoPrototype.youtubeId}
            title={cueSections.videoPrototype.title}
            footerLabel={cueSections.videoPrototype.footerLabel}
          />
          <div className="grid gap-5 md:grid-cols-3">
            {cueSections.prototypes.map((proto) => (
              <a
                key={proto.title}
                href={proto.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col rounded-3xl bg-elevated p-6 ring-1 ring-white/10 transition hover:ring-accent/50 hover:shadow-glow"
              >
                <span className="text-2xl" aria-hidden>
                  {proto.emoji}
                </span>
                <h3 className="mt-4 text-lg font-semibold text-ink group-hover:text-accent">
                  {proto.title}
                </h3>
                <p className="mt-2 flex-1 text-sm text-slate">{proto.description}</p>
                <span className="mt-4 text-sm font-semibold text-accent">Open prototype →</span>
              </a>
            ))}
          </div>
        </SectionBlock>

        <SectionBlock label="Reflection">
          <div className="grid gap-6 md:grid-cols-3">
            {cueSections.reflection.map((item) => (
              <article
                key={item.title}
                className="rounded-3xl bg-elevated p-8 ring-1 ring-white/8"
              >
                <h3 className="text-lg font-semibold text-ink">{item.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-slate">{item.body}</p>
              </article>
            ))}
          </div>
        </SectionBlock>

        <SectionBlock label="Explore more" title="More projects">
          <CaseStudyMoreProjects excludeProjectId="cue" />
        </SectionBlock>
      </div>
    </CaseStudyShell>
  )
}
