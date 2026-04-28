// apps/api/src/services/telegram.ts

import crypto from 'crypto'
import type { TelegramUser } from '@repo/shared'

export async function validateTelegramInitData(initData: string): Promise<TelegramUser | null> {
  try {
    const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN!
    const secretKey = crypto.createHmac('sha256', 'WebAppData').update(BOT_TOKEN).digest()

    const params = new URLSearchParams(initData)
    const signature = params.get('hash')
    params.delete('hash')

    const dataCheckString = Array.from(params.entries())
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map(([k, v]) => `${k}=${v}`)
      .join('\n')

    const computedSignature = crypto
      .createHmac('sha256', secretKey)
      .update(dataCheckString)
      .digest('hex')

    if (computedSignature !== signature) {
      console.error('Invalid signature')
      return null
    }

    const userStr = params.get('user')
    if (!userStr) return null

    const user = JSON.parse(decodeURIComponent(userStr))
    return {
      id: user.id,
      username: user.username || '',
      first_name: user.first_name,
      last_name: user.last_name,
      photo_url: user.photo_url,
      is_premium: user.is_premium,
      language_code: user.language_code,
    }
  } catch (error) {
    console.error('Telegram validation error:', error)
    return null
  }
}