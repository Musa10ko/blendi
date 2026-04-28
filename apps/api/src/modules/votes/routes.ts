// apps/api/src/modules/votes/routes.ts

import Elysia, { t } from 'elysia'
import { votingService } from './service'

export const voteRoutes = new Elysia({ prefix: '/votes' })
  .post(
    '/cast',
    async ({ body, headers }) => {
      const { candidateId, roundId, starsSpent } = body
      const userId = headers['x-user-id'] as string

      if (!userId) throw new Error('Unauthorized')

      await votingService.castVote(userId, candidateId, roundId, starsSpent)

      return {
        success: true,
        message: 'Vote cast successfully',
      }
    },
    {
      body: t.Object({
        candidateId: t.String(),
        roundId: t.String(),
        starsSpent: t.Number(),
      }),
    }
  )
  .get('/stats', async ({ query }) => {
    const { roundId } = query as { roundId: string }
    const stats = await votingService.getVoteStats(roundId)

    return {
      success: true,
      data: stats,
    }
  })