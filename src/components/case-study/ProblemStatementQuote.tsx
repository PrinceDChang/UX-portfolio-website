import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useRef, type ReactNode } from 'react'

const ease = [0.22, 1, 0.36, 1] as const

interface ProblemStatementQuoteProps {
  children: ReactNode
  className?: string
}

export function ProblemStatementQuote({
  children,
  className = '',
}: ProblemStatementQuoteProps) {
  const ref = useRef<HTMLQuoteElement>(null)
  const inView = useInView(ref, {
    once: true,
    amount: 0.35,
    margin: '0px 0px -8% 0px',
  })
  const reducedMotion = useReducedMotion()
  const active = inView || Boolean(reducedMotion)

  return (
    <motion.blockquote
      ref={ref}
      className={`case-study-quote mb-8 rounded-3xl border border-accent/25 bg-elevated/60 px-8 py-8 md:px-10 md:py-10 ${className}`.trim()}
      initial={{ opacity: 0, y: 24 }}
      animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{
        duration: reducedMotion ? 0 : 0.6,
        ease,
      }}
    >
      {children}
    </motion.blockquote>
  )
}
