import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useRef, type ReactNode } from 'react'

export interface ProcessFlowBranch {
  question: string
  yesPath: readonly string[]
  noLabel: string
  tail: string
}

export interface ProcessComparisonRow {
  phase: string
  phaseLabel: string
  beforeSteps: readonly string[]
  bridge: { badge: string; detail: string }
  afterTitle?: string
  afterBullets?: readonly string[]
  afterSteps?: readonly string[]
  beforeFlow?: ProcessFlowBranch
  afterFlow?: ProcessFlowBranch
  impact: string
}

export interface ProcessImpactMetric {
  value: string
  label: string
}

export interface ProcessComparisonData {
  eyebrow: string
  title: string
  caption: string
  beforeColumnLabel: string
  afterColumnLabel: string
  rows: readonly ProcessComparisonRow[]
  backend: {
    label: string
    note: string
    sources: readonly string[]
  }
  impactMetrics?: readonly ProcessImpactMetric[]
}

interface BeforeAfterProcessRevealProps {
  data: ProcessComparisonData
  className?: string
}

const ROW_GAP_S = 2.4
const STEP_STAGGER_S = 0.1

function stepDelay(rowIndex: number, stepIndex: number, reducedMotion: boolean) {
  if (reducedMotion) return 0
  return rowIndex * ROW_GAP_S + stepIndex * STEP_STAGGER_S
}

function bridgeDelay(rowIndex: number, stepCount: number, reducedMotion: boolean) {
  if (reducedMotion) return 0
  return rowIndex * ROW_GAP_S + stepCount * STEP_STAGGER_S + 0.35
}

function afterDelay(rowIndex: number, stepCount: number, reducedMotion: boolean) {
  if (reducedMotion) return 0
  return bridgeDelay(rowIndex, stepCount, reducedMotion) + 0.55
}

function impactDelay(rowIndex: number, stepCount: number, reducedMotion: boolean) {
  if (reducedMotion) return 0
  return afterDelay(rowIndex, stepCount, reducedMotion) + 0.45
}

function StepCard({
  children,
  tone = 'before',
  className = '',
}: {
  children: ReactNode
  tone?: 'before' | 'after' | 'question'
  className?: string
}) {
  const toneClass =
    tone === 'after'
      ? 'border-accent/35 bg-accent/10 text-ink'
      : tone === 'question'
        ? 'border-white/10 bg-white/[0.04] font-medium text-ink'
        : 'border-white/10 bg-white/[0.03] text-slate'

  return (
    <div
      className={`rounded-xl border px-3 py-2.5 text-xs leading-snug md:px-4 md:py-3 md:text-sm ${toneClass} ${className}`}
    >
      {children}
    </div>
  )
}

function FlowDiagram({
  flow,
  tone,
}: {
  flow: ProcessFlowBranch
  tone: 'before' | 'after'
}) {
  return (
    <div className="space-y-2">
      <StepCard tone="question">{flow.question}</StepCard>
      <div className="grid gap-2 sm:grid-cols-2">
        <div className="space-y-2">
          <span className="inline-block rounded-md bg-amber-500/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-amber-200/90">
            Yes
          </span>
          {flow.yesPath.map((step) => (
            <StepCard key={step} tone={tone}>
              {step}
            </StepCard>
          ))}
        </div>
        <div className="space-y-2">
          <span className="inline-block rounded-md bg-emerald-500/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-200/90">
            No
          </span>
          <StepCard tone={tone}>{flow.noLabel}</StepCard>
        </div>
      </div>
      <div className="flex justify-center text-slate/40" aria-hidden>
        ↓
      </div>
      <StepCard tone={tone}>{flow.tail}</StepCard>
    </div>
  )
}

