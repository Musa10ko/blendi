'use client'

import { createContext, useContext, useEffect, useState } from 'react'

export const TelegramContext = createContext<any>(null)

export function TelegramProvider({ children }: { children: React.ReactNode }) {
  const [webApp, setWebApp] = useState<any>(null)

  useEffect(() => {
    // Перевіряємо, чи ми в браузері і чи доступний об'єкт Telegram
    const tg = (window as any).Telegram?.WebApp
    if (tg) {
      tg.ready()
      setWebApp(tg)
    }
  }, [])

  return (
    <TelegramContext.Provider value={webApp}>
      {children}
    </TelegramContext.Provider>
  )
}

export const useTelegram = () => useContext(TelegramContext)