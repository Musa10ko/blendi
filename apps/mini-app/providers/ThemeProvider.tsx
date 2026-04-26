// File: apps/mini-app/providers/ThemeProvider.tsx

'use client'
import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { themeConfig } from '@blender/ui'

type ThemeName = 'dark' | 'light'

interface ThemeContextType {
  theme: ThemeName
  setTheme: (theme: ThemeName) => void
  colors: (typeof themeConfig.dark.colors)
  gradients: (typeof themeConfig.dark.gradients)
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeName>('dark')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Load from localStorage
    const saved = localStorage.getItem('blender-theme') as ThemeName
    if (saved) setThemeState(saved)
    setMounted(true)
  }, [])

  const setTheme = (newTheme: ThemeName) => {
    setThemeState(newTheme)
    localStorage.setItem('blender-theme', newTheme)
    document.documentElement.setAttribute('data-theme', newTheme)
  }

  const currentTheme = themeConfig[theme]

  if (!mounted) {
    return <>{children}</>
  }

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        colors: currentTheme.colors,
        gradients: currentTheme.gradients,
      }}
    >
      <div
        data-theme={theme}
        style={{
          backgroundColor: currentTheme.colors.bg.primary,
          color: currentTheme.colors.text.primary,
        }}
      >
        {children}
      </div>
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) throw new Error('useTheme must be used within ThemeProvider')
  return context
}