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
        userFlow: true,
      },
      {
        title: 'User Journey Map',
        body: `📍 Identify accessibility pain points in each stage of the process, with overly complicated steps to complete a single task.
📍 Difficult to confirm or find alternatives when actions are completed or incomplete.
📍 Labelled opportunities to improve the user's experience for each phase — adding and streamlining different features for better separation and user focus.`,
        userJourney: true,
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

export const coplanTestingTasks = {
  title: 'Tasks & Data collected',
  taskColumnLabel: 'Task list',
  dataColumnLabel: 'Data',
  pairs: [
    {
      task: 'Add/Drop Class on homepage',
      data: 'Notes (Thoughts, Feelings, Behaviours...)',
    },
    {
      task: 'Accessing Class information from homepage',
      data: 'Audio Recording (Zoom)',
    },
    {
      task: 'Replace existing Class section with a different section',
      data: 'Task success (Yes or No)',
    },
    {
      task: 'Navigating to Schedule view',
      data: 'Participant quotes',
    },
    {
      task: 'Finding graduation information on DARs',
      data: 'Debriefing Questions',
      wide: true,
    },
  ],
} as const

export const coplanUserFlow = {
  sections: [],
  nodes: [
    { id: 'start', kind: 'state', label: 'Starting University', x: 108, y: 58, r: 51 },
    { id: 'welcome', kind: 'action', label: 'Co-Plan Welcome Screen', x: 108, y: 148, w: 156 },
    { id: 'signup1', kind: 'action', label: 'Sign Up Form', x: 108, y: 218, w: 132 },
    {
      id: 'signup2',
      kind: 'action',
      label: 'Sign Up form 2\n(Student Information)',
      x: 108,
      y: 292,
      w: 136,
      h: 36,
    },
    {
      id: 'transfer-q',
      kind: 'decision',
      label: 'Student have transfer credit?',
      x: 108,
      y: 400,
    },
    { id: 'transfer-credit', kind: 'action', label: 'Transfer Credit page', x: 108, y: 506, w: 148 },
    {
      id: 'add-classes',
      kind: 'action',
      label: 'Sign up form\n(Add classes)',
      x: 280,
      y: 400,
      w: 120,
      h: 36,
    },
    {
      id: 'connect-advisor',
      kind: 'action',
      label: 'Sign Up Form\n(Connect with Advisor)',
      x: 280,
      y: 248,
      w: 136,
      h: 36,
    },
    { id: 'homepage', kind: 'state', label: 'Homepage', x: 448, y: 248 },
    {
      id: 'degree-q',
      kind: 'decision',
      label: 'Want to learn about Degree Requirements?',
      x: 592,
      y: 96,
    },
    { id: 'dars', kind: 'action', label: 'DARs Page', x: 792, y: 96, w: 120 },
    {
      id: 'schedule-q',
      kind: 'decision',
      label: "Don't know what your schedule look...",
      x: 592,
      y: 248,
    },
    { id: 'schedule-page', kind: 'action', label: 'Schedule Page', x: 792, y: 248, w: 132 },
    {
      id: 'changes-q',
      kind: 'decision',
      label: 'Want to make changes to class?',
      x: 592,
      y: 392,
    },
    { id: 'registration', kind: 'action', label: 'Registration Page', x: 792, y: 392, w: 140 },
    { id: 'find-course', kind: 'action', label: 'Find Course', x: 868, y: 312, w: 112 },
    { id: 'search', kind: 'action', label: 'Search Page', x: 1016, y: 312, w: 112 },
    {
      id: 'course-info',
      kind: 'action',
      label: 'Course\nInformation',
      x: 1016,
      y: 384,
      w: 112,
      h: 36,
    },
    { id: 'drop-class', kind: 'action', label: 'Drop Class', x: 792, y: 496, w: 112 },
    { id: 'updated-home', kind: 'state', label: 'Updated Homepage', x: 1016, y: 496, r: 52 },
  ],
  edges: [
    { from: 'start', to: 'welcome', routing: 'straight' },
    { from: 'welcome', to: 'signup1', routing: 'straight' },
    { from: 'signup1', to: 'signup2', routing: 'straight' },
    { from: 'signup2', to: 'transfer-q', routing: 'straight' },
    { from: 'transfer-q', to: 'transfer-credit', routing: 'straight', label: 'Yes' },
    { from: 'transfer-q', to: 'add-classes', routing: 'h-first', label: 'No' },
    {
      from: 'transfer-credit',
      to: 'add-classes',
      via: [
        { x: 280, y: 506 },
        { x: 280, y: 430 },
      ],
    },
    { from: 'add-classes', to: 'connect-advisor', routing: 'straight' },
    { from: 'connect-advisor', to: 'homepage', routing: 'h-first' },
    {
      from: 'homepage',
      to: 'degree-q',
      via: [
        { x: 500, y: 248 },
        { x: 500, y: 96 },
      ],
    },
    { from: 'degree-q', to: 'dars', routing: 'h-first' },
    { from: 'homepage', to: 'schedule-q', routing: 'h-first' },
    { from: 'schedule-q', to: 'schedule-page', routing: 'h-first' },
    {
      from: 'homepage',
      to: 'changes-q',
      via: [
        { x: 500, y: 248 },
        { x: 500, y: 392 },
      ],
    },
    { from: 'changes-q', to: 'registration', routing: 'h-first' },
    {
      from: 'registration',
      to: 'find-course',
      via: [{ x: 792, y: 312 }],
      label: 'Add',
    },
    { from: 'find-course', to: 'search', routing: 'h-first' },
    { from: 'search', to: 'course-info', routing: 'straight' },
    { from: 'course-info', to: 'updated-home', routing: 'straight' },
    {
      from: 'registration',
      to: 'drop-class',
      routing: 'straight',
      label: 'Drop',
    },
    { from: 'drop-class', to: 'updated-home', routing: 'h-first' },
  ],
  revealOrder: [
    'start',
    'welcome',
    'signup1',
    'signup2',
    'transfer-q',
    'transfer-credit',
    'add-classes',
    'connect-advisor',
    'homepage',
    'degree-q',
    'dars',
    'schedule-q',
    'schedule-page',
    'changes-q',
    'registration',
    'find-course',
    'search',
    'course-info',
    'drop-class',
    'updated-home',
  ],
} as const

export const coplanUserJourney = {
  phases: [
    {
      id: 'onboarding',
      title: 'Onboarding',
      tone: 'orange',
      actions: [
        'Update/connect to their college profile',
        'Sign up into profile',
        'Input existing information about classes or degree',
      ],
      goals: [
        'Goal: Create an account to add and search for courses.',
        'Move existing info to have accurate progression on graduation/degree requirements.',
      ],
      feelings: ['neutral'],
      painPoints: [
        'Long and hard to understand process.',
        'Tedious information input.',
        'Had to add-in existing courses and credits into graduation tracker.',
        "Can't figure out which degree to audit or apply.",
      ],
      opportunity:
        'Revamp the onboarding process with easy-to-understand sections and having a better way to transfer existing information.',
    },
    {
      id: 'home',
      title: 'Home Screen',
      tone: 'pink',
      actions: [
        'See courses already signed up for',
        'Look at future quarters',
        'See any saved courses users are interested in',
      ],
      goals: [
        'Goal: Get a general view of what course they signed up for.',
        'Access to tools to help them with registration and degree view.',
      ],
      feelings: ['unhappy'],
      painPoints: [
        'Hard to understand icons.',
        "Can't figure out where are all the features.",
        'Hard to quickly access very important tools (schedule, courses, degree audit, etc.).',
      ],
      opportunity:
        'Improve home screen layout to have all the important features and tools to be easy to access and see what are better ways to indicate each features (i.e icons, text, etc.).',
    },
    {
      id: 'dars',
      title: 'Degree Audit (DARS)',
      tone: 'purple',
      actions: [
        "See degree you audit or change it depending on user's status",
        'Find courses that would help work towards your degree',
        'See what courses/users are missing or requirements you have completed',
      ],
      goals: [
        'Goal: See what are the requirements for the degree.',
        'Understand what is left or already accomplished for degree.',
        'Find courses that fulfill degree requirement.',
      ],
      feelings: ['happy', 'unhappy'],
      painPoints: [
        'Hard to understand degree requirement.',
        "Don't know application process.",
        "Aren't sure which course fulfills what requirement.",
        "Don't know about pre-requisites.",
      ],
      opportunity:
        'More simplistic and not to text heavy layout for the Degree audit to better visualize what is already completed or needs to be done for specific major and graduation requirements.',
    },
    {
      id: 'course-finding',
      title: 'Course Finding',
      tone: 'blue',
      actions: [
        'Users searching and filtering out courses they would want to take',
        'Users adding courses to respective quarters',
        'Users bookmarking courses for later/current or future reference',
      ],
      goals: [
        'Goal: Searching/filtering for courses.',
        'Add or saving courses for current or later quarters.',
        'Browse of course that might fit into degree requirements.',
      ],
      feelings: ['happy', 'unhappy'],
      painPoints: [
        'Too many courses during general search.',
        'Hard to see which course correspond to which degree/graduation requirement.',
        "Can't filter enough courses.",
      ],
      opportunity:
        'Streamline the search experience and adding emphasize on filters and quick add features.',
    },
    {
      id: 'schedule',
      title: 'Schedule',
      tone: 'green',
      actions: [
        'Users seeing current schedule layout for current quarter',
        'Users can change/update courses',
        'Users can see what future schedules might look like',
      ],
      goals: [
        'Goal: Visual of what current or later quarters might look like.',
        'Ability to make quick changes to courses to fit into schedule.',
      ],
      feelings: ['happy', 'neutral'],
      painPoints: [
        'Hard to access.',
        'No real way to make quick changes.',
        'Some information about the courses are missing when viewing schedule (exact time, location, professor, etc.).',
      ],
      opportunity:
        'Design a full interactive page where the schedule can be placed and manipulated rather than a static photo.',
    },
  ],
} as const
