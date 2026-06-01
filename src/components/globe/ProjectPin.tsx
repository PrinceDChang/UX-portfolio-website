import { useRef, useState, type RefObject } from 'react'
import * as THREE from 'three'
import type { ThreeEvent } from '@react-three/fiber'
import type { Project } from '../../data/content'
import { latLngToVector3 } from '../../lib/geo'
import { pinColorsForRole } from '../../lib/projectRole'

interface ProjectPinProps {
  project: Project
  radius: number
  activeId: string | null
  onSelect: (id: string | null) => void
  onHover: (id: string | null) => void
}

/** Tight to the visible pin — preview only when cursor is near the dot */
const HIT_RADIUS = 0.12
const VISIBLE_RADIUS = 0.028

export function ProjectPin({ project, radius, activeId, onSelect, onHover }: ProjectPinProps) {
  const [hovered, setHovered] = useState(false)
  const position = latLngToVector3(project.lat, project.lng, radius * 1.02)
  const visible = hovered || activeId === project.id
  const pinColor = pinColorsForRole(project.role, project.comingSoon)
  const color = visible ? pinColor.active : pinColor.base

  const setHover = (next: boolean) => {
    setHovered(next)
    onHover(next ? project.id : null)
    document.body.style.cursor = next ? 'pointer' : 'default'
  }

  const handlePointerOver = (event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation()
    setHover(true)
  }

  const handlePointerOut = (event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation()
    setHover(false)
  }

  const handleClick = (event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation()
    onSelect(activeId === project.id ? null : project.id)
  }

  const handlePointerDown = (event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation()
  }

  const pinHandlers = {
    onPointerOver: handlePointerOver,
    onPointerOut: handlePointerOut,
    onPointerDown: handlePointerDown,
    onClick: handleClick,
  }

  return (
    <group position={position}>
      <mesh {...pinHandlers} renderOrder={20}>
        <sphereGeometry args={[HIT_RADIUS, 10, 10]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>

      <mesh rotation={[Math.PI / 2, 0, 0]} raycast={() => null} renderOrder={21}>
        <ringGeometry args={[0.032, 0.044, 32]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={visible ? 0.5 : 0.22}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>

      <mesh raycast={() => null} renderOrder={22}>
        <sphereGeometry args={[VISIBLE_RADIUS, 16, 16]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={visible ? 1 : 0.92}
          depthWrite={false}
        />
      </mesh>

      {visible && (
        <mesh position={[0, 0.045, 0]} raycast={() => null} renderOrder={23}>
          <sphereGeometry args={[0.01, 12, 12]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.95} depthWrite={false} />
        </mesh>
      )}
    </group>
  )
}

const DRAG_THRESHOLD_PX = 6

export function useGlobeDrag(ref: RefObject<THREE.Group | null>) {
  const dragging = useRef(false)
  const pending = useRef(false)
  const last = useRef({ x: 0, y: 0 })
  const start = useRef({ x: 0, y: 0 })

  const onPointerDown = (event: ThreeEvent<PointerEvent>) => {
    pending.current = true
    dragging.current = false
    start.current = { x: event.clientX, y: event.clientY }
    last.current = { x: event.clientX, y: event.clientY }
  }

  const onPointerUp = () => {
    pending.current = false
    dragging.current = false
  }

  const onPointerMove = (event: ThreeEvent<PointerEvent>) => {
    if (!ref.current) return

    if (pending.current && !dragging.current) {
      const dx = event.clientX - start.current.x
      const dy = event.clientY - start.current.y
      if (Math.hypot(dx, dy) < DRAG_THRESHOLD_PX) return
      dragging.current = true
    }

    if (!dragging.current) return

    const deltaX = event.clientX - last.current.x
    const deltaY = event.clientY - last.current.y
    ref.current.rotation.y += deltaX * 0.005
    ref.current.rotation.x += deltaY * 0.005
    ref.current.rotation.x = THREE.MathUtils.clamp(ref.current.rotation.x, -0.8, 0.8)
    last.current = { x: event.clientX, y: event.clientY }
  }

  return { onPointerDown, onPointerUp, onPointerMove }
}