function ProcessBridge({
  badge,
  detail,
  show,
  delay,
}: {
  badge: string
  detail: string
  show: boolean
  delay: number
}) {
  const reducedMotion = useReducedMotion()
  const pulseDelay = delay + 0.6

  return (
    <motion.div
      className="flex w-full flex-col items-center justify-center gap-2 py-4 lg:py-0"
      initial={{ opacity: 0, scale: 0.92 }}
      animate={show ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.92 }}
      transition={{ duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] }}
      aria-hidden
    >
      <motion.svg
        className="hidden h-5 w-full text-accent md:block"
        viewBox="0 0 112 20"
        fill="none"
        aria-hidden
        initial={{ opacity: 0, scaleX: 0 }}
        animate={show ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0 }}
        transition={{ duration: 0.55, delay: delay + 0.05, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformOrigin: 'left center' }}
      >
        <motion.g
          animate={
            show && !reducedMotion
              ? { x: [0, 5, 0], opacity: [1, 0.55, 1] }
              : { x: 0, opacity: 1 }
          }
          transition={{
            duration: 1.8,
            repeat: show && !reducedMotion ? Infinity : 0,
            ease: 'easeInOut',
            delay: show && !reducedMotion ? pulseDelay : 0,
          }}
        >
          <path
            d="M2 10 H94 M88 5 L96 10 L88 15"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
          />
        </motion.g>
      </motion.svg>
      <motion.svg
        className="h-10 w-5 text-accent md:hidden"
        viewBox="0 0 20 56"
        fill="none"
        aria-hidden
        initial={{ opacity: 0, scaleY: 0 }}
        animate={show ? { opacity: 1, scaleY: 1 } : { opacity: 0, scaleY: 0 }}
        transition={{ duration: 0.55, delay: delay + 0.05, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformOrigin: 'top center' }}
      >
        <motion.g
          animate={
            show && !reducedMotion
              ? { y: [0, 5, 0], opacity: [1, 0.55, 1] }
              : { y: 0, opacity: 1 }
          }
          transition={{
            duration: 1.8,
            repeat: show && !reducedMotion ? Infinity : 0,
            ease: 'easeInOut',
            delay: show && !reducedMotion ? pulseDelay : 0,
          }}
        >
          <path
            d="M10 2 V44 M5 38 L10 48 L15 38"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
          />
        </motion.g>
      </motion.svg>
      <motion.span
        className="rounded-full bg-accent/25 px-3 py-1 text-center text-[10px] font-bold uppercase tracking-[0.14em] text-ink ring-1 ring-accent/40 md:text-[11px]"
        initial={{ y: 6, opacity: 0 }}
        animate={show ? { y: 0, opacity: 1 } : { y: 6, opacity: 0 }}
        transition={{ duration: 0.35, delay: delay + 0.15 }}
      >
        {badge}
      </motion.span>
      <span className="text-center text-[11px] font-semibold text-accent/80 md:text-xs">
        {detail}
      </span>
    </motion.div>
  )
}

function ImpactBanner({
  text,
  show,
  delay,
}: {
  text: string
  show: boolean
  delay: number
}) {
  return (
    <motion.div
      className="mt-3 rounded-xl bg-accent/20 px-4 py-3 text-xs leading-relaxed text-ink ring-1 ring-accent/35 md:text-sm"
      initial={{ opacity: 0, y: 10 }}
      animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {text}
    </motion.div>
  )
}

const PROCESS_GRID =
  'grid grid-cols-1 gap-x-5 gap-y-4 lg:grid-cols-[minmax(0,1fr)_9rem_minmax(0,1fr)]'

const ROW_IN_VIEW = { once: true, amount: 0.55, margin: '0px 0px -12% 0px' } as const

