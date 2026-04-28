// apps/api/src/db/schema.ts

import { pgTable, text, integer, boolean, timestamp, uuid, numeric, jsonb, enum as pgEnum } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'

// Enums
export const userRoleEnum = pgEnum('user_role', ['user', 'admin', 'moderator'])
export const nftStatusEnum = pgEnum('nft_status', ['listed', 'not_listed', 'inactive'])
export const roundStatusEnum = pgEnum('round_status', ['clues', 'voting', 'ended'])

// Users table
export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  telegramId: integer('telegram_id').unique().notNull(),
  username: text('username').notNull(),
  firstName: text('first_name'),
  lastName: text('last_name'),
  avatar: text('avatar'),
  walletAddress: text('wallet_address'),
  
  // Game stats
  vp: integer('vp').default(0),
  stars: integer('stars').default(0),
  rank: integer('rank').default(0),
  totalVotes: integer('total_votes').default(0),
  totalStars: integer('total_stars').default(0),
  
  // Account
  role: userRoleEnum('role').default('user'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})

export const usersRelations = relations(users, ({ many }) => ({
  votes: many(votes),
  nfts: many(userNFT),
}))

// NFTs table
export const nfts = pgTable('nfts', {
  id: uuid('id').primaryKey().defaultRandom(),
  collectionId: text('collection_id').notNull(),
  marketplaceId: text('marketplace_id').notNull(),
  name: text('name').notNull(),
  image: text('image'),
  attributes: jsonb('attributes'),
  
  floorPrice: numeric('floor_price'),
  volume24h: numeric('volume_24h'),
  
  createdAt: timestamp('created_at').defaultNow(),
})

export const nftsRelations = relations(nfts, ({ many }) => ({
  candidates: many(modelCandidates),
  owners: many(userNFT),
}))

// User NFT ownership
export const userNFT = pgTable('user_nft', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id),
  nftId: uuid('nft_id').references(() => nfts.id),
  status: nftStatusEnum('status').default('not_listed'),
  createdAt: timestamp('created_at').defaultNow(),
})

// Game Rounds
export const gameRounds = pgTable('game_rounds', {
  id: uuid('id').primaryKey().defaultRandom(),
  weekNumber: integer('week_number').notNull(),
  status: roundStatusEnum('status').default('clues'),
  
  startDate: timestamp('start_date').notNull(),
  endDate: timestamp('end_date').notNull(),
  votingStartDate: timestamp('voting_start_date'),
  votingEndDate: timestamp('voting_end_date'),
  
  totalVotes: integer('total_votes').default(0),
  totalStars: integer('total_stars').default(0),
  prizePool: numeric('prize_pool').default('0'),
  
  createdAt: timestamp('created_at').defaultNow(),
})

export const gameRoundsRelations = relations(gameRounds, ({ many }) => ({
  candidates: many(modelCandidates),
  votes: many(votes),
}))

// Model Candidates per round
export const modelCandidates = pgTable('model_candidates', {
  id: uuid('id').primaryKey().defaultRandom(),
  roundId: uuid('round_id').references(() => gameRounds.id),
  nftId: uuid('nft_id').references(() => nfts.id),
  
  imageBlur: integer('image_blur').default(100), // 0-100
  votes: integer('votes').default(0),
  voteValue: numeric('vote_value').default('0'), // Stars weighted
  
  winner: boolean('winner').default(false),
  revealedDays: jsonb('revealed_days').default([]), // [1,2,3...]
  
  createdAt: timestamp('created_at').defaultNow(),
})

export const modelCandidatesRelations = relations(modelCandidates, ({ many, one }) => ({
  round: one(gameRounds, { fields: [modelCandidates.roundId], references: [gameRounds.id] }),
  nft: one(nfts, { fields: [modelCandidates.nftId], references: [nfts.id] }),
  votes: many(votes),
}))

// Votes
export const votes = pgTable('votes', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id),
  roundId: uuid('round_id').references(() => gameRounds.id),
  candidateId: uuid('candidate_id').references(() => modelCandidates.id),
  
  starsSpent: integer('stars_spent').notNull(),
  vpWeight: numeric('vp_weight').default('1'),
  weightedValue: numeric('weighted_value'), // starsSpent * vpWeight
  
  createdAt: timestamp('created_at').defaultNow(),
})

export const votesRelations = relations(votes, ({ one }) => ({
  user: one(users, { fields: [votes.userId], references: [users.id] }),
  round: one(gameRounds, { fields: [votes.roundId], references: [gameRounds.id] }),
  candidate: one(modelCandidates, { fields: [votes.candidateId], references: [modelCandidates.id] }),
}))

// Rewards
export const rewards = pgTable('rewards', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id),
  roundId: uuid('round_id').references(() => gameRounds.id),
  
  amount: numeric('amount').notNull(),
  reason: text('reason'), // 'winner', 'predictor', 'participation'
  status: pgEnum('reward_status', ['pending', 'claimed', 'failed'])('status').default('pending'),
  
  createdAt: timestamp('created_at').defaultNow(),
  claimedAt: timestamp('claimed_at'),
})

// Pantheon (Hall of Fame)
export const pantheon = pgTable('pantheon', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id),
  roundId: uuid('round_id').references(() => gameRounds.id),
  
  position: integer('position'), // 1st, 2nd, 3rd
  category: text('category'), // 'winner', 'top_predictor', 'legend'
  
  createdAt: timestamp('created_at').defaultNow(),
})