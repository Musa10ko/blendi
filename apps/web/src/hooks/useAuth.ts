// apps/mini-app/src/hooks/useAuth.ts

import { useMutation, useQuery } from '@tanstack/react-query'
import { useAppStore } from '@/lib/store'
import { apiClient } from '@/lib/api'

export function useAuth() {
  const { user, setUser, setLoading } = useAppStore()

  const loginMutation = useMutation({
    mutationFn: async (initData: string) => {
      setLoading(true)
      const response = await apiClient.login(initData)
      setUser(response.user)
      return response
    },
    onSettled: () => setLoading(false),
  })

  const logoutMutation = useMutation({
    mutationFn: async () => {
      await apiClient.logout()
      setUser(null)
    },
  })

  const meQuery = useQuery({
    queryKey: ['auth', 'me'],
    queryFn: () => apiClient.getMe(),
    enabled: !!user,
  })

  return {
    user,
    isAuthenticated: !!user,
    login: loginMutation.mutate,
    logout: logoutMutation.mutate,
    isLoading: loginMutation.isPending || logoutMutation.isPending,
    meQuery,
  }
}