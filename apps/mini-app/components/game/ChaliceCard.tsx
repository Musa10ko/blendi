// File: apps/mini-app/components/game/ChaliceCard.tsx

'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useMemo } from 'react'
import { Sparkles } from 'lucide-react'
import type { NFTCandidate } from '@blender/types'

interface ChaliceCardProps {
  model: NFTCandidate
  dayPhase: number
  isSelected: boolean
  onSelect: () => void
  colors: any
}

export function ChaliceCard({
  model,
  dayPhase,
  isSelected,
  onSelect,
  colors,
}: ChaliceCardProps) {
  const blurLevel = useMemo(() => {
    const BLUR_LEVELS = [
      'blur(32px)',
      'blur(24px)',
      'blur(16px)',
      'blur(8px)',
      'blur(2px)',
      'blur(0px)',
    ]
    return BLUR_LEVELS[Math.min(dayPhase, 5)] || 'blur(0px)'
  }, [dayPhase])

  return (
    <motion.div
      onClick={onSelect}
      className="relative w-full max-w-sm aspect-square rounded-3xl overflow-hidden cursor-pointer group"
      style={{
        backgroundColor: colors.bg.secondary,
        border: `3px solid ${
          isSelected ? colors.accent.primary : colors.border.default
        }`,
      }}
      animate={{
        scale: isSelected ? 1.05 : 1,
        boxShadow: isSelected
          ? `0 0 40px ${colors.accent.glowStrong}`
          : `0 0 0px rgba(0,0,0,0)`,
      }}
      transition={{ duration: 0.3 }}
      whileHover={{
        borderColor: colors.accent.primary,
      }}
    >
      {/* Gradient overlay */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(135deg, ${colors.accent.glow} 0%, transparent 100%)`,
        }}
        animate={{
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 3, repeat: Infinity }}
      />

      {/* Blur effect */}
      <motion.div
        className="absolute inset-0 z-10 mix-blend-darken pointer-events-none"
        animate={{ backdropFilter: blurLevel }}
        transition={{ duration: 0.8 }}
      />

      {/* NFT Image */}
      <Image
        src={model.imageUrl || '/placeholder.png'}
        alt={model.name}
        fill
        className="object-cover group-hover:scale-110 transition-transform duration-500"
        priority
      />

      {/* Info overlay */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 z-20 p-4 backdrop-blur-md"
        style={{
          background: `linear-gradient(to top, rgba(0,0,0,0.8), transparent)`,
        }}
        animate={{ opacity: dayPhase >= 4 ? 1 : 0.7 }}
      >
        <div className="flex items-start justify-between">
          <div>
            <p
              className="text-lg font-bold"
              style={{ color: colors.text.primary }}
            >
              {model.name}
            </p>
            <p style={{ color: colors.text.secondary }}>#{model.tokenId}</p>
          </div>

          {/* Vote count badge */}
          <motion.div
            className="px-3 py-1 rounded-full backdrop-blur-md"
            style={{
              backgroundColor: colors.accent.glow,
              border: `1px solid ${colors.accent.light}`,
            }}
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="flex items-center gap-1">
              <Sparkles size={14} style={{ color: colors.accent.primary }} />
              <span
                className="text-sm font-bold"
                style={{ color: colors.accent.primary }}
              >
                {model.votes}
              </span>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Corner indicator */}
      {isSelected && (
        <motion.div
          className="absolute top-4 right-4 z-20"
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        >
          <div
            className="w-6 h-6 rounded-full flex items-center justify-center"
            style={{
              backgroundColor: colors.accent.glow,
              border: `2px solid ${colors.accent.primary}`,
            }}
          >
            <div
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: colors.accent.primary }}
            />
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}