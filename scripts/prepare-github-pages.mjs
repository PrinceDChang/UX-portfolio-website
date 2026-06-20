import { copyFileSync, readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const repoName = process.env.GITHUB_PAGES_REPO ?? 'UX-portfolio-website'
const base = `/${repoName}`
const distDir = 'dist'

const textExtensions = new Set(['.html', '.js', '.css', '.svg', '.json'])

const replacements = [
  ['"/images/', `"${base}/images/`],
  ["'/images/", `'${base}/images/`],
  ['"/videos/', `"${base}/videos/`],
  ["'/videos/", `'${base}/videos/`],
  ['"/favicon', `"${base}/favicon`],
  ["'/favicon", `'${base}/favicon`],
  ['"/apple-touch', `"${base}/apple-touch`],
  ['"/sushitalk-prototype.html', `"${base}/sushitalk-prototype.html`],
  ['url(/images/', `url(${base}/images/`],
  ['url("/images/', `url("${base}/images/`],
  ["url('/images/", `url('${base}/images/`],
  ['url(/videos/', `url(${base}/videos/`],
  ['url("/videos/', `url("${base}/videos/`],
]

function walk(dir, visit) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name)
    if (statSync(path).isDirectory()) {
      walk(path, visit)
      continue
    }
    visit(path)
  }
}

function rewriteAssetPaths() {
  walk(distDir, (filePath) => {
    const ext = filePath.slice(filePath.lastIndexOf('.'))
    if (!textExtensions.has(ext)) return

    let content = readFileSync(filePath, 'utf8')
    let changed = false

    for (const [from, to] of replacements) {
      if (content.includes(from)) {
        content = content.split(from).join(to)
        changed = true
      }
    }

    if (changed) writeFileSync(filePath, content)
  })
}

function createSpaFallback() {
  copyFileSync(join(distDir, 'index.html'), join(distDir, '404.html'))
}

rewriteAssetPaths()
createSpaFallback()

console.log(`Prepared dist/ for GitHub Pages at ${base}/`)
