// apps/mini-app/hooks/useGameRound.ts
import { useQuery, useQueryClient } from '@tanstack/react-query'

export function useGameRound() {
  const queryClient = useQueryClient()
  
  return useQuery({
    queryKey: ['game', 'currentRound'],
    queryFn: async () => {
      const res = await fetch('/api/game/current-round')
      if (!res.ok) throw new Error('Failed to fetch round')
      return res.json()
    },
    refetchInterval: GAME_REFETCH_INTERVAL,
    refetchIntervalInBackground: true,  // навіть якщо мінімізовано
  })
}

// Vote synchronization hook
export function useVoteStats(roundId: string) {
  return useQuery({
    queryKey: ['votes', roundId],
    queryFn: async () => {
      const res = await fetch(`/api/votes/${roundId}`)
      return res.json()
    },
    refetchInterval: VOTE_REFETCH_INTERVAL,
  })
}

// Profile hook з selective refetch
export function useUserProfile() {
  return useQuery({
    queryKey: ['user', 'profile'],
    queryFn: async () => {
      const res = await fetch('/api/user/profile')
      return res.json()
    },
    staleTime: 60_000,  // profile може бути "старий" довше
  })
}