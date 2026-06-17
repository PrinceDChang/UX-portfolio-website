export const arboretumCaseStudyMeta = {
  role: 'UX Designer',
  title: 'Washington Park Arboretum',
  tagline:
    'Within an 8-hour DesignJam sprint, I designed a mobile app that improves accessibility for frequent visitors and newcomers to the Washington Park Arboretum.',
  heroImage: '/images/arboretum-case-study.png',
  heroImageAlt:
    'Washington Park Arboretum navigation app — map mockups, user flow diagram, and accessibility research collage',
  projectLabel: 'DesignJam 2024 · Accessibility',
  impactSummary:
    '"Provided Washington Park Arboretum stakeholder concepts of ways to improve Accessibility-first for park-goers on a digital scale."',
  details: [
    { label: 'Role', value: 'UX Designer' },
    { label: 'Industry', value: 'Non-profit' },
    { label: 'Team', value: '4 HCDE students' },
    { label: 'Duration', value: '4 weeks · 8hr sprint' },
  ],
  presentationUrl:
    'https://docs.google.com/presentation/d/1VVszuS5k3MVG_cLkrERBmo3ExlNI0eeYRrN4GZbeuBo/edit?usp=sharing',
} as const

export const arboretumSections = {
  problem: {
    label: 'Problem',
    body: 'The Washington Park Arboretum is a public park near the University of Washington. Stakeholders requested accessibility improvements and redesign ideas to shape the park experience for incoming visitors — from wayfinding and trail clarity to parking and amenities.',
  },
  researchQuestion: {
    label: 'Research question',
    statement:
      'How can we help folks anxious or fearful about going outside have an enjoyable and stress-free experience at the Arboretum?',
  },
  solution: {
    label: 'Solution',
    subtitle: 'Plan the visit before you arrive.',
    body: 'A mobile application that lets users explore the park in depth — from bus stops and parking to trails filtered by elevation and busyness — so they can plan a visit with less uncertainty.',
    pillars: [
      {
        title: 'Know before you go',
        icon: '🚌',
        body: 'See transit stops, parking availability, and distance to your chosen trail before entering the park.',
      },
      {
        title: 'Trails that match you',
        icon: '🥾',
        body: 'Filter paths by attributes like elevation, surface, and how busy a route tends to be.',
      },
      {
        title: 'Amenities in context',
        icon: '📍',
        body: 'A visual guide to landmarks, restrooms, and other amenities across the Arboretum.',
      },
    ],
  },
  finalDesign: {
    label: 'Final design',
    body: 'From locating bus stops and open parking to filtering trails by elevation and busyness, we designed an app to serve as a companion for a stress-free visit — helping users build trips, navigate the park, and find what they need along the way.',
    prototype: {
      title: 'DesignJam 2024 prototype',
      embedUrl:
        'https://embed.figma.com/proto/WPQBQZfSAN4bxPbN0ztdhW/DesignJam-2024-Prototype?node-id=9-83&p=f&viewport=382%2C-894%2C0.38&scaling=scale-down&content-scaling=fixed&starting-point-node-id=9%3A83&page-id=0%3A1&embed-host=share',
      openUrl:
        'https://www.figma.com/proto/WPQBQZfSAN4bxPbN0ztdhW/DesignJam-2024-Prototype?node-id=9-83&starting-point-node-id=9%3A83',
      frame: { width: 800, height: 450 },
    },
  },
  process: {
    title: 'The process',
    introLabel: 'Research to DesignJam',
    intro:
      'We began with team brainstorming and field research at the park, narrowed our scope after firsthand observation, then ran an 8-hour DesignJam on November 15 with mentor feedback before prototyping for stakeholders.',
    steps: [
      {
        number: '01',
        title: 'Brainstorming',
        body: 'We identified target groups — visitors with disabilities, parents with young children, drivers, and people with pets — and mapped scenarios where navigation, signage, or access broke down at the Arboretum.',
        image: '/images/arboretum-brainstorming.png',
        imageAlt:
          'Whiteboard tables covered in accessibility brainstorming notes — target users, infrastructure gaps, and feature ideas for the Arboretum',
      },
      {
        number: '02',
        title: 'Field study',
        body: 'We walked the park, noting pain points firsthand: unpaved paths, small hard-to-see signs, unclear trail endpoints, limited parking, narrow crossings between paths, and obstacles on trails.',
        image: '/images/arboretum-field-study.png',
        imageAlt:
          'Washington Park Arboretum entrance stone sign with engraved lettering, surrounded by lawn and trees',
      },
      {
        number: '03',
        title: 'DesignJam sprint',
        body: 'On November 15 we ran an 8-hour design sprint with industry mentors, moving from mind maps and user flows to sketches and high-fidelity prototypes for a stakeholder presentation.',
        image: '/images/arboretum-designjam-mindmap.png',
        imageAlt:
          'Mind map on a whiteboard table with sticky notes for visit goals, constraints, and success criteria during the DesignJam',
      },
    ],
    fieldStudyPainPoints: [
      'Unpaved paths',
      'Small signs that are hard to see',
      'No clear indication of where trails start and end',
      'Limited parking options',
      'Many small paths that are hard to cross when finding a route',
      'Obstacles on the path',
    ],
    initialUserGroups: [
      'Users with disabilities',
      'Users with young children',
      'Users who drive',
      'Users with pets',
    ],
    fieldWorkPhotos: [
      {
        src: '/images/arboretum-field-map-sign.png',
        alt: 'Team members studying a large map sign at the Arboretum',
        caption: 'Documenting how visitors orient themselves at a central map kiosk in the park.',
      },
      {
        src: '/images/arboretum-field-trail-sign.png',
        alt: 'Research team photographing a bicycle warning sign on a forest trail',
        caption: 'Recording trail signage and steep-grade warnings along paved paths.',
      },
      {
        src: '/images/arboretum-field-path-visitors.png',
        alt: 'Visitors with a dog and child on a bike sharing an Arboretum path',
        caption: 'Observing how families and pet owners navigate shared trails in autumn.',
      },
      {
        src: '/images/arboretum-field-wayfinding-post.png',
        alt: 'Wooden directional signpost listing collections and distances',
        caption: 'Wayfinding post with collection names — small text and distance cues to parse on site.',
      },
      {
        src: '/images/arboretum-field-memorial-plaque.png',
        alt: 'Small memorial plaque surrounded by garden plantings',
        caption: 'Secondary plaques and markers tucked into beds, easy to miss without a clear path.',
      },
      {
        src: '/images/arboretum-field-study.png',
        alt: 'Washington Park Arboretum entrance stone sign',
        caption: 'Arboretum entrance — starting point for our field study walkthrough.',
      },
    ],
    scopeFocus: [
      'Users with emotional support animals',
      'Users who are anxious or fearful about going outside',
    ],
    sprintActivities: [
      'Mind mapping success criteria, reasons to visit, and constraints',
      'User flows for a positive Arboretum experience with the product',
      'Screen sketches from the agreed flow',
      'High-fidelity prototyping in Figma for presentation',
    ],
    mentorInsight:
      'Mentors helped pivot our decisions toward a stronger path — validating scope, flow, and feature priorities before we invested in final screens.',
    designJamPhotos: [
      {
        src: '/images/arboretum-designjam-workshop.png',
        alt: 'DesignJam workshop room with teams collaborating at tables under teal ceiling lights',
      },
      {
        src: '/images/arboretum-designjam-mentor.png',
        alt: 'Industry mentor guiding the Arboretum team during the DesignJam sprint',
      },
      {
        src: '/images/arboretum-designjam-team.png',
        alt: 'HCDE team working together on laptops during the Arboretum DesignJam',
      },
    ],
    designTimeline: [
      {
        number: '01',
        title: 'Mind Mapping',
        body: 'Began with mapping out what it means for a user to go to the Arboretum and their success criteria and challenges. Mapped out reasons for users to visit and what success criteria and constraints they would face.',
        slides: [
          {
            src: '/images/arboretum-designjam-mindmap.png',
            alt: 'Mind map on a whiteboard table with visit motivations, success criteria, and user constraints for the Arboretum',
          },
        ],
      },
      {
        number: '02',
        title: 'User Flow',
        body: 'Translated our parameters into an ideal flow for the user in conjunction with our product. After mapping our ideas, we drew out how someone would navigate a positive Arboretum experience with the app at each step.',
        slides: [
          {
            src: '/images/arboretum-user-flow.png',
            alt: 'User flow diagram from opening the app through search, entrance, map, destination, trail, and arrival with challenges and opportunities noted',
          },
        ],
      },
      {
        number: '03',
        title: 'Sketches',
        body: 'Using the flow, we sketched individual screens to see the layout in which we wanted our features to perform — home page map, designation, parking, and trip planning.',
        slides: [
          {
            src: '/images/arboretum-sketches.png',
            alt: 'Hand-drawn sketches of the Arboretum app home page, designation, parking, and trip screens with feature notes',
          },
        ],
      },
      {
        number: '04',
        title: 'Prototyping',
        body: 'With only 8 hours in the design sprint challenge, we went straight into prototyping and getting our design out for our presentation to the Arboretum stakeholders.',
        slides: [
          {
            src: '/images/arboretum-prototype.png',
            alt: 'High-fidelity Figma prototype mockups for map navigation, nearest parking, destination cards, and trip directions',
          },
        ],
      },
    ],
  },
  featuresIntro:
    'Three core features translate research into the navigation companion we presented to Arboretum stakeholders.',
  featuresSidebarTitle: 'Feature explanation',
  features: [
    {
      title: 'Nearest parking',
      headline: 'Find lots with space near your trail',
      description:
        'Help users locate parking lots with availability and see how far each lot is from their target path.',
      icon: '🅿️',
    },
    {
      title: 'Trip-building navigation',
      headline: 'Build a course through the park',
      description:
        'Let users create a trip or course in the app and follow turn-by-turn guidance through the Arboretum.',
      icon: '🧭',
    },
    {
      title: 'Location & amenity locator',
      headline: 'See landmarks and amenities on the map',
      description:
        'Give users a visual guide to restrooms, landmarks, and other amenities across the park.',
      icon: '📍',
    },
  ],
  presentation: {
    label: 'Presentation',
    body: 'We delivered a 4-minute presentation and Q&A with Washington Park Arboretum stakeholders, mentors, and peers — gathering feedback on goals and how our product aligned with their vision.',
    date: 'November 26, 2024',
    photos: [
      {
        src: '/images/arboretum-presentation-title.png',
        alt: 'HCDE Accessibility Design Jam title slide projected in the lecture hall before the presentation',
      },
      {
        src: '/images/arboretum-presentation-slide.png',
        alt: 'Team presenting the Arboretum app map and feature overview slide to stakeholders in the auditorium',
      },
      {
        src: '/images/arboretum-presentation-prototype.png',
        alt: 'Presenter walking through the Figma prototype on screen — map, nearest parking, and navigation flows',
      },
      {
        src: '/images/arboretum-presentation-audience.png',
        alt: 'Stakeholders and peers seated in the tiered lecture hall during the Arboretum presentation',
      },
      {
        src: '/images/arboretum-presentation-group.png',
        alt: 'DesignJam team, mentors, and stakeholders posing together after the presentation',
      },
    ],
  },
  conclusion: {
    lead: 'Presenting to stakeholders, mentors, and peers surfaced clear themes for what a production-ready companion would need next.',
    insights: [
      'Flexibility among user inputs — flows should adapt when needs or constraints change mid-visit.',
      'Efficient transparency of data privacy — especially for location and personal planning data.',
      'Clarity on accessibility features for people with disabilities beyond our initial scope.',
    ],
    nextSteps: {
      label: "What's next",
      items: [
        'Continue observing the park and gathering user feedback.',
        'Await funding from stakeholders for further design and development.',
        'Implement design changes based on stakeholder and mentor input.',
      ],
    },
  },
} as const
