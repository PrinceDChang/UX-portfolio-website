import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'

export interface CoplanTestingTaskPair {
  task: string
  data: string
  wide?: boolean
}

export interface CoplanTestingTasksData {
  title: string
  taskColumnLabel: string
  dataColumnLabel: string
  pairs: readonly CoplanTestingTaskPair[]
}

interface CoplanTasksDataRevealProps {
  data: CoplanTestingTasksData
  className?: string
}

const ease = [0.22, 1, 0.36, 1] as const
const PAIR_STAGGER = 0.2
const CELL_DURATION = 0.44
const INTRO_DELAY = 0.28

const MOBILE_ROW = [
  'row-start-1',
  'row-start-2',
  'row-start-3',
  'row-start-4',
] as const

const MD_ROW = [
  'md:row-start-1',
  'md:row-start-1',
  'md:row-start-2',
  'md:row-start-2',
] as const

function taskPlacement(index: number, wide: boolean) {
  if (wide) {
    return 'col-span-2 col-start-1 row-start-5 md:col-start-1 md:row-start-3'
  }
  const mdCol = index % 2 === 0 ? 'md:col-start-1' : 'md:col-start-2'
  return `col-span-1 col-start-1 ${MOBILE_ROW[index]} ${MD_ROW[index]} ${mdCol}`
}

function dataPlacement(index: number, wide: boolean) {
  if (wide) {
    return 'col-span-2 col-start-1 row-start-6 md:col-start-3 md:row-start-3'
  }
  const mdCol = index % 2 === 0 ? 'md:col-start-3' : 'md:col-start-4'
  return `col-span-1 col-start-2 ${MOBILE_ROW[index]} ${MD_ROW[index]} ${mdCol}`
}

function TaskCell({
  label,
  active,
  reduceMotion,
  delay,
}: {
  label: string
  active: boolean
  reduceMotion: boolean | null
  delay: number
}) {
  return (
    <motion.div
      className="flex h-full min-h-[4.5rem] items-center justify-center rounded-2xl bg-accent/15 px-4 py-4 text-center ring-1 ring-accent/30 sm:min-h-[5rem] sm:px-5"
      initial={reduceMotion ? false : { opacity: 0, x: -24, scale: 0.95 }}
      animate={
        active || reduceMotion
          ? { opacity: 1, x: 0, scale: 1 }
          : { opacity: 0, x: -24, scale: 0.95 }
      }
      transition={{ duration: reduceMotion ? 0 : CELL_DURATION, ease, delay: reduceMotion ? 0 : delay }}
    >
      <p className="text-sm font-medium leading-snug text-ink/95 sm:text-[15px]">{label}</p>
    </motion.div>
  )
}

function DataCell({
  label,
  active,
  reduceMotion,
  delay,
}: {
  label: string
  active: boolean
  reduceMotion: boolean | null
  delay: number
}) {
  return (
    <motion.div
      className="flex h-full min-h-[4.5rem] items-center justify-center rounded-2xl bg-[#1a1a26] px-4 py-4 text-center ring-1 ring-white/[0.12] sm:min-h-[5rem] sm:px-5"
      initial={reduceMotion ? false : { opacity: 0, x: 24, scale: 0.95 }}
      animate={
        active || reduceMotion
          ? { opacity: 1, x: 0, scale: 1 }
          : { opacity: 0, x: 24, scale: 0.95 }
      }
      transition={{
        duration: reduceMotion ? 0 : CELL_DURATION,
        ease,
        delay: reduceMotion ? 0 : delay + 0.06,
      }}
    >
      <p className="text-sm font-medium leading-snug text-slate sm:text-[15px]">{label}</p>
    </motion.div>
  )
}

export function CoplanTasksDataReveal({ data, className = '' }: CoplanTasksDataRevealProps) {
  const rootRef = useRef<HTMLElement>(null)
  const inView = useInView(rootRef, { once: true, amount: 0.35, margin: '0px 0px -8% 0px' })
  const reduceMotion = useReducedMotion()
  const active = inView || Boolean(reduceMotion)

  return (
    <figure
      ref={rootRef}
      className={`mb-10 overflow-hidden rounded-3xl bg-[#141418] ring-1 ring-white/[0.08] ${className}`}
      aria-label={`${data.title} — ${data.taskColumnLabel} and ${data.dataColumnLabel}`}
    >
      <motion.div
        className="border-b border-white/[0.06] px-5 py-4 sm:px-6 sm:py-5"
        initial={reduceMotion ? false : { opacity: 0, y: -12 }}
        animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: -12 }}
        transition={{ duration: reduceMotion ? 0 : 0.45, ease }}
      >
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent sm:text-sm">
          {data.title}
        </p>
      </motion.div>

      <div className="px-5 py-6 sm:px-8 sm:py-8">
        <div className="mb-4 grid grid-cols-2 gap-3 sm:mb-5 sm:gap-4 md:grid-cols-4">
          <motion.p
            className="text-center text-sm font-semibold uppercase tracking-[0.14em] text-ink sm:text-base md:col-span-2"
            initial={reduceMotion ? false : { opacity: 0, y: 8 }}
            animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
            transition={{
              duration: reduceMotion ? 0 : 0.38,
              ease,
              delay: reduceMotion ? 0 : INTRO_DELAY,
            }}
          >
            {data.taskColumnLabel}
          </motion.p>
          <motion.p
            className="text-center text-sm font-semibold uppercase tracking-[0.14em] text-ink sm:text-base md:col-span-2"
            initial={reduceMotion ? false : { opacity: 0, y: 8 }}
            animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
            transition={{
              duration: reduceMotion ? 0 : 0.38,
              ease,
              delay: reduceMotion ? 0 : INTRO_DELAY + 0.05,
            }}
          >
            {data.dataColumnLabel}
          </motion.p>
        </div>

        <div className="grid grid-cols-2 items-stretch gap-3 sm:gap-4 md:grid-cols-4 md:grid-rows-3">
          {data.pairs.map((pair, index) => {
            const delay = INTRO_DELAY + 0.2 + index * PAIR_STAGGER
            const wide = Boolean(pair.wide)

            return (
              <div key={`pair-${pair.task}`} className="contents">
                <div className={taskPlacement(index, wide)}>
                  <TaskCell
                    label={pair.task}
                    active={active}
                    reduceMotion={reduceMotion}
                    delay={delay}
                  />
                </div>
                <div className={dataPlacement(index, wide)}>
                  <DataCell
                    label={pair.data}
                    active={active}
                    reduceMotion={reduceMotion}
                    delay={delay}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </figure>
  )
}
