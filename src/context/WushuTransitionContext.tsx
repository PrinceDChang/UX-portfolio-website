import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { WushuDoorTransition } from '../components/wushu/WushuDoorTransition'

interface WushuTransitionContextValue {
  startWushuTransition: () => void
}

const WushuTransitionContext = createContext<WushuTransitionContextValue | null>(null)

export function WushuTransitionProvider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate()
  const [active, setActive] = useState(false)

  const startWushuTransition = useCallback(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reducedMotion) {
      navigate('/wushu')
      return
    }
    setActive(true)
  }, [navigate])

  const handleComplete = useCallback(() => {
    setActive(false)
    navigate('/wushu', { state: { fromWushuTransition: true } })
  }, [navigate])

  const value = useMemo(() => ({ startWushuTransition }), [startWushuTransition])

  return (
    <WushuTransitionContext.Provider value={value}>
      {children}
      {active ? <WushuDoorTransition onComplete={handleComplete} /> : null}
    </WushuTransitionContext.Provider>
  )
}

export function useWushuTransition() {
  const context = useContext(WushuTransitionContext)
  if (!context) {
    throw new Error('useWushuTransition must be used within WushuTransitionProvider')
  }
  return context
}
