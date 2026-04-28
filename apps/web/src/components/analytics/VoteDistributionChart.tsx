// apps/mini-app/src/components/analytics/VoteDistributionChart.tsx

'use client'

import { useEffect, useRef } from 'react'
import * as echarts from 'echarts'

interface VoteDistributionChartProps {
  data?: Array<{ name: string; value: number }>
}

export default function VoteDistributionChart({
  data = [
    { name: 'Model A', value: 450 },
    { name: 'Model B', value: 320 },
    { name: 'Model C', value: 280 },
  ],
}: VoteDistributionChartProps) {
  const chartRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!chartRef.current) return

    const chart = echarts.init(chartRef.current, 'dark')

    const option = {
      tooltip: {
        trigger: 'item',
        formatter: '{b}: {c} ({d}%)',
      },
      legend: {
        orient: 'vertical',
        left: 'left',
        textStyle: { color: 'rgba(255, 255, 255, 0.7)' },
      },
      series: [
        {
          name: 'Votes',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: [10, 10],
            borderColor: '#0a0a0a',
            borderWidth: 2,
          },
          label: {
            show: false,
          },
          labelLine: {
            show: false,
          },
          data: data.map((item, idx) => ({
            ...item,
            itemStyle: {
              color: ['#50A7EA', '#8B5CF6', '#EC4899'][idx % 3],
            },
          })),
        },
      ],
    }

    chart.setOption(option)

    return () => chart.dispose()
  }, [data])

  return <div ref={chartRef} style={{ width: '100%', height: '300px' }} />
}