import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useEffect, useMemo, useRef, useState } from 'react'

const flowEase = [0.22, 1, 0.36, 1] as const
const FLOW_NODE_COLORS = {
  action: {
    fill: '#1a2438',
    stroke: 'rgba(96, 165, 250, 0.45)',
  },
  state: {
    fill: 'rgba(16, 185, 129, 0.14)',
    stroke: 'rgba(52, 211, 153, 0.55)',
  },
  decision: {
    fill: 'rgba(245, 158, 11, 0.18)',
    stroke: 'rgba(251, 191, 36, 0.62)',
  },
  milestone: {
    fill: 'rgba(153, 112, 255, 0.16)',
    stroke: 'rgba(167, 139, 250, 0.62)',
  },
} as const
const NODE_STAGGER = 0.11
const NODE_DURATION = 0.44
const EDGE_BASE_DURATION = 0.58
const CONNECT_GAP = 10

export type CoplanFlowNodeKind = 'action' | 'state' | 'decision' | 'milestone'

export interface CoplanFlowNode {
  id: string
  kind: CoplanFlowNodeKind
  label: string
  x: number
  y: number
  w?: number
  h?: number
  r?: number
}

export type CoplanFlowRouting = 'straight' | 'h-first' | 'v-first'

export interface CoplanFlowEdge {
  from: string
  to: string
  label?: string
  routing?: CoplanFlowRouting
  via?: readonly { readonly x: number; readonly y: number }[]
}

export interface CoplanFlowSection {
  id: string
  label: string
  x: number
  y: number
  w?: number
}

export interface CoplanUserFlowData {
  sections: readonly CoplanFlowSection[]
  nodes: readonly CoplanFlowNode[]
  edges: readonly CoplanFlowEdge[]
  revealOrder: readonly string[]
}

interface CoplanUserFlowRevealProps {
  data: CoplanUserFlowData
  className?: string
  viewW?: number
  viewH?: number
  ariaLabel?: string
}

const DEFAULT_VIEW_W = 1100
const DEFAULT_VIEW_H = 580

const nodeVariants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: NODE_DURATION, ease: flowEase },
  },
}

function edgeRevealTiming(
  edge: CoplanFlowEdge,
  revealIndex: Map<string, number>,
) {
  const fromIdx = revealIndex.get(edge.from) ?? 0
  const toIdx = revealIndex.get(edge.to) ?? 0
  const span = Math.max(1, toIdx - fromIdx)

  return {
    delay: fromIdx * NODE_STAGGER + NODE_DURATION * 0.4,
    duration: EDGE_BASE_DURATION + span * 0.05,
  }
}

const ACTION_PAD_X = 20
const ACTION_PAD_Y = 14
const ACTION_LINE_H = 11

interface NodeBounds {
  cx: number
  cy: number
  left: number
  right: number
  top: number
  bottom: number
  kind: CoplanFlowNodeKind
}

interface Point {
  x: number
  y: number
}

function actionLineCount(label: string, width: number) {
  const inner = Math.max(width - ACTION_PAD_X, 48)
  const charsPerLine = Math.max(Math.floor(inner / 4.6), 8)
  return Math.max(1, Math.ceil(label.length / charsPerLine))
}

function actionLayout(node: CoplanFlowNode) {
  const labelLines = node.label.split('\n')
  const longestLine = Math.max(...labelLines.map((line) => line.length))
  const minW = Math.max(96, Math.min(longestLine * 4.8 + 28, 196))
  const w = Math.max(node.w ?? 0, minW)
  const lines =
    labelLines.length > 1 ? labelLines.length : actionLineCount(node.label, w)
  const h = Math.max(node.h ?? 0, lines * ACTION_LINE_H + ACTION_PAD_Y)
  return { w, h, lines }
}

function stateRadius(label: string) {
  const lines = label.length > 14 ? 2 : 1
  if (lines === 1) return Math.max(34, Math.min(42, label.length * 2.6 + 14))
  return Math.max(44, Math.min(54, label.length * 2.1 + 18))
}

