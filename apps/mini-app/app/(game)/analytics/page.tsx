// File: apps/mini-app/app/(game)/analytics/page.tsx

'use client'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useTheme } from '@/providers/ThemeProvider'
import { useGameStore } from '@/stores/gameStore'
import {
  BarChart3,
  LineChart as LineChartIcon,
  TrendingUp,
  GridComponent,
  Users,
} from 'lucide-react'
import { VoteChart } from '@/components/analytics/VoteChart'
import { MomentumChart } from '@/components/analytics/MomentumChart'
import { LeaderboardChart } from '@/components/analytics/LeaderboardChart'
import type { GameRound } from '@blender/types'

export default function AnalyticsPage() {
  const { colors } = useTheme()
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
    <main className="min-h-screen pt-20 pb-24 px-4" style={{ backgroundColor: colors.bg.primary }}>
      {/* Header */}
      <motion.div className="mb-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h1 className="text-3xl font-bold mb-1" style={{ color: colors.text.primary }}>
          📊 Market Analytics
        </h1>
        <p style={{ color: colors.text.secondary }}>Real-time voting insights</p>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        className="grid grid-cols-2 gap-3 mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ staggerChildren: 0.1 }}
      >
        <AnalyticsStat
          icon={<Users size={18} style={{ color: colors.accent.primary }} />}
          label="Total Votes"
          value={round?.totalVotes || 0}
          colors={colors}
        />
        <AnalyticsStat
          icon={<TrendingUp size={18} style={{ color: colors.status.success }} />}
          label="Candidates"
          value={round?.candidates.length || 0}
          colors={colors}
        />
      </motion.div>

      {/* Charts */}
      <div className="space-y-6">
        {/* Vote Distribution */}
        <motion.div
          className="rounded-2xl border p-6"
          style={{
            backgroundColor: colors.bg.secondary,
            borderColor: colors.border.default,
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 size={18} style={{ color: colors.accent.primary }} />
            <h2 className="text-lg font-bold" style={{ color: colors.text.primary }}>
              Vote Distribution
            </h2>
          </div>
          {round && <VoteChart round={round} colors={colors} />}
        </motion.div>

        {/* Momentum */}
        <motion.div
          className="rounded-2xl border p-6"
          style={{
            backgroundColor: colors.bg.secondary,
            borderColor: colors.border.default,
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <LineChartIcon size={18} style={{ color: colors.status.success }} />
            <h2 className="text-lg font-bold" style={{ color: colors.text.primary }}>
              Weekly Momentum
            </h2>
          </div>
          <MomentumChart colors={colors} />
        </motion.div>

        {/* Leaderboard */}
        <motion.div
          className="rounded-2xl border p-6"
          style={{
            backgroundColor: colors.bg.secondary,
            borderColor: colors.border.default,
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-lg font-bold mb-4" style={{ color: colors.text.primary }}>
            🏆 Top Predictors
          </h2>
          <LeaderboardChart colors={colors} />
        </motion.div>
      </div>
    </main>
  )
}

function AnalyticsStat({
  icon,
  label,
  value,
  colors,
}: {
  icon: React.ReactNode
  label: string
  value: number
  colors: any
}) {
  return (
    <motion.div
      className="p-4 rounded-lg border"
      style={{
        backgroundColor: colors.bg.secondary,
        borderColor: colors.border.default,
      }}
      whileHover={{ scale: 1.05 }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="mb-2">{icon}</div>
      <p style={{ color: colors.text.muted }} className="text-xs mb-1">
        {label}
      </p>
      <p className="text-2xl font-bold" style={{ color: colors.text.primary }}>
        {value}
      </p>
    </motion.div>
  )
}