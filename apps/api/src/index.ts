// File: apps/api/src/index.ts

import Elysia, { t } from 'elysia'
import cors from '@elysiajs/cors'
import jwt from '@elysiajs/jwt'
import { TonClient4 } from '@ton/ton'
import { TonAPI } from '@tonapi/tonapi-sdk'
import { authRoutes } from './modules/auth'
import { gameRoutes } from './modules/game'
import { voteRoutes } from './modules/votes'
import { portfolioRoutes } from './modules/portfolio'
import { marketplaceService } from './services/marketplace'

const app = new Elysia()
  .use(cors())
  .use(
    jwt({
      name: 'jwt',
      secret: process.env.JWT_SECRET!,
    })
  )
  // Health check
  .get('/health', () => ({ status: 'ok', timestamp: new Date() }))

  // Routes
  .use(authRoutes)
  .use(gameRoutes)
  .use(voteRoutes)
  .use(portfolioRoutes)

  // Error handling
  .error(
    { UnauthorizedError: t.String() },
    ({ code, error }) => {
      if (code === 'VALIDATION')
        return new Response('Validation error', { status: 400 })
      return new Response('Unauthorized', { status: 401 })
    }
  )

  .listen(3001)

console.log('🚀 Blender API running on http://localhost:3001')