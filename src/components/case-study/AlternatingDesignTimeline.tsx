import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { ProcessNode } from './DesignProcessSteps'
import { ImageCarousel } from './ImageCarousel'

export interface DesignTimelineSlide {
  src: string
  alt: string
}

export interface DesignTimelineStep {
  number: string
  title: string
  body: string
  image?: string
  imageAlt?: string
  slides?: readonly DesignTimelineSlide[]
}

interface AlternatingDesignTimelineProps {
  steps: readonly DesignTimelineStep[]
  className?: string
}

const RING_PHASE_RATIO = 0.62
const RING_PHASE_RATIO_DENSE = 0.5

type TimerPhase = 'ring' | 'bridge'


function shapeScrollProgress(progress: number, stepCount: number) {
  const clamped = Math.min(Math.max(progress, 0), 1)
  if (stepCount <= 3) return clamped
  return 1 - (1 - clamped) ** 1.25
}

function mapScrollToTimeline(progress: number, stepCount: number) {
  const clamped = Math.min(Math.max(progress, 0), 1)

  if (stepCount <= 0) {
    return {
      activeIndex: 0,
      phase: 'ring' as TimerPhase,
      ringProgress: 0,
      bridgeProgress: 0,
    }
  }

  if (stepCount === 1) {
    return {
      activeIndex: 0,
      phase: 'ring' as TimerPhase,
      ringProgress: clamped,
      bridgeProgress: 0,
    }
  }

  const segment = 1 / stepCount
  const activeIndex = Math.min(stepCount - 1, Math.floor(clamped / segment))
  const local = (clamped - activeIndex * segment) / segment
  const isLast = activeIndex === stepCount - 1
  const ringRatio = stepCount >= 4 ? RING_PHASE_RATIO_DENSE : RING_PHASE_RATIO
  const ringPortion = isLast ? 1 : ringRatio

  let phase: TimerPhase = 'ring'
  let ringProgress = 0
  let bridgeProgress = 0

  if (local < ringPortion) {
    ringProgress = local / ringPortion
  } else if (!isLast) {
    phase = 'bridge'
    ringProgress = 1
    bridgeProgress = (local - ringPortion) / (1 - ringPortion)
  } else {
    ringProgress = 1
  }

  return { activeIndex, phase, ringProgress, bridgeProgress }
}

function getSegmentProgress(
  segmentIndex: number,
  activeIndex: number,
  phase: TimerPhase,
  bridgeProgress: number,
): number {
  if (segmentIndex < activeIndex) return 1
  if (segmentIndex > activeIndex) return 0
  if (phase === 'bridge') return bridgeProgress
  return 0
}

function TimelineSpineSegment({
  top,
  height,
  left,
  progress,
  showTravelingDot,
  isBridging,
}: {
  top: number
  height: number
  left: number
  progress: number
  showTravelingDot: boolean
  isBridging: boolean
}) {
  const clamped = Math.min(Math.max(progress, 0), 1)

  return (
    <div
      className="pointer-events-none absolute z-0 -translate-x-1/2"
      style={{ top, height, left, width: isBridging ? 2 : 1 }}
      aria-hidden
    >
      <div className="absolute inset-0 rounded-full bg-white/[0.12]" />
      <div
        className={`absolute inset-x-0 top-0 rounded-full bg-accent will-change-[height] ${
          isBridging
            ? 'shadow-[0_0_16px_rgba(153,112,255,0.65)]'
            : 'shadow-[0_0_10px_rgba(153,112,255,0.45)]'
        }`}
        style={{ height: `${clamped * 100}%` }}
      />
      {showTravelingDot && clamped > 0.02 && clamped < 0.98 && (
        <div
          className="absolute left-1/2 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-accent shadow-[0_0_16px_rgba(153,112,255,0.9)] will-change-[top]"
          style={{ top: `calc(${clamped * 100}% - 5px)` }}
        />
      )}
    </div>
  )
}

