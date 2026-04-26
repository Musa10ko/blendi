// apps/mini-app/components/layout/BottomNav.tsx
'use client'
import { motion } from 'framer-motion'
import clsx from 'clsx'

interface Tab {
  id: string
  label: string
  path: string
  icon: string
}

interface BottomNavProps {
  tabs: Tab[]
  activeTab: string
  onTabChange: (tabId: string) => void
}

export function BottomNav({ tabs, activeTab, onTabChange }: BottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-surface/95 backdrop-blur-lg border-t border-border">
      <div className="flex items-center justify-around h-16 max-w-screen-sm mx-auto px-2">
        {tabs.map((tab) => (
          <motion.button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={clsx(
              'relative flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-lg transition-colors',
              activeTab === tab.id
                ? 'text-accent'
                : 'text-text-secondary hover:text-text'
            )}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Animated background glow за активного таба */}
            {activeTab === tab.id && (
              <motion.div
                className="absolute inset-0 bg-accent/10 rounded-lg -z-10"
                layoutId="navGlow"
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              />
            )}
            
            <span className="text-xl">{tab.icon}</span>
            <span className="text-xs font-medium text-nowrap">{tab.label}</span>
            
            {/* Pulse indicator */}
            {activeTab === tab.id && (
              <motion.div
                className="absolute bottom-0 h-0.5 bg-accent rounded-t"
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 0.3 }}
              />
            )}
          </motion.button>
        ))}
      </div>
    </nav>
  )
}