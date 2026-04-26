// File: apps/api/src/modules/portfolio/index.ts

import Elysia from 'elysia'
import { db } from '@/db'
import { users, nftPortfolio } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { marketplaceService } from '@/services/marketplace'

export const portfolioRoutes = new Elysia({
  prefix: '/api/user',
})
  // Get user profile with portfolio
  .get('/profile/:telegramId', async ({ params }) => {
    const user = await db.query.users.findFirst({
      where: eq(users.telegramId, parseInt(params.telegramId)),
      with: {
        portfolio: true,
      },
    })

    if (!user) {
      return { error: 'User not found' }
    }

    return {
      user: {
        id: user.id,
        telegramId: user.telegramId,
        username: user.username,
        firstName: user.firstName,
        isPremium: user.isPremium,
      },
      vpScore: user.vpScore,
      portfolio: user.portfolio,
    }
  })

  // Sync portfolio from marketplace
  .post('/portfolio/sync/:telegramId', async ({ params }) => {
    const user = await db.query.users.findFirst({
      where: eq(users.telegramId, parseInt(params.telegramId)),
    })

    if (!user) {
      return { error: 'User not found' }
    }

    if (!user.walletAddress) {
      return { error: 'Wallet address not set' }
    }

    // Fetch real NFTs
    const { listed, unlisted } = await marketplaceService.getUserNFTs(
      user.walletAddress
    )

    // Clear old portfolio
    await db
      .delete(nftPortfolio)
      .where(eq(nftPortfolio.userId, user.id))

    // Insert new portfolio
    await db.insert(nftPortfolio).values(
      [...listed, ...unlisted].map((nft) => ({
        userId: user.id,
        nftAddress: nft.id,
        name: nft.name,
        imageUrl: nft.imageUrl,
        isListed: nft.isListed,
        floorPrice: nft.floorPrice.toString(),
      }))
    )

    return {
      success: true,
      listed: listed.map((n) => ({
        ...n,
        floorPrice: typeof n.floorPrice === 'string' ? parseFloat(n.floorPrice) : n.floorPrice,
      })),
      unlisted: unlisted.map((n) => ({
        ...n,
        floorPrice: typeof n.floorPrice === 'string' ? parseFloat(n.floorPrice) : n.floorPrice,
      })),
    }
  })