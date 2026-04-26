// File: apps/mini-app/app/(game)/pantheon/page.tsx

'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { useTheme } from '@/providers/ThemeProvider'
import { Trophy, Calendar, User, Flame } from 'lucide-react'

interface PantheonEntry {
  id: string
  week: number
  nftName: string
  imageUrl: string
  votes: number
  owner: string
  date: string
}

const mockPantheonData: PantheonEntry[] = [
  {
    id: '1',
    week: 1,
    nftName: 'Golden Gem',
    imageUrl: '/mock-nft-1.jpg',
    votes: 3240,
    owner: '@user123',
    date: '2024-03-17',
  },
  {
    id: '2',
    week: 2,
    nftName: 'Mystic Dragon',
    imageUrl: '/mock-nft-2.jpg',
    votes: 2856,
    owner: '@crypto_pro',
    date: '2024-03-10',
  },
  {
    id: '3',
    week: 3,
    nftName: 'Toy Bear',
    imageUrl: '/mock-nft-3.jpg',
    votes: 2145,
    owner: '@collector_xyz',
    date: '2024-03-03',
  },
]

export default function PantheonPage() {
  const { colors } = useTheme()
  const [selectedEntry, setSelectedEntry] = useState(mockPantheonData[0])

  return (
    <main className="min-h-screen pt-20 pb-24 px-4" style={{ backgroundColor: colors.bg.primary }}>
      {/* Header */}
      <motion.div className="mb-8 text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h1 className="text-4xl font-bold mb-2" style={{ color: colors.accent.primary }}>
          🏛️ Hall of Winners
        </h1>
        <p style={{ color: colors.text.secondary }}>Legendary NFTs from past rounds</p>
      </motion.div>

      {/* Featured Winner */}
      <AnimatePresence mode="wait">
        {selectedEntry && (
          <motion.div
            key={selectedEntry.id}
            className="mb-8 rounded-2xl border overflow-hidden"
            style={{
              backgroundColor: colors.bg.secondary,
              borderColor: colors.accent.primary,
              background: `linear-gradient(135deg, ${colors.accent.glow} 0%, ${colors.bg.secondary} 100%)`,
            }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            {/* Glow effect */}
            <motion.div
              className="absolute top-0 right-0 w-40 h-40 -z-10"
              style={{
                background: `radial-gradient(circle, ${colors.accent.glowStrong}, transparent)`,
                filter: 'blur(40px)',
              }}
              animate={{
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
              {/* Image */}
              <motion.div className="relative h-64 rounded-lg overflow-hidden" whileHover={{ scale: 1.05 }}>
                <Image
                  src={selectedEntry.imageUrl || '/placeholder.png'}
                  alt={selectedEntry.nftName}
                  fill
                  className="object-cover"
                />
                <div
                  className="absolute top-4 left-4 px-3 py-1 rounded-full text-sm font-bold backdrop-blur-sm"
                  style={{
                    backgroundColor: colors.accent.glow,
                    color: colors.accent.primary,
                    border: `1px solid ${colors.accent.light}`,
                  }}
                >
                  Week {selectedEntry.week}
                </div>
              </motion.div>

              {/* Details */}
              <motion.div className="flex flex-col justify-center gap-4">
                <div>
                  <p style={{ color: colors.text.muted }} className="text-sm mb-1">
                    Winner of the Week
                  </p>
                  <h2
                    className="text-3xl font-bold"
                    style={{ color: colors.text.primary }}
                  >
                    {selectedEntry.nftName}
                  </h2>
                </div>

                {/* Stats */}
                <div className="space-y-3">
                  <StatRow
                    icon={<Flame size={16} style={{ color: colors.status.success }} />}
                    label="Total Votes"
                    value={selectedEntry.votes.toString()}
                    colors={colors}
                  />
                  <StatRow
                    icon={<User size={16} style={{ color: colors.accent.primary }} />}
                    label="Owner"
                    value={selectedEntry.owner}
                    colors={colors}
                  />
                  <StatRow
                    icon={<Calendar size={16} style={{ color: colors.text.muted }} />}
                    label="Date"
                    value={selectedEntry.date}
                    colors={colors}
                  />
                </div>

                <motion.button
                  className="mt-4 px-6 py-3 rounded-lg font-bold text-white"
                  style={{ backgroundColor: colors.accent.primary }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View on Marketplace
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* History List */}
      <div className="mb-6">
        <h3 className="text-lg font-bold mb-3" style={{ color: colors.text.primary }}>
          Previous Winners
        </h3>
        <motion.div
          className="space-y-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {mockPantheonData.map((entry, idx) => (
            <motion.button
              key={entry.id}
              onClick={() => setSelectedEntry(entry)}
              className="w-full flex items-center gap-4 p-3 rounded-lg border transition-all"
              style={{
                backgroundColor: selectedEntry.id === entry.id ? colors.bg.tertiary : colors.bg.secondary,
                borderColor: selectedEntry.id === entry.id ? colors.accent.primary : colors.border.default,
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
            >
              <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                <Image
                  src={entry.imageUrl || '/placeholder.png'}
                  alt={entry.nftName}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex-1 text-left">
                <p className="text-sm font-bold" style={{ color: colors.text.primary }}>
                  {entry.nftName}
                </p>
                <p style={{ color: colors.text.muted }} className="text-xs">
                  Week {entry.week}
                </p>
              </div>

              <motion.div className="text-right" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity }}>
                <Trophy size={16} style={{ color: colors.accent.primary }} className="mb-1" />
                <p className="text-sm font-bold" style={{ color: colors.accent.primary }}>
                  {entry.votes}
                </p>
              </motion.div>
            </motion.button>
          ))}
        </motion.div>
      </div>

      {/* Monthly Prize */}
      <motion.div
        className="rounded-2xl border p-6 text-center"
        style={{
          backgroundColor: colors.bg.secondary,
          borderColor: colors.border.default,
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <p className="text-sm" style={{ color: colors.text.muted }}>
          🏆 Gift of the Month
        </p>
        <p className="text-xl font-bold mt-1" style={{ color: colors.status.success }}>
          5,000 TON Prize
        </p>
      </motion.div>
    </main>
  )
}

function StatRow({
  icon,
  label,
  value,
  colors,
}: {
  icon: React.ReactNode
  label: string
  value: string
  colors: any
}) {
  return (
    <div className="flex items-center gap-3">
      {icon}
      <div className="flex-1">
        <p style={{ color: colors.text.muted }} className="text-xs">
          {label}
        </p>
      </div>
      <p className="text-sm font-bold" style={{ color: colors.text.primary }}>
        {value}
      </p>
    </div>
  )
}