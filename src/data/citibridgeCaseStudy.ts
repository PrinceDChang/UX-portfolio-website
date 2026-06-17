export const citibridgeCaseStudyMeta = {
  role: 'UX Designer',
  title: 'Citibridge',
  tagline:
    'A communication app that bridges communication between city municipalities and residents to streamline reporting, improve transparency, and foster trust through better citizen-government collaboration on reporting civic issues.',
  heroImage: '/images/citbridge-case-study.png',
  heroImageAlt:
    'Citibridge branding with civic action tagline and mobile app mockup showing Seattle community reports',
  projectLabel: 'Protothon 2025',
  impactMetrics: [
    { value: '24 hrs', label: 'Protothon sprint' },
    { value: '4', label: 'HCDE teammates' },
    { value: 'Seattle', label: 'Pilot city focus' },
    { value: '1 hub', label: 'Unified civic reporting flow' },
  ],
  details: [
    { label: 'Role', value: 'UX Designer' },
    { label: 'Team', value: '4 HCDE students' },
    { label: 'Project duration', value: '24 hours' },
    { label: 'Focus', value: 'City of Seattle' },
  ],
  presentationUrl:
    'https://www.figma.com/slides/gi2tMdI9bgzyfUAKHDORTD/Citibridge?node-id=46-2891&t=cvcW56fmRhMokEDH-1',
} as const

