import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'

const ease = [0.22, 1, 0.36, 1] as const
const PILLAR_STAGGER = 0.16
const PILLAR_DURATION = 0.5
const PHASE_STAGGER = 0.14
const PHASE_DURATION = 0.5

export interface SushiTalkSolutionData {
  label: string
  headline: string
  lead: string
  pillars: readonly {
    icon: string
    title: string
    points: readonly string[]
  }[]
  phasesLabel: string
  phases: readonly { label: string; title: string; body: string }[]
}

interface SushiTalkSolutionSectionProps {
  data: SushiTalkSolutionData
}

export function SushiTalkSolutionSection({ data }: SushiTalkSolutionSectionProps) {
  const pillarsRef = useRef<HTMLDivElement>(null)
  const phasesRef = useRef<HTMLDivElement>(null)
  const pillarsInView = useInView(pillarsRef, {
    once: true,
    amount: 0.35,
    margin: '0px 0px -8% 0px',
  })
  const phasesInView = useInView(phasesRef, {
    once: true,
    amount: 0.35,
    margin: '0px 0px -8% 0px',
  })
  const reducedMotion = useReducedMotion()
  const pillarsActive = pillarsInView || Boolean(reducedMotion)
  const phasesActive = phasesInView || Boolean(reducedMotion)

  return (
    <div>
      <p className="section-label mb-5">{data.label}</p>
      <h3 className="font-display text-2xl uppercase leading-[1.1] tracking-wide text-ink md:text-[2rem] lg:text-4xl">
        {data.headline}
      </h3>
      <p className="mt-6 font-display text-xl leading-snug text-slate md:text-2xl md:leading-tight">
        {data.lead}
      </p>

      <div ref={pillarsRef} className="mt-8 grid gap-4 md:grid-cols-2 md:gap-5">
        {data.pillars.map((pillar, index) => (
          <motion.article
            key={pillar.title}
            className="rounded-3xl bg-[#141418] px-7 py-8 ring-1 ring-white/[0.06] md:px-9 md:py-9"
            initial={{ opacity: 0, x: -24 }}
            animate={pillarsActive ? { opacity: 1, x: 0 } : { opacity: 0, x: -24 }}
            transition={{
              duration: reducedMotion ? 0 : PILLAR_DURATION,
              delay: reducedMotion ? 0 : index * PILLAR_STAGGER,
              ease,
            }}
          >
            <span className="text-3xl" aria-hidden>
              {pillar.icon}
            </span>
            <h4 className="mt-4 font-display text-xl uppercase leading-tight tracking-wide text-ink md:text-2xl">
              {pillar.title}
            </h4>
            <ul className="mt-5 space-y-3">
              {pillar.points.map((point) => (
                <li key={point} className="flex gap-3 text-sm leading-relaxed text-slate md:text-[15px]">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </motion.article>
        ))}
      </div>

      <div
        ref={phasesRef}
        className="mt-8 rounded-3xl bg-elevated/60 px-7 py-8 ring-1 ring-white/8 md:px-10 md:py-10"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
          {data.phasesLabel}
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-2 md:gap-6">
          {data.phases.map((phase, index) => (
            <motion.div
              key={phase.label}
              className="rounded-2xl bg-[#141418] px-6 py-6 ring-1 ring-white/[0.06] md:px-7 md:py-7"
              initial={{ opacity: 0, y: 16 }}
              animate={phasesActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{
                duration: reducedMotion ? 0 : PHASE_DURATION,
                delay: reducedMotion ? 0 : index * PHASE_STAGGER,
                ease,
              }}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                {phase.label}
              </p>
              <p className="mt-2 text-base font-semibold text-ink md:text-lg">{phase.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-slate">{phase.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
