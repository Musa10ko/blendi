// apps/api/src/services/marketplace.ts

export interface MarketplaceNFT {
  marketplaceId: string
  collectionId: string
  name: string
  image: string
  floorPrice: number
  listed: boolean
}

export class MarketplaceAdapter {
  private baseUrl = process.env.MARKETPLACE_API_URL || 'https://api.getgems.io/v1'

  async getNFTsByWallet(walletAddress: string): Promise<MarketplaceNFT[]> {
    try {
      const response = await fetch(
        `${this.baseUrl}/nft/by-owner?owner=${walletAddress}&limit=100`
      )

      if (!response.ok) return []

      const data = await response.json()

      return data.nft_items.map((item: any) => ({
        marketplaceId: item.address,
        collectionId: item.collection?.address || 'unknown',
        name: item.metadata?.name || 'Unknown NFT',
        image: item.metadata?.image || '',
        floorPrice: parseFloat(item.sale?.price || '0') / 1e9, // Convert from nanotons
        listed: !!item.sale,
      }))
    } catch (error) {
      console.error('Marketplace fetch error:', error)
      return []
    }
  }

  async getNFTFloor(collectionId: string): Promise<number | null> {
    try {
      const response = await fetch(`${this.baseUrl}/collection/${collectionId}/stats`)
      if (!response.ok) return null

      const data = await response.json()
      return parseFloat(data.floor_price || '0') / 1e9
    } catch (error) {
      console.error('Floor price fetch error:', error)
      return null
    }
  }
}

export const marketplaceService = new MarketplaceAdapter()