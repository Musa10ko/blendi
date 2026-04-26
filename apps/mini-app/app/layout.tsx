// File: apps/mini-app/app/layout.tsx

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { TelegramProvider } from '@/providers/TelegramProvider'
import { ThemeProvider } from '@/providers/ThemeProvider'
import { QueryProvider } from '@/providers/QueryProvider'
import { StoreProvider } from '@/providers/StoreProvider'
import { AppShell } from '@/components/layout/AppShell'
import { ThemeToggle } from '@/components/layout/ThemeToggle'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Blender - NFT Game',
  description: 'Gamified Loyalty Layer for Telegram NFT Gifts',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="uk" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#0A0A0F" />
      </head>
      <body className={`${inter.className} overflow-hidden`}>
        <ThemeProvider>
          <TelegramProvider>
            <QueryProvider>
              <StoreProvider>
                <ThemeToggle />
                <AppShell>{children}</AppShell>
              </StoreProvider>
            </QueryProvider>
          </TelegramProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}