function decisionHalf(label: string) {
  const len = label.length
  if (len <= 22) return 46
  if (len <= 34) return 56
  return 64
}

function resolveStateRadius(node: CoplanFlowNode) {
  return node.r ?? stateRadius(node.label)
}

function resolveMilestoneRadius(node: CoplanFlowNode) {
  return node.r ?? stateRadius(node.label)
}

function milestoneHexHalfWidth(r: number) {
  return r * 0.8660254
}

function milestoneHexPoints(cx: number, cy: number, r: number) {
  const w = milestoneHexHalfWidth(r)
  return `${cx},${cy - r} ${cx + w},${cy - r / 2} ${cx + w},${cy + r / 2} ${cx},${cy + r} ${cx - w},${cy + r / 2} ${cx - w},${cy - r / 2}`
}

function getNodeBounds(node: CoplanFlowNode): NodeBounds {
  if (node.kind === 'milestone') {
    const r = resolveMilestoneRadius(node)
    const w = milestoneHexHalfWidth(r)
    return {
      cx: node.x,
      cy: node.y,
      left: node.x - w,
      right: node.x + w,
      top: node.y - r,
      bottom: node.y + r,
      kind: 'milestone',
    }
  }

  if (node.kind === 'state') {
    const r = resolveStateRadius(node)
    return {
      cx: node.x,
      cy: node.y,
      left: node.x - r,
      right: node.x + r,
      top: node.y - r,
      bottom: node.y + r,
      kind: 'state',
    }
  }

  if (node.kind === 'decision') {
    const half = decisionHalf(node.label)
    return {
      cx: node.x,
      cy: node.y,
      left: node.x - half,
      right: node.x + half,
      top: node.y - half,
      bottom: node.y + half,
      kind: 'decision',
    }
  }

  const { w, h } = actionLayout(node)
  return {
    cx: node.x,
    cy: node.y,
    left: node.x - w / 2,
    right: node.x + w / 2,
    top: node.y - h / 2,
    bottom: node.y + h / 2,
    kind: 'action',
  }
}

function getCardinalAnchor(bounds: NodeBounds, tx: number, ty: number): Point {
  const dx = tx - bounds.cx
  const dy = ty - bounds.cy

  if (Math.abs(dx) > Math.abs(dy)) {
    return dx > 0
      ? { x: bounds.right, y: bounds.cy }
      : { x: bounds.left, y: bounds.cy }
  }

  if (Math.abs(dy) < 1 && Math.abs(dx) < 1) {
    return { x: bounds.cx, y: bounds.top }
  }

  return dy > 0
    ? { x: bounds.cx, y: bounds.bottom }
    : { x: bounds.cx, y: bounds.top }
}

function nudgeFromEdge(point: Point, bounds: NodeBounds, gap: number): Point {
  if (Math.abs(point.x - bounds.right) < 3) return { x: point.x + gap, y: point.y }
  if (Math.abs(point.x - bounds.left) < 3) return { x: point.x - gap, y: point.y }
  if (Math.abs(point.y - bounds.bottom) < 3) return { x: point.x, y: point.y + gap }
  if (Math.abs(point.y - bounds.top) < 3) return { x: point.x, y: point.y - gap }
  return point
}

function appendOrthogonalSegment(
  path: string,
  from: Point,
  to: Point,
  routing: CoplanFlowRouting,
): string {
  const dx = to.x - from.x
  const dy = to.y - from.y

  if (Math.abs(dx) < 1) return `${path} L ${to.x} ${to.y}`
  if (Math.abs(dy) < 1) return `${path} L ${to.x} ${to.y}`

  if (routing === 'v-first') {
    return `${path} L ${from.x} ${to.y} L ${to.x} ${to.y}`
  }

  return `${path} L ${to.x} ${from.y} L ${to.x} ${to.y}`
}