function ProcessRow({
  row,
  rowIndex,
  reducedMotion,
}: {
  row: ProcessComparisonRow
  rowIndex: number
  reducedMotion: boolean
}) {
  const rowRef = useRef<HTMLDivElement>(null)
  const rowInView = useInView(rowRef, ROW_IN_VIEW)
  const active = rowInView || reducedMotion

  const stepCount = row.beforeFlow
    ? 3
    : Math.max(row.beforeSteps.length, 1)
  const bridgeAt = bridgeDelay(0, stepCount, reducedMotion)
  const afterAt = afterDelay(0, stepCount, reducedMotion)
  const impactAt = impactDelay(0, stepCount, reducedMotion)

  return (
    <div
      ref={rowRef}
      className={`col-span-full grid grid-cols-1 gap-x-5 gap-y-4 lg:grid-cols-[minmax(0,1fr)_9rem_minmax(0,1fr)] ${
        rowIndex > 0 ? 'border-t border-white/[0.06] pt-6 md:pt-8' : 'pt-2'
      }`}
    >
      <div className="col-span-full flex items-center gap-3">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/25 text-sm font-bold text-ink ring-1 ring-accent/40">
          {row.phase}
        </span>
        <h4 className="font-display text-sm uppercase tracking-[0.18em] text-ink md:text-base">
          {row.phaseLabel}
        </h4>
      </div>

      <div className="min-w-0">
        <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-slate/50 lg:sr-only">
          Before
        </p>
        {row.beforeFlow ? (
          <motion.div
            initial={{ opacity: 0, x: -14 }}
            animate={active ? { opacity: 1, x: 0 } : { opacity: 0, x: -14 }}
            transition={{
              duration: 0.45,
              delay: stepDelay(0, 0, reducedMotion),
            }}
          >
            <FlowDiagram flow={row.beforeFlow} tone="before" />
          </motion.div>
        ) : (
          <ul className="space-y-2">
            {row.beforeSteps.map((step, stepIndex) => (
              <motion.li
                key={step}
                initial={{ opacity: 0, x: -14 }}
                animate={active ? { opacity: 1, x: 0 } : { opacity: 0, x: -14 }}
                transition={{
                  duration: 0.4,
                  delay: stepDelay(0, stepIndex, reducedMotion),
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <StepCard>{step}</StepCard>
              </motion.li>
            ))}
          </ul>
        )}
      </div>

      <ProcessBridge
        badge={row.bridge.badge}
        detail={row.bridge.detail}
        show={active}
        delay={bridgeAt}
      />

      <div className="min-w-0">
        <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-accent lg:sr-only">
          After
        </p>
        <motion.div
          initial={{ opacity: 0, x: 18 }}
          animate={active ? { opacity: 1, x: 0 } : { opacity: 0, x: 18 }}
          transition={{ duration: 0.5, delay: afterAt, ease: [0.22, 1, 0.36, 1] }}
        >
          {row.afterFlow ? (
            <FlowDiagram flow={row.afterFlow} tone="after" />
          ) : row.afterTitle ? (
            <StepCard tone="after">
              <p className="font-semibold">{row.afterTitle}</p>
              {row.afterBullets && (
                <ul className="mt-2 space-y-1.5 text-slate">
                  {row.afterBullets.map((bullet) => (
                    <li key={bullet} className="flex gap-2">
                      <span className="text-accent" aria-hidden>
                        ·
                      </span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              )}
            </StepCard>
          ) : (
            row.afterSteps && (
              <ul className="space-y-2">
                {row.afterSteps.map((step) => (
                  <li key={step}>
                    <StepCard tone="after">{step}</StepCard>
                  </li>
                ))}
              </ul>
            )
          )}
          <ImpactBanner text={row.impact} show={active} delay={impactAt} />
        </motion.div>
      </div>
    </div>
  )
}

function BackendPanel({
  data,
  reducedMotion,
}: {
  data: ProcessComparisonData['backend']
  reducedMotion: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.45, margin: '0px 0px -10% 0px' })
  const active = inView || reducedMotion

  return (
    <motion.div
      ref={ref}
      className="mt-8 rounded-2xl border border-accent/25 bg-accent/5 p-4 md:p-5"
      initial={{ opacity: 0, y: 16 }}
      animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
      transition={{ duration: 0.55, delay: reducedMotion ? 0 : 0.2, ease: [0.22, 1, 0.36, 1] }}
    >
      <p className="text-center text-[10px] font-semibold uppercase tracking-[0.18em] text-accent">
        ↑ {data.note} ↑
      </p>
      <p className="mt-2 text-center text-xs font-bold uppercase tracking-[0.16em] text-ink md:text-sm">
        {data.label}
      </p>
      <ul className="mt-4 flex flex-wrap justify-center gap-2">
        {data.sources.map((source) => (
          <li
            key={source}
            className="rounded-lg border border-accent/25 bg-accent/10 px-3 py-1.5 text-xs font-medium text-slate"
          >
            {source}
          </li>
        ))}
      </ul>
    </motion.div>
  )
}

function ImpactMetricsGrid({
  metrics,
  reducedMotion,
}: {
  metrics: readonly ProcessImpactMetric[]
  reducedMotion: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, {
    once: true,
    amount: 0.35,
    margin: '0px 0px -10% 0px',
  })
  const active = inView || reducedMotion

  return (
    <div
      ref={ref}
      className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6"
    >
      {metrics.map((metric, index) => (
        <motion.div
          key={metric.label}
          className="rounded-2xl bg-elevated px-5 py-6 text-center ring-1 ring-accent/30 md:px-6 md:py-8"
          initial={{ opacity: 0, y: 18 }}
          animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
          transition={{
            duration: reducedMotion ? 0 : 0.77,
            delay: reducedMotion ? 0 : index * 0.14,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <p className="font-condensed text-4xl uppercase tracking-wide text-accent md:text-5xl">
            {metric.value}
          </p>
          <p className="mt-2 text-sm leading-snug text-slate">{metric.label}</p>
        </motion.div>
      ))}
    </div>
  )
}

export function BeforeAfterProcessReveal({
  data,
  className = '',
}: BeforeAfterProcessRevealProps) {
  const diagramRef = useRef<HTMLDivElement>(null)
  const diagramInView = useInView(diagramRef, {
    once: true,
    amount: 0.2,
    margin: '0px 0px -15% 0px',
  })
  const reducedMotion = useReducedMotion()
  const showDiagram = diagramInView || Boolean(reducedMotion)

  return (
    <div className={className}>
    <figure
      className="overflow-hidden rounded-3xl bg-[#141418] ring-1 ring-accent/30"
      aria-label={`${data.title} — before and after process comparison`}
    >
      <div className="border-b border-white/[0.06] px-6 py-5 md:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
          {data.eyebrow}
        </p>
        <h3 className="mt-2 font-display text-xl uppercase tracking-wide text-ink md:text-2xl">
          {data.title}
        </h3>
      </div>

      <div ref={diagramRef} className="px-4 py-5 md:px-8 md:py-6">
        <motion.div
          className={PROCESS_GRID}
          initial={{ opacity: 0 }}
          animate={showDiagram ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="mb-2 hidden self-end text-xs font-bold uppercase tracking-[0.2em] text-slate/50 lg:block">
            {data.beforeColumnLabel}
          </p>
          <div className="hidden lg:block" aria-hidden />
          <p className="mb-2 hidden self-end text-xs font-bold uppercase tracking-[0.2em] text-accent lg:block">
            {data.afterColumnLabel}
          </p>

          {data.rows.map((row, rowIndex) => (
            <ProcessRow
              key={row.phaseLabel}
              row={row}
              rowIndex={rowIndex}
              reducedMotion={Boolean(reducedMotion)}
            />
          ))}
        </motion.div>

        <BackendPanel data={data.backend} reducedMotion={Boolean(reducedMotion)} />
      </div>

      <figcaption className="border-t border-white/[0.06] px-6 py-5 md:px-8">
        <p className="text-sm leading-relaxed text-slate md:text-[15px]">{data.caption}</p>
      </figcaption>
    </figure>

    {data.impactMetrics && data.impactMetrics.length > 0 && (
      <ImpactMetricsGrid
        metrics={data.impactMetrics}
        reducedMotion={Boolean(reducedMotion)}
      />
    )}
    </div>
  )
}
