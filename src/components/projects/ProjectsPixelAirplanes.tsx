import { useEffect, useRef } from 'react'

const TRAIL_LIFE_MS = 5500
const TRAIL_GAP_PX = 10
const PLANE_COUNT = 8
const MAX_TRAIL_DOTS = 90
const SPRITE_SRC = '/images/pixel-airplane.png?v=2'
const SPRITE_SCALE = 0.21
/** Max tilt from horizontal (~±22°) while crossing the page */
const MAX_TILT = 0.38
/** Max heading nudge when picking a new gentle target (~±7°) */
const MAX_NUDGE = 0.12
/** Max turn rate per frame at 60fps (~±0.25°) */
const MAX_TURN_PER_FRAME = 0.0045

interface TrailDot {
  x: number
  y: number
  born: number
}

type PlanePath = 'right' | 'left' | 'down' | 'up'

interface Plane {
  x: number
  y: number
  heading: number
  steerTarget: number
  speed: number
  path: PlanePath
  wanderPhase: number
  wanderRate: number
  steerTimer: number
  trail: TrailDot[]
}

function randomBetween(min: number, max: number) {
  return min + Math.random() * (max - min)
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

function normalizeAngle(angle: number) {
  let a = angle
  while (a > Math.PI) a -= Math.PI * 2
  while (a < -Math.PI) a += Math.PI * 2
  return a
}

function pathBaseHeading(path: PlanePath) {
  switch (path) {
    case 'right':
      return 0
    case 'left':
      return Math.PI
    case 'down':
      return Math.PI / 2
    case 'up':
      return -Math.PI / 2
  }
}

function crossingHeading(path: PlanePath) {
  const tilt = randomBetween(-MAX_TILT, MAX_TILT)
  return pathBaseHeading(path) + tilt
}

function clampToCorridor(heading: number, path: PlanePath) {
  const base = pathBaseHeading(path)
  return clamp(heading, base - MAX_TILT, base + MAX_TILT)
}

function randomPath(): PlanePath {
  const paths: PlanePath[] = ['right', 'left', 'down', 'up']
  return paths[Math.floor(Math.random() * paths.length)]
}

function spawnPosition(path: PlanePath, width: number, height: number) {
  switch (path) {
    case 'right':
      return { x: -48, y: randomBetween(height * 0.12, height * 0.78) }
    case 'left':
      return { x: width + 48, y: randomBetween(height * 0.12, height * 0.78) }
    case 'down':
      return { x: randomBetween(width * 0.12, width * 0.88), y: -48 }
    case 'up':
      return { x: randomBetween(width * 0.12, width * 0.88), y: height + 48 }
  }
}

function createPlane(width: number, height: number): Plane {
  const path = randomPath()
  const { x, y } = spawnPosition(path, width, height)
  const heading = crossingHeading(path)

  return {
    x,
    y,
    heading,
    steerTarget: heading,
    speed: randomBetween(0.45, 0.85),
    path,
    wanderPhase: randomBetween(0, Math.PI * 2),
    wanderRate: randomBetween(0.00035, 0.00075),
    steerTimer: randomBetween(2800, 5200),
    trail: [],
  }
}

function respawnPlane(plane: Plane, width: number, height: number) {
  plane.trail = []
  plane.path = randomPath()
  const { x, y } = spawnPosition(plane.path, width, height)
  plane.x = x
  plane.y = y
  plane.heading = crossingHeading(plane.path)
  plane.steerTarget = plane.heading
  plane.steerTimer = randomBetween(2800, 5200)
}

function updatePlaneBounds(plane: Plane, width: number, height: number) {
  const margin = 56
  const offScreen =
    plane.x < -margin ||
    plane.x > width + margin ||
    plane.y < -margin ||
    plane.y > height + margin

  if (offScreen) {
    respawnPlane(plane, width, height)
  }
}

function steerPlane(plane: Plane, now: number, dt: number) {
  plane.steerTimer -= dt

  if (plane.steerTimer <= 0) {
    const nudge = randomBetween(-MAX_NUDGE, MAX_NUDGE)
    plane.steerTarget = clampToCorridor(plane.heading + nudge, plane.path)
    plane.steerTimer = randomBetween(3200, 6800)
  }

  const drift =
    Math.sin(now * plane.wanderRate + plane.wanderPhase) * 0.003 +
    Math.sin(now * plane.wanderRate * 1.6 + plane.wanderPhase * 0.8) * 0.002

  let delta = normalizeAngle(plane.steerTarget - plane.heading)
  const turnStep = MAX_TURN_PER_FRAME * (dt / 16)
  delta = clamp(delta, -turnStep, turnStep)

  plane.heading = clampToCorridor(plane.heading + delta + drift, plane.path)
}

function isWatermarkPixel(r: number, g: number, b: number, y: number, planeMaxY: number) {
  const isWhiteBackground = r >= 248 && g >= 248 && b >= 248
  const isNeutralGrey = Math.abs(r - g) < 10 && Math.abs(g - b) < 10
  const isMidGreyText = isNeutralGrey && r >= 130 && r <= 175
  const isBelowPlane = y > planeMaxY
  return isWhiteBackground || isBelowPlane || (y > planeMaxY - 12 && isMidGreyText)
}

function createTransparentSprite(source: HTMLImageElement): HTMLCanvasElement {
  const full = document.createElement('canvas')
  full.width = source.naturalWidth
  full.height = source.naturalHeight

  const fullCtx = full.getContext('2d', { willReadFrequently: true })
  if (!fullCtx) return full

  fullCtx.drawImage(source, 0, 0)
  const imageData = fullCtx.getImageData(0, 0, full.width, full.height)
  const { data, width, height } = imageData

  let planeMaxY = 0
  for (let y = 0; y < height; y += 1) {
    let rowCount = 0
    for (let x = 0; x < width; x += 1) {
      if (data[(y * width + x) * 4 + 3] >= 8) rowCount += 1
    }
    if (rowCount >= 12) planeMaxY = y
  }

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i]
    const g = data[i + 1]
    const b = data[i + 2]
    const y = Math.floor(i / 4 / width)
    if (isWatermarkPixel(r, g, b, y, planeMaxY)) data[i + 3] = 0
  }

  fullCtx.putImageData(imageData, 0, 0)

  let minX = width
  let minY = height
  let maxX = 0
  let maxY = 0

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const alpha = data[(y * width + x) * 4 + 3]
      if (alpha < 8) continue
      minX = Math.min(minX, x)
      minY = Math.min(minY, y)
      maxX = Math.max(maxX, x)
      maxY = Math.max(maxY, y)
    }
  }

  if (maxX <= minX || maxY <= minY) return full

  const cropped = document.createElement('canvas')
  cropped.width = maxX - minX + 1
  cropped.height = maxY - minY + 1
  const croppedCtx = cropped.getContext('2d')
  if (!croppedCtx) return full

  croppedCtx.drawImage(
    full,
    minX,
    minY,
    cropped.width,
    cropped.height,
    0,
    0,
    cropped.width,
    cropped.height,
  )

  return cropped
}

