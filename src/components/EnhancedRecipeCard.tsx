"use client";

import React, { useState } from 'react';
import Image, { ImageLoaderProps } from 'next/image'; // ✅ 1. Import ImageLoaderProps
import { Recipe } from '@/types/recipe';

// ✅ 2. Define the custom loader function
const imageLoader = ({ src }: ImageLoaderProps) => {
  return src;
};

interface EnhancedRecipeCardProps {
  recipe: Recipe;
  onViewRecipe: (id: string) => void;
  onLike: (recipe: Recipe) => void;
  onShare: (recipe: Recipe) => void;
  isLiked?: boolean;
}

export const EnhancedRecipeCard: React.FC<EnhancedRecipeCardProps> = ({
  recipe,
  onViewRecipe,
  onLike,
  onShare,
  isLiked = false
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showIngredients, setShowIngredients] = useState(false);

  // Note: This is still demo data. The MealDB API doesn't provide this.
  const cookingTime = Math.floor(Math.random() * 60) + 15;
  const difficulty = ['Easy', 'Medium', 'Hard'][Math.floor(Math.random() * 3)];

  // ✅ 3. FIX: Parse actual ingredients from the recipe object
  const ingredients = [];
  for (let i = 1; i <= 5; i++) { // Get the first 5 ingredients for a quick preview
    const ingredientKey = `strIngredient${i}` as keyof Recipe;
    const measureKey = `strMeasure${i}` as keyof Recipe;
    if (recipe[ingredientKey]) {
      ingredients.push(`${recipe[measureKey]} ${recipe[ingredientKey]}`);
    }
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: recipe.strMeal,
          text: `Check out this amazing recipe: ${recipe.strMeal}`,
          url: window.location.origin + `/recipes/${recipe.idMeal}`, // Use a direct link
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      navigator.clipboard.writeText(`${recipe.strMeal} - ${window.location.origin}/recipes/${recipe.idMeal}`);
      alert('Recipe link copied to clipboard!');
    }
  };

  return (
    <div
      className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-slate-700 overflow-hidden transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-48 cursor-pointer" onClick={() => onViewRecipe(recipe.idMeal)}>
        {/* ✅ 4. APPLY THE LOADER to the Image component */}
        <Image
          loader={imageLoader}
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm rounded-full px-3 py-1 text-white text-sm font-medium">
          ⏱️ {cookingTime} min
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-3 h-14 line-clamp-2">
          {recipe.strMeal}
        </h3>

        <div className="mb-4">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-slate-700`}>
            {difficulty}
          </span>
        </div>

        <div className="mb-4">
          <button
            onClick={() => setShowIngredients(!showIngredients)}
            className="text-purple-400 hover:text-purple-300 text-sm font-medium"
          >
            {showIngredients ? 'Hide' : 'Show'} Ingredients
          </button>
          {showIngredients && (
            <div className="mt-2 p-3 bg-slate-700/50 rounded-lg text-sm text-gray-300">
              <ul className="list-disc list-inside">
                {ingredients.map((ing, i) => <li key={i}>{ing}</li>)}
              </ul>
            </div>
          )}
        </div>

        <div className="flex gap-2 pt-4 border-t border-slate-700">
          <button
            onClick={() => onViewRecipe(recipe.idMeal)}
            className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-2 px-4 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all"
          >
            View Recipe
          </button>
          
          <button
            onClick={() => onLike(recipe)}
            className={`p-2 rounded-lg transition-all ${isLiked ? 'bg-red-500 text-white' : 'bg-slate-700 text-gray-300 hover:bg-slate-600'}`}
          >
            {isLiked ? '❤️' : '🤍'}
          </button>
          
          <button
            onClick={handleShare}
            className="p-2 bg-slate-700 text-gray-300 rounded-lg hover:bg-slate-600 transition-all"
          >
            📤
          </button>
        </div>
      </div>
    </div>
  );
};