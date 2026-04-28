// apps/mini-app/src/app/(main)/stats/page.tsx

'use client'

import dynamic from 'next/dynamic'
import { useAnalytics } from '@/hooks/useAnalytics'
import { Loader } from '@/components/common/Loader'

const VoteDistributionChart = dynamic(
  () => import('@/components/analytics/VoteDistributionChart'),
  { ssr: false }
)

const MarketSentimentChart = dynamic(
  () => import('@/components/analytics/MarketSentimentChart'),
  { ssr: false }
)

export default function StatsPage() {
  const { sentiment, leaderboard, isLoading } = useAnalytics()

  if (isLoading) return <Loader />

  return (
    <div className="px-5 space-y-6 py-6">
      {/* Title */}
      <div>
        <h1 className="text-2xl font-bold mb-2">Аналітика</h1>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Статистика раунду й ринкові дані
        </p>
      </div>

      {/* Market Sentiment Chart */}
      <div className="bg-white/10 dark:bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/10">
        <h3 className="font-bold mb-3">Ринковий Настрій</h3>
        <MarketSentimentChart data={sentiment} />
      </div>

      {/* Vote Distribution */}
      <div className="bg-white/10 dark:bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/10">
        <h3 className="font-bold mb-3">Розподіл Голосів</h3>
        <VoteDistributionChart />
      </div>

      {/* Top Predictors */}
      <div className="bg-white/10 dark:bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/10">
        <h3 className="font-bold mb-4">Топ Прогнозистів</h3>
        <div className="space-y-2">
          {leaderboard?.slice(0, 5).map((entry, idx) => (
            <div
              key={entry.userId}
              className="flex items-center justify-between p-2 bg-white/5 dark:bg-white/10 rounded-lg"
            >
              <div className="flex items-center gap-2">
                <span className="font-bold text-primary">#{idx + 1}</span>
                <span className="text-sm">{entry.username}</span>
              </div>
              <span className="font-semibold">{entry.votes} голосів</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}