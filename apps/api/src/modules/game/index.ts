// File: apps/api/src/modules/game/index.ts

import Elysia, { t } from 'elysia'
import { db } from '@/db'
import { gameRounds } from '@/db/schema'
import { eq, desc } from 'drizzle-orm'
import { VRFService } from '@/services/vrf'

const vrfService = new VRFService()

export const gameRoutes = new Elysia({ prefix: '/api/game' })
  // Get current round
  .get('/current-round', async () => {
    const currentRound = await db.query.gameRounds.findFirst({
      orderBy: desc(gameRounds.weekNumber),
    })

    if (!currentRound) {
      return { error: 'No active round' }
    }

    // Simulate candidates (in production, use VRF + selected NFTs)
    const candidates = [
      {
        id: 'ton-gift-1',
        tokenId: 222,
        name: 'Toy Bear',
        imageUrl: '/mock-nft-1.jpg',
        collection: 'Telegram Gifts',
        votes: Math.floor(Math.random() * 2000),
      },
      {
        id: 'ton-gift-2',
        tokenId: 456,
        name: 'Golden Fish',
        imageUrl: '/mock-nft-2.jpg',
        collection: 'Telegram Gifts',
        votes: Math.floor(Math.random() * 2000),
      },
      {
        id: 'ton-gift-3',
        tokenId: 789,
        name: 'Mystic Dragon',
        imageUrl: '/mock-nft-3.jpg',
        collection: 'Telegram Gifts',
        votes: Math.floor(Math.random() * 2000),
      },
    ]

    return {
      id: currentRound.id,
      weekNumber: currentRound.weekNumber,
      dayPhase: currentRound.dayPhase,
      candidates,
      clueRevealLevel: currentRound.clueRevealLevel,
      voteStats: candidates.reduce(
        (acc, c) => ({ ...acc, [c.id]: c.votes }),
        {}
      ),
      totalVotes: candidates.reduce((sum, c) => sum + c.votes, 0),
      startsAt: currentRound.startsAt.toISOString(),
      endsAt: currentRound.endsAt.toISOString(),
    }
  })

  // Get clue for specific day
  .get('/clue/:day', async ({ params }) => {
    const day = parseInt(params.day)
    const blurLevels = [
      'blur(32px)',
      'blur(24px)',
      'blur(16px)',
      'blur(8px)',
      'blur(2px)',
      'blur(0px)',
    ]

    return {
      day,
      blurLevel: blurLevels[Math.min(day, 5)] || 'blur(0px)',
      colorsVisible: Math.max(1, 4 - day),
      patternsVisible: Math.max(1, 4 - day),
    }
  })

  // Start new round (admin)
  .post(
    '/rounds/create',
    async ({ body }) => {
      const { weekNumber } = body

      const round = await db.insert(gameRounds).values({
        weekNumber,
        dayPhase: 'speculation',
        clueRevealLevel: 0,
        selectedCandidates: [
          'ton-gift-1',
          'ton-gift-2',
          'ton-gift-3',
        ],
        startsAt: new Date(),
        endsAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      })

      return { success: true, round }
    },
    {
      body: t.Object({
        weekNumber: t.Number(),
      }),
    }
  )