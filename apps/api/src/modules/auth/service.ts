// apps/api/src/modules/auth/service.ts

import { db } from '@/db/client'
import { users } from '@/db/schema'
import { eq } from 'drizzle-orm'
import type { BlenderUser, TelegramUser } from '@repo/shared'

export class AuthService {
  async findOrCreateUser(telegramUser: TelegramUser): Promise<BlenderUser> {
    const existing = await db
      .select()
      .from(users)
      .where(eq(users.telegramId, telegramUser.id))
      .limit(1)

    if (existing.length > 0) {
      return this.mapToBlenderUser(existing[0])
    }

    const newUser = await db
      .insert(users)
      .values({
        telegramId: telegramUser.id,
        username: telegramUser.username || `user_${telegramUser.id}`,
        firstName: telegramUser.first_name,
        lastName: telegramUser.last_name,
        avatar: telegramUser.photo_url,
      })
      .returning()

    return this.mapToBlenderUser(newUser[0])
  }

  async getUserById(userId: string): Promise<BlenderUser | null> {
    const user = await db
      .select()
      .from(users)
      .where(eq(users.id, userId))
      .limit(1)

    return user.length > 0 ? this.mapToBlenderUser(user[0]) : null
  }

  private mapToBlenderUser(user: any): BlenderUser {
    return {
      id: user.id,
      telegramId: user.telegramId,
      username: user.username,
      avatar: user.avatar,
      walletAddress: user.walletAddress,
      vp: user.vp,
      stars: user.stars,
      rank: user.rank,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }
  }
}

export const authService = new AuthService()