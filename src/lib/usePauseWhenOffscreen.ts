import { useInView } from 'framer-motion'
import { useEffect, useRef, type RefObject } from 'react'

type Margin = `${number}px ${number}px ${number}px ${number}px`

interface UsePauseWhenOffscreenOptions {
  amount?: number
  margin?: Margin
  /** Observe a parent element instead of the returned rootRef */
  rootRef?: RefObject<HTMLElement | null>
}

/**
 * Pauses auto-advance timers when the target leaves the viewport or the tab is hidden.
 * Returns a ref to attach to the observed root (unless `rootRef` is passed in).
 */
export function usePauseWhenOffscreen(options: UsePauseWhenOffscreenOptions = {}) {
  const internalRef = useRef<HTMLDivElement>(null)
  const observedRef = options.rootRef ?? internalRef
  const inView = useInView(observedRef, {
    amount: options.amount ?? 0.35,
    margin: options.margin ?? '0px 0px -10% 0px',
  })
  const inViewRef = useRef(true)
  const pausedRef = useRef(false)

  inViewRef.current = inView

  useEffect(() => {
    const syncPaused = () => {
      pausedRef.current = document.hidden || !inViewRef.current
    }
    syncPaused()
    document.addEventListener('visibilitychange', syncPaused)
    return () => document.removeEventListener('visibilitychange', syncPaused)
  }, [])

  useEffect(() => {
    pausedRef.current = document.hidden || !inView
  }, [inView])

  return {
    rootRef: internalRef,
    pausedRef,
    inView,
  }
}
