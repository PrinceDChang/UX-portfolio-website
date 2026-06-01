import type { ResearchFinding } from '../components/case-study/ResearchFindingsList'

export const wa211CaseStudyMeta = {
  role: 'Research',
  title: 'Washington 211',
  tagline:
    'A corporate usability research sponsorship with Washington 211 stakeholders on improving accessibility of the search feature on the WA 211 website.',
  heroImage: '/images/wa211-case-study.png',
  heroImageAlt:
    'Washington 211 community hands with blue 2-1-1 speech bubble logo',
  projectLabel: 'Corporate research · Washington State',
  details: [
    { label: 'Role', value: 'UX Designer' },
    { label: 'Industry', value: 'Public services · Crisis support' },
    { label: 'Team', value: '4 HCDE students' },
    { label: 'Duration', value: '48 hours' },
  ],
} as const

export const wa211Sections = {
  hook: {
    label: 'When search fails, people still need help',
    body: `Washington 211 connects people in crisis with essential resources — housing, food, health care, and more. When the website makes those resources hard to find, the burden shifts back to call centers and frontline staff.

Our team partnered with WA 211 stakeholders to study how users search for resources today, where the experience breaks down, and what to prioritize before the next site iteration.`,
  },
  challenge: {
    label: 'The challenge',
    body: `The Washington 211 website presented challenges in accessibility and usability when searching for resources — information hidden within tabs or secondary pages, outdated listings, and flows that felt closer to a generic search engine than a guided resource locator.`,
    problemStatement: `How might we help Washington 211 users locate viable resources with less friction — through clearer navigation, stronger search and filters, and trustworthy, location-relevant results?`,
  },
  researchQuestions: [
    'What breakdowns do users experience when trying to locate viable resources on the Washington 211 website?',
    'When navigating the website, which features do 211 users in Washington prioritize?',
    'What challenges occur while users search for resources, and what support features could improve their experience?',
  ],
  purpose: {
    label: 'Study objectives',
    intro:
      'We focused the usability study on improving findability from the search experience — with three objectives for stakeholders:',
    goals: [
      'Improve the resource locator so users can find services with minimal friction.',
      'Identify navigation pain points and reduce reliance on call centers for basic lookups.',
      'Deliver a prioritized list of usability issues with actionable recommendations.',
    ],
  },
  solution: {
    label: 'Solution direction',
    subtitle: 'Search-first, location-aware, and trustworthy.',
    body: `Synthesis across sessions pointed to a smaller set of design principles: surface search earlier, make filters impossible to miss, tie results to real distance, and show when information was last verified.`,
    pillars: [
      {
        title: 'Search from the homepage',
        icon: '🔍',
        body: `Let users start from the homepage without extra hops — with search, filters, and map treated as primary tools instead of buried utilities.`,
      },
      {
        title: 'Filters that match mental models',
        icon: '🎛️',
        body: `Radius-based location, clearer filter affordances, and labels that explain what result counts mean — including options like pets allowed or women & children.`,
      },
      {
        title: 'Trust & live relevance',
        icon: '✓',
        body: `Last-updated dates, live resource status, map markers that refresh with filters, and patterns borrowed from stronger benchmarks like MI 211.`,
      },
    ],
  },
  process: {
    title: 'The process',
    introLabel: 'Research methods',
    intro: `We ran a tight 48-hour research sprint — a preliminary user study to understand baseline experience, followed by moderated usability testing on live search and map tasks.`,
    steps: [
      {
        number: '01',
        title: 'User study',
        body: `A preliminary survey captured participant background and how they currently use the 211 website — establishing context before task-based testing.`,
      },
      {
        number: '02',
        title: 'Usability testing',
        body: `Moderated sessions focused on finding resources by topic and location, using filters and map views, and comparing the WA site to familiar search patterns and MI 211.`,
      },
    ],
  },
  findingsIntro:
    'After analyzing the research data, we were able to present 7 issues & recommendation to our WA 211 stakeholders:',
  findings: [
    {
      number: 1,
      quotes: [
        'There’s a lot to digest on the homepage',
        'There’s not a search bar on the top right where I would usually expect them on a lot of other sites',
      ],
      findingTitle: 'Finding 1: Cluttered layout with unnecessary features & info',
      finding:
        'The homepage contains excessive information, including newsletters and community data, which users find redundant and distracting when seeking emergency help.',
      recommendation:
        'Remove excess features and info so users can initiate search directly from the homepage instead of clicking through to a separate page.',
    },
    {
      number: 2,
      quotes: ['Wouldn’t be anything different if they asked Google.'],
      findingTitle: 'Finding 2: Search engine producing quicker results',
      finding:
        'Users reported that they would prefer to avoid the additional steps required to locate resources when using WA 211.',
      recommendation:
        'Improve search, filter, and map visibility and clarity so 211 differentiates from typical search engines and surfaces viable resources faster.',
    },
    {
      number: 3,
      quotes: [
        'Though I put my zip code, it directs me to faraway places',
        'In spite of it asking me for zip code, it shows me faraway places',
      ],
      findingTitle: 'Finding 3: “Filter by zip code” is ineffective',
      finding:
        'Upon applying their zip code, users were shown resources that were not relative to their location.',
      recommendation:
        'Require a mile radius as a mandatory field during initial search to refine results within range, with a clear disclaimer when no results are available.',
    },
    {
      number: 4,
      observation:
        'One user was unable to locate the filter option because it is almost hidden, but expressed that it would have been helpful to have one.',
      findingTitle: 'Finding 4: General filter options are inadequate',
      finding:
        'Users found filter options limited, difficult to engage with, and the numbers beside filters confusing.',
      recommendation:
        'Add a clickable filter button that opens a pop-up to select and clear filters; expand options (e.g. pets allowed, women & children) and label counts as “results.”',
    },
    {
      number: 5,
      quotes: [
        'The map is so unclear; not sure what the yellow marker represents.',
        'No real-time refresh when I change filters that I want to apply',
      ],
      findingTitle: 'Finding 5: Map visuals and data feel unclear',
      finding:
        'Users found certain map features — like the yellow marker — unclear, and the map did not update when filters changed, leaving stale results visible.',
      recommendation:
        'Use universal map legend conventions and update map results in real time as filters are applied or removed.',
    },
    {
      number: 6,
      findingTitle: 'Finding 6: Outdated resource information & trust issues',
      finding:
        'Users expressed difficulty accessing accurate, relevant, and up-to-date information on the website.',
      recommendation:
        'Display a “last updated” date per resource, show live status (e.g. housing “full” or “fast filling”), and introduce verification labels for credibility.',
      stats: [
        '2/4 users stated that calling 211 provided more accurate and up-to-date information.',
        '1/4 users preferred dialing 211 directly over using the website’s Call button, which opens external apps.',
      ],
    },
    {
      number: 7,
      quotes: [
        'Help button right in the middle is so helpful.',
        'I love the MI 211 over WA211 site visually and structurally.',
      ],
      findingTitle: 'Finding 7: Benchmarking and best practices',
      finding:
        'Over 75% found MI 211 offered a better user experience, with call functions easily accessible — a valuable reference for future iterations.',
      recommendation:
        'Enhance visibility of the “Find Help” section so it aligns with user needs and remains prominently accessible on the site.',
    },
  ] satisfies readonly ResearchFinding[],
  featuresSidebarTitle:
    '7 findings and recommendations we discovered through our research',
  features: [
    {
      title: 'Cluttered Layout',
      headline: 'Finding 1: Cluttered Layout with unnecessary features & info',
      icon: '🔍',
      image: '/images/wa211-finding-1-cluttered-layout.png',
      imageAlt:
        'Finding 1 slide showing cluttered WA 211 homepage layout, user quotes, and 3/4 users overwhelmed statistic',
      quotes: [
        'There’s a lot to digest on the homepage',
        'There’s not a search bar on the top right where I would usually expect them to be on a lot of other sites',
      ],
      description:
        'The homepage contains excessive information, including newsletters and community data, which users find redundant and distracting when seeking emergency help.',
      recommendationHeadline: 'Recommendation 1: Remove excess features & info',
      recommendation:
        'Users can now initiate their search directly from the homepage instead of having to click a link and be redirected to a new webpage.',
      recommendationImage: '/images/wa211-recommendation-1-landing-redesign.png',
      recommendationImageAlt:
        'Recommendation 1 slide with simplified WA 211 homepage hero, on-page search fields, and Find Help call to action',
    },
    {
      title: 'Search Engine',
      headline: 'Finding 2: Search engine producing quicker results',
      icon: '⚡',
      image: '/images/wa211-finding-2-search-engine.png',
      imageAlt:
        'Finding 2 slide with WA 211 homepage screenshot, user quote about Google, and search engine quicker results headline',
      quotes: ['Wouldn’t be anything different if they asked Google.'],
      description:
        'Users reported that they would prefer to avoid the additional steps required to locate resources when using WA 211.',
      recommendationHeadline: 'Recommendation 2: Differentiate from search engines',
      recommendation:
        'Improve the search, filter, and map features by making them more visible and easier to understand. Improving the UI of these features will differentiate 211 from typical search engines.',
      recommendationImage: '/images/wa211-recommendation-2-search-filter-map.png',
      recommendationImageAlt:
        'Recommendation 2 slide showing updated search bar, filters button, location radius, and map with standardized UI elements',
    },
    {
      title: 'Location Radius',
      headline: 'Finding 3: “Filter by zip code” is ineffective',
      icon: '📍',
      image: '/images/wa211-finding-3-zip-code-filter.png',
      imageAlt:
        'Finding 3 slide showing zip code search with resource outside selected 10 mile radius and user quotes about faraway results',
      quotes: [
        'Though I put my zip code, it directs me to faraway places',
        'In spite of it asking me for zip code, it shows me faraway places',
      ],
      description:
        'Upon applying their zip code, users were shown resources that were not relative to their location.',
      recommendationHeadline: 'Recommendation 3',
      recommendation:
        'Require a mile radius as a mandatory field during initial search to refine results within range, with a clear disclaimer when no results are available.',
      recommendationImage: '/images/wa211-recommendation-3-mile-radius-disclaimer.png',
      recommendationImageAlt:
        'Recommendation 3 slide with mandatory mile radius search, map results, and disclaimer modal for resources outside the selected radius',
    },
    {
      title: 'Filter Panel',
      headline: 'Finding 4: General filter options are inadequate',
      icon: '🎛️',
      image: '/images/wa211-finding-4-filter-options.png',
      imageAlt:
        'Finding 4 slide showing indistinct housing search filters beside results, confusing result counts, and observation about hidden filter controls',
      observation:
        'One user was unable to locate the filter option because it is almost hidden, but expressed that it would have been helpful to have one.',
      description:
        'Users found filter options limited, difficult to engage with, and the numbers beside filters confusing.',
      recommendationHeadline: 'Recommendation 4',
      recommendation:
        'Add a clickable filter button that opens a pop-up to select and clear filters; expand options (e.g. pets allowed, women & children) and label counts as “results.”',
      recommendationImage: '/images/wa211-recommendation-4-filter-popup.png',
      recommendationImageAlt:
        'Recommendation 4 slide with clickable Filters button, redesigned filter pop-up with result counts, and expanded filter options',
    },
    {
      title: 'Live Map View',
      headline: 'Finding 5: Map visuals and data feel unclear',
      icon: '🗺️',
      image: '/images/wa211-finding-5-map-pins.png',
      imageAlt:
        'Finding 5 slide with Seattle map showing unclear yellow and blue location pins and user quotes about map clarity and filter refresh',
      quotes: [
        'The map is so unclear; not sure what the yellow marker represents.',
        'No real-time refresh when I change filters that I want to apply',
      ],
      description:
        'Users found certain map features — like the yellow marker — unclear, and the map did not update when filters changed, leaving stale results visible.',
      recommendationHeadline: 'Recommendation 5',
      recommendation:
        'Use universal map legend conventions and update map results in real time as filters are applied or removed.',
      recommendationImage: '/images/wa211-recommendation-5-map-live-updates.png',
      recommendationImageAlt:
        'Recommendation 5 slide comparing before and after map filters with universal location symbol and real-time result updates',
    },
    {
      title: 'Trust & Access',
      headline: 'Finding 6: Outdated resource information & trust issues',
      icon: '✓',
      image: '/images/wa211-finding-6-trust-outdated-info.png',
      imageAlt:
        'Finding 6 slide with outdated resource listing example, user stats on calling 211 versus the website, and Seattle map results',
      description:
        'Users expressed difficulty accessing accurate, relevant, and up-to-date information on the website.',
      recommendationHeadline: 'Recommendation 6',
      recommendation:
        'Display a “last updated” date per resource, show live status (e.g. housing “full” or “fast filling”), and introduce verification labels for credibility.',
      recommendationImage: '/images/wa211-recommendation-6-trust-signals.png',
      recommendationImageAlt:
        'Recommendation 6 slide with last updated dates, live status badges, verification labels, and updated resource list with map',
    },
    {
      title: 'Benchmarking',
      headline: 'Finding 7: Benchmarking and best practices',
      icon: '💡',
      image: '/images/wa211-finding-7-benchmarking.png',
      imageAlt:
        'Finding 7 slide comparing WA211 and MI 211 homepages with user stats favoring MI 211 and quotes on help button and site structure',
      quotes: [
        'Help button right in the middle is so helpful.',
        'I love the MI 211 over WA211 site visually and structurally.',
      ],
      description:
        'Over 75% found MI 211 offered a better user experience, with call functions easily accessible — a valuable reference for future iterations.',
      recommendationHeadline: 'Recommendation 7',
      recommendation:
        'Enhance visibility of the “Find Help” section so it aligns with user needs and remains prominently accessible on the site.',
      recommendationImage: '/images/wa211-recommendation-7-find-help-visibility.png',
      recommendationImageAlt:
        'Recommendation 7 slide with streamlined WA 211 homepage hero, prominent Find Help search, and rationale for emergency-focused access',
    },
  ],
  testimonial: {
    quote: `Wow, this report just became one of the top three most important documents in my entire file system. We typically don't have resources for studies of this depth in our little company.`,
    name: 'Washington 211 Stakeholder',
    title: 'Corporate partner',
  },
  lessonsLearned: [
    {
      title: 'What needs improvement',
      body: `Having a contingency plan would help. Discuss potential pivots and backup plans with the client beforehand.`,
    },
    {
      title: 'What I’d do differently',
      body: `Use upfront written agreements for clearer commitments. Explore alternative usability testing methods for participants less comfortable in digital environments.`,
    },
    {
      title: 'What I learned',
      body: `The importance of early client communication, understanding stakeholder goals ahead of time, and staying flexible in how studies are conducted for the users being researched.`,
    },
  ],
  conclusion: {
    lead: 'This sprint showed how quickly a focused usability study can produce stakeholder-ready priorities — especially when search, filters, and trust are treated as one system.',
    insights: [
      'Homepage clutter and hidden search were the first barriers — before users ever reached viable results.',
      'Location filters and live map updates were critical to perceived accuracy and confidence in results.',
    ],
    nextSteps: {
      label: 'What’s next:',
      items: [
        'Stakeholder approval from the board for implementation budget.',
        'Assemble a team to begin front-end and back-end development of the next site iteration.',
        'Expand research to other user types such as TBI survivors or international users.',
      ],
    },
  },
} as const

export const wa211MoreProjects = [
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
    title: 'SushiTalk',
    role: 'UX Designer',
    href: '/projects/sushitalk',
    description: 'Tutor marketplace for learning Japanese.',
    image: '/images/sushitalk-case-study.png',
    imageAlt: 'SushiTalk kawaii salmon nigiri mascot logo',
    imageBackground: '#f5f0e8',
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
] as const