function routeOrthogonalPoints(points: readonly Point[]): string {
  if (points.length < 2) return ''

  let path = `M ${points[0]!.x} ${points[0]!.y}`
  for (let i = 1; i < points.length; i++) {
    const from = points[i - 1]!
    const to = points[i]!
    path = appendOrthogonalSegment(path, from, to, inferRouting(from, to))
  }
  return path
}

function routeOrthogonal(
  start: Point,
  end: Point,
  routing: CoplanFlowRouting,
): string {
  const dx = end.x - start.x
  const dy = end.y - start.y
  if (Math.abs(dx) < 1 || Math.abs(dy) < 1) {
    return routeOrthogonalPoints([start, end])
  }
  return appendOrthogonalSegment(`M ${start.x} ${start.y}`, start, end, routing)
}

function inferRouting(start: Point, end: Point): CoplanFlowRouting {
  const horizontalSpan = Math.abs(end.x - start.x)
  const verticalSpan = Math.abs(end.y - start.y)
  if (verticalSpan > horizontalSpan * 1.1) return 'v-first'
  return 'h-first'
}

const ARROW_LENGTH = 7
const ARROW_SPREAD = 3.5

function parsePathPoints(d: string): Point[] {
  const points: Point[] = []
  const tokenRe = /([ML])\s*(-?\d*\.?\d+)\s+(-?\d*\.?\d+)/g
  let match = tokenRe.exec(d)
  while (match) {
    points.push({ x: Number(match[2]), y: Number(match[3]) })
    match = tokenRe.exec(d)
  }
  return points
}

function appendStrokeArrowhead(path: string): string {
  const points = parsePathPoints(path)
  if (points.length < 2) return path

  const end = points[points.length - 1]!
  const prev = points[points.length - 2]!
  const dx = end.x - prev.x
  const dy = end.y - prev.y
  const len = Math.hypot(dx, dy) || 1
  const ux = dx / len
  const uy = dy / len
  const px = -uy
  const py = ux
  const baseX = end.x - ux * ARROW_LENGTH
  const baseY = end.y - uy * ARROW_LENGTH
  const wing1X = baseX + px * ARROW_SPREAD
  const wing1Y = baseY + py * ARROW_SPREAD
  const wing2X = baseX - px * ARROW_SPREAD
  const wing2Y = baseY - py * ARROW_SPREAD

  return `${path} M ${wing1X} ${wing1Y} L ${end.x} ${end.y} L ${wing2X} ${wing2Y}`
}

function buildEdgePath(
  _from: CoplanFlowNode,
  _to: CoplanFlowNode,
  fromBounds: NodeBounds,
  toBounds: NodeBounds,
  edge: CoplanFlowEdge,
): string {
  const firstVia = edge.via?.[0]
  const lastVia = edge.via?.[edge.via.length - 1]
  const rawStart = getCardinalAnchor(
    fromBounds,
    firstVia?.x ?? toBounds.cx,
    firstVia?.y ?? toBounds.cy,
  )
  const rawEnd = getCardinalAnchor(
    toBounds,
    lastVia?.x ?? fromBounds.cx,
    lastVia?.y ?? fromBounds.cy,
  )
  const start = nudgeFromEdge(rawStart, fromBounds, CONNECT_GAP * 0.35)
  const end = nudgeFromEdge(rawEnd, toBounds, CONNECT_GAP * 0.35)

  const routing =
    edge.routing === 'straight'
      ? inferRouting(start, end)
      : edge.routing ?? inferRouting(start, end)

  if (edge.via?.length) {
    return routeOrthogonalPoints([start, ...edge.via, end])
  }

  return routeOrthogonal(start, end, routing)
}

