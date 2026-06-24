import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'

const ease = [0.22, 1, 0.36, 1] as const
const AUDIENCE_STAGGER = 0.18
const AUDIENCE_DURATION = 0.55

export interface WhosThisForAudience {
  label: string
  body: string
}

interface WhosThisForPanelProps {
  title: string
  audiences: readonly WhosThisForAudience[]
  className?: string
}

export function WhosThisForPanel({
  title,
  audiences,
  className = '',
}: WhosThisForPanelProps) {
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
      className={`mt-8 rounded-3xl bg-[#141418] px-7 py-8 ring-1 ring-white/[0.06] md:px-10 md:py-10 ${className}`.trim()}
    >
      <h3 className="font-display text-lg uppercase tracking-wide text-ink md:text-xl">
        {title}
      </h3>
      <div className="mt-6 grid gap-6 md:grid-cols-3 md:gap-8">
        {audiences.map((audience, index) => (
          <motion.div
            key={audience.label}
            initial={{ opacity: 0, x: -24 }}
            animate={active ? { opacity: 1, x: 0 } : { opacity: 0, x: -24 }}
            transition={{
              duration: reducedMotion ? 0 : AUDIENCE_DURATION,
              delay: reducedMotion ? 0 : index * AUDIENCE_STAGGER,
              ease,
            }}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              {audience.label}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-slate md:text-[15px]">
              {audience.body}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
