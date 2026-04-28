// apps/mini-app/src/hooks/useAnalytics.ts

import { useQuery } from '@tanstack/react-query'
import { apiClient } from '@/lib/api'

export function useAnalytics() {
  const sentimentQuery = useQuery({
    queryKey: ['analytics', 'sentiment'],
    queryFn: () => apiClient.getMarketSentiment(),
  })

  const leaderboardQuery = useQuery({
    queryKey: ['analytics', 'leaderboard'],
    queryFn: () => apiClient.getLeaderboard(),
  })

  return {
    sentiment: sentimentQuery.data,
    leaderboard: leaderboardQuery.data,
    isLoading: sentimentQuery.isLoading || leaderboardQuery.isLoading,
  }
}