"use client";
import { cn } from "@/utils/cn";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { createNoise3D } from "simplex-noise";

export const OptimizedWavyBackground = ({
  children,
  className,
  containerClassName,
  colors,
  waveWidth,
  backgroundFill,
  blur = 10,
  speed = "fast",
  waveOpacity = 0.5,
  ...props
}: {
  children?: any;
  className?: string;
  containerClassName?: string;
  colors?: string[];
  waveWidth?: number;
  backgroundFill?: string;
  blur?: number;
  speed?: "slow" | "fast";
  waveOpacity?: number;
  [key: string]: any;
}) => {
  const noise = createNoise3D();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const animationRef = useRef<number>();
  const lastFrameTime = useRef<number>(0);
  const noiseOffset = useRef<number>(0);

  const getSpeed = useCallback(() => {
    switch (speed) {
      case "slow":
        return 0.001;
      case "fast":
        return 0.002;
      default:
        return 0.001;
    }
  }, [speed]);

  const init = useCallback(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    if (!context) return;

    setCtx(context);
    const w = canvas.width = window.innerWidth;
    const h = canvas.height = window.innerHeight;
    setSize({ w, h });
    context.filter = `blur(${blur}px)`;
  }, [blur]);

  const drawWave = useCallback((timestamp: number) => {
    if (!ctx || !size.w || !size.h) return;

    const fps = 60;
    const frameDuration = 1000 / fps;

    if (timestamp - lastFrameTime.current < frameDuration) {
      animationRef.current = requestAnimationFrame(drawWave);
      return;
    }

    lastFrameTime.current = timestamp;
    noiseOffset.current += getSpeed();

    ctx.fillStyle = backgroundFill || "black";
    ctx.globalAlpha = waveOpacity;
    ctx.fillRect(0, 0, size.w, size.h);

    const waveColors = colors ?? ["#38bdf8", "#818cf8", "#c084fc", "#e879f9", "#22d3ee"];
    
    for (let i = 0; i < 5; i++) {
      ctx.beginPath();
      ctx.strokeStyle = waveColors[i % waveColors.length];
      ctx.lineWidth = waveWidth || 50;

      for (let x = 0; x < size.w; x += 5) {
        const y = noise(x / 800, 0.3 * i, noiseOffset.current) * 100;
        ctx.lineTo(x, y + size.h * 0.5);
      }
      ctx.stroke();
      ctx.closePath();
    }

    animationRef.current = requestAnimationFrame(drawWave);
  }, [ctx, size, getSpeed, colors, backgroundFill, waveOpacity, waveWidth, noise]);

  useEffect(() => {
    init();
    const debouncedResize = debounce(() => init(), 250);
    window.addEventListener('resize', debouncedResize);
    
    return () => {
      window.removeEventListener('resize', debouncedResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [init]);

  useEffect(() => {
    if (ctx) {
      animationRef.current = requestAnimationFrame(drawWave);
    }
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [ctx, drawWave]);

  return (
    <div
      className={cn(
        "h-screen flex flex-col items-center justify-center",
        containerClassName
      )}
      {...props}
    >
      <canvas
        className="absolute inset-0 z-0"
        ref={canvasRef}
        style={{
          width: "100%",
          height: "100%",
        }}
      />
      <div className={cn("relative z-10", className)}>{children}</div>
    </div>
  );
};

// Utility function for debouncing
function debounce(func: Function, wait: number) {
  let timeout: NodeJS.Timeout;
  return function executedFunction(...args: any[]) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
