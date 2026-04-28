// apps/api/src/modules/auth/routes.ts

import Elysia, { t } from 'elysia'
import jwt from '@elysiajs/jwt'
import { validateTelegramInitData } from '@/services/telegram'
import { authService } from './service'

export const authRoutes = new Elysia({ prefix: '/auth' })
  .post(
    '/login',
    async ({ body, jwt: jwtPlugin }) => {
      const { initData } = body
      
      // Validate Telegram init data
      const telegramUser = await validateTelegramInitData(initData)
      if (!telegramUser) {
        throw new Error('Invalid init data')
      }

      // Find or create user
      const user = await authService.findOrCreateUser(telegramUser)

      // Generate JWT token
      const token = await jwtPlugin.sign({
        userId: user.id,
        telegramId: user.telegramId,
        exp: Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60, // 7 days
      })

      return {
        success: true,
        data: {
          token,
          user,
        },
      }
    },
    {
      body: t.Object({
        initData: t.String(),
      }),
    }
  )
  .get('/me', async ({ headers, jwt: jwtPlugin }) => {
    const auth = headers.authorization?.replace('Bearer ', '')
    if (!auth) {
      throw new Error('Unauthorized')
    }

    const payload = await jwtPlugin.verify(auth)
    if (!payload) {
      throw new Error('Invalid token')
    }

    const user = await authService.getUserById(payload.userId)
    if (!user) {
      throw new Error('User not found')
    }

    return {
      success: true,
      data: { user },
    }
  })