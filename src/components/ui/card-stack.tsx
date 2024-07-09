"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

let interval: any;

type Card = {
  id: number;
  name: string;
  designation: string;
  content: React.ReactNode;
};

export const CardStack = ({
  items,
  offset,
  scaleFactor,
}: {
  items: Card[];
  offset?: number;
  scaleFactor?: number;
}) => {
  const CARD_OFFSET = offset || 10;
  const SCALE_FACTOR = scaleFactor || 0.06;
  const [cards, setCards] = useState<Card[]>(items);

  useEffect(() => {
    startFlipping();

    return () => clearInterval(interval);
  }, []);

  const startFlipping = () => {
    interval = setInterval(() => {
      setCards((prevCards: Card[]) => {
        const newArray = [...prevCards]; // create a copy of the array
        newArray.unshift(newArray.pop()!); // move the last element to the front
        return newArray;
      });
    }, 5000);
  };

  return (
    <div className="relative h-96 w-72 md:h-[24rem] md:w-[32rem]">
      {cards.map((card, index) => (
        <motion.div
          key={card.id}
          className="absolute dark:bg-gray-800 bg-white h-full w-full rounded-3xl p-6 shadow-lg border border-neutral-200 dark:border-gray-700 flex flex-col justify-between transition-transform duration-500"
          style={{
            transformOrigin: "top center",
          }}
          animate={{
            top: index * -CARD_OFFSET,
            scale: 1 - index * SCALE_FACTOR, // decrease scale for cards that are behind
            zIndex: cards.length - index, //  decrease z-index for the cards that are behind
          }}
        >
          <div className="font-normal text-neutral-700 dark:text-neutral-200 mb-4">
            {card.content}
          </div>
          <div>
            <p className="text-neutral-900 font-medium dark:text-white">
              {card.name}
            </p>
            <p className="text-neutral-500 font-normal dark:text-neutral-400">
              {card.designation}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};
