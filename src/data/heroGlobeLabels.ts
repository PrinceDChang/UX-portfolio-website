export const heroGlobeLabelTexts = [
  'UX Designer',
  'Globalization',
  'Localization',
  'Fitness',
  'User-Center',
  'Accessibility',
] as const

export type HeroGlobeLabelPlacement = {
  text: (typeof heroGlobeLabelTexts)[number]
  lat: number
  lng: number
}

/** Mix of equatorial and upper-hemisphere latitudes (avoid poles). */
const LABEL_LATITUDES = [3, 22, -2, 18, 4, 26] as const
/** Degrees between labels — tighter spacing keeps the front face busier. */
const LABEL_LNG_STEP = 40

/** Evenly spaced longitudes with equatorial + upper-hemisphere latitude mix. */
export function createHeroGlobePlacements(): HeroGlobeLabelPlacement[] {
  const startLng = -75 + Math.random() * 50

  return heroGlobeLabelTexts.map((text, index) => ({
    text,
    lat: LABEL_LATITUDES[index % LABEL_LATITUDES.length],
    lng: startLng + index * LABEL_LNG_STEP,
  }))
}
