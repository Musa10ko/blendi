// File: apps/api/src/services/marketplace.ts

import { ENV } from '@/config/env'
import type { NFT } from '@blender/types'

interface NFTMetadata {
  name: string
  description?: string
  imageUrl: string
  attributes?: Array<{ trait_type: string; value: string }>
}

interface TonAPIResponse {
  nft_items: Array<{
    address: string
    index: number
    collection_address: string
    owner?: { address: string }
    content?: {
      name?: string
      description?: string
      image?: string
      metadata?: string
    }
  }>
}

interface GetGemsListing {
  address: string
  price: number
  seller: string
  listedAt: number
}

export class MarketplaceService {
  private tonApiClient: any
  private cache = new Map<string, { data: any; expires: number }>()

  constructor() {
    // Init TonAPI client
    this.tonApiClient = {
      getAddress: (addr: string) =>
        fetch(
          `${ENV.TONAPI_BASE_URL}/accounts/${addr}?supported_interfaces=nft_item`,
          {
            headers: { Authorization: `Bearer ${ENV.TONAPI_KEY}` },
          }
        ),
    }
  }

  /**
   * Get user NFT portfolio from TON
   * Flow: Wallet → TonAPI NFT items → GetGems prices → Cache
   */
  async getUserNFTs(walletAddress: string): Promise<{
    listed: NFT[]
    unlisted: NFT[]
  }> {
    const cacheKey = `portfolio:${walletAddress}`
    const cached = this.getFromCache(cacheKey)
    if (cached) return cached

    try {
      // 1. Fetch from TonAPI
      const nftItems = await this.fetchNFTsFromTonAPI(walletAddress)

      // 2. Enrich with GetGems prices
      const enriched = await Promise.all(
        nftItems.map((item) => this.enrichNFTWithPrice(item))
      )

      // 3. Partition by listing status
      const listed = enriched.filter((nft) => nft.isListed)
      const unlisted = enriched.filter((nft) => !nft.isListed)

      // 4. Cache result
      const result = { listed, unlisted }
      this.setCache(cacheKey, result, ENV.CACHE_TTL_PORTFOLIO)

      return result
    } catch (error) {
      console.error('Failed to fetch user NFTs:', error)
      return { listed: [], unlisted: [] }
    }
  }

  /**
   * Fetch NFT items from TonAPI
   */
  private async fetchNFTsFromTonAPI(
    walletAddress: string
  ): Promise<NFTMetadata[]> {
    const url = `${ENV.TONAPI_BASE_URL}/accounts/${walletAddress}/nfts`

    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${ENV.TONAPI_KEY}` },
    })

    if (!response.ok) throw new Error('TonAPI fetch failed')

    const data = (await response.json()) as TonAPIResponse

    return data.nft_items.map((item) => ({
      address: item.address,
      name: item.content?.name || 'Unknown NFT',
      imageUrl: this.resolveImage(item.content?.image),
      description: item.content?.description,
      attributes: [],
    }))
  }

  /**
   * Enrich NFT with GetGems listing data
   */
  private async enrichNFTWithPrice(
    metadata: NFTMetadata
  ): Promise<NFT> {
    try {
      // Query GetGems for listing
      const listing = await this.fetchGetGemsListing(metadata.address)

      return {
        id: metadata.address,
        tokenId: parseInt(metadata.address.split(':')[1] || '0'),
        name: metadata.name,
        imageUrl: metadata.imageUrl,
        collection: 'Telegram Gifts',
        owner: listing?.seller || 'unknown',
        isListed: !!listing,
        floorPrice: listing?.price || 0,
      }
    } catch (error) {
      console.error(`Failed to enrich NFT ${metadata.address}:`, error)
      return {
        id: metadata.address,
        tokenId: 0,
        name: metadata.name,
        imageUrl: metadata.imageUrl,
        collection: 'Telegram Gifts',
        owner: 'unknown',
        isListed: false,
        floorPrice: 0,
      }
    }
  }

  /**
   * Fetch listing from GetGems
   */
  private async fetchGetGemsListing(
    nftAddress: string
  ): Promise<GetGemsListing | null> {
    try {
      const cacheKey = `listing:${nftAddress}`
      const cached = this.getFromCache(cacheKey)
      if (cached) return cached

      const response = await fetch(
        `${ENV.GETGEMS_API_URL}/v1/nfts/${nftAddress}/listings`
      )

      if (!response.ok) return null

      const data = await response.json()
      const listing = data.listings?.[0]

      if (listing) {
        this.setCache(cacheKey, listing, ENV.CACHE_TTL_PRICES)
      }

      return listing || null
    } catch (error) {
      console.error(`GetGems fetch failed for ${nftAddress}:`, error)
      return null
    }
  }

  /**
   * Get collection floor price
   */
  async getCollectionFloorPrice(collectionAddress: string): Promise<number> {
    const cacheKey = `floor:${collectionAddress}`
    const cached = this.getFromCache(cacheKey)
    if (cached) return cached

    try {
      const response = await fetch(
        `${ENV.GETGEMS_API_URL}/v1/collections/${collectionAddress}/floor`
      )

      if (!response.ok) return 0

      const { floor_price } = await response.json()
      this.setCache(cacheKey, floor_price, ENV.CACHE_TTL_PRICES)

      return floor_price
    } catch (error) {
      console.error('Failed to fetch floor price:', error)
      return 0
    }
  }

  /**
   * Resolve image URL (handle IPFS, data URIs, etc)
   */
  private resolveImage(imageUrl?: string): string {
    if (!imageUrl) return '/placeholder.png'

    // Handle IPFS
    if (imageUrl.startsWith('ipfs://')) {
      return `https://ipfs.io/ipfs/${imageUrl.slice(7)}`
    }

    // Handle direct URLs
    if (imageUrl.startsWith('http')) {
      return imageUrl
    }

    // Handle data URIs
    if (imageUrl.startsWith('data:')) {
      return imageUrl
    }

    return '/placeholder.png'
  }

  /**
   * Cache helpers
   */
  private getFromCache<T>(key: string): T | null {
    const item = this.cache.get(key)
    if (!item) return null
    if (item.expires < Date.now()) {
      this.cache.delete(key)
      return null
    }
    return item.data
  }

  private setCache(key: string, data: any, ttl: number): void {
    this.cache.set(key, {
      data,
      expires: Date.now() + ttl * 1000,
    })
  }
}

export const marketplaceService = new MarketplaceService()
