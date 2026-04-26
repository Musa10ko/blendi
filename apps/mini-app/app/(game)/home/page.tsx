// File: apps/mini-app/app/(game)/home/page.tsx

'use client'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay, EffectCoverflow } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/effect-coverflow'
import { GameTimer } from '@/components/game/GameTimer'
import { ChaliceCard } from '@/components/game/ChaliceCard'
import { VotePanel } from '@/components/game/VotePanel'
import { VoteStats } from '@/components/game/VoteStats'
import { ClueIndicator } from '@/components/game/ClueIndicator'
import { Confetti } from '@/components/effects/Confetti'
import { useTheme } from '@/providers/ThemeProvider'
import { useGameStore } from '@/stores/gameStore'
import type { GameRound } from '@blender/types'

export default function HomePage() {
  const { colors, gradients } = useTheme()
  const { setCurrentRound, selectedCandidateId, setSelectedCandidate } = useGameStore()
  const [round, setRound] = useState<GameRound | null>(null)
  const [showConfetti, setShowConfetti] = useState(false)

  useEffect(() => {
    const fetchRound = async () => {
      const res = await fetch('/api/game/current-round')
      const data = await res.json()
      setRound(data)
      setCurrentRound(data)
    }
    fetchRound()
    const interval = setInterval(fetchRound, 10000)
    return () => clearInterval(interval)
  }, [setCurrentRound])

  const handleVoteSuccess = () => {
    setShowConfetti(true)
    setTimeout(() => setShowConfetti(false), 3000)
  }

  return (
    <main
      className="min-h-screen pt-20 pb-24 px-4 overflow-hidden"
      style={{
        background: gradients.chalice,
        backgroundColor: colors.bg.primary,
      }}
    >
      {showConfetti && <Confetti />}

      {/* Header with Timer */}
      <motion.div
        className="flex items-center justify-between mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div>
          <h1
            className="text-2xl font-bold mb-1"
            style={{ color: colors.text.primary }}
          >
            Weekly Challenge
          </h1>
          <p style={{ color: colors.text.secondary }}>Predict & Vote to Win</p>
        </div>
        <GameTimer />
      </motion.div>

      {/* Clue Reveal Indicator */}
      {round && <ClueIndicator level={round.clueRevealLevel} />}

      {/* MAIN CHALICE - 80% of viewport */}
      <motion.div
        className="relative w-full mb-8"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        style={{
          height: '80vh',
          maxHeight: '600px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Glow background effect */}
        <motion.div
          className="absolute inset-0 opacity-50"
          style={{
            background: gradients.glow,
          }}
          animate={{
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />

        {/* Chalice container */}
        <div className="relative w-full h-full flex flex-col items-center justify-center z-10">
          {/* Central Model Card */}
          {round?.candidates[0] && (
            <ChaliceCard
              model={round.candidates[0]}
              dayPhase={round.clueRevealLevel}
              isSelected={selectedCandidateId === round.candidates[0].id}
              onSelect={() => setSelectedCandidate(round.candidates[0].id)}
              colors={colors}
            />
          )}

          {/* Models Slider - OVERLAY on chalice */}
          {round && (
            <motion.div
              className="absolute bottom-0 w-full"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Swiper
                modules={[Pagination, Autoplay, EffectCoverflow]}
                effect="coverflow"
                grabCursor
                centeredSlides
                slidesPerView="auto"
                autoplay={{ delay: 5000 }}
                pagination={{ clickable: true }}
                coverflowEffect={{
                  rotate: 50,
                  stretch: 0,
                  depth: 100,
                  modifier: 1,
                  slideShadows: false,
                }}
                className="w-full"
              >
                {round.candidates.map((candidate) => (
                  <SwiperSlide
                    key={candidate.id}
                    style={{ width: '120px', height: '140px' }}
                  >
                    <motion.button
                      onClick={() => setSelectedCandidate(candidate.id)}
                      className="relative w-full h-full rounded-lg overflow-hidden border-2 transition-all"
                      style={{
                        borderColor:
                          selectedCandidateId === candidate.id
                            ? colors.accent.primary
                            : colors.border.default,
                        backgroundColor: colors.bg.secondary,
                      }}
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <img
                        src={candidate.imageUrl || '/placeholder.png'}
                        alt={candidate.name}
                        className="w-full h-full object-cover"
                      />

                      {/* Active indicator */}
                      {selectedCandidateId === candidate.id && (
                        <motion.div
                          className="absolute inset-0"
                          style={{
                            boxShadow: `0 0 30px ${colors.accent.glowStrong}`,
                          }}
                          animate={{
                            boxShadow: [
                              `0 0 30px ${colors.accent.glowStrong}`,
                              `0 0 50px ${colors.accent.glowStrong}`,
                              `0 0 30px ${colors.accent.glowStrong}`,
                            ],
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      )}
                    </motion.button>
                  </SwiperSlide>
                ))}
              </Swiper>
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Vote Stats - Below chalice */}
      {round && <VoteStats round={round} colors={colors} />}

      {/* Vote Panel - Bottom */}
      <VotePanel
        candidateId={selectedCandidateId}
        colors={colors}
        onVoteSuccess={handleVoteSuccess}
      />
    </main>
  )
}
