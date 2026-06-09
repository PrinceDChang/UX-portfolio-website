import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

export interface FeatureShowcaseItem {
  title: string
  headline: string
  description: string
  icon: string
  image?: string
  imageSrc2x?: string
  /** Intrinsic width of `image` — used for srcSet / layout */
  imageWidth?: number
  imageHeight?: number
  /** Width descriptor for `imageSrc2x` when not exactly 2× (defaults to 2× imageWidth) */
  imageRetinaWidth?: number
  imageAlt?: string
  /** Tall screenshots scroll inside the visual frame instead of scaling down */
  imageScrollable?: boolean
  /** With imageScrollable — allow horizontal + vertical pan inside the frame */
  imageScrollBoth?: boolean
  /** Wide/short screenshots fill the frame width; height follows aspect ratio */
  imageFill?: boolean
  /** Override default fixed-frame sizing (min/max height) */
  imageFrameClass?: string
  /** Optional external link when the visual is clicked */
  imageLink?: string
  recommendationHeadline?: string
  recommendation?: string
  recommendationImage?: string
  recommendationImageAlt?: string
  quotes?: readonly string[]
  observation?: string
  stats?: readonly string[]
}

interface FeatureShowcaseProps {
  sidebarTitle: string
  features: readonly FeatureShowcaseItem[]
  className?: string
}

function isGifSrc(src: string | undefined): boolean {
  if (!src) return false
  return /\.gif(?:\?|$)/i.test(src)
}

function LinkedFeatureImage({
  href,
  imageAlt,
  className,
  children,
}: {
  href?: string
  imageAlt: string
  className?: string
  children: React.ReactNode
}) {
  if (!href) {
    return <>{children}</>
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`block transition-opacity hover:opacity-95 ${className ?? ''}`}
      aria-label={`${imageAlt} — open external link`}
    >
      {children}
    </a>
  )
}

