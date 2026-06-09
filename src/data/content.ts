export type ProjectTag =
  | 'Design'
  | 'Research'
  | 'Mobile'
  | 'Web'
  | 'AI'
  | 'Non-profit'
  | 'Start-up'
  | 'Hack-a-thon'
  | 'AR'

/** UX methods and artifacts surfaced across case studies (Projects keyword filter). */
export type ProjectKeyword =
  | 'Personas'
  | 'User flows'
  | 'Competitive audit'
  | 'Usability testing'
  | 'Wireframes'
  | 'Prototyping'
  | 'Field research'
  | 'Interviews & surveys'
  | 'Information architecture'
  | 'Journey mapping'
  | 'Accessibility'
  | 'A/B testing'
  | 'Secondary research'
  | 'Benchmarking'

export interface Project {
  id: string
  title: string
  role: string
  location: string
  city: string
  lat: number
  lng: number
  description: string
  href: string
  image: string
  imageAlt: string
  tags: ProjectTag[]
  keywords: readonly ProjectKeyword[]
  /** When true, the globe card uses a full-bleed hero image as the background. */
  heroBackgroundCard?: boolean
  /** Letterbox color behind the contained project image. */
  heroImageBackground?: string
  /** Grey globe pin and preview card without a case study link. */
  comingSoon?: boolean
}

export const projectKeywords: readonly ProjectKeyword[] = [
  'Personas',
  'User flows',
  'Competitive audit',
  'Usability testing',
  'Wireframes',
  'Prototyping',
  'Field research',
  'Interviews & surveys',
  'Information architecture',
  'Journey mapping',
  'Accessibility',
  'A/B testing',
  'Secondary research',
  'Benchmarking',
]

export function isProjectKeyword(value: string): value is ProjectKeyword {
  return (projectKeywords as readonly string[]).includes(value)
}

/** Filter pills grouped for the Projects page filter bar. */
export type ProjectFilterGroup =
  | {
      id: string
      label: string
      kind: 'tag'
      items: readonly ProjectTag[]
    }
  | {
      id: string
      label: string
      kind: 'keyword'
      items: readonly ProjectKeyword[]
    }

export const projectFilterGroups: readonly ProjectFilterGroup[] = [
  { id: 'discipline', label: 'Discipline', kind: 'tag', items: ['Design', 'Research'] },
  { id: 'platform', label: 'Platform', kind: 'tag', items: ['Mobile', 'Web'] },
  {
    id: 'context',
    label: 'Project context',
    kind: 'tag',
    items: ['AI', 'AR', 'Start-up', 'Hack-a-thon', 'Non-profit'],
  },
  { id: 'keywords', label: 'Keywords', kind: 'keyword', items: projectKeywords },
]

/** Tags in the Project context group — multi-select on the Projects filter bar. */
export const projectContextTags: readonly ProjectTag[] = [
  'AI',
  'AR',
  'Start-up',
  'Hack-a-thon',
  'Non-profit',
]

export function isProjectContextTag(value: string): value is ProjectTag {
  return (projectContextTags as readonly string[]).includes(value)
}

export const projectFilterTags: ProjectTag[] = projectFilterGroups.flatMap((group) =>
  group.kind === 'tag' ? [...group.items] : [],
)

export function isProjectTag(value: string): value is ProjectTag {
  return (projectFilterTags as readonly string[]).includes(value)
}

/** Shown in filters but omitted from project postcards to keep one tag row. */
export const postcardHiddenTags: readonly ProjectTag[] = ['Hack-a-thon']

export function getPostcardVisibleTags(tags: readonly ProjectTag[]): ProjectTag[] {
  return tags.filter((tag) => !postcardHiddenTags.includes(tag))
}

export const portraitSrc = '/images/oey-portrait.png'
export const portraitBackSrc = '/images/oey-portrait-back.png'

import { globePinCoordinates } from '../lib/globePinLayout'

