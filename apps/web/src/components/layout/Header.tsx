// apps/mini-app/src/components/layout/Header.tsx

'use client'

import { useAppStore } from '@/lib/store'
import { shortenAddress } from '@repo/shared'

export function Header() {
  const { user, theme, toggleTheme } = useAppStore()

  return (
    <header className="sticky top-0 z-30 px-5 pt-4 pb-4 flex justify-between items-center">
      <button className="w-10 h-10 rounded-full bg-white/10 dark:bg-white/5 backdrop-blur-md flex items-center justify-center hover:scale-105 transition active:scale-95 border border-white/10">
        <span className="material-icons-round text-2xl">menu</span>
      </button>
      <div className="flex items-center space-x-3">
        <button
          onClick={toggleTheme}
          className="w-10 h-10 rounded-full bg-white/10 dark:bg-white/5 backdrop-blur-md flex items-center justify-center hover:scale-105 transition active:scale-95 border border-white/10"
        >
          <span className="material-icons-round text-2xl">
            {theme === 'light' ? 'dark_mode' : 'light_mode'}
          </span>
        </button>
        {user?.walletAddress && (
          <div className="flex items-center space-x-2 bg-white/10 dark:bg-white/5 backdrop-blur-md rounded-full pl-3 pr-1 py-1 border border-white/10">
            <span className="text-xs font-mono">{shortenAddress(user.walletAddress)}</span>
            <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
              <span className="material-icons-round text-sm">account_balance_wallet</span>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}