export const competitionKingCaseStudyMeta = {
  role: 'UX Research',
  title: 'Competition King',
  tagline:
    'Competition King is an all-in-one app for every stage of organizing a Wushu (Chinese martial arts) competition — helping hosts manage the full event lifecycle without paper and manual errors.',
  heroImage: '/images/competition-king-case-study.png',
  heroImageAlt:
    'Group photo at the Seattle International Wushu Festival with participants and organizers in a gymnasium',
  projectLabel: 'Sports · 9-week capstone',
  details: [
    { label: 'Role', value: 'UX Research · Project Management' },
    { label: 'Industry', value: 'Sports' },
    { label: 'Team', value: '1 researcher · 1 designer · 2 engineers' },
    { label: 'Duration', value: '9 weeks' },
  ],
} as const

export const competitionKingSections = {
  problem: {
    label: 'Problem',
    body: 'Hosting and organizing a competition is difficult to manage with so many moving parts and people involved. When everything is done manually on paper, human error creates issues while running the event.',
  },
  researchQuestion: {
    label: 'Research question',
    statement:
      'How can we create a system that allows hosts of these events to offer a seamless experience for all parties?',
  },
  solution: {
    label: 'Solution',
    subtitle: 'One hub for the full competition lifecycle.',
    body: 'Competition King establishes a central hub — a centralized repository that gives hosts, judges, staff, competitors, and spectators easy access to the information they need before, during, and after an event.',
    pillars: [
      {
        title: 'Centralized information',
        icon: '📋',
        body: 'Store, organize, and share competition details in one place instead of scattered spreadsheets and paper.',
      },
      {
        title: 'Live schedule',
        icon: '⏱️',
        body: 'Real-time updates for competitors and spectators — live scores and schedule adjustments as the event unfolds.',
      },
      {
        title: 'Dynamic control',
        icon: '⚙️',
        body: 'Judges and staff can adjust rosters, relocate events, and manage competitors in real time from the floor.',
      },
    ],
  },
  results: [
    { value: '28%', label: 'Increase in participation' },
    { value: '2×', label: 'Time improvement' },
    { value: '86%', label: 'User satisfaction' },
  ],
  process: {
    title: 'The process',
    introLabel: 'Research',
    intro:
      'Without a centralized platform to store and organize competition information, hosts face inefficiencies, potential errors, and friction when executing events. We ran surveys, competitive audits, and persona work before moving into flows and design.',
    steps: [
      {
        number: '01',
        title: 'User survey',
        body: 'Conducted a survey with four individuals across our target user spectrum. Participants wanted a central location to access all necessary information and inputs throughout the event.',
        image: '/images/competition-king-user-survey.png',
        imageAlt:
          'Interview transcript with a competitor discussing wushu event experiences, registration needs, and pain points',
      },
      {
        number: '02',
        title: 'Competitive audit',
        body: 'Reviewed how existing tools handle registration, scheduling, and scoring — identifying gaps where paper workflows and fragmented apps still dominate local martial arts events.',
        image: '/images/competition-king-competitive-audit.png',
        imageAlt:
          'Competitive audit workspace comparing tournament registration, scheduling, and scoring tools with sticky-note insights',
      },
      {
        number: '03',
        title: 'Persona',
        body: 'Visualized target user groups — hosts, judges, staff, competitors, and spectators — to align the team on goals, constraints, and moments of highest friction.',
        image: '/images/competition-king-personas.png',
        imageAlt:
          'Four Competition King personas — admin, coach, competitor, and spectator — with goals, frustrations, and bios',
      },
    ],
    userFlow: {
      title: 'User flow',
      body: 'After mapping user groups, I created multiple flows to explore how each role would navigate the platform — from registration and check-in to live scoring and post-event results.',
      images: [
        {
          src: '/images/competition-king-flow-admin.png',
          alt: 'Admin user journey flowchart from event creation through competition day live scoring',
          caption: 'Admin user journey',
        },
        {
          src: '/images/competition-king-flow-competitor.png',
          alt: 'Competitor user journey from event registration through payment to personal and overall schedules',
          caption: 'Competitor user journey',
        },
        {
          src: '/images/competition-king-flow-spectator-coach.png',
          alt: 'Spectator and coach user journey from competition website to overview and events',
          caption: 'Spectator / coach user journey',
        },
      ],
    },
    designTimeline: [
      {
        number: '01',
        title: 'Sketch',
        body: 'Began with sketching core concepts, laying the foundation for layout, hierarchy, and where live schedule and staff controls would live.',
        slides: [
          {
            src: '/images/competition-king-sketch-mockup-1.png',
            alt: 'Sketches of home page, competition builder, preview editor, and share link generator flows',
          },
          {
            src: '/images/competition-king-sketch-mockup-2.png',
            alt: 'Sketches of admin dashboard, live ring monitor view, judge scoring, and athlete schedule screens',
          },
        ],
      },
      {
        number: '02',
        title: 'Wireframe',
        body: 'Translated sketches into wireframes — furthering the structural framework of the interface, user flow, and information hierarchy.',
        slides: [
          {
            src: '/images/competition-king-wireframes.png',
            alt: 'Low-fidelity wireframes for landing page, registration flow, management dashboards, judge interfaces, and results',
          },
        ],
      },
      {
        number: '03',
        title: 'Hi-fi prototyping',
        body: 'Evolved mockups into a high-fidelity prototype with interactive elements and components to hand off to engineers.',
        slides: [
          {
            src: '/images/competition-king-hifi-overview.png',
            alt: 'High-fidelity desktop and mobile screens for event management, scheduling, and judge scoring',
          },
          {
            src: '/images/competition-king-hifi-event-info.png',
            alt: 'Event Information screen for Seattle International Martial Arts Championship',
          },
          {
            src: '/images/competition-king-hifi-schedule.png',
            alt: 'Live schedule view with ring columns, currently going, and up next events',
          },
          {
            src: '/images/competition-king-hifi-results.png',
            alt: 'Finished event results and grand champion rankings across competition rings',
          },
        ],
      },
    ],
  },
  realWorldTesting: {
    label: 'Real-world testing',
    title: '9th Seattle Martial Arts Competition',
    date: 'July 30, 2023',
    poster: '/images/competition-king-event-poster.png',
    posterAlt:
      '9th Seattle International Martial Arts Championship poster — July 30, 2023 at Metropolitan Gym, Kent WA',
    body: 'We tested at our local martial arts competition as the deadline for field research approached. We narrowed focus to two features for feedback:',
    features: [
      {
        title: 'Live schedule',
        body: 'Providing competitors and spectators with real-time updates — live scores and schedule adjustments as events progressed.',
      },
      {
        title: 'Dynamic control (judges & staff)',
        body: 'Equipping judges and staff with real-time adjustments — adding or removing competitors, relocating events, and updating rosters on the floor.',
      },
    ],
    bullets: [
      'Provided a unique opportunity to run a live testing session with real attendees.',
      'Gave us real-world feedback to quantify and qualify data for future improvements.',
    ],
    fieldGalleryTitle: 'Field testing gallery',
    fieldGalleryIntro:
      'Photos from the 9th Seattle Martial Arts Competition — how hosts, staff, and competitors moved through a live event while we validated live schedule and floor controls.',
    fieldWorkPhotos: [
      {
        src: '/images/competition-king-field-checkin.png',
        alt: 'Families and competitors queued in a hallway lined with trophies at check-in',
        caption:
          'Check-in and registration — crowded hallways, manual queues, and how families orient before events start.',
      },
      {
        src: '/images/competition-king-field-scoring-desk.png',
        alt: 'Staff at a scoring table with a laptop spreadsheet and numbered competitor cards',
        caption:
          'Behind the scoring table — spreadsheets and numbered cards still carry much of the event workflow.',
      },
      {
        src: '/images/competition-king-field-live-testing.png',
        alt: 'Researchers at a table with laptops and paper scorecards in a gymnastics gym',
        caption:
          'Live testing our prototype alongside paper scorecards during the Seattle International Martial Arts Championship.',
      },
      {
        src: '/images/competition-king-field-announcer.png',
        alt: 'Announcer with a microphone on blue competition mats in a gymnasium',
        caption:
          'On the competition floor — coordinating rings and schedule updates over a busy mat space.',
      },
      {
        src: '/images/competition-king-field-group-photo.png',
        alt: 'Large group photo in front of the Seattle International Wushu Festival banner',
        caption:
          'Team and participants after field testing at the Seattle International Wushu Festival — July 30, 2023.',
      },
    ],
    quote: {
      text: 'Best run competition I have even done for the past 9 years of hosting.',
      attribution: 'Tianyuan Li',
      role: 'Owner & Competition Host · Northwest Wushu',
    },
  },
  featuresIntro:
    'Two surfaces we validated in the field became the backbone of the product direction — keeping everyone aligned while the event is in motion.',
  featuresSidebarTitle: 'Core features',
  features: [
    {
      title: 'Live schedule',
      headline: 'Scores and timing in real time',
      icon: '📅',
      description:
        'Competitors and spectators see live scores and schedule changes without chasing paper brackets or verbal updates.',
    },
    {
      title: 'Dynamic control',
      headline: 'Staff tools on the floor',
      icon: '🥋',
      description:
        'Judges and staff adjust rosters, relocate events, and manage competitors during the competition from one control surface.',
    },
    {
      title: 'Central hub',
      headline: 'One source of truth',
      icon: '🏠',
      description:
        'Hosts publish registration, brackets, and results in a single repository every role can trust.',
    },
  ],
  lessonsLearned: [
    {
      title: 'Alignment & communication',
      body: 'Ensuring shared understanding between researchers, designers, and engineers — with consistent updates and recurring check-ins so everyone stayed on the same page.',
    },
    {
      title: 'Efficient timeline management',
      body: 'Strategic organization of deadlines and short-term milestones kept a nine-week project moving without last-minute gaps.',
    },
    {
      title: 'Clarity for developers',
      body: 'Comprehensive notes and a refined prototype made the handoff smoother — better collaboration between design and engineering.',
    },
  ],
  conclusion: {
    lead: 'Undertaking project management and research on Competition King was a chance to ship research into a live event — and learn what it takes to coordinate a cross-functional team under real deadlines.',
    insights: [
      'Field testing at the 9th Seattle Martial Arts Competition validated live schedule and dynamic control with host feedback.',
      'A centralized hub addresses the root cause: scattered paper workflows and no single source of truth during events.',
    ],
    nextSteps: {
      label: "What's next",
      items: [
        'Continue observation and gather more user feedback.',
        'Proceed to Phase 2: update designs and adjust features.',
        'Explore expansion or condensation of features.',
        'Phase 3: extend the platform to other sports (swimming, karate, gymnastics, etc.).',
      ],
    },
  },
} as const