/** Globe pin coords — spread across continents (see globePinLayout.ts) */
export const featuredProjects: Project[] = [
  {
    id: 'uw-oris',
    title: 'UW ORIS',
    role: 'UX Designer',
    location: 'USA',
    city: 'Seattle',
    lat: globePinCoordinates['uw-oris'].lat,
    lng: globePinCoordinates['uw-oris'].lng,
    description:
      'Master capstone project streamlining research award budgeting for grant managers at the University of Washington.',
    href: '/projects/uw-oris',
    image: '/images/uw-oris-case-study.png',
    imageAlt: 'SAGE Smart Budgeting capstone for UW Office of Research Information Services',
    tags: ['Design', 'Research', 'Web', 'AI'],
    keywords: [
      'Interviews & surveys',
      'User flows',
      'Usability testing',
      'Wireframes',
      'Prototyping',
      'Secondary research',
      'Information architecture',
    ],
    heroImageBackground: '#f4f4f6',
  },
  {
    id: 'cue',
    title: 'Cue',
    role: 'UX Designer',
    location: 'USA',
    city: 'Seattle',
    lat: globePinCoordinates.cue.lat,
    lng: globePinCoordinates.cue.lng,
    description:
      'A social coaching companion that makes the invisible emotional language of shared spaces legible — for those who need it most.',
    href: '/projects/cue',
    image: '/images/cue-case-study.png',
    imageAlt:
      'Cue social coaching companion AR interface with live engagement insights and profile screen',
    tags: ['Design', 'Mobile', 'AI', 'AR', 'Hack-a-thon'],
    keywords: [
      'User flows',
      'Prototyping',
      'Usability testing',
      'Information architecture',
    ],
    heroBackgroundCard: true,
    heroImageBackground: '#0a0a12',
  },
  {
    id: 'coplan',
    title: 'Co-plan',
    role: 'UX Designer',
    location: 'USA',
    city: 'Seattle',
    lat: globePinCoordinates.coplan.lat,
    lng: globePinCoordinates.coplan.lng,
    description:
      'All in one web planning tool for University students to help plan & organize their college courses as well as keep track of the degree progress.',
    href: '/projects/coplan',
    image: '/images/coplan-case-study.png',
    imageAlt: 'Co-plan logo and laptop mockup showing the degree planning interface',
    tags: ['Design', 'Web', 'AI', 'Hack-a-thon'],
    keywords: [
      'Competitive audit',
      'Interviews & surveys',
      'Personas',
      'User flows',
      'Journey mapping',
      'Wireframes',
      'Prototyping',
    ],
    heroBackgroundCard: true,
    heroImageBackground: '#ffffff',
  },
  {
    id: 'sushitalk',
    title: 'SushiTalk',
    role: 'UX Designer',
    location: 'Japan',
    city: 'Tokyo',
    lat: globePinCoordinates.sushitalk.lat,
    lng: globePinCoordinates.sushitalk.lng,
    description:
      'A platform for native Japanese tutors to host their business and learners to connect with tutors on their journey to learn Japanese.',
    href: '/projects/sushitalk',
    image: '/images/sushitalk-case-study.png',
    imageAlt: 'SushiTalk kawaii salmon nigiri mascot logo',
    tags: ['Design', 'Mobile', 'Start-up'],
    keywords: [
      'Competitive audit',
      'Personas',
      'User flows',
      'Wireframes',
      'Prototyping',
      'A/B testing',
      'Usability testing',
    ],
    heroBackgroundCard: true,
    heroImageBackground: '#f5f0e8',
  },
  {
    id: 'wa211',
    title: 'Washington 211',
    role: 'Research',
    location: 'France',
    city: 'Paris',
    lat: globePinCoordinates.wa211.lat,
    lng: globePinCoordinates.wa211.lng,
    description:
      'A corporate usability research project with Washington 211 stakeholders on improving accessibility of the search feature on the WA 211 website.',
    href: '/projects/wa211',
    image: '/images/wa211-case-study.png',
    imageAlt:
      'Washington 211 community hands with blue 2-1-1 speech bubble logo',
    tags: ['Research', 'Non-profit'],
    keywords: [
      'Usability testing',
      'Interviews & surveys',
      'Benchmarking',
      'Accessibility',
    ],
    heroBackgroundCard: true,
    heroImageBackground: '#2a2a2a',
  },
  {
    id: 'citbridge',
    title: 'Citibridge',
    role: 'UX Designer',
    location: 'USA',
    city: 'Seattle',
    lat: globePinCoordinates.citbridge.lat,
    lng: globePinCoordinates.citbridge.lng,
    description:
      'A communication app bridging city municipalities and residents on reporting civic issues — built at the 2025 Protothon design sprint.',
    href: '/projects/citibridge',
    image: '/images/citbridge-case-study.png',
    imageAlt:
      'CitiBridge logo with civic action tagline and mobile app mockup showing Seattle community reports',
    tags: ['Design', 'Web', 'Hack-a-thon'],
    keywords: [
      'Competitive audit',
      'Secondary research',
      'Information architecture',
      'Prototyping',
    ],
    heroBackgroundCard: true,
    heroImageBackground: '#eef1f0',
  },
  {
    id: 'competition-king',
    title: 'Competition King',
    role: 'Research',
    location: 'USA',
    city: 'Seattle',
    lat: globePinCoordinates['competition-king'].lat,
    lng: globePinCoordinates['competition-king'].lng,
    description:
      'An all-in-one app for organizing Wushu competitions — registration, live schedules, judging workflows, and results for hosts and attendees.',
    href: '/projects/competition-king',
    image: '/images/competition-king-case-study.png',
    imageAlt:
      'Group photo at the Seattle International Wushu Festival with participants and organizers in a gymnasium',
    tags: ['Research', 'Web'],
    keywords: [
      'Interviews & surveys',
      'Competitive audit',
      'Personas',
      'User flows',
      'Wireframes',
      'Prototyping',
      'Field research',
    ],
    heroBackgroundCard: true,
    heroImageBackground: '#141018',
  },
  {
    id: 'arboretum',
    title: 'Washington Park Arboretum',
    role: 'UX Designer',
    location: 'USA',
    city: 'Seattle',
    lat: globePinCoordinates.arboretum.lat,
    lng: globePinCoordinates.arboretum.lng,
    description:
      'An 8-hour DesignJam mobile app for Washington Park Arboretum — trail discovery, parking, and accessibility for anxious or first-time visitors.',
    href: '/projects/arboretum',
    image: '/images/arboretum-case-study.png',
    imageAlt:
      'Washington Park Arboretum navigation app — map mockups, user flow, and accessibility research',
    tags: ['Design', 'Research', 'Hack-a-thon', 'Non-profit'],
    keywords: ['Field research', 'User flows', 'Prototyping', 'Accessibility'],
    heroBackgroundCard: true,
    heroImageBackground: '#0a0a0c',
  },
]

