import type { Transition, Variants } from 'framer-motion'

/** Shared motion timing — mirrors Framer override `transition={{ duration }}` patterns */
export const stackTransition: Transition = {
  duration: 0.45,
  ease: [0.22, 1, 0.36, 1],
}

export const stackSpring: Transition = {
  type: 'spring',
  stiffness: 380,
  damping: 34,
  mass: 0.85,
}

export const stackHoverTransition: Transition = {
  type: 'spring',
  stiffness: 520,
  damping: 28,
}

export type StackDirection = 1 | -1 | 0

export function getFrontCardVariants(reduceMotion: boolean): Variants {
  if (reduceMotion) {
    return {
      enter: { opacity: 0 },
      center: { opacity: 1 },
      exit: { opacity: 0 },
    }
  }

  return {
    enter: (dir: StackDirection) => ({
      y: dir > 0 ? 56 : dir < 0 ? -56 : 24,
      opacity: 0,
      scale: 0.96,
      rotateX: dir > 0 ? 6 : dir < 0 ? -6 : 0,
      rotateZ: dir > 0 ? -1.5 : dir < 0 ? 1.5 : 0,
    }),
    center: {
      y: 0,
      opacity: 1,
      scale: 1,
      rotateX: 0,
      rotateZ: 0,
    },
    exit: (dir: StackDirection) => ({
      y: dir > 0 ? -130 : dir < 0 ? 130 : 0,
      opacity: 0,
      scale: 0.94,
      rotateX: dir > 0 ? -8 : dir < 0 ? 8 : 0,
      rotateZ: dir > 0 ? 3 : dir < 0 ? -3 : 0,
    }),
  }
}

export function getBackCardAnimate(depth: number, peekStepPx: number) {
  const layer = depth - 1
  return {
    top: layer * peekStepPx,
    scale: 1 - layer * 0.018,
    opacity: 1 - layer * 0.06,
  }
}

/** `whileHover`-style lift for peek cards (Framer `withHover` pattern) */
export function getBackCardHover(depth: number, reduceMotion: boolean) {
  if (reduceMotion) return {}
  const layer = depth - 1
  const baseScale = 1 - layer * 0.018
  return {
    scale: baseScale + 0.025,
    y: -5,
    transition: stackHoverTransition,
  }
}

export function getBackCardTap(depth: number) {
  const layer = depth - 1
  return { scale: 1 - layer * 0.018 - 0.01 }
}

/** Drag feedback on the front card while swiping */
export function getFrontDragMotion(reduceMotion: boolean) {
  if (reduceMotion) return {}
  return {
    scale: 1.02,
    rotateZ: 0,
    boxShadow: '0 32px 64px rgba(0, 0, 0, 0.38), 0 0 0 2px rgba(153, 112, 255, 0.45)',
    transition: stackHoverTransition,
  }
}

export function getDragRotateZ(offsetY: number): number {
  return Math.max(-6, Math.min(6, offsetY * 0.04))
}
