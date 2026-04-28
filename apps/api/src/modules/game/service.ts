// apps/api/src/modules/game/service.ts

import { db } from '@/db/client'
import { gameRounds, modelCandidates, nfts } from '@/db/schema'
import { eq, desc } from 'drizzle-orm'
import { GAME_CONFIG } from '@repo/shared'
import type { GameRound, ModelCandidate } from '@repo/shared'

export class GameService {
  async getCurrentRound(): Promise<GameRound | null> {
    const round = await db
      .select()
      .from(gameRounds)
      .where(eq(gameRounds.status, 'clues'))
      .orderBy(desc(gameRounds.createdAt))
      .limit(1)

    if (!round.length) return null

    return await this.mapRoundWithCandidates(round[0])
  }

  async getCandidates(roundId: string): Promise<ModelCandidate[]> {
    const candidates = await db
      .select()
      .from(modelCandidates)
      .where(eq(modelCandidates.roundId, roundId))

    const result = []
    for (const candidate of candidates) {
      const nft = await db
        .select()
        .from(nfts)
        .where(eq(nfts.id, candidate.nftId))
        .limit(1)

      result.push({
        id: candidate.id,
        roundId: candidate.roundId,
        nft: nft[0],
        attributes: nft[0]?.attributes || [],
        votes: candidate.votes,
        voteValue: parseFloat(candidate.voteValue.toString()),
        imageBlur: candidate.imageBlur,
        revealedDays: candidate.revealedDays as number[],
      })
    }

    return result
  }

  async initializeWeek(): Promise<GameRound> {
    const weekNumber = await this.getNextWeekNumber()
    const now = new Date()
    const startDate = new Date(now.setHours(0, 0, 0, 0))
    const endDate = new Date(startDate.getTime() + GAME_CONFIG.ROUND_DURATION_DAYS * 24 * 60 * 60 * 1000)

    const newRound = await db
      .insert(gameRounds)
      .values({
        weekNumber,
        startDate,
        endDate,
        status: 'clues',
      })
      .returning()

    return await this.mapRoundWithCandidates(newRound[0])
  }

  async revealClueForDay(roundId: string, day: number): Promise<void> {
    // Update image blur based on day
    const blurLevels = [100, 75, 50, 25, 0]
    const blur = blurLevels[Math.min(day - 1, 4)]

    await db
      .update(modelCandidates)
      .set({
        imageBlur: blur,
        revealedDays: await this.appendRevealedDay(roundId, day),
      })
      .where(eq(modelCandidates.roundId, roundId))
  }

  async startVoting(roundId: string): Promise<void> {
    const now = new Date()
    const votingEnd = new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000) // 2 days

    await db
      .update(gameRounds)
      .set({
        status: 'voting',
        votingStartDate: now,
        votingEndDate: votingEnd,
      })
      .where(eq(gameRounds.id, roundId))
  }

  async endRound(roundId: string): Promise<void> {
    await db
      .update(gameRounds)
      .set({ status: 'ended' })
      .where(eq(gameRounds.id, roundId))
  }

  private async mapRoundWithCandidates(round: any): Promise<GameRound> {
    const candidates = await this.getCandidates(round.id)

    return {
      id: round.id,
      weekNumber: round.weekNumber,
      startDate: round.startDate,
      endDate: round.endDate,
      status: round.status,
      candidates,
      prizePool: parseFloat(round.prizePool?.toString() || '0'),
    }
  }

  private async getNextWeekNumber(): Promise<number> {
    const lastRound = await db
      .select()
      .from(gameRounds)
      .orderBy(desc(gameRounds.weekNumber))
      .limit(1)

    return (lastRound[0]?.weekNumber || 0) + 1
  }

  private async appendRevealedDay(roundId: string, day: number): Promise<number[]> {
    const rounds = await db
      .select()
      .from(modelCandidates)
      .where(eq(modelCandidates.roundId, roundId))
      .limit(1)

    const revealed = (rounds[0]?.revealedDays || []) as number[]
    if (!revealed.includes(day)) {
      revealed.push(day)
    }

    return revealed.sort((a, b) => a - b)
  }
}

export const gameService = new GameService()