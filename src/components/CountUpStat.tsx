import { animate, useInView, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

type ParsedStat =
  | { kind: 'single'; end: number; suffix: string }
  | { kind: 'range'; start: number; end: number; suffix: string }
  | { kind: 'text'; text: string }

function parseStatValue(value: string): ParsedStat {
  const rangeMatch = value.match(/^(\d+)\s*[–-]\s*(\d+)(.*)$/i)
  if (rangeMatch) {
    return {
      kind: 'range',
      start: Number(rangeMatch[1]),
      end: Number(rangeMatch[2]),
      suffix: rangeMatch[3],
    }
  }

  const match = value.match(/^(\d+)(.*)$/)
  if (match) {
    return { kind: 'single', end: Number(match[1]), suffix: match[2] }
  }

  return { kind: 'text', text: value }
}

export function canAnimateStatValue(value: string) {
  return parseStatValue(value).kind !== 'text'
}

interface CountUpStatProps {
  value: string
  className?: string
  /** Seconds before the count-up begins (after entering view) */
  delay?: number
  /** Gate animation until parent section is active */
  when?: boolean
  /** Count-up animation duration in seconds */
  duration?: number
}

export function CountUpStat({
  value,
  className,
  delay = 0,
  when = true,
  duration = 1.15,
}: CountUpStatProps) {
  const ref = useRef<HTMLParagraphElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  const reducedMotion = useReducedMotion()
  const parsed = parseStatValue(value)
  const finalText =
    parsed.kind === 'text'
      ? parsed.text
      : parsed.kind === 'range'
        ? `${parsed.start}–${parsed.end}${parsed.suffix}`
        : `${parsed.end}${parsed.suffix}`
  const [display, setDisplay] = useState(
    reducedMotion
      ? finalText
      : parsed.kind === 'single'
        ? `0${parsed.suffix}`
        : parsed.kind === 'range'
          ? `${parsed.start}–${parsed.start}${parsed.suffix}`
          : parsed.text,
  )

  useEffect(() => {
    if (!isInView || !when) return

    if (reducedMotion || parsed.kind === 'text') {
      setDisplay(finalText)
      return
    }

    let controls: ReturnType<typeof animate> | undefined
    const timer = window.setTimeout(() => {
      if (parsed.kind === 'single') {
        setDisplay(`0${parsed.suffix}`)
        controls = animate(0, parsed.end, {
          duration,
          ease: [0.22, 1, 0.36, 1],
          onUpdate: (latest) => {
            setDisplay(`${Math.round(latest)}${parsed.suffix}`)
          },
        })
        return
      }

      setDisplay(`${parsed.start}–${parsed.start}${parsed.suffix}`)
      controls = animate(parsed.start, parsed.end, {
        duration,
        ease: [0.22, 1, 0.36, 1],
        onUpdate: (latest) => {
          const n = Math.round(latest)
          setDisplay(`${parsed.start}–${n}${parsed.suffix}`)
        },
      })
    }, delay * 1000)

    return () => {
      window.clearTimeout(timer)
      controls?.stop()
    }
  }, [delay, duration, finalText, isInView, reducedMotion, value, when])

  const unitSuffix =
    parsed.kind !== 'text' && /^[a-z]+$/i.test(parsed.suffix) ? parsed.suffix : null
  const mainText =
    unitSuffix && display.endsWith(unitSuffix)
      ? display.slice(0, -unitSuffix.length)
      : display

  return (
    <p ref={ref} className={className}>
      {mainText}
      {unitSuffix && <span className="normal-case">{unitSuffix}</span>}
    </p>
  )
}
