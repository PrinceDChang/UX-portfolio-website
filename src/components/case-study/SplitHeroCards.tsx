import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useRef, type ReactNode } from 'react'

interface SplitHeroPillar {
  title: string
  icon?: string
  body: string
}

interface SplitHeroCardsProps {
  label: string
  headline: string
  body: string
  pillars?: readonly SplitHeroPillar[]
  /** Renders between the hero card and pillar grid (e.g. demo video). */
  middleSlot?: ReactNode
  className?: string
}

const cardClass =
  'rounded-3xl bg-[#141418] px-7 py-8 ring-1 ring-white/[0.06] md:px-10 md:py-10'

const ease = [0.22, 1, 0.36, 1] as const
const PILLAR_STAGGER = 0.18
const PILLAR_DURATION = 0.55

export function SplitHeroCards({
  label,
  headline,
  body,
  pillars = [],
  middleSlot,
  className = '',
}: SplitHeroCardsProps) {
  const pillarsRef = useRef<HTMLDivElement>(null)
  const pillarsInView = useInView(pillarsRef, {
    once: true,
    amount: 0.35,
    margin: '0px 0px -8% 0px',
  })
  const reducedMotion = useReducedMotion()
  const pillarsActive = pillarsInView || Boolean(reducedMotion)

  return (
    <div className={`grid gap-4 md:gap-5 ${className}`}>
      <article className={cardClass}>
        <p className="section-label mb-5">{label}</p>
        <h3 className="font-display text-2xl uppercase leading-[1.1] tracking-wide text-ink md:text-[2rem] lg:text-4xl">
          {headline}
        </h3>
        <div className="mt-6 w-full space-y-4 text-slate">
          {body.split('\n\n').map((paragraph) => (
            <p
              key={paragraph.slice(0, 48)}
              className="text-base leading-relaxed md:text-[17px] md:leading-relaxed"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </article>

      {middleSlot}

      {pillars.length > 0 && (
      <div
        ref={pillarsRef}
        className={`grid gap-4 md:gap-5 ${
          pillars.length >= 3 ? 'md:grid-cols-3' : 'md:grid-cols-2'
        }`}
      >
        {pillars.map((pillar, index) => (
          <motion.article
            key={pillar.title}
            className={cardClass}
            initial={{ opacity: 0, x: -28 }}
            animate={pillarsActive ? { opacity: 1, x: 0 } : { opacity: 0, x: -28 }}
            transition={{
              duration: reducedMotion ? 0 : PILLAR_DURATION,
              delay: reducedMotion ? 0 : index * PILLAR_STAGGER,
              ease,
            }}
          >
            <h4 className="font-display text-xl uppercase leading-tight tracking-wide text-ink md:text-2xl">
              {pillar.title}
              {pillar.icon && (
                <span className="ml-2 inline-block normal-case" aria-hidden>
                  {pillar.icon}
                </span>
              )}
            </h4>
            <p className="mt-5 text-base leading-relaxed text-slate md:text-[17px] md:leading-relaxed">
              {pillar.body}
            </p>
          </motion.article>
        ))}
      </div>
      )}
    </div>
  )
}
