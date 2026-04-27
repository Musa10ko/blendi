// apps/api/src/modules/votes/service.ts
export class VotingEngine {
  async castVote(userId: string, modelId: string, stars: number, vp: number) {
    // Зареєструвати голос з вагою VP
    // Перевірити баланс Stars
    // Оновити статистику
  }

  async getVoteDistribution(roundId: string) {
    // Отримати розподіл голосів
  }
}