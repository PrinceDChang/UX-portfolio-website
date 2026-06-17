import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'
import type { DesignProcessBelowTrackContext } from './DesignProcessSteps'
import { CoplanUserFlowReveal } from './CoplanUserFlowReveal'
import {
  sushitalkCompetitiveAudit,
  sushitalkMoodboard,
  sushitalkPersonas,
  sushitalkProcessArtifactTabs,
  sushitalkUserFlow,
} from '../../data/sushitalkProcessArtifacts'

const ease = [0.22, 1, 0.36, 1] as const
const ROW_STAGGER = 0.12
const CARD_STAGGER = 0.14

const toneRing: Record<string, string> = {
  rose: 'ring-rose-400/35 bg-rose-400/10',
  amber: 'ring-amber-400/35 bg-amber-400/10',
  green: 'ring-emerald-400/35 bg-emerald-400/10',
  violet: 'ring-violet-400/35 bg-violet-400/10',
  sky: 'ring-accent/35 bg-accent/10',
  slate: 'ring-white/20 bg-white/[0.04]',
}

function useRevealActive() {
  const rootRef = useRef<HTMLDivElement>(null)
  const inView = useInView(rootRef, { once: true, amount: 0.3, margin: '0px 0px -6% 0px' })
  const reduceMotion = useReducedMotion()
  return { rootRef, active: inView || Boolean(reduceMotion), reduceMotion }
}

function SushiTalkCompetitiveAuditReveal() {
  const { rootRef, active, reduceMotion } = useRevealActive()

  return (
    <div ref={rootRef} className="px-2 py-2 sm:px-4 sm:py-3">
      <div className="mb-3 hidden grid-cols-[minmax(7rem,1fr)_2fr] gap-3 px-1 sm:grid">
        {sushitalkCompetitiveAudit.columns.map((col) => (
          <p
            key={col}
            className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate/80"
          >
            {col}
          </p>
        ))}
      </div>
      <ul className="space-y-2 sm:space-y-2.5">
        {sushitalkCompetitiveAudit.rows.map((row, index) => (
          <motion.li
            key={row.platform}
            className="grid gap-2 sm:grid-cols-[minmax(7rem,1fr)_2fr] sm:gap-3"
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
            transition={{
              duration: reduceMotion ? 0 : 0.42,
              ease,
              delay: reduceMotion ? 0 : index * ROW_STAGGER,
            }}
          >
            <div
              className={`rounded-xl px-3 py-2.5 ring-1 sm:px-4 sm:py-3 ${toneRing[row.tone]}`}
            >
              <p className="text-sm font-semibold text-ink">{row.platform}</p>
            </div>
            <div className="rounded-xl bg-[#1a1a26] px-3 py-2.5 ring-1 ring-white/[0.1] sm:px-4 sm:py-3">
              <p className="text-sm leading-snug text-slate">{row.gap}</p>
            </div>
          </motion.li>
        ))}
      </ul>
    </div>
  )
}

function SushiTalkPersonasReveal() {
  const { rootRef, active, reduceMotion } = useRevealActive()

  return (
    <div
      ref={rootRef}
      className="grid gap-3 px-2 py-2 sm:grid-cols-2 sm:gap-4 sm:px-4 sm:py-3"
    >
      {sushitalkPersonas.map((persona, index) => (
        <motion.article
          key={persona.id}
          className={`flex flex-col rounded-2xl p-4 ring-1 sm:p-5 ${toneRing[persona.tone]}`}
          initial={reduceMotion ? false : { opacity: 0, scale: 0.94, y: 16 }}
          animate={active ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.94, y: 16 }}
          transition={{
            duration: reduceMotion ? 0 : 0.45,
            ease,
            delay: reduceMotion ? 0 : index * CARD_STAGGER,
          }}
        >
          <div className="flex items-center gap-2">
            <span className="text-xl" aria-hidden>
              {persona.emoji}
            </span>
            <div>
              <h4 className="font-display text-base text-ink">{persona.name}</h4>
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate">
                {persona.role}
              </p>
            </div>
          </div>
          <dl className="mt-3 space-y-2 text-sm">
            <div>
              <dt className="text-[10px] font-semibold uppercase tracking-[0.14em] text-accent">
                Goal
              </dt>
              <dd className="mt-0.5 leading-snug text-ink/90">{persona.goal}</dd>
            </div>
            <div>
              <dt className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate">
                Frustration
              </dt>
              <dd className="mt-0.5 leading-snug text-slate">{persona.frustration}</dd>
            </div>
          </dl>
        </motion.article>
      ))}
    </div>
  )
}

function SushiTalkUserFlowReveal() {
  return (
    <CoplanUserFlowReveal
      data={sushitalkUserFlow}
      viewW={980}
      viewH={380}
      ariaLabel="SushiTalk user flow from landing through browse, search, profiles, sign-up, and scheduling"
      className="mt-0"
    />
  )
}

