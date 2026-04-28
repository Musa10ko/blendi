// apps/mini-app/src/components/layout/BottomNav.tsx

'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { UI_CONFIG } from '@repo/shared'

export function BottomNav() {
  const pathname = usePathname()

  return (
    <>
      <nav className="fixed bottom-3 left-1/2 -translate-x-1/2 z-30 max-w-md mx-auto w-full bg-white/10 dark:bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 px-2 py-1 grid grid-cols-5 text-center">
        {UI_CONFIG.BOTTOM_NAV_ROUTES.map((route) => {
          const isActive = pathname === route.href
          return (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                'flex flex-col items-center py-1 transition relative',
                isActive
                  ? 'text-primary'
                  : 'text-gray-600 dark:text-gray-400 hover:text-primary'
              )}
            >
              {isActive && (
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-12 h-12 bg-white/10 dark:bg-white/5 backdrop-blur-md rounded-full border border-white/10 flex items-center justify-center shadow-xl">
                  <div className="w-10 h-10 bg-primary/25 rounded-full flex items-center justify-center">
                    <span className="material-icons-round text-lg">{route.icon}</span>
                  </div>
                </div>
              )}
              {!isActive && (
                <span className="material-icons-round text-3xl">{route.icon}</span>
              )}
              <span className="text-[10px] mt-1">{route.label}</span>
            </Link>
          )
        })}
      </nav>
      <div className="fixed bottom-1 left-1/2 -translate-x-1/2 w-32 h-1 bg-gray-300 dark:bg-white/20 rounded-full z-40"></div>
    </>
  )
}