import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
  type PanInfo,
} from 'framer-motion'
import { useCallback, useEffect, useMemo, useState } from 'react'
import type { Project } from '../../data/content'
import { peekTierForDepth, BoardingTicket } from './BoardingTicketCard'
import {
  getBackCardAnimate,
  getBackCardHover,
  getBackCardTap,
  getDragRotateZ,
  getFrontCardVariants,
  getFrontDragMotion,
  stackSpring,
  stackTransition,
  type StackDirection,
} from './stackMotion'

const SWIPE_OFFSET_THRESHOLD = 56
const SWIPE_VELOCITY_THRESHOLD = 420
const DRAG_LIMIT = 110
/** Front card plus this many passes visible behind it */
const VISIBLE_STACK_SIZE = 3
const MAX_BACK_LAYERS = VISIBLE_STACK_SIZE - 1
/** Vertical offset between stacked cards — smaller = front card covers more of the stack behind */
export const PEEK_STEP_PX = 40

interface ProjectsTicketStackProps {
  projects: readonly Project[]
  /** When true, omits the outer stage wrapper (used when portaled into `ProjectsTicketStackPortalTarget`). */
  embedded?: boolean
}

function getSwipeDirection(offsetY: number, velocityY: number): StackDirection {
  if (offsetY < -SWIPE_OFFSET_THRESHOLD || velocityY < -SWIPE_VELOCITY_THRESHOLD) {
    return 1
  }
  if (offsetY > SWIPE_OFFSET_THRESHOLD || velocityY > SWIPE_VELOCITY_THRESHOLD) {
    return -1
  }
  return 0
}

