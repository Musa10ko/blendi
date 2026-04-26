// apps/mini-app/services/api.ts (UPDATE)

export const apiClient = {
  auth: {
    login: async (initData: string) => {
      const res = await fetch(`${API_BASE}/api/auth/login`, {
        method: 'POST',
        body: JSON.stringify({ initData }),
        headers: { 'Content-Type': 'application/json' },
      })
      return res.json()
    },
  },

  game: {
    getCurrentRound: async () => {
      const res = await fetch(`${API_BASE}/api/game/current-round`)
      return res.json()
    },
  },

  portfolio: {
    sync: async (token: string, walletAddress: string) => {
      const res = await fetch(
        `${API_BASE}/api/user/portfolio/sync?token=${token}`,
        {
          method: 'POST',
          body: JSON.stringify({ walletAddress }),
          headers: { 'Content-Type': 'application/json' },
        }
      )
      return res.json()
    },
  },
}