export const citibridgeSections = {
  problem: {
    label: 'Problem',
    body: 'Modern cities face communication gaps between residents and municipal services, leading to unresolved issues and frustration on both sides.',
  },
  researchQuestion: {
    label: 'Research question',
    statement:
      'How might we empower citizens to easily report and track city issues in one centralized platform that builds trust through transparency and feedback?',
  },
  solution: {
    label: 'Solution',
    items: [
      'Display an interactive map and auto-suggest similar nearby reports to help users avoid duplication and stay informed.',
      'Use geolocation and categorized issue types to simplify the submission experience.',
      'Provide instant confirmation, real-time status updates, and visual proof of resolution to close the loop and build user trust.',
    ],
  },
  finalDesign: {
    label: 'Final design',
    body: 'A mobile application, Citibridge, that emphasizes accessible and transparent communication for citizens to notify city municipalities of issues in their cities without overlap — with real-time updates on the process of issues until resolution.',
    prototype: {
      title: 'Citibridge interactive prototype',
      embedUrl:
        'https://embed.figma.com/proto/DzGt9ne6AEZE26Fply4jni/CitiBridge?node-id=9-6483&p=f&viewport=259%2C25%2C0.14&scaling=scale-down&content-scaling=fixed&starting-point-node-id=9%3A6483&page-id=9%3A6467&embed-host=share',
      openUrl:
        'https://www.figma.com/proto/DzGt9ne6AEZE26Fply4jni/CitiBridge?node-id=9-6483&starting-point-node-id=9%3A6483',
      frame: { width: 800, height: 450 },
    },
  },
  process: {
    title: 'Process',
    introLabel: 'Setting the stage',
    intro:
      'We focused on the City of Seattle and narrowed our target group to citizens navigating everyday civic friction within the city.',
    steps: [
      {
        number: '01',
        title: 'Competitive audit',
        body: 'Based on the research findings, we restructured the app’s navigation and content, prioritizing features and information according to user needs.',
        image: '/images/citibridge-competitive-audit.png',
        imageAlt:
          'Find It, Fix It Seattle app screens — navigation, home, map view, and report list from competitive audit',
      },
      {
        number: '02',
        title: 'Secondary research',
        body: 'We reviewed how residents already report issues, what channels cities use today, and where existing flows create friction or duplicate effort.',
        image: '/images/citibridge-secondary-research.png',
        imageAlt:
          'User goals, motivations, pain points, and tasks affinity map from secondary research',
      },
      {
        number: '03',
        title: 'Data visualization',
        body: 'Using Tableau, we visualized changes in customer service requests from the City of Seattle database — comparing 2021 vs 2024/25. Parking and structural service requests increased exponentially, validating demand for clearer digital reporting.',
        image: '/images/citibridge-data-visualization.png',
        imageAlt:
          'Tableau bar chart of 2024–25 Seattle service request types by volume, including abandoned vehicles and parking enforcement',
      },
    ],
    painPoints: [
      {
        title: 'No user-friendly way to view reports',
        body: 'Residents lacked an easy way to see existing reports and understand what was already filed in their area.',
      },
      {
        title: 'Frustrating, unclear reporting',
        body: 'The reporting process felt opaque — leading to duplicate submissions and wasted municipal effort.',
      },
      {
        title: 'No feedback loop',
        body: 'Users received little confirmation or progress updates after filing a complaint, eroding trust in the system.',
      },
    ],
    informationArchitecture: {
      title: 'Information architecture',
      description:
        'Looking to improve findability of resources from the search page by organizing features into easy to understand paths and locations improving the user experience overall.',
      rootLabel: 'Homepage',
      sections: [
        {
          label: 'Map',
          items: ['Interactive view', 'View existing reports', 'Report process'],
        },
        {
          label: 'Submit Report',
          items: ['Add photos and details', 'Support matching reports'],
        },
        {
          label: 'Profile',
          items: ['View reports made by you'],
        },
        {
          label: 'Notifications',
          items: ['City progress'],
        },
      ],
    },
    finalFeatureSet: {
      title: 'Final feature set',
      items: [
        'Interactive map and auto-suggest similar nearby reports to avoid duplication.',
        'Geolocation and categorized issue types to simplify the submission experience.',
        'Instant confirmation, real-time status updates, and visual proof of resolution.',
      ],
    },
  },
  designSprint: {
    label: 'Design sprint & prototyping',
    paragraphs: [
      'We ran 5-minute design sprints with the team for each feature, reached consensus on direction, and aligned on how to design and prototype before judge review.',
      'We converted our sketches into high-fidelity prototypes in Figma, ready for walkthroughs and sprint presentation.',
    ],
  },
  featuresIntro:
    'Five core experiences translate research into the final app — from browsing reports to sharing successful fixes.',
  featuresSidebarTitle: 'Design feature explanation',
  features: [
    {
      title: 'Report viewing (Home)',
      headline: 'Browse reports at a glance',
      description:
        'Easily view existing reports through a streamlined list on the homepage or an interactive visual map.',
      icon: '🏠',
      image: '/images/citibridge-feature-home-map.png',
      imageAlt:
        'Citibridge home page with report list, open and closed status, and duplicate-report avatars',
    },
    {
      title: 'Report viewing (Map)',
      headline: 'Explore issues spatially',
      description:
        'Seamlessly view reporting activity on a map and get more information about the current status of each issue.',
      icon: '📍',
      image: '/images/citibridge-feature-map-detail.png',
      imageAlt:
        'Citibridge map with issue pins, report card, progress bar, and real-time status updates for illegal street parking',
    },
    {
      title: 'Submitting reports',
      headline: 'File with context',
      description:
        'Submit comprehensive reports. If keywords in the description match other reports, the app alerts users to similar open reports.',
      icon: '➕',
      image: '/images/citibridge-feature-submit.png',
      imageAlt:
        'Citibridge submit flow with photo upload, categorization, and duplicate report alert with upvote',
    },
    {
      title: 'Notifications & updates',
      headline: 'Stay in the loop',
      description:
        'Get real-time updates on your own reports and receive updates on changes in your area from other residents.',
      icon: '🔔',
      image: '/images/citibridge-feature-notifications.png',
      imageAlt:
        'Citibridge lock screen progress widget and in-app notifications for report updates and area changes',
    },
    {
      title: 'City process update',
      headline: 'See the fix',
      description:
        'Get before-and-after photos of resolved issues and share successful fixes to reinforce transparency.',
      icon: '📸',
      image: '/images/citibridge-feature-city-progress.png',
      imageAlt:
        'Citibridge city progress screen with before-and-after photos, timeline updates, and share actions',
    },
  ],
  presentation: {
    label: 'Presentation',
    body: 'We submitted final Figma slide decks with prototype flows to Protothon judges for evaluation and scoring.',
  },
  conclusion: {
    lead: 'Reflecting on feedback from mentors and judges, we left the sprint with a sharper story and a clearer north star for civic reporting tools.',
    insights: [
      'UI decisions and accessibility should reflect the story and personas we set up.',
      'More clarity on targeted user groups would strengthen the narrative for stakeholders.',
      'Storytelling is key to design — especially under a 24-hour constraint.',
    ],
    nextSteps: {
      label: "What's next / long-term vision",
      items: [
        'Use smart matching to group similar reports by analyzing location, time, and issue type — even if descriptions vary across users.',
        'Expand accessibility of features to accommodate children or disabled users; extend to other cities and countries.',
        'Explore AR/VR that identifies issues in real time and supports alternative input modalities.',
      ],
    },
  },
} as const