export function ProjectsTicketStack({ projects, embedded = false }: ProjectsTicketStackProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [direction, setDirection] = useState<StackDirection>(0)
  const reduceMotion = useReducedMotion()
  const dragY = useMotionValue(0)
  const dragRotateZ = useTransform(dragY, (y) => (reduceMotion ? 0 : getDragRotateZ(y)))

  useEffect(() => {
    setActiveIndex(0)
    setDirection(0)
  }, [projects])

  const count = projects.length

  const paginate = useCallback(
    (dir: 1 | -1) => {
      if (count < 2) return
      setDirection(dir)
      setActiveIndex((current) => (current + dir + count) % count)
    },
    [count],
  )

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowUp') {
        event.preventDefault()
        paginate(1)
      }
      if (event.key === 'ArrowDown') {
        event.preventDefault()
        paginate(-1)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [paginate])

  const handleDragEnd = useCallback(
    (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      const swipe = getSwipeDirection(info.offset.y, info.velocity.y)
      if (swipe === 1) paginate(1)
      else if (swipe === -1) paginate(-1)
      dragY.set(0)
    },
    [paginate, dragY],
  )

  const backLayers = useMemo(() => {
    if (count < 2) return []
    const safeActive = activeIndex % count
    const backCount = Math.min(MAX_BACK_LAYERS, count - 1)
    const layers: { project: Project; depth: number; stackIndex: number }[] = []

    for (let depth = backCount; depth >= 1; depth -= 1) {
      const stackIndex = (safeActive + depth) % count
      layers.push({ project: projects[stackIndex], depth, stackIndex })
    }

    return layers
  }, [activeIndex, count, projects])

  const focusProject = useCallback(
    (stackIndex: number) => {
      const safeActive = activeIndex % count
      if (stackIndex === safeActive) return
      setDirection(1)
      setActiveIndex(stackIndex)
    },
    [activeIndex, count],
  )

  if (count === 0) {
    return (
      <p className="ticket-stack__empty py-16 text-center text-slate">
        No projects match this filter yet.
      </p>
    )
  }

  const safeActive = activeIndex % count
  const activeProject = projects[safeActive]
  const peekPadding = count > 1 ? Math.min(MAX_BACK_LAYERS, count - 1) * PEEK_STEP_PX : 0
  const frontVariants = getFrontCardVariants(!!reduceMotion)
  const motionTransition = reduceMotion ? { duration: 0 } : stackTransition

  const stackContent = (
    <>
      <div className="ticket-stack__chrome">
        <p className="ticket-stack__hint">
          Swipe the ticket up or down to browse. Tap a pass behind the stack to jump to it, or open
          the case study from the front pass.
        </p>
        {count > 1 && (
          <div className="ticket-stack__swipe-cues" aria-hidden>
            <span className="ticket-stack__swipe-cue">↑ Next</span>
            <span className="ticket-stack__swipe-cue">↓ Previous</span>
          </div>
        )}
      </div>

      <motion.div
        layout
        className="ticket-stack-deck"
        style={{
          paddingTop: peekPadding,
          ['--stack-peek-step' as string]: `${PEEK_STEP_PX}px`,
          perspective: reduceMotion ? undefined : 1200,
        }}
        tabIndex={0}
        role="region"
        aria-label={`Project cards, ${safeActive + 1} of ${count}`}
        aria-roledescription="carousel"
      >
        <AnimatePresence initial={false} mode="popLayout">
          {backLayers.map(({ project, depth, stackIndex }) => (
            <motion.button
              key={`back-${depth}-${project.id}`}
              type="button"
              className="stack-card-back-slot"
              style={{ zIndex: 10 - depth }}
              initial={
                reduceMotion
                  ? false
                  : { opacity: 0, y: -24, scale: getBackCardAnimate(depth, PEEK_STEP_PX).scale - 0.04 }
              }
              animate={getBackCardAnimate(depth, PEEK_STEP_PX)}
              exit={
                reduceMotion
                  ? undefined
                  : { opacity: 0, y: -32, scale: getBackCardAnimate(depth, PEEK_STEP_PX).scale - 0.06 }
              }
              transition={reduceMotion ? { duration: 0 } : stackSpring}
              whileHover={getBackCardHover(depth, !!reduceMotion)}
              whileTap={reduceMotion ? undefined : getBackCardTap(depth)}
              aria-label={`Bring ${project.title} to front`}
              onClick={() => focusProject(stackIndex)}
            >
              <BoardingTicket
                project={project}
                index={stackIndex}
                variant="back"
                backDepth={depth - 1}
                peekTier={peekTierForDepth(depth)}
              />
            </motion.button>
          ))}
        </AnimatePresence>

        <div className="ticket-stack__front-slot" style={{ zIndex: 20 }}>
          <AnimatePresence mode="popLayout" custom={direction}>
            <motion.div
              key={activeProject.id}
              custom={direction}
              variants={frontVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={motionTransition}
              drag={reduceMotion || count < 2 ? false : 'y'}
              dragConstraints={{ top: -DRAG_LIMIT, bottom: DRAG_LIMIT }}
              dragElastic={0.2}
              dragMomentum={false}
              dragTransition={{ bounceStiffness: 380, bounceDamping: 34 }}
              style={{
                rotateZ: dragRotateZ,
                transformStyle: reduceMotion ? undefined : 'preserve-3d',
              }}
              whileDrag={getFrontDragMotion(!!reduceMotion)}
              onDrag={(_, info) => {
                if (!reduceMotion) dragY.set(info.offset.y)
              }}
              onDragEnd={handleDragEnd}
              className="ticket-stack__front-shell"
              aria-live="polite"
            >
              <motion.div
                className="ticket-stack__front-inner"
                whileHover={reduceMotion ? undefined : { scale: 1.008 }}
                transition={stackSpring}
              >
                <BoardingTicket project={activeProject} index={safeActive} variant="front" />
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>

      <div className="ticket-stack__controls">
        <p className="ticket-stack__counter">
          <span className="ticket-stack__counter-num">{safeActive + 1}</span>
          <span className="text-slate"> / {count}</span>
        </p>

        <div className="ticket-stack__nav" aria-label="Project stack navigation">
          {projects.map((project, index) => (
            <motion.button
              key={project.id}
              type="button"
              aria-label={`Show ${project.title}`}
              aria-current={index === safeActive}
              className={`ticket-stack__dot ${index === safeActive ? 'ticket-stack__dot--active' : ''}`}
              animate={
                reduceMotion
                  ? undefined
                  : {
                      scale: index === safeActive ? 1.35 : 1,
                    }
              }
              whileHover={reduceMotion ? undefined : { scale: index === safeActive ? 1.45 : 1.2 }}
              transition={stackSpring}
              onClick={() => {
                if (index === safeActive) return
                setDirection(index > safeActive ? 1 : -1)
                setActiveIndex(index)
              }}
            />
          ))}
        </div>

        {count > 1 ? (
          <div className="ticket-stack__steppers">
            <motion.button
              type="button"
              className="ticket-stack__step"
              aria-label="Previous project"
              whileHover={reduceMotion ? undefined : { scale: 1.05 }}
              whileTap={reduceMotion ? undefined : { scale: 0.97 }}
              transition={stackSpring}
              onClick={() => paginate(-1)}
            >
              ↓ Prev
            </motion.button>
            <motion.button
              type="button"
              className="ticket-stack__step"
              aria-label="Next project"
              whileHover={reduceMotion ? undefined : { scale: 1.05 }}
              whileTap={reduceMotion ? undefined : { scale: 0.97 }}
              transition={stackSpring}
              onClick={() => paginate(1)}
            >
              ↑ Next
            </motion.button>
          </div>
        ) : (
          <div className="ticket-stack__steppers ticket-stack__steppers--placeholder" aria-hidden />
        )}
      </div>
    </>
  )

  if (embedded) {
    return stackContent
  }

  return <div className="ticket-stack-stage mt-10 md:mt-12">{stackContent}</div>
}
