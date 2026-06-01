import { useCallback, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

export interface ImageCarouselSlide {
  src: string
  alt: string
}

interface ImageCarouselProps {
  slides: readonly ImageCarouselSlide[]
  className?: string
  frameClassName?: string
  imageClassName?: string
}

export function ImageCarousel({
  slides,
  className = '',
  frameClassName = 'min-h-[200px] md:min-h-[240px]',
  imageClassName = 'h-auto w-full object-contain p-3 md:p-4',
}: ImageCarouselProps) {
  const [index, setIndex] = useState(0)
  const total = slides.length
  const current = slides[index]

  const goTo = useCallback(
    (next: number) => {
      setIndex(((next % total) + total) % total)
    },
    [total],
  )

  if (!current) return null

  return (
    <div className={className}>
      <div
        className="relative overflow-hidden rounded-xl border border-white/[0.06] bg-[#0a0a12] ring-1 ring-white/[0.05]"
        aria-roledescription="carousel"
      >
        <div className={`relative ${frameClassName}`}>
          <AnimatePresence mode="wait">
            <motion.img
              key={current.src}
              src={current.src}
              alt={current.alt}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className={imageClassName}
              loading="lazy"
              decoding="async"
              draggable={false}
            />
          </AnimatePresence>
        </div>

        {total > 1 && (
          <>
            <button
              type="button"
              onClick={() => goTo(index - 1)}
              className="absolute left-2 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/50 text-ink backdrop-blur-sm transition hover:bg-black/70"
              aria-label="Previous image"
            >
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden>
                <path
                  d="M12.5 15L7.5 10L12.5 5"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => goTo(index + 1)}
              className="absolute right-2 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/50 text-ink backdrop-blur-sm transition hover:bg-black/70"
              aria-label="Next image"
            >
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden>
                <path
                  d="M7.5 15L12.5 10L7.5 5"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </>
        )}
      </div>

      {total > 1 && (
        <div className="mt-4 flex justify-center gap-2" role="tablist" aria-label="Select image">
          {slides.map((slide, i) => (
            <button
              key={slide.src}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={slide.alt}
              onClick={() => setIndex(i)}
              className={`h-2 rounded-full transition-all ${
                i === index
                  ? 'w-8 bg-accent shadow-[0_0_10px_rgba(153,112,255,0.5)]'
                  : 'w-2 bg-white/25 hover:bg-white/40'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
