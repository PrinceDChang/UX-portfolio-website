import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import { createPortal } from 'react-dom'

const HOVER_ZOOM_DELAY_MS = 300
const flowEase = [0.22, 1, 0.36, 1] as const
const FLOW_ANIM_SPEED = 1.625
const FLOW_SEGMENT_STAGGER = 0.22 / FLOW_ANIM_SPEED
const FLOW_SEGMENT_DURATION = 0.45 / FLOW_ANIM_SPEED
const FLOW_ROW_DELAY = 0.15 / FLOW_ANIM_SPEED
const LAYER_FADE_DURATION = 0.55 / FLOW_ANIM_SPEED
const LAYER_GAP = 0.45 / FLOW_ANIM_SPEED
const FLOW_ARROW_LINE_DURATION = 0.32 / FLOW_ANIM_SPEED
const FLOW_ARROW_LINE_DELAY = 0.05 / FLOW_ANIM_SPEED
const FLOW_ARROW_HEAD_DURATION = 0.22 / FLOW_ANIM_SPEED
const FLOW_ARROW_HEAD_DELAY = 0.28 / FLOW_ANIM_SPEED
const LAYER_CONNECTOR_LEAD = 0.2 / FLOW_ANIM_SPEED

const STEP_CARD_CLASS =
  'flex shrink-0 flex-col rounded-2xl border border-white/[0.12] bg-[#16161e] ring-1 ring-white/[0.08]'

const HOVER_PANEL_SHADOW =
  'shadow-[0_24px_60px_rgba(0,0,0,0.72)] ring-2 ring-accent/45'

const flowRowVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: FLOW_SEGMENT_STAGGER,
      delayChildren: FLOW_ROW_DELAY,
    },
  },
}

const flowSegmentVariants = {
  hidden: { opacity: 0, x: -18 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: FLOW_SEGMENT_DURATION, ease: flowEase },
  },
}

const flowArrowLineVariants = {
  hidden: { scaleX: 0, opacity: 0.25 },
  visible: {
    scaleX: 1,
    opacity: 1,
    transition: {
      duration: FLOW_ARROW_LINE_DURATION,
      ease: flowEase,
      delay: FLOW_ARROW_LINE_DELAY,
    },
  },
}

function flowRevealEndDelay(stepCount: number) {
  const segmentCount = 1 + stepCount * 2
  return (
    FLOW_ROW_DELAY +
    segmentCount * FLOW_SEGMENT_STAGGER +
    FLOW_SEGMENT_DURATION * 0.65
  )
}

export type SmartBudgetingFlowTone =
  | 'sky'
  | 'emerald'
  | 'teal'
  | 'violet'
  | 'cyan'
  | 'indigo'
  | 'amber'

export interface SmartBudgetingFlowStep {
  icon: string
  tone: SmartBudgetingFlowTone
  title: string
  bullets: readonly string[]
}

export interface SmartBudgetingFlowBackendItem {
  icon: string
  label: string
}

export interface SmartBudgetingFlowData {
  title: string
  subtitle: string
  entryLabel: string
  steps: readonly SmartBudgetingFlowStep[]
  crossCutting: {
    label: string
    startStep: number
    endStep: number
    items: readonly SmartBudgetingFlowBackendItem[]
  }
  backend: {
    label: string
    connectsToStep: number
    items: readonly SmartBudgetingFlowBackendItem[]
  }
}

interface SmartBudgetingFlowRevealProps {
  data: SmartBudgetingFlowData
  className?: string
}

const STEP_W = '8.75rem'
const ARROW_W = '1.75rem'
const ENTRY_W = '5.75rem'

const toneRing: Record<SmartBudgetingFlowTone, string> = {
  sky: 'bg-accent/90 ring-accent/40',
  emerald: 'bg-emerald-500/90 ring-emerald-300/40',
  teal: 'bg-accent/85 ring-accent/35',
  violet: 'bg-violet-500/90 ring-violet-300/40',
  cyan: 'bg-accent/88 ring-accent/38',
  indigo: 'bg-violet-500/90 ring-violet-300/40',
  amber: 'bg-amber-400/95 text-[#1a1208] ring-amber-200/50',
}

