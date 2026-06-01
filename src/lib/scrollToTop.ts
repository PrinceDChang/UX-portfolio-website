/** Jump to the top of the page (avoids smooth-scroll CSS delaying the reset). */
export function scrollPageToTop() {
  const html = document.documentElement
  const prevBehavior = html.style.scrollBehavior
  html.style.scrollBehavior = 'auto'
  window.scrollTo(0, 0)
  html.scrollTop = 0
  document.body.scrollTop = 0
  html.style.scrollBehavior = prevBehavior
}

export function disableBrowserScrollRestoration() {
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual'
  }
}
