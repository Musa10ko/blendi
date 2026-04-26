// File: apps/mini-app/app/api/game/current-round/route.ts

import type { GameRound } from '@blender/types'

export async function GET() {
  const mockRound: GameRound = {
    id: 'round-1',
    weekNumber: 1,
    dayPhase: 'speculation',
    candidates: [
      {
        id: 'nft-1',
        tokenId: 222,
        name: 'Toy Bear',
        imageUrl: '/mock-nft-1.jpg',
        collection: 'Telegram Gifts',
        votes: 1240,
      },
      {
        id: 'nft-2',
        tokenId: 456,
        name: 'Golden Fish',
        imageUrl: '/mock-nft-2.jpg',
        collection: 'Telegram Gifts',
        votes: 856,
      },
      {
        id: 'nft-3',
        tokenId: 789,
        name: 'Mystic Dragon',
        imageUrl: '/mock-nft-3.jpg',
        collection: 'Telegram Gifts',
        votes: 623,
      },
    ],
    clueRevealLevel: 2,
    voteStats: { 'nft-1': 1240, 'nft-2': 856, 'nft-3': 623 },
    totalVotes: 2719,
    startsAt: new Date(),
    endsAt: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
  }

  return Response.json(mockRound)
}