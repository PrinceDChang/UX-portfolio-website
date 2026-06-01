export type ProjectTag = 'Design' | 'Research' | 'Mobile' | 'Web'

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
  /** When true, the globe card uses a full-bleed hero image as the background. */
  heroBackgroundCard?: boolean
  /** Letterbox color behind the contained project image. */
  heroImageBackground?: string
  /** Grey globe pin and preview card without a case study link. */
  comingSoon?: boolean
}

export const projectFilterTags: ProjectTag[] = ['Design', 'Research', 'Mobile', 'Web']

export const portraitSrc = '/images/oey-portrait.png'
export const portraitBackSrc = '/images/oey-portrait-back.png'

import { globePinCoordinates } from '../lib/globePinLayout'

/** Globe pin coords — spread across continents (see globePinLayout.ts) */
export const featuredProjects: Project[] = [
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
    tags: ['Design', 'Mobile'],
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
    tags: ['Design', 'Web'],
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
    tags: ['Research', 'Mobile'],
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
    tags: ['Research'],
    heroBackgroundCard: true,
    heroImageBackground: '#2a2a2a',
  },
  {
    id: 'uw-oris',
    title: 'UW ORIS',
    role: 'Coming soon',
    location: 'USA',
    city: 'Seattle',
    lat: globePinCoordinates['uw-oris'].lat,
    lng: globePinCoordinates['uw-oris'].lng,
    description:
      'Master capstone project streamlining research award budgeting for grant managers at the University of Washington.',
    href: '',
    image: '/images/uw-oris-logo.png',
    imageAlt: 'University of Washington purple wordmark logo',
    tags: ['Design', 'Web'],
    heroImageBackground: '#ffffff',
    comingSoon: true,
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
    tags: ['Design', 'Web'],
    heroBackgroundCard: true,
    heroImageBackground: '#eef1f0',
  },
  {
    id: 'competition-king',
    title: 'Competition King',
    role: 'Coming soon',
    location: 'USA',
    city: 'Seattle',
    lat: globePinCoordinates['competition-king'].lat,
    lng: globePinCoordinates['competition-king'].lng,
    description:
      'An end-to-end platform for organizing local business competitions — registration, judging workflows, and community-facing results.',
    href: '',
    image: '/images/competition-king-case-study.svg',
    imageAlt: 'Competition King project mark',
    tags: ['Research', 'Web'],
    heroBackgroundCard: true,
    heroImageBackground: '#141018',
    comingSoon: true,
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
    tags: ['Design', 'Research'],
    heroBackgroundCard: true,
    heroImageBackground: '#0a0a0c',
  },
]

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
