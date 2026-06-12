import { useLayoutEffect, useRef, useState } from 'react'

export function useScaleToFit(deps: unknown[]) {
  const containerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [metrics, setMetrics] = useState({ scale: 1, width: 0, height: 0 })

  useLayoutEffect(() => {
    const container = containerRef.current
    const content = contentRef.current
    if (!container || !content) return

    const update = () => {
      const styles = getComputedStyle(container)
      const paddingX =
        parseFloat(styles.paddingLeft) + parseFloat(styles.paddingRight)
      const availableWidth = container.clientWidth - paddingX
      if (availableWidth <= 0) return

      const previousTransform = content.style.transform
      content.style.transform = 'none'

      const contentWidth = content.scrollWidth
      const contentHeight = content.scrollHeight

      content.style.transform = previousTransform

      if (contentWidth === 0 || contentHeight === 0) return

      const scale = Math.min(1, availableWidth / contentWidth)
      setMetrics({
        scale,
        width: contentWidth * scale,
        height: contentHeight * scale,
      })
    }

    update()
    const observer = new ResizeObserver(update)
    observer.observe(container)
    observer.observe(content)
    return () => observer.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return { containerRef, contentRef, metrics }
}
