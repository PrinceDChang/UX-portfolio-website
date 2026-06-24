import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useEffect, useMemo, useRef, useState } from 'react'
import { CountUpStat, canAnimateStatValue } from '../CountUpStat'

export interface UwOrisHookData {
  label: string
  lead: string
  stats: readonly {
    value: string
    label: string
  }[]
  surfacesLabel: string
  surfaces: readonly string[]
  quote: {
    text: string
    attribution: string
  }
  insight: {
    label: string
    text: string
  }
}

const ease = [0.22, 1, 0.36, 1] as const
const APPEARANCE_SLOW = 1.1
const STAT_STAGGER = 0.24 * APPEARANCE_SLOW
const STAT_DURATION = 0.6 * APPEARANCE_SLOW
const STAT_COUNT_DELAY_OFFSET = 0.2 * APPEARANCE_SLOW
const SURFACE_ROW_STAGGER = 0.32 * APPEARANCE_SLOW
const SURFACE_ROW_DURATION = 0.72 * APPEARANCE_SLOW
const SURFACE_ARTICLE_DURATION = 0.65 * APPEARANCE_SLOW
const SURFACE_ROW_DELAY = 0.2 * APPEARANCE_SLOW
const STAT_COUNT_DURATION = 1.15 * APPEARANCE_SLOW

function chunkBy<T>(items: readonly T[], size: number): T[][] {
  const rows: T[][] = []
  for (let i = 0; i < items.length; i += size) {
    rows.push(items.slice(i, i + size) as T[])
  }
  return rows
}

function useSurfaceGridColumns() {
  const [columns, setColumns] = useState(3)

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 640px)')
    const update = () => setColumns(mq.matches ? 3 : 2)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  return columns
}

export function UwOrisHookSection({ data }: { data: UwOrisHookData }) {
  const statsRef = useRef<HTMLDivElement>(null)
  const surfacesRef = useRef<HTMLElement>(null)
  const quoteInsightRef = useRef<HTMLDivElement>(null)
  const statsInView = useInView(statsRef, {
    once: true,
    amount: 0.4,
    margin: '0px 0px -8% 0px',
  })
  const surfacesInView = useInView(surfacesRef, {
    once: true,
    amount: 0.35,
    margin: '0px 0px -8% 0px',
  })
  const quoteInsightInView = useInView(quoteInsightRef, {
    once: true,
    amount: 0.35,
    margin: '0px 0px -8% 0px',
  })
  const reducedMotion = useReducedMotion()
  const statsActive = statsInView || Boolean(reducedMotion)
  const surfacesActive = surfacesInView || Boolean(reducedMotion)
  const quoteInsightActive = quoteInsightInView || Boolean(reducedMotion)
  const gridColumns = useSurfaceGridColumns()
  const surfaceRows = useMemo(
    () => chunkBy(data.surfaces, gridColumns),
    [data.surfaces, gridColumns],
  )

  return (
    <div>
      <p className="font-display text-2xl leading-snug text-ink md:text-3xl md:leading-tight">
        {data.lead}
      </p>

      <div ref={statsRef} className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {data.stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            className="rounded-2xl bg-elevated px-5 py-6 text-center ring-1 ring-white/[0.08] md:px-6 md:py-7"
            initial={{ opacity: 0, x: -20, y: 8 }}
            animate={
              statsActive
                ? { opacity: 1, x: 0, y: 0 }
                : { opacity: 0, x: -20, y: 8 }
            }
            transition={{
              duration: reducedMotion ? 0 : STAT_DURATION,
              delay: reducedMotion ? 0 : index * STAT_STAGGER,
              ease,
            }}
          >
            {canAnimateStatValue(stat.value) ? (
              <CountUpStat
                value={stat.value}
                when={statsActive}
                delay={index * STAT_STAGGER + STAT_COUNT_DELAY_OFFSET}
                duration={STAT_COUNT_DURATION}
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

      <motion.article
        ref={surfacesRef}
        className="relative mt-8 overflow-hidden rounded-3xl bg-[#141418] px-6 py-7 ring-1 ring-white/[0.06] md:px-9 md:py-9"
        initial={{ opacity: 0, y: 20 }}
        animate={surfacesActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{
          duration: reducedMotion ? 0 : SURFACE_ARTICLE_DURATION,
          ease,
        }}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          aria-hidden
          style={{
            backgroundImage:
              'radial-gradient(circle at 20% 30%, rgba(153,112,255,0.12), transparent 42%), radial-gradient(circle at 78% 68%, rgba(153,112,255,0.08), transparent 38%)',
          }}
        />
        <p className="relative text-xs font-semibold uppercase tracking-[0.22em] text-accent">
          {data.surfacesLabel}
        </p>
        <div className="relative mt-5 flex flex-col gap-2 md:gap-2.5">
          {surfaceRows.map((row, rowIndex) => (
            <motion.div
              key={`surface-row-${rowIndex}`}
              className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:gap-2.5"
              initial={{ opacity: 0, y: 16 }}
              animate={surfacesActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{
                duration: reducedMotion ? 0 : SURFACE_ROW_DURATION,
                delay: reducedMotion ? 0 : SURFACE_ROW_DELAY + rowIndex * SURFACE_ROW_STAGGER,
                ease,
              }}
            >
              {row.map((surface) => (
                <span
                  key={surface}
                  className="rounded-xl bg-white/[0.06] px-3.5 py-2.5 text-center text-sm leading-snug text-ink ring-1 ring-white/[0.1]"
                >
                  {surface}
                </span>
              ))}
            </motion.div>
          ))}
        </div>
      </motion.article>

      <div
        ref={quoteInsightRef}
        className="mt-8 grid gap-4 md:grid-cols-[1.15fr_0.85fr] md:gap-5"
      >
        <motion.blockquote
          className="case-study-quote rounded-3xl border border-accent/25 bg-elevated/60 px-7 py-7 md:px-9 md:py-9"
          initial={{ opacity: 0, x: -28 }}
          animate={
            quoteInsightActive ? { opacity: 1, x: 0 } : { opacity: 0, x: -28 }
          }
          transition={{
            duration: reducedMotion ? 0 : 0.6 * APPEARANCE_SLOW,
            ease,
          }}
        >
          <p className="font-display text-xl leading-relaxed text-ink md:text-2xl">
            &ldquo;{data.quote.text}&rdquo;
          </p>
          <footer className="mt-5 text-sm text-slate">— {data.quote.attribution}</footer>
        </motion.blockquote>

        <motion.aside
          className="flex flex-col justify-center rounded-3xl border border-accent/30 bg-accent/[0.08] px-7 py-7 md:px-8 md:py-8"
          initial={{ opacity: 0, x: 28 }}
          animate={
            quoteInsightActive ? { opacity: 1, x: 0 } : { opacity: 0, x: 28 }
          }
          transition={{
            duration: reducedMotion ? 0 : 0.6 * APPEARANCE_SLOW,
            delay: reducedMotion ? 0 : 0.08 * APPEARANCE_SLOW,
            ease,
          }}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
            {data.insight.label}
          </p>
          <p className="mt-4 font-display text-lg leading-relaxed text-ink md:text-xl">
            {data.insight.text}
          </p>
        </motion.aside>
      </div>
    </div>
  )
}