function verticalBranchTrunkX(
  edge: CoplanFlowEdge,
  fromBounds: NodeBounds,
  toBounds: NodeBounds,
): number | null {
  if (edge.routing !== 'v-first') return null

  const dx = toBounds.cx - fromBounds.cx
  const dy = toBounds.cy - fromBounds.cy
  const absDx = Math.abs(dx)
  const absDy = Math.abs(dy)
  if (absDy < 12) return null

  const gap = CONNECT_GAP * 0.35
  if (absDx > absDy) {
    return dx > 0 ? fromBounds.right + gap : fromBounds.left - gap
  }

  return fromBounds.cx
}

function edgeLabelPosition(
  edge: CoplanFlowEdge,
  fromBounds: NodeBounds,
  toBounds: NodeBounds,
): Point | null {
  if (!edge.label) return null

  if (edge.label === 'Yes') {
    const dy = Math.abs(fromBounds.cy - toBounds.cy)
    const dx = Math.abs(toBounds.cx - fromBounds.cx)

    if (dy < dx * 0.35) {
      const fromEdge =
        fromBounds.cx < toBounds.cx ? fromBounds.right : fromBounds.left
      const toEdge = fromBounds.cx < toBounds.cx ? toBounds.left : toBounds.right
      const lineY = (fromBounds.cy + toBounds.cy) / 2
      return { x: (fromEdge + toEdge) / 2, y: lineY - 8 }
    }

    const trunkX = verticalBranchTrunkX(edge, fromBounds, toBounds)
    if (trunkX !== null) {
      return { x: trunkX, y: (fromBounds.cy + toBounds.cy) / 2 }
    }

    return { x: fromBounds.cx, y: (fromBounds.bottom + toBounds.top) / 2 }
  }

  if (edge.label === 'No') {
    const via = edge.via
    if (via && via.length >= 2) {
      const firstVia = via[0]!
      const lastVia = via[via.length - 1]!
      if (Math.abs(firstVia.y - lastVia.y) < 2) {
        return {
          x: (firstVia.x + lastVia.x) / 2,
          y: firstVia.y - 8,
        }
      }
    }

    const dy = Math.abs(fromBounds.cy - toBounds.cy)
    const dx = Math.abs(toBounds.cx - fromBounds.cx)

    if (dy < dx * 0.35) {
      const fromEdge =
        fromBounds.cx < toBounds.cx ? fromBounds.right : fromBounds.left
      const toEdge = fromBounds.cx < toBounds.cx ? toBounds.left : toBounds.right
      const lineY = (fromBounds.cy + toBounds.cy) / 2
      return { x: (fromEdge + toEdge) / 2, y: lineY - 8 }
    }

    const trunkX = verticalBranchTrunkX(edge, fromBounds, toBounds)
    if (trunkX !== null) {
      return { x: trunkX, y: (fromBounds.cy + toBounds.cy) / 2 }
    }

    return {
      x: (fromBounds.right + toBounds.left) / 2,
      y: (fromBounds.cy + toBounds.cy) / 2,
    }
  }

  if (edge.label === 'Add') {
    return { x: fromBounds.cx, y: (fromBounds.top + toBounds.cy) / 2 }
  }

  if (edge.label === 'Drop') {
    return { x: fromBounds.cx, y: (fromBounds.bottom + toBounds.top) / 2 }
  }

  if (edge.label === 'Edit') {
    const via = edge.via
    if (via && via.length >= 2) {
      for (let i = 0; i < via.length - 1; i++) {
        const a = via[i]!
        const b = via[i + 1]!
        if (Math.abs(a.y - b.y) < 2) {
          let leftX = Math.min(a.x, b.x)
          let rightX = Math.max(a.x, b.x)
          if (Math.abs(a.y - fromBounds.cy) < 20) {
            leftX = Math.min(leftX, fromBounds.left)
            rightX = Math.max(rightX, fromBounds.right)
          }
          return { x: (leftX + rightX) / 2, y: a.y - 8 }
        }
      }
    }

    const dy = Math.abs(fromBounds.cy - toBounds.cy)
    const dx = Math.abs(toBounds.cx - fromBounds.cx)
    if (dy < dx * 0.35) {
      const fromEdge =
        fromBounds.cx < toBounds.cx ? fromBounds.right : fromBounds.left
      const toEdge = fromBounds.cx < toBounds.cx ? toBounds.left : toBounds.right
      const lineY = (fromBounds.cy + toBounds.cy) / 2
      return { x: (fromEdge + toEdge) / 2, y: lineY - 8 }
    }
  }

  return null
}

