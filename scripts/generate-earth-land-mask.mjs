import sharp from 'sharp'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')
const inputPath = path.join(root, 'public/images/earth-day.jpg')
const outputPath = path.join(root, 'public/images/earth-land-mask.png')

const WIDTH = 4096
const HEIGHT = 2048

function isLandPixel(r, g, b, lat) {
  const lum = 0.299 * r + 0.587 * g + 0.114 * b
  const rg = r + g

  if (b > r + 32 && b > g + 20 && lum < 120) return false
  if (b > r + 22 && lum < 62) return false

  if (lum > 185 && Math.abs(r - g) < 32 && b > 155) return true

  if (Math.abs(lat) > 50) {
    if (b > r + 24 && lum < 52) return false
    return lum > 8 || rg > b * 1.05
  }

  if (lum < 55) {
    if (b > r + 12 && b > g + 6) return false
    return rg > 28 || lum > 10
  }

  if (lum < 85 && rg > b * 1.15) return true
  if (lum > 18 && rg >= b * 0.75) return true

  return lum > 34
}

function dilate(mask, width, height, radius = 1) {
  const out = new Uint8Array(mask.length)
  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const i = y * width + x
      let land = mask[i] > 0
      if (!land) {
        for (let dy = -radius; dy <= radius && !land; dy += 1) {
          for (let dx = -radius; dx <= radius; dx += 1) {
            const nx = x + dx
            const ny = y + dy
            if (nx < 0 || ny < 0 || nx >= width || ny >= height) continue
            if (mask[ny * width + nx] > 0) {
              land = true
              break
            }
          }
        }
      }
      out[i] = land ? 255 : 0
    }
  }
  return out
}

const { data, info } = await sharp(inputPath)
  .resize(WIDTH, HEIGHT, { fit: 'fill' })
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true })

const mask = new Uint8Array(WIDTH * HEIGHT)

for (let y = 0; y < HEIGHT; y += 1) {
  const lat = 90 - (y / HEIGHT) * 180
  for (let x = 0; x < WIDTH; x += 1) {
    const i = (y * WIDTH + x) * info.channels
    const r = data[i]
    const g = data[i + 1]
    const b = data[i + 2]
    mask[y * WIDTH + x] = isLandPixel(r, g, b, lat) ? 255 : 0
  }
}

let expanded = mask
for (let pass = 0; pass < 4; pass += 1) {
  expanded = dilate(expanded, WIDTH, HEIGHT, pass >= 2 ? 2 : 1)
}

await sharp(expanded, { raw: { width: WIDTH, height: HEIGHT, channels: 1 } })
  .png({ compressionLevel: 9 })
  .toFile(outputPath)

const landCount = expanded.reduce((sum, v) => sum + (v > 0 ? 1 : 0), 0)
console.log(`Wrote ${outputPath} (${WIDTH}x${HEIGHT}, ${((landCount / (WIDTH * HEIGHT)) * 100).toFixed(1)}% land)`)
