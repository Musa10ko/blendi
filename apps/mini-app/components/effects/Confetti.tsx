// File: apps/mini-app/components/effects/Confetti.tsx

'use client'
import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useTheme } from '@/providers/ThemeProvider'

export function Confetti() {
  const { colors } = useTheme()
  const confetti = Array.from({ length: 30 }).map((_, i) => ({
    id: i,
    delay: Math.random() * 0.5,
    duration: 2 + Math.random() * 1,
    left: Math.random() * 100,
    emoji: ['🎉', '✨', '🎊', '⭐', '🌟'][Math.floor(Math.random() * 5)],
  }))

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {confetti.map((item) => (
        <motion.div
          key={item.id}
          className="absolute text-2xl"
          style={{
            left: `${item.left}%`,
            top: '-20px',
          }}
          animate={{
            y: window.innerHeight + 20,
            opacity: [1, 1, 0],
            rotate: Math.random() * 360,
          }}
          transition={{
            duration: item.duration,
            delay: item.delay,
            ease: 'easeIn',
          }}
        >
          {item.emoji}
        </motion.div>
      ))}
    </div>
  )
}