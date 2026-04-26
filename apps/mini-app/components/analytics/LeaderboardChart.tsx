// File: apps/mini-app/components/analytics/LeaderboardChart.tsx

'use client'
import { motion } from 'framer-motion'

interface Leader {
  rank: number
  username: string
  votes: number
  avatar: string
}

const mockLeaders: Leader[] = [
  { rank: 1, username: '@whale_trader', votes: 1250, avatar: '🐋' },
  { rank: 2, username: '@nft_collector', votes: 980, avatar: '🎨' },
  { rank: 3, username: '@crypto_pro', votes: 845, avatar: '💎' },
  { rank: 4, username: '@gaming_fan', votes: 720, avatar: '🎮' },
  { rank: 5, username: '@defi_enthusiast', votes: 650, avatar: '💰' },
]

export function LeaderboardChart() {
  return (
    <motion.div className="space-y-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      {mockLeaders.map((leader, index) => (
        <motion.div
          key={leader.rank}
          className="flex items-center gap-3 p-3 bg-bg-primary rounded-lg"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.05 }}
          whileHover={{ scale: 1.02 }}
        >
          {/* Rank */}
          <div className="w-8 h-8 flex items-center justify-center bg-accent-primary/20 rounded-full font-bold text-accent-primary">
            {leader.rank}
          </div>

          {/* Avatar & Username */}
          <div className="flex items-center gap-2 flex-1">
            <span className="text-lg">{leader.avatar}</span>
            <span className="font-semibold text-text-primary text-sm">{leader.username}</span>
          </div>

          {/* Votes */}
          <span className="font-bold text-accent-primary">{leader.votes}</span>
        </motion.div>
      ))}
    </motion.div>
  )
}