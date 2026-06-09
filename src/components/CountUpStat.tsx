import { animate, useInView, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

function parseStatValue(value: string) {
  const match = value.match(/^(\d+)(.*)$/)
  if (!match) return { end: 0, suffix: value }
  return { end: Number(match[1]), suffix: match[2] }
}

interface CountUpStatProps {
  value: string
  className?: string
  /** Seconds before the count-up begins (after entering view) */
  delay?: number
}

export function CountUpStat({ value, className, delay = 0 }: CountUpStatProps) {
  const ref = useRef<HTMLParagraphElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  const reducedMotion = useReducedMotion()
  const { end, suffix } = parseStatValue(value)
  const [count, setCount] = useState(reducedMotion ? end : 0)

  useEffect(() => {
    if (!isInView) return

    if (reducedMotion) {
      setCount(end)
      return
    }

    setCount(0)

    let controls: ReturnType<typeof animate> | undefined
    const timer = window.setTimeout(() => {
      controls = animate(0, end, {
        duration: 1.15,
        ease: [0.22, 1, 0.36, 1],
        onUpdate: (latest) => setCount(Math.round(latest)),
      })
    }, delay * 1000)

    return () => {
      window.clearTimeout(timer)
      controls?.stop()
    }
  }, [delay, end, isInView, reducedMotion])

  return (
    <p ref={ref} className={className}>
      {count}
      {suffix}
    </p>
  )
}
