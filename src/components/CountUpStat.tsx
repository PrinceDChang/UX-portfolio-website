import { animate, useInView } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

function parseStatValue(value: string) {
  const match = value.match(/^(\d+)(.*)$/)
  if (!match) return { end: 0, suffix: value }
  return { end: Number(match[1]), suffix: match[2] }
}

interface CountUpStatProps {
  value: string
  className?: string
}

export function CountUpStat({ value, className }: CountUpStatProps) {
  const { end, suffix } = parseStatValue(value)
  const ref = useRef<HTMLParagraphElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isInView) return

    const controls = animate(0, end, {
      duration: 1.15,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => setCount(Math.round(latest)),
    })

    return () => controls.stop()
  }, [isInView, end])

  return (
    <p ref={ref} className={className}>
      {count}
      {suffix}
    </p>
  )
}
