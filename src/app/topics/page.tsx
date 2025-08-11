'use client';

import { OptimizedImage } from "@/components/ui/optimized-image";
import React from "react";
import { CardBody, CardContainer, CardItem } from "../../components/ui/3d-card";
import Link from "next/link";
import { useRouter } from "next/navigation";

const categories = [
  {
    title: "Vegetarian",
    description: "Fresh plant-based recipes",
    imageUrl: "/images/vegetration.jpeg",
    link: "/category/Vegetarian",
    color: "from-emerald-500/20 to-emerald-600/40",
    bgColor: "bg-emerald-500/10"
  },
  {
    title: "Non-Vegetarian",
    description: "Protein-rich meat dishes",
    imageUrl: "/images/nonveg.jpg",
    link: "/category/Non-Vegetarian",
    color: "from-red-500/20 to-red-600/40",
    bgColor: "bg-red-500/10"
  },
  {
    title: "Breakfast",
    description: "Start your day right",
    imageUrl: "/images/breakfast.jpeg",
    link: "/category/Breakfast",
    color: "from-yellow-500/20 to-yellow-600/40",
    bgColor: "bg-yellow-500/10"
  },
  {
    title: "Dessert",
    description: "Sweet treats & delights",
    imageUrl: "/images/dessert.jpeg",
    link: "/category/Dessert",
    color: "from-pink-500/20 to-pink-600/40",
    bgColor: "bg-pink-500/10"
  },
  {
    title: "Side",
    description: "Perfect accompaniments",
    imageUrl: "/images/side.jpeg",
    link: "/category/Side",
    color: "from-green-500/20 to-green-600/40",
    bgColor: "bg-green-500/10"
  },
  {
    title: "Starter",
    description: "Begin your meal",
    imageUrl: "/images/starter.jpeg",
    link: "/category/Starter",
    color: "from-blue-500/20 to-blue-600/40",
    bgColor: "bg-blue-500/10"
  },
  {
    title: "Indian",
    description: "Spices and traditional flavors",
    imageUrl: "/images/indian.jpeg",
    link: "/category/Indian",
    color: "from-orange-500/20 to-orange-600/40",
    bgColor: "bg-orange-500/10"
  },
  {
    title: "French",
    description: "Elegant culinary artistry",
    imageUrl: "/images/french.jpeg",
    link: "/category/French",
    color: "from-blue-500/20 to-blue-600/40",
    bgColor: "bg-blue-500/10"
  },
  {
    title: "Chinese",
    description: "Ancient cooking wisdom",
    imageUrl: "/images/chinese.jpeg",
    link: "/category/Chinese",
    color: "from-red-500/20 to-red-600/40",
    bgColor: "bg-red-500/10"
  },
  {
    title: "American",
    description: "Classic comfort food",
    imageUrl: "/images/american.jpeg",
    link: "/category/American",
    color: "from-blue-500/20 to-blue-600/40",
    bgColor: "bg-blue-500/10"
  },
  {
    title: "British",
    description: "Traditional British fare",
    imageUrl: "/images/british.jpeg",
    link: "/category/British",
    color: "from-blue-500/20 to-blue-600/40",
    bgColor: "bg-blue-500/10"
  },
  {
    title: "Canadian",
    description: "Northern comfort cuisine",
    imageUrl: "/images/canandian.jpeg",
    link: "/category/Canadian",
    color: "from-red-500/20 to-red-600/40",
    bgColor: "bg-red-500/10"
  },
  {
    title: "Croatian",
    description: "Adriatic coastal flavors",
    imageUrl: "/images/crotian.jpeg",
    link: "/category/Croatian",
    color: "from-blue-500/20 to-blue-600/40",
    bgColor: "bg-blue-500/10"
  },
  {
    title: "Dutch",
    description: "Netherlands heritage",
    imageUrl: "/images/dutch.jpeg",
    link: "/category/Dutch",
    color: "from-orange-500/20 to-orange-600/40",
    bgColor: "bg-orange-500/10"
  },
  {
    title: "Egyptian",
    description: "Ancient Nile cuisine",
    imageUrl: "/images/egyptian.jpeg",
    link: "/category/Egyptian",
    color: "from-red-500/20 to-red-600/40",
    bgColor: "bg-red-500/10"
  },
  {
    title: "Filipino",
    description: "Island fusion flavors",
    imageUrl: "/images/flipino.jpeg",
    link: "/category/Filipino",
    color: "from-blue-500/20 to-blue-600/40",
    bgColor: "bg-blue-500/10"
  },
  {
    title: "Greek",
    description: "Mediterranean classics",
    imageUrl: "/images/greek.jpeg",
    link: "/category/Greek",
    color: "from-blue-500/20 to-blue-600/40",
    bgColor: "bg-blue-500/10"
  },
  {
    title: "Irish",
    description: "Emerald Isle traditions",
    imageUrl: "/images/irish.jpeg",
    link: "/category/Irish",
    color: "from-green-500/20 to-green-600/40",
    bgColor: "bg-green-500/10"
  },
  {
    title: "Italian",
    description: "La dolce vita cuisine",
    imageUrl: "/images/italian.jpeg",
    link: "/category/Italian",
    color: "from-green-500/20 to-green-600/40",
    bgColor: "bg-green-500/10"
  },
  {
    title: "Jamaican",
    description: "Caribbean spice & heat",
    imageUrl: "/images/jamican.jpeg",
    link: "/category/Jamaican",
    color: "from-green-500/20 to-green-600/40",
    bgColor: "bg-green-500/10"
  },
  {
    title: "Japanese",
    description: "Zen culinary philosophy",
    imageUrl: "/images/japanese.jpeg",
    link: "/category/Japanese",
    color: "from-red-500/20 to-red-600/40",
    bgColor: "bg-red-500/10"
  },
  {
    title: "Kenyan",
    description: "East African heritage",
    imageUrl: "/images/kenyan.jpeg",
    link: "/category/Kenyan",
    color: "from-green-500/20 to-green-600/40",
    bgColor: "bg-green-500/10"
  },
  {
    title: "Malaysian",
    description: "Southeast Asian fusion",
    imageUrl: "/images/malaysian.jpeg",
    link: "/category/Malaysian",
    color: "from-blue-500/20 to-blue-600/40",
    bgColor: "bg-blue-500/10"
  },
  {
    title: "Mexican",
    description: "Vibrant Latin flavors",
    imageUrl: "/images/mexican.jpeg",
    link: "/category/Mexican",
    color: "from-green-500/20 to-green-600/40",
    bgColor: "bg-green-500/10"
  },
  {
    title: "Moroccan",
    description: "North African spices",
    imageUrl: "/images/moroccan.jpeg",
    link: "/category/Moroccan",
    color: "from-red-500/20 to-red-600/40",
    bgColor: "bg-red-500/10"
  },
  {
    title: "Polish",
    description: "Eastern European comfort",
    imageUrl: "/images/polish.jpeg",
    link: "/category/Polish",
    color: "from-red-500/20 to-red-600/40",
    bgColor: "bg-red-500/10"
  },
  {
    title: "Portuguese",
    description: "Atlantic coast cuisine",
    imageUrl: "/images/portuguese.jpeg",
    link: "/category/Portuguese",
    color: "from-green-500/20 to-green-600/40",
    bgColor: "bg-green-500/10"
  },
  {
    title: "Russian",
    description: "Slavic culinary traditions",
    imageUrl: "/images/russian.jpeg",
    link: "/category/Russian",
    color: "from-blue-500/20 to-blue-600/40",
    bgColor: "bg-blue-500/10"
  },
  {
    title: "Spanish",
    description: "Iberian peninsula flavors",
    imageUrl: "/images/spanish.jpeg",
    link: "/category/Spanish",
    color: "from-red-500/20 to-red-600/40",
    bgColor: "bg-red-500/10"
  },
  {
    title: "Thai",
    description: "Land of smiles cuisine",
    imageUrl: "/images/thai.jpeg",
    link: "/category/Thai",
    color: "from-blue-500/20 to-blue-600/40",
    bgColor: "bg-blue-500/10"
  },
  {
    title: "Turkish",
    description: "Ottoman empire legacy",
    imageUrl: "/images/turkish.jpeg",
    link: "/category/Turkish",
    color: "from-red-500/20 to-red-600/40",
    bgColor: "bg-red-500/10"
  },
  {
    title: "Ukrainian",
    description: "Eastern European heritage",
    imageUrl: "/images/ukrainian.jpeg",
    link: "/category/Ukrainian",
    color: "from-blue-500/20 to-blue-600/40",
    bgColor: "bg-blue-500/10"
  },
  {
    title: "Vietnamese",
    description: "Fresh & fragrant dishes",
    imageUrl: "/images/vietnamese.jpeg",
    link: "/category/Vietnamese",
    color: "from-red-500/20 to-red-600/40",
    bgColor: "bg-red-500/10"
  },
  {
    title: "Miscellaneous",
    description: "Unique & special recipes",
    imageUrl: "/images/unknown.jpeg",
    link: "/category/Unknown",
    color: "from-gray-500/20 to-gray-600/40",
    bgColor: "bg-gray-500/10"
  },
];

