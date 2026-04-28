// apps/api/src/modules/portfolio/routes.ts

import Elysia from 'elysia'
import { portfolioService } from './service'

export const portfolioRoutes = new Elysia({ prefix: '/portfolio' })
  .get('/nfts', async ({ headers }) => {
    const userId = headers['x-user-id'] as string
    if (!userId) throw new Error('Unauthorized')

    const nfts = await portfolioService.getUserNFTs(userId)
    return {
      success: true,
      data: nfts,
    }
  })
  .post('/sync', async ({ headers, body }) => {
    const userId = headers['x-user-id'] as string
    const { walletAddress } = body as { walletAddress: string }

    if (!userId || !walletAddress) throw new Error('Invalid request')

    await portfolioService.syncUserNFTs(userId, walletAddress)

    return {
      success: true,
      message: 'Portfolio synced',
    }
  })