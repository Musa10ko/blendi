// apps/mini-app/stores/userStore.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface UserProfile {
  telegramId: number
  username: string
  vpScore: number
  vpBreakdown: {
    telegramActivity: number
    blenderActivity: number
    badgeMultiplier: number
  }
  listedNFTs: NFT[]
  unlistedNFTs: NFT[]
  winHistory: WinRecord[]
  voteHistory: Vote[]
  createdAt: Date
  lastSyncAt: Date
}

interface UserState {
  profile: UserProfile | null
  isLoading: boolean
  error: string | null
  
  fetchProfile: () => Promise<void>
  syncNFTPortfolio: () => Promise<void>
  updateVPScore: () => Promise<void>
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      profile: null,
      isLoading: false,
      error: null,
      
      fetchProfile: async () => {
        set({ isLoading: true })
        try {
          const res = await fetch('/api/user/profile')
          const profile = await res.json()
          set({ profile, error: null })
        } catch (error) {
          set({ error: 'Failed to load profile' })
        } finally {
          set({ isLoading: false })
        }
      },
      
      syncNFTPortfolio: async () => {
        try {
          const res = await fetch('/api/user/portfolio/sync', { method: 'POST' })
          const updated = await res.json()
          set((state) => ({
            profile: state.profile ? { ...state.profile, ...updated } : null
          }))
        } catch (error) {
          console.error('Portfolio sync failed:', error)
        }
      },
      
      updateVPScore: async () => {
        try {
          const res = await fetch('/api/user/vp-score')
          const { vpScore } = await res.json()
          set((state) => ({
            profile: state.profile ? { ...state.profile, vpScore } : null
          }))
        } catch (error) {
          console.error('VP update failed:', error)
        }
      },
    }),
    {
      name: 'blender-user-store',
      partialize: (state) => ({ profile: state.profile }),
    }
  )
)