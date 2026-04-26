// hooks/useTelegramUser.ts
import { useEffect, useState } from 'react'

interface TelegramUser {
  id: number
  first_name: string
  last_name?: string
  username?: string
  language_code?: string
  is_premium?: boolean
  photo_url?: string
}

export function useTelegramUser() {
  const [user, setUser] = useState<TelegramUser | null>(null)
  const [initData, setInitData] = useState<string>('')

  useEffect(() => {
    const tg = (window as any).Telegram?.WebApp
    if (!tg) return

    // Захопити init data
    const data = tg.initData
    const userData = tg.initDataUnsafe?.user

    if (userData) {
      setUser(userData)
      setInitData(data)
    } else {
      console.warn('Telegram user data not available')
    }
  }, [])

  return { user, initData, isLoaded: !!user }
}