function drawTrailDots(ctx: CanvasRenderingContext2D, trail: TrailDot[], now: number) {
  for (const dot of trail) {
    const age = now - dot.born
    if (age >= TRAIL_LIFE_MS) continue

    const fade = 1 - age / TRAIL_LIFE_MS
    const alpha = fade * fade * 0.62
    if (alpha <= 0.01) continue

    ctx.fillStyle = `rgba(180, 145, 255, ${alpha})`
    ctx.fillRect(dot.x - 1.5, dot.y - 1.5, 3, 3)
  }
}

function drawPlaneSprite(
  ctx: CanvasRenderingContext2D,
  sprite: HTMLCanvasElement,
  x: number,
  y: number,
  path: PlanePath,
) {
  const w = sprite.width * SPRITE_SCALE
  const h = sprite.height * SPRITE_SCALE

  ctx.save()
  ctx.translate(x, y)
  switch (path) {
    case 'left':
      ctx.scale(-1, 1)
      break
    case 'down':
      ctx.rotate(Math.PI / 2)
      break
    case 'up':
      ctx.rotate(-Math.PI / 2)
      break
    default:
      break
  }
  ctx.globalAlpha = 0.78
  ctx.drawImage(sprite, -w / 2, -h / 2, w, h)
  ctx.restore()
  ctx.globalAlpha = 1
}

export function ProjectsPixelAirplanes() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reducedMotion) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const sprite = new Image()
    sprite.src = SPRITE_SRC

    let width = 0
    let height = 0
    let animationId = 0
    let lastNow = 0
    let spriteReady = false
    let processedSprite: HTMLCanvasElement | null = null
    const planes: Plane[] = []

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.imageSmoothingEnabled = false
    }

    const tick = (now: number) => {
      if (!spriteReady || !processedSprite) {
        animationId = window.requestAnimationFrame(tick)
        return
      }

      const dt = lastNow ? Math.min(now - lastNow, 32) : 16
      lastNow = now

      ctx.clearRect(0, 0, width, height)

      for (const plane of planes) {
        steerPlane(plane, now, dt)

        plane.x += Math.cos(plane.heading) * plane.speed * (dt / 16)
        plane.y += Math.sin(plane.heading) * plane.speed * (dt / 16)
        updatePlaneBounds(plane, width, height)

        const last = plane.trail[plane.trail.length - 1]
        const dist = last
          ? Math.hypot(plane.x - last.x, plane.y - last.y)
          : TRAIL_GAP_PX + 1

        if (dist >= TRAIL_GAP_PX) {
          plane.trail.push({ x: plane.x, y: plane.y, born: now })
        }

        plane.trail = plane.trail.filter((dot) => now - dot.born < TRAIL_LIFE_MS)
        if (plane.trail.length > MAX_TRAIL_DOTS) {
          plane.trail = plane.trail.slice(-MAX_TRAIL_DOTS)
        }

        drawTrailDots(ctx, plane.trail, now)
        drawPlaneSprite(ctx, processedSprite, plane.x, plane.y, plane.path)
      }

      animationId = window.requestAnimationFrame(tick)
    }

    const start = () => {
      resize()
      if (planes.length === 0) {
        for (let i = 0; i < PLANE_COUNT; i += 1) {
          planes.push(createPlane(width, height))
        }
      }
      animationId = window.requestAnimationFrame(tick)
    }

    sprite.onload = () => {
      processedSprite = createTransparentSprite(sprite)
      spriteReady = true
      start()
    }

    sprite.onerror = () => {
      /* skip animation if sprite fails to load */
    }

    window.addEventListener('resize', resize)

    if (sprite.complete && sprite.naturalWidth > 0) {
      processedSprite = createTransparentSprite(sprite)
      spriteReady = true
      start()
    }

    return () => {
      window.cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="projects-pixel-airplanes"
      aria-hidden
    />
  )
}
