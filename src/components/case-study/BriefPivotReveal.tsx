import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

export interface BriefPivotData {
  intro?: string
  original: {
    label: string
    text: string
  }
  revised: {
    label: string
    text: string
  }
}

interface BriefPivotRevealProps {
  data: BriefPivotData
  className?: string
}

const ease = [0.22, 1, 0.36, 1] as const

function BriefCard({
  label,
  text,
  tone,
  crossedOut = false,
  highlighted = false,
}: {
  label: string
  text: string
  tone: 'original' | 'revised'
  crossedOut?: boolean
  highlighted?: boolean
}) {
  const isRevised = tone === 'revised'

  return (
    <article
      className={`relative flex h-full flex-col overflow-hidden rounded-3xl px-6 py-7 ring-1 transition-colors duration-500 md:px-8 md:py-9 ${
        isRevised
          ? highlighted
            ? 'bg-accent/10 ring-accent/40'
            : 'bg-elevated ring-white/10'
          : crossedOut
            ? 'bg-red-400/10 ring-red-400/40'
            : 'bg-elevated ring-white/10'
      }`}
    >
      <p
        className={`text-xs font-semibold uppercase tracking-[0.22em] transition-colors duration-500 ${
          isRevised ? 'text-accent' : crossedOut ? 'text-red-400' : 'text-slate'
        }`}
      >
        {label}
      </p>
      <p
        className="mt-5 flex-1 font-display text-lg leading-relaxed text-ink transition-colors duration-500 md:text-xl"
      >
        &ldquo;{text}&rdquo;
      </p>
    </article>
  )
}

function PivotArrow({ show, reducedMotion }: { show: boolean; reducedMotion: boolean }) {
  return (
    <div
      className="flex shrink-0 flex-col items-center justify-center gap-2 px-2 py-6 md:px-4 md:py-0"
      aria-hidden
    >
      <motion.p
        className="text-center text-[10px] font-bold uppercase tracking-[0.18em] text-accent/80"
        initial={{ opacity: 0, y: -4 }}
        animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: -4 }}
        transition={{ duration: reducedMotion ? 0 : 0.35, ease, delay: reducedMotion ? 0 : 0.25 }}
      >
        Pivot
      </motion.p>
      <motion.svg
        className="hidden h-5 w-24 text-accent md:block lg:w-28"
        viewBox="0 0 112 20"
        fill="none"
        aria-hidden
        initial={{ opacity: 0, x: -56 }}
        animate={show ? { opacity: 1, x: 0 } : { opacity: 0, x: -56 }}
        transition={{
          duration: reducedMotion ? 0 : 0.65,
          ease,
          delay: reducedMotion ? 0 : 0.15,
        }}
      >
        <motion.g
          animate={
            show && !reducedMotion
              ? { x: [0, 8, 0], opacity: [1, 0.55, 1] }
              : { x: 0, opacity: 1 }
          }
          transition={{
            duration: 1.8,
            repeat: show && !reducedMotion ? Infinity : 0,
            ease: 'easeInOut',
            delay: show && !reducedMotion ? 0.75 : 0,
          }}
        >
          <path
            d="M2 10 H94 M88 5 L96 10 L88 15"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </motion.g>
      </motion.svg>
      <motion.svg
        className="h-14 w-5 text-accent md:hidden"
        viewBox="0 0 20 56"
        fill="none"
        aria-hidden
        initial={{ opacity: 0, y: -48 }}
        animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: -48 }}
        transition={{
          duration: reducedMotion ? 0 : 0.65,
          ease,
          delay: reducedMotion ? 0 : 0.15,
        }}
      >
        <motion.g
          animate={
            show && !reducedMotion
              ? { y: [0, 8, 0], opacity: [1, 0.55, 1] }
              : { y: 0, opacity: 1 }
          }
          transition={{
            duration: 1.8,
            repeat: show && !reducedMotion ? Infinity : 0,
            ease: 'easeInOut',
            delay: show && !reducedMotion ? 0.75 : 0,
          }}
        >
          <path
            d="M10 2 V44 M5 38 L10 48 L15 38"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </motion.g>
      </motion.svg>
    </div>
  )
}

