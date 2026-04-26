// File: apps/mini-app/providers/TelegramProvider.tsx

'use client'
import { ReactNode, useEffect, useState } from 'react'

export function TelegramProvider({ children }: { children: ReactNode }) {
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    const initTelegram = () => {
      const script = document.createElement('script')
      script.src = 'https://telegram.org/js/telegram-web-app.js'
      script.async = true
      script.onload = () => {
        const tg = (window as any).Telegram?.WebApp
        if (tg) {
          tg.ready()
          tg.expand()
          tg.setHeaderColor('#0A0A0F')
          tg.setBackgroundColor('#0A0A0F')
          tg.setBottomBarColor('#12121A')
        }
        setIsReady(true)
      }
      document.head.appendChild(script)
    }

    initTelegram()
  }, [])

  if (!isReady) return <LoadingScreen />
  return <>{children}</>
}

function LoadingScreen() {
  return (
    <div className="w-full h-screen bg-bg-primary flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-2 border-accent-primary border-t-transparent mx-auto mb-4" />
        <p className="text-text-secondary">Initializing...</p>
      </div>
    </div>
  )
}