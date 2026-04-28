// apps/mini-app/src/lib/store.ts

import { create } from 'zustand'
import type { BlenderUser, GameRound } from '@repo/shared'

interface AppState {
  // User
  user: BlenderUser | null
  setUser: (user: BlenderUser | null) => void

  // Game
  currentRound: GameRound | null
  setCurrentRound: (round: GameRound | null) => void

  // UI
  theme: 'light' | 'dark'
  toggleTheme: () => void
  isLoading: boolean
  setLoading: (loading: boolean) => void
}

export const useAppStore = create<AppState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),

  currentRound: null,
  setCurrentRound: (round) => set({ currentRound: round }),

  theme: 'dark',
  toggleTheme: () => set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),

  isLoading: false,
  setLoading: (loading) => set({ isLoading: loading }),
}))