import { useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useReducedMotion } from 'framer-motion'
import * as THREE from 'three'
import {
  createHeroGlobePlacements,
  type HeroGlobeLabelPlacement,
} from '../../data/heroGlobeLabels'
import { fibonacciSpherePoints, filterLandPoints, latLngToVector3 } from '../../lib/geo'

const EARTH_TEXTURE = '/images/earth-day.jpg'
const EARTH_LAND_MASK = '/images/earth-land-mask.png'
const LAND_SAMPLE_COUNT = 22000
const GLOBE_RADIUS = 1
const ROTATION_SPEED = 0.16
const LABEL_SURFACE_OFFSET = 1.1
const LABEL_DPR = 3
const LABEL_FONT_SIZE = 14
const LABEL_SCREEN_PX = 14
const GLOBE_DISPLAY_SCALE = 1
const MIN_FRONT_DOT = -0.08
const MAX_SCREEN_Y = 0.58
const OVERLAP_PAD_NDC = 0.035

function createLabelTexture(text: string) {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  if (!ctx) return null

  const padX = 8
  const padY = 4
  const font = `400 ${LABEL_FONT_SIZE}px "DM Sans", system-ui, sans-serif`
  ctx.font = font
  const textWidth = ctx.measureText(text).width
  const logicalW = Math.ceil(textWidth + padX * 2)
  const logicalH = LABEL_FONT_SIZE + padY * 2

  canvas.width = logicalW * LABEL_DPR
  canvas.height = logicalH * LABEL_DPR
  ctx.scale(LABEL_DPR, LABEL_DPR)

  ctx.font = font
  ctx.imageSmoothingEnabled = true
  ctx.imageSmoothingQuality = 'high'

  ctx.fillStyle = 'rgba(8, 8, 14, 0.78)'
  ctx.strokeStyle = 'rgba(184, 148, 255, 0.65)'
  ctx.lineWidth = 1
  const r = 5
  const w = logicalW
  const h = logicalH
  ctx.beginPath()
  ctx.moveTo(r, 0)
  ctx.lineTo(w - r, 0)
  ctx.quadraticCurveTo(w, 0, w, r)
  ctx.lineTo(w, h - r)
  ctx.quadraticCurveTo(w, h, w - r, h)
  ctx.lineTo(r, h)
  ctx.quadraticCurveTo(0, h, 0, h - r)
  ctx.lineTo(0, r)
  ctx.quadraticCurveTo(0, 0, r, 0)
  ctx.closePath()
  ctx.fill()
  ctx.stroke()

  ctx.fillStyle = 'rgba(255, 255, 255, 0.92)'
  ctx.textBaseline = 'middle'
  ctx.textAlign = 'center'
  ctx.fillText(text, w / 2, h / 2)

  const texture = new THREE.CanvasTexture(canvas)
  texture.minFilter = THREE.LinearFilter
  texture.magFilter = THREE.LinearFilter
  texture.generateMipmaps = false
  texture.colorSpace = THREE.SRGBColorSpace
  texture.needsUpdate = true
  return { texture, width: logicalW, height: logicalH }
}

type ScreenRect = {
  cx: number
  cy: number
  halfW: number
  halfH: number
}

function rectsOverlap(a: ScreenRect, b: ScreenRect, pad: number) {
  return (
    Math.abs(a.cx - b.cx) < a.halfW + b.halfW + pad &&
    Math.abs(a.cy - b.cy) < a.halfH + b.halfH + pad
  )
}