function TimelineCard({
  step,
  side,
}: {
  step: DesignTimelineStep
  side: 'left' | 'right'
}) {
  const slides =
    step.slides ??
    (step.image
      ? [{ src: step.image, alt: step.imageAlt ?? step.title }]
      : undefined)
  const pointer =
    side === 'left'
      ? 'md:before:left-full md:before:border-l-[#141420]'
      : 'md:before:right-full md:before:border-r-[#141420]'

  return (
    <article
      className={`relative rounded-2xl bg-[#141420] p-6 ring-1 ring-white/[0.08] md:p-7 md:before:absolute md:before:top-1/2 md:before:-translate-y-1/2 md:before:border-[10px] md:before:border-y-transparent md:before:border-transparent md:before:content-[''] ${pointer}`}
    >
      <h3 className="font-display text-xl uppercase tracking-wide text-ink md:text-2xl">
        {step.title}
      </h3>
      <p className="mt-4 whitespace-pre-line text-base leading-relaxed text-slate md:text-[15px] md:leading-relaxed">
        {step.body}
      </p>
      {slides && slides.length > 0 && (
        <ImageCarousel slides={slides} className="relative mt-6" />
      )}
    </article>
  )
}

export function AlternatingDesignTimeline({
  steps,
  className = '',
}: AlternatingDesignTimelineProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLOListElement>(null)
  const rowRefs = useRef<(HTMLDivElement | null)[]>([])
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([])
  const activationProgressRef = useRef<number | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [phase, setPhase] = useState<TimerPhase>('ring')
  const [ringProgress, setRingProgress] = useState(0)
  const [bridgeProgress, setBridgeProgress] = useState(0)
  const [nodePositions, setNodePositions] = useState<number[]>([])
  const [spineLeft, setSpineLeft] = useState(0)
  const [scrollOffset, setScrollOffset] = useState(
    () =>
      (steps.length >= 4
        ? ['start 0.32', 'end 0.62']
        : ['start 0.32', 'end 0.2']) as ['start 0.32', 'end 0.62'] | ['start 0.32', 'end 0.2'],
  )
  const { scrollYProgress } = useScroll({
    target: rootRef,
    offset: scrollOffset,
  })

  const resolveScrollProgress = useCallback((value: number) => {
    const firstRow = rowRefs.current[0]
    if (!firstRow) return value

    const rowRect = firstRow.getBoundingClientRect()
    const rowCenter = rowRect.top + rowRect.height / 2
    const viewportCenter = window.innerHeight * 0.5
    const centerTolerance = 40

    if (rowCenter > viewportCenter + centerTolerance) {
      activationProgressRef.current = null
      return 0
    }

    if (activationProgressRef.current === null) {
      activationProgressRef.current = value
    }

    const start = activationProgressRef.current
    if (start >= 1) return 1
    return Math.min(1, Math.max(0, (value - start) / (1 - start)))
  }, [])

  const applyScrollProgress = useCallback(
    (value: number) => {
      const resolved = resolveScrollProgress(value)
      const next = mapScrollToTimeline(shapeScrollProgress(resolved, steps.length), steps.length)
      setActiveIndex(next.activeIndex)
      setPhase(next.phase)
      setRingProgress(next.ringProgress)
      setBridgeProgress(next.bridgeProgress)
    },
    [resolveScrollProgress, steps.length],
  )

  const measureSpine = useCallback(() => {
    const list = listRef.current
    const root = rootRef.current
    if (!list || steps.length < 1) {
      setNodePositions([])
      setSpineLeft(0)
      return
    }

    const listRect = list.getBoundingClientRect()
    const positions = nodeRefs.current.map((node) => {
      if (!node) return 0
      const rect = node.getBoundingClientRect()
      return rect.top + rect.height / 2 - listRect.top
    })

    const first = nodeRefs.current[0]
    if (first) {
      const firstRect = first.getBoundingClientRect()
      setSpineLeft(firstRect.left + firstRect.width / 2 - listRect.left)
    }

    const firstRow = rowRefs.current[0]
    if (root && firstRow) {
      const rootTop = root.getBoundingClientRect().top
      const rowRect = firstRow.getBoundingClientRect()
      const rowCenterFromRoot = rowRect.top + rowRect.height / 2 - rootTop
      const vh = window.innerHeight
      const startFrac = Math.min(0.48, Math.max(0.1, 0.5 - rowCenterFromRoot / vh))
      const endFrac = steps.length >= 4 ? 0.62 : 0.2
      setScrollOffset([
        `start ${startFrac.toFixed(2)}`,
        `end ${endFrac}`,
      ] as typeof scrollOffset)
    }

    setNodePositions(positions)
  }, [steps.length])

  useLayoutEffect(() => {
    measureSpine()
    const list = listRef.current
    if (!list) return

    const observer = new ResizeObserver(measureSpine)
    observer.observe(list)
    window.addEventListener('resize', measureSpine)

    return () => {
      observer.disconnect()
      window.removeEventListener('resize', measureSpine)
    }
  }, [measureSpine, steps])

  useMotionValueEvent(scrollYProgress, 'change', applyScrollProgress)

  useEffect(() => {
    applyScrollProgress(scrollYProgress.get())
  }, [applyScrollProgress, scrollYProgress])

  const getNodeState = (index: number): 'upcoming' | 'active' | 'complete' => {
    if (index < activeIndex) return 'complete'
    if (index === activeIndex) return 'active'
    return 'upcoming'
  }

  return (
    <div ref={rootRef} className={`relative ${className}`}>
      <ol ref={listRef} className="relative space-y-0 md:space-y-0">
        {nodePositions.length >= 2 &&
          nodePositions.slice(0, -1).map((top, index) => {
            const bottom = nodePositions[index + 1]
            const height = Math.max(0, bottom - top)
            if (height <= 0) return null

            const segmentProgress = getSegmentProgress(
              index,
              activeIndex,
              phase,
              bridgeProgress,
            )
            const isBridging = phase === 'bridge' && index === activeIndex

            return (
              <TimelineSpineSegment
                key={steps[index]?.number ?? index}
                top={top}
                height={height}
                left={spineLeft}
                progress={segmentProgress}
                showTravelingDot={isBridging}
                isBridging={isBridging}
              />
            )
          })}
        {steps.map((step, index) => {
          const isLeft = index % 2 === 0
          const nodeState = getNodeState(index)
          const isActiveRing = nodeState === 'active' && phase === 'ring'
          const isHandoff = nodeState === 'active' && phase === 'bridge'

          return (
            <li key={step.number} className="relative">
              <motion.div
                ref={(el) => {
                  rowRefs.current[index] = el
                }}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                onViewportEnter={measureSpine}
                transition={{
                  duration: 0.55,
                  delay: index * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="relative grid grid-cols-[3.5rem_1fr] items-center gap-x-5 py-6 md:grid-cols-[1fr_3.5rem_1fr] md:gap-x-10 md:py-10"
              >
                {isLeft ? (
                  <div className="col-start-2 min-h-0 md:col-start-1 md:row-start-1 md:pr-2">
                    <TimelineCard step={step} side="left" />
                  </div>
                ) : (
                  <div className="hidden min-h-0 md:col-start-1 md:block" aria-hidden />
                )}

                <div
                  ref={(el) => {
                    nodeRefs.current[index] = el
                  }}
                  className="relative z-10 col-start-1 flex items-center justify-center self-center md:col-start-2 md:row-start-1"
                >
                  <div
                    className={`shrink-0 rounded-full bg-[#0c0c10] p-1 ring-8 ring-[#0c0c10] transition-shadow duration-300 ${
                      isActiveRing && ringProgress > 0.05
                        ? 'shadow-[0_0_20px_rgba(153,112,255,0.35)]'
                        : isHandoff
                          ? 'shadow-[0_0_24px_rgba(153,112,255,0.55)]'
                          : nodeState === 'complete'
                            ? 'shadow-[0_0_12px_rgba(153,112,255,0.25)]'
                            : ''
                    }`}
                  >
                    <ProcessNode
                      number={step.number}
                      state={nodeState}
                      ringProgress={
                        isActiveRing
                          ? ringProgress
                          : nodeState === 'complete' || isHandoff
                            ? 1
                            : 0
                      }
                      variant="fill"
                    />
                  </div>
                </div>

                {isLeft ? (
                  <div className="hidden min-h-0 md:col-start-3 md:block" aria-hidden />
                ) : (
                  <div className="col-start-2 min-h-0 md:col-start-3 md:row-start-1 md:pl-2">
                    <TimelineCard step={step} side="right" />
                  </div>
                )}
              </motion.div>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
