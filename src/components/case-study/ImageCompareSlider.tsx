import { motion, useInView, useReducedMotion } from 'framer-motion'
import {
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type PointerEvent as ReactPointerEvent,
} from 'react'

export interface ImageCompareSliderProps {
  beforeSrc: string
  afterSrc: string
  beforeAlt: string
  afterAlt: string
  beforeLabel?: string
  afterLabel?: string
  /** width / height — defaults to 1024 / 583 */
  aspectRatio?: number
  initialPosition?: number
  className?: string
}

function clampPosition(value: number) {
  return Math.min(100, Math.max(0, value))
}

const BEFORE_LABEL_X = 25
const AFTER_LABEL_X = 75
/** Handle proximity — labels fade to 0 at the handle center */
const LABEL_HIDE_RADIUS = 14
/** Past these positions one image fills the frame — fade out the other label */
const ONLY_BEFORE_MAX = 12
const ONLY_AFTER_MIN = 88
const EXTREME_FADE_BAND = 14

function fadeByDistance(distance: number, radius: number) {
  if (distance >= radius) return 1
  return distance / radius
}

function handleLabelOpacity(handlePosition: number, labelPosition: number) {
  return fadeByDistance(Math.abs(handlePosition - labelPosition), LABEL_HIDE_RADIUS)
}

function extremeBeforeOpacity(position: number) {
  if (position <= ONLY_BEFORE_MAX) return 0
  const fadeEnd = ONLY_BEFORE_MAX + EXTREME_FADE_BAND
  if (position >= fadeEnd) return 1
  return fadeByDistance(position - ONLY_BEFORE_MAX, EXTREME_FADE_BAND)
}

function extremeAfterOpacity(position: number) {
  if (position >= ONLY_AFTER_MIN) return 0
  const fadeStart = ONLY_AFTER_MIN - EXTREME_FADE_BAND
  if (position <= fadeStart) return 1
  return fadeByDistance(ONLY_AFTER_MIN - position, EXTREME_FADE_BAND)
}

function getLabelOpacity(position: number, side: 'before' | 'after') {
  if (side === 'before') {
    return handleLabelOpacity(position, BEFORE_LABEL_X) * extremeBeforeOpacity(position)
  }
  return handleLabelOpacity(position, AFTER_LABEL_X) * extremeAfterOpacity(position)
}

function applyLabelOpacity(
  position: number,
  beforeEl: HTMLSpanElement | null,
  afterEl: HTMLSpanElement | null,
) {
  const beforeOpacity = getLabelOpacity(position, 'before')
  const afterOpacity = getLabelOpacity(position, 'after')

  if (beforeEl) {
    beforeEl.style.opacity = String(beforeOpacity)
    beforeEl.style.visibility = beforeOpacity < 0.04 ? 'hidden' : 'visible'
  }
  if (afterEl) {
    afterEl.style.opacity = String(afterOpacity)
    afterEl.style.visibility = afterOpacity < 0.04 ? 'hidden' : 'visible'
  }
}

