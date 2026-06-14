import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import type { DogPhotoSlide } from '../../data/dogPage'

const AUTOPLAY_MS = 5500

interface DogPhotoSlideshowProps {
  slides: readonly DogPhotoSlide[]
  subjectName?: string
  className?: string
}

export function DogPhotoSlideshow({
  slides,
  subjectName = 'my dog',
  className = '',
}: DogPhotoSlideshowProps) {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const reduceMotion = useReducedMotion()
  const total = slides.length
  const current = slides[index]

  const goTo = useCallback(
    (next: number) => {
      if (total === 0) return
      setIndex(((next % total) + total) % total)
    },
    [total],
  )

  useEffect(() => {
    if (reduceMotion || paused || total <= 1) return
    const timer = window.setInterval(() => goTo(index + 1), AUTOPLAY_MS)
    return () => window.clearInterval(timer)
  }, [goTo, index, paused, reduceMotion, total])

  if (!current) return null

  return (
    <div
      className={`dog-slideshow ${className}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div
        className="dog-slideshow__frame"
        aria-roledescription="carousel"
        aria-label={`Photos of ${subjectName}`}
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={current.src}
            src={current.src}
            alt={current.alt}
            initial={reduceMotion ? false : { opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="dog-slideshow__image"
            loading="lazy"
            decoding="async"
            draggable={false}
          />
        </AnimatePresence>

        {total > 1 && (
          <>
            <button
              type="button"
              onClick={() => goTo(index - 1)}
              className="dog-slideshow__nav dog-slideshow__nav--prev"
              aria-label="Previous photo"
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
              className="dog-slideshow__nav dog-slideshow__nav--next"
              aria-label="Next photo"
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
        <div className="dog-slideshow__dots" role="tablist" aria-label="Select photo">
          {slides.map((slide, i) => (
            <button
              key={slide.src}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={slide.caption ?? slide.alt}
              onClick={() => setIndex(i)}
              className={`dog-slideshow__dot ${i === index ? 'dog-slideshow__dot--active' : ''}`}
            />
          ))}
        </div>
      )}

      {current.caption && (
        <p className="dog-slideshow__caption">{current.caption}</p>
      )}
    </div>
  )
}
