// apps/mini-app/src/app/(main)/layout.tsx

'use client'

import { useEffect } from 'react'
import { Header } from '@/components/layout/Header'
import { BottomNav } from '@/components/layout/BottomNav'
import { Background } from '@/components/common/Background'
import { useAuth } from '@/hooks/useAuth'

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { login, isAuthenticated } = useAuth()

  useEffect(() => {
    if (!isAuthenticated && typeof window !== 'undefined') {
      // Try to get Telegram Init Data
      const initData = (window as any)?.Telegram?.WebApp?.initData
      if (initData) {
        login(initData)
      }
    }
  }, [isAuthenticated, login])

  return (
    <div className="relative w-full h-screen flex flex-col overflow-hidden">
      <Background />
      <Header />
      <main className="flex-1 overflow-y-auto overflow-x-hidden no-scrollbar pb-24 relative z-10 w-full max-w-md mx-auto">
        {children}
      </main>
      <BottomNav />
    </div>
  )
}