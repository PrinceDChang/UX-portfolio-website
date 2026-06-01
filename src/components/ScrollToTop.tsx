import { useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { disableBrowserScrollRestoration, scrollPageToTop } from '../lib/scrollToTop'

/** Scroll to top on client-side route changes. */
export function ScrollToTop() {
  const { pathname } = useLocation()

  useLayoutEffect(() => {
    disableBrowserScrollRestoration()
  }, [])

  useLayoutEffect(() => {
    scrollPageToTop()
    const frame = requestAnimationFrame(scrollPageToTop)
    return () => cancelAnimationFrame(frame)
  }, [pathname])

  return null
}
