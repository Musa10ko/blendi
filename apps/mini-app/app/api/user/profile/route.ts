// File: apps/mini-app/app/api/user/profile/route.ts

export async function GET() {
  return Response.json({
    user: {
      id: 123456789,
      is_bot: false,
      first_name: 'User',
      username: 'testuser',
      is_premium: false,
    },
    vpScore: 42,
    listedNFTs: [
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
    unlistedNFTs: [
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