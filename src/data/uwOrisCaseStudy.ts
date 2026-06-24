export const uwOrisImpactMetrics = [
  { value: '1.5+', label: 'Hours saved per award' },
  { value: '~3,000', label: 'Hours returned for GM/year' },
  { value: '25–33%', label: 'Workload reduction per GM' },
  { value: '8 → 1', label: 'Data sources consolidated' },
] as const

export const uwOrisCaseStudyMeta = {
  role: 'UX Designer',
  title: 'UW ORIS',
  logo: '/images/uw-oris-logo.png',
  logoWidth: 746,
  logoHeight: 367,
  logoAlt: 'University of Washington wordmark logo',
  tagline:
    'SAGE Smart Budgeting — an AI-assisted redesign of the research-award budgeting workflow at UW Office of Research Information Services (ORIS), built so grant managers build their budget efficiently without worrying about the tedious tasks.',
  heroImage: '/images/uw-oris-case-study.png',
  heroImageAlt:
    'SAGE Smart Budgeting worksheet on a curved monitor in a UW office, with campus and Mount Rainier visible through the window',
  projectLabel: 'Research administration · HCDE capstone 2026',
  impactMetrics: uwOrisImpactMetrics,
  details: [
    { label: 'Role', value: 'UX Designer · Research' },
    { label: 'Industry', value: 'Higher education / research admin' },
    { label: 'Team', value: '1 Project Manager, 2 Designers, 1 Researcher' },
    { label: 'Duration', value: 'Jan – May 2026' },
  ],
} as const

