// File: apps/api/src/config/env.ts

export const ENV = {
  // TonAPI
  TONAPI_KEY: process.env.TONAPI_KEY || 'AFD3bnEWLf33BlKYRyZ6jfXRzrgRb_6r0vl-DHyeV9g0mxD7',
  TONAPI_BASE_URL: 'https://tonapi.io/v2',

  // GetGems
  GETGEMS_API_URL: 'https://api.getgems.io',

  // TON
  TON_ENDPOINT: process.env.TON_ENDPOINT || 'https://mainnet-v4.tonhubapi.com',
  TON_NETWORK: (process.env.TON_NETWORK || 'mainnet') as 'mainnet' | 'testnet',

  // DB
  DATABASE_URL:
    process.env.DATABASE_URL ||
    'postgresql://user:password@localhost:5432/blender',

  // JWT
  JWT_SECRET: process.env.JWT_SECRET || 'dev-secret-key',
  JWT_EXPIRY: '7d',

  // Cache
  CACHE_TTL_PRICES: 5 * 60, // 5 min
  CACHE_TTL_METADATA: 60 * 60, // 1 hour
  CACHE_TTL_PORTFOLIO: 10 * 60, // 10 min

  // Telegram
  BOT_TOKEN: process.env.BOT_TOKEN!,
}