function GlobeLabels({
  placements,
  radius,
}: {
  placements: HeroGlobeLabelPlacement[]
  radius: number
}) {
  const spriteRefs = useRef<(THREE.Sprite | null)[]>([])
  const textures = useMemo(
    () =>
      placements.map((placement) => {
        const data = createLabelTexture(placement.text)
        if (!data) throw new Error(`Failed to create label texture for ${placement.text}`)
        return data
      }),
    [placements],
  )

  const positions = useMemo(
    () =>
      placements.map((placement) =>
        latLngToVector3(placement.lat, placement.lng, radius * LABEL_SURFACE_OFFSET),
      ),
    [placements, radius],
  )

  const labelPos = useMemo(() => new THREE.Vector3(), [])
  const projected = useMemo(() => new THREE.Vector3(), [])
  const outward = useMemo(() => new THREE.Vector3(), [])
  const toCamera = useMemo(() => new THREE.Vector3(), [])

  useFrame(({ camera, size }) => {
    const perspectiveCamera = camera as THREE.PerspectiveCamera
    const candidates: Array<{
      index: number
      dot: number
      rect: ScreenRect
      worldHeight: number
      aspect: number
    }> = []

    placements.forEach((_, index) => {
      const sprite = spriteRefs.current[index]
      const label = textures[index]
      if (!sprite || !label) return

      sprite.getWorldPosition(labelPos)
      outward.copy(labelPos).normalize()
      toCamera.copy(camera.position).sub(labelPos).normalize()
      projected.copy(labelPos).project(camera)

      const dot = outward.dot(toCamera)
      if (dot < MIN_FRONT_DOT) return
      if (Math.abs(projected.y) > MAX_SCREEN_Y) return

      const distance = perspectiveCamera.position.distanceTo(labelPos)
      const vFov = (perspectiveCamera.fov * Math.PI) / 180
      const visibleHeight = 2 * Math.tan(vFov / 2) * distance
      const worldUnitsPerPixel = visibleHeight / size.height
      const targetScreenHeight = (label.height / LABEL_FONT_SIZE) * LABEL_SCREEN_PX
      const worldHeight = targetScreenHeight * worldUnitsPerPixel
      const aspect = label.width / label.height

      const screenHeightNdc = (worldHeight / visibleHeight) * 2
      const screenWidthNdc = screenHeightNdc * aspect

      candidates.push({
        index,
        dot,
        rect: {
          cx: projected.x,
          cy: projected.y,
          halfW: screenWidthNdc / 2,
          halfH: screenHeightNdc / 2,
        },
        worldHeight,
        aspect,
      })
    })

    candidates.sort((a, b) => b.dot - a.dot)

    const accepted: ScreenRect[] = []
    const visibleIndices = new Set<number>()

    for (const candidate of candidates) {
      const overlaps = accepted.some((rect) => rectsOverlap(candidate.rect, rect, OVERLAP_PAD_NDC))
      if (overlaps) continue

      accepted.push(candidate.rect)
      visibleIndices.add(candidate.index)
    }

    placements.forEach((_, index) => {
      const sprite = spriteRefs.current[index]
      const label = textures[index]
      if (!sprite || !label) return

      const isVisible = visibleIndices.has(index)
      sprite.visible = isVisible
      if (!isVisible) return

      const candidate = candidates.find((entry) => entry.index === index)
      if (!candidate) return

      sprite.scale.set(
        candidate.worldHeight * candidate.aspect,
        candidate.worldHeight,
        1,
      )
    })
  })

  return (
    <>
      {placements.map((placement, index) => (
        <sprite
          key={placement.text}
          ref={(node) => {
            spriteRefs.current[index] = node
          }}
          position={positions[index]}
          renderOrder={5}
        >
          <spriteMaterial
            map={textures[index].texture}
            transparent
            opacity={0.92}
            depthTest={false}
            depthWrite={false}
            toneMapped={false}
          />
        </sprite>
      ))}
    </>
  )
}

function HeroGlobeScene({ paused }: { paused: boolean }) {
  const rotateRef = useRef<THREE.Group>(null)
  const [landPositions, setLandPositions] = useState<Float32Array | null>(null)
  const labelPlacements = useMemo(() => createHeroGlobePlacements(), [])

  useEffect(() => {
    let cancelled = false
    const samplePoints = fibonacciSpherePoints(LAND_SAMPLE_COUNT, GLOBE_RADIUS)

    filterLandPoints(samplePoints, EARTH_TEXTURE, EARTH_LAND_MASK)
      .then((positions) => {
        if (!cancelled) setLandPositions(positions)
      })
      .catch(() => {
        if (!cancelled) setLandPositions(null)
      })

    return () => {
      cancelled = true
    }
  }, [])

  useFrame((_, delta) => {
    if (paused || !rotateRef.current) return
    rotateRef.current.rotation.y += delta * ROTATION_SPEED
  })

  const landGeometry = useMemo(() => {
    if (!landPositions || landPositions.length === 0) return null
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(landPositions, 3))
    return geo
  }, [landPositions])

  return (
    <group scale={GLOBE_DISPLAY_SCALE}>
      <group rotation={[0.15, 0.35, 0]}>
        <group ref={rotateRef}>
          <ambientLight intensity={0.85} />

          {landGeometry && (
            <points geometry={landGeometry} renderOrder={0}>
              <pointsMaterial
                color="#b8a0f8"
                size={0.013}
                sizeAttenuation
                opacity={1}
                depthWrite
              />
            </points>
          )}

          <mesh renderOrder={1}>
            <sphereGeometry args={[GLOBE_RADIUS * 0.998, 48, 48]} />
            <meshBasicMaterial color="#0c0c14" depthWrite />
          </mesh>

          <GlobeLabels placements={labelPlacements} radius={GLOBE_RADIUS} />
        </group>
      </group>
    </group>
  )
}

export function HeroGlobeBackground() {
  const reduceMotion = useReducedMotion()

  return (
    <div className="hero-globe" aria-hidden>
      <Canvas
        className="hero-globe__canvas"
        camera={{ position: [0, 0, 3.55], fov: 33 }}
        dpr={[1, 2]}
        gl={{ alpha: true, antialias: true }}
      >
        <HeroGlobeScene paused={Boolean(reduceMotion)} />
      </Canvas>
    </div>
  )
}
