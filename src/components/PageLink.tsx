import { Link, useLocation, type LinkProps } from 'react-router-dom'
import { schedulePageScrollToHash, schedulePageScrollToTop } from '../lib/scrollToTop'

function resolveLinkTarget(to: LinkProps['to']): string {
  if (typeof to === 'string') return to
  if (typeof to === 'object' && to !== null) {
    return `${to.pathname ?? ''}${to.search ?? ''}${to.hash ?? ''}`
  }
  return ''
}

/** Internal route link that scrolls to top (or hash target) on navigation. */
export function PageLink({ to, onClick, ...props }: LinkProps) {
  const location = useLocation()

  return (
    <Link
      {...props}
      to={to}
      onClick={(event) => {
        onClick?.(event)
        if (event.defaultPrevented) return

        const target = resolveLinkTarget(to)
        if (!target || target.startsWith('//') || /^https?:/i.test(target)) return

        const url = new URL(target, window.location.origin)
        const isSameRoute =
          url.pathname === location.pathname && url.search === location.search

        if (!isSameRoute) return

        if (url.hash) {
          schedulePageScrollToHash(url.hash)
        } else {
          schedulePageScrollToTop()
        }
      }}
    />
  )
}
