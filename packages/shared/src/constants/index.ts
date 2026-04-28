// packages/shared/src/constants/index.ts

export const GAME_CONFIG = {
  ROUND_DURATION_DAYS: 7,
  VOTING_DAY: 5, // Friday
  CLUE_REVEAL_DAYS: 5,
  INITIAL_BLUR: 100,
  FINAL_BLUR: 0,
  CANDIDATES_COUNT: 3,
  MAX_CANDIDATES: 5,
}

export const STAR_COSTS = {
  FIRST_VOTE: 10,
  VOTE_INCREMENT: 5, // Each next vote costs +5 more
  MAX_VOTE_COST: 100,
}

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    ME: '/auth/me',
    REFRESH: '/auth/refresh',
  },
  GAME: {
    CURRENT_ROUND: '/game/round/current',
    ROUND_HISTORY: '/game/round/history',
    CANDIDATES: '/game/candidates',
  },
  VOTES: {
    CAST_VOTE: '/votes/cast',
    MY_VOTES: '/votes/my',
    STATS: '/votes/stats',
  },
  PORTFOLIO: {
    MY_NFTS: '/portfolio/nfts',
    SYNC: '/portfolio/sync',
  },
  ANALYTICS: {
    MARKET_SENTIMENT: '/analytics/sentiment',
    VOTE_DISTRIBUTION: '/analytics/votes',
    LEADERBOARD: '/analytics/leaderboard',
  },
}

export const UI_CONFIG = {
  BOTTOM_NAV_ROUTES: [
    { href: '/profile', label: 'Profile', icon: 'person' },
    { href: '/stats', label: 'Stats', icon: 'analytics' },
    { href: '/', label: 'Home', icon: 'home' },
    { href: '/wall', label: 'Wall', icon: 'receipt_long' },
    { href: '/pantheon', label: 'Pantheon', icon: 'groups' },
  ],
}

export const COLORS = {
  PRIMARY: '#50A7EA',
  SECONDARY: '#8B5CF6',
  DARK_900: '#141414',
  DARK_800: '#1A1A1E',
  DARK_700: '#27272D',
  LIGHT_50: '#FAFAFA',
  LIGHT_100: '#F3F4F6',
  LIGHT_200: '#E5E7EB',
}