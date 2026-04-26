// File: apps/api/src/modules/votes/index.ts

import Elysia, { t } from 'elysia'
import { db } from '@/db'
import { votes, users, gameRounds } from '@/db/schema'
import { eq, and } from 'drizzle-orm'

export const voteRoutes = new Elysia({ prefix: '/api/votes' })
  // Submit vote
  .post(
    '/',
    async ({ body, jwt, set }) => {
      // Verify JWT
      const payload = await jwt.verify(body.token)
      if (!payload) {
        set.status = 401
        return { error: 'Unauthorized' }
      }

      const { candidateId, starsSpent } = body

      // Get user VP
      const user = await db.query.users.findFirst({
        where: eq(users.telegramId, (payload as any).telegramId),
      })

      if (!user) {
        set.status = 404
        return { error: 'User not found' }
      }

      // Get current round
      const currentRound = await db.query.gameRounds.findFirst({
        where: eq(gameRounds.dayPhase, 'voting'),
      })

      if (!currentRound) {
        set.status = 400
        return { error: 'No voting phase active' }
      }

      // Check if user already voted in this round
      const existingVote = await db.query.votes.findFirst({
        where: and(
          eq(votes.userId, user.id),
          eq(votes.roundId, currentRound.id)
        ),
      })

      if (existingVote) {
        set.status = 400
        return { error: 'Already voted in this round' }
      }

      // Insert vote
      const newVote = await db.insert(votes).values({
        userId: user.id,
        roundId: currentRound.id,
        candidateId,
        starsSpent,
        vpAtTime: user.vpScore,
      })

      return { success: true, vote: newVote }
    },
    {
      body: t.Object({
        token: t.String(),
        candidateId: t.String(),
        starsSpent: t.Number(),
      }),
    }
  )

  // Get vote stats
  .get('/stats/:roundId', async ({ params }) => {
    const roundVotes = await db.query.votes.findMany({
      where: eq(votes.roundId, params.roundId),
    })

    const stats = roundVotes.reduce(
      (acc, vote) => {
        acc[vote.candidateId] = (acc[vote.candidateId] || 0) + vote.starsSpent
        return acc
      },
      {} as Record<string, number>
    )

    return {
      roundId: params.roundId,
      voteStats: stats,
      totalVotes: roundVotes.length,
      totalStars: roundVotes.reduce((sum, v) => sum + v.starsSpent, 0),
    }
  })