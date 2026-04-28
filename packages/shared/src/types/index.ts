// packages/shared/src/types/index.ts

// User types
export interface TelegramUser {
  id: number
  username: string
  first_name: string
  last_name?: string
  photo_url?: string
  is_premium?: boolean
  language_code?: string
}

export interface BlenderUser {
  id: string
  telegramId: number
  username: string
  avatar?: string
  walletAddress?: string
  vp: number // Vote Power
  stars: number
  rank: number
  createdAt: Date
  updatedAt: Date
}

// NFT types
export interface NFT {
  id: string
  collectionId: string
  name: string
  image: string
  floorPrice: number
  marketplaceId: string
  status: 'listed' | 'not_listed' | 'inactive'
  owner?: string
}

export interface NFTAttribute {
  name: string
  value: string
  rarity?: number
}

// Game types
export interface GameRound {
  id: string
  weekNumber: number
  startDate: Date
  endDate: Date
  status: 'clues' | 'voting' | 'ended'
  candidates: ModelCandidate[]
  prizePool: number
}

export interface ModelCandidate {
  id: string
  roundId: string
  nft: NFT
  attributes: NFTAttribute[]
  votes: number
  voteValue: number // Stars + VP weighted
  winner?: boolean
  imageBlur: number // 0-100 (100 = fully blurred)
  revealedDays: number[] // which days were revealed [1,2,3...]
}

export interface Vote {
  id: string
  userId: string
  candidateId: string
  roundId: string
  starsSpent: number
  vpWeight: number
  createdAt: Date
}

// Voting statistics
export interface VotingStats {
  totalVotes: number
  totalStars: number
  distributionByCandidate: Record<string, { votes: number; stars: number }>
  topVoters: Array<{ userId: string; votes: number; stars: number }>
}

// Analytics types
export interface AnalyticsData {
  marketSentiment: Array<{ date: string; value: number }>
  voteDistribution: Record<string, number>
  modelStats: Array<{ modelName: string; floor: number; change: number }>
  leaderboard: Array<{ username: string; votes: number; rank: number }>
}

// API Response types
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  timestamp: string
}

export interface ApiPaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  pageSize: number
}