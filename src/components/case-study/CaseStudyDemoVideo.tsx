import { useEffect, useRef, useState } from 'react'

interface CaseStudyDemoVideoProps {
  src: string
  title: string
  className?: string
}

export function CaseStudyDemoVideo({ src, title, className = '' }: CaseStudyDemoVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const syncPlaying = () => setPlaying(!video.paused)
    video.addEventListener('play', syncPlaying)
    video.addEventListener('pause', syncPlaying)
    video.addEventListener('ended', syncPlaying)

    video.muted = true
    void video.play().catch(() => {
      setPlaying(false)
    })

    return () => {
      video.removeEventListener('play', syncPlaying)
      video.removeEventListener('pause', syncPlaying)
      video.removeEventListener('ended', syncPlaying)
    }
  }, [])

  const togglePlayback = () => {
    const video = videoRef.current
    if (!video) return

    if (video.paused) {
      void video.play()
    } else {
      video.pause()
    }
  }

  return (
    <div className={`relative bg-[#0a0a12] ${className}`.trim()}>
      <video
        ref={videoRef}
        className="block h-auto w-full"
        src={src}
        loop
        autoPlay
        muted
        playsInline
        preload="auto"
        aria-label={title}
        onClick={togglePlayback}
      />
      <button
        type="button"
        onClick={togglePlayback}
        aria-label={playing ? `Pause ${title}` : `Play ${title}`}
        aria-pressed={playing}
        className="absolute bottom-4 right-4 flex h-11 w-11 items-center justify-center rounded-full bg-black/70 text-white ring-1 ring-white/25 backdrop-blur-md transition hover:bg-black/90 hover:ring-accent/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        {playing ? (
          <svg className="block h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <rect x="7" y="6" width="3.5" height="12" rx="0.75" />
            <rect x="13.5" y="6" width="3.5" height="12" rx="0.75" />
          </svg>
        ) : (
          <svg className="block h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M8 5v14l11-7z" />
          </svg>
        )}
      </button>
    </div>
  )
}
