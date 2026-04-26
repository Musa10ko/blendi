// File: packages/ui/themes.ts

export const themeConfig = {
  dark: {
    name: 'dark',
    colors: {
      bg: {
        primary: '#0A0A0F',
        secondary: '#12121A',
        tertiary: '#1A1A25',
        surface: '#0F0F14',
      },
      accent: {
        primary: '#7C3AED',      // Violet
        hover: '#A855F7',
        light: '#C4B5FD',
        glow: 'rgba(124, 58, 237, 0.3)',
        glowStrong: 'rgba(124, 58, 237, 0.6)',
      },
      text: {
        primary: '#F1F5F9',
        secondary: '#94A3B8',
        muted: '#64748B',
      },
      border: {
        subtle: 'rgba(255,255,255,0.04)',
        default: 'rgba(255,255,255,0.08)',
        strong: 'rgba(255,255,255,0.15)',
      },
      status: {
        success: '#10B981',
        warning: '#F59E0B',
        danger: '#EF4444',
      },
    },
    gradients: {
      chalice: 'linear-gradient(135deg, rgba(124,58,237,0.2) 0%, rgba(168,85,247,0.1) 100%)',
      glow: 'radial-gradient(circle, rgba(124,58,237,0.4) 0%, rgba(124,58,237,0) 70%)',
    },
  },

  light: {
    name: 'light',
    colors: {
      bg: {
        primary: '#FFFFFF',
        secondary: '#F8FAFC',
        tertiary: '#F1F5F9',
        surface: '#FFFFFF',
      },
      accent: {
        primary: '#7C3AED',
        hover: '#6D28D9',
        light: '#EDE9FE',
        glow: 'rgba(124, 58, 237, 0.1)',
        glowStrong: 'rgba(124, 58, 237, 0.25)',
      },
      text: {
        primary: '#0F172A',
        secondary: '#475569',
        muted: '#94A3B8',
      },
      border: {
        subtle: 'rgba(0,0,0,0.04)',
        default: 'rgba(0,0,0,0.08)',
        strong: 'rgba(0,0,0,0.15)',
      },
      status: {
        success: '#059669',
        warning: '#D97706',
        danger: '#DC2626',
      },
    },
    gradients: {
      chalice: 'linear-gradient(135deg, rgba(124,58,237,0.1) 0%, rgba(168,85,247,0.05) 100%)',
      glow: 'radial-gradient(circle, rgba(124,58,237,0.2) 0%, rgba(124,58,237,0) 70%)',
    },
  },
}