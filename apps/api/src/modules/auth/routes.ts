// apps/api/src/modules/auth/routes.ts
import Elysia, { t } from 'elysia'
import { validateTelegramInitData } from '@/services/telegram'

export const authRoutes = new Elysia({ prefix: '/auth' })
  .post('/login', async ({ body }) => {
    const { initData } = body
    const user = await validateTelegramInitData(initData)
    const token = jwt.sign({ userId: user.id })
    return { token, user }
  }, {
    body: t.Object({ initData: t.String() })
  })
  .get('/me', async ({ cookie: { auth } }) => {
    // Verify token & return user
    return { user: { id: 1, username: 'user' } }
  })