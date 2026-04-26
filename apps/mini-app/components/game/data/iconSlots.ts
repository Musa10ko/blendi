// File: apps/mini-app/components/game/data/iconSlots.ts


export interface IconSlot {
  id: number;
  tx: number;   // x
  ty: number;   // y
  scale: number;
  width: number;
  height: number;
}

// Точні координати з твого back-2.svg + CSV (23 слоти)
export const ICON_MATRIX: IconSlot[] = [
  { id: 1, tx: 99.65, ty: 347.72, scale: 0.09094, width: 23.28, height: 23.28 },
  { id: 2, tx: 92.78, ty: 141.97, scale: 0.08117, width: 20.78, height: 20.78 },
  { id: 3, tx: 377.53, ty: 141.97, scale: 0.08117, width: 20.78, height: 20.78 },
  { id: 4, tx: 364.65, ty: 347.72, scale: 0.09094, width: 23.28, height: 23.28 },
  { id: 5, tx: 397.65, ty: 220.72, scale: 0.11047, width: 28.28, height: 28.28 },
  { id: 6, tx: 55.90, ty: 220.72, scale: 0.11047, width: 28.28, height: 28.28 },
  { id: 7, tx: 232.90, ty: 369.72, scale: 0.09094, width: 23.28, height: 23.28 },
  { id: 8, tx: 148.65, ty: 73.97, scale: 0.09973, width: 25.53, height: 25.53 },
  { id: 9, tx: 310.52, ty: 74.22, scale: 0.09973, width: 25.53, height: 25.53 },
  { id: 10, tx: 445.47, ty: 100.79, scale: 0.076, width: 19.46, height: 19.46 },
  { id: 11, tx: 315.90, ty: 421.72, scale: 0.07482, width: 19.15, height: 19.15 },
  { id: 12, tx: 46.10, ty: 421.29, scale: 0.076, width: 19.46, height: 19.46 },
  { id: 13, tx: 12.72, ty: 312.17, scale: 0.076, width: 19.46, height: 19.46 },
  { id: 14, tx: 27.97, ty: 100.54, scale: 0.076, width: 19.46, height: 19.46 },
  { id: 15, tx: 236.65, ty: 27.91, scale: 0.07531, width: 19.28, height: 19.28 },
  { id: 16, tx: 459.47, ty: 312.17, scale: 0.076, width: 19.46, height: 19.46 },
  { id: 17, tx: 426.85, ty: 421.29, scale: 0.076, width: 19.46, height: 19.46 },
  { id: 18, tx: 158.40, ty: 421.72, scale: 0.07482, width: 19.15, height: 19.15 },
  { id: 19, tx: 237.65, ty: 465.97, scale: 0.07385, width: 18.91, height: 18.91 },
  { id: 20, tx: -21.15, ty: 184.29, scale: 0.076, width: 19.46, height: 19.46 },
  { id: 21, tx: 109.97, ty: 15.73, scale: 0.076, width: 19.46, height: 19.46 },
  { id: 22, tx: 362.22, ty: 15.48, scale: 0.076, width: 19.46, height: 19.46 },
  { id: 23, tx: 495.35, ty: 184.36, scale: 0.076, width: 19.46, height: 19.46 },
];