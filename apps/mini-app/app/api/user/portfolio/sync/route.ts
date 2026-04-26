// File: apps/mini-app/app/api/user/portfolio/sync/route.ts

export async function POST() {
  // Mock sync - in production connect to marketplace
  return Response.json({
    listed: [
      {
        id: 'nft-1',
        tokenId: 222,
        name: 'Toy Bear',
        imageUrl: '/mock-nft-1.jpg',
        collection: 'Telegram Gifts',
        owner: 'user123',
        isListed: true,
        floorPrice: 1.5,
      },
    ],
    unlisted: [
      {
        id: 'nft-4',
        tokenId: 999,
        name: 'Hidden Gem',
        imageUrl: '/mock-nft-4.jpg',
        collection: 'Telegram Gifts',
        owner: 'user123',
        isListed: false,
        floorPrice: 2.0,
      },
    ],
  })
}