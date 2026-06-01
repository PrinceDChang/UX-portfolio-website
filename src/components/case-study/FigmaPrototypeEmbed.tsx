import { useLayoutEffect, useRef, useState } from 'react'

type FigmaEmbedLayout = 'phone' | 'fit'

interface FigmaPrototypeEmbedProps {
  src: string
  title: string
  /** Native prototype frame size used for scale-to-fit */
  frameWidth: number
  frameHeight: number
  /** Phone: full iframe in aspect box (interactive). Fit: scale to cell. */
  layout?: FigmaEmbedLayout
  /** Multiplier on fit scale (fit layout only) */
  scale?: number
}

export function FigmaPrototypeEmbed({
  src,
  title,
  frameWidth,
  frameHeight,
  layout = 'fit',
  scale: scaleFactor = 1,
}: FigmaPrototypeEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [size, setSize] = useState({ width: frameWidth, height: frameHeight })

  useLayoutEffect(() => {
    if (layout !== 'fit') return

    const container = containerRef.current
    if (!container) return

    const updateSize = () => {
      const { width, height } = container.getBoundingClientRect()
      if (width === 0 || height === 0) return
      const fitScale =
        Math.min(width / frameWidth, height / frameHeight) * scaleFactor
      setSize({
        width: Math.floor(frameWidth * fitScale),
        height: Math.floor(frameHeight * fitScale),
      })
    }

    updateSize()
    const observer = new ResizeObserver(updateSize)
    observer.observe(container)
    return () => observer.disconnect()
  }, [frameWidth, frameHeight, scaleFactor, layout])

  if (layout === 'phone') {
    return (
      <div className="pointer-events-auto flex justify-center bg-[#0a0a12] px-3 py-5 sm:px-4">
        <div
          className="relative w-full max-w-[min(100%,380px)] overflow-hidden rounded-xl ring-1 ring-white/10"
          style={{ aspectRatio: `${frameWidth} / ${frameHeight}` }}
        >
          <iframe
            src={src}
            title={title}
            className="absolute inset-0 h-full w-full border-0"
            allow="fullscreen; clipboard-write"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      className="pointer-events-auto flex min-h-[min(72vw,420px)] w-full flex-1 items-center justify-center bg-[#0a0a12] px-2 py-3 sm:px-3 md:min-h-[440px]"
    >
      <iframe
        src={src}
        title={title}
        width={size.width}
        height={size.height}
        className="max-h-full max-w-full shrink-0 rounded-xl border-0 ring-1 ring-white/10"
        allow="fullscreen; clipboard-write"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  )
}
