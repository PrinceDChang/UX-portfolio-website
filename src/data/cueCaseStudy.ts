export const cueCaseStudyMeta = {
  role: 'UX Designer',
  title: 'Cue',
  logo: '/images/cue-logo.png',
  logoAlt: 'Cue wordmark with signal icon and owl mascot',
  tagline:
    'A social coaching companion that makes the invisible emotional language of shared spaces legible — for those who need it most.',
  heroImage: '/images/cue-case-study.png',
  heroImageAlt:
    'Cue AR social coaching interface with engagement insights and companion app profile',
  figbuild: 'FigBuild 2026',
  impactSummary:
    'Able to provide useful data feedback on incorporation AI tools into design process',
  details: [
    { label: 'Role', value: 'UX Designer' },
    { label: 'Tools', value: 'Figma, Figma Make' },
    { label: 'Team', value: '4 members' },
    { label: 'Duration', value: '48 hours' },
  ],
  externalLinks: {
    arPrototype: 'https://aspect-elbow-23441285.figma.site',
    companionApp: 'https://final-cue-app.figma.site',
    presentation:
      'https://www.figma.com/deck/YmTxf3o72FB87hu9vG8gUV/FigBuild-2026?node-id=1-1118&viewport=-109%2C-29%2C0.52&t=zyZuxRwyzoirqHjT-1&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1',
  },
} as const

