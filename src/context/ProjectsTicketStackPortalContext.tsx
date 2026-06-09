import {
  createContext,
  useContext,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'

interface ProjectsTicketStackPortalContextValue {
  portalEl: HTMLElement | null
  setPortalEl: (el: HTMLElement | null) => void
}

const ProjectsTicketStackPortalContext =
  createContext<ProjectsTicketStackPortalContextValue | null>(null)

export function ProjectsTicketStackPortalProvider({ children }: { children: ReactNode }) {
  const [portalEl, setPortalEl] = useState<HTMLElement | null>(null)
  const value = useMemo(() => ({ portalEl, setPortalEl }), [portalEl])

  return (
    <ProjectsTicketStackPortalContext.Provider value={value}>
      {children}
    </ProjectsTicketStackPortalContext.Provider>
  )
}

export function ProjectsTicketStackPortalTarget() {
  const context = useContext(ProjectsTicketStackPortalContext)
  const targetRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    context?.setPortalEl(targetRef.current)
    return () => context?.setPortalEl(null)
  }, [context])

  return <div ref={targetRef} className="ticket-stack-stage mt-10 md:mt-12" />
}

export function useProjectsTicketStackPortal() {
  return useContext(ProjectsTicketStackPortalContext)?.portalEl ?? null
}
