import sharp from 'sharp'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')
const images = path.join(root, 'public/images')

const WIDTH = 2208
const HEIGHT = 1242
const BG = { r: 244, g: 244, b: 246 }

const logoPath = path.join(images, 'uw-oris-logo.png')
const screenPath = path.join(images, 'uw-oris-feature-g3-budget-worksheet.png')
const outPath = path.join(images, 'uw-oris-case-study.png')

const LAPTOP_W = 1180
const LAPTOP_H = 820
const SCREEN_X = 48
const SCREEN_Y = 44
const SCREEN_W = 1084
const SCREEN_H = 676

const laptopFrameSvg = Buffer.from(`
<svg width="${LAPTOP_W}" height="${LAPTOP_H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="body" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#3d3d42"/>
      <stop offset="100%" stop-color="#1a1a1e"/>
    </linearGradient>
    <linearGradient id="base" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#d8d8dc"/>
      <stop offset="100%" stop-color="#b0b0b8"/>
    </linearGradient>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="18" stdDeviation="24" flood-color="#000000" flood-opacity="0.22"/>
    </filter>
  </defs>
  <g filter="url(#shadow)">
    <path fill="url(#body)" fill-rule="evenodd" d="
      M 24 16
      h ${LAPTOP_W - 48}
      v ${LAPTOP_H - 120}
      h -${LAPTOP_W - 48}
      Z
      M ${SCREEN_X + 10} ${SCREEN_Y + 10}
      h ${SCREEN_W - 20}
      v ${SCREEN_H - 20}
      h -${SCREEN_W - 20}
      Z
    "/>
    <rect x="${SCREEN_X - 2}" y="${SCREEN_Y - 2}" width="${SCREEN_W + 4}" height="${SCREEN_H + 4}" rx="10" fill="none" stroke="#0a0a0c" stroke-width="3"/>
    <rect x="0" y="${LAPTOP_H - 88}" width="${LAPTOP_W}" height="18" rx="8" fill="url(#base)"/>
    <path d="M ${LAPTOP_W * 0.12} ${LAPTOP_H - 70} L ${LAPTOP_W * 0.88} ${LAPTOP_H - 70} L ${LAPTOP_W * 0.92} ${LAPTOP_H - 24} L ${LAPTOP_W * 0.08} ${LAPTOP_H - 24} Z" fill="url(#base)"/>
    <rect x="${LAPTOP_W / 2 - 56}" y="${LAPTOP_H - 62}" width="112" height="8" rx="4" fill="#9898a0"/>
  </g>
</svg>`)

const screenImage = await sharp(screenPath)
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
    { input: laptopFrameSvg, left: 0, top: 0 },
  ])
  .png()
  .toBuffer()

const logoHeight = 420
const logoImage = await sharp(logoPath)
  .resize({ height: logoHeight, fit: 'inside' })
  .png()
  .toBuffer()

const logoMeta = await sharp(logoImage).metadata()
const logoW = logoMeta.width ?? 800
const logoH = logoMeta.height ?? logoHeight

const laptopLeft = WIDTH - LAPTOP_W - 40
const laptopTop = Math.round((HEIGHT - LAPTOP_H) / 2) + 20
const logoLeft = Math.round((laptopLeft - logoW) / 2)
const logoTop = Math.round((HEIGHT - logoH) / 2)

await sharp({
  create: {
    width: WIDTH,
    height: HEIGHT,
    channels: 3,
    background: BG,
  },
})
  .composite([
    { input: logoImage, left: Math.max(48, logoLeft), top: logoTop },
    { input: laptopComposite, left: laptopLeft, top: laptopTop },
  ])
  .png({ compressionLevel: 9 })
  .toFile(outPath)

console.log(`Wrote ${outPath} (${WIDTH}x${HEIGHT})`)