export const uwOrisSections = {
  hook: {
    label: 'Most of the work is between the tools',
    lead:
      'Grant managers juggle dozens of awards at once — but the hardest work happens in the gaps between tools, not inside any one of them.',
    stats: [
      { value: '75+', label: 'Active awards per grant manager' },
      { value: '8+', label: 'Surfaces to assemble each budget' },
      { value: '2–3h', label: 'Manual copying before judgment work' },
    ],
    surfacesLabel: 'Where budget data lives today',
    surfaces: [
      'Notice of Award (PDF)',
      'Shared folders',
      'Excel templates',
      'Federal rate sites',
      'UW rate sites',
      'Workday',
      'Sponsor portals',
      'Email',
      'SAGE',
    ],
    quote: {
      text:
        'Every grant manager on campus is filling in all of this information piece by piece, all of the time.',
      attribution: 'Grant manager, 20+ years at UW',
    },
    insight: {
      label: 'The real problem',
      text:
        'A coordination problem dressed up as a tooling problem — every modernization added a surface without removing the scatter.',
    },
  },
  challenge: {
    label: 'The challenge',
    body: `UW ORIS initially tasked us with the challenge of automating Notice of Award extraction into SAGE (System to Administer Grants Electronically). However, research indicated a larger issue within the budget setup portion of the process which yielded more problems and immediate attention.`,
    problemStatement: `How might we help grant managers streamline their budget setup process without making their jobs obsolete and respect their current workflow?`,
  },
  researchQuestions: [
    'How might the award setup process be redesigned to reduce manual effort and improve visibility for all stakeholders?',
    'How do research administrators make sense of and navigate the award setup process across its different stakeholders, systems, and information sources?',
    'Where does the current award setup process create the most friction, delay, or risk of error? Why?',
    'How do stakeholders across the setup process maintain shared awareness of status, responsibilities, and outstanding decisions?',
    'What role could AI or automation play in reducing manual and cognitive load in award setup without creating new dependencies or trust issues?',
  ],
  whosThisFor: {
    title: "Who's this for",
    audiences: [
      {
        label: 'Primary — Grant Managers',
        body: 'Grant Managers (GMs) use Smart Budgeting to build and reconcile multi-year budget(s) across Excel and SAGE without losing rationale, versions, or numbers along the way.',
      },
      {
        label: 'Secondary — PIs & OSPs',
        body: 'Principal investigators (researchers) and Office of Sponsor Programs or OSP (reviewers) benefit downstream, but neither drives the design.',
      },
      {
        label: 'Sponsor — UW ORIS',
        body: 'ORIS gains a validated design direction and a field-tested workflow aligned with its roadmap to modernize research administration.',
      },
    ],
  },
  solution: {
    label: 'Solution',
    subtitle: 'Smart Budgeting Plug-in System',
    body: `SAGE Smart Budgeting embeds an Excel-like worksheet directly inside SAGE so GMs can have a unifying source of information. AI handles all the math/rate searching while still leaving users in charge.`,
    pillars: [
      {
        title: 'Consolidate the surface',
        icon: '📊',
        body: `Bring the spreadsheet inside SAGE. Six of six GMs already mastered Excel and treated SAGE as a system of record they re-entered everything into — embedding preserves the manual fallback while eliminating double entry and rounding mismatches.`,
      },
      {
        title: 'AI on the in-between work',
        icon: '🤖',
        body: `Let AI parse the NOA, fetch authoritative rates, fill standard lines, calculate dollar ↔ percent effort, and map fields back to SAGE — the scatter that compounds across dozens of awards.`,
      },
      {
        title: 'Humans keep judgment',
        icon: '✅',
        body: `Rates, exceptions, FCOI sign-off, reconciliation tradeoffs, and submit stay with the accountable grant manager. Auto-fix is offered, never silent — with confidence chips, source labels, and preview-then-confirm at every commit point.`,
      },
    ],
    demoVideo: {
      src: '/videos/uw-oris-smart-budgeting-demo.mp4',
      title: 'SAGE Smart Budgeting — live prototype',
      caption:
        'Context setup, budget settings, worksheet, and import gates — interactive prototype built in Cursor',
      openUrl: 'https://hcdeorbit.netlify.app/',
      ctaLabel: 'Open prototype in new tab',
    },
  },
  finalDesign: {
    label: 'Final design',
    body: `We delivered a working high-fidelity prototype covering four hand-off gates — Context Setup, Budget Settings, Budget Worksheet (the hero screen), and Import to SAGE — validated with moderated think-aloud sessions and a complementary contextual inquiry on the current workflow.`,
    prototype: {
      title: 'SAGE Smart Budgeting — live prototype',
      caption:
        'Context setup, budget settings, worksheet, and import gates — interactive prototype built in Cursor',
      embedUrl: 'https://hcdeorbit.netlify.app/',
      openUrl: 'https://hcdeorbit.netlify.app/',
      frame: { width: 1280, height: 800 },
    },
    processComparison: {
      eyebrow: 'Impact',
      title: 'How UW Research Award Budgeting works',
      caption:
        'Three workflow stages — BUILD, SUBMIT, and RESOLVE MISMATCH — transform from fragmented Excel ↔ SAGE round-trips into a single embedded worksheet with auto-fill, merged steps, and in-place reconciliation.',
      beforeColumnLabel: 'Before',
      afterColumnLabel: 'With embedded worksheet in SAGE',
      rows: [
        {
          phase: '1',
          phaseLabel: 'BUILD',
          beforeSteps: [
            'Create budget in Excel',
            'Search budget information across 8+ sites',
            'Manage Excel file and attachments',
            'Email PIs back & forth for review and approval',
          ],
          bridge: { badge: 'Merged + automated', detail: '4 steps → 1' },
          afterTitle: 'Create budget in embedded worksheet in SAGE',
          afterBullets: [
            'Budget information auto-populated',
            'Attachment preview options',
            'PI review request with a button',
          ],
          impact:
            'No more switching between multiple screens and tabs. All auto-fills salary, fringe, tuition & % effort with every value sourced.',
        },
        {
          phase: '2',
          phaseLabel: 'SUBMIT',
          beforeSteps: [
            'Copy Excel budget into SAGE portal',
            'Create and Submit eGC1 to UW',
            'Submit research proposal to sponsor organizations',
            'Receive Notice of Award',
          ],
          bridge: { badge: 'Merged', detail: '2 → 1' },
          afterSteps: [
            'Auto populate eGC1 and submit to UW',
            'Submit research proposal to sponsor organizations',
            'Receive Notice of Award',
          ],
          impact:
            'The worksheet is the submission. No copy-into-SAGE and no manual entry. Everything auto-linked and mapped to the right fields.',
        },
        {
          phase: '3',
          phaseLabel: 'RESOLVE MISMATCH',
          beforeSteps: [],
          bridge: { badge: 'Simplified', detail: 'Round-trip removed' },
          beforeFlow: {
            question: 'Award amount changed?',
            yesPath: ['Edit in Excel', 'Re-copy and paste to SAGE'],
            noLabel: 'No change',
            tail: 'Create and Submit ASR',
          },
          afterFlow: {
            question: 'Award amount changed?',
            yesPath: ['Resolve mismatch with suggestion'],
            noLabel: 'No change',
            tail: 'Create and Submit ASR',
          },
          impact:
            'Mismatch is resolved in one single space with suggestion. Differences in numbers are flagged automatically and the final judgment still stays with the GM.',
        },
      ],
      backend: {
        label: 'Knowledge & data layer — backend',
        note: 'Auto-filled & validated · powers every SAGE step',
        sources: [
          'Salary Tables',
          'Fringe Rates',
          'Past Grants',
          'Tuition Rates',
          'Sponsor Guidelines',
          'AI & Rules Engine',
        ],
      },
      impactMetrics: uwOrisImpactMetrics,
    },
  },
  pivot: {
    intro:
      'After conducting our research and getting adequate confirmation from the six grant managers we interviewed, we realized we could offer more impact by reframing the problem to the budget workflow.',
    original: {
      label: 'Original brief',
      text: 'When a Notice of Award arrives from a sponsor, transferring its data into SAGE Budget is manual, error-prone, and slow. Could we design a smoother handoff?',
    },
    revised: {
      label: 'Revised brief',
      text: 'How do GMs build the budget in the first place, and why is it so painful?',
    },
  },
  findingsIntro:
    'After contextual inquiry with six grant managers and usability testing with four (three moderated prototype walkthroughs plus one complementary inquiry on current SAGE), these patterns drove the design direction.',
  findings: [
    { value: '6/6', label: 'GMs build budgets in Excel first, then re-enter into SAGE' },
    { value: '8+', label: 'Surfaces bridged per award (NOA, Excel, rates, Workday, SAGE…)' },
    { value: '2–3h', label: 'Copying & assembly time per award before judgment work' },
  ],
  userFlow: {
    title: 'Smart Budgeting Flow in SAGE — Enhanced End to End',
    subtitle:
      'Guided, validated, and trusted budgeting from planning to submission.',
    entryLabel: 'Grant Manager enters SAGE portal',
    steps: [
      {
        icon: '📁',
        tone: 'sky',
        title: 'Load Award Context',
        bullets: [
          'Opens award and navigates to Budgeting',
          'System auto-loads PI, grant type, department, year, and sponsor details',
        ],
      },
      {
        icon: '📊',
        tone: 'emerald',
        title: 'Open Smart Budget Workspace (Embedded Excel)',
        bullets: [
          'Launch embedded Excel within SAGE',
          'Budget template auto-loaded with award details',
        ],
      },
      {
        icon: '⚙️',
        tone: 'teal',
        title: 'Backend Context & Knowledge Initialization',
        bullets: [
          'System builds context (PI, role, dept, year, sponsor)',
          'Connects to knowledge base salary tables, tuition rates, fringe, rules and past similar grants',
        ],
      },
      {
        icon: '✨',
        tone: 'sky',
        title: 'Smart Autofill During Budgeting',
        bullets: [
          'As GM fills the sheet, values auto-populate (salary, tuition, fringe, etc.)',
          'Shows AI suggestion with confidence, source and “why this value”',
        ],
      },
      {
        icon: '🛡️',
        tone: 'violet',
        title: 'Inline Validation & Reconciliation',
        bullets: [
          'Real-time checks as data is entered',
          'Highlights mismatches, rounding issues and rule violations',
          'Provides suggestions to fix',
        ],
      },
      {
        icon: '📋',
        tone: 'cyan',
        title: 'Pre-Import Validation Checkpoint',
        bullets: [
          'Summary of readiness before import',
          'All required fields · Total balance · Sponsor limits',
          'GM resolves remaining issues (manually or with auto-fix)',
        ],
      },
      {
        icon: '☁️',
        tone: 'emerald',
        title: 'One-Click Import to SAGE',
        bullets: [
          'Import map Excel rows to SAGE fields',
          'Preview of data to be imported',
          'Highlight any conflicts or unmapped fields',
        ],
      },
      {
        icon: '🔍',
        tone: 'indigo',
        title: 'Post-Import Review in SAGE',
        bullets: [
          'Budget appears in SAGE tables',
          'Highlights imported and adjusted values',
          'GM reviews and verifies accuracy',
        ],
      },
      {
        icon: '✅',
        tone: 'violet',
        title: 'Final Validation (System-Level)',
        bullets: [
          'System checks Workday compatibility',
          'Required fields & compliance rules',
          'No critical errors · Ready for submission',
        ],
      },
      {
        icon: '✈️',
        tone: 'amber',
        title: 'Submission',
        bullets: [
          'GM submits the budget',
          'Status updates visible to PI and OSP',
        ],
      },
      {
        icon: '🔄',
        tone: 'teal',
        title: 'Workflow Continues',
        bullets: [
          'Next approvers notified',
          'Workflow continues in SAGE',
        ],
      },
    ],
    crossCutting: {
      label: 'Cross-Cutting Capabilities (Throughout the Flow)',
      startStep: 1,
      endStep: 9,
      items: [
        { icon: '💡', label: 'AI Suggestions with confidence and source' },
        { icon: '❓', label: '“Why this value?” explanations' },
        { icon: '⚖️', label: 'Risk / Compliance indicators' },
        { icon: '⏱️', label: 'Auto-fix suggestions for rounding or mismatches' },
        { icon: '📜', label: 'Audit trail & value history' },
        { icon: '💬', label: 'In-app help and guidance' },
      ],
    },
    backend: {
      label: 'Knowledge & Data Layer (Backend)',
      connectsToStep: 2,
      items: [
        { icon: '📚', label: 'Salary Tables (FY-wise)' },
        { icon: '🎓', label: 'Tuition Rates (Program-wise)' },
        { icon: '👥', label: 'Fringe Rates (Employee Type)' },
        { icon: '📄', label: 'Sponsor Guidelines & Rules' },
        { icon: '📂', label: 'Past Grants & Similar Awards' },
        { icon: '🧠', label: 'AI & Rules Engine (Suggestions, Validation)' },
      ],
    },
  },
  process: {
    title: 'The process',
    introLabel: 'Research → pivot → validate',
    intro: `The project ran across two quarters in four phases — from broad “automate award setup” through contextual research, a scope pivot to budgeting, trust-framework mapping, high-fidelity prototyping, and usability validation with returning grant-manager participants.`,
    steps: [
      {
        number: '01',
        title: 'Secondary research & survey',
        body: `We mapped the UW research-administration ecosystem through ORIS documentation, SAGE tutorials, social channels, and the AI4RA framework from University of Idaho.`,
        listItems: [
          'Surveyed 12+ grant managers across 12 UW departments to understand award-setup workload and pain points.',
          'Used survey results to prioritize interview directions and identify the Excel ↔ SAGE round-trip as the highest-leverage problem.',
        ],
      },
      {
        number: '02',
        title: 'Contextual inquiry',
        body: `Semi-structured contextual inquiry with six grant managers — watching real work (tabs open, copy-paste paths, rate lookups) rather than asking them to describe it.`,
        listItems: [
          '67+ combined years of experience; 200+ active awards represented across Aero/Astro, HCDE, Medicine, Pathology, Global Health, and Built Environments.',
          'Clustered pain points: scattered information, Excel as shadow system, percent-effort calculation as #1 time sink, preventable ASR returns.',
        ],
      },
      {
        number: '03',
        title: 'Trust framework mapping',
        body: `Before wireframes, we mapped every AI touchpoint to Microsoft HAX, Google PAIR, and AI4RA tiers — defining where AI can lead (NOA parsing, rate fetch) vs. where humans must own the commit (submit, compliance sign-off).`,
        listItems: [
          'Trust trifecta: confidence chip + source + “why this value” on every AI suggestion.',
          'Categorical confidence (High / Medium / Low) with paired actions — not numeric probabilities.',
          'Structured diff before any AI write-back to SAGE.',
        ],
      },
      {
        number: '04',
        title: 'Prototype & Usability Testing (x4)',
        body: `Merged four teammate ideations into one consolidated direction — SAGE as host with an embedded worksheet — then validated with moderated think-aloud sessions.`,
        listItems: [
          'Three GMs walked through the live prototype; a fourth gave complementary inquiry on current SAGE.',
          'Mock-data disclaimer reframed sessions from “is the number right?” to “how do you respond to the system’s behavior?”',
          'Iterated on click-to-see math, two-step Apply Fix, rate freshness labels, and “Worksheet” naming.',
        ],
      },
    ],
    researchGallery: {
      title: 'Capstone Showcase',
      intro:
        'On June 3rd, I presented our projects to program faculty, my cohort, friends, family, and industry professionals at the HCDE Capstone Showcase.',
      photos: [
        {
          src: '/images/uw-oris-gallery-showcase-map.png',
          alt: 'HCDE 2026 Capstone Showcase floor plan poster with booth locations',
          caption:
            'HCDE 2026 Capstone Showcase — floor plan with project categories and booth assignments.',
        },
        {
          src: '/images/uw-oris-gallery-booth.png',
          alt: 'Capstone showcase booth with poster, monitor, and laptop on a display table',
          caption:
            'Booth 37 at the HCDE Capstone Showcase — poster, live prototype, and “Data scattered across 8+ systems” presentation.',
        },
        {
          src: '/images/uw-oris-gallery-presentation.png',
          alt: 'Monitor displaying grant manager persona slide next to a laptop running the SAGE prototype',
          caption:
            'Presentation slide — grant managers responsible for tracking 62+ research awards at a time.',
        },
        {
          src: '/images/uw-oris-gallery-laptops.png',
          alt: 'Two laptops showing the before/after workflow diagram and live SAGE budget draft interface',
          caption:
            'Side-by-side demo — workflow impact diagram and the embedded worksheet prototype in SAGE.',
        },
        {
          src: '/images/uw-oris-gallery-capstone-portrait.png',
          alt: 'Team member posing at the capstone booth with poster and prototype setup',
          caption:
            'At the booth — presenting Smart Budgeting for Research Administration to visitors and judges.',
        },
        {
          src: '/images/uw-oris-gallery-presenting.png',
          alt: 'Presenting Smart Budgeting to visitors at the capstone showcase booth',
          caption:
            'Walking visitors through the poster and prototype — explaining how embedded budgeting reduces grant manager workload.',
        },
        {
          src: '/images/uw-oris-gallery-team.png',
          alt: 'Team ORBIT standing together in front of the Smart Budgeting research poster',
          caption:
            'Team ORBIT at the showcase — Jiyae, Nirmal, Oey, and Shivangi in front of our capstone poster.',
        },
        {
          src: '/images/uw-oris-gallery-team-selfie.png',
          alt: 'Team ORBIT group selfie at the capstone showcase with posters in the background',
          caption:
            'Celebrating presentation day — the team after walking stakeholders through the prototype.',
        },
        {
          src: '/images/uw-oris-gallery-team-mentor.png',
          alt: 'Team ORBIT with faculty mentor at the capstone showcase',
          caption:
            'Team photo with our capstone mentor after the showcase presentation.',
        },
        {
          src: '/images/uw-oris-gallery-name-tags.png',
          alt: 'Cookie tray with Team ORBIT name tags and I Heart Research stickers',
          caption:
            'Showcase swag — name tags for the team and “I ♥ RESEARCH” stickers for visitors.',
        },
        {
          src: '/images/uw-oris-gallery-poster.png',
          alt: 'Team ORBIT capstone research poster — Smart Budgeting for Research Administration',
          caption:
            'Capstone poster — context, problem, solution walkthrough, and projected impact for grant managers at UW.',
        },
      ],
    },
  },
  featuresSidebarTitle: 'Five features and updates in the proposed workflow',
  featuresTitle: 'New Features Integrated',
  sageIntegration: {
    title: 'All aspects into SAGE',
    subtitle:
      'Excel, email, files, APIs, and institutional data — unified in one budgeting workspace instead of scattered across 8+ surfaces.',
    hubLabel: 'SAGE',
    aspects: [
      { label: 'Database', angle: -90 },
      { label: 'API', angle: -30 },
      { label: 'Files', angle: 30 },
      { label: 'Email', angle: 150 },
      { label: 'Excel', angle: -150 },
    ],
  },
  solutionFeaturesLabel: 'Solution and Features',
  solutionFeaturesTitle: 'Before & After our solution',
  worksheetCompare: {
    beforeSrc: '/images/uw-oris-worksheet-compare-before.jpg',
    afterSrc: '/images/uw-oris-worksheet-compare-after.jpg',
    beforeLabel: 'Before',
    afterLabel: 'After',
    beforeAlt:
      'Legacy SAGE budget worksheet — multi-panel layout with separate salary, other costs, and totals tables',
    afterAlt:
      'SAGE Smart Budgeting worksheet — streamlined spreadsheet-style budget draft with personnel, travel, and direct costs in one view',
  },
  features: [
    {
      title: 'Budget Worksheet',
      headline: 'The spreadsheet inside SAGE',
      icon: '📊',
      video: '/videos/uw-oris-feature-g3-budget-worksheet.mp4',
      imageAlt:
        'SAGE Budget Worksheet — spreadsheet-style budget draft with mismatch resolution banner and personnel line items',
      description:
        'The hero screen — an Excel-like worksheet with live totals, dollar ↔ percent effort calculation, typed mismatch detection (Rounding / Substantive / Missing), and a suggested fix the GM can accept, edit, or reject.',
    },
    {
      title: 'Prefill Budget',
      headline: 'Starting a New Budget without Starting from Scratch',
      icon: '🔒',
      video: '/videos/uw-oris-feature-g4-import-to-sage.mp4',
      imageAlt:
        'SAGE Smart Budgeting Excel add-in — spreadsheet with PDF source viewer, SAGE Add-in sidebar, and running total vs. target',
      description:
        'Users can easily pull and copy data from previous budgets they have worked on with a quick search and start a new budget without having to redo the same work again.',
    },
    {
      title: 'Context Setup',
      headline: 'Parse the NOA',
      icon: '📄',
      video: '/videos/uw-oris-feature-g1-noa.mp4',
      imageAlt:
        'SAGE Notice of Award upload screen — AI extracts fields from the NoA PDF and surfaces a diff against the worksheet',
      description:
        'The NOA arrives; AI extracts award number, dates, total, PI, sponsor, F&A, and salary cap — surfacing the delta against the existing eGC1 record. Medium/low-confidence fields queue for GM verification; system-owned fields stay read-only.',
    },
    {
      title: 'Mismatch Resolve',
      headline: 'Resolve Budget Mismatch with one click',
      icon: '⚙️',
      video: '/videos/uw-oris-feature-g2-mismatch-resolve.mp4',
      imageAlt:
        'SAGE Budget Worksheet — mismatch resolution banner with suggested one-click fix for rounding discrepancy',
      description:
        'The AI tool goes through budget history and suggests potential mismatch resolutions that reflect what the user has done in past budget setups — with a one-click fix.',
    },
    {
      title: 'Knowledge & Data Layer',
      headline: 'Backend',
      icon: '🛡️',
      image: '/images/uw-oris-feature-g5-knowledge-data-layer.png',
      imageWidth: 1024,
      imageHeight: 284,
      imageAlt:
        'Knowledge and data layer backend diagram — salary tables, fringe rates, past grants, tuition rates, sponsor guidelines, and AI rules engine',
      imageFill: true,
      imageFillCover: true,
      imageFrameClass:
        'flex min-h-[200px] flex-1 flex-col overflow-hidden bg-[#f4f4f6] md:min-h-[240px] md:max-h-[280px]',
      description:
        'Authoritative UW and federal sources — salary tables, fringe and tuition rates, sponsor guidelines, past grants, and an AI rules engine — feed every suggestion and validation in Smart Budgeting.',
    },
  ],
  testimonial: {
    quote: `Just having it all there instead of having to search for things… saves hours. A minimum of two.`,
    name: 'Grant manager',
    title: 'Earth & Space Sciences',
  },
  conclusion: {
    lead: `SAGE Smart Budgeting reframes research-award budgeting from a multi-tool scavenger hunt into a single worksheet with AI on the in-between work and humans at every commit gate. Early usability evidence points to 25–33% workload reduction and 75–150 hours reclaimed per GM per year.`,
    insights: [
      'The problem was coordination between systems — not grant managers lacking diligence.',
      'Embedding Excel inside SAGE beats replacing it; six of six GMs already think in spreadsheets.',
      'Trust in AI-assisted financial tools requires provenance, reversibility, and deliberate friction at commit points.',
      'Usability testing with mock data successfully shifted sessions from accuracy debates to trust-calibration behavior.',
    ],
    nextSteps: {
      label: 'Handoff to ORIS',
      items: [
        'Connect authoritative rate connectors (Workday, Graduate School, OMA, OPB) behind the knowledge layer.',
        'Production-grade NOA extraction with measured field-level error rates and confidence thresholds.',
        'Close parity gaps with current SAGE (F&A cost base line, grad academic/summer split, 3-decimal percent effort).',
        'Phased rollout starting with the Budget Worksheet gate — highest observed time savings.',
      ],
    },
  },
  lessonsLearned: [
    {
      title: 'Pivot with evidence',
      body: `Contextual inquiry gave us permission to narrow scope from “automate all of award setup” to “kill the Excel ↔ SAGE round-trip” — a sharper bet backed by six identical workflows.`,
    },
    {
      title: 'Design for verify',
      body: `GMs broke trust when numbers had no visible math. Click-to-see breakdowns, source labels, and two-step Apply Fix turned AI from a black box into something they could defend to an auditor.`,
    },
    {
      title: 'Language is UX',
      body: `"Workspace" collided with grants.gov terminology; renaming to "Worksheet" matched GM mental models. Small naming decisions carry outsized weight in expert domains.`,
    },
  ],
  videoPrototype: {
    embedSrc:
      'https://drive.google.com/file/d/1V0186XQ3QW0cT-mx-3oi0lEv5O1OzEvo/preview',
    title: 'SAGE video prototype — Smart Budgeting walkthrough',
    footerLabel: 'Video prototype',
  },
  reportLinks: {
    label: 'Full capstone deliverables',
    items: [
      {
        label: 'Live prototype',
        href: 'https://hcdeorbit.netlify.app/',
      },
      {
        label: 'Stakeholder final report (Google Doc)',
        href: 'https://docs.google.com/document/d/1aqGnJ_CYS-NDHeHUIhA9-z8n9FhwBjBm0yFvlcPrngs/edit',
      },
    ],
  },
} as const
