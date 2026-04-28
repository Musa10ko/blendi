// apps/api/src/modules/game/routes.ts

import Elysia from 'elysia'
import { gameService } from './service'

export const gameRoutes = new Elysia({ prefix: '/game' })
  .get('/round/current', async () => {
    const round = await gameService.getCurrentRound()
    return {
      success: true,
      data: round,
    }
  })
  .get('/candidates', async ({ query }) => {
    const { roundId } = query as { roundId: string }
    const candidates = await gameService.getCandidates(roundId)
    return {
      success: true,
      data: candidates,
    }
  })