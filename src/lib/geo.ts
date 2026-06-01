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

function isLandPixel(r: number, g: number, b: number): boolean {
  const lum = 0.299 * r + 0.587 * g + 0.114 * b
  const isDeepOcean = b > r + 18 && b > g + 8 && lum < 50
  const isShallowWater = b > r + 8 && lum < 65 && g > r
  if (isDeepOcean || isShallowWater) return false
  return lum > 32
}

export async function filterLandPoints(
  points: THREE.Vector3[],
  imageUrl: string,
): Promise<Float32Array> {
  const image = await loadImage(imageUrl)
  const canvas = document.createElement('canvas')
  const sampleWidth = 2048
  const sampleHeight = 1024
  canvas.width = sampleWidth
  canvas.height = sampleHeight
  const context = canvas.getContext('2d')

  if (!context) {
    return new Float32Array(0)
  }

  context.drawImage(image, 0, 0, sampleWidth, sampleHeight)
  const { data, width, height } = context.getImageData(0, 0, sampleWidth, sampleHeight)

  const landPoints: number[] = []

  for (const point of points) {
    const { lat, lng } = vector3ToLatLng(point)
    const { u, v } = latLngToEquirectangularUV(lat, lng)
    const x = Math.min(width - 1, Math.max(0, Math.floor(u * width)))
    const y = Math.min(height - 1, Math.max(0, Math.floor(v * height)))
    const index = (y * width + x) * 4
    const r = data[index]
    const g = data[index + 1]
    const b = data[index + 2]

    if (isLandPixel(r, g, b)) {
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