function FeatureVisual({
  feature,
  side,
}: {
  feature: FeatureShowcaseItem
  side: 'finding' | 'recommendation'
}) {
  const image =
    side === 'recommendation'
      ? feature.recommendationImage ?? feature.image
      : feature.image
  const imageAlt =
    side === 'recommendation'
      ? feature.recommendationImageAlt ?? feature.imageAlt ?? feature.title
      : feature.imageAlt ?? feature.title
  const isAnimatedGif = isGifSrc(image)
  const imageSrcSet =
    !isAnimatedGif && image && feature.imageSrc2x && feature.imageWidth
      ? `${image} ${feature.imageWidth}w, ${feature.imageSrc2x} ${feature.imageRetinaWidth ?? feature.imageWidth * 2}w`
      : undefined
  const imageLoading = isAnimatedGif ? 'eager' : 'lazy'
  const imageSizes = feature.imageScrollBoth
    ? feature.imageWidth
      ? `${feature.imageWidth}px`
      : undefined
    : feature.imageScrollable || feature.imageFill
      ? '(min-width: 1024px) 672px, calc(100vw - 4rem)'
      : undefined
  const quotes = side === 'finding' ? feature.quotes : undefined
  const observation = side === 'finding' ? feature.observation : undefined
  const stats = side === 'finding' ? feature.stats : undefined
  const showQuoteOverlay = Boolean(
    image &&
      !feature.imageScrollable &&
      !feature.imageFill &&
      ((quotes && quotes.length > 0) ||
        observation ||
        (stats && stats.length > 0)),
  )

  const useFixedFrame = feature.imageScrollable || feature.imageFill

  const defaultFixedFrameClass =
    'flex min-h-[200px] flex-1 flex-col overflow-hidden bg-[#f4f4f6] md:min-h-[240px] md:max-h-[280px]'

  const visualClass = useFixedFrame
    ? feature.imageFrameClass ?? defaultFixedFrameClass
    : image
      ? 'h-[min(380px,52vw)] bg-[#f4f4f6] md:h-[min(400px,46vh)] lg:h-[min(460px,48vh)]'
      : 'flex min-h-[200px] flex-1 items-center justify-center bg-gradient-to-br from-accent/20 via-[#1a1530] to-[#0d1118] md:min-h-[240px] md:max-h-[280px]'

  return (
    <div
      className={`group/visual relative mb-6 shrink-0 overflow-hidden rounded-2xl ring-1 ring-white/[0.06] ${visualClass} ${useFixedFrame ? 'min-w-0' : ''} ${showQuoteOverlay ? 'cursor-default' : ''}`}
      tabIndex={showQuoteOverlay ? 0 : undefined}
    >
      {image ? (
        feature.imageFill ? (
          <div className="relative min-h-0 flex-1 overflow-hidden">
            <LinkedFeatureImage href={feature.imageLink} imageAlt={imageAlt}>
              <img
                src={image}
                srcSet={imageSrcSet}
                sizes={imageSizes}
                width={feature.imageWidth}
                height={feature.imageHeight}
                alt={imageAlt}
                className="block h-auto w-full"
                loading={imageLoading}
                decoding="async"
              />
            </LinkedFeatureImage>
          </div>
        ) : feature.imageScrollable ? (
          <div
            className={`min-h-0 min-w-0 flex-1 overscroll-contain ${
              feature.imageScrollBoth
                ? 'touch-pan-x touch-pan-y overflow-x-auto overflow-y-auto'
                : 'overflow-y-auto overflow-x-hidden'
            }`}
          >
            <LinkedFeatureImage href={feature.imageLink} imageAlt={imageAlt}>
              <img
                src={image}
                srcSet={imageSrcSet}
                sizes={imageSizes}
                width={feature.imageWidth}
                height={feature.imageHeight}
                alt={imageAlt}
                className={
                  feature.imageScrollBoth
                    ? 'block h-auto w-max max-w-none shrink-0'
                    : 'block h-auto w-full'
                }
                loading={imageLoading}
                decoding="async"
              />
            </LinkedFeatureImage>
          </div>
        ) : (
        <>
          <LinkedFeatureImage
            href={feature.imageLink}
            imageAlt={imageAlt}
            className="absolute inset-0 z-0"
          >
            <img
              src={image}
              srcSet={imageSrcSet}
              sizes={imageSizes}
              width={feature.imageWidth}
              height={feature.imageHeight}
              alt={imageAlt}
              className="h-full w-full object-contain object-center p-2 md:p-3"
              loading={imageLoading}
              decoding="async"
            />
          </LinkedFeatureImage>
          {showQuoteOverlay && (
            <>
            <div
              className="pointer-events-none absolute inset-0 z-[1] rounded-2xl bg-black/55 opacity-0 transition-opacity duration-300 group-hover/visual:opacity-100 group-focus-visible/visual:opacity-100"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute inset-0 z-[2] flex flex-col justify-end opacity-0 transition-opacity duration-300 group-hover/visual:opacity-100 group-focus-visible/visual:opacity-100"
              aria-hidden
            >
              <div className="bg-gradient-to-t from-[#141420]/98 via-[#141420]/75 to-black/20 px-4 pb-4 pt-16 md:px-5 md:pb-5 md:pt-20">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                  User quote(s)
                </p>
                <div className="mt-2 space-y-2 text-sm leading-snug text-ink md:text-[15px]">
                  {quotes?.map((quote) => (
                    <p key={quote}>&ldquo;{quote}&rdquo;</p>
                  ))}
                  {observation && <p>{observation}</p>}
                  {stats?.map((stat) => (
                    <p key={stat} className="flex gap-2">
                      <span aria-hidden>📊</span>
                      <span>{stat}</span>
                    </p>
                  ))}
                </div>
              </div>
            </div>
            </>
          )}
        </>
        )
      ) : (
        <>
          <div
            className="pointer-events-none absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                'radial-gradient(circle at 30% 20%, rgba(153,112,255,0.35), transparent 50%), radial-gradient(circle at 70% 80%, rgba(99,102,241,0.2), transparent 45%)',
            }}
            aria-hidden
          />
          <span className="relative text-7xl drop-shadow-lg md:text-8xl" aria-hidden>
            {feature.icon}
          </span>
        </>
      )}
    </div>
  )
}

