// apps/web/src/components/layout/BottomNav.tsx
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const routes = [
  { href: '/profile', label: 'Profile', icon: 'person' },
  { href: '/stats', label: 'Stats', icon: 'analytics' },
  { href: '/', label: 'Home', icon: 'home' },
  { href: '/wall', label: 'Wall', icon: 'receipt_long' },
  { href: '/pantheon', label: 'Pantheon', icon: 'groups' },
]

export function BottomNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-3 left-1/2 -translate-x-1/2 z-30 max-w-md mx-auto w-full bg-white/10 dark:bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 px-2 py-1 grid grid-cols-5 text-center">
      {routes.map((route) => {
        const isActive = pathname === route.href
        return (
          <Link
            key={route.href}
            href={route.href}
            className={cn(
              'flex flex-col items-center py-1 transition',
              isActive
                ? 'text-primary border-t-2 border-primary'
                : 'text-gray-600 hover:text-primary'
            )}
          >
            <span className="material-icons-round text-3xl">
              {route.icon}
            </span>
            <span className="text-[10px]">{route.label}</span>
          </Link>
        )
      })}
    </nav>
  )
}