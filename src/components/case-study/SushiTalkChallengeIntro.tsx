import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'

const ease = [0.22, 1, 0.36, 1] as const
const GAP_STAGGER = 0.14
const GAP_DURATION = 0.5

export interface SushiTalkChallengeIntroData {
  lead: string
  competitorGapsLabel: string
  competitorGaps: readonly { title: string; body: string }[]
}

interface SushiTalkChallengeIntroProps {
  data: SushiTalkChallengeIntroData
}

export function SushiTalkChallengeIntro({ data }: SushiTalkChallengeIntroProps) {
  const gapsRef = useRef<HTMLDivElement>(null)
  const gapsInView = useInView(gapsRef, {
    once: true,
    amount: 0.35,
    margin: '0px 0px -8% 0px',
  })
  const reducedMotion = useReducedMotion()
  const gapsActive = gapsInView || Boolean(reducedMotion)

  return (
    <div>
      <p className="font-display text-2xl leading-snug text-ink md:text-3xl md:leading-tight">
        {data.lead}
      </p>

      <div
        ref={gapsRef}
        className="mt-8 rounded-3xl bg-[#141418] px-7 py-8 ring-1 ring-white/[0.06] md:px-10 md:py-10"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
          {data.competitorGapsLabel}
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {data.competitorGaps.map((gap, index) => (
            <motion.div
              key={gap.title}
              className="rounded-2xl bg-white/[0.04] px-5 py-5 ring-1 ring-white/[0.08]"
              initial={{ opacity: 0, x: -20 }}
              animate={gapsActive ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{
                duration: reducedMotion ? 0 : GAP_DURATION,
                delay: reducedMotion ? 0 : index * GAP_STAGGER,
                ease,
              }}
            >
              <p className="text-sm font-semibold text-ink">{gap.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-slate">{gap.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
