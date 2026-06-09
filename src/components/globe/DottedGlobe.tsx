import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { globeFeaturedProjects } from '../../data/content'
import { fibonacciSpherePoints, filterLandPoints } from '../../lib/geo'
import { CaseStudyCard } from './CaseStudyCard'
import { ProjectPin, useGlobeDrag } from './ProjectPin'

const EARTH_TEXTURE = '/images/earth-day.jpg'
const LAND_SAMPLE_COUNT = 18000
const GLOBE_RADIUS = 1
const HOVER_ENTER_DELAY_MS = 280
const HOVER_CLEAR_DELAY_MS = 320

function GlobeScene({
  activeId,
  onSelect,
  onHover,
}: {
  activeId: string | null
  onSelect: (id: string | null) => void
  onHover: (id: string | null) => void
}) {
  const groupRef = useRef<THREE.Group>(null)
  const [landPositions, setLandPositions] = useState<Float32Array | null>(null)
  const dragHandlers = useGlobeDrag(groupRef)

  useEffect(() => {
    let cancelled = false
    const samplePoints = fibonacciSpherePoints(LAND_SAMPLE_COUNT, GLOBE_RADIUS)

    filterLandPoints(samplePoints, EARTH_TEXTURE)
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
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.06
    }
  })

  const landGeometry = useMemo(() => {
    if (!landPositions || landPositions.length === 0) return null
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(landPositions, 3))
    return geo
  }, [landPositions])

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.7} />

      {landGeometry && (
        <points geometry={landGeometry}>
          <pointsMaterial
            color="#c4b5fd"
            size={0.014}
            sizeAttenuation
            transparent
            opacity={0.95}
          />
        </points>
      )}

      <mesh
        onPointerDown={dragHandlers.onPointerDown}
        onPointerUp={dragHandlers.onPointerUp}
        onPointerMove={dragHandlers.onPointerMove}
        onPointerLeave={dragHandlers.onPointerUp}
      >
        <sphereGeometry args={[GLOBE_RADIUS, 64, 64]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>

      {globeFeaturedProjects.map((project) => (
        <ProjectPin
          key={project.id}
          project={project}
          radius={GLOBE_RADIUS}
          activeId={activeId}
          onSelect={onSelect}
          onHover={onHover}
        />
      ))}
    </group>
  )
}

export function DottedGlobe() {
  const [activeId, setActiveId] = useState<string | null>(null)
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const hoverClearTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const hoverEnterTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const pendingHoverId = useRef<string | null>(null)

  const previewId = hoveredId ?? activeId
  const previewProject = globeFeaturedProjects.find((p) => p.id === previewId) ?? null

  const clearHoverTimers = () => {
    if (hoverClearTimer.current) {
      clearTimeout(hoverClearTimer.current)
      hoverClearTimer.current = null
    }
    if (hoverEnterTimer.current) {
      clearTimeout(hoverEnterTimer.current)
      hoverEnterTimer.current = null
    }
    pendingHoverId.current = null
  }

  const handleHover = (id: string | null) => {
    if (hoverClearTimer.current) {
      clearTimeout(hoverClearTimer.current)
      hoverClearTimer.current = null
    }

    if (id) {
      if (hoverEnterTimer.current) {
        clearTimeout(hoverEnterTimer.current)
      }
      pendingHoverId.current = id
      hoverEnterTimer.current = setTimeout(() => {
        if (pendingHoverId.current === id) {
          setHoveredId(id)
        }
        hoverEnterTimer.current = null
      }, HOVER_ENTER_DELAY_MS)
      return
    }

    if (hoverEnterTimer.current) {
      clearTimeout(hoverEnterTimer.current)
      hoverEnterTimer.current = null
    }
    pendingHoverId.current = null

    hoverClearTimer.current = setTimeout(() => {
      setHoveredId(null)
      hoverClearTimer.current = null
    }, HOVER_CLEAR_DELAY_MS)
  }

  const keepPreviewHover = () => {
    clearHoverTimers()
  }

  const handleSelect = (id: string | null) => {
    setActiveId(id)
    if (!id) setHoveredId(null)
  }

  const closePreview = () => {
    clearHoverTimers()
    setActiveId(null)
    setHoveredId(null)
  }

  useEffect(() => {
    if (!previewProject) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closePreview()
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [previewProject])

  useEffect(
    () => () => {
      clearHoverTimers()
    },
    [],
  )

  return (
    <div className="relative h-[420px] w-full overflow-hidden rounded-[2rem] bg-surface ring-1 ring-accent/15 md:h-[520px] lg:h-[580px]">
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,rgba(153,112,255,0.1),transparent_68%)]" />

      <Canvas
        className="relative z-[1] !h-full !w-full"
        camera={{ position: [0, 0.08, 2.75], fov: 42 }}
        dpr={[1, 2]}
        onPointerMissed={closePreview}
      >
        <color attach="background" args={['#111118']} />
        <GlobeScene activeId={activeId} onSelect={handleSelect} onHover={handleHover} />
      </Canvas>

      <AnimatePresence>
        {previewProject && (
          <motion.div
            key="globe-preview-backdrop"
            className="absolute inset-0 z-[2] flex cursor-default items-center justify-center overflow-hidden px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closePreview}
            onMouseEnter={keepPreviewHover}
            role="dialog"
            aria-modal="true"
            aria-label={`${previewProject.title} preview`}
          >
            <div
              className="pointer-events-auto"
              onClick={(event) => event.stopPropagation()}
              onPointerDown={(event) => event.stopPropagation()}
              onPointerEnter={keepPreviewHover}
              onMouseEnter={keepPreviewHover}
            >
              <CaseStudyCard project={previewProject} onClose={closePreview} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="pointer-events-none absolute inset-x-0 bottom-5 z-[3] flex justify-center px-6">
        <p className="rounded-full bg-elevated/80 px-4 py-2 text-xs text-slate backdrop-blur-md ring-1 ring-accent/20">
          Hover a pin to preview · Click to keep open · Drag to rotate
        </p>
      </div>
    </div>
  )
}
