// File: apps/mini-app/app/api/votes/stats/[roundId]/route.ts

export async function GET(
  request: Request,
  { params }: { params: { roundId: string } }
) {
  return Response.json({
    roundId: params.roundId,
    totalVotes: 2719,
    topCandidates: [
      { id: 'nft-1', votes: 1240 },
      { id: 'nft-2', votes: 856 },
      { id: 'nft-3', votes: 623 },
    ],
  })
}