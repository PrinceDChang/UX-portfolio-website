import { useRef, useState } from 'react'

export function useProjectHoverVideo(hoverVideo?: string) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [hovered, setHovered] = useState(false)
  const hasHoverVideo = Boolean(hoverVideo)

  const startHoverVideo = () => {
    if (!hasHoverVideo) return
    setHovered(true)
    const video = videoRef.current
    if (!video) return
    void video.play().catch(() => {})
  }

  const stopHoverVideo = () => {
    if (!hasHoverVideo) return
    setHovered(false)
    const video = videoRef.current
    if (!video) return
    video.pause()
    video.currentTime = 0
  }

  const hoverHandlers = {
    onMouseEnter: startHoverVideo,
    onMouseLeave: stopHoverVideo,
    onFocus: startHoverVideo,
    onBlur: stopHoverVideo,
  }

  return { videoRef, hovered, hasHoverVideo, hoverHandlers }
}
