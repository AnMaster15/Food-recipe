"use client";
import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CanvasRevealEffect } from "./ui/canvas-reveal-effect";

export function CanvasRevealEffectDemo() {
  return (
    <>
      <div className="py-20 flex flex-col lg:flex-row items-center justify-center bg-gradient-to-b from-gray-900 via-gray-800 to-black">
        <Card title="At FoodMy, our vision is to become the go-to resource for anyone looking to improve their diet and explore new culinary horizons. We are committed to providing high-quality, accurate, and engaging content that inspires you to cook and eat better every day.">
          <CanvasRevealEffect
            animationSpeed={5.1}
            containerClassName="bg-gradient-to-br from-purple-900 via-pink-900 to-blue-900"
          />
        </Card>
      </div>
    </>
  );
}

const Card = ({
  title,
  children,
}: {
  title: string;
  children?: React.ReactNode;
}) => {
  const [hovered, setHovered] = React.useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="border border-white/10 group/canvas-card flex items-center justify-center max-w-sm w-full mx-auto p-4 relative h-[30rem] relative overflow-hidden bg-white/5 backdrop-blur-lg rounded-2xl"
    >
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="h-full w-full absolute inset-0 bg-gradient-to-br from-purple-500/90 via-pink-500/90 to-blue-500/90 flex items-center justify-center"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-20">
        <div className="text-center group-hover/canvas-card:-translate-y-4 group-hover/canvas-card:opacity-0 transition duration-200 w-full mx-auto flex items-center justify-center">
          <p className="text-white text-4xl font-bold">Our Vision</p>
        </div>
        <h2 className="text-white text-xl opacity-0 group-hover/canvas-card:opacity-100 relative z-10 mt-4 font-bold group-hover/canvas-card:text-white group-hover/canvas-card:-translate-y-2 transition duration-200">
          {title}
        </h2>
      </div>
    </div>
  );
};