export const cueSections = {
  hook: {
    label: 'What if you could see the unspoken?',
    body: `For many neurodivergent and socially anxious individuals, walking into a crowded room feels like reading a book in a language you never learned. The emotional signals — tone, body language, eye contact — are all there, but they move too fast to decode.

Cue was born from a simple question: what if technology could slow those signals down, translate them, and give you the confidence to engage on your own terms?`,
  },
  challenge: {
    label: 'The challenge',
    body: `Design a tool that tracks, measures, visualizes, or quantifies an aspect of human sensory experience — and provide the ability to detect, enhance, or manipulate those same sensory inputs.`,
    problemStatement: `How might we make the invisible emotional field of shared spaces legible in real time, so that highly sensitive and neurodivergent individuals can navigate social environments with clarity and intention rather than overwhelm and avoidance?`,
  },
  solution: {
    label: 'Solution',
    subtitle: 'Not a social scoring app. A private mirror.',
    body: `Cue is a social coaching companion paired with smart glasses. It observes social interactions in real time — detecting body language, emotional temperature, eye contact patterns, and conversational engagement — and translates these invisible signals into calm, plain-language guidance delivered through a heads-up display.

After every interaction, Cue helps users reflect on what happened, what worked, and what to try differently. Over time, it builds a personalised coaching program rooted in the user's own patterns, helping them develop genuine social confidence rather than just coping strategies.`,
    pillars: [
      {
        title: 'AR Smart Glasses',
        icon: '🕶️',
        body: `Real-time emotional aura visualization, social cue detection, and AI-powered conversation coaching — all through an unobtrusive heads-up display.`,
      },
      {
        title: 'Companion App',
        icon: '📱',
        body: `Post-session reflection, weekly social energy reports, mood heat maps, profile management, and a personalized coaching program that grows with the user.`,
      },
    ],
  },
  ethics: {
    label: 'The solution',
    headline: 'Not a social scoring app. A private mirror.',
    body: `Cue is a social coaching companion paired with smart glasses. It observes social interactions in real time — detecting body language, emotional temperature, eye contact patterns, and conversational engagement — and translates these invisible signals into calm, plain-language guidance delivered through a heads-up display.

After every interaction, Cue helps users reflect on what happened, what worked, and what to try differently. Over time, it builds a personalised coaching program rooted in the user's own patterns, helping them develop genuine social confidence rather than just coping strategies.`,
  },
  finalDesign: {
    label: 'Final design',
    body: `Within 48 hours, we built a working prototype of the companion app for Cue as well as the AR layout of the vision display inside Figma Make.`,
    deliverables: [
      {
        title: 'Cue companion app',
        caption: 'Post-session reflection, energy tracking, and coaching',
        embedUrl: 'https://final-cue-app.figma.site',
        embedFrame: { width: 390, height: 844 },
        embedLayout: 'phone' as const,
      },
      {
        title: 'Cue AR overlay',
        caption: 'Real-time social cues and calm guidance in view',
        embedUrl: 'https://aspect-elbow-23441285.figma.site',
        embedFrame: { width: 1280, height: 800 },
      },
    ],
  },
  process: {
    label: 'Design process',
    steps: [
      {
        number: '01',
        title: 'Research & Empathy',
        body: `We audited social coaching tools, AR wearables, and accessibility patterns to understand where real-time emotional legibility breaks down — and where post-session reflection already helps users grow.`,
      },
      {
        number: '02',
        title: 'Ideation & User Flows',
        body: `We mapped moments that needed AR support versus companion-app reflection, keeping the experience calm and opt-in rather than omnipresent.`,
      },
      {
        number: '03',
        title: 'Storyboarding',
        body: `The use case storyboard mapped the full journey — from approaching a venue to initiating a real conversation — clarifying which moments benefited from an interface and which were best left alone.`,
      },
      {
        number: '04',
        title: 'Prototyping & Testing',
        body: `Rapid low-fidelity exploration of profile structure, energy signals, interest tags, and filters — paired with ethical edge-case mapping before high-fidelity build.`,
      },
    ],
    artifacts: [
      {
        title: 'Use Case Storyboard',
        body: `Mapping the journey helped us identify which moments needed AR support, which needed the companion app, and which were best left alone. Not every moment benefits from an interface.`,
        image: '/images/cue-use-case-storyboard.png',
        imageAlt:
          'Eight-panel storyboard from bar exterior through AR aura filtering, target lock on Alex, AI conversation starters, to connection initiated',
      },
      {
        title: 'Early Sketches & Information Architecture',
        body: `We explored profile structure — introvert/extrovert scale, toggleable energy bar, interest tags — alongside filters for the kinds of connections someone is open to in a given moment. Information architecture kept the system coherent under time pressure.`,
        cards: [
          {
            src: '/images/cue-sketch-storyboard-panels.png',
            alt: 'Hand-drawn seven-panel storyboard from venue approach through conversation start',
            caption: 'Journey storyboard — AR moments vs. companion-app reflection',
          },
          {
            src: '/images/cue-sketch-profile-ia.png',
            alt: 'Sketches of aura view, profile preview, and public profile filter notes',
            caption: 'Profile structure, energy signals, and filter criteria',
          },
          {
            src: '/images/cue-ethics-board.png',
            alt: 'Workshop board with sticky notes on edge cases, negative consequences, and safeguards',
            caption: 'Ethics mapping — edge cases, risks, and safeguards (team workshop)',
          },
        ],
      },
    ],
  },
  featuresSidebarTitle:
    'Six capabilities for calmer, clearer social moments.',
  featuresIntro:
    'Explore how Cue supports energy tracking, preparation, in-the-moment guidance, and reflection — without turning connection into a scoreboard.',
  features: [
    {
      title: 'Social energy meter',
      headline: 'Track your battery',
      icon: '🔋',
      description:
        'Track your social battery in real time with percentage-based energy levels and smart alerts before burnout.',
    },
    {
      title: 'Calendar integration',
      headline: 'Plan with context',
      icon: '📅',
      description:
        'Sync with your calendar to prepare for upcoming social events with pre-session coaching and energy planning.',
    },
    {
      title: 'Social cue detector',
      headline: 'Read the room',
      icon: '👁️',
      description:
        'Real-time detection of body language, eye contact patterns, and conversational engagement through AR overlay.',
    },
    {
      title: 'Mood heat map',
      headline: 'See the temperature',
      icon: '🌡️',
      description:
        'Color-coded emotional auras that make the invisible emotional temperature of a space visible at a glance.',
    },
    {
      title: 'Weekly reports',
      headline: 'Reflect and grow',
      icon: '📊',
      description:
        'In-app summaries of social interactions, patterns, and personalized coaching insights delivered weekly.',
    },
    {
      title: 'People blur',
      headline: 'Focus without overload',
      icon: '✨',
      description:
        'Optional visual filter that reduces visual overwhelm by softening peripheral people, letting you focus on who matters.',
    },
  ],
  videoPrototype: {
    youtubeId: 'UABzhsCuPEk',
    title: 'Cue video prototype — real-time social coaching',
    footerLabel: 'Video prototype',
  },
  prototypes: [
    {
      title: 'AR / wearable prototype',
      description: 'Figma Make — animated AR feature enhancements and heads-up overlay',
      href: 'https://aspect-elbow-23441285.figma.site',
      emoji: '🕶️',
    },
    {
      title: 'Mobile app prototype',
      description: 'Figma Make — Cue companion app from onboarding to weekly coaching',
      href: 'https://final-cue-app.figma.site',
      emoji: '📱',
    },
    {
      title: 'Final presentation',
      description: 'FigBuild 2026 design-a-thon pitch to judges',
      href: 'https://www.figma.com/deck/YmTxf3o72FB87hu9vG8gUV/FigBuild-2026?node-id=1-1118&viewport=-109%2C-29%2C0.52&t=zyZuxRwyzoirqHjT-1&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1',
      emoji: '🔗',
    },
  ],
  reflection: [
    {
      title: 'Ethics-first design',
      body: `Designing for emotional sensing forced us to confront questions about consent, surveillance, and stigmatization before we wrote a single user story. The safeguards weren't constraints — they shaped better features.`,
    },
    {
      title: 'Rapid collaboration',
      body: `Working with two researchers and another designer under extreme time pressure taught me to trust distributed expertise. Our best ideas came from cross-pollinating research insights with design intuition.`,
    },
    {
      title: 'Designing for vulnerability',
      body: `Our users aren't power users optimizing for productivity. They're people navigating situations that feel genuinely threatening. That changed everything — from tone of voice in the UI to how we framed feedback as growth, never failure.`,
    },
  ],
} as const
