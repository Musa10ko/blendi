// File: apps/mini-app/stores/userStore.ts (UPDATED)

'use client'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { TelegramUser, NFT } from '@blender/types'

interface UserState {
  telegramUser: TelegramUser | null
  vpScore: number
  listedNFTs: NFT[]
  unlistedNFTs: NFT[]
  isLoading: boolean
  error: string | null
  lastSyncAt: number | null

  setTelegramUser: (user: TelegramUser | null) => void
  setVPScore: (vp: number) => void
  setNFTs: (listed: NFT[], unlisted: NFT[]) => void
  fetchProfile: () => Promise<void>
  syncPortfolio: () => Promise<void>
  clearError: () => void
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      telegramUser: null,
      vpScore: 0,
      listedNFTs: [],
      unlistedNFTs: [],
      isLoading: false,
      error: null,
      lastSyncAt: null,

      setTelegramUser: (user) => set({ telegramUser: user }),
      setVPScore: (vp) => set({ vpScore: vp }),
      setNFTs: (listed, unlisted) => set({ listedNFTs: listed, unlistedNFTs: unlisted }),

      fetchProfile: async () => {
        set({ isLoading: true })
        try {
          const res = await fetch('/api/user/profile')
          const data = await res.json()
          set({
            telegramUser: data.user,
            vpScore: data.vpScore,
            listedNFTs: data.listedNFTs,
            unlistedNFTs: data.unlistedNFTs,
            error: null,
            lastSyncAt: Date.now(),
          })
        } catch (error) {
          set({
            error:
              error instanceof Error
                ? error.message
                : 'Failed to load profile',
          })
        } finally {
          set({ isLoading: false })
        }
      },

      syncPortfolio: async () => {
        try {
          const res = await fetch('/api/user/portfolio/sync', {
            method: 'POST',
          })
          const { listed, unlisted } = await res.json()
          set({
            listedNFTs: listed,
            unlistedNFTs: unlisted,
            lastSyncAt: Date.now(),
          })
        } catch (error) {
          console.error('Portfolio sync failed:', error)
        }
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: 'blender-user-store',
      partialize: (state) => ({
        telegramUser: state.telegramUser,
        vpScore: state.vpScore,
      }),
    }
  )
)