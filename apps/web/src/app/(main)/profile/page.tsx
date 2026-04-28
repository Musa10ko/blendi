// apps/mini-app/src/app/(main)/profile/page.tsx

'use client'

import { useState } from 'react'
import { useAppStore } from '@/lib/store'
import { formatNumber } from '@repo/shared'
import { Loader } from '@/components/common/Loader'

type Tab = 'gifts' | 'activity' | 'pro'

export default function ProfilePage() {
  const { user } = useAppStore()
  const [activeTab, setActiveTab] = useState<Tab>('gifts')

  if (!user) return <Loader />

  return (
    <div className="px-5 space-y-6 py-6">
      {/* User Card */}
      <div className="bg-white/10 dark:bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 text-center">
        {user.avatar && (
          <img
            src={user.avatar}
            alt={user.username}
            className="w-16 h-16 rounded-full mx-auto mb-3 border-2 border-primary"
          />
        )}
        <h2 className="text-2xl font-bold mb-1">{user.username}</h2>
        <p className="text-xs text-gray-600 dark:text-gray-400 mb-4">@{user.username}</p>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white/10 dark:bg-white/5 rounded-lg p-3">
            <p className="text-xs text-gray-600 dark:text-gray-400">Рейтинг</p>
            <p className="text-xl font-bold text-primary">#{user.rank || 0}</p>
          </div>
          <div className="bg-white/10 dark:bg-white/5 rounded-lg p-3">
            <p className="text-xs text-gray-600 dark:text-gray-400">VP</p>
            <p className="text-xl font-bold">{user.vp}x</p>
          </div>
          <div className="bg-white/10 dark:bg-white/5 rounded-lg p-3">
            <p className="text-xs text-gray-600 dark:text-gray-400">Зірок</p>
            <p className="text-xl font-bold text-yellow-500">{formatNumber(user.stars)}</p>
          </div>
          <div className="bg-white/10 dark:bg-white/5 rounded-lg p-3">
            <p className="text-xs text-gray-600 dark:text-gray-400">Голосів</p>
            <p className="text-xl font-bold">{user.totalVotes}</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-white/10">
        {(['gifts', 'activity', 'pro'] as Tab[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-3 px-4 font-semibold transition text-sm ${
              activeTab === tab
                ? 'text-primary border-b-2 border-primary'
                : 'text-gray-600 dark:text-gray-400'
            }`}
          >
            {tab === 'gifts' ? '🎁 Подарки' : tab === 'activity' ? '📊 Активність' : '⭐ PRO'}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === 'gifts' && (
          <div className="space-y-3">
            <p className="text-sm text-gray-600 dark:text-gray-400">У розробці...</p>
          </div>
        )}

        {activeTab === 'activity' && (
          <div className="space-y-3">
            <div className="bg-white/10 dark:bg-white/5 rounded-lg p-3 border border-white/10">
              <p className="text-xs text-gray-600 dark:text-gray-400">Всього голосів</p>
              <p className="text-lg font-bold">{user.totalVotes}</p>
            </div>
            <div className="bg-white/10 dark:bg-white/5 rounded-lg p-3 border border-white/10">
              <p className="text-xs text-gray-600 dark:text-gray-400">Всього видано зірок</p>
              <p className="text-lg font-bold">{formatNumber(user.totalStars)}</p>
            </div>
          </div>
        )}

        {activeTab === 'pro' && (
          <div className="text-center py-12">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Розблокуй PRO для спеціальних можливостей
            </p>
            <button className="bg-primary hover:bg-primary/90 text-white font-bold py-2 px-6 rounded-lg transition active:scale-95">
              Купити PRO
            </button>
          </div>
        )}
      </div>
    </div>
  )
}