// File: apps/api/src/db/schema.ts

import {
  pgTable,
  text,
  integer,
  boolean,
  timestamp,
  jsonb,
  uuid,
  bigint,
  decimal,
  primaryKey,
} from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'

// Users table
export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  telegramId: bigint('telegram_id', { mode: 'number' }).unique().notNull(),
  username: text('username').notNull(),
  firstName: text('first_name').notNull(),
  lastName: text('last_name'),
  photoUrl: text('photo_url'),
  isPremium: boolean('is_premium').default(false),
  walletAddress: text('wallet_address'),
  vpScore: integer('vp_score').default(0),
  vpBreakdown: jsonb('vp_breakdown').default({
    telegramActivity: 0,
    blenderActivity: 0,
    badgeMultiplier: 1,
  }),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})

// Game rounds table
export const gameRounds = pgTable('game_rounds', {
  id: uuid('id').primaryKey().defaultRandom(),
  weekNumber: integer('week_number').notNull().unique(),
  dayPhase: text('day_phase').notNull(), // 'speculation' | 'voting' | 'resolution'
  clueRevealLevel: integer('clue_reveal_level').default(0),
  selectedCandidates: jsonb('selected_candidates').notNull(), // NFT addresses
  prizePool: decimal('prize_pool', { precision: 20, scale: 2 }).default('5000'),
  totalVotes: integer('total_votes').default(0),
  startsAt: timestamp('starts_at').notNull(),
  endsAt: timestamp('ends_at').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})

// Votes table
export const votes = pgTable(
  'votes',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: uuid('user_id')
      .notNull()
      .references(() => users.id),
    roundId: uuid('round_id')
      .notNull()
      .references(() => gameRounds.id),
    candidateId: text('candidate_id').notNull(), // NFT address
    starsSpent: integer('stars_spent').notNull(),
    vpAtTime: integer('vp_at_time').notNull(), // Snapshot for calculation
    createdAt: timestamp('created_at').defaultNow(),
  },
  (table) => ({
    userRoundIdx: primaryKey(table.userId, table.roundId),
  })
)

// NFT Portfolio cache
export const nftPortfolio = pgTable(
  'nft_portfolio',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: uuid('user_id')
      .notNull()
      .references(() => users.id),
    nftAddress: text('nft_address').notNull(),
    name: text('name').notNull(),
    imageUrl: text('image_url'),
    isListed: boolean('is_listed').default(false),
    floorPrice: decimal('floor_price', { precision: 20, scale: 2 }).default('0'),
    lastSyncAt: timestamp('last_sync_at').defaultNow(),
  },
  (table) => ({
    userNftIdx: primaryKey(table.userId, table.nftAddress),
  })
)

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  votes: many(votes),
  portfolio: many(nftPortfolio),
}))

export const votesRelations = relations(votes, ({ one }) => ({
  user: one(users, { fields: [votes.userId], references: [users.id] }),
  round: one(gameRounds, {
    fields: [votes.roundId],
    references: [gameRounds.id],
  }),
}))