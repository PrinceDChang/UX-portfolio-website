import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'

const flowEase = [0.22, 1, 0.36, 1] as const
const ANIM_SPEED = 1.25
const NODE_STAGGER = 0.14 / ANIM_SPEED
const NODE_DURATION = 0.42 / ANIM_SPEED
const LINE_DURATION = 0.55 / ANIM_SPEED
const HUB_DURATION = 0.6 / ANIM_SPEED

const CX = 200
const CY = 160
const SPOKE_R = 92
const CHIP_H = 24
const CHIP_PAD_X = 12
const CHIP_CHAR_W = 6.8
const HUB_HALF_W = 48
const HUB_HALF_H = 18
const VIEW_PAD = 8

export interface SageIntegrationAspect {
  label: string
  angle: number
}

export interface SageIntegrationHubData {
  title: string
  subtitle: string
  hubLabel: string
  aspects: readonly SageIntegrationAspect[]
}

interface SageIntegrationHubProps {
  data: SageIntegrationHubData
  className?: string
}

function chipWidth(label: string) {
  return label.length * CHIP_CHAR_W + CHIP_PAD_X * 2
}

function polar(angleDeg: number, radius: number) {
  const rad = (angleDeg * Math.PI) / 180
  return {
    x: CX + radius * Math.cos(rad),
    y: CY + radius * Math.sin(rad),
  }
}

function hubEdgeFromSpoke(lineEnd: { x: number; y: number }) {
  const dx = CX - lineEnd.x
  const dy = CY - lineEnd.y
  const len = Math.hypot(dx, dy) || 1
  const scale = Math.min(
    HUB_HALF_W / Math.abs(dx || 0.001),
    HUB_HALF_H / Math.abs(dy || 0.001),
  )
  return {
    x: CX - (dx / len) * Math.min(len, scale * len),
    y: CY - (dy / len) * Math.min(len, scale * len),
  }
}

function computeViewBox(aspects: readonly SageIntegrationAspect[]) {
  let minX = CX - HUB_HALF_W
  let maxX = CX + HUB_HALF_W
  let minY = CY - HUB_HALF_H
  let maxY = CY + HUB_HALF_H

  const include = (x: number, y: number) => {
    minX = Math.min(minX, x)
    maxX = Math.max(maxX, x)
    minY = Math.min(minY, y)
    maxY = Math.max(maxY, y)
  }

  for (const aspect of aspects) {
    const { cx, cy, chipW, chipH, lineEnd } = aspectGeometry(aspect.label, aspect.angle)
    include(lineEnd.x, lineEnd.y)
    include(cx - chipW / 2, cy - chipH / 2)
    include(cx + chipW / 2, cy + chipH / 2)
  }

  return {
    x: minX - VIEW_PAD,
    y: minY - VIEW_PAD,
    w: maxX - minX + VIEW_PAD * 2,
    h: maxY - minY + VIEW_PAD * 2,
  }
}

function aspectGeometry(label: string, angle: number) {
  const rad = (angle * Math.PI) / 180
  const ux = Math.cos(rad)
  const uy = Math.sin(rad)
  const chipW = chipWidth(label)
  const innerDist = Math.abs(ux) * (chipW / 2) + Math.abs(uy) * (CHIP_H / 2)
  const lineEnd = polar(angle, SPOKE_R)
  const hubEdge = hubEdgeFromSpoke(lineEnd)

  return {
    lineEnd,
    hubEdge,
    cx: lineEnd.x + ux * innerDist,
    cy: lineEnd.y + uy * innerDist,
    chipW,
    chipH: CHIP_H,
  }
}

const nodeVariants = {
  hidden: { opacity: 0, scale: 0.82 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: NODE_DURATION, ease: flowEase },
  },
}

