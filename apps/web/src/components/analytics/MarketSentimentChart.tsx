// apps/web/src/components/analytics/MarketSentimentChart.tsx
'use client'

import { useEffect, useRef } from 'react'
import * as echarts from 'echarts'

export function MarketSentimentChart() {
  const chartRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!chartRef.current) return

    const chart = echarts.init(chartRef.current)
    chart.setOption({
      xAxis: { type: 'category', data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'] },
      yAxis: { type: 'value' },
      series: [{ data: [420, 680, 950, 820, 1100], type: 'line' }],
    })
  }, [])

  return <div ref={chartRef} style={{ width: '100%', height: '300px' }} />
}