import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'

const ease = [0.22, 1, 0.36, 1] as const
const QUESTION_STAGGER = 0.16
const QUESTION_DURATION = 0.55

interface ResearchQuestionsPanelProps {
  questions: readonly string[]
  title?: string
  className?: string
  /** Tighter vertical spacing between items (space-y-3). */
  compact?: boolean
  /** Lighter elevated surface instead of dark card. */
  elevated?: boolean
}

export function ResearchQuestionsPanel({
  questions,
  title = 'Research questions',
  className = '',
  compact = false,
  elevated = false,
}: ResearchQuestionsPanelProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, {
    once: true,
    amount: 0.35,
    margin: '0px 0px -8% 0px',
  })
  const reducedMotion = useReducedMotion()
  const active = inView || Boolean(reducedMotion)

  const surfaceClass = elevated
    ? 'rounded-3xl bg-elevated/60 px-7 py-8 ring-1 ring-white/8 md:px-10 md:py-10'
    : 'rounded-3xl bg-[#141418] px-7 py-8 ring-1 ring-white/[0.06] md:px-10 md:py-10'

  return (
    <div ref={ref} className={`${surfaceClass} ${className}`.trim()}>
      <h3 className="font-display text-lg uppercase tracking-wide text-ink md:text-xl">
        {title}
      </h3>
      <ul
        className={`mt-5 text-base leading-relaxed text-slate md:text-[17px] ${
          compact ? 'space-y-3' : 'space-y-4'
        }`}
      >
        {questions.map((question, index) => (
          <motion.li
            key={question}
            className="flex gap-3"
            initial={{ opacity: 0, y: 14 }}
            animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
            transition={{
              duration: reducedMotion ? 0 : QUESTION_DURATION,
              delay: reducedMotion ? 0 : index * QUESTION_STAGGER,
              ease,
            }}
          >
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
            <span>{question}</span>
          </motion.li>
        ))}
      </ul>
    </div>
  )
}
