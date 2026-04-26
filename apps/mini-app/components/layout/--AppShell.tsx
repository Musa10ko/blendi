// apps/mini-app/components/layout/AppShell.tsx
'use client'
import { ReactNode, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { BottomNav } from './BottomNav'

interface AppShellProps {
  children: ReactNode
  currentTab?: string
}

export function AppShell({ children, currentTab = 'home' }: AppShellProps) {
  const router = useRouter()
  const pathname = usePathname()
  
  // Визначаємо активний таб з pathname
  const activeTab = pathname.split('/')[1] || 'home'

  const tabs = [
    { id: 'profile', label: 'Profile', path: '/profile', icon: '👤' },
    { id: 'home', label: 'Game', path: '/home', icon: '🎮' },
    { id: 'wall', label: 'Wall', path: '/wall', icon: '📢' },
    { id: 'analytics', label: 'Stats', path: '/analytics', icon: '📊' },
    { id: 'pantheon', label: 'Hall', path: '/pantheon', icon: '🏛️' },
  ]

  const handleTabChange = (tabId: string) => {
    const tab = tabs.find(t => t.id === tabId)
    if (tab) router.push(tab.path)
  }

  return (
    <div className="relative w-full h-screen bg-bg overflow-hidden flex flex-col">
      {/* Main content area */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom navigation */}
      <BottomNav
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />
    </div>
  )
}