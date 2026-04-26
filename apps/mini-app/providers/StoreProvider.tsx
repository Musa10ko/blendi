// File: apps/mini-app/providers/StoreProvider.tsx

'use client'
import { ReactNode } from 'react'

export function StoreProvider({ children }: { children: ReactNode }) {
  return <>{children}</>
}