// apps/mini-app/stores/gameStore.ts
import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'

interface GameRound {
  id: string
  weekNumber: number
  dayPhase: 'speculation' | 'voting' | 'resolution'
  candidates: NFTCandidate[]
  clueRevealLevel: 0 | 1 | 2 | 3 | 4 | 5  // Monday-Friday
  votes: Record<string, number>  // candidateId -> vote count
  totalVotes: number
  startsAt: Date
  endsAt: Date
}

interface GameState {
  // State
  currentRound: GameRound | null
  selectedCandidate: string | null
  userVotes: Vote[]
  clueAnimation: 'hidden' | 'revealing' | 'visible'
  isVoting: boolean
  votingError: string | null
  
  // Computed
  clueRevealProgress: number  // 0-100%
  timeUntilNextPhase: number  // seconds
  
  // Actions
  setSelectedCandidate: (id: string) => void
  submitVote: (candidateId: string, stars: number) => Promise<void>
  updateRound: (round: GameRound) => void
  advanceClueLevel: () => void
  resetVoting: () => void
  clearError: () => void
}

export const useGameStore = create<GameState>()(
  subscribeWithSelector((set, get) => ({
    currentRound: null,
    selectedCandidate: null,
    userVotes: [],
    clueAnimation: 'hidden',
    isVoting: false,
    votingError: null,
    clueRevealProgress: 0,
    timeUntilNextPhase: 0,
    
    setSelectedCandidate: (id) => set({ selectedCandidate: id }),
    
    submitVote: async (candidateId, stars) => {
      set({ isVoting: true, votingError: null })
      try {
        const response = await fetch('/api/votes/submit', {
          method: 'POST',
          body: JSON.stringify({ candidateId, stars }),
          headers: { 'Content-Type': 'application/json' },
        })
        
        if (!response.ok) throw new Error(await response.text())
        
        const vote = await response.json()
        set((state) => ({
          userVotes: [...state.userVotes, vote],
          isVoting: false,
        }))
        
        // Haptic feedback
        window.Telegram?.WebApp?.HapticFeedback?.impactOccurred?.('medium')
      } catch (error) {
        set({ 
          votingError: error instanceof Error ? error.message : 'Vote failed',
          isVoting: false 
        })
      }
    },
    
    updateRound: (round) => set({ currentRound: round }),
    advanceClueLevel: () => set((state) => ({
      clueAnimation: 'revealing',
      currentRound: state.currentRound ? {
        ...state.currentRound,
        clueRevealLevel: Math.min(5, state.currentRound.clueRevealLevel + 1) as any,
      } : null,
    })),
    resetVoting: () => set({ selectedCandidate: null, userVotes: [], votingError: null }),
    clearError: () => set({ votingError: null }),
  }))
)