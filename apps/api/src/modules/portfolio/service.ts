// apps/api/src/modules/portfolio/service.ts

import { db } from '@/db/client'
import { userNFT, nfts } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { marketplaceService } from '@/services/marketplace'

export class PortfolioService {
  async syncUserNFTs(userId: string, walletAddress: string): Promise<void> {
    // Fetch NFTs from marketplace
    const marketplaceNFTs = await marketplaceService.getNFTsByWallet(walletAddress)

    for (const nft of marketplaceNFTs) {
      // Find or create NFT
      const existing = await db
        .select()
        .from(nfts)
        .where(eq(nfts.marketplaceId, nft.marketplaceId))
        .limit(1)

      let nftId = existing[0]?.id

      if (!existing.length) {
        const created = await db
          .insert(nfts)
          .values({
            collectionId: nft.collectionId,
            marketplaceId: nft.marketplaceId,
            name: nft.name,
            image: nft.image,
            floorPrice: nft.floorPrice.toString(),
          })
          .returning()

        nftId = created[0].id
      }

      // Link to user
      const userNFTExisting = await db
        .select()
        .from(userNFT)
        .where(eq(userNFT.nftId, nftId))
        .limit(1)

      if (!userNFTExisting.length) {
        await db.insert(userNFT).values({
          userId,
          nftId,
          status: nft.listed ? 'listed' : 'not_listed',
        })
      }
    }
  }

  async getUserNFTs(userId: string): Promise<any[]> {
    const userNFTs = await db
      .select()
      .from(userNFT)
      .where(eq(userNFT.userId, userId))

    const result = []
    for (const unft of userNFTs) {
      const nft = await db
        .select()
        .from(nfts)
        .where(eq(nfts.id, unft.nftId))
        .limit(1)

      result.push({
        ...unft,
        nft: nft[0],
      })
    }

    return result
  }
}

export const portfolioService = new PortfolioService()