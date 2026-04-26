// File: apps/mini-app/components/game/ClueIndicator.tsx

'use client'
import { motion } from 'framer-motion'
import { useTheme } from '@/providers/ThemeProvider'
import { Eye, EyeOff } from 'lucide-react'

interface ClueIndicatorProps {
  level: number
}

export function ClueIndicator({ level }: ClueIndicatorProps) {
  const { colors } = useTheme()
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const messages = [
    '🫥 Heavily Blurred',
    '😮 Getting Closer',
    '🤔 Still Fuzzy',
    '👀 Almost Clear',
    '✨ Crystal Clear',
    '🎯 Fully Revealed',
  ]

  return (
    <motion.div
      className="mb-6 p-4 rounded-lg border"
      style={{
        backgroundColor: colors.bg.secondary,
        borderColor: colors.border.default,
      }}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Progress bars */}
      <div className="flex gap-1 mb-3">
        {days.map((day, idx) => (
          <motion.div
            key={day}
            className="flex-1 h-2 rounded-full"
            style={{
              backgroundColor:
                idx <= level ? colors.accent.primary : colors.bg.tertiary,
            }}
            animate={{
              boxShadow:
                idx <= level
                  ? `0 0 10px ${colors.accent.glow}`
                  : 'none',
            }}
            transition={{ duration: 0.5 }}
          />
        ))}
      </div>

      {/* Status */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {level >= 4 ? (
            <Eye size={16} style={{ color: colors.accent.primary }} />
          ) : (
            <EyeOff size={16} style={{ color: colors.text.muted }} />
          )}
          <span style={{ color: colors.text.secondary }} className="text-sm">
            {messages[level]}
          </span>
        </div>
        <span
          className="text-xs font-bold px-2 py-1 rounded-full"
          style={{
            backgroundColor: colors.accent.glow,
            color: colors.accent.primary,
          }}
        >
          Day {level + 1}
        </span>
      </div>
    </motion.div>
  )
}