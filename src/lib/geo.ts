import * as THREE from 'three'

/** Y-up sphere: lng 0° faces +Z (standard map center on Africa/Europe) */
export function latLngToVector3(lat: number, lng: number, radius = 1): THREE.Vector3 {
  const latRad = THREE.MathUtils.degToRad(lat)
  const lngRad = THREE.MathUtils.degToRad(lng)

  return new THREE.Vector3(
    radius * Math.cos(latRad) * Math.sin(lngRad),
    radius * Math.sin(latRad),
    radius * Math.cos(latRad) * Math.cos(lngRad),
  )
}

export function vector3ToLatLng(position: THREE.Vector3): { lat: number; lng: number } {
  const n = position.clone().normalize()
  const lat = THREE.MathUtils.radToDeg(Math.asin(THREE.MathUtils.clamp(n.y, -1, 1)))
  const lng = THREE.MathUtils.radToDeg(Math.atan2(n.x, n.z))
  return { lat, lng }
}

export function fibonacciSpherePoints(count: number, radius = 1): THREE.Vector3[] {
  const points: THREE.Vector3[] = []
  const goldenRatio = (1 + Math.sqrt(5)) / 2

  for (let i = 0; i < count; i += 1) {
    const t = i / count
    const inclination = Math.acos(1 - 2 * t)
    const azimuth = (2 * Math.PI * i) / goldenRatio

    points.push(
      new THREE.Vector3(
        radius * Math.sin(inclination) * Math.cos(azimuth),
        radius * Math.cos(inclination),
        radius * Math.sin(inclination) * Math.sin(azimuth),
      ),
    )
  }

  return points
}

function latLngToEquirectangularUV(lat: number, lng: number): { u: number; v: number } {
  return {
    u: (lng + 180) / 360,
    v: (90 - lat) / 180,
  }
}

function isLandPixel(r: number, g: number, b: number, lat: number): boolean {
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

function isLandFromSample(
  data: Uint8ClampedArray,
  width: number,
  height: number,
  u: number,
  v: number,
  lat: number,
  useMask: boolean,
): boolean {
  const cx = Math.min(width - 1, Math.max(0, Math.floor(u * width)))
  const cy = Math.min(height - 1, Math.max(0, Math.floor(v * height)))
  let landVotes = 0
  let total = 0

  for (let dy = -2; dy <= 2; dy += 1) {
    for (let dx = -2; dx <= 2; dx += 1) {
      const x = Math.min(width - 1, Math.max(0, cx + dx))
      const y = Math.min(height - 1, Math.max(0, cy + dy))
      const index = (y * width + x) * 4

      const isLand = useMask
        ? data[index] > 96
        : isLandPixel(data[index], data[index + 1], data[index + 2], lat)

      if (isLand) landVotes += 1
      total += 1
    }
  }

  return landVotes / total >= 0.22
}

async function loadImageData(
  imageUrl: string,
  sampleWidth: number,
  sampleHeight: number,
): Promise<{ data: Uint8ClampedArray; width: number; height: number; channels: number } | null> {
  const image = await loadImage(imageUrl)
  const canvas = document.createElement('canvas')
  canvas.width = sampleWidth
  canvas.height = sampleHeight
  const context = canvas.getContext('2d')

  if (!context) return null

  context.drawImage(image, 0, 0, sampleWidth, sampleHeight)
  const imageData = context.getImageData(0, 0, sampleWidth, sampleHeight)
  return {
    data: imageData.data,
    width: sampleWidth,
    height: sampleHeight,
    channels: 4,
  }
}

export async function filterLandPoints(
  points: THREE.Vector3[],
  imageUrl: string,
  maskUrl?: string,
): Promise<Float32Array> {
  const sampleWidth = 4096
  const sampleHeight = 2048

  let textureData: Uint8ClampedArray | null = null
  let useMask = false

  if (maskUrl) {
    try {
      const mask = await loadImageData(maskUrl, sampleWidth, sampleHeight)
      if (mask) {
        textureData = mask.data
        useMask = true
      }
    } catch {
      textureData = null
    }
  }

  if (!textureData) {
    const texture = await loadImageData(imageUrl, sampleWidth, sampleHeight)
    textureData = texture?.data ?? null
    useMask = false
  }

  if (!textureData) {
    return new Float32Array(0)
  }

  const landPoints: number[] = []

  for (const point of points) {
    const { lat, lng } = vector3ToLatLng(point)
    const { u, v } = latLngToEquirectangularUV(lat, lng)

    if (isLandFromSample(textureData, sampleWidth, sampleHeight, u, v, lat, useMask)) {
      const surface = point.clone().normalize().multiplyScalar(point.length())
      landPoints.push(surface.x, surface.y, surface.z)
    }
  }

  return new Float32Array(landPoints)
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image()
    image.crossOrigin = 'anonymous'
    image.onload = () => resolve(image)
    image.onerror = reject
    image.src = src
  })
}
