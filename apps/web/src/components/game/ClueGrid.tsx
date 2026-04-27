// apps/web/src/components/game/ClueGrid.tsx
'use client'

export function ClueGrid() {
  const clues = [
    { day: 'Mon', revealed: true, icon: 'blur_on', color: 'bg-red-500' },
    { day: 'Tue', revealed: true, icon: 'palette', color: 'bg-yellow-500' },
    { day: 'Wed', revealed: false, icon: 'lock', color: 'bg-gray-500' },
    { day: 'Thu', revealed: false, icon: 'lock', color: 'bg-gray-500' },
    { day: 'Fri', revealed: false, icon: 'lock', color: 'bg-gray-500' },
  ]

  return (
    <div className="bg-white/10 dark:bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/10">
      <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">Weekly Clues</p>
      <div className="grid grid-cols-5 gap-2">
        {clues.map((clue) => (
          <div
            key={clue.day}
            className={`flex flex-col items-center justify-center p-3 rounded-lg ${clue.color} bg-opacity-20 border border-white/10`}
          >
            <span className="material-icons-round text-xl mb-1">{clue.icon}</span>
            <p className="text-xs font-semibold">{clue.day}</p>
          </div>
        ))}
      </div>
    </div>
  )
}