function SushiTalkMoodboardReveal() {
  const { rootRef, active, reduceMotion } = useRevealActive()

  return (
    <div ref={rootRef} className="space-y-5 px-2 py-2 sm:px-4 sm:py-3">
      <div>
        <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate/80">
          Palette
        </p>
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-6 sm:gap-3">
          {sushitalkMoodboard.colors.map((color, index) => (
            <motion.div
              key={color.hex}
              className="overflow-hidden rounded-xl ring-1 ring-white/[0.12]"
              initial={reduceMotion ? false : { opacity: 0, scale: 0.88 }}
              animate={active ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.88 }}
              transition={{
                duration: reduceMotion ? 0 : 0.38,
                ease,
                delay: reduceMotion ? 0 : index * 0.08,
              }}
            >
              <div className="h-14 sm:h-16" style={{ backgroundColor: color.hex }} />
              <div className="bg-[#1a1a26] px-2 py-1.5">
                <p className="truncate text-[10px] font-medium text-ink">{color.name}</p>
                <p className="text-[9px] uppercase tracking-wider text-slate">{color.hex}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate/80">
          Typography
        </p>
        <div className="flex flex-wrap gap-2">
          {sushitalkMoodboard.fonts.map((font, index) => (
            <motion.span
              key={font}
              className="rounded-lg bg-[#1a1a26] px-3 py-2 text-sm text-ink ring-1 ring-white/[0.12]"
              style={{ fontFamily: font }}
              initial={reduceMotion ? false : { opacity: 0, y: 10 }}
              animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{
                duration: reduceMotion ? 0 : 0.35,
                ease,
                delay: reduceMotion ? 0 : 0.35 + index * 0.1,
              }}
            >
              {font}
            </motion.span>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate/80">
          Tone
        </p>
        <div className="flex flex-wrap gap-2">
          {sushitalkMoodboard.tags.map((tag, index) => (
            <motion.span
              key={tag}
              className="rounded-full bg-accent/15 px-3 py-1.5 text-xs font-medium text-ink ring-1 ring-accent/30"
              initial={reduceMotion ? false : { opacity: 0, scale: 0.9 }}
              animate={active ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{
                duration: reduceMotion ? 0 : 0.32,
                ease,
                delay: reduceMotion ? 0 : 0.55 + index * 0.08,
              }}
            >
              {tag}
            </motion.span>
          ))}
        </div>
      </div>
    </div>
  )
}

const artifactPanels = [
  SushiTalkCompetitiveAuditReveal,
  SushiTalkPersonasReveal,
  SushiTalkUserFlowReveal,
  SushiTalkMoodboardReveal,
] as const

export function SushiTalkProcessArtifactReveal({
  activeIndex,
  selectStep,
  activeStep,
}: DesignProcessBelowTrackContext) {
  const ActivePanel = artifactPanels[activeIndex] ?? artifactPanels[0]

  return (
    <AnimatePresence mode="wait">
      <motion.figure
        key={activeIndex}
        role="tabpanel"
        id={`process-artifact-${activeIndex}`}
        aria-labelledby={`process-tab-${activeIndex}`}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ duration: 0.38, ease }}
        className="relative mt-8 overflow-hidden rounded-3xl ring-1 ring-white/10 md:mt-10"
      >
        <div
          className="absolute left-4 top-4 z-20 flex flex-wrap gap-1 rounded-xl bg-[#1a1a26]/95 p-1 ring-1 ring-white/[0.1] backdrop-blur-sm md:left-6 md:top-6"
          role="tablist"
          aria-label="Design process artifacts"
        >
          {sushitalkProcessArtifactTabs.map((tab, index) => {
            const isActive = index === activeIndex
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls={`process-artifact-${index}`}
                onClick={() => selectStep(index)}
                className={`rounded-lg px-2.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] transition-colors sm:px-3 sm:text-[11px] ${
                  isActive
                    ? 'bg-accent/20 text-ink ring-1 ring-accent/40'
                    : 'text-slate hover:bg-white/[0.06] hover:text-ink'
                }`}
              >
                <span className="hidden sm:inline">{tab.shortLabel}</span>
                <span className="sm:hidden">{String(index + 1).padStart(2, '0')}</span>
              </button>
            )
          })}
        </div>

        <div className="relative min-h-[min(58vh,500px)] bg-[#0a0a12] px-4 pb-4 pt-14 md:px-6 md:pb-5 md:pt-16">
          <ActivePanel key={activeIndex} />
        </div>

        {(activeStep.imageCaption ?? activeStep.imageAlt) && (
          <figcaption className="border-t border-white/[0.08] px-6 py-4 text-center text-sm leading-relaxed text-slate md:text-[15px]">
            {activeStep.imageCaption ?? activeStep.imageAlt}
          </figcaption>
        )}
      </motion.figure>
    </AnimatePresence>
  )
}
