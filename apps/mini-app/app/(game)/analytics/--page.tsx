// File: apps/mini-app/app/(game)/analytics/page.tsx

'use client'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { VoteChart } from '@/components/analytics/VoteChart'
import { MomentumChart } from '@/components/analytics/MomentumChart'
import { LeaderboardChart } from '@/components/analytics/LeaderboardChart'
import { useGameStore } from '@/stores/gameStore'
import type { GameRound } from '@blender/types'

export default function AnalyticsPage() {
  const { currentRound } = useGameStore()
  const [round, setRound] = useState<GameRound | null>(null)

  useEffect(() => {
    const fetchRound = async () => {
      const res = await fetch('/api/game/current-round')
      const data = await res.json()
      setRound(data)
    }
    fetchRound()
    const interval = setInterval(fetchRound, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <main className="min-h-screen bg-gradient-to-b from-bg-primary to-bg-secondary py-6 px-4">
      {/* Header */}
      <motion.div className="mb-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h1 className="text-3xl font-bold text-text-primary mb-2">Market Analytics</h1>
        <p className="text-text-secondary">Real-time voting statistics</p>
      </motion.div>

      {/* Charts Grid */}
      <div className="space-y-6">
        {/* Vote Distribution */}
        <motion.div
          className="bg-bg-secondary border border-border-default rounded-2xl p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h2 className="text-lg font-bold text-text-primary mb-4">Vote Distribution</h2>
          {round && <VoteChart round={round} />}
        </motion.div>

        {/* Momentum */}
        <motion.div
          className="bg-bg-secondary border border-border-default rounded-2xl p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-lg font-bold text-text-primary mb-4">Weekly Momentum</h2>
          {round && <MomentumChart />}
        </motion.div>

        {/* Top Predictors */}
        <motion.div
          className="bg-bg-secondary border border-border-default rounded-2xl p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-lg font-bold text-text-primary mb-4">Top Predictors</h2>
          {round && <LeaderboardChart />}
        </motion.div>

        {/* Stats Summary */}
        <motion.div
          className="grid grid-cols-2 gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <StatBox label="Total Votes" value={round?.totalVotes || 0} icon="🗳️" />
          <StatBox
            label="Active Candidates"
            value={round?.candidates.length || 0}
            icon="🎭"
          />
        </motion.div>
      </div>
    </main>
  )
}

function StatBox({
  label,
  value,
  icon,
}: {
  label: string
  value: number
  icon: string
}) {
  return (
    <motion.div
      className="bg-accent-primary/10 border border-accent-primary/30 rounded-lg p-4 text-center"
      whileHover={{ scale: 1.05 }}
    >
      <p className="text-2xl mb-2">{icon}</p>
      <p className="text-2xl font-bold text-accent-primary">{value}</p>
      <p className="text-xs text-text-secondary mt-1">{label}</p>
    </motion.div>
  )
}