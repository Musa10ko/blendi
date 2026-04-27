// apps/web/src/app/(main)/page.tsx
'use client'

import { Suspense } from 'react'
import { FlipClock } from '@/components/game/FlipClock'
import { Carousel } from '@/components/game/Carousel'
import { VoteCard } from '@/components/game/VoteCard'
import { ClueGrid } from '@/components/game/ClueGrid'
import { Loader } from '@/components/common/Loader'

export default function Home() {
  return (
    <main className="flex-1 overflow-y-auto overflow-x-hidden no-scrollbar pb-24 relative z-10">
      {/* Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[80%] h-[50%] bg-purple-500/10 rounded-full blur-[100px] mix-blend-screen dark:mix-blend-lighten"></div>
        <div className="absolute top-[10%] right-[-10%] w-[60%] h-[40%] bg-blue-500/10 rounded-full blur-[100px] mix-blend-screen dark:mix-blend-lighten"></div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-30 px-5 pt-14 pb-4 flex justify-between items-center">
        <button className="w-10 h-10 rounded-full bg-white/10 dark:bg-white/5 backdrop-blur-md flex items-center justify-center hover:scale-105 transition active:scale-95">
          <span className="material-icons-round text-2xl">menu</span>
        </button>
        <div className="flex items-center space-x-2 bg-white/10 dark:bg-white/5 backdrop-blur-md rounded-full pl-4 pr-1 py-1 border border-white/10">
          <span className="text-xs font-mono">UQCf...Ivqv</span>
          <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
            <span className="material-icons-round text-sm">account_balance_wallet</span>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="px-5 space-y-6">
        {/* Flip Clock */}
        <Suspense fallback={<Loader />}>
          <FlipClock />
        </Suspense>

        {/* Carousel */}
        <Suspense fallback={<Loader />}>
          <Carousel />
        </Suspense>

        {/* Vote Card */}
        <Suspense fallback={<Loader />}>
          <VoteCard />
        </Suspense>

        {/* Clue Grid */}
        <Suspense fallback={<Loader />}>
          <ClueGrid />
        </Suspense>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white/10 dark:bg-white/5 backdrop-blur-md rounded-xl p-3 border border-white/10">
            <p className="text-xs text-gray-600 dark:text-gray-400">Volume</p>
            <p className="text-lg font-bold">42.5K</p>
          </div>
          <div className="bg-white/10 dark:bg-white/5 backdrop-blur-md rounded-xl p-3 border border-white/10">
            <p className="text-xs text-gray-600 dark:text-gray-400">Votes</p>
            <p className="text-lg font-bold">1,234</p>
          </div>
        </div>
      </div>
    </main>
  )
}