function FeatureFace({
  feature,
  side,
  reserveFlipSpace = false,
}: {
  feature: FeatureShowcaseItem
  side: 'finding' | 'recommendation'
  reserveFlipSpace?: boolean
}) {
  const isRecommendation = side === 'recommendation'
  const headline = isRecommendation
    ? feature.recommendationHeadline ?? 'Recommendation'
    : feature.headline
  const description = isRecommendation
    ? feature.recommendation ?? ''
    : feature.description
  const showInlineResearch =
    !isRecommendation && !feature.image && !feature.recommendationImage

  return (
    <div className="flex h-full min-w-0 flex-col">
      <FeatureVisual feature={feature} side={side} />
      <div
        className={
          reserveFlipSpace ? 'pb-16 md:pb-20' : undefined
        }
      >
        {showInlineResearch && (
          <div className="mb-5 space-y-3 md:mb-6">
            {feature.quotes?.map((quote) => (
              <p
                key={quote}
                className="border-l-2 border-accent/35 pl-4 font-display text-lg leading-relaxed text-ink md:text-xl"
              >
                &ldquo;{quote}&rdquo;
              </p>
            ))}
            {feature.observation && (
              <p className="text-base leading-relaxed text-slate md:text-[17px]">
                {feature.observation}
              </p>
            )}
            {feature.stats && feature.stats.length > 0 && (
              <ul className="space-y-2 text-base leading-relaxed text-slate md:text-[17px]">
                {feature.stats.map((stat) => (
                  <li key={stat} className="flex gap-3">
                    <span className="shrink-0" aria-hidden>
                      📊
                    </span>
                    <span>{stat}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
        <h3 className="font-display text-2xl uppercase leading-tight tracking-wide text-ink md:text-3xl">
          {headline}
        </h3>
        <p className="mt-4 w-full max-w-none text-base leading-relaxed text-slate md:text-[17px] md:leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  )
}

export function FeatureShowcase({
  sidebarTitle,
  features,
  className = '',
}: FeatureShowcaseProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [showRecommendation, setShowRecommendation] = useState(false)
  const active = features[activeIndex]

  useEffect(() => {
    setShowRecommendation(false)
  }, [activeIndex])

  if (!active) return null

  const hasRecommendation = Boolean(active.recommendation)

  return (
    <div
      className={`overflow-x-hidden rounded-3xl bg-[#141418] ring-1 ring-white/[0.08] lg:flex lg:min-h-[min(640px,82vh)] lg:items-stretch ${className}`}
    >
      <aside className="border-b border-white/[0.08] p-6 md:p-8 lg:flex lg:w-[min(100%,22rem)] lg:shrink-0 lg:flex-col lg:border-b-0 lg:border-r">
        <p className="font-display text-sm uppercase leading-snug tracking-wide text-ink md:text-base">
          {sidebarTitle}
        </p>

        <div
          className="mt-6 flex flex-col gap-1"
          role="tablist"
          aria-label="Key features"
        >
          {features.map((feature, index) => {
            const isActive = index === activeIndex

            return (
              <button
                key={feature.title}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls={`feature-panel-${index}`}
                id={`feature-tab-${index}`}
                onClick={() => setActiveIndex(index)}
                className={`group relative flex w-full items-center rounded-xl px-4 py-3.5 text-left text-sm transition-colors duration-200 md:text-[15px] ${
                  isActive
                    ? 'bg-white/[0.06] font-semibold text-ink'
                    : 'font-medium text-slate/55 hover:bg-white/[0.03]'
                }`}
              >
                {isActive && (
                  <span
                    className="absolute bottom-2 left-0 top-2 w-1 rounded-full bg-accent shadow-[0_0_12px_rgba(153,112,255,0.55)]"
                    aria-hidden
                  />
                )}
                <span
                  className={`flex min-w-0 items-center gap-3 transition-transform duration-200 ease-out ${
                    isActive ? '' : 'group-hover:translate-x-1.5'
                  }`}
                >
                  <span
                    className={`ml-1 w-5 shrink-0 text-right font-condensed text-base tabular-nums leading-none transition-colors duration-200 md:text-lg ${
                      isActive
                        ? 'text-ink'
                        : 'text-slate/35 group-hover:text-accent'
                    }`}
                    aria-hidden
                  >
                    {index + 1}
                  </span>
                  <span
                    className={`min-w-0 transition-colors duration-200 ${
                      isActive ? '' : 'group-hover:text-accent'
                    }`}
                  >
                    {feature.title}
                  </span>
                </span>
              </button>
            )
          })}
        </div>
      </aside>

      <div
        className={`relative flex flex-1 flex-col p-6 md:p-8 lg:p-10 ${
          hasRecommendation ? 'pb-24 md:pb-28' : ''
        }`}
        role="tabpanel"
        id={`feature-panel-${activeIndex}`}
        aria-labelledby={`feature-tab-${activeIndex}`}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={active.title}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex min-h-0 min-w-0 flex-1 flex-col [perspective:1400px]"
          >
            <motion.div
              className="relative w-full min-w-0"
              style={{ transformStyle: 'preserve-3d' }}
              animate={{ rotateY: showRecommendation ? 180 : 0 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              <div
                className="[backface-visibility:hidden]"
                style={{ backfaceVisibility: 'hidden' }}
                aria-hidden={showRecommendation}
              >
                <FeatureFace
                  feature={active}
                  side="finding"
                  reserveFlipSpace={hasRecommendation}
                />
              </div>

              {hasRecommendation && (
                <div
                  className="absolute inset-0 overflow-visible [backface-visibility:hidden]"
                  style={{
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                  }}
                  aria-hidden={!showRecommendation}
                >
                  <FeatureFace
                    feature={active}
                    side="recommendation"
                    reserveFlipSpace={hasRecommendation}
                  />
                </div>
              )}
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {hasRecommendation && (
          <button
            type="button"
            onClick={() => setShowRecommendation((value) => !value)}
            className="absolute bottom-6 right-6 z-10 rounded-full border border-accent/35 bg-accent/15 px-5 py-2.5 text-sm font-semibold text-ink ring-1 ring-accent/25 transition hover:bg-accent/25 md:bottom-8 md:right-8"
            aria-pressed={showRecommendation}
            aria-label={
              showRecommendation ? 'Show finding' : 'Show recommendation'
            }
          >
            Flip
          </button>
        )}
      </div>
    </div>
  )
}
