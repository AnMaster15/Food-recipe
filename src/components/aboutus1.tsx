"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

// Enhanced types for better structure
interface FoodCategory {
  id: string;
  title: string;
  description: string;
  image: string;
  link: string;
  color: string;
}

export function HeroParallaxDemo() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black">
      <Header />
      <CategoriesGrid />
    </div>
  );
}

const Header = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="max-w-7xl mx-auto py-20 md:py-32 px-4 text-center"
    >
      <h1 className="text-4xl md:text-7xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent mb-6">
        ABOUT US
      </h1>
      <p className="max-w-3xl mx-auto text-lg md:text-xl text-gray-300 leading-relaxed">
        Welcome to FoodMy, your ultimate destination for discovering delicious recipes and understanding the nutrients in your meals. Our mission is to make healthy eating easy and enjoyable by providing you with a wide range of recipes, from quick and simple dishes to gourmet meals, all with detailed nutritional information.
      </p>
      
      {/* Additional stats section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
      >
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 shadow-2xl">
          <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">1000+</div>
          <div className="text-gray-300">Recipes</div>
        </div>
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 shadow-2xl">
          <div className="text-3xl font-bold bg-gradient-to-r from-pink-400 to-blue-400 bg-clip-text text-transparent mb-2">50+</div>
          <div className="text-gray-300">Cuisines</div>
        </div>
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 shadow-2xl">
          <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">24/7</div>
          <div className="text-gray-300">Support</div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const CategoriesGrid = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 pb-20">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent mb-4">
          Explore Our Recipe Categories
        </h2>
        <p className="text-gray-300 max-w-2xl mx-auto">
          Discover a world of culinary delights organized by cuisine, meal type, and dietary preferences.
        </p>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        {foodCategories.map((category, index) => (
          <CategoryCard 
            key={category.id} 
            category={category} 
            index={index}
          />
        ))}
      </motion.div>
    </div>
  );
};

const CategoryCard = ({ category, index }: { category: FoodCategory; index: number }) => {
  const [imageError, setImageError] = React.useState(false);
  const [imageLoading, setImageLoading] = React.useState(true);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ 
        y: -8,
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
      className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 bg-white/5 backdrop-blur-lg border border-white/10 cursor-pointer"
    >
      <Link href={category.link} className="block">
        {/* Image Container with proper aspect ratio */}
        <div className="relative w-full h-48 overflow-hidden">
          {imageLoading && (
            <div className="absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center">
              <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
            </div>
          )}
          
          {!imageError ? (
            <Image
              src={category.image}
              alt={category.title}
              fill
              className={`object-cover transition-all duration-500 ${
                imageLoading ? 'opacity-0' : 'opacity-100'
              } group-hover:scale-110`}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              onError={() => setImageError(true)}
              onLoad={() => setImageLoading(false)}
              priority={index < 4} // Prioritize first 4 images
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-2 bg-gray-600 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                </div>
                <p className="text-sm text-gray-300 font-medium">{category.title}</p>
              </div>
            </div>
          )}
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Category badge */}
          <div className="absolute top-3 left-3">
            <span 
              className="px-3 py-1 text-xs font-semibold text-white rounded-full shadow-lg"
              style={{ backgroundColor: category.color }}
            >
              {category.title.split(' ')[0]}
            </span>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-6">
          <div className="flex items-center mb-3">
            <div 
              className="w-3 h-3 rounded-full mr-3"
              style={{ backgroundColor: category.color }}
            />
            <h3 className="text-xl font-semibold text-white group-hover:text-purple-300 transition-colors duration-300">
              {category.title}
            </h3>
          </div>
          <p className="text-gray-300 text-sm leading-relaxed">
            {category.description}
          </p>
        </div>
        
        {/* Hover effect indicator */}
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <div className="w-8 h-8 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

// Enhanced food categories data with proper structure
const foodCategories: FoodCategory[] = [
  {
    id: "1",
    title: "Italian Cuisine",
    description: "Discover authentic Italian recipes from pasta to pizza, featuring fresh ingredients and traditional techniques.",
    image: "/images/italian.jpeg",
    link: "/category/italian",
    color: "#E74C3C"
  },
  {
    id: "2",
    title: "Asian Delights",
    description: "Explore the rich flavors of Asian cuisine with recipes from China, Japan, Thailand, and more.",
    image: "/images/chinese.jpeg",
    link: "/category/asian",
    color: "#F39C12"
  },
  {
    id: "3",
    title: "Mediterranean",
    description: "Healthy Mediterranean dishes featuring olive oil, fresh vegetables, and lean proteins.",
    image: "/images/greek.jpeg",
    link: "/category/mediterranean",
    color: "#3498DB"
  },
  {
    id: "4",
    title: "Mexican Fiesta",
    description: "Spicy and flavorful Mexican recipes with authentic spices and fresh ingredients.",
    image: "/images/mexican.jpeg",
    link: "/category/mexican",
    color: "#27AE60"
  },
  {
    id: "5",
    title: "Indian Spices",
    description: "Rich and aromatic Indian cuisine with a perfect blend of spices and flavors.",
    image: "/images/indian.jpeg",
    link: "/category/indian",
    color: "#F39C12"
  },
  {
    id: "6",
    title: "French Elegance",
    description: "Sophisticated French cooking techniques and classic recipes for special occasions.",
    image: "/images/french.jpeg",
    link: "/category/french",
    color: "#E67E22"
  },
  {
    id: "7",
    title: "American Classics",
    description: "Comfort food and classic American dishes that bring warmth to your table.",
    image: "/images/american.jpeg",
    link: "/category/american",
    color: "#C0392B"
  },
  {
    id: "8",
    title: "Breakfast & Brunch",
    description: "Start your day right with delicious breakfast recipes and brunch ideas.",
    image: "/images/breakfast.jpeg",
    link: "/category/breakfast",
    color: "#F1C40F"
  },
  {
    id: "9",
    title: "Desserts & Sweets",
    description: "Indulge in homemade desserts, cakes, and sweet treats for every occasion.",
    image: "/images/dessert.jpeg",
    link: "/category/desserts",
    color: "#E91E63"
  },
  {
    id: "10",
    title: "Vegetarian",
    description: "Plant-based recipes that are nutritious, delicious, and satisfying.",
    image: "/images/vegetration.jpeg",
    link: "/category/vegetarian",
    color: "#4CAF50"
  },
  {
    id: "11",
    title: "Quick & Easy",
    description: "Fast and simple recipes for busy weeknights that don't compromise on taste.",
    image: "/images/starter.jpeg",
    link: "/category/quick",
    color: "#FF9800"
  },
  {
    id: "12",
    title: "Healthy Living",
    description: "Nutritious recipes focused on wellness and balanced nutrition for a healthy lifestyle.",
    image: "/images/side.jpeg",
    link: "/category/healthy",
    color: "#00BCD4"
  }
];