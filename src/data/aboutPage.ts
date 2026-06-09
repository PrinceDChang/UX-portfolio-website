export type AboutFocusId = 'design' | 'photography' | 'wushu'

export interface AboutFocus {
  id: AboutFocusId
  index: string
  title: string
  tagline: string
  accent: string
  accentMuted: string
  image: string
  imageAlt: string
  paragraphs: string[]
  highlights: string[]
  cta?: {
    label: string
    href?: string
    external?: boolean
    comingSoon?: boolean
    wushuTransition?: boolean
    photographyTransition?: boolean
  }
}

export const aboutIntroPortrait = '/images/about-intro-portrait.png'

export const aboutIntro = {
  label: 'About Oey',
  headline: 'Three disciplines,\none point of view.',
  lead: "I'm Oey Chang — a UX designer and researcher shaped by international consulting, a love of globalization and localization, and a life built around craft, movement, and the camera.",
  sub: 'Graduated with a Master Degree in Human-Centered Design & Engineering at the University of Washington Seattle June 2026. I bring the same curiosity to pixels, prints, and the training grounds.',
}

export const aboutStats = [
  { label: 'Years of Experience', value: '3+' },
  { label: 'Completed Projects', value: '12+' },
  { label: 'Languages', value: '4' },
  { label: 'Cities lived', value: '5+' },
]

export const aboutFocuses: AboutFocus[] = [
  {
    id: 'design',
    index: '01',
    title: 'Design',
    tagline: 'Systems for people, not just screens.',
    accent: '#9970FF',
    accentMuted: 'rgba(153, 112, 255, 0.18)',
    image: '/images/about-focus-design-ux.png',
    imageAlt: 'UX design workspace with wireframes, sticky notes, user journey map, and mobile prototype sketches',
    paragraphs: [
      'Design is how I translate ambiguity into something humane — wireframes, research synthesis, prototypes, and the small interaction details that make complex tools feel obvious.',
      'From AR coaching companions to degree-planning platforms, my work sits at the intersection of strategy and storytelling, always anchored in real user needs.',
    ],
    highlights: [
      'UX & product design',
      'Usability research',
      'Prototyping & motion',
      'Localization & global UX',
    ],
    cta: { label: 'Browse case studies', href: '/projects' },
  },
  {
    id: 'photography',
    index: '02',
    title: 'Photography',
    tagline: 'Chasing light, framing silence.',
    accent: '#9970FF',
    accentMuted: 'rgba(153, 112, 255, 0.18)',
    image: '/images/about-photography.png',
    imageAlt:
      'Oey Chang photographing a golden-hour sunset over water with a DSLR camera, mountains on the horizon',
    paragraphs: [
      'Photography slows me down. It trains the same eye I use in UX — composition, contrast, and what to leave out of the frame so the subject can breathe.',
      'Whether documenting street scenes, travel, or quiet domestic moments, I shoot to preserve texture and emotion, not just documentation.',
    ],
    highlights: [
      'Street & travel',
      'Portrait & lifestyle',
      'Color & composition',
      'Visual storytelling',
    ],
    cta: { label: 'Open the gallery', photographyTransition: true },
  },
  {
    id: 'wushu',
    index: '03',
    title: 'Wushu',
    tagline: 'Discipline in motion.',
    accent: '#9970FF',
    accentMuted: 'rgba(153, 112, 255, 0.18)',
    image: '/images/oey-portrait-back.png',
    imageAlt: 'Oey Chang performing martial arts in wushu training',
    paragraphs: [
      'Wushu is my counterbalance to screen time — form, power, and breath woven into repeatable practice. It keeps my body honest and my mind present.',
      'The same persistence I bring to design shows up on the floor: refine the basics, respect the craft, and show up even when progress feels invisible.',
    ],
    highlights: [
      'Forms & fundamentals',
      'Strength & flexibility',
      'Focus & breathwork',
      'Community & coaching',
    ],
    cta: { label: 'Enter the hall', href: '/wushu', wushuTransition: true },
  },
]
