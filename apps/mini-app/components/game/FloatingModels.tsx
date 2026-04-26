// components/game/FloatingModels.tsx
'use client'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import { motion } from 'framer-motion'

interface FloatingModelsProps {
  candidates: NFTCandidate[]
  selectedId?: string
  onSelect: (id: string) => void
}

export function FloatingModels({ candidates, selectedId, onSelect }: FloatingModelsProps) {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <Swiper
        modules={[Pagination, Autoplay]}
        loop
        autoplay={{ delay: 4000 }}
        pagination={{ clickable: true, dynamicBullets: true }}
        spaceBetween={16}
        slidesPerView={3}
        centeredSlides
        className="w-full"
      >
        {candidates.map((candidate) => (
          <SwiperSlide key={candidate.id} className="pointer-events-auto">
            <motion.button
              onClick={() => onSelect(candidate.id)}
              className={`w-20 h-20 rounded-lg border overflow-hidden transition-all ${
                selectedId === candidate.id
                  ? 'border-accent scale-110 shadow-lg shadow-accent/40'
                  : 'border-border hover:border-accent/50'
              }`}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
            >
              <img
                src={candidate.imageUrl}
                alt={candidate.name}
                className="w-full h-full object-cover"
              />
            </motion.button>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}