// apps/mini-app/lib/queryClient.ts
import { QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30_000,        // 30 sec
      gcTime: 5 * 60_000,       // 5 min (formerly cacheTime)
      retry: 1,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 1,
    },
  },
})

// Автоматична синхронізація раунду кожні 10 сек
export const GAME_REFETCH_INTERVAL = 10_000
export const VOTE_REFETCH_INTERVAL = 5_000  // votes синхронізуються частіше