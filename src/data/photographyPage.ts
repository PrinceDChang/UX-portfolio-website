export type PhotographyMediaOrientation = 'portrait' | 'landscape'

export type PhotographyBentoSize =
  | 'portrait-sm'
  | 'portrait-md'
  | 'portrait-tall'
  | 'landscape-md'
  | 'landscape-lg'
  | 'landscape-xl'

export interface PhotographyBentoSlot {
  column: string
  row: string
  size: PhotographyBentoSize
  rotate?: number
  scale?: number
  zIndex?: number
}

export interface PhotographyMediaItem {
  id: string
  src: string
  alt: string
  orientation: PhotographyMediaOrientation
  bento: PhotographyBentoSlot
}

export const photographyPage = {
  label: 'Photography',
  headline: {
    primary: 'Chasing light,',
    accent: 'framing silence.',
  },
  accent: '#9970FF',
  accentMuted: 'rgba(153, 112, 255, 0.16)',
  bio: {
    lead:
      'I love documenting my adventures by taking photos and videos and presenting how I perceive the world through my lens and art.',
    paragraphs: [
      'I will always have my trusty FujiFilm x100vi or my Sony a7iii by my side to capture amazing moments of my life or travels around the world.',
      'Recently I have dabbled with film photography through my poloraid camera. Whatever the occasion, photography has been a creative outlet that helps stretch my mind and articulate my mind to see the world for different perspectives. A calming hobby that I hope to continue to grow and improve upon.',
    ],
  },
  media: [
    {
      id: 'hakone-torii',
      src: '/images/photography-hakone-torii.png',
      alt: 'Red torii gate at night with a lone figure seated on a stone pier in Hakone',
      orientation: 'portrait',
      bento: { column: '1 / 3', row: '1', size: 'portrait-md', rotate: -2.2, zIndex: 2 },
    },
    {
      id: 'golden-hour-sunset',
      src: '/images/photography-golden-hour-sunset.png',
      alt: 'Silhouetted figure watching a golden-hour sunset over calm water',
      orientation: 'portrait',
      bento: { column: '3 / 5', row: '1', size: 'portrait-sm', rotate: 2.4, scale: 0.62, zIndex: 3 },
    },
    {
      id: 'calligraphy-wall',
      src: '/images/photography-calligraphy-wall.png',
      alt: 'Curving wooden wall inscribed with Japanese calligraphy at a shrine',
      orientation: 'portrait',
      bento: { column: '1 / 3', row: '2', size: 'portrait-md', rotate: -1.6, zIndex: 1 },
    },
    {
      id: 'wushu-staff',
      src: '/images/photography-wushu-staff.png',
      alt: 'Martial artist leaping with a three-section staff against autumn foliage',
      orientation: 'landscape',
      bento: { column: '3 / 5', row: '2', size: 'landscape-md', rotate: 2.9, zIndex: 4 },
    },
    {
      id: 'mount-fuji',
      src: '/images/photography-mount-fuji.png',
      alt: 'Mount Fuji rising above a Japanese townscape at golden hour',
      orientation: 'landscape',
      bento: { column: '1 / 5', row: '3', size: 'landscape-lg', rotate: -2.5, zIndex: 2 },
    },
    {
      id: 'disney-castle',
      src: '/images/photography-disney-castle.png',
      alt: 'Portrait in Mickey ears before a fairytale castle spire',
      orientation: 'landscape',
      bento: { column: '3 / 5', row: '4', size: 'landscape-md', rotate: 1.4, zIndex: 3 },
    },
    {
      id: 'sea-wall-crouch',
      src: '/images/photography-sea-wall-crouch.png',
      alt: 'Figure crouching on a coastal sea wall at golden hour, looking out over the bay',
      orientation: 'landscape',
      bento: { column: '1 / 3', row: '4', size: 'landscape-md', rotate: -1.8, zIndex: 2 },
    },
    {
      id: 'wushu-beach',
      src: '/images/photography-wushu-beach.png',
      alt: 'Wushu practitioner balancing on one leg with a sword along a pebbled shoreline at sunset',
      orientation: 'portrait',
      bento: { column: '1 / 2', row: '5', size: 'portrait-sm', rotate: 2.1, zIndex: 3 },
    },
    {
      id: 'coastal-town',
      src: '/images/photography-coastal-town.png',
      alt: 'High-angle view of a coastal Japanese town overlooking the sea',
      orientation: 'landscape',
      bento: { column: '3 / 5', row: '5', size: 'landscape-md', rotate: 1.2, zIndex: 2 },
    },
    {
      id: 'cafe-mezzanine',
      src: '/images/photography-cafe-mezzanine.png',
      alt: 'Bird’s-eye view of a circular mezzanine café inside a glass-walled atrium',
      orientation: 'portrait',
      bento: { column: '2 / 3', row: '5', size: 'portrait-sm', rotate: -2.6, zIndex: 3 },
    },
    {
      id: 'snow-village',
      src: '/images/photography-snow-village.png',
      alt: 'Traditional snow-covered village with thatched roofs and evergreen forest',
      orientation: 'landscape',
      bento: { column: '1 / 3', row: '6', size: 'landscape-md', rotate: -1.5, zIndex: 2 },
    },
    {
      id: 'sea-wall-front',
      src: '/images/photography-sea-wall-front.png',
      alt: 'Portrait on a concrete sea wall with coastline and water stretching into the distance',
      orientation: 'landscape',
      bento: { column: '3 / 5', row: '6', size: 'landscape-md', rotate: 2.3, zIndex: 1 },
    },
  ] satisfies PhotographyMediaItem[],
}
