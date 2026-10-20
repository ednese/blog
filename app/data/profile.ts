// Every fact and number below comes from my CV,
// except Fifteen (from an earlier CV), the education dates (LinkedIn) and
// DAFi usage (admin dashboard). Keep DAFi revenue, trials and subscriptions out.
// Don't add a figure here that isn't in one of those.

export const links = [
  { label: 'Email', href: 'mailto:pro@evansende.com' },
  { label: 'GitHub', href: 'https://github.com/ednese' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/evan-sende/' },
]

export type Stat = {
  value: string
  label: string
  source?: string
}

export type Chart =
  | {
      kind: 'meter'
      label: string
      value: number // 0-100
      from?: number // previous value, drawn as a marker
      display: string
    }
  | {
      kind: 'bars'
      label: string
      items: { label: string; value: number; display: string; href?: string }[]
    }
  | {
      kind: 'compare'
      label: string
      series: [string, string]
      items: { label: string; a: number; b: number }[]
    }

export type UseCase = {
  title: string
  text: string
}

export type Screen = {
  src: string
  alt: string
  caption: string
  href?: string
}

export type Stage = 'Startup' | 'Scale-up' | 'Mid-size' | 'Large group'

export const stages: Stage[] = ['Startup', 'Scale-up', 'Mid-size', 'Large group']

export type Role = {
  slug: string
  company: string
  stage: Stage // when I worked there
  sector: string
  title: string
  contract: string
  location: string
  start: string // YYYY-MM
  end?: string // YYYY-MM, undefined = present
  logo?: string // under public/logos, falls back to a monogram
  summary: string
  stack: string[]
  stats: Stat[]
  charts?: Chart[]
  useCases: UseCase[]
  screens?: Screen[]
  links?: { label: string; href: string }[]
  note?: string
  sourceNote?: string
  // The one figure shown for this job in lists
  headline: Stat
  // Public figures about the company, each with its source
  scale?: Fact[]
}

export type Fact = {
  value: string
  label: string
  source: { label: string; href: string }
}

export const roles: Role[] = [
  {
    slug: 'dafi',
    company: 'DAFi',
    stage: 'Startup',
    sector: 'Edtech',
    title: 'Founding Frontend Engineer',
    contract: 'Freelance, part-time',
    location: 'Montréal, remote',
    start: '2026-01',
    logo: '/logos/dafi-2026.png',
    summary:
      'Rebuilt the web and iOS apps of an AI note-taking app for students when it relaunched as a consumer app, and owned monetization.',
    stack: ['Next.js 16', 'React 19', 'TypeScript', 'Expo / React Native', 'TanStack Query', 'Stripe', 'RevenueCat', 'Superwall', 'PostHog'],
    // Usage only: revenue, trials and subscriptions stay private
    stats: [
      { value: '~7,900', label: 'iOS users' },
      { value: '3', label: 'Surfaces shipped: web, iOS, MCP for Claude and ChatGPT' },
      { value: '1,300+', label: 'Commits, part-time, since Jan 2026' },
      { value: '23', label: 'Languages' },
    ],
    charts: [
      {
        kind: 'compare',
        label: 'Content generated, 9 months before I joined vs 9 months since',
        series: ['Apr 2025 – Jan 2026', 'Jan 2026 – Oct 2026'],
        items: [
          { label: 'Notes', a: 570, b: 11589 },
          { label: 'Quizzes', a: 66, b: 4049 },
          { label: 'Audiobooks', a: 10, b: 2678 },
          { label: 'Flashcard sets', a: 31, b: 799 },
        ],
      },
    ],
    useCases: [
      {
        title: 'Web and iOS rebuild',
        text: 'Joined when the startup relaunched as a consumer app and rebuilt both frontends, with full iPad layouts and 23 languages.',
      },
      {
        title: 'Monetization',
        text: 'Stripe Checkout with a free trial flow and a countdown paywall, the Stripe Billing Portal on web and in the app, and Superwall and RevenueCat paywalls on iOS.',
      },
      {
        title: 'MCP server',
        text: 'Shipped an MCP server to production so students can use DAFi from Claude and ChatGPT.',
      },
      {
        title: 'DAFi Companion',
        text: 'Claude Code harness for the team: confidence-gated scoping, UX review, web and mobile parity, and a verifier agent.',
      },
      {
        title: 'Native features',
        text: 'Push notifications and iOS Live Activities.',
      },
      {
        title: 'Next.js BFF',
        text: 'A backend-for-frontend in Next.js in front of the Symfony API.',
      },
    ],
    screens: [
      {
        src: '/screens/dafi-app-store.jpg',
        alt: 'DAFi on the App Store: AI note taker, with screenshots of recording, quizzes and podcasts',
        caption: 'The iOS app on the App Store, captured October 2026',
        href: 'https://apps.apple.com/us/app/dafi-ai-note-taker/id6737724356',
      },
      {
        src: '/screens/dafi-home.jpg',
        alt: 'DAFi landing page: smart note-taking for students',
        caption: 'dafi-ai.com, captured October 2026',
        href: 'https://dafi-ai.com/en',
      },
    ],
    links: [
      { label: 'dafi-ai.com', href: 'https://dafi-ai.com' },
      { label: 'App Store', href: 'https://apps.apple.com/us/app/dafi-ai-note-taker/id6737724356' },
    ],
    sourceNote: 'Usage figures from the DAFi admin dashboard, 20 Oct 2026.',
    headline: { value: '~7,900', label: 'iOS users' },
  },
  {
    slug: 'accor',
    company: 'Accor',
    stage: 'Large group',
    sector: 'Hospitality',
    title: 'Frontend Engineer',
    contract: 'Freelance',
    location: 'Issy-les-Moulineaux',
    start: '2025-07',
    logo: '/logos/accor.png',
    summary:
      'In the team moving the all.accor.com booking funnel from the legacy site to a new Nuxt 4 codebase: features and bug fixes on the hotel page, the Options and Upsell step, performance and test quality.',
    stack: ['Nuxt 4', 'Vue 3', 'TypeScript', 'GraphQL', 'Apollo', 'Vitest', 'Playwright', 'Stryker'],
    stats: [
      { value: '~24M', label: 'Monthly visits on the booking funnel' },
      { value: '0', label: 'CLS on the hotel and options pages' },
      { value: '−20%', label: 'LCP' },
      { value: '2× / 3×', label: 'Faster builds / test runs after the team’s monorepo migration' },
    ],
    useCases: [
      {
        title: 'Hotel page',
        text: 'Most of my work: features and bug fixes on the hotel page of the new codebase, which was already under way when I joined.',
      },
      {
        title: 'Options and Upsell step',
        text: 'Built this step of the funnel on the new codebase, which replaces the legacy site.',
      },
      {
        title: 'ALL Accor Business',
        text: 'Feature team work on the option that lets travelers flag a stay as a business trip.',
      },
      {
        title: 'Core Web Vitals',
        text: 'CLS down to 0 on the hotel and options pages, LCP about 20% lower with lighter skeleton images and lazy-loaded media.',
      },
      {
        title: 'Test quality',
        text: 'Mutation score from 75% to 80%, integration tests rewritten in Gherkin, AI-assisted maintenance of unit tests.',
      },
    ],
    links: [{ label: 'all.accor.com', href: 'https://all.accor.com' }],
    headline: { value: '~24M', label: 'monthly visits on the booking funnel' },
    scale: [
      {
        value: '5,836',
        label: 'Hotels, end of 2025',
        source: { label: 'Accor, 2025 integrated report', href: 'https://www.tendancehotellerie.fr/IMG/pdf/rapport_integre__accor_2025_vfr.pdf' },
      },
      {
        value: '110+',
        label: 'Countries',
        source: { label: 'Accor, 2025 integrated report', href: 'https://www.tendancehotellerie.fr/IMG/pdf/rapport_integre__accor_2025_vfr.pdf' },
      },
      {
        value: '110M+',
        label: 'ALL Accor loyalty members',
        source: { label: 'Accor, 2025 integrated report', href: 'https://www.tendancehotellerie.fr/IMG/pdf/rapport_integre__accor_2025_vfr.pdf' },
      },
      {
        value: '€5.6bn',
        label: 'Revenue, 2025',
        source: { label: 'Accor, full-year 2025 results', href: 'https://www.journaldespalaces.com/en/pressrelease-77441-full-year-2025-results-solid-results-above-2025-guidance.html' },
      },
    ],
    screens: [
      {
        src: '/screens/accor-home.jpg',
        alt: 'ALL Accor home page with the hotel search bar that opens the booking funnel',
        caption: 'all.accor.com, where the booking funnel starts. Captured October 2026',
        href: 'https://all.accor.com',
      },
    ],
  },
  {
    slug: 'credit-agricole',
    company: 'Crédit Agricole',
    stage: 'Large group',
    sector: 'Banking',
    title: 'Frontend Engineer and Product Designer',
    contract: 'Freelance',
    location: 'Montrouge',
    start: '2024-12',
    end: '2025-07',
    logo: '/logos/credit-agricole.png',
    summary:
      'Designed in Figma and built Vue 3 interfaces for internal generative AI tools at one of Europe’s largest banks.',
    stack: ['Vue 3', 'TypeScript', 'Tailwind', 'Figma', 'AWS', 'GitLab CI/CD', 'Vitest', 'Playwright'],
    stats: [],
    useCases: [
      {
        title: 'Internal generative AI tools',
        text: 'From UX in Figma to the Vue 3 implementation.',
      },
      {
        title: 'Design system',
        text: 'Contributed components to the design system.',
      },
      {
        title: 'Delivery',
        text: 'Deployed to AWS through GitLab CI/CD pipelines.',
      },
    ],
    note: 'Internal tools, so there are no public screens.',
    headline: { value: '160,000', label: 'employees at the group' },
    scale: [
      {
        value: '160,000',
        label: 'Employees',
        source: { label: 'Crédit Agricole, discover the group', href: 'https://www.credit-agricole.com/en/group/discover-the-credit-agricole-group' },
      },
      {
        value: '55M',
        label: 'Retail customers',
        source: { label: 'Crédit Agricole, discover the group', href: 'https://www.credit-agricole.com/en/group/discover-the-credit-agricole-group' },
      },
      {
        value: '#10',
        label: 'Bank worldwide by balance sheet (The Banker, 2025)',
        source: { label: 'Crédit Agricole, discover the group', href: 'https://www.credit-agricole.com/en/group/discover-the-credit-agricole-group' },
      },
      {
        value: '€39.6bn',
        label: 'Revenue, 2025',
        source: { label: 'Crédit Agricole, 2025 results', href: 'https://www.credit-agricole.com/pdfPreview/208649' },
      },
    ],
  },
  {
    slug: 'back-market',
    company: 'Back Market',
    stage: 'Scale-up',
    sector: 'E-commerce',
    title: 'Frontend Engineer',
    contract: 'Full-time',
    location: 'Paris',
    start: '2024-01',
    end: '2024-12',
    logo: '/logos/back-market.png',
    summary:
      'Trade-in (Buyback) team: the funnel where customers get an instant offer for their old device, live across Europe, the US and Japan.',
    stack: ['Nuxt 3', 'Vue 3', 'TypeScript', 'Vitest', 'Playwright', 'Tailwind', 'Datadog', 'Terraform'],
    stats: [],
    useCases: [
      {
        title: 'Trade-in funnel',
        text: 'Instant offers for an old device from 250+ refurbishers.',
      },
      {
        title: 'Recycling feature',
        text: 'Built it; used by thousands of customers in its first months.',
      },
      {
        title: 'Site and back office redesign',
        text: 'Contributed to the redesign, with unit and end-to-end tests for the core listing and purchase flows.',
      },
      {
        title: 'Practices and monitoring',
        text: 'Helped set frontend practices adopted across squads (code review, conventions, ESLint) and set up Datadog error monitoring.',
      },
    ],
    links: [{ label: 'backmarket.com', href: 'https://www.backmarket.com' }],
    screens: [
      {
        src: '/screens/back-market-buyback.jpg',
        alt: 'Back Market trade-in page: trade in old devices for cash, offers from 250+ refurbishers',
        caption: 'The Trade-in funnel entry on backmarket.com, captured October 2026',
        href: 'https://www.backmarket.com/en-us/buyback/home',
      },
    ],
    headline: { value: '18M', label: 'customers' },
    scale: [
      {
        value: '18M',
        label: 'Customers',
        source: { label: 'TIME100 Companies 2026', href: 'https://time.com/collection/time100-most-influential-companies/2026/back-market/' },
      },
      {
        value: '$3.5bn',
        label: 'Gross merchandise volume, 2025',
        source: { label: 'TIME100 Companies 2026', href: 'https://time.com/collection/time100-most-influential-companies/2026/back-market/' },
      },
      {
        value: '$1bn+',
        label: 'Raised since 2014',
        source: { label: 'Back Market, about us', href: 'https://www.backmarket.com/en-us/about-us' },
      },
      {
        value: '18',
        label: 'Countries',
        source: { label: 'IFA Berlin, Back Market profile', href: 'https://www.ifa-berlin.com/exhibitors/back-market' },
      },
    ],
  },
  {
    slug: 'matchem',
    company: 'Matchem',
    stage: 'Mid-size',
    sector: 'Media',
    title: 'Fullstack Engineer',
    contract: 'Freelance',
    location: 'Paris',
    start: '2022-06',
    end: '2023-12',
    summary:
      'Digital relaunch of Paris-Turf, France’s leading horse racing media (founded in 1946): websites, a component library and back office tools.',
    stack: ['Next.js', 'React', 'Node.js', 'TypeScript', 'Storybook', 'Retool', 'GCP', 'Terraform'],
    stats: [],
    useCases: [
      {
        title: 'Website redesigns',
        text: 'Several of the group’s websites in React and Next.js, on a shared Storybook component library.',
      },
      {
        title: 'Editorial back office',
        text: 'A Retool back office for editorial teams.',
      },
      {
        title: 'APIs and infrastructure',
        text: 'Maintained Node.js and Firebase APIs and GCP infrastructure with Terraform.',
      },
      {
        title: 'Quality',
        text: 'Introduced unit testing and worked on performance, SEO and accessibility.',
      },
    ],
    links: [{ label: 'paris-turf.com', href: 'https://www.paris-turf.com' }],
    screens: [
      {
        src: '/screens/paris-turf-home.jpg',
        alt: 'Paris-Turf home page with the race programme',
        caption: 'paris-turf.com, captured October 2026',
        href: 'https://www.paris-turf.com',
      },
    ],
    headline: { value: 'Since 1946', label: 'France’s horse racing daily' },
    scale: [
      {
        value: '1946',
        label: 'Paris-Turf founded',
        source: { label: 'Wikipedia, Paris-Turf', href: 'https://fr.wikipedia.org/wiki/Paris-Turf' },
      },
      {
        value: 'NJJ',
        label: 'Owner since 2021, Xavier Niel’s holding',
        source: { label: 'Autorité de la concurrence, Feb 2021', href: 'https://www.autoritedelaconcurrence.fr/en/article/green-light-acquisition-njj-holding-controlled-xavier-niel-groupe-paris-turf' },
      },
      {
        value: '~10',
        label: 'Titles in the group, 2020',
        source: { label: 'CB News, June 2020', href: 'https://www.cbnews.fr/node/53399' },
      },
      {
        value: '€65.6M',
        label: 'Group revenue, 2020',
        source: { label: 'CB News, June 2020', href: 'https://www.cbnews.fr/node/53399' },
      },
    ],
  },
  {
    slug: 'fifteen',
    company: 'Fifteen',
    stage: 'Startup',
    sector: 'Mobility',
    title: 'Fullstack Engineer',
    contract: 'Permanent',
    location: 'Paris, partly remote',
    start: '2020-12',
    end: '2022-05',
    logo: '/logos/fifteen.png',
    summary:
      'Fullstack work at Fifteen (formerly Zoov): the zoov.eu website, its blog and admin tools, from Vue and Nuxt features to tests, error monitoring and production deploys.',
    stack: ['Nuxt', 'Vue', 'TypeScript', 'Node.js', 'Docker', 'Strapi', 'Vitest', 'Jest', 'Storybook', 'Sentry', 'GCP'],
    stats: [],
    useCases: [
      {
        title: 'Responsive website',
        text: 'Integrated the responsive pages of zoov.eu, matching the mockups.',
      },
      {
        title: 'Features and maintenance',
        text: 'Built new features and maintained the existing Vue and Nuxt.js code: website, blog and admin tools.',
      },
      {
        title: 'Testing',
        text: 'Set up unit tests with Jest.',
      },
      {
        title: 'Error monitoring',
        text: 'Set up Sentry to track and monitor errors.',
      },
      {
        title: 'Delivery',
        text: 'Set up Docker and shipped the apps to production through Git and GCP.',
      },
      {
        title: 'Agile',
        text: 'Agile project management and Scrum ceremonies.',
      },
    ],
    links: [{ label: 'fifteen.eu', href: 'https://fifteen.eu' }],
    screens: [
      {
        src: '/screens/fifteen-home.jpg',
        alt: 'Fifteen website: bike services for cities and regions',
        caption: 'fifteen.eu, captured October 2026',
        href: 'https://fifteen.eu',
      },
    ],
    headline: { value: '50,000+', label: 'bikes deployed' },
    scale: [
      {
        value: '50,000+',
        label: 'Bikes deployed since 2008, including Smoove',
        source: { label: 'fifteen.eu', href: 'https://www.fifteen.eu/' },
      },
      {
        value: 'Withings',
        label: 'Zoov was founded by Eric Carreel, co-founder of Withings',
        source: { label: 'Presse-citron', href: 'https://www.presse-citron.net/fondateur-withings-lance-zoov-service-partage-velos/' },
      },
      {
        value: '€40M',
        label: 'Raised when Zoov and Smoove became Fifteen, 2022',
        source: { label: 'Zag Daily, March 2022', href: 'https://zagdaily.com/trends/smoove-and-zoov-rename-themselves-fifteen-following-merger/' },
      },
      {
        value: '~20',
        label: 'Cities supplied, from Helsinki to Vancouver',
        source: { label: 'Zag Daily, June 2024', href: 'https://zagdaily.com/trends/fifteen-to-sell-part-of-business-and-restructure-workforce/' },
      },
    ],
  },
]

export const strengths = [
  {
    title: 'Web and iOS',
    text: 'Vue and Nuxt at Accor, Back Market, Crédit Agricole and Fifteen. Next.js and React Native in production at DAFi, with iPad layouts, Live Activities and paywalls.',
    href: '/career/dafi',
  },
  {
    title: 'Range',
    text: 'Two startups, a scale-up, a media group and two large groups, across edtech, mobility, e-commerce, media, banking and hospitality.',
    href: '/career',
  },
  {
    title: 'AI tooling',
    text: 'An MCP server in production and a Claude Code harness for a whole team.',
    href: '/career/dafi',
  },
  {
    title: 'Design and code',
    text: 'From Figma to Vue 3 for generative AI tools at Crédit Agricole.',
    href: '/career/credit-agricole',
  },
  {
    title: 'Business',
    text: 'Owned monetization end to end, and went through the Audencia EMERGE entrepreneurship program.',
    href: '/education',
  },
]

export type Tech = {
  name: string
  icon: string // under public/tech
  color: string // brand color; 'ink' for black marks that must flip in dark mode
  multicolor?: boolean // icon keeps its own colors
}

// Rows of the stack matrix, matched against each role's stack.
// Icons: Simple Icons (CC0), Playwright from Devicon (MIT).
export const stackRows: Tech[] = [
  { name: 'TypeScript', icon: '/tech/typescript.svg', color: '#3178C6' },
  { name: 'Vue', icon: '/tech/vue.svg', color: '#4FC08D' },
  { name: 'Nuxt', icon: '/tech/nuxt.svg', color: '#00DC82' },
  { name: 'React', icon: '/tech/react.svg', color: '#61DAFB' },
  { name: 'Next.js', icon: '/tech/nextjs.svg', color: 'ink' },
  { name: 'React Native', icon: '/tech/react.svg', color: '#61DAFB' },
  { name: 'Vitest', icon: '/tech/vitest.svg', color: '#6E9F18' },
  { name: 'Playwright', icon: '/tech/playwright.svg', color: '#2EAD33', multicolor: true },
  { name: 'Tailwind', icon: '/tech/tailwind.svg', color: '#06B6D4' },
  { name: 'Terraform', icon: '/tech/terraform.svg', color: '#844FBA' },
  { name: 'GraphQL', icon: '/tech/graphql.svg', color: '#E10098' },
  { name: 'Stripe', icon: '/tech/stripe.svg', color: '#635BFF' },
]

export type School = {
  slug: string
  name: string
  program: string
  start: string
  end: string
  logo?: string
  summary: string
  facts: string[]
  projects?: { name: string; href: string; language: string; text: string }[]
  sources: { label: string; href: string }[]
}

export const schools: School[] = [
  {
    slug: 'audencia',
    name: 'Audencia',
    program: 'Entrepreneurship program, EMERGE',
    start: '2025-09',
    end: '2025-12',
    logo: '/logos/audencia.png',
    summary:
      'The program I did right before DAFi, to add a product-oriented, data-driven approach to sales to my engineering profile.',
    facts: [
      'Goal: validate an entrepreneurial idea and a business project, and design a solution that meets market expectations.',
      'Format: 3 to 4 months of group workshops on the first entrepreneurial steps, plus coaching sessions.',
    ],
    sources: [
      {
        label: 'Audencia, EMERGE program',
        href: 'https://audencia.com/en/student-experience/entrepreneurship-with-audencia/support-services/emerge-program',
      },
    ],
  },
  {
    slug: '42',
    name: '42 Paris',
    program: 'Computer Science',
    start: '2019-10',
    end: '2020-12',
    logo: '/logos/42.png',
    summary:
      'Project-based, peer-to-peer computer science school: no teachers, no classes, students review each other’s code.',
    facts: [
      'Topics: C, C++, algorithms, data structures, databases, Docker.',
      'Admission through the Piscine, a one-month selection in immersion.',
    ],
    projects: [
      {
        name: 'cub3D (Raycasting)',
        href: 'https://github.com/ednese/Raycasting',
        language: 'C',
        text: 'A game rendered with raycasting: textured walls per side, sky and floor, distance shadows and a sprite. Rated 102%.',
      },
      {
        name: 'get_next_line',
        href: 'https://github.com/ednese/GNL',
        language: 'C',
        text: 'Read a file descriptor line by line with a static buffer.',
      },
    ],
    sources: [
      { label: '42, the program', href: 'https://42.fr/le-programme/' },
      { label: 'GitHub, ednese', href: 'https://github.com/ednese' },
    ],
  },
]

export const sideProjects = [
  {
    name: 'vue-page-element-transition',
    href: 'https://github.com/ednese/vue-page-element-transition',
    demo: 'https://vue-page-element-transition.vercel.app/',
    text: 'Vue plugin for transitions between elements on different pages, published on npm.',
  },
]

export type PianoVideo = {
  title: string
  composer?: string
  genre: string
  date: string // YYYY-MM
  poster: string
  src?: string // local file under public/piano
  tiktok?: { id: string; plays: number; likes: number } // stats as of 20 Oct 2026
  size?: 'lg' // the best ones take a 2×2 cell
}

export const tiktokProfile = 'https://www.tiktok.com/@ednese17'

// Gallery order on /piano; the second large cell sits on the right
export const piano: PianoVideo[] = [
  {
    title: 'Waltz in C-sharp minor, Op. 64 No. 2',
    composer: 'Chopin',
    genre: 'Classical',
    date: '2026-09',
    poster: '/piano/home-session-2026-09.jpg',
    src: '/piano/home-session-2026-09.mp4',
    size: 'lg',
  },
  {
    title: 'Recital',
    genre: 'On stage',
    date: '2024-03',
    poster: '/piano/recital-2024-03.jpg',
    src: '/piano/recital-2024-03.mp4',
  },
  {
    title: 'Gypsy Woman',
    composer: 'Crystal Waters',
    genre: 'Cover',
    date: '2025-03',
    poster: '/piano/tiktok-7480699598286245142.jpg',
    tiktok: { id: '7480699598286245142', plays: 1043, likes: 35 },
  },
  {
    title: 'Tea for Two',
    composer: 'Vincent Youmans',
    genre: 'Jazz',
    date: '2025-03',
    poster: '/piano/tiktok-7483969049706253590.jpg',
    tiktok: { id: '7483969049706253590', plays: 856, likes: 66 },
  },
  {
    title: 'Return to Versailles',
    composer: 'Joshua Kyan Aalampour',
    genre: 'Classical',
    date: '2025-05',
    poster: '/piano/tiktok-7510277690012798230.jpg',
    tiktok: { id: '7510277690012798230', plays: 584, likes: 38 },
  },
  {
    title: 'Für Elise',
    composer: 'Beethoven',
    genre: 'Classical',
    date: '2025-03',
    poster: '/piano/tiktok-7483240086558084374.jpg',
    tiktok: { id: '7483240086558084374', plays: 304, likes: 33 },
  },
  {
    title: 'Salsa in C minor',
    genre: 'Latin',
    date: '2025-04',
    poster: '/piano/tiktok-7495782705204923670.jpg',
    tiktok: { id: '7495782705204923670', plays: 393, likes: 26 },
  },
  {
    title: 'Can You Hear the Music',
    composer: 'Ludwig Göransson, Oppenheimer',
    genre: 'Film',
    date: '2025-03',
    poster: '/piano/tiktok-7487230233246977302.jpg',
    tiktok: { id: '7487230233246977302', plays: 2098, likes: 44 },
    size: 'lg',
  },
  {
    title: 'Bourbon Street Saturday Night',
    composer: 'William Gillock',
    genre: 'Jazz',
    date: '2025-04',
    poster: '/piano/tiktok-7496093556558466306.jpg',
    tiktok: { id: '7496093556558466306', plays: 314, likes: 20 },
  },
  {
    title: 'Congratulations',
    composer: 'Mac Miller',
    genre: 'Cover',
    date: '2025-03',
    poster: '/piano/tiktok-7481394183152979222.jpg',
    tiktok: { id: '7481394183152979222', plays: 333, likes: 30 },
  },
]

export const featuredPostSlug = 'learning-what-the-ai-already-knows'
