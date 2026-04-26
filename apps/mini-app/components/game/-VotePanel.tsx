// File: apps/mini-app/components/game/VotePanel.tsx

'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { useGameStore } from '@/stores/gameStore'

interface VotePanelProps {
  candidateId: string | null
  voteCount: number
}

export function VotePanel({ candidateId, voteCount }: VotePanelProps) {
  const [amount, setAmount] = useState<number>(0)
  const { submitVote, isVoting, votingError } = useGameStore()

  const calculatePrice = (count: number) => {
    if (count === 0) return 0
    return Math.floor(10 * Math.pow(1.1, count - 1))
  }

  const nextPrice = calculatePrice(voteCount)

  const handleVote = async () => {
    if (!candidateId) return
    await submitVote(candidateId, nextPrice)
  }

  return (
    <motion.div
      className="fixed bottom-20 left-4 right-4 bg-bg-secondary/95 backdrop-blur-lg border border-border-default rounded-xl p-4 z-30"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2 }}
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm text-text-secondary">Vote for this model</span>
        <div className="flex items-center gap-1 bg-bg-primary px-2 py-1 rounded-lg">
          <span className="text-base">⭐</span>
          <span className="text-sm font-semibold text-accent-primary">
            {voteCount === 0 ? 'FREE' : `${nextPrice}`}
          </span>
        </div>
      </div>

      <motion.button
        onClick={handleVote}
        disabled={isVoting || !candidateId}
        className="w-full py-3 bg-accent-primary hover:bg-accent-hover disabled:opacity-50 text-white font-semibold rounded-lg transition-all"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {isVoting ? 'Voting...' : 'Cast Vote'}
      </motion.button>

      {votingError && (
        <p className="text-xs text-status-danger text-center mt-2">{votingError}</p>
      )}

      {voteCount > 0 && !votingError && (
        <p className="text-xs text-text-muted text-center mt-2">
          +{Math.round((nextPrice / 10) * 100)}% cost for next vote
        </p>
      )}
    </motion.div>
  )
}