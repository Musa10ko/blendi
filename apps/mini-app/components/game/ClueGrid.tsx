"use client";

import React, { useEffect, useRef, useMemo } from "react";
import { ICON_MATRIX } from "./data/iconSlots";
import { patterns } from "./data/patterns";

interface ClueGridProps {
  day: 1 | 2 | 3 | 4 | 5;
}

export default function ClueGrid({ day }: ClueGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // 1. Покращений Shuffle Algorithm (VRF style)
  // Генеруємо стабільну сітку для поточного дня
  const gridData = useMemo(() => {
    const typeCount = day === 1 ? 4 : day === 2 ? 3 : day === 3 ? 2 : 1;
    const allPatterns = Object.values(patterns);
    // Вибираємо типи іконок (перша завжди "правильна")
    const activeTypes = allPatterns.slice(0, typeCount);

    return ICON_MATRIX.map((point, index) => ({
      point,
      // Рівномірний розподіл + невеликий зсув для асиметрії
      src: activeTypes[(index + day) % activeTypes.length],
      // Індивідуальний коефіцієнт блюру для цієї позиції
      blurSeed: Math.random()
    }));
  }, [day]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    const resize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth * window.devicePixelRatio;
        canvas.height = parent.clientHeight * window.devicePixelRatio;
        ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      }
    };
    resize();
    window.addEventListener('resize', resize);

    // Кеш для зображень, щоб не моргали при перемальовуванні
    const images: HTMLImageElement[] = gridData.map(item => {
      const img = new Image();
      img.src = item.src;
      return img;
    });

    let animationFrameId: number;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      gridData.forEach((item, index) => {
        const { point, blurSeed } = item;
        const img = images[index];

        if (!img.complete) return;

        ctx.save();

        // --- ЛОГІКА GLITCH (Тільки для Пн-Чт) ---
        const isGlitchStep = day < 5 && Math.random() > 0.96; // Шанс стрибка 4%
        const glitchX = isGlitchStep ? (Math.random() - 0.5) * 15 : 0;
        
        // --- ЛОГІКА ВИКРИВЛЕННЯ (Skew) ---
        const distortion = day < 5 ? (5 - day) * 0.12 : 0;
        // Scaling logic for different canvas sizes
        const scaleX = canvas.width / (600 * window.devicePixelRatio);
        const scaleY = canvas.height / (600 * window.devicePixelRatio);
        
        ctx.setTransform(scaleX, Math.random() * distortion, Math.random() * distortion, scaleY, (point.tx + 50 + glitchX) * scaleX, (point.ty + 50) * scaleY);

        // --- ЛОГІКА FROSTED BLUR ---
        const baseBlur = Math.max(0, (5 - day) * 2.2);
        const individualBlur = baseBlur * (0.5 + blurSeed); // Кожна іконка блюриться по-своєму
        ctx.filter = `blur(${individualBlur}px) saturate(${1.5 + day * 0.6})`;

        // --- МАЛЮВАННЯ RGB SPLIT (Glitch effect) ---
        if (isGlitchStep && day < 4) {
          ctx.globalCompositeOperation = "screen";
          // Червоний канал з відхиленням
          ctx.shadowColor = "red";
          ctx.shadowBlur = 5;
          ctx.drawImage(img, -point.width / 2 - 3, -point.height / 2, point.width * 2.3, point.height * 2.3);
          
          // Синій канал з відхиленням
          ctx.shadowColor = "cyan";
          ctx.drawImage(img, -point.width / 2 + 3, -point.height / 2, point.width * 2.3, point.height * 2.3);
        } else {
          // Звичайне малювання
          ctx.drawImage(img, -point.width / 2, -point.height / 2, point.width * 2.2, point.height * 2.2);
        }

        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
    };
  }, [day, gridData]);

  return (
    
    <div className="relative w-full h-full mx-auto group">
      {/* Контейнер з легким шумом для "старого ТБ" */}
      <div className={`
        w-full h-full overflow-hidden transition-all duration-500
        ${day === 1 ? 'shadow-[0_0_20px_rgba(255,255,255,0.1)]' : ''}
      `}>
        <canvas
          ref={canvasRef}
          className="w-full h-full object-contain filter drop-shadow-md"
        />
        
        {/* Додатковий шар Frosted Glass через Tailwind */}
        {day < 5 && (
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{ backdropFilter: `contrast(1.1) brightness(${1.1 - day*0.02})` }}
          />
        )}
      </div>
    </div>
  );
}