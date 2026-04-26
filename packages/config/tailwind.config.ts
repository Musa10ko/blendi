// packages/config/tailwind.config.ts
import { tokens } from '@blender/ui'

export default {
  theme: {
    colors: {
      bg: tokens.colorTokens.bg,
      border: tokens.colorTokens.border,
      accent: tokens.colorTokens.accent,
      status: tokens.colorTokens.status,
      text: tokens.colorTokens.text,
      transparent: 'transparent',
    },
    animation: {
      'glow-pulse': 'glowPulse 2s ease-in-out infinite',
      'float': 'float 3s ease-in-out infinite',
      'swirl-in': 'swirlIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
      'slide-up': 'slideUp 0.4s ease-out',
      'bounce-in': 'bounceIn 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      'fade-in': 'fadeIn 0.3s ease-out',
    },
    keyframes: {
      glowPulse: {
        '0%, 100%': { 
          boxShadow: `0 0 8px ${tokens.colorTokens.accent.glow}` 
        },
        '50%': { 
          boxShadow: `0 0 20px ${tokens.colorTokens.accent.glow}` 
        },
      },
      float: {
        '0%, 100%': { transform: 'translateY(0)' },
        '50%': { transform: 'translateY(-8px)' },
      },
      slideUp: {
        'from': { transform: 'translateY(20px)', opacity: '0' },
        'to': { transform: 'translateY(0)', opacity: '1' },
      },
    },
  },
  plugins: [
    require('@tailwindcss/container-queries'),
    require('@tailwindcss/typography'),
  ],
}