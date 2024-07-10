"use client";
import React from "react";
import { CardStack } from "./ui/card-stack";
import { cn } from "@/utils/cn";

export function CardStackDemo() {
  return (
    <div className="h-[30rem] flex items-center justify-center w-full bg-gradient-to-b from-blue-50 to-blue-200 dark:from-gray-800 dark:to-gray-900">
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
        "font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-700/[0.2] dark:text-emerald-500 px-1 py-0.5 rounded-md",
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
    name: "Dr Rakesh Chadda",
    designation: "Nutrition Expert",
    content: (
      <p>
        The recipes on FoodMy are exceptional, <Highlight>I&apos;m inspired</Highlight> by their creativity and nutritional balance.
      </p>
    ),
  },
  {
    id: 1,
    name: "Ayush Sharma",
    designation: "Fitness Coach",
    content: (
      <p>
        FoodMy has helped me discover <Highlight>delicious healthy meals</Highlight> that I recommend to all my clients.
      </p>
    ),
  },
  {
    id: 2,
    name: "Rohan Orhi",
    designation: "Culinary Artist",
    content: (
      <p>
        FoodMy&apos;s approach to <Highlight>innovative cooking techniques</Highlight> has revolutionized how I prepare meals.
      </p>
    ),
  },
];
