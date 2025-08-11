"use client";

import { useState, useEffect } from 'react';

export function useImageLoader(src: string) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!src) return;
    
    const img = new Image();
    img.src = src;
    
    const handleLoad = () => {
      setIsLoaded(true);
    };
    
    if (img.complete) {
      setIsLoaded(true);
    } else {
      img.addEventListener('load', handleLoad);
    }
    
    return () => {
      img.removeEventListener('load', handleLoad);
    };
  }, [src]);

  return isLoaded;
}
