// hooks/useRealTimeVotes.ts
import { useEffect, useState } from 'react'

export function useRealTimeVotes(roundId: string) {
  const [stats, setStats] = useState(null)

  useEffect(() => {
    // Polling (until WebSocket)
    const interval = setInterval(async () => {
      const res = await fetch(`/api/votes/stats/${roundId}`)
      const data = await res.json()
      setStats(data)
    }, 5000)  // Every 5 seconds

    return () => clearInterval(interval)
  }, [roundId])

  return stats
}