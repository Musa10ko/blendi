// File: packages/types/index.ts

export interface TelegramUser {
  id: number
  is_bot: boolean
  first_name: string
  last_name?: string
  username?: string
  language_code?: string
  is_premium?: boolean
  photo_url?: string
}

export interface NFT {
  id: string
  tokenId: number
  name: string
  imageUrl: string
  collection: string
  owner: string
  isListed: boolean
  floorPrice: number
  lastSale?: number
}

export interface NFTCandidate {
  id: string
  tokenId: number
  name: string
  imageUrl: string
  collection: string
  votes: number
}

export interface Vote {
  id: string
  userId: number
  candidateId: string
  roundId: string
  stars: number
  createdAt: Date
}

export interface GameRound {
  id: string
  weekNumber: number
  dayPhase: 'speculation' | 'voting' | 'resolution'
  candidates: NFTCandidate[]
  clueRevealLevel: 0 | 1 | 2 | 3 | 4 | 5
  voteStats: Record<string, number>
  totalVotes: number
  startsAt: Date
  endsAt: Date
}

export interface WinRecord {
  id: string
  roundId: string
  candidateId: string
  matchType: 'full' | 'model_pattern' | 'model_bg' | 'pattern_bg' | 'pattern' | 'background'
  prizeAmount: number
  wonAt: Date
}