import { motion, type MotionValue } from 'framer-motion'
import type { RefObject } from 'react'
import { FlippingPortraitCard } from './FlippingPortraitCard'

interface HeroIntroProps {
  cardSlotRef: RefObject<HTMLDivElement>
  mobileCardSlotRef: RefObject<HTMLDivElement>
  rotateY: MotionValue<number>
  inlineCardOpacity: MotionValue<number>
  desktopInlineOpacity: MotionValue<number>
}

export function HeroIntro({
  cardSlotRef,
  mobileCardSlotRef,
  rotateY,
  inlineCardOpacity,
  desktopInlineOpacity,
}: HeroIntroProps) {
  return (
    <section
      id="home"
      className="section-ambient relative flex min-h-screen items-center overflow-hidden pt-24 pb-16 md:pt-28"
    >
      <div className="relative z-10 w-full max-w-7xl px-6 md:px-10 lg:px-16">
        <div className="relative hidden w-full lg:grid lg:grid-cols-[minmax(0,1fr)_340px_minmax(0,1fr)] lg:items-center lg:gap-x-12 lg:gap-y-1 xl:gap-x-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-30 col-start-1 justify-self-end self-center text-right"
          >
            <div className="relative">
              <p className="absolute right-0 bottom-full mb-1 whitespace-nowrap text-[11px] font-medium uppercase tracking-[0.28em] text-ink/80">
                Oey Chang
              </p>
              <h1 className="font-condensed text-[clamp(4.75rem,9vw,9.5rem)] leading-[0.85] tracking-[0.02em] text-ink">
                UX
              </h1>
            </div>
          </motion.div>

          <div
            ref={cardSlotRef}
            className="relative z-20 col-start-2 flex h-[520px] w-[340px] shrink-0 items-center justify-center justify-self-center self-center"
          >
            <motion.div className="relative hidden lg:block" style={{ opacity: desktopInlineOpacity }}>
              <FlippingPortraitCard rotateY={rotateY} />
            </motion.div>
            <motion.div className="relative lg:hidden" style={{ opacity: inlineCardOpacity }}>
              <FlippingPortraitCard rotateY={rotateY} />
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-30 col-start-3 justify-self-start self-center text-right"
          >
            <div className="relative w-full min-w-[305px]">
              <div className="absolute right-0 bottom-full w-full space-y-1 pb-3 text-right">
                <p className="w-full text-sm leading-snug text-slate md:text-base">
                  Currently pursuing a Master Degree in
                  <br />
                  Human-Centered Design & Engineering @UW
                </p>
                <p className="w-full text-sm text-slate/75">
                  A Seattle-based UX Designer and Researcher
                </p>
              </div>
              <h1 className="font-condensed text-[clamp(4.75rem,9vw,9.5rem)] leading-[0.85] tracking-[0.02em] text-ink">
                DESIGNER
              </h1>
            </div>
          </motion.div>
        </div>

        <div className="lg:hidden">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="mb-1 whitespace-nowrap text-[11px] font-medium uppercase tracking-[0.28em] text-ink/80">
              Oey Chang
            </p>
            <h1 className="font-condensed text-[clamp(4.5rem,18vw,6rem)] leading-[0.85] tracking-[0.02em] text-ink">
              UX
            </h1>
          </motion.div>

          <div
            ref={mobileCardSlotRef}
            className="mx-auto mt-6 flex w-[min(85vw,300px)] items-center justify-center"
          >
            <motion.div style={{ opacity: inlineCardOpacity }}>
              <FlippingPortraitCard rotateY={rotateY} />
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 text-right"
          >
            <div className="ml-auto max-w-md space-y-1 text-right">
              <p className="text-sm leading-snug text-slate md:text-base">
                Currently pursuing a Master Degree in
                <br />
                Human-Centered Design & Engineering @UW
              </p>
              <p className="text-sm text-slate/75">
                A Seattle-based UX Designer and Researcher
              </p>
            </div>
            <h1 className="font-condensed text-[clamp(4rem,16vw,5.5rem)] leading-[0.85] tracking-[0.02em] text-ink">
              DESIGNER
            </h1>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
