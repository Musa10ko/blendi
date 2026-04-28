// packages/shared/src/utils/index.ts

export function formatNumber(num: number): string {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
  return num.toString()
}

export function shortenAddress(address: string, chars = 4): string {
  return `${address.slice(0, chars)}...${address.slice(-chars)}`
}

export function calculateVPMultiplier(vp: number): number {
  if (vp < 10) return 1.0
  if (vp < 50) return 1.1
  if (vp < 100) return 1.2
  if (vp < 500) return 1.35
  return 1.5
}

export function calculateVoteWeight(stars: number, vp: number): number {
  const vpMultiplier = calculateVPMultiplier(vp)
  return stars * vpMultiplier
}

export function validateTelegramInitData(initData: string): boolean {
  // Implement Telegram validation
  return true
}

export function getClueRevealLevel(day: number): { blur: number; description: string } {
  const levels = [
    { blur: 100, description: 'Fully blurred - 4 colors, 4 patterns' },
    { blur: 75, description: 'Heavy blur - 3 options visible' },
    { blur: 50, description: 'Medium blur - 2 options' },
    { blur: 25, description: 'Light blur - almost revealed' },
    { blur: 0, description: 'Fully revealed' },
  ]
  return levels[Math.min(day - 1, 4)]
}