import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'
import { WhosThisForPanel } from './WhosThisForPanel'

const ease = [0.22, 1, 0.36, 1] as const
const GAP_STAGGER = 0.14
const GAP_DURATION = 0.5

export interface SushiTalkHookData {
  lead: string
  learnerPaths: readonly { label: string; body: string }[]
  marketGapsLabel: string
  marketGaps: readonly { label: string; body: string }[]
  origin: { label: string; body: string }
}

interface SushiTalkHookSectionProps {
  data: SushiTalkHookData
}

export function SushiTalkHookSection({ data }: SushiTalkHookSectionProps) {
  const gapsRef = useRef<HTMLDivElement>(null)
  const originRef = useRef<HTMLElement>(null)
  const gapsInView = useInView(gapsRef, {
    once: true,
    amount: 0.35,
    margin: '0px 0px -8% 0px',
  })
  const originInView = useInView(originRef, {
    once: true,
    amount: 0.35,
    margin: '0px 0px -8% 0px',
  })
  const reducedMotion = useReducedMotion()
  const gapsActive = gapsInView || Boolean(reducedMotion)
  const originActive = originInView || Boolean(reducedMotion)

  return (
    <div>
      <p className="font-display text-2xl leading-snug text-ink md:text-3xl md:leading-tight">
        {data.lead}
      </p>

      <WhosThisForPanel title="Three learner paths" audiences={data.learnerPaths} />

      <div
        ref={gapsRef}
        className="mt-8 rounded-3xl bg-elevated/60 px-7 py-8 ring-1 ring-white/8 md:px-10 md:py-10"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
          {data.marketGapsLabel}
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {data.marketGaps.map((gap, index) => (
            <motion.div
              key={gap.label}
              className="rounded-2xl bg-[#141418] px-5 py-5 ring-1 ring-white/[0.06]"
              initial={{ opacity: 0, y: 16 }}
              animate={gapsActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{
                duration: reducedMotion ? 0 : GAP_DURATION,
                delay: reducedMotion ? 0 : index * GAP_STAGGER,
                ease,
              }}
            >
              <p className="text-sm font-semibold text-ink">{gap.label}</p>
              <p className="mt-2 text-sm leading-relaxed text-slate">{gap.body}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <motion.article
        ref={originRef}
        className="relative mt-8 overflow-hidden rounded-3xl bg-[#141418] px-7 py-7 ring-1 ring-accent/25 md:px-9 md:py-8"
        initial={{ opacity: 0, y: 20 }}
        animate={originActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{
          duration: reducedMotion ? 0 : 0.55,
          ease,
        }}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-50"
          aria-hidden
          style={{
            backgroundImage:
              'radial-gradient(circle at 12% 40%, rgba(153,112,255,0.14), transparent 45%), radial-gradient(circle at 88% 60%, rgba(153,112,255,0.08), transparent 40%)',
          }}
        />
        <p className="relative text-xs font-semibold uppercase tracking-[0.22em] text-accent">
          {data.origin.label}
        </p>
        <p className="relative mt-3 text-base leading-relaxed text-ink md:text-lg">
          {data.origin.body}
        </p>
      </motion.article>
    </div>
  )
}
