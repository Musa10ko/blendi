// apps/mini-app/src/components/analytics/MarketSentimentChart.tsx

'use client'

import { useEffect, useRef } from 'react'
import * as echarts from 'echarts'

interface MarketSentimentChartProps {
  data?: Array<{ date: string; value: number }>
}

export default function MarketSentimentChart({
  data = [
    { date: 'Пн', value: 420 },
    { date: 'Вт', value: 680 },
    { date: 'Ср', value: 950 },
    { date: 'Чт', value: 820 },
    { date: 'Пт', value: 1100 },
    { date: 'Сб', value: 1350 },
    { date: 'Нд', value: 1680 },
  ],
}: MarketSentimentChartProps) {
  const chartRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!chartRef.current) return

    const chart = echarts.init(chartRef.current, 'dark')

    const option = {
      responsive: true,
      maintainAspectRatio: true,
      grid: {
        left: '5%',
        right: '5%',
        bottom: '10%',
        top: '10%',
        containLabel: true,
      },
      xAxis: {
        type: 'category',
        data: data.map((d) => d.date),
        boundaryGap: false,
        axisLine: { lineStyle: { color: 'rgba(255, 255, 255, 0.1)' } },
      },
      yAxis: {
        type: 'value',
        axisLine: { lineStyle: { color: 'rgba(255, 255, 255, 0.1)' } },
      },
      series: [
        {
          data: data.map((d) => d.value),
          type: 'line',
          smooth: true,
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: 'rgba(80, 167, 234, 0.3)' },
              { offset: 1, color: 'rgba(80, 167, 234, 0)' },
            ]),
          },
          lineStyle: { color: '#50A7EA', width: 2 },
          symbolSize: 4,
          itemStyle: { color: '#50A7EA' },
        },
      ],
    }

    chart.setOption(option)

    return () => chart.dispose()
  }, [data])

  return <div ref={chartRef} style={{ width: '100%', height: '300px' }} />
}