import { motion, useReducedMotion } from 'framer-motion'
import { useState } from 'react'

const ease = [0.22, 1, 0.36, 1] as const

/** Wushu — rich reddish-gold golden retriever */
const FACE = '#C88648'
const EAR = '#8F5528'
const INK = '#1A1A1A'
const TONGUE = '#E8828E'

export function NavDogIcon() {
  const [hovered, setHovered] = useState(false)
  const reduceMotion = useReducedMotion()
  const laughing = hovered && !reduceMotion

  return (
    <motion.span
      className="nav-dog-icon inline-flex h-9 w-9 items-center justify-center md:h-10 md:w-10"
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      animate={
        laughing
          ? { rotate: [0, -5, 5, -4, 4, 0], y: [0, -1, 0, -1, 0] }
          : { rotate: 0, y: 0 }
      }
      transition={
        laughing
          ? { duration: 0.5, ease: 'easeInOut', repeat: Infinity, repeatDelay: 0.12 }
          : { duration: 0.25, ease }
      }
    >
      <svg
        viewBox="0 0 48 48"
        width="32"
        height="32"
        className="block overflow-visible md:h-9 md:w-9"
        aria-hidden
      >
        <motion.g
          animate={laughing ? { scale: [1, 1.06, 1] } : { scale: 1 }}
          transition={
            laughing
              ? { duration: 0.42, repeat: Infinity, ease: 'easeInOut' }
              : { duration: 0.2 }
          }
          style={{ originX: '24px', originY: '24px' }}
        >
          {/* Floppy ears — flat darker gold lobes */}
          <ellipse cx="11.5" cy="24" rx="5.5" ry="10" fill={EAR} />
          <ellipse cx="36.5" cy="24" rx="5.5" ry="10" fill={EAR} />

          {/* Round face */}
          <circle cx="24" cy="24" r="15" fill={FACE} />

          {/* Eyes — always open circles (emoji style) */}
          <circle cx="18" cy="21" r="2.4" fill={INK} />
          <circle cx="30" cy="21" r="2.4" fill={INK} />

          {/* Nose — rounded triangle */}
          <path
            d="M24 23.5 C22.2 23.5 21 25 21.2 26.4 C21.4 27.6 22.5 28.5 24 28.5 C25.5 28.5 26.6 27.6 26.8 26.4 C27 25 25.8 23.5 24 23.5Z"
            fill={INK}
          />

          {/* Neutral — wide smile + long tongue out */}
          <motion.g
            animate={{ opacity: laughing ? 0 : 1, scale: laughing ? 0.9 : 1 }}
            transition={{ duration: 0.2, ease }}
          >
            <path
              d="M17.5 27.5 C18.5 29.5 21 30.5 24 30.5 C27 30.5 29.5 29.5 30.5 27.5"
              fill="none"
              stroke={INK}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <ellipse cx="24" cy="36" rx="4.5" ry="6.5" fill={TONGUE} />
            <ellipse cx="24" cy="34.5" rx="3.2" ry="1.2" fill="#F0A0AA" opacity="0.45" />
          </motion.g>

          {/* Laugh — open mouth with tongue inside */}
          <motion.g
            animate={{ opacity: laughing ? 1 : 0, scale: laughing ? 1 : 0.88 }}
            transition={{ duration: 0.22, ease }}
            style={{ originX: '24px', originY: '30px' }}
          >
            <path
              d="M16.5 27.5 C17.5 34 20.5 37.5 24 37.5 C27.5 37.5 30.5 34 31.5 27.5 C29 31 19 31 16.5 27.5Z"
              fill={INK}
            />
            <path
              d="M18.5 29 C19.5 33.5 21.5 35.5 24 35.5 C26.5 35.5 28.5 33.5 29.5 29 C27.5 31.5 20.5 31.5 18.5 29Z"
              fill={FACE}
            />
            <ellipse cx="24" cy="33.5" rx="5" ry="3.2" fill={TONGUE} />
          </motion.g>

          {/* Laugh motion lines */}
          <motion.g
            animate={{ opacity: laughing ? 1 : 0 }}
            transition={{ duration: 0.2, ease }}
          >
            <path d="M6 22 Q4 24 6 26" fill="none" stroke={FACE} strokeWidth="1.8" strokeLinecap="round" />
            <path d="M42 22 Q44 24 42 26" fill="none" stroke={FACE} strokeWidth="1.8" strokeLinecap="round" />
          </motion.g>
        </motion.g>
      </svg>
    </motion.span>
  )
}
