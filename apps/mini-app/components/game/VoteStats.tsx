// File: apps/mini-app/components/game/VoteStats.tsx

'use client'
import { motion } from 'framer-motion'
import { TrendingUp, Users } from 'lucide-react'
import type { GameRound } from '@blender/types'

interface VoteStatsProps {
  round: GameRound
  colors: any
}

export function VoteStats({ round, colors }: VoteStatsProps) {
  const topCandidate = [...round.candidates].sort((a, b) => b.votes - a.votes)[0]
  const momentum =
    round.candidates.length > 0
      ? ((topCandidate.votes / round.totalVotes) * 100).toFixed(1)
      : '0'

  return (
    <motion.div
      className="grid grid-cols-3 gap-3 mb-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ staggerChildren: 0.1 }}
    >
      {/* Total Votes */}
      <motion.div
        className="p-4 rounded-lg border backdrop-blur-sm"
        style={{
          backgroundColor: colors.bg.secondary,
          borderColor: colors.border.default,
        }}
        whileHover={{ scale: 1.05, borderColor: colors.accent.primary }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Users size={16} style={{ color: colors.accent.primary }} className="mb-2" />
        <p style={{ color: colors.text.muted }} className="text-xs mb-1">
          Total Votes
        </p>
        <p
          className="text-xl font-bold"
          style={{ color: colors.text.primary }}
        >
          {round.totalVotes}
        </p>
      </motion.div>

      {/* Leading */}
      <motion.div
        className="p-4 rounded-lg border backdrop-blur-sm"
        style={{
          backgroundColor: colors.bg.secondary,
          borderColor: colors.border.default,
        }}
        whileHover={{ scale: 1.05, borderColor: colors.accent.primary }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
      >
        <TrendingUp size={16} style={{ color: colors.status.success }} className="mb-2" />
        <p style={{ color: colors.text.muted }} className="text-xs mb-1">
          Leading
        </p>
        <p
          className="text-xl font-bold"
          style={{ color: colors.text.primary }}
        >
          {momentum}%
        </p>
      </motion.div>

      {/* Candidates */}
      <motion.div
        className="p-4 rounded-lg border backdrop-blur-sm"
        style={{
          backgroundColor: colors.bg.secondary,
          borderColor: colors.border.default,
        }}
        whileHover={{ scale: 1.05, borderColor: colors.accent.primary }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <span className="text-lg mb-2">🎭</span>
        <p style={{ color: colors.text.muted }} className="text-xs mb-1">
          Candidates
        </p>
        <p
          className="text-xl font-bold"
          style={{ color: colors.text.primary }}
        >
          {round.candidates.length}
        </p>
      </motion.div>
    </motion.div>
  )
}