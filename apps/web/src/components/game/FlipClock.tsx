// apps/web/src/components/game/FlipClock.tsx
'use client'

import { useEffect, useState } from 'react'

interface TimeLeft {
  hours: number
  minutes: number
  seconds: number
}

export function FlipClock() {
  const [time, setTime] = useState<TimeLeft>({ hours: 1, minutes: 34, seconds: 49 })

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prev) => {
        let { hours, minutes, seconds } = prev
        seconds--
        if (seconds < 0) {
          seconds = 59
          minutes--
        }
        if (minutes < 0) {
          minutes = 59
          hours--
        }
        return { hours, minutes, seconds }
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const Digit = ({ value }: { value: number }) => (
    <div className="bg-gray-900 dark:bg-gray-800 text-white text-4xl font-bold w-16 h-20 flex items-center justify-center rounded-lg shadow-lg">
      {String(value).padStart(2, '0')}
    </div>
  )

  return (
    <div className="bg-white/10 dark:bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 text-center">
      <h3 className="text-sm text-gray-600 dark:text-gray-400 mb-4">Round ends in</h3>
      <div className="flex justify-center items-center gap-2">
        <Digit value={time.hours} />
        <span className="text-3xl font-bold">:</span>
        <Digit value={time.minutes} />
        <span className="text-3xl font-bold">:</span>
        <Digit value={time.seconds} />
      </div>
    </div>
  )
}