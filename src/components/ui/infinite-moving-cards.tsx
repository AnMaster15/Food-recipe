"use client";

import { cn } from "@/utils/cn";
import React, { useEffect, useState, useCallback } from "react";
import Image, { ImageLoaderProps } from "next/image"; // Import ImageLoaderProps
import { Recipe } from "@/types/recipe";

// ✅ DEFINE THE CUSTOM LOADER
// This function simply returns the original image URL without any changes.
const imageLoader = ({ src }: ImageLoaderProps) => {
  return src;
};

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  onClickItem,
  className,
}: {
  items: Recipe[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  onClickItem: (id: string) => void;
  className?: string;
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);
  const [start, setStart] = useState(false);

  const getDirection = useCallback(() => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "forwards"
        );
      } else {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "reverse"
        );
      }
    }
  }, [direction]);

  const getSpeed = useCallback(() => {
    if (containerRef.current) {
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "20s");
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "40s");
      } else {
        containerRef.current.style.setProperty("--animation-duration", "80s");
      }
    }
  }, [speed]);

  const addAnimation = useCallback(() => {
    if (containerRef.current && scrollerRef.current) {
      // Clear existing duplicates first
      const originalChildCount = items.length;
      while (scrollerRef.current.children.length > originalChildCount) {
        scrollerRef.current.removeChild(scrollerRef.current.lastChild!);
      }

      // Add new duplicates efficiently
      const fragment = document.createDocumentFragment();
      Array.from(scrollerRef.current.children).forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        fragment.appendChild(duplicatedItem);
      });
      scrollerRef.current.appendChild(fragment);

      getDirection();
      getSpeed();
      !start && setStart(true);
    }
  }, [items, getDirection, getSpeed, start]);

  useEffect(() => {
    if (items.length > 0) {
      const timeoutId = setTimeout(addAnimation, 0);
      return () => clearTimeout(timeoutId);
    }
  }, [items, addAnimation]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 max-w-7xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex min-w-full shrink-0 gap-6 py-6 w-max flex-nowrap",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {items.map((item) => {
          console.log('Rendering item:', item);
          return item.strMealThumb && item.idMeal ? (
            <li
              className="w-[350px] max-w-full relative rounded-2xl flex-shrink-0 px-6 py-6 md:w-[400px] group cursor-pointer transition-all duration-500 hover:scale-105"
              style={{
                background:
                  "linear-gradient(135deg, rgba(38, 38, 38, 0.9) 0%, rgba(23, 23, 23, 0.95) 100%)",
              }}
              key={item.idMeal}
            >
              {/* Enhanced gradient border */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Card content */}
              <div className="relative z-10">
                <div className="flex justify-center items-center mb-6">
                  {/* Enhanced image container */}
                  <div className="relative overflow-hidden rounded-xl group-hover:shadow-2xl group-hover:shadow-purple-500/25 transition-all duration-500">
                    <Image
                      loader={imageLoader}
                      src={item.strMealThumb}
                      alt={item.strMeal}
                      width={220}
                      height={200}
                      className="rounded-xl transition-transform duration-500 group-hover:scale-110"
                    />
                    {/* Image overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                </div>
                
                <div className="text-center">
                  <h3 className="text-lg font-bold text-white mb-4 group-hover:text-purple-300 transition-colors duration-300">
                    {item.strMeal}
                  </h3>
                  
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      console.log('Button clicked for recipe:', item.idMeal);
                      onClickItem(item.idMeal);
                    }}
                    className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-sm font-medium rounded-full text-white bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 hover:from-pink-600 hover:via-purple-600 hover:to-blue-600 cursor-pointer transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25 hover:scale-105 hover:-translate-y-1"
                  >
                    View Recipe
                  </button>
                </div>
              </div>
            </li>
          ) : null;
        })}
      </ul>
    </div>
  );
};