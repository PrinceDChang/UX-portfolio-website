import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PhotographyShutterTransition } from '../components/photography/PhotographyShutterTransition'

interface PhotographyTransitionContextValue {
  startPhotographyTransition: () => void
  canRevealContent: boolean
  isTransitionActive: boolean
}

const PhotographyTransitionContext = createContext<PhotographyTransitionContextValue | null>(
  null,
)

export function PhotographyTransitionProvider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate()
  const [active, setActive] = useState(false)
  const [canRevealContent, setCanRevealContent] = useState(false)

  const startPhotographyTransition = useCallback(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reducedMotion) {
      navigate('/photography')
      return
    }
    setCanRevealContent(false)
    setActive(true)
  }, [navigate])

  const handleNavigate = useCallback(() => {
    navigate('/photography', { state: { fromPhotoTransition: true } })
  }, [navigate])

  const handleReveal = useCallback(() => {
    setCanRevealContent(true)
  }, [])

  const handleComplete = useCallback(() => {
    setActive(false)
  }, [])

  const value = useMemo(
    () => ({ startPhotographyTransition, canRevealContent, isTransitionActive: active }),
    [active, canRevealContent, startPhotographyTransition],
  )

  return (
    <PhotographyTransitionContext.Provider value={value}>
      {children}
      {active ? (
        <PhotographyShutterTransition
          onNavigate={handleNavigate}
          onReveal={handleReveal}
          onComplete={handleComplete}
        />
      ) : null}
    </PhotographyTransitionContext.Provider>
  )
}

export function usePhotographyTransition() {
  const context = useContext(PhotographyTransitionContext)
  if (!context) {
    throw new Error('usePhotographyTransition must be used within PhotographyTransitionProvider')
  }
  return context
}
