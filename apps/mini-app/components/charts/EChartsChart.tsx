// components/charts/EChartsChart.tsx
'use client'
import * as echarts from 'echarts/core'
import { useEffect, useRef } from 'react'

// Lazy import тільки потрібних модулів (tree-shaking)
import { PieChart, LineChart, BarChart } from 'echarts/charts'
import { CanvasRenderer } from 'echarts/renderers'
echarts.use([PieChart, LineChart, BarChart, CanvasRenderer, ...])

// Theme: dark, accent violet, відповідає design tokens