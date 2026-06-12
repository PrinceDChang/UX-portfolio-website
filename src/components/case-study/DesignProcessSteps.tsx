import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ZoomableImage } from './ZoomableImage'

export interface DesignProcessStep {
  number: string
  title: string
  body: string
  listItems?: readonly string[]
  image?: string
  imageAlt?: string
  imageCaption?: string
}

interface DesignProcessStepsProps {
  steps: readonly DesignProcessStep[]
  /** Ms per step (ring around number + bridge line to next) */
  stepDurationMs?: number
  /** Show the active step image + caption below the tab track instead of inside the tab */
  artifactsBelowTrack?: boolean
}

const DEFAULT_STEP_MS = 8000
const RING_PHASE_RATIO = 0.72
/** Bridge line runs 30% faster than the ring's share of the step budget */
const BRIDGE_SPEED_BOOST = 1.3
const LAYOUT_TRANSITION_S = 0.45 / BRIDGE_SPEED_BOOST
const PANEL_TRANSITION_S = 0.4 / BRIDGE_SPEED_BOOST

type TimerPhase = 'ring' | 'bridge'

export const PROCESS_NODE_SIZE = 56
const NODE_SIZE = PROCESS_NODE_SIZE
const NODE_STROKE = 2.5
const NODE_RADIUS = (NODE_SIZE - NODE_STROKE) / 2
const NODE_CIRCUMFERENCE = 2 * Math.PI * NODE_RADIUS

export function ProcessNode({
  number,
  state,
  ringProgress,
  variant = 'ring',
}: {
  number: string
  state: 'upcoming' | 'active' | 'complete'
  ringProgress: number
  variant?: 'ring' | 'fill'
}) {
  const fillLevel =
    state === 'complete'
      ? 1
      : state === 'upcoming'
        ? 0
        : Math.min(Math.max(ringProgress, 0), 1)

  const numberClass = `relative z-10 font-condensed text-xl leading-none tracking-wide md:text-2xl ${
    state === 'active'
      ? 'text-ink'
      : state === 'complete'
        ? 'text-ink'
        : 'text-slate/40'
  }`

  if (variant === 'fill') {
    return (
      <div
        className="relative flex shrink-0 items-center justify-center"
        style={{ width: NODE_SIZE, height: NODE_SIZE }}
        aria-hidden
      >
        <div className="absolute inset-0 overflow-hidden rounded-full bg-white/[0.08] ring-1 ring-white/[0.12]">
          {fillLevel > 0 && (
            <div
              className={`absolute inset-x-0 top-0 bg-accent will-change-[height] ${
                state === 'active'
                  ? 'shadow-[0_0_14px_rgba(153,112,255,0.45)]'
                  : state === 'complete'
                    ? 'opacity-95'
                    : ''
              }`}
              style={{ height: `${fillLevel * 100}%` }}
            />
          )}
        </div>
        <span className={numberClass}>{number}</span>
      </div>
    )
  }

  const dashOffset = NODE_CIRCUMFERENCE * (1 - fillLevel)

  return (
    <div
      className="relative flex shrink-0 items-center justify-center"
      style={{ width: NODE_SIZE, height: NODE_SIZE }}
      aria-hidden
    >
      <svg
        width={NODE_SIZE}
        height={NODE_SIZE}
        className="absolute inset-0 -rotate-90"
        aria-hidden
      >
        <circle
          cx={NODE_SIZE / 2}
          cy={NODE_SIZE / 2}
          r={NODE_RADIUS}
          fill="none"
          stroke="rgba(255,255,255,0.12)"
          strokeWidth={NODE_STROKE}
        />
        {state !== 'upcoming' && (
          <circle
            cx={NODE_SIZE / 2}
            cy={NODE_SIZE / 2}
            r={NODE_RADIUS}
            fill="none"
            stroke="#9970FF"
            strokeWidth={NODE_STROKE}
            strokeLinecap="round"
            strokeDasharray={NODE_CIRCUMFERENCE}
            strokeDashoffset={dashOffset}
            className={
              state === 'complete'
                ? 'opacity-90'
                : 'drop-shadow-[0_0_8px_rgba(153,112,255,0.55)]'
            }
          />
        )}
      </svg>
      <span className={numberClass}>{number}</span>
    </div>
  )
}

