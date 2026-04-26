// components/game/VotePanel.tsx
'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { useGameStore } from '@/stores/gameStore'
import { useVoteMutation } from '@/hooks/useVoteMutation'

interface VotePanelProps {
  candidateId: string
  voteCount: number
}

export function VotePanel({ candidateId, voteCount }: VotePanelProps) {
  const [starAmount, setStarAmount] = useState<number | null>(null)
  const { submitVote, isVoting } = useVoteMutation()
  
  // Progressive pricing formula
  const calculateVotePrice = (count: number) => {
    if (count === 0) return 0
    const BASE = 10
    return Math.floor(BASE * Math.pow(1.1, count - 1))
  }

  const nextPrice = calculateVotePrice(voteCount)

  const handleVote = async () => {
    if (!candidateId) return
    
    const amount = voteCount === 0 ? 0 : nextPrice
    await submitVote(candidateId, amount)
    
    // Haptic feedback
    window.Telegram?.WebApp?.HapticFeedback?.impactOccurred?.('heavy')
  }

  return (
    <motion.div
      className="fixed bottom-20 left-4 right-4 bg-surface/95 backdrop-blur-lg border border-border rounded-xl p-4"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3 }}
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm text-text-secondary">Vote for this model</span>
        <div className="flex items-center gap-1 bg-bg px-2 py-1 rounded-lg">
          <span className="text-base">⭐</span>
          <span className="text-sm font-semibold text-accent">
            {voteCount === 0 ? 'FREE' : `${nextPrice}`}
          </span>
        </div>
      </div>

      <motion.button
        onClick={handleVote}
        disabled={isVoting}
        className="w-full py-3 bg-accent hover:bg-accent-hover disabled:opacity-50 text-white font-semibold rounded-lg transition-all"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {isVoting ? 'Voting...' : 'Cast Vote'}
      </motion.button>

      {voteCount > 0 && (
        <p className="text-xs text-text-secondary text-center mt-2">
          +{Math.round((nextPrice / 10) * 100)}% cost for next vote
        </p>
      )}
    </motion.div>
  )
}