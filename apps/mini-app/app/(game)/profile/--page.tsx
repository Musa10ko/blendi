// File: apps/mini-app/app/(game)/profile/page.tsx

'use client'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useUserStore } from '@/stores/userStore'
import type { TelegramUser, NFT } from '@blender/types'

export default function ProfilePage() {
  const { telegramUser, vpScore, listedNFTs, unlistedNFTs, fetchProfile } = useUserStore()
  const [activeTab, setActiveTab] = useState<'listed' | 'unlisted'>('listed')

  useEffect(() => {
    fetchProfile()
  }, [fetchProfile])

  return (
    <main className="min-h-screen bg-gradient-to-b from-bg-primary to-bg-secondary py-6 px-4">
      {/* User Card */}
      <motion.div
        className="mb-8 bg-bg-secondary border border-border-default rounded-2xl p-6 flex items-center gap-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {/* Avatar */}
        {telegramUser?.photo_url && (
          <Image
            src={telegramUser.photo_url}
            alt={telegramUser.first_name}
            width={64}
            height={64}
            className="w-16 h-16 rounded-full"
          />
        )}

        {/* User Info */}
        <div className="flex-1">
          <h1 className="text-xl font-bold text-text-primary">
            {telegramUser?.first_name} {telegramUser?.last_name}
          </h1>
          <p className="text-sm text-text-secondary">@{telegramUser?.username}</p>

          {/* VP Score */}
          <div className="mt-3 flex items-center gap-2">
            <span className="text-xs text-text-muted">Voice Power:</span>
            <motion.span
              className="text-lg font-bold text-accent-primary"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {vpScore}
            </motion.span>
          </div>
        </div>

        {/* Premium Badge */}
        {telegramUser?.is_premium && (
          <div className="flex items-center gap-1 px-3 py-1 bg-accent-primary/10 border border-accent-primary/30 rounded-full">
            <span>⭐</span>
            <span className="text-xs font-semibold text-accent-primary">Premium</span>
          </div>
        )}
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        className="grid grid-cols-2 gap-4 mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <StatCard
          label="Listed NFTs"
          value={listedNFTs.length}
          icon="📦"
          highlight={true}
        />
        <StatCard label="Total NFTs" value={listedNFTs.length + unlistedNFTs.length} icon="🎁" />
      </motion.div>

      {/* Portfolio Tabs */}
      <div className="mb-4 flex gap-2">
        {['listed', 'unlisted'].map((tab) => (
          <motion.button
            key={tab}
            onClick={() => setActiveTab(tab as 'listed' | 'unlisted')}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              activeTab === tab
                ? 'bg-accent-primary text-white'
                : 'bg-bg-secondary text-text-secondary border border-border-default'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {tab === 'listed' ? '✅ Listed' : '📋 Unlisted'}
            <span className="ml-2 text-xs bg-white/20 px-2 py-1 rounded">
              {tab === 'listed' ? listedNFTs.length : unlistedNFTs.length}
            </span>
          </motion.button>
        ))}
      </div>

      {/* NFT Grid */}
      <motion.div
        className="grid grid-cols-2 gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {(activeTab === 'listed' ? listedNFTs : unlistedNFTs).map((nft, index) => (
          <NFTCard key={nft.id} nft={nft} isListed={activeTab === 'listed'} index={index} />
        ))}
      </motion.div>

      {/* Empty State */}
      {(activeTab === 'listed' ? listedNFTs : unlistedNFTs).length === 0 && (
        <motion.div
          className="text-center py-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <p className="text-text-muted mb-2">No {activeTab} NFTs yet</p>
          {activeTab === 'unlisted' && (
            <button className="text-sm text-accent-primary hover:text-accent-hover mt-2">
              List on Marketplace →
            </button>
          )}
        </motion.div>
      )}
    </main>
  )
}

// Component: StatCard
function StatCard({
  label,
  value,
  icon,
  highlight,
}: {
  label: string
  value: number
  icon: string
  highlight?: boolean
}) {
  return (
    <motion.div
      className={`rounded-lg p-4 border transition-all ${
        highlight
          ? 'bg-accent-primary/10 border-accent-primary/30'
          : 'bg-bg-secondary border-border-default'
      }`}
      whileHover={{ scale: 1.05 }}
    >
      <p className="text-2xl mb-1">{icon}</p>
      <p className="text-2xl font-bold text-text-primary">{value}</p>
      <p className="text-xs text-text-secondary mt-1">{label}</p>
    </motion.div>
  )
}

// Component: NFTCard
function NFTCard({
  nft,
  isListed,
  index,
}: {
  nft: NFT
  isListed: boolean
  index: number
}) {
  return (
    <motion.div
      className="group relative bg-bg-secondary rounded-lg overflow-hidden border border-border-default hover:border-accent-primary/50 transition-all cursor-pointer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ scale: 1.05, borderColor: 'rgba(124, 58, 237, 0.5)' }}
    >
      {/* Image */}
      <div className="relative w-full h-32 overflow-hidden">
        <Image
          src={nft.imageUrl || '/placeholder.png'}
          alt={nft.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-300"
        />
      </div>

      {/* Info */}
      <div className="p-3">
        <p className="text-sm font-semibold text-text-primary truncate">{nft.name}</p>
        <p className="text-xs text-text-secondary">#{nft.tokenId}</p>
        <p className="text-xs text-text-muted mt-1">{nft.floorPrice} TON</p>
      </div>

      {/* Status Badge */}
      {isListed && (
        <motion.div
          className="absolute top-2 right-2 bg-status-success/20 border border-status-success/50 rounded-full px-2 py-1"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-xs font-semibold text-status-success">ACTIVE</span>
        </motion.div>
      )}

      {!isListed && (
        <motion.div
          className="absolute top-2 right-2 bg-status-warning/20 border border-status-warning/50 rounded-full px-2 py-1"
          whileHover={{ scale: 1.1 }}
        >
          <span className="text-xs font-semibold text-status-warning">List</span>
        </motion.div>
      )}
    </motion.div>
  )
}