import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { createPortal } from 'react-dom'

export interface FieldGalleryPhoto {
  src: string
  alt: string
  caption: string
}

interface FieldPhotoGalleryProps {
  photos: readonly FieldGalleryPhoto[]
  className?: string
}

export function FieldPhotoGallery({ photos, className = '' }: FieldPhotoGalleryProps) {
  const [index, setIndex] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const total = photos.length
  const current = photos[index]

  const goTo = useCallback(
    (next: number) => {
      if (total === 0) return
      setIndex(((next % total) + total) % total)
    },
    [total],
  )

  useEffect(() => {
    if (!lightboxOpen) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setLightboxOpen(false)
      if (event.key === 'ArrowLeft') goTo(index - 1)
      if (event.key === 'ArrowRight') goTo(index + 1)
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [lightboxOpen, goTo, index])

  if (!current || total === 0) return null

  return (
    <>
      <div className={`group relative overflow-hidden rounded-3xl ring-1 ring-white/10 ${className}`}>
        <div className="relative flex min-h-[min(70vw,520px)] items-center justify-center bg-[#0a0a0c] sm:min-h-[min(56vh,640px)]">
          <AnimatePresence mode="wait">
            <motion.img
              key={current.src}
              src={current.src}
              alt={current.alt}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="max-h-[min(70vw,520px)] max-w-full object-contain sm:max-h-[min(56vh,640px)]"
              loading="lazy"
              decoding="async"
              draggable={false}
            />
          </AnimatePresence>

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100" />

          <div className="pointer-events-none absolute inset-x-0 bottom-3 flex justify-center px-3 sm:bottom-5">
            <div className="pointer-events-none flex w-fit max-w-[calc(100%-1.5rem)] translate-y-2 items-center gap-2 rounded-2xl border border-white/20 bg-white/10 p-2 opacity-0 backdrop-blur-xl transition-all duration-300 max-sm:pointer-events-auto max-sm:translate-y-0 max-sm:opacity-100 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:translate-y-0 group-focus-within:opacity-100 sm:gap-3 sm:p-2.5">
              <div className="flex items-center gap-2 sm:gap-2.5">
                {photos.map((photo, photoIndex) => (
                  <button
                    key={photo.src}
                    type="button"
                    onClick={() => setIndex(photoIndex)}
                    aria-label={photo.alt}
                    aria-current={photoIndex === index}
                    className={`relative h-14 w-14 shrink-0 overflow-hidden rounded-xl transition sm:h-16 sm:w-16 ${
                      photoIndex === index
                        ? 'ring-2 ring-white ring-offset-2 ring-offset-transparent'
                        : 'opacity-80 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={photo.src}
                      alt=""
                      className="h-full w-full object-cover"
                      loading="lazy"
                      decoding="async"
                      draggable={false}
                    />
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={() => setLightboxOpen(true)}
                className="shrink-0 rounded-xl bg-black/85 px-4 py-3 text-sm font-semibold text-white ring-1 ring-white/15 transition hover:bg-black"
              >
                Full Gallery
              </button>
            </div>
          </div>
        </div>

        <p className="border-t border-white/8 bg-elevated/80 px-5 py-4 text-sm leading-relaxed text-slate sm:px-6 sm:text-[15px]">
          {current.caption}
        </p>
      </div>

      {lightboxOpen &&
        createPortal(
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 backdrop-blur-md sm:p-8"
            role="dialog"
            aria-modal="true"
            aria-label="Field study photo gallery"
            onClick={() => setLightboxOpen(false)}
          >
            <button
              type="button"
              onClick={() => setLightboxOpen(false)}
              className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white backdrop-blur-sm transition hover:bg-white/20 sm:right-8 sm:top-8"
              aria-label="Close gallery"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
                <path
                  d="M5 5L15 15M15 5L5 15"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                />
              </svg>
            </button>

            <div
              className="relative flex w-full max-w-5xl flex-col items-center"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="mb-4 rounded-full border border-white/15 bg-black/40 px-4 py-1.5 text-sm font-medium text-white/90">
                {index + 1} / {total}
              </div>

              <div className="relative w-full overflow-hidden rounded-3xl bg-black ring-1 ring-white/10">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={current.src}
                    src={current.src}
                    alt={current.alt}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.3 }}
                    className="max-h-[min(80vh,900px)] w-full object-contain"
                    draggable={false}
                  />
                </AnimatePresence>

                {total > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={() => goTo(index - 1)}
                      className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/50 text-white backdrop-blur-sm transition hover:bg-black/70 sm:left-4"
                      aria-label="Previous photo"
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
                      onClick={() => goTo(index + 1)}
                      className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/50 text-white backdrop-blur-sm transition hover:bg-black/70 sm:right-4"
                      aria-label="Next photo"
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

              <p className="mt-5 max-w-2xl text-center text-sm leading-relaxed text-white/85 sm:text-base">
                {current.caption}
              </p>
            </div>
          </div>,
          document.body,
        )}
    </>
  )
}
