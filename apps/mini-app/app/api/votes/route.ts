// File: apps/mini-app/app/api/votes/route.ts

import type { Vote } from '@blender/types'

export async function POST(request: Request) {
  const body = await request.json()
  const { candidateId, stars } = body

  const mockVote: Vote = {
    id: `vote-${Date.now()}`,
    userId: 123456789,
    candidateId,
    roundId: 'round-1',
    stars,
    createdAt: new Date(),
  }

  return Response.json(mockVote)
}