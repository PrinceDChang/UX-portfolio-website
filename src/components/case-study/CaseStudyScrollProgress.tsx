import { useEffect, useState } from 'react'

export function CaseStudyScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY
      const scrollable = document.documentElement.scrollHeight - window.innerHeight
      setProgress(scrollable > 0 ? Math.min(scrollTop / scrollable, 1) : 0)
    }

    updateProgress()
    window.addEventListener('scroll', updateProgress, { passive: true })
    window.addEventListener('resize', updateProgress, { passive: true })

    return () => {
      window.removeEventListener('scroll', updateProgress)
      window.removeEventListener('resize', updateProgress)
    }
  }, [])

  return (
    <div
      className="pointer-events-none fixed inset-x-0 top-0 z-[110] h-[3px] bg-white/[0.06]"
      role="progressbar"
      aria-valuenow={Math.round(progress * 100)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Case study scroll progress"
    >
      <div
        className="h-full origin-left bg-accent shadow-[0_0_14px_rgba(153,112,255,0.55)] transition-[transform] duration-150 ease-out will-change-transform"
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  )
}
