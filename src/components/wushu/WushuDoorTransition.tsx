import { motion, useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'

type DoorPhase = 'closing' | 'paused' | 'slashing' | 'slash-hold' | 'opening'

interface WushuDoorTransitionProps {
  onComplete: () => void
}

const CLOSE_S = 2
const PAUSE_S = 1
const SLASH_S = 0.1
const SLASH_HOLD_S = 0.5
const OPEN_S = 1

const CLOSE_MS = CLOSE_S * 1000
const PAUSE_MS = PAUSE_S * 1000
const SLASH_MS = SLASH_S * 1000
const SLASH_HOLD_MS = SLASH_HOLD_S * 1000
const OPEN_MS = OPEN_S * 1000

/** Straight slash — ~15° from vertical, through center */
const SLASH_PATH = 'M 37 0 L 63 100'

export function WushuDoorTransition({ onComplete }: WushuDoorTransitionProps) {
  const reducedMotion = useReducedMotion()
  const [phase, setPhase] = useState<DoorPhase>('closing')

  useEffect(() => {
    if (reducedMotion) {
      onComplete()
      return
    }

    document.body.style.overflow = 'hidden'

    const pauseTimer = window.setTimeout(() => setPhase('paused'), CLOSE_MS)
    const slashTimer = window.setTimeout(() => setPhase('slashing'), CLOSE_MS + PAUSE_MS)
    const slashHoldTimer = window.setTimeout(
      () => setPhase('slash-hold'),
      CLOSE_MS + PAUSE_MS + SLASH_MS,
    )
    const openTimer = window.setTimeout(
      () => setPhase('opening'),
      CLOSE_MS + PAUSE_MS + SLASH_MS + SLASH_HOLD_MS,
    )
    const doneTimer = window.setTimeout(() => {
      document.body.style.overflow = ''
      onComplete()
    }, CLOSE_MS + PAUSE_MS + SLASH_MS + SLASH_HOLD_MS + OPEN_MS)

    return () => {
      window.clearTimeout(pauseTimer)
      window.clearTimeout(slashTimer)
      window.clearTimeout(slashHoldTimer)
      window.clearTimeout(openTimer)
      window.clearTimeout(doneTimer)
      document.body.style.overflow = ''
    }
  }, [onComplete, reducedMotion])

  if (reducedMotion) return null

  const leftDoorAnimate =
    phase === 'opening'
      ? { x: '-105%', rotate: 0, opacity: 1 }
      : { x: '0%', rotate: 0, opacity: 1 }

  const rightDoorAnimate =
    phase === 'opening'
      ? { x: '105%', rotate: 0, opacity: 1 }
      : { x: '0%', rotate: 0, opacity: 1 }

  const doorTransition = {
    duration: phase === 'opening' ? OPEN_S : CLOSE_S,
    ease: phase === 'opening' ? [0.55, 0, 0.2, 1] : [0.4, 0, 0.2, 1],
  }

  return (
    <div className="wushu-doors-overlay" role="presentation" aria-hidden="true">
      <div className="wushu-doors-overlay__vignette" />

      <motion.div
        className="wushu-door wushu-door--left"
        initial={{ x: '-100%' }}
        animate={leftDoorAnimate}
        transition={doorTransition}
      >
        <div className="wushu-door__shell">
          <div className="wushu-door__rail wushu-door__rail--top" />
          <div className="wushu-door__body">
            <div className="wushu-door__shoji">
              <div className="wushu-door__paper" />
              <div className="wushu-door__kumiko" aria-hidden="true" />
            </div>
            <div className="wushu-door__koshi" />
          </div>
          <div className="wushu-door__rail wushu-door__rail--bottom" />
          <div className="wushu-door__stile wushu-door__stile--meet" />
        </div>
      </motion.div>

      <motion.div
        className="wushu-door wushu-door--right"
        initial={{ x: '100%' }}
        animate={rightDoorAnimate}
        transition={doorTransition}
      >
        <div className="wushu-door__shell">
          <div className="wushu-door__rail wushu-door__rail--top" />
          <div className="wushu-door__body">
            <div className="wushu-door__shoji">
              <div className="wushu-door__paper" />
              <div className="wushu-door__kumiko" aria-hidden="true" />
            </div>
            <div className="wushu-door__koshi" />
          </div>
          <div className="wushu-door__rail wushu-door__rail--bottom" />
          <div className="wushu-door__stile wushu-door__stile--meet" />
        </div>
      </motion.div>

      {(phase === 'slashing' || phase === 'slash-hold') && (
        <div className="wushu-doors-overlay__lightning-wrap">
          <motion.div
            className="wushu-doors-overlay__slash-flash"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.5, 0.2, 0] }}
            transition={{ duration: SLASH_S, ease: 'easeOut', times: [0, 0.1, 0.3, 1] }}
          />
          <svg
            className="wushu-doors-overlay__lightning"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <defs>
              <filter id="wushu-lightning-glow" x="-80%" y="-20%" width="260%" height="140%">
                <feGaussianBlur stdDeviation="0.9" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <motion.path
              d={SLASH_PATH}
              fill="none"
              stroke="#fffef5"
              strokeWidth="1.1"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#wushu-lightning-glow)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: [0, 1, 1, 0.8] }}
              transition={{
                duration: SLASH_S,
                ease: [0.22, 0.05, 0.25, 1],
                opacity: { duration: SLASH_S, times: [0, 0.06, 0.8, 1] },
              }}
            />
          </svg>
        </div>
      )}
    </div>
  )
}
