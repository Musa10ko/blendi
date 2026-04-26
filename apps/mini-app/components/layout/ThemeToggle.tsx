// File: apps/mini-app/components/layout/ThemeToggle.tsx

'use client'
import { motion } from 'framer-motion'
import { Sun, Moon } from 'lucide-react'
import { useTheme } from '@/providers/ThemeProvider'

export function ThemeToggle() {
  const { theme, setTheme, colors } = useTheme()

  return (
    <motion.button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="fixed top-4 left-4 z-50 p-2 rounded-full border transition-all"
      style={{
        backgroundColor: colors.bg.secondary,
        borderColor: colors.border.default,
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        initial={false}
        animate={{ rotate: theme === 'dark' ? 0 : 180 }}
        transition={{ duration: 0.3 }}
      >
        {theme === 'dark' ? (
          <Moon size={20} color={colors.text.primary} />
        ) : (
          <Sun size={20} color={colors.accent.primary} />
        )}
      </motion.div>
    </motion.button>
  )
}