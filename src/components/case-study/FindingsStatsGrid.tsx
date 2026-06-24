import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'
import { canAnimateStatValue, CountUpStat } from '../CountUpStat'

const ease = [0.22, 1, 0.36, 1] as const
const STAT_STAGGER = 0.18
const STAT_DURATION = 0.55
const COUNT_DELAY_OFFSET = 0.15

export interface FindingStat {
  value: string
  label: string
}

interface FindingsStatsGridProps {
  stats: readonly FindingStat[]
  className?: string
}

export function FindingsStatsGrid({ stats, className = '' }: FindingsStatsGridProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, {
    once: true,
    amount: 0.35,
    margin: '0px 0px -8% 0px',
  })
  const reducedMotion = useReducedMotion()
  const active = inView || Boolean(reducedMotion)

  return (
    <div
      ref={ref}
      className={`mb-10 flex flex-wrap justify-center gap-4 md:gap-6 ${className}`.trim()}
    >
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          className="w-full max-w-[300px] flex-[1_1_240px] rounded-2xl bg-elevated px-5 py-6 text-center ring-1 ring-accent/30 md:px-6 md:py-8"
          initial={{ opacity: 0, x: -24 }}
          animate={active ? { opacity: 1, x: 0 } : { opacity: 0, x: -24 }}
          transition={{
            duration: reducedMotion ? 0 : STAT_DURATION,
            delay: reducedMotion ? 0 : index * STAT_STAGGER,
            ease,
          }}
        >
          {canAnimateStatValue(stat.value) ? (
            <CountUpStat
              value={stat.value}
              when={active}
              delay={index * STAT_STAGGER + COUNT_DELAY_OFFSET}
              className="font-condensed text-4xl uppercase tracking-wide text-accent md:text-5xl"
            />
          ) : (
            <p className="font-condensed text-4xl uppercase tracking-wide text-accent md:text-5xl">
              {stat.value}
            </p>
          )}
          <p className="mt-2 text-sm leading-snug text-slate">{stat.label}</p>
        </motion.div>
      ))}
    </div>
  )
}
