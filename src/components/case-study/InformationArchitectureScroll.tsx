import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import {
  animate,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from 'framer-motion'

export interface InformationArchitectureSection {
  label: string
  items: readonly string[]
}

interface InformationArchitectureScrollProps {
  title?: string
  description?: string
  rootLabel?: string
  sections: readonly InformationArchitectureSection[]
  className?: string
}

interface Point {
  x: number
  y: number
}

interface LeafSlot {
  colIndex: number
  itemIndex: number
}

interface MeasuredPaths {
  trunkStem: string
  trunkBusLeft: string
  trunkBusRight: string
  /** Center → each section column on the bus (pulse split). */
  sectionBusArms: string[]
  sectionDrops: string[]
  /** Bus → section tab → leaves, one continuous path per column. */
  columnPaths: string[]
  leafSegments: { d: string; revealIndex: number }[]
}

/** Reveal row-by-row across columns (top row first, then next row, etc.). */
function buildLeafRevealOrder(
  sections: readonly InformationArchitectureSection[],
): LeafSlot[] {
  const maxRows = Math.max(0, ...sections.map((section) => section.items.length))
  const order: LeafSlot[] = []

  for (let row = 0; row < maxRows; row++) {
    for (let colIndex = 0; colIndex < sections.length; colIndex++) {
      if (row < sections[colIndex]!.items.length) {
        order.push({ colIndex, itemIndex: row })
      }
    }
  }

  return order
}

function buildLeafRevealWaves(sections: readonly InformationArchitectureSection[]): number[] {
  const maxRows = Math.max(0, ...sections.map((section) => section.items.length))
  let cumulative = 0
  const waves: number[] = []

  for (let row = 0; row < maxRows; row++) {
    for (let colIndex = 0; colIndex < sections.length; colIndex++) {
      if (row < sections[colIndex]!.items.length) cumulative += 1
    }
    waves.push(cumulative)
  }

  return waves
}

function getLeafRevealIndex(
  order: LeafSlot[],
  colIndex: number,
  itemIndex: number,
): number {
  return order.findIndex(
    (slot) => slot.colIndex === colIndex && slot.itemIndex === itemIndex,
  )
}

function revealedCountForLeafProgress(leafProgress: number, waves: number[]): number {
  if (leafProgress <= 0 || waves.length === 0) return 0

  for (let i = 0; i < waves.length; i++) {
    const threshold = (i + 1) / waves.length
    if (leafProgress < threshold) return waves[i]!
  }

  return waves[waves.length - 1]!
}

const LEAF_START = 0.4
const STROKE = '#9970FF'
/** Scroll thresholds (0–1 through sticky IA block) for connector draw phases. */
const STEM_SCROLL_START = 0.1
const STEM_SCROLL_END = 0.22
const BUS_SCROLL_START = 0.22
const BUS_SCROLL_END = 0.34
const DROP_SCROLL_START = 0.34
const DROP_SCROLL_END = 0.4
const SECTIONS_VISIBLE_START = 0.34
const SECTIONS_VISIBLE_END = 0.4
const STEM_PULSE_LOOP_S = 1.5
const BUS_PULSE_LOOP_S = 1.2
const COLUMNS_PULSE_LOOP_S = 2.4

type PulseLoopPhase = 'stem' | 'bus' | 'columns'

function anchorBottomCenter(el: HTMLElement, container: DOMRect): Point {
  const rect = el.getBoundingClientRect()
  return {
    x: rect.left - container.left + rect.width / 2,
    y: rect.bottom - container.top,
  }
}

function anchorTopCenter(el: HTMLElement, container: DOMRect): Point {
  const rect = el.getBoundingClientRect()
  return {
    x: rect.left - container.left + rect.width / 2,
    y: rect.top - container.top,
  }
}

function pathVertical(from: Point, to: Point): string {
  return `M ${from.x} ${from.y} L ${to.x} ${to.y}`
}

function pathFromPoints(points: Point[]): string {
  if (points.length < 2) return ''
  return points
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`)
    .join(' ')
}

function pathLength(d: string): number {
  if (!d) return 0
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
  path.setAttribute('d', d)
  return path.getTotalLength()
}

function getPointOnPath(d: string, t: number): Point | null {
  if (typeof document === 'undefined' || !d) return null
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
  path.setAttribute('d', d)
  const length = path.getTotalLength()
  if (!length) return null
  const clamped = Math.min(1, Math.max(0, t))
  const at = path.getPointAtLength(length * clamped)
  return { x: at.x, y: at.y }
}

function PulseMarker({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <motion.circle
        cx={x}
        cy={y}
        fill={STROKE}
        animate={{ r: [5, 9, 5], opacity: [0.45, 0.15, 0.45] }}
        transition={{ duration: 1.1, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.circle
        cx={x}
        cy={y}
        r={3.5}
        fill="#f4f4f5"
        animate={{ scale: [1, 1.2, 1], opacity: [1, 0.85, 1] }}
        transition={{ duration: 1.1, repeat: Infinity, ease: 'easeInOut' }}
      />
    </g>
  )
}

function scrollSegmentProgress(
  scroll: number,
  start: number,
  end: number,
  reduceMotion: boolean | null,
): number {
  if (reduceMotion) return 1
  if (scroll <= start) return 0
  if (scroll >= end) return 1
  return (scroll - start) / (end - start)
}

function buildPaths(
  rootEl: HTMLElement,
  sectionEls: HTMLElement[],
  leafElsByColumn: HTMLElement[][],
  leafRevealOrder: LeafSlot[],
  containerRect: DOMRect,
): MeasuredPaths {
  const rootBottom = anchorBottomCenter(rootEl, containerRect)
  const sectionTops = sectionEls.map((el) => anchorTopCenter(el, containerRect))

  const busY =
    rootBottom.y +
    Math.max(20, (sectionTops[0]?.y ?? rootBottom.y + 40) - rootBottom.y) * 0.55

  const trunkStem = `M ${rootBottom.x} ${rootBottom.y} L ${rootBottom.x} ${busY}`
  const centerX = rootBottom.x
  const leftX = sectionTops[0]?.x ?? centerX
  const rightX = sectionTops[sectionTops.length - 1]?.x ?? centerX
  const trunkBusLeft =
    sectionTops.length > 0 ? `M ${centerX} ${busY} L ${leftX} ${busY}` : ''
  const trunkBusRight =
    sectionTops.length > 0 ? `M ${centerX} ${busY} L ${rightX} ${busY}` : ''

  const sectionBusArms = sectionTops.map(
    (top) => `M ${centerX} ${busY} L ${top.x} ${busY}`,
  )
  const sectionDrops = sectionTops.map((top) => pathVertical({ x: top.x, y: busY }, top))

  const columnPaths = sectionEls.map((sectionEl, colIndex) => {
    const top = sectionTops[colIndex]!
    const bottom = anchorBottomCenter(sectionEl, containerRect)
    const leaves = leafElsByColumn[colIndex] ?? []
    const points: Point[] = [{ x: top.x, y: busY }, top, bottom]

    leaves.forEach((leafEl, leafIndex) => {
      points.push(anchorTopCenter(leafEl, containerRect))
      if (leafIndex < leaves.length - 1) {
        points.push(anchorBottomCenter(leafEl, containerRect))
      }
    })

    return pathFromPoints(points)
  })

  const leafSegments: MeasuredPaths['leafSegments'] = []
  sectionEls.forEach((sectionEl, colIndex) => {
    const leaves = leafElsByColumn[colIndex] ?? []
    const sectionBottom = anchorBottomCenter(sectionEl, containerRect)

    leaves.forEach((leafEl, leafIndexInColumn) => {
      const leafTop = anchorTopCenter(leafEl, containerRect)
      const from =
        leafIndexInColumn === 0
          ? sectionBottom
          : anchorBottomCenter(leaves[leafIndexInColumn - 1]!, containerRect)
      const revealIndex = getLeafRevealIndex(
        leafRevealOrder,
        colIndex,
        leafIndexInColumn,
      )
      leafSegments.push({
        d: pathVertical(from, leafTop),
        revealIndex,
      })
    })
  })

  return {
    trunkStem,
    trunkBusLeft,
    trunkBusRight,
    sectionBusArms,
    sectionDrops,
    columnPaths,
    leafSegments,
  }
}

/** Same scroll fraction for every column so all four pulses move in lockstep. */
function columnPulseTUnified(
  colIndex: number,
  paths: MeasuredPaths,
  sectionDropProgress: number,
  unifiedLeafT: number,
): number {
  const columnPath = paths.columnPaths[colIndex]
  const dropPath = paths.sectionDrops[colIndex]
  if (!columnPath || !dropPath) return 0

  const totalLen = pathLength(columnPath)
  const dropLen = pathLength(dropPath)
  if (!totalLen) return 0

  const dropEndT = dropLen / totalLen

  if (sectionDropProgress < 1) {
    return sectionDropProgress * dropEndT
  }

  return dropEndT + (1 - dropEndT) * unifiedLeafT
}

function AnimatedConnector({ d, progress }: { d: string; progress: number }) {
  const clamped = Math.min(1, Math.max(0, progress))

  return (
    <motion.path
      d={d}
      fill="none"
      stroke={STROKE}
      strokeWidth={2.25}
      strokeLinecap="round"
      strokeLinejoin="round"
      vectorEffect="non-scaling-stroke"
      opacity={0.72}
      initial={{ pathLength: 0 }}
      animate={{ pathLength: clamped }}
      transition={{ duration: 0 }}
    />
  )
}

export function InformationArchitectureScroll({
  title = 'Information architecture',
  description,
  rootLabel = 'Homepage',
  sections,
  className = '',
}: InformationArchitectureScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const diagramRef = useRef<HTMLDivElement>(null)
  const rootRef = useRef<HTMLDivElement>(null)
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([])
  const leafRefs = useRef<(HTMLDivElement | null)[][]>([])

  const reduceMotion = useReducedMotion()
  const totalLeaves = useMemo(
    () => sections.reduce((count, section) => count + section.items.length, 0),
    [sections],
  )
  const leafRevealOrder = useMemo(() => buildLeafRevealOrder(sections), [sections])
  const leafRevealWaves = useMemo(() => buildLeafRevealWaves(sections), [sections])

  const [visibleLayers, setVisibleLayers] = useState(reduceMotion ? 2 : 1)
  const [revealedLeafCount, setRevealedLeafCount] = useState(
    reduceMotion ? totalLeaves : 0,
  )
  const [scrollProgress, setScrollProgress] = useState(reduceMotion ? 1 : 0)
  const [paths, setPaths] = useState<MeasuredPaths | null>(null)
  const [svgSize, setSvgSize] = useState({ width: 0, height: 0 })
  const [loopPhase, setLoopPhase] = useState<PulseLoopPhase>('stem')
  const [loopT, setLoopT] = useState(0)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  const measurePaths = useCallback(() => {
    const diagram = diagramRef.current
    const root = rootRef.current
    if (!diagram || !root) return

    const containerRect = diagram.getBoundingClientRect()
    if (containerRect.width === 0) return

    const sectionEls = sectionRefs.current.filter(Boolean) as HTMLElement[]

    const leafElsByColumn = sections.map((section, colIndex) => {
      const columnLeaves: HTMLElement[] = []
      section.items.forEach((_, itemIndex) => {
        const revealIndex = getLeafRevealIndex(leafRevealOrder, colIndex, itemIndex)
        if (revealIndex >= 0 && revealIndex < revealedLeafCount) {
          const el = leafRefs.current[colIndex]?.[itemIndex]
          if (el) columnLeaves.push(el)
        }
      })
      return columnLeaves
    })

    setSvgSize({ width: containerRect.width, height: containerRect.height })
    setPaths(
      buildPaths(root, sectionEls, leafElsByColumn, leafRevealOrder, containerRect),
    )
  }, [sections, revealedLeafCount, visibleLayers, leafRevealOrder])

  useLayoutEffect(() => {
    measurePaths()
    const diagram = diagramRef.current
    if (!diagram) return

    const observer = new ResizeObserver(() => measurePaths())
    observer.observe(diagram)
    window.addEventListener('resize', measurePaths)
    return () => {
      observer.disconnect()
      window.removeEventListener('resize', measurePaths)
    }
  }, [measurePaths])

  useMotionValueEvent(scrollYProgress, 'change', (progress) => {
    setScrollProgress(progress)

    if (reduceMotion) {
      setVisibleLayers(2)
      setRevealedLeafCount(totalLeaves)
      return
    }

    if (progress < STEM_SCROLL_START) {
      setVisibleLayers(1)
      setRevealedLeafCount(0)
      return
    }

    if (progress < LEAF_START) {
      setVisibleLayers(2)
      setRevealedLeafCount(0)
      return
    }

    setVisibleLayers(2)
    const leafProgress = (progress - LEAF_START) / (1 - LEAF_START)
    setRevealedLeafCount(revealedCountForLeafProgress(leafProgress, leafRevealWaves))
  })

  const allLeavesRevealed = revealedLeafCount >= totalLeaves

  useLayoutEffect(() => {
    const frame = requestAnimationFrame(measurePaths)
    return () => cancelAnimationFrame(frame)
  }, [revealedLeafCount, visibleLayers, measurePaths])

  /** Strict sequence: stem ↓ → bus ←|→ from center → drops ↓ to tabs. */
  const trunkStemProgress = scrollSegmentProgress(
    scrollProgress,
    STEM_SCROLL_START,
    STEM_SCROLL_END,
    reduceMotion,
  )
  const trunkBusProgress = scrollSegmentProgress(
    scrollProgress,
    BUS_SCROLL_START,
    BUS_SCROLL_END,
    reduceMotion,
  )
  const sectionDropProgress = scrollSegmentProgress(
    scrollProgress,
    DROP_SCROLL_START,
    DROP_SCROLL_END,
    reduceMotion,
  )
  const sectionTabOpacity = scrollSegmentProgress(
    scrollProgress,
    SECTIONS_VISIBLE_START,
    SECTIONS_VISIBLE_END,
    reduceMotion,
  )
  const leafSegmentProgress = (revealIndex: number) => {
    if (reduceMotion) return 1
    if (revealedLeafCount <= revealIndex) return 0

    const waveIndex = leafRevealWaves.findIndex((count) => count > revealIndex)
    const waveStart =
      waveIndex === 0 ? LEAF_START : LEAF_START + (waveIndex / leafRevealWaves.length) * (1 - LEAF_START)
    const waveEnd =
      LEAF_START + ((waveIndex + 1) / leafRevealWaves.length) * (1 - LEAF_START)

    if (scrollProgress <= waveStart) return 0
    if (scrollProgress >= waveEnd) return 1
    return (scrollProgress - waveStart) / (waveEnd - waveStart)
  }

  const isLeafSlotRevealed = (colIndex: number, itemIndex: number) => {
    const revealIndex = getLeafRevealIndex(leafRevealOrder, colIndex, itemIndex)
    return revealIndex >= 0 && revealIndex < revealedLeafCount
  }

  const loopEnabled =
    !reduceMotion &&
    trunkStemProgress >= 1 &&
    trunkBusProgress >= 1 &&
    sectionDropProgress >= 1

  useEffect(() => {
    if (!loopEnabled) {
      setLoopPhase('stem')
      setLoopT(0)
      return
    }

    setLoopT(0)
    const duration =
      loopPhase === 'stem'
        ? STEM_PULSE_LOOP_S
        : loopPhase === 'bus'
          ? BUS_PULSE_LOOP_S
          : COLUMNS_PULSE_LOOP_S
    const controls = animate(0, 1, {
      duration,
      ease: 'linear',
      onUpdate: (value) => setLoopT(value),
      onComplete: () => {
        setLoopPhase((phase) => {
          if (phase === 'stem') return 'bus'
          if (phase === 'bus') return 'columns'
          return 'stem'
        })
        setLoopT(0)
      },
    })

    return () => controls.stop()
  }, [loopEnabled, loopPhase])

  const stemPulseT = loopEnabled && loopPhase === 'stem' ? loopT : trunkStemProgress
  const busPulseT = loopEnabled && loopPhase === 'bus' ? loopT : trunkBusProgress

  const unifiedLeafT = useMemo(() => {
    if (reduceMotion) return 1
    if (scrollProgress < LEAF_START) return 0
    return Math.min(1, (scrollProgress - LEAF_START) / (1 - LEAF_START))
  }, [scrollProgress, reduceMotion])

  const columnPulseTForColumn = (colIndex: number) => {
    if (loopEnabled && loopPhase === 'columns') return loopT
    if (!paths) return 0
    return columnPulseTUnified(
      colIndex,
      paths,
      sectionDropProgress,
      unifiedLeafT,
    )
  }

  const showStemPulse =
    !reduceMotion &&
    paths &&
    stemPulseT > 0.02 &&
    (loopEnabled ? loopPhase === 'stem' : trunkStemProgress < 1)

  const showBusPulses =
    !reduceMotion &&
    paths &&
    busPulseT > 0.02 &&
    (loopEnabled
      ? loopPhase === 'bus'
      : trunkStemProgress >= 1 &&
        sectionDropProgress <= 0 &&
        trunkBusProgress > 0.02)

  const showColumnPulses =
    !reduceMotion &&
    paths &&
    (loopEnabled
      ? loopPhase === 'columns'
      : trunkStemProgress >= 1 &&
        trunkBusProgress >= 1 &&
        sectionDropProgress > 0.02)

  const stemPulsePoint =
    showStemPulse && paths ? getPointOnPath(paths.trunkStem, stemPulseT) : null

  return (
    <div className={`mt-12 md:mt-16 ${className}`}>
      <h3 className="font-display text-xl uppercase tracking-wide text-ink md:text-2xl">
        {title}
      </h3>
      {description && (
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate md:text-lg">
          {description}
        </p>
      )}

      <div
        ref={containerRef}
        className="relative mt-8"
        style={{ height: reduceMotion ? 'auto' : 'min(260vh, 1500px)' }}
      >
        <div
          className={
            reduceMotion
              ? 'relative'
              : 'sticky top-24 flex min-h-[min(72vh,560px)] items-center md:top-28'
          }
        >
          <div className="w-full px-2 py-4 md:px-4 md:py-6">
            <div
              ref={diagramRef}
              className="relative mx-auto max-w-4xl px-2 py-4 md:px-4 md:py-6"
            >
              {paths && svgSize.width > 0 && (
                <svg
                  className="pointer-events-none absolute inset-0 z-0 overflow-visible"
                  width={svgSize.width}
                  height={svgSize.height}
                  aria-hidden
                >
                  <AnimatedConnector d={paths.trunkStem} progress={trunkStemProgress} />
                  {paths.trunkBusLeft && (
                    <AnimatedConnector d={paths.trunkBusLeft} progress={trunkBusProgress} />
                  )}
                  {paths.trunkBusRight && (
                    <AnimatedConnector d={paths.trunkBusRight} progress={trunkBusProgress} />
                  )}
                  {paths.sectionDrops.map((d, index) => (
                    <AnimatedConnector
                      key={`section-drop-${index}`}
                      d={d}
                      progress={sectionDropProgress}
                    />
                  ))}
                  {paths.leafSegments.map((segment, index) => (
                    <AnimatedConnector
                      key={`leaf-segment-${index}`}
                      progress={leafSegmentProgress(segment.revealIndex)}
                      d={segment.d}
                    />
                  ))}
                  {stemPulsePoint && <PulseMarker x={stemPulsePoint.x} y={stemPulsePoint.y} />}
                  {showBusPulses &&
                    paths.sectionBusArms.map((d, index) => {
                      const point = getPointOnPath(d, busPulseT)
                      return point ? (
                        <PulseMarker key={`bus-pulse-${index}`} x={point.x} y={point.y} />
                      ) : null
                    })}
                  {showColumnPulses &&
                    paths.columnPaths.map((d, index) => {
                      const t = columnPulseTForColumn(index)
                      if (t <= 0.02) return null
                      const point = getPointOnPath(d, t)
                      return point ? (
                        <PulseMarker key={`column-pulse-${index}`} x={point.x} y={point.y} />
                      ) : null
                    })}
                </svg>
              )}

              {/* Layer 1 — root */}
              <motion.div
                className="relative z-10 flex justify-center"
                initial={false}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <div ref={rootRef} className="w-full max-w-[11rem] md:max-w-[12.5rem]">
                  <PrimaryNode>{rootLabel}</PrimaryNode>
                </div>
              </motion.div>

              <div className="relative z-10 h-[5.1rem] md:h-[6.75rem]" aria-hidden />

              {/* Layer 2 — main sections (in layout early for paths; visible after bus) */}
              <motion.div
                className="relative z-10 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4"
                initial={false}
                animate={{
                  opacity: sectionTabOpacity,
                  y: sectionTabOpacity > 0 ? 0 : 8,
                }}
                transition={{ duration: 0 }}
                aria-hidden={sectionTabOpacity < 0.05}
              >
                {sections.map((section, index) => (
                  <div
                    key={section.label}
                    className="flex flex-col items-stretch"
                    style={{
                      visibility: sectionTabOpacity < 0.05 ? 'hidden' : 'visible',
                    }}
                  >
                    <div
                      ref={(el) => {
                        sectionRefs.current[index] = el
                      }}
                      className="w-full"
                    >
                      <PrimaryNode>{section.label}</PrimaryNode>
                    </div>
                  </div>
                ))}
              </motion.div>

              <div className="relative z-10 h-10 md:h-12" aria-hidden />

              {/* Layer 3 — leaves */}
              <div className="relative z-10 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
                {sections.map((section, colIndex) => {
                  if (!leafRefs.current[colIndex]) {
                    leafRefs.current[colIndex] = []
                  }

                  return (
                    <div
                      key={`${section.label}-items`}
                      className="flex flex-col gap-5 md:gap-6"
                    >
                      {section.items.map((item, itemIndexInColumn) => {
                        if (!isLeafSlotRevealed(colIndex, itemIndexInColumn)) return null

                        return (
                          <motion.div
                            key={item}
                            ref={(el) => {
                              leafRefs.current[colIndex][itemIndexInColumn] = el
                            }}
                            layout
                            initial={{ opacity: 0, y: reduceMotion ? 0 : 10, scale: 0.97 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{
                              duration: 0.4,
                              ease: [0.22, 1, 0.36, 1],
                            }}
                            onAnimationComplete={measurePaths}
                          >
                            <SecondaryNode>{item}</SecondaryNode>
                          </motion.div>
                        )
                      })}
                    </div>
                  )
                })}
              </div>
            </div>

            {!reduceMotion && !allLeavesRevealed && (
              <p className="mt-6 text-center text-xs font-medium uppercase tracking-[0.2em] text-slate/70">
                {revealedLeafCount > 0
                  ? 'Keep scrolling to reveal each feature'
                  : trunkBusProgress < 1
                    ? 'Scroll to trace the structure'
                    : 'Scroll to reveal features'}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function PrimaryNode({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl bg-accent px-5 py-3 text-center text-sm font-semibold text-white shadow-glow ring-1 ring-accent/50 md:px-6 md:py-3.5 md:text-[15px]">
      {children}
    </div>
  )
}

function SecondaryNode({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-lg bg-elevated/90 px-3 py-2.5 text-center text-xs font-medium text-slate ring-1 ring-white/10 md:px-4 md:py-3 md:text-sm">
      {children}
    </div>
  )
}
