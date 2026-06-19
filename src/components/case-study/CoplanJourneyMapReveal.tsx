import { motion, useReducedMotion } from 'framer-motion'
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from 'react'
import { useScaleToFit } from '../../lib/useScaleToFit'

export type JourneyMood = 'happy' | 'neutral' | 'unhappy'

export interface JourneyPhase {
  id: string
  title: string
  tone: 'orange' | 'pink' | 'purple' | 'blue' | 'green'
  actions: readonly string[]
  goals: readonly string[]
  feelings: readonly JourneyMood[]
  painPoints: readonly string[]
  opportunity: string
}

export interface CoplanUserJourneyData {
  phases: readonly JourneyPhase[]
}

interface CoplanJourneyMapRevealProps {
  data: CoplanUserJourneyData
  className?: string
}

const ease = [0.22, 1, 0.36, 1] as const
const PROGRESS_PER_PX = 0.00135
const COMPLETE_THRESHOLD = 0.998
const UNLOCK_EXIT_VH = 45
const JOURNEY_LABEL_COL_REM = 8.75
const JOURNEY_PHASE_COL_REM = 11.5
const JOURNEY_COL_GAP_REM = 0.75

function journeyMapWidthRem(phaseCount: number) {
  return (
    JOURNEY_LABEL_COL_REM +
    phaseCount * JOURNEY_PHASE_COL_REM +
    phaseCount * JOURNEY_COL_GAP_REM
  )
}

interface ExitPinMetrics {
  top: number
  left: number
  width: number
  height: number
  startY: number
  exitPx: number
}

const toneStyles = {
  orange: {
    shell: 'bg-amber-500/[0.08] ring-amber-400/20',
    header: 'bg-amber-500/15 text-amber-200',
    card: 'bg-amber-500/12 ring-amber-400/15 text-amber-100/90',
  },
  pink: {
    shell: 'bg-rose-500/[0.08] ring-rose-400/20',
    header: 'bg-rose-500/15 text-rose-200',
    card: 'bg-rose-500/12 ring-rose-400/15 text-rose-100/90',
  },
  purple: {
    shell: 'bg-violet-500/[0.08] ring-violet-400/20',
    header: 'bg-violet-500/15 text-violet-200',
    card: 'bg-violet-500/12 ring-violet-400/15 text-violet-100/90',
  },
  blue: {
    shell: 'bg-accent/[0.08] ring-accent/20',
    header: 'bg-accent/15 text-violet-200',
    card: 'bg-accent/12 ring-accent/15 text-violet-100/90',
  },
  green: {
    shell: 'bg-emerald-500/[0.08] ring-emerald-400/20',
    header: 'bg-emerald-500/15 text-emerald-200',
    card: 'bg-emerald-500/12 ring-emerald-400/15 text-emerald-100/90',
  },
} as const

function stickyTopPx() {
  if (typeof window === 'undefined') return 112
  return window.matchMedia('(min-width: 768px)').matches ? 112 : 96
}

function useMobileViewport() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)')
    const update = () => setIsMobile(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  return isMobile
}

function phaseRevealAmount(scrollProgress: number, phaseIndex: number, total: number) {
  const segment = 1 / total
  const start = phaseIndex * segment
  const end = (phaseIndex + 1) * segment
  if (scrollProgress <= start) return 0
  if (scrollProgress >= end) return 1
  return (scrollProgress - start) / (end - start)
}

function MoodIcon({ mood }: { mood: JourneyMood }) {
  const label =
    mood === 'happy' ? 'Happy' : mood === 'neutral' ? 'Neutral' : 'Unhappy'

  return (
    <span
      className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/[0.06] text-sm ring-1 ring-white/10"
      title={label}
      aria-label={label}
    >
      {mood === 'happy' ? '👍' : mood === 'neutral' ? '👀' : '👎'}
    </span>
  )
}

function PhaseCell({
  children,
  reveal,
  reduceMotion,
  className = '',
}: {
  children: ReactNode
  reveal: number
  reduceMotion: boolean | null
  className?: string
}) {
  return (
    <motion.div
      className={className}
      initial={false}
      animate={{
        opacity: reveal,
        x: reduceMotion ? 0 : (1 - reveal) * -24,
      }}
      transition={{ duration: reduceMotion ? 0 : 0.42, ease }}
      style={{ pointerEvents: reveal > 0.15 ? 'auto' : 'none' }}
    >
      {children}
    </motion.div>
  )
}

