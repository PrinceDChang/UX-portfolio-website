import { motion, useReducedMotion } from 'framer-motion'

const flowEase = [0.22, 1, 0.36, 1] as const
const ROW_STAGGER = 0.2
const ROW_DURATION = 0.48
const GRID_COLS = 8

export interface AgileRoadmapRow {
  label: string
  barColor: string
  textColor?: string
  colStart?: number
  colSpan?: number
  fullWidth?: boolean
  tall?: boolean
}

export interface AgileRoadmapData {
  title: string
  rows: readonly AgileRoadmapRow[]
}

interface AgileRoadmapRevealProps {
  data: AgileRoadmapData
  className?: string
}

const rowVariants = {
  hidden: { opacity: 0, x: -28 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: ROW_DURATION, ease: flowEase },
  },
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: ROW_STAGGER,
      delayChildren: 0.15,
    },
  },
}

function gridColumnStyle(row: AgileRoadmapRow) {
  if (row.fullWidth) return '1 / -1'
  return `${row.colStart ?? 1} / span ${row.colSpan ?? 2}`
}

export function AgileRoadmapReveal({ data, className = '' }: AgileRoadmapRevealProps) {
  const reduceMotion = useReducedMotion()

  return (
    <figure
      className={`mb-10 w-full overflow-hidden rounded-3xl bg-[#141418] ring-1 ring-white/[0.08] md:mb-12 ${className}`}
      aria-label={data.title}
    >
      <motion.div
        className="border-b border-white/[0.06] px-5 py-4 text-center sm:px-6 sm:py-5"
        initial={reduceMotion ? false : { opacity: 0, y: -12 }}
        whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.4, ease: flowEase }}
      >
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent sm:text-sm">
          {data.title}
        </p>
      </motion.div>

      <div className="relative overflow-x-auto p-4 sm:p-6 md:p-8">
        <div className="relative min-w-[640px]">
          <div
            className="pointer-events-none absolute inset-0 grid"
            style={{ gridTemplateColumns: `repeat(${GRID_COLS}, minmax(0, 1fr))` }}
            aria-hidden
          >
            {Array.from({ length: GRID_COLS }, (_, index) => (
              <div
                key={index}
                className={index % 2 === 0 ? 'bg-white/[0.02]' : 'bg-accent/[0.04]'}
              />
            ))}
          </div>

          <motion.div
            className="relative grid gap-2 sm:gap-2.5"
            style={{ gridTemplateColumns: `repeat(${GRID_COLS}, minmax(0, 1fr))` }}
          variants={reduceMotion ? undefined : containerVariants}
          initial={reduceMotion ? false : 'hidden'}
          whileInView={reduceMotion ? undefined : 'visible'}
          viewport={{ once: true, margin: '-60px' }}
        >
          {data.rows.map((row) => (
            <motion.div
              key={row.label}
              variants={reduceMotion ? undefined : rowVariants}
              className={`relative ${row.tall ? 'min-h-[4.5rem]' : 'min-h-[3.25rem]'}`}
              style={{ gridColumn: gridColumnStyle(row) }}
            >
              <div
                className={`flex h-full min-h-[inherit] items-start rounded-xl border border-white/[0.08] px-3 py-2.5 ring-1 ring-white/[0.04] ${
                  row.tall ? 'py-3.5' : ''
                }`}
                style={{
                  backgroundColor: row.barColor,
                  color: row.textColor ?? '#ffffff',
                }}
              >
                <p className="text-left text-[10px] font-semibold leading-snug sm:text-xs md:text-[13px]">
                  {row.label}
                </p>
              </div>
            </motion.div>
          ))}
          </motion.div>
        </div>
      </div>
    </figure>
  )
}
