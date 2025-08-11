"use client";
import React from "react";
import { CardStack } from "./ui/card-stack";
import { cn } from "@/utils/cn";

export function CardStackDemo() {
  return (
    <div className="h-[30rem] flex items-center justify-center w-full bg-gradient-to-b from-gray-900 via-gray-800 to-black">
      <CardStack items={CARDS} />
    </div>
  );
}

export const Highlight = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <span
      className={cn(
        "font-bold bg-purple-500/20 text-purple-300 px-1 py-0.5 rounded-md",
        className
      )}
    >
      {children}
    </span>
  );
};

const CARDS = [
  {
    id: 0,
    name: "Dr. Sarah Chen",
    designation: "Nutritionist & Food Scientist",
    content: (
      <p>
        What sets FoodMy apart is their commitment to <Highlight>balanced nutrition</Highlight> without compromising on taste. The detailed nutritional information for each recipe is a game-changer for health-conscious cooks.
      </p>
    ),
  },
  {
    id: 1,
    name: "Chef Marcus Rodriguez",
    designation: "Professional Chef & Food Blogger",
    content: (
      <p>
        I&apos;ve discovered so many <Highlight>unique fusion recipes</Highlight> on FoodMy. The platform&apos;s diverse collection and detailed instructions make complex dishes accessible to home cooks of all skill levels.
      </p>
    ),
  },
  {
    id: 2,
    name: "Lisa Thompson",
    designation: "Home Cook & Community Leader",
    content: (
      <p>
        The <Highlight>community features</Highlight> on FoodMy are fantastic! I&apos;ve connected with fellow food enthusiasts, shared recipes, and learned so much from others. It&apos;s more than just a recipe site - it&apos;s a culinary social network.
      </p>
    ),
  },
  {
    id: 3,
    name: "James Parker",
    designation: "Food Photography Expert",
    content: (
      <p>
        The <Highlight>visual presentation</Highlight> of recipes on FoodMy is outstanding. The step-by-step photos and video guides make it easy to achieve professional-looking results at home.
      </p>
    ),
  },
];
