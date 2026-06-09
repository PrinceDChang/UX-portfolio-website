export type WushuMediaOrientation = 'portrait' | 'landscape'

export interface WushuMediaItem {
  id: string
  type: 'image' | 'video'
  src: string
  alt: string
  caption?: string
  orientation: WushuMediaOrientation
  poster?: string
  loop?: boolean
  autoPlay?: boolean
  muted?: boolean
  sourceUrl?: string
  scale?: number
  align?: 'left' | 'center' | 'center-left'
  splitPrimary?: string
  frameShape?: 'portrait' | 'square' | 'landscape'
  rowLayout?: '2x2'
  row?: {
    src: string
    alt: string
    below?: {
      src: string
      alt: string
    }
  }[]
  companion?: {
    type?: 'image' | 'video'
    src: string
    alt: string
    poster?: string
    loop?: boolean
    autoPlay?: boolean
    muted?: boolean
    sourceUrl?: string
    scale?: number
    frameShape?: 'portrait' | 'square' | 'landscape'
    heightScale?: number
    splitWidth?: string
    align?: 'left' | 'right'
  }
  belowPrimary?: {
    type: 'image' | 'video'
    src: string
    alt: string
    poster?: string
    loop?: boolean
    autoPlay?: boolean
    muted?: boolean
  }
}

export const wushuPage = {
  label: 'Wushu',
  headline: {
    primary: 'Wushu is my identity and',
    accent: 'creative passion.',
  },
  accent: '#9970FF',
  accentMuted: 'rgba(153, 112, 255, 0.16)',
  bio: {
    lead:
      'Wushu is where I am most free and myself. It has shaped who I am today.',
    paragraphs: [
      'Wushu is modern martial art that combines traditional martial art with acrobatics. I have traveled around the world to compete, perform and train in Wushu ever since I was 10 years old.',
      'Wushu has been a way for me to express myself though movements and choreography. It helps me stay active, flexible and strong while being part of a community that I call my second family.',
      'My favorite form I like to do is Jianshu (Striaghtsword), Qiangshu (Spear) and Changquan (Longfist). I have also done many other special forms & weapons throughout my career and wushu, hopefully one day being able to compete/partake on a global stage.',
    ],
  },
  media: [
    {
      id: 'wushu-reel',
      type: 'video',
      src: '/videos/wushu-reel.mp4',
      alt: 'Oey Chang wushu training reel',
      orientation: 'portrait',
      loop: true,
      autoPlay: true,
      muted: true,
      splitPrimary: '33.333%',
      align: 'left',
      frameShape: 'portrait',
      sourceUrl: 'https://www.instagram.com/reel/DXxCfhFviDH/',
      companion: {
        src: '/images/wushu-aerial-sword.png',
        alt: 'Wushu athlete performing an aerial sword form above a purple competition mat',
        frameShape: 'landscape',
        heightScale: 0.625,
      },
    },
    {
      id: 'live-testing',
      type: 'image',
      src: '/images/wushu-competition-performance.png',
      alt: 'Two wushu athletes performing a choreographed duel on the competition mat',
      caption: 'Competition floor — rhythm under pressure.',
      orientation: 'landscape',
    },
    {
      id: 'poster',
      type: 'video',
      src: '/videos/wushu-festival-reel.mp4',
      alt: 'Seattle International Wushu Festival reel',
      orientation: 'portrait',
      loop: true,
      autoPlay: true,
      muted: true,
      sourceUrl: 'https://www.instagram.com/reel/Ckl_dMbDNXZ/?igsh=MTl2OXFwc3cxZHpjYg==',
    },
    {
      id: 'portrait',
      type: 'image',
      src: '/images/wushu-jian-arena.png',
      alt: 'Oey Chang performing jian sword form at a wushu competition',
      orientation: 'landscape',
      frameShape: 'landscape',
      companion: {
        type: 'video',
        src: '/videos/wushu-jian-form.mp4',
        alt: 'Oey Chang jian sword form in motion',
        loop: true,
        autoPlay: true,
        muted: true,
        splitWidth: '33.333%',
        frameShape: 'portrait',
        align: 'left',
        sourceUrl: 'https://www.instagram.com/reel/DKL21sYRPb6/?igsh=ZTQyOGp6NTFvaWti',
      },
      belowPrimary: {
        type: 'video',
        src: '/videos/wushu-scoring.mp4',
        alt: 'Wushu competition performance video',
        loop: true,
        autoPlay: true,
        muted: true,
      },
    },
    {
      id: 'announcer',
      type: 'image',
      src: '/images/wushu-competition-broadsword.png',
      alt: 'Wushu competition highlights',
      orientation: 'landscape',
      rowLayout: '2x2',
      row: [
        {
          src: '/images/wushu-competition-broadsword.png',
          alt: 'Wushu athlete performing with a broadsword before a stadium audience',
        },
        {
          src: '/images/wushu-competition-split.png',
          alt: 'Wushu performers on stage during a martial arts demonstration',
        },
        {
          src: '/images/wushu-competition-arena.png',
          alt: 'Competitor on the mat facing judges at a wushu tournament',
        },
        {
          src: '/images/wushu-competition-medals.png',
          alt: 'Young wushu athlete displaying three gold medals at a competition',
        },
      ],
    },
  ] satisfies WushuMediaItem[],
}