function ProcessConnector({
  progress,
  showTravelingDot,
}: {
  progress: number
  showTravelingDot: boolean
}) {
  const clamped = Math.min(Math.max(progress, 0), 1)

  return (
    <div
      className="relative mx-1 h-px min-w-[1.25rem] flex-1 self-center md:mx-2"
      aria-hidden
    >
      <div className="absolute inset-0 rounded-full bg-white/[0.1]" />
      <div
        className="absolute inset-y-0 left-0 rounded-full bg-accent shadow-[0_0_10px_rgba(153,112,255,0.45)] will-change-[width]"
        style={{ width: `${clamped * 100}%` }}
      />
      {showTravelingDot && clamped > 0.02 && clamped < 0.98 && (
        <div
          className="absolute top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-accent shadow-[0_0_12px_rgba(153,112,255,0.75)] will-change-[left]"
          style={{ left: `calc(${clamped * 100}% - 4px)` }}
        />
      )}
    </div>
  )
}

export function DesignProcessSteps({
  steps,
  stepDurationMs = DEFAULT_STEP_MS,
  artifactsBelowTrack = false,
}: DesignProcessStepsProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [phase, setPhase] = useState<TimerPhase>('ring')
  const [ringProgress, setRingProgress] = useState(0)
  const [bridgeProgress, setBridgeProgress] = useState(0)
  const pausedRef = useRef(false)

  const ringDurationMs = stepDurationMs * RING_PHASE_RATIO
  const bridgeDurationMs =
    (stepDurationMs * (1 - RING_PHASE_RATIO)) / BRIDGE_SPEED_BOOST
  const cycleDurationMs = ringDurationMs + bridgeDurationMs

  useEffect(() => {
    setPhase('ring')
    setRingProgress(0)
    setBridgeProgress(0)
  }, [activeIndex])

  useEffect(() => {
    if (steps.length === 0) return

    let raf = 0
    const started = performance.now()
    let pausedAt = 0
    let totalPaused = 0

    const tick = (now: number) => {
      if (pausedRef.current || document.hidden) {
        if (pausedAt === 0) pausedAt = now
        raf = requestAnimationFrame(tick)
        return
      }

      if (pausedAt > 0) {
        totalPaused += now - pausedAt
        pausedAt = 0
      }

      const elapsed = now - started - totalPaused

      if (elapsed < ringDurationMs) {
        setPhase('ring')
        setRingProgress(elapsed / ringDurationMs)
        setBridgeProgress(0)
      } else if (elapsed < cycleDurationMs) {
        setPhase('bridge')
        setRingProgress(1)
        setBridgeProgress((elapsed - ringDurationMs) / bridgeDurationMs)
      } else {
        setActiveIndex((current) => (current + 1) % steps.length)
        return
      }

      raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [
    activeIndex,
    steps.length,
    ringDurationMs,
    bridgeDurationMs,
    cycleDurationMs,
  ])

  useEffect(() => {
    const onVisibility = () => {
      pausedRef.current = document.hidden
    }
    document.addEventListener('visibilitychange', onVisibility)
    return () => document.removeEventListener('visibilitychange', onVisibility)
  }, [])

  const selectStep = (index: number) => {
    setActiveIndex(index)
    setPhase('ring')
    setRingProgress(0)
    setBridgeProgress(0)
  }

  const getNodeState = (index: number): 'upcoming' | 'active' | 'complete' => {
    if (index < activeIndex) return 'complete'
    if (index === activeIndex) return 'active'
    return 'upcoming'
  }

  /** Outgoing segment from step `index` → `index + 1` (right of column). Only this one animates. */
  const getOutgoingSegmentProgress = (index: number) => {
    if (index >= steps.length - 1) return 0
    if (index < activeIndex) return 1
    if (index === activeIndex && phase === 'bridge') return bridgeProgress
    return 0
  }

  /** Incoming segment into step `index` (left of column). Static mirror — no duplicate animation. */
  const getIncomingSegmentProgress = (index: number) => {
    if (index === 0) return 0
    if (index <= activeIndex) return 1
    return 0
  }

  /** Steps 02 & 03 (indices 1–2): show a connector on both sides of the node. */
  const hasDualConnectors = (index: number) => index >= 1 && index <= 2

  return (
    <div className="design-process-track overflow-x-auto rounded-2xl bg-[#0c0c10] ring-1 ring-white/[0.08] scroll-smooth [scrollbar-width:thin]">
      <p className="px-4 pt-3 text-[10px] text-slate/60 md:hidden">
        Swipe to explore each step
      </p>
      <div
        className="flex min-w-full snap-x snap-mandatory md:min-w-full"
        role="tablist"
        aria-label="Design process steps"
      >
        {steps.map((step, index) => {
          const isActive = activeIndex === index
          const nodeState = getNodeState(index)

          return (
            <motion.button
              key={step.number}
              type="button"
              role="tab"
              aria-selected={isActive}
              layout
              transition={{
                layout: { duration: LAYOUT_TRANSITION_S, ease: [0.22, 1, 0.36, 1] },
              }}
              onClick={() => selectStep(index)}
              className={`relative flex snap-start flex-col border-r border-white/[0.08] text-left last:border-r-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-accent ${
                isActive
                  ? 'min-w-[min(88vw,28rem)] flex-[0_0_min(88vw,28rem)] cursor-default px-4 py-6 md:min-w-[min(52%,28rem)] md:flex-[2.4] md:px-7 md:py-9'
                  : 'min-w-[4.75rem] flex-[0_0_4.75rem] cursor-pointer px-2 py-6 transition-colors hover:bg-white/[0.03] md:min-w-[5.5rem] md:flex-1 md:px-4 md:py-9'
              }`}
              id={`process-tab-${index}`}
              aria-controls={`process-panel-${index}`}
            >
              <div className="mb-5 flex w-full items-center">
                {hasDualConnectors(index) ? (
                  <ProcessConnector
                    progress={getIncomingSegmentProgress(index)}
                    showTravelingDot={false}
                  />
                ) : (
                  <span className="min-w-0 flex-1" aria-hidden />
                )}

                <ProcessNode
                  number={step.number}
                  state={nodeState}
                  ringProgress={
                    nodeState === 'active' && phase === 'ring'
                      ? ringProgress
                      : nodeState === 'active' && phase === 'bridge'
                        ? 1
                        : nodeState === 'complete'
                          ? 1
                          : 0
                  }
                />

                {index < steps.length - 1 ? (
                  <ProcessConnector
                    progress={getOutgoingSegmentProgress(index)}
                    showTravelingDot={
                      index === activeIndex && phase === 'bridge'
                    }
                  />
                ) : (
                  <span className="min-w-0 flex-1" aria-hidden />
                )}
              </div>

              <div className="flex min-h-0 flex-1 flex-col">
                <h3
                  className={`text-sm font-semibold leading-snug md:text-base ${
                    isActive ? 'text-ink' : 'text-slate/50'
                  }`}
                >
                  {step.title}
                </h3>

                <AnimatePresence mode="wait">
                  {isActive && (
                    <motion.div
                      id={`process-panel-${index}`}
                      key="body"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{
                        duration: PANEL_TRANSITION_S,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="overflow-hidden"
                    >
                      <p className="mt-4 max-w-xl whitespace-pre-line text-sm leading-relaxed text-slate md:mt-5 md:text-[15px] md:leading-relaxed">
                        {step.body}
                      </p>
                      {step.listItems && step.listItems.length > 0 && (
                        <ol className="mt-4 max-w-xl list-decimal space-y-2 pl-5 text-sm leading-relaxed text-slate marker:text-accent md:mt-5 md:text-[15px] md:leading-relaxed">
                          {step.listItems.map((item) => (
                            <li key={item} className="pl-1">
                              {item}
                            </li>
                          ))}
                        </ol>
                      )}
                      {step.image && !artifactsBelowTrack && (
                        <div className="mt-5 flex h-[min(42vw,180px)] w-full items-center justify-center overflow-hidden rounded-lg border border-white/[0.08] bg-white/[0.04] shadow-lg ring-1 ring-white/[0.06] md:h-[242px]">
                          <img
                            src={step.image}
                            alt={step.imageAlt ?? ''}
                            className="max-h-full max-w-full object-contain object-center"
                            loading="lazy"
                            decoding="async"
                          />
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.button>
          )
        })}
      </div>

      {artifactsBelowTrack && steps[activeIndex]?.image && (
        <AnimatePresence mode="wait">
          <motion.figure
            key={steps[activeIndex].number}
            role="tabpanel"
            id={`process-artifact-${activeIndex}`}
            aria-labelledby={`process-tab-${activeIndex}`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: PANEL_TRANSITION_S, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 overflow-hidden rounded-3xl bg-[#f4f4f6] ring-1 ring-white/10 md:mt-10"
          >
            <div className="px-4 py-4 md:px-6 md:py-5">
              <ZoomableImage
                compact
                src={steps[activeIndex].image!}
                alt={steps[activeIndex].imageAlt ?? steps[activeIndex].title}
                className="mt-0"
              />
            </div>
            {(steps[activeIndex].imageCaption ?? steps[activeIndex].imageAlt) && (
              <figcaption className="border-t border-black/[0.06] px-6 py-4 text-center text-sm leading-relaxed text-slate md:text-[15px]">
                {steps[activeIndex].imageCaption ?? steps[activeIndex].imageAlt}
              </figcaption>
            )}
          </motion.figure>
        </AnimatePresence>
      )}
    </div>
  )
}
