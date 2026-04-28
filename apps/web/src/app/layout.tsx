// apps/mini-app/src/app/layout.tsx

import type { Metadata } from 'next'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '@/lib/queryClient'
import './globals.css'

export const metadata: Metadata = {
  title: 'Blender - Telegram NFT Game',
  description: 'Гейміфікована платформа для голосування за NFT моделі',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="uk" suppressHydrationWarning>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons+Round"
          rel="stylesheet"
        />
      </head>
      <body className="bg-light-50 dark:bg-dark-900 text-gray-900 dark:text-white font-sans antialiased transition-colors duration-200">
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </body>
    </html>
  )
}