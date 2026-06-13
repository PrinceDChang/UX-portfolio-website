import type { CoplanUserFlowData } from '../components/case-study/CoplanUserFlowReveal'

export const sushitalkCompetitiveAudit = {
  columns: ['Platform', 'Gap for SushiTalk'],
  rows: [
    {
      platform: 'iTalki',
      tone: 'rose' as const,
      gap: 'Paywall before meaningful tutor comparison',
    },
    {
      platform: 'HelloTalk',
      tone: 'amber' as const,
      gap: 'Social chat — weak structured matching',
    },
    {
      platform: 'Duolingo',
      tone: 'green' as const,
      gap: 'No human tutors or Japan-life context',
    },
    {
      platform: 'ADPList',
      tone: 'violet' as const,
      gap: 'Career mentors — not language + relocation',
    },
    {
      platform: 'Care.com',
      tone: 'sky' as const,
      gap: 'Marketplace model — not language journeys',
    },
    {
      platform: 'TaskRabbit',
      tone: 'slate' as const,
      gap: 'Task focus — no tutor specialization',
    },
  ],
} as const

export const sushitalkPersonas = [
  {
    id: 'tom',
    name: 'Tom',
    role: 'Learner',
    emoji: '🎓',
    tone: 'sky' as const,
    goal: 'JLPT N2 prep while planning a move to Tokyo',
    frustration: 'Profiles hide whether tutors understand visa timelines',
  },
  {
    id: 'misty',
    name: 'Misty',
    role: 'Learner',
    emoji: '🌸',
    tone: 'rose' as const,
    goal: 'Conversation practice + daily life in Osaka',
    frustration: 'Hard to compare teaching style before paying',
  },
  {
    id: 'reina',
    name: 'Reina',
    role: 'Mentor',
    emoji: '📚',
    tone: 'amber' as const,
    goal: 'Host flexible sessions for professional learners',
    frustration: 'Platforms treat all learners the same',
  },
  {
    id: 'takashi',
    name: 'Takashi',
    role: 'Mentor',
    emoji: '🥋',
    tone: 'violet' as const,
    goal: 'Offer relocation guidance alongside language',
    frustration: 'No room to show life-in-Japan specialties',
  },
] as const

export const sushitalkUserFlow: CoplanUserFlowData = {
  sections: [],
  nodes: [
    { id: 'landing', kind: 'state', label: 'Landing', x: 70, y: 140, r: 36 },
    { id: 'browse', kind: 'action', label: 'Browse tutors', x: 220, y: 140, w: 110 },
    { id: 'search', kind: 'decision', label: 'Search &\nfilter', x: 380, y: 140 },
    { id: 'profile', kind: 'action', label: 'Tutor profile', x: 540, y: 140, w: 110 },
    { id: 'signup', kind: 'decision', label: 'Sign up', x: 700, y: 140 },
    { id: 'learner-profile', kind: 'action', label: 'Learner profile', x: 860, y: 140, w: 120 },
    { id: 'mentor-signup', kind: 'action', label: 'Mentor sign-up', x: 380, y: 280, w: 110 },
    { id: 'schedule', kind: 'action', label: 'Schedule lesson', x: 700, y: 280, w: 120 },
  ],
  edges: [
    { from: 'landing', to: 'browse', routing: 'h-first' },
    { from: 'browse', to: 'search', routing: 'h-first' },
    { from: 'search', to: 'profile', routing: 'h-first', label: 'Yes' },
    { from: 'search', to: 'mentor-signup', routing: 'v-first', label: 'No' },
    { from: 'profile', to: 'signup', routing: 'h-first' },
    { from: 'signup', to: 'learner-profile', routing: 'h-first', label: 'Yes' },
    { from: 'signup', to: 'schedule', routing: 'v-first', label: 'No' },
    { from: 'profile', to: 'schedule', routing: 'v-first' },
  ],
  revealOrder: [
    'landing',
    'browse',
    'search',
    'profile',
    'signup',
    'learner-profile',
    'mentor-signup',
    'schedule',
  ],
}

export const sushitalkMoodboard = {
  colors: [
    { name: 'Sushi gold', hex: '#F5C842' },
    { name: 'Salmon', hex: '#E8927C' },
    { name: 'Ocean', hex: '#5B8DEF' },
    { name: 'Matcha', hex: '#7CB87A' },
    { name: 'Ink', hex: '#1A1A26' },
    { name: 'Cream', hex: '#F5F0E8' },
  ],
  fonts: ['DM Sans', 'Noto Sans', 'Inter', 'Open Sans'],
  tags: ['Friendly', 'Trustworthy', 'Approachable', 'Not corporate edtech'],
} as const

export const sushitalkProcessArtifactTabs = [
  { id: 'audit', label: 'Competitive audit', shortLabel: 'Audit' },
  { id: 'personas', label: 'Personas', shortLabel: 'Personas' },
  { id: 'flow', label: 'User flow', shortLabel: 'Flow' },
  { id: 'moodboard', label: 'Moodboard', shortLabel: 'Mood' },
] as const