function FlowNodeShape({
  node,
  animateIn,
  reduceMotion,
  index,
}: {
  node: CoplanFlowNode
  animateIn: boolean
  reduceMotion: boolean | null
  index: number
}) {
  const motionProps = reduceMotion
    ? {}
    : {
        initial: 'hidden' as const,
        animate: animateIn ? 'visible' : 'hidden',
        variants: nodeVariants,
        transition: { delay: index * NODE_STAGGER },
      }

  const clipId = `coplan-node-clip-${node.id}`

  if (node.kind === 'milestone') {
    const r = resolveMilestoneRadius(node)
    const w = milestoneHexHalfWidth(r)
    const textW = w * 1.55
    const textH = r * 1.45

    return (
      <motion.g {...motionProps}>
        <defs>
          <clipPath id={clipId}>
            <polygon points={milestoneHexPoints(node.x, node.y, r - 1.5)} />
          </clipPath>
        </defs>
        <polygon
          points={milestoneHexPoints(node.x, node.y, r)}
          fill={FLOW_NODE_COLORS.milestone.fill}
          stroke={FLOW_NODE_COLORS.milestone.stroke}
          strokeWidth="1.75"
          strokeLinejoin="round"
        />
        <foreignObject
          x={node.x - textW / 2}
          y={node.y - textH / 2}
          width={textW}
          height={textH}
          clipPath={`url(#${clipId})`}
        >
          <div className="flex h-full items-center justify-center px-1">
            <p className="text-center text-[8.5px] font-semibold leading-[1.15] text-violet-100">
              {node.label}
            </p>
          </div>
        </foreignObject>
      </motion.g>
    )
  }

  if (node.kind === 'state') {
    const r = resolveStateRadius(node)
    const inset = 8
    const textW = (r - inset) * 2
    const textH = r * 1.35

    return (
      <motion.g {...motionProps}>
        <defs>
          <clipPath id={clipId}>
            <circle cx={node.x} cy={node.y} r={r - 1.5} />
          </clipPath>
        </defs>
        <circle
          cx={node.x}
          cy={node.y}
          r={r}
          fill={FLOW_NODE_COLORS.state.fill}
          stroke={FLOW_NODE_COLORS.state.stroke}
          strokeWidth="2"
        />
        <foreignObject
          x={node.x - textW / 2}
          y={node.y - textH / 2}
          width={textW}
          height={textH}
          clipPath={`url(#${clipId})`}
        >
          <div className="flex h-full items-center justify-center px-1">
            <p className="text-center text-[8.5px] font-semibold leading-[1.15] text-emerald-100">
              {node.label}
            </p>
          </div>
        </foreignObject>
      </motion.g>
    )
  }

  if (node.kind === 'decision') {
    const half = decisionHalf(node.label)
    const textW = half * 1.35
    const textH = half * 1.35

    return (
      <motion.g {...motionProps}>
        <defs>
          <clipPath id={clipId}>
            <polygon
              points={`${node.x},${node.y - half + 2} ${node.x + half - 2},${node.y} ${node.x},${node.y + half - 2} ${node.x - half + 2},${node.y}`}
            />
          </clipPath>
        </defs>
        <polygon
          points={`${node.x},${node.y - half} ${node.x + half},${node.y} ${node.x},${node.y + half} ${node.x - half},${node.y}`}
          fill={FLOW_NODE_COLORS.decision.fill}
          stroke={FLOW_NODE_COLORS.decision.stroke}
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <foreignObject
          x={node.x - textW / 2}
          y={node.y - textH / 2}
          width={textW}
          height={textH}
          clipPath={`url(#${clipId})`}
        >
          <div className="flex h-full items-center justify-center px-1.5">
            <p className="text-center text-[7.5px] font-medium leading-[1.2] text-amber-100">
              {node.label}
            </p>
          </div>
        </foreignObject>
      </motion.g>
    )
  }

  const { w, h } = actionLayout(node)
  const padX = 10
  const padY = 7

  return (
    <motion.g {...motionProps}>
      <rect
        x={node.x - w / 2}
        y={node.y - h / 2}
        width={w}
        height={h}
        rx={10}
        fill={FLOW_NODE_COLORS.action.fill}
        stroke={FLOW_NODE_COLORS.action.stroke}
        strokeWidth="1"
      />
      <foreignObject
        x={node.x - w / 2 + padX}
        y={node.y - h / 2 + padY}
        width={w - padX * 2}
        height={h - padY * 2}
      >
        <div className="flex h-full items-center justify-center">
          <p
            className={`text-center text-[8px] font-semibold leading-[1.2] text-sky-100/90 ${
              node.label.includes('\n') ? 'whitespace-pre-line' : ''
            }`}
          >
            {node.label}
          </p>
        </div>
      </foreignObject>
    </motion.g>
  )
}