export function ImageCompareSlider({
  beforeSrc,
  afterSrc,
  beforeAlt,
  afterAlt,
  beforeLabel = 'Before',
  afterLabel = 'After',
  aspectRatio = 1024 / 583,
  initialPosition = 50,
  className = '',
}: ImageCompareSliderProps) {
  const containerRef = useRef<HTMLElement>(null)
  const mediaRef = useRef<HTMLDivElement>(null)
  const handleRef = useRef<HTMLButtonElement>(null)
  const beforeLabelRef = useRef<HTMLSpanElement>(null)
  const afterLabelRef = useRef<HTMLSpanElement>(null)
  const labelId = useId()
  const reducedMotion = useReducedMotion()
  const inView = useInView(containerRef, { once: true, amount: 0.35 })
  const [position, setPosition] = useState(initialPosition)
  const [mediaWidth, setMediaWidth] = useState(0)
  const [dragging, setDragging] = useState(false)

  const applyPosition = useCallback((next: number) => {
    const clamped = clampPosition(next)
    mediaRef.current?.style.setProperty('--compare-pos', `${clamped}%`)
    applyLabelOpacity(clamped, beforeLabelRef.current, afterLabelRef.current)
    return clamped
  }, [])

  useLayoutEffect(() => {
    const node = mediaRef.current
    if (!node) return

    const syncWidth = () => {
      setMediaWidth(node.offsetWidth)
    }

    syncWidth()
    applyPosition(initialPosition)
    applyLabelOpacity(initialPosition, beforeLabelRef.current, afterLabelRef.current)

    const observer = new ResizeObserver(syncWidth)
    observer.observe(node)

    return () => observer.disconnect()
  }, [applyPosition, initialPosition])

  const setPositionFromClientX = useCallback(
    (clientX: number) => {
      const rect = mediaRef.current?.getBoundingClientRect()
      if (!rect) return
      const next = ((clientX - rect.left) / rect.width) * 100
      const clamped = applyPosition(next)
      setPosition(clamped)
    },
    [applyPosition],
  )

  useEffect(() => {
    if (!dragging) return

    const onPointerMove = (event: PointerEvent) => {
      setPositionFromClientX(event.clientX)
    }

    const endDrag = () => {
      setDragging(false)
    }

    window.addEventListener('pointermove', onPointerMove)
    window.addEventListener('pointerup', endDrag)
    window.addEventListener('pointercancel', endDrag)

    return () => {
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerup', endDrag)
      window.removeEventListener('pointercancel', endDrag)
    }
  }, [dragging, setPositionFromClientX])

  const startDrag = (event: ReactPointerEvent, target: HTMLElement) => {
    event.preventDefault()
    event.stopPropagation()
    target.setPointerCapture(event.pointerId)
    setDragging(true)
    setPositionFromClientX(event.clientX)
  }

  const onHandlePointerDown = (event: ReactPointerEvent<HTMLButtonElement>) => {
    startDrag(event, event.currentTarget)
  }

  const onTrackPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.target === handleRef.current) return
    startDrag(event, event.currentTarget)
  }

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    const step = event.shiftKey ? 10 : 4
    let next = position

    if (event.key === 'ArrowLeft' || event.key === 'ArrowDown') {
      event.preventDefault()
      next = position - step
    } else if (event.key === 'ArrowRight' || event.key === 'ArrowUp') {
      event.preventDefault()
      next = position + step
    } else if (event.key === 'Home') {
      event.preventDefault()
      next = 0
    } else if (event.key === 'End') {
      event.preventDefault()
      next = 100
    } else {
      return
    }

    const clamped = applyPosition(next)
    setPosition(clamped)
  }

  const revealHint = inView && !reducedMotion && !dragging
  const beforeLabelOpacity = getLabelOpacity(position, 'before')
  const afterLabelOpacity = getLabelOpacity(position, 'after')

  return (
    <motion.figure
      ref={containerRef}
      className={`group/compare relative select-none overflow-hidden rounded-3xl bg-[#f4f4f6] ring-1 ring-white/[0.1] shadow-soft ${className}`.trim()}
      initial={{ opacity: 0, y: 18 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      aria-labelledby={labelId}
    >
      <p id={labelId} className="sr-only">
        Drag the slider or use arrow keys to compare {beforeLabel} ({beforeAlt}) and {afterLabel} ({afterAlt})
      </p>

      <div
        ref={mediaRef}
        className="image-compare-media relative w-full touch-none"
        style={
          {
            aspectRatio,
            '--compare-pos': `${position}%`,
          } as CSSProperties
        }
        onPointerDown={onTrackPointerDown}
      >
        <img
          src={beforeSrc}
          alt={beforeAlt}
          className="pointer-events-none absolute top-0 left-0 block w-full h-auto"
          draggable={false}
          decoding="async"
        />

        <div
          className="image-compare-after-clip pointer-events-none absolute inset-y-0 right-0 overflow-hidden"
          aria-hidden
        >
          <img
            src={afterSrc}
            alt=""
            className="pointer-events-none absolute top-0 right-0 block h-auto max-w-none"
            style={{ width: mediaWidth > 0 ? mediaWidth : '100%' }}
            draggable={false}
            decoding="async"
          />
        </div>

        <div className="image-compare-divider pointer-events-none absolute inset-y-0 z-20 w-0.5 -translate-x-1/2 bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.18)]" aria-hidden />

        <button
          ref={handleRef}
          type="button"
          className="image-compare-handle absolute top-1/2 z-30 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize items-center justify-center rounded-full border border-white/70 bg-white text-[#141418] shadow-[0_8px_28px_rgba(0,0,0,0.28)] transition-[transform,box-shadow] hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent active:scale-100"
          style={{ touchAction: 'none' }}
          role="slider"
          aria-label={`Compare ${beforeLabel} and ${afterLabel}`}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(position)}
          aria-valuetext={`${Math.round(position)}% — ${beforeLabel} on the left, ${afterLabel} on the right`}
          onPointerDown={onHandlePointerDown}
          onKeyDown={onKeyDown}
        >
          <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none" aria-hidden>
            <path
              d="M6 4L2 8L6 12M10 4L14 8L10 12"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <span
          ref={beforeLabelRef}
          className="pointer-events-none absolute bottom-5 left-1/4 z-10 -translate-x-1/2 transition-opacity duration-200 ease-out"
          style={{ opacity: beforeLabelOpacity }}
          aria-hidden={beforeLabelOpacity < 0.04}
        >
          <span className="rounded-lg bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-[#141418] shadow-[0_4px_24px_rgba(0,0,0,0.28)] ring-2 ring-[#141418]/15 backdrop-blur-md md:text-sm">
            {beforeLabel}
          </span>
        </span>
        <span
          ref={afterLabelRef}
          className="pointer-events-none absolute bottom-5 left-3/4 z-10 -translate-x-1/2 transition-opacity duration-200 ease-out"
          style={{ opacity: afterLabelOpacity }}
          aria-hidden={afterLabelOpacity < 0.04}
        >
          <span className="rounded-lg bg-accent px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-white shadow-[0_4px_20px_rgba(104,64,212,0.45)] ring-1 ring-white/25 backdrop-blur-md md:text-sm">
            {afterLabel}
          </span>
        </span>
      </div>

      <motion.p
        className="pointer-events-none absolute bottom-4 left-1/2 z-10 -translate-x-1/2 rounded-full bg-black/50 px-3 py-1 text-[11px] font-medium text-white/90 backdrop-blur-sm md:opacity-0 md:transition-opacity md:group-hover/compare:opacity-100 md:group-focus-within/compare:opacity-100"
        initial={false}
        animate={
          revealHint
            ? { opacity: [0.55, 1, 0.55], x: ['-50%', 'calc(-50% - 6px)', '-50%'] }
            : { opacity: 0.85, x: '-50%' }
        }
        transition={
          revealHint
            ? { duration: 2.4, repeat: 2, ease: 'easeInOut' }
            : { duration: 0.2 }
        }
        aria-hidden
      >
        Drag to compare
      </motion.p>
    </motion.figure>
  )
}