function FlowArrow({ animated = false }: { animated?: boolean }) {
  const line = animated ? (
    <motion.div
      className="h-px w-full bg-white/20"
      variants={flowArrowLineVariants}
      style={{ transformOrigin: 'left center' }}
    />
  ) : (
    <div className="h-px w-full bg-white/20" />
  )

  const head = animated ? (
    <motion.span
      className="size-0 border-y-[4px] border-l-[6px] border-y-transparent border-l-white/35"
      variants={{
        hidden: { opacity: 0, x: -4 },
        visible: {
          opacity: 1,
          x: 0,
          transition: {
            duration: FLOW_ARROW_HEAD_DURATION,
            ease: flowEase,
            delay: FLOW_ARROW_HEAD_DELAY,
          },
        },
      }}
    />
  ) : (
    <span className="size-0 border-y-[4px] border-l-[6px] border-y-transparent border-l-white/35" />
  )

  const shell = (
    <div
      className="flex shrink-0 items-center self-start pt-10"
      style={{ width: ARROW_W }}
      aria-hidden
    >
      {line}
      {head}
    </div>
  )

  if (!animated) return shell

  return (
    <motion.div variants={flowSegmentVariants} className="shrink-0 self-start">
      {shell}
    </motion.div>
  )
}

function HoverZoomCell({
  children,
  zoomContent,
  reduceMotion,
  className = '',
  zoomClassName = '',
  style,
}: {
  children: ReactNode
  zoomContent: ReactNode
  reduceMotion: boolean | null
  className?: string
  zoomClassName?: string
  style?: CSSProperties
}) {
  const anchorRef = useRef<HTMLDivElement>(null)
  const zoomRef = useRef<HTMLDivElement>(null)
  const timerRef = useRef<number>()
  const closeTimerRef = useRef<number>()
  const [isPending, setIsPending] = useState(false)
  const [isZoomed, setIsZoomed] = useState(false)
  const [anchorRect, setAnchorRect] = useState<DOMRect | null>(null)

  const clearTimers = () => {
    window.clearTimeout(timerRef.current)
    window.clearTimeout(closeTimerRef.current)
  }

  const openZoom = () => {
    const rect = anchorRef.current?.getBoundingClientRect()
    if (!rect) return
    setAnchorRect(rect)
    setIsZoomed(true)
    setIsPending(false)
  }

  const scheduleClose = () => {
    window.clearTimeout(closeTimerRef.current)
    closeTimerRef.current = window.setTimeout(() => {
      const overAnchor = anchorRef.current?.matches(':hover')
      const overZoom = zoomRef.current?.matches(':hover')
      if (!overAnchor && !overZoom) {
        setIsZoomed(false)
        setIsPending(false)
      }
    }, 80)
  }

  const handleEnter = () => {
    if (reduceMotion) return
    window.clearTimeout(closeTimerRef.current)
    setIsPending(true)
    timerRef.current = window.setTimeout(openZoom, HOVER_ZOOM_DELAY_MS)
  }

  const handleLeave = () => {
    window.clearTimeout(timerRef.current)
    if (!isZoomed) setIsPending(false)
    scheduleClose()
  }

  useLayoutEffect(() => () => clearTimers(), [])

  const zoomTop = anchorRect
    ? Math.min(
        Math.max(anchorRect.top - 12, 16),
        window.innerHeight - (anchorRect.height * 1.6 + 32),
      )
    : 0
  const zoomLeft = anchorRect
    ? Math.min(
        Math.max(anchorRect.left + anchorRect.width / 2, 160),
        window.innerWidth - 160,
      )
    : 0

  return (
    <>
      <div
        ref={anchorRef}
        className={`relative ${className}`}
        style={style}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        onFocus={handleEnter}
        onBlur={handleLeave}
      >
        {children}
        {isPending && !isZoomed && (
          <motion.span
            className="pointer-events-none absolute inset-x-0 bottom-0 h-0.5 rounded-full bg-accent"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: HOVER_ZOOM_DELAY_MS / 1000, ease: 'linear' }}
            style={{ transformOrigin: 'left center' }}
            aria-hidden
          />
        )}
      </div>

      {typeof document !== 'undefined' &&
        createPortal(
          <AnimatePresence>
            {isZoomed && anchorRect && (
              <motion.div
                ref={zoomRef}
                className={`fixed z-[220] -translate-x-1/2 -translate-y-full ${zoomClassName}`}
                style={{ top: zoomTop, left: zoomLeft }}
                initial={{ opacity: 0, scale: 0.96, y: 6 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98, y: 4 }}
                transition={{ duration: 0.14, ease: flowEase }}
                onMouseEnter={() => window.clearTimeout(closeTimerRef.current)}
                onMouseLeave={handleLeave}
              >
                {zoomContent}
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </>
  )
}

function StepCardContent({
  step,
  index,
  zoom = false,
}: {
  step: SmartBudgetingFlowStep
  index: number
  zoom?: boolean
}) {
  const numberClass =
    step.tone === 'amber'
      ? `${toneRing[step.tone]} text-[#1a1208]`
      : `${toneRing[step.tone]} text-white`

  return (
    <>
      <div className="flex justify-center">
        <span
          className={`flex items-center justify-center rounded-full font-bold ring-2 ${numberClass} ${
            zoom ? 'h-12 w-12 text-base' : 'h-9 w-9 text-sm'
          }`}
        >
          {index + 1}
        </span>
      </div>
      <h4
        className={`mt-3 text-center font-bold leading-snug text-ink ${
          zoom ? 'text-base' : 'text-[11px] md:text-xs'
        }`}
      >
        {step.title}
      </h4>
      <div
        className={`mt-3 flex justify-center leading-none ${zoom ? 'text-4xl' : 'text-2xl'}`}
        aria-hidden
      >
        {step.icon}
      </div>
      <ul
        className={`mt-3 space-y-2 ${zoom ? 'text-sm leading-relaxed' : 'space-y-1.5 text-[10px] leading-snug'} text-slate`}
      >
        {step.bullets.map((bullet) => (
          <li key={bullet} className="flex gap-2">
            <span
              className={`mt-2 shrink-0 rounded-full bg-accent/70 ${zoom ? 'h-1.5 w-1.5' : 'mt-1.5 h-1 w-1'}`}
              aria-hidden
            />
            <span>{bullet}</span>
          </li>
        ))}
      </ul>
    </>
  )
}

function StepCard({
  step,
  index,
  reduceMotion,
}: {
  step: SmartBudgetingFlowStep
  index: number
  reduceMotion: boolean | null
}) {
  const cardClass = STEP_CARD_CLASS

  return (
    <HoverZoomCell
      reduceMotion={reduceMotion}
      zoomClassName="w-[min(18rem,calc(100vw-2rem))]"
      zoomContent={
        <article className={`${cardClass} px-5 pb-5 pt-4 ${HOVER_PANEL_SHADOW}`}>
          <StepCardContent step={step} index={index} zoom />
        </article>
      }
    >
      <article
        className={`${cardClass} px-3 pb-4 pt-3 transition-[background-color,box-shadow,ring-color] duration-200 hover:bg-[#1c1c2a] hover:ring-accent/30`}
        style={{ width: STEP_W }}
      >
        <StepCardContent step={step} index={index} />
      </article>
    </HoverZoomCell>
  )
}

function LayerConnectors({
  sourceCount,
  targetX,
  height = 28,
  className = '',
}: {
  sourceCount: number
  targetX: number
  height?: number
  className?: string
}) {
  return (
    <svg
      viewBox={`0 0 100 ${height}`}
      preserveAspectRatio="none"
      className={`h-7 w-full ${className}`}
      aria-hidden
    >
      {Array.from({ length: sourceCount }, (_, index) => {
        const sourceX = ((index + 0.5) / sourceCount) * 100
        return (
          <path
            key={index}
            d={`M ${sourceX} ${height} L ${targetX} 0`}
            fill="none"
            stroke="rgba(153,112,255,0.28)"
            strokeWidth="0.4"
            strokeDasharray="1.6 1.6"
            vectorEffect="non-scaling-stroke"
          />
        )
      })}
    </svg>
  )
}

function useScaleToFit(deps: unknown[]) {
  const containerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [metrics, setMetrics] = useState({ scale: 1, width: 0, height: 0 })

  useLayoutEffect(() => {
    const container = containerRef.current
    const content = contentRef.current
    if (!container || !content) return

    const update = () => {
      const styles = getComputedStyle(container)
      const paddingX =
        parseFloat(styles.paddingLeft) + parseFloat(styles.paddingRight)
      const availableWidth = container.clientWidth - paddingX
      if (availableWidth <= 0) return

      const previousTransform = content.style.transform
      content.style.transform = 'none'

      const contentWidth = content.scrollWidth
      const contentHeight = content.scrollHeight

      content.style.transform = previousTransform

      if (contentWidth === 0 || contentHeight === 0) return

      const scale = Math.min(1, availableWidth / contentWidth)
      setMetrics({
        scale,
        width: contentWidth * scale,
        height: contentHeight * scale,
      })
    }

    update()
    const observer = new ResizeObserver(update)
    observer.observe(container)
    observer.observe(content)
    return () => observer.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return { containerRef, contentRef, metrics }
}

function FlowLayerChip({
  icon,
  label,
  tone,
  reduceMotion,
}: {
  icon: string
  label: string
  tone: 'amber' | 'accent'
  reduceMotion: boolean | null
}) {
  const chipClass =
    tone === 'amber'
      ? 'border-amber-400/25 bg-[#1c1810] text-amber-50'
      : 'border-accent/30 bg-[#16161e] text-slate'

  const chipHoverClass =
    tone === 'amber'
      ? 'hover:bg-[#221c12] hover:ring-amber-400/35'
      : 'hover:bg-[#1c1c2a] hover:ring-accent/35'

  const chipBody = (zoom: boolean) => (
    <>
      <span
        className={`shrink-0 leading-none ${zoom ? 'text-xl' : 'text-[10px]'}`}
        aria-hidden
      >
        {icon}
      </span>
      <span
        className={`font-medium leading-snug ${
          zoom ? 'text-sm' : 'whitespace-nowrap text-[9px] leading-none'
        }`}
      >
        {label}
      </span>
    </>
  )

  return (
    <li className="list-none">
      <HoverZoomCell
        reduceMotion={reduceMotion}
        className="inline-flex"
        zoomContent={
          <div
            className={`inline-flex max-w-[min(20rem,calc(100vw-2rem))] items-start gap-2 rounded-xl border px-4 py-3 ${HOVER_PANEL_SHADOW} ${chipClass}`}
          >
            {chipBody(true)}
          </div>
        }
      >
        <span
          className={`inline-flex w-fit shrink-0 cursor-default items-center gap-1 rounded-md border px-2 py-1 transition-[background-color,box-shadow,ring-color] duration-200 hover:ring-1 ${chipClass} ${chipHoverClass}`}
        >
          {chipBody(false)}
        </span>
      </HoverZoomCell>
    </li>
  )
}

export function SmartBudgetingFlowReveal({
  data,
  className = '',
}: SmartBudgetingFlowRevealProps) {
  const reduceMotion = useReducedMotion()
  const { containerRef, contentRef, metrics } = useScaleToFit([data])
  const animateFlow = !reduceMotion
  const flowEndDelay = flowRevealEndDelay(data.steps.length)
  const crossCuttingDelay = flowEndDelay
  const knowledgeDelay = crossCuttingDelay + LAYER_FADE_DURATION + LAYER_GAP

  const knowledgeTargetX =
    ((data.backend.connectsToStep + 0.5) / data.steps.length) * 100
  const crossCuttingTargetX = 50

  const layerReveal = animateFlow
    ? {
        initial: { opacity: 0, y: 22 } as const,
        whileInView: { opacity: 1, y: 0 } as const,
        viewport: { once: true, margin: '-40px' } as const,
      }
    : {}

  return (
    <div
      className={`overflow-hidden rounded-3xl bg-[#141418] ring-1 ring-white/[0.08] ${className}`}
    >
      <div className="border-b border-white/[0.06] px-6 py-5 text-center md:px-8 md:py-6">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
          End-to-end flow
        </p>
        <h3 className="mt-2 font-display text-xl uppercase leading-tight tracking-wide text-ink md:text-2xl">
          {data.title}
        </h3>
        <p className="mx-auto mt-2 max-w-3xl text-sm leading-relaxed text-slate md:text-[15px]">
          {data.subtitle}
        </p>
      </div>

      <div ref={containerRef} className="w-full overflow-hidden px-2 py-5 md:px-4 md:py-6">
        <div
          className="relative overflow-hidden"
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
          <div className="inline-flex w-max flex-col items-stretch">
          <motion.div
            className="flex items-start"
            variants={animateFlow ? flowRowVariants : undefined}
            initial={animateFlow ? 'hidden' : false}
            whileInView={animateFlow ? 'visible' : undefined}
            viewport={{ once: true, margin: '-60px' }}
          >
            <motion.div variants={animateFlow ? flowSegmentVariants : undefined} className="shrink-0">
            <HoverZoomCell
              reduceMotion={reduceMotion}
              className="shrink-0 self-start"
              style={{ width: ENTRY_W }}
              zoomContent={
                <div className={`flex w-[min(14rem,calc(100vw-2rem))] flex-col items-center rounded-2xl border border-white/[0.12] bg-[#16161e] px-6 py-5 text-center ${HOVER_PANEL_SHADOW}`}>
                  <span
                    className="flex h-14 w-14 items-center justify-center rounded-full border border-white/[0.12] bg-white/[0.05] text-3xl"
                    aria-hidden
                  >
                    👤
                  </span>
                  <p className="mt-3 text-sm font-medium leading-relaxed text-slate">
                    {data.entryLabel}
                  </p>
                </div>
              }
            >
            <div
              className="flex shrink-0 flex-col items-center self-start rounded-2xl border border-transparent bg-[#16161e]/0 pt-6 text-center transition-[background-color,box-shadow] duration-200 hover:border-white/[0.1] hover:bg-[#16161e] hover:shadow-[0_0_20px_rgba(153,112,255,0.2)]"
              style={{ width: ENTRY_W }}
            >
              <span
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/[0.12] bg-white/[0.05] text-xl"
                aria-hidden
              >
                👤
              </span>
              <p className="mt-2 text-[10px] font-medium leading-snug text-slate">
                {data.entryLabel}
              </p>
            </div>
            </HoverZoomCell>
            </motion.div>

            <FlowArrow animated={animateFlow} />

            {data.steps.flatMap((step, index) => [
              <motion.div
                key={step.title}
                variants={animateFlow ? flowSegmentVariants : undefined}
                className="shrink-0"
              >
                <StepCard step={step} index={index} reduceMotion={reduceMotion} />
              </motion.div>,
              ...(index < data.steps.length - 1
                ? [
                    <FlowArrow
                      key={`${step.title}-arrow`}
                      animated={animateFlow}
                    />,
                  ]
                : []),
            ])}
          </motion.div>

          <motion.div
            className="mt-3 w-full"
            {...layerReveal}
            transition={
              animateFlow
                ? { duration: LAYER_FADE_DURATION, delay: crossCuttingDelay, ease: flowEase }
                : undefined
            }
          >
            <div className="w-full rounded-2xl border border-amber-400/20 bg-amber-500/[0.08] px-2 py-2.5 ring-1 ring-amber-400/10 md:px-3 md:py-3">
              <p className="text-center text-[9px] font-semibold uppercase tracking-[0.12em] text-amber-100/90">
                {data.crossCutting.label}
              </p>
              <ul className="mt-2 flex flex-wrap justify-center gap-x-1.5 gap-y-1">
                {data.crossCutting.items.map((item) => (
                  <FlowLayerChip
                    key={item.label}
                    icon={item.icon}
                    label={item.label}
                    tone="amber"
                    reduceMotion={reduceMotion}
                  />
                ))}
              </ul>
            </div>
          </motion.div>

          <motion.div
            className="relative mt-2 px-2"
            {...layerReveal}
            transition={
              animateFlow
                ? {
                    duration: LAYER_FADE_DURATION * 0.85,
                    delay: knowledgeDelay - LAYER_CONNECTOR_LEAD,
                    ease: flowEase,
                  }
                : undefined
            }
          >
            <LayerConnectors
              sourceCount={data.backend.items.length}
              targetX={knowledgeTargetX}
              height={32}
            />
            <LayerConnectors
              sourceCount={data.backend.items.length}
              targetX={crossCuttingTargetX}
              height={32}
              className="absolute inset-x-2 top-0 opacity-45"
            />
          </motion.div>

          <motion.div
            className="mt-1 w-full rounded-2xl border border-accent/25 bg-accent/[0.08] px-2 py-2.5 ring-1 ring-accent/15 md:px-3 md:py-3"
            {...layerReveal}
            transition={
              animateFlow
                ? { duration: LAYER_FADE_DURATION, delay: knowledgeDelay, ease: flowEase }
                : undefined
            }
          >
            <p className="text-center text-[9px] font-semibold uppercase tracking-[0.12em] text-accent">
              {data.backend.label}
            </p>
            <ul className="mt-2 flex flex-wrap justify-center gap-x-1.5 gap-y-1">
              {data.backend.items.map((item) => (
                <FlowLayerChip
                  key={item.label}
                  icon={item.icon}
                  label={item.label}
                  tone="accent"
                  reduceMotion={reduceMotion}
                />
              ))}
            </ul>
          </motion.div>
          </div>
          </div>
        </div>
      </div>
    </div>
  )
}
