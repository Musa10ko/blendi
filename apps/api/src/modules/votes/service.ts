// apps/api/src/modules/votes/service.ts

import { db } from '@/db/client'
import { votes, modelCandidates, gameRounds, users } from '@/db/schema'
import { eq, and, desc } from 'drizzle-orm'
import { calculateVoteWeight, STAR_COSTS } from '@repo/shared'

export class VotingService {
  async castVote(
    userId: string,
    candidateId: string,
    roundId: string,
    starsSpent: number
  ): Promise<void> {
    // Get user VP
    const user = await db.select().from(users).where(eq(users.id, userId)).limit(1)
    if (!user.length) throw new Error('User not found')

    const userVP = user[0].vp || 0
    const vpWeight = calculateVoteWeight(starsSpent, userVP)

    // Insert vote
    const vote = await db
      .insert(votes)
      .values({
        userId,
        candidateId,
        roundId,
        starsSpent,
        vpWeight: vpWeight.toString(),
        weightedValue: (starsSpent * vpWeight).toString(),
      })
      .returning()

    // Update candidate vote count
    await db
      .update(modelCandidates)
      .set({
        votes: await this.getCandidateVoteCount(candidateId),
      })
      .where(eq(modelCandidates.id, candidateId))

    // Update user stars & stats
    await db
      .update(users)
      .set({
        stars: user[0].stars - starsSpent,
        totalVotes: user[0].totalVotes + 1,
        totalStars: user[0].totalStars + starsSpent,
      })
      .where(eq(users.id, userId))
  }

  async getVoteStats(roundId: string): Promise<any> {
    const allVotes = await db
      .select()
      .from(votes)
      .where(eq(votes.roundId, roundId))

    const distribution: Record<string, { votes: number; stars: number }> = {}

    for (const vote of allVotes) {
      if (!distribution[vote.candidateId]) {
        distribution[vote.candidateId] = { votes: 0, stars: 0 }
      }
      distribution[vote.candidateId].votes += 1
      distribution[vote.candidateId].stars += vote.starsSpent
    }

    return {
      totalVotes: allVotes.length,
      totalStars: allVotes.reduce((sum, v) => sum + v.starsSpent, 0),
      distribution,
    }
  }

  async getUserVotes(userId: string, roundId: string): Promise<any[]> {
    return db
      .select()
      .from(votes)
      .where(and(eq(votes.userId, userId), eq(votes.roundId, roundId)))
      .orderBy(desc(votes.createdAt))
  }

  private async getCandidateVoteCount(candidateId: string): Promise<number> {
    const result = await db
      .select()
      .from(votes)
      .where(eq(votes.candidateId, candidateId))

    return result.length
  }
}

export const votingService = new VotingService()