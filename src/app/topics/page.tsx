'use client';

import Image from "next/image";
import React from "react";
import { CardBody, CardContainer, CardItem } from "../../components/ui/3d-card";
import Link from "next/link";
import router from "next/router";

const categories = [
  {
    title: "Vegetarian",
    imageUrl: "/images/vegetration.jpeg", // Ensure the path is correct
    link: "/category/Vegetarian",
  },
  {
    title: "Non-Vegetarian",
    imageUrl: "/images/nonveg.jpg", // Ensure the path is correct
    link: "/category/Non-Vegetarian",
  },
  {
    title: "Breakfast",
    imageUrl: "/images/breakfast.jpeg", // Ensure the path is correct
    link: "/category/Breakfast",
  },
  {
    title: "Dessert",
    imageUrl: "/images/dessert.jpeg", // Ensure the path is correct
    link: "/category/Dessert",
  },
  {
    title: "Side",
    imageUrl: "/images/side.jpeg", // Ensure the path is correct
    link: "/category/Side",
  },
  {
    title: "Starter",
    imageUrl: "/images/starter.jpeg", // Ensure the path is correct
    link: "/category/Starter",
  },
  {
    title: "Indian",
    imageUrl: "/images/indian.jpeg", // Ensure the path is correct
    link: "/category/Indian",
  },
  {
    title: "French",
    imageUrl: "/images/french.jpeg", // Ensure the path is correct
    link: "/category/French",
  },
  {
    title: "Chinese",
    imageUrl: "/images/chinese.jpeg", // Ensure the path is correct
    link: "/category/Chinese",
  },
  {
    title: "American",
    imageUrl: "/images/american.jpeg", // Ensure the path is correct
    link: "/category/American",
  },
  {
    title: "British",
    imageUrl: "/images/british.jpeg", // Ensure the path is correct
    link: "/category/British",
  },
  {
    title: "Canadian",
    imageUrl: "/images/canandian.jpeg", // Ensure the path is correct
    link: "/category/Canadian",
  },
  {
    title: "Croatian",
    imageUrl: "/images/crotian.jpeg", // Ensure the path is correct
    link: "/category/Croatian",
  },
  {
    title: "Dutch",
    imageUrl: "/images/dutch.jpeg", // Ensure the path is correct
    link: "/category/Dutch",
  },
  {
    title: "Egyptian",
    imageUrl: "/images/egyptian.jpeg", // Ensure the path is correct
    link: "/category/Egyptian",
  },
  {
    title: "Filipino",
    imageUrl: "/images/flipino.jpeg", // Ensure the path is correct
    link: "/category/Filipino",
  },
  {
    title: "Greek",
    imageUrl: "/images/greek.jpeg", // Ensure the path is correct
    link: "/category/Greek",
  },
  {
    title: "Irish",
    imageUrl: "/images/irish.jpeg", // Ensure the path is correct
    link: "/category/Irish",
  },
  {
    title: "Italian",
    imageUrl: "/images/italian.jpeg", // Ensure the path is correct
    link: "/category/Italian",
  },
  {
    title: "Jamaican",
    imageUrl: "/images/jamican.jpeg", // Ensure the path is correct
    link: "/category/Jamaican",
  },
  {
    title: "Japanese",
    imageUrl: "/images/japanese.jpeg", // Ensure the path is correct
    link: "/category/Japanese",
  },
  {
    title: "Kenyan",
    imageUrl: "/images/kenyan.jpeg", // Ensure the path is correct
    link: "/category/Kenyan",
  },
  {
    title: "Malaysian",
    imageUrl: "/images/malaysian.jpeg", // Ensure the path is correct
    link: "/category/Malaysian",
  },
  {
    title: "Mexican",
    imageUrl: "/images/mexican.jpeg", // Ensure the path is correct
    link: "/category/Mexican",
  },
  {
    title: "Moroccan",
    imageUrl: "/images/moroccan.jpeg", // Ensure the path is correct
    link: "/category/Moroccan",
  },
  {
    title: "Polish",
    imageUrl: "/images/polish.jpeg", // Ensure the path is correct
    link: "/category/Polish",
  },
  {
    title: "Portuguese",
    imageUrl: "/images/portuguese.jpeg", // Ensure the path is correct
    link: "/category/Portuguese",
  },
  {
    title: "Russian",
    imageUrl: "/images/russian.jpeg", // Ensure the path is correct
    link: "/category/Russian",
  },
  {
    title: "Spanish",
    imageUrl: "/images/spanish.jpeg", // Ensure the path is correct
    link: "/category/Spanish",
  },
  {
    title: "Thai",
    imageUrl: "/images/thai.jpeg", // Ensure the path is correct
    link: "/category/Thai",
  },
  {
    title: "Turkish",
    imageUrl: "/images/turkish.jpeg", // Ensure the path is correct
    link: "/category/Turkish",
  },
  {
    title: "Ukrainian",
    imageUrl: "/images/ukrainian.jpeg", // Ensure the path is correct
    link: "/category/Ukrainian",
  },
  {
    title: "Vietnamese",
    imageUrl: "/images/vietnamese.jpeg", // Ensure the path is correct
    link: "/category/Vietnamese",
  },
  {
    title: "miscellaneous",
    imageUrl: "/images/unknown.jpeg", // Ensure the path is correct
    link: "/category/Unknown",
  },
];

const Topics: React.FC = () => {
  return (
    <div className="min-h-screen bg-black py-12 pt-10">
      <button onClick={() => router.push('/')} className="relative group left-5">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg opacity-75 transition duration-200 group-hover:opacity-100" />
        <div className="relative px-8 py-2 bg-slate-700 rounded-lg text-white transition duration-200 group-hover:bg-transparent">
          Back to Home
        </div>
      </button>
      <h1 className="text-lg md:text-7xl text-center font-sans font-bold mb-8 text-white">All Categories</h1>  
      <div className="flex flex-wrap justify-center">
        {categories.map((category, index) => (
          <CardContainer key={index} className="inter-var m-4">
            <CardBody className=" relative group/card hover:shadow-2xl hover:shadow-emerald-500/[0.1] bg-slate-700 border-white/[0.2] w-auto h-auto rounded-xl p-6 border">
              <CardItem
                translateZ="50"
                className="text-xl font-bold text-white"
              >
                {category.title}
              </CardItem>
              <CardItem
                translateZ="100"
                className="w-full mt-4"
              >
                <Image
                  src={category.imageUrl}
                  height="1000"
                  width="1000"
                  className="h-60 w-60 object-cover rounded-xl group-hover/card:shadow-xl"
                  alt={category.title}
                />
              </CardItem>
              <div className="flex justify-between items-center mt-4">
                <CardItem
                  translateZ={20}
                  as={Link}
                  href={category.link}
                  className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
                >
                  Explore →
                </CardItem>
              </div>
            </CardBody>
          </CardContainer>
        ))}
      </div>
    </div>
  );
};

export default Topics;
