// apps/mini-app/src/app/(main)/page.tsx

'use client'

import { Suspense } from 'react'
import { FlipClock } from '@/components/game/FlipClock'
import { ClueGrid } from '@/components/game/ClueGrid'
import { VoteCard } from '@/components/game/VoteCard'
import { useGame } from '@/hooks/useGame'
import { Loader } from '@/components/common/Loader'

function HomeContent() {
  const { currentRound, candidates, isLoading } = useGame()

  if (isLoading) return <Loader />

  return (
    <div className="px-5 space-y-6 py-6">
      {/* Flip Clock */}
      <FlipClock />

      {/* Current Model */}
      {candidates?.[0] && (
        <>
          <div className="bg-white/10 dark:bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/10">
            <p className="text-xs text-gray-600 dark:text-gray-400 mb-3 font-semibold">Модель тижня</p>
            <div className="rounded-lg overflow-hidden mb-3">
              <img
                src={candidates[0].nft.image}
                alt={candidates[0].nft.name}
                className="w-full h-auto object-cover rounded-lg"
              />
            </div>
            <h2 className="font-bold text-lg mb-2">{candidates[0].nft.name}</h2>
          </div>

          {/* Vote Card */}
          <VoteCard
            candidateId={candidates[0].id}
            candidateName={candidates[0].nft.name}
            image={candidates[0].nft.image}
            floor={candidates[0].nft.floorPrice}
          />
        </>
      )}

      {/* Clue Grid */}
      <ClueGrid revealedDays={[1, 2]} currentDay={2} />

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white/10 dark:bg-white/5 backdrop-blur-md rounded-xl p-3 border border-white/10">
          <p className="text-xs text-gray-600 dark:text-gray-400">Обсяг</p>
          <p className="text-lg font-bold">42.5K ⭐</p>
        </div>
        <div className="bg-white/10 dark:bg-white/5 backdrop-blur-md rounded-xl p-3 border border-white/10">
          <p className="text-xs text-gray-600 dark:text-gray-400">Голосів</p>
          <p className="text-lg font-bold">1,234</p>
        </div>
      </div>
    </div>
  )
}

export default function Home() {
  return (
    <Suspense fallback={<Loader />}>
      <HomeContent />
    </Suspense>
  )
}