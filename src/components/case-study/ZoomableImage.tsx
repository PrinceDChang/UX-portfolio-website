import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

const MIN_SCALE = 1
const MAX_SCALE = 4
const ZOOM_STEP = 0.08
const DOUBLE_CLICK_SCALE = 1.75
const ZOOM_EASE =
  'transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]'
function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

interface ZoomableImageSurfaceProps {
  src: string
  alt: string
  className?: string
  variant?: 'inline' | 'fullscreen'
  compact?: boolean
  onRequestClose?: () => void
  onRequestExpand?: () => void
}

function ZoomableImageSurface({
  src,
  alt,
  className = '',
  variant = 'inline',
  compact = false,
  onRequestClose,
  onRequestExpand,
}: ZoomableImageSurfaceProps) {
  const viewportRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const dragRef = useRef<{
    pointerId: number
    startX: number
    startY: number
    origX: number
    origY: number
  } | null>(null)

  const isFullscreen = variant === 'fullscreen'
  const canPan = scale > 1

  const resetView = useCallback(() => {
    setScale(1)
    setOffset({ x: 0, y: 0 })
  }, [])

  const zoomBy = useCallback((delta: number) => {
    setScale((current) => {
      const next = clamp(current + delta, MIN_SCALE, MAX_SCALE)
      if (next <= 1) setOffset({ x: 0, y: 0 })
      return next
    })
  }, [])

  useEffect(() => {
    const viewport = viewportRef.current
    if (!viewport) return

    const onWheel = (event: WheelEvent) => {
      event.preventDefault()
      const step =
        ZOOM_STEP * Math.min(2, Math.max(0.35, Math.abs(event.deltaY) / 100))
      const delta = event.deltaY > 0 ? -step : step
      setScale((current) => {
        const next = clamp(current + delta, MIN_SCALE, MAX_SCALE)
        if (next <= 1) setOffset({ x: 0, y: 0 })
        return next
      })
    }

    viewport.addEventListener('wheel', onWheel, { passive: false })
    return () => viewport.removeEventListener('wheel', onWheel)
  }, [])

  useEffect(() => {
    if (!isFullscreen || !onRequestClose) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onRequestClose()
    }

    document.addEventListener('keydown', onKeyDown)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = prevOverflow
    }
  }, [isFullscreen, onRequestClose])

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!canPan) return
    setIsDragging(true)
    event.currentTarget.setPointerCapture(event.pointerId)
    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      origX: offset.x,
      origY: offset.y,
    }
  }

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current
    if (!drag || drag.pointerId !== event.pointerId) return

    setOffset({
      x: drag.origX + (event.clientX - drag.startX),
      y: drag.origY + (event.clientY - drag.startY),
    })
  }

  const endPointer = (event: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current
    if (!drag || drag.pointerId !== event.pointerId) return
    dragRef.current = null
    setIsDragging(false)
    event.currentTarget.releasePointerCapture(event.pointerId)
  }

  const onDoubleClick = () => {
    if (scale > 1) resetView()
    else setScale(DOUBLE_CLICK_SCALE)
  }

  return (
    <div
      className={
        isFullscreen
          ? 'fixed inset-0 z-[200] flex flex-col bg-[#050508]/95 p-4 backdrop-blur-sm md:p-8'
          : `relative ${className}`
      }
    >
      {isFullscreen && onRequestClose && (
        <button
          type="button"
          onClick={onRequestClose}
          className="absolute right-4 top-4 z-10 rounded-full border border-white/15 bg-elevated/90 px-4 py-2 text-sm font-medium text-ink transition hover:bg-white/10 md:right-8 md:top-8"
        >
          Close
        </button>
      )}

      <div
        ref={viewportRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endPointer}
        onPointerCancel={endPointer}
        onDoubleClick={onDoubleClick}
        onClick={() => {
          if (
            !isFullscreen &&
            compact &&
            onRequestExpand &&
            scale <= 1 &&
            !isDragging
          ) {
            onRequestExpand()
          }
        }}
        className={`relative flex touch-none items-center justify-center overflow-hidden rounded-2xl bg-[#0a0a12] ring-1 ring-white/[0.06] ${
          isFullscreen
            ? 'mx-auto mt-12 min-h-0 w-full max-w-6xl flex-1'
            : compact
              ? 'h-[min(58vh,500px)] min-h-[12rem] max-h-[min(58vh,500px)] w-full'
              : 'min-h-[min(56vw,420px)] w-full'
        } ${canPan ? 'cursor-grab active:cursor-grabbing' : compact && onRequestExpand ? 'cursor-pointer' : 'cursor-zoom-in'}`}
      >
        <img
          src={src}
          alt={alt}
          draggable={false}
          className={`max-h-full max-w-full select-none object-contain will-change-transform ${
            isDragging ? '' : ZOOM_EASE
          }`}
          style={{
            transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`,
          }}
        />
      </div>

      <div
        className={`mt-3 flex flex-wrap items-center justify-between gap-3 text-xs text-slate ${
          isFullscreen ? 'mx-auto w-full max-w-6xl' : ''
        }`}
      >
        <p className="max-w-xl">
          {compact && !isFullscreen
            ? 'Click the image or Expand to view full size · scroll to zoom in expanded view'
            : 'Scroll or +/− to zoom · drag to pan when zoomed · double-click to toggle zoom'}
        </p>
        <div className={`flex flex-wrap items-center gap-2 ${compact && !isFullscreen ? 'ml-auto' : ''}`}>
          {(!compact || isFullscreen) && (
            <>
              <button
                type="button"
                onClick={() => zoomBy(-ZOOM_STEP)}
                disabled={scale <= MIN_SCALE}
                className="rounded-lg border border-white/10 bg-white/[0.04] px-3 py-1.5 font-medium text-ink transition hover:bg-white/[0.08] disabled:opacity-40"
                aria-label="Zoom out"
              >
                −
              </button>
              <span className="min-w-[3rem] text-center tabular-nums text-ink/80">
                {Math.round(scale * 100)}%
              </span>
              <button
                type="button"
                onClick={() => zoomBy(ZOOM_STEP)}
                disabled={scale >= MAX_SCALE}
                className="rounded-lg border border-white/10 bg-white/[0.04] px-3 py-1.5 font-medium text-ink transition hover:bg-white/[0.08] disabled:opacity-40"
                aria-label="Zoom in"
              >
                +
              </button>
              <button
                type="button"
                onClick={resetView}
                className="rounded-lg border border-white/10 bg-white/[0.04] px-3 py-1.5 font-medium text-ink transition hover:bg-white/[0.08]"
              >
                Reset
              </button>
            </>
          )}
          {!isFullscreen && onRequestExpand && (
            <button
              type="button"
              onClick={onRequestExpand}
              className="rounded-lg border border-accent/35 bg-accent/10 px-3 py-1.5 font-medium text-accent transition hover:bg-accent/20"
            >
              Expand
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

interface ZoomableImageProps {
  src: string
  alt: string
  className?: string
  compact?: boolean
}

export function ZoomableImage({
  src,
  alt,
  className = 'mt-6',
  compact = false,
}: ZoomableImageProps) {
  const [expanded, setExpanded] = useState(false)

  return (
    <>
      <ZoomableImageSurface
        src={src}
        alt={alt}
        className={className}
        variant="inline"
        compact={compact}
        onRequestExpand={() => setExpanded(true)}
      />

      {expanded &&
        createPortal(
          <div role="dialog" aria-modal="true" aria-label={alt}>
            <ZoomableImageSurface
              src={src}
              alt={alt}
              variant="fullscreen"
              onRequestClose={() => setExpanded(false)}
            />
          </div>,
          document.body,
        )}
    </>
  )
}
