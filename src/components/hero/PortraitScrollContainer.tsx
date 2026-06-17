import { useLayoutEffect, useRef } from 'react'
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion'
import { FlippingPortraitCard } from './FlippingPortraitCard'
import { HeroGlobeBackground } from './HeroGlobeBackground'
import { HeroIntro } from './HeroIntro'
import {
  clamp01,
  easeInOutCubic,
  FLIP_SPRING,
  OCCLUSION_SPRING,
} from './portraitMotion'

interface PortraitScrollContainerProps {
  children: React.ReactNode
  aboutSlot: React.ReactNode
  projectsSlot: React.ReactNode
}

/** Scroll distance for a full 180° hero flip — larger = slower, more even flip speed */
const FLIP_SCROLL_PX = 560
const INLINE_FADE_END_PX = 120
const TRAVEL_PROGRESS_START = 0.06
const TRAVEL_PROGRESS_END = 0.62
const ABOUT_STICKY_TOP = 0.26
const SERVICES_LIST_GAP_PX = 56
const SERVICES_CONTENT_RIGHT_INSET_PX = 40
const SERVICES_DOCK_OFFSET_RIGHT_PX = 20
const SERVICES_DOCK_ROTATE_Z = 3.5
const PROJECTS_REAPPEAR_PX = 180

function getCardDimensions() {
  if (typeof window === 'undefined') {
    return { width: 340, height: 520 }
  }
  const isDesktop = window.matchMedia('(min-width: 768px)').matches
  return {
    width: isDesktop ? 340 : 300,
    height: isDesktop ? 520 : 420,
  }
}

function getServicesDockLeft(
  cardWidth: number,
  contentRect: DOMRect | null,
  listRect: DOMRect | null,
) {
  if (typeof window === 'undefined') return 0

  if (!window.matchMedia('(min-width: 1024px)').matches) {
    return window.innerWidth - cardWidth - 20
  }

  if (listRect && contentRect) {
    const listAnchor = listRect.right + SERVICES_LIST_GAP_PX
    const contentMax =
      contentRect.right - cardWidth - SERVICES_CONTENT_RIGHT_INSET_PX
    return Math.min(listAnchor, contentMax) + SERVICES_DOCK_OFFSET_RIGHT_PX
  }

  if (contentRect) {
    return (
      contentRect.right - cardWidth - SERVICES_CONTENT_RIGHT_INSET_PX + SERVICES_DOCK_OFFSET_RIGHT_PX
    )
  }

  return window.innerWidth - cardWidth - 20
}

/** 0 = fully in view, 1 = half of the services block has scrolled above the viewport */
function getServicesHalfExitProgress(contentRect: DOMRect | null) {
  if (!contentRect || contentRect.height <= 0) return 0
  const scrolledPastTop = Math.max(0, -contentRect.top)
  return clamp01(scrolledPastTop / (contentRect.height * 0.5))
}

function getServicesDockTop(
  contentTop: number,
  contentHeight: number,
  cardHeight: number,
) {
  if (typeof window === 'undefined') return 120
  const navOffset = 96
  const centered = contentTop + Math.max(0, (contentHeight - cardHeight) * 0.26)
  return Math.max(navOffset, Math.min(centered, window.innerHeight - cardHeight - 40))
}

function getProjectsOcclusion(
  cardTop: number,
  cardHeight: number,
  projectsRect: DOMRect | null,
) {
  if (!projectsRect || cardHeight <= 0) return 1

  const cardBottom = cardTop + cardHeight

  if (cardBottom <= projectsRect.top) {
    return 1
  }

  if (cardTop >= projectsRect.bottom) {
    const past = cardTop - projectsRect.bottom
    return easeInOutCubic(clamp01(past / PROJECTS_REAPPEAR_PX))
  }

  const visibleAbove = Math.max(0, projectsRect.top - cardTop)
  const visibleBelow = Math.max(0, cardBottom - projectsRect.bottom)
  const visibleHeight = Math.min(cardHeight, visibleAbove + visibleBelow)
  return easeInOutCubic(visibleHeight / cardHeight)
}

function lerp(start: number, end: number, t: number) {
  return start + (end - start) * t
}

const SERVICES_HORIZONTAL_PORTION = 0.74
const ABOUT_HORIZONTAL_PORTION = 0.72

