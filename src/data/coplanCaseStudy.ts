export const coplanCaseStudyMeta = {
  role: 'UX Designer',
  title: 'Co-plan',
  logo: '/images/coplan-logo.png',
  logoWidth: 721,
  logoHeight: 177,
  logoAlt: 'Co-plan wordmark with planner icon and green checkmark',
  tagline:
    'An all-in-one web planning tool for university students to organize college courses and track degree progress — built as a calmer alternative to clunky registrar systems.',
  heroImage: '/images/coplan-case-study.png',
  heroImageAlt:
    'Co-plan logo and laptop mockup showing schedule view and degree planning interface',
  projectLabel: 'Education · 11-week capstone',
  details: [
    { label: 'Role', value: 'Project Manager · UX Designer' },
    { label: 'Industry', value: 'Education' },
    { label: 'Team', value: '2 (+ 4 volunteers)' },
    { label: 'Duration', value: '11+ weeks' },
  ],
} as const

export const coplanSections = {
  hook: {
    label: 'Planning shouldn’t feel like a second major',
    body: `Registering for courses and tracking degree progress should be straightforward — but for many students, tools like UW MyPlan feel fragmented, confusing, and out of step with how they actually plan their academic lives.

Co-plan was our answer: a consolidated planner that helps students onboard their existing schedules, audit requirements, and build a path to graduation with fewer dead ends.`,
  },
  challenge: {
    label: 'The challenge',
    body: `We needed to design for students who arrive mid-degree, transfer credits, or juggle competing majors — while a non-design stakeholder pushed for feature breadth. Our job was to scope realistically and prove every screen with research.`,
    problemStatement: `How might we help university students plan courses and monitor degree progress in one calm, accessible tool — without the navigation overhead and confusion they experience today?`,
  },
  researchQuestions: [
    'What does the course registration experience look like for students who have unmet expectations?',
    'What characterizes a positive course registration experience? What contributes to a negative one?',
    'What are students already doing to improve registration or better meet their expectations?',
  ],
  solution: {
    label: 'Solution',
    subtitle: 'One planner. Clear path to graduation.',
    body: `Co-plan consolidates scheduling, mapping, and degree auditing into a single experience tuned for students — not administrators. We prioritized onboarding for students who already have partial progress, simplified DARS-style requirement checking, and clearer hierarchy so icons and headings actually explain themselves.

The goal was an all-in-one product students could trust before, during, and after registration season.`,
    pillars: [
      {
        title: 'Schedule & map views',
        icon: '🗓️',
        body: `Homepage, schedule, and map views work together so students see where courses live in time and space — reducing the back-and-forth that made MyPlan feel like a maze.`,
      },
      {
        title: 'Degree audit (DARS)',
        icon: '🎓',
        body: `A dedicated audit flow helps students confirm requirements, spot gaps, and understand alternatives — with interactions prototyped for clarity, not spreadsheet density.`,
      },
    ],
  },
  finalDesign: {
    label: 'Final design',
    body: `We delivered four core surfaces stakeholders requested — homepage, schedule view, map view, and degree audit — iterating from cleaned wireframes through high-fidelity prototypes tested with students.`,
    prototype: {
      title: 'Co-plan interactive prototype',
      embedUrl:
        'https://embed.figma.com/proto/W5C7ggIelURrAPAz69NmL6/Coplan-Original?content-scaling=fixed&kind=proto&node-id=619-20674&scaling=scale-down&starting-point-node-id=619%3A20674&page-id=76%3A24618&embed-host=share',
      openUrl:
        'https://www.figma.com/proto/W5C7ggIelURrAPAz69NmL6/Coplan-Original?node-id=619-20674&starting-point-node-id=619%3A20674',
      frame: { width: 800, height: 450 },
    },
  },
  findingsIntro:
    'After conducting 1 round of usability testing with 4 participants. Participants had to go through 6 different tasks and I gathered data on their success for each task.',
  findingsTasksImage: '/images/coplan-tasks-data-collected.png',
  findingsTasksImageAlt:
    'Usability testing task list and data collected — notes, recordings, task success, quotes, and debrief',
  findings: [
    { value: '100%', label: 'Frustrated with MyPlan' },
    { value: '75%', label: 'Confused by headings, icons & navigation' },
    { value: '50%', label: 'Valued consolidated all-in-one features' },
  ],
  process: {
    title: 'The process',
    introLabel: 'Research discovery',
    intro: `After initial communication with stakeholder, I learned there were many gaps in stakeholder's reasonings for design decisions. To truly connect user pain points to designs, I conducted multi-method research to backup assumptions leading to data-driven design choices.`,
    steps: [
      {
        number: '01',
        title: 'Competitive audit — UW MyPlan',
        body: `MyPlan’s flow to add courses and audit a major was unnecessarily hard to maneuver. We documented where refinement would have the highest impact for students.`,
        image: '/images/coplan-myplan-audit.png',
        imageAlt:
          'UW MyPlan academic year view with quarterly columns for course planning and degree audit links',
      },
      {
        number: '02',
        title: 'User interviews',
        body: `Met with the UW Bothell Dean of Education and UW HCDE Advisor
📍 Clarified what's legally/technically allowed in university course scheduling systems.
📍 Helped the team prioritize realistic and impactful features.
📍 Provided stakeholder with data insight on how to better scope product within legal restriction.`,
        image: '/images/coplan-user-interview.png',
        imageAlt:
          'Stakeholder interview across a desk with architectural sketches on the wall behind',
      },
      {
        number: '03',
        title: 'Student Survey (x7)',
        body: `📍 Registration is tied directly to graduation success → positive experience is essential.
📍 Common feelings: stress, anxiety, and time pressure.
📍 Barriers: system constraints, limited offerings, poor usability.`,
        image: '/images/coplan-student-survey.png',
        imageAlt: 'Hands typing on a laptop while completing a survey or research form',
      },
      {
        number: '04',
        title: 'Persona',
        body: `Advanced the initial ideas of the stakeholder and made progress into validating ideas and assumptions through our next steps.`,
        image: '/images/coplan-personas.png',
        imageAlt:
          'Three student personas — Jamie, Kevin, and Ko — with bios, goals, and frustrations',
      },
    ],
    artifacts: [
      {
        title: 'User flow',
        body: `Creating a user flow identified missing steps: onboarding students' existing schedule information into the planner — since many users come from a different platform or may have already started college courses — and a more accessible way to update courses in their schedule.`,
        image: '/images/coplan-user-flow.png',
        imageAlt:
          'Co-plan user flow diagram covering onboarding, degree audit, scheduling, and course updates',
      },
      {
        title: 'User Journey Map',
        body: `📍 Identify accessibility pain points in each stage of the process, with overly complicated steps to complete a single task.
📍 Difficult to confirm or find alternatives when actions are completed or incomplete.
📍 Labelled opportunities to improve the user's experience for each phase — adding and streamlining different features for better separation and user focus.`,
        image: '/images/coplan-user-journey-map.png',
        imageAlt:
          'Co-plan user journey map across onboarding, home, degree audit, course finding, and schedule',
      },
    ],
    designTimelineIntro: {
      lead: 'Having a general understanding of what kind of solution we needed to solve these pain points, we took multiple steps towards our final design.',
      initialWork:
        'Cleaned and improved accessibility of stakeholder-provided wireframes.',
      focusAreas: {
        label: 'Focus Areas (my key contributions):',
        items: [
          {
            label: 'Onboarding process',
            text: 'ensuring students could quickly understand and engage with Co-plan.',
          },
          {
            label: 'DARS (Degree Audit Reporting System) component',
            text: 'prototyping interaction to check degree requirements.',
          },
          {
            label: 'Location pages',
            text: 'explored integration (though not included in final design).',
          },
        ],
      },
      bullets: [
        'Iterated on layout and interaction flow to consolidate features and reduce steps.',
        "Met the stakeholder's non-design expectations and began providing opinions on prioritization of importance.",
      ],
    },
    designTimeline: [
      {
        number: '01',
        title: 'Sketch',
        body: `Sketch the 4 main screens requested by stakeholders — Homepage, Schedule View, Map view & Degree Audit. Focused on getting the general placement & features in place.`,
        slides: [
          {
            src: '/images/coplan-sketch-main.png',
            alt: 'Co-plan homepage sketch with quarterly register and saved columns',
          },
          {
            src: '/images/coplan-sketch-schedule.png',
            alt: 'Co-plan schedule view sketch with weekly calendar grid',
          },
          {
            src: '/images/coplan-sketch-map.png',
            alt: 'Co-plan map view sketch with campus pins and walk time',
          },
          {
            src: '/images/coplan-sketch-dars.png',
            alt: 'Co-plan degree audit (DARS) sketch with requirement progress',
          },
        ],
      },
      {
        number: '02',
        title: 'Wireframes',
        body: `Translated 4 sketches into wireframes — focused on general placement & features in place. Began noting interactive interfaces between each screen to address user pain points.`,
        slides: [
          {
            src: '/images/coplan-wireframe-home.png',
            alt: 'Co-plan homepage wireframe with quarterly register and saved columns',
          },
          {
            src: '/images/coplan-wireframe-schedule.png',
            alt: 'Co-plan schedule view wireframe with weekly calendar grid',
          },
          {
            src: '/images/coplan-wireframe-map.png',
            alt: 'Co-plan map view wireframe with campus path and walk time',
          },
          {
            src: '/images/coplan-wireframe-dars.png',
            alt: 'Co-plan degree audit wireframe with requirement progress bars',
          },
        ],
      },
      {
        number: '03',
        title: 'Prototype',
        body: `High-fidelity prototype of the four core surfaces — schedule, onboarding, and degree audit flows ready for usability testing.`,
        slides: [
          {
            src: '/images/coplan-prototype-home.png',
            alt: 'Co-plan homepage prototype with quarterly registered and planned courses',
          },
          {
            src: '/images/coplan-prototype-schedule.png',
            alt: 'Co-plan schedule view prototype with weekly calendar blocks',
          },
          {
            src: '/images/coplan-prototype-map.png',
            alt: 'Co-plan map view prototype with campus locations',
          },
          {
            src: '/images/coplan-prototype-dars.png',
            alt: 'Co-plan degree audit prototype with requirement progress',
          },
          {
            src: '/images/coplan-prototype-course-info.png',
            alt: 'Co-plan course information detail prototype',
          },
        ],
      },
    ],
  },
  featuresSidebarTitle: 'Four surfaces students asked for — in one product.',
  featuresIntro:
    'Co-plan brings scheduling, spatial context, and degree auditing together so students spend less time decoding the system and more time planning their path.',
  features: [
    {
      title: 'Homepage',
      headline: 'Start with clarity',
      icon: '🏠',
      image: '/images/coplan-homepage.gif',
      imageWidth: 992,
      imageHeight: 786,
      imageAlt: 'CoPlan homepage dashboard with term columns for registered and planned courses',
      imageFill: true,
      imageFrameClass:
        'flex min-h-[240px] flex-1 flex-col overflow-hidden bg-[#f4f4f6] md:min-h-[360px] md:max-h-[min(532px,52vh)]',
      description:
        'A focused entry point orients new and returning students — surfacing schedule status, quick actions, and what needs attention next.',
    },
    {
      title: 'Schedule view',
      headline: 'See your term',
      icon: '📅',
      image: '/images/coplan-schedule.gif',
      imageWidth: 992,
      imageHeight: 786,
      imageAlt: 'CoPlan schedule view with registered and planned courses across academic terms',
      imageFill: true,
      imageFrameClass:
        'flex min-h-[240px] flex-1 flex-col overflow-hidden bg-[#f4f4f6] md:min-h-[360px] md:max-h-[min(532px,52vh)]',
      description:
        'Calendar-style planning makes add/drop and term balance tangible, with less hunting through nested menus.',
    },
    {
      title: 'Map view',
      headline: 'Courses in context',
      icon: '🗺️',
      image: '/images/coplan-map.png',
      imageSrc2x: '/images/coplan-map@2x.png',
      imageWidth: 992,
      imageHeight: 786,
      imageAlt: 'CoPlan map view with course planning and weekly schedule calendar',
      imageFill: true,
      imageFrameClass:
        'flex min-h-[240px] flex-1 flex-col overflow-hidden bg-[#f4f4f6] md:min-h-[360px] md:max-h-[min(532px,52vh)]',
      description:
        'Spatial layout helps students understand campus and course relationships beyond a flat list.',
    },
    {
      title: 'Degree audit',
      headline: 'Track requirements',
      icon: '✅',
      image: '/images/coplan-dars.png',
      imageSrc2x: '/images/coplan-dars@2x.png',
      imageWidth: 992,
      imageHeight: 786,
      imageAlt: 'CoPlan degree audit dashboard with registered and planned courses across academic terms',
      imageFill: true,
      imageFrameClass:
        'flex min-h-[240px] flex-1 flex-col overflow-hidden bg-[#f4f4f6] md:min-h-[360px] md:max-h-[min(532px,52vh)]',
      description:
        'DARS-style auditing with clearer states for complete, in-progress, and remaining requirements — plus room to explore alternatives.',
    },
    {
      title: 'Onboarding',
      headline: 'Bring your progress',
      icon: '📥',
      image: '/images/coplan-onboarding.png',
      imageSrc2x: '/images/coplan-onboarding@2x.png',
      imageWidth: 1024,
      imageHeight: 693,
      imageAlt: 'CoPlan sign-in screen with UW NetID, Google, and email login options',
      imageFill: true,
      imageFrameClass:
        'flex min-h-[220px] flex-1 flex-col overflow-hidden bg-[#f4f4f6] md:min-h-[320px] md:max-h-[min(460px,48vh)]',
      description:
        'Students coming from another platform or mid-degree can import existing coursework so planning starts from reality, not a blank slate.',
    },
    {
      title: 'Tooltips & guidance',
      headline: 'Explain the system',
      icon: '💬',
      image: '/images/coplan-tooltips.gif',
      imageWidth: 986,
      imageHeight: 784,
      imageAlt:
        'CoPlan dashboard with contextual tooltips explaining course cards, icons, and planning sections',
      imageFill: true,
      imageFrameClass:
        'flex min-h-[240px] flex-1 flex-col overflow-hidden bg-[#f4f4f6] md:min-h-[360px] md:max-h-[min(532px,52vh)]',
      description:
        'After testing showed confusion with icons and headings, we added contextual tooltips to reinforce the all-in-one model.',
    },
  ],
  lessonsLearned: [
    {
      title: 'Research-driven scope',
      body: `Multi-method research let us push back on stakeholder feature sprawl and anchor the roadmap in real student pain — especially frustration with MyPlan and confusion around navigation.`,
    },
    {
      title: 'Stakeholder partnership',
      body: `Balancing a non-design stakeholder’s expectations taught me to communicate prioritization clearly, prototype early, and show data when saying no.`,
    },
    {
      title: 'What I’d do next',
      body: `More usability rounds on the next iteration, tighter sketch/wireframe time upfront, and earlier alignment on audience and pain points before high-fidelity polish.`,
    },
  ],
  conclusion: {
    lead: 'As a team, we were able to balance realistic design goals with the data we gained from our research and expectations from our non-design background stakeholder.',
    insights: [
      'Saw the impact of research-driven design on scoping realistic features and addressing true student pain points.',
      'Strengthened skills in interaction design and usability iteration.',
    ],
    nextSteps: {
      label: 'Our next steps would be to:',
      items: [
        'Conduct more rounds of usability testing with new iteration of designs.',
        'Reaching out to Universities (like UW) to begin implementing Co-plan for beta-testing.',
        'Begin handoff designs to engineers.',
      ],
    },
  },
} as const
