// apps/mini-app/src/components/game/ClueGrid.tsx

'use client'

import { getClueRevealLevel } from '@repo/shared'

interface ClueGridProps {
  revealedDays?: number[]
  currentDay?: number
}

export function ClueGrid({ revealedDays = [], currentDay = 1 }: ClueGridProps) {
  const days = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Нд']
  const icons = ['blur_on', 'palette', 'visibility', 'star', 'check_circle', 'emoji_events', 'celebration']

  return (
    <div className="bg-white/10 dark:bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/10">
      <p className="text-xs text-gray-600 dark:text-gray-400 mb-3 font-semibold">Тижневі підказки</p>
      <div className="grid grid-cols-7 gap-2">
        {days.map((day, index) => {
          const dayNum = index + 1
          const isRevealed = revealedDays.includes(dayNum)
          const clueLevel = getClueRevealLevel(dayNum)

          return (
            <div
              key={day}
              className={`flex flex-col items-center justify-center p-2 rounded-lg border transition ${
                isRevealed
                  ? 'bg-primary/20 border-primary'
                  : 'bg-gray-500/10 border-white/10'
              }`}
              title={clueLevel.description}
            >
              <span className="material-icons-round text-lg">{icons[index]}</span>
              <p className="text-xs font-semibold mt-1">{day}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}