export function CoplanJourneyMapReveal({ data, className = '' }: CoplanJourneyMapRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const pinScrollYRef = useRef<number | null>(null)
  const unlockedRef = useRef(false)
  const progressRef = useRef(0)
  const touchStartYRef = useRef(0)
  const reduceMotion = useReducedMotion()
  const isMobile = useMobileViewport()
  const phaseCount = data.phases.length
  const journeyWidthRem = journeyMapWidthRem(phaseCount)
  const { containerRef: scaleContainerRef, contentRef, metrics } = useScaleToFit([
    data,
    phaseCount,
    journeyWidthRem,
  ])
  const [scrollProgress, setScrollProgress] = useState(reduceMotion ? 1 : 0)
  const [isComplete, setIsComplete] = useState(Boolean(reduceMotion))
  const [exitPin, setExitPin] = useState<ExitPinMetrics | null>(null)
  const [hasReleasedExitPin, setHasReleasedExitPin] = useState(false)

  const setProgress = useCallback((next: number) => {
    const clamped = Math.min(1, Math.max(0, next))
    progressRef.current = clamped
    setScrollProgress(clamped)

    if (clamped >= COMPLETE_THRESHOLD) {
      unlockedRef.current = true
      setIsComplete(true)
    } else {
      unlockedRef.current = false
      setIsComplete(false)
    }
  }, [])

  const isPinned = useCallback(() => {
    const el = containerRef.current
    if (!el) return false

    const rect = el.getBoundingClientRect()
    const top = stickyTopPx()
    return rect.top <= top + 2 && rect.bottom > window.innerHeight * 0.4
  }, [])

  useEffect(() => {
    if (reduceMotion || isMobile) {
      setProgress(1)
      return
    }

    const applyDelta = (delta: number) => {
      setProgress(progressRef.current + delta * PROGRESS_PER_PX)
    }

    const onWheel = (e: WheelEvent) => {
      if (unlockedRef.current) return
      if (!isPinned()) return

      if (pinScrollYRef.current === null) {
        pinScrollYRef.current = window.scrollY
      }

      e.preventDefault()
      applyDelta(e.deltaY)
    }

    const onTouchStart = (e: TouchEvent) => {
      touchStartYRef.current = e.touches[0]?.clientY ?? 0
    }

    const onTouchMove = (e: TouchEvent) => {
      if (unlockedRef.current || !isPinned()) return

      const y = e.touches[0]?.clientY ?? 0
      const dy = touchStartYRef.current - y
      touchStartYRef.current = y

      if (Math.abs(dy) < 2) return

      if (pinScrollYRef.current === null) {
        pinScrollYRef.current = window.scrollY
      }

      e.preventDefault()
      applyDelta(dy * 1.6)
    }

    const onScroll = () => {
      if (unlockedRef.current) return

      const el = containerRef.current
      if (!el) return

      const rect = el.getBoundingClientRect()
      const top = stickyTopPx()

      if (rect.top > top + 8) {
        pinScrollYRef.current = null
        return
      }

      if (!isPinned()) return

      if (pinScrollYRef.current === null) {
        pinScrollYRef.current = window.scrollY
        return
      }

      if (window.scrollY > pinScrollYRef.current + 1) {
        window.scrollTo({ top: pinScrollYRef.current, behavior: 'auto' })
      }
    }

    const onKeyDown = (e: KeyboardEvent) => {
      if (unlockedRef.current || !isPinned()) return

      const scrollKeys = ['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', ' ', 'End']
      if (!scrollKeys.includes(e.key)) return

      e.preventDefault()

      if (pinScrollYRef.current === null) {
        pinScrollYRef.current = window.scrollY
      }

      const step = e.key === 'ArrowUp' || e.key === 'PageUp' ? -120 : 120
      applyDelta(step)
    }

    window.addEventListener('wheel', onWheel, { passive: false })
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchmove', onTouchMove, { passive: false })
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('keydown', onKeyDown)

    return () => {
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [isMobile, isPinned, reduceMotion, setProgress])

  const measureExitPin = useCallback(() => {
    const panel = panelRef.current
    const container = containerRef.current
    if (!panel || !container) return null

    const containerRect = container.getBoundingClientRect()
    return {
      top: stickyTopPx(),
      left: containerRect.left,
      width: containerRect.width,
      height: panel.offsetHeight,
      startY: window.scrollY,
      exitPx: (window.innerHeight * UNLOCK_EXIT_VH) / 100,
    }
  }, [])

  useLayoutEffect(() => {
    if (!isComplete || reduceMotion || hasReleasedExitPin) return
    const metrics = measureExitPin()
    if (metrics) setExitPin(metrics)
  }, [hasReleasedExitPin, isComplete, measureExitPin, reduceMotion])

  useEffect(() => {
    if (!exitPin || reduceMotion) return

    const updateLayout = () => {
      const panel = panelRef.current
      const container = containerRef.current
      if (!panel || !container) return

      const containerRect = container.getBoundingClientRect()
      setExitPin((current) =>
        current
          ? {
              ...current,
              left: containerRect.left,
              width: containerRect.width,
              height: panel.offsetHeight,
            }
          : current,
      )
    }

    const onScroll = () => {
      if (window.scrollY >= exitPin.startY + exitPin.exitPx) {
        setExitPin(null)
        setHasReleasedExitPin(true)
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', updateLayout)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', updateLayout)
    }
  }, [exitPin, reduceMotion])

  const reveals = useMemo(
    () =>
      data.phases.map((_, index) =>
        phaseRevealAmount(scrollProgress, index, phaseCount),
      ),
    [data.phases, scrollProgress, phaseCount],
  )

  const revealedThrough = useMemo(() => {
    if (reduceMotion) return phaseCount
    return Math.min(
      phaseCount,
      Math.max(0, Math.ceil(scrollProgress * phaseCount - 0.001)),
    )
  }, [scrollProgress, phaseCount, reduceMotion])

  const containerHeight = reduceMotion || isMobile
    ? 'auto'
    : exitPin
      ? exitPin.height + exitPin.exitPx
      : hasReleasedExitPin
        ? 'auto'
        : '100vh'

  const panelStyle: CSSProperties | undefined =
    exitPin && !reduceMotion
      ? {
          position: 'fixed',
          top: exitPin.top,
          left: exitPin.left,
          width: exitPin.width,
          zIndex: 20,
        }
      : undefined

  const panelPositionClass = reduceMotion || isMobile
    ? 'relative'
    : exitPin || hasReleasedExitPin
      ? 'relative'
      : 'sticky top-24 md:top-28'

  return (
    <div
      ref={containerRef}
      className={`relative mt-6 ${className}`}
      style={{ height: containerHeight }}
      aria-label="Co-plan user journey map"
    >
      {exitPin && !reduceMotion && (
        <div aria-hidden style={{ height: exitPin.height }} />
      )}
      <div className={panelPositionClass} style={panelStyle}>
        <div
          ref={panelRef}
          className="overflow-hidden rounded-3xl bg-[#141418] ring-1 ring-white/[0.08]"
        >
          <div className="border-b border-white/[0.06] px-5 py-3 sm:px-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              User journey map
            </p>
            {!reduceMotion && !isMobile && (
              <p className="mt-1 text-[11px] text-slate/70">
                {isComplete
                  ? 'All steps revealed — continue scrolling'
                  : `Keep scrolling to reveal each step — ${revealedThrough} of ${phaseCount}`}
              </p>
            )}
          </div>

          <div ref={scaleContainerRef} className="w-full overflow-hidden p-3 sm:p-5">
            <div
              className="relative mx-auto overflow-hidden"
              style={{
                width: metrics.width > 0 ? metrics.width : '100%',
                height: metrics.height > 0 ? metrics.height : undefined,
              }}
            >
              <div
                ref={contentRef}
                className="absolute left-0 top-0 origin-top-left"
                style={{ transform: `scale(${metrics.scale})` }}
              >
                <div className="relative" style={{ width: `${journeyWidthRem}rem` }}>
                  <div
                    className="grid gap-x-2 gap-y-2 md:gap-x-3 md:gap-y-2.5"
                    style={{
                      gridTemplateColumns: `${JOURNEY_LABEL_COL_REM}rem repeat(${phaseCount}, minmax(${JOURNEY_PHASE_COL_REM}rem, 1fr))`,
                    }}
                  >
                <div className="rounded-xl bg-amber-500/[0.07] px-3 py-2 text-[10px] font-semibold text-amber-100/85 ring-1 ring-amber-400/15 md:text-[11px]">
                  User steps
                </div>
                {data.phases.map((phase, index) => {
                  const tone = toneStyles[phase.tone]
                  return (
                    <PhaseCell
                      key={`${phase.id}-title`}
                      reveal={reveals[index] ?? 0}
                      reduceMotion={reduceMotion}
                      className={`rounded-xl px-3 py-2 text-center text-[11px] font-bold uppercase tracking-[0.12em] ring-1 md:text-xs ${tone.header} ${tone.shell}`}
                    >
                      {phase.title}
                    </PhaseCell>
                  )
                })}

                <div className="rounded-xl bg-amber-500/[0.07] px-3 py-2 text-[10px] font-semibold text-amber-100/85 ring-1 ring-amber-400/15 md:text-[11px]">
                  User actions
                </div>
                {data.phases.map((phase, index) => {
                  const tone = toneStyles[phase.tone]
                  return (
                    <PhaseCell
                      key={`${phase.id}-actions`}
                      reveal={reveals[index] ?? 0}
                      reduceMotion={reduceMotion}
                      className={`flex flex-col gap-1.5 rounded-xl p-2 ring-1 ${tone.shell}`}
                    >
                      {phase.actions.map((action) => (
                        <div
                          key={action}
                          className={`rounded-lg px-2.5 py-2 text-[10px] leading-snug ring-1 md:text-[11px] ${tone.card}`}
                        >
                          {action}
                        </div>
                      ))}
                    </PhaseCell>
                  )
                })}

                <div className="rounded-xl bg-amber-500/[0.07] px-3 py-2 text-[10px] font-semibold text-amber-100/85 ring-1 ring-amber-400/15 md:text-[11px]">
                  Goals &amp; experiences
                </div>
                {data.phases.map((phase, index) => (
                  <PhaseCell
                    key={`${phase.id}-goals`}
                    reveal={reveals[index] ?? 0}
                    reduceMotion={reduceMotion}
                    className={`rounded-xl p-2 ring-1 ${toneStyles[phase.tone].shell}`}
                  >
                    <ul className="space-y-1.5 text-[10px] leading-snug text-slate md:text-[11px]">
                      {phase.goals.map((goal) => (
                        <li
                          key={goal}
                          className="rounded-lg bg-white/[0.03] px-2.5 py-2 ring-1 ring-white/[0.05]"
                        >
                          {goal}
                        </li>
                      ))}
                    </ul>
                  </PhaseCell>
                ))}

                <div className="rounded-xl bg-amber-500/[0.07] px-3 py-2 text-[10px] font-semibold leading-snug text-amber-100/85 ring-1 ring-amber-400/15 md:text-[11px]">
                  Feelings and thoughts
                  <span className="mt-1 block text-[9px] font-normal text-slate/60">
                    👍 Happy · 👀 Neutral · 👎 Unhappy
                  </span>
                </div>
                {data.phases.map((phase, index) => (
                  <PhaseCell
                    key={`${phase.id}-feelings`}
                    reveal={reveals[index] ?? 0}
                    reduceMotion={reduceMotion}
                    className={`relative flex min-h-[3.25rem] items-center justify-center gap-2 rounded-xl bg-white/[0.02] p-2 ring-1 ${toneStyles[phase.tone].shell}`}
                  >
                    {phase.feelings.map((mood, moodIndex) => (
                      <MoodIcon key={`${phase.id}-${mood}-${moodIndex}`} mood={mood} />
                    ))}
                  </PhaseCell>
                ))}

                <div className="rounded-xl bg-amber-500/[0.07] px-3 py-2 text-[10px] font-semibold text-amber-100/85 ring-1 ring-amber-400/15 md:text-[11px]">
                  Pain points
                </div>
                {data.phases.map((phase, index) => (
                  <PhaseCell
                    key={`${phase.id}-pain`}
                    reveal={reveals[index] ?? 0}
                    reduceMotion={reduceMotion}
                    className={`rounded-xl p-2 ring-1 ${toneStyles[phase.tone].shell}`}
                  >
                    <ul className="space-y-1.5 text-[10px] leading-snug text-slate md:text-[11px]">
                      {phase.painPoints.map((point) => (
                        <li
                          key={point}
                          className="rounded-lg bg-white/[0.03] px-2.5 py-2 ring-1 ring-white/[0.05]"
                        >
                          {point}
                        </li>
                      ))}
                    </ul>
                  </PhaseCell>
                ))}

                <div className="rounded-xl bg-amber-500/[0.07] px-3 py-2 text-[10px] font-semibold text-amber-100/85 ring-1 ring-amber-400/15 md:text-[11px]">
                  Opportunities
                </div>
                {data.phases.map((phase, index) => (
                  <PhaseCell
                    key={`${phase.id}-opp`}
                    reveal={reveals[index] ?? 0}
                    reduceMotion={reduceMotion}
                    className={`rounded-xl p-2 ring-1 ${toneStyles[phase.tone].shell}`}
                  >
                    <p className="rounded-lg bg-accent/10 px-2.5 py-2 text-[10px] leading-snug text-accent/90 ring-1 ring-accent/20 md:text-[11px]">
                      {phase.opportunity}
                    </p>
                  </PhaseCell>
                ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {!reduceMotion && !isMobile && (
            <div className="border-t border-white/[0.06] px-5 py-3 sm:px-6">
              <div className="h-1 overflow-hidden rounded-full bg-white/[0.06]">
                <motion.div
                  className="h-full rounded-full bg-accent"
                  initial={false}
                  animate={{ width: `${scrollProgress * 100}%` }}
                  transition={{ duration: 0.15, ease: 'linear' }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
