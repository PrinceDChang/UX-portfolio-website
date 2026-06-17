import { useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'
import {
  disableBrowserScrollRestoration,
  schedulePageScrollToHash,
  schedulePageScrollToTop,
} from '../lib/scrollToTop'

/** Scroll to top on client-side route changes; honor in-page hash targets when present. */
export function ScrollToTop() {
  const { pathname, hash, search, key } = useLocation()

  useLayoutEffect(() => {
    disableBrowserScrollRestoration()
  }, [])

  useLayoutEffect(() => {
    if (hash) {
      return schedulePageScrollToHash(hash)
    }

    return schedulePageScrollToTop()
  }, [pathname, hash, search, key])

  return null
}
