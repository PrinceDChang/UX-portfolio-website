import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'

export interface CaseStudyImpactMetric {
  value: string
  label: string
}

interface CaseStudyImpactSummaryProps {
  metrics: readonly CaseStudyImpactMetric[]
  className?: string
}

function impactGridClass(count: number) {
  if (count <= 2) return 'sm:grid-cols-2'
  if (count === 3) return 'sm:grid-cols-3'
  return 'sm:grid-cols-2 lg:grid-cols-4'
}

export function CaseStudyImpactSummary({
  metrics,
  className = '',
}: CaseStudyImpactSummaryProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const reducedMotion = useReducedMotion()
  const active = inView || reducedMotion

  return (
    <div ref={ref} className={`mt-10 w-full max-w-none ${className}`.trim()}>
      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent">Impact</p>
      <div className={`mt-4 grid grid-cols-1 gap-4 ${impactGridClass(metrics.length)}`}>
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.label}
            className="rounded-2xl bg-elevated/80 px-5 py-5 text-center ring-2 ring-accent/60 backdrop-blur-sm md:px-6 md:py-6"
            initial={{ opacity: 0, y: 16 }}
            animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{
              duration: reducedMotion ? 0 : 0.55,
              delay: reducedMotion ? 0 : index * 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <p className="font-condensed text-3xl uppercase tracking-wide text-accent md:text-4xl">
              {metric.value}
            </p>
            <p className="mt-2 text-sm leading-snug text-slate">{metric.label}</p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
