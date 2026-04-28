// apps/mini-app/src/hooks/useVote.ts

import { useMutation, useQuery } from '@tanstack/react-query'
import { apiClient } from '@/lib/api'

export function useVote(roundId?: string) {
  const castVoteMutation = useMutation({
    mutationFn: async ({ candidateId, stars }: { candidateId: string; stars: number }) => {
      return apiClient.castVote(candidateId, stars)
    },
    onSuccess: () => {
      // Invalidate vote stats
    },
  })

  const statsQuery = useQuery({
    queryKey: ['votes', 'stats', roundId],
    queryFn: () => (roundId ? apiClient.getVoteStats(roundId) : null),
    enabled: !!roundId,
  })

  return {
    castVote: castVoteMutation.mutate,
    isVoting: castVoteMutation.isPending,
    stats: statsQuery.data,
    statsLoading: statsQuery.isLoading,
  }
}