// apps/mini-app/src/hooks/useGame.ts

import { useQuery } from '@tanstack/react-query'
import { useAppStore } from '@/lib/store'
import { apiClient } from '@/lib/api'

export function useGame() {
  const { currentRound, setCurrentRound } = useAppStore()

  const roundQuery = useQuery({
    queryKey: ['game', 'currentRound'],
    queryFn: async () => {
      const response = await apiClient.getCurrentRound()
      setCurrentRound(response.data)
      return response.data
    },
    refetchInterval: 1000 * 30, // 30 seconds
  })

  const candidatesQuery = useQuery({
    queryKey: ['game', 'candidates'],
    queryFn: () => apiClient.getCandidates(),
    enabled: !!currentRound,
  })

  return {
    currentRound,
    candidates: candidatesQuery.data,
    isLoading: roundQuery.isLoading || candidatesQuery.isLoading,
    roundQuery,
    candidatesQuery,
  }
}