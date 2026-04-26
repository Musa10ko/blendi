// File: apps/mini-app/components/game/data/patterns.ts
export const patterns = {
  // Тестові патерни (можеш додавати скільки завгодно)
  1: "/patterns/504. Police Badge.svg",   // Police Badge
  2: "/patterns/004. Acorn.svg",          // Acorn
  3: "/patterns/323. Jingle Bell.svg",    // Jingle Bell
  4: "/patterns/462. Pantoja.svg",        // Pantoja
  5: "/patterns/456. Oxen of Fire.svg",   // Oxen of Fire
} as const;

export type PatternKey = keyof typeof patterns;