/** Move on one axis at a time so the path is never diagonal */
function travelHorizontalThenVertical(
  t: number,
  originH: number,
  originV: number,
  targetH: number,
  targetV: number,
  horizontalPortion = SERVICES_HORIZONTAL_PORTION,
) {
  const x = Math.max(0, Math.min(1, t))
  if (x <= horizontalPortion) {
    const ht = horizontalPortion > 0 ? x / horizontalPortion : 1
    return { h: lerp(originH, targetH, ht), v: originV }
  }
  const vt = (x - horizontalPortion) / (1 - horizontalPortion)
  return { h: targetH, v: lerp(originV, targetV, vt) }
}

export function PortraitScrollContainer({
  children,
  aboutSlot,
  projectsSlot,
}: PortraitScrollContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const cardSlotRef = useRef<HTMLDivElement>(null)
  const mobileCardSlotRef = useRef<HTMLDivElement>(null)
  const projectsWrapRef = useRef<HTMLDivElement>(null)
  const servicesWrapRef = useRef<HTMLDivElement>(null)
  const aboutSectionRef = useRef<HTMLElement>(null)
  const aboutCardSlotRef = useRef<HTMLDivElement>(null)
  const aboutTravelOrigin = useRef<{ left: number; top: number } | null>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  /** Completes when About grid reaches the sticky resting line (26vh) */
  const { scrollYProgress: aboutTravel } = useScroll({
    target: aboutSectionRef,
    offset: ['start end', `start ${ABOUT_STICKY_TOP}`],
  })

  const { scrollY } = useScroll()

  const servicesHalfExit = useMotionValue(0)
  const frozenServicesDockLeft = useMotionValue(0)
  const frozenServicesDockTop = useMotionValue(0)
  const effectiveAboutTravel = useTransform(
    [servicesHalfExit, aboutTravel],
    ([exit, about]) => ((exit as number) >= 1 ? (about as number) ?? 0 : 0),
  )

  const rotateYRaw = useTransform([scrollY, effectiveAboutTravel], ([y, aboutP]) => {
    const scroll = (y as number) ?? 0
    const about = (aboutP as number) ?? 0
    const flipT = easeInOutCubic(scroll / FLIP_SCROLL_PX)
    const heroRotate = Math.min(180, flipT * 180)

    if (about <= 0.001) {
      return heroRotate
    }

    const base = heroRotate >= 179 ? 180 : heroRotate
    return lerp(base, 360, easeInOutCubic(about))
  })
  const rotateY = useSpring(rotateYRaw, FLIP_SPRING)

  const cardScaleRaw = useTransform(
    [scrollYProgress, effectiveAboutTravel],
    ([containerP, aboutP]) => {
      const p = (containerP as number) ?? 0
      const about = (aboutP as number) ?? 0
      if (about > 0.001) {
        return lerp(0.82, 1, easeInOutCubic(about))
      }
      if (p < TRAVEL_PROGRESS_START) {
        return 1
      }
      if (p < TRAVEL_PROGRESS_END) {
        const t =
          (p - TRAVEL_PROGRESS_START) / (TRAVEL_PROGRESS_END - TRAVEL_PROGRESS_START)
        return lerp(1, 0.82, easeInOutCubic(t))
      }
      return 0.82
    },
  )
  const cardScale = cardScaleRaw

  const cardRotateZRaw = useTransform(
    [scrollYProgress, effectiveAboutTravel],
    ([containerP, aboutP]) => {
      const p = (containerP as number) ?? 0
      const about = (aboutP as number) ?? 0
      if (about > 0.001) {
        return lerp(SERVICES_DOCK_ROTATE_Z, 0, easeInOutCubic(about))
      }
      if (p < TRAVEL_PROGRESS_END - 0.1) {
        return 0
      }
      if (p >= TRAVEL_PROGRESS_END) {
        return SERVICES_DOCK_ROTATE_Z
      }
      const t = (p - (TRAVEL_PROGRESS_END - 0.1)) / 0.1
      return lerp(0, SERVICES_DOCK_ROTATE_Z, easeInOutCubic(t))
    },
  )
  const cardRotateZ = cardRotateZRaw

  const inlineCardOpacity = useTransform(scrollY, [0, INLINE_FADE_END_PX], [1, 0])

  const heroLayoutReady = useMotionValue(0)
  const projectsOcclusionRaw = useMotionValue(1)
  const projectsOcclusion = useSpring(projectsOcclusionRaw, OCCLUSION_SPRING)

  const desktopInlineOpacity = useTransform(scrollYProgress, (p) =>
    ((p as number) < TRAVEL_PROGRESS_START ? 1 : 0) as number,
  )

  const floatingOpacity = useTransform(
    [heroLayoutReady, scrollYProgress, projectsOcclusion],
    ([ready, p, occlusion]) =>
      ((ready as number) >= 1 &&
      (p as number) >= TRAVEL_PROGRESS_START &&
      (occlusion as number) > 0.001
        ? (occlusion as number)
        : 0) as number,
  )

  const portraitZIndex = useTransform(projectsOcclusion, (occlusion) =>
    ((occlusion as number) > 0.35 ? 20 : 8),
  )

  const projectsDepthScale = useTransform(projectsOcclusion, (occlusion) =>
    lerp(0.9, 1, easeInOutCubic((occlusion as number) ?? 1)),
  )

  const projectsDepthY = useTransform(projectsOcclusion, (occlusion) =>
    lerp(32, 0, easeInOutCubic((occlusion as number) ?? 1)),
  )

  const dockedOpacity = useTransform(effectiveAboutTravel, (aboutP) =>
    (((aboutP as number) ?? 0) >= 0.995 ? 1 : 0) as number,
  )

  const startLeft = useMotionValue(0)
  const startTop = useMotionValue(0)
  const travelOriginLeft = useMotionValue(0)
  const travelOriginTop = useMotionValue(0)
  const servicesDockLeft = useMotionValue(0)
  const servicesDockTop = useMotionValue(120)
  const travelOriginFrozen = useRef(false)
  const servicesDockLocked = useRef(false)
  const syncScrollFrameRef = useRef<((progress: number) => void) | null>(null)
  const aboutDockLeft = useMotionValue(0)
  const aboutDockTop = useMotionValue(0)
  const aboutOriginLeft = useMotionValue(0)
  const aboutOriginTop = useMotionValue(0)

  useLayoutEffect(() => {
    const syncAboutSlot = () => {
      const slot = aboutCardSlotRef.current
      if (!slot || typeof window === 'undefined') return

      const rect = slot.getBoundingClientRect()
      aboutDockLeft.set(rect.left)
      aboutDockTop.set(rect.top)
    }

    const syncServicesDock = () => {
      if (typeof window === 'undefined') return

      const { width, height } = getCardDimensions()
      const contentEl = servicesWrapRef.current?.querySelector(
        '[data-services-content]',
      )
      const listEl = servicesWrapRef.current?.querySelector('[data-services-list]')
      const contentRect = contentEl?.getBoundingClientRect() ?? null
      const listRect = listEl?.getBoundingClientRect() ?? null

      servicesDockLeft.set(getServicesDockLeft(width, contentRect, listRect))

      if (contentRect) {
        servicesDockTop.set(
          getServicesDockTop(contentRect.top, contentRect.height, height),
        )
      }
    }

    const syncHeroAnchor = (progress: number) => {
      if (typeof window === 'undefined') return

      const isDesktop = window.matchMedia('(min-width: 1024px)').matches
      const heroSlot = isDesktop ? cardSlotRef.current : mobileCardSlotRef.current
      const heroRect = heroSlot?.getBoundingClientRect()
      if (!heroRect) return

      if (progress < TRAVEL_PROGRESS_START) {
        startLeft.set(heroRect.left)
        startTop.set(heroRect.top)
        travelOriginFrozen.current = false
        return
      }

      if (!travelOriginFrozen.current) {
        travelOriginLeft.set(startLeft.get())
        travelOriginTop.set(startTop.get())
        travelOriginFrozen.current = true
      }
    }

    const syncPositions = () => {
      syncServicesDock()
      syncHeroAnchor(0)
      syncAboutSlot()
    }

    syncScrollFrameRef.current = (progress: number) => {
      const contentEl = servicesWrapRef.current?.querySelector(
        '[data-services-content]',
      )
      const contentRect = contentEl?.getBoundingClientRect() ?? null
      servicesHalfExit.set(getServicesHalfExitProgress(contentRect))

      syncServicesDock()

      if (progress >= TRAVEL_PROGRESS_END && !servicesDockLocked.current) {
        frozenServicesDockLeft.set(servicesDockLeft.get())
        frozenServicesDockTop.set(servicesDockTop.get())
        servicesDockLocked.current = true
      }

      if (progress < TRAVEL_PROGRESS_END) {
        servicesDockLocked.current = false
      }

      syncHeroAnchor(progress)
    }

    const onScroll = () => {
      syncScrollFrameRef.current?.(scrollYProgress.get())
      syncAboutSlot()

      const section = aboutSectionRef.current
      if (!section || typeof window === 'undefined') return

      const sectionRect = section.getBoundingClientRect()
      const aboutActive = sectionRect.top < window.innerHeight
      const halfOut = servicesHalfExit.get() >= 1

      if (aboutActive && halfOut && !aboutTravelOrigin.current) {
        aboutTravelOrigin.current = {
          left: frozenServicesDockLeft.get(),
          top: frozenServicesDockTop.get(),
        }
        aboutOriginLeft.set(aboutTravelOrigin.current.left)
        aboutOriginTop.set(aboutTravelOrigin.current.top)
      }

      if (!aboutActive) {
        aboutTravelOrigin.current = null
      }
    }

    syncPositions()
    heroLayoutReady.set(1)

    const handleResize = () => {
      aboutTravelOrigin.current = null
      travelOriginFrozen.current = false
      servicesDockLocked.current = false
      syncPositions()
    }

    document.fonts?.ready.then(syncPositions)
    window.addEventListener('resize', handleResize)
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('scroll', onScroll)
    }
  }, [
    heroLayoutReady,
    scrollYProgress,
    startLeft,
    startTop,
    travelOriginLeft,
    travelOriginTop,
    servicesDockLeft,
    servicesDockTop,
    servicesHalfExit,
    frozenServicesDockLeft,
    frozenServicesDockTop,
    aboutDockLeft,
    aboutDockTop,
    aboutOriginLeft,
    aboutOriginTop,
  ])

  useMotionValueEvent(scrollYProgress, 'change', (progress) => {
    syncScrollFrameRef.current?.(progress)
  })

  const cardLeftRaw = useTransform(
    [
      scrollYProgress,
      effectiveAboutTravel,
      servicesHalfExit,
      startLeft,
      travelOriginLeft,
      servicesDockLeft,
      frozenServicesDockLeft,
      aboutOriginLeft,
      aboutDockLeft,
    ],
    ([containerP, aboutP, exit, liveStart, frozenStart, dockLeft, lockedLeft, originLeft, slotLeft]) => {
      const p = (containerP as number) ?? 0
      const about = (aboutP as number) ?? 0
      const halfOut = (exit as number) ?? 0
      const dock = (dockLeft as number) ?? 0
      const locked = (lockedLeft as number) ?? dock
      const fromAbout = (originLeft as number) ?? locked
      const toAbout = (slotLeft as number) ?? fromAbout

      if (about > 0.001) {
        const { h } = travelHorizontalThenVertical(
          easeInOutCubic(about),
          fromAbout,
          0,
          toAbout,
          0,
          ABOUT_HORIZONTAL_PORTION,
        )
        return h
      }

      if (p < TRAVEL_PROGRESS_START) {
        return (liveStart as number) ?? 0
      }

      const travelSpan = TRAVEL_PROGRESS_END - TRAVEL_PROGRESS_START
      const t = easeInOutCubic((p - TRAVEL_PROGRESS_START) / travelSpan)
      const origin = (frozenStart as number) ?? (liveStart as number) ?? 0

      if (p < TRAVEL_PROGRESS_END) {
        const { h } = travelHorizontalThenVertical(t, origin, 0, dock, 0)
        return h
      }

      if (halfOut < 1) {
        return locked
      }

      return dock
    },
  )

  const cardTopRaw = useTransform(
    [
      scrollYProgress,
      effectiveAboutTravel,
      servicesHalfExit,
      startTop,
      travelOriginTop,
      servicesDockTop,
      frozenServicesDockTop,
      aboutOriginTop,
      aboutDockTop,
    ],
    ([containerP, aboutP, exit, liveStart, frozenStart, dockTop, lockedTop, originTop, slotTop]) => {
      const p = (containerP as number) ?? 0
      const about = (aboutP as number) ?? 0
      const halfOut = (exit as number) ?? 0
      const dock = (dockTop as number) ?? 0
      const locked = (lockedTop as number) ?? dock
      const fromAbout = (originTop as number) ?? locked
      const toAbout = (slotTop as number) ?? fromAbout

      if (about > 0.001) {
        const { v } = travelHorizontalThenVertical(
          easeInOutCubic(about),
          0,
          fromAbout,
          0,
          toAbout,
          ABOUT_HORIZONTAL_PORTION,
        )
        return v
      }

      if (p < TRAVEL_PROGRESS_START) {
        return (liveStart as number) ?? 0
      }

      const origin = (frozenStart as number) ?? (liveStart as number) ?? 0

      if (p < TRAVEL_PROGRESS_END) {
        const travelSpan = TRAVEL_PROGRESS_END - TRAVEL_PROGRESS_START
        const t = easeInOutCubic((p - TRAVEL_PROGRESS_START) / travelSpan)
        const { v } = travelHorizontalThenVertical(t, 0, origin, 0, dock)
        return v
      }

      if (halfOut < 1) {
        return locked
      }

      return dock
    },
  )

  const cardLeft = cardLeftRaw
  const cardTop = cardTopRaw

  const portraitScale = useTransform(
    [cardScale, projectsDepthScale],
    ([scale, depthScale]) => ((scale as number) ?? 1) * ((depthScale as number) ?? 1),
  )

  const portraitTop = useTransform(
    [cardTop, projectsDepthY],
    ([top, depthY]) => ((top as number) ?? 0) + ((depthY as number) ?? 0),
  )

  const syncProjectsOcclusion = () => {
    if (typeof window === 'undefined') return

    const projectsEl = projectsWrapRef.current
    if (!projectsEl) {
      projectsOcclusionRaw.set(1)
      return
    }

    const { height } = getCardDimensions()
    projectsOcclusionRaw.set(
      getProjectsOcclusion(cardTop.get(), height, projectsEl.getBoundingClientRect()),
    )
  }

  useLayoutEffect(() => {
    syncProjectsOcclusion()
    window.addEventListener('resize', syncProjectsOcclusion)
    return () => window.removeEventListener('resize', syncProjectsOcclusion)
  }, [cardTop, projectsOcclusionRaw])

  useMotionValueEvent(scrollYProgress, 'change', () => {
    syncProjectsOcclusion()
  })

  useMotionValueEvent(cardTop, 'change', () => {
    syncProjectsOcclusion()
  })

  return (
    <>
      <div ref={containerRef} className="relative overflow-visible">
        <div className="hero-globe-bleed pointer-events-none absolute inset-x-0 top-0 z-0" aria-hidden>
          <HeroGlobeBackground />
        </div>

        <HeroIntro
          cardSlotRef={cardSlotRef}
          mobileCardSlotRef={mobileCardSlotRef}
          rotateY={rotateY}
          inlineCardOpacity={inlineCardOpacity}
          desktopInlineOpacity={desktopInlineOpacity}
        />

        <div ref={projectsWrapRef} className="relative z-30">
          {projectsSlot}
        </div>

        <div ref={servicesWrapRef} className="relative z-10">
          {children}
        </div>

        <motion.div
          className="pointer-events-none fixed origin-top will-change-[transform,opacity] max-lg:hidden"
          style={{
            left: cardLeft,
            top: portraitTop,
            scale: portraitScale,
            rotate: cardRotateZ,
            opacity: floatingOpacity,
            zIndex: portraitZIndex,
          }}
        >
          <div style={{ perspective: 1200 }}>
            <FlippingPortraitCard rotateY={rotateY} />
          </div>
        </motion.div>

        <div className="h-[35vh] md:h-[45vh]" aria-hidden="true" />
      </div>

      <section id="about" ref={aboutSectionRef} className="relative bg-mist">
        <div className="mx-auto w-full max-w-6xl px-6 py-20 md:px-10 md:py-28 lg:px-16">
          <motion.div
            className="mb-10 flex justify-center lg:hidden"
            style={{ opacity: dockedOpacity }}
          >
            <div style={{ perspective: 1200 }}>
              <FlippingPortraitCard rotateY={rotateY} />
            </div>
          </motion.div>

          <div className="grid gap-10 lg:grid-cols-[minmax(240px,320px)_1fr] lg:gap-16">
            <div className="relative hidden min-h-[420px] lg:block">
              <div
                ref={aboutCardSlotRef}
                className="sticky top-[26vh] h-[min(62vw,420px)] w-[min(46vw,300px)] md:h-[520px] md:w-[340px] pointer-events-none opacity-0"
                aria-hidden="true"
              />
            </div>

            <div>{aboutSlot}</div>
          </div>
        </div>
      </section>
    </>
  )
}
