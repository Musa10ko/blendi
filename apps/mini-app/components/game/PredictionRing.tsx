// components/game/PredictionRing.tsx
'use client'
import { useEffect, useRef } from 'react'
import * as echarts from 'echarts/core'
import { GaugeChart } from 'echarts/charts'
import { CanvasRenderer } from 'echarts/renderers'

echarts.use([GaugeChart, CanvasRenderer])

interface PredictionRingProps {
  votePercentage: number
  totalVotes: number
  momentum: 'rising' | 'stable' | 'falling'
}

export function PredictionRing({ votePercentage, totalVotes, momentum }: PredictionRingProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const chart = echarts.init(containerRef.current, 'dark')
    
    const option = {
      series: [
        {
          type: 'gauge',
          startAngle: 180,
          endAngle: 0,
          radius: '100%',
          min: 0,
          max: 100,
          splitNumber: 10,
          progress: {
            itemStyle: {
              color: momentum === 'rising' ? '#10B981' : 
                     momentum === 'falling' ? '#EF4444' : '#7C3AED',
            },
          },
          axisLine: {
            lineStyle: {
              width: 20,
              color: [[1, '#0F172A']],
            },
          },
          axisTick: { distance: -8, splitNumber: 5 },
          splitLine: { distance: -8, length: 8, lineStyle: { width: 1 } },
          axisLabel: { color: 'rgba(255,255,255,0.4)', distance: 0 },
          detail: {
            valueAnimation: true,
            formatter: '{value}%',
            color: '#7C3AED',
            fontSize: 14,
            fontWeight: 'bold',
          },
          data: [{ value: votePercentage }],
        },
      ],
    }

    chart.setOption(option)
    
    return () => chart.dispose()
  }, [votePercentage, momentum])

  return (
    <div ref={containerRef} className="w-full h-32" />
  )
}