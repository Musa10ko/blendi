// apps/web/src/components/game/Carousel.tsx
'use client'

import { motion } from 'framer-motion'

export function Carousel() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white/10 dark:bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/10"
    >
      {/* Carousel content */}
    </motion.div>
  )
}