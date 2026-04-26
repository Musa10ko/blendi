// File: apps/api/src/utils/telegram.ts

import crypto from 'crypto'

interface TelegramInitDataUser {
  id: number
  is_bot: boolean
  first_name: string
  last_name?: string
  username?: string
  language_code?: string
  is_premium?: boolean
  photo_url?: string
}

export function validateTelegramInitData(
  initData: string,
  botToken: string
): TelegramInitDataUser | null {
  try {
    const params = new URLSearchParams(initData)

    // Get hash
    const hash = params.get('hash')
    if (!hash) return null

    // Remove hash from params
    params.delete('hash')

    // Sort and build data check string
    const dataCheckString = Array.from(params.entries())
      .sort()
      .map(([key, value]) => `${key}=${value}`)
      .join('\n')

    // Verify signature
    const secretKey = crypto.createHmac('sha256', 'WebAppData').update(botToken).digest()
    const signature = crypto
      .createHmac('sha256', secretKey)
      .update(dataCheckString)
      .digest('hex')

    if (signature !== hash) {
      return null
    }

    // Parse user
    const userJson = params.get('user')
    if (!userJson) return null

    return JSON.parse(userJson) as TelegramInitDataUser
  } catch (error) {
    console.error('Telegram validation error:', error)
    return null
  }
}