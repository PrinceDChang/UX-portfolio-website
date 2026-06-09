import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
  type MotionValue,
} from 'framer-motion'
import { useEffect } from 'react'

interface PhotographyShutterTransitionProps {
  onNavigate: () => void
  onReveal: () => void
  onComplete: () => void
}

const CLOSE_S = 1.1
const PAUSE_S = 1
const OPEN_S = 1.1

function ShutterCurtain({ position, shutter }: { position: 'top' | 'bottom'; shutter: MotionValue<number> }) {
  const y = useTransform(
    shutter,
    [0, 1],
    position === 'top' ? ['0%', '-100%'] : ['0%', '100%'],
  )

  return (
    <motion.div
      className={`photo-shutter__curtain photo-shutter__curtain--${position}`}
      style={{ y }}
      aria-hidden="true"
    >
      <div className="photo-shutter__curtain-surface" />
      <div className="photo-shutter__curtain-edge" />
    </motion.div>
  )
}

export function PhotographyShutterTransition({
  onNavigate,
  onReveal,
  onComplete,
}: PhotographyShutterTransitionProps) {
  const reducedMotion = useReducedMotion()
  const shutter = useMotionValue(1)

  useEffect(() => {
    if (reducedMotion) {
      onNavigate()
      onReveal()
      onComplete()
      return
    }

    document.body.style.overflow = 'hidden'
    let cancelled = false

    const run = async () => {
      await animate(shutter, 0, {
        duration: CLOSE_S,
        ease: [0.42, 0, 0.18, 1],
        type: 'tween',
      })
      if (cancelled) return

      onNavigate()
      await new Promise((resolve) => window.setTimeout(resolve, PAUSE_S * 1000))
      if (cancelled) return

      await animate(shutter, 1, {
        duration: OPEN_S,
        ease: [0.65, 0, 0.35, 1],
        type: 'tween',
      })
      if (cancelled) return

      onReveal()
      document.body.style.overflow = ''
      onComplete()
    }

    void run()

    return () => {
      cancelled = true
      document.body.style.overflow = ''
    }
  }, [onComplete, onNavigate, onReveal, reducedMotion, shutter])

  if (reducedMotion) return null

  return (
    <div className="photo-shutter-overlay" role="presentation" aria-hidden="true">
      <ShutterCurtain position="top" shutter={shutter} />
      <ShutterCurtain position="bottom" shutter={shutter} />
    </div>
  )
}