const Topics: React.FC = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black py-12 pt-10">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto px-4 mb-12">
        <button 
          onClick={() => router.push('/')} 
          className="btn btn-secondary mb-8 hover:scale-105 transition-transform duration-200"
        >
          ← Back to Home
        </button>
        
        <div className="text-center">
          <h1 className="text-4xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
            All Categories
          </h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto">
            Explore our comprehensive collection of recipes from around the world
          </p>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <CardContainer key={index} className="inter-var">
              <CardBody className="relative group/card bg-white/5 backdrop-blur-lg border border-white/10 w-full h-80 rounded-3xl p-6 transition-all duration-300 hover:bg-white/10 hover:scale-[1.02] shadow-2xl">
                
                {/* Image Container with fixed dimensions */}
                <CardItem translateZ="100" className="w-full mb-4">
                  <div className="relative w-full h-48 rounded-2xl overflow-hidden">
                    <OptimizedImage
                      src={category.imageUrl}
                      height={192}
                      width={400}
                      className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
                      alt={category.title}
                      priority={index < 8}
                    />
                    
                    {/* Gradient overlay for text visibility */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
                    
                    {/* Category info overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-xl font-bold text-white mb-2">
                        {category.title}
                      </h3>
                      <p className="text-sm text-gray-200">
                        {category.description}
                      </p>
                    </div>
                  </div>
                </CardItem>

                {/* Action Button */}
                <div className="flex justify-center">
                  <CardItem
                    translateZ={20}
                    as={Link}
                    href={category.link}
                    className="btn btn-primary hover:scale-105 transition-transform duration-200"
                  >
                    Explore Recipes →
                  </CardItem>
                </div>
              </CardBody>
            </CardContainer>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Topics;