export function BriefPivotReveal({ data, className = '' }: BriefPivotRevealProps) {
  const gridRef = useRef<HTMLDivElement>(null)
  const inView = useInView(gridRef, {
    once: true,
    amount: 0.45,
    margin: '0px 0px -12% 0px',
  })
  const reducedMotion = useReducedMotion()
  const active = inView || Boolean(reducedMotion)
  const [crossedOut, setCrossedOut] = useState(false)

  const enterDuration = reducedMotion ? 0 : 0.55
  const pauseBeforeStrike = reducedMotion ? 0 : 0.4
  const strikeDuration = reducedMotion ? 0 : 0.65
  const pauseBeforeArrow = reducedMotion ? 0 : 0.25
  const pauseBeforeRevised = reducedMotion ? 0 : 0.35

  const strikeDelay = enterDuration + pauseBeforeStrike

  useEffect(() => {
    if (!active) {
      setCrossedOut(false)
      return
    }

    if (reducedMotion) {
      setCrossedOut(true)
      return
    }

    const id = window.setTimeout(() => setCrossedOut(true), strikeDelay * 1000)
    return () => window.clearTimeout(id)
  }, [active, reducedMotion, strikeDelay])

  return (
    <div className={className}>
      <div
        ref={gridRef}
        className="relative grid gap-4 md:grid-cols-[1fr_auto_1fr] md:items-stretch md:gap-0"
      >
        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 20 }}
          animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: enterDuration, ease }}
        >
          <BriefCard
            label={data.original.label}
            text={data.original.text}
            tone="original"
            crossedOut={crossedOut}
          />

          <motion.span
            className="pointer-events-none absolute right-3 top-3 rounded-full bg-red-400/20 px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.12em] text-red-400 ring-1 ring-red-400/35 sm:right-5 sm:top-5 sm:px-2.5 sm:py-1 sm:text-[10px] sm:tracking-[0.14em]"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={crossedOut ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{
              duration: reducedMotion ? 0 : 0.35,
              ease,
              delay: reducedMotion ? 0 : 0.2,
            }}
          >
            Old Focus
          </motion.span>
        </motion.div>

        <motion.div
          className="relative flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={crossedOut ? { opacity: 1 } : { opacity: 0 }}
          transition={{
            duration: reducedMotion ? 0 : 0.4,
            delay: reducedMotion ? 0 : pauseBeforeArrow,
          }}
        >
          <PivotArrow show={crossedOut} reducedMotion={!!reducedMotion} />
        </motion.div>

        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 20, scale: 0.97 }}
          animate={
            crossedOut
              ? { opacity: 1, y: 0, scale: 1 }
              : { opacity: 0, y: 20, scale: 0.97 }
          }
          transition={{
            duration: reducedMotion ? 0 : 0.6,
            ease,
            delay: reducedMotion ? 0 : strikeDuration + pauseBeforeArrow + pauseBeforeRevised,
          }}
        >
          <BriefCard
            label={data.revised.label}
            text={data.revised.text}
            tone="revised"
            highlighted={crossedOut}
          />
          <motion.span
            className="pointer-events-none absolute right-3 top-3 rounded-full bg-accent/20 px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.12em] text-accent ring-1 ring-accent/35 sm:right-5 sm:top-5 sm:px-2.5 sm:py-1 sm:text-[10px] sm:tracking-[0.14em]"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={crossedOut ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{
              duration: reducedMotion ? 0 : 0.35,
              ease,
              delay:
                reducedMotion ? 0 : strikeDuration + pauseBeforeArrow + pauseBeforeRevised + 0.25,
            }}
          >
            New focus
          </motion.span>
        </motion.div>
      </div>

      {data.intro && (
        <p className="mt-8 w-full max-w-none text-left text-base leading-relaxed text-slate md:text-lg">
          {data.intro}
        </p>
      )}
    </div>
  )
}
