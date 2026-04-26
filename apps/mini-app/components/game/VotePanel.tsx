// File: apps/mini-app/components/game/VotePanel.tsx

'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Star, AlertCircle, CheckCircle } from 'lucide-react'
import { useGameStore } from '@/stores/gameStore'

interface VotePanelProps {
  candidateId: string | null
  colors: any
  onVoteSuccess: () => void
}

export function VotePanel({
  candidateId,
  colors,
  onVoteSuccess,
}: VotePanelProps) {
  const [voteCount, setVoteCount] = useState(0)
  const { submitVote, isVoting, votingError } = useGameStore()

  const calculatePrice = (count: number) => {
    if (count === 0) return 0
    return Math.floor(10 * Math.pow(1.1, count - 1))
  }

  const nextPrice = calculatePrice(voteCount)

  const handleVote = async () => {
    if (!candidateId) return
    await submitVote(candidateId, nextPrice)
    onVoteSuccess()
    setVoteCount(voteCount + 1)
  }

  return (
    <motion.div
      className="fixed bottom-20 left-4 right-4 max-w-sm mx-auto rounded-2xl border backdrop-blur-lg p-5 z-40"
      style={{
        backgroundColor: `${colors.bg.secondary}CC`,
        borderColor: colors.border.default,
        boxShadow: `0 20px 50px ${colors.accent.glow}`,
      }}
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <p style={{ color: colors.text.secondary }} className="text-sm">
            Vote for selected model
          </p>
          <motion.div
            className="flex items-center gap-2 mt-2"
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Star size={16} style={{ color: colors.accent.primary }} />
            <span
              className="text-lg font-bold"
              style={{ color: colors.accent.primary }}
            >
              {nextPrice === 0 ? 'FREE' : nextPrice}
            </span>
          </motion.div>
        </div>

        {/* Vote count */}
        {voteCount > 0 && (
          <motion.div
            className="px-3 py-1 rounded-full"
            style={{
              backgroundColor: colors.accent.glow,
              border: `1px solid ${colors.accent.light}`,
            }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
          >
            <p className="text-sm font-bold" style={{ color: colors.accent.primary }}>
              +{voteCount}
            </p>
          </motion.div>
        )}
      </div>

      {/* Vote button */}
      <motion.button
        onClick={handleVote}
        disabled={isVoting || !candidateId}
        className="w-full py-3 rounded-lg font-bold text-white transition-all relative overflow-hidden"
        style={{
          backgroundColor: candidateId ? colors.accent.primary : colors.text.muted,
          opacity: isVoting || !candidateId ? 0.6 : 1,
        }}
        whileHover={candidateId && !isVoting ? { scale: 1.02 } : {}}
        whileTap={candidateId && !isVoting ? { scale: 0.98 } : {}}
      >
        <motion.div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(90deg, transparent, ${colors.accent.light}, transparent)`,
          }}
          animate={{
            x: ['-100%', '100%'],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        />
        <span className="relative">
          {isVoting ? 'Casting...' : candidateId ? '✨ Cast Vote' : 'Select Model'}
        </span>
      </motion.button>

      {/* Error message */}
      {votingError && (
        <motion.div
          className="mt-3 p-2 rounded-lg flex items-center gap-2"
          style={{
            backgroundColor: `${colors.status.danger}20`,
            border: `1px solid ${colors.status.danger}`,
          }}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <AlertCircle size={14} style={{ color: colors.status.danger }} />
          <span
            className="text-xs"
            style={{ color: colors.status.danger }}
          >
            {votingError}
          </span>
        </motion.div>
      )}

      {/* Success message */}
      {voteCount > 0 && !votingError && (
        <motion.div
          className="mt-3 p-2 rounded-lg flex items-center gap-2"
          style={{
            backgroundColor: `${colors.status.success}20`,
            border: `1px solid ${colors.status.success}`,
          }}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <CheckCircle size={14} style={{ color: colors.status.success }} />
          <span
            className="text-xs"
            style={{ color: colors.status.success }}
          >
            {voteCount} vote{voteCount > 1 ? 's' : ''} cast!
          </span>
        </motion.div>
      )}

      {/* Info */}
      {voteCount > 0 && (
        <p
          className="text-xs text-center mt-3"
          style={{ color: colors.text.muted }}
        >
          +{Math.round((nextPrice / 10) * 100)}% cost for next vote
        </p>
      )}
    </motion.div>
  )
}