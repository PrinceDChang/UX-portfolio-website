/** Jump to the top of the page (avoids smooth-scroll CSS delaying the reset). */
export function scrollPageToTop() {
  if (document.activeElement instanceof HTMLElement) {
    document.activeElement.blur()
  }

  const html = document.documentElement
  const body = document.body
  const prevBehavior = html.style.scrollBehavior
  html.style.scrollBehavior = 'auto'

  window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  html.scrollTop = 0
  body.scrollTop = 0

  html.style.scrollBehavior = prevBehavior
}

export function scrollPageToHash(hash: string, behavior: ScrollBehavior = 'auto') {
  const id = hash.replace(/^#/, '')
  if (!id) return false

  const target = document.getElementById(id)
  if (!target) return false

  target.scrollIntoView({ behavior, block: 'start' })
  return true
}

export function schedulePageScrollToTop() {
  scrollPageToTop()

  const cleanups: Array<() => void> = []
  const raf = requestAnimationFrame(scrollPageToTop)
  cleanups.push(() => cancelAnimationFrame(raf))

  for (const delay of [0, 50, 150, 300]) {
    const id = window.setTimeout(scrollPageToTop, delay)
    cleanups.push(() => window.clearTimeout(id))
  }

  return () => cleanups.forEach((cleanup) => cleanup())
}

export function schedulePageScrollToHash(hash: string) {
  if (scrollPageToHash(hash)) {
    return () => {}
  }

  const cleanups: Array<() => void> = []
  for (const delay of [0, 50, 150, 300]) {
    const id = window.setTimeout(() => scrollPageToHash(hash), delay)
    cleanups.push(() => window.clearTimeout(id))
  }

  return () => cleanups.forEach((cleanup) => cleanup())
}

export function disableBrowserScrollRestoration() {
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual'
  }
}
