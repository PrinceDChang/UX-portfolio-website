export const sushitalkCaseStudyMeta = {
  role: 'UX Designer',
  title: 'SushiTalk',
  logo: '/images/sushitalk-wordmark.png',
  logoWidth: 740,
  logoHeight: 132,
  logoAlt: 'SushiTalk wordmark',
  tagline:
    'A passion project with a Software Engineer from Google in Tokyo — a platform for native Japanese tutors to host their business and learners to find the right match on their journey to learn Japanese.',
  heroImage: '/images/sushitalk-case-study.png',
  heroImageAlt: 'SushiTalk brand and product screens for the tutor marketplace',
  projectLabel: 'Passion project · Tokyo',
  details: [
    { label: 'Role', value: 'UX Designer · Usability Researcher' },
    { label: 'Industry', value: 'EdTech · Marketplace' },
    { label: 'Team', value: '4 HCDE students' },
    {
      label: 'Duration',
      value: 'Phase 1: 8 weeks\nPhase 2: 2 months',
    },
  ],
} as const

export const sushitalkSections = {
  hook: {
    label: 'Learning Japanese deserves a better match',
    body: `Finding a tutor online often means hitting paywalls before you understand the product, scrolling endless listings without strong filters, or juggling tools that were never designed for how learners actually compare teaching styles.

SushiTalk started as a collaboration with a Google engineer in Tokyo who wanted a marketplace that respects both tutors building a business and learners trying to find the right fit — without locking discovery behind a subscription.`,
  },
  challenge: {
    label: 'The challenge',
    body: `We had eight weeks and a distributed student team to define stage-one of a two-sided marketplace. Competing products showed what not to do: critical features behind paywalls, weak browse experiences, and search that made it hard to compare tutors fairly.`,
    problemStatement: `How might we help Japanese learners discover and connect with native tutors through an intuitive marketplace — with free browsing, transparent profiles, and powerful search that does not gate core value behind a paywall?`,
  },
  goals: [
    'Avoid blocking important features behind a paywall.',
    'Allow free browsing of tutor profiles before commitment.',
    'Ship an intuitive, powerful advanced filter for tutor search.',
    'Deliver three of five priority screens in a testable hi-fi prototype.',
  ],
  researchQuestions: [
    'What do learners expect when comparing Japanese tutors online?',
    'Where do existing tutor platforms create friction — paywalls, search, or profile depth?',
    'Which filters and profile details most influence whether a learner reaches out to a tutor?',
  ],
  solution: {
    label: 'Solution',
    subtitle: 'Browse first. Commit when it feels right.',
    body: `SushiTalk centers discovery: learners can explore tutors, compare teaching focus and availability, and use advanced filters before signing up for premium flows. Tutors get a place to present their business clearly — not buried behind opaque navigation.

We scoped stage one around the highest-priority flows the founder needed to validate with users and investors.

Stage two then leading to expansion of adding additional functionality toward giving users assistance with topics outside of language (i.e. help with moving into Japan, healthcare, etc.).`,
    pillars: [
      {
        title: 'Open discovery',
        icon: '🔍',
        body: `Free browsing of tutor listings and profiles so learners can understand the marketplace before creating an account or hitting a paywall.`,
      },
      {
        title: 'Advanced search',
        icon: '⚡',
        body: `Filter by teaching style, availability, price band, and specialty — designed to feel powerful without overwhelming first-time visitors.`,
      },
    ],
  },
  finalDesign: {
    label: 'Final design',
    body: `After eight weeks, the team completed a working prototype of the web platform for stage one of SushiTalk’s design goals — covering the core tutor-discovery and profile flows the founder prioritized for validation.`,
    ongoingNote: 'Design is still ongoing — launching soon.',
    prototype: {
      title: 'SushiTalk interactive prototype',
      embedUrl: '/sushitalk-prototype.html',
      openUrl: '/sushitalk-prototype.html',
    },
  },
  testimonial: {
    quote: `Really blown away with what you and team were able to make within 11 weeks. Totally sped up our timeline for our startup. Thank you for the amazing work`,
    name: 'Kimura Takuto',
    title: 'CEO, Co-founder · SushiTalk',
  },
  process: {
    title: 'The process',
    introLabel: 'Leading the team',
    intro: `I led the team by setting a timeline, communicating design goals, and creating an agile roadmap so we could manage workload, prioritize tasks, and keep momentum through an eight-week sprint.`,
    roadmap: {
      src: '/images/sushitalk-agile-roadmap.png',
      alt: 'Agile roadmap chart titled Timeline via Features, showing phased work from research through home page, sign-up, profiles, search, and scheduling with team assignments',
    },
    steps: [
      {
        number: '01',
        title: 'Competitive audit',
        body: `As a team, we audited the tutor marketplace landscape. For SushiTalk to stand out we needed to: 1) avoid blocking important features behind a paywall, 2) allow free browsing of tutors, and 3) design an intuitive, powerful advanced filter for tutor search.`,
        image: '/images/sushitalk-competitive-audit.png',
        imageAlt:
          'Competitive audit table comparing iTalki, HelloTalk, Duolingo, ADPList, Care.com, and Taskrabbit across services, pros, cons, and opportunities',
        imageCaption:
          'Competitive audit — language platforms and adjacent marketplaces that shaped our discovery and paywall strategy',
      },
      {
        number: '02',
        title: 'Personas',
        body: `We developed personas for native Japanese tutors hosting on the platform and non-Japanese learners at different stages of their language journey — grounding priorities in real motivations, not feature wishlists.`,
        image: '/images/sushitalk-personas.png',
        imageAlt:
          'Learner personas Tom and Misty and mentor personas Reina and Takashi with goals, behaviors, and frustrations',
        imageCaption:
          'Personas — four profiles spanning professional learners, students, retired teachers, and freelance tutors',
      },
      {
        number: '03',
        title: 'User flow',
        body: `User flows mapped discovery, profile comparison, and outreach so the team agreed on the minimum path learners need before committing to a tutor.`,
        image: '/images/sushitalk-user-flow.png',
        imageAlt:
          'User flow diagram from landing page through browse, search, scheduling, sign-up, and profile setup for mentors and learners',
        imageCaption:
          'User flow — stage-one paths for discovery, onboarding, and profile creation',
      },
      {
        number: '04',
        title: 'Moodboard',
        body: `A shared moodboard aligned visual tone — friendly, trustworthy, and distinct from sterile corporate edtech — before wireframes diverged.`,
        image: '/images/sushitalk-moodboard.png',
        imageAlt:
          'Moodboard with UI references, illustrations, color palettes, and typography samples including Inter, Open Sans, DM Sans, and Noto Sans',
        imageCaption:
          'Moodboard — visual references and type exploration before wireframes',
      },
    ],
    designPhases: [
      {
        number: '01',
        title: 'Sketch',
        body: `I sketched my vision for the top four priority screens I wanted the team to help complete and design — establishing placement and feature hierarchy before hi-fi polish.`,
        slides: [
          {
            src: '/images/sushitalk-sketch-landing.png',
            alt: 'SushiTalk landing page sketch with search, filters, and featured mentors',
          },
          {
            src: '/images/sushitalk-sketch-search.png',
            alt: 'SushiTalk search results sketch with filter sidebar and tutor cards',
          },
          {
            src: '/images/sushitalk-sketch-profile.png',
            alt: 'SushiTalk tutor profile sketch with overview, resume, rates, and availability',
          },
          {
            src: '/images/sushitalk-sketch-booking.png',
            alt: 'SushiTalk booking sketch with schedule, lesson packages, and checkout',
          },
        ],
      },
      {
        number: '02',
        title: 'Wireframe',
        body: `After discussing user needs and moodboard direction, the team translated concepts into wireframes — balancing founder scope with research-backed flows.`,
        slides: [
          {
            src: '/images/sushitalk-wireframe-board.png',
            alt: 'SushiTalk wireframe board with landing explorations, sticky-note feedback, and UI style tile',
          },
          {
            src: '/images/sushitalk-wireframe-landing.png',
            alt: 'SushiTalk landing wireframe with hero, how it works, browse mentors, and testimonials',
          },
          {
            src: '/images/sushitalk-wireframe-mentor.png',
            alt: 'SushiTalk mentor-focused landing wireframe with teach-anywhere messaging and FAQ',
          },
          {
            src: '/images/sushitalk-wireframe-learner.png',
            alt: 'SushiTalk learner-focused landing wireframe with find-your-mentor search and testimonials',
          },
          {
            src: '/images/sushitalk-wireframe-style-tile.png',
            alt: 'SushiTalk UI style tile with button states, form fields, and logo concepts',
          },
        ],
      },
      {
        number: '03',
        title: 'A/B testing',
        body: `Before higher fidelity, we ran a short usability study with four potential users to see which wireframe direction resonated for search and profile layouts.`,
        slides: [
          {
            src: '/images/sushitalk-ab-find-mentor-filters-vs-search.png',
            alt: 'A/B test: Find your Mentor with filter pills versus search bar and filter icon',
          },
          {
            src: '/images/sushitalk-ab-landing-filter-pills-vs-search.png',
            alt: 'A/B test: landing page browse section with filter chips versus search-first layout',
          },
          {
            src: '/images/sushitalk-ab-landing-browse-layout.png',
            alt: 'A/B test: mentor card layout with centered photo versus compact profile with bio',
          },
          {
            src: '/images/sushitalk-ab-mentor-card-layout.png',
            alt: 'A/B test: minimalist icon-only mentor cards versus text-labeled View Profile and Book Now',
          },
          {
            src: '/images/sushitalk-ab-mentor-card-density.png',
            alt: 'A/B test: compact mentor cards versus information-rich cards with tags and bio',
          },
          {
            src: '/images/sushitalk-ab-landing-typography.png',
            alt: 'A/B test: landing page typography comparison — DM Sans versus Noto Sans',
          },
          {
            src: '/images/sushitalk-ab-hero-character-vs-mascot.png',
            alt: 'A/B test: hero illustration with character scene versus sushi mascot on cream background',
          },
        ],
      },
      {
        number: '04',
        title: 'Prototyping',
        body: `Using test insights, the team moved into hi-fi designs and prototyped key interactions for stage-one flows — preparing handoff for engineering and founder review.`,
        slides: [
          {
            src: '/images/sushitalk-hifi-signup-components.png',
            alt: 'SushiTalk hi-fi UI components for role selection, proficiency, goals, interests, and mentor qualifications',
          },
          {
            src: '/images/sushitalk-hifi-signup-flow.png',
            alt: 'SushiTalk sign-up flow wireframes for learner and mentor onboarding paths',
          },
          {
            src: '/images/sushitalk-hifi-landing-page.png',
            alt: 'SushiTalk hi-fi learner landing page with hero, mentor search, and testimonials',
          },
          {
            src: '/images/sushitalk-hifi-profile-page.png',
            alt: 'SushiTalk hi-fi tutor profile with booking, lesson pricing, stats, and availability calendar',
          },
        ],
      },
    ],
  },
  phaseTwo: {
    title: 'Phase Two',
    introLabel: 'Expanding beyond Language tutoring',
    intro: `After months of brainstorming, the stakeholder and I found a large market not only in helping people learn Japanese, but also in supporting non-Japanese learners with moving to and staying in Japan — keeping track of documentation and providing assistance where they need it.`,
    flowCaption:
      'After creating a list of topics and extra features, fed everything to Claude to generate a prototype to present to stakeholder',
    flowCta: {
      label: 'View final design',
      href: 'https://sushitalk.netlify.app',
    },
  },
  featuresSidebarTitle: 'Stage-one priorities for the marketplace.',
  featuresIntro:
    'We focused on discovery and trust first — the flows learners and tutors need before payments or messaging expand in later releases.',
  features: [
    {
      title: 'Tutor browse',
      headline: 'Explore without friction',
      icon: '🍣',
      description:
        'List and grid views let learners scan tutors freely — no account required to understand who is on the platform.',
    },
    {
      title: 'Advanced filters',
      headline: 'Find the right fit',
      icon: '🎛️',
      description:
        'Search by specialty, availability, price, and teaching style so comparison feels intentional, not endless scrolling.',
    },
    {
      title: 'Tutor profiles',
      headline: 'Trust before contact',
      icon: '👤',
      description:
        'Profiles highlight experience, approach, and logistics so learners can shortlist tutors with confidence.',
    },
    {
      title: 'Priority screens',
      headline: 'Ship what validates',
      icon: '✅',
      description:
        'We delivered three of five priority screens in hi-fi — enough for founder testing and startup timeline acceleration.',
    },
  ],
  lessonsLearned: [
    {
      title: 'What went well',
      body: `Communication with the team on deadlines and design needs. We accomplished three out of five priority screens within the sprint window.`,
    },
    {
      title: 'What needs improvement',
      body: `Stronger research process and more emphasis on testing throughout — not only at the wireframe stage.`,
    },
    {
      title: 'What I’d do differently',
      body: `Create more short-term goals to keep the team aligned and improve how I lead the group through blockers and scope creep.`,
    },
    {
      title: 'What I learned',
      body: `The importance of time management, clear team goals, and defining success metrics early with founders and engineers.`,
    },
  ],
  conclusion: {
    lead: 'SushiTalk reinforced how much a small, focused team can ship when research, agile planning, and founder partnership stay aligned — even on a passion-project timeline.',
    insights: [
      'Competitive audit insights directly shaped our no-paywall discovery strategy and filter priorities.',
      'Short-cycle usability testing before hi-fi saved rework on search and profile layouts.',
    ],
    nextSteps: {
      label: 'What’s next:',
      items: [
        'Continue hi-fi iteration toward launch with the SushiTalk founder team.',
        'Expand from three priority screens to the full five-screen stage-one roadmap.',
        'Deepen usability testing as engineering handoff begins.',
      ],
    },
  },
} as const

export const sushitalkMoreProjects = [
  {
    title: 'Co-plan',
    role: 'UX Designer',
    href: '/projects/coplan',
    description:
      'All-in-one course planning and degree progress for university students.',
    image: '/images/coplan-case-study.png',
    imageAlt: 'Co-plan laptop mockup with schedule and degree planning UI',
  },
  {
    title: 'Cue',
    role: 'UX Designer',
    href: '/projects/cue',
    description: 'Social coaching companion for FigBuild 2026.',
    image: '/images/cue-hero.png',
    imageAlt:
      'Cue AR social coaching interface with engagement insights and companion app profile',
  },
  {
    title: 'Washington 211',
    role: 'Research',
    href: '/projects/wa211',
    description: 'Usability research on WA 211 search accessibility.',
    image: '/images/wa211-case-study.png',
    imageAlt:
      'Washington 211 community hands with blue 2-1-1 speech bubble logo',
  },
] as const
