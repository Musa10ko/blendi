// apps/api/src/services/marketplace.ts
export class MarketplaceAdapter {
  async getNFTs(walletAddress: string) {
    // Fetch NFTs від маркетплейсу
    // return { nfts: [...], floor: 100, volume: 50000 }
  }

  async checkNFTStatus(nftId: string) {
    // Check if NFT is listed
    // return { status: 'listed' | 'not_listed' | 'inactive' }
  }

  async getFloor() {
    // Get floor price
  }
}

export const marketplaceService = new MarketplaceAdapter()