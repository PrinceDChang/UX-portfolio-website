import sharp from 'sharp'
import path from 'path'
import { fileURLToPath, pathToFileURL } from 'url'
import { chromium } from 'playwright'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')
const images = path.join(root, 'public/images')
const prototypePath = path.join(root, 'public/sushitalk-prototype.html')

const WIDTH = 2800
const HEIGHT = 2800

const logoPath = path.join(images, 'sushitalk-mascot-logo.png')
const screenCapturePath = path.join(images, 'sushitalk-prototype-hero-capture.png')
const outPath = path.join(images, 'sushitalk-case-study.png')

const LAPTOP_W = 1540
const LAPTOP_H = 1080
const SCREEN_X = 56
const SCREEN_Y = 52
const SCREEN_W = 1428
const SCREEN_H = 892

async function capturePrototypeScreenshot() {
  const browser = await chromium.launch()
  try {
    const page = await browser.newPage({
      viewport: { width: 1680, height: 1050 },
      deviceScaleFactor: 3,
    })
    await page.goto(pathToFileURL(prototypePath).href, { waitUntil: 'networkidle' })
    await page.waitForTimeout(1500)
    await page.screenshot({
      path: screenCapturePath,
      type: 'png',
      clip: { x: 0, y: 0, width: 1680, height: 1050 },
    })
  } finally {
    await browser.close()
  }
  console.log(`Captured prototype screenshot → ${screenCapturePath}`)
}

function laptopFrameSvg() {
  return Buffer.from(`
<svg width="${LAPTOP_W}" height="${LAPTOP_H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="lid" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#2f2f34"/>
      <stop offset="55%" stop-color="#1a1a1f"/>
      <stop offset="100%" stop-color="#101014"/>
    </linearGradient>
    <linearGradient id="bezel" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#0a0a0c"/>
      <stop offset="100%" stop-color="#151518"/>
    </linearGradient>
    <linearGradient id="base" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#d4d0ca"/>
      <stop offset="100%" stop-color="#a8a39c"/>
    </linearGradient>
    <linearGradient id="baseShine" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="rgba(255,255,255,0.35)"/>
      <stop offset="50%" stop-color="rgba(255,255,255,0.08)"/>
      <stop offset="100%" stop-color="rgba(255,255,255,0.2)"/>
    </linearGradient>
    <filter id="deviceShadow" x="-25%" y="-25%" width="150%" height="150%">
      <feDropShadow dx="0" dy="42" stdDeviation="48" flood-color="#1a1410" flood-opacity="0.28"/>
    </filter>
    <filter id="screenGlow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="0" stdDeviation="18" flood-color="#c0392b" flood-opacity="0.12"/>
    </filter>
  </defs>
  <g filter="url(#deviceShadow)">
    <path fill="url(#lid)" fill-rule="evenodd" d="
      M 28 20
      h ${LAPTOP_W - 56}
      v ${LAPTOP_H - 148}
      h -${LAPTOP_W - 56}
      Z
      M ${SCREEN_X} ${SCREEN_Y}
      h ${SCREEN_W} v ${SCREEN_H} h -${SCREEN_W} Z
    "/>
    <rect x="${SCREEN_X - 3}" y="${SCREEN_Y - 3}" width="${SCREEN_W + 6}" height="${SCREEN_H + 6}" rx="14" fill="none" stroke="#0a0a0c" stroke-width="6"/>
    <circle cx="${LAPTOP_W / 2}" cy="28" r="4" fill="#2a2a30"/>
    <rect x="0" y="${LAPTOP_H - 116}" width="${LAPTOP_W}" height="22" rx="10" fill="url(#base)"/>
    <path d="M ${LAPTOP_W * 0.1} ${LAPTOP_H - 94} L ${LAPTOP_W * 0.9} ${LAPTOP_H - 94} L ${LAPTOP_W * 0.94} ${LAPTOP_H - 28} L ${LAPTOP_W * 0.06} ${LAPTOP_H - 28} Z" fill="url(#base)"/>
    <path d="M ${LAPTOP_W * 0.1} ${LAPTOP_H - 94} L ${LAPTOP_W * 0.9} ${LAPTOP_H - 94} L ${LAPTOP_W * 0.94} ${LAPTOP_H - 28} L ${LAPTOP_W * 0.06} ${LAPTOP_H - 28} Z" fill="url(#baseShine)" opacity="0.45"/>
    <rect x="${LAPTOP_W / 2 - 72}" y="${LAPTOP_H - 82}" width="144" height="10" rx="5" fill="#8e8982"/>
  </g>
</svg>`)
}

