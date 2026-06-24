import { motion, useReducedMotion } from 'framer-motion'

function FigmaLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 38 57"
      className={className}
      role="img"
      aria-label="Figma"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill="#F24E1E"
        d="M19 28.5c0-5.25 4.25-9.5 9.5-9.5S38 23.25 38 28.5 33.75 38 28.5 38 19 33.75 19 28.5z"
      />
      <path
        fill="#A259FF"
        d="M9.5 38C4.25 38 0 33.75 0 28.5S4.25 19 9.5 19 19 23.25 19 28.5 14.75 38 9.5 38z"
      />
      <path
        fill="#F24E1E"
        d="M0 9.5C0 4.25 4.25 0 9.5 0S19 4.25 19 9.5 14.75 19 9.5 19 0 14.75 0 9.5z"
      />
      <path
        fill="#FF7262"
        d="M0 28.5C0 23.25 4.25 19 9.5 19H19v9.5c0 5.25-4.25 9.5-9.5 9.5S0 33.75 0 28.5z"
      />
      <path
        fill="#1ABCFE"
        d="M0 47.5C0 42.25 4.25 38 9.5 38H19v9.5c0 5.25-4.25 9.5-9.5 9.5S0 52.75 0 47.5z"
      />
    </svg>
  )
}

function ClaudeLogo({ className }: { className?: string }) {
  return (
    <img
      src="/icons/claude-ai.svg"
      alt=""
      className={className}
      width={48}
      height={48}
      decoding="async"
      draggable={false}
    />
  )
}

const flowEase = [0.22, 1, 0.36, 1] as const

/** Logo-to-connector spacing tightened ~36% vs original gap-5 / gap-8 */
const LOGO_GAP = 'gap-[0.8rem] md:gap-[1.28rem]'

function RightArrowConnector({ reduceMotion }: { reduceMotion: boolean | null }) {
  return (
    <div className="flex h-3 min-w-0 flex-1 items-center md:h-3.5" aria-hidden>
      <div className="relative mr-1 h-0.5 min-w-0 flex-1 md:mr-1.5">
        <div className="absolute inset-0 rounded-full bg-white/10" />

        {!reduceMotion ? (
          <>
            <motion.div
              className="absolute inset-y-0 left-0 w-full origin-left rounded-full bg-accent"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 1.6, ease: flowEase }}
            />
            <motion.div
              className="absolute top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent shadow-[0_0_14px_rgba(153,112,255,0.85)]"
              initial={{ left: '0%', opacity: 0 }}
              whileInView={{ left: ['0%', '100%'], opacity: [0, 1, 1, 0] }}
              viewport={{ once: false, margin: '-40px' }}
              transition={{
                left: {
                  duration: 5,
                  repeat: Infinity,
                  repeatDelay: 2,
                  ease: 'linear',
                  delay: 0.6,
                },
                opacity: {
                  duration: 5,
                  repeat: Infinity,
                  repeatDelay: 2,
                  times: [0, 0.08, 0.92, 1],
                },
              }}
            />
          </>
        ) : (
          <div className="absolute inset-0 rounded-full bg-accent" />
        )}
      </div>
      <span
        className="size-0 shrink-0 border-y-[5px] border-l-[9px] border-y-transparent border-l-accent md:border-y-[6px] md:border-l-[10px]"
        aria-hidden
      />
    </div>
  )
}

export function FigmaToClaudeFlow({
  className = '',
  caption,
  cta,
}: {
  className?: string
  caption?: string
  cta?: { label: string; href: string }
}) {
  const reduceMotion = useReducedMotion()

  return (
    <figure
      className={`mt-10 md:mt-12 ${className}`}
      aria-label="Flow from Figma toward Claude AI"
    >
      <div className={`mx-auto flex w-[70%] max-w-[70%] items-center ${LOGO_GAP}`}>
        <motion.div
          className="flex shrink-0 flex-col items-center gap-2"
          initial={reduceMotion ? false : { opacity: 0, x: -12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, ease: flowEase }}
        >
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-elevated/90 ring-1 ring-white/[0.08] md:h-[4.5rem] md:w-[4.5rem]">
            <FigmaLogo className="h-9 w-6 md:h-10 md:w-7" />
          </div>
          <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate md:text-xs">
            Figma
          </span>
        </motion.div>

        <RightArrowConnector reduceMotion={reduceMotion} />

        <motion.div
          className="flex shrink-0 flex-col items-center gap-2"
          initial={reduceMotion ? false : { opacity: 0, x: 12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, delay: 0.15, ease: flowEase }}
        >
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-elevated/90 ring-1 ring-white/[0.08] md:h-[4.5rem] md:w-[4.5rem]">
            <ClaudeLogo className="h-10 w-10 md:h-11 md:w-11" />
          </div>
          <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate md:text-xs">
            Claude
          </span>
        </motion.div>
      </div>
      {caption ? (
        <>
          <figcaption className="mx-auto mt-6 block w-[70%] max-w-xl text-center text-sm leading-relaxed text-slate md:mt-8 md:text-base">
            {caption}
          </figcaption>
          {cta && (
            <div className="mt-5 flex justify-center md:mt-6">
              <a
                href={cta.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-accent/35 bg-accent/15 px-6 py-2.5 text-sm font-semibold text-ink ring-1 ring-accent/25 transition hover:bg-accent/25"
              >
                {cta.label}
              </a>
            </div>
          )}
        </>
      ) : (
        <figcaption className="sr-only">
          Animated arrow from Figma pointing right toward Claude AI
        </figcaption>
      )}
    </figure>
  )
}
