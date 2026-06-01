import { useState } from 'react'
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
} from 'framer-motion'
import { createPortal } from 'react-dom'
import { services } from '../data/content'

function CheckIcon() {
  return (
    <svg viewBox="0 0 12 12" fill="none" className="h-2.5 w-2.5" aria-hidden="true">
      <path
        d="M2 6.2L4.8 9 10 3"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <motion.svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-5 w-5 shrink-0 text-ink/70"
      animate={{ rotate: open ? 0 : 180 }}
      transition={{ duration: 0.25 }}
      aria-hidden="true"
    >
      <path
        d="M6 9l6 6 6-6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </motion.svg>
  )
}

export function Services() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const cursorX = useMotionValue(-9999)
  const cursorY = useMotionValue(-9999)
  const springX = useSpring(cursorX, { stiffness: 280, damping: 30, mass: 0.5 })
  const springY = useSpring(cursorY, { stiffness: 280, damping: 30, mass: 0.5 })

  const previewIndex = hoveredIndex ?? activeIndex
  const hoverPreview =
    hoveredIndex !== null && activeIndex !== hoveredIndex ? services[hoveredIndex] : null

  const toggleSection = (index: number) => {
    setHoveredIndex(null)
    setActiveIndex((current) => (current === index ? null : index))
  }

  const handleRowMouseMove = (event: React.MouseEvent, index: number) => {
    if (activeIndex === index) return

    setHoveredIndex(index)
    cursorX.set(event.clientX + 32)
    cursorY.set(event.clientY + 24)
  }

  const handleRowMouseLeave = () => {
    setHoveredIndex(null)
  }

  return (
    <section id="services" className="services-grain py-20 md:py-28">
      {typeof document !== 'undefined' &&
        createPortal(
          <AnimatePresence>
            {hoverPreview && (
              <motion.div
                key={hoverPreview.title}
                style={{ x: springX, y: springY, rotate: 6 }}
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="pointer-events-none fixed left-0 top-0 z-[100] w-[min(72vw,280px)] md:w-[320px]"
              >
                <div className="overflow-hidden rounded-2xl shadow-[0_24px_60px_rgba(0,0,0,0.55)] ring-1 ring-accent/25">
                  <img
                    src={hoverPreview.image}
                    alt={hoverPreview.imageAlt}
                    className="aspect-[4/3] w-full object-cover"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}

      <div
        data-services-content
        className="relative z-10 w-full max-w-6xl px-6 md:px-10 lg:px-16"
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="mb-14 max-w-3xl"
        >
          <h2 className="section-title mb-5">what I can do for you</h2>
          <p className="section-copy">
            As a UX designer, I am a visual storyteller that bridges the gap between users and
            technology leveraging my multi-cultural background
          </p>
        </motion.div>

        <div data-services-list className="relative w-full max-w-2xl">
          {services.map((service, index) => {
            const isOpen = activeIndex === index
            const isHighlighted = previewIndex === index

            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                onMouseMove={(event) => handleRowMouseMove(event, index)}
                onMouseLeave={handleRowMouseLeave}
              >
                <button
                  type="button"
                  onClick={() => toggleSection(index)}
                  className="flex w-full items-center justify-between gap-6 py-6 text-left"
                  aria-expanded={isOpen}
                >
                  <h3
                    className={`font-condensed text-4xl leading-none tracking-[0.04em] transition-colors duration-300 md:text-5xl ${
                      isHighlighted ? 'text-accent' : 'text-ink'
                    }`}
                  >
                    {service.number}. {service.title.toUpperCase()}
                  </h3>
                  <ChevronIcon open={isOpen} />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <ul className="space-y-4 pb-6">
                        {service.items.map((item, itemIndex) => (
                          <motion.li
                            key={item}
                            initial={{ opacity: 0, x: -8 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: itemIndex * 0.05 }}
                            className="flex items-start gap-3 text-sm leading-relaxed text-ink/90 md:text-base"
                          >
                            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent text-white">
                              <CheckIcon />
                            </span>
                            <span>{item}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div
                  className={`h-px w-full transition-colors duration-300 ${
                    isHighlighted ? 'bg-accent' : 'bg-white/10'
                  }`}
                />
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
