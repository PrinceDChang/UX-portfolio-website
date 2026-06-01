import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

export interface FlipCardItem {
  src: string
  alt: string
  caption?: string
}

interface FlipCardGalleryProps {
  cards: readonly FlipCardItem[]
  className?: string
}

export function FlipCardGallery({ cards, className = 'mt-6' }: FlipCardGalleryProps) {
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const total = cards.length

  const goTo = useCallback(
    (next: number) => {
      if (total === 0) return
      const wrapped = ((next % total) + total) % total
      if (wrapped === index) return

      const forward =
        wrapped > index || (index === total - 1 && wrapped === 0)
      setDirection(forward ? 1 : -1)
      setIndex(wrapped)
    },
    [index, total],
  )

  const goNext = useCallback(() => goTo(index + 1), [goTo, index])
  const goPrev = useCallback(() => goTo(index - 1), [goTo, index])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') goNext()
      if (event.key === 'ArrowLeft') goPrev()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [goNext, goPrev])

  if (total === 0) return null

  const current = cards[index]

  return (
    <div className={className}>
      <div
        className="relative mx-auto w-full max-w-4xl [perspective:1200px]"
        aria-roledescription="carousel"
        aria-label="Design artifact gallery"
      >
        <div className="relative min-h-[min(70vw,520px)] md:min-h-[480px]">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.figure
              key={current.src}
              custom={direction}
              initial={{ rotateY: direction > 0 ? 72 : -72, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              exit={{ rotateY: direction > 0 ? -72 : 72, opacity: 0 }}
              transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 flex flex-col [transform-style:preserve-3d]"
            >
              <div className="flex flex-1 items-center justify-center overflow-hidden rounded-2xl bg-[#0a0a12] p-4 ring-1 ring-white/[0.06] md:p-6">
                <img
                  src={current.src}
                  alt={current.alt}
                  className="max-h-[min(64vw,460px)] w-full object-contain md:max-h-[420px]"
                  draggable={false}
                />
              </div>
              {current.caption && (
                <figcaption className="mt-3 text-center text-sm text-slate">
                  {current.caption}
                </figcaption>
              )}
            </motion.figure>
          </AnimatePresence>
        </div>

        {total > 1 && (
          <>
            <button
              type="button"
              onClick={goPrev}
              className="absolute left-0 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/12 bg-elevated/95 p-3 text-ink shadow-lg transition hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent md:-translate-x-0 md:left-3"
              aria-label="Previous card"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
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
              onClick={goNext}
              className="absolute right-0 top-1/2 z-10 -translate-y-1/2 translate-x-1/2 rounded-full border border-white/12 bg-elevated/95 p-3 text-ink shadow-lg transition hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent md:right-3 md:translate-x-0"
              aria-label="Next card"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
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
        <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
          <div className="flex items-center gap-2" role="tablist" aria-label="Select card">
            {cards.map((card, i) => (
              <button
                key={card.src}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={card.caption ?? `Card ${i + 1}`}
                onClick={() => {
                  setDirection(i >= index ? 1 : -1)
                  setIndex(i)
                }}
                className={`h-2 rounded-full transition-all ${
                  i === index
                    ? 'w-8 bg-accent shadow-[0_0_10px_rgba(153,112,255,0.5)]'
                    : 'w-2 bg-white/20 hover:bg-white/35'
                }`}
              />
            ))}
          </div>
          <p className="text-xs text-slate" aria-live="polite">
            {index + 1} / {total}
            <span className="sr-only"> — use arrow keys or buttons to flip</span>
          </p>
        </div>
      )}
    </div>
  )
}