/** Projects shown on the home page globe (pins + preview cards). */
export const globeFeaturedProjectIds = [
  'cue',
  'wa211',
  'sushitalk',
  'coplan',
  'uw-oris',
] as const

export const globeFeaturedProjects: Project[] = globeFeaturedProjectIds
  .map((id) => featuredProjects.find((project) => project.id === id))
  .filter((project): project is Project => project != null)

export interface Service {
  number: string
  title: string
  items: string[]
  image: string
  imageAlt: string
}

export const services: Service[] = [
  {
    number: '1',
    title: 'UX Design',
    items: [
      'Wireframing and prototyping',
      'Human-centered multi-platform design',
      'Interactive design and animation',
      'Information visualization',
    ],
    image: '/images/about-focus-design-ux.png',
    imageAlt:
      'UX design workspace with wireframes, sticky notes, user journey map, and mobile prototype sketches',
  },
  {
    number: '2',
    title: 'Research',
    items: [
      'Usability testing and user feedback analysis',
      'Stakeholder interviews and synthesis',
      'Infographics and data visualization',
      'Custom illustrations and icons',
    ],
    image:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80',
    imageAlt: 'Research dashboard with charts and analytics',
  },
  {
    number: '3',
    title: 'Localization',
    items: [
      'Responsive website design',
      'Landing page design and optimization',
      'Webflow development and customization',
      'Website maintenance and updates',
    ],
    image: '/images/services-localization-multilingual.png',
    imageAlt:
      'Multilingual UI samples showing the same message in English, Japanese, Korean, Arabic, and Chinese scripts',
  },
]

export const testimonials = [
  {
    quote:
      'Oey created and ran the best competition from the back-end ever in the past 10 years.',
    name: 'Tianyuan Li',
    role: 'Local Business Owner',
  },
  {
    quote:
      'Really blown away with what you and team were able to make within 11 weeks. Totally sped up our timeline for our startup. Thank you for the amazing work',
    name: 'T. Kimura',
    role: 'Software Engineer @ Google',
  },
  {
    quote:
      'Wow, this report just became one of the top three most important documents in my entire file system. We typically don\'t have resources for studies of this depth in our little company.',
    name: 'Washington 211 Stakeholder',
    role: 'Corporate Partner',
  },
]
