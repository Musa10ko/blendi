// File: apps/mini-app/app/(game)/pantheon/page.tsx

'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

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
  const [selectedEntry, setSelectedEntry] = useState<PantheonEntry | null>(mockPantheonData[0])

  return (
    <main className="min-h-screen bg-gradient-to-b from-bg-primary to-bg-secondary py-6 px-4">
      {/* Header */}
      <motion.div className="mb-8 text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h1 className="text-3xl font-bold text-accent-primary mb-2">🏛️ Hall of Winners</h1>
        <p className="text-text-secondary">Legendary NFTs from past rounds</p>
      </motion.div>

      {/* Main Featured Winner */}
      <AnimatePresence mode="wait">
        {selectedEntry && (
          <motion.div
            key={selectedEntry.id}
            className="mb-8 bg-gradient-to-br from-accent-primary/10 to-transparent border border-accent-primary/30 rounded-2xl p-6 overflow-hidden"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            {/* Glow effect */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent-primary/20 blur-3xl -z-10" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Image */}
              <motion.div
                className="relative h-64 rounded-xl overflow-hidden"
                whileHover={{ scale: 1.05 }}
              >
                <Image
                  src={selectedEntry.imageUrl || '/placeholder.png'}
                  alt={selectedEntry.nftName}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 left-4 bg-accent-primary/20 backdrop-blur-sm border border-accent-primary/50 rounded-full px-3 py-1">
                  <span className="text-sm font-bold text-accent-primary">Week {selectedEntry.week}</span>
                </div>
              </motion.div>

              {/* Details */}
              <motion.div className="flex flex-col justify-center gap-4">
                <div>
                  <p className="text-sm text-text-secondary mb-1">Winner of the Week</p>
                  <h2 className="text-3xl font-bold text-text-primary">{selectedEntry.nftName}</h2>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🗳️</span>
                    <div>
                      <p className="text-xs text-text-secondary">Total Votes</p>
                      <p className="text-xl font-bold text-accent-primary">{selectedEntry.votes}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-2xl">👤</span>
                    <div>
                      <p className="text-xs text-text-secondary">Owner</p>
                      <p className="text-sm font-semibold text-text-primary">{selectedEntry.owner}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-2xl">📅</span>
                    <div>
                      <p className="text-xs text-text-secondary">Date</p>
                      <p className="text-sm font-semibold text-text-primary">{selectedEntry.date}</p>
                    </div>
                  </div>
                </div>

                <motion.button
                  className="mt-4 px-4 py-2 bg-accent-primary hover:bg-accent-hover text-white font-semibold rounded-lg"
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

      {/* Pantheon History */}
      <div className="space-y-3">
        <h3 className="text-lg font-bold text-text-primary">Previous Winners</h3>
        <motion.div
          className="space-y-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {mockPantheonData.map((entry, index) => (
            <motion.button
              key={entry.id}
              onClick={() => setSelectedEntry(entry)}
              className={`w-full flex items-center gap-4 p-3 rounded-lg border transition-all ${
                selectedEntry?.id === entry.id
                  ? 'bg-accent-primary/10 border-accent-primary/50'
                  : 'bg-bg-secondary border-border-default hover:border-accent-primary/30'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              {/* Small image */}
              <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                <Image
                  src={entry.imageUrl || '/placeholder.png'}
                  alt={entry.nftName}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Info */}
              <div className="flex-1 text-left">
                <p className="text-sm font-semibold text-text-primary">{entry.nftName}</p>
                <p className="text-xs text-text-secondary">Week {entry.week}</p>
              </div>

              {/* Votes */}
              <div className="text-right">
                <p className="text-sm font-bold text-accent-primary">{entry.votes}</p>
                <p className="text-xs text-text-muted">votes</p>
              </div>
            </motion.button>
          ))}
        </motion.div>
      </div>

      {/* Monthly Winner Section */}
      <motion.div
        className="mt-8 bg-bg-secondary border border-border-default rounded-2xl p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-text-primary">🏆 Gift of the Month</h3>
          <span className="text-xs text-accent-primary font-semibold">5,000 TON Prize</span>
        </div>
        <p className="text-sm text-text-secondary">Best weekly winner gets feature in monthly leaderboard</p>
      </motion.div>
    </main>
  )
}