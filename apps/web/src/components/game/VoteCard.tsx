// apps/mini-app/src/components/game/VoteCard.tsx

'use client'

import { useState } from 'react'
import { useVote } from '@/hooks/useVote'
import { useAppStore } from '@/lib/store'

interface VoteCardProps {
  candidateId: string
  candidateName: string
  image: string
  floor?: number
  floorChange?: number
}

export function VoteCard({
  candidateId,
  candidateName,
  image,
  floor = 100,
  floorChange = 5,
}: VoteCardProps) {
  const { user } = useAppStore()
  const { castVote, isVoting } = useVote()
  const [starsInput, setStarsInput] = useState(10)

  const handleVote = () => {
    if (user && user.stars >= starsInput) {
      castVote({ candidateId, stars: starsInput })
    }
  }

  return (
    <div className="bg-white/10 dark:bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/10">
      <div className="flex gap-4">
        {/* Image */}
        <div className="w-20 h-20 rounded-lg bg-gray-300 overflow-hidden flex-shrink-0">
          <img src={image} alt={candidateName} className="w-full h-full object-cover" />
        </div>

        {/* Info */}
        <div className="flex-1">
          <h3 className="font-bold text-sm">{candidateName}</h3>
          <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">Floor: {floor}</p>
          <div className="flex gap-2 mb-3">
            <input
              type="number"
              value={starsInput}
              onChange={(e) => setStarsInput(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-16 px-2 py-1 bg-white/20 dark:bg-white/10 rounded border border-white/20 text-xs outline-none"
              min="1"
              max={user?.stars || 0}
            />
            <button
              onClick={handleVote}
              disabled={isVoting || !user || user.stars < starsInput}
              className="flex-1 bg-primary hover:bg-primary/90 disabled:bg-gray-400 text-white text-sm font-bold py-2 rounded-lg transition active:scale-95"
            >
              {isVoting ? 'Голосування...' : 'Голос'}
            </button>
          </div>
          <p className="text-xs text-gray-500">
            Зірок: {user?.stars || 0} / Рейтинг: {user?.rank || 0}
          </p>
        </div>
      </div>
    </div>
  )
}