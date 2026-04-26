// File: apps/api/src/services/vrf.ts

import crypto from 'crypto'

interface VRFResult {
  randomValue: Buffer
  proof: string
}

export class VRFService {
  /**
   * Deterministic random selection for each week
   * Using block hash + week number for verifiability
   */
  selectCandidates(
    allNFTs: string[],
    weekNumber: number,
    blockHash?: string
  ): string[] {
    if (allNFTs.length === 0) return []

    // Use block hash or fallback to week-based seed
    const seed = blockHash || `week-${weekNumber}`
    const hash = crypto.createHash('sha256').update(seed).digest()

    // Select 3-5 NFTs deterministically
    const candidates: string[] = []
    const count = Math.min(5, Math.max(3, Math.floor(allNFTs.length / 10)))

    for (let i = 0; i < count; i++) {
      const index = (hash[i] + i * 10) % allNFTs.length
      if (!candidates.includes(allNFTs[index])) {
        candidates.push(allNFTs[index])
      }
    }

    return candidates
  }

  /**
   * Generate verifiable random value
   */
  generateVRF(seed: string): VRFResult {
    const randomValue = crypto
      .createHmac('sha256', process.env.VRF_SECRET || 'dev-secret')
      .update(seed)
      .digest()

    const proof = crypto
      .createHash('sha256')
      .update(randomValue)
      .digest('hex')

    return { randomValue, proof }
  }
}