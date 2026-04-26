// components/game/CentralModelCard.tsx
'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useMemo } from 'react'

interface CentralModelCardProps {
  model: NFTCandidate
  dayPhase: number  // 0-5
  isSelected: boolean
}

export function CentralModelCard({ model, dayPhase, isSelected }: CentralModelCardProps) {
  // Blur рівень залежить від дня
  const blurLevel = useMemo(() => {
    const BLUR_LEVELS = [
      'blur(32px)',  // Monday
      'blur(24px)',  // Tuesday
      'blur(16px)',  // Wednesday
      'blur(8px)',   // Thursday
      'blur(2px)',   // Friday
      'blur(0px)',   // Saturday-Sunday
    ]
    return BLUR_LEVELS[dayPhase] || 'blur(0px)'
  }, [dayPhase])

  return (
    <motion.div
      className={`relative w-48 h-48 rounded-2xl overflow-hidden border-2 transition-all ${
        isSelected
          ? 'border-accent shadow-lg shadow-accent/50'
          : 'border-border'
      }`}
      animate={{
        scale: isSelected ? 1.05 : 1,
        filter: isSelected ? 'brightness(1.1)' : 'brightness(1)',
      }}
      transition={{ duration: 0.3 }}
    >
      {/* Blur overlay */}
      <motion.div
        className="absolute inset-0 z-10 mix-blend-darken pointer-events-none"
        animate={{ backdropFilter: blurLevel }}
        transition={{ duration: 0.8 }}
      />

      {/* Background pattern (swirl) */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-transparent" />

      {/* NFT Image */}
      <Image
        src={model.imageUrl}
        alt={model.name}
        fill
        className="object-cover"
        priority
      />

      {/* Info overlay */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-3"
        animate={{ opacity: dayPhase >= 4 ? 1 : 0.5 }}
      >
        <p className="text-sm font-semibold text-text">{model.name}</p>
        <p className="text-xs text-text-secondary">#{model.tokenId}</p>
      </motion.div>
    </motion.div>
  )
}