export function SageIntegrationHub({ data, className = '' }: SageIntegrationHubProps) {
  const reduceMotion = useReducedMotion()
  const animate = !reduceMotion
  const diagramRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(diagramRef, { once: true, margin: '-40px' })
  const nodeCount = data.aspects.length
  const linesStartDelay = NODE_STAGGER * nodeCount + NODE_DURATION * 0.35
  const hubDelay = linesStartDelay + LINE_DURATION * 0.55
  const viewBox = computeViewBox(data.aspects)

  return (
    <div
      className={`overflow-hidden rounded-3xl bg-[#141418] ring-1 ring-white/[0.08] ${className}`}
    >
      <div className="border-b border-white/[0.06] px-5 py-4 text-center md:px-6 md:py-5">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">
          Unified platform
        </p>
        <h3 className="mt-1.5 font-display text-lg uppercase leading-tight tracking-wide text-ink md:text-xl">
          {data.title}
        </h3>
        <p className="mx-auto mt-1.5 max-w-xl text-sm leading-relaxed text-slate">
          {data.subtitle}
        </p>
      </div>

      <div
        ref={diagramRef}
        className="relative mx-auto w-full max-w-md px-3 py-4 md:px-5 md:py-5"
        style={{ aspectRatio: `${viewBox.w} / ${viewBox.h}` }}
      >
        <svg
          viewBox={`${viewBox.x} ${viewBox.y} ${viewBox.w} ${viewBox.h}`}
          className="h-full w-full"
          role="img"
          aria-label={`Integration diagram: ${data.aspects.map((a) => a.label).join(', ')} connect to ${data.hubLabel}`}
        >
          <defs>
            <linearGradient id="sage-hub-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#b794ff" />
              <stop offset="55%" stopColor="#9970ff" />
              <stop offset="100%" stopColor="#6b46c1" />
            </linearGradient>
            <radialGradient id="sage-hub-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#9970ff" stopOpacity="0.32" />
              <stop offset="100%" stopColor="#9970ff" stopOpacity="0" />
            </radialGradient>
          </defs>

          {animate && (
            <motion.ellipse
              cx={CX}
              cy={CY}
              rx={72}
              ry={40}
              fill="url(#sage-hub-glow)"
              initial={{ opacity: 0, scale: 0.6 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: HUB_DURATION, delay: hubDelay, ease: flowEase }}
            />
          )}

          {data.aspects.map((aspect, index) => {
            const { lineEnd, hubEdge } = aspectGeometry(aspect.label, aspect.angle)
            const lineDelay = linesStartDelay + index * (NODE_STAGGER * 0.35)
            return (
              <g key={aspect.label}>
                <motion.path
                  d={`M ${lineEnd.x} ${lineEnd.y} L ${hubEdge.x} ${hubEdge.y}`}
                  fill="none"
                  stroke="rgba(153,112,255,0.35)"
                  strokeWidth="1.5"
                  strokeDasharray="5 5"
                  strokeLinecap="round"
                  initial={animate ? { pathLength: 0, opacity: 0 } : false}
                  whileInView={animate ? { pathLength: 1, opacity: 1 } : undefined}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{
                    duration: LINE_DURATION,
                    delay: lineDelay,
                    ease: flowEase,
                  }}
                />
                {animate && isInView && (
                  <motion.circle
                    r="3"
                    fill="#9970ff"
                    initial={{ cx: lineEnd.x, cy: lineEnd.y, opacity: 0 }}
                    animate={{
                      cx: [lineEnd.x, hubEdge.x, hubEdge.x],
                      cy: [lineEnd.y, hubEdge.y, hubEdge.y],
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 1.1 / ANIM_SPEED,
                      delay: lineDelay + LINE_DURATION * 0.15,
                      ease: 'easeInOut',
                      repeat: Infinity,
                      repeatDelay: 2.4 / ANIM_SPEED,
                    }}
                  />
                )}
              </g>
            )
          })}

          {data.aspects.map((aspect, index) => {
            const { cx, cy, chipW, chipH } = aspectGeometry(aspect.label, aspect.angle)
            return (
              <motion.g
                key={`node-${aspect.label}`}
                initial={animate ? 'hidden' : false}
                whileInView={animate ? 'visible' : undefined}
                viewport={{ once: true, margin: '-40px' }}
                variants={nodeVariants}
                transition={{ delay: index * NODE_STAGGER }}
                style={{ transformOrigin: `${cx}px ${cy}px` }}
              >
                <rect
                  x={cx - chipW / 2}
                  y={cy - chipH / 2}
                  width={chipW}
                  height={chipH}
                  rx={8}
                  fill="#1a1a26"
                  stroke="rgba(255,255,255,0.1)"
                  strokeWidth="1"
                />
                <text
                  x={cx}
                  y={cy + 3.5}
                  textAnchor="middle"
                  fill="#f4f4f6"
                  fontSize="11"
                  fontWeight="600"
                  letterSpacing="0.02em"
                  style={{ fontFamily: 'inherit' }}
                >
                  {aspect.label}
                </text>
              </motion.g>
            )
          })}

          <motion.g
            initial={animate ? { opacity: 0, scale: 0.82 } : false}
            whileInView={animate ? { opacity: 1, scale: 1 } : undefined}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: HUB_DURATION, delay: hubDelay, ease: flowEase }}
            style={{ transformOrigin: `${CX}px ${CY}px` }}
          >
            <rect
              x={CX - HUB_HALF_W}
              y={CY - HUB_HALF_H}
              width={HUB_HALF_W * 2}
              height={HUB_HALF_H * 2}
              rx={10}
              fill="url(#sage-hub-gradient)"
            />
            <text
              x={CX}
              y={CY + 5}
              textAnchor="middle"
              fill="#ffffff"
              fontSize="15"
              fontWeight="700"
              letterSpacing="0.08em"
              style={{ fontFamily: 'inherit' }}
            >
              {data.hubLabel}
            </text>
          </motion.g>
        </svg>
      </div>
    </div>
  )
}