function backgroundSvg() {
  return Buffer.from(`
<svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#faf6ef"/>
      <stop offset="45%" stop-color="#f5f0e8"/>
      <stop offset="100%" stop-color="#ebe4d8"/>
    </linearGradient>
    <radialGradient id="glowTeal" cx="22%" cy="78%" r="42%">
      <stop offset="0%" stop-color="#7ab5a8" stop-opacity="0.22"/>
      <stop offset="100%" stop-color="#7ab5a8" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glowRed" cx="78%" cy="32%" r="38%">
      <stop offset="0%" stop-color="#c0392b" stop-opacity="0.14"/>
      <stop offset="100%" stop-color="#c0392b" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="floor" cx="62%" cy="88%" r="34%">
      <stop offset="0%" stop-color="#2a2018" stop-opacity="0.12"/>
      <stop offset="100%" stop-color="#2a2018" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#bg)"/>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#glowTeal)"/>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#glowRed)"/>
  <ellipse cx="1680" cy="2460" rx="920" ry="120" fill="url(#floor)"/>
  <circle cx="240" cy="340" r="6" fill="#7ab5a8" opacity="0.35"/>
  <circle cx="2550" cy="520" r="4" fill="#c0392b" opacity="0.3"/>
  <circle cx="420" cy="2280" r="5" fill="#c0392b" opacity="0.22"/>
</svg>`)
}

function logoCardSvg(cardW, cardH) {
  return Buffer.from(`
<svg width="${cardW}" height="${cardH}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="cardShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="28" stdDeviation="36" flood-color="#1a1410" flood-opacity="0.2"/>
    </filter>
    <linearGradient id="card" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="100%" stop-color="#f8f3eb"/>
    </linearGradient>
  </defs>
  <g filter="url(#cardShadow)">
    <rect x="0" y="0" width="${cardW}" height="${cardH}" rx="36" fill="url(#card)"/>
    <rect x="0" y="0" width="${cardW}" height="${cardH}" rx="36" fill="none" stroke="rgba(122,181,168,0.35)" stroke-width="2"/>
  </g>
</svg>`)
}

await capturePrototypeScreenshot()

const screenImage = await sharp(screenCapturePath)
  .resize(SCREEN_W, SCREEN_H, { fit: 'cover', position: 'top' })
  .png()
  .toBuffer()

const laptopComposite = await sharp({
  create: {
    width: LAPTOP_W,
    height: LAPTOP_H,
    channels: 4,
    background: { r: 0, g: 0, b: 0, alpha: 0 },
  },
})
  .composite([
    { input: screenImage, left: SCREEN_X, top: SCREEN_Y },
    { input: laptopFrameSvg(), left: 0, top: 0 },
  ])
  .png()
  .toBuffer()

const laptopTilted = await sharp(laptopComposite)
  .rotate(-2.2, { background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .png()
  .toBuffer()

const laptopMeta = await sharp(laptopTilted).metadata()
const laptopW = laptopMeta.width ?? LAPTOP_W
const laptopH = laptopMeta.height ?? LAPTOP_H

const LOGO_CARD_W = 560
const LOGO_CARD_H = 620
const LOGO_IN_CARD_H = 460

const logoImage = await sharp(logoPath)
  .resize({ height: LOGO_IN_CARD_H, fit: 'inside' })
  .png()
  .toBuffer()

const logoMeta = await sharp(logoImage).metadata()
const logoW = logoMeta.width ?? 400
const logoH = logoMeta.height ?? LOGO_IN_CARD_H
const logoPadX = Math.round((LOGO_CARD_W - logoW) / 2)
const logoPadY = Math.round((LOGO_CARD_H - logoH) / 2) - 12

const logoCard = await sharp({
  create: {
    width: LOGO_CARD_W,
    height: LOGO_CARD_H,
    channels: 4,
    background: { r: 0, g: 0, b: 0, alpha: 0 },
  },
})
  .composite([
    { input: logoCardSvg(LOGO_CARD_W, LOGO_CARD_H), left: 0, top: 0 },
    { input: logoImage, left: logoPadX, top: logoPadY },
  ])
  .png()
  .toBuffer()

const logoCardTilted = await sharp(logoCard)
  .rotate(3.5, { background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .png()
  .toBuffer()

const logoCardMeta = await sharp(logoCardTilted).metadata()
const logoCardW = logoCardMeta.width ?? LOGO_CARD_W
const logoCardH = logoCardMeta.height ?? LOGO_CARD_H

const laptopLeft = Math.round((WIDTH - laptopW) / 2 + 120)
const laptopTop = Math.round((HEIGHT - laptopH) / 2 - 40)
const logoCardLeft = Math.round(WIDTH * 0.06)
const logoCardTop = Math.round(HEIGHT * 0.58 - logoCardH / 2)

const background = await sharp(backgroundSvg()).png().toBuffer()

await sharp(background)
  .composite([
    { input: laptopTilted, left: laptopLeft, top: laptopTop },
    { input: logoCardTilted, left: logoCardLeft, top: logoCardTop },
  ])
  .png({ compressionLevel: 6, quality: 95 })
  .toFile(outPath)

console.log(`Wrote ${outPath} (${WIDTH}x${HEIGHT})`)
