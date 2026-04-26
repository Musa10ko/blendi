// File: apps/api/src/modules/auth/index.ts

import Elysia, { t } from 'elysia'
import { validateTelegramInitData } from '@/utils/telegram'
import { db } from '@/db'
import { users } from '@/db/schema'
import { eq } from 'drizzle-orm'

export const authRoutes = new Elysia({ prefix: '/api/auth' })
  .post(
    '/login',
    async ({ body, jwt }) => {
      const { initData } = body

      // Validate Telegram init data
      const user = validateTelegramInitData(initData, process.env.BOT_TOKEN!)
      if (!user) {
        throw new Error('Invalid init data')
      }

      // Check if user exists
      let dbUser = await db.query.users.findFirst({
        where: eq(users.telegramId, user.id),
      })

      // Create if new
      if (!dbUser) {
        await db.insert(users).values({
          telegramId: user.id,
          username: user.username || `user_${user.id}`,
          firstName: user.first_name,
          lastName: user.last_name,
          photoUrl: user.photo_url,
          isPremium: user.is_premium || false,
          vpScore: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        })

        dbUser = await db.query.users.findFirst({
          where: eq(users.telegramId, user.id),
        })
      }

      // Generate JWT
      const token = await jwt.sign({
        telegramId: user.id,
        userId: dbUser!.id,
        username: user.username,
      })

      return {
        success: true,
        token,
        user: {
          id: dbUser!.id,
          telegramId: user.id,
          username: user.username,
          firstName: user.first_name,
          isPremium: user.is_premium,
        },
      }
    },
    {
      body: t.Object({
        initData: t.String(),
      }),
    }
  )