"use client";

import { motion } from "framer-motion";
import React from "react";
import { ImagesSlider } from "./ui/images-slider";
import { FlipWords } from "./ui/flip-words";

export function ImagesSliderDemo() {
  const images = [
    "/images/front7.jpg",
    "/images/front2.jpg",
    "/images/front3.jpg",
    "/images/front4.jpg",
    "/images/front5.jpg",
    "/images/front6.jpg",
    "/images/front8.jpg",
    // "/images/front1.jpg",
    "/images/front9.jpg"
    // Add more image paths here if needed
  ];

  const words = ["Delicious", "Nutritious", "Healthy", "Easy", "Gourmet", "Quick", "Flavorful", "Simple", "Wholesome", "Diverse"];
  
  return (
    <ImagesSlider className="h-[40rem]" images={images}>
      <motion.div
        initial={{
          opacity: 0,
          y: -80,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.4,
        }}
        className="z-50 flex flex-col justify-center items-center"
      >
        <motion.p className="font-bold text-xl md:text-6xl text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 py-4">
          Discover <FlipWords words={words} /> : <br /> Your Ultimate Guide to Recipes and Nutrition
        </motion.p>
      </motion.div>
    </ImagesSlider>
  );
}
