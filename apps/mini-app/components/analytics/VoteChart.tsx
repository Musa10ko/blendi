// File: apps/mini-app/components/analytics/VoteChart.tsx

'use client'
import { useEffect, useRef } from 'react'
import * as echarts from 'echarts/core'
import { PieChart } from 'echarts/charts'
import { CanvasRenderer } from 'echarts/renderers'
import type { GameRound } from '@blender/types'

echarts.use([PieChart, CanvasRenderer])

interface VoteChartProps {
  round: GameRound
}

export function VoteChart({ round }: VoteChartProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const chart = echarts.init(containerRef.current, 'dark')

    const data = round.candidates.map((c) => ({
      name: c.name,
      value: c.votes,
    }))

    const option = {
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} votes ({d}%)',
      },
      legend: {
        orient: 'vertical',
        left: 'left',
        textStyle: { color: '#E2E8F0' },
      },
      series: [
        {
          name: 'Votes',
          type: 'pie',
          radius: '50%',
          data,
          itemStyle: {
            borderColor: '#0A0A0F',
            borderWidth: 2,
          },
          color: ['#7C3AED', '#A855F7', '#C4B5FD', '#DDD6FE'],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(124, 58, 237, 0.5)',
            },
          },
        },
      ],
    }

    chart.setOption(option)

    const handleResize = () => chart.resize()
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
      chart.dispose()
    }
  }, [round])

  return <div ref={containerRef} className="w-full h-64" />
}