"use client";
import React, { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/utils/cn";

export const FlipWords = ({
  words,
  duration = 3000,
  className,
}: {
  words: string[];
  duration?: number;
  className?: string;
}) => {
  const [currentWord, setCurrentWord] = useState(words[0] || "");
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  // thanks for the fix Julian - https://github.com/Julian-AT
  const startAnimation = useCallback(() => {
    if (words.length === 0) return;
    
    const currentIndex = words.indexOf(currentWord);
    const nextIndex = (currentIndex + 1) % words.length;
    const nextWord = words[nextIndex];
    
    if (nextWord) {
      setCurrentWord(nextWord);
      setIsAnimating(true);
    }
  }, [currentWord, words]);

  useEffect(() => {
    if (words.length === 0) return;
    
    if (!isAnimating) {
      const timeout = setTimeout(() => {
        startAnimation();
      }, duration);
      
      return () => clearTimeout(timeout);
    }
  }, [isAnimating, duration, startAnimation, words.length]);

  // Reset if words array changes
  useEffect(() => {
    if (words.length > 0 && words[0] !== currentWord) {
      setCurrentWord(words[0]);
      setIsAnimating(false);
    }
  }, [words, currentWord]);

  if (words.length === 0) {
    return <span className={className}>No words available</span>;
  }

  return (
    <AnimatePresence
      mode="wait"
      onExitComplete={() => {
        setIsAnimating(false);
      }}
    >
      <motion.div
        initial={{
          opacity: 0,
          y: 10,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.4,
          ease: "easeInOut",
          type: "spring",
          stiffness: 100,
          damping: 10,
        }}
        exit={{
          opacity: 0,
          y: -40,
          x: 40,
          filter: "blur(8px)",
          scale: 2,
        }}
        className={cn(
          "z-50 inline-block relative text-left px-2",
          className
        )}
        key={currentWord}
        style={{ position: 'relative' }}
      >
        {currentWord.split("").map((letter, index) => (
          <motion.span
            key={`${currentWord}-${index}`}
            initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{
              delay: index * 0.05,
              duration: 0.3,
            }}
            className="inline-block"
          >
            {letter}
          </motion.span>
        ))}
      </motion.div>
    </AnimatePresence>
  );
};
