// next.config.ts
import type { NextConfig } from 'next'

const config: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { hostname: 'ipfs.io' },
      { hostname: 'getgems.io' },
      { hostname: 'ton.diamonds' },
    ],
    formats: ['image/avif', 'image/webp'],
  },
  experimental: {
    optimizePackageImports: [
      '@radix-ui/react-dialog',
      'echarts',
      'framer-motion',
    ],
  },
  swcMinify: true,
  compress: true,
  productionBrowserSourceMaps: false,
}

export default config