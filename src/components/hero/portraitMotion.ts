/** Spring configs inspired by Framer's duration/ease transitions — applied to scroll-driven values */

export const FLIP_SPRING = {
  stiffness: 72,
  damping: 22,
  mass: 0.85,
  restDelta: 0.25,
}

/** Tighter follow for scroll-linked position — avoids visible lag/snap */
export const TRAVEL_SPRING = {
  stiffness: 420,
  damping: 48,
  mass: 0.35,
  restDelta: 0.05,
}

export const TILT_SCALE_SPRING = {
  stiffness: 110,
  damping: 30,
  mass: 0.5,
  restDelta: 0.2,
}

/** Soft follow for portrait fade behind the featured projects band */
export const OCCLUSION_SPRING = {
  stiffness: 85,
  damping: 24,
  mass: 0.45,
  restDelta: 0.008,
}

/** Maps scroll progress to flip angle with Framer-like ease-in-out (similar to duration: 2, easeInOut) */
export function easeInOutCubic(t: number) {
  const x = Math.max(0, Math.min(1, t))
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2
}

export function clamp01(t: number) {
  return Math.max(0, Math.min(1, t))
}
