// components/game/GameTimer.tsx
'use client'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useGameStore } from '@/stores/gameStore'

export function GameTimer() {
  const [timeLeft, setTimeLeft] = useState<string>('')
  const currentRound = useGameStore((state) => state.currentRound)

  useEffect(() => {
    if (!currentRound) return

    const interval = setInterval(() => {
      const now = new Date()
      const diff = currentRound.endsAt.getTime() - now.getTime()
      
      if (diff <= 0) {
        setTimeLeft('Phase ended')
        return
      }

      const hours = Math.floor(diff / 3600000)
      const minutes = Math.floor((diff % 3600000) / 60000)
      const seconds = Math.floor((diff % 60000) / 1000)

      setTimeLeft(
        hours > 0
          ? `${hours}h ${minutes}m`
          : `${minutes}m ${seconds}s`
      )
    }, 1000)

    return () => clearInterval(interval)
  }, [currentRound])

  return (
    <motion.div
      className="flex items-center justify-center gap-2 px-4 py-2 bg-accent/10 border border-accent/30 rounded-full"
      animate={{ scale: [1, 1.02, 1] }}
      transition={{ duration: 2, repeat: Infinity }}
    >
      <span className="text-sm text-accent-glow">⏱️</span>
      <span className="text-sm font-semibold text-accent font-mono">{timeLeft}</span>
    </motion.div>
  )
}