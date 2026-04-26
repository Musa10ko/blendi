// File: apps/mini-app/app/(game)/profile/page.tsx

'use client'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useUserStore } from '@/stores/userStore'
import { useTheme } from '@/providers/ThemeProvider'
import {
  User,
  Package,
  Gift,
  Zap,
  TrendingUp,
  Lock,
  Share2,
} from 'lucide-react'

export default function ProfilePage() {
  const { colors } = useTheme()
  const { telegramUser, vpScore, listedNFTs, unlistedNFTs, fetchProfile } =
    useUserStore()
  const [activeTab, setActiveTab] = useState<'listed' | 'unlisted'>('listed')

  useEffect(() => {
    fetchProfile()
  }, [fetchProfile])

  const nfts = activeTab === 'listed' ? listedNFTs : unlistedNFTs
  const tabCount = {
    listed: listedNFTs.length,
    unlisted: unlistedNFTs.length,
  }

  return (
    <main className="min-h-screen pt-20 pb-24 px-4" style={{ backgroundColor: colors.bg.primary }}>
      {/* User Card - Hero */}
      <motion.div
        className="mb-8 rounded-2xl border overflow-hidden backdrop-blur-sm"
        style={{
          backgroundColor: colors.bg.secondary,
          borderColor: colors.border.default,
          background: `linear-gradient(135deg, ${colors.accent.glow} 0%, ${colors.bg.secondary} 100%)`,
        }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {/* Banner */}
        <motion.div
          className="h-24 relative overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${colors.accent.primary}40, ${colors.accent.hover}20)`,
          }}
          animate={{
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />

        {/* Profile Content */}
        <div className="relative px-6 pb-6">
          {/* Avatar */}
          <motion.div
            className="flex items-end gap-4 -mt-12 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {telegramUser?.photo_url && (
              <motion.div
                className="relative w-24 h-24 rounded-2xl overflow-hidden border-4"
                style={{ borderColor: colors.bg.primary }}
                whileHover={{ scale: 1.05 }}
              >
                <Image
                  src={telegramUser.photo_url}
                  alt={telegramUser.first_name}
                  fill
                  className="object-cover"
                />
              </motion.div>
            )}

            <div className="pb-2">
              <h1
                className="text-2xl font-bold"
                style={{ color: colors.text.primary }}
              >
                {telegramUser?.first_name}
              </h1>
              <p style={{ color: colors.text.secondary }}>
                @{telegramUser?.username}
              </p>
            </div>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            className="grid grid-cols-3 gap-3 mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ staggerChildren: 0.1 }}
          >
            {/* VP Score */}
            <motion.div
              className="p-3 rounded-lg border"
              style={{
                backgroundColor: colors.bg.tertiary,
                borderColor: colors.border.subtle,
              }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Zap size={14} style={{ color: colors.accent.primary }} className="mb-1" />
              <p style={{ color: colors.text.muted }} className="text-xs">
                Voice Power
              </p>
              <p
                className="text-lg font-bold"
                style={{ color: colors.text.primary }}
              >
                {vpScore}
              </p>
            </motion.div>

            {/* Listed NFTs */}
            <motion.div
              className="p-3 rounded-lg border"
              style={{
                backgroundColor: colors.bg.tertiary,
                borderColor: colors.border.subtle,
              }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
            >
              <Package size={14} style={{ color: colors.status.success }} className="mb-1" />
              <p style={{ color: colors.text.muted }} className="text-xs">
                Listed
              </p>
              <p
                className="text-lg font-bold"
                style={{ color: colors.text.primary }}
              >
                {listedNFTs.length}
              </p>
            </motion.div>

            {/* All NFTs */}
            <motion.div
              className="p-3 rounded-lg border"
              style={{
                backgroundColor: colors.bg.tertiary,
                borderColor: colors.border.subtle,
              }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Gift size={14} style={{ color: colors.accent.primary }} className="mb-1" />
              <p style={{ color: colors.text.muted }} className="text-xs">
                Total
              </p>
              <p
                className="text-lg font-bold"
                style={{ color: colors.text.primary }}
              >
                {listedNFTs.length + unlistedNFTs.length}
              </p>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Tab Navigation */}
      <motion.div
        className="flex gap-2 mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        {(['listed', 'unlisted'] as const).map((tab) => (
          <motion.button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className="flex-1 py-3 rounded-lg font-semibold transition-all border"
            style={{
              backgroundColor: activeTab === tab ? colors.accent.primary : colors.bg.secondary,
              borderColor: activeTab === tab ? colors.accent.primary : colors.border.default,
              color: activeTab === tab ? 'white' : colors.text.primary,
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {tab === 'listed' ? '✅ Listed' : '📋 Unlisted'}
            <span className="ml-2 text-sm opacity-75">({tabCount[tab]})</span>
          </motion.button>
        ))}
      </motion.div>

      {/* NFT Grid */}
      <motion.div
        className="grid grid-cols-2 gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ staggerChildren: 0.05 }}
      >
        {nfts.map((nft, index) => (
          <NFTGridCard
            key={nft.id}
            nft={nft}
            isListed={activeTab === 'listed'}
            index={index}
            colors={colors}
          />
        ))}
      </motion.div>

      {/* Empty state */}
      {nfts.length === 0 && (
        <motion.div
          className="text-center py-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <p style={{ color: colors.text.muted }} className="mb-3">
            No {activeTab} NFTs
          </p>
          {activeTab === 'unlisted' && (
            <motion.button
              className="px-4 py-2 rounded-lg font-semibold text-white"
              style={{ backgroundColor: colors.accent.primary }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              List on Marketplace →
            </motion.button>
          )}
        </motion.div>
      )}
    </main>
  )
}

function NFTGridCard({
  nft,
  isListed,
  index,
  colors,
}: {
  nft: any
  isListed: boolean
  index: number
  colors: any
}) {
  return (
    <motion.div
      className="group relative rounded-lg overflow-hidden border cursor-pointer"
      style={{
        backgroundColor: colors.bg.secondary,
        borderColor: colors.border.default,
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{
        scale: 1.05,
        borderColor: colors.accent.primary,
      }}
    >
      {/* Image */}
      <div className="relative w-full aspect-square overflow-hidden">
        <Image
          src={nft.imageUrl || '/placeholder.png'}
          alt={nft.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />
      </div>

      {/* Info */}
      <div className="p-3">
        <p className="text-sm font-bold truncate" style={{ color: colors.text.primary }}>
          {nft.name}
        </p>
        <p className="text-xs" style={{ color: colors.text.secondary }}>
          #{nft.tokenId}
        </p>
        <p className="text-xs mt-1" style={{ color: colors.text.muted }}>
          {nft.floorPrice} TON
        </p>
      </div>

      {/* Status Badge */}
      <motion.div
        className="absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-bold"
        style={{
          backgroundColor: isListed ? `${colors.status.success}40` : `${colors.status.warning}40`,
          color: isListed ? colors.status.success : colors.status.warning,
          border: `1px solid ${isListed ? colors.status.success : colors.status.warning}`,
        }}
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        {isListed ? '✓ ACTIVE' : 'List'}
      </motion.div>
    </motion.div>
  )
}