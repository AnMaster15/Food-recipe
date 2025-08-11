"use client";

import Image from 'next/image';
import { useImageLoader } from '@/hooks/useImageLoader';
import { cn } from '@/utils/cn';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
}

export function OptimizedImage({ src, alt, width, height, className, priority = false }: OptimizedImageProps) {
  const isLoaded = useImageLoader(src);

  return (
    <div className="relative">
      {!isLoaded && (
        <div className={cn(
          "absolute inset-0 flex items-center justify-center bg-gray-100 rounded-xl",
          className
        )}>
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )}
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={cn(
          className,
          "transition-opacity duration-300",
          isLoaded ? "opacity-100" : "opacity-0"
        )}
        priority={priority}
      />
    </div>
  );
}
