// File: apps/mini-app/app/(game)/home/page.tsx

'use client'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { CentralModelCard } from '@/components/game/CentralModelCard'
import { GameTimer } from '@/components/game/GameTimer'
import { VotePanel } from '@/components/game/VotePanel'
import { useGameStore } from '@/stores/gameStore'
import { useGameRound } from '@/hooks/useGameRound'
import type { GameRound } from '@blender/types'

export default function HomePage() {
  const { currentRound, selectedCandidateId, setSelectedCandidate, userVotes } = useGameStore()
  const [round, setRound] = useState<GameRound | null>(null)

  useEffect(() => {
    const fetchRound = async () => {
      try {
        const res = await fetch('/api/game/current-round')
        const data = await res.json()
        setRound(data)
      } catch (error) {
        console.error('Failed to fetch round:', error)
      }
    }

    fetchRound()
    const interval = setInterval(fetchRound, 10000)
    return () => clearInterval(interval)
  }, [])

  const mainCandidate = round?.candidates[0]
  const sideCandidate1 = round?.candidates[1]
  const sideCandidate2 = round?.candidates[2]

  const selectedVoteCount = selectedCandidateId
    ? userVotes.filter((v) => v.candidateId === selectedCandidateId).length
    : 0

  return (
    <main className="min-h-screen bg-gradient-to-b from-bg-primary to-bg-secondary flex flex-col items-center justify-center px-4 py-8 gap-8">
      {/* Header */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <h1 className="text-3xl font-bold text-accent-primary mb-2">Weekly Challenge</h1>
        <p className="text-text-secondary">Predict & Vote to Win Prizes</p>
      </motion.div>

      {/* Timer */}
      <GameTimer round={round} />

      {/* Game Arena */}
      <motion.div
        className="relative w-full flex flex-col items-center justify-center gap-8"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
      >
        {/* Center Card */}
        <div onClick={() => setSelectedCandidate(mainCandidate?.id || null)}>
          <CentralModelCard
            model={mainCandidate || null}
            dayPhase={round?.clueRevealLevel || 0}
            isSelected={selectedCandidateId === mainCandidate?.id}
          />
        </div>

        {/* Side candidates */}
        <div className="flex gap-6 justify-center">
          {[sideCandidate1, sideCandidate2].map((candidate, index) => (
            <motion.button
              key={candidate?.id || index}
              onClick={() => setSelectedCandidate(candidate?.id || null)}
              className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                selectedCandidateId === candidate?.id
                  ? 'border-accent-primary scale-110'
                  : 'border-border-default hover:border-accent-primary/50'
              }`}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
            >
              {candidate && (
                <img
                  src={candidate.imageUrl || '/placeholder.png'}
                  alt={candidate.name}
                  className="w-full h-full object-cover"
                />
              )}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Stats preview */}
      {round && (
        <motion.div
          className="w-full max-w-sm bg-bg-secondary border border-border-default rounded-lg p-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <p className="text-sm text-text-secondary mb-3">Total votes this round</p>
          <div className="space-y-2">
            {round.candidates.map((candidate) => (
              <div key={candidate.id} className="flex items-center justify-between">
                <span className="text-xs text-text-secondary">{candidate.name}</span>
                <span className="text-sm font-semibold text-accent-primary">{candidate.votes}</span>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Vote Panel */}
      <VotePanel candidateId={selectedCandidateId} voteCount={selectedVoteCount} />
    </main>
  )
}