const KEY_HOVER_BUFFER_MS = 1000
const legendEase = 'cubic-bezier(0.22, 1, 0.36, 1)'

function FlowKeyLegend({
  reduceMotion,
  viewW,
}: {
  reduceMotion: boolean | null
  viewW: number
}) {
  const [expanded, setExpanded] = useState(false)
  const openTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const showExpanded = Boolean(reduceMotion || expanded)

  useEffect(() => {
    return () => {
      if (openTimerRef.current) clearTimeout(openTimerRef.current)
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current)
    }
  }, [])

  const clearOpenTimer = () => {
    if (openTimerRef.current) {
      clearTimeout(openTimerRef.current)
      openTimerRef.current = null
    }
  }

  const clearCloseTimer = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current)
      closeTimerRef.current = null
    }
  }

  const handleEnter = () => {
    if (reduceMotion) {
      setExpanded(true)
      return
    }
    clearCloseTimer()
    if (expanded) return
    openTimerRef.current = setTimeout(() => setExpanded(true), KEY_HOVER_BUFFER_MS)
  }

  const handleLeave = () => {
    if (reduceMotion) {
      setExpanded(false)
      return
    }
    clearOpenTimer()
    closeTimerRef.current = setTimeout(() => setExpanded(false), KEY_HOVER_BUFFER_MS)
  }

  const legendMargin = 8
  const expandedW = 192
  const expandedH = 168
  const legendX = Math.max(legendMargin, viewW - expandedW - legendMargin)
  const transitionMs = reduceMotion ? 0 : 480

  return (
    <foreignObject
      x={legendX}
      y={28}
      width={expandedW}
      height={expandedH}
      className="overflow-visible"
    >
      <div className="flex justify-end" onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
        <div
          className={`cursor-default overflow-hidden bg-[#1a1a26] ring-1 ring-white/[0.08] ${
            showExpanded ? 'shadow-lg shadow-black/30' : ''
          }`}
          style={{
            width: showExpanded ? '12rem' : '2.125rem',
            borderRadius: showExpanded ? '0.75rem' : '0.375rem',
            transition: reduceMotion
              ? 'none'
              : `width ${transitionMs}ms ${legendEase}, border-radius ${transitionMs}ms ${legendEase}, box-shadow ${transitionMs}ms ${legendEase}`,
          }}
        >
          <div
            className={`whitespace-nowrap font-bold uppercase tracking-[0.14em] transition-[padding,font-size,color] duration-500 ${
              showExpanded ? 'px-3 py-1.5 text-[10px] text-ink' : 'px-1.5 py-px text-[8px] text-slate'
            }`}
            style={{ transitionTimingFunction: legendEase }}
          >
            Key
          </div>
          <div
            className="overflow-hidden border-white/[0.06] transition-[max-height,opacity,border-top-width,padding] duration-500"
            style={{
              maxHeight: showExpanded ? '9.75rem' : '0',
              opacity: showExpanded ? 1 : 0,
              borderTopWidth: showExpanded ? 1 : 0,
              padding: showExpanded ? '0.625rem 0.75rem 0.75rem' : '0 0.75rem',
              transitionTimingFunction: legendEase,
            }}
            aria-hidden={!showExpanded}
          >
            <div className="space-y-2.5">
              <div className="flex items-center gap-2.5">
                <span
                  className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md ring-1"
                  style={{
                    backgroundColor: FLOW_NODE_COLORS.action.fill,
                    boxShadow: `inset 0 0 0 1px ${FLOW_NODE_COLORS.action.stroke}`,
                  }}
                />
                <div>
                  <p className="text-[9px] font-semibold text-ink">Action</p>
                  <p className="text-[8px] leading-snug text-slate/70">Screens, forms, and tasks</p>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <span
                  className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full ring-1"
                  style={{
                    backgroundColor: FLOW_NODE_COLORS.state.fill,
                    boxShadow: `inset 0 0 0 1px ${FLOW_NODE_COLORS.state.stroke}`,
                  }}
                />
                <div>
                  <p className="text-[9px] font-semibold text-ink">States</p>
                  <p className="text-[8px] leading-snug text-slate/70">Entry points and landing pages</p>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center">
                  <span
                    className="inline-flex h-3 w-3 rotate-45 items-center justify-center rounded-[2px] ring-1"
                    style={{
                      backgroundColor: FLOW_NODE_COLORS.decision.fill,
                      boxShadow: `inset 0 0 0 1px ${FLOW_NODE_COLORS.decision.stroke}`,
                    }}
                  />
                </span>
                <div>
                  <p className="text-[9px] font-semibold text-ink">Questions</p>
                  <p className="text-[8px] leading-snug text-slate/70">Decision branches and intents</p>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center">
                  <svg viewBox="0 0 20 20" className="h-4 w-4" aria-hidden>
                    <polygon
                      points="10,2 17.3,6 17.3,14 10,18 2.7,14 2.7,6"
                      fill={FLOW_NODE_COLORS.milestone.fill}
                      stroke={FLOW_NODE_COLORS.milestone.stroke}
                      strokeWidth="1.25"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <div>
                  <p className="text-[9px] font-semibold text-ink">Milestones</p>
                  <p className="text-[8px] leading-snug text-slate/70">Start points and confirmations</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </foreignObject>
  )
}

