// File: apps/mini-app/components/analytics/MomentumChart.tsx

'use client'
import { useEffect, useRef } from 'react'
import * as echarts from 'echarts/core'
import { LineChart } from 'echarts/charts'
import { CanvasRenderer } from 'echarts/renderers'

echarts.use([LineChart, CanvasRenderer])

export function MomentumChart() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const chart = echarts.init(containerRef.current, 'dark')

    const option = {
      grid: { left: 40, right: 20, top: 20, bottom: 30 },
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        boundaryGap: false,
        axisLine: { lineStyle: { color: 'rgba(255,255,255,0.1)' } },
      },
      yAxis: {
        type: 'value',
        axisLine: { show: false },
        splitLine: { lineStyle: { color: 'rgba(255,255,255,0.05)' } },
      },
      series: [
        {
          data: [120, 240, 380, 320, 450, 620],
          type: 'line',
          smooth: true,
          itemStyle: { color: '#7C3AED' },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: 'rgba(124, 58, 237, 0.3)' },
              { offset: 1, color: 'rgba(124, 58, 237, 0)' },
            ]),
          },
        },
      ],
      tooltip: {
        trigger: 'axis',
        backgroundColor: 'rgba(18, 18, 26, 0.95)',
        borderColor: 'rgba(124, 58, 237, 0.3)',
      },
    }

    chart.setOption(option)

    const handleResize = () => chart.resize()
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
      chart.dispose()
    }
  }, [])

  return <div ref={containerRef} className="w-full h-64" />
}