export const sushitalkCaseStudyMeta = {
  role: 'UX Designer',
  title: 'SushiTalk',
  logo: '/images/sushitalk-wordmark.png',
  logoWidth: 740,
  logoHeight: 132,
  logoAlt: 'SushiTalk wordmark',
  tagline:
    'A passion project with a Software Engineer at Google Japan for a platform to help non-native Japanese learners connect with native Japanese tutors that match on their journey to not only learn Japanese, but give specialized help with moving into or staying in Japan.',
  heroImage: '/images/sushitalk-case-study.png',
  heroImageAlt:
    'SushiTalk mascot logo on a floating card beside a laptop showing the final prototype landing page',
  projectLabel: 'Passion project · Google Japan',
  impactSummary:
    "Kickstarted the startup company's business model to focus beyond just language tutoring but efforts to build a community to help immigration procedures into Japan.",
  details: [
    { label: 'Role', value: 'UX Designer · Usability Researcher' },
    { label: 'Industry', value: 'EdTech · Marketplace' },
    { label: 'Team', value: 'HCDE design team · Google Japan engineer' },
    {
      label: 'Duration',
      value: 'Phase 1: 8 weeks\nPhase 2: 2 months',
    },
  ],
} as const

export const sushitalkSections = {
  hook: {
    label: 'Language is only part of living in Japan',
    body: `For non-native Japanese learners, finding the right tutor is rarely just about grammar drills. Some are preparing for JLPT exams. Others are planning a move, navigating visas and housing, or figuring out how daily life works once they arrive. Most platforms treat every learner the same — and bury the tutors who could actually help behind paywalls and weak search.

SushiTalk began as a passion project with a software engineer at Google Japan: a platform where native tutors can host their practice and learners can find someone who matches their language goals and their life-in-Japan journey — not just their lesson budget.`,
  },
  challenge: {
    label: 'The challenge',
    body: `We had eight weeks and a distributed student team to define stage one of a two-sided marketplace — with a longer-term vision of supporting learners beyond language alone. Competing products showed what not to do: discovery locked behind paywalls, profiles that hide whether a tutor understands relocation or local life, and search that makes it hard to compare who can truly help on your journey.`,
    problemStatement: `How might we help non-native Japanese learners discover and connect with native tutors who match their language goals and their broader journey — whether learning Japanese, moving to Japan, or building a life there — through free browsing, transparent profiles, and search that does not gate core value behind a paywall?`,
  },
  goals: [
    'Help learners find tutors matched to language level, teaching style, and life-in-Japan needs.',
    'Avoid blocking important features behind a paywall.',
    'Allow free browsing of tutor profiles before commitment.',
    'Ship an intuitive, powerful advanced filter for tutor search.',
    'Deliver three of five priority screens in a testable hi-fi prototype.',
  ],
  researchQuestions: [
    'What do learners need from a tutor when language study is tied to moving to or staying in Japan?',
    'Where do existing tutor platforms create friction — paywalls, weak matching, or profiles that ignore life-in-Japan context?',
    'Which filters and profile details most influence whether a learner trusts a tutor for their specific journey?',
  ],
  solution: {
    label: 'Solution',
    subtitle: 'Match on language. Support the full journey.',
    body: `SushiTalk centers on meaningful matching: learners explore tutors, compare teaching focus, availability, and specialties — including support for relocation, daily life, and staying in Japan — before committing to premium flows. Tutors get a clear place to present what they offer beyond textbook lessons.

We scoped stage one around the discovery and profile flows the founder needed to validate with users and investors — the foundation for a platform that grows from language into specialized life-in-Japan guidance.

Stage two expands that foundation with resources and flows for documentation, healthcare, housing, and other topics learners need once language tutoring alone is not enough.`,
    pillars: [
      {
        title: 'Journey-based matching',
        icon: '🎯',
        body: `Profiles and filters surface language level, teaching style, and life-in-Japan specialties so learners connect with tutors who fit where they are — and where they are headed.`,
      },
      {
        title: 'Open discovery',
        icon: '🔍',
        body: `Free browsing of tutor listings and profiles so learners can evaluate the marketplace — and find the right match — before creating an account or hitting a paywall.`,
      },
    ],
  },
  finalDesign: {
    label: 'Final design',
    body: `After eight weeks, the team completed a working prototype of the web platform for stage one — covering tutor discovery, search, and profile flows that let learners evaluate fit on language goals and teaching approach, setting up the life-in-Japan support vision for phase two.`,
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
    intro: `I led the team by setting a timeline, communicating the product vision — tutor matching for language and life-in-Japan goals — and creating an agile roadmap so we could manage workload, prioritize stage-one flows, and keep momentum through an eight-week sprint.`,
    roadmap: {
      title: 'Timeline via Features',
      rows: [
        {
          label: 'Task: Research (Surveys)',
          barColor: 'rgba(251, 191, 36, 0.22)',
          textColor: '#fde68a',
          fullWidth: true,
          tall: true,
        },
        {
          label: 'Phase 1: Home Page',
          barColor: 'rgba(245, 166, 35, 0.85)',
          colStart: 1,
          colSpan: 2,
        },
        {
          label: 'Phase 2: Sign-Up/Login (Tutors)',
          barColor: 'rgba(153, 112, 255, 0.75)',
          colStart: 3,
          colSpan: 2,
        },
        {
          label: 'Phase 2: (Learners)',
          barColor: 'rgba(153, 112, 255, 0.55)',
          colStart: 4,
          colSpan: 2,
        },
        {
          label: 'Phase 3: Profile (Tutors)',
          barColor: 'rgba(255, 138, 101, 0.8)',
          colStart: 5,
          colSpan: 2,
        },
        {
          label: 'Phase 3: Profile (Learners)',
          barColor: 'rgba(255, 138, 101, 0.55)',
          colStart: 6,
          colSpan: 2,
        },
        {
          label: 'Phase 4: Search/ Lesson Pages',
          barColor: 'rgba(129, 199, 132, 0.8)',
          colStart: 7,
          colSpan: 2,
        },
        {
          label: 'Phase 5: Scheduling/Billing Pages',
          barColor: 'rgba(240, 98, 146, 0.8)',
          colStart: 7,
          colSpan: 2,
        },
      ],
    },
    steps: [
      {
        number: '01',
        title: 'Competitive audit',
        body: `As a team, we audited the tutor marketplace landscape. For SushiTalk to stand out we needed to:`,
        listItems: [
          'Help learners match on language and life-in-Japan goals, not just price',
          'Avoid blocking discovery behind a paywall',
          'Design search and profiles that surface whether a tutor can support a learner’s full journey',
        ],
        image: '/images/sushitalk-competitive-audit.png',
        imageAlt:
          'Competitive audit table comparing iTalki, HelloTalk, Duolingo, ADPList, Care.com, and Taskrabbit across services, pros, cons, and opportunities',
        imageCaption:
          'Competitive audit — language platforms and adjacent marketplaces that shaped our discovery and paywall strategy',
      },
      {
        number: '02',
        title: 'Personas',
        body: `We developed personas for native Japanese tutors hosting on the platform and non-native learners at different stages — from JLPT prep and conversation practice to planning a move or settling into life in Japan — grounding priorities in real motivations, not feature wishlists.`,
        image: '/images/sushitalk-personas.png',
        imageAlt:
          'Learner personas Tom and Misty and mentor personas Reina and Takashi with goals, behaviors, and frustrations',
        imageCaption:
          'Personas — four profiles spanning professional learners, students, retired teachers, and freelance tutors',
      },
      {
        number: '03',
        title: 'User flow',
        body: `User flows mapped discovery, profile comparison, and outreach — including how learners evaluate tutors for both language fit and life-in-Japan support — so the team agreed on the minimum path before committing.`,
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
    introLabel: 'Beyond language tutoring',
    intro: `The product vision always extended past conversation practice. Working with the Google Japan engineer, we identified a strong need among non-native learners for specialized help with moving to and staying in Japan — visas, documentation, healthcare, and the everyday questions that language apps never answer. Phase two expands SushiTalk from tutor matching into that broader support layer.`,
    flowCaption:
      'After creating a list of topics and extra features, fed everything to Claude to generate a prototype to present to stakeholder',
    flowCta: {
      label: 'View final design',
      href: 'https://sushitalk.netlify.app',
    },
  },
  featuresSidebarTitle: 'Stage-one priorities for matching learners and tutors.',
  featuresIntro:
    'We focused on discovery and trust first — the flows learners need to find a tutor who fits their language goals and Japan journey before payments, messaging, or life-in-Japan resources expand in later releases.',
  features: [
    {
      title: 'Priority screens',
      headline: 'Ship what validates',
      icon: '✅',
      image: '/images/sushitalk-landing.png',
      imageSrc2x: '/images/sushitalk-landing@4x.png',
      imageWidth: 270,
      imageHeight: 1024,
      imageRetinaWidth: 1080,
      imageAlt: 'SushiTalk learner landing page with hero, how it works, mentor browse, testimonials, and FAQ',
      imageScrollable: true,
      description:
        'We were able to create three of the five priority screens (Home page, Mentor Profile/Search, Sign up), which helped accelerate the path to phase two before launch.',
    },
    {
      title: 'Tutor browse',
      headline: 'Explore without friction',
      icon: '🍣',
      image: '/images/sushitalk-search.png',
      imageSrc2x: '/images/sushitalk-search@2x.png',
      imageWidth: 432,
      imageHeight: 1024,
      imageAlt: 'SushiTalk search results with filters and mentor profile cards',
      imageScrollable: true,
      description:
        'List and grid views let learners scan tutors freely — no account required to see who can support their language path and life-in-Japan goals.',
    },
    {
      title: 'Advanced filters',
      headline: 'Match on what matters',
      icon: '🎛️',
      image: '/images/sushitalk-filters.png',
      imageSrc2x: '/images/sushitalk-filters@2x.png',
      imageWidth: 1024,
      imageHeight: 212,
      imageAlt: 'SushiTalk advanced filter panel with availability, level, gender, reviews, time, and rate controls',
      imageFill: true,
      description:
        'Search by specialty, availability, price, teaching style, and life-in-Japan focus so learners find tutors aligned with their full journey — not just their next lesson.',
    },
    {
      title: 'Tutor profiles',
      headline: 'Trust before contact',
      icon: '👤',
      image: '/images/sushitalk-profile.png',
      imageSrc2x: '/images/sushitalk-profile@2x.png',
      imageWidth: 913,
      imageHeight: 1024,
      imageAlt: 'SushiTalk tutor profile for Sakura Sato with bio, lesson pricing, stats, and availability calendar',
      imageScrollable: true,
      description:
        'Profiles highlight experience, approach, and what each tutor offers beyond textbook lessons — from JLPT prep to relocation and daily-life guidance.',
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
      body: `The importance of tying design decisions to a clear product vision early — matching learners to tutors on their full Japan journey, not just language level — and defining success metrics with founders and engineers from the start.`,
    },
  ],
  conclusion: {
    lead: 'SushiTalk reinforced how much a small, focused team can ship when research, agile planning, and founder partnership stay aligned — building toward a platform that supports learners on language and life-in-Japan goals, not just the next lesson.',
    insights: [
      'Competitive audit insights shaped a no-paywall discovery strategy and matching criteria that go beyond language level alone.',
      'Short-cycle usability testing before hi-fi saved rework on search and profile layouts — the flows learners rely on to judge tutor fit.',
    ],
    nextSteps: {
      label: 'What’s next:',
      items: [
        'Continue hi-fi iteration toward launch with the SushiTalk founder team.',
        'Expand from three priority screens to the full five-screen stage-one roadmap.',
        'Grow phase-two flows for life-in-Japan support — documentation, healthcare, and relocation guidance.',
      ],
    },
  },
} as const
