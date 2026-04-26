// packages/ui/tokens.ts
export const colorTokens = {
  // Backgrounds
  bg: {
    primary: '#0A0A0F',      // main bg
    secondary: '#12121A',    // cards, surfaces
    tertiary: '#1A1A25',     // hover states
  },
  // Borders & dividers
  border: {
    subtle: 'rgba(255,255,255,0.04)',
    default: 'rgba(255,255,255,0.06)',
    strong: 'rgba(255,255,255,0.12)',
  },
  // Accents
  accent: {
    primary: '#7C3AED',      // violet
    hover: '#A855F7',
    glow: 'rgba(124, 58, 237, 0.4)',
  },
  // Semantics
  status: {
    success: '#10B981',
    warning: '#F59E0B',
    danger: '#EF4444',
    info: '#3B82F6',
  },
  // Text
  text: {
    primary: '#E2E8F0',
    secondary: '#94A3B8',
    muted: '#64748B',
  },
}

// Анімаційні значення
export const blurTokens = {
  light: 'blur(4px)',
  medium: 'blur(12px)',
  heavy: 'blur(24px)',
  glass: 'blur(12px)',
}

export const glowTokens = {
  subtle: '0 0 8px rgba(124, 58, 237, 0.2)',
  medium: '0 0 16px rgba(124, 58, 237, 0.4)',
  strong: '0 0 32px rgba(124, 58, 237, 0.6)',
  gold: '0 0 20px rgba(245, 158, 11, 0.5)',
}