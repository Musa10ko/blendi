// apps/mini-app/src/lib/api.ts

import axios, { AxiosInstance } from 'axios'
import { API_ENDPOINTS } from '@repo/shared'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'

export class ApiClient {
  private client: AxiosInstance

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      timeout: 10000,
    })

    // Add auth token to headers
    this.client.interceptors.request.use((config) => {
      const token = localStorage.getItem('auth_token')
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    })
  }

  // Auth
  async login(initData: string) {
    const res = await this.client.post(API_ENDPOINTS.AUTH.LOGIN, { initData })
    localStorage.setItem('auth_token', res.data.token)
    return res.data
  }

  async logout() {
    localStorage.removeItem('auth_token')
  }

  async getMe() {
    return this.client.get(API_ENDPOINTS.AUTH.ME)
  }

  // Game
  async getCurrentRound() {
    return this.client.get(API_ENDPOINTS.GAME.CURRENT_ROUND)
  }

  async getCandidates() {
    return this.client.get(API_ENDPOINTS.GAME.CANDIDATES)
  }

  // Votes
  async castVote(candidateId: string, stars: number) {
    return this.client.post(API_ENDPOINTS.VOTES.CAST_VOTE, {
      candidateId,
      stars,
    })
  }

  async getVoteStats(roundId: string) {
    return this.client.get(
      `${API_ENDPOINTS.VOTES.STATS}?roundId=${roundId}`
    )
  }

  // Portfolio
  async getMyNFTs() {
    return this.client.get(API_ENDPOINTS.PORTFOLIO.MY_NFTS)
  }

  async syncPortfolio() {
    return this.client.post(API_ENDPOINTS.PORTFOLIO.SYNC, {})
  }

  // Analytics
  async getMarketSentiment() {
    return this.client.get(API_ENDPOINTS.ANALYTICS.MARKET_SENTIMENT)
  }

  async getVoteDistribution(roundId: string) {
    return this.client.get(
      `${API_ENDPOINTS.ANALYTICS.VOTE_DISTRIBUTION}?roundId=${roundId}`
    )
  }

  async getLeaderboard() {
    return this.client.get(API_ENDPOINTS.ANALYTICS.LEADERBOARD)
  }
}

export const apiClient = new ApiClient()