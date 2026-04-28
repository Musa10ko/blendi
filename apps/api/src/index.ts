// apps/api/src/index.ts

import Elysia, { t } from 'elysia'
import cors from '@elysiajs/cors'
import jwt from '@elysiajs/jwt'
import { authRoutes } from './modules/auth'
import { gameRoutes } from './modules/game'
import { voteRoutes } from './modules/votes'
import { portfolioRoutes } from './modules/portfolio'

const app = new Elysia()
  .use(cors())
  .use(
    jwt({
      name: 'jwt',
      secret: process.env.JWT_SECRET || 'your-secret-key',
    })
  )
  // Health check
  .get('/health', () => ({
    status: 'ok',
    timestamp: new Date().toISOString(),
  }))

  // Routes
  .use(authRoutes)
  .use(gameRoutes)
  .use(voteRoutes)
  .use(portfolioRoutes)

  // Error handling
  .error(
    {
      UnauthorizedError: t.String(),
      ValidationError: t.String(),
    },
    ({ code, error }) => {
      if (code === 'VALIDATION') {
        return new Response('Validation error', { status: 400 })
      }
      if (code === 'UnauthorizedError') {
        return new Response('Unauthorized', { status: 401 })
      }
      return new Response('Internal server error', { status: 500 })
    }
  )

  .listen({
    port: process.env.PORT || 3001,
    hostname: '0.0.0.0',
  })

console.log(`🚀 Blender API running on http://localhost:${process.env.PORT || 3001}`)