function SectionPill({ section }: { section: CoplanFlowSection }) {
  const width = section.w ?? 200
  const isBottom = section.id === 'onboarding'

  return (
    <g>
      <rect
        x={section.x}
        y={isBottom ? section.y - 26 : section.y - 4}
        width={width}
        height={24}
        rx={6}
        fill="rgba(153,112,255,0.14)"
        stroke="rgba(153,112,255,0.38)"
        strokeWidth="1"
      />
      <text
        x={section.x + width / 2}
        y={isBottom ? section.y - 9 : section.y + 13}
        textAnchor="middle"
        className="fill-accent text-[10px] font-bold uppercase tracking-[0.12em]"
      >
        {section.label}
      </text>
    </g>
  )
}

export function CoplanUserFlowReveal({
  data,
  className = '',
  viewW = DEFAULT_VIEW_W,
  viewH = DEFAULT_VIEW_H,
  ariaLabel = 'User flow diagram',
}: CoplanUserFlowRevealProps) {
  const reduceMotion = useReducedMotion()
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: '-60px' })
  const animateIn = Boolean(reduceMotion || isInView)
  const nodeMap = new Map(data.nodes.map((node) => [node.id, node]))
  const revealIndex = new Map(data.revealOrder.map((id, index) => [id, index]))

  const boundsMap = useMemo(
    () => new Map(data.nodes.map((node) => [node.id, getNodeBounds(node)])),
    [data.nodes],
  )

  const sortedEdges = useMemo(
    () =>
      [...data.edges].sort((a, b) => {
        const aFrom = revealIndex.get(a.from) ?? 0
        const bFrom = revealIndex.get(b.from) ?? 0
        if (aFrom !== bFrom) return aFrom - bFrom
        return (revealIndex.get(a.to) ?? 0) - (revealIndex.get(b.to) ?? 0)
      }),
    [data.edges, revealIndex],
  )

  return (
    <div
      ref={containerRef}
      className={`mt-6 overflow-hidden rounded-3xl bg-[#141418] ring-1 ring-white/[0.08] ${className}`}
      aria-label={ariaLabel}
    >
      <div className="overflow-x-auto p-4 sm:p-6">
        <svg
          viewBox={`0 0 ${viewW} ${viewH}`}
          className="mx-auto min-w-[920px] w-full"
          role="img"
        >
          {data.sections.map((section) => (
            <SectionPill key={section.id} section={section} />
          ))}

          {sortedEdges.map((edge) => {
            const from = nodeMap.get(edge.from)
            const to = nodeMap.get(edge.to)
            const fromBounds = boundsMap.get(edge.from)
            const toBounds = boundsMap.get(edge.to)
            if (!from || !to || !fromBounds || !toBounds) return null

            const path = appendStrokeArrowhead(
              buildEdgePath(from, to, fromBounds, toBounds, edge),
            )
            const labelPos = edgeLabelPosition(edge, fromBounds, toBounds)
            const { delay: edgeDelay, duration: edgeDuration } = edgeRevealTiming(
              edge,
              revealIndex,
            )
            const pathMotion = reduceMotion
              ? {}
              : {
                  initial: { pathLength: 0 },
                  animate: animateIn ? { pathLength: 1 } : { pathLength: 0 },
                  transition: { duration: edgeDuration, delay: edgeDelay, ease: flowEase },
                }

            return (
              <g key={`${edge.from}-${edge.to}`}>
                <motion.path
                  d={path}
                  fill="none"
                  stroke="rgba(153,112,255,0.14)"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  {...pathMotion}
                />
                <motion.path
                  d={path}
                  fill="none"
                  stroke="rgba(153,112,255,0.42)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  {...pathMotion}
                />
                {labelPos && edge.label && (
                  <motion.text
                    x={labelPos.x}
                    y={labelPos.y}
                    textAnchor="middle"
                    dominantBaseline={
                      edge.label === 'No' ||
                      edge.label === 'Yes' ||
                      edge.label === 'Drop' ||
                      edge.label === 'Add' ||
                      edge.label === 'Edit'
                        ? 'central'
                        : 'auto'
                    }
                    className="fill-slate text-[9px] font-semibold"
                    initial={reduceMotion ? false : { opacity: 0, scale: 0.92 }}
                    animate={
                      animateIn ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.92 }
                    }
                    transition={{
                      duration: 0.32,
                      delay: reduceMotion ? 0 : edgeDelay + edgeDuration * 0.78,
                      ease: flowEase,
                    }}
                  >
                    {edge.label}
                  </motion.text>
                )}
              </g>
            )
          })}

          {data.nodes.map((node) => {
            const idx = revealIndex.get(node.id) ?? 0
            return (
              <FlowNodeShape
                key={node.id}
                node={node}
                animateIn={animateIn}
                reduceMotion={reduceMotion}
                index={idx}
              />
            )
          })}

          <FlowKeyLegend reduceMotion={reduceMotion} viewW={viewW} />
        </svg>
      </div>